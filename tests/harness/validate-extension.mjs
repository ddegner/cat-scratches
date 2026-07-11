#!/usr/bin/env node

import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");
const RESOURCES = join(ROOT, "SafariToDrafts", "Shared (Extension)", "Resources");
const PROJECT = join(ROOT, "SafariToDrafts", "Cat Scratches.xcodeproj", "project.pbxproj");
const LOCALES = join(RESOURCES, "_locales");

const read = (path) => readFileSync(path, "utf8");
const parseJSON = (path) => JSON.parse(read(path));

const manifest = parseJSON(join(RESOURCES, "manifest.json"));
const settingsHTML = read(join(RESOURCES, "settings.html"));
const settingsJS = read(join(RESOURCES, "settings.js"));
const backgroundJS = read(join(RESOURCES, "background.js"));
const project = read(PROJECT);

const marketingVersions = new Set(
  [...project.matchAll(/\bMARKETING_VERSION = ([^;]+);/g)].map((match) => match[1].trim()),
);
const buildVersions = new Set(
  [...project.matchAll(/\bCURRENT_PROJECT_VERSION = ([^;]+);/g)].map((match) => match[1].trim()),
);

assert.equal(marketingVersions.size, 1, "all Xcode targets must use one MARKETING_VERSION");
assert.equal(buildVersions.size, 1, "all Xcode targets must use one CURRENT_PROJECT_VERSION");
assert.equal(manifest.version, [...marketingVersions][0], "manifest version must match MARKETING_VERSION");

const english = parseJSON(join(LOCALES, "en", "messages.json"));
const referencedKeys = new Set(["extension_name", "extension_description", "action_title"]);

for (const match of settingsHTML.matchAll(/data-i18n(?:-placeholder|-html|-aria)?="([^"]+)"/g)) {
  referencedKeys.add(match[1]);
}
for (const source of [settingsJS, backgroundJS]) {
  for (const match of source.matchAll(/getMessage\(\s*["']([^"']+)["']/g)) {
    referencedKeys.add(match[1]);
  }
}
for (const match of JSON.stringify(manifest).matchAll(/__MSG_(.*?)__/g)) {
  referencedKeys.add(match[1]);
}

const missingEnglishKeys = [...referencedKeys].filter((key) => !english[key]).sort();
assert.deepEqual(missingEnglishKeys, [], `missing English locale keys: ${missingEnglishKeys.join(", ")}`);

const requiredDestinationMessages = ["error_open_failed"];
for (const locale of readdirSync(LOCALES).sort()) {
  const messagesPath = join(LOCALES, locale, "messages.json");
  if (!existsSync(messagesPath)) continue;
  const messages = parseJSON(messagesPath);
  const unknownKeys = Object.keys(messages).filter((key) => !english[key]).sort();
  assert.deepEqual(unknownKeys, [], `${locale} contains keys missing from English: ${unknownKeys.join(", ")}`);
  for (const key of requiredDestinationMessages) {
    assert.ok(messages[key], `${locale} is missing required destination message ${key}`);
  }
}

const settingsDocument = new JSDOM(settingsHTML).window.document;
const referencedIDs = new Set(
  [...settingsJS.matchAll(/getElementById\(\s*["']([^"']+)["']/g)].map((match) => match[1]),
);
const missingIDs = [...referencedIDs].filter((id) => !settingsDocument.getElementById(id)).sort();
assert.deepEqual(missingIDs, [], `settings.js references missing HTML IDs: ${missingIDs.join(", ")}`);

const shippingSurface = [settingsHTML, settingsJS, JSON.stringify(manifest)].join("\n");
assert.doesNotMatch(shippingSurface, /selector[ -]finder|selector-finder|gemini|workers\.dev/i);
assert.equal(existsSync(join(ROOT, "content-selector-tool")), false, "retired Selector Finder server source must stay removed");

console.log(
  `extension metadata valid: version ${manifest.version} build ${[...buildVersions][0]}, ` +
  `${referencedKeys.size} locale keys, ${referencedIDs.size} settings elements`,
);
