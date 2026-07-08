# Adjudication — turning disagreements into ground truth

`review-queue.json` lists pages where Mozilla Readability and the extension
extractor disagree. Each one is an unsolved extraction problem: one of the
two is wrong, and deciding which (and writing the correct `expected.md`) is
what creates real improvement signal for the optimizer loop. This is
judgment work — run it with a mid-tier model or better, not the cheapest.

All commands run from `tests/harness/`.

## The loop

1. `node adjudicate.mjs --next` — prints the packet for the worst open page:
   agreement scores, file paths, and the block-level diff (blocks only in
   `extracted.md` vs blocks only in `readability.txt`).

2. **Read both files** (`extracted.md`, `readability.txt`). Skim
   `source.html` only if the two disagree in a way you can't resolve from
   the texts. Then decide which situation you're in:

   - **A. Extractor right, Readability under-extracted** (readability-only
     list is empty or trivial; extracted-only blocks are real content).
     `expected.md` = `extracted.md` minus any junk blocks you can see.
     Quality: `ok`.
   - **B. Extractor is missing content or keeping junk** (readability-only
     blocks are real article text, and/or extracted-only blocks are chrome).
     Author `expected.md` = the extracted markdown, junk removed, missing
     content inserted where it belongs (copy the text from
     `readability.txt` as plain paragraphs). Quality: `needs-improvement`.
     **These pages are the valuable ones** — they score < 1.0 and give the
     optimizer something to chase.
   - **C. Not a usable fixture** (paywall shell, listing page, empty SPA,
     wrong language dump). Don't write an `expected.md`.
     Quality: `fixture-broken`.

3. **Author `expected.md`** (situations A/B) in the page directory:
   - Body content only, as Markdown: headings (`##`), paragraphs, lists,
     blockquotes, fenced code. No link URLs (visible link text only).
   - No page title / h1, no byline, no date, no share bar, no "Related",
     no newsletter CTAs, no image captions or credits. When in doubt, ask:
     "would a person want this line in their Drafts note?"
   - Keep the article's paragraph order. Blank line between blocks.
   - Match the conventions of an existing hand-curated file, e.g.
     `tests/corpus/sites/theverge_com/article-1/expected.md`.

4. **Record it**:

       node adjudicate.mjs --done <slug>/<page> --quality ok|needs-improvement|fixture-broken --note "one line: what was wrong"

   The script refuses stubs (< 60 tokens) and missing files.

5. Repeat until the session budget is reached. Then **enroll the new pages**:

       node --max-old-space-size=8192 evaluate.mjs --write-baseline

   New pages enter the baseline with whatever they score today — low F1 on
   a `needs-improvement` page is the point, and the gates only demand no
   *further* regression.

## Hard rules

- Never overwrite an existing `expected.md` (the script won't offer to).
- Never copy chrome/junk into `expected.md` just because both extractors
  kept it — you are the tiebreaker, not a third vote.
- Never mark `ok` to avoid authoring; if the extractor output needs edits,
  it's `needs-improvement`.
- Don't fix the extractor, filters, or harness from this session; the
  optimizer loop consumes your ground truth later.
- One `--done` per page, immediately after authoring — half-finished pages
  poison the queue.

## What good output looks like

After a session: N new `expected.md` files, each with `annotations.json`
stamped `annotator: llm-adjudicated`, the queue entries marked, and a
refreshed baseline. The optimizer loop (`OPTIMIZER.md`) then mines the new
`needs-improvement` pages for filter/selector/rule candidates.
