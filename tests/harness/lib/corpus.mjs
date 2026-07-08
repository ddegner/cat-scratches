// Corpus enumeration shared by evaluate/propose/seed/mine scripts.
// A "scorable" page has source.html + expected.md, isn't quarantined,
// skipped, stale (expected_current === false), or fixture-broken.

import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const HARNESS_DIR = join(__dirname, "..");
export const CORPUS_DIR = join(HARNESS_DIR, "..", "corpus");
export const EXT_DIR = join(
  HARNESS_DIR,
  "..",
  "..",
  "SafariToDrafts",
  "Shared (Extension)",
  "Resources",
);

// ~20% of scorable pages are held out of optimization and only checked at
// final acceptance. The split is a deterministic hash of "slug/page" so it
// never shifts as the corpus grows.
const HOLDOUT_MODULO = 5;

export function isHoldout(slug, pageId) {
  const digest = createHash("sha1").update(`${slug}/${pageId}`).digest();
  return digest[0] % HOLDOUT_MODULO === 0;
}

export function loadManifest() {
  return JSON.parse(readFileSync(join(CORPUS_DIR, "manifest.json"), "utf8"));
}

export function readJsonSafe(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return null;
  }
}

export function pageDir(slug, pageId) {
  return join(CORPUS_DIR, "sites", slug, pageId);
}

function basePageRecord(site, page) {
  const dir = pageDir(site.slug, page.id);
  const annotations = readJsonSafe(join(dir, "annotations.json"));
  const fetchMeta = readJsonSafe(join(dir, "fetch.json"));
  return {
    slug: site.slug,
    page: page.id,
    id: `${site.slug}/${page.id}`,
    category: site.category,
    cms: site.cms,
    dir,
    url: fetchMeta?.final_url || fetchMeta?.recovery_url || page.url,
    manifestPage: page,
    annotations,
    quality: annotations?.quality || null,
    anchor: annotations?.quality === "near-perfect" || annotations?.quality === "auto-agreed",
    holdout: isHoldout(site.slug, page.id),
    hasSource: existsSync(join(dir, "source.html")),
    hasExpected: existsSync(join(dir, "expected.md")),
  };
}

function excludedFromScoring(record) {
  const page = record.manifestPage;
  return (
    page.quarantined ||
    page.skip_story_review ||
    page.expected_current === false ||
    record.quality === "fixture-broken"
  );
}

// Every page in the manifest, with metadata resolved. No filtering.
export function allPages() {
  const manifest = loadManifest();
  const records = [];
  for (const site of manifest.sites) {
    for (const page of site.pages) {
      records.push(basePageRecord(site, page));
    }
  }
  return records;
}

// Pages usable for scoring/optimization. set: "train" | "holdout" | "all".
export function scorablePages(set = "train") {
  return allPages().filter((record) => {
    if (!record.hasSource || !record.hasExpected) return false;
    if (excludedFromScoring(record)) return false;
    if (set === "train") return !record.holdout;
    if (set === "holdout") return record.holdout;
    return true;
  });
}

// Pages that could receive ground truth but don't have it yet.
export function unannotatedPages() {
  return allPages().filter(
    (record) => record.hasSource && !record.hasExpected && !excludedFromScoring(record),
  );
}

export function loadPageContent(record) {
  return {
    ...record,
    html: readFileSync(join(record.dir, "source.html"), "utf8"),
    expected: record.hasExpected ? readFileSync(join(record.dir, "expected.md"), "utf8") : "",
  };
}
