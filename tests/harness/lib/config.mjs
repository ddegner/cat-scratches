// Candidate config handling. A candidate config is JSON with any subset of:
//   { "selectors": [...], "filters": [...], "cleanupRules": [...] }
// Missing keys resolve to the shipped defaults from defaults.js, so a config
// file only needs to carry what it changes.

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { defaultSettings, EXTRACTOR_SOURCES_HASH } from "./extractor-host.mjs";

export function defaultConfig() {
  const settings = defaultSettings();
  return {
    selectors: settings.contentExtraction.customSelectors,
    filters: settings.advancedFiltering.customFilters,
    cleanupRules: settings.advancedFiltering.textCleanupRules,
  };
}

export function resolveConfig(partial = {}) {
  const base = defaultConfig();
  const pick = (key) => {
    if (partial[key] === undefined) return base[key];
    if (!Array.isArray(partial[key]) || partial[key].some((s) => typeof s !== "string")) {
      throw new Error(`config.${key} must be an array of strings`);
    }
    return partial[key].map((s) => s.trim()).filter(Boolean);
  };
  return {
    selectors: pick("selectors"),
    filters: pick("filters"),
    cleanupRules: pick("cleanupRules"),
  };
}

export function loadConfig(path) {
  if (!path || path === "defaults") return { config: resolveConfig(), source: "defaults" };
  const parsed = JSON.parse(readFileSync(path, "utf8"));
  // Accept either a bare config or a wrapper written by propose.mjs.
  const partial = parsed.config && typeof parsed.config === "object" ? parsed.config : parsed;
  return { config: resolveConfig(partial), source: path };
}

// Hash covers the resolved lists AND the extension sources, so cached
// results and baselines go stale when content-extractor.js itself changes.
export function configHash(config) {
  return createHash("sha1")
    .update(EXTRACTOR_SOURCES_HASH)
    .update(JSON.stringify([config.selectors, config.filters, config.cleanupRules]))
    .digest("hex")
    .slice(0, 12);
}

// Diff two resolved configs, for compact ledger entries.
export function diffConfigs(base, candidate) {
  const diff = {};
  for (const key of ["selectors", "filters", "cleanupRules"]) {
    const baseSet = new Set(base[key]);
    const candSet = new Set(candidate[key]);
    const added = candidate[key].filter((s) => !baseSet.has(s));
    const removed = base[key].filter((s) => !candSet.has(s));
    const reordered =
      added.length === 0 &&
      removed.length === 0 &&
      JSON.stringify(base[key]) !== JSON.stringify(candidate[key]);
    if (added.length || removed.length || reordered) {
      diff[key] = { added, removed, reordered };
    }
  }
  return diff;
}
