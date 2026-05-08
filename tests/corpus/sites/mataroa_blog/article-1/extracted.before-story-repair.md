Naked blogging platform, for minimalists. _Just write._

* **Get your own simple blog in 1 minute** → Sign up

* Hosted in <username>.mataroa.blog or yourdomain.com
* Write your posts in markdown

* View example post / example blog

## Features

* Never ads. Zero tracking

* No cookies for analytics or tracking
* No email required for signup

* No platform lock-in

* Export blog anytime
* Monthly auto-exports via email
* Redirect to new domain

* Custom domain (premium feature)
* Image hosting
* Subscriptions

* via RSS
* via Email (newsletter)

* Also:

* Analytics (backend based)
* API
* Import text/markdown files
* Export as epub book format
* Post by email (premium feature)

* 100% Affero GPL free software
* Business Transparency

## Pricing

* Free — most features

* No custom domain
* No post by email

* Premium — all features

* $9/year
* 5% of revenue funds CO₂ removal

## Philosophy

I care about text. I like words, and their meaning, and arguments and stories, and things like typography, and fonts. I don't like visual congestion, or digital waste, or needless complexity.

Blogging is beautiful. It's about sharing opinions on the web about anything, with one's own idea of aesthetics, however weird it is—or rather, _especially_ because of how weird it is.

But, lately, blogging is in a bad place. It's bedridden with trashy ads, and barbaric tracking, and ugly complexity.

Mataroa is not like that. We built it to be about writing and writing only. We do one thing and that is text. Here, one will find no social networks or obtrusive subscribe-popups.

Here, one will notice a focus on writing regardless of how much something will be read. Not being read can be demotivating, especially when one is starting to write. But it shouldn't be. We recommend that one does not look into analytics. It's mostly fuel for ego.

> “What I’m really concerned about is reaching one person. And that person may be myself for all I know.” 
> — Jorge Luis Borges

When starting a blog, there is a dizzying amount of platforms to choose from. If you know what you want, go with that. **But, if you're not exactly happy with the well-established choices and you want to try something new, try mataroa. We aim to be that breath of fresh air.**

Nota bene, though: we don't offer themes, or other bells and whistles. We just show text in a simple way. You pay us money ($9 per year), to keep doing that.

What we respect the most is that these are your words. If you decide to take them and leave, we can help. Especially, if you decide to self-host your blog. We provide tools, such as export to Zola or Hugo source files, and we can also redirect to your new domain.

That is all—we hope you enjoy using mataroa and find it useful for putting down your System 2 thoughts into words.

— Theodore

## FAQ

Do you support custom CSS?

No. The philosophy of mataroa is to be as minimal as possible without enabling too many decisions about styling. Sorry! :)

Check out bearblog.dev, a minimalist blogging platform that supports custom CSS.

Can I upload images on my mataroa blog?

Yes. Even though mataroa is a text-focused platform, we do offer some support for image hosting. See our images guide for more details.

Can I self-host mataroa?

Yes. The project is open source and you can find deployment documentation in the README.

Can I have my own mataroa-like platform?

Sure thing. Feel free to use our open source code as a starting point. Here are two examples that we like:

* https://github.com/capivarasdev/mataroa
* https://github.com/linuxgoose/bocpress

Why should I use mataroa instead of Substack/WordPress/etc?

Mataroa follows a minimalist philosophy. It's fast, simple, and prioritises the essence, the text content, over fancy features. The platform is based on a design philosophy of minimalism with strong data interoperability. You own your data and you can export it easily as well.

However, different platforms are optimised for different use cases. Have a look at our comparison table, which may help you decide what’s important to you.

Will you add themes?

We are not interested in adding features that give more options to users. It's part of our philosophy to enable one to just write, without giving options for design, colours, or layouts. We understand that's not what everyone wants but we want to cater to people that either struggle with writing and don’t want too many distractions, or to people who want a minimal blog :)

Can I add a custom favicon?

No, we don't support custom favicons. Such a feature would allow the blog author to spend a lot of time figuring out what image they want to use as a favicon, which is the opposite of a writing place without distractions.

What about tags or categories?

We think tags are too complicated of a feature for the simpleton mataroa wants to be.

What about pagination? What if one writes a heap of entries?

If one writes even thousands of blog posts, they will still appear on one singular page. There is no plan to have something like "older posts" or a "most recent" section. This is something that was intentionally designed as such from the beginning. The reason is simplicity and has multiple facets:

1. By only displaying the article titles in the main blog page, readers can scan and choose what to read with ease.
2. A single page allows users to search using the native browser search functionality, which is both flexible and extremely fast.
3. By displaying the whole list of articles in the main blog page, users can gauge the whole extent and size of a blog, along with when these articles were written and published.
4. There are no issues with speed, everything remains fast, even in blogs with a few thousand posts (we have some of those) as mataroa is optimised for such cases.

What markdown implementation does mataroa use?

We use the Python-Markdown library, which implements the original markdown syntax defined by John Gruber’s spec with the additions of code highlighting, tables, and footnotes.

Would you consider a rich editor option?

We think a rich editor is too much for mataroa. For example, a rich editor implementation such as Trix, does looks pretty cool yet the complexity is too high with 200K of JavaScript code. Saving HTML in the database instead of simple text is also an annoyance.

Would you add support for LaTeX-style math expressions?

We have considered this feature. We don't want to add a JavaScript library to handle this on the frontend. At the same time, we use markdown and mixing that with LaTeX breaks some of the existing blog posts' rendering, which we would be very reluctant to allow. We may revisit this work in the future if a better solution comes up.

What about supporting Mermaid flowcharts?

We would not add mermaid-js as it is 2.7MB minified JavaScript which is excessive for mataroa. Yet, we would be interested in implementing something similar if it was rendered on the backend.

Do you support ActivityPub Federation?

No, but we would like to. This is unplanned work that might happen at some point in the future. We are open to contributions.

Do you support Bluesky/ATProto?

No, but we would also like to. This is unplanned work that might happen at some point in the future. We are open to contributions.

Can I integrate my mataroa blog with Google Analytics?

No, we don't offer such functionality. Mataroa is designed as a minimal platform that has few features so that authors focus on content and writing rather than obsessing over analytics or SEO.

What kind of limits does mataroa have?

Technical limits:

* 20 TB bandwidth per month. This is about ~2 billion page visits on a 1000-word blog post, which is doubtful anyone can reach it.
* Images limits: Max file size 1MB, image size for all images per account 100MB, total number of images 1000, bandwidth 100GB per year.
* Soft limit of newsletter subscribers is 15,000 email addresses. We may introduce a new plan if any user crosses that in the future because at that number the cost of sending emails may go up.
* Soft limit of blog posts is 10,000. We may introduce a new plan if a user crosses that in the future.

Can I block AI scrapers from accessing my mataroa blog?

This is not something we currently offer but may add in the future. The problem is that it’s hard to do this in a reliable way we'd rather not add something that works only half of the time.

We classify blocking AI scrapers into three main categories.

1. robots.txt (check Cloudflare's AI-related docs)
2. JavaScript proof-of-work + heuristics (Anubis, go-away, and descendants)
3. Cloudflare AI Crawl Control

robots.txt doesn’t block AI scrapers by itself. Companies have to intentionally read it and follow its rules. Reputable companies that are scrutinized by everyone adhere to these rules; new companies might not. More importantly, we can’t know if they follow a website’s robots.txt rules.

The second category of tools works by assuming that an AI scraper will not spend a lot of computation power per website crawl. So, these tools add a JavaScript-based computational challenge, which adds an almost negligible couple of seconds of waiting time for a normal human user, which is an amount of time prohibitive for a robot that plans to crawl million of websites.

The third category is by Cloudflare, a company through which ~20% of all web traffic passes through. It’s probably the most effective solution yet they too report observing AI companies to attempt (and succeed) at circumventing their checks.

At the end of the day, the feat itself (blocking some requests but not others) is incompatible with how the internet and the web were designed, and thus cannot be done 100% effectively.

Do you support comments?

Mataroa has support for simple comments per blog post. The comment form is designed to be flexible to the comment author, however, due to the the principled lack of external dependencies in mataroa, there support for preventing spam comments is limited. This means that for every comment posted, we allow the blog author to accept (allow it show) or reject (delete) it.

When to choose Substack over Mataroa?

Substack is an amazing platform in which a lot of independent writers have found freedom through the reader subscription model.

If you publish a few articles per week, consider Substack for both its discoverability features and capability to get paid by your readers.

Why is Mataroa like this?

We want to nurture a text-heavy corner in the web in which pictures that don't add real value to the words are omitted. We strive for industry-leading UX with interface speed as its most important component.

How sustainable is Mataroa, really?

There is strong motivation to build a sustainable setup and future for Mataroa. In a software business, this is both about the health and quality of the code and also about the sustainability of the business.

In terms of the technical side: most of the features were developed in 2020 and the project has been actively maintained ever since. This includes updating libraries, integrating potential improvements, and, of course, security bugfixes.

In terms of business sustainability side: we currently have 200+ premium paying users which brings us to >$100 monthly revenue. This is more than our monthly costs, which are around €40. Learn more on our business transparency page: mataroa.blog/about/transparency/

The plan is to keep hosting and maintaining Mataroa for the long term, however it should be noted that the Mataroa team is currently one person. There are some backup people for emergencies, however it is one person with the understanding of the whole system and access to everything. This sets the bus factor to 1, which is not good. Death or severe illness are possible, at which point Mataroa will keep running, maybe indefinitely, as long as monthly payments continue from the business bank account, however at such a moment its outlook will be severely limited.

As of now, there is no solution to this as of, however there is a plan to find a person or people who can continue maintaining Mataroa for the longer term. The goal is to make this happen by Mataroa's 10th anniversary, which is in 2030. Assuming this will happen successfully, guarantees about Mataroa beyond such a point cannot be given. This is also the case for possibilities such as internet collapse or other major world event that will affect societies at a large scale.

Finally, it should be clearly noted that major blog platform companies such as WordPress and Substack have more chances of being alive in 10 years than Mataroa purely because of being more popular and profitable, both great properties for sustainability.
