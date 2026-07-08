// Runs the real extension code (turndown.js + defaults.js +
// content-extractor.js) inside jsdom, exactly like run.mjs, but reusable
// and parameterized by a candidate config (selectors/filters/cleanupRules).

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import vm from "node:vm";
import { JSDOM, VirtualConsole } from "jsdom";
import { EXT_DIR } from "./corpus.mjs";

const TURNDOWN_SRC = readFileSync(join(EXT_DIR, "turndown.js"), "utf8");
const DEFAULTS_SRC = readFileSync(join(EXT_DIR, "defaults.js"), "utf8");
const EXTRACTOR_SRC = readFileSync(join(EXT_DIR, "content-extractor.js"), "utf8");

const QUIET_VIRTUAL_CONSOLE = new VirtualConsole();
QUIET_VIRTUAL_CONSOLE.on("jsdomError", () => {});

// Changes to the extension sources must invalidate caches and baselines.
export const EXTRACTOR_SOURCES_HASH = createHash("sha1")
  .update(TURNDOWN_SRC)
  .update(DEFAULTS_SRC)
  .update(EXTRACTOR_SRC)
  .digest("hex")
  .slice(0, 12);

export function defaultSettings() {
  const sandbox = { globalThis: {}, self: {} };
  sandbox.globalThis = sandbox;
  sandbox.self = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(DEFAULTS_SRC, sandbox);
  return sandbox.getDefaultSettings();
}

// Build extension settings from a resolved candidate config
// ({selectors, filters, cleanupRules}). Missing keys fall back to defaults.
export function settingsFromConfig(config = {}) {
  const settings = defaultSettings();
  if (Array.isArray(config.selectors)) {
    settings.contentExtraction.customSelectors = config.selectors;
  }
  if (Array.isArray(config.filters)) {
    settings.advancedFiltering.customFilters = config.filters;
  }
  if (Array.isArray(config.cleanupRules)) {
    settings.advancedFiltering.textCleanupRules = config.cleanupRules;
  }
  return settings;
}

// DOM-free access to applyTextCleanupRules / validateTextCleanupRules
// (they are pure text functions; only the selector pipeline needs jsdom).
let rulesSandbox = null;
function getRulesSandbox() {
  if (!rulesSandbox) {
    rulesSandbox = { globalThis: {}, self: {} };
    rulesSandbox.globalThis = rulesSandbox;
    rulesSandbox.self = rulesSandbox;
    vm.createContext(rulesSandbox);
    vm.runInContext(DEFAULTS_SRC, rulesSandbox);
    vm.runInContext(EXTRACTOR_SRC, rulesSandbox);
  }
  return rulesSandbox;
}

export function applyTextRules(content, rules) {
  return getRulesSandbox().applyTextCleanupRules(content, rules);
}

export function validateTextRules(rules) {
  return getRulesSandbox().validateTextCleanupRules(rules);
}

export function makeDom(html, url) {
  return new JSDOM(html, {
    url,
    pretendToBeVisual: true,
    virtualConsole: QUIET_VIRTUAL_CONSOLE,
  });
}

// A live sandbox bound to one parsed document. Reuse it for multiple
// extract() calls (e.g. with/without cleanup rules) to amortize the parse.
export function createExtractionHost(html, url) {
  const dom = makeDom(html, url);
  const { window } = dom;
  const sandbox = {
    window,
    document: window.document,
    globalThis: {},
    self: {},
    navigator: window.navigator,
    location: window.location,
    getSelection: () => window.getSelection?.(),
  };
  sandbox.globalThis = sandbox;
  sandbox.self = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(TURNDOWN_SRC, sandbox);
  vm.runInContext(DEFAULTS_SRC, sandbox);
  vm.runInContext(EXTRACTOR_SRC, sandbox);

  return {
    dom,
    window,
    document: window.document,
    extract(config = {}) {
      const settings = settingsFromConfig(config);
      return sandbox.extractContentFromDoc(window.document, settings, url);
    },
    applyTextCleanupRules(content, rules) {
      return sandbox.applyTextCleanupRules(content, rules);
    },
    close() {
      dom.window.close();
    },
  };
}

// One-shot convenience: parse, extract, close.
export function extractOnce(html, url, config = {}) {
  const host = createExtractionHost(html, url);
  try {
    return host.extract(config);
  } finally {
    host.close();
  }
}

// ---------------------------------------------------------------------------
// Winning-selector replica.
//
// content-extractor.js does not report which selector matched, so evidence
// generation replays the same first-qualifying-selector walk here. This
// mirrors extractContentFromDoc's selection logic (and ab-selectors.mjs's
// fast engine); it is advisory metadata, not part of scoring.
// ---------------------------------------------------------------------------

export function validateFilters(doc, filters) {
  const valid = [];
  for (const filter of filters || []) {
    if (typeof filter !== "string" || !filter.trim()) continue;
    try {
      doc.querySelector(filter.trim());
      valid.push(filter.trim());
    } catch {
      // Ignore invalid selectors, same as the extension.
    }
  }
  return valid;
}

export function removeFilteredDescendants(element, validFilters) {
  if (!element || !validFilters.length) return element;
  for (const filter of validFilters) {
    try {
      element.querySelectorAll(filter).forEach((el) => el.remove());
    } catch {
      // Ignore selector errors.
    }
  }
  return element;
}

function candidateMetrics(element, validFilters) {
  const candidate = removeFilteredDescendants(element.cloneNode(true), validFilters);
  const textLength = (candidate.textContent || "").trim().length;
  const linkLength = [...candidate.querySelectorAll("a")].reduce(
    (total, link) => total + (link.textContent || "").length,
    0,
  );
  const linkRatio = textLength > 0 ? linkLength / textLength : 1;
  return { textLength, linkRatio };
}

// Returns { selector, element } for the first selector that qualifies,
// or { selector: null, element: doc.body } for the body fallback.
export function findWinningSelector(doc, settings) {
  const selectors = settings?.contentExtraction?.customSelectors || [];
  const validFilters = validateFilters(doc, settings?.advancedFiltering?.customFilters || []);
  const minContentLength = settings?.advancedFiltering?.minContentLength ?? 150;
  const maxLinkRatio = settings?.advancedFiltering?.maxLinkRatio ?? 0.3;

  for (const selector of selectors) {
    let bestElement = null;
    let bestScore = 0;
    let elements;
    try {
      elements = doc.querySelectorAll(selector);
    } catch {
      continue;
    }

    for (const element of elements) {
      const { textLength, linkRatio } = candidateMetrics(element, validFilters);
      if (textLength < minContentLength || linkRatio > maxLinkRatio) continue;

      let score = textLength;
      if (element.tagName === "ARTICLE") score += 1000;
      if (element.getAttribute("role") === "main") score += 800;
      if (element.getAttribute("itemtype")) score += 600;

      const classAndId = `${element.getAttribute("class") || ""} ${element.id || ""}`.toLowerCase();
      if (
        classAndId.includes("article") ||
        classAndId.includes("content") ||
        classAndId.includes("post") ||
        classAndId.includes("entry")
      ) {
        score += 400;
      }
      if (
        classAndId.includes("nav") ||
        classAndId.includes("menu") ||
        classAndId.includes("header") ||
        classAndId.includes("footer")
      ) {
        score -= 2000;
      }

      if (score > bestScore) {
        bestScore = score;
        bestElement = element;
      }
    }

    if (bestElement) return { selector, element: bestElement };
  }

  return { selector: null, element: doc.body || doc.documentElement };
}
