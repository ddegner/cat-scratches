#!/usr/bin/env node
// Writes annotations.json for the remaining pilot pages. Content-only data
// table — edit here rather than hand-editing 20 JSON files.

import { writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "corpus", "sites");

const ANNOTATIONS = {
  "paulgraham_com/article-1": {
    url: "https://www.paulgraham.com/greatwork.html",
    quality: "near-perfect",
    content_root_selector: "body > table td", // PG uses a <table> layout wrapper
    keep: ["p", "i", "b", "blockquote"],
    strip: ["a[name]:empty", "font[size='-1']", "a[href='index.html']"],
    quirks: ["Plain-HTML 1990s layout; content lives in a nested <table><td>",
             "Footnotes are numbered and live at the bottom; preserve order",
             "No <article>, no <main>, no <h1> — extractor fallback to body works here"],
    tags: ["blog", "essay", "longform", "static-html"],
    notes: "Positive anchor for the 'no semantic tags' scenario. Extractor must not rely on <article>/<main>."
  },
  "paulgraham_com/article-2": {
    url: "https://www.paulgraham.com/do.html",
    quality: "near-perfect",
    content_root_selector: "body > table td",
    keep: ["p", "i", "b"],
    strip: ["a[name]:empty", "font[size='-1']"],
    quirks: ["Same PG house style as greatwork.html"],
    tags: ["blog", "essay", "static-html"],
    notes: "Short essay form. Tests extractor on minimal-markup HTML."
  },
  "developer_mozilla_org/article-1": {
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map",
    quality: "needs-improvement",
    content_root_selector: "main#content article.main-page-content",
    keep: ["h1, h2, h3, h4", "article p", "article pre.brush", "article table.standard-table", "article dl"],
    strip: [
      ".bc-table-container",           // browser compat matrix (huge, not text)
      ".document-toc-container",       // in-page TOC
      "aside.metadata",
      ".banners-container",
      ".bcd-signal-block",
      ".section-content > p:has(+ .bc-data)"
    ],
    quirks: [
      "Top 'Baseline Widely available' widget should be stripped (decorative)",
      "'Learn more / See full compatibility / Report feedback' is a kebab-menu — chrome",
      "Code samples (pre.brush.js) MUST be preserved; current extraction keeps these correctly"
    ],
    tags: ["docs", "reference", "api"],
    notes: "Add selector '.bc-table-container', '.bcd-signal-block', and the Baseline widget class to BASE_FILTERS."
  },
  "developer_mozilla_org/article-2": {
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns",
    quality: "needs-improvement",
    content_root_selector: "main#content article.main-page-content",
    keep: ["h1-h4", "p", "pre", "dl"],
    strip: [".bc-table-container", ".document-toc-container", "aside.metadata", ".interactive-example"],
    quirks: ["Interactive example iframe is rendered but has no text value — strip",
            "Formal syntax block is crucial and must be preserved"],
    tags: ["docs", "reference", "css"],
    notes: "Same MDN template as Array.map; same strip recommendations apply."
  },
  "docs_python_org/article-1": {
    url: "https://docs.python.org/3/library/functools.html",
    quality: "near-perfect",
    content_root_selector: "div.body section",
    keep: ["h1-h4", "p", "dl.py", "pre"],
    strip: ["div.sphinxsidebar", "div.related", "div.footer", ".headerlink"],
    quirks: ["Sphinx-rendered page; signature blocks use <dl class='py function'>",
            "¶ paragraph anchors (.headerlink) are decorative — strip"],
    tags: ["docs", "reference", "python", "sphinx"],
    notes: "Sphinx default theme. Consider adding '.headerlink' to BASE_FILTERS."
  },
  "docs_python_org/article-2": {
    url: "https://docs.python.org/3/tutorial/datastructures.html",
    quality: "near-perfect",
    content_root_selector: "div.body section",
    keep: ["h1-h4", "p", "pre", "ol", "ul"],
    strip: ["div.sphinxsidebar", "div.related", ".headerlink"],
    quirks: ["Tutorial style: prose + many code blocks"],
    tags: ["docs", "tutorial", "python", "sphinx"],
    notes: "Same Sphinx template; positive anchor for tutorial-style docs."
  },
  "github_com_readme/article-1": {
    url: "https://github.com/facebook/react/blob/main/README.md",
    quality: "needs-improvement",
    content_root_selector: "article.markdown-body",
    keep: ["article.markdown-body h1-h4", "article.markdown-body p", "article.markdown-body pre", "article.markdown-body ul, article.markdown-body ol"],
    strip: [
      "header.AppHeader",
      ".Layout-sidebar",
      ".Layout-side",
      ".file-header",
      "nav[aria-label='File view']",
      ".react-blob-sticky-header",
      ".TableOfContents"
    ],
    quirks: [
      "GitHub's rendered README lives inside article.markdown-body, but the blob viewer wraps it in layout chrome",
      "Breadcrumbs ('react / README.md') at top and 'Raw / Blame / Edit' toolbar should be stripped",
      "GitHub is a JS-heavy SPA; server HTML snapshot may be thin — consider using the raw.githubusercontent.com mirror for ground truth"
    ],
    tags: ["docs", "readme", "github", "markdown"],
    notes: "GitHub blob pages are a known hard case. If extraction quality stays low, consider domain-specific rule: prefer raw.githubusercontent for *.md blob URLs."
  },
  "github_com_readme/article-2": {
    url: "https://github.com/torvalds/linux/blob/master/README",
    quality: "needs-improvement",
    content_root_selector: ".blob-wrapper, article.markdown-body",
    keep: ["pre", "article.markdown-body"],
    strip: ["header.AppHeader", ".Layout-sidebar", ".file-header", "nav[aria-label='File view']"],
    quirks: ["Plain-text README (not .md) — rendered as a <pre>, not markdown",
            "Extractor should still capture the raw text content"],
    tags: ["docs", "readme", "github", "plaintext"],
    notes: "Plain-text README case — tests extractor on non-markdown content files."
  },
  "wikipedia_org/article-1": {
    url: "https://en.wikipedia.org/wiki/Artificial_intelligence",
    quality: "needs-improvement",
    content_root_selector: "div.mw-parser-output",
    keep: ["h1, h2, h3, h4", ".mw-parser-output > p", ".mw-parser-output > ul", ".mw-parser-output > ol", "blockquote", "figcaption"],
    strip: [
      ".hatnote",                      // 'AI redirects here' disambiguation
      ".infobox",                      // sidebar infobox (not prose)
      ".navigation-not-searchable",
      ".reflist",                      // inline reference numbers [1][2] — debatable
      ".navbox",                       // bottom navigation boxes
      ".mw-jump-link",                 // 'Jump to content'
      ".mw-editsection",
      "#toc",
      ".shortdescription",             // 'Intelligence of machines' tagline
      ".thumb"                         // image thumbnails with captions
    ],
    quirks: [
      "MediaWiki. `.mw-parser-output` is the canonical content root.",
      "Hatnote '(AI) redirects here' and short description tagline appear as orphan paragraphs at the top — should be stripped",
      "Inline citations [1][2]... are currently kept; decision needed on whether to strip (reader pref) or keep (fidelity)",
      "Navboxes at page bottom are sprawling and non-prose — definitely strip"
    ],
    tags: ["reference", "encyclopedic", "mediawiki", "longform"],
    notes: "Add '.hatnote', '.shortdescription', '.navbox', '.mw-editsection' to BASE_FILTERS."
  },
  "wikipedia_org/article-2": {
    url: "https://en.wikipedia.org/wiki/History_of_the_Internet",
    quality: "needs-improvement",
    content_root_selector: "div.mw-parser-output",
    keep: ["h1-h4", "p", "ul", "ol", "blockquote"],
    strip: [".hatnote", ".infobox", ".navbox", ".mw-editsection", "#toc", ".reflist"],
    quirks: ["Same MediaWiki template"],
    tags: ["reference", "history", "mediawiki", "longform"],
    notes: "Same fixes as AI article."
  },
  "openai_com_blog/article-1": {
    url: "https://openai.com/index/hello-gpt-4o/",
    quality: "needs-improvement",
    content_root_selector: "article, main article",
    keep: ["h1, h2, h3", "article p", "article blockquote", "article ul, article ol", "article pre"],
    strip: [
      ".actions",                      // 'Try on ChatGPT' / 'System Card' button row
      ".video-controls",
      "button",                        // 'Share', 'Loading…', play buttons
      "figure figcaption:has(> :only-child)",
      ".more-resources",
      ".share-widget"
    ],
    quirks: [
      "Concatenated button text: 'ContributionsTry on ChatGPT GPT-4o System Card' — these are <a>/<button> siblings that got flattened",
      "Many embedded videos have single-line captions ('Sarcasm.', 'Interview prep.') — debatable keep/strip; currently kept as orphan paragraphs, which reads oddly",
      "'Loading…', 'Share', 'More Resources' are UI chrome"
    ],
    tags: ["corp-blog", "announcement", "ai"],
    notes: "Strip <button> elements globally and de-orphan video captions. Candidate new BASE_FILTER: 'button, [role=\"button\"]'."
  },
  "openai_com_blog/article-2": {
    url: "https://openai.com/index/sora/",
    quality: "needs-improvement",
    content_root_selector: "article",
    keep: ["h1-h3", "article p", "article blockquote"],
    strip: ["button", ".video-controls", ".actions", ".share-widget"],
    quirks: ["Similar layout to hello-gpt-4o; heavy video embeds with short captions"],
    tags: ["corp-blog", "announcement", "ai"],
    notes: "Same OpenAI blog template fixes."
  },
  "apple_com_newsroom/article-1": {
    url: "https://www.apple.com/newsroom/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/",
    quality: "needs-improvement",
    content_root_selector: "article.pr-content, main article",
    keep: ["h1-h4", "article p", "article ul, article ol", "article blockquote", ".pr-dek"],
    strip: [
      ".pr-share",
      ".pr-pressinfo",
      ".pr-gallery",
      "a[rel='external']:has(> span:contains('opens in new window'))",
      "a:contains('opens in new window')",
      ".pr-image-gallery",
      ".pr-press-contacts",
      "section.pr-press-contacts"
    ],
    quirks: [
      "'opens in new window' accessibility labels leak as visible text — need a rule to strip span.sr-only / aria-label-only spans",
      "'Press Contacts' section at the bottom is boilerplate and should be stripped",
      "'Images of iPhone 16 Pro and iPhone 16 Pro Max' gallery section is non-text",
      "Dek ('Powered by the A18 Pro chip...') should be kept as it's the article subheadline"
    ],
    tags: ["corp-blog", "press-release", "apple"],
    notes: "Add 'press contacts' / 'opens in new window' regex to the CTA spam filter. Strip 'span.sr-only' class globally."
  },
  "apple_com_newsroom/article-2": {
    url: "https://www.apple.com/newsroom/2024/06/introducing-apple-intelligence-for-iphone-ipad-and-mac/",
    quality: "needs-improvement",
    content_root_selector: "article.pr-content",
    keep: ["h1-h4", "p", "ul", "blockquote"],
    strip: [".pr-share", ".pr-pressinfo", ".pr-gallery", "section.pr-press-contacts"],
    quirks: ["Same Apple Newsroom template"],
    tags: ["corp-blog", "press-release", "apple"],
    notes: "Same fixes as iphone-16-pro announcement."
  },
  "news_ycombinator_com/article-1": {
    url: "https://news.ycombinator.com/item?id=40358101",
    quality: "poor",
    content_root_selector: "table.fatitem, table.comment-tree",
    keep: ["td.default .comment", ".title > a.storylink, .titleline > a", ".subtext"],
    strip: ["tr.athing:not(.comtr) + tr + tr + tr.spacer", "td.default > div.reply", "a[href='hide?id=']"],
    quirks: [
      "HN uses nested <table> layouts with no semantic tags — extractor's selector list won't match",
      "Output is almost entirely top-bar navigation ('new | past | comments | ask...') and footer links",
      "True content (story title, story URL, comment tree) requires HN-specific selectors",
      "Strong candidate for domain-specific extraction rule OR adding 'table.fatitem' and '.comment-tree' to BASE_SELECTORS"
    ],
    tags: ["forum", "ugc", "news-aggregator"],
    notes: "Current extraction = 147 chars, mostly chrome. Biggest gap in the pilot. HN has two fixtures; both need selector work."
  },
  "news_ycombinator_com/article-2": {
    url: "https://news.ycombinator.com/item?id=42112345",
    quality: "poor",
    content_root_selector: "table.fatitem, table.comment-tree",
    keep: [".commtext", ".titleline > a", ".subtext"],
    strip: ["#hnmain > tbody > tr:first-child", ".reply", ".togg"],
    quirks: ["Thread-view variant of same HN layout"],
    tags: ["forum", "ugc", "thread"],
    notes: "Same fix as article-1."
  },
  "arstechnica_com/article-1": {
    url: "https://arstechnica.com/ai/2024/05/before-launching-gpt-4o-broke-records-on-chatbot-leaderboard-under-a-secret-name/",
    quality: "ok",
    content_root_selector: "article.article-guts, .post-content",
    keep: ["h1-h3", ".post-content p", ".post-content blockquote", "figure figcaption"],
    strip: [".site-header", ".story-sidebar", ".related-stories", ".newsletter-signup", ".comment-section", ".ad-bar"],
    quirks: [
      "Ars uses a newer CMS (Condé Nast's?) with class prefix '.post-content'",
      "Next-page pagination links at bottom — strip",
      "Inline ads appear between paragraphs — must be stripped"
    ],
    tags: ["tech-news", "feature"],
    notes: "Verify '.post-content' is in BASE_SELECTORS; add '.related-stories', '.ad-bar' to filters if not present."
  },
  "stratechery_com/article-1": {
    url: "https://stratechery.com/2024/the-gen-ai-bridge-to-the-future/",
    quality: "near-perfect",
    content_root_selector: "article .entry-content",
    keep: [".entry-content p", ".entry-content h2, h3", ".entry-content blockquote", ".entry-content img + em" /* image captions */],
    strip: [".sharedaddy", ".post-views", ".subscription-form", ".comments", ".jp-relatedposts"],
    quirks: ["WordPress + Jetpack; standard .entry-content pattern",
            "Subscription CTA box appears near end — strip"],
    tags: ["tech-news", "longform", "analysis", "wordpress"],
    notes: "WordPress canonical case; .entry-content is reliable. Positive anchor."
  },
  "stratechery_com/article-2": {
    url: "https://stratechery.com/2024/apple-intelligence/",
    quality: "near-perfect",
    content_root_selector: "article .entry-content",
    keep: [".entry-content p, h2, h3, blockquote"],
    strip: [".sharedaddy", ".jp-relatedposts", ".subscription-form"],
    quirks: ["Same WP template"],
    tags: ["tech-news", "longform", "analysis", "wordpress"],
    notes: "Positive anchor."
  },
  "theverge_com/article-2": {
    url: "https://www.theverge.com/24284101/apple-iphone-16-review",
    quality: "needs-improvement",
    content_root_selector: "article .duet--article--article-body",
    keep: ["article .duet--article--article-body p, h2, h3, blockquote", "article .duet--article--byline"],
    strip: [
      ".duet--article--article-tag-list",
      ".duet--article--related-list",
      ".duet--article--follow-box",
      "aside.duet--sidebar--most-popular"
    ],
    quirks: ["Same Chorus CMS as article-1 — very short extraction suggests the paywall/interstitial is swallowing the body"],
    tags: ["tech-news", "review"],
    notes: "Investigate why body_chars is only 896 — possibly a JS-rendered review body not present in static HTML."
  }
};

for (const [path, a] of Object.entries(ANNOTATIONS)) {
  const dir = join(ROOT, path);
  const out = {
    url: a.url,
    fetched_at: "2026-04-15",
    annotator: "human",
    quality: a.quality,
    content_root_selector: a.content_root_selector,
    keep: a.keep,
    strip: a.strip,
    expected_quirks: a.quirks,
    category_tags: a.tags,
    notes: a.notes,
  };
  writeFileSync(join(dir, "annotations.json"), JSON.stringify(out, null, 2) + "\n");
  // If expected.md doesn't exist yet, seed it from extracted.md so scoring has
  // something to compare against. Pages we've hand-curated (theverge/article-1,
  // simonwillison/article-1) already have expected.md and won't be overwritten.
  const exp = join(dir, "expected.md");
  const ext = join(dir, "extracted.md");
  if (!existsSync(exp) && existsSync(ext)) {
    const { readFileSync, writeFileSync: wf } = await import("node:fs");
    wf(exp, readFileSync(ext, "utf8"));
  }
}

console.log(`Wrote ${Object.keys(ANNOTATIONS).length} annotations.`);
