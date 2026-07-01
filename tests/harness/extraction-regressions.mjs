#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { JSDOM, VirtualConsole } from "jsdom";

const __dirname = dirname(fileURLToPath(import.meta.url));
const EXT = join(__dirname, "..", "..", "SafariToDrafts", "Shared (Extension)", "Resources");
const QUIET_VIRTUAL_CONSOLE = new VirtualConsole();
QUIET_VIRTUAL_CONSOLE.on("jsdomError", () => {});

const TURNDOWN_SRC = readFileSync(join(EXT, "turndown.js"), "utf8");
const DEFAULTS_SRC = readFileSync(join(EXT, "defaults.js"), "utf8");
const EXTRACTOR_SRC = readFileSync(join(EXT, "content-extractor.js"), "utf8");
const BACKGROUND_SRC = readFileSync(join(EXT, "background.js"), "utf8");

function timezoneOffsetCompact(date) {
  const offsetMinutes = -date.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const absolute = Math.abs(offsetMinutes);
  const hours = String(Math.floor(absolute / 60)).padStart(2, "0");
  const minutes = String(absolute % 60).padStart(2, "0");
  return `${sign}${hours}${minutes}`;
}

function createSandbox(html = "<!doctype html><title>T</title><main></main>", url = "https://example.test/", options = {}) {
  const dom = new JSDOM(html, { url, pretendToBeVisual: true, virtualConsole: QUIET_VIRTUAL_CONSOLE });
  const fixedNow = options.fixedNow;
  const SandboxDate = fixedNow
    ? class FixedDate extends Date {
        constructor(...args) {
          super(...(args.length ? args : [fixedNow.getTime()]));
        }

        static now() {
          return fixedNow.getTime();
        }

        static parse(value) {
          return Date.parse(value);
        }

        static UTC(...args) {
          return Date.UTC(...args);
        }
      }
    : Date;
  const sandbox = {
    window: dom.window,
    document: dom.window.document,
    globalThis: {},
    self: {},
    navigator: dom.window.navigator,
    location: dom.window.location,
    Date: SandboxDate,
  };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(TURNDOWN_SRC, sandbox);
  vm.runInContext(DEFAULTS_SRC, sandbox);
  vm.runInContext(EXTRACTOR_SRC, sandbox);
  return { dom, sandbox };
}

function extract(html, overrides = {}) {
  const { dom, sandbox } = createSandbox(html);
  const settings = sandbox.getDefaultSettings();
  settings.contentExtraction.customSelectors = overrides.selectors || ["main"];
  if (Object.prototype.hasOwnProperty.call(overrides, "filters")) {
    settings.advancedFiltering.customFilters = overrides.filters;
  } else if (!overrides.useDefaultFilters) {
    settings.advancedFiltering.customFilters = [];
  }
  settings.advancedFiltering.textCleanupRules = overrides.rules || [];
  if (overrides.minContentLength !== undefined) {
    settings.advancedFiltering.minContentLength = overrides.minContentLength;
  }
  if (overrides.maxLinkRatio !== undefined) {
    settings.advancedFiltering.maxLinkRatio = overrides.maxLinkRatio;
  }
  if (overrides.includeLinks !== undefined) {
    settings.outputFormat.includeLinks = overrides.includeLinks;
  }

  const result = sandbox.extractContentFromDoc(dom.window.document, settings, "https://example.test/");
  dom.window.close();
  return result.body;
}

function createBackgroundSandbox() {
  const noopListener = { addListener() {} };
  const sandbox = {
    console,
    globalThis: {},
    self: { importScripts() {} },
    SETTINGS_CACHE_KEY: "settings",
    NATIVE_APP_ID: "application.id",
    loadCatScratchesSettings: async () => ({ settings: {}, source: "default" }),
    saveCatScratchesSettings: async (settings) => ({ settings, savedToCloud: false }),
    browser: {
      action: { onClicked: noopListener },
      i18n: { getMessage: (key) => key },
      runtime: {
        onInstalled: noopListener,
        onMessage: noopListener,
        onStartup: noopListener,
        sendNativeMessage: async () => ({ opened: false }),
      },
      scripting: { executeScript: async () => [] },
      storage: { onChanged: noopListener },
      tabs: {
        query: async () => [],
        update: async () => {},
      },
    },
  };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(BACKGROUND_SRC, sandbox);
  return sandbox;
}

const filler = " filler text".repeat(40);

{
  const body = extract(`<main><p>Hello <a href="https://example.com">world</a> end.${filler}</p></main>`);
  assert.match(body, /Hello world end\./, "default page extraction preserves linked text");
  assert.doesNotMatch(body, /\[world\]\(https:\/\/example\.com\)/, "default page extraction strips inline markdown links");
}

{
  const body = extract(`<main><p>Hello <a href="https://example.com">world</a> end.${filler}</p></main>`, {
    includeLinks: true,
  });
  assert.match(body, /\[world\]\(https:\/\/example\.com\)/, "page extraction preserves inline markdown links when enabled");
}

{
  const body = extract(`<main><pre><code>function x() {\n    const value    = 1;\n    return value;\n}</code></pre><p>${filler}</p></main>`);
  assert.match(body, /    const value    = 1;/, "normalization preserves fenced code indentation and spacing");
  assert.match(body, /    return value;/, "normalization preserves leading code indentation");
}

{
  const body = extract(`<main><ul><li>outer<ul><li>inner ${filler}</li></ul></li></ul></main>`);
  assert.match(body, /\n {4}\* inner/, "normalization preserves nested-list indentation");
}

{
  const body = extract(`<main><p>Code displays &amp;amp; and &amp;#128512;.${filler}</p></main>`);
  assert.match(body, /&amp;/, "Turndown output is not double-decoded");
  assert.match(body, /&#128512;/, "literal numeric entity text is not decoded after Turndown");
  assert.doesNotMatch(body, /\uF600/, "astral numeric entities are not decoded with fromCharCode garbage");
}

{
  const articleBody = `The U.S. market value was $1.5 billion. It closed.Next sentence includes emoji &#128512;. ${"More text. ".repeat(40)}`;
  const body = extract(`<!doctype html><title>S</title><script type="application/ld+json">${JSON.stringify({
    "@type": "NewsArticle",
    articleBody,
  })}</script><main><p>Short.</p></main>`);

  assert.match(body, /U\.S\./, "schema normalization preserves acronyms");
  assert.match(body, /\$1\.5/, "schema normalization preserves decimals");
  assert.match(body, /closed\. Next/, "schema normalization still fixes missing spaces after lowercase sentence endings");
  assert.match(body, /😀/, "schema entity decoding uses full code points");
}

{
  const { dom, sandbox } = createSandbox();
  const container = dom.window.document.createElement("div");
  container.innerHTML = '<p>Para <a href="https://example.com">link</a>.</p><script>trackUser()</script><style>.x{color:red}</style><noscript>fallback</noscript>';

  const settings = sandbox.getDefaultSettings();
  const body = sandbox.extractMarkdownFromSelectionContainer(container, settings);
  assert.match(body, /Para link\./, "default selection extraction preserves linked text");
  assert.doesNotMatch(body, /\[link\]\(https:\/\/example\.com\)/, "default selection extraction strips links");
  assert.doesNotMatch(body, /trackUser|color:red|fallback/, "selection extraction removes script/style/noscript content");

  settings.outputFormat.includeLinks = true;
  const bodyWithLinks = sandbox.extractMarkdownFromSelectionContainer(container, settings);
  assert.match(bodyWithLinks, /\[link\]\(https:\/\/example\.com\)/, "selection extraction preserves links when enabled");
  dom.window.close();
}

{
  const body = extract("<main><p>tiny</p></main><section><p>fallback content ".repeat(20) + "</p></section>", {
    minContentLength: 0,
    maxLinkRatio: 0,
  });
  assert.equal(body, "tiny", "zero thresholds are honored for no-link content");
}

{
  const { dom, sandbox } = createSandbox();
  const migratedOutput = sandbox.migrateSettings({
    outputFormat: {},
  });
  assert.equal(migratedOutput.outputFormat.includeLinks, false, "missing includeLinks migrates to false");

  const formatted = sandbox.formatDraftContent("Title", "https://source.example/story", "Body text", sandbox.getDefaultSettings());
  assert.match(formatted, /<https:\/\/source\.example\/story>/, "template source URL remains available when body links default off");

  const defaults = sandbox.getDefaultSettings();
  const savedSelectors = [".user-specific", ...defaults.contentExtraction.customSelectors.slice(0, 8)];
  const migrated = sandbox.migrateSettings({
    defaultsRevision: 1,
    contentExtraction: { customSelectors: savedSelectors },
  });

  assert.equal(migrated.contentExtraction.customSelectors[0], ".user-specific", "custom selectors keep top priority after defaults migration");
  assert.ok(
    migrated.contentExtraction.customSelectors.includes(defaults.contentExtraction.customSelectors[0]),
    "defaults are still refreshed during selector migration",
  );
  dom.window.close();
}

{
  const fixedNow = new Date(2026, 2, 4, 15, 6, 7);
  const { dom, sandbox } = createSandbox(
    "<!doctype html><title>T</title><main></main>",
    "https://example.test/",
    { fixedNow },
  );
  const settings = sandbox.getDefaultSettings();
  settings.outputFormat.template = [
    "{timestamp}",
    "{date}",
    "{time}",
    "{datesort}",
    "{timesort}",
    "{year4}",
    "{year2}",
    "{month0}",
    "{month}",
    "{monthname}",
    "{day0}",
    "{day}",
    "{hour24}",
    "{minute}",
    "{dow3}",
    "{gmtoffset}",
    "{unknown}",
  ].join("|");

  const formatted = sandbox.formatDraftContent("", "", "", settings);
  assert.equal(
    formatted,
    [
      fixedNow.toISOString(),
      "2026-03-04",
      "15:06:07",
      "20260304",
      "150607",
      "2026",
      "26",
      "03",
      "3",
      "March",
      "04",
      "4",
      "15",
      "06",
      "Wed",
      timezoneOffsetCompact(fixedNow),
      "{unknown}",
    ].join("|"),
    "date and time template tokens render expected fixed values",
  );

  for (const placeholder of [
    "{date}",
    "{time}",
    "{datesort}",
    "{timesort}",
    "{year4}",
    "{year2}",
    "{month0}",
    "{month}",
    "{monthname}",
    "{day0}",
    "{day}",
    "{hour24}",
    "{minute}",
    "{dow3}",
    "{gmtoffset}",
  ]) {
    assert.ok(
      sandbox.TEMPLATE_PLACEHOLDER_TAGS.extraTime.includes(placeholder),
      `settings placeholder list exposes ${placeholder}`,
    );
  }

  dom.window.close();
}

{
  const { dom, sandbox } = createSandbox();
  const xmlDoc = dom.window.document.implementation.createDocument(null, "root", null);
  const result = sandbox.extractContentFromDoc(xmlDoc, sandbox.getDefaultSettings(), "https://example.test/feed.xml");
  assert.equal(result.body, "No content extracted", "documents without body do not throw in fallback extraction");
  dom.window.close();
}

{
  const body = extract(`<main><p style="display: none">Hidden text</p><p>Visible text.${filler}</p></main>`, {
    useDefaultFilters: true,
  });
  assert.doesNotMatch(body, /Hidden text/, "display: none descendants are filtered");
  assert.match(body, /Visible text/, "visible content remains after hidden filtering");
}

{
  const body = extract(`<main><figure><figcaption>Important diagram</figcaption></figure><p>${filler}</p><div class="social-media-buttons">Share</div></main>`, {
    filters: [".social-media-buttons"],
  });
  assert.match(body, /Important diagram/, "non-media filters containing 'media' do not remove all media elements");
  assert.doesNotMatch(body, /Share/, "the configured social-media filter still applies");
}

{
  const body = extract(`<main><figure><figcaption>Important diagram</figcaption></figure><p>${filler}</p></main>`, {
    filters: ["figure"],
  });
  assert.doesNotMatch(body, /Important diagram/, "explicit media element filters still remove matching media nodes");
}

{
  const { dom, sandbox } = createSandbox();
  const cleaned = sandbox.applyTextCleanupRules("```js\nsubscribe\n```\n\nsubscribe", ["line:/^subscribe$/i"]);
  assert.equal(cleaned.trim(), "```js\nsubscribe\n```", "cleanup rules skip fenced code blocks");

  const defaultCleaned = sandbox.applyTextCleanupRules(
    "Intro paragraph.\n\n## Jobs at Apple\n\nImportant article content.",
    sandbox.getDefaultSettings().advancedFiltering.textCleanupRules,
  );
  assert.match(defaultCleaned, /Important article content/, "Jobs tail rule does not truncate Jobs-at-topic article sections");

  const moreFromCleaned = sandbox.applyTextCleanupRules(
    "Intro.\n\nMore from New York came later in the reporting.\n\nImportant article content.",
    sandbox.getDefaultSettings().advancedFiltering.textCleanupRules,
  );
  assert.match(moreFromCleaned, /Important article content/, "more-from tail rule does not truncate ordinary prose paragraphs");

  assert.equal(
    sandbox.applyTextCleanupRules("x", [String.raw`replace:/x/ => \\n`]),
    String.raw`\n`,
    "replacement decoding handles escaped backslash before n in one pass",
  );
  dom.window.close();
}

{
  const { dom, sandbox } = createSandbox();
  const voxRule = [String.raw`tail:/\n+become a vox member to continue reading\.?\s*$/i`];

  const midDocument = sandbox.applyTextCleanupRules(
    "Intro.\n\nBecome a Vox member to continue reading.\n\n```js\ncode();\n```\n\nReal article continues.",
    voxRule,
  );
  assert.match(midDocument, /Real article continues\./, "dollar-anchored tail rules do not fire at code-fence boundaries mid-document");
  assert.match(midDocument, /code\(\);/, "code blocks survive dollar-anchored tail rules");

  const atDocumentEnd = sandbox.applyTextCleanupRules(
    "Intro.\n\nBecome a Vox member to continue reading.",
    voxRule,
  );
  assert.equal(atDocumentEnd.trim(), "Intro.", "dollar-anchored tail rules still truncate at the true document end");

  const afterFence = sandbox.applyTextCleanupRules(
    "Intro.\n\n```js\ncode();\n```\n\nBecome a Vox member to continue reading.",
    voxRule,
  );
  assert.match(afterFence, /code\(\);/, "tail truncation after a code block keeps the code block");
  assert.doesNotMatch(afterFence, /Become a Vox member/i, "tail truncation after a code block still removes the tail");

  const unterminatedFence = sandbox.applyTextCleanupRules(
    "Text.\n\n```\nstray fence line\n\nadvertisement",
    ["line:/^\\s*advertisement\\s*$/i"],
  );
  assert.doesNotMatch(unterminatedFence, /advertisement/, "cleanup still applies after an unterminated fence");
  assert.match(unterminatedFence, /stray fence line/, "unterminated fence text is kept as plain text");

  const linkedChrome = sandbox.applyTextCleanupRules(
    "Article text.\n\n[Facebook](https://fb.example/share)\n\n[Tweet](https://x.example/share)\n\n[Share](https://example.com/share)\n\n[Subscribe](https://example.com/subscribe)\n\n[Skip advertisement](#after-ad)\n\nMore text.",
    sandbox.getDefaultSettings().advancedFiltering.textCleanupRules,
  );
  assert.doesNotMatch(linkedChrome, /Facebook|Tweet|\[Share\]|\[Subscribe\]|Skip advertisement/, "link-wrapped share chrome lines are removed by default rules");
  assert.match(linkedChrome, /Article text\./, "article prose survives linked-chrome cleanup");
  assert.match(linkedChrome, /More text\./, "trailing prose survives linked-chrome cleanup");
  dom.window.close();
}

{
  const sandbox = createBackgroundSandbox();
  const content = "# Saved Page\n\nhttps://example.test/story?a=1&b=two words\n\nCafé & emoji 😀";
  const group = sandbox.getUlyssesGroup({
    outputFormat: { defaultTag: "reading, web, article" },
  });
  const url = sandbox.buildUlyssesNewSheetURL(content, group);

  assert.equal(group, "/reading/web/article", "comma-separated tags become a Ulysses group path");
  assert.equal(
    url,
    `ulysses://x-callback-url/new-sheet?x-source=Cat%20Scratches&text=${encodeURIComponent(content)}&group=%2Freading%2Fweb%2Farticle&format=markdown`,
    "Ulysses new-sheet URLs use the documented action, source, URL-encoded text, group, and markdown format",
  );
  assert.doesNotMatch(url, /\s/, "Ulysses callback URL contains no unencoded whitespace");
  assert.match(url, /x-source=Cat%20Scratches/, "Ulysses callback URL identifies Cat Scratches as the source app");
  assert.match(url, /%26b%3Dtwo%20words/, "embedded source URL query parameters are encoded inside the text parameter");
  assert.match(url, /group=%2Freading%2Fweb%2Farticle/, "Ulysses group path is URL encoded");
  assert.match(url, /format=markdown$/, "Ulysses import format is explicitly markdown");

  assert.equal(
    sandbox.getUlyssesGroup({ outputFormat: { defaultTag: "/Research/Web" } }),
    "/Research/Web",
    "explicit Ulysses group paths are preserved",
  );
  assert.equal(
    sandbox.getUlyssesGroup({ outputFormat: { defaultTag: "Inbox" } }),
    "Inbox",
    "single tags are sent as a Ulysses group name",
  );
}

console.log("extraction regression tests passed");
