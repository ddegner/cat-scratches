#!/usr/bin/env node
// One-command, machine-readable evaluation of a candidate config against the
// ground-truth corpus. This is the entry point an optimization loop calls.
//
//   node evaluate.mjs                                # defaults, train set
//   node evaluate.mjs --config candidate.json        # candidate config
//   node evaluate.mjs --set holdout                  # final acceptance check
//   node evaluate.mjs --evidence                     # also write per-page evidence.json
//   node evaluate.mjs --write-baseline               # pin current defaults as baseline
//
// Output: tests/corpus/eval-report.json (override with --out). Exit codes:
//   0 = ran, all gates passed (or no baseline to gate against)
//   2 = ran, one or more gates failed
//   1 = harness error
//
// Gates (checked against tests/corpus/eval-baseline.json):
//   - anchor pages (quality near-perfect / auto-agreed): f1 >= 0.95 and
//     no more than 0.01 below their baseline f1
//   - per-category mean f1 must not drop more than 0.002 below baseline
//   - no single page may drop more than 0.05 f1 below baseline
//
// Results are cached per (config hash, page mtimes) in .cache/ so repeated
// evaluations of the same config are free. --evidence bypasses the cache
// because it needs a live DOM.

import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { CORPUS_DIR, HARNESS_DIR, scorablePages, loadPageContent } from "./lib/corpus.mjs";
import { createExtractionHost, EXTRACTOR_SOURCES_HASH } from "./lib/extractor-host.mjs";
import { loadConfig, configHash } from "./lib/config.mjs";
import { scoreText, summarize, round } from "./lib/scoring.mjs";
import { buildEvidence } from "./lib/evidence.mjs";

const ANCHOR_MIN_F1 = 0.95;
const ANCHOR_DROP_TOLERANCE = 0.01;
const CATEGORY_DROP_TOLERANCE = 0.002;
const PAGE_DROP_TOLERANCE = 0.05;

const BASELINE_PATH = join(CORPUS_DIR, "eval-baseline.json");
const CACHE_DIR = join(HARNESS_DIR, ".cache");

// --- CLI ------------------------------------------------------------------
const argv = process.argv.slice(2);
const flag = (name) => argv.includes(name);
const opt = (name, fallback) => {
  const index = argv.indexOf(name);
  return index >= 0 && argv[index + 1] ? argv[index + 1] : fallback;
};

const WRITE_BASELINE = flag("--write-baseline");
const SET = WRITE_BASELINE ? "all" : opt("--set", "train");
const CONFIG_PATH = opt("--config", "defaults");
const EVIDENCE = flag("--evidence");
const NO_CACHE = flag("--no-cache") || EVIDENCE;
const OUT_PATH = opt("--out", join(CORPUS_DIR, "eval-report.json"));
const QUIET = flag("--quiet");

if (!["train", "holdout", "all"].includes(SET)) {
  console.error(`unknown --set ${SET} (train|holdout|all)`);
  process.exit(1);
}
if (WRITE_BASELINE && CONFIG_PATH !== "defaults") {
  console.error("--write-baseline only makes sense with the defaults config");
  process.exit(1);
}

const { config, source: configSource } = loadConfig(CONFIG_PATH);
const hash = configHash(config);

// --- Cache ----------------------------------------------------------------
const cachePath = join(CACHE_DIR, `eval-${hash}.json`);
let cache = {};
if (!NO_CACHE && existsSync(cachePath)) {
  try {
    cache = JSON.parse(readFileSync(cachePath, "utf8"));
  } catch {
    cache = {};
  }
}

const pageStamp = (record) => {
  const stamp = (file) => {
    try {
      return statSync(join(record.dir, file)).mtimeMs;
    } catch {
      return 0;
    }
  };
  return `${stamp("source.html")}:${stamp("expected.md")}`;
};

// --- Evaluate -------------------------------------------------------------
const pages = scorablePages(SET);
if (pages.length === 0) {
  console.error(`no scorable pages in set "${SET}"`);
  process.exit(1);
}

const rows = [];
let cacheHits = 0;

for (const record of pages) {
  const stamp = pageStamp(record);
  const cached = cache[record.id];
  if (!NO_CACHE && cached && cached.stamp === stamp) {
    rows.push(cached.row);
    cacheHits++;
    continue;
  }

  const page = loadPageContent(record);
  const host = createExtractionHost(page.html, page.url);
  let row;
  try {
    const { body } = host.extract(config);
    const score = scoreText(body || "", page.expected);
    row = {
      id: record.id,
      category: record.category,
      quality: record.quality,
      anchor: record.anchor,
      holdout: record.holdout,
      f1: round(score.f1),
      recall: round(score.recall),
      precision: round(score.precision),
      lenRatio: round(score.lenRatio, 3),
      missing: score.missing,
      extra: score.extra,
    };

    if (EVIDENCE) {
      const evidence = buildEvidence(host, config, body || "", page.expected);
      writeFileSync(
        join(record.dir, "evidence.json"),
        JSON.stringify(
          { generated_at: new Date().toISOString(), config_hash: hash, f1: row.f1, ...evidence },
          null,
          2,
        ) + "\n",
      );
      row.extra_sources = evidence.extra_blocks.filter((b) => b.source).length;
      row.missing_attributed = evidence.missing_blocks.filter(
        (b) => b.attribution !== "unknown",
      ).length;
    }
  } catch (error) {
    row = {
      id: record.id,
      category: record.category,
      quality: record.quality,
      anchor: record.anchor,
      holdout: record.holdout,
      f1: 0,
      recall: 0,
      precision: 0,
      lenRatio: 0,
      missing: 999,
      extra: 999,
      error: String(error?.message || error),
    };
  } finally {
    host.close();
  }

  rows.push(row);
  cache[record.id] = { stamp, row };
  if (!QUIET) {
    const err = row.error ? `  ERROR ${row.error}` : "";
    console.log(`  ${row.f1.toFixed(3)}  ${record.id}${err}`);
  }
}

if (!NO_CACHE) {
  mkdirSync(CACHE_DIR, { recursive: true });
  writeFileSync(cachePath, JSON.stringify(cache) + "\n");
}

// --- Summaries ------------------------------------------------------------
const summary = summarize(rows);
const byCategory = {};
for (const row of rows) {
  (byCategory[row.category] ||= []).push(row);
}
const categorySummaries = Object.fromEntries(
  Object.entries(byCategory)
    .sort()
    .map(([category, list]) => [
      category,
      { pages: list.length, f1: round(summarize(list).f1) },
    ]),
);

// --- Gates vs baseline ------------------------------------------------------
let baseline = null;
let gates = { checked: false, passed: true, violations: [] };

if (existsSync(BASELINE_PATH) && !WRITE_BASELINE) {
  baseline = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
  const violations = [];

  if (baseline.sources_hash !== EXTRACTOR_SOURCES_HASH) {
    violations.push({
      gate: "stale-baseline",
      detail:
        "extension sources changed since eval-baseline.json was written; re-run --write-baseline on the pre-change code or intentionally refresh it",
    });
  }

  const baseRows = new Map((baseline.rows || []).map((r) => [r.id, r]));

  for (const row of rows) {
    const base = baseRows.get(row.id);

    if (row.anchor) {
      if (row.f1 < ANCHOR_MIN_F1) {
        violations.push({
          gate: "anchor-absolute",
          page: row.id,
          detail: `anchor page f1 ${row.f1} < ${ANCHOR_MIN_F1}`,
        });
      }
      if (base && row.f1 < base.f1 - ANCHOR_DROP_TOLERANCE) {
        violations.push({
          gate: "anchor-regression",
          page: row.id,
          detail: `anchor page f1 ${row.f1} dropped from baseline ${base.f1}`,
        });
      }
    }

    if (base && row.f1 < base.f1 - PAGE_DROP_TOLERANCE) {
      violations.push({
        gate: "page-regression",
        page: row.id,
        detail: `f1 ${row.f1} dropped from baseline ${base.f1} (tolerance ${PAGE_DROP_TOLERANCE})`,
      });
    }
  }

  for (const [category, list] of Object.entries(byCategory)) {
    const baseList = (baseline.rows || []).filter(
      (r) => r.category === category && list.some((row) => row.id === r.id),
    );
    if (!baseList.length) continue;
    const currentMean = summarize(list).f1;
    const baseMean = summarize(baseList).f1;
    if (currentMean < baseMean - CATEGORY_DROP_TOLERANCE) {
      violations.push({
        gate: "category-regression",
        category,
        detail: `mean f1 ${round(currentMean)} < baseline ${round(baseMean)} - ${CATEGORY_DROP_TOLERANCE}`,
      });
    }
  }

  gates = { checked: true, passed: violations.length === 0, violations };
}

// --- Output ------------------------------------------------------------------
const report = {
  generated_at: new Date().toISOString(),
  config_source: configSource,
  config_hash: hash,
  sources_hash: EXTRACTOR_SOURCES_HASH,
  set: SET,
  cache_hits: cacheHits,
  summary: {
    pages: summary.pages,
    f1: round(summary.f1),
    recall: round(summary.recall),
    precision: round(summary.precision),
    lenRatio: round(summary.lenRatio, 3),
    missing: round(summary.missing, 2),
    extra: round(summary.extra, 2),
    objective: round(summary.objective, 1),
  },
  // Baseline objective recomputed over exactly the pages in this run, so
  // train-set candidates are compared against the baseline's train subset.
  baseline_objective: baseline
    ? (() => {
        const ids = new Set(rows.map((r) => r.id));
        const subset = (baseline.rows || []).filter((r) => ids.has(r.id));
        return subset.length ? round(summarize(subset).objective, 1) : null;
      })()
    : null,
  by_category: categorySummaries,
  gates,
  worst_pages: rows
    .slice()
    .sort((a, b) => a.f1 - b.f1)
    .slice(0, 15),
  rows,
};

writeFileSync(OUT_PATH, JSON.stringify(report, null, 2) + "\n");

if (WRITE_BASELINE) {
  writeFileSync(
    BASELINE_PATH,
    JSON.stringify(
      {
        generated_at: report.generated_at,
        config_hash: hash,
        sources_hash: EXTRACTOR_SOURCES_HASH,
        summary: report.summary,
        by_category: categorySummaries,
        rows,
      },
      null,
      2,
    ) + "\n",
  );
  console.log(`wrote ${BASELINE_PATH} (${rows.length} pages)`);
}

console.log(
  `${SET}: pages=${report.summary.pages} F1=${report.summary.f1} P=${report.summary.precision} R=${report.summary.recall} obj=${report.summary.objective}${cacheHits ? ` (cache hits: ${cacheHits})` : ""}`,
);
if (gates.checked) {
  console.log(`gates: ${gates.passed ? "PASS" : "FAIL"}`);
  for (const v of gates.violations) {
    console.log(`  ${v.gate}  ${v.page || v.category || ""}  ${v.detail}`);
  }
}
console.log(`report: ${OUT_PATH}`);

process.exit(gates.checked && !gates.passed ? 2 : 0);
