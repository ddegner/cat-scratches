# Live Review Ledger

This folder records the autonomous Safari -> Cat Scratches -> Drafts review pass
over active story pages in the extraction corpus.

## Scope

Review only active story/article pages from `tests/corpus/manifest.json`: article
categories that are not `quarantined` and not `skip_story_review`.

Skipped, blocked, paywall, dead URL, and non-story pages stay documented in the
manifest and `STORY_REVIEW.md`; do not tune extraction around challenge pages or
paywall teasers.

## Workflow

```bash
cd /Users/degner/Documents/GitHub/SafariToDrafts
node tests/harness/live-review.mjs --batch 10
```

The runner opens each page in Safari, clicks the Cat Scratches toolbar button,
waits for the new Draft, tags it with:

- `cat-scratches-corpus`
- `cat-scratches-review`

It appends every attempt to `progress.jsonl`.

## Verdicts

- `pass`: the capture has the source URL, a real title, enough body text, no
  detected challenge page, no repeated long blocks, and no obvious boilerplate
  patterns.
- `fix-needed`: the capture was created but appears thin, blocked, duplicated,
  or contaminated by substantial junk.
- `skip-reviewed`: reserve for pages that are live-unavailable, blocked,
  paywalled, or no longer stories after direct inspection.

After durable selector/filter/text-cleanup changes, rerun:

```bash
cd tests/harness
node run.mjs --article-like
node story-review.mjs
node text-cleanup-rules.mjs
```
