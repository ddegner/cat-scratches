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
        return String(raw || '').replace(/\\(n|r|t|\\)/g, function (match, escaped) {
            if (escaped === 'n') return '\n';
            if (escaped === 'r') return '\r';
            if (escaped === 't') return '\t';
            return '\\';
        });
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

    function splitMarkdownFenceSegments(content) {
        const lines = String(content || '').split('\n');
        const segments = [];
        let buffer = [];
        let inFence = false;
        let fenceChar = '';
        let fenceSize = 0;

        function flush() {
            if (buffer.length > 0) {
                segments.push({
                    fenced: inFence,
                    text: buffer.join('\n')
                });
                buffer = [];
            }
        }

        for (const line of lines) {
            const match = line.match(/^\s*(`{3,}|~{3,})/);

            if (match) {
                const marker = match[1];
                const char = marker[0];

                if (!inFence) {
                    flush();
                    inFence = true;
                    fenceChar = char;
                    fenceSize = marker.length;
                    buffer.push(line);
                    continue;
                }

                if (char === fenceChar && marker.length >= fenceSize) {
                    buffer.push(line);
                    flush();
                    inFence = false;
                    fenceChar = '';
                    fenceSize = 0;
                    continue;
                }
            }

            buffer.push(line);
        }

        // An unterminated fence is page noise, not a real code block — treat
        // the trailing segment as plain text so cleanup rules still apply.
        if (inFence) {
            inFence = false;
        }

        flush();
        return segments;
    }

    function joinMarkdownFenceSegments(segments) {
        return segments.map(segment => segment.text).join('\n');
    }

    function applyRuleToTextSegment(content, rule) {
        if (rule.type === 'line') {
            return String(content || '')
                .split('\n')
                .filter(line => !regexMatches(rule.regex, line))
                .join('\n');
        }

        if (rule.type === 'block') {
            return String(content || '')
                .split(/\n{2,}/)
                .filter(block => !regexMatches(rule.regex, block.trim()))
                .join('\n\n');
        }

        if (rule.type === 'replace') {
            rule.regex.lastIndex = 0;
            return String(content || '').replace(rule.regex, rule.replacement);
        }

        return content;
    }

    function findTailTruncationIndex(segments, regex) {
        // Tail rules must see the whole document so that $ keeps meaning
        // end-of-document; matching per segment would let $ fire at every
        // code-fence boundary. Matches starting inside a fence are skipped.
        const fullText = joinMarkdownFenceSegments(segments);
        const fencedRanges = [];
        let offset = 0;

        for (const segment of segments) {
            if (segment.fenced) {
                fencedRanges.push([offset, offset + segment.text.length]);
            }
            offset += segment.text.length + 1; // +1 for the joining '\n'
        }

        const flags = regex.flags.includes('g') ? regex.flags : regex.flags + 'g';
        const searchRegex = new RegExp(regex.source, flags);
        let match;

        while ((match = searchRegex.exec(fullText)) !== null) {
            const index = match.index;
            const insideFence = fencedRanges.some(range => index >= range[0] && index < range[1]);
            if (!insideFence) {
                return { fullText, index };
            }
            searchRegex.lastIndex = index + Math.max(match[0].length, 1);
        }

        return { fullText, index: -1 };
    }

    function applyTextCleanupRules(content, rules) {
        let segments = splitMarkdownFenceSegments(content);
        const { compiled } = compileTextCleanupRules(rules);

        for (const rule of compiled) {
            if (rule.type === 'tail') {
                const { fullText, index } = findTailTruncationIndex(segments, rule.regex);
                if (index >= 0) {
                    segments = splitMarkdownFenceSegments(fullText.slice(0, index));
                }
            } else {
                segments = segments.map(segment => segment.fenced
                    ? segment
                    : {
                        fenced: false,
                        text: applyRuleToTextSegment(segment.text, rule)
                    });
            }
        }

        return joinMarkdownFenceSegments(segments);
    }

    function validateTextCleanupRules(rules) {
        return compileTextCleanupRules(rules).errors;
    }

    function decodeHtmlEntities(content) {
        return String(content || '').replace(/&(?:#(\d+)|#x([0-9a-fA-F]+)|([a-zA-Z]+));/g, function (match, dec, hex, named) {
            if (dec || hex) {
                const codePoint = parseInt(dec || hex, dec ? 10 : 16);
                try {
                    return String.fromCodePoint(codePoint);
                } catch (e) {
                    return match;
                }
            }
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

    function removeRawHtmlScaffolding(content) {
        return String(content || '')
            .replace(/<!--.*?-->/g, '')
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
            .replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, '');
    }

    function normalizeExtractedTextStart(content) {
        const normalizedLineEndings = removeRawHtmlScaffolding(content)
            .replace(/\r\n?/g, '\n');

        return joinMarkdownFenceSegments(splitMarkdownFenceSegments(normalizedLineEndings).map(segment => {
            if (segment.fenced) {
                return segment;
            }

            return {
                fenced: false,
                text: segment.text
                    .replace(/\n\s*\n\s*\n+/g, '\n\n')
                    .split('\n')
                    .map(line => line.replace(/(\S) {2,}/g, '$1 '))
                    .join('\n')
            };
        }));
    }

    function normalizeExtractedTextEnd(content) {
        const normalizedLineEndings = String(content || '').replace(/\r\n?/g, '\n');
        return joinMarkdownFenceSegments(splitMarkdownFenceSegments(normalizedLineEndings).map(segment => {
            if (segment.fenced) {
                return segment;
            }

            return {
                fenced: false,
                text: segment.text.replace(/\n\s*\n\s*\n+/g, '\n\n')
            };
        })).trim();
    }

    function shouldIncludeLinks(settings) {
        return settings?.outputFormat?.includeLinks === true;
    }

    function createBaseTurndownService(settings) {
        return new TurndownService({
            headingStyle: 'atx',
            hr: '---',
            bulletListMarker: '*',
            codeBlockStyle: 'fenced',
            linkStyle: shouldIncludeLinks(settings) ? 'inlined' : 'none'
        });
    }

    function removeUnsafeDescendants(element) {
        if (!element || !element.querySelectorAll) {
            return element;
        }

        element.querySelectorAll('script, style, noscript').forEach(el => el.remove());
        return element;
    }

    // Sites that space label/value spans purely with CSS produce fused text
    // after markdown conversion ("balance_transactionnullable string"). When a
    // parent holds ONLY element children, the author isn't writing prose, so a
    // missing space at a child boundary is presentation, not intent — insert
    // one. Mixed text/element content (real prose, drop caps, punctuation
    // after links) is left untouched, as is anything code-like.
    const SEPARATOR_SKIP_TAGS = new Set(['PRE', 'CODE', 'SCRIPT', 'STYLE', 'TEXTAREA', 'SVG', 'MATH', 'KBD', 'SAMP']);
    const SEPARATOR_SKIP_CLASS_RE = /\b(highlight|hljs|prism|katex|codeblock|code-block|sourceCode)\b/i;
    // Only fuse-repair between INLINE elements. Block elements (P, DIV, LI,
    // headings…) already emit their own line breaks in markdown, so two block
    // siblings never fuse — and forcing a space there promotes header/byline
    // metadata (`<p>date</p><a>category</a>`) into the body differently than
    // baseline. The fusion bug is strictly an inline-inline phenomenon.
    // Pure emphasis tags (B/I/EM/STRONG/U/S/MARK/SUB/SUP) are deliberately
    // excluded: turndown renders them with * / _ markers that already separate
    // adjacent runs, so they don't fuse — and inserting spaces between them
    // shifts the exact marker adjacency that footer/promo cleanup rules are
    // anchored to. The real fusion bug is span/label-based (CSS-spaced
    // label/value markup).
    const INLINE_SEPARATOR_TAGS = new Set([
        'SPAN', 'A', 'SMALL', 'ABBR', 'CITE', 'Q', 'TIME', 'LABEL',
        'BDI', 'BDO', 'DFN', 'DATA', 'VAR', 'WBR'
    ]);

    function insertInlineSeparators(element) {
        if (!element || !element.childNodes || element.nodeType !== 1) {
            return element;
        }
        if (SEPARATOR_SKIP_TAGS.has(element.nodeName)) {
            return element;
        }
        const className = typeof element.className === 'string' ? element.className : '';
        if (SEPARATOR_SKIP_CLASS_RE.test(className)) {
            return element;
        }

        const children = Array.from(element.childNodes);
        const hasSignificantText = children.some(
            node => node.nodeType === 3 && /\S/.test(node.nodeValue || '')
        );

        if (!hasSignificantText) {
            for (let i = 0; i < children.length - 1; i += 1) {
                const current = children[i];
                const next = children[i + 1];
                if (current.nodeType !== 1 || next.nodeType !== 1) {
                    continue;
                }
                if (!INLINE_SEPARATOR_TAGS.has(current.nodeName) || !INLINE_SEPARATOR_TAGS.has(next.nodeName)) {
                    continue;
                }
                const currentText = current.textContent || '';
                const nextText = next.textContent || '';
                if (/\S$/.test(currentText) && /^\S/.test(nextText)) {
                    element.insertBefore(element.ownerDocument.createTextNode(' '), next);
                }
            }
        }

        for (const child of children) {
            if (child.nodeType === 1) {
                insertInlineSeparators(child);
            }
        }
        return element;
    }

    function extractMarkdownFromSelectionContainer(container, settings) {
        if (!container) {
            return '';
        }

        const selectionClone = container.cloneNode ? container.cloneNode(true) : container;
        removeUnsafeDescendants(selectionClone);
        insertInlineSeparators(selectionClone);

        if (typeof TurndownService !== 'undefined') {
            const turndownService = createBaseTurndownService(settings);
            return turndownService.turndown(selectionClone.innerHTML || '');
        }

        return selectionClone.textContent || '';
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
        const mediaSelectorNames = ['img', 'picture', 'figure', 'video', 'audio', 'figcaption'];

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

        function selectorTargetsMediaElement(filter) {
            return String(filter || '')
                .split(',')
                .some(part => {
                    const lower = part.trim().toLowerCase();
                    return mediaSelectorNames.some(name => {
                        if (lower === name) {
                            return true;
                        }
                        return lower.startsWith(name + '.') ||
                            lower.startsWith(name + '#') ||
                            lower.startsWith(name + '[') ||
                            lower.startsWith(name + ':') ||
                            lower.startsWith(name + ' ') ||
                            lower.startsWith(name + '>') ||
                            lower.startsWith(name + '+') ||
                            lower.startsWith(name + '~');
                    });
                });
        }

        const hasMediaElementFilter = validCustomFilters.some(selectorTargetsMediaElement);

        try {
            if (typeof TurndownService !== 'undefined') {
                turndownService = createBaseTurndownService(settings);

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
                        if (hasMediaElementFilter && mediaNodeNames.has(node.nodeName)) {
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

            const withoutScaffolding = removeRawHtmlScaffolding(raw);
            let text = withoutScaffolding;

            if (/<[a-z][\s\S]*>/i.test(withoutScaffolding)) {
                try {
                    const template = doc.createElement('template');
                    template.innerHTML = withoutScaffolding;
                    text = template.content.textContent || template.textContent || withoutScaffolding;
                } catch (e) {
                    text = withoutScaffolding;
                }
            }

            return decodeHtmlEntities(text)
                .replace(/\r\n?/g, '\n')
                .replace(/[ \t]+/g, ' ')
                .replace(/([a-z][.!?])(?=["“‘]?[A-Z])/g, '$1 ')
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
                        const minContentLength = settings?.advancedFiltering?.minContentLength ?? 150;

                        if (textLength >= minContentLength) {
                            // Calculate link ratio
                            const maxLinkRatio = settings?.advancedFiltering?.maxLinkRatio ?? 0.3;

                            if (linkRatio <= maxLinkRatio) {
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

        // Deck rescue: many CMSes place the standfirst/intro paragraph in a
        // sibling of the article body container (e.g. .article__intro next to
        // .article__content), so the winning selector never includes it. If a
        // conventionally-named deck element precedes the chosen root, prepend
        // its text — unless the body already contains it (some sites duplicate
        // the dek inside the article).
        // Deliberately excludes "subhead(line)" — that names mid-article
        // section headings (.b-subheadline, .subhead-embed), not the lede.
        const DECK_CLASS_RE = /(^|[\s_-])(article__intro|entry__intro|post__intro|standfirst|article-standfirst|deck|article__dek|dek|lede|article-lede)($|[\s_-])/i;

        function findDeckElement(rootElement) {
            let scope = rootElement.parentElement;
            for (let depth = 0; scope && depth < 2; depth += 1, scope = scope.parentElement) {
                for (const child of scope.children) {
                    if (child === rootElement || child.contains(rootElement) || rootElement.contains(child)) {
                        continue;
                    }
                    const className = typeof child.className === 'string' ? child.className : '';
                    if (!DECK_CLASS_RE.test(className)) {
                        continue;
                    }
                    // 2 = DOCUMENT_POSITION_PRECEDING: deck must come before the body.
                    if (!(rootElement.compareDocumentPosition(child) & 2)) {
                        continue;
                    }
                    const text = (child.textContent || '').trim();
                    if (text.length >= 20 && text.length <= 600) {
                        return child;
                    }
                }
            }
            return null;
        }

        // If we found a best element, use it
        if (bestElement) {
            if (useMarkdownConversion) {
                // bestSanitizedElement is a detached, already-filtered clone;
                // mutate it (never the live DOM element) to insert the inline
                // fuse-repair separators before markdown conversion.
                const conversionRoot = bestSanitizedElement || bestElement.cloneNode(true);
                insertInlineSeparators(conversionRoot);
                content = turndownService.turndown(conversionRoot.innerHTML);

                const deck = findDeckElement(bestElement);
                if (deck) {
                    const deckClone = removeFilteredDescendants(deck.cloneNode(true));
                    insertInlineSeparators(deckClone);
                    const deckMarkdown = turndownService.turndown(deckClone.innerHTML || '').trim();
                    const normalize = s => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
                    const deckKey = normalize(deckMarkdown).slice(0, 80);
                    if (deckKey && !normalize(content).includes(deckKey)) {
                        content = deckMarkdown + '\n\n' + content;
                    }
                }
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
                const fallbackElement = doc.body || doc.documentElement;
                if (fallbackElement) {
                    const bodyClone = fallbackElement.cloneNode(true);
                    unwrapHtmlTemplateScripts(bodyClone);
                    removeFilteredDescendants(bodyClone);
                    insertInlineSeparators(bodyClone);
                    content = turndownService.turndown(bodyClone.innerHTML);
                }
            } else {
                const fallbackElement = doc.body || doc.documentElement;
                content = fallbackElement ? (fallbackElement.textContent || fallbackElement.innerText || '') : '';
                content = content.substring(0, 10000);
            }

            // If content is still empty, and we had specific selectors, maybe return message?
            if (!content && contentSelectors.length > 0 && doc.body) {
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
    root.extractMarkdownFromSelectionContainer = extractMarkdownFromSelectionContainer;
    root.extractContentFromDoc = extractContentFromDoc;
})();
