// Shared pilot-subset selection. Exactly 20 site slugs, spread across
// every category, chosen to exercise a wide variety of CMS/layout shapes.
// Keep this list stable — pilot outputs are committed as ground truth.
export const PILOT_SLUGS = [
  "nytimes_com",            // news-major, bespoke CMS, paywall teaser
  "theguardian_com",        // news-major, bespoke CMS
  "bbc_com",                // news-major, bespoke CMS + longform
  "arstechnica_com",        // tech-news, bespoke
  "theverge_com",           // tech-news, Chorus CMS
  "techcrunch_com",         // tech-news, WordPress VIP
  "wikipedia_org",          // reference, MediaWiki
  "developer_mozilla_org",  // docs, custom
  "docs_python_org",        // docs, Sphinx
  "github_com_readme",      // docs, GitHub-rendered markdown
  "paulgraham_com",         // blog, plain static HTML
  "simonwillison_net",      // blog, Django
  "daringfireball_net",     // blog, custom (link-list style)
  "stratechery_com",        // tech-news/newsletter, WordPress
  "news_ycombinator_com",   // forum, custom HN
  "stackoverflow_com",      // forum, Stack Exchange
  "reddit_com_old",         // forum, old Reddit
  "cooking_nytimes_com",    // recipe, JSON-LD heavy
  "openai_com_blog",        // corp-blog, custom
  "apple_com_newsroom",     // corp-blog, press release
];
