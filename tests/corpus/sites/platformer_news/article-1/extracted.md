_This is a column about AI. My boyfriend works at Anthropic. See_ _my full ethics disclosure here__._

**I.**

One of my chief biases as a tech journalist is that I like trying new software. Show me a promising new tool and I will, at the drop of a hat, give my entire inbox and calendar over to it. Over time I have begun to rein in this tendency, recognizing that I typically lose more time to so-called productivity tools than I gain from them. And yet still, whenever I read about some groundbreaking widget, I find myself reaching to download it. 

And so last week, when I read a piece titled “Clawdbot Showed Me What the Future of Personal AI Assistants Looks Like,” I knew I was in trouble. The article, written by the great Federico Viticci at _MacStories_, described an open-source, locally running artificial intelligence that connected to all the most important services in his life. He spoke to it via voice notes and Telegram, and used it to replace (for free) automations that he previously paid for on Zapier. If he could imagine it, Viticci wrote, there was a good chance the tool — then called Clawdbot — could build it. It made him wonder what future apps would even have once AI became sufficiently powerful. 

Viticci wrote:

> Clawdbot is a boutique, nerdy project right now, but consider it as an underlying trend going forward: when the major consumer LLMs become smart and intuitive enough to adapt to you on-demand for any given functionality – when you’ll eventually be able to ask Claude or ChatGPT to do or create anything on your computer with no Terminal UI – what will become of “apps” created by professional developers? I especially worry about standalone utility apps: if Clawdbot can create a virtual remote for my LG television (something I did) or give me a personalized report with voice every morning (another cron job I set up) that work exactly the way I want, why should I even bother going to the App Store to look for pre-built solutions made by someone else? What happens to Shortcuts when any “automation” I may want to carefully create is actually just a text message to a digital assistant away? 

These are excellent questions. The more I have been using Claude Code, the more I have found myself wondering the same things. For the moment, Claude Code has several limitations that prevent it from taking over the computer in the way that Viticci describes. And yet, reading about Clawdbot, I became curious whether that future might be closer than I imagined.

And so last Saturday, I visited the website for Clawdbot.

In many ways, Clawdbot resembled Claude Code. The resemblance was close enough that Anthropic asked its solo developer, Peter Steinberger, to change the name. Thus Clawdbot is now Moltbot; I’ll refer to it as such throughout the rest of this article.

Like Claude Code, Moltbot is installed via a terminal command and can then interact with the large language model of your choice. (You have to bring your own API key; I plugged in keys from Anthropic, OpenAI and Google to enable various different features.) Also like Claude, Moltbot can generate text and write code.  

But Moltbot differs from a normal LLM in a handful of ways I found appealing. 

One, it runs locally on your machine. (In my case, a 2024 M4 MacBook Pro.) Messages get sent to the AI providers, of course. But the core infrastructure, which handles Moltbot’s memory, scripts and other tools, stays on your computer.

Two, you can add it to the messaging app of your choice: Telegram, Discord, Slack and Signal among them. This is nice for several reasons, one of them being that it makes it easy to message Moltbot from your phone.

And three, Moltbot promised to have a persistent memory. Claude Code forgets much of what happens in any given session, and must constantly be reminded. Moltbot creates a series of daily notes about your interactions that it can load into the LLM’s context window, allegedly giving it improved recall compared to a standard command-line tool.

Over on YouTube, recommendations led me to several hypebeasts who promised me that Moltbot would do much more. Creators on X and YouTube said they had bought Mac minis to allow the tool then known as Clawdbot to run continuously. “Clawdbot is the most powerful AI tool I’ve ever used in my life,” read the title of a representative video from Alex Finn, who assured me that Moltbot would serve as my “24/7 AI employee.” Another creator promised to tell me “How I use Clawdbot to Run My Business and Life 24/7.” 

By the end of the weekend, Best Buy had sold out of Mac minis in San Francisco. 

I was convinced. I installed Moltbot with that single command, and onboarding proved refreshingly simple. (It was, in hindsight, the high-water mark of my time with the tool.)

Within 10 minutes or so, I had wired up Moltbot to many of the core systems I use in my life: an email account, my calendar, Notion, Todoist, and Capacities, among others. Once that was working, I set about working on the project that would come to define the week I spent with Moltbot: a highly personalized morning briefing that would bring together all the strands of my life into a single place. 

**II.**   

I realize this project sounds kind of boring. 

But one, it offered me a chance to see what Moltbot could do with all of those services I had stitched together. Two, if it worked, I would create something unique to me that I wouldn’t have been able to build myself.

And finally — which I realized only at the end of the process — the specific ways in which it broke persuaded me to uninstall Moltbot from my computer.
