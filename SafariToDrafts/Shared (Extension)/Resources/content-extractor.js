// Shared content extraction logic for Cat Scratches (Safari-only)
// Used by background.js (tab content extraction) and settings.js (preview)
'use strict';

(function () {
    // Support both window (extension pages) and service worker (globalThis/self) contexts
    const root = (typeof globalThis !== 'undefined')
        ? globalThis
        : (typeof self !== 'undefined')
            ? self
            : (typeof window !== 'undefined' ? window : {});

    const TEXT_CLEANUP_RULE_TYPES = new Set(['line', 'block', 'tail', 'replace']);

    function parseRegexLiteral(raw) {
        const text = String(raw || '').trim();
        if (!text.startsWith('/')) {
            throw new Error('regex must start with /');
        }

        let escaped = false;
        let inCharacterClass = false;
        for (let i = 1; i < text.length; i += 1) {
            const char = text[i];
            if (escaped) {
                escaped = false;
                continue;
            }
            if (char === '\\') {
                escaped = true;
                continue;
            }
            if (char === '[') {
                inCharacterClass = true;
                continue;
            }
            if (char === ']') {
                inCharacterClass = false;
                continue;
            }
            if (char === '/' && !inCharacterClass) {
                const source = text.slice(1, i);
                const flags = text.slice(i + 1).trim();
                return new RegExp(source, flags);
            }
        }

        throw new Error('regex must end with /flags');
    }

    function decodeRuleReplacement(raw) {
        return String(raw || '')
            .replace(/\\n/g, '\n')
            .replace(/\\r/g, '\r')
            .replace(/\\t/g, '\t')
            .replace(/\\\\/g, '\\');
    }

    function parseTextCleanupRule(rule) {
        const raw = String(rule || '').trim();
        if (!raw || raw.startsWith('#')) {
            return null;
        }

        const colonIndex = raw.indexOf(':');
        if (colonIndex <= 0) {
            throw new Error('rule must start with line:, block:, tail:, or replace:');
        }

        const type = raw.slice(0, colonIndex).trim().toLowerCase();
        const body = raw.slice(colonIndex + 1).trim();
        if (!TEXT_CLEANUP_RULE_TYPES.has(type)) {
            throw new Error(`unsupported rule type: ${type}`);
        }

        if (type === 'replace') {
            const separatorIndex = body.indexOf('=>');
            if (separatorIndex < 0) {
                throw new Error('replace rules must use "=>"');
            }

            return {
                type,
                regex: parseRegexLiteral(body.slice(0, separatorIndex).trim()),
                replacement: decodeRuleReplacement(body.slice(separatorIndex + 2).trim())
            };
        }

        return {
            type,
            regex: parseRegexLiteral(body)
        };
    }

    function compileTextCleanupRules(rules, options = {}) {
        const compiled = [];
        const errors = [];
        const configuredRules = Array.isArray(rules) ? rules : [];

        configuredRules.forEach((rule, index) => {
            try {
                const parsed = parseTextCleanupRule(rule);
                if (parsed) {
                    compiled.push(parsed);
                }
            } catch (error) {
                errors.push({
                    index,
                    rule: String(rule || ''),
                    error: error.message
                });
            }
        });

        if (options.throwOnError && errors.length > 0) {
            const first = errors[0];
            throw new Error(`Rule ${first.index + 1}: ${first.error}`);
        }

        return { compiled, errors };
    }

    function regexMatches(regex, text) {
        regex.lastIndex = 0;
        return regex.test(text);
    }

    function applyTextCleanupRules(content, rules) {
        let cleaned = String(content || '');
        const { compiled } = compileTextCleanupRules(rules);

        for (const rule of compiled) {
            if (rule.type === 'line') {
                cleaned = cleaned
                    .split('\n')
                    .filter(line => !regexMatches(rule.regex, line))
                    .join('\n');
            } else if (rule.type === 'block') {
                cleaned = cleaned
                    .split(/\n{2,}/)
                    .filter(block => !regexMatches(rule.regex, block.trim()))
                    .join('\n\n');
            } else if (rule.type === 'tail') {
                rule.regex.lastIndex = 0;
                const match = rule.regex.exec(cleaned);
                if (match) {
                    cleaned = cleaned.slice(0, match.index);
                }
            } else if (rule.type === 'replace') {
                rule.regex.lastIndex = 0;
                cleaned = cleaned.replace(rule.regex, rule.replacement);
            }
        }

        return cleaned;
    }

    function validateTextCleanupRules(rules) {
        return compileTextCleanupRules(rules).errors;
    }

    function decodeHtmlEntities(content) {
        return String(content || '').replace(/&(?:#(\d+)|#x([0-9a-fA-F]+)|([a-zA-Z]+));/g, function (match, dec, hex, named) {
            if (dec) return String.fromCharCode(parseInt(dec, 10));
            if (hex) return String.fromCharCode(parseInt(hex, 16));
            var entities = {
                nbsp: ' ', amp: '&', lt: '<', gt: '>', quot: '"', apos: "'",
                mdash: '\u2014', ndash: '\u2013', lsquo: '\u2018', rsquo: '\u2019',
                ldquo: '\u201C', rdquo: '\u201D', hellip: '\u2026', copy: '\u00A9',
                reg: '\u00AE', trade: '\u2122', bull: '\u2022', middot: '\u00B7',
                eacute: '\u00E9', egrave: '\u00E8', agrave: '\u00E0', uuml: '\u00FC',
                ouml: '\u00F6', auml: '\u00E4', ccedil: '\u00E7', ntilde: '\u00F1'
            };
            return entities[named] || match;
        });
    }

    function normalizeExtractedTextStart(content) {
        return decodeHtmlEntities(String(content || '')
            .replace(/<!--.*?-->/g, '')
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
            .replace(/\r\n?/g, '\n')
            .replace(/\n\s*\n\s*\n+/g, '\n\n')
            .replace(/ +/g, ' '));
    }

    function normalizeExtractedTextEnd(content) {
        return String(content || '')
            .replace(/\n\s*\n\s*\n+/g, '\n\n')
            .trim();
    }

    /**
     * Extract content from a document object (DOM) using settings.
     * Adapted from original background.js logic.
     * 
     * @param {Document} doc - The DOM document to extract from
     * @param {Object} settings - Extension settings object
     * @param {string} url - The URL of the page (for context)
     * @returns {Object} { title, body }
     */
    function extractContentFromDoc(doc, settings, url) {
        // Initialize Turndown
        // Assumes TurndownService is globally available (injected scripts)
        let turndownService = null;
        let useMarkdownConversion = false;
        const configuredFilters = Array.isArray(settings?.advancedFiltering?.customFilters)
            ? settings.advancedFiltering.customFilters
            : [];
        const validCustomFilters = [];
        const mediaNodeNames = new Set(['IMG', 'PICTURE', 'FIGURE', 'VIDEO', 'AUDIO', 'FIGCAPTION']);

        for (const filter of configuredFilters) {
            if (typeof filter !== 'string') {
                continue;
            }

            const trimmed = filter.trim();
            if (!trimmed) {
                continue;
            }

            try {
                // Validate selector once up front instead of failing repeatedly per node.
                doc.querySelector(trimmed);
                validCustomFilters.push(trimmed);
            } catch (e) {
                // Ignore invalid selectors
            }
        }

        const hasMediaFilter = validCustomFilters.some(filter => {
            const lower = filter.toLowerCase();
            return lower.includes('img') ||
                lower.includes('picture') ||
                lower.includes('figure') ||
                lower.includes('video') ||
                lower.includes('audio') ||
                lower.includes('media');
        });

        try {
            if (typeof TurndownService !== 'undefined') {
                turndownService = new TurndownService({
                    headingStyle: 'atx',
                    hr: '---',
                    bulletListMarker: '*',
                    codeBlockStyle: 'fenced',
                    linkStyle: 'inline'
                });

                // Add custom rules
                turndownService.addRule('removeUnwanted', {
                    filter: function (node) {
                        // Remove script/style/noscript elements
                        if (node.nodeName === 'SCRIPT' || node.nodeName === 'STYLE' || node.nodeName === 'NOSCRIPT') {
                            return true;
                        }

                        // Use customFilters for removal logic
                        if (validCustomFilters.length === 0) {
                            return false;
                        }

                        // Check for image/media elements
                        if (hasMediaFilter && mediaNodeNames.has(node.nodeName)) {
                            return true;
                        }

                        // Remove links to images
                        if (node.nodeName === 'A' && node.getAttribute('href')) {
                            const href = node.getAttribute('href').toLowerCase();
                            if (href.match(/\.(jpg|jpeg|png|gif|webp|svg|bmp|tiff?)(\?.*)?$/)) {
                                return true;
                            }
                        }

                        // Check all customFilters for element matching
                        for (const filter of validCustomFilters) {
                            try {
                                if (node.matches && node.matches(filter)) {
                                    return true;
                                }
                            } catch (e) {
                                // Ignore selector errors
                            }
                        }

                        // Remove JSON-LD scripts
                        if (node.getAttribute && node.getAttribute('type') === 'application/ld+json') {
                            return true;
                        }

                        return false;
                    },
                    replacement: function () {
                        return '';
                    }
                });

                useMarkdownConversion = true;
            }
        } catch (error) {
            console.error("Failed to initialize TurndownService:", error);
        }

        function removeFilteredDescendants(element) {
            if (!element || validCustomFilters.length === 0) {
                return element;
            }

            for (const filter of validCustomFilters) {
                try {
                    element.querySelectorAll(filter).forEach(el => el.remove());
                } catch (e) {
                    // Ignore selector errors
                }
            }

            return element;
        }

        function unwrapHtmlTemplateScripts(element) {
            if (!element || !element.querySelectorAll) {
                return element;
            }

            element.querySelectorAll('script[type="text/template"]').forEach(script => {
                const html = (script.textContent || '').trim();
                if (!html || !/<[a-z][\s\S]*>/i.test(html)) {
                    return;
                }

                try {
                    const template = doc.createElement('template');
                    template.innerHTML = html;
                    script.replaceWith(template.content.cloneNode(true));
                } catch (e) {
                    // Keep the original script if the embedded template cannot be parsed.
                }
            });

            return element;
        }

        function getCandidateMetrics(element) {
            const candidate = element.cloneNode(true);
            unwrapHtmlTemplateScripts(candidate);
            removeFilteredDescendants(candidate);
            const textLength = (candidate.textContent || '').trim().length;
            const linkLength = Array.from(candidate.querySelectorAll('a'))
                .reduce((total, link) => total + (link.textContent || '').length, 0);
            const linkRatio = textLength > 0 ? linkLength / textLength : 1;

            return { candidate, textLength, linkRatio };
        }

        function visitJson(value, visitor) {
            if (!value || typeof value !== 'object') {
                return;
            }

            if (Array.isArray(value)) {
                value.forEach(item => visitJson(item, visitor));
                return;
            }

            visitor(value);
            Object.keys(value).forEach(key => visitJson(value[key], visitor));
        }

        function normalizeSchemaArticleBody(raw) {
            if (Array.isArray(raw)) {
                raw = raw.join('\n\n');
            }
            if (typeof raw !== 'string') {
                return '';
            }

            return raw
                .replace(/\r\n?/g, '\n')
                .replace(/[ \t]+/g, ' ')
                .replace(/([.!?])(?=[A-Z0-9"“‘])/g, '$1 ')
                .replace(/\n[ \t]+/g, '\n')
                .trim();
        }

        function extractSchemaArticleBody() {
            const bodies = [];
            const scripts = doc.querySelectorAll('script[type="application/ld+json"]');

            scripts.forEach(script => {
                const rawJson = (script.textContent || '').trim();
                if (!rawJson) {
                    return;
                }

                try {
                    const parsed = JSON.parse(rawJson);
                    visitJson(parsed, node => {
                        const typeValue = node['@type'];
                        const types = Array.isArray(typeValue) ? typeValue : [typeValue];
                        const isArticle = types.some(type => /(?:NewsArticle|Article|BlogPosting)/i.test(String(type || '')));
                        const body = normalizeSchemaArticleBody(node.articleBody);

                        if (isArticle && body.length >= 300) {
                            bodies.push(body);
                        }
                    });
                } catch (e) {
                    // Ignore malformed structured data
                }
            });

            return bodies.sort((a, b) => b.length - a.length)[0] || '';
        }

        // Main extraction logic
        let content = "";

        // In preview mode (settings.js), we likely passed a single specific selector.
        // In background mode (tab), we search through all configured selectors.

        // Check if we are focusing on a valid specific element first?
        // The previous logic for background.js had complex scoring.
        // settings.js logic for preview used a SINGLE selector.

        // To unify: We can check if settings.contentExtraction.customSelectors has 1 item vs many?
        // Or we can just run the full scoring logic effectively.
        // If customSelectors has only 1 item (the preview case), the loop will run once and pick it.

        let bestElement = null;
        let bestSanitizedElement = null;

        // If no custom selectors, use defaults?
        const contentSelectors = settings?.contentExtraction?.customSelectors || [];

        if (contentSelectors.length > 0) {
            for (const selector of contentSelectors) {
                let bestElementForSelector = null;
                let bestSanitizedElementForSelector = null;
                let bestScoreForSelector = 0;

                try {
                    // Special case for Preview: if we passed a selector that might not exist yet?
                    // No, in preview we parse the fetched HTML string into a doc, so it should exist.

                    const elements = doc.querySelectorAll(selector);
                    for (const element of elements) {
                        // Start scoring
                        const { candidate, textLength, linkRatio } = getCandidateMetrics(element);
                        const minContentLength = settings?.advancedFiltering?.minContentLength || 150;

                        if (textLength >= minContentLength) {
                            // Calculate link ratio
                            const maxLinkRatio = settings?.advancedFiltering?.maxLinkRatio || 0.3;

                            if (linkRatio < maxLinkRatio) {
                                let score = textLength;

                                // Bonus for semantic elements
                                if (element.tagName === 'ARTICLE') score += 1000;
                                if (element.getAttribute('role') === 'main') score += 800;
                                if (element.getAttribute('itemtype')) score += 600;

                                // Bonus for content-indicating classes/IDs
                                const classAndId = ((element.getAttribute('class') || '') + ' ' + (element.id || '')).toLowerCase();
                                if (classAndId.includes('article') || classAndId.includes('content') ||
                                    classAndId.includes('post') || classAndId.includes('entry')) {
                                    score += 400;
                                }

                                // Penalty for navigation elements
                                if (classAndId.includes('nav') || classAndId.includes('menu') ||
                                    classAndId.includes('header') || classAndId.includes('footer')) {
                                    score -= 2000;
                                }

                                if (score > bestScoreForSelector) {
                                    bestScoreForSelector = score;
                                    bestElementForSelector = element;
                                    bestSanitizedElementForSelector = candidate;
                                }
                            }
                        }
                    }
                } catch (e) {
                    // Skip selectors that cause errors
                }

                // Selector order is user intent: the first selector with acceptable
                // content wins. Scoring only chooses among elements matched by that
                // selector, not across the whole selector list.
                if (bestElementForSelector) {
                    bestElement = bestElementForSelector;
                    bestSanitizedElement = bestSanitizedElementForSelector;
                    break;
                }
            }
        }

        // If we found a best element, use it
        if (bestElement) {
            if (useMarkdownConversion) {
                content = turndownService.turndown((bestSanitizedElement || bestElement).innerHTML);
            } else {
                const textElement = bestSanitizedElement || bestElement;
                content = textElement.textContent || textElement.innerText || '';
            }
        } else {
            // Fallback or "strategy: default" logic often fell back to body
            // Only if we searched and found nothing (or if we are in preview mode and the selector failed)

            // For preview mode: we want to be strict. If selector fails, show empty/error. 
            // But for consistency: if I provide a specific selector and it fails, bestElement is null.

            // However, the original background.js fallback logic:
            // if no BEST element found -> fallback to BODY.

            if (useMarkdownConversion) {
                const bodyClone = doc.body.cloneNode(true);
                unwrapHtmlTemplateScripts(bodyClone);
                removeFilteredDescendants(bodyClone);
                content = turndownService.turndown(bodyClone.innerHTML);
            } else {
                content = doc.body.textContent || doc.body.innerText || '';
                content = content.substring(0, 10000);
            }

            // If content is still empty, and we had specific selectors, maybe return message?
            if (!content && contentSelectors.length > 0) {
                content = "(Content selector matched no elements or content was empty)";
            }
        }

        const schemaArticleBody = extractSchemaArticleBody();
        if (schemaArticleBody &&
            ((content.length < 700 && schemaArticleBody.length > content.length * 1.15) ||
                (content.length < 1500 && schemaArticleBody.length > content.length * 3))) {
            content = schemaArticleBody;
        }

        content = normalizeExtractedTextStart(content);
        content = applyTextCleanupRules(content, settings?.advancedFiltering?.textCleanupRules);
        content = normalizeExtractedTextEnd(content);

        return {
            title: doc.title || 'Untitled',
            body: content || 'No content extracted'
        };
    }

    // Expose globally
    root.applyTextCleanupRules = applyTextCleanupRules;
    root.validateTextCleanupRules = validateTextCleanupRules;
    root.extractContentFromDoc = extractContentFromDoc;
})();
