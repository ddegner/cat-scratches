#!/usr/bin/env node
// Writes an accepted candidate config back into the extension's defaults.js:
// regenerates the BASE_SELECTORS, BASE_FILTERS and BASE_TEXT_CLEANUP_RULES
// array literals and bumps DEFAULTS_REVISION (which triggers the in-app
// settings migration for existing users).
//
//   node apply-defaults.mjs tests/corpus/candidates/<hash>.json [--no-bump]
//
// Safety: after writing, the new defaults.js is executed in a VM and the
// resulting lists must equal the candidate config exactly (modulo the
// trim+dedupe the extension itself applies); otherwise the original file is
// restored and the script fails.

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import vm from "node:vm";
import { EXT_DIR } from "./lib/corpus.mjs";
import { loadConfig } from "./lib/config.mjs";

const argv = process.argv.slice(2);
const CONFIG_PATH = argv.find((a) => !a.startsWith("--"));
const NO_BUMP = argv.includes("--no-bump");

if (!CONFIG_PATH) {
  console.error("usage: node apply-defaults.mjs <candidate-config.json> [--no-bump]");
  process.exit(1);
}

const { config } = loadConfig(CONFIG_PATH);
const DEFAULTS_PATH = join(EXT_DIR, "defaults.js");
const original = readFileSync(DEFAULTS_PATH, "utf8");

// --- Serializers ------------------------------------------------------------
function singleQuoted(value) {
  return `'${value.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`;
}

// Cleanup rules are regex-heavy; String.raw keeps them readable (single
// backslashes). Fall back to a JSON string when raw syntax can't hold the
// value verbatim.
function rawTemplate(value) {
  if (/[`]|\$\{/.test(value) || value.endsWith("\\")) return JSON.stringify(value);
  return `String.raw\`${value}\``;
}

function arrayLiteral(name, items, serialize) {
  const body = items.map((item) => `    ${serialize(item)}`).join(",\n");
  return `const ${name} = [\n${body}\n  ];`;
}

function replaceArray(source, name, literal) {
  const pattern = new RegExp(`const ${name} = \\[[\\s\\S]*?\\n  \\];`);
  if (!pattern.test(source)) throw new Error(`could not locate array ${name} in defaults.js`);
  return source.replace(pattern, literal);
}

// --- Rewrite ------------------------------------------------------------------
let next = original;
next = replaceArray(next, "BASE_SELECTORS", arrayLiteral("BASE_SELECTORS", config.selectors, singleQuoted));
next = replaceArray(next, "BASE_FILTERS", arrayLiteral("BASE_FILTERS", config.filters, singleQuoted));
next = replaceArray(
  next,
  "BASE_TEXT_CLEANUP_RULES",
  arrayLiteral("BASE_TEXT_CLEANUP_RULES", config.cleanupRules, rawTemplate),
);

let revision = null;
if (!NO_BUMP) {
  next = next.replace(/const DEFAULTS_REVISION = (\d+);/, (match, n) => {
    revision = Number(n) + 1;
    return `const DEFAULTS_REVISION = ${revision};`;
  });
  if (revision == null) throw new Error("could not locate DEFAULTS_REVISION");
}

writeFileSync(DEFAULTS_PATH, next);

// --- Round-trip verification ---------------------------------------------------
function loadLists(source) {
  const sandbox = { globalThis: {}, self: {} };
  sandbox.globalThis = sandbox;
  sandbox.self = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox);
  const settings = sandbox.getDefaultSettings();
  return {
    selectors: settings.contentExtraction.customSelectors,
    filters: settings.advancedFiltering.customFilters,
    cleanupRules: settings.advancedFiltering.textCleanupRules,
  };
}

// The extension dedupes via unique(); compare against the deduped candidate.
const dedupe = (list) => Array.from(new Set(list.map((s) => s.trim()).filter(Boolean)));

try {
  const written = loadLists(readFileSync(DEFAULTS_PATH, "utf8"));
  for (const key of ["selectors", "filters", "cleanupRules"]) {
    const want = dedupe(config[key]);
    const got = written[key];
    if (JSON.stringify(want) !== JSON.stringify(got)) {
      throw new Error(`round-trip mismatch in ${key}: wanted ${want.length} entries, defaults.js yields ${got.length}`);
    }
  }
} catch (error) {
  writeFileSync(DEFAULTS_PATH, original);
  console.error(`verification failed, defaults.js restored: ${error.message}`);
  process.exit(1);
}

console.log(
  `defaults.js updated: ${config.selectors.length} selectors, ${config.filters.length} filters, ${config.cleanupRules.length} rules${revision ? `, DEFAULTS_REVISION -> ${revision}` : ""}`,
);
console.log("note: eval-baseline.json is now stale — re-run `node evaluate.mjs --write-baseline` after verifying.");
