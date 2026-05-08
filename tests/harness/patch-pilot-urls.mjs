#!/usr/bin/env node
// One-off: replace the pilot slugs' URLs in manifest.json with hand-verified
// stable permalinks that actually return HTTP 200. After a real "full fetch"
// pass, a similar script (or manual inspection of fetch.json) is the way to
// fix up 404s across the full 200-site corpus.

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "corpus");

const OVERRIDES = {
  nytimes_com: [
    ["https://www.nytimes.com/2024/01/24/technology/openai-chatgpt-uk-election.html", "feature"],
    ["https://www.nytimes.com/interactive/2024/upshot/2024-election-polls-trump-harris.html", "interactive"],
  ],
  theguardian_com: [
    ["https://www.theguardian.com/technology/2024/may/13/openai-gpt4o-chatgpt-demo", "tech news"],
    ["https://www.theguardian.com/commentisfree/article/2024/jul/08/ai-technology-bubble-financial-collapse", "opinion"],
  ],
  bbc_com: [
    ["https://www.bbc.com/news/articles/c0l15zd7937o", "news article"],
    ["https://www.bbc.com/future/article/20240726-how-the-human-body-changes-with-age", "feature"],
  ],
  techcrunch_com: [
    ["https://techcrunch.com/2024/05/13/openais-gpt-4o-multimodal-model-now-live-in-chatgpt/", "breaking"],
    ["https://techcrunch.com/2024/09/09/iphone-16-everything-announced-at-apples-it-s-glowtime-event/", "event recap"],
  ],
  theverge_com: [
    ["https://www.theverge.com/2024/5/13/24155493/openai-gpt-4o-launch-free-tier-demo", "news"],
    // article-2 already 200 (keep)
  ],
  arstechnica_com: [
    ["https://arstechnica.com/ai/2024/05/before-launching-gpt-4o-broke-records-on-chatbot-leaderboard-under-a-secret-name/", "AI news"],
    ["https://arstechnica.com/gadgets/2024/09/apples-iphone-16-pro-launches-sept-20-with-bigger-screens-and-a1-chip/", "gadget"],
  ],
  simonwillison_net: [
    ["https://simonwillison.net/2024/May/13/gpt-4o/", "post"],
    ["https://simonwillison.net/2024/Nov/26/qwq/", "TIL"],
  ],
  daringfireball_net: [
    ["https://daringfireball.net/2024/09/the_ios_18_review", "review"],
    ["https://daringfireball.net/linked/2024/11/06/trump", "linked-list"],
  ],
  reddit_com_old: [
    ["https://old.reddit.com/r/programming/comments/1cr5zgh/openai_releases_gpt4o/", "thread"],
    ["https://old.reddit.com/r/AskHistorians/comments/1cq9pz5/why_did_the_roman_empire_fall/", "Q&A"],
  ],
  stackoverflow_com: [
    ["https://stackoverflow.com/questions/11227809/why-is-processing-a-sorted-array-faster-than-processing-an-unsorted-array", "canonical Q"],
    ["https://stackoverflow.com/questions/231767/what-does-the-yield-keyword-do-in-python", "canonical Q"],
  ],
  cooking_nytimes_com: [
    ["https://cooking.nytimes.com/recipes/1017611-perfect-instant-ramen", "recipe"],
    ["https://cooking.nytimes.com/recipes/1019529-classic-cacio-e-pepe", "recipe"],
  ],
  apple_com_newsroom: [
    ["https://www.apple.com/newsroom/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/", "press release"],
    ["https://www.apple.com/newsroom/2024/06/introducing-apple-intelligence-for-iphone-ipad-and-mac/", "press release"],
  ],
};

const manifest = JSON.parse(readFileSync(join(ROOT, "manifest.json"), "utf8"));
let patched = 0;
for (const site of manifest.sites) {
  const ov = OVERRIDES[site.slug];
  if (!ov) continue;
  for (let i = 0; i < Math.min(ov.length, site.pages.length); i++) {
    site.pages[i].url = ov[i][0];
    site.pages[i].note = ov[i][1];
    patched++;
  }
}
writeFileSync(join(ROOT, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`Patched ${patched} pilot URLs.`);
