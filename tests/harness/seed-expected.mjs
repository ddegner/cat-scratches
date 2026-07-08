#!/usr/bin/env node
// Grows the ground-truth set by triangulating two independent extractors.
//
// For every page with source.html but no expected.md: run Mozilla
// Readability AND the extension's extractor. When the two agree (high
// symmetric token overlap), the text is almost certainly all real body
// content, so extracted.md is promoted to expected.md with
// quality: "auto-agreed". Disagreements go to review-queue.json for
// LLM/human review, with readability.txt saved next to the page.
//
// IMPORTANT: auto-agreed pages pin CURRENT behavior. They protect against
// regressions; improvement signal comes from pages that disagree.
//
//   node seed-expected.mjs --dry-run          # report only
//   node seed-expected.mjs                    # write expected.md files
//   node seed-expected.mjs --min-agreement 0.95 --limit 50
//
// Never overwrites an existing expected.md.

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { Readability } from "@mozilla/readability";
import { CORPUS_DIR, unannotatedPages, loadPageContent, readJsonSafe } from "./lib/corpus.mjs";
import { makeDom, extractOnce } from "./lib/extractor-host.mjs";
import { tokens, stripLinkTargets, round } from "./lib/scoring.mjs";

const argv = process.argv.slice(2);
const flag = (name) => argv.includes(name);
const opt = (name, fallback) => {
  const index = argv.indexOf(name);
  return index >= 0 && argv[index + 1] ? argv[index + 1] : fallback;
};

const DRY_RUN = flag("--dry-run");
const MIN_AGREEMENT = Number(opt("--min-agreement", "0.93"));
const MIN_TOKENS = Number(opt("--min-tokens", "120"));
const LIMIT = Number(opt("--limit", "0"));

function agreement(extractedMd, readabilityText) {
  const extractedTokens = new Set(tokens(stripLinkTargets(extractedMd)));
  const readabilityTokens = new Set(tokens(readabilityText));
  if (!extractedTokens.size || !readabilityTokens.size) {
    return { score: 0, extracted_tokens: extractedTokens.size, readability_tokens: readabilityTokens.size };
  }
  let inter = 0;
  for (const t of readabilityTokens) if (extractedTokens.has(t)) inter++;
  // Both directions must be high: extractor must not have junk Readability
  // lacks, and must not be missing content Readability found.
  const recallOfReadability = inter / readabilityTokens.size;
  const recallOfExtracted = inter / extractedTokens.size;
  return {
    score: Math.min(recallOfReadability, recallOfExtracted),
    recall_of_readability: round(recallOfReadability),
    recall_of_extracted: round(recallOfExtracted),
    extracted_tokens: extractedTokens.size,
    readability_tokens: readabilityTokens.size,
  };
}

const candidates = unannotatedPages();
console.log(`pages with source.html but no expected.md: ${candidates.length}`);

const seeded = [];
const queued = [];
const failed = [];
let processed = 0;

for (const record of candidates) {
  if (LIMIT && processed >= LIMIT) break;
  processed++;

  const page = loadPageContent(record);
  let readabilityText = "";
  try {
    // Readability mutates the DOM, so give it its own parse.
    const dom = makeDom(page.html, page.url);
    const article = new Readability(dom.window.document, { charThreshold: 250 }).parse();
    readabilityText = (article?.textContent || "").trim();
    dom.window.close();
  } catch (error) {
    failed.push({ id: record.id, error: String(error?.message || error) });
    continue;
  }

  let extracted = "";
  try {
    extracted = (extractOnce(page.html, page.url).body || "").trim();
  } catch (error) {
    failed.push({ id: record.id, error: String(error?.message || error) });
    continue;
  }

  const agree = agreement(extracted, readabilityText);
  const eligible =
    agree.readability_tokens >= MIN_TOKENS && agree.extracted_tokens >= MIN_TOKENS;

  if (eligible && agree.score >= MIN_AGREEMENT) {
    seeded.push({ id: record.id, score: round(agree.score) });
    if (!DRY_RUN) {
      writeFileSync(join(record.dir, "expected.md"), extracted + "\n");
      const existing = readJsonSafe(join(record.dir, "annotations.json")) || {};
      writeFileSync(
        join(record.dir, "annotations.json"),
        JSON.stringify(
          {
            ...existing,
            url: existing.url || record.url,
            annotator: "readability-triangulation",
            quality: "auto-agreed",
            seeded_at: new Date().toISOString().slice(0, 10),
            agreement: agree,
            notes:
              existing.notes ||
              "expected.md auto-seeded: extension output and Mozilla Readability agree. Pins current behavior as a regression anchor; not hand-verified.",
          },
          null,
          2,
        ) + "\n",
      );
    }
    console.log(`  seed  ${record.id}  agreement=${round(agree.score)}`);
  } else {
    queued.push({
      id: record.id,
      category: record.category,
      url: record.url,
      ...agree,
      reason: !eligible ? "too-thin" : "disagreement",
    });
    if (!DRY_RUN && eligible) {
      // Save Readability's view for the reviewer that adjudicates later.
      writeFileSync(join(record.dir, "readability.txt"), readabilityText + "\n");
    }
    console.log(
      `  queue ${record.id}  agreement=${round(agree.score)}  (${!eligible ? "too-thin" : "disagreement"})`,
    );
  }
}

if (!DRY_RUN) {
  writeFileSync(
    join(CORPUS_DIR, "review-queue.json"),
    JSON.stringify(
      {
        generated_at: new Date().toISOString(),
        min_agreement: MIN_AGREEMENT,
        // Disagreements first, biggest disagreement first — that's where
        // extraction improvements live.
        queue: queued.sort((a, b) => (a.reason > b.reason ? -1 : 1) || a.score - b.score),
        failed,
      },
      null,
      2,
    ) + "\n",
  );
}

console.log(
  `\n${DRY_RUN ? "[dry-run] " : ""}seeded=${seeded.length} queued=${queued.length} (${queued.filter((q) => q.reason === "disagreement").length} disagreements) failed=${failed.length}`,
);
if (!DRY_RUN) console.log(`review queue: ${join(CORPUS_DIR, "review-queue.json")}`);
