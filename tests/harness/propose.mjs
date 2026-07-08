#!/usr/bin/env node
// Applies a structured patch to a base config, lints it, evaluates it on the
// train set, and records the experiment. This is the write-side of the
// optimization loop; evaluate.mjs is the read-side.
//
//   node propose.mjs --patch patch.json [--base <config.json>] [--note "why"]
//
// patch.json is {"note": "...", "ops": [...]} or a bare array of ops:
//   {"op": "add_filter",          "selector": ".newsletter-cta"}
//   {"op": "remove_filter",       "selector": "[class*=\"promo\"]"}
//   {"op": "insert_selector",     "selector": ".article-body", "index": 0}
//   {"op": "move_selector",       "selector": "article", "index": 40}
//   {"op": "remove_selector",     "selector": ".gated-content"}
//   {"op": "add_cleanup_rule",    "rule": "line:/^advertisement$/i"}
//   {"op": "remove_cleanup_rule", "rule": "line:/^advertisement$/i"}
//
// Verdicts (also the exit code):
//   0 accepted        — lint clean, gates pass, objective improved
//   2 rejected-eval   — gates failed or no improvement
//   3 rejected-lint   — a safety check failed (evaluation skipped)
//   1 error
//
// Every attempt is appended to tests/corpus/experiments.jsonl so the loop
// never retries a known-bad idea. Accepted configs land in
// tests/corpus/candidates/<hash>.json, ready for evaluate --set holdout and
// apply-defaults.mjs.

import { execFileSync } from "node:child_process";
import { appendFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { CORPUS_DIR, HARNESS_DIR, scorablePages, loadPageContent } from "./lib/corpus.mjs";
import { loadConfig, resolveConfig, configHash, diffConfigs } from "./lib/config.mjs";
import { lintFilterAdditions, lintRuleAdditions } from "./lib/lint.mjs";

const LEDGER_PATH = join(CORPUS_DIR, "experiments.jsonl");
const CANDIDATES_DIR = join(CORPUS_DIR, "candidates");

const argv = process.argv.slice(2);
const flag = (name) => argv.includes(name);
const opt = (name, fallback) => {
  const index = argv.indexOf(name);
  return index >= 0 && argv[index + 1] ? argv[index + 1] : fallback;
};

const PATCH_PATH = opt("--patch", null);
const BASE_PATH = opt("--base", "defaults");
const NOTE = opt("--note", "");
const ALLOW_NEUTRAL = flag("--allow-neutral"); // accept equal objective (e.g. pure cleanups)
const SKIP_LINT = flag("--skip-lint");

if (!PATCH_PATH) {
  console.error("usage: node propose.mjs --patch patch.json [--base config.json] [--note ...]");
  process.exit(1);
}

const patchRaw = JSON.parse(readFileSync(PATCH_PATH, "utf8"));
const ops = Array.isArray(patchRaw) ? patchRaw : patchRaw.ops;
const note = NOTE || (Array.isArray(patchRaw) ? "" : patchRaw.note || "");
if (!Array.isArray(ops) || ops.length === 0) {
  console.error("patch must contain a non-empty ops array");
  process.exit(1);
}

// --- Apply ops --------------------------------------------------------------
const { config: base } = loadConfig(BASE_PATH);
const candidate = {
  selectors: base.selectors.slice(),
  filters: base.filters.slice(),
  cleanupRules: base.cleanupRules.slice(),
};

function applyOp(op) {
  const need = (value, name) => {
    if (typeof value !== "string" || !value.trim()) throw new Error(`op ${op.op}: missing ${name}`);
    return value.trim();
  };
  switch (op.op) {
    case "add_filter": {
      const selector = need(op.selector, "selector");
      if (candidate.filters.includes(selector)) throw new Error(`filter already present: ${selector}`);
      candidate.filters.push(selector);
      break;
    }
    case "remove_filter": {
      const selector = need(op.selector, "selector");
      const index = candidate.filters.indexOf(selector);
      if (index < 0) throw new Error(`filter not found: ${selector}`);
      candidate.filters.splice(index, 1);
      break;
    }
    case "insert_selector": {
      const selector = need(op.selector, "selector");
      if (candidate.selectors.includes(selector)) throw new Error(`selector already present: ${selector}`);
      const index = Number.isInteger(op.index) ? op.index : 0;
      candidate.selectors.splice(Math.max(0, Math.min(index, candidate.selectors.length)), 0, selector);
      break;
    }
    case "move_selector": {
      const selector = need(op.selector, "selector");
      const from = candidate.selectors.indexOf(selector);
      if (from < 0) throw new Error(`selector not found: ${selector}`);
      if (!Number.isInteger(op.index)) throw new Error("move_selector needs integer index");
      candidate.selectors.splice(from, 1);
      candidate.selectors.splice(Math.max(0, Math.min(op.index, candidate.selectors.length)), 0, selector);
      break;
    }
    case "remove_selector": {
      const selector = need(op.selector, "selector");
      const index = candidate.selectors.indexOf(selector);
      if (index < 0) throw new Error(`selector not found: ${selector}`);
      candidate.selectors.splice(index, 1);
      break;
    }
    case "add_cleanup_rule": {
      const rule = need(op.rule, "rule");
      if (candidate.cleanupRules.includes(rule)) throw new Error(`rule already present`);
      candidate.cleanupRules.push(rule);
      break;
    }
    case "remove_cleanup_rule": {
      const rule = need(op.rule, "rule");
      const index = candidate.cleanupRules.indexOf(rule);
      if (index < 0) throw new Error(`rule not found: ${rule}`);
      candidate.cleanupRules.splice(index, 1);
      break;
    }
    default:
      throw new Error(`unknown op: ${op.op}`);
  }
}

try {
  ops.forEach(applyOp);
} catch (error) {
  console.error(`patch error: ${error.message}`);
  process.exit(1);
}

const resolved = resolveConfig(candidate);
const hash = configHash(resolved);
const diff = diffConfigs(base, resolved);

function record(verdict, extra = {}) {
  const entry = {
    ts: new Date().toISOString(),
    note,
    ops,
    base: BASE_PATH,
    config_hash: hash,
    verdict,
    ...extra,
  };
  appendFileSync(LEDGER_PATH, JSON.stringify(entry) + "\n");
  return entry;
}

// --- Lint ---------------------------------------------------------------------
if (!SKIP_LINT) {
  const addedFilters = diff.filters?.added || [];
  const addedRules = diff.cleanupRules?.added || [];
  if (addedFilters.length || addedRules.length) {
    console.log(`linting ${addedFilters.length} filters, ${addedRules.length} rules…`);
    const pages = scorablePages("train").map(loadPageContent);
    const violations = [
      ...lintFilterAdditions(addedFilters, pages),
      ...lintRuleAdditions(addedRules, pages),
    ];
    if (violations.length) {
      record("rejected-lint", { violations });
      console.log("REJECTED (lint):");
      for (const v of violations.slice(0, 10)) {
        console.log(`  ${v.check}  ${v.filter || v.rule || ""}  ${v.page || ""}  ${v.detail}`);
      }
      process.exit(3);
    }
  }
}

// --- Evaluate -------------------------------------------------------------------
mkdirSync(CANDIDATES_DIR, { recursive: true });
const configPath = join(CANDIDATES_DIR, `${hash}.json`);
writeFileSync(
  configPath,
  JSON.stringify({ note, ops, base: BASE_PATH, config: resolved }, null, 2) + "\n",
);

const reportPath = join(HARNESS_DIR, ".cache", `report-${hash}.json`);
console.log(`evaluating candidate ${hash} on train set…`);
try {
  execFileSync(
    process.execPath,
    ["--max-old-space-size=8192", join(HARNESS_DIR, "evaluate.mjs"),
      "--config", configPath, "--set", "train", "--out", reportPath, "--quiet"],
    { stdio: ["ignore", "inherit", "inherit"] },
  );
} catch (error) {
  // exit code 2 = gates failed; report still written. Anything else is fatal.
  if (error.status !== 2) {
    record("error", { detail: String(error.message || error) });
    process.exit(1);
  }
}

const report = JSON.parse(readFileSync(reportPath, "utf8"));
const objective = report.summary.objective;
const baselineObjective = report.baseline_objective;
const improved =
  baselineObjective == null ||
  (ALLOW_NEUTRAL ? objective >= baselineObjective : objective > baselineObjective);

const verdict = report.gates.passed && improved ? "accepted" : "rejected-eval";
record(verdict, {
  summary: report.summary,
  baseline_objective: baselineObjective,
  gates: report.gates,
  diff,
});

if (verdict === "accepted") {
  console.log(`ACCEPTED  obj ${baselineObjective} -> ${objective}  (${configPath})`);
  console.log("next steps:");
  console.log(`  node evaluate.mjs --config ${configPath} --set holdout   # final check`);
  console.log(`  node apply-defaults.mjs ${configPath}                    # write into defaults.js`);
  process.exit(0);
} else {
  const reason = !report.gates.passed
    ? `gates failed (${report.gates.violations.length} violations)`
    : `objective ${objective} did not beat baseline ${baselineObjective}`;
  console.log(`REJECTED (eval): ${reason}`);
  process.exit(2);
}
