# Cat Scratches — extraction test corpus

This directory is a test corpus + harness for [content-extractor.js](../SafariToDrafts/Shared%20(Extension)/Resources/content-extractor.js). Its purpose is to let us regression-test and iteratively improve the extraction engine and its `BASE_SELECTORS` / `BASE_FILTERS` (see [defaults.js](../SafariToDrafts/Shared%20(Extension)/Resources/defaults.js)) against a wide spread of real-world HTML.

Planning doc: [`~/.claude/plans/shiny-tickling-dongarra.md`](../.claude/plans/shiny-tickling-dongarra.md) *(local to the author)*.

## Layout

```
tests/
  corpus/
    manifest.json                # 200 sites, 400 URLs, categorized
    BASELINE.md                  # extraction quality snapshot (per-category F1)
    scores.json                  # per-page scoring data
    sites/
      <slug>/
        site.json                # {name, category, cms, slug}
        article-1/
          source.html            # raw fetched snapshot (pre-JS)
          fetch.json             # HTTP status, content-type, bytes, final URL
          extracted.md           # what content-extractor.js produces today
          result.json            # run metadata (title, body_chars, elapsed_ms)
          expected.md            # ideal ground-truth markdown
          annotations.json       # keep / strip selectors + notes + tags
        article-2/
          …
  harness/
    package.json                 # jsdom only
    build-manifest.mjs           # regenerates manifest.json from its SITES table
    patch-pilot-urls.mjs         # one-off URL fixer used during pilot
    fetch.mjs [--pilot] [--force]      # downloads source.html for every page
    run.mjs   [--pilot]                # runs the extractor via jsdom, writes extracted.md
    score.mjs                          # diffs extracted.md vs expected.md → BASELINE.md
    seed-annotations.mjs               # writes annotations.json stubs (pilot)
    pilot.mjs                          # exports PILOT_SLUGS (20 sites)
```

## Usage

```bash
cd tests/harness
npm install                   # installs jsdom

# Full corpus (400 pages; many will bot-wall — see Known Limits below)
node fetch.mjs                # ~20–40 min, polite 500ms between requests
node run.mjs
node score.mjs                # writes ../corpus/BASELINE.md

# Pilot only (20 sites, 40 URLs, ~22 currently fetchable)
node fetch.mjs --pilot
node run.mjs   --pilot
node score.mjs
```

## `annotations.json` schema

Per-page spec of **what the extractor should keep vs. strip**:

```json
{
  "url": "https://…",
  "fetched_at": "2026-04-15",
  "quality": "near-perfect | ok | needs-improvement | poor",
  "content_root_selector": "article .entry-content",
  "keep": [".entry-content p", "h1-h4", "blockquote"],
  "strip": [".sharedaddy", ".jp-relatedposts", ".newsletter-signup"],
  "expected_quirks": ["brief prose notes about this page's layout gotchas"],
  "category_tags": ["news", "longform"],
  "notes": "Concrete action items — selectors to add to BASE_SELECTORS/BASE_FILTERS."
}
```

Aggregated across the corpus, `annotations.json` files are the evidence base for tuning the selector lists in `defaults.js`. The plan is: find selectors that appear in many `keep` fields but aren't in `BASE_SELECTORS` → add them; find selectors that appear in many `strip` fields but aren't in `BASE_FILTERS` → add them.

## Scoring

`score.mjs` computes per-page **recall / precision / F1** on lowercased alphanumeric tokens (≥3 chars, stopword-free) against `expected.md`, plus **missing / extra block** counts (paragraphs in one file with <30% token overlap in the other). Token F1 is an intentionally forgiving metric; block counts surface structural gaps (e.g. "The Verge extraction has 8 extra paragraph-shaped blocks not present in expected.md" → selector leakage).

**Regression policy:** any PR changing `content-extractor.js` or `defaults.js` must re-run `node score.mjs` and compare `BASELINE.md`. Category-level F1 should not drop; per-page F1 on `"quality: near-perfect"` anchors should not drop below 0.95.

## Pilot

`harness/pilot.mjs` pins 20 representative slugs — one per major category. The pilot exists to prove the pipeline end-to-end with a small number of real pages before investing in annotating all 400.

Current pilot state (after `--pilot` fetch + run):

| outcome | count | notes |
|---|---|---|
| fetched + extracted | 22 | good enough to establish baseline numbers |
| bot-walled (403/404 to Node UA) | ~18 | NYT, Guardian, BBC, TechCrunch, SO, DF, Reddit, cooking.nytimes |

## Known limits

1. **Bot walls.** Several major news sites return 404/403 to a plain `fetch()` with a Safari UA. Workarounds (for future work): (a) hand-paste "Save As Web Archive" dumps into `source.html`; (b) fetch via archive.org snapshot URLs. The harness itself doesn't care where `source.html` came from.
2. **No JS rendering.** `source.html` is server-rendered HTML. SPAs that inject body content client-side (GitHub blob view, some SPAs) will produce thin snapshots. For those, future work should add an optional Playwright-based fetcher, or substitute canonical mirrors (e.g. `raw.githubusercontent.com` for GitHub READMEs).
3. **Ground truth is seeded, not all hand-curated.** After the pilot run, 20 of 22 `expected.md` files were seeded from `extracted.md` and marked with a `quality` field in annotations. Only pages marked `quality: "needs-improvement"` or `"poor"` need a human-written `expected.md` to score meaningfully — and that's exactly the handful where current BASELINE shows precision < 1.0 ([`theverge_com/article-1`](corpus/sites/theverge_com/article-1/) is the only fully-curated example today).
4. **URL rot.** ~40 of the 200-site × 2-URL manifest entries are educated guesses at plausible permalinks and will 404. `fetch.json` records status per page — a periodic pass should replace dead URLs with live permalinks from the site's archive.

## Next steps (out of scope for corpus creation)

- Expand hand-curated `expected.md` to every `quality: "needs-improvement"` page.
- Audit `annotations.json` `strip` frequencies → propose concrete diff to `BASE_FILTERS` in [defaults.js](../SafariToDrafts/Shared%20(Extension)/Resources/defaults.js).
- Wire `score.mjs` into CI; fail the build on category-level F1 regression.
