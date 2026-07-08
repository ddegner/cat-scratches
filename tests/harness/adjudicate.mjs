#!/usr/bin/env node
// Adjudication helper for review-queue.json disagreements (pages where
// Mozilla Readability and the extension extractor produced different text).
// The adjudicator (an LLM session or a human) authors expected.md; this
// script prepares the per-page packet and does the bookkeeping.
//
//   node adjudicate.mjs --list           # queue status
//   node adjudicate.mjs --next           # packet for the next open page
//   node adjudicate.mjs --show <id>      # packet for a specific page
//   node adjudicate.mjs --done <id> --quality ok|needs-improvement|fixture-broken [--note "…"]
//
// --done verifies expected.md exists (except fixture-broken), stamps
// annotations.json, and marks the queue entry. See ADJUDICATE.md for the
// full procedure and the rules for authoring expected.md.

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { CORPUS_DIR, pageDir, readJsonSafe } from "./lib/corpus.mjs";
import { extractOnce } from "./lib/extractor-host.mjs";
import { tokens, blocks, containment, stripLinkTargets } from "./lib/scoring.mjs";

const QUEUE_PATH = join(CORPUS_DIR, "review-queue.json");
const MIN_EXPECTED_TOKENS = 60;

const argv = process.argv.slice(2);
const flag = (name) => argv.includes(name);
const opt = (name, fallback) => {
  const index = argv.indexOf(name);
  return index >= 0 && argv[index + 1] ? argv[index + 1] : fallback;
};

const queueDoc = readJsonSafe(QUEUE_PATH);
if (!queueDoc?.queue) {
  console.error(`no ${QUEUE_PATH} — run \`npm run seed-expected\` first`);
  process.exit(1);
}

const disagreements = queueDoc.queue.filter((e) => e.reason === "disagreement");
const open = disagreements
  .filter((e) => {
    if (e.adjudicated) return false;
    const [slug, page] = e.id.split("/");
    return !existsSync(join(pageDir(slug, page), "expected.md"));
  })
  // Worst agreement first (the queue file's own ordering has a comparator
  // bug and can't be trusted).
  .sort((a, b) => (a.score ?? 1) - (b.score ?? 1));

const lineSnippet = (text, max = 260) =>
  (text || "")
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join("\n")
    .slice(0, max);

function printPacket(entry) {
  const [slug, page] = entry.id.split("/");
  const dir = pageDir(slug, page);
  const extractedPath = join(dir, "extracted.md");
  const readabilityPath = join(dir, "readability.txt");

  // extracted.md on disk can be months stale (run.mjs writes it; evaluate.mjs
  // doesn't). Ground truth must be authored against CURRENT output, so
  // regenerate it for this page before building the packet.
  let extracted = "";
  if (existsSync(join(dir, "source.html"))) {
    try {
      const fetchMeta = readJsonSafe(join(dir, "fetch.json")) || {};
      const result = extractOnce(
        readFileSync(join(dir, "source.html"), "utf8"),
        fetchMeta.final_url || entry.url,
      );
      extracted = (result.body || "") + "\n";
      writeFileSync(extractedPath, extracted);
      console.log(`(extracted.md regenerated with current extractor code)`);
    } catch (error) {
      console.log(`(could not regenerate extracted.md: ${error?.message || error})`);
      extracted = existsSync(extractedPath) ? readFileSync(extractedPath, "utf8") : "";
    }
  }
  const readability = existsSync(readabilityPath) ? readFileSync(readabilityPath, "utf8") : "";

  console.log(`\n=== ${entry.id}  (${entry.category})`);
  console.log(`url: ${entry.url}`);
  console.log(
    `agreement: ${entry.score}  recall_of_readability: ${entry.recall_of_readability}  recall_of_extracted: ${entry.recall_of_extracted}`,
  );
  console.log(`files:`);
  console.log(`  extracted:   ${extractedPath}`);
  console.log(`  readability: ${readabilityPath}${readability ? "" : "  (MISSING — re-run seed-expected)"}`);
  console.log(`  evidence:    ${join(dir, "evidence.json")}${existsSync(join(dir, "evidence.json")) ? "" : "  (none)"}`);
  console.log(`  source:      ${join(dir, "source.html")}`);

  if (!extracted || !readability) return;

  const extractedTokenSet = new Set(tokens(stripLinkTargets(extracted)));
  const readabilityTokenSet = new Set(tokens(readability));

  // Readability's textContent often uses single newlines between paragraphs,
  // which blocks() (\n\n splitting) sees as one giant block. Fall back to
  // per-line blocks when that happens, or the diff below reports nothing.
  const readabilityBlocks = (() => {
    const paragraphBlocks = blocks(readability);
    if (paragraphBlocks.length >= 5 || readability.length < 2000) return paragraphBlocks;
    return readability.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
  })();

  const DIFF_CONTAINMENT = 0.7; // partial overlap still worth a look
  const extractedOnly = blocks(stripLinkTargets(extracted))
    .map((b) => ({ b, t: tokens(b) }))
    .filter(({ t }) => t.length >= 3 && containment(t, readabilityTokenSet) < DIFF_CONTAINMENT);
  const readabilityOnly = readabilityBlocks
    .map((b) => ({ b, t: tokens(b) }))
    .filter(({ t }) => t.length >= 3 && containment(t, extractedTokenSet) < DIFF_CONTAINMENT);

  console.log(
    `\n--- blocks ONLY in extracted.md (${extractedOnly.length}) — junk we keep, OR content Readability under-extracted:`,
  );
  for (const { b } of extractedOnly.slice(0, 12)) console.log(`  · ${lineSnippet(b).replace(/\n/g, "\n    ")}`);
  if (extractedOnly.length > 12) console.log(`  … ${extractedOnly.length - 12} more`);

  console.log(
    `\n--- blocks ONLY in readability.txt (${readabilityOnly.length}) — content we may be MISSING:`,
  );
  for (const { b } of readabilityOnly.slice(0, 12)) console.log(`  · ${lineSnippet(b).replace(/\n/g, "\n    ")}`);
  if (readabilityOnly.length > 12) console.log(`  … ${readabilityOnly.length - 12} more`);

  if (extractedOnly.length === 0 && readabilityOnly.length === 0) {
    console.log(
      `\n(no block-level differences — the disagreement is diffuse token-level drift;` +
        ` read both files side by side before deciding)`,
    );
  }

  console.log(`\nNext: author ${join(dir, "expected.md")} per ADJUDICATE.md, then:`);
  console.log(`  node adjudicate.mjs --done ${entry.id} --quality ok|needs-improvement|fixture-broken`);
}

if (flag("--list")) {
  console.log(
    `disagreements: ${disagreements.length} total, ${disagreements.length - open.length} adjudicated, ${open.length} open`,
  );
  for (const e of open.slice(0, 15)) {
    console.log(`  ${String(e.score).padEnd(7)} ${e.id}  (${e.category})`);
  }
  if (open.length > 15) console.log(`  … ${open.length - 15} more (worst agreement first)`);
  process.exit(0);
}

if (flag("--next") || flag("--show")) {
  const id = opt("--show", null);
  const entry = id ? disagreements.find((e) => e.id === id) : open[0];
  if (!entry) {
    console.log(id ? `no disagreement entry "${id}"` : "queue is empty — nothing open");
    process.exit(id ? 1 : 0);
  }
  printPacket(entry);
  process.exit(0);
}

const doneId = opt("--done", null);
if (doneId) {
  const quality = opt("--quality", null);
  const note = opt("--note", "");
  if (!["ok", "needs-improvement", "fixture-broken"].includes(quality || "")) {
    console.error(`--quality must be ok | needs-improvement | fixture-broken`);
    process.exit(1);
  }
  const entry = disagreements.find((e) => e.id === doneId);
  if (!entry) {
    console.error(`no disagreement entry "${doneId}" in the queue`);
    process.exit(1);
  }
  const [slug, page] = doneId.split("/");
  const dir = pageDir(slug, page);

  if (quality !== "fixture-broken") {
    const expectedPath = join(dir, "expected.md");
    if (!existsSync(expectedPath)) {
      console.error(`${expectedPath} does not exist — author it first (see ADJUDICATE.md)`);
      process.exit(1);
    }
    const tokenCount = tokens(stripLinkTargets(readFileSync(expectedPath, "utf8"))).length;
    if (tokenCount < MIN_EXPECTED_TOKENS) {
      console.error(
        `${expectedPath} has only ${tokenCount} tokens (< ${MIN_EXPECTED_TOKENS}) — that's a stub, not ground truth`,
      );
      process.exit(1);
    }
  }

  const annPath = join(dir, "annotations.json");
  const existing = readJsonSafe(annPath) || {};
  writeFileSync(
    annPath,
    JSON.stringify(
      {
        ...existing,
        url: existing.url || entry.url,
        annotator: "llm-adjudicated",
        quality,
        adjudicated_at: new Date().toISOString().slice(0, 10),
        notes: note || existing.notes || "",
      },
      null,
      2,
    ) + "\n",
  );

  entry.adjudicated = { at: new Date().toISOString(), quality };
  writeFileSync(QUEUE_PATH, JSON.stringify(queueDoc, null, 2) + "\n");

  const remaining = open.filter((e) => e.id !== doneId).length;
  console.log(`recorded ${doneId} as ${quality}. ${remaining} disagreements still open.`);
  console.log(
    `REMINDER: after this adjudication session ends, enroll the new pages with\n  node --max-old-space-size=8192 evaluate.mjs --write-baseline`,
  );
  process.exit(0);
}

console.log("usage: adjudicate.mjs --list | --next | --show <id> | --done <id> --quality <q> [--note …]");
process.exit(1);
