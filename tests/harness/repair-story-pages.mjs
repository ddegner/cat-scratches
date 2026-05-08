#!/usr/bin/env node
// Replaces non-story corpus entries with story/article links discovered from that site's front page.
// This complements recover-failed.mjs by handling already-downloaded hub/search/list
// pages and avoiding duplicate story URLs.

import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import vm from "node:vm";
import { JSDOM, VirtualConsole } from "jsdom";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "corpus");
const EXT = join(__dirname, "..", "..", "SafariToDrafts", "Shared (Extension)", "Resources");

const args = new Set(process.argv.slice(2));
const INCLUDE_MISSING = args.has("--include-missing");
const QUARANTINE_FAILED = args.has("--quarantine-failed");
const LIMIT_ARG = [...args].find(arg => arg.startsWith("--limit="));
const LIMIT = LIMIT_ARG ? Number(LIMIT_ARG.split("=")[1]) : Infinity;
const CANDIDATE_LIMIT_ARG = [...args].find(arg => arg.startsWith("--candidate-limit="));
const CANDIDATE_LIMIT = CANDIDATE_LIMIT_ARG ? Number(CANDIDATE_LIMIT_ARG.split("=")[1]) : 8;
const FETCH_TIMEOUT_ARG = [...args].find(arg => arg.startsWith("--fetch-timeout="));
const FETCH_TIMEOUT_MS = FETCH_TIMEOUT_ARG ? Number(FETCH_TIMEOUT_ARG.split("=")[1]) : 8000;
const CHROME_TIMEOUT_ARG = [...args].find(arg => arg.startsWith("--chrome-timeout="));
const CHROME_TIMEOUT_MS = CHROME_TIMEOUT_ARG ? Number(CHROME_TIMEOUT_ARG.split("=")[1]) : 9000;
const MIN_EXTRACTED_ARG = [...args].find(arg => arg.startsWith("--min-extracted="));
const MIN_EXTRACTED_CHARS = MIN_EXTRACTED_ARG ? Number(MIN_EXTRACTED_ARG.split("=")[1]) : 700;

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36";
const CHROME = process.env.CHROME_BIN || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const QUIET = new VirtualConsole();
QUIET.on("jsdomError", () => {});

const ARTICLE_CATEGORIES = new Set([
  "news-major", "news-intl", "tech-news", "science", "longform", "think-tank",
  "corp-blog", "blog", "newsletter", "recipe",
]);

const BAD_TITLE_RE = /(Search results|^The Korea Times$|^Politique -|^Économie -|^Artificial intelligence \| AP News$|^Medium$|^Mataroa — Blogging platform|^Untitled$|^Science \| AAAS$|Animal Behavior and Cognition \| bioRxiv|Pharmacology and Toxicology \| bioRxiv|All Articles \| bioRxiv|Obituaries - News|WealthScore|CCPA Policy|Network Solutions|Create a Portfolio Website|PLOS Sustainability and Transformation|Cosmology and Nongalactic Astrophysics|Earth and Planetary Astrophysics|Reviews & Analysis \| Nature|Careers at Medium|Privacy Policy|Consumer Health Data Privacy Policy|Free Business Name Generator|Environment & Conservation Software|Concierge Email Newsletter Migration|Buttondown for businesses|Ghost for Business|College Journalism Awards|Best .* Movies|best .*radios|best laptops|Archives - The Globalist)/i;
const BAD_NOTE_RE = /(hub page|search|homepage|home page|front page|category|section|tag|topic|archive|listing|index|profile|top content|not found|podcast page|episode|watch page|video|guide|overview|interactive|live)/i;
const BAD_URL_RE = /(\/hub\/|\/search\?|\/search\/|\/category\/|\/categories\/|\/tag\/|\/tags\/|\/topics?\/|\/sections?\/|\/archive(?:\/)?$|\/author\/|\/authors\/|\/profile\/|\/profiles\/|\/top-content|\/guide\/|\/guides\/|\/podcast|\/video\/|\/videos\/|\/live-news\/|\/careers?(?:\/|-|$)|\/jobs?(?:\/|-|$)|\/privacy|\/privacy-policy|\/cookie-policy|\/legal\/|\/features\/|\/tools\/|\/industries\/|\/businesses(?:\/|$)|\/solutions\/|\/collection\/|\/global-issues\/[^/]+\/?$|\/nature\/reviews-and-analysis|\?query=|^https?:\/\/[^/]+\/?$)/i;
const SKIP_PATH_RE = /\/(login|signin|sign-in|subscribe|subscription|account|privacy|terms|about|contact|advertising|ads?|tag|tags|author|authors|contributor|contributors|search|archives|category|categories|topics?|section|sections?|newsletter|newsletters|career|careers|jobs?|legal|policy|policies|features|tools|industries|businesses|solutions|hub|video|videos|podcast|podcasts|live-news)(\/|-|$)/i;
const ASSET_RE = /\.(?:jpg|jpeg|png|gif|webp|svg|pdf|zip|mp3|mp4|m3u8|css|js)(?:[?#].*)?$/i;
const BAD_TEXT_RE = /(access denied|just a moment|please enable javascript|verify you are human|captcha|request blocked|403 forbidden|401 unauthorized|page not found|article_not_found|brandvoice|paid program|storytelling and expertise from marketers)/i;

const extractorSrc = {
  turndown: readFileSync(join(EXT, "turndown.js"), "utf8"),
  defaults: readFileSync(join(EXT, "defaults.js"), "utf8"),
  extractor: readFileSync(join(EXT, "content-extractor.js"), "utf8"),
};

function pageDir(site, page) {
  return join(ROOT, "sites", site.slug, page.id);
}

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return null;
  }
}

function pageFiles(site, page) {
  const dir = pageDir(site, page);
  return {
    dir,
    source: join(dir, "source.html"),
    fetch: join(dir, "fetch.json"),
    result: join(dir, "result.json"),
    extracted: join(dir, "extracted.md"),
    expected: join(dir, "expected.md"),
  };
}

function currentUrl(site, page) {
  const files = pageFiles(site, page);
  const fetchMeta = readJson(files.fetch);
  return fetchMeta?.final_url || fetchMeta?.recovery_url || page.url;
}

function canonicalUrl(url) {
  try {
    const parsed = new URL(url);
    parsed.hash = "";
    parsed.search = "";
    return parsed.toString().replace(/\/$/, "");
  } catch {
    return url;
  }
}

function normalizeUrl(candidate, base) {
  try {
    const url = new URL(candidate, base);
    url.hash = "";
    if (!["http:", "https:"].includes(url.protocol)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

function hostKey(hostname) {
  return hostname.replace(/^www\./i, "").toLowerCase();
}

function isSameSite(url, originUrl) {
  const a = hostKey(new URL(url).hostname);
  const b = hostKey(new URL(originUrl).hostname);
  return a === b || a.endsWith(`.${b}`) || b.endsWith(`.${a}`);
}

function scoreCandidate(url, text = "") {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return -1000;
  }

  const pathname = parsed.pathname;
  const segments = pathname.split("/").filter(Boolean);
  const last = segments.at(-1) || "";
  if (pathname === "/" || ASSET_RE.test(pathname) || SKIP_PATH_RE.test(pathname)) return -1000;
  if (parsed.hostname.endsWith("arxiv.org") && !pathname.startsWith("/abs/")) return -1000;
  if (parsed.hostname.endsWith("biorxiv.org") && !pathname.startsWith("/content/10.1101/")) return -1000;
  if (parsed.hostname.endsWith("ghost.org") && !pathname.startsWith("/resources/")) return -1000;
  if (parsed.hostname.endsWith("nature.com") && !pathname.startsWith("/articles/")) return -1000;
  if (parsed.hostname.endsWith("squarespace.com") && !pathname.startsWith("/blog/")) return -1000;
  if (parsed.hostname.endsWith("theglobalist.com") && /^\/global-issues\/[^/]+\/?$/i.test(pathname)) return -1000;

  let score = 0;
  if (/\/20\d{2}[/-]\d{1,2}[/-]\d{1,2}\//.test(pathname)) score += 45;
  if (/\/20\d{2}\//.test(pathname)) score += 28;
  if (/\d{5,}/.test(pathname)) score += 16;
  if (last.includes("-") && last.length > 18) score += 22;
  if (text.length >= 25 && text.length <= 220 && /\s/.test(text)) score += 30;
  if (segments.length >= 2) score += 12;
  if (segments.length >= 3) score += 8;
  if (/(article|story|stories|news|opinion|feature|review|analysis|politics|technology|science|business|world|health|culture|essay|recipe)/i.test(pathname)) score += 14;
  if (/(live|video|podcast|gallery|photo|photos|product|docs|documentation|guide|hub|search|best-movies|best-laptops|best-dab)/i.test(pathname)) score -= 35;
  return score;
}

function readable(html, url) {
  try {
    const dom = new JSDOM(html, { url, virtualConsole: QUIET });
    const doc = dom.window.document;
    doc.querySelectorAll("script, style, noscript, svg").forEach(el => el.remove());
    const title = (doc.title || "").replace(/\s+/g, " ").trim();
    const text = (doc.body?.textContent || "").replace(/\s+/g, " ").trim();
    dom.window.close();
    return { title, text };
  } catch {
    return { title: "", text: html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() };
  }
}

function isUsableStory(html, url) {
  if (!html || html.length < 500) return { ok: false, reason: "too-small" };
  const { title, text } = readable(html, url);
  if (BAD_TITLE_RE.test(title)) return { ok: false, reason: "bad-title" };
  if (BAD_URL_RE.test(url)) return { ok: false, reason: "bad-url" };
  if (BAD_TEXT_RE.test(`${title}\n${text.slice(0, 2500)}`)) return { ok: false, reason: "blocked-or-error" };
  if (text.length < 700) return { ok: false, reason: `thin:${text.length}` };
  return { ok: true, title, textLength: text.length };
}

function pageReasons(site, page, duplicateKeys) {
  if (!ARTICLE_CATEGORIES.has(site.category) || page.quarantined || page.skip_story_review) return [];
  const files = pageFiles(site, page);
  if (existsSync(files.expected)) return [];
  const hasSource = existsSync(files.source);
  const result = readJson(files.result) || {};
  const fetchMeta = readJson(files.fetch) || {};
  const title = fetchMeta.recovery_title || result.title || "";
  const url = currentUrl(site, page);
  const reasons = [];
  if (INCLUDE_MISSING && !hasSource) reasons.push("missing-source");
  if (BAD_NOTE_RE.test(page.note || "")) reasons.push("bad-note");
  if (BAD_TITLE_RE.test(title)) reasons.push("bad-title");
  if (BAD_URL_RE.test(url)) reasons.push("bad-url");
  if (hasSource && !page.allow_short && (result.body_chars || 0) < MIN_EXTRACTED_CHARS) reasons.push(`too-thin:${result.body_chars || 0}`);
  if (hasSource && duplicateKeys.has(canonicalUrl(url))) reasons.push("duplicate-url");
  return reasons;
}

async function fetchText(url, timeoutMs = FETCH_TIMEOUT_MS, maxBytes = 8_000_000) {
  const started = Date.now();
  const res = await fetch(url, {
    headers: {
      "User-Agent": UA,
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "no-cache",
    },
    redirect: "follow",
    signal: AbortSignal.timeout(timeoutMs),
  });
  const text = await res.text();
  const bytes = Buffer.byteLength(text, "utf8");
  if (bytes > maxBytes) throw new Error(`too-large:${bytes}`);
  return {
    ok: res.ok,
    status: res.status,
    finalUrl: res.url,
    contentType: res.headers.get("content-type") || "",
    text,
    bytes,
    elapsedMs: Date.now() - started,
  };
}

async function dumpChromeDom(url, timeoutMs = CHROME_TIMEOUT_MS) {
  if (!existsSync(CHROME)) return { ok: false, method: "chrome", reason: "chrome-unavailable", finalUrl: url };
  const started = Date.now();
  const userDataDir = `/private/tmp/cat-scratches-story-repair-${process.pid}-${Date.now()}`;
  const maxBuffer = 12 * 1024 * 1024;

  return await new Promise(resolve => {
    let settled = false;
    let stdout = "";
    let stderr = "";
    const child = spawn(CHROME, [
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-dev-shm-usage",
      `--user-data-dir=${userDataDir}`,
      `--user-agent=${UA}`,
      `--virtual-time-budget=${Math.max(2500, Math.min(timeoutMs - 1500, 7000))}`,
      "--dump-dom",
      url,
    ], { detached: true, stdio: ["ignore", "pipe", "pipe"] });

    const finish = result => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(result);
    };
    const kill = () => {
      try { process.kill(-child.pid, "SIGKILL"); }
      catch { try { child.kill("SIGKILL"); } catch {} }
    };
    const timer = setTimeout(() => {
      kill();
      finish({ ok: false, method: "chrome", reason: "timeout", finalUrl: url });
    }, timeoutMs);

    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", chunk => {
      stdout += chunk;
      if (Buffer.byteLength(stdout, "utf8") > maxBuffer) {
        kill();
        finish({ ok: false, method: "chrome", reason: "too-large", finalUrl: url });
      }
    });
    child.stderr.on("data", chunk => { stderr = (stderr + chunk).slice(-2000); });
    child.on("error", error => finish({ ok: false, method: "chrome", reason: String(error.message || error), finalUrl: url }));
    child.on("close", code => {
      if (code === 0) {
        finish({ ok: true, method: "chrome", finalUrl: url, html: stdout, bytes: Buffer.byteLength(stdout, "utf8"), elapsedMs: Date.now() - started });
      } else {
        finish({ ok: false, method: "chrome", reason: `exit:${code}:${stderr.slice(0, 120)}`, finalUrl: url });
      }
    });
  });
}

function extractLinks(html, baseUrl) {
  try {
    const dom = new JSDOM(html, { url: baseUrl, virtualConsole: QUIET });
    const links = [...dom.window.document.querySelectorAll("a[href]")]
      .map(anchor => ({
        url: normalizeUrl(anchor.getAttribute("href"), baseUrl),
        text: (anchor.textContent || anchor.getAttribute("aria-label") || "").replace(/\s+/g, " ").trim(),
        nav: Boolean(anchor.closest("nav, footer, header, [role='navigation']")),
      }))
      .filter(link => link.url && isSameSite(link.url, baseUrl));
    dom.window.close();

    const seen = new Set();
    return links
      .filter(link => !seen.has(link.url) && seen.add(link.url))
      .map(link => ({ ...link, score: scoreCandidate(link.url, link.text) - (link.nav ? 20 : 0) }))
      .filter(link => link.score > 10)
      .sort((a, b) => b.score - a.score);
  } catch {
    return [];
  }
}

async function homepageCandidates(site) {
  const origins = [...new Set(site.pages.map(page => {
    try { return new URL(page.url).origin; }
    catch { return null; }
  }).filter(Boolean))];
  const links = [];

  for (const origin of origins) {
    try {
      const res = await fetchText(origin, Math.min(FETCH_TIMEOUT_MS, 7000), 5_000_000);
      if (res.ok && /html/i.test(res.contentType)) links.push(...extractLinks(res.text, res.finalUrl));
    } catch {}
    if (links.length < 4) {
      const chrome = await dumpChromeDom(origin);
      if (chrome.ok) links.push(...extractLinks(chrome.html, chrome.finalUrl));
    }
  }

  const seen = new Set();
  return links
    .filter(link => !seen.has(link.url) && seen.add(link.url))
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.max(CANDIDATE_LIMIT, 4));
}

async function tryCandidate(url) {
  try {
    const res = await fetchText(url);
    if (!res.ok) {
      if (![401, 403, 429].includes(res.status)) {
        return { ok: false, method: "http", status: res.status, reason: `http:${res.status}`, finalUrl: res.finalUrl };
      }
    } else if (!/html/i.test(res.contentType)) {
      return { ok: false, method: "http", status: res.status, reason: `not-html:${res.contentType}`, finalUrl: res.finalUrl };
    } else {
      const usable = isUsableStory(res.text, res.finalUrl);
      if (usable.ok) {
        return { ok: true, method: "http", status: res.status, finalUrl: res.finalUrl, html: res.text, bytes: res.bytes, elapsedMs: res.elapsedMs, title: usable.title };
      }
      if (["bad-title", "bad-url"].includes(usable.reason)) {
        return { ok: false, method: "http", reason: usable.reason, finalUrl: res.finalUrl };
      }
    }
  } catch {}

  const chrome = await dumpChromeDom(url);
  if (!chrome.ok) return chrome;
  const usable = isUsableStory(chrome.html, chrome.finalUrl);
  if (!usable.ok) return { ok: false, method: "chrome", reason: usable.reason, finalUrl: chrome.finalUrl };
  return { ok: true, method: "chrome", status: 200, finalUrl: chrome.finalUrl, html: chrome.html, bytes: chrome.bytes, elapsedMs: chrome.elapsedMs, title: usable.title };
}

function extractContent(html, url) {
  const dom = new JSDOM(html, { url, pretendToBeVisual: true, virtualConsole: QUIET });
  const { window } = dom;
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
  vm.runInContext(extractorSrc.turndown, sandbox);
  vm.runInContext(extractorSrc.defaults, sandbox);
  vm.runInContext(extractorSrc.extractor, sandbox);
  const result = sandbox.extractContentFromDoc(window.document, sandbox.getDefaultSettings(), url);
  window.close();
  return result;
}

function backup(path) {
  if (!existsSync(path)) return;
  const target = path.replace(/(\.[^.]+)$/i, ".before-story-repair$1");
  if (existsSync(target)) return;
  writeFileSync(target, readFileSync(path));
}

function uniqueSibling(path, marker) {
  const base = path.replace(/(\.[^.]+)$/i, `${marker}$1`);
  if (!existsSync(base)) return base;
  for (let index = 2; index < 100; index += 1) {
    const candidate = path.replace(/(\.[^.]+)$/i, `${marker}-${index}$1`);
    if (!existsSync(candidate)) return candidate;
  }
  return path.replace(/(\.[^.]+)$/i, `${marker}-${Date.now()}$1`);
}

function quarantineFailedPage(site, page, reasons) {
  if (!QUARANTINE_FAILED) return null;
  if (!reasons.some(reason => ["bad-title", "bad-url", "bad-note", "duplicate-url"].includes(reason))) return null;

  const files = pageFiles(site, page);
  if (existsSync(files.expected) || !existsSync(files.source)) return null;

  const rejected = {};
  for (const [name, path] of Object.entries({ source: files.source, extracted: files.extracted, result: files.result })) {
    if (!existsSync(path)) continue;
    const target = uniqueSibling(path, ".rejected-nonstory");
    renameSync(path, target);
    rejected[name] = target.split("/").at(-1);
  }
  page.note = "no usable story/article page found";
  return rejected;
}

function writeReplacement(site, page, result, candidateUrl, reasons, extracted) {
  const files = pageFiles(site, page);
  mkdirSync(files.dir, { recursive: true });
  [files.source, files.fetch, files.extracted, files.result].forEach(backup);

  writeFileSync(files.source, result.html);
  writeFileSync(files.fetch, JSON.stringify({
    url: result.finalUrl,
    replaced_url: page.url,
    recovery_url: candidateUrl,
    final_url: result.finalUrl,
    status: result.status,
    content_type: "text/html",
    bytes: result.bytes,
    error: null,
    fetched_at: new Date().toISOString(),
    elapsed_ms: result.elapsedMs,
    user_agent: UA,
    recovery_method: result.method,
    recovery_title: result.title,
    replacement_reasons: reasons,
  }, null, 2) + "\n");

  writeFileSync(files.extracted, `${extracted.body || ""}\n`);
  writeFileSync(files.result, JSON.stringify({
    title: extracted.title,
    body_chars: (extracted.body || "").length,
    elapsed_ms: 0,
    error: null,
  }, null, 2) + "\n");

  page.replaced_from = page.replaced_from || page.url;
  page.url = result.finalUrl;
  page.note = "story/article page";
  return (extracted.body || "").length;
}

const manifestPath = join(ROOT, "manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const urlCounts = new Map();

for (const site of manifest.sites) {
  for (const page of site.pages) {
    if (existsSync(pageFiles(site, page).source)) {
      const key = canonicalUrl(currentUrl(site, page));
      urlCounts.set(key, (urlCounts.get(key) || 0) + 1);
    }
  }
}

const usedUrls = new Set([...urlCounts.entries()].filter(([, count]) => count === 1).map(([url]) => url));
let considered = 0;
let replaced = 0;
let failed = 0;

for (const site of manifest.sites) {
  const duplicateKeys = new Set(
    site.pages
      .map(page => canonicalUrl(currentUrl(site, page)))
      .filter(key => (urlCounts.get(key) || 0) > 1),
  );
  const pages = site.pages
    .map(page => ({ page, reasons: pageReasons(site, page, duplicateKeys) }))
    .filter(item => item.reasons.length > 0);

  if (pages.length === 0) continue;
  process.stdout.write(`repair ${site.slug} (${pages.length}) ... `);
  const candidates = (await homepageCandidates(site)).slice(0, CANDIDATE_LIMIT);
  let siteReplaced = 0;

  for (const { page, reasons } of pages) {
    if (considered >= LIMIT) break;
    considered += 1;
    let ok = false;

    for (const candidate of candidates) {
      const key = canonicalUrl(candidate.url);
      if (usedUrls.has(key)) continue;
      if (site.pages.some(existing => existing !== page && canonicalUrl(currentUrl(site, existing)) === key)) continue;

      const result = await tryCandidate(candidate.url);
      await sleep(250);
      if (!result.ok) continue;
      const finalKey = canonicalUrl(result.finalUrl);
      if (usedUrls.has(finalKey)) continue;
      if (site.pages.some(existing => existing !== page && canonicalUrl(currentUrl(site, existing)) === finalKey)) continue;

      const extracted = extractContent(result.html, result.finalUrl);
      const bodyChars = (extracted.body || "").length;
      if (bodyChars < MIN_EXTRACTED_CHARS || BAD_TITLE_RE.test(extracted.title || "") || BAD_URL_RE.test(result.finalUrl)) continue;

      writeReplacement(site, page, result, candidate.url, reasons, extracted);
      usedUrls.add(finalKey);
      replaced += 1;
      siteReplaced += 1;
      ok = true;
      console.log(`\n  ${site.slug}/${page.id} -> ${result.title.slice(0, 90)} (${bodyChars} chars)`);
      break;
    }

    if (!ok) {
      failed += 1;
      const files = pageFiles(site, page);
      const meta = readJson(files.fetch) || { url: page.url };
      const rejected = quarantineFailedPage(site, page, reasons);
      writeFileSync(files.fetch, JSON.stringify({
        ...meta,
        story_repair_error: "No usable unique story/article page found",
        story_repair_attempted_at: new Date().toISOString(),
        story_repair_reasons: reasons,
        story_repair_candidates: candidates.map(candidate => candidate.url).slice(0, 12),
        rejected_nonstory_files: rejected || meta.rejected_nonstory_files || null,
      }, null, 2) + "\n");
    }
  }

  console.log(siteReplaced ? `done ${siteReplaced}/${pages.length}` : "no replacement");
  if (considered >= LIMIT) break;
  await sleep(600);
}

manifest.generated_at = new Date().toISOString().slice(0, 10);
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(`\nrepair story pages summary: considered=${considered} replaced=${replaced} failed=${failed}`);
