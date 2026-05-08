#!/usr/bin/env node
// Downloads source.html snapshots for every page in manifest.json.
// --pilot: fetch only PILOT_SLUGS (20 sites / 40 pages).
// Writes source.html + fetch.json (status, content-type, bytes, final URL)
// per page. Existing source.html is NOT overwritten unless --force is passed.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as sleep } from "node:timers/promises";
import { PILOT_SLUGS } from "./pilot.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "corpus");

const args = new Set(process.argv.slice(2));
const PILOT = args.has("--pilot");
const FORCE = args.has("--force");

// Realistic desktop Safari UA — matches what the extension sees in production.
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Safari/605.1.15";

const manifest = JSON.parse(readFileSync(join(ROOT, "manifest.json"), "utf8"));
const sites = PILOT
  ? manifest.sites.filter((s) => PILOT_SLUGS.includes(s.slug))
  : manifest.sites;

let ok = 0, skip = 0, fail = 0;

for (const site of sites) {
  for (const page of site.pages) {
    const dir = join(ROOT, "sites", site.slug, page.id);
    mkdirSync(dir, { recursive: true });
    const htmlPath = join(dir, "source.html");
    const metaPath = join(dir, "fetch.json");

    if (!FORCE && existsSync(htmlPath)) {
      skip++;
      continue;
    }

    const started = Date.now();
    let status = 0, finalUrl = page.url, err = null, bytes = 0, ctype = "";
    let body = "";
    try {
      const res = await fetch(page.url, {
        headers: {
          "User-Agent": UA,
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
        },
        redirect: "follow",
        signal: AbortSignal.timeout(20000),
      });
      status = res.status;
      finalUrl = res.url;
      ctype = res.headers.get("content-type") || "";
      body = await res.text();
      bytes = Buffer.byteLength(body, "utf8");
    } catch (e) {
      err = String(e?.message || e);
    }

    const meta = {
      url: page.url,
      final_url: finalUrl,
      status,
      content_type: ctype,
      bytes,
      error: err,
      fetched_at: new Date().toISOString(),
      elapsed_ms: Date.now() - started,
      user_agent: UA,
    };
    writeFileSync(metaPath, JSON.stringify(meta, null, 2) + "\n");
    if (status >= 200 && status < 400 && body) {
      writeFileSync(htmlPath, body);
      ok++;
      console.log(`  ok   ${site.slug}/${page.id}  ${status}  ${bytes}B`);
    } else {
      fail++;
      console.warn(`  FAIL ${site.slug}/${page.id}  status=${status}  err=${err || ""}`);
    }

    // polite pacing: 500ms between fetches, never hammer one host in sequence
    await sleep(500);
  }
}

console.log(`\nfetch summary: ok=${ok} skipped=${skip} failed=${fail}`);
