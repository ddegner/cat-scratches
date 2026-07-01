# Cat Scratches

Cat Scratches is a Safari extension for sending clean website text to
[Drafts](https://getdrafts.com). Automatically extract the main article body, or
select text to clip a passage. Captures open in Drafts with the page title and
source URL attached, or use the Share Sheet to send them to Notes, Mail,
Messages, and other apps.

**Author:** David Degner  
**Website:** [daviddegner.com](https://www.daviddegner.com)  
**App Store:** [Cat Scratches](https://apps.apple.com/us/app/cat-scratches/id6749605278)  
**Issues and feature requests:** [github.com/ddegner/cat-scratches](https://github.com/ddegner/cat-scratches)

## Current Release

Version 2.4.0 adds a direct Ulysses destination while keeping the existing
Drafts and Share Sheet capture flow. Cat Scratches sends clean Safari text to
Drafts, Ulysses, Notes, Mail, Messages, and other apps.

Highlights:

- Direct Ulysses handoff for creating Markdown sheets
- Share Sheet errors are surfaced when a destination cannot open
- Refreshed App Store screenshots for macOS and iOS
- Same automatic article extraction and selected-text clipping flow

## Features

- Capture selected text or the main page content from Safari
- Send directly to Drafts with title, source URL, tags, and Markdown formatting
- Use a keyboard shortcut, toolbar button, or extension menu
- Customize article selectors, filters, cleanup rules, templates, and Drafts URL
  scheme behavior
- Use Selector Finder from Advanced settings when a page needs a custom selector
- Sync extension settings with iCloud where available

## Setup

1. Install Cat Scratches from the App Store, or build the Xcode project locally.
2. Enable the Safari extension in Safari Settings -> Extensions.
3. Allow Cat Scratches on the sites you want to capture.
4. Install Drafts on the same device.
5. On first capture, allow Safari to open Drafts. Choose "Remember my choice" if
   Safari offers it.
6. Optional: set a custom shortcut and adjust capture settings from the extension
   toolbar menu.

## Usage

1. Open a page in Safari.
2. Optionally select the text you want to capture.
3. Run Cat Scratches with the keyboard shortcut or toolbar button.
4. Review or edit the new Draft.

When no text is selected, Cat Scratches tries to find the story body and remove
page chrome before converting the result to Markdown.

## Customization

Advanced settings let you control:

- Content selectors for finding the main article root
- DOM filters for removing unwanted page elements before conversion
- Text cleanup rules for recurring boilerplate that remains after filtering
- Output templates, tags, and source URL formatting
- Drafts URL mode, including direct create and action-based handoff

## Distribution Notes

The App Store distributes both iOS and macOS builds. GitHub releases are for
source history and macOS release artifacts only; iOS binaries are distributed
through TestFlight or the App Store.

## Troubleshooting

**Drafts does not open**  
Confirm Drafts is installed and that Safari is allowed to open Drafts URLs.

**Safari asks whether to open Drafts**  
Allow the prompt. If Safari offers "Remember my choice," enable it to avoid the
prompt on future captures.

**A site captures the wrong content**  
Use Advanced settings to adjust selectors, filters, or cleanup rules. Selector
Finder can suggest better selectors for difficult pages.

**The extension is unavailable on a page**  
Check Safari Settings -> Extensions -> Cat Scratches and confirm site permission
is enabled.

## Development

The core extraction path lives in the Safari extension resources:

- `SafariToDrafts/Shared (Extension)/Resources/content-extractor.js`
- `SafariToDrafts/Shared (Extension)/Resources/defaults.js`
- `SafariToDrafts/Shared (Extension)/Resources/background.js`

The corpus harness and regression scripts live under `tests/`.
