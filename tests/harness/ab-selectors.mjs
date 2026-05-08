#!/usr/bin/env node
// Recursive A/B testing for default content selector order.
//
// This optimizes selector order against pages with expected.md ground truth.
// It deliberately does not score unannotated pages; those remain useful as
// smoke coverage through run.mjs.

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { JSDOM, VirtualConsole } from "jsdom";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "corpus");
const EXT = join(__dirname, "..", "..", "SafariToDrafts", "Shared (Extension)", "Resources");

const args = new Set(process.argv.slice(2));
const argValue = (name, fallback) => {
  const found = [...args].find(arg => arg.startsWith(`${name}=`));
  return found ? found.slice(name.length + 1) : fallback;
};

const ROUNDS = Number(argValue("--rounds", "6"));
const TOP_COUNT = Number(argValue("--top", "25"));
const MIN_OBJECTIVE_GAIN = Number(argValue("--min-gain", "25"));
const MODE = argValue("--mode", "staged");
const ENGINE = argValue("--engine", "fast");
const SELECTORS_FROM = argValue("--selectors-from", "defaults");
const FULL_VERIFY_TOP = Number(argValue("--full-verify-top", ENGINE === "fast" ? "12" : "0"));
const WRITE_RESULTS = !args.has("--no-write");

const TURNDOWN_SRC = readFileSync(join(EXT, "turndown.js"), "utf8");
const DEFAULTS_SRC = readFileSync(join(EXT, "defaults.js"), "utf8");
const EXTRACTOR_SRC = readFileSync(join(EXT, "content-extractor.js"), "utf8");
const QUIET_VIRTUAL_CONSOLE = new VirtualConsole();

const ARTICLE_CATEGORIES = new Set([
  "news-major", "news-intl", "tech-news", "science", "longform", "think-tank",
  "corp-blog", "blog", "newsletter", "recipe",
]);

const STOP = new Set(
  "the a an and or but if then of to in on at for by with from as is are was were be been being this that these those it its it's i you he she we they them his her our your my"
    .split(/\s+/),
);

function defaultSettings() {
  const sandbox = { globalThis: {}, self: {} };
  sandbox.globalThis = sandbox;
  sandbox.self = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(DEFAULTS_SRC, sandbox);
  return sandbox.getDefaultSettings();
}

function tokens(s) {
  return (s || "")
    .toLowerCase()
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .split(/\s+/)
    .filter(t => t.length >= 3 && !STOP.has(t));
}

function blocks(s) {
  return (s || "")
    .split(/\n{2,}/)
    .map(b => b.trim())
    .filter(b => b.length > 0 && !/^#{1,6}\s/.test(b));
}

function overlap(a, b) {
  const B = new Set(b);
  let hit = 0;
  for (const t of a) if (B.has(t)) hit++;
  return a.length === 0 ? 0 : hit / a.length;
}

function scoreText(extracted, expected) {
  const et = tokens(extracted);
  const xt = tokens(expected);
  const ets = new Set(et);
  const xts = new Set(xt);
  const inter = [...xts].filter(t => ets.has(t)).length;
  const recall = xts.size ? inter / xts.size : 0;
  const precision = ets.size ? inter / ets.size : 0;
  const f1 = recall + precision ? (2 * recall * precision) / (recall + precision) : 0;
  const expBlocks = blocks(expected).map(tokens);
  const extBlocks = blocks(extracted).map(tokens);
  const missing = expBlocks.filter(b => overlap(b, et) < 0.3).length;
  const extra = extBlocks.filter(b => overlap(b, xt) < 0.3).length;

  return {
    f1,
    recall,
    precision,
    lenRatio: expected.length ? extracted.length / expected.length : 0,
    missing,
    extra,
  };
}

function loadManifest() {
  return JSON.parse(readFileSync(join(ROOT, "manifest.json"), "utf8"));
}

function loadScoredPages(manifest) {
  const pages = [];

  for (const site of manifest.sites) {
    for (const page of site.pages) {
      const dir = join(ROOT, "sites", site.slug, page.id);
      const sourcePath = join(dir, "source.html");
      const expectedPath = join(dir, "expected.md");
      if (!existsSync(sourcePath) || !existsSync(expectedPath)) continue;

      const annotationsPath = join(dir, "annotations.json");
      if (existsSync(annotationsPath)) {
        try {
          const annotations = JSON.parse(readFileSync(annotationsPath, "utf8"));
          if (annotations.quality === "fixture-broken") continue;
        } catch {
          // Keep the page if annotations are malformed; score should surface it.
        }
      }

      let url = page.url;
      try {
        url = JSON.parse(readFileSync(join(dir, "fetch.json"), "utf8")).final_url || url;
      } catch {
        // Use manifest URL.
      }

      pages.push({
        slug: site.slug,
        page: page.id,
        category: site.category,
        cms: site.cms,
        url,
        html: readFileSync(sourcePath, "utf8"),
        expected: readFileSync(expectedPath, "utf8"),
      });
    }
  }

  return pages;
}

function loadActiveCorpusStats(manifest) {
  let pages = 0;
  let sites = 0;
  let storyPages = 0;
  let storySites = 0;
  let storyMissing = 0;
  let storyThin = 0;
  let storyDuplicateUrls = 0;
  const storyUrls = new Set();

  for (const site of manifest.sites) {
    let siteHasSource = false;
    let storySiteHasSource = false;
    for (const page of site.pages) {
      const dir = join(ROOT, "sites", site.slug, page.id);
      const hasSource = existsSync(join(dir, "source.html"));
      if (hasSource) {
        pages += 1;
        siteHasSource = true;
      }

      if (!ARTICLE_CATEGORIES.has(site.category)) continue;
      if (!hasSource) {
        storyMissing += 1;
        continue;
      }

      storyPages += 1;
      storySiteHasSource = true;

      try {
        const result = JSON.parse(readFileSync(join(dir, "result.json"), "utf8"));
        if ((result.body_chars || 0) < 700) storyThin += 1;
      } catch {
        storyThin += 1;
      }

      let url = page.url;
      try {
        const meta = JSON.parse(readFileSync(join(dir, "fetch.json"), "utf8"));
        url = meta.final_url || meta.recovery_url || url;
      } catch {
        // Use manifest URL.
      }

      const key = url.replace(/[?#].*$/g, "").replace(/\/$/g, "");
      if (storyUrls.has(key)) storyDuplicateUrls += 1;
      storyUrls.add(key);
    }
    if (siteHasSource) sites += 1;
    if (storySiteHasSource) storySites += 1;
  }
  return {
    pages,
    sites,
    storyPages,
    storySites,
    storyMissing,
    storyThin,
    storyDuplicateUrls,
  };
}

function validateFilters(doc, filters) {
  const valid = [];
  for (const filter of filters) {
    if (typeof filter !== "string" || !filter.trim()) continue;
    try {
      doc.querySelector(filter);
      valid.push(filter);
    } catch {
      // Ignore invalid selectors.
    }
  }
  return valid;
}

function removeFilteredDescendants(element, validFilters) {
  if (!element || validFilters.length === 0) return element;
  for (const filter of validFilters) {
    try {
      element.querySelectorAll(filter).forEach(el => el.remove());
    } catch {
      // Ignore selector errors.
    }
  }
  return element;
}

function candidateMetrics(element, validFilters) {
  const candidate = removeFilteredDescendants(element.cloneNode(true), validFilters);
  const textLength = (candidate.textContent || "").trim().length;
  const linkLength = [...candidate.querySelectorAll("a")]
    .reduce((total, link) => total + (link.textContent || "").length, 0);
  const linkRatio = textLength > 0 ? linkLength / textLength : 1;
  return { candidate, textLength, linkRatio };
}

function cleanupContent(content) {
  return (content || "")
    .replace(/\n\s*\n\s*\n+/g, "\n\n")
    .replace(/ +/g, " ")
    .replace(/.*click here to subscribe.*$/gim, "")
    .replace(/.*sign up for our newsletter.*$/gim, "")
    .replace(/.*download our app.*$/gim, "")
    .replace(/.*get breaking news alerts.*$/gim, "")
    .replace(/.*follow us on (twitter|facebook|instagram).*$/gim, "")
    .replace(/^\s*.*\(Getty Images\).*$/gm, "")
    .replace(/^\s*.*\(AP Photo.*\).*$/gm, "")
    .replace(/^\s*.*Photo credit:.*$/gm, "")
    .replace(/^\s*.*Image credit:.*$/gm, "")
    .replace(/^\s*.*\(Corbis\).*$/gm, "")
    .replace(/^\s*subscribe today\s*$/gim, "")
    .replace(/^\s*join our newsletter\s*$/gim, "")
    .replace(/^\s*advertisement\s*$/gim, "")
    .replace(/^\s*sponsored content\s*$/gim, "")
    .trim();
}

function fastExtractSelectorText(doc, selector, validFilters) {
  let bestElement = null;
  let bestSanitizedElement = null;
  let bestScore = 0;

  try {
    const elements = doc.querySelectorAll(selector);
    for (const element of elements) {
      const { candidate, textLength, linkRatio } = candidateMetrics(element, validFilters);
      if (textLength < 150 || linkRatio >= 0.3) continue;

      let score = textLength;
      if (element.tagName === "ARTICLE") score += 1000;
      if (element.getAttribute("role") === "main") score += 800;
      if (element.getAttribute("itemtype")) score += 600;

      const classAndId = `${element.getAttribute("class") || ""} ${element.id || ""}`.toLowerCase();
      if (
        classAndId.includes("article") ||
        classAndId.includes("content") ||
        classAndId.includes("post") ||
        classAndId.includes("entry")
      ) {
        score += 400;
      }
      if (
        classAndId.includes("nav") ||
        classAndId.includes("menu") ||
        classAndId.includes("header") ||
        classAndId.includes("footer")
      ) {
        score -= 2000;
      }

      if (score > bestScore) {
        bestScore = score;
        bestElement = element;
        bestSanitizedElement = candidate;
      }
    }
  } catch {
    return null;
  }

  if (!bestElement) return null;
  const textElement = bestSanitizedElement || bestElement;
  return cleanupContent(textElement.textContent || textElement.innerText || "");
}

function fastFallbackText(doc, validFilters) {
  const bodyClone = doc.body?.cloneNode(true);
  removeFilteredDescendants(bodyClone, validFilters);
  return cleanupContent(bodyClone?.textContent || "");
}

function fastExtractText(selectors, selectorBodies, fallbackBody) {
  for (const selector of selectors) {
    const body = selectorBodies.get(selector);
    if (body) return body;
  }
  return fallbackBody;
}

function buildPageRuntime(page, baseFilters, baseSelectors, engine = ENGINE) {
  const dom = new JSDOM(page.html, {
    url: page.url,
    pretendToBeVisual: true,
    virtualConsole: QUIET_VIRTUAL_CONSOLE,
  });
  const { window } = dom;
  const validFilters = validateFilters(window.document, baseFilters);
  const selectorBodies = new Map();
  const selectorScores = new Map();
  let fallbackBody = "";
  let fallbackScore = null;
  let sandbox = null;

  if (engine === "fast") {
    for (const selector of baseSelectors) {
      const body = fastExtractSelectorText(window.document, selector, validFilters);
      selectorBodies.set(selector, body);
      selectorScores.set(selector, body == null ? null : scoreText(body, page.expected));
    }
    fallbackBody = fastFallbackText(window.document, validFilters);
    fallbackScore = scoreText(fallbackBody, page.expected);
  }

  if (engine === "full") {
    sandbox = {
    window,
    document: window.document,
    globalThis: {},
    self: {},
    navigator: window.navigator,
    location: window.location,
    getSelection: () => window.getSelection?.(),
    };
    sandbox.globalThis = sandbox;
    sandbox.self = sandbox;
    vm.createContext(sandbox);
    vm.runInContext(TURNDOWN_SRC, sandbox);
    vm.runInContext(DEFAULTS_SRC, sandbox);
    vm.runInContext(EXTRACTOR_SRC, sandbox);
  }

  return {
    ...page,
    dom,
    sandbox,
    validFilters,
    selectorBodies,
    selectorScores,
    fallbackBody,
    fallbackScore,
    engine,
    extract(selectors) {
      if (engine === "fast") {
        return {
          title: this.window.document.title || "Untitled",
          body: fastExtractText(selectors, this.selectorBodies, this.fallbackBody),
        };
      }

      const settings = this.sandbox.getDefaultSettings();
      settings.contentExtraction.customSelectors = selectors;
      return this.sandbox.extractContentFromDoc(this.window.document, settings, this.url);
    },
    score(selectors) {
      if (engine !== "fast") {
        const result = this.extract(selectors);
        return {
          slug: this.slug,
          page: this.page,
          ...scoreText(result.body || "", this.expected),
        };
      }

      for (const selector of selectors) {
        const score = this.selectorScores.get(selector);
        if (score) {
          return { slug: this.slug, page: this.page, ...score };
        }
      }
      return { slug: this.slug, page: this.page, ...this.fallbackScore };
    },
    window,
  };
}

function summarize(rows) {
  const mean = key => rows.reduce((sum, row) => sum + row[key], 0) / (rows.length || 1);
  const lenCloseness = rows.reduce((sum, row) => sum + Math.abs(Math.log(row.lenRatio || 0.0001)), 0) / (rows.length || 1);
  const summary = {
    pages: rows.length,
    f1: mean("f1"),
    recall: mean("recall"),
    precision: mean("precision"),
    lenRatio: mean("lenRatio"),
    lenCloseness,
    missing: mean("missing"),
    extra: mean("extra"),
  };
  summary.objective =
    summary.f1 * 1_000_000 +
    summary.precision * 20_000 +
    summary.recall * 2_000 -
    summary.lenCloseness * 500 -
    summary.missing * 10 -
    summary.extra * 10;
  return summary;
}

function evaluate(runtimes, selectors, label = "", { keepRows = false } = {}) {
  const rows = [];

  for (const runtime of runtimes) {
    try {
      if (runtime.engine === "fast") {
        rows.push(runtime.score(selectors));
        continue;
      }

      rows.push(runtime.score(selectors));
    } catch (error) {
      rows.push({
        slug: runtime.slug,
        page: runtime.page,
        f1: 0,
        recall: 0,
        precision: 0,
        lenRatio: 0,
        missing: 999,
        extra: 999,
        error: String(error?.message || error),
      });
    }
  }

  return {
    label,
    summary: summarize(rows),
    rows: keepRows ? rows.sort((a, b) => a.f1 - b.f1) : [],
  };
}

function moveItem(selectors, from, to) {
  const next = selectors.slice();
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function isBroadSelector(selector) {
  return /^(article|main|\[role="main"\]|main\[role="main"\]|\[itemtype\*=|\.article$|\.content$|\.prose$|\.post$|\.entry$)/.test(selector);
}

function isSpecificBodySelector(selector) {
  return /(articlebody|article-body|story-body|storybody|entry-content|post-content|post-body|entry-body|article__body|article__content|content__article-body|body__container|story-content|storytext|caas-body|richtextstorybody|kg-post|read__content|itemfulltext)/i.test(selector);
}

function candidatePositions(selectors, from) {
  const length = selectors.length;
  const positions = new Set([
    0, 1, 2, 3, 4, 5, 8, 13, 21, 34, length - 1,
    from - 10, from - 5, from - 3, from - 2, from - 1,
    from + 1, from + 2, from + 3, from + 5, from + 10,
  ]);

  selectors.forEach((selector, index) => {
    if (isBroadSelector(selector)) {
      positions.add(index);
      positions.add(index + 1);
      positions.add(index - 1);
    }
  });

  return [...positions]
    .filter(position => Number.isInteger(position) && position >= 0 && position < length && position !== from)
    .sort((a, b) => a - b);
}

function stagedMoves(selectors) {
  const moves = [];
  const seen = new Set();
  const firstBroad = selectors.findIndex(isBroadSelector);

  function add(from, to) {
    if (from < 0 || to < 0 || from >= selectors.length || to >= selectors.length || from === to) return;
    const key = `${from}->${to}`;
    if (seen.has(key)) return;
    seen.add(key);
    moves.push({ from, to });
  }

  for (let i = 0; i < selectors.length - 1; i++) {
    if (isBroadSelector(selectors[i]) || isBroadSelector(selectors[i + 1])) {
      add(i, i + 1);
      add(i + 1, i);
    }
  }

  selectors.forEach((selector, index) => {
    if (isBroadSelector(selector)) {
      [index + 2, index + 5, index + 10, index + 20, selectors.length - 1]
        .forEach(position => add(index, Math.min(position, selectors.length - 1)));
    }

    if (isSpecificBodySelector(selector)) {
      [0, 1, 2, Math.max(0, firstBroad), Math.max(0, firstBroad - 1)]
        .forEach(position => add(index, position));
    }
  });

  return moves;
}

function allMoves(selectors) {
  const moves = [];
  for (let from = 0; from < selectors.length; from++) {
    for (const to of candidatePositions(selectors, from)) {
      moves.push({ from, to });
    }
  }
  return moves;
}

function compareResults(a, b) {
  return a.summary.objective - b.summary.objective;
}

function formatSummary(summary) {
  return `F1=${summary.f1.toFixed(4)} P=${summary.precision.toFixed(4)} R=${summary.recall.toFixed(4)} len=${summary.lenRatio.toFixed(3)} miss=${summary.missing.toFixed(2)} extra=${summary.extra.toFixed(2)} obj=${summary.objective.toFixed(1)}`;
}

function buildReport({ baseline, best, accepted, topCandidates, selectors, activeCorpus, fullVerification }) {
  let md = "# Selector A/B Report\n\n";
  md += `Generated: ${new Date().toISOString()}\n\n`;
  md += `Scored pages: ${baseline.summary.pages}. Active corpus smoke pages: ${activeCorpus.pages} across ${activeCorpus.sites} sites. Mode: ${MODE}. Engine: ${ENGINE}. Selectors: ${SELECTORS_FROM}.\n\n`;
  md += `Story corpus: ${activeCorpus.storyPages} downloaded story pages across ${activeCorpus.storySites} sites; ${activeCorpus.storyMissing} missing/unusable; ${activeCorpus.storyThin} thin under 700 chars; ${activeCorpus.storyDuplicateUrls} duplicate source URLs.\n\n`;
  md += "## Summary\n\n";
  md += `Baseline: ${formatSummary(baseline.summary)}\n\n`;
  md += `Best: ${formatSummary(best.summary)}\n\n`;
  md += `Accepted moves: ${accepted.length}\n\n`;

  md += "## Accepted Moves\n\n";
  if (accepted.length === 0) {
    md += "No move beat the current order under the configured objective.\n\n";
  } else {
    md += "| round | selector | from | to | result |\n|---|---|---:|---:|---|\n";
    for (const move of accepted) {
      md += `| ${move.round} | \`${move.selector}\` | ${move.from} | ${move.to} | ${formatSummary(move.result.summary)} |\n`;
    }
    md += "\n";
  }

  md += `## Top ${topCandidates.length} Candidate Moves From Final Round\n\n`;
  md += "| rank | selector | from | to | result |\n|---:|---|---:|---:|---|\n";
  topCandidates.forEach((candidate, index) => {
    md += `| ${index + 1} | \`${candidate.selector}\` | ${candidate.from} | ${candidate.to} | ${formatSummary(candidate.result.summary)} |\n`;
  });
  md += "\n";

  if (fullVerification) {
    md += "## Full Engine Verification\n\n";
    md += `Baseline: ${formatSummary(fullVerification.baseline.summary)}\n\n`;
    md += `Best verified: ${formatSummary(fullVerification.best.summary)}\n\n`;
    md += "| rank | selector | from | to | result |\n|---:|---|---:|---:|---|\n";
    fullVerification.candidates.forEach((candidate, index) => {
      md += `| ${index + 1} | \`${candidate.selector}\` | ${candidate.from} | ${candidate.to} | ${formatSummary(candidate.result.summary)} |\n`;
    });
    md += "\n";
  }

  md += "## Best Proxy Selector Order\n\n";
  selectors.forEach((selector, index) => {
    md += `${index + 1}. \`${selector}\`\n`;
  });

  return md;
}

const manifest = loadManifest();
const activeCorpus = loadActiveCorpusStats(manifest);
const scoredPages = loadScoredPages(manifest);
const defaults = defaultSettings();
let baseSelectors = defaults.contentExtraction.customSelectors;
const baseFilters = defaults.advancedFiltering.customFilters;
if (SELECTORS_FROM !== "defaults") {
  const source = JSON.parse(readFileSync(join(__dirname, "..", "corpus", SELECTORS_FROM), "utf8"));
  if (!Array.isArray(source.best?.selectors)) {
    throw new Error(`No best.selectors array found in ${SELECTORS_FROM}`);
  }
  baseSelectors = source.best.selectors;
}
const runtimes = scoredPages.map(page => buildPageRuntime(page, baseFilters, baseSelectors));
const cache = new Map();

function cachedEvaluate(selectors, label = "", options = {}) {
  const key = selectors.join("\n");
  if (!cache.has(key) || options.keepRows) {
    const result = evaluate(runtimes, selectors, label, options);
    if (!options.keepRows) cache.set(key, result);
    return result;
  }
  return cache.get(key);
}

let currentSelectors = baseSelectors;
let current = cachedEvaluate(currentSelectors, "baseline");
const baseline = current;
const accepted = [];
let finalRoundCandidates = [];
let tested = 1;

console.log(`baseline ${formatSummary(baseline.summary)}`);
console.log(`scored pages=${scoredPages.length} active corpus pages=${activeCorpus.pages} mode=${MODE} engine=${ENGINE}`);

for (let round = 1; round <= ROUNDS; round++) {
  let bestMove = null;
  const roundCandidates = [];
  const seen = new Set();
  const moves = MODE === "coarse" ? allMoves(currentSelectors) : stagedMoves(currentSelectors);
  console.log(`round ${round}: evaluating ${moves.length} moves`);

  for (const { from, to } of moves) {
    const selectors = moveItem(currentSelectors, from, to);
    const key = selectors.join("\n");
    if (seen.has(key)) continue;
    seen.add(key);

    const result = cachedEvaluate(selectors, `round-${round}:${from}->${to}`);
    tested += 1;
    const candidate = {
      round,
      selector: currentSelectors[from],
      from,
      to,
      result,
      selectors,
    };
    roundCandidates.push(candidate);

    if (!bestMove || compareResults(result, bestMove.result) > 0) {
      bestMove = candidate;
    }
  }

  roundCandidates.sort((a, b) => compareResults(b.result, a.result));
  finalRoundCandidates = roundCandidates.slice(0, TOP_COUNT);

  const gain = bestMove ? bestMove.result.summary.objective - current.summary.objective : 0;
  if (!bestMove || gain < MIN_OBJECTIVE_GAIN) {
    console.log(`round ${round}: stop gain=${gain.toFixed(1)} tested=${tested}`);
    break;
  }

  currentSelectors = bestMove.selectors;
  current = bestMove.result;
  accepted.push(bestMove);
  console.log(`round ${round}: move "${bestMove.selector}" ${bestMove.from}->${bestMove.to} gain=${gain.toFixed(1)} ${formatSummary(current.summary)}`);
}

let fullVerification = null;
if (FULL_VERIFY_TOP > 0 && ENGINE !== "full") {
  const verificationInputs = [];
  const seenVerification = new Set();

  function addVerificationCandidate(candidate) {
    if (!candidate?.selectors) return;
    const key = candidate.selectors.join("\n");
    if (seenVerification.has(key)) return;
    seenVerification.add(key);
    verificationInputs.push(candidate);
  }

  finalRoundCandidates.slice(0, FULL_VERIFY_TOP).forEach(addVerificationCandidate);
  if (accepted.length > 0) {
    addVerificationCandidate({
      selector: "(accepted best order)",
      from: -1,
      to: -1,
      selectors: currentSelectors,
    });
  }

  console.log(`full verification: evaluating ${verificationInputs.length} candidates`);
  const fullRuntimes = scoredPages.map(page => buildPageRuntime(page, baseFilters, baseSelectors, "full"));
  const fullBaseline = evaluate(fullRuntimes, baseSelectors, "full-baseline", { keepRows: true });
  const verifiedCandidates = verificationInputs.map(candidate => ({
    selector: candidate.selector,
    from: candidate.from,
    to: candidate.to,
    selectors: candidate.selectors,
    result: evaluate(fullRuntimes, candidate.selectors, "full-candidate"),
  })).sort((a, b) => compareResults(b.result, a.result));

  const bestVerifiedCandidate = verifiedCandidates[0] || null;
  const bestVerified = bestVerifiedCandidate && compareResults(bestVerifiedCandidate.result, fullBaseline) > 0
    ? bestVerifiedCandidate.result
    : fullBaseline;

  fullVerification = {
    baseline: fullBaseline,
    best: bestVerified,
    candidates: verifiedCandidates,
  };

  console.log(`full baseline ${formatSummary(fullBaseline.summary)}`);
  console.log(`full best ${formatSummary(bestVerified.summary)}`);
  for (const runtime of fullRuntimes) {
    runtime.dom.window.close();
  }
}

const best = current;
console.log(`best ${formatSummary(best.summary)}`);
console.log(`accepted=${accepted.length} variants_tested=${tested}`);

if (WRITE_RESULTS) {
  const baselineWithRows = cachedEvaluate(baseSelectors, "baseline", { keepRows: true });
  const bestWithRows = cachedEvaluate(currentSelectors, "best", { keepRows: true });
  const output = {
    generated_at: new Date().toISOString(),
    scored_pages: scoredPages.map(page => `${page.slug}/${page.page}`),
    active_corpus: activeCorpus,
    rounds: ROUNDS,
    mode: MODE,
    engine: ENGINE,
    selectors_from: SELECTORS_FROM,
    min_objective_gain: MIN_OBJECTIVE_GAIN,
    variants_tested: tested,
    baseline: {
      summary: baselineWithRows.summary,
      worst: baselineWithRows.rows.slice(0, TOP_COUNT),
      selectors: baseSelectors,
    },
    best: {
      summary: bestWithRows.summary,
      worst: bestWithRows.rows.slice(0, TOP_COUNT),
      selectors: currentSelectors,
    },
    accepted_moves: accepted.map(move => ({
      round: move.round,
      selector: move.selector,
      from: move.from,
      to: move.to,
      summary: move.result.summary,
    })),
    top_final_round_candidates: finalRoundCandidates.map(candidate => ({
      selector: candidate.selector,
      from: candidate.from,
      to: candidate.to,
      summary: candidate.result.summary,
    })),
    full_verification: fullVerification ? {
      baseline: fullVerification.baseline.summary,
      best: fullVerification.best.summary,
      candidates: fullVerification.candidates.map(candidate => ({
        selector: candidate.selector,
        from: candidate.from,
        to: candidate.to,
        summary: candidate.result.summary,
      })),
    } : null,
  };

  writeFileSync(join(ROOT, "selector-ab-results.json"), JSON.stringify(output, null, 2) + "\n");
  writeFileSync(join(ROOT, "selector-ab-report.md"), buildReport({
    baseline: baselineWithRows,
    best: bestWithRows,
    accepted,
    topCandidates: finalRoundCandidates,
    selectors: currentSelectors,
    activeCorpus,
    fullVerification,
  }));
  console.log("wrote selector-ab-results.json and selector-ab-report.md");
}

for (const runtime of runtimes) {
  runtime.dom.window.close();
}
