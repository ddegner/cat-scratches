#!/usr/bin/env node
// Generates a plain-language review report for story/article extraction output.
// This is intentionally simpler than score.mjs: it points at visible problems
// a human can confirm in extracted.md before a page becomes a scored fixture.

import { existsSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "corpus");

const ARTICLE_CATEGORIES = new Set([
  "news-major", "news-intl", "tech-news", "science", "longform", "think-tank",
  "corp-blog", "blog", "newsletter", "recipe",
]);

const FOCUS_SLUGS = new Set(["thehill_com", "nytimes_com", "cnn_com", "vox_com", "nature_com"]);
const THIN_CHARS = 700;

const JUNK_PATTERNS = [
  ["related-content", /^#{0,6}\s*Related Content\b/im],
  ["see-more", /^#{0,6}\s*See More:?\s*$/im],
  ["jobs", /^#{1,6}\s*Jobs\b|\bLatest jobs\b|\bFind a job\b/i],
  ["sign-up", /^#{0,6}\s*_?\**Sign up\b|^#{0,6}\s*Sign in or create an account\b|^#{0,6}\s*Log in or create an account\b/im],
  ["latest-on", /\bLatest on:\b|\bLatest on\b/i],
  ["subjects", /^#{1,6}\s*Subjects\b|\bDownload references\b/i],
  ["skip-ad", /^#{0,6}\s*(?:SKIP ADVERTISEMENT|ADVERTISEMENT|Advertising)\s*$/im],
  ["newsletter", /^#{0,6}\s*_?\**(?:newsletter signup|sign up\b.{0,120}\bnewsletter\b|subscribe\b.{0,120}\bnewsletter\b|.*\bin your inbox\b.*)_?\**\s*$/im],
  ["topics", /^#{1,6}\s*Topics\b|\bSee all topics\b/i],
  ["sponsored", /^\s*(?:BRANDVOICE(?:\s*\|\s*Paid Program)?|Paid Program|Storytelling and expertise from marketers|Sponsored Content)\s*$/im],
];

const NON_STORY_TITLE_RE = /(Search results|^The Korea Times$|^Politique -|^Économie -|^Artificial intelligence \| AP News$|^Medium$|^Mataroa — Blogging platform|^Untitled$|^Science \| AAAS$|Animal Behavior and Cognition \| bioRxiv|Pharmacology and Toxicology \| bioRxiv|All Articles \| bioRxiv|Obituaries - News|WealthScore|CCPA Policy|Network Solutions|Create a Portfolio Website|PLOS Sustainability and Transformation|Cosmology and Nongalactic Astrophysics|Earth and Planetary Astrophysics|Reviews & Analysis \| Nature|Careers at Medium|Privacy Policy|Consumer Health Data Privacy Policy|Free Business Name Generator|Environment & Conservation Software|Concierge Email Newsletter Migration|Buttondown for businesses|Ghost for Business|College Journalism Awards|Best .* Movies|best .*radios|best laptops)/i;
const NON_STORY_URL_RE = /(\/hub\/|\/search\?|\/search\/|\/category\/|\/categories\/|\/tag\/|\/tags\/|\/topics?\/|\/sections?\/|\/archive(?:\/)?$|\/author\/|\/authors\/|\/profile\/|\/profiles\/|\/top-content|\/guide\/|\/guides\/|\/podcast|\/video\/|\/videos\/|\/live-news\/|\/careers?(?:\/|-|$)|\/jobs?(?:\/|-|$)|\/privacy|\/privacy-policy|\/terms(?:\/|-|$)|\/legal\/|\/features\/|\/tools\/|\/industries\/|\/businesses(?:\/|$)|\/solutions\/|\/collection\/|\/global-issues\/[^/]+\/?$|\/nature\/reviews-and-analysis|\/content\/early\/recent|\?query=|^https?:\/\/[^/]+\/?$)/i;

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return null;
  }
}

function canonicalUrl(url) {
  return (url || "").replace(/[?#].*$/g, "").replace(/\/$/g, "");
}

function snippet(text, max = 220) {
  return (text || "").replace(/\s+/g, " ").trim().slice(0, max);
}

function rejectedFiles(dir) {
  try {
    return readdirSync(dir).filter(name => /^source\.rejected-nonstory/.test(name));
  } catch {
    return [];
  }
}

function severityFor(flags) {
  if (flags.some(flag => flag.startsWith("non-story") || flag === "missing-source" || flag === "extraction-error")) return 1;
  if (flags.some(flag => flag.startsWith("duplicate"))) return 1;
  if (flags.some(flag => flag.startsWith("too-short"))) return 2;
  if (flags.some(flag => flag.startsWith("junk:"))) return 3;
  return 4;
}

function titleKey(title) {
  const normalized = (title || "").replace(/\s+/g, " ").trim().toLowerCase();
  if (!normalized || normalized === "untitled" || normalized.length < 20) return null;
  return normalized;
}

const manifest = JSON.parse(readFileSync(join(ROOT, "manifest.json"), "utf8"));
const pages = [];
const quarantined = [];
const skippedPaywall = [];
const skippedOther = [];
const sourceUrlCounts = new Map();
const sourceTitleCounts = new Map();

for (const site of manifest.sites) {
  if (!ARTICLE_CATEGORIES.has(site.category)) continue;

  for (const page of site.pages) {
    if (page.skip_story_review) {
      const row = {
        id: `${site.slug}/${page.id}`,
        site: site.name,
        category: site.category,
        url: page.url,
        title: page.title || "",
        note: page.note || "",
        skip_reason: page.skip_reason || "skipped",
        skip_detail: page.skip_detail || "",
      };
      if (page.skip_reason === "paywall") {
        skippedPaywall.push(row);
      } else {
        skippedOther.push(row);
      }
      continue;
    }

    if (page.quarantined) {
      quarantined.push({
        id: `${site.slug}/${page.id}`,
        site: site.name,
        category: site.category,
        url: page.url,
        title: page.title || "",
        note: page.note || "",
        quarantine_reason: page.quarantine_reason || "",
      });
      continue;
    }

    const dir = join(ROOT, "sites", site.slug, page.id);
    const hasSource = existsSync(join(dir, "source.html"));
    const fetchMeta = readJson(join(dir, "fetch.json")) || {};
    const result = readJson(join(dir, "result.json")) || {};
    const extractedPath = join(dir, "extracted.md");
    const extracted = existsSync(extractedPath) ? readFileSync(extractedPath, "utf8") : "";
    const url = fetchMeta.final_url || fetchMeta.recovery_url || page.url;
    const title = result.title || fetchMeta.recovery_title || "";
    const rejected = rejectedFiles(dir);

    const row = {
      id: `${site.slug}/${page.id}`,
      slug: site.slug,
      page: page.id,
      site: site.name,
      category: site.category,
      cms: site.cms,
      url,
      title,
      note: page.note || "",
      allow_short: Boolean(page.allow_short),
      has_source: hasSource,
      body_chars: result.body_chars || extracted.length || 0,
      rejected_files: rejected,
      snippet: snippet(extracted),
      flags: [],
    };

    if (!hasSource) row.flags.push("missing-source");
    if (result.error) row.flags.push("extraction-error");
    if (NON_STORY_TITLE_RE.test(title)) row.flags.push("non-story-title");
    if (NON_STORY_URL_RE.test(url)) row.flags.push("non-story-url");
    if (hasSource && row.body_chars < THIN_CHARS && !row.allow_short) row.flags.push(`too-short:${row.body_chars}`);
    for (const [name, pattern] of JUNK_PATTERNS) {
      if (name === "newsletter" && site.category === "newsletter") continue;
      if (pattern.test(extracted)) row.flags.push(`junk:${name}`);
    }

    pages.push(row);

    if (hasSource) {
      const urlKey = canonicalUrl(url);
      sourceUrlCounts.set(urlKey, (sourceUrlCounts.get(urlKey) || 0) + 1);
      const key = titleKey(title);
      if (key) sourceTitleCounts.set(key, (sourceTitleCounts.get(key) || 0) + 1);
    }
  }
}

for (const row of pages) {
  if (!row.has_source) continue;
  if (sourceUrlCounts.get(canonicalUrl(row.url)) > 1) row.flags.push("duplicate-url");
  const key = titleKey(row.title);
  if (key && sourceTitleCounts.get(key) > 1) row.flags.push("duplicate-title");
}

for (const row of pages) {
  row.severity = severityFor(row.flags);
  row.status = row.flags.length === 0 ? "clean-looking" : "needs-review";
}

pages.sort((a, b) =>
  a.severity - b.severity ||
  b.flags.length - a.flags.length ||
  a.category.localeCompare(b.category) ||
  a.id.localeCompare(b.id)
);

const summary = {
  generated_at: new Date().toISOString(),
  article_like_pages: pages.length,
  source_pages: pages.filter(row => row.has_source).length,
  missing_source_pages: pages.filter(row => !row.has_source).length,
  clean_looking_pages: pages.filter(row => row.status === "clean-looking").length,
  needs_review_pages: pages.filter(row => row.status === "needs-review").length,
  quarantined_pages: quarantined.length,
  skipped_paywall_pages: skippedPaywall.length,
  skipped_other_pages: skippedOther.length,
  accepted_short_pages: pages.filter(row => row.has_source && row.allow_short && row.body_chars < THIN_CHARS).length,
  duplicate_source_urls: pages.filter(row => row.flags.includes("duplicate-url")).length,
  source_backed_nonstory_pages: pages.filter(row => row.has_source && row.flags.some(flag => flag.startsWith("non-story"))).length,
  thin_pages: pages.filter(row => row.flags.some(flag => flag.startsWith("too-short"))).length,
  junk_flagged_pages: pages.filter(row => row.flags.some(flag => flag.startsWith("junk:"))).length,
};

const bySeverity = new Map();
for (const row of pages) {
  if (!bySeverity.has(row.severity)) bySeverity.set(row.severity, []);
  bySeverity.get(row.severity).push(row);
}

function rowLine(row) {
  const flags = row.flags.length ? row.flags.join(", ") : "clean";
  return `| ${row.id} | ${row.body_chars} | ${flags} | ${row.title.replace(/\|/g, "\\|").slice(0, 90)} |`;
}

let md = "# Story Extraction Review\n\n";
md += `Generated: ${summary.generated_at.slice(0, 10)}.\n\n`;
md += "## Summary\n\n";
md += "| metric | value |\n|---|---:|\n";
for (const [key, value] of Object.entries(summary)) {
  if (key === "generated_at") continue;
  md += `| ${key.replace(/_/g, " ")} | ${value} |\n`;
}

md += "\n## Focus Pages\n\n";
md += "| page | chars | flags | title |\n|---|---:|---|---|\n";
for (const row of pages.filter(row => FOCUS_SLUGS.has(row.slug))) {
  md += `${rowLine(row)}\n`;
}

if (quarantined.length) {
  md += "\n## Quarantined Non-Story Candidates\n\n";
  md += "These are excluded from the story/article test set.\n\n";
  md += "| page | category | reason | URL |\n|---|---|---|---|\n";
  for (const row of quarantined) {
    md += `| ${row.id} | ${row.category} | ${(row.quarantine_reason || row.note || "quarantined").replace(/\|/g, "\\|")} | ${row.url.replace(/\|/g, "\\|")} |\n`;
  }
}

if (skippedPaywall.length) {
  md += "\n## Skipped Paywall Pages\n\n";
  md += "These are story/article URLs, but they are excluded from active parser refinement because the saved page only exposes a paywall teaser or the site is known to block full text.\n\n";
  md += "| page | category | detail | URL |\n|---|---|---|---|\n";
  for (const row of skippedPaywall) {
    md += `| ${row.id} | ${row.category} | ${(row.skip_detail || row.note || "paywall").replace(/\|/g, "\\|")} | ${row.url.replace(/\|/g, "\\|")} |\n`;
  }
}

if (skippedOther.length) {
  md += "\n## Skipped Unavailable Pages\n\n";
  md += "These are excluded from active parser refinement because the page could not be downloaded as a usable story/article source without relying on a paywall, challenge page, dead URL, or non-story shell.\n\n";
  md += "| page | category | reason | detail | URL |\n|---|---|---|---|---|\n";
  for (const row of skippedOther) {
    md += `| ${row.id} | ${row.category} | ${(row.skip_reason || "skipped").replace(/\|/g, "\\|")} | ${(row.skip_detail || row.note || "").replace(/\|/g, "\\|")} | ${row.url.replace(/\|/g, "\\|")} |\n`;
  }
}

const sections = [
  [1, "Likely Non-Story, Broken, Missing, Or Duplicate"],
  [2, "Too Short"],
  [3, "Contains Likely Junk"],
  [4, "Clean Looking"],
];

for (const [severity, title] of sections) {
  const list = bySeverity.get(severity) || [];
  md += `\n## ${title}\n\n`;
  md += `Count: ${list.length}.\n\n`;
  md += "| page | chars | flags | title |\n|---|---:|---|---|\n";
  for (const row of list.slice(0, severity === 4 ? 80 : 160)) {
    md += `${rowLine(row)}\n`;
  }
}

md += "\n## Review Details\n\n";
for (const row of pages.filter(row => row.status === "needs-review").slice(0, 120)) {
  md += `### ${row.id}\n\n`;
  md += `- URL: ${row.url}\n`;
  md += `- Title: ${row.title || "(none)"}\n`;
  md += `- Chars: ${row.body_chars}\n`;
  md += `- Flags: ${row.flags.join(", ")}\n`;
  if (row.rejected_files.length) md += `- Rejected files: ${row.rejected_files.join(", ")}\n`;
  if (row.snippet) md += `- Snippet: ${row.snippet}\n`;
  md += "\n";
}

writeFileSync(join(ROOT, "story-review.json"), JSON.stringify({ summary, pages, quarantined, skipped_paywall: skippedPaywall, skipped_other: skippedOther }, null, 2) + "\n");
writeFileSync(join(ROOT, "STORY_REVIEW.md"), md);
console.log(`Wrote STORY_REVIEW.md and story-review.json (${summary.article_like_pages} pages, ${summary.needs_review_pages} need review).`);
