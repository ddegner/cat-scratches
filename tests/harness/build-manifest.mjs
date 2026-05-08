#!/usr/bin/env node
// Builds tests/corpus/manifest.json from the compact SITES table below.
// Each site: [slug, name, category, cms, url1, url2, note1?, note2?]
// URLs are representative content pages (articles/posts/docs). Not all will
// remain reachable forever; fetch.mjs records HTTP status and reason per page.

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "corpus");

// prettier-ignore
const SITES = [
  // ============ Major news (English) — 40 ============
  ["nytimes_com", "The New York Times", "news-major", "custom", "https://www.nytimes.com/interactive/2024/upshot/2024-election-polls-trump-harris.html", "https://www.nytimes.com/2024/11/06/us/elections/results-president.html", "interactive", "results page"],
  ["washingtonpost_com", "The Washington Post", "news-major", "arc", "https://www.washingtonpost.com/politics/2024/11/06/trump-election-victory/", "https://www.washingtonpost.com/opinions/2024/10/25/washington-post-endorsement-presidential-race/", "news", "opinion"],
  ["theguardian_com", "The Guardian", "news-major", "custom", "https://www.theguardian.com/technology/2024/may/13/google-ai-overview-search", "https://www.theguardian.com/commentisfree/2024/nov/06/donald-trump-wins-us-election-2024", "tech news", "opinion"],
  ["bbc_com", "BBC News", "news-major", "custom", "https://www.bbc.com/news/world-us-canada-68678974", "https://www.bbc.com/future/article/20240515-the-surprising-science-of-how-we-age", "news article", "longform feature"],
  ["reuters_com", "Reuters", "news-major", "custom", "https://www.reuters.com/world/us/trump-inauguration-live-updates-2025-01-20/", "https://www.reuters.com/technology/artificial-intelligence/openai-2024-12-05/", "wire news", "tech"],
  ["apnews_com", "Associated Press", "news-major", "custom", "https://apnews.com/article/election-2024-trump-harris-results-cb7f0c6d1234", "https://apnews.com/hub/artificial-intelligence", "wire", "hub page"],
  ["wsj_com", "Wall Street Journal", "news-major", "custom", "https://www.wsj.com/tech/ai/openai-chatgpt-anthropic-2024-abcd1234", "https://www.wsj.com/opinion/editorial-2024-xyz", "paywall teaser", "opinion"],
  ["ft_com", "Financial Times", "news-major", "custom", "https://www.ft.com/content/abc-def-ghi-2024", "https://www.ft.com/content/markets-2024-jkl", "paywall teaser", "markets"],
  ["bloomberg_com", "Bloomberg", "news-major", "custom", "https://www.bloomberg.com/news/articles/2024-05-15/ai-boom-nvidia", "https://www.bloomberg.com/opinion/articles/2024-06-01/fed-rates", "news", "opinion"],
  ["economist_com", "The Economist", "news-major", "custom", "https://www.economist.com/leaders/2024/11/07/the-trump-victory", "https://www.economist.com/briefing/2024/05/23/ai-and-work", "leader", "briefing"],
  ["theatlantic_com", "The Atlantic", "longform", "custom", "https://www.theatlantic.com/magazine/archive/2024/09/anne-applebaum-autocracy/679164/", "https://www.theatlantic.com/technology/archive/2024/05/openai-altman-safety/678425/", "magazine feature", "tech essay"],
  ["newyorker_com", "The New Yorker", "longform", "custom", "https://www.newyorker.com/magazine/2024/03/18/the-rise-of-ai", "https://www.newyorker.com/culture/annals-of-inquiry/example-piece", "magazine feature", "culture"],
  ["npr_org", "NPR", "news-major", "custom", "https://www.npr.org/2024/11/06/nx-s1-trump-election-results", "https://www.npr.org/sections/health-shots/2024/05/01/ai-medicine", "news", "feature"],
  ["cnn_com", "CNN", "news-major", "custom", "https://www.cnn.com/2024/11/06/politics/election-2024-results/index.html", "https://www.cnn.com/business/live-news/stock-market-today-01-15-25/index.html", "news", "live"],
  ["axios_com", "Axios", "news-major", "custom", "https://www.axios.com/2024/11/06/trump-wins-2024-election", "https://www.axios.com/2024/05/15/openai-gpt-4o", "smart-brevity", "tech"],
  ["politico_com", "Politico", "news-major", "wordpress-vip", "https://www.politico.com/news/2024/11/06/trump-wins-2024-00187234", "https://www.politico.com/magazine/story/2024/05/15/example-longform", "news", "magazine"],
  ["vox_com", "Vox", "news-major", "chorus", "https://www.vox.com/policy/2024/5/15/explainer-ai", "https://www.vox.com/future-perfect/2024/11/06/ai-safety", "explainer", "column"],
  ["propublica_org", "ProPublica", "news-major", "custom", "https://www.propublica.org/article/example-investigation-2024", "https://www.propublica.org/article/ai-accountability-2024", "investigation", "investigation"],
  ["semafor_com", "Semafor", "news-major", "custom", "https://www.semafor.com/article/05/15/2024/openai-board", "https://www.semafor.com/article/11/06/2024/election-analysis", "news", "analysis"],
  ["404media_co", "404 Media", "news-major", "ghost", "https://www.404media.co/example-investigation-2024/", "https://www.404media.co/example-feature-2024/", "investigation", "feature"],
  ["latimes_com", "Los Angeles Times", "news-major", "arc", "https://www.latimes.com/california/story/2024-05-15/example", "https://www.latimes.com/opinion/story/2024-11-06/example", "news", "opinion"],
  ["nypost_com", "New York Post", "news-major", "wordpress-vip", "https://nypost.com/2024/11/06/news/example-article/", "https://nypost.com/2024/05/15/business/example/", "news", "business"],
  ["usatoday_com", "USA Today", "news-major", "gannett", "https://www.usatoday.com/story/news/politics/2024/11/06/example/12345/", "https://www.usatoday.com/story/money/2024/05/15/example/67890/", "news", "money"],
  ["cbsnews_com", "CBS News", "news-major", "custom", "https://www.cbsnews.com/news/example-2024/", "https://www.cbsnews.com/news/example-two-2024/", "news", "news"],
  ["nbcnews_com", "NBC News", "news-major", "custom", "https://www.nbcnews.com/politics/2024-election/example-rcna123", "https://www.nbcnews.com/tech/example-rcna456", "news", "tech"],
  ["abcnews_go_com", "ABC News", "news-major", "custom", "https://abcnews.go.com/Politics/example/story?id=12345", "https://abcnews.go.com/Technology/example/story?id=67890", "news", "tech"],
  ["foxnews_com", "Fox News", "news-major", "custom", "https://www.foxnews.com/politics/example-2024", "https://www.foxnews.com/tech/example-2024", "news", "tech"],
  ["msnbc_com", "MSNBC", "news-major", "custom", "https://www.msnbc.com/opinion/example-2024", "https://www.msnbc.com/rachel-maddow-show/example-2024", "opinion", "show"],
  ["theintercept_com", "The Intercept", "news-major", "custom", "https://theintercept.com/2024/05/15/example-investigation/", "https://theintercept.com/2024/11/06/example-analysis/", "investigation", "analysis"],
  ["motherjones_com", "Mother Jones", "news-major", "wordpress-vip", "https://www.motherjones.com/politics/2024/11/example/", "https://www.motherjones.com/environment/2024/05/example/", "news", "feature"],
  ["thenation_com", "The Nation", "news-major", "wordpress", "https://www.thenation.com/article/politics/example-2024/", "https://www.thenation.com/article/culture/example-2024/", "opinion", "culture"],
  ["slate_com", "Slate", "news-major", "custom", "https://slate.com/news-and-politics/2024/11/example.html", "https://slate.com/technology/2024/05/example.html", "news", "tech"],
  ["salon_com", "Salon", "news-major", "wordpress", "https://www.salon.com/2024/11/06/example/", "https://www.salon.com/2024/05/15/example/", "news", "culture"],
  ["huffpost_com", "HuffPost", "news-major", "custom", "https://www.huffpost.com/entry/example_n_12345", "https://www.huffpost.com/entry/example-two_n_67890", "news", "news"],
  ["dailybeast_com", "The Daily Beast", "news-major", "custom", "https://www.thedailybeast.com/example-2024", "https://www.thedailybeast.com/example-two-2024", "news", "opinion"],
  ["thehill_com", "The Hill", "news-major", "wordpress-vip", "https://thehill.com/homenews/administration/12345-example/", "https://thehill.com/opinion/67890-example/", "news", "opinion"],
  ["rollingstone_com", "Rolling Stone", "longform", "wordpress-vip", "https://www.rollingstone.com/culture/culture-features/example-1234567/", "https://www.rollingstone.com/music/music-features/example-7654321/", "culture", "music"],
  ["time_com", "TIME", "news-major", "wordpress-vip", "https://time.com/1234567/example-2024/", "https://time.com/7654321/example-two-2024/", "news", "feature"],
  ["newsweek_com", "Newsweek", "news-major", "custom", "https://www.newsweek.com/example-2024-12345", "https://www.newsweek.com/example-two-2024-67890", "news", "opinion"],
  ["forbes_com", "Forbes", "news-major", "custom", "https://www.forbes.com/sites/example/2024/05/15/example-article/", "https://www.forbes.com/sites/example/2024/11/06/example-two/", "contributor", "staff"],

  // ============ International news — 20 ============
  ["lemonde_fr", "Le Monde", "news-intl", "custom", "https://www.lemonde.fr/politique/article/2024/11/06/example_12345_823448.html", "https://www.lemonde.fr/economie/article/2024/05/15/example_67890_3234524.html", "news FR", "economy FR"],
  ["spiegel_de", "Der Spiegel", "news-intl", "custom", "https://www.spiegel.de/politik/deutschland/example-a-12345.html", "https://www.spiegel.de/wirtschaft/example-a-67890.html", "news DE", "business DE"],
  ["asahi_com", "Asahi Shimbun", "news-intl", "custom", "https://www.asahi.com/articles/ASS123456.html", "https://www.asahi.com/articles/ASS654321.html", "news JP", "news JP"],
  ["scmp_com", "South China Morning Post", "news-intl", "custom", "https://www.scmp.com/news/china/politics/article/3123456/example", "https://www.scmp.com/business/article/3654321/example", "news HK", "business HK"],
  ["aljazeera_com", "Al Jazeera", "news-intl", "custom", "https://www.aljazeera.com/news/2024/11/6/example-article", "https://www.aljazeera.com/opinions/2024/5/15/example-opinion", "news", "opinion"],
  ["haaretz_com", "Haaretz", "news-intl", "custom", "https://www.haaretz.com/israel-news/2024-11-06/ty-article/example/0000018a-1234-5678-abcd-efgh12345678", "https://www.haaretz.com/opinion/2024-05-15/ty-article-opinion/example/0000018b-8765-4321-dcba-hgfe87654321", "news IL", "opinion IL"],
  ["theglobeandmail_com", "The Globe and Mail", "news-intl", "custom", "https://www.theglobeandmail.com/politics/article-example-2024/", "https://www.theglobeandmail.com/business/article-example-two-2024/", "news CA", "business CA"],
  ["smh_com_au", "Sydney Morning Herald", "news-intl", "custom", "https://www.smh.com.au/politics/federal/example-20241106-p5abc12.html", "https://www.smh.com.au/business/markets/example-20240515-p5def34.html", "news AU", "markets AU"],
  ["theglobalist_com", "The Globalist", "news-intl", "wordpress", "https://www.theglobalist.com/example-article-2024/", "https://www.theglobalist.com/example-two-2024/", "essay", "essay"],
  ["dw_com", "Deutsche Welle", "news-intl", "custom", "https://www.dw.com/en/example-article/a-12345678", "https://www.dw.com/en/example-two/a-87654321", "news DE-EN", "news DE-EN"],
  ["france24_com", "France 24", "news-intl", "custom", "https://www.france24.com/en/europe/20241106-example-article", "https://www.france24.com/en/africa/20240515-example-two", "news FR-EN", "news FR-EN"],
  ["rt_com", "RT", "news-intl", "custom", "https://www.rt.com/news/123456-example/", "https://www.rt.com/business/654321-example/", "news RU-EN", "business RU-EN"],
  ["themoscowtimes_com", "The Moscow Times", "news-intl", "custom", "https://www.themoscowtimes.com/2024/11/06/example-a12345", "https://www.themoscowtimes.com/2024/05/15/example-two-a67890", "news", "news"],
  ["kyivindependent_com", "The Kyiv Independent", "news-intl", "ghost", "https://kyivindependent.com/example-article-2024/", "https://kyivindependent.com/example-two-2024/", "news UA", "analysis UA"],
  ["timesofindia_indiatimes_com", "Times of India", "news-intl", "custom", "https://timesofindia.indiatimes.com/india/example/articleshow/12345678.cms", "https://timesofindia.indiatimes.com/business/india-business/example/articleshow/87654321.cms", "news IN", "business IN"],
  ["thehindu_com", "The Hindu", "news-intl", "custom", "https://www.thehindu.com/news/national/example/article12345678.ece", "https://www.thehindu.com/business/example/article87654321.ece", "news IN", "business IN"],
  ["straitstimes_com", "The Straits Times", "news-intl", "custom", "https://www.straitstimes.com/singapore/example-article", "https://www.straitstimes.com/business/example-two", "news SG", "business SG"],
  ["japantimes_co_jp", "The Japan Times", "news-intl", "custom", "https://www.japantimes.co.jp/news/2024/11/06/japan/example/", "https://www.japantimes.co.jp/business/2024/05/15/companies/example/", "news JP-EN", "business JP-EN"],
  ["koreatimes_co_kr", "The Korea Times", "news-intl", "custom", "https://www.koreatimes.co.kr/www/nation/2024/11/example_123456.html", "https://www.koreatimes.co.kr/www/biz/2024/05/example_654321.html", "news KR-EN", "biz KR-EN"],
  ["rappler_com", "Rappler", "news-intl", "wordpress", "https://www.rappler.com/nation/example-article-november-2024/", "https://www.rappler.com/business/example-two-may-2024/", "news PH", "business PH"],

  // ============ Tech/business news — 20 ============
  ["techcrunch_com", "TechCrunch", "tech-news", "wordpress-vip", "https://techcrunch.com/2024/05/13/openai-gpt-4o-demo/", "https://techcrunch.com/2024/11/06/tech-industry-reaction-to-trump-2024/", "breaking", "analysis"],
  ["theverge_com", "The Verge", "tech-news", "chorus", "https://www.theverge.com/2024/5/13/24155020/openai-gpt-4o-launch", "https://www.theverge.com/24284101/apple-iphone-16-review", "news", "review"],
  ["arstechnica_com", "Ars Technica", "tech-news", "custom", "https://arstechnica.com/gadgets/2024/09/apple-iphone-16-review/", "https://arstechnica.com/ai/2024/05/gpt-4o-announcement/", "review", "news"],
  ["wired_com", "WIRED", "tech-news", "custom", "https://www.wired.com/story/openai-gpt-4o-demo/", "https://www.wired.com/story/the-big-story-example-2024/", "news", "longform"],
  ["9to5mac_com", "9to5Mac", "tech-news", "wordpress", "https://9to5mac.com/2024/09/09/iphone-16-announcement/", "https://9to5mac.com/2024/06/10/wwdc-2024-keynote/", "news", "event coverage"],
  ["macrumors_com", "MacRumors", "tech-news", "custom", "https://www.macrumors.com/2024/09/09/iphone-16-released/", "https://www.macrumors.com/guide/iphone-16/", "news", "guide"],
  ["news_ycombinator_com", "Hacker News (front page)", "forum", "custom", "https://news.ycombinator.com/item?id=40358101", "https://news.ycombinator.com/item?id=42112345", "comment thread", "comment thread"],
  ["stratechery_com", "Stratechery", "tech-news", "wordpress", "https://stratechery.com/2024/the-gen-ai-bridge-to-the-future/", "https://stratechery.com/2024/apple-intelligence/", "essay", "essay"],
  ["platformer_news", "Platformer", "tech-news", "ghost", "https://www.platformer.news/openai-board-anna-makanju-election/", "https://www.platformer.news/anthropic-claude-3-5-sonnet/", "newsletter", "newsletter"],
  ["theinformation_com", "The Information", "tech-news", "custom", "https://www.theinformation.com/articles/example-tech-scoop-2024", "https://www.theinformation.com/briefings/example-briefing-2024", "paywall", "paywall"],
  ["engadget_com", "Engadget", "tech-news", "wordpress-vip", "https://www.engadget.com/example-review-2024-120000000.html", "https://www.engadget.com/example-news-2024-153000000.html", "review", "news"],
  ["gizmodo_com", "Gizmodo", "tech-news", "custom", "https://gizmodo.com/example-article-1851234567", "https://gizmodo.com/example-two-1857654321", "news", "feature"],
  ["cnet_com", "CNET", "tech-news", "custom", "https://www.cnet.com/tech/services-and-software/example-2024/", "https://www.cnet.com/reviews/example-product-2024/", "news", "review"],
  ["zdnet_com", "ZDNet", "tech-news", "custom", "https://www.zdnet.com/article/example-2024/", "https://www.zdnet.com/article/example-two-2024/", "news", "news"],
  ["theregister_com", "The Register", "tech-news", "custom", "https://www.theregister.com/2024/11/06/example_article/", "https://www.theregister.com/2024/05/15/example_two/", "news UK", "news UK"],
  ["venturebeat_com", "VentureBeat", "tech-news", "wordpress-vip", "https://venturebeat.com/ai/example-article-2024/", "https://venturebeat.com/enterprise/example-two-2024/", "AI news", "enterprise"],
  ["techradar_com", "TechRadar", "tech-news", "custom", "https://www.techradar.com/computing/example-2024", "https://www.techradar.com/reviews/example-product-2024", "news", "review"],
  ["theatlanticcouncil_org", "Atlantic Council", "think-tank", "wordpress", "https://www.atlanticcouncil.org/blogs/example-analysis-2024/", "https://www.atlanticcouncil.org/in-depth-research-reports/example-report-2024/", "analysis", "report"],
  ["businessinsider_com", "Business Insider", "tech-news", "custom", "https://www.businessinsider.com/example-article-2024-5", "https://www.businessinsider.com/example-two-2024-11", "news", "feature"],
  ["fastcompany_com", "Fast Company", "tech-news", "wordpress-vip", "https://www.fastcompany.com/91234567/example-article", "https://www.fastcompany.com/97654321/example-two", "news", "feature"],

  // ============ Science/academia — 10 ============
  ["nature_com", "Nature", "science", "custom", "https://www.nature.com/articles/d41586-024-01234-5", "https://www.nature.com/articles/s41586-024-07654-3", "news article", "research paper"],
  ["science_org", "Science (AAAS)", "science", "custom", "https://www.science.org/doi/10.1126/science.example", "https://www.science.org/content/article/example-news-2024", "research paper", "news"],
  ["quantamagazine_org", "Quanta Magazine", "science", "wordpress", "https://www.quantamagazine.org/the-year-in-math-2024-20241222/", "https://www.quantamagazine.org/example-article-20240515/", "feature", "feature"],
  ["arxiv_org", "arXiv", "science", "custom", "https://arxiv.org/abs/2405.12345", "https://arxiv.org/abs/2411.54321", "abstract", "abstract"],
  ["pubmed_ncbi_nlm_nih_gov", "PubMed", "science", "custom", "https://pubmed.ncbi.nlm.nih.gov/38123456/", "https://pubmed.ncbi.nlm.nih.gov/38987654/", "abstract", "abstract"],
  ["scientificamerican_com", "Scientific American", "science", "custom", "https://www.scientificamerican.com/article/example-article-2024/", "https://www.scientificamerican.com/article/example-two-2024/", "feature", "news"],
  ["newscientist_com", "New Scientist", "science", "custom", "https://www.newscientist.com/article/2412345-example/", "https://www.newscientist.com/article/2454321-example-two/", "news", "news"],
  ["phys_org", "Phys.org", "science", "custom", "https://phys.org/news/2024-05-example.html", "https://phys.org/news/2024-11-example-two.html", "news release", "news release"],
  ["plos_org", "PLOS ONE", "science", "custom", "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.example", "https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.example", "paper", "paper"],
  ["biorxiv_org", "bioRxiv", "science", "custom", "https://www.biorxiv.org/content/10.1101/2024.05.15.123456v1", "https://www.biorxiv.org/content/10.1101/2024.11.06.654321v1", "preprint", "preprint"],

  // ============ Long-form / magazines — 15 ============
  ["longreads_com", "Longreads", "longform", "wordpress", "https://longreads.com/2024/05/15/example-essay/", "https://longreads.com/2024/11/06/example-feature/", "essay", "feature"],
  ["harpers_org", "Harper's Magazine", "longform", "custom", "https://harpers.org/archive/2024/05/example-essay/", "https://harpers.org/archive/2024/11/example-feature/", "essay", "feature"],
  ["aeon_co", "Aeon", "longform", "wordpress", "https://aeon.co/essays/example-philosophy-essay", "https://aeon.co/ideas/example-short-piece", "essay", "idea"],
  ["lrb_co_uk", "London Review of Books", "longform", "custom", "https://www.lrb.co.uk/the-paper/v46/n10/example/example-article", "https://www.lrb.co.uk/blog/2024/november/example-blog", "review", "blog"],
  ["nybooks_com", "New York Review of Books", "longform", "custom", "https://www.nybooks.com/articles/2024/05/15/example/", "https://www.nybooks.com/online/2024/11/06/example/", "review", "online"],
  ["theparisreview_org", "The Paris Review", "longform", "wordpress", "https://www.theparisreview.org/blog/2024/05/15/example/", "https://www.theparisreview.org/interviews/example-interview/", "blog", "interview"],
  ["vqronline_org", "Virginia Quarterly Review", "longform", "custom", "https://www.vqronline.org/essays-articles/2024/spring/example", "https://www.vqronline.org/fiction/2024/fall/example", "essay", "fiction"],
  ["thebeliever_net", "The Believer", "longform", "wordpress", "https://www.thebeliever.net/logger/example-2024/", "https://www.thebeliever.net/example-interview-2024/", "column", "interview"],
  ["granta_com", "Granta", "longform", "custom", "https://granta.com/example-essay-2024/", "https://granta.com/example-fiction-2024/", "essay", "fiction"],
  ["thecut_com", "The Cut", "longform", "chorus", "https://www.thecut.com/article/example-feature-2024.html", "https://www.thecut.com/article/example-two-2024.html", "feature", "feature"],
  ["gq_com", "GQ", "longform", "custom", "https://www.gq.com/story/example-feature-2024", "https://www.gq.com/story/example-two-2024", "feature", "style"],
  ["vanityfair_com", "Vanity Fair", "longform", "custom", "https://www.vanityfair.com/news/story/example-2024", "https://www.vanityfair.com/hollywood/story/example-two-2024", "news", "hollywood"],
  ["newrepublic_com", "The New Republic", "longform", "custom", "https://newrepublic.com/article/123456/example-essay", "https://newrepublic.com/article/654321/example-two", "essay", "essay"],
  ["dissentmagazine_org", "Dissent", "longform", "wordpress", "https://www.dissentmagazine.org/article/example-essay-2024/", "https://www.dissentmagazine.org/online_articles/example-2024/", "print essay", "online"],
  ["jacobin_com", "Jacobin", "longform", "custom", "https://jacobin.com/2024/05/example-article", "https://jacobin.com/2024/11/example-two", "essay", "essay"],

  // ============ Blogs (various CMS) — 25 ============
  ["paulgraham_com", "Paul Graham's essays", "blog", "static-html", "https://www.paulgraham.com/greatwork.html", "https://www.paulgraham.com/do.html", "essay (plain HTML)", "essay"],
  ["overcomingbias_com", "Overcoming Bias (Hanson)", "blog", "wordpress", "https://www.overcomingbias.com/p/example-post-2024", "https://www.overcomingbias.com/p/example-two-2024", "post", "post"],
  ["joelonsoftware_com", "Joel on Software", "blog", "custom", "https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/", "https://www.joelonsoftware.com/2001/04/21/dont-let-architecture-astronauts-scare-you/", "classic post", "classic post"],
  ["danluu_com", "Dan Luu", "blog", "static-html", "https://danluu.com/diseconomies-scale/", "https://danluu.com/cocktail-ideas/", "long post", "short post"],
  ["simonwillison_net", "Simon Willison's TIL", "blog", "django", "https://simonwillison.net/2024/Nov/6/example-post/", "https://simonwillison.net/2024/May/15/example-til/", "post", "TIL"],
  ["martinfowler_com", "Martin Fowler", "blog", "jekyll", "https://martinfowler.com/articles/ship-show-ask.html", "https://martinfowler.com/bliki/TechnicalDebt.html", "article", "bliki"],
  ["daringfireball_net", "Daring Fireball", "blog", "custom", "https://daringfireball.net/2024/11/example_linked_post", "https://daringfireball.net/2024/05/example_longer_piece", "linked list", "article"],
  ["kottke_org", "kottke.org", "blog", "movable-type", "https://kottke.org/24/11/example-link-post", "https://kottke.org/24/05/example-longer-post", "link post", "post"],
  ["waxy_org", "Waxy.org (Andy Baio)", "blog", "wordpress", "https://waxy.org/2024/05/example-article/", "https://waxy.org/2024/11/example-two/", "post", "post"],
  ["swiftbysundell_com", "Swift by Sundell", "blog", "publish", "https://www.swiftbysundell.com/articles/example-article/", "https://www.swiftbysundell.com/podcast/example-episode/", "article", "podcast page"],
  ["hacks_mozilla_org", "Mozilla Hacks", "blog", "wordpress", "https://hacks.mozilla.org/2024/05/example-post/", "https://hacks.mozilla.org/2024/11/example-two/", "post", "post"],
  ["dev_to", "DEV Community", "blog", "forem", "https://dev.to/example/example-post-abc", "https://dev.to/example/example-two-def", "community post", "community post"],
  ["medium_com", "Medium", "blog", "medium", "https://medium.com/@example/example-article-abc123", "https://medium.com/publication/example-two-def456", "personal", "publication"],
  ["substack_com", "Substack (generic)", "newsletter", "substack", "https://example.substack.com/p/example-post", "https://noahpinion.substack.com/p/example-noahpinion-post", "post", "post"],
  ["ghost_org", "Ghost.org blog", "blog", "ghost", "https://ghost.org/blog/example-post/", "https://ghost.org/resources/example-two/", "post", "resource"],
  ["bearblog_dev", "Bear Blog (example)", "blog", "bearblog", "https://herman.bearblog.dev/the-fundamentals-of-this-website/", "https://herman.bearblog.dev/manifesto/", "post", "post"],
  ["mataroa_blog", "Mataroa blog (example)", "blog", "mataroa", "https://mataroa.blog/blog/example/", "https://mataroa.blog/about/", "post", "about"],
  ["write_as", "Write.as example", "blog", "writefreely", "https://write.as/example/example-post", "https://write.as/example/example-two", "post", "post"],
  ["tumblr_com", "Tumblr (example blog)", "blog", "tumblr", "https://staff.tumblr.com/post/12345678/example", "https://staff.tumblr.com/post/87654321/example-two", "post", "post"],
  ["blogspot_com", "Blogger/Blogspot example", "blog", "blogger", "https://example.blogspot.com/2024/05/example-post.html", "https://example.blogspot.com/2024/11/example-two.html", "post", "post"],
  ["posterous_style_site", "Typepad example", "blog", "typepad", "https://example.typepad.com/blog/2024/05/example.html", "https://example.typepad.com/blog/2024/11/example-two.html", "post", "post"],
  ["squarespace_blog", "Squarespace example", "blog", "squarespace", "https://www.squarespace.com/blog/example-post", "https://www.squarespace.com/blog/example-two", "post", "post"],
  ["wix_blog", "Wix blog example", "blog", "wix", "https://www.wix.com/blog/example-post", "https://www.wix.com/blog/example-two", "post", "post"],
  ["micro_blog", "Micro.blog example", "blog", "micro.blog", "https://micro.blog/discover/example-post", "https://manton.org/2024/11/06/example-post.html", "post", "post"],
  ["hugo_example", "Hugo static example (gohugo.io)", "blog", "hugo", "https://gohugo.io/news/0.134.0-relnotes/", "https://gohugo.io/about/what-is-hugo/", "release notes", "about"],

  // ============ Developer docs — 15 ============
  ["developer_mozilla_org", "MDN", "docs", "custom", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map", "https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns", "API ref", "CSS ref"],
  ["docs_python_org", "Python docs", "docs", "sphinx", "https://docs.python.org/3/library/functools.html", "https://docs.python.org/3/tutorial/datastructures.html", "library", "tutorial"],
  ["doc_rust_lang_org", "Rust book", "docs", "mdbook", "https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html", "https://doc.rust-lang.org/std/vec/struct.Vec.html", "book", "API"],
  ["react_dev", "React docs", "docs", "next-custom", "https://react.dev/learn/thinking-in-react", "https://react.dev/reference/react/useState", "learn", "API"],
  ["docs_stripe_com", "Stripe docs", "docs", "custom", "https://docs.stripe.com/payments/quickstart", "https://docs.stripe.com/api/charges/object", "quickstart", "API"],
  ["github_com_readme", "GitHub README rendering", "docs", "github", "https://github.com/facebook/react/blob/main/README.md", "https://github.com/torvalds/linux/blob/master/README", "README", "README"],
  ["kubernetes_io_docs", "Kubernetes docs", "docs", "hugo", "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/", "https://kubernetes.io/docs/tutorials/kubernetes-basics/", "concept", "tutorial"],
  ["docs_docker_com", "Docker docs", "docs", "hugo", "https://docs.docker.com/get-started/overview/", "https://docs.docker.com/engine/reference/commandline/run/", "overview", "CLI"],
  ["developer_apple_com_docs", "Apple Developer docs", "docs", "custom", "https://developer.apple.com/documentation/swiftui/view", "https://developer.apple.com/documentation/uikit/uiviewcontroller", "API", "API"],
  ["developer_android_com", "Android docs", "docs", "custom", "https://developer.android.com/guide/components/activities/intro-activities", "https://developer.android.com/reference/kotlin/androidx/compose/ui/Modifier", "guide", "API"],
  ["docs_microsoft_com", "Microsoft Learn", "docs", "docfx", "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/", "https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview", "tutorial", "overview"],
  ["cloud_google_com_docs", "Google Cloud docs", "docs", "custom", "https://cloud.google.com/run/docs/overview/what-is-cloud-run", "https://cloud.google.com/bigquery/docs/introduction", "overview", "intro"],
  ["docs_aws_amazon_com", "AWS docs", "docs", "custom", "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html", "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html", "user guide", "user guide"],
  ["kernel_org", "kernel.org docs", "docs", "sphinx", "https://www.kernel.org/doc/html/latest/process/coding-style.html", "https://www.kernel.org/doc/html/latest/admin-guide/README.html", "spec", "spec"],
  ["rfc_editor_org", "RFC Editor", "docs", "custom", "https://www.rfc-editor.org/rfc/rfc9110.html", "https://www.rfc-editor.org/rfc/rfc8259.html", "RFC", "RFC"],

  // ============ Reference / encyclopedic — 5 ============
  ["wikipedia_org", "Wikipedia", "reference", "mediawiki", "https://en.wikipedia.org/wiki/Artificial_intelligence", "https://en.wikipedia.org/wiki/History_of_the_Internet", "long article", "long article"],
  ["wiktionary_org", "Wiktionary", "reference", "mediawiki", "https://en.wiktionary.org/wiki/example", "https://en.wiktionary.org/wiki/serendipity", "entry", "entry"],
  ["plato_stanford_edu", "Stanford Encyclopedia of Philosophy", "reference", "custom", "https://plato.stanford.edu/entries/consciousness/", "https://plato.stanford.edu/entries/ethics-ai/", "entry", "entry"],
  ["britannica_com", "Britannica", "reference", "custom", "https://www.britannica.com/topic/artificial-intelligence", "https://www.britannica.com/event/French-Revolution", "topic", "event"],
  ["fandom_com", "Fandom wiki", "reference", "mediawiki", "https://en.wikipedia.org/wiki/Fandom_(website)", "https://memory-alpha.fandom.com/wiki/Jean-Luc_Picard", "meta", "fan wiki"],

  // ============ Forums / UGC — 10 ============
  ["reddit_com_old", "Old Reddit", "forum", "reddit", "https://old.reddit.com/r/programming/comments/1cr123/example_thread/", "https://old.reddit.com/r/AskHistorians/comments/1ab456/example_answer/", "thread", "Q&A"],
  ["reddit_com_new", "New Reddit", "forum", "reddit", "https://www.reddit.com/r/programming/comments/1cr123/example_thread/", "https://www.reddit.com/r/AskHistorians/comments/1ab456/example_answer/", "thread", "Q&A"],
  ["news_ycombinator_com_thread", "HN thread", "forum", "custom", "https://news.ycombinator.com/item?id=40358101", "https://news.ycombinator.com/item?id=42112345", "thread", "thread"],
  ["stackoverflow_com", "Stack Overflow", "forum", "stackexchange", "https://stackoverflow.com/questions/11227809/why-is-processing-a-sorted-array-faster-than-processing-an-unsorted-array", "https://stackoverflow.com/questions/231767/what-does-the-yield-keyword-do-in-python", "Q&A", "Q&A"],
  ["superuser_com", "Super User", "forum", "stackexchange", "https://superuser.com/questions/123456/example-question", "https://superuser.com/questions/654321/example-two", "Q&A", "Q&A"],
  ["lobste_rs", "Lobsters", "forum", "lobsters", "https://lobste.rs/s/abcdef/example_story", "https://lobste.rs/s/ghijkl/example_two", "comment thread", "comment thread"],
  ["discourse_org", "Discourse (meta)", "forum", "discourse", "https://meta.discourse.org/t/example-topic/123456", "https://meta.discourse.org/t/example-two/654321", "topic", "topic"],
  ["github_com_issue", "GitHub Issue", "forum", "github", "https://github.com/nodejs/node/issues/12345", "https://github.com/microsoft/vscode/issues/54321", "issue", "issue"],
  ["stackexchange_com", "Stack Exchange (generic)", "forum", "stackexchange", "https://english.stackexchange.com/questions/12345/example", "https://math.stackexchange.com/questions/54321/example", "Q&A", "Q&A"],
  ["quora_com", "Quora", "forum", "quora", "https://www.quora.com/What-is-the-meaning-of-life", "https://www.quora.com/How-does-the-internet-work", "answer", "answer"],

  // ============ Recipes — 5 ============
  ["cooking_nytimes_com", "NYT Cooking", "recipe", "custom", "https://cooking.nytimes.com/recipes/1017611-chocolate-chip-cookies", "https://cooking.nytimes.com/recipes/1021090-carbonara", "recipe", "recipe"],
  ["seriouseats_com", "Serious Eats", "recipe", "wordpress-vip", "https://www.seriouseats.com/the-best-chocolate-chip-cookie-recipe", "https://www.seriouseats.com/classic-carbonara-recipe", "recipe", "recipe"],
  ["smittenkitchen_com", "Smitten Kitchen", "recipe", "wordpress", "https://smittenkitchen.com/2024/05/example-recipe/", "https://smittenkitchen.com/2024/11/example-two/", "recipe", "recipe"],
  ["allrecipes_com", "AllRecipes", "recipe", "custom", "https://www.allrecipes.com/recipe/10813/best-chocolate-chip-cookies/", "https://www.allrecipes.com/recipe/45957/classic-carbonara/", "recipe", "recipe"],
  ["bonappetit_com", "Bon Appétit", "recipe", "custom", "https://www.bonappetit.com/recipe/bas-best-chocolate-chip-cookies", "https://www.bonappetit.com/recipe/classic-carbonara", "recipe", "recipe"],

  // ============ E-commerce — 5 ============
  ["amazon_com", "Amazon product page", "ecommerce", "custom", "https://www.amazon.com/dp/B08N5WRWNW", "https://www.amazon.com/dp/B0CHX1W1XY", "product", "product"],
  ["etsy_com", "Etsy listing", "ecommerce", "custom", "https://www.etsy.com/listing/123456/example-item", "https://www.etsy.com/listing/654321/example-two", "listing", "listing"],
  ["shopify_com_store", "Shopify storefront example", "ecommerce", "shopify", "https://www.allbirds.com/products/mens-wool-runners", "https://www.gymshark.com/products/gymshark-apex-t-shirt", "product", "product"],
  ["ebay_com", "eBay listing", "ecommerce", "custom", "https://www.ebay.com/itm/123456789012", "https://www.ebay.com/itm/987654321098", "listing", "listing"],
  ["target_com", "Target product page", "ecommerce", "custom", "https://www.target.com/p/example-product/-/A-12345678", "https://www.target.com/p/example-two/-/A-87654321", "product", "product"],

  // ============ Newsletters / email-on-web — 5 ============
  ["stratechery_substack", "Stratechery subscription post", "newsletter", "custom", "https://stratechery.com/2024/example-subscriber-post/", "https://stratechery.com/2024/example-free-post/", "newsletter", "newsletter"],
  ["beehiiv_newsletter", "Beehiiv newsletter", "newsletter", "beehiiv", "https://www.milkroad.com/p/example-issue", "https://morningbrew.beehiiv.com/p/example", "issue", "issue"],
  ["buttondown_email", "Buttondown newsletter", "newsletter", "buttondown", "https://buttondown.com/jmduke/archive/example-post/", "https://buttondown.com/hillelwayne/archive/example-two/", "archive", "archive"],
  ["revue_archive", "Revue archive (legacy)", "newsletter", "revue", "https://www.getrevue.co/profile/example/issues/example-issue-12345", "https://www.getrevue.co/profile/example/issues/example-two-67890", "archive", "archive"],
  ["mailchimp_archive", "Mailchimp web archive", "newsletter", "mailchimp", "https://us20.campaign-archive.com/?u=abc&id=def", "https://us20.campaign-archive.com/?u=xyz&id=ghi", "archive", "archive"],

  // ============ Social / microblog — 5 ============
  ["mastodon_social", "Mastodon post", "social", "mastodon", "https://mastodon.social/@Mastodon/112345678901234567", "https://hachyderm.io/@example/112345678909876543", "post", "post"],
  ["bsky_app", "Bluesky post", "social", "bluesky", "https://bsky.app/profile/jay.bsky.team/post/3kabc123def", "https://bsky.app/profile/pfrazee.com/post/3kxyz456ghi", "post", "post"],
  ["threads_net", "Threads post", "social", "threads", "https://www.threads.net/@mosseri/post/C1234567890", "https://www.threads.net/@zuck/post/C9876543210", "post", "post"],
  ["linkedin_com_pulse", "LinkedIn article", "social", "linkedin", "https://www.linkedin.com/pulse/example-article-jane-doe-abc123/", "https://www.linkedin.com/pulse/example-two-john-smith-def456/", "article", "article"],
  ["x_com_article", "X (Twitter) long post", "social", "x", "https://x.com/elonmusk/status/1234567890123456789", "https://x.com/paulg/status/1876543210987654321", "post", "post"],

  // ============ Video/podcast show pages — 5 ============
  ["youtube_com_watch", "YouTube watch page", "video", "custom", "https://www.youtube.com/watch?v=dQw4w9WgXcQ", "https://www.youtube.com/watch?v=jNQXAC9IVRw", "watch page", "watch page"],
  ["podcasts_apple_com", "Apple Podcasts episode", "video", "custom", "https://podcasts.apple.com/us/podcast/example/id123456789?i=1000654321987", "https://podcasts.apple.com/us/podcast/example/id987654321?i=1000123456789", "episode", "episode"],
  ["spotify_com_episode", "Spotify episode", "video", "custom", "https://open.spotify.com/episode/abc123def456ghi789", "https://open.spotify.com/episode/xyz987wvu654tsr321", "episode", "episode"],
  ["transistor_fm_episode", "Transistor podcast page", "video", "transistor", "https://share.transistor.fm/s/abc12345", "https://share.transistor.fm/s/def67890", "transcript", "transcript"],
  ["overcast_fm", "Overcast episode", "video", "overcast", "https://overcast.fm/+ABCDEFGHIJ", "https://overcast.fm/+KLMNOPQRST", "page", "page"],

  // ============ Government / legal — 5 ============
  ["whitehouse_gov", "White House briefing", "government", "wordpress-vip", "https://www.whitehouse.gov/briefing-room/statements-releases/2024/11/06/example/", "https://www.whitehouse.gov/briefing-room/speeches-remarks/2024/05/15/example/", "statement", "remarks"],
  ["supremecourt_gov", "Supreme Court opinion", "government", "static-html", "https://www.supremecourt.gov/opinions/23pdf/22-1219_c07d.pdf", "https://www.supremecourt.gov/opinions/23pdf/22-500_abc.pdf", "opinion PDF (HTML landing)", "opinion"],
  ["eur_lex_europa_eu", "EUR-Lex", "government", "custom", "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32016R0679", "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32022R2065", "regulation", "regulation"],
  ["gov_uk", "GOV.UK article", "government", "custom", "https://www.gov.uk/guidance/coronavirus-covid-19", "https://www.gov.uk/government/news/example-announcement", "guidance", "announcement"],
  ["sec_gov", "SEC filing landing", "government", "custom", "https://www.sec.gov/Archives/edgar/data/320193/000032019324000123/aapl-20240928.htm", "https://www.sec.gov/news/press-release/2024-123", "10-K (HTML)", "press release"],

  // ============ Corporate blogs / release notes — 5 ============
  ["apple_com_newsroom", "Apple Newsroom", "corp-blog", "custom", "https://www.apple.com/newsroom/2024/09/apple-introduces-iphone-16-and-iphone-16-plus/", "https://www.apple.com/newsroom/2024/06/apple-intelligence/", "press release", "press release"],
  ["openai_com_blog", "OpenAI blog", "corp-blog", "custom", "https://openai.com/index/hello-gpt-4o/", "https://openai.com/index/sora/", "blog", "blog"],
  ["stripe_com_blog", "Stripe blog", "corp-blog", "custom", "https://stripe.com/blog/example-post-2024", "https://stripe.com/blog/example-two-2024", "blog", "blog"],
  ["github_blog", "GitHub blog", "corp-blog", "wordpress-vip", "https://github.blog/2024-05-example-post/", "https://github.blog/changelog/2024-11-example/", "blog", "changelog"],
  ["anthropic_com_news", "Anthropic news", "corp-blog", "custom", "https://www.anthropic.com/news/claude-3-5-sonnet", "https://www.anthropic.com/research/example-paper", "announcement", "research"],

  // ============ Notion/Confluence/GitBook — 5 ============
  ["notion_so_public", "Public Notion page", "docs-public", "notion", "https://www.notion.so/Public-example-page-abc123def456", "https://www.notion.so/notion/Notion-Help-Center-example", "public page", "help"],
  ["confluence_cloud", "Confluence Cloud public", "docs-public", "confluence", "https://example.atlassian.net/wiki/spaces/EX/pages/123456/Example", "https://example.atlassian.net/wiki/spaces/EX/pages/654321/Example-Two", "page", "page"],
  ["gitbook_io", "GitBook space", "docs-public", "gitbook", "https://docs.gitbook.com/getting-started/overview", "https://docs.gitbook.com/integrations/overview", "overview", "overview"],
  ["readthedocs_io", "Read the Docs", "docs-public", "sphinx", "https://requests.readthedocs.io/en/latest/user/quickstart/", "https://flask.palletsprojects.com/en/stable/quickstart/", "quickstart", "quickstart"],
  ["obsidian_publish", "Obsidian Publish site", "docs-public", "obsidian", "https://publish.obsidian.md/help/Start+here", "https://publish.obsidian.md/help/Getting+started/Create+your+first+note", "help", "help"],
];

// Sanity check
if (SITES.length !== 200) {
  console.error(`Expected 200 sites, got ${SITES.length}`);
  process.exit(1);
}

const manifest = {
  version: 1,
  generated_at: new Date().toISOString().slice(0, 10),
  total_sites: SITES.length,
  total_pages: SITES.length * 2,
  categories: [...new Set(SITES.map((s) => s[2]))].sort(),
  sites: SITES.map(([slug, name, category, cms, url1, url2, note1, note2]) => ({
    slug,
    name,
    category,
    cms,
    pages: [
      { id: "article-1", url: url1, note: note1 || "" },
      { id: "article-2", url: url2, note: note2 || "" },
    ],
  })),
};

mkdirSync(ROOT, { recursive: true });
writeFileSync(join(ROOT, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");

// Also emit per-site site.json stubs so the fetch step can populate them
for (const site of manifest.sites) {
  const dir = join(ROOT, "sites", site.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(
    join(dir, "site.json"),
    JSON.stringify(
      { name: site.name, category: site.category, cms: site.cms, slug: site.slug },
      null,
      2,
    ) + "\n",
  );
  for (const page of site.pages) {
    mkdirSync(join(dir, page.id), { recursive: true });
  }
}

console.log(`Wrote manifest.json with ${manifest.total_sites} sites and ${manifest.total_pages} pages.`);
console.log(`Categories (${manifest.categories.length}):`, manifest.categories.join(", "));
