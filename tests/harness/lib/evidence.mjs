// Evidence generation: turns per-page score deltas into actionable facts.
//
// For every EXTRA block (junk in extracted.md that isn't in expected.md) we
// walk the DOM to find the element that produced it and emit candidate CSS
// filters at several specificities.
//
// For every MISSING block (expected text absent from the output) we attribute
// the loss to one of: an existing filter (element or ancestor matches it), a
// text cleanup rule (block survives extraction with rules disabled), the
// content-root selection ("selector-scope"), or "not-in-source" (the text
// isn't in the server-rendered HTML at all).

import { blocks, tokens, containment, stripLinkTargets } from "./scoring.mjs";
import { validateFilters, findWinningSelector, settingsFromConfig } from "./extractor-host.mjs";

const BLOCK_MATCH_THRESHOLD = 0.3; // same as evaluate.mjs missing/extra definition
const SOURCE_CONTAINMENT = 0.8; // element must contain >=80% of block tokens
const PRESENCE_CONTAINMENT = 0.6; // block counts as "present" in a text at >=60%

// Classes far too generic to ever suggest as filters — stripping these would
// nuke real content on other sites.
const GENERIC_CLASSES = new Set([
  "content", "article", "main", "post", "entry", "body", "text", "story",
  "wrapper", "container", "inner", "outer", "row", "col", "column", "grid",
  "flex", "block", "section", "item", "list", "link", "active", "hidden",
  "visible", "left", "right", "center", "top", "bottom", "small", "large",
  "wide", "full", "dark", "light", "first", "last", "clearfix", "group",
]);

const INTERESTING_DATA_ATTRS = ["data-testid", "data-component", "data-module", "data-block", "data-element"];

// Elements whose text is data, not rendered content. Including them in the
// descent makes junk blocks map to whatever element carries a JSON payload.
const NON_RENDERED = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE"]);

function saneToken(value) {
  return /^[A-Za-z_][\w-]*$/.test(value || "");
}

function looksHashed(cls) {
  // css-18crmh6, sc-bdVaJa, _1x9d2 — generated class names that vary per build.
  return /\d/.test(cls) && (/^(css|sc|jsx|_)/i.test(cls) || /[a-z]\d|\d[a-z]/i.test(cls));
}

// Memoized rendered-text token lists per element (script/style excluded).
// One index per document; descent and suggestion guards share it.
export function createTextIndex() {
  const cache = new WeakMap();

  function renderedText(node) {
    if (node.nodeType === 3) return node.nodeValue || "";
    if (node.nodeType !== 1 || NON_RENDERED.has(node.nodeName)) return "";
    if (cache.has(node)) return cache.get(node).text;
    let text = "";
    for (const child of node.childNodes) text += " " + renderedText(child);
    const entry = { text, tokens: null };
    cache.set(node, entry);
    return text;
  }

  return function elementTokens(element) {
    renderedText(element);
    const entry = cache.get(element);
    if (!entry) return [];
    if (!entry.tokens) entry.tokens = tokens(entry.text);
    return entry.tokens;
  };
}

// Greedy descent: keep stepping into the child that still contains >=80% of
// the block's tokens; the deepest such element is the block's source.
export function findSourceElement(root, blockTokenList, elementTokens) {
  // 3-token blocks are mappable because containment >= 0.8 then requires
  // ALL three tokens — proportionally stricter than for long blocks.
  if (!root || blockTokenList.length < 3) return null;
  if (containment(blockTokenList, elementTokens(root)) < SOURCE_CONTAINMENT) return null;

  let current = root;
  for (;;) {
    let next = null;
    let nextScore = 0;
    for (const child of current.children) {
      if (NON_RENDERED.has(child.nodeName)) continue;
      const score = containment(blockTokenList, elementTokens(child));
      if (score >= SOURCE_CONTAINMENT && score > nextScore) {
        next = child;
        nextScore = score;
      }
    }
    if (!next) return current;
    current = next;
  }
}

export function describeElement(element) {
  if (!element) return null;
  const classes = [...(element.classList || [])];
  const dataAttrs = {};
  for (const attr of INTERESTING_DATA_ATTRS) {
    const value = element.getAttribute?.(attr);
    if (value) dataAttrs[attr] = value;
  }
  return {
    tag: element.tagName?.toLowerCase() || "",
    id: element.id || "",
    classes,
    dataAttrs,
  };
}

function domPath(element, depth = 4) {
  const parts = [];
  let node = element;
  while (node && node.tagName && parts.length < depth) {
    let part = node.tagName.toLowerCase();
    if (node.id) part += `#${node.id}`;
    else if (node.classList?.length) part += `.${[...node.classList].slice(0, 2).join(".")}`;
    parts.push(part);
    node = node.parentElement;
  }
  return parts.join(" < ");
}

// Candidate filter selectors for a junk element, most specific first.
// Walks up to 3 ancestors because the removable unit is often a wrapper —
// but never past a node that also holds real (expected) content, so we
// don't suggest stripping the container the article lives in.
const EXPECTED_CONTENT_GUARD = 25; // node with >=25 expected tokens is content-bearing

export function suggestFilters(element, { elementTokens, expectedTokenSet } = {}) {
  const suggestions = [];
  const seen = new Set();
  const add = (selector) => {
    if (selector && !seen.has(selector) && suggestions.length < 8) {
      seen.add(selector);
      suggestions.push(selector);
    }
  };

  const holdsExpectedContent = (node) => {
    if (!elementTokens || !expectedTokenSet || expectedTokenSet.size === 0) return false;
    let hits = 0;
    for (const t of elementTokens(node)) {
      if (expectedTokenSet.has(t) && ++hits >= EXPECTED_CONTENT_GUARD) return true;
    }
    return false;
  };

  let node = element;
  for (let level = 0; node && node.tagName && level < 4; level++, node = node.parentElement) {
    const tag = node.tagName.toLowerCase();
    if (["body", "html", "article", "main"].includes(tag)) break;
    if (holdsExpectedContent(node)) break;

    for (const attr of INTERESTING_DATA_ATTRS) {
      const value = node.getAttribute?.(attr);
      if (value && saneToken(value)) add(`[${attr}="${value}"]`);
    }

    if (node.id && saneToken(node.id) && !looksHashed(node.id)) add(`#${node.id}`);

    for (const cls of node.classList || []) {
      if (!saneToken(cls) || cls.length < 4) continue;
      if (GENERIC_CLASSES.has(cls.toLowerCase())) continue;
      if (looksHashed(cls)) {
        const stem = cls.replace(/^(css|sc|jsx)-/i, "").replace(/\d+$/, "");
        if (stem.length >= 5) add(`[class*="${stem}"]`);
        continue;
      }
      add(`.${cls}`);
    }
  }

  return suggestions;
}

// Preserve real line boundaries: cleanup `line:` rules match one physical
// line, so collapsing newlines here misleads whoever authors the rule.
// (JSON encodes them visibly as \n.)
const snippet = (text, max = 220) =>
  (text || "")
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join("\n")
    .slice(0, max);

function blockPresentIn(blockTokenList, textTokenSet) {
  return containment(blockTokenList, textTokenSet) >= PRESENCE_CONTAINMENT;
}

/**
 * Build evidence for one page.
 * @param {object} host       live extraction host (lib/extractor-host.mjs)
 * @param {object} config     resolved candidate config
 * @param {string} extracted  markdown the extractor produced with `config`
 * @param {string} expected   ground-truth markdown
 */
export function buildEvidence(host, config, extracted, expected) {
  const doc = host.document;
  const settings = settingsFromConfig(config);
  const winner = findWinningSelector(doc, settings);
  const validFilters = validateFilters(doc, config.filters);

  const extractedStripped = stripLinkTargets(extracted);
  const expectedStripped = stripLinkTargets(expected);
  const extractedTokenSet = new Set(tokens(extractedStripped));
  const expectedTokenSet = new Set(tokens(expectedStripped));
  const elementTokens = createTextIndex();
  const suggestContext = { elementTokens, expectedTokenSet };

  // --- Extra blocks: junk that leaked into the output --------------------
  const extra = [];
  const extraByText = new Map();
  for (const block of blocks(extractedStripped)) {
    const blockTokenList = tokens(block);
    if (blockTokenList.length === 0) continue;
    if (containment(blockTokenList, expectedTokenSet) >= BLOCK_MATCH_THRESHOLD) continue;

    const key = snippet(block);
    const existing = extraByText.get(key);
    if (existing) {
      existing.count += 1;
      continue;
    }

    const source = findSourceElement(doc.body || doc.documentElement, blockTokenList, elementTokens);
    const entry = {
      text: key,
      count: 1,
      tokens: blockTokenList.length,
      source: source ? describeElement(source) : null,
      dom_path: source ? domPath(source) : null,
      suggested_filters: source ? suggestFilters(source, suggestContext) : [],
    };
    extraByText.set(key, entry);
    extra.push(entry);
  }

  // --- Missing blocks: expected text that got dropped --------------------
  // Re-extract without cleanup rules once, lazily, to attribute rule losses.
  let noRulesTokenSet = null;
  let noRulesBody = null;
  const ensureNoRulesExtraction = () => {
    if (noRulesTokenSet) return;
    const result = host.extract({ ...config, cleanupRules: [] });
    noRulesBody = stripLinkTargets(result.body || "");
    noRulesTokenSet = new Set(tokens(noRulesBody));
  };

  const missing = [];
  for (const block of blocks(expectedStripped)) {
    const blockTokenList = tokens(block);
    if (blockTokenList.length === 0) continue;
    if (containment(blockTokenList, extractedTokenSet) >= BLOCK_MATCH_THRESHOLD) continue;

    const entry = {
      text: snippet(block),
      tokens: blockTokenList.length,
      attribution: "unknown",
    };

    const source = findSourceElement(doc.body || doc.documentElement, blockTokenList, elementTokens);
    if (!source) {
      entry.attribution = "not-in-source";
      entry.detail = "text not found in server-rendered HTML (JS-rendered page or stale fixture?)";
      missing.push(entry);
      continue;
    }
    entry.dom_path = domPath(source);

    const removedBy = validFilters.filter((filter) => {
      try {
        return source.closest(filter) !== null;
      } catch {
        return false;
      }
    });
    if (removedBy.length) {
      entry.attribution = "filter";
      entry.removed_by_filters = removedBy;
      missing.push(entry);
      continue;
    }

    ensureNoRulesExtraction();
    if (blockPresentIn(blockTokenList, noRulesTokenSet)) {
      // A cleanup rule ate it. Apply rules one at a time to find the culprit.
      entry.attribution = "cleanup-rule";
      let text = noRulesBody;
      for (const rule of config.cleanupRules) {
        text = host.applyTextCleanupRules(text, [rule]);
        if (!blockPresentIn(blockTokenList, new Set(tokens(text)))) {
          entry.removed_by_rule = rule;
          break;
        }
      }
      missing.push(entry);
      continue;
    }

    // Present in the DOM, not removed by filters or rules: the winning
    // content root simply doesn't contain it (or min-length/link-ratio
    // gating rejected everything useful).
    entry.attribution = "selector-scope";
    entry.detail = `content root (${winner.selector || "body fallback"}) does not yield this text`;
    missing.push(entry);
  }

  return {
    winning_selector: winner.selector, // null = body fallback
    extra_blocks: extra,
    missing_blocks: missing,
  };
}
