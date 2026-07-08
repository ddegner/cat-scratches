#!/usr/bin/env node
// Aggregates per-page evidence.json files (written by `evaluate.mjs
// --evidence`) into a ranked list of candidate changes:
//
//   1. ADD-FILTER candidates: selectors suggested for junk blocks, ranked by
//      how many pages they'd help, each risk-checked against every scored
//      page ("would this selector also match real expected content?").
//   2. REMOVE/NARROW-FILTER candidates: existing filters that evidence says
//      are eating expected content.
//   3. RULE candidates: cleanup rules eating expected content, plus junk
//      blocks that have no DOM-level filter (candidates for new rules).
//
// Writes tests/corpus/mined-candidates.json + MINED_CANDIDATES.md.
// Purely mechanical — no model involved. The optimization loop reads the
// ranked JSON and feeds the top safe candidates to propose.mjs.

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { CORPUS_DIR, scorablePages, loadPageContent, readJsonSafe } from "./lib/corpus.mjs";
import { makeDom } from "./lib/extractor-host.mjs";
import { tokens, stripLinkTargets } from "./lib/scoring.mjs";
import { createTextIndex } from "./lib/evidence.mjs";

const EXPECTED_HIT_GUARD = 25; // matched element carrying >=25 expected tokens = risky
const MAX_MATCHES_PER_PAGE = 400; // a selector matching more than this is wildly broad

const argv = process.argv.slice(2);
const flag = (name) => argv.includes(name);
const SKIP_RISK_CHECK = flag("--no-risk-check");

const pages = scorablePages("all");
const withEvidence = [];
for (const record of pages) {
  const evidence = readJsonSafe(join(record.dir, "evidence.json"));
  if (evidence) withEvidence.push({ record, evidence });
}

if (withEvidence.length === 0) {
  console.error("no evidence.json files found — run `node evaluate.mjs --evidence` first");
  process.exit(1);
}

// --- 1. Aggregate ADD-FILTER candidates ------------------------------------
const addCandidates = new Map(); // selector -> {pages: Map<id, {blocks, samples}>}

for (const { record, evidence } of withEvidence) {
  for (const block of evidence.extra_blocks || []) {
    for (const selector of block.suggested_filters || []) {
      let entry = addCandidates.get(selector);
      if (!entry) {
        entry = { selector, pages: new Map() };
        addCandidates.set(selector, entry);
      }
      let pageEntry = entry.pages.get(record.id);
      if (!pageEntry) {
        pageEntry = { blocks: 0, samples: [] };
        entry.pages.set(record.id, pageEntry);
      }
      pageEntry.blocks += block.count || 1;
      if (pageEntry.samples.length < 2) pageEntry.samples.push(block.text.slice(0, 120));
    }
  }
}

// --- 2. Aggregate harmful existing filters and rules ------------------------
const harmfulFilters = new Map(); // filter -> [{page, text}]
const harmfulRules = new Map(); // rule -> [{page, text}]
const unattributedJunk = []; // extra blocks with no suggested filter → rule material

for (const { record, evidence } of withEvidence) {
  for (const block of evidence.missing_blocks || []) {
    if (block.attribution === "filter") {
      for (const filter of block.removed_by_filters || []) {
        (harmfulFilters.get(filter) || harmfulFilters.set(filter, []).get(filter)).push({
          page: record.id,
          text: block.text.slice(0, 120),
        });
      }
    }
    if (block.attribution === "cleanup-rule" && block.removed_by_rule) {
      (harmfulRules.get(block.removed_by_rule) ||
        harmfulRules.set(block.removed_by_rule, []).get(block.removed_by_rule)).push({
        page: record.id,
        text: block.text.slice(0, 120),
      });
    }
  }
  for (const block of evidence.extra_blocks || []) {
    if ((block.suggested_filters || []).length === 0 && block.tokens >= 3) {
      unattributedJunk.push({ page: record.id, text: block.text.slice(0, 140), count: block.count });
    }
  }
}

// --- 3. Risk-check ADD-FILTER candidates across all scored pages ------------
// A candidate is risky if, on any page, it matches an element whose rendered
// text contains a substantial amount of that page's expected content.
const candidates = [...addCandidates.values()].map((entry) => ({
  selector: entry.selector,
  pages_helped: entry.pages.size,
  junk_blocks: [...entry.pages.values()].reduce((sum, p) => sum + p.blocks, 0),
  evidence: [...entry.pages.entries()].map(([id, p]) => ({ page: id, blocks: p.blocks, samples: p.samples })),
  risk_pages: [],
  too_broad_pages: [],
}));

if (!SKIP_RISK_CHECK && candidates.length > 0) {
  console.log(`risk-checking ${candidates.length} candidate filters across ${pages.length} pages…`);
  for (const record of pages) {
    const page = loadPageContent(record);
    const dom = makeDom(page.html, page.url);
    const doc = dom.window.document;
    const elementTokens = createTextIndex();
    const expectedTokenSet = new Set(tokens(stripLinkTargets(page.expected)));

    for (const candidate of candidates) {
      let matches;
      try {
        matches = doc.querySelectorAll(candidate.selector);
      } catch {
        candidate.invalid = true;
        continue;
      }
      if (matches.length === 0) continue;
      if (matches.length > MAX_MATCHES_PER_PAGE) {
        candidate.too_broad_pages.push({ page: record.id, matches: matches.length });
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
          candidate.risk_pages.push({ page: record.id, sample: (element.textContent || "").replace(/\s+/g, " ").trim().slice(0, 100) });
          break;
        }
      }
    }
    dom.window.close();
  }
}

for (const candidate of candidates) {
  candidate.safe =
    !candidate.invalid && candidate.risk_pages.length === 0 && candidate.too_broad_pages.length === 0;
}

candidates.sort(
  (a, b) =>
    (b.safe ? 1 : 0) - (a.safe ? 1 : 0) ||
    b.pages_helped - a.pages_helped ||
    b.junk_blocks - a.junk_blocks,
);

const removals = [...harmfulFilters.entries()]
  .map(([filter, hits]) => ({ filter, pages_hurt: new Set(hits.map((h) => h.page)).size, evidence: hits }))
  .sort((a, b) => b.pages_hurt - a.pages_hurt);

const ruleProblems = [...harmfulRules.entries()]
  .map(([rule, hits]) => ({ rule, pages_hurt: new Set(hits.map((h) => h.page)).size, evidence: hits }))
  .sort((a, b) => b.pages_hurt - a.pages_hurt);

// --- Output -----------------------------------------------------------------
const output = {
  generated_at: new Date().toISOString(),
  pages_with_evidence: withEvidence.length,
  add_filter_candidates: candidates,
  remove_or_narrow_filters: removals,
  harmful_cleanup_rules: ruleProblems,
  unattributed_junk: unattributedJunk.slice(0, 60),
};

writeFileSync(join(CORPUS_DIR, "mined-candidates.json"), JSON.stringify(output, null, 2) + "\n");

let md = "# Mined Candidates\n\n";
md += `Generated: ${output.generated_at.slice(0, 10)}. Evidence from ${withEvidence.length} pages.\n\n`;
md += "## Add-filter candidates\n\n";
md += "Safe = matches no expected content on any scored page. Test with propose.mjs before trusting.\n\n";
md += "| selector | safe | pages helped | junk blocks | risk pages | sample junk |\n|---|---|---:|---:|---:|---|\n";
for (const c of candidates.slice(0, 50)) {
  // Line breaks in samples are meaningful (line: rules match single lines) —
  // show them as a literal \n rather than silently joining.
  const sample = (c.evidence[0]?.samples[0] || "").replace(/\|/g, "\\|").replace(/\n/g, "\\n");
  md += `| \`${c.selector}\` | ${c.safe ? "yes" : "NO"} | ${c.pages_helped} | ${c.junk_blocks} | ${c.risk_pages.length + c.too_broad_pages.length} | ${sample} |\n`;
}
md += "\n## Existing filters eating expected content\n\n";
md += "| filter | pages hurt | sample lost text |\n|---|---:|---|\n";
for (const r of removals.slice(0, 30)) {
  md += `| \`${r.filter}\` | ${r.pages_hurt} | ${(r.evidence[0]?.text || "").replace(/\|/g, "\\|")} |\n`;
}
md += "\n## Cleanup rules eating expected content\n\n";
md += "| rule | pages hurt | sample lost text |\n|---|---:|---|\n";
for (const r of ruleProblems.slice(0, 30)) {
  md += `| \`${r.rule.slice(0, 90)}\` | ${r.pages_hurt} | ${(r.evidence[0]?.text || "").replace(/\|/g, "\\|")} |\n`;
}
md += "\n## Junk with no DOM-level filter (cleanup-rule material)\n\n";
for (const j of output.unattributed_junk.slice(0, 30)) {
  md += `- \`${j.page}\`: ${j.text.replace(/\n/g, "\\n")}\n`;
}

writeFileSync(join(CORPUS_DIR, "MINED_CANDIDATES.md"), md);
console.log(
  `mined ${candidates.length} add-filter candidates (${candidates.filter((c) => c.safe).length} safe), ${removals.length} harmful filters, ${ruleProblems.length} harmful rules`,
);
console.log("wrote mined-candidates.json and MINED_CANDIDATES.md");
