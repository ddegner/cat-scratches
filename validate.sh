#!/bin/bash

set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
PROJECT="$ROOT/SafariToDrafts/Cat Scratches.xcodeproj"

cd "$ROOT"

npm --prefix tests/harness run validate-extension
npm --prefix tests/harness run regressions
npm --prefix tests/harness run evaluate

if [ -z "${DERIVED_DATA_ROOT:-}" ]; then
    DERIVED_DATA_ROOT="$(mktemp -d "${TMPDIR:-/tmp}/cat-scratches-validation.XXXXXX")"
    CLEAN_DERIVED_DATA=true
else
    mkdir -p "$DERIVED_DATA_ROOT"
    CLEAN_DERIVED_DATA=false
fi

cleanup() {
    if [ "$CLEAN_DERIVED_DATA" = true ]; then
        rm -rf "$DERIVED_DATA_ROOT"
    fi
}
trap cleanup EXIT

IOS_DERIVED_DATA="$DERIVED_DATA_ROOT/ios"
MACOS_DERIVED_DATA="$DERIVED_DATA_ROOT/macos"

echo "Building iOS extension..."
xcodebuild -quiet \
    -project "$PROJECT" \
    -scheme "Cat Scratches (iOS)" \
    -configuration Debug \
    -destination "generic/platform=iOS Simulator" \
    -derivedDataPath "$IOS_DERIVED_DATA" \
    build CODE_SIGNING_ALLOWED=NO

echo "Building macOS extension..."
xcodebuild -quiet \
    -project "$PROJECT" \
    -scheme "Cat Scratches (macOS)" \
    -configuration Debug \
    -destination "platform=macOS" \
    -derivedDataPath "$MACOS_DERIVED_DATA" \
    build CODE_SIGNING_ALLOWED=NO

IOS_EXTENSION="$(find "$IOS_DERIVED_DATA/Build/Products" -name "Cat Scratches Extension.appex" -type d -print -quit)"
MACOS_EXTENSION="$(find "$MACOS_DERIVED_DATA/Build/Products" -name "Cat Scratches Extension.appex" -type d -print -quit)"

"$ROOT/check_extension_bundle.sh" "$IOS_EXTENSION"
"$ROOT/check_extension_bundle.sh" "$MACOS_EXTENSION"

echo "Validation passed."
