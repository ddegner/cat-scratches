#!/bin/bash

set -euo pipefail

if [ "$#" -gt 1 ]; then
    echo "Usage: $0 [path-to-extension.appex]" >&2
    exit 2
fi

EXTENSION_PATH="${1:-}"

if [ -z "$EXTENSION_PATH" ]; then
    EXTENSION_PATH="$(
        find "$HOME/Library/Developer/Xcode/DerivedData" \
            -name "Cat Scratches Extension.appex" \
            -not -path "*/Index.noindex/*" \
            -type d \
            -exec stat -f "%m %N" {} \; 2>/dev/null |
        sort -nr |
        sed -n '1s/^[0-9][0-9]* //p'
    )"
fi

if [ -z "$EXTENSION_PATH" ] || [ ! -d "$EXTENSION_PATH" ]; then
    echo "Extension bundle not found: ${EXTENSION_PATH:-<none>}" >&2
    exit 1
fi

if [ -d "$EXTENSION_PATH/Contents/Resources" ]; then
    RESOURCES_PATH="$EXTENSION_PATH/Contents/Resources"
    INFO_PLIST="$EXTENSION_PATH/Contents/Info.plist"
elif [ -f "$EXTENSION_PATH/manifest.json" ]; then
    RESOURCES_PATH="$EXTENSION_PATH"
    INFO_PLIST="$EXTENSION_PATH/Info.plist"
else
    echo "Resources directory not found in extension bundle: $EXTENSION_PATH" >&2
    exit 1
fi

FILES_TO_CHECK=(
    "manifest.json"
    "background.js"
    "defaults.js"
    "settings-store.js"
    "content-extractor.js"
    "turndown.js"
    "settings.html"
    "settings.js"
    "_locales/en/messages.json"
    "_locales/de/messages.json"
    "_locales/es/messages.json"
    "_locales/fr/messages.json"
    "_locales/ja/messages.json"
    "_locales/nl/messages.json"
    "_locales/vi/messages.json"
    "images/toolbar-icon.png"
    "images/toolbar-icon-dark.png"
)

MISSING=0
for file in "${FILES_TO_CHECK[@]}"; do
    if [ ! -f "$RESOURCES_PATH/$file" ]; then
        echo "Missing extension resource: $file" >&2
        MISSING=1
    fi
done

if [ "$MISSING" -ne 0 ]; then
    exit 1
fi

if [ ! -f "$INFO_PLIST" ]; then
    echo "Extension Info.plist not found: $INFO_PLIST" >&2
    exit 1
fi

MANIFEST_VERSION="$(plutil -extract version raw -o - "$RESOURCES_PATH/manifest.json")"
BUNDLE_VERSION="$(/usr/libexec/PlistBuddy -c "Print :CFBundleShortVersionString" "$INFO_PLIST")"

if [ "$MANIFEST_VERSION" != "$BUNDLE_VERSION" ]; then
    echo "Version mismatch: manifest=$MANIFEST_VERSION bundle=$BUNDLE_VERSION" >&2
    exit 1
fi

if rg -n -i 'selector[ -]finder|selector-finder|gemini|workers\.dev' "$RESOURCES_PATH" >/dev/null; then
    echo "Retired Selector Finder code is present in the extension bundle" >&2
    exit 1
fi

echo "Extension bundle valid: $EXTENSION_PATH (version $BUNDLE_VERSION)"
