#!/usr/bin/env node
// Diffs extracted.md vs expected.md per page and writes BASELINE.md.
// Scoring is intentionally simple and interpretable, not ML — it's meant
// to surface regressions and selector gaps, not to rank extraction quality
// on an absolute scale. Metrics per page:
//
//   - length_ratio  = extracted_chars / expected_chars
//   - token_recall  = |expected_tokens ∩ extracted_tokens| / |expected_tokens|
//   - token_precision = |∩| / |extracted_tokens|
//   - f1            = harmonic mean
//
// Tokens are lowercased alphanumeric runs ≥3 chars, stopword-free.
// "Missing blocks": expected paragraphs with <30% token overlap in output.
// "Extra blocks": extracted paragraphs with <30% overlap vs expected — likely
//                 nav/ad chrome the extractor failed to strip.

import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "corpus");

const STOP = new Set(
  "the a an and or but if then of to in on at for by with from as is are was were be been being this that these those it its it's i you he she we they them his her our your my"
    .split(/\s+/),
);

const tokens = (s) =>
  (s || "")
    .toLowerCase()
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .split(/\s+/)
    .filter((t) => t.length >= 3 && !STOP.has(t));

const blocks = (s) =>
  (s || "")
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter((b) => b.length > 0 && !/^#{1,6}\s/.test(b));

const overlap = (a, b) => {
  const B = new Set(b);
  let hit = 0;
  for (const t of a) if (B.has(t)) hit++;
  return a.length === 0 ? 0 : hit / a.length;
};

const manifest = JSON.parse(readFileSync(join(ROOT, "manifest.json"), "utf8"));
const rows = [];

for (const site of manifest.sites) {
  for (const page of site.pages) {
    if (page.quarantined || page.skip_story_review || page.expected_current === false) continue;

    const dir = join(ROOT, "sites", site.slug, page.id);
    const extP = join(dir, "extracted.md");
    const expP = join(dir, "expected.md");
    if (!existsSync(extP) || !existsSync(expP)) continue;
    // Skip fixtures flagged broken (e.g. dead URL, degenerate HTML) — scoring
    // them would inflate F1 without telling us anything about extraction.
    const annP = join(dir, "annotations.json");
    if (existsSync(annP)) {
      try {
        const ann = JSON.parse(readFileSync(annP, "utf8"));
        if (ann.quality === "fixture-broken") continue;
      } catch {}
    }
    const extracted = readFileSync(extP, "utf8");
    const expected = readFileSync(expP, "utf8");
    const et = tokens(extracted);
    const xt = tokens(expected);
    const ets = new Set(et);
    const xts = new Set(xt);
    const inter = [...xts].filter((t) => ets.has(t)).length;
    const recall = xts.size ? inter / xts.size : 0;
    const precision = ets.size ? inter / ets.size : 0;
    const f1 = recall + precision ? (2 * recall * precision) / (recall + precision) : 0;

    // block-level "missing" / "extra" count
    const expBlocks = blocks(expected).map(tokens);
    const extBlocks = blocks(extracted).map(tokens);
    const missing = expBlocks.filter((b) => overlap(b, et) < 0.3).length;
    const extra = extBlocks.filter((b) => overlap(b, xt) < 0.3).length;

    rows.push({
      slug: site.slug,
      page: page.id,
      category: site.category,
      cms: site.cms,
      len_ratio: expected.length ? +(extracted.length / expected.length).toFixed(2) : 0,
      recall: +recall.toFixed(3),
      precision: +precision.toFixed(3),
      f1: +f1.toFixed(3),
      missing_blocks: missing,
      extra_blocks: extra,
    });
  }
}

rows.sort((a, b) => a.f1 - b.f1);

const avg = (k) => (rows.reduce((s, r) => s + r[k], 0) / (rows.length || 1)).toFixed(3);
const byCat = new Map();
for (const r of rows) {
  if (!byCat.has(r.category)) byCat.set(r.category, []);
  byCat.get(r.category).push(r);
}

let md = `# Extraction Baseline\n\n`;
md += `Generated: ${new Date().toISOString().slice(0, 10)}. Pages scored: **${rows.length}**.\n\n`;
md += `## Overall\n\n`;
md += `| metric | value |\n|---|---|\n`;
md += `| F1 (mean) | ${avg("f1")} |\n`;
md += `| Recall (mean) | ${avg("recall")} |\n`;
md += `| Precision (mean) | ${avg("precision")} |\n`;
md += `| Length ratio (mean) | ${avg("len_ratio")} |\n`;
md += `| Missing blocks / page | ${avg("missing_blocks")} |\n`;
md += `| Extra blocks / page | ${avg("extra_blocks")} |\n\n`;

md += `## By category\n\n| category | n | F1 | recall | precision |\n|---|---|---|---|---|\n`;
for (const [cat, list] of [...byCat.entries()].sort()) {
  const m = (k) => (list.reduce((s, r) => s + r[k], 0) / list.length).toFixed(3);
  md += `| ${cat} | ${list.length} | ${m("f1")} | ${m("recall")} | ${m("precision")} |\n`;
}

md += `\n## Worst 20 pages (lowest F1)\n\n`;
md += `| slug | page | F1 | R | P | miss | extra |\n|---|---|---|---|---|---|---|\n`;
for (const r of rows.slice(0, 20)) {
  md += `| ${r.slug} | ${r.page} | ${r.f1} | ${r.recall} | ${r.precision} | ${r.missing_blocks} | ${r.extra_blocks} |\n`;
}

writeFileSync(join(ROOT, "BASELINE.md"), md);
writeFileSync(join(ROOT, "scores.json"), JSON.stringify(rows, null, 2) + "\n");
console.log(`Wrote BASELINE.md and scores.json (${rows.length} pages).`);
