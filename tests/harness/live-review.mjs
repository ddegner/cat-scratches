#!/usr/bin/env node
// Drives live Safari -> Cat Scratches -> Drafts review for active story pages.
// The runner is intentionally append-only: every attempt is written to
// tests/corpus/live-review/progress.jsonl so a long corpus pass can resume.

import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "corpus");
const REVIEW_DIR = join(ROOT, "live-review");
const PROGRESS_PATH = join(REVIEW_DIR, "progress.jsonl");
const DRAFTS_DB = join(
  process.env.HOME,
  "Library/Group Containers/GTFQ98J4YG.com.agiletortoise.Drafts/DraftStore.sqlite",
);

const ARTICLE_CATEGORIES = new Set([
  "news-major", "news-intl", "tech-news", "science", "longform", "think-tank",
  "corp-blog", "blog", "newsletter", "recipe",
]);

const REVIEW_TAGS = ["cat-scratches-corpus", "cat-scratches-review"];
const JUNK_PATTERNS = [
  ["advertisement", /^(?:#{0,6}\s*)?(?:advertisement|skip advertisement|advertising)$/im],
  ["newsletter", /\b(sign up|subscribe).{0,140}\b(newsletter|inbox)\b/i],
  ["related", /^#{1,6}\s*(related|read more|more from|more on this topic|latest on)\b/im],
  ["recirculation", /^#{1,6}\s*(top stories|more to read)\b/im],
  ["share", /^\s*(?:share|tweet|facebook|email|link copied!)\s*$/im],
  ["comments", /^#{1,6}\s*comments?\b/im],
  ["player", /\b(press shift question mark to access a list of keyboard shortcuts|play\/pausespace|jw_embed|embedded-video)\b/i],
  ["promo", /\b(the dispatch is a new digital media company|want more from the dispatch|submit a guest post to ripple|if you liked this story|about the author|are you a family member, doctor, nurse or midwife)\b/i],
  ["paywall", /\b(subscribe to unlock|paid members only|register below to read|already have a subscription|become a vox member to continue reading)\b/i],
];

const args = parseArgs(process.argv.slice(2));
const batchSize = Number(args.batch || 10);
const explicitPage = args.page || "";
const dryRun = Boolean(args["dry-run"]);

mkdirSync(REVIEW_DIR, { recursive: true });

function parseArgs(argv) {
  const result = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith("--")) continue;
    const key = arg.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      result[key] = true;
    } else {
      result[key] = next;
      i += 1;
    }
  }
  return result;
}

function sh(cmd, cmdArgs = [], options = {}) {
  return execFileSync(cmd, cmdArgs, {
    encoding: "utf8",
    stdio: options.stdio || ["ignore", "pipe", "pipe"],
    timeout: options.timeout || 30000,
    ...options,
  });
}

function sqlLiteral(value) {
  return `'${String(value ?? "").replace(/'/g, "''")}'`;
}

function sqlite(query) {
  return sh("sqlite3", ["-readonly", "-separator", "\u001f", DRAFTS_DB, query]).trim();
}

function sqliteWrite(query) {
  return sh("sqlite3", [DRAFTS_DB, query]).trim();
}

function loadProgress() {
  if (!existsSync(PROGRESS_PATH)) return [];
  return readFileSync(PROGRESS_PATH, "utf8")
    .split(/\n+/)
    .filter(Boolean)
    .map(line => {
      try { return JSON.parse(line); } catch { return null; }
    })
    .filter(Boolean);
}

function finalReviewedIds(progress) {
  const reviewed = new Set();
  for (const row of progress) {
    if (row.verdict === "pass" || row.verdict === "skip-reviewed") {
      reviewed.add(row.page_id);
    }
  }
  return reviewed;
}

function activePages() {
  const manifest = JSON.parse(readFileSync(join(ROOT, "manifest.json"), "utf8"));
  const pages = [];
  for (const site of manifest.sites) {
    if (!ARTICLE_CATEGORIES.has(site.category)) continue;
    for (const page of site.pages) {
      if (page.quarantined || page.skip_story_review) continue;
      const pageId = `${site.slug}/${page.id}`;
      pages.push({
        page_id: pageId,
        slug: site.slug,
        article_id: page.id,
        site: site.name,
        category: site.category,
        url: page.url,
      });
    }
  }
  return pages;
}

function appendProgress(row) {
  appendFileSync(PROGRESS_PATH, JSON.stringify({
    reviewed_at: new Date().toISOString(),
    ...row,
  }) + "\n");
}

function latestDraftPk() {
  const value = sqlite("select coalesce(max(Z_PK), 0) from ZMANAGEDDRAFT;");
  return Number(value || 0);
}

function latestMatchingDraft(afterPk, url) {
  const query = [
    "select Z_PK, ZUUID, ZCREATED_AT, replace(ZCONTENT, char(31), ' ')",
    "from ZMANAGEDDRAFT",
    `where Z_PK > ${Number(afterPk)} and ZCONTENT like ${sqlLiteral(`%${url}%`)}`,
    "order by Z_PK desc limit 1;",
  ].join(" ");
  const out = sqlite(query);
  if (!out) return null;
  const [pk, uuid, createdAt, content] = out.split("\u001f");
  return { pk: Number(pk), uuid, created_at: Number(createdAt), content };
}

function latestDraftAfter(afterPk) {
  const query = [
    "select Z_PK, ZUUID, ZCREATED_AT, replace(ZCONTENT, char(31), ' ')",
    "from ZMANAGEDDRAFT",
    `where Z_PK > ${Number(afterPk)}`,
    "order by Z_PK desc limit 1;",
  ].join(" ");
  const out = sqlite(query);
  if (!out) return null;
  const [pk, uuid, createdAt, content] = out.split("\u001f");
  return { pk: Number(pk), uuid, created_at: Number(createdAt), content };
}

function waitForDraft(afterPk, url, timeoutMs = 20000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const draft = latestMatchingDraft(afterPk, url) || latestDraftAfter(afterPk);
    if (draft) return draft;
    sleep(1000);
  }
  return null;
}

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function runAppleScript(source, timeout = 8000) {
  return sh("osascript", ["-e", source], { timeout });
}

function openInSafari(url) {
  try {
    runAppleScript(`
tell application "System Events"
  if exists process "Safari" then
    tell process "Safari"
      if (count windows) > 0 and name of window 1 is "Untitled" then
        click button 1 of window 1
      end if
    end tell
  end if
end tell`, 5000);
    sleep(500);
  } catch (error) {
    // Continue with normal navigation; Safari may not have a blank window to close.
  }

  sh("open", ["-a", "Safari", url]);
  sleep(9000);
  const script = `
tell application "System Events"
  if not (exists process "Safari") then error "Safari process is not running"
  set frontmost of process "Safari" to true
end tell`;
  runAppleScript(script, 8000);
  sleep(1000);
}

function clickCatScratches() {
  const script = `
tell application "System Events"
  set frontmost of process "Safari" to true
  delay 0.3
  key code 53
  delay 0.1
  tell process "Safari"
    click (first button of toolbar 1 of window 1 whose description is "Clip to Drafts")
  end tell
end tell`;
  let automationNote = "";
  try {
    runAppleScript(script, 10000);
    automationNote = "toolbar-click";
  } catch (error) {
    const fallback = `
tell application "System Events"
  set frontmost of process "Safari" to true
  delay 0.3
  keystroke "d" using {command down, shift down}
end tell`;
    runAppleScript(fallback, 8000);
    automationNote = `shortcut-fallback:${String(error?.message || error).split("\n")[0]}`;
  }
  sleep(1200);
  const promptScript = `
tell application "System Events"
  tell process "Safari"
    try
      set focusedName to name of value of attribute "AXFocusedUIElement"
      if focusedName contains "Allow" then
        key code 36
        return focusedName
      end if
    end try
  end tell
end tell
return ""`;
  const prompt = runAppleScript(promptScript, 5000).trim();
  return [automationNote, prompt].filter(Boolean).join("|");
}

function bodyFromDraft(content) {
  const marker = "\n\n---\n\n";
  const index = content.indexOf(marker);
  return index >= 0 ? content.slice(index + marker.length).trim() : content.trim();
}

function titleFromDraft(content) {
  const first = content.split(/\n/).find(line => line.trim());
  return (first || "").replace(/^#\s*/, "").trim();
}

function repeatedBlockCount(body) {
  const counts = new Map();
  for (const block of body.split(/\n{2,}/).map(b => b.trim()).filter(b => b.length > 80 && !/^\d+:\s/.test(b))) {
    const key = block.toLowerCase().replace(/\s+/g, " ").slice(0, 300);
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return [...counts.values()].filter(count => count > 1).length;
}

function judgeDraft(page, draft) {
  const content = draft?.content || "";
  const body = bodyFromDraft(content);
  const issues = [];
  const title = titleFromDraft(content);
  const canonicalPageUrl = page.url.replace(/[?#].*$/, "").replace(/\/$/, "");
  const hasUrl = content.includes(`<${page.url}>`) ||
    content.includes(page.url) ||
    content.includes(`<${canonicalPageUrl}>`) ||
    content.includes(canonicalPageUrl);
  const bodyChars = body.length;
  const paragraphCount = body.split(/\n{2,}/).filter(p => p.trim().length > 60).length;
  const repeatedBlocks = repeatedBlockCount(body);
  const junk = JUNK_PATTERNS.filter(([, pattern]) => pattern.test(body)).map(([name]) => name);

  if (!hasUrl) issues.push("missing-source-url");
  if (!title || title === "Untitled") issues.push("missing-title");
  if (bodyChars < 700) issues.push(`too-short:${bodyChars}`);
  if (paragraphCount < 2 && bodyChars < 2000) issues.push(`low-paragraph-count:${paragraphCount}`);
  if (repeatedBlocks > 0) issues.push(`repeated-blocks:${repeatedBlocks}`);
  if (junk.length > 0) issues.push(...junk.map(name => `junk:${name}`));
  if (/captcha|cloudflare|datadome|enable javascript|access denied/i.test(body.slice(0, 2000))) {
    issues.push("blocked-or-challenge-page");
  }

  const isSkip = issues.includes("blocked-or-challenge-page") || issues.includes("junk:paywall");

  return {
    verdict: isSkip ? "skip-reviewed" : issues.length === 0 ? "pass" : "fix-needed",
    title,
    body_chars: bodyChars,
    paragraph_count: paragraphCount,
    repeated_blocks: repeatedBlocks,
    issues,
    preview: body.replace(/\s+/g, " ").slice(0, 280),
    ending: body.replace(/\s+/g, " ").slice(-280),
  };
}

function ensureDraftTags(draft) {
  if (!draft?.uuid) return;
  const nowCoreData = Date.now() / 1000 - 978307200;
  const escapedUuid = sqlLiteral(draft.uuid);
  const statements = ["begin immediate transaction;"];

  for (const tag of REVIEW_TAGS) {
    statements.push(`
insert into ZMANAGEDTAG (Z_PK, Z_ENT, Z_OPT, ZHIDDEN, ZCREATED_AT, ZCHANGE_TAG, ZNAME)
select (select Z_MAX + 1 from Z_PRIMARYKEY where Z_NAME = 'ManagedTag'), 8, 1, 0, ${nowCoreData}, '', ${sqlLiteral(tag)}
where not exists (select 1 from ZMANAGEDTAG where ZNAME = ${sqlLiteral(tag)});
update Z_PRIMARYKEY set Z_MAX = (select coalesce(max(Z_PK), Z_MAX) from ZMANAGEDTAG) where Z_NAME = 'ManagedTag';
insert into ZMANAGEDDRAFTTAG (Z_PK, Z_ENT, Z_OPT, ZHIDDEN, ZCHANGE_TAG, ZDRAFT_UUID, ZNAME)
select (select Z_MAX + 1 from Z_PRIMARYKEY where Z_NAME = 'ManagedDraftTag'), 5, 1, 0, '', ${escapedUuid}, ${sqlLiteral(tag)}
where not exists (select 1 from ZMANAGEDDRAFTTAG where ZDRAFT_UUID = ${escapedUuid} and ZNAME = ${sqlLiteral(tag)});
update Z_PRIMARYKEY set Z_MAX = (select coalesce(max(Z_PK), Z_MAX) from ZMANAGEDDRAFTTAG) where Z_NAME = 'ManagedDraftTag';`);
  }

  statements.push(`
update ZMANAGEDDRAFT
set ZCACHED_TAGS = ${sqlLiteral(REVIEW_TAGS.join(","))}, Z_OPT = coalesce(Z_OPT, 1) + 1
where ZUUID = ${escapedUuid};`);
  statements.push("commit;");
  sqliteWrite(statements.join("\n"));
}

function reviewPage(page) {
  const attempt = loadProgress().filter(row => row.page_id === page.page_id).length + 1;
  console.log(`\nreview ${page.page_id} attempt=${attempt}`);
  console.log(page.url);

  if (dryRun) {
    appendProgress({ ...page, attempt, verdict: "dry-run", draft_pk: null, issues: [] });
    return;
  }

  const beforePk = latestDraftPk();
  let promptAccepted = null;
  let draft = null;

  try {
    openInSafari(page.url);
    promptAccepted = clickCatScratches();
    draft = waitForDraft(beforePk, page.url);
  } catch (error) {
    appendProgress({
      ...page,
      attempt,
      verdict: "fix-needed",
      draft_pk: null,
      issues: ["automation-error"],
      error: String(error?.message || error).split("\n")[0],
    });
    console.log(`  automation-error ${String(error?.message || error).split("\n")[0]}`);
    return;
  }

  if (!draft) {
    appendProgress({
      ...page,
      attempt,
      verdict: "fix-needed",
      draft_pk: null,
      issues: ["no-draft-created"],
      prompt_accepted: promptAccepted || null,
    });
    console.log("  no draft created");
    return;
  }

  ensureDraftTags(draft);
  const judgment = judgeDraft(page, draft);
  appendProgress({
    ...page,
    attempt,
    verdict: judgment.verdict,
    draft_pk: draft.pk,
    draft_uuid: draft.uuid,
    prompt_accepted: promptAccepted || null,
    issues: judgment.issues,
    title: judgment.title,
    body_chars: judgment.body_chars,
    paragraph_count: judgment.paragraph_count,
    repeated_blocks: judgment.repeated_blocks,
    preview: judgment.preview,
    ending: judgment.ending,
  });

  console.log(`  ${judgment.verdict} draft=${draft.pk} chars=${judgment.body_chars} issues=${judgment.issues.join(",") || "none"}`);
}

const progress = loadProgress();
const reviewed = finalReviewedIds(progress);
let pages = activePages().filter(page => !reviewed.has(page.page_id));

if (explicitPage) {
  pages = activePages().filter(page => page.page_id === explicitPage);
  if (pages.length === 0) {
    throw new Error(`No active page matched ${explicitPage}`);
  }
} else {
  pages = pages.slice(0, batchSize);
}

console.log(`active remaining=${activePages().filter(page => !reviewed.has(page.page_id)).length} selected=${pages.length}`);
for (const page of pages) {
  try {
    reviewPage(page);
  } catch (error) {
    appendProgress({
      ...page,
      attempt: loadProgress().filter(row => row.page_id === page.page_id).length + 1,
      verdict: "fix-needed",
      draft_pk: null,
      issues: ["runner-error"],
      error: String(error?.message || error).split("\n")[0],
    });
    console.log(`  runner-error ${page.page_id}: ${String(error?.message || error).split("\n")[0]}`);
  }
}
