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

function extract(html, url) {
  const dom = new JSDOM(html, { url, virtualConsole: QUIET_VIRTUAL_CONSOLE });
  const sandbox = {
    window: dom.window,
    document: dom.window.document,
    globalThis: {},
    self: {},
    navigator: dom.window.navigator,
    location: dom.window.location,
  };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(TURNDOWN_SRC, sandbox);
  vm.runInContext(DEFAULTS_SRC, sandbox);
  vm.runInContext(EXTRACTOR_SRC, sandbox);

  const result = sandbox.extractContentFromDoc(dom.window.document, sandbox.getDefaultSettings(), url);
  dom.window.close();
  return result.body;
}

const oldRedditHtml = `<!doctype html>
<html>
  <head><title>Useful Apps : Photoassistants</title></head>
  <body class="single-page comments-page">
    <div id="header">Go to Photoassistants</div>
    <div class="side">
      <div class="linkinfo">this post was submitted yesterday</div>
      <div class="titlebox"><h1 class="pagename redditname"><a>Photoassistants</a></h1></div>
    </div>
    <div class="content" role="main">
      <div id="siteTable" class="sitetable linklisting">
        <div class="thing link">
          <p class="title"><a class="title">Useful Apps</a></p>
          <span class="linkflairlabel">Digital</span>
          <p class="tagline">submitted <time>1 day ago</time> by <a class="author">poster_name</a></p>
          <form class="usertext"><div class="usertext-body"><div class="md">
            <p>What tools should I keep in my kit?</p>
          </div></div></form>
          <ul class="buttons"><li>save</li><li>report</li></ul>
        </div>
      </div>
      <div class="commentarea">
        <div class="menuarea">sorted by: best top new controversial old q&amp;a</div>
        <div class="sitetable nestedlisting">
          <div class="thing comment">
            <div class="entry">
              <p class="tagline"><a class="author">helper_one</a> <time>50m ago</time></p>
              <form class="usertext"><div class="usertext-body"><div class="md"><p>Capture One.</p></div></div></form>
              <ul class="buttons"><li>permalink</li><li>save</li><li>reply</li></ul>
            </div>
          </div>
          <div class="thing comment">
            <div class="entry">
              <p class="tagline"><a class="author">empty_reply</a> <time>45m ago</time></p>
              <form class="usertext"><div class="usertext-body"><div class="md"></div></div></form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-parent">Use of this site constitutes acceptance of our User Agreement.</div>
  </body>
</html>`;

const oldRedditBody = extract(
  oldRedditHtml,
  "https://old.reddit.com/r/Photoassistants/comments/example/useful_apps/",
);

assert.match(oldRedditBody, /What tools should I keep in my kit\?/);
assert.match(oldRedditBody, /Capture One\./);
assert.doesNotMatch(oldRedditBody, /Go to Photoassistants/);
assert.doesNotMatch(oldRedditBody, /sorted by/i);
assert.doesNotMatch(oldRedditBody, /User Agreement/);
assert.doesNotMatch(oldRedditBody, /empty_reply/);
assert.doesNotMatch(oldRedditBody, /\bsave\b/i);
assert.doesNotMatch(oldRedditBody, /\breport\b/i);

const shredditHtml = `<!doctype html>
<html>
  <head><title>Useful Apps : r/Photoassistants</title></head>
  <body>
    <main>
      <a href="/r/Photoassistants/">Go to Photoassistants</a>
      <shreddit-post subreddit-prefixed-name="r/Photoassistants" author="poster_name" created-timestamp="1d ago" post-flair="Digital">
        <h1>Useful Apps</h1>
        <div slot="text-body"><p>What tools should I keep in my kit?</p></div>
      </shreddit-post>
      <div>Join the conversation</div>
      <shreddit-sort-dropdown>Sort by: Best Top New Controversial Old Q&amp;A</shreddit-sort-dropdown>
      <shreddit-comment author="helper_one" created-timestamp="50m ago">
        <div slot="comment"><p>Capture One.</p></div>
      </shreddit-comment>
      <shreddit-comment author="empty_reply" created-timestamp="45m ago">
        <div slot="comment"></div>
      </shreddit-comment>
    </main>
  </body>
</html>`;

const shredditBody = extract(
  shredditHtml,
  "https://www.reddit.com/r/Photoassistants/comments/example/useful_apps/",
);

assert.match(shredditBody, /What tools should I keep in my kit\?/);
assert.match(shredditBody, /Capture One\./);
assert.doesNotMatch(shredditBody, /Go to Photoassistants/);
assert.doesNotMatch(shredditBody, /Join the conversation/);
assert.doesNotMatch(shredditBody, /Sort by/i);
assert.doesNotMatch(shredditBody, /empty_reply/);

console.log("reddit extractor tests passed");
