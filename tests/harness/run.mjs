#!/usr/bin/env node
// Loads each page's source.html into jsdom, runs content-extractor.js
// against it with default settings, and writes extracted.md + result.json.
// --pilot: only pilot slugs.
// --article-like: only story/article categories used by story-review.mjs.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { JSDOM, VirtualConsole } from "jsdom";
import { PILOT_SLUGS } from "./pilot.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "corpus");
const EXT = join(__dirname, "..", "..", "SafariToDrafts", "Shared (Extension)", "Resources");

const args = new Set(process.argv.slice(2));
const PILOT = args.has("--pilot");
const ARTICLE_LIKE = args.has("--article-like") || args.has("--stories");

const ARTICLE_CATEGORIES = new Set([
  "news-major", "news-intl", "tech-news", "science", "longform", "think-tank",
  "corp-blog", "blog", "newsletter", "recipe",
]);

const TURNDOWN_SRC  = readFileSync(join(EXT, "turndown.js"), "utf8");
const DEFAULTS_SRC  = readFileSync(join(EXT, "defaults.js"), "utf8");
const EXTRACTOR_SRC = readFileSync(join(EXT, "content-extractor.js"), "utf8");
const QUIET_VIRTUAL_CONSOLE = new VirtualConsole();
QUIET_VIRTUAL_CONSOLE.on("jsdomError", () => {});

const manifest = JSON.parse(readFileSync(join(ROOT, "manifest.json"), "utf8"));
const sites = PILOT
  ? manifest.sites.filter((s) => PILOT_SLUGS.includes(s.slug))
  : ARTICLE_LIKE
    ? manifest.sites.filter((s) => ARTICLE_CATEGORIES.has(s.category))
  : manifest.sites;

function extract(html, url) {
  const dom = new JSDOM(html, { url, pretendToBeVisual: true, virtualConsole: QUIET_VIRTUAL_CONSOLE });
  const { window } = dom;
  // jsdom's document is passed explicitly; extractor also pokes a few DOM APIs.
  const sandbox = {
    window,
    document: window.document,
    globalThis: {},
    self: {},
    navigator: window.navigator,
    location: window.location,
    getSelection: () => window.getSelection?.(),
  };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(TURNDOWN_SRC, sandbox);
  vm.runInContext(DEFAULTS_SRC, sandbox);
  vm.runInContext(EXTRACTOR_SRC, sandbox);

  const settings = sandbox.getDefaultSettings();
  const result = sandbox.extractContentFromDoc(window.document, settings, url);
  dom.window.close();
  return result;
}

let ok = 0, fail = 0;

for (const site of sites) {
  for (const page of site.pages) {
    if (page.quarantined || page.skip_story_review) continue;

    const dir = join(ROOT, "sites", site.slug, page.id);
    const htmlPath = join(dir, "source.html");
    if (!existsSync(htmlPath)) continue;

    const html = readFileSync(htmlPath, "utf8");
    const url = (() => {
      try { return JSON.parse(readFileSync(join(dir, "fetch.json"), "utf8")).final_url; }
      catch { return page.url; }
    })();

    const t0 = Date.now();
    try {
      const { title, body } = extract(html, url);
      writeFileSync(join(dir, "extracted.md"), (body || "") + "\n");
      writeFileSync(
        join(dir, "result.json"),
        JSON.stringify(
          { title, body_chars: (body || "").length, elapsed_ms: Date.now() - t0, error: null },
          null,
          2,
        ) + "\n",
      );
      ok++;
      console.log(`  ok   ${site.slug}/${page.id}  chars=${(body || "").length}  title="${(title || "").slice(0, 60)}"`);
    } catch (e) {
      fail++;
      writeFileSync(
        join(dir, "result.json"),
        JSON.stringify(
          { title: null, body_chars: 0, elapsed_ms: Date.now() - t0, error: String(e?.stack || e) },
          null,
          2,
        ) + "\n",
      );
      console.warn(`  FAIL ${site.slug}/${page.id}  ${String(e?.message || e)}`);
    }
  }
}

console.log(`\nrun summary: ok=${ok} failed=${fail}`);
