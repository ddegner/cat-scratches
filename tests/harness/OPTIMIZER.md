# Extraction optimizer — operating manual

This document is the procedure for improving the extraction defaults
(`BASE_SELECTORS`, `BASE_FILTERS`, `BASE_TEXT_CLEANUP_RULES` in
[defaults.js](../../SafariToDrafts/Shared%20(Extension)/Resources/defaults.js)).
It is written so that an inexpensive model (or a human in a hurry) can run
the loop mechanically. All judgment that matters — scoring, safety, regression
gates — lives in the harness, not in you. **Trust the tools' verdicts over
your own reading of the HTML.**

All commands run from `tests/harness/`. Use the npm scripts (they set the
required Node heap size):

| command | what it does |
|---|---|
| `npm run evaluate` | score current defaults on the train set vs baseline |
| `npm run evidence` | same, plus write per-page `evidence.json` (junk → DOM source, losses → cause) |
| `npm run mine` | aggregate evidence into ranked, risk-checked candidate changes |
| `npm run propose -- --patch p.json` | lint + evaluate + record one proposed change |
| `npm run seed-expected` | grow ground truth by Readability triangulation |

## The loop

One iteration = one small patch, tested and recorded. Repeat until the
stop condition.

1. **Refresh evidence and mine candidates.** Required after every
   accepted apply (applied filters change the output, which changes the
   evidence); otherwise reuse the existing `MINED_CANDIDATES.md`:

       npm run evidence
       npm run mine

2. **Read `tests/corpus/mined-candidates.json`.** Take the highest-ranked
   `add_filter_candidates` entry with `"safe": true` that is NOT already in
   `tests/corpus/experiments.jsonl` (check every prior attempt's `ops` —
   never retry a recorded selector, whatever its verdict was).
   Prefer, in order: `[data-testid=…]` / `[data-component=…]` attributes,
   then semantic class names (`.article-footer`, `.baseline-indicator`),
   then `[class*="stem"]` stems. Skip anything that names a layout utility
   (`.flex-*`, `.grid`, `.mb-*`, `.pt-*`, colors, widths) even if marked safe.

3. **Write a patch file** and propose it:

       {"note": "<why, one line, cite pages helped>",
        "ops": [{"op": "add_filter", "selector": ".article-footer"}]}

       npm run propose -- --patch patch.json

   Patch ops: `add_filter`, `remove_filter`, `insert_selector` (+`index`),
   `move_selector` (+`index`), `remove_selector`, `add_cleanup_rule`,
   `remove_cleanup_rule`. One logical change per patch — never bundle.

4. **Act on the verdict** (it's in the output and appended to
   `tests/corpus/experiments.jsonl`):
   - `ACCEPTED` → run the two printed next-step commands: the holdout check
     must also print `gates: PASS`. If it does, apply with
     `node apply-defaults.mjs <candidate>` and then
     `node text-cleanup-rules.mjs && node extraction-regressions.mjs &&
     node --max-old-space-size=8192 evaluate.mjs --write-baseline`.
     If holdout FAILS, do not apply; note `"holdout-failed"` in the ledger
     line via a follow-up entry and move on.
   - `REJECTED (lint)` / `REJECTED (eval)` → it's already in the ledger;
     move to the next candidate. Do not argue with the gate, do not retry
     with `--skip-lint`.

5. **Stop** when any of:
   - 5 consecutive rejections;
   - no untried safe candidates remain even after a fresh
     `npm run evidence && npm run mine` (re-mine once before concluding
     the queue is dry — earlier applies change what gets mined);
   - the session budget of accepted-and-applied patches is reached.
     Default budget: 5. The launch prompt may set a different budget;
     the prompt wins.

   Then report: patches accepted (with objective before/after), patches
   rejected and why, and what's left in the queue.

## Where improvements come from

- `mined-candidates.json → add_filter_candidates`: junk seen in output,
  mapped to a DOM element, with risk-checked selector suggestions. The main
  source. `pages_helped` is the value; `risk_pages`/`too_broad_pages` is
  the danger (any non-empty = leave it).
- `mined-candidates.json → remove_or_narrow_filters`: existing filters that
  delete real content. Propose `remove_filter` only if `pages_hurt >= 2`
  and the filter isn't obviously load-bearing (grep the ledger and
  MINED_CANDIDATES sample text first).
- `mined-candidates.json → unattributed_junk`: junk with no DOM handle —
  the only place where you author a `add_cleanup_rule` regex by hand. Rules
  are `line:/…/flags`, `block:/…/`, `tail:/…/`, or `replace:/…/ => text`.
  Anchor them hard (`^…$`, `\s*`), never match generic prose. The linter
  will reject any rule that deletes >40 chars from any expected.md.
  **Mind line boundaries:** block text in evidence/mined output preserves
  real newlines (shown as `\n`). A `line:` rule matches ONE physical line —
  a block containing `\n` needs one rule per line, a `block:` rule, or
  (usually better) a DOM filter on its source element.
- `tests/corpus/review-queue.json` (from `seed-expected`): pages where
  Mozilla Readability disagrees with our extractor, worst first. These are
  unsolved pages, and resolving them is a separate judgment-heavy workflow —
  see `ADJUDICATE.md`. Do NOT adjudicate from inside this loop; when the
  mined queue is dry, report that adjudication is the way to refill it.

## Hard rules

- **Never** edit `defaults.js` by hand; only `apply-defaults.mjs` writes it.
- **Never** use `--skip-lint` or hand-edit `eval-baseline.json`.
- **`--write-baseline` is legal in exactly two places:** immediately after a
  successful `apply-defaults.mjs` (step 4), or after adding new corpus
  fixtures. Never refresh the baseline to make a rejected proposal pass —
  a proposal that only wins against a fresher baseline is a proposal that
  lost. (Comparisons are per-set now, so a rejection is never a set-size
  artifact.)
- **Never** propose filters made of layout/utility classes, bare tags
  (`div`, `span`, `p`, `a`), or anything in: `content`, `article`, `main`,
  `post`, `entry`, `body`, `text`, `story`, `wrapper`, `container`.
- **Never** delete or rewrite an `expected.md`. If ground truth looks wrong,
  record it in the page's `annotations.json` `notes` and flag for a human.
- One op per patch. Small steps are the point: the ledger makes each one
  cheap, and the gates make each one safe.

## How scoring works (so you can read reports)

`evaluate.mjs` scores token-set F1 of extractor output vs `expected.md` per
page (tokens = lowercase alphanumeric runs ≥3 chars, stopwords and code
fences excluded, link URLs stripped). The objective is F1-dominated with
precision/recall tiebreakers and small penalties for length drift and
missing/extra blocks. Gates vs `eval-baseline.json`:

- anchor pages (`quality: near-perfect` or `auto-agreed`) must keep
  F1 ≥ 0.95 and stay within 0.01 of their baseline
- no category mean may drop > 0.002; no single page may drop > 0.05
- `propose.mjs` additionally requires the train objective to improve

Two kinds of ground truth: **hand-curated** pages (few, high-value — real
improvement signal) and **auto-agreed** pages (many — they pin current
behavior as regression armor; on them F1 = 1.0 by construction, so your
job is to not break them). The ~20% holdout split is deterministic
(hash of page id) and only consulted at acceptance time.

## Growing the corpus (occasional, not every loop)

New fixtures: add URLs to `build-manifest.mjs`, `node fetch.mjs`,
`node run.mjs`, then `npm run seed-expected` to auto-annotate the easy ones.
Re-run `evaluate.mjs --write-baseline` afterwards (new pages enter with
whatever the current config produces vs their new ground truth).

After any change to `content-extractor.js` / `turndown.js` / `defaults.js`
outside this loop, the baseline is stale (the report will say so via the
`stale-baseline` gate) — a human should decide when to re-pin it.
