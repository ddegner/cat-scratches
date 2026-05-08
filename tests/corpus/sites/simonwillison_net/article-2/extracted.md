21st March 2026

Here’s a mildly dystopian prompt I’ve been experimenting with recently: “Profile this user”, accompanied by a copy of their last 1,000 comments on Hacker News.

Obtaining those comments is easy. The Algolia Hacker News API supports listing comments sorted by date that have a specific tag, and the author of a comment is tagged there as `author_username`. Here’s a JSON feed of my (`simonw`) most recent comments, for example:

https://hn.algolia.com/api/v1/search\_by\_date?tags=comment,author\_simonw&hitsPerPage=1000

The Algolia API is served with open CORS headers, which means you can access the API from JavaScript running on any web page.

Last August I had ChatGPT build me a simple tool for hitting that API for any user which fetches their comments and gives me a mobile-friendly “copy to clipboard” button. I’ve since tweaked it a few times with Claude.

I can then paste the whole lot into any LLM—these days I mostly use Claude Opus 4.6 for this—and prompt “profile this user” to see what it can figure out.

It’s startlingly effective! It feels invasive to quote the profile of another user here, so I’ll show you what it produces for me:

> This is **Simon Willison** — a prolific, independent software developer, blogger, and one of the most visible voices in the AI-assisted coding space. Here’s a profile drawn from his comments:
> 
> **Professional identity:** Independent developer and writer. Co-creator of Django, creator of Datasette and many other open source tools. On the board of the Python Software Foundation. Runs a heavily-trafficked personal blog at simonwillison.net with multiple content types (entries, link blog, notes, quotations). Monetizes through GitHub sponsors, ethical ads, and occasional consulting — not through any AI company payroll, a point he defends frequently.
> 
> **Core thesis on AI coding:** He’s the leading evangelist for what he calls “agentic engineering” — using coding agents (Claude Code, Codex CLI) as productivity multipliers for skilled developers. His central argument: LLMs don’t replace programmers, they amplify existing expertise. He’s writing a guide/book on this at simonwillison.net/guides. He insists these tools are deceptively difficult to use well, and that most people who report bad results simply haven’t learned the craft yet.
> 
> **Working style:** He does most of his programming from his iPhone via Claude Code for web, often while riding BART, walking the dog, or sitting in the garden. He embraces “YOLO mode” (auto-approving agent actions) and frequently runs 2-3 agent sessions in parallel. He starts every session with “run uv run pytest” to anchor the agent in TDD. He’s on the $200/month Claude Max plan.
> 
> **Key technical interests:** Sandboxing and security (WebAssembly, Pyodide, sandbox-exec, Firecracker), SQLite (deeply), Python packaging and tooling (uv, PyPI distribution tricks), browser-in-a-browser experiments (v86, WASM Linux), and local LLM inference. He’s been learning Go “by osmosis” through coding agents.
> 
> **Security consciousness:** He coined the term “prompt injection” and the “lethal trifecta” (access to private data + exposure to untrusted input + ability to take actions). He’s genuinely alarmed about OpenClaw/Clawdbot security risks and has been predicting a headline-grabbing prompt injection attack “in the next six months” for over two years — acknowledging it keeps not happening while insisting the risk is real. He references the “normalization of deviance” pattern frequently.
> 
> **Personality and debate style:** Energetic, combative when challenged, but generally good-natured. He engages heavily in HN comment threads — sometimes dozens of replies in a single discussion. He’s transparent about his biases and maintains a public disclosures page. He pushes back hard against what he sees as motivated reasoning from AI skeptics, but also against AGI hype (“I refer to that as the science fiction version of AI”). He gets visibly frustrated by sock-puppet accounts and bad-faith criticism. He has a self-deprecating streak (“my stupid pelican benchmark”).
> 
> **Recurring themes across hundreds of comments:**
> 
> * “Two things can be true at the same time” — he holds nuanced positions
> * Tests are for productivity, not just quality
> * The November 2025 model releases (Opus 4.5, GPT-5.2) were a genuine inflection point
> * Code review is the biggest bottleneck in agent-assisted workflows
> * “Cognitive debt” is a real and unsolved problem
> * The best engineering practices (tests, docs, CI/CD, clean code) also make agents work better
> * He’s deliberately trying to “teach people good software engineering while tricking them into thinking the book is about AI”
> 
> **Personal interests mentioned:** Niche museums (runs niche-museums.com), New Zealand kākāpō parrots, cooking food from countries he’s never visited, chickens in his garden. Lives in Half Moon Bay, CA near a major pelican roost. The pelican-on-a-bicycle SVG test is his signature LLM benchmark.
> 
> **In a sentence:** A deeply experienced, independently-minded developer who’s genuinely excited about AI coding tools, fights hard against both uncritical hype and reflexive dismissal, and is trying to professionalize how the industry uses these tools — while also worrying loudly about the security implications almost nobody else takes seriously enough.

This all checks out! I ran this in Claude incognito mode to hopefully prevent Claude from guessing that I was evaluating myself and sycophantically glazing me—the tone of the response it gave here is similar to the tone I’ve seen against other accounts.

I expect it guessed my real name due to my habit of linking to my own writing from some of my comments, which provides plenty of simonwillison.net URLs for it to associate with my public persona. I haven’t seen it take a guess at a real name for any of the other profiles I’ve generated.

It’s a little creepy to be able to derive this much information about someone so easily, even when they’ve shared that freely in a public (and API-available) place.

I mainly use this to check that I’m not getting embroiled in an extensive argument with someone who has a history of arguing in bad faith. Thankfully that’s rarely the case—Hacker News continues to be a responsibly moderated online space.
