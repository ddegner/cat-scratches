#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const __dirname = dirname(fileURLToPath(import.meta.url));
const EXT = join(__dirname, "..", "..", "SafariToDrafts", "Shared (Extension)", "Resources");

const sandbox = { globalThis: {} };
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
vm.runInContext(readFileSync(join(EXT, "defaults.js"), "utf8"), sandbox);
vm.runInContext(readFileSync(join(EXT, "content-extractor.js"), "utf8"), sandbox);

const apply = sandbox.applyTextCleanupRules;
const validate = sandbox.validateTextCleanupRules;

assert.equal(
  apply("keep\nSKIP ADVERTISEMENT\nend", ["line:/^skip advertisement$/i"]),
  "keep\nend",
  "line rules remove matching lines",
);

assert.equal(
  apply("keep\n\n## References\n1. citation\n\nend", ["block:/^## References\\b[\\s\\S]*/i"]),
  "keep\n\nend",
  "block rules remove matching Markdown blocks",
);

assert.equal(
  apply("article\n\n## Latest on:\n* junk", ["tail:/\\n+## Latest on:[\\s\\S]*$/i"]),
  "article",
  "tail rules remove from first match through the end",
);

assert.equal(
  apply("a\n\n\nb", ["replace:/\\n{3,}/g => \\n\\n"]),
  "a\n\nb",
  "replace rules decode escaped replacement characters",
);

assert.equal(
  apply("a\nnoise\nb", ["", "# ignored", "line:/^noise$/"]),
  "a\nb",
  "blank lines and comments are ignored",
);

assert.equal(
  apply(
    "Volume 90%\n\nPress shift question mark to access a list of keyboard shortcuts\n\nKeyboard Shortcuts\n\nPlay/PauseSPACE\n\nIncrease Volume↑\n\nDecrease Volume↓\n\nSeek Forward→\n\nSeek Backward←\n\nCaptions On/Offc\n\nFullscreen/Exit Fullscreenf\n\nMute/Unmutem\n\nSeek %0-9\n\nhttps://www.npr.org/example?jwsource=cl\n\nCopied\n\n<iframe id=\"jw_embed\" src=\"https://www.npr.org/embedded-video\"></iframe>\n\nCopied\n\nLive\n\n00:00\n\n00:00\n\n19:27\n\nStory begins here.",
    sandbox.getDefaultSettings().advancedFiltering.textCleanupRules,
  ),
  "Story begins here.",
  "default rules remove NPR/JW player chrome before article text",
);

assert.equal(
  apply(
    "Before paragraph.\n\nWant more from The Dispatch?\n\nRead our morning newsletter and start your day informed. Sign up free.\n\nVisit our website\n\n### Submit a guest post to Ripple\n\nWant to contribute to Ripple? Share your idea with us here and we’ll provide guidance and feedback. Successful pieces may be featured on the site.\n\nAfter paragraph.",
    sandbox.getDefaultSettings().advancedFiltering.textCleanupRules,
  ),
  "Before paragraph.\n\nAfter paragraph.",
  "default rules remove Dispatch/Ripple inline promo blocks",
);

assert.equal(
  apply("A/Z", ["replace:/[A/Z]/g => x"]),
  "xxx",
  "regex parsing allows slashes inside character classes",
);

assert.equal(
  apply("keep", ["line:[invalid"]),
  "keep",
  "invalid saved rules are ignored during extraction",
);

assert.equal(
  validate(["line:[invalid"]).length,
  1,
  "invalid rules are reported for settings validation",
);

assert.equal(
  validate(sandbox.getDefaultSettings().advancedFiltering.textCleanupRules).length,
  0,
  "default text cleanup rules are valid",
);

assert.ok(
  sandbox.migrateSettings({ advancedFiltering: {} }).advancedFiltering.textCleanupRules.length > 0,
  "missing text cleanup rules migrate to defaults",
);

assert.deepEqual(
  Array.from(sandbox.migrateSettings({ advancedFiltering: { textCleanupRules: [] } }).advancedFiltering.textCleanupRules),
  [],
  "empty text cleanup rules are preserved as intentional",
);

{
  const currentDefaults = sandbox.getDefaultSettings();
  const legacyRules = currentDefaults.advancedFiltering.textCleanupRules
    .filter(rule => !rule.includes("Enjoying our latest content"));
  const migrated = sandbox.migrateSettings({
    defaultsRevision: 1,
    advancedFiltering: { textCleanupRules: legacyRules },
  });

  assert.ok(
    migrated.advancedFiltering.textCleanupRules.some(rule => rule.includes("Enjoying our latest content")),
    "default-like saved text cleanup rules get new default rules on revision upgrade",
  );
}

{
  const migrated = sandbox.migrateSettings({
    defaultsRevision: 1,
    advancedFiltering: { textCleanupRules: ["line:/^custom only$/"] },
  });

  assert.deepEqual(
    Array.from(migrated.advancedFiltering.textCleanupRules),
    ["line:/^custom only$/"],
    "short custom text cleanup rules are not overwritten on revision upgrade",
  );
}

console.log("text cleanup rule tests passed");
