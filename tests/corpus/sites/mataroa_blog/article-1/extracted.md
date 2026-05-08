Given mataroa’s somewhat polemic platform methodology in defense of an independent web, some people have reached out to ask: Why doesn't mataroa block AI scrapers?

Blocking AI scrapers, crawlers, and LLM models in general is something we do not currently offer but may add in the future. The problem is that it’s hard to do this in a reliable way we'd rather not add something that works only half of the time.

We classify blocking AI scrapers into three main categories:

1. robots.txt (check Cloudflare's AI-related robots.txt docs too)
2. JavaScript proof-of-work + heuristics (Anubis, go-away, and descendants)
3. Cloudflare AI Crawl Control

Each has its own limitations but they all share the root of the problem.

Robots.txt doesn’t block AI scrapers by itself. Companies have to intentionally read it and follow its rules. Reputable companies that are scrutinized by everyone adhere to these rules; new companies might not. More importantly, we can’t know if they follow a website’s robots.txt rules.

The second category of tools works by assuming that an AI scraper will not spend a lot of computation power per website crawl. These tools add a JavaScript-based computational challenge, which adds a negligible couple of seconds of waiting time for a normal human user, which is an amount of time prohibitive for a robot that plans to crawl millions of websites. However, a robot may spend more time in a certain website that has been targeted, if it or its operator so desire.

The third category is by Cloudflare, a company through which ~20% of all web traffic passes through. It’s probably the most effective solution yet they too report observing AI companies to attempt (and succeed) at circumventing their checks. Additionally, we are reluctant to adopt a dependency to Cloudflare, one of the companies that contribute to the centralisation of the web.

At the end of the day, the feat itself (blocking some requests but not others) is in tension with how the internet and the web were designed. This is yet another mark of what is already common knowledge: our needs have outgrown the design of decades-old protocols.

> La crisi consiste appunto nel fatto che il vecchio muore e il nuovo non può nascere: in questo interregno si verificano i fenomeni morbosi piú svariati. 
> — Antonio Gramsci, _Quaderni del carcere_, Quaderno 3, §34, c. 1930.
