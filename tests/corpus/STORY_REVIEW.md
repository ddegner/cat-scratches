# Story Extraction Review

Generated: 2026-05-08.

## Summary

| metric | value |
|---|---:|
| article like pages | 236 |
| source pages | 236 |
| missing source pages | 0 |
| clean looking pages | 236 |
| needs review pages | 0 |
| quarantined pages | 14 |
| skipped paywall pages | 20 |
| skipped other pages | 18 |
| accepted short pages | 7 |
| duplicate source urls | 0 |
| source backed nonstory pages | 0 |
| thin pages | 0 |
| junk flagged pages | 0 |

## Focus Pages

| page | chars | flags | title |
|---|---:|---|---|
| cnn_com/article-1 | 4660 | clean | Judge releases purported Jeffrey Epstein suicide note \| CNN Politics |
| cnn_com/article-2 | 5978 | clean | Why Trump reasserting his domination of the GOP might not be good news for the party in 20 |
| nytimes_com/article-1 | 9238 | clean | How the Fight Over Israel Is Playing Out Inside MAGA - The New York Times |
| thehill_com/article-1 | 1819 | clean | Iranian official calls reported peace proposal ‘Americans’ wish list’ |
| thehill_com/article-2 | 2628 | clean | Chief Justice John Roberts says Supreme Court doesn't have 'purely political actors' |
| vox_com/article-1 | 7209 | clean | 5 ways the Strait of Hormuz standoff could end \| Vox |
| vox_com/article-2 | 2880 | clean | FBI investigates journalist over Kash Patel reporting: What to know \| Vox |
| nature_com/article-1 | 3011 | clean | First AI tool to detect suspicious peer reviews rolled out by academic publisher |
| nature_com/article-2 | 2388 | clean | Even the unconscious brain can learn — and predict what you’ll say next |

## Quarantined Non-Story Candidates

These are excluded from the story/article test set.

| page | category | reason | URL |
|---|---|---|---|
| wsj_com/article-1 | news-major | section/listing page metadata, not a story/article | https://www.wsj.com/tech/ai/openai-chatgpt-anthropic-2024-abcd1234 |
| bloomberg_com/article-1 | news-major | tool page, not a story/article | https://www.bloomberg.com/news/articles/2024-05-15/ai-boom-nvidia |
| techradar_com/article-2 | tech-news | buying guide/list page, not a story/article | https://www.techradar.com/reviews/example-product-2024 |
| science_org/article-1 | science | placeholder/landing metadata, not a fetched article | https://www.science.org/doi/10.1126/science.example |
| arxiv_org/article-2 | science | subject listing, not a paper page | https://arxiv.org/list/astro-ph.EP/recent |
| biorxiv_org/article-1 | science | recent articles listing, not a story/article | https://www.biorxiv.org/content/early/recent |
| medium_com/article-1 | blog | careers page, not a story/article | https://medium.com/jobs-at-medium/work-at-medium-959d1a85284e |
| medium_com/article-2 | blog | privacy policy, not a story/article | https://policy.medium.com/medium-privacy-policy-f03bf92035c9 |
| substack_com/article-1 | newsletter | policy page, not a newsletter issue/article | https://example.substack.com/p/example-post |
| ghost_org/article-2 | blog | business product page, not a story/article | https://ghost.org/business/ |
| posterous_style_site/article-1 | blog | parked/error page, not a story/article | https://example.typepad.com/blog/2024/05/example.html |
| squarespace_blog/article-1 | blog | solutions page, not a story/article | https://www.squarespace.com/solutions/nonprofits/environment-conservation |
| revue_archive/article-1 | newsletter | newsletter archive placeholder, not a fetched issue | https://www.getrevue.co/profile/example/issues/example-issue-12345 |
| revue_archive/article-2 | newsletter | newsletter archive placeholder, not a fetched issue | https://www.getrevue.co/profile/example/issues/example-two-67890 |

## Skipped Paywall Pages

These are story/article URLs, but they are excluded from active parser refinement because the saved page only exposes a paywall teaser or the site is known to block full text.

| page | category | detail | URL |
|---|---|---|---|
| nytimes_com/article-2 | news-major | NYTimes/Athletic-style page did not yield a usable source; skipping paywall-like slot | https://www.nytimes.com/interactive/2024/upshot/2024-election-polls-trump-harris.html |
| washingtonpost_com/article-2 | news-major | saved Washington Post page and alternatives expose teaser-length article text | https://www.washingtonpost.com/world/2026/05/06/israel-hezbollah-radwan-beirut-attack-haret-hreik/ |
| wsj_com/article-2 | news-major | Wall Street Journal page is a known paywall target and has no usable source | https://www.wsj.com/opinion/editorial-2024-xyz |
| ft_com/article-1 | news-major | Financial Times content page is a known paywall target and has no usable source | https://www.ft.com/content/abc-def-ghi-2024 |
| ft_com/article-2 | news-major | Financial Times content page is a known paywall target and has no usable source | https://www.ft.com/content/markets-2024-jkl |
| bloomberg_com/article-2 | news-major | Bloomberg opinion page is a known paywall target and has no usable source | https://www.bloomberg.com/opinion/articles/2024-06-01/fed-rates |
| economist_com/article-1 | news-major | Economist article is a known paywall target and has no usable source | https://www.economist.com/leaders/2024/11/07/the-trump-victory |
| economist_com/article-2 | news-major | Economist briefing is a known paywall target and has no usable source | https://www.economist.com/briefing/2024/05/23/ai-and-work |
| lemonde_fr/article-1 | news-intl | Le Monde article is a likely paywall/login target and has no usable source | https://www.lemonde.fr/politique/article/2024/11/06/example_12345_823448.html |
| lemonde_fr/article-2 | news-intl | Le Monde article is a likely paywall/login target and has no usable source | https://www.lemonde.fr/economie/article/2024/05/15/example_67890_3234524.html |
| spiegel_de/article-1 | news-intl | saved Spiegel+ page exposes only a subscription/access teaser, not the article body | https://www.spiegel.de/wirtschaft/service/immobilien-schnell-und-guenstig-lohnt-sich-ein-fertighaus-fuer-sie-a-b0953544-cd1b-4bf0-9bbc-b3121eea5e03 |
| scmp_com/article-1 | news-intl | SCMP article is a likely paywall target and has no usable source | https://www.scmp.com/news/china/politics/article/3123456/example |
| scmp_com/article-2 | news-intl | SCMP article is a likely paywall target and has no usable source | https://www.scmp.com/business/article/3654321/example |
| haaretz_com/article-1 | news-intl | saved Haaretz page contains only a paywall teaser paragraph | https://www.haaretz.com/middle-east-news/iran/2026-05-06/ty-article/iran-demands-fair-deal-with-u-s-as-trump-pauses-strait-of-hormuz-ship-escorts/0000019d-fbc6-ddfa-a5bf-ffdfee680000 |
| haaretz_com/article-2 | news-intl | saved Haaretz page contains only a paywall teaser paragraph | https://www.haaretz.com/israel-news/haaretz-today/2026-05-05/ty-article/.highlight/theres-only-one-way-to-challenge-jewish-supremacy-in-israel/0000019d-f866-d22e-a9ff-fafe76b80002 |
| theglobeandmail_com/article-1 | news-intl | Globe and Mail article is a likely paywall target and has no usable source | https://www.theglobeandmail.com/politics/article-example-2024/ |
| theglobeandmail_com/article-2 | news-intl | Globe and Mail article is a likely paywall target and has no usable source | https://www.theglobeandmail.com/business/article-example-two-2024/ |
| theinformation_com/article-1 | tech-news | The Information article is a known paywall target and has no usable source | https://www.theinformation.com/articles/example-tech-scoop-2024 |
| theinformation_com/article-2 | tech-news | The Information briefing is a known paywall target and has no usable source | https://www.theinformation.com/briefings/example-briefing-2024 |
| substack_com/article-2 | newsletter | Noahpinion front-page replacement candidate is marked paid; skipping paid Substack pages. | https://noahpinion.substack.com/p/example-noahpinion-post |

## Skipped Unavailable Pages

These are excluded from active parser refinement because the page could not be downloaded as a usable story/article source without relying on a paywall, challenge page, dead URL, or non-story shell.

| page | category | reason | detail | URL |
|---|---|---|---|---|
| reuters_com/article-1 | news-major | blocked | Reuters homepage/story requests return DataDome/CloudFront 401 challenge pages. | https://www.reuters.com/world/us/trump-inauguration-live-updates-2025-01-20/ |
| reuters_com/article-2 | news-major | blocked | Reuters homepage/story requests return DataDome/CloudFront 401 challenge pages. | https://www.reuters.com/technology/artificial-intelligence/openai-2024-12-05/ |
| politico_com/article-1 | news-major | blocked | Politico homepage/feed/story requests return Cloudflare challenge pages. | https://www.politico.com/news/2024/11/06/trump-wins-2024-00187234 |
| politico_com/article-2 | news-major | blocked | Politico homepage/feed/story requests return Cloudflare challenge pages. | https://www.politico.com/magazine/story/2024/05/15/example-longform |
| venturebeat_com/article-2 | tech-news | blocked | VentureBeat homepage/story requests return Vercel challenge pages in this environment. | https://venturebeat.com/enterprise/example-two-2024/ |
| fastcompany_com/article-1 | tech-news | blocked | Fast Company homepage/story requests return DataDome challenge pages. | https://www.fastcompany.com/91234567/example-article |
| fastcompany_com/article-2 | tech-news | blocked | Fast Company homepage/story requests return DataDome challenge pages. | https://www.fastcompany.com/97654321/example-two |
| science_org/article-2 | science | blocked | Science news requests return Cloudflare challenge pages in this environment. | https://www.science.org/content/article/example-news-2024 |
| biorxiv_org/article-2 | science | blocked | bioRxiv recent/preprint requests return Cloudflare challenge pages in this environment. | https://www.biorxiv.org/content/10.1101/2024.11.06.654321v1 |
| aeon_co/article-2 | longform | blocked | Aeon story/feed candidates return a Vercel challenge page in this environment. | https://aeon.co/ideas/example-short-piece |
| granta_com/article-1 | longform | blocked | Granta front page is reachable, but story candidates return 403/challenge pages. | https://granta.com/example-essay-2024/ |
| granta_com/article-2 | longform | blocked | Granta front page is reachable, but story candidates return 403/challenge pages. | https://granta.com/example-fiction-2024/ |
| posterous_style_site/article-2 | blog | dead-url | Typepad example redirects to a Network Solutions shell/challenge page, not a story source. | https://example.typepad.com/blog/2024/11/example-two.html |
| hugo_example/article-1 | blog | dead-url | Original Hugo release-notes URL now returns 404; Hugo news feed points to GitHub releases rather than story pages. | https://gohugo.io/news/0.134.0-relnotes/ |
| beehiiv_newsletter/article-1 | newsletter | blocked | Milk Road/Beehiiv candidate returns a challenge/blocked page. | https://www.milkroad.com/p/example-issue |
| beehiiv_newsletter/article-2 | newsletter | dead-url | Morning Brew Beehiiv placeholder redirects to a missing/non-story shell. | https://morningbrew.beehiiv.com/p/example |
| mailchimp_archive/article-1 | newsletter | dead-url | Mailchimp archive placeholder is not a real campaign story URL. | https://us20.campaign-archive.com/?u=abc&id=def |
| mailchimp_archive/article-2 | newsletter | dead-url | Mailchimp archive placeholder is not a real campaign story URL. | https://us20.campaign-archive.com/?u=xyz&id=ghi |

## Likely Non-Story, Broken, Missing, Or Duplicate

Count: 0.

| page | chars | flags | title |
|---|---:|---|---|

## Too Short

Count: 0.

| page | chars | flags | title |
|---|---:|---|---|

## Contains Likely Junk

Count: 0.

| page | chars | flags | title |
|---|---:|---|---|

## Clean Looking

Count: 236.

| page | chars | flags | title |
|---|---:|---|---|
| bearblog_dev/article-1 | 1526 | clean | Vulnerability as a Service \| Herman's blog |
| bearblog_dev/article-2 | 3830 | clean | The Bear Manifesto \| Herman's blog |
| blogspot_com/article-1 | 2650 | clean | Official Blogger Blog: A better Blogger experience on the web |
| blogspot_com/article-2 | 1507 | clean | Official Blogger Blog: An update on Google+ and Blogger |
| danluu_com/article-1 | 338378 | clean | Diseconomies of scale in fraud, spam, support, and moderation |
| danluu_com/article-2 | 41719 | clean | Cocktail party ideas |
| daringfireball_net/article-1 | 2159 | clean | Daring Fireball: Claris CEO Ryan McCann on FileMaker in the Age of Agentic Coding |
| daringfireball_net/article-2 | 2836 | clean | Daring Fireball: Tim Cook's Clever Solution to the Tariff Refund Puzzle |
| dev_to/article-1 | 8390 | clean | MiroFish: The Open-Source AI Engine That Builds Digital Worlds to Predict the Future - DEV |
| dev_to/article-2 | 43361 | clean | AutoBE vs. Claude Code: 3rd-gen coding agent developer's review of the leaked source code  |
| ghost_org/article-1 | 6473 | clean | Ghost 6.0 - Grow faster. |
| hacks_mozilla_org/article-1 | 8433 | clean | Improving Cross-Browser Testing, Part 2: New Automation Features in Firefox Nightly - Mozi |
| hacks_mozilla_org/article-2 | 3082 | clean | Firefox Developer Edition and Beta: Try out Mozilla's .rpm package! - Mozilla Hacks - the  |
| hugo_example/article-2 | 1229 | clean | Introduction |
| joelonsoftware_com/article-1 | 20375 | clean | The Joel Test: 12 Steps to Better Code – Joel on Software |
| joelonsoftware_com/article-2 | 6142 | clean | Don’t Let Architecture Astronauts Scare You – Joel on Software |
| kottke_org/article-1 | 215 | clean | 20 years ago: a guy interviewing for an IT job gets pulled o... |
| kottke_org/article-2 | 204 | clean | Jon Krakauer writes about what has changed about climbing Mt... |
| martinfowler_com/article-1 | 11526 | clean | Ship / Show / Ask |
| martinfowler_com/article-2 | 6300 | clean | Technical Debt |
| mataroa_blog/article-1 | 2365 | clean | Why doesn’t mataroa block AI scrapers? — Blog of Mataroa.blog |
| mataroa_blog/article-2 | 1747 | clean | Update on rubbish content — Blog of Mataroa.blog |
| micro_blog/article-1 | 571 | clean | Manton Reece |
| micro_blog/article-2 | 683 | clean | Manton Reece - SpaceX data center follow-up |
| overcomingbias_com/article-1 | 2659 | clean | On Politics And Governance - by Robin Hanson |
| overcomingbias_com/article-2 | 4021 | clean | Betrayed By Culture - by Robin Hanson - Overcoming Bias |
| paulgraham_com/article-1 | 67549 | clean | How to Do Great Work |
| paulgraham_com/article-2 | 8909 | clean | What to Do |
| simonwillison_net/article-1 | 3097 | clean | Hello GPT-4o |
| simonwillison_net/article-2 | 6340 | clean | Profiling Hacker News users based on their comments |
| squarespace_blog/article-2 | 10891 | clean | Set Up a Client Payment System for Your Business — Squarespace |
| swiftbysundell_com/article-1 | 16967 | clean | Building a design system at Genius Scan \| Swift by Sundell |
| swiftbysundell_com/article-2 | 13464 | clean | Tips and tricks for when using SwiftUI’s ViewBuilder \| Swift by Sundell |
| tumblr_com/article-1 | 3795 | clean | Tumblr Staff — We meant it. Let's work together |
| tumblr_com/article-2 | 1130 | clean | Tumblr Advisor Board – @staff on Tumblr |
| waxy_org/article-1 | 5711 | clean | Launching a permanent archive for XOXO - Waxy.org |
| waxy_org/article-2 | 7252 | clean | Will Smith's concert crowds are real, but AI is blurring the lines - Waxy.org |
| wix_blog/article-1 | 47709 | clean | How to Design a Website (Step-by-Step Guide) |
| wix_blog/article-2 | 20946 | clean | How to monetize your website in 15 actionable steps |
| write_as/article-1 | 2474 | clean | Joining the Fediverse — How to Use Write.as |
| write_as/article-2 | 1673 | clean | Identities — Write.as Blog |
| anthropic_com_news/article-1 | 5851 | clean | Introducing Claude 3.5 Sonnet \ Anthropic |
| anthropic_com_news/article-2 | 7282 | clean | Claude is a space to think \| Anthropic \ Anthropic |
| apple_com_newsroom/article-1 | 43133 | clean | Apple debuts iPhone 16 Pro and iPhone 16 Pro Max - Apple |
| apple_com_newsroom/article-2 | 25349 | clean | Introducing Apple Intelligence for iPhone, iPad, and Mac - Apple |
| github_blog/article-1 | 7036 | clean | An update on GitHub availability - The GitHub Blog |
| github_blog/article-2 | 13148 | clean | The uphill climb of making diff lines performant - The GitHub Blog |
| openai_com_blog/article-1 | 10980 | clean | Hello GPT-4o \| OpenAI |
| openai_com_blog/article-2 | 17896 | clean | Sora: Creating video from text \| OpenAI |
| stripe_com_blog/article-1 | 5372 | clean | Stripe powers Instant Checkout in ChatGPT and releases Agentic Commerce Protocol codevelop |
| stripe_com_blog/article-2 | 2746 | clean | Stripe deepens collaboration with NVIDIA to enhance Stripe’s AI-powered capabilities and e |
| aeon_co/article-1 | 26357 | clean | Why reality is more than the sum of its particles \| Aeon Essays |
| dissentmagazine_org/article-1 | 25094 | clean | When the World Split Open - Dissent Magazine |
| dissentmagazine_org/article-2 | 12461 | clean | How Mamdani Can Build Mass Engagement - Dissent Magazine |
| gq_com/article-1 | 49838 | clean | What Would the Olympics Be Like If the Athletes Could Juice? \| GQ |
| gq_com/article-2 | 6421 | clean | ‘The Odyssey’ Trailer's Accents Aren't Actually That Weird \| GQ |
| harpers_org/article-1 | 7875 | clean | Epiphany Narrative, by Kristin Dombek, Noah Rawlings |
| harpers_org/article-2 | 5309 | clean | Weekly Review, by Harper’s Magazine |
| jacobin_com/article-1 | 9221 | clean | How Morena Turned Anti-Corruption Politics Into Class Politics |
| jacobin_com/article-2 | 30251 | clean | Capitalism Was Built on the Ruins of the Commons |
| longreads_com/article-1 | 2090 | clean | Shall We Play a Game? - Longreads |
| longreads_com/article-2 | 1957 | clean | What Will It Take to Get AI Out of Schools? - Longreads |
| lrb_co_uk/article-1 | 5950 | clean | Raha Nik-Andish \| Something Broken or Nothing at All |
| lrb_co_uk/article-2 | 4586 | clean | Norman Dombey \| Britain’s Nuclear Subservience |
| newrepublic_com/article-1 | 1428 | clean | Jezebel tracked down the woman who read Claudia Rankine's "Citizen" at a Trump rally. \| T |
| newrepublic_com/article-2 | 22623 | clean | RFK Jr. Makes It Easier for Kids to Get Skin Cancer \| The New Republic |
| newyorker_com/article-1 | 57890 | clean | How the Internet Fringe Infiltrated Republican Politics \| The New Yorker |
| newyorker_com/article-2 | 27654 | clean | The Artist Who Made America Look Like a Promised Land \| The New Yorker |
| nybooks_com/article-1 | 13969 | clean | Iran’s New Winter \| Christopher de Bellaigue \| The New York Review of Books |
| nybooks_com/article-2 | 12641 | clean | His Moo Was Refined \| The Story of ‘The Story of Ferdinand’ \| The New York Review of Boo |
| rollingstone_com/article-1 | 2046 | clean | Met Gala 2026: Best Memes Inspired By Connor Storrie, Bad Bunny, More |
| rollingstone_com/article-2 | 1632 | clean | Best New Music: Kacey Musgraves, Vince Staples, Madonna |
| theatlantic_com/article-1 | 14890 | clean | ‘Industry’ Isn’t the Heir to ‘Succession’ - The Atlantic |
| theatlantic_com/article-2 | 1360 | clean | The Political Dysfunction Facing Congress - The Atlantic |
| thebeliever_net/article-1 | 5095 | clean | A Review of Ladies Almanack - Believer Magazine |
| thebeliever_net/article-2 | 10369 | clean | Are-Bure-Boke - Believer Magazine |
| thecut_com/article-1 | 36201 | clean | The Story of Caroline Calloway & Her Ghostwriter Natalie |
| thecut_com/article-2 | 10864 | clean | How Misoprostol-Only Abortion Works and What to Expect |
| theparisreview_org/article-1 | 3385 | clean | The Ignorant Art Historian: Ice Floes by Hal Foster |
| theparisreview_org/article-2 | 11069 | clean | When the Confederacy Came to LA by Harmony Holiday |

## Review Details

