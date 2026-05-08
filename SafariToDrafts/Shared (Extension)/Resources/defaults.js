// Shared default settings for Cat Scratches (Safari-only)
// Provides a single source of truth for defaults used by background and settings pages
'use strict';

(function () {
  // Support both window (extension pages) and service worker (globalThis/self) contexts
  const root = (typeof globalThis !== 'undefined')
    ? globalThis
    : (typeof self !== 'undefined')
      ? self
      : (typeof window !== 'undefined' ? window : {});

  // Native messaging app ID for iCloud sync via SafariWebExtensionHandler
  const NATIVE_APP_ID = 'com.daviddegner.Cat-Scratches';

  // Drafts App Store IDs (mirrors Constants.swift in main app)
  const DRAFTS_APP_STORE = {
    iosAppID: '1236254471',
    macAppID: '1435957248',
    get iosURL() { return `https://apps.apple.com/app/id${this.iosAppID}`; },
    get macURL() { return `https://apps.apple.com/app/id${this.macAppID}`; }
  };

  const TEMPLATE_TOKENS = {
    base: ['title', 'url', 'content', 'timestamp', 'tag'],
    extraTime: ['date', 'time', 'datesort', 'timesort', 'year4', 'month0', 'day0', 'hour24', 'minute', 'dow3', 'gmtoffset']
  };
  TEMPLATE_TOKENS.all = [...TEMPLATE_TOKENS.base, ...TEMPLATE_TOKENS.extraTime];

  const TEMPLATE_PLACEHOLDER_TAGS = {
    base: TEMPLATE_TOKENS.base.map(token => `{${token}}`),
    extraTime: TEMPLATE_TOKENS.extraTime.map(token => `{${token}}`)
  };
  TEMPLATE_PLACEHOLDER_TAGS.all = [...TEMPLATE_PLACEHOLDER_TAGS.base, ...TEMPLATE_PLACEHOLDER_TAGS.extraTime];

  const TEMPLATE_TOKEN_RE = new RegExp(`\\{(${TEMPLATE_TOKENS.all.join('|')})\\}`, 'g');

  const BASE_SELECTORS = [
    '[itemprop="articleBody"]',
    'section[name="articleBody"]',
    '.Page-storyBody .RichTextStoryBody',
    '.Page-storyBody',
    '#article-body',
    '#storytext',
    '.storytext',
    '[data-testid="ArticlePageChunks"]',
    'main .col-1-13',
    '.gated-content',
    '.text-copy',
    '[class*="PostContent_articleBody"]',
    '.entry-content__content',
    '.wysiwyg-content',
    '.article-main',
    '.meteredContent',
    '[class*="meteredContent"]',
    '[data-testid="article-body"]',
    '[data-testid="story-body"]',
    '[data-testid="storyBody"]',
    '[data-testid="articleBody"]',
    '[data-testid="article-body-text"]',
    '[data-articlebody="1"]',
    '[data-component="articleBody"]',
    '[data-component="ArticleBody"]',
    '[data-component="story-body"]',
    '.duet--article--article-body',
    '[data-test="access-teaser"]',
    '.article__teaser',
    '.c-article-body',
    '#postBody',
    '.article-body',
    '.article-content',
    '.article__content',
    '.article__body',
    '.article__body-content',
    '.articleBody',
    '.article-body__content',
    '.Article__content',
    '.ArticleBody',
    '.post__grid-2',
    '.post__content',
    '[class*="article__body"]',
    '.ArticleContent',
    '.js-article-content',
    'article[role="main"]',
    'article#story',
    'article',
    '.entry-content',
    '.post-content',
    '.wp-block-post-content',
    '.post-body',
    '.entry-body',
    '.postArticle-content',
    '.markup',
    '.node .content',
    '.content-body',
    '.story-body',
    '.story__body',
    '.story-content',
    '.storytext',
    '.storyText',
    '.StoryBody',
    '.StoryBodyCompanionColumn',
    '.main-content',
    '.kg-post',
    '.body__container',
    '.c-entry-content',
    '.content__article-body',
    '#article',
    '#js-article-text',
    '.itemFullText',
    '.article__content-body',
    '.blog-post__content',
    '.post-content__body',
    '.article-content-container',
    '.article-entry',
    '.article-main',
    '.read__content',
    '.caas-body',
    '.RichTextStoryBody',
    '.article-body-commercial-selector',
    '[itemtype*="NewsArticle"]',
    '[itemtype*="Article"]',
    '[itemtype*="BlogPosting"]',
    'main[role="main"]',
    'article',
    '[role="main"]',
    'main',
    '.article',
    '.content',
    '.prose',
    '.post',
    '.entry'
  ];

  const BASE_FILTERS = [
    'img',
    'picture',
    'figure',
    'figcaption',
    'video',
    'audio',
    '[data-testid="audio-player"]',
    '[data-testid*="audio"]',
    '[data-testid*="Audio"]',
    '[aria-label*="Listen"]',
    '[class*="audio-player"]',
    '[class*="audioPlayer"]',
    '[class*="AudioPlayer"]',
    '[class*="ArticleAudio"]',
    '#ap-comments',
    '.viafoura',
    '.vf3-comments',
    '#vf-conversations',
    '[data-test="vf-conversations-root-element"]',
    'source',
    'iframe',
    'embed',
    'object',
    'canvas',
    'svg',
    'button',
    'script',
    'noscript',
    'form',
    '.image',
    '.img',
    '.photo',
    '.picture',
    '.gallery',
    '.slideshow',
    '.carousel',
    '.lightbox',
    '.media',
    '.caption',
    '.image-caption',
    '.photo-caption',
    '.media-caption',
    '.image-credit',
    '.photo-credit',
    '.media-credit',
    '.image-container',
    '.photo-container',
    '.media-container',
    'nav',
    'header',
    'footer',
    'aside',
    '.nav',
    '.navigation',
    '.header',
    '.footer',
    '.sidebar',
    '.breadcrumb',
    '.pagination',
    '.site-header',
    '.site-footer',
    '.global-header',
    '.global-footer',
    '[role="navigation"]',
    '[role="banner"]',
    '[role="complementary"]',
    '[role="contentinfo"]',
    '[role="dialog"]',
    'dialog',
    '[aria-modal="true"]',
    '[hidden]',
    '[style*="display:none"]',
    '.nav-menu',
    '.nav-list',
    '.nav-items',
    '.nav-links',
    '[class*="navigation"]',
    '[class*="sticky-nav"]',
    '[class*="page-header"]',
    '[class*="header-pattern"]',
    'h1.entry-title',
    'h1.post-title',
    'h1.article-title',
    'h1.page-title',
    '.entry-title',
    '.post-title',
    '.article-title',
    '.page-title',
    '.headline',
    '.title',
    '.story-headline',
    '.article-headline',
    'h1.headline',
    'h1.title',
    'h1.story-headline',
    'h1.article-headline',
    '.post-header h1',
    '.article-header h1',
    '.entry-header h1',
    '.content-header h1',
    '.story-header h1',
    '.page-header h1',
    'header h1',
    '.header h1',
    '.masthead h1',
    '[class*="title"] h1',
    '[class*="headline"] h1',
    'h1[class*="title"]',
    'h1[class*="headline"]',
    '.wp-block-post-title',
    '.single-title',
    '.post-title-wrapper h1',
    '.ad',
    '.ads',
    '.advert',
    '.advertisement',
    '.advertising',
    '.adContainer',
    '.adcontainer',
    '.ad-slot',
    '.ad-unit',
    '.banner',
    '.sponsored',
    '.promo',
    '.promo-unit',
    '.promo-block',
    '.promo-card',
    '.google-ad',
    '.outbrain',
    '.taboola',
    '[class^="ad-"]',
    '[class*=" ad-"]',
    '[id^="ad-"]',
    '[id*="-ad-"]',
    '[class$="-ad"]',
    '[class*="-ad "]',
    '[class^="_ad"]',
    '[class*=" _ad"]',
    '[id^="_ad"]',
    '[class*="adslot"]',
    '[id*="adslot"]',
    '[class*="ad-slot"]',
    '[id*="ad-slot"]',
    '[class*="advert"]',
    '[id*="advert"]',
    '[data-ad]',
    '[data-ad-id]',
    '[data-ad-unit]',
    '[data-ad-slot]',
    '[data-testid*="advert"]',
    '[class*="dfp"]',
    '[id*="dfp"]',
    '[href^="#after-dfp"]',
    '[href*="#after-dfp"]',
    '[id^="story-ad-"]',
    '[class*="promo"]',
    '[id*="-promo"]',
    '[id*="promo-"]',
    '[aria-label*="advertisement"]',
    '[aria-label*="Advertisement"]',
    '[data-testid="advertisement"]',
    '[data-testid="ad"]',
    '[data-testid="sponsored"]',
    '[data-testid="partner-content"]',
    '[data-testid="supported-by"]',
    '[data-testid="skip-advertisement"]',
    '[data-testid="skip-ad"]',
    '[data-testid*="skip"]',
    '[data-component*="promo"]',
    '[data-testid="inline-message"]',
    '[class*="inline-message"]',
    '#sponsor-wrapper',
    '#sponsor-slug',
    '.sponsor-wrapper',
    '.supported-by',
    '.skip-ad',
    '[class*="skip"]',
    '[id*="skip"]',
    '.social',
    '.share',
    '.sharing',
    '.social-buttons',
    '.facebook',
    '.twitter',
    '.linkedin',
    '.share-tools',
    '.social-share',
    '.article-tools',
    '.breadcrumbs',
    '[class*="share"]',
    '[class*="social"]',
    '[class*="share-tool"]',
    '[data-testid="share-tools"]',
    '[data-testid="social-share"]',
    '[data-testid="article-tools"]',
    '[data-testid*="share"]',
    '[aria-label*="Share"]',
    '[aria-label*="share"]',
    '[data-component*="share"]',
    '[data-component*="Share"]',
    'ps-actionbar',
    '[data-element*="share"]',
    '[data-component="headline-block"]',
    '[data-component="byline-block"]',
    '[data-component="tag-list-block"]',
    '.article__share-sidebar',
    '.action-bar',
    '[class*="action-bar"]',
    '[data-uri*="/action-bar/"]',
    '.follow-topics-bar',
    '[class*="follow-topics"]',
    '[data-uri*="/follow-topics-bar/"]',
    '.comments',
    '.comment',
    '.comment-thread',
    '.disqus',
    '.comment-form',
    '.comment-section',
    '[id*="comments"]',
    '[data-testid="comments"]',
    '[data-testid*="comments"]',
    '.related',
    '.recommended',
    '.more-stories',
    '.trending',
    '.popular',
    '.suggestions',
    '.related-topics',
    '.related-links',
    '.related-content',
    '.related-articles',
    '.related-stories',
    '.wp-embedded-content',
    '[id*="related"]',
    '[class*="related"]',
    '[id*="-recirc"]',
    '[class*="recirc"]',
    '[href*="module=RelatedLinks"]',
    '[href*="module=inlineRecirc"]',
    '[data-testid="related-topics"]',
    '[data-testid="related-links"]',
    '[data-testid="related-content"]',
    '[data-testid="related-articles"]',
    '[data-testid="related-stories"]',
    '[data-testid="related-coverage"]',
    '[data-testid="RelatedReading"]',
    '[data-testid="recirculation-placeholder"]',
    '[data-testid*="related"]',
    '[data-testid*="recirc"]',
    '[data-testid*="recirculation"]',
    '[id*="recirculation"]',
    '[data-component="related"]',
    '[data-component="related-stories"]',
    '[data-component*="recirc"]',
    '.duet--article--related-list',
    '.c-article-related-articles',
    '#related-articles',
    '[class*="ArticleRelatedContentModule"]',
    '[class*="ArticleMagazinePromo"]',
    '[class*="ArticleAboutAuthor"]',
    '[class*="ArticleTopics"]',
    '.post__category',
    '.next-post',
    '.ReadMore',
    '.ReadMoreWithImage',
    '.inline-related',
    '.inline-newsletter',
    '.newsletter',
    '.subscription',
    '.subscribe',
    '.signup',
    '.email-signup',
    '.newsletter-signup',
    '[id*="newsletter"]',
    '[class*="newsletter"]',
    '[data-testid="newsletter"]',
    '[data-testid="subscription"]',
    '[data-testid="subscribe"]',
    '[data-testid="sign-up"]',
    '[data-testid*="signup"]',
    '[data-testid*="sign-up"]',
    '[data-testid*="subscribe"]',
    '[data-testid*="newsletter"]',
    '[data-component*="newsletter"]',
    '[data-component*="Newsletter"]',
    '[data-component*="subscription"]',
    '.duet--article--follow-box',
    '.app-access-wall',
    '[data-test="access-wall"]',
    '.ai-summary-questions',
    '.ai-summary-questions__header',
    '.ai-disclaimer',
    '[aria-label="AI Generated content disclaimer"]',
    '.nature-briefing',
    '[data-component-id="nature-briefing-box"]',
    '[data-component-id="nature-briefing-banner"]',
    '.c-site-messages--nature-briefing',
    '.NewsletterPromotion',
    '.SidebarNewsletter',
    '.SidebarNewsletterWrapper',
    '[data-js-sidebar-newsletter-sign-up]',
    '[class*="columnSignup"]',
    '[class*="subscriptionPlea"]',
    '.modal',
    '.popup',
    '.overlay',
    '#fullBleedHeaderContent',
    '[data-testid="imageblock-wrapper"]',
    '[data-testid^="photoviewer-children"]',
    '#bottom-sheet-sensor',
    '#bottom-wrapper',
    '#commentsContainer',
    '.cta',
    '.cookie-notice',
    '.cookie-banner',
    '.author-bio',
    '.byline',
    '.author-info',
    '.article-meta',
    '.article-info',
    '.timestamp',
    '.content__body--footer',
    '.dateline',
    '.tags',
    '.categories',
    '.article__tags',
    '.article__topics',
    '.c-article-subjects',
    '#subjects',
    '.ArticleTopics',
    '[data-component-name="article-topics"]',
    '.meta',
    '.secondary',
    '.sidebar-widget',
    '.wp-caption',
    '.wp-gallery',
    '.sharedaddy',
    '.paywall-banner',
    '[id*="paywall"]',
    '[class*="paywall-banner"]',
    '[class*="paywall-modal"]',
    '[class*="paywall-prompt"]',
    '.premium-message',
    '.visually-hidden',
    '.sr-only',
    '.screen-reader-text',
    '[data-testid="byline"]',
    '[data-testid="author-info"]',
    '[data-testid="article-meta"]',
    '[data-testid="article-info"]',
    '[data-testid="dateline"]',
    '[data-testid*="byline"]',
    '[data-testid*="author"]',
    '[data-testid*="dateline"]',
    '.duet--article--article-tag-list',
    'aside.duet--sidebar--most-popular',
    '.post__title',
    '.post__title__wrapper',
    '.post__title__actions',
    '.post__title__meta',
    '.post__footer',
    '.post__sidebar',
    '.comments-button',
    '#comment-section',
    '.top-comment',
    '.header__bookmarks',
    '.download-button',
    '.putz',
    '[class*="google_cta"]',
    '[class*="article_date_and_read_time"]',
    '[class*="article_authors"]',
    '[class*="ukraineBusinessRoundup"]',
    '.section-header',
    '.PageListStandardB',
    '.PageList-header',
    '.PageList-header-title',
    '.Enhancement-item',
    '.more-on',
    '[id*="masthead"]',
    '.header-ad',
    '.footer-ad',
    '[class*="inline-interactive"]',
    'section[data-testid="inline-interactive"]',
    'div[data-test-id="RecommendedNewsletter"]',
    '.c-article-references__links',
    '.c-article-references__download',
    '#rights-link',
    '.c-article-latest-content__container',
    '.c-latest-content',
    '.js-jobs-career-wrapper',
    '.bottom-of-article',
    '[class*="bottom-of-article"]',
    '[class*="AuthorAndActions"]',
    '[class*="RelatedPodcasts"]',
    '[class*="ArticleContentCorrectionBanner"]',
    '.article__info-fc',
    '.article-main__more',
    '.d-none.d-print-block',
    '.related-posts',
    '.latest-posts',
    '.post-tags',
    '.post-tags-separator',
    '.post-actions',
    '.url-card',
    '.story--contributors',
    '.border-t-1.border-purple-100',
    '.marketing-blog-subscribe',
    '.wide-story-card',
    '.css-g92qtk',
    '[class*="g92qtk"]',
    '[class*="18crmh6"]',
    '.css-18crmh6',
    '[class*="kyszhr"]'
  ];

  const BASE_TEXT_CLEANUP_RULES = [
    String.raw`# One rule per line. Supported prefixes: line:, block:, tail:, replace:`,
    String.raw`replace:/^\s*\*\s*Reviews\s*\n\*\s*Tablets\s*\n+/i =>`,
    String.raw`replace:/^\s*[A-Z][A-Z .'-]{2,80}\s*\n+(?:[A-Z][A-Z &/'-]{2,80}\s*\n+)?(?=#{1,6}\s)/ =>`,
    String.raw`replace:/^\s*[A-Z][A-Za-z .'-]{2,80}\s*\n+\s*(?:USA TODAY|Associated Press|AP|Reuters)\s*\n+\s*(?:Updated|Published)[^\n]+\n+/i =>`,
    String.raw`replace:/^\s*#{1,6}\s+[^\n]{3,220}\n+/ =>`,
    String.raw`line:/.*click here to subscribe.*$/i`,
    String.raw`line:/.*sign up for our newsletter.*$/i`,
    String.raw`line:/.*sign up for .*global update.*$/i`,
    String.raw`line:/.*download our app.*$/i`,
    String.raw`line:/^\s*stay updated with the latest [^\n]+$/i`,
    String.raw`line:/.*get breaking news alerts.*$/i`,
    String.raw`line:/.*follow us on (twitter|facebook|instagram).*$/i`,
    String.raw`line:/^\s*.*\(Getty Images\).*$/`,
    String.raw`line:/^\s*.*\(AP Photo.*\).*$/`,
    String.raw`line:/^\s*.*Photo credit:.*$/`,
    String.raw`line:/^\s*.*Image credit:.*$/`,
    String.raw`line:/^\s*.*\bCredit(?:\.\.\.|:).*$/i`,
    String.raw`line:/^\s*listing image:\s*.*$/i`,
    String.raw`line:/^\s*.*\(Corbis\).*$/`,
    String.raw`line:/^\s*subscribe today\s*$/i`,
    String.raw`line:/^\s*subscribe to the times to read as many articles as you like\.?\s*$/i`,
    String.raw`line:/^\s*join our newsletter\s*$/i`,
    String.raw`line:/^\s*\d{4}-\d{2}-\d{2}T[^\n]+\s*$/`,
    String.raw`line:/^\s*ai-generated summary\s*$/i`,
    String.raw`line:/^\s*edited by\s+[A-Z][^\n]{1,120}\s*$/`,
    String.raw`line:/^\s*we(?:'|\u2019)re unable to load that answer right now\. please try again\.?\s*$/i`,
    String.raw`replace:/^\s*LOADINGERROR LOADING\s*/i =>`,
    String.raw`replace:/^\s*https?:\/\/p\.dw\.com\/p\/\S+\s*/i =>`,
    String.raw`replace:/^\s*close\s+NEWYou can now listen to Fox News articles!\s*/i =>`,
    String.raw`replace:/^\s*to display this content from youtube, you must enable advertisement tracking and audience measurement\.\s*\n+\s*one of your browser extensions seems to be blocking the video player from loading\.[^\n]*\n+/im =>`,
    String.raw`replace:/^\s*(?:volume\s+\d+%\s*\n+)?press shift question mark to access a list of keyboard shortcuts\s*\n+keyboard shortcuts\s*\n+play\/pauseSPACE[\s\S]{0,1800}?(?:\n+\d{1,2}:\d{2}\s*){2,4}\n+/i =>`,
    String.raw`replace:/\n+(?:volume\s+\d+%\s*\n+)?press shift question mark to access a list of keyboard shortcuts\s*\n+keyboard shortcuts\s*\n+play\/pauseSPACE[\s\S]{0,1800}?(?:\n+\d{1,2}:\d{2}\s*){2,4}\n+/i => \n\n`,
    String.raw`replace:/\n+want more from the dispatch\?\s*\n+read our morning newsletter and start your day informed\. sign up free\.\s*\n+visit our website\s*\n+#{1,6}\s*submit a guest post to ripple\s*\n+want to contribute to ripple\? share your idea with us here and we(?:'|\u2019)ll provide guidance and feedback\. successful pieces may be featured on the site\.\s*/i => \n\n`,
    String.raw`line:/^\s*by[\s\u00a0]+[A-Z][^\n]{1,120}\b(?:Jan\.?|January|Feb\.?|February|Mar\.?|March|Apr\.?|April|May|Jun\.?|June|Jul\.?|July|Aug\.?|August|Sept\.?|September|Oct\.?|October|Nov\.?|November|Dec\.?|December)\s+\d{1,2},\s+\d{4}[^\n]*$/i`,
    String.raw`line:/^\s*rating\s*:\s*[0-9.]+\s*\/\s*[0-9.]+\s*$/i`,
    String.raw`line:/^\s*[A-Z][A-Za-z .'-]{1,80}\s+for Engadget\s*$/`,
    String.raw`line:/^\s*story text\s*$/i`,
    String.raw`line:/^\s*size\s+small\s+standard\s+large\s+width\s+\\?\*?\s*standard\s+wide\s+links\s+standard\s+orange\s*$/i`,
    String.raw`replace:/^\s*\\?\*?\s*subscribers only\s*\n+\s*learn more\s*$/im =>`,
    String.raw`line:/^\s*advertisement\s*$/i`,
    String.raw`line:/^\s*skip advertisement\s*$/i`,
    String.raw`line:/^\s*supported by\s*$/i`,
    String.raw`line:/^\s*sponsored content\s*$/i`,
    String.raw`line:/^\s*\*?\s*click here to listen to this article\s*$/i`,
    String.raw`line:/^\s*\*?\s*share via\s*$/i`,
    String.raw`replace:/^\s*share this article\s*\n+\s*\d+\s*\n+\s*join the conversation\s*\n+\s*follow us\s*\n+\s*add us as a preferred source on google\s*\n+/i =>`,
    String.raw`line:/^\s*listen\s*1\.0x\s*$/i`,
    String.raw`line:/^\s*seek\s*$/i`,
    String.raw`line:/^\s*0:00\d{1,2}:\d{2}\s*$/i`,
    String.raw`line:/^\s*article continues below\s*$/i`,
    String.raw`line:/^\s*listen\s*(?:\u00B7|&middot;|\||-)?\s*\d{1,2}:\d{2}\s*min(?:ute)?s?\.?\s*$/i`,
    String.raw`line:/^\s*advertising\s*$/i`,
    String.raw`line:/^\s*#{0,6}\s*related content\s*$/i`,
    String.raw`line:/^\s*continue reading the main story\s*$/i`,
    String.raw`tail:/\n+\s*[^\n.!?]{3,160}\n+\s*see all topics\s*(?:\n+\s*\d{1,4})?\s*$/i`,
    String.raw`tail:/\n+\s*see more:?\s*(?:\n+\s*(?:[-*]\s+)?[^\n]{2,80}\s*){1,20}$/i`,
    String.raw`replace:/\n+#{1,6}\s*explore the [^\n]{1,120} issue\s+[\s\S]{0,350}?view more\s*/i => \n`,
    String.raw`tail:/\n+#{1,6}\s*explore more\s*[\s\S]*$/i`,
    String.raw`tail:/\n+explore more on these topics\s*[\s\S]*$/i`,
    String.raw`tail:/\n+#{1,6}\s*more to read\s*$/i`,
    String.raw`replace:/\n+---\s*\n+##\s+on supporting science journalism\s*\n+[\s\S]{0,700}?shaping our world today\.?\s*\n+---/i =>`,
    String.raw`line:/^\s*_?this article is from_?\s+proof positive_?,.*newsletter.*$/i`,
    String.raw`line:/^\s*_?sign up for the slatest\b.*daily\._?\s*$/i`,
    String.raw`replace:/\n+get a first look\s*\n+#{1,6}\s*sign up to receive news and updates from the looker[\s\S]{0,400}?privacy policy\.\s*/i => \n`,
    String.raw`tail:/\n+#{1,6}\s*unlock a year of full access to the looker and the daily beast[\s\S]*$/i`,
    String.raw`tail:/\n+#{1,6}\s*register below to read this article for _?free_? or subscribe to unlock unlimited access[\s\S]*$/i`,
    String.raw`tail:/\n+got a tip\? send it to the daily beast\.[\s\S]*$/i`,
    String.raw`tail:/\n+#{1,6}\s*looks like you already have a subscription![\s\S]*$/i`,
    String.raw`tail:/\n+thanks for subscribing\.[\s\S]*$/i`,
    String.raw`replace:/\n+\**_?start your day with essential news from salon\.\s*\n\s*sign up for our free morning newsletter, crash course\._?\**\s*/i => \n`,
    String.raw`line:/^\s*\**_?start the day with a summary of [^\n]{1,220}?sign up for our [^\n]{1,120}?newsletter\.?_?\**\s*$/i`,
    String.raw`tail:/\n+read more\s*\n+about [^\n]+[\s\S]*$/i`,
    String.raw`tail:/\n+#{1,6}\s+[^\n]{3,180}\n+(?:(?!#{1,6}\s)[^\n]{0,300}\n+){0,3}Read more(?:\n+#{1,6}\s+[^\n]{3,180}\n+(?:(?!#{1,6}\s)[^\n]{0,300}\n+){0,3}Read more){1,8}\s*$/i`,
    String.raw`tail:/\n+#{1,6}\s*read also\b[\s\S]{0,2500}$/i`,
    String.raw`tail:/\n+#{1,6}\s*related topics\b[\s\S]*$/i`,
    String.raw`tail:/\n+#{1,6}\s*Latest on:[\s\S]*$/i`,
    String.raw`tail:/\n+#{1,6}\s*Subjects\b[\s\S]*$/i`,
    String.raw`tail:/\n+#{1,6}\s*Jobs\b[\s\S]*$/i`,
    String.raw`tail:/\n+#{1,6}\s*Enjoying our latest content\?\s*[\s\S]*$/i`,
    String.raw`tail:/\n+_?doi:\s*https?:\/\/doi\.org\/\S+\s*[\s\S]*$/i`,
    String.raw`tail:/\n+#{1,6}\s*tags:?\s*(?:\n+\*\s*[^\n]{1,120}){0,40}\s*(?:\n+#{1,6}\s*written by[\s\S]*)?$/i`,
    String.raw`tail:/\n+#{1,6}\s*written by\s*$/i`,
    String.raw`tail:/\n+#{1,6}\s*about the author\b[\s\S]*$/i`,
    String.raw`tail:/\n+explore more topics\b[\s\S]*$/i`,
    String.raw`tail:/\n+created in collaboration between kyiv independent and kpmg ukraine gateway[\s\S]*$/i`,
    String.raw`replace:/(_?Editor's note: The following is [^\n]{1,220}?weekly newsletter\.)\s+To get [^\n]{1,220}?in your inbox, subscribe [^\n.]+(\._?)/gim => $1$2`,
    String.raw`tail:/\n+#{1,6}\s*are you a family member, doctor, nurse or midwife\?[\s\S]*$/i`,
    String.raw`tail:/\n+_?\**the dispatch is a new digital media company[\s\S]{0,500}?try us today[\s\S]{0,40}$/i`,
    String.raw`tail:/\n+_?\\?--_?\s+_?if you liked this story,[\s\S]{0,800}?instagram__?\._?\s*$/i`,
    String.raw`tail:/\n+become a vox member to continue reading\.?\s*$/i`,
    String.raw`tail:/\n+about the author\s+[A-Z][\s\S]{0,800}$/i`,
    String.raw`tail:/\n+significant revisions\s*\n+_?\d{1,2}\s+[A-Z][^\n]{1,120}:\s*published_?\s*$/i`,
    String.raw`tail:/\n+#{1,6}\s*top stories\b[\s\S]*$/i`,
    String.raw`tail:/\n+also on bluesky(?:\n+[^\n]{1,120}){0,4}\s*$/i`,
    String.raw`tail:/\n+#{1,6}\s*author\s*\n+(?:#{1,6}\s*)?@?[^\n]{1,140}(?:\n+[^\n]{1,260}){0,4}\s*$/i`,
    String.raw`line:/^\s*read more about:\s*[^\n]+$/i`,
    String.raw`line:/^\s*compare your (?:top|best) [^\n]{1,120} online here\.?\s*$/i`,
    String.raw`line:/^\s*what new features do you want to see [^\n]{1,160}let us know in the comments\.?\s*$/i`,
    String.raw`tail:/\n+#{1,6}\s*best [^\n]{1,80} accessories\s*[\s\S]*$/i`,
    String.raw`tail:/\n+\**my favorite [^\n]{1,80} accessories:\**[\s\S]*$/i`,
    String.raw`tail:/\n+more from [A-Z][^\n]{2,80}\s*[\s\S]*$/i`,
    String.raw`tail:/\n+Related Roundups?:[^\n]+(?:\n+Related Forums?:[^\n]+)?(?:\n+\[\s*\d+\s+comments?\s*\])?\s*$/i`,
    String.raw`tail:/\n+_?\**follow techradar on google news\**_[\s\S]{0,500}?_?\**whatsapp\**_?\s*too\.?\s*$/i`,
    String.raw`tail:/\n+_?\**follow techradar on google news[\s\S]*$/i`,
    String.raw`replace:/\n+\**follow topics and authors\** from this story to see more[\s\S]{0,260}?email updates\.?\s*(?:\n+\*\s*[^\n]+)?/i => \n`,
    String.raw`tail:/\n+loading comments\s*\n+getting the conversation ready\.\.\.\s*$/i`,
    String.raw`tail:/\n+advertiser content from\s*\n+this is the title for the native ad\s*$/i`,
    String.raw`tail:/\n+\*\s*_?go deeper\.?_?\s*$/i`,
    String.raw`replace:/\n+part of\s*\n+[\s\S]{0,220}?see all (?:updates|stories)\s*\n+/i => \n`,
    String.raw`tail:/\n+#{1,6}\s*this post is for paid members only[\s\S]*$/i`,
    String.raw`tail:/\n+#{1,6}\s*more on this topic[\s\S]*$/i`,
    String.raw`tail:/\n+related keywords\s*[\s\S]*$/i`,
    String.raw`tail:/\n+#{1,6}\s*related podcasts\s*[\s\S]*$/i`,
    String.raw`tail:/\n+request reprint & licensing\s*[\s\S]*$/i`,
    String.raw`tail:/\n+provided by [^\n]+\s*\n+\*\*citation\*\*:[\s\S]*$/i`,
    String.raw`line:/^\s*provided by [^\n]+\s*$/i`,
    String.raw`tail:/\n+\*\*citation\*\*:[\s\S]*$/i`,
    String.raw`tail:/\n+this document is subject to copyright\.[\s\S]*$/i`,
    String.raw`line:/^\s*featured weekly ad\s*$/i`,
    String.raw`line:/^\s*_?contact\b[^\n]*@[^\n]*_?\s*$/i`,
    String.raw`line:/^\s*sign up now:\s*[^\n]+$/i`,
    String.raw`line:/^\s*\**sign up for wix\**\s+\**and test drive its ai website maker for free today\.\**\s*$/i`,
    String.raw`line:/^\s*\**_?want more [^\n]{1,180}?sign up for [^\n]{1,180}?newsletter[^\n]*_?\**\s*$/i`,
    String.raw`replace:/^\s*posted\s+[A-Z][a-z]{2}\s+\d{1,2}\s+@\s+\d{1,2}:\d{2}\s+[AP]M\s+by\s+[^\n]{1,120}(?:\s*\u00b7\s*gift link)?\s*/i =>`,
    String.raw`line:/^\s*posted [^\n]{1,160}·\s*follow me on [^\n]{1,160}?subscribe to my newsletter\s*$/i`,
    String.raw`line:/^\s*[A-Z][^\n]{2,120}\s+was a reporter at Ars Technica[^\n]*$/`,
    String.raw`line:/^\s*[A-Z][A-Za-z .'-]{2,80}\s+Senior [^\n]{2,80}Reporter\s*$/`,
    String.raw`line:/^\s*\d{1,5}\s+comments?\s*$/i`,
    String.raw`tail:/\n+\s*topics:\s*(?:\n+\s*(?:[-*]\s*)?[^\n]{1,80}\/?\s*){1,20}\s*$/i`,
    String.raw`line:/^\s*loading\.\.\.\s*$/i`,
    String.raw`line:/^\s*loading\s*$/i`,
    String.raw`line:/^\s*share\s*$/i`,
    String.raw`tail:/\n+Share\s+\u2014[\s\S]*$/i`,
    String.raw`line:/^\s*share to (?:facebook|x)\s*$/i`,
    String.raw`tail:/\n+#{1,6}\s*Comments\s+\d+[\s\S]*$/i`,
    String.raw`line:/^\s*subscribe\s*$/i`,
    String.raw`line:/^\s*print in a simple, ad-free format\s*$/i`,
    String.raw`line:/^\s*ad-free and in a comfortable reading format\s*$/i`,
    String.raw`line:/^\s*#{0,6}\s*(?:article printing|zen reading) is available to subscribers only\s*$/i`,
    String.raw`tail:/\n+#{1,6}\s*click the alert icon to follow topics:[\s\S]*$/i`,
    String.raw`line:/^\s*---+\s*$/`,
    String.raw`line:/^\s*see all topics\s*$/i`,
    String.raw`line:/^\s*(?:facebook|tweet|email|link|threads|link copied!|follow)\s*$/i`,
    String.raw`line:/^\s*by\s+[A-Z][^\n]{1,120}\s*$/`,
    String.raw`line:/^\s*reporting from\s+[^\n]{1,160}\s*$/i`,
    String.raw`line:/^\s*\*?\s*(?:Jan\.?|January|Feb\.?|February|Mar\.?|March|Apr\.?|April|May|Jun\.?|June|Jul\.?|July|Aug\.?|August|Sept\.?|September|Oct\.?|October|Nov\.?|November|Dec\.?|December)\s+\d{1,2},\s+\d{4}\s*\*?\s*$/`,
    String.raw`line:/^\s*\**\s*want to stay updated\b.*$/i`,
    String.raw`line:/^.*we(?:'|\u2019)ll send our latest coverage to your inbox\.?$/i`
  ];

  const unique = arr => Array.from(new Set(arr.map(s => (typeof s === 'string' ? s.trim() : s)).filter(Boolean)));
  const DEFAULTS_REVISION = 6;

  const DEFAULT_SETTINGS = {
    defaultsRevision: DEFAULTS_REVISION,
    saveDestination: 'drafts', // 'drafts' or 'share' - set dynamically on install based on Drafts availability
    contentExtraction: {
      strategy: 'default',
      customSelectors: unique(BASE_SELECTORS)
    },
    outputFormat: {
      template: '# {title}\n\n<{url}>\n\n---\n\n{content}',
      defaultTag: ''
    },
    draftsURL: {
      mode: 'create', // 'create' or 'runAction'
      actionName: ''
    },
    advancedFiltering: {
      customFilters: unique(BASE_FILTERS),
      textCleanupRules: unique(BASE_TEXT_CLEANUP_RULES),
      minContentLength: 150,
      maxLinkRatio: 0.3
    }
  };

  function getDefaultSettings() {
    return JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
  }

  function editableListLooksDefaultDerived(savedList, defaultList) {
    if (!Array.isArray(savedList) || savedList.length === 0) {
      return false;
    }

    const saved = unique(savedList);
    if (saved.length < 6) {
      return false;
    }

    const defaultSet = new Set(defaultList);
    const overlap = saved.reduce((count, item) => count + (defaultSet.has(item) ? 1 : 0), 0);
    return overlap >= 5 && overlap / saved.length >= 0.35;
  }

  function migrateEditableDefaultList(savedList, defaultList, savedRevision) {
    if (!Array.isArray(savedList)) {
      return defaultList;
    }

    if (savedList.length === 0) {
      return [];
    }

    if (savedRevision < DEFAULTS_REVISION && editableListLooksDefaultDerived(savedList, defaultList)) {
      return unique([...defaultList, ...savedList]);
    }

    return savedList;
  }

  /**
   * Normalize settings by merging with defaults.
   * Shared by background.js and settings.js.
   * @param {Object} inputSettings - Settings object to migrate
   * @returns {Object} Migrated settings
   */
  function migrateSettings(inputSettings) {
    const defaults = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
    const settings = JSON.parse(JSON.stringify(inputSettings || {}));
    const savedRevision = Number.isFinite(Number(settings.defaultsRevision))
      ? Number(settings.defaultsRevision)
      : 0;

    // Ensure all top-level structures exist by merging with defaults
    settings.contentExtraction = settings.contentExtraction || {};
    settings.outputFormat = settings.outputFormat || {};
    settings.draftsURL = settings.draftsURL || {};
    settings.advancedFiltering = settings.advancedFiltering || {};

    // Merge contentExtraction with defaults. Default-like saved lists are upgraded
    // so users get improved selector priority without a manual reset.
    settings.contentExtraction.customSelectors = migrateEditableDefaultList(
      settings.contentExtraction.customSelectors,
      defaults.contentExtraction.customSelectors,
      savedRevision
    );

    // Merge advancedFiltering with defaults
    settings.advancedFiltering.customFilters = migrateEditableDefaultList(
      settings.advancedFiltering.customFilters,
      defaults.advancedFiltering.customFilters,
      savedRevision
    );
    settings.advancedFiltering.textCleanupRules = migrateEditableDefaultList(
      settings.advancedFiltering.textCleanupRules,
      defaults.advancedFiltering.textCleanupRules,
      savedRevision
    );
    settings.advancedFiltering.minContentLength = settings.advancedFiltering.minContentLength ?? defaults.advancedFiltering.minContentLength;
    settings.advancedFiltering.maxLinkRatio = settings.advancedFiltering.maxLinkRatio ?? defaults.advancedFiltering.maxLinkRatio;

    // Ensure template exists
    if (!settings.outputFormat.template) {
      settings.outputFormat.template = defaults.outputFormat.template;
    }

    // Ensure defaultTag exists (can be empty string)
    if (settings.outputFormat.defaultTag === undefined) {
      settings.outputFormat.defaultTag = defaults.outputFormat.defaultTag;
    }

    // Ensure drafts URL mode and action name exist.
    if (!['create', 'runAction'].includes(settings.draftsURL.mode)) {
      settings.draftsURL.mode = defaults.draftsURL.mode;
    }
    if (typeof settings.draftsURL.actionName !== 'string') {
      settings.draftsURL.actionName = defaults.draftsURL.actionName;
    }
    settings.draftsURL.actionName = settings.draftsURL.actionName.trim();

    // Migrate removed legacy destination and normalize invalid values.
    if (settings.saveDestination === 'notes') {
      settings.saveDestination = 'share';
    }
    if (!['drafts', 'share'].includes(settings.saveDestination)) {
      settings.saveDestination = defaults.saveDestination;
    }

    settings.defaultsRevision = DEFAULTS_REVISION;

    return settings;
  }

  function getTimezoneOffsetCompact(date) {
    const offsetMinutes = -date.getTimezoneOffset();
    const sign = offsetMinutes >= 0 ? '+' : '-';
    const absolute = Math.abs(offsetMinutes);
    const hours = String(Math.floor(absolute / 60)).padStart(2, '0');
    const minutes = String(absolute % 60).padStart(2, '0');
    return `${sign}${hours}${minutes}`;
  }

  function buildTemplateTokenValues(title, url, content, outputFormat, now = new Date()) {
    const timestampISO = now.toISOString();
    const defaultTag = outputFormat.defaultTag || '';
    const year4 = String(now.getFullYear());
    const month0 = String(now.getMonth() + 1).padStart(2, '0');
    const day0 = String(now.getDate()).padStart(2, '0');
    const hour24 = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    const dow3 = now.toLocaleDateString('en-US', { weekday: 'short' });

    return {
      title: String(title ?? ''),
      url: String(url ?? ''),
      content: String(content ?? ''),
      timestamp: timestampISO,
      date: `${year4}-${month0}-${day0}`,
      time: `${hour24}:${minute}:${second}`,
      datesort: `${year4}${month0}${day0}`,
      timesort: `${hour24}${minute}${second}`,
      year4,
      month0,
      day0,
      hour24,
      minute,
      dow3,
      gmtoffset: getTimezoneOffsetCompact(now),
      tag: String(defaultTag)
    };
  }

  // Format draft content using unified template engine
  // Shared by background.js and settings.js (preview)
  function formatDraftContent(title, url, content, settings) {
    // If settings not provided (background.js context often relies on global extensionSettings),
    // fallback to provided defaults.
    // However, in background.js context, it's safer to pass settings explicitly.
    // If settings is null/undefined, use defaults.
    const outputFormat = settings?.outputFormat || DEFAULT_SETTINGS.outputFormat;

    const template = (outputFormat.template || '').trim() || DEFAULT_SETTINGS.outputFormat.template;
    const tokenValues = buildTemplateTokenValues(title, url, content, outputFormat);

    return template.replace(TEMPLATE_TOKEN_RE, (match, token) => {
      return tokenValues[token] ?? match;
    });
  }

  // Expose globally for background and settings pages
  root.NATIVE_APP_ID = NATIVE_APP_ID;
  root.DRAFTS_APP_STORE = DRAFTS_APP_STORE;
  root.TEMPLATE_PLACEHOLDER_TAGS = TEMPLATE_PLACEHOLDER_TAGS;
  root.DEFAULT_SETTINGS = DEFAULT_SETTINGS;
  root.getDefaultSettings = getDefaultSettings;
  root.migrateSettings = migrateSettings;
  root.formatDraftContent = formatDraftContent;
})();
