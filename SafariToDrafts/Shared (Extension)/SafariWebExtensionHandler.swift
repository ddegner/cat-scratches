//
//  SafariWebExtensionHandler.swift
//  Shared (Extension)
//
//  Created by David Degner on 6/18/25.
//

import SafariServices
import os.log
#if os(macOS)
import AppKit
#endif

// MARK: - Constants (mirrors Constants.swift in main app)
// These are duplicated because extension targets don't share code with app targets
private enum AppURLSchemeConstants {
    static let draftsURLScheme = "drafts://"
    static let supportedURLSchemes: Set<String> = ["drafts", "ulysses"]
    static let macBundleID = "com.agiletortoise.Drafts-OSX"
}

class SafariWebExtensionHandler: NSObject, NSExtensionRequestHandling {

    // iCloud Key-Value Store for cross-device sync
    // Uses single-key pattern: store entire settings dict under "settings" key
    private let store = NSUbiquitousKeyValueStore.default
    private let settingsKey = "settings"

    func beginRequest(with context: NSExtensionContext) {
        let item = context.inputItems.first as? NSExtensionItem
        let message = item?.userInfo?[SFExtensionMessageKey]

        guard let messageDict = message as? [String: Any],
              let action = messageDict["action"] as? String else {
            context.completeRequest(returningItems: nil, completionHandler: nil)
            return
        }

        var response: [String: Any] = ["success": false]

        switch action {
        case "getSettings":
            // Sync from iCloud first (only call synchronize on READ, not write)
            store.synchronize()

            // Load settings dictionary from iCloud Key-Value Store
            if let settingsDict = store.dictionary(forKey: settingsKey) {
                response["settings"] = settingsDict
                os_log(.info, "Loaded settings from iCloud KVS")
            } else {
                response["settings"] = NSNull()
                os_log(.info, "No settings found in iCloud KVS")
            }
            response["success"] = true

        case "saveSettings":
            // Save settings to iCloud Key-Value Store (single dictionary key pattern)
            // NOTE: Do NOT call synchronize() on every write - let iCloud handle it
            if let settings = messageDict["settings"] as? [String: Any] {
                // Store as dictionary - must be property-list safe types
                store.set(settings, forKey: settingsKey)
                response["success"] = true
                response["saved"] = true
                os_log(.info, "Settings saved to iCloud KVS (will sync automatically)")
            } else {
                response["success"] = false
                response["error"] = "Settings must be a dictionary"
                os_log(.error, "Failed to save settings: not a dictionary")
            }

        case "checkDraftsInstalled":
            var isInstalled: Bool? = nil

            #if os(iOS)
            // iOS app extensions cannot use UIApplication.shared to check URL schemes
            // The main app handles initial detection and sets the default
            // Return nil to indicate the extension cannot determine this
            isInstalled = nil
            os_log(.info, "iOS extension cannot check Drafts installation - returning nil")
            #else
            // macOS: Check using NSWorkspace
            if let url = URL(string: AppURLSchemeConstants.draftsURLScheme),
               NSWorkspace.shared.urlForApplication(toOpen: url) != nil {
                isInstalled = true
            } else if NSWorkspace.shared.urlForApplication(withBundleIdentifier: AppURLSchemeConstants.macBundleID) != nil {
                isInstalled = true
            } else {
                isInstalled = false
            }
            #endif

            if let installed = isInstalled {
                response["draftsInstalled"] = installed
                os_log(.info, "Drafts installed check: %{public}@", installed ? "true" : "false")
            } else {
                response["draftsInstalled"] = NSNull()
                os_log(.info, "Drafts installed check: unknown (extension limitation)")
            }
            response["success"] = true

        case "openURL":
            guard let urlString = messageDict["url"] as? String,
                  let url = URL(string: urlString),
                  let scheme = url.scheme?.lowercased(),
                  AppURLSchemeConstants.supportedURLSchemes.contains(scheme) else {
                response["success"] = false
                response["opened"] = false
                response["error"] = "Invalid URL"
                os_log(.error, "Failed to open URL: invalid or unsupported URL")
                break
            }

            #if os(macOS)
            let opened = NSWorkspace.shared.open(url)
            response["success"] = opened
            response["opened"] = opened
            if opened {
                os_log(.info, "Opened app URL via native handler")
            } else {
                response["error"] = "The destination app could not be opened"
                os_log(.error, "Failed to open app URL via native handler")
            }
            #else
            response["opened"] = false
            response["error"] = "Native URL open is unavailable on this platform"
            os_log(.info, "Native URL open unavailable on this platform")
            #endif

        case "getExtensionVersion":
            let version = (Bundle.main.object(forInfoDictionaryKey: "CFBundleShortVersionString") as? String) ?? ""
            if !version.isEmpty {
                response["success"] = true
                response["version"] = version
                os_log(.info, "Returning extension version: %{public}@", version)
            } else {
                response["version"] = NSNull()
                response["error"] = "Could not read extension version"
                os_log(.error, "Could not read extension version from bundle")
            }

        default:
            response["error"] = "Unknown action"
            os_log(.info, "Ignoring action: %{public}@", action)
        }

        // Send response back to JavaScript
        let responseItem = NSExtensionItem()
        responseItem.userInfo = [SFExtensionMessageKey: response]
        context.completeRequest(returningItems: [responseItem], completionHandler: nil)
    }
}
