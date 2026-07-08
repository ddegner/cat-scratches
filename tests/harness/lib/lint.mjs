// Safety linter for proposed config changes. These are hard pre-checks that
// run BEFORE the (slower) evaluation, and they encode the footguns a
// mechanical optimization loop must never be allowed to commit:
//
//   - a new filter that matches real article content anywhere in the corpus
//   - a new filter so broad it matches hundreds of nodes on one page
//   - a new cleanup rule that deletes text from any expected.md
//   - syntactically invalid selectors / rules

import { makeDom, validateTextRules, applyTextRules } from "./extractor-host.mjs";
import { tokens, stripLinkTargets } from "./scoring.mjs";
import { createTextIndex } from "./evidence.mjs";

const EXPECTED_HIT_GUARD = 25;
const MAX_MATCHES_PER_PAGE = 400;
const MAX_RULE_DELETION_CHARS = 40;

// Presentational / utility class names that must never become filters. On the
// corpus they may look "safe" (no page happens to wrap body text in them), but
// on the open web they routinely style article bodies — stripping them would
// delete real content on sites the corpus can't see. This enforces the
// utility-class prohibition in code, instead of trusting the model to obey it.
const U = "[\\w-]*"; // utility value suffix, may contain hyphens (grid-cols-2, rounded-lg)
const UTILITY_CLASS_RE = new RegExp(
  "(^|[\\s.#\\[])(?:" +
    // typography / color / weight
    `font-${U}|text-${U}|leading-${U}|tracking-${U}|(?:text|bg|border|fill|stroke)-(?:left|right|center|serif|sans|mono|xs|sm|base|lg|xl|\\d)${U}|` +
    "italic|bold|semibold|medium|light|uppercase|lowercase|capitalize|underline|truncate|prose[\\w-]*|" +
    // layout / flex / grid / spacing / sizing
    `flex|flex-${U}|grid|grid-${U}|row|col|col-${U}|column|columns|gap-${U}|order-${U}|` +
    `[mp][trblxy]?-${U}|space-[xy]-${U}|w-${U}|h-${U}|min-[wh]-${U}|max-[wh]-${U}|inset-${U}|` +
    `top-${U}|bottom-${U}|left-${U}|right-${U}|z-${U}|` +
    // display / position / alignment
    "block|inline|inline-block|hidden|relative|absolute|fixed|sticky|static|" +
    `items-${U}|justify-${U}|content-${U}|self-${U}|place-${U}|` +
    // rounding / shadow / opacity / misc presentational
    `rounded[\\w-]*|shadow[\\w-]*|opacity-${U}|container|wrapper|clearfix|` +
    "first|last|active|disabled|visible|dark|light|small|large|wide|full|half" +
    ")([\\s.#:\\[>+~]|$)",
  "i",
);

function utilityClassViolation(filter) {
  // Only guards class/compound selectors; ids and [data-*]/[aria-*]/[itemprop]
  // attribute selectors are intentional and specific, never utility noise.
  const trimmed = String(filter || "").trim();
  if (!/(^|[\s>+~])\./.test(trimmed) && !/\.\w/.test(trimmed)) return null;
  UTILITY_CLASS_RE.lastIndex = 0;
  if (UTILITY_CLASS_RE.test(trimmed)) {
    return {
      check: "utility-class",
      filter: trimmed,
      detail:
        "selector names a presentational/layout utility class; stripping it risks deleting real content on sites outside the corpus",
    };
  }
  return null;
}

// pages: loaded page contents (loadPageContent). Returns violations array.
export function lintFilterAdditions(addedFilters, pages) {
  const violations = [];
  if (!addedFilters.length) return violations;

  // Static check first — no DOM needed, and it catches corpus-blind footguns
  // the content-overlap check cannot.
  const utilityFlagged = new Set();
  for (const filter of addedFilters) {
    const violation = utilityClassViolation(filter);
    if (violation) {
      violations.push(violation);
      utilityFlagged.add(filter);
    }
  }
  const remainingFilters = addedFilters.filter((f) => !utilityFlagged.has(f));
  if (!remainingFilters.length) return violations;

  for (const record of pages) {
    const dom = makeDom(record.html, record.url);
    const doc = dom.window.document;
    const elementTokens = createTextIndex();
    const expectedTokenSet = new Set(tokens(stripLinkTargets(record.expected)));

    for (const filter of remainingFilters) {
      let matches;
      try {
        matches = doc.querySelectorAll(filter);
      } catch {
        if (!violations.some((v) => v.check === "invalid-selector" && v.filter === filter)) {
          violations.push({ check: "invalid-selector", filter, detail: "querySelectorAll rejects this selector" });
        }
        continue;
      }
      if (matches.length > MAX_MATCHES_PER_PAGE) {
        violations.push({
          check: "too-broad",
          filter,
          page: record.id,
          detail: `matches ${matches.length} elements (limit ${MAX_MATCHES_PER_PAGE})`,
        });
        continue;
      }
      for (const element of matches) {
        let hits = 0;
        let risky = false;
        for (const t of elementTokens(element)) {
          if (expectedTokenSet.has(t) && ++hits >= EXPECTED_HIT_GUARD) {
            risky = true;
            break;
          }
        }
        if (risky) {
          violations.push({
            check: "matches-expected-content",
            filter,
            page: record.id,
            detail: `matched element carries >=${EXPECTED_HIT_GUARD} tokens of this page's expected content`,
            sample: (element.textContent || "").replace(/\s+/g, " ").trim().slice(0, 120),
          });
          break;
        }
      }
    }
    dom.window.close();
  }

  return violations;
}

// Cleanup rules operate on the final markdown, so the direct safety test is:
// applying the new rules to every expected.md must be (nearly) a no-op —
// expected.md is by definition text we want to keep.
export function lintRuleAdditions(addedRules, pages) {
  const violations = [];
  if (!addedRules.length) return violations;

  for (const error of validateTextRules(addedRules)) {
    violations.push({ check: "invalid-rule", rule: error.rule, detail: error.error });
  }
  if (violations.length) return violations;

  for (const record of pages) {
    for (const rule of addedRules) {
      const before = record.expected;
      const after = applyTextRules(before, [rule]);
      const deleted = before.length - after.length;
      if (deleted > MAX_RULE_DELETION_CHARS) {
        violations.push({
          check: "rule-eats-expected-content",
          rule,
          page: record.id,
          detail: `deletes ${deleted} chars from expected.md (limit ${MAX_RULE_DELETION_CHARS})`,
        });
      }
    }
  }

  return violations;
}
