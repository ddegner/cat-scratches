#!/usr/bin/env node
// Recover failed corpus pages by finding one live alternative page per site.
//
// Strategy:
// 1. Target sites with no source.html unless --all-failed is passed.
// 2. Open the site's front page and collect story links from that page only.
// 3. Try normal HTTP fetch first for those front-page links.
// 4. Fall back to local Chrome headless DOM dump when the front page or story
//    candidate needs a browser-rendered page.
//
// This is intentionally polite: it stops after the first usable page for a site
// in the default mode and sleeps between sites.

import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import { JSDOM, VirtualConsole } from "jsdom";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "corpus");
const args = new Set(process.argv.slice(2));

const ALL_FAILED = args.has("--all-failed");
const FORCE = args.has("--force");
const NO_CHROME = args.has("--no-chrome");
const LIMIT_ARG = [...args].find(arg => arg.startsWith("--limit="));
const LIMIT = LIMIT_ARG ? Number(LIMIT_ARG.split("=")[1]) : Infinity;
const MAX_CANDIDATES_PER_SITE = 8;
const MAX_CHROME_CANDIDATES_PER_SITE = 1;

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36";
const CHROME =
  process.env.CHROME_BIN || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const QUIET_VIRTUAL_CONSOLE = new VirtualConsole();

const SKIP_PATH_RE = /\/(login|signin|sign-in|subscribe|subscription|account|privacy|terms|about|contact|advertising|ads?|tag|tags|author|authors|contributor|contributors|search|archive|archives|category|categories|topics?|section|sections?|newsletter|newsletters|career|careers|jobs?|naturecareers)(\/|$)/i;
const ASSET_RE = /\.(?:jpg|jpeg|png|gif|webp|svg|pdf|zip|mp3|mp4|m3u8|css|js)(?:[?#].*)?$/i;
const BLOCKED_TEXT_RE = /(access denied|just a moment|please enable javascript|enable javascript and cookies|verify you are human|are you a robot|checking your browser|captcha|unusual traffic|temporarily blocked|request blocked|403 forbidden|401 unauthorized)/i;
const SPONSORED_TEXT_RE = /\b(brandvoice|paid program|storytelling and expertise from marketers)\b/i;
const NOT_FOUND_RE = /(\b404\b|page not found|not found|page unavailable|the page you requested could not be found)/i;
const NON_STORY_TITLE_RE = /(^\s*$|terms of (use|service)|terms and conditions|privacy policy|cookie policy|ccpa policy|ethics and guidelines|advertis(e|ing)|subscribe|subscription|newsletter|free business name generator|network solutions|advisor board|overview for|open science publishing|research integrity and publication ethics|gates foundation partnership|payment terms|plos global public health|research position| job with |ghost for business|総合ガイド|^\|\s*bioRxiv$|^biorxiv channel|animal behavior and cognition\s*\|\s*bioRxiv|scientific american volume|^science\s*\|\s*aaas$|^the information$|wealthscore|healthy dinner recipes|brunch recipes|cell phones & smartphones for sale|desktops & all-in-one computers for sale|headphones & earbuds for sale|smart home devices|curtains & window treatments|umbrellas & rain accessories|environment & conservation software|create a (blog|portfolio website)|obituaries - news|^overcast$|prohibited and restricted businesses)/i;
const NON_STORY_LINK_TEXT_RE = /^(home|homepage|front page|latest|latest news|news|world|politics|business|tech|technology|science|health|sports|opinion|culture|style|travel|video|videos|podcast|podcasts|photos|newsletter|newsletters|subscribe|sign in|log in|login|register|account|search|menu|privacy|terms|contact|about|advertise|careers)$/i;

function parseJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function pageDir(site, page) {
  return join(ROOT, "sites", site.slug, page.id);
}

function sourcePath(site, page) {
  return join(pageDir(site, page), "source.html");
}

function fetchMetaPath(site, page) {
  return join(pageDir(site, page), "fetch.json");
}

function hasSource(site, page) {
  return existsSync(sourcePath(site, page));
}

function hasUsableSource(site, page) {
  if (!hasSource(site, page)) return false;
  const meta = readFetchMeta(site, page);
  if (meta?.recovery_title && NOT_FOUND_RE.test(meta.recovery_title)) return false;
  if (meta?.recovery_title && NON_STORY_TITLE_RE.test(meta.recovery_title)) return false;
  if (meta?.recovery_url && candidateScore(meta.recovery_url, meta.recovery_title || "") <= -100) return false;
  if (meta?.recovery_error) return false;
  return true;
}

function readFetchMeta(site, page) {
  const path = fetchMetaPath(site, page);
  if (!existsSync(path)) return null;
  try {
    return parseJson(path);
  } catch {
    return null;
  }
}

function canonicalUrl(url) {
  try {
    const parsed = new URL(url);
    parsed.hash = "";
    parsed.search = "";
    return parsed.toString().replace(/\/$/, "");
  } catch {
    return (url || "").replace(/[?#].*$/g, "").replace(/\/$/g, "");
  }
}

function currentUrl(site, page) {
  const meta = readFetchMeta(site, page);
  return meta?.final_url || meta?.recovery_url || page.url;
}

function normalizeUrl(candidate, base) {
  try {
    const url = new URL(candidate, base);
    url.hash = "";
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

function hostKey(hostname) {
  return hostname.replace(/^www\./i, "").toLowerCase();
}

function isSameSite(url, originUrl) {
  const candidate = new URL(url);
  const origin = new URL(originUrl);
  const candidateHost = hostKey(candidate.hostname);
  const originHost = hostKey(origin.hostname);
  return candidateHost === originHost ||
    candidateHost.endsWith(`.${originHost}`) ||
    originHost.endsWith(`.${candidateHost}`);
}

function candidateScore(url, linkText = "") {
  const parsed = new URL(url);
  const path = parsed.pathname;
  const segments = path.split("/").filter(Boolean);
  const text = linkText.replace(/\s+/g, " ").trim();
  const hostname = hostKey(parsed.hostname);
  let score = 0;

  if (path === "/" || ASSET_RE.test(path) || SKIP_PATH_RE.test(path)) return -1000;
  if (/\/news\/types\//i.test(path)) return -1000;
  if (hostname.endsWith("etsy.com") && path.startsWith("/c/")) return -1000;
  if (hostname.endsWith("ebay.com") && path.startsWith("/b/")) return -1000;
  if (hostname.endsWith("squarespace.com") && !path.startsWith("/blog/")) return -1000;
  if (hostname === "plos.org" && !/(\/article|\/news|\/blog)/i.test(path)) return -1000;
  if (hostname === "connect.biorxiv.org") return -1000;
  if (NON_STORY_LINK_TEXT_RE.test(text)) return -1000;

  const hasDate = /\/20\d{2}[/-]\d{1,2}[/-]\d{1,2}\//.test(path);
  const hasYear = /\/20\d{2}\//.test(path);
  const hasLongId = /\d{5,}/.test(path);
  const lastSegment = segments[segments.length - 1] || "";
  const hasSlug = lastSegment.includes("-") && lastSegment.length > 18;
  const hasReadableHeadline = text.length >= 25 && text.length <= 220 && /\s/.test(text);

  if (hasDate) score += 45;
  if (hasYear) score += 30;
  if (hasLongId) score += 18;
  if (hasSlug) score += 18;
  if (hasReadableHeadline) score += 26;
  if (text.length > 220) score -= 20;
  if (!hasDate && !hasYear && !hasLongId && !hasSlug && !hasReadableHeadline) score -= 40;
  if (segments.length >= 2) score += 14;
  if (segments.length >= 3) score += 8;
  if (/(article|story|stories|news|opinion|feature|review|analysis|politics|technology|science|business|world|health)/i.test(path)) score += 16;
  if (/(live|video|podcast|gallery|photo|photos|recipe|product|docs|documentation)/i.test(path)) score -= 8;
  if (/(sponsored|advertisement|shopping|deal|coupon)/i.test(`${path} ${text}`)) score -= 18;
  if (parsed.search && parsed.search.length < 80) score += 4;

  return score;
}

function dedupeAndRank(candidates, originUrl) {
  const seen = new Set();
  return candidates
    .map(candidate => {
      if (typeof candidate === "string") {
        return { url: normalizeUrl(candidate, originUrl), text: "" };
      }
      return {
        url: normalizeUrl(candidate.url, originUrl),
        text: candidate.text || "",
      };
    })
    .filter(candidate => candidate.url)
    .filter(candidate => isSameSite(candidate.url, originUrl))
    .filter(candidate => {
      if (seen.has(candidate.url)) return false;
      seen.add(candidate.url);
      return true;
    })
    .map(candidate => ({
      url: candidate.url,
      score: candidateScore(candidate.url, candidate.text),
    }))
    .filter(candidate => candidate.score > -100)
    .sort((a, b) => b.score - a.score)
    .map(candidate => candidate.url);
}

function extractStoryLinksFromHomepage(html, baseUrl) {
  try {
    const dom = new JSDOM(html, { url: baseUrl, virtualConsole: QUIET_VIRTUAL_CONSOLE });
    const doc = dom.window.document;
    const links = [...doc.querySelectorAll("a[href]")]
      .map(a => {
        const href = normalizeUrl(a.getAttribute("href"), baseUrl);
        if (!href) return null;
        const text = (a.textContent || a.getAttribute("aria-label") || "").replace(/\s+/g, " ").trim();
        const container = a.closest("nav, footer, header, [role='navigation'], [aria-label*='nav' i], [aria-label*='menu' i]");
        return { url: href, text, scoreOffset: container ? -20 : 0 };
      })
      .filter(Boolean)
      .filter(link => {
        if (!link.text || link.text.length < 12) {
          return candidateScore(link.url, link.text) >= 35;
        }
        return true;
      });
    dom.window.close();

    const seen = new Set();
    return links
      .filter(link => {
        if (seen.has(link.url)) return false;
        seen.add(link.url);
        return true;
      })
      .sort((a, b) => (candidateScore(b.url, b.text) + b.scoreOffset) - (candidateScore(a.url, a.text) + a.scoreOffset))
      .map(({ url, text }) => ({ url, text }));
  } catch {
    return [];
  }
}

function readableTextAndTitle(html, url) {
  try {
    const dom = new JSDOM(html, { url, virtualConsole: QUIET_VIRTUAL_CONSOLE });
    const doc = dom.window.document;
    doc.querySelectorAll("script, style, noscript, svg").forEach(el => el.remove());
    const title = (doc.title || "").trim();
    const text = (doc.body?.textContent || "").replace(/\s+/g, " ").trim();
    dom.window.close();
    return { title, text };
  } catch {
    const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    return { title: "", text };
  }
}

function isUsableHtml(html, url) {
  if (!html || html.length < 500) {
    return { ok: false, reason: "too-small" };
  }

  const { title, text } = readableTextAndTitle(html, url);
  if (NOT_FOUND_RE.test(title) || NOT_FOUND_RE.test(text.slice(0, 800))) {
    return { ok: false, reason: "not-found-page" };
  }
  if (NON_STORY_TITLE_RE.test(title)) {
    return { ok: false, reason: "non-story-title" };
  }
  if (BLOCKED_TEXT_RE.test(`${title}\n${text.slice(0, 3000)}`)) {
    return { ok: false, reason: "blocked-or-challenge" };
  }
  if (SPONSORED_TEXT_RE.test(`${title}\n${text.slice(0, 3000)}`)) {
    return { ok: false, reason: "sponsored-or-paid" };
  }
  if (text.length < 800) {
    return { ok: false, reason: `thin-text:${text.length}` };
  }

  return { ok: true, title, textLength: text.length };
}

async function fetchText(url, { timeoutMs = 15000, maxBytes = 4_000_000, accept = "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" } = {}) {
  const started = Date.now();
  const res = await fetch(url, {
    headers: {
      "User-Agent": UA,
      "Accept": accept,
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "no-cache",
    },
    redirect: "follow",
    signal: AbortSignal.timeout(timeoutMs),
  });

  const contentType = res.headers.get("content-type") || "";
  const text = await res.text();
  const bytes = Buffer.byteLength(text, "utf8");
  if (bytes > maxBytes) {
    const error = new Error(`too-large:${bytes}`);
    error.status = res.status;
    error.finalUrl = res.url;
    error.contentType = contentType;
    error.elapsedMs = Date.now() - started;
    throw error;
  }

  return {
    ok: res.ok,
    status: res.status,
    finalUrl: res.url,
    contentType,
    text,
    bytes,
    elapsedMs: Date.now() - started,
  };
}

async function dumpChromeDom(url, timeoutMs = 14000, virtualTimeBudget = 6000) {
  if (NO_CHROME || !existsSync(CHROME)) {
    return { ok: false, method: "chrome", reason: "chrome-unavailable", finalUrl: url };
  }

  const started = Date.now();
  const userDataDir = `/private/tmp/cat-scratches-chrome-${process.pid}-${Date.now()}`;
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
      `--virtual-time-budget=${virtualTimeBudget}`,
      "--dump-dom",
      url,
    ], {
      detached: true,
      stdio: ["ignore", "pipe", "pipe"],
    });

    function finish(result) {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(result);
    }

    function killChromeTree() {
      try {
        process.kill(-child.pid, "SIGKILL");
      } catch {
        try {
          child.kill("SIGKILL");
        } catch {
          // Process already exited.
        }
      }
    }

    const timer = setTimeout(() => {
      killChromeTree();
      finish({
        ok: false,
        method: "chrome",
        reason: "timeout",
        finalUrl: url,
      });
    }, timeoutMs);

    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");

    child.stdout.on("data", chunk => {
      stdout += chunk;
      if (Buffer.byteLength(stdout, "utf8") > maxBuffer) {
        killChromeTree();
        finish({
          ok: false,
          method: "chrome",
          reason: `too-large:${Buffer.byteLength(stdout, "utf8")}`,
          finalUrl: url,
        });
      }
    });

    child.stderr.on("data", chunk => {
      stderr += chunk;
      if (stderr.length > 2000) {
        stderr = stderr.slice(-2000);
      }
    });

    child.on("error", error => {
      finish({
        ok: false,
        method: "chrome",
        reason: String(error.message || error).slice(0, 160),
        finalUrl: url,
      });
    });

    child.on("close", code => {
      if (settled) return;
      if (code === 0) {
        finish({
          ok: true,
          method: "chrome",
          finalUrl: url,
          html: stdout,
          bytes: Buffer.byteLength(stdout, "utf8"),
          elapsedMs: Date.now() - started,
        });
      } else {
        finish({
          ok: false,
          method: "chrome",
          reason: `exit:${code}:${stderr.trim().slice(0, 120)}`,
          finalUrl: url,
        });
      }
    });
  });
}

function shouldTryChromeForHomepage(response) {
  if (!response) return true;
  if (!response.ok || [401, 403, 429].includes(response.status)) return true;
  if (!/text\/html|application\/xhtml\+xml/i.test(response.contentType || "")) return false;

  const links = extractStoryLinksFromHomepage(response.text, response.finalUrl);
  if (links.length < 2) return true;

  const { title, text } = readableTextAndTitle(response.text, response.finalUrl);
  return BLOCKED_TEXT_RE.test(`${title}\n${text.slice(0, 3000)}`);
}

async function readHomepage(origin) {
  try {
    const response = await fetchText(origin, { timeoutMs: 7000, maxBytes: 4_000_000 });
    if (response.ok && /text\/html|application\/xhtml\+xml/i.test(response.contentType)) {
      const links = extractStoryLinksFromHomepage(response.text, response.finalUrl);
      if (links.length >= 2 || NO_CHROME || !shouldTryChromeForHomepage(response)) {
        return {
          ok: true,
          method: "http-homepage",
          finalUrl: response.finalUrl,
          links,
        };
      }
    }
    if (!shouldTryChromeForHomepage(response)) {
      return { ok: false, method: "http-homepage", finalUrl: response.finalUrl, reason: `homepage:${response.status}` };
    }
  } catch {
    // Try the same front page through Chrome below.
  }

  const chrome = await dumpChromeDom(origin);
  if (!chrome.ok) return chrome;
  return {
    ok: true,
    method: "chrome-homepage",
    finalUrl: chrome.finalUrl,
    links: extractStoryLinksFromHomepage(chrome.html, chrome.finalUrl),
  };
}

async function discoverCandidates(site) {
  const origins = [...new Set(site.pages.map(page => new URL(page.url).origin))];
  const homepageAttempts = [];
  const candidates = [];

  for (const origin of origins) {
    const home = await readHomepage(origin);
    homepageAttempts.push({
      url: origin,
      method: home.method || null,
      finalUrl: home.finalUrl || origin,
      reason: home.reason || null,
      links: home.links?.length || 0,
    });

    if (home.ok) {
      candidates.push(...home.links);
    }
  }

  const ranked = dedupeAndRank(candidates, origins[0]).slice(0, MAX_CANDIDATES_PER_SITE);
  ranked.homepageAttempts = homepageAttempts;
  return ranked;
}

async function tryHttpCandidate(url) {
  const response = await fetchText(url, { timeoutMs: 7000, maxBytes: 8_000_000 });
  const usable = isUsableHtml(response.text, response.finalUrl);
  if (!response.ok) {
    return { ok: false, method: "http", status: response.status, reason: `http:${response.status}`, finalUrl: response.finalUrl };
  }
  if (!/text\/html|application\/xhtml\+xml/i.test(response.contentType)) {
    return { ok: false, method: "http", status: response.status, reason: `not-html:${response.contentType}`, finalUrl: response.finalUrl };
  }
  if (!usable.ok) {
    return { ok: false, method: "http", status: response.status, reason: usable.reason, finalUrl: response.finalUrl };
  }
  return {
    ok: true,
    method: "http",
    status: response.status,
    finalUrl: response.finalUrl,
    html: response.text,
    bytes: response.bytes,
    elapsedMs: response.elapsedMs,
    title: usable.title,
  };
}

async function tryChromeCandidate(url) {
  const started = Date.now();
  const page = await dumpChromeDom(url, 16000, 7000);
  if (!page.ok) return page;

  const usable = isUsableHtml(page.html, url);
  if (!usable.ok) {
    return { ok: false, method: "chrome", reason: usable.reason, finalUrl: url };
  }

  return {
    ok: true,
    method: "chrome",
    status: 200,
    finalUrl: url,
    html: page.html,
    bytes: page.bytes,
    elapsedMs: Date.now() - started,
    title: usable.title,
  };
}

function targetPages(site) {
  if (ALL_FAILED) {
    return site.pages.filter(page => {
      if (page.quarantined || page.skip_story_review) return false;
      if (!FORCE && hasUsableSource(site, page)) return false;
      const meta = readFetchMeta(site, page);
      return !meta || !(meta.status >= 200 && meta.status < 400);
    });
  }

  const activePages = site.pages.filter(page => !page.quarantined && !page.skip_story_review);
  if (activePages.length === 0) return [];

  if (activePages.some(page => hasUsableSource(site, page)) && !FORCE) {
    return [];
  }

  return [activePages.find(page => !hasUsableSource(site, page)) || activePages[0]].filter(Boolean);
}

async function recoverSite(site) {
  const pages = targetPages(site);
  if (pages.length === 0) return { skipped: true };

  const candidates = await discoverCandidates(site);
  const homepageAttempts = candidates.homepageAttempts || [];
  const attempts = homepageAttempts.map(attempt => ({
    url: attempt.url,
    method: attempt.method,
    status: 0,
    reason: attempt.reason || `homepage-links:${attempt.links}`,
  }));

  let chromeAttempts = 0;

  for (const candidateUrl of candidates) {
    const candidateKey = canonicalUrl(candidateUrl);
    if (usedSourceUrls.has(candidateKey)) {
      attempts.push({ url: candidateUrl, method: "skip", status: 0, reason: "duplicate-source-url" });
      continue;
    }

    let result;
    try {
      result = await tryHttpCandidate(candidateUrl);
    } catch (error) {
      result = {
        ok: false,
        method: "http",
        status: error.status || 0,
        reason: String(error.message || error).slice(0, 160),
        finalUrl: error.finalUrl || candidateUrl,
      };
    }
    attempts.push({ url: candidateUrl, method: result.method, status: result.status || 0, reason: result.reason || null });

    if (
      !result.ok &&
      chromeAttempts < MAX_CHROME_CANDIDATES_PER_SITE &&
      ["http:403", "http:401", "http:429", "blocked-or-challenge", "thin-text"].some(reason => String(result.reason).startsWith(reason))
    ) {
      chromeAttempts += 1;
      result = await tryChromeCandidate(candidateUrl);
      attempts.push({ url: candidateUrl, method: result.method, status: result.status || 0, reason: result.reason || null });
    }

    if (!result.ok) {
      continue;
    }

    const finalKey = canonicalUrl(result.finalUrl);
    if (usedSourceUrls.has(finalKey)) {
      attempts.push({ url: result.finalUrl, method: "skip", status: result.status || 0, reason: "duplicate-source-url" });
      continue;
    }

    const page = pages[0];
    const dir = pageDir(site, page);
    mkdirSync(dir, { recursive: true });
    writeFileSync(sourcePath(site, page), result.html);
    writeFileSync(fetchMetaPath(site, page), JSON.stringify({
      url: page.url,
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
      recovery_title: result.title || "",
      recovery_attempts: attempts.slice(0, 10),
    }, null, 2) + "\n");
    usedSourceUrls.add(finalKey);

    return { ok: true, page: page.id, url: result.finalUrl, method: result.method, bytes: result.bytes, title: result.title || "" };
  }

  for (const page of pages) {
    const dir = pageDir(site, page);
    mkdirSync(dir, { recursive: true });
    const existing = readFetchMeta(site, page) || { url: page.url };
    let rejectedSource = null;
    if (hasSource(site, page) && !hasUsableSource(site, page)) {
      rejectedSource = "source.rejected.html";
      const rejectedPath = join(dir, rejectedSource);
      rmSync(rejectedPath, { force: true });
      renameSync(sourcePath(site, page), rejectedPath);
    }
    writeFileSync(fetchMetaPath(site, page), JSON.stringify({
      ...existing,
      recovery_error: "No usable alternative page found",
      recovery_attempted_at: new Date().toISOString(),
      recovery_attempts: attempts.slice(0, 20),
      rejected_source: rejectedSource,
    }, null, 2) + "\n");
  }

  return { ok: false, attempts: attempts.length };
}

const manifest = parseJson(join(ROOT, "manifest.json"));
const usedSourceUrls = new Set();
for (const site of manifest.sites) {
  for (const page of site.pages) {
    if (page.quarantined || page.skip_story_review || !hasSource(site, page)) continue;
    usedSourceUrls.add(canonicalUrl(currentUrl(site, page)));
  }
}
let considered = 0;
let recovered = 0;
let failed = 0;
let skipped = 0;

for (const site of manifest.sites) {
  if (considered >= LIMIT) break;
  const pages = targetPages(site);
  if (pages.length === 0) {
    skipped += 1;
    continue;
  }

  considered += 1;
  process.stdout.write(`recover ${site.slug} ... `);
  const result = await recoverSite(site);

  if (result.ok) {
    recovered += 1;
    console.log(`ok ${result.method} ${result.page} ${result.bytes}B "${result.title.slice(0, 70)}"`);
  } else if (result.skipped) {
    skipped += 1;
    console.log("skip");
  } else {
    failed += 1;
    console.log(`fail attempts=${result.attempts || 0}`);
  }

  await sleep(750);
}

console.log(`\nrecover summary: considered=${considered} recovered=${recovered} failed=${failed} skipped=${skipped}`);
