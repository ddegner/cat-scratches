If I ask myself a question like "I'd like to buy an SD card; who do I trust to sell me a real SD card and not some fake, Amazon or my local Best Buy?", of course the answer is that I trust my local Best Buy1 more than Amazon, which is notorious for selling counterfeit SD cards. And if I ask who do I trust more, my local reputable electronics shop (Memory Express, B&H Photo, etc.), I trust my local reputable electronics shop more. Not only are they less likely to sell me a counterfeit than Best Buy, in the event that they do sell me a counterfeit, the service is likely to be better.

Similarly, let's say I ask myself a question like, "on which platform do I get a higher rate of scams, spam, fraudulent content, etc., \[smaller platform\] or \[larger platform\]"? Generally the answer is \[larger platform\]. Of course, there are more total small platforms out there and they're higher variance, so I could deliberately use a smaller platform that's worse, but I'm choosing good options instead of bad options, in every size class, the smaller platform is generally better. For example, with Signal vs. WhatsApp, I've literally never received a spam Signal message, whereas I get spam WhatsApp messages somewhat regularly. Or if I compare places I might read tech content on, if I compare tiny forums no one's heard of to lobste.rs, lobste.rs has a very slightly higher rate (rate as in fraction of messages I see, not absolute message volume) of bad content because it's zero on the private forums and very low but non-zero on lobste.rs. And then if I compare lobste.rs to a somewhat larger platform, like Hacker News or mastodon.social, those have (again very slightly) higher rates of scam/spam/fraudulent content. And then if I compare that to mid-sized social media platforms, like reddit, reddit has a significantly higher and noticeable rate of bad content. And then if I can compare reddit to the huge platforms like YouTube, Facebook, Google search results, these larger platforms have an even higher rate of scams/spam/fraudulent content. And, as with the SD card example, the odds of getting decent support go down as the platform size goes up as well. In the event of an incorrect suspension or ban from the platform, the odds of an account getting reinstated get worse as the platform gets larger.

I don't think it's controversial to say that in general, a lot of things get worse as platforms get bigger. For example, when I ran a Twitter poll to see what people I'm loosely connected to think, only 2.6% thought that huge company platforms have the best moderation and spam/fraud filtering. For reference, in one poll, 9% of Americans said that vaccines implant a microchip and and 12% said the moon landing was fake. These are different populations but it seems random Americans are more likely to say that the moon landing was faked than tech people are likely to say that the largest companies have the best anti-fraud/anti-spam/moderation.

However, over the past five years, I've noticed an increasingly large number of people make the opposite claim, that only large companies can do decent moderation, spam filtering, fraud (and counterfeit) detection, etc. We looked at one example of this when we examined search results, where a Google engineer said

> Somebody tried argue that if the search space were more competitive, with lots of little providers instead of like three big ones, then somehow it would be \*more\* resistant to ML-based SEO abuse.
> 
> And... look, if \*google\* can't currently keep up with it, how will Little Mr. 5% Market Share do it?

And a thought leader responded

> like 95% of the time, when someone claims that some small, independent company can do something hard better than the market leader can, it’s just cope. economies of scale work pretty well!

But when we looked at the actual results, it turned out that, of the search engines we looked at, Mr 0.0001% Market Share was the most resistant to SEO abuse (and fairly good), Mr 0.001% was a bit resistant to SEO abuse, and Google and Bing were just flooded with SEO abuse, frequently funneling people directly to various kinds of scams. Something similar happens with email, where I commonly hear that it's impossible to manage your own email due to the spam burden, but people do it all the time and often have similar or better results than Gmail, with the main problem being interacting with big company mail servers which incorrectly ban their little email server.

I started seeing a lot of comments claiming that you need scale to do moderation, anti-spam, anti-fraud, etc., around the time Zuckerberg, in response to Elizabeth Warren calling for the breakup of big tech companies, claimed that breaking up tech companies would make content moderation issues substantially worse, saying:

> It’s just that breaking up these companies, whether it’s Facebook or Google or Amazon, is not actually going to solve the issues,” Zuckerberg said “And, you know, it doesn’t make election interference less likely. It makes it more likely because now the companies can’t coordinate and work together. It doesn’t make any of the hate speech or issues like that less likely. It makes it more likely because now ... all the processes that we’re putting in place and investing in, now we’re more fragmented
> 
> It’s why Twitter can’t do as good of a job as we can. I mean, they face, qualitatively, the same types of issues. But they can’t put in the investment. Our investment on safety is bigger than the whole revenue of their company. \[laughter\] And yeah, we’re operating on a bigger scale, but it’s not like they face qualitatively different questions. They have all the same types of issues that we do."

The argument is that you need a lot of resources to do good moderation and smaller companies, Twitter sized companies (worth ~$30B at the time), can't marshal the necessary resources to do good moderation. I found this statement quite funny at the time because, pre-Twitter acquisition, I saw a much higher rate of obvious scam content on Facebook than on Twitter. For example, when I clicked through Facebook ads during holiday shopping season, most were scams and, while Twitter had its share of scam ads, it wasn't really in the same league as Facebook. And it's not just me — Arturo Bejar, who designed an early version of Facebook's reporting system and headed up some major trust and safety efforts noticed something similar (see footnote for details)2.

Zuckerberg seems to like the line of reasoning mentioned above, though, as he's made similar arguments elsewhere, such as here, in a statement the same year that Meta's internal docs made the case that they were exposing 100k minors a day to sexual abuse imagery:

> To some degree when I was getting started in my dorm room, we obviously couldn’t have had 10,000 people or 40,000 people doing content moderation then and the AI capacity at that point just didn’t exist to go proactively find a lot of harmful content. At some point along the way, it started to become possible to do more of that as we became a bigger business

The rhetorical sleight of hand here is the assumption that Facebook needed 10k or 40k people doing content moderation when Facebook was getting started in Zuckerberg's dorm room. Services that are larger than dorm-room-Facebook can and do have better moderation than Facebook today with a single moderator, often one who works part time. But as people talk more about pursuing real antitrust action against big tech companies, tech big tech founders and execs have ramped up the anti-antitrust rhetoric, making claims about all sorts of disasters that will befall humanity if the biggest companies are broken up into the size of the biggest tech companies of 2015 or 2010. This kind of reasoning seems to be catching on a bit, as I've seen more and more big company employees state very similar reasoning. We've come a long way since the 1979 IBM training manual which read

> A COMPUTER CAN NEVER BE HELD ACCOUNTABLE
> 
> THEREFORE A COMPUTER MUST NEVER MAKE A MANAGEMENT DECISION

The argument is now, for many critical decisions, it is only computers that can make most of the decisions and the lack of accountability seems to ultimately a feature, not a bug.

But unfortunately for Zuckerberg's argument3, there are at least three major issues in play here where diseconomies of scale dominate. One is that, given material that nearly everyone can agree is bad (such as bitcoin scams, spam for fake pharmaceutical products, fake weather forecasts, adults sending photos of their genitals to children), etc., large platforms do worse than small ones. The second is that, for the user, errors are much more costly and less fixable as companies get bigger because support generally becomes worse. The third is that, as platforms scale up, a larger fraction of users will strongly disagree about what should be allowed on the platform.

With respect to the first, while it's true that big companies have more resources, the cocktail party idea that they'll have the best moderation because they have the most resources is countered by the equally simplistic idea that they'll have the worst moderation because they're the juiciest targets or that they'll have the worst moderation because they'll have worst fragmentation due to the standard diseconomies of scale that occur when you scale up organizations and problem domains. Whether or not the company having more resources or these other factors dominate is too complex to resolve theoretically, but can observe the result empirically. At least at the level of resources that big companies choose to devote to moderation, spam, etc., having the larger target and other problems associated with scale dominate.

While it's true that these companies are wildly profitable and could devote enough resources to significantly reduce this problem, they have chosen not to do this. For example, in the last year before I wrote this sentence, Meta's last-year profit before tax (through December 2023) was $47B. If Meta had a version of the internal vision statement of a power company a friend mine worked for ("Reliable energy, at low cost, for generations.") and operated like that power company did, trying to create a good experience for the user instead of maximizing profit plus creating the metaverse, they could've spent the $50B they spent on the metaverse on moderation platforms and technology and then spent $30k/yr (which would result in a very good income in most countries where moderators are hired today, allowing them to have their pick of who to hire) on 1.6 million additional full-time staffers for things like escalations and support, on the order of one additional moderator or support staffer per few thousand users (and of course diseconomies of scale apply to managing this many people). I'm not saying that Meta or Google should do this, just that whenever someone at big tech company says something like "these systems have to be fully automated because no one could afford to operate manual systems at our scale", what's really being said is more along the lines of "we would not be able to generate as many billions a year in profit if we hired enough competent people to manually review cases our system should flag as ambiguous, so we settle for what we can get without compromising profits".4 One can defend that choice, but it is a choice.

And likewise for claims about advantages of economies of scale. There are areas where economies of scale legitimately make the experience better for users. For example, when we looked at why it's so hard to buy things that work well, we noted that Amazon's economies of scale have enabled them to build out their own package delivery service that is, while flawed, still more reliable than is otherwise available (and this has only improved since they added the ability for users to rate each delivery, which no other major package delivery service has). Similarly, Apple's scale and vertical integration has allowed them to build one of the all-time great performance teams (as measured by normalized performance relative to competitors of the same era), not only wiping the floor with the competition on benchmarks, but also providing a better experience in ways that no one really measured until recently, like device latency. For a more mundane example of economies of scale, crackers and other food that ships well are cheaper on Amazon than in my local grocery store. It's easy to name ways in which economies of scale benefit the user, but this doesn't mean that we should assume that economies of scale dominate diseconomies of scale in all areas. Although it's beyond the scope of this post, if we're going to talk about whether or not users are better off if companies are larger or smaller, we should look at what gets better when companies get bigger and what gets worse, not just assume that everything will get better just because some things get better (or vice versa).

Coming back to the argument that huge companies have the most resources to spend on moderation, spam, anti-fraud, etc., vs. the reality that they choose to spend those resources elsewhere, like dropping $50B on the Metaverse and not hiring 1.6 million moderators and support staff that they could afford to hire, it makes sense to look at how much effort is being expended. Meta's involvement in Myanmar makes for a nice case study because Erin Kissane wrote up a fairly detailed 40,000 word account of what happened. The entirety of what happened is a large and complicated issue (see appendix for more discussion) but, for the main topic of this post, the key components are that there was an issue that most people can generally agree should be among the highest priority moderation and support issues and that, despite repeated, extremely severe and urgent, warnings to Meta staff at various levels (engineers, directors, VPs, execs, etc.), almost no resources were dedicated to the issue while internal documents indicate that only a small fraction of agreed-upon bad content was caught by their systems (on the order of a few percent). I don't think this is unique to Meta and this matches my experience with other large tech companies, both as a user of their products and as an employee.

To pick a smaller scale example, an acquaintance of mine had their Facebook account compromised and it's now being used for bitcoin scams. The person's name is Samantha K. and some scammer is doing enough scamming that they didn't even bother reading her name properly and have been generating very obviously faked photos where someone holds up a sign and explains how "Kamantha" has helped them make tens or hundreds of thousands of dollars. This is a fairly common move for "hackers" to make and someone else I'm connected to on FB reported that this happened to their account and they haven't been able to recover the old account or even get it banned despite the constant stream of obvious scams being posted by the account.

By comparison, on lobste.rs, I've never seen a scam like this and Peter Bhat Harkins, the head mod says that they've never had one that he knows of. On Mastodon, I think I might've seen one once in my feed, replies, or mentions. Of course, Mastodon is big enough that you can find some scams if you go looking for them, but the per-message and per-user rates are low enough that you shouldn't encounter them as a normal user. On Twitter (before the acquisition) or reddit, moderately frequently, perhaps an average of once every few weeks in my normal feed. On Facebook, I see things like this all the time; I get obvious scam consumer good sites every shopping season, and the bitcoin scams, both from ads as well as account takeovers, are year-round. Many people have noted that they don't bother reporting these kinds of scams anymore because they've observed that Facebook doesn't take action on their reports. Meanwhile, Reuven Lerner was banned from running Facebook ads on their courses about Python and Pandas, seemingly because Facebook systems "thought" that Reuven was advertising something to do with animal trading (as opposed to programming). This is the fidelity of moderation and spam control that Zuckerberg says cannot be matched by any smaller company. By the way, I don't mean to pick on Meta in particular; if you'd like examples with a slightly different flavor, you can see the appendix of Google examples for a hundred examples of automated systems going awry at Google.

A reason this comes back to being an empirical question is that all of this talk about how economies of scale allows huge companies to bring more resources to bear on the problem on matters if the company chooses to deploy those resources. There's no theoretical force that makes companies deploy resources in these areas, so we can't reason theoretically. But we can observe that the resources deployed aren't sufficient to match the problems, even in cases where people would generally agree that the problem should very obviously be high priority, such as with Meta in Myanmar. Of course, when it comes to issues where the priority is less obvious, resources are also not deployed there.

On the second issue, support, it's a meme among tech folks that the only way to get support as a user of one of the big platforms is to make a viral social media post or know someone on the inside. This compounds the issue of bad moderation, scam detection, anti-fraud, etc., since those issues could be mitigated if support was good.

Normal support channels are a joke, where you either get a generic form letter rejection, or a kafkaesque nightmare followed by a form letter rejection. For example, when Adrian Black was banned from YouTube for impersonating Adrian Black (to be clear, he was banned for impersonating himself, not someone else with the same name), after appealing, he got a response that read

> unfortunately, there's not more we can do on our end. your account suspension & appeal were very carefully reviewed & the decision is final

In another Google support story, Simon Weber got the runaround from Google support when he was trying to get information he needed to pay his taxes

> accounting data exports for extensions have been broken for me (and I think all extension merchants?) since April 2018 \[this was written on Sept 2020\]. I had to get the NY attorney general to write them a letter before they would actually respond to my support requests so that I could properly file my taxes

There was also the time YouTube kept demonetizing PointCrow's video of eating water with chopsticks (he repeatedly dips chopsticks into water and then drinks the water, very slowly eating a bowl of water).

Despite responding with things like

> we're so sorry about that mistake & the back and fourth \[sic\], we've talked to the team to ensure it doesn't happen again

He would get demonetized again and appeals would start with the standard support response strategy of saying that they took great care in examining the violating under discussion but, unfortunately, the user clearly violated the policy and therefore nothing can be done:

> We have reviewed your appeal ... We reviewed your content carefully, and have confirmed that it violates our violent or graphic content policy ... it's our job to make sure that YouTube is a safe place for all

These are high-profile examples, but of course having a low profile doesn't stop you from getting banned and getting the same basically canned response, like this HN user who was banned for selling a vacuum in FB marketplace. After a number of appeals, he was told

> Unfortunately, your account cannot be reinstated due to violating community guidelines. The review is final

When paid support is optional, people often say you won't have these problems if you pay for support, but people who use Google One paid support or Facebook and Instagram's paid creator support generally report that the paid support is no better than the free support. Products that effectively have paid support built-in aren't necessarily better, either. I know people who've gotten the same kind of runaround you get from free Google support with Google Cloud, even when they're working for companies that have 8 or 9 figure a year Google Cloud spend. In one of many examples, the user was seeing that Google must've been dropping packets and Google support kept insisting that the drops were happening in the customer's datacenter despite packet traces showing that this could not possibly be the case. The last I heard, they gave up on that one, but sometimes when an issue is a total showstopper, someone will call up a buddy of theirs at Google to get support because the standard support is often completely ineffective. And this isn't unique to Google — at another cloud vendor, a former colleague of mine was in the room for a conversation where a very senior engineer was asked to look into an issue where a customer was complaining that they were seeing 100% of packets get dropped for a few seconds at a time, multiple times an hour. The engineer responded with something like "it's the cloud, they should deal with it", before being told they couldn't ignore the issue as usual because the issue was coming from \[VIP customer\] and it was interrupting \[one of the world's largest televised sporting events\]. That one got fixed, but, odds are, you aren't that important, even if you're paying hundreds of millions a year.

And of course this kind of support isn't unique to cloud vendors. For example, there was this time Stripe held $400k from a customer for over a month without explanation, and every request to support got a response that was as ridiculous as the ones we just looked at. The user availed themself of the only reliable Stripe support mechanism, posting to HN and hoping to hit #1 on the front page, which worked, although many commenters said made the usual comments like "Flagged because we are seeing a lot of these on HN, and they seem to be attempts to fraudulently manipulate customer support, rather than genuine stories", with multiple people suggesting or insinuating that the user is doing something illicit or fraudulent, but it turned out that it was an error on Stripe's end, compounded by Stripe's big company support. At one point, the user notes

> While I was writing my HN post I was also on chat with Stripe for over an hour. No new information. They were basically trying to shut down the chat with me until I sent them the HN story and showed that it was getting some traction. Then they started working on my issue again and trying to communicate with more people

And then the issue was fixed the next day.

Although, in principle, as companies become larger, they could leverage their economies of scale to deliver more efficient support, instead, they tend to use their economies of scale to deliver worse, but cheaper and more profitable support. For example, on Google Play store approval support, a Google employee notes:

> a lot of that was outsourced to overseas which resulted in much slower response time. Here stateside we had a lot of metrics in place to fast response. Typically your app would get reviewed the same day. Not sure what it's like now but the managers were incompetent back then even so

And a former FB support person notes:

> The big problem here is the division of labor. Those who spend the most time in the queues have the least input as to policy. Analysts are able to raise issues to QAs who can then raise them to Facebook FTEs. It can take months for issues to be addressed, if they are addressed at all. The worst part is that doing the common sense thing and implementing the spirit of the policy, rather than the letter, can have a negative effect on your quality score. I often think about how there were several months during my tenure when most photographs of mutilated animals were allowed on a platform without a warning screen due to a carelessly worded policy "clarification" and there was nothing we could do about it.

If you've ever wondered why your support person is responding nonsensically, sometimes it's the obvious reason that support has been outsourced to someone making $1/hr (when I looked up the standard rates for one country that a lot of support is outsourced to, a fairly standard rate works out to about $1/hr) who doesn't really speak your language and is reading from a flowchart without understanding anything about the system they're giving support for, but another, less obvious, reason is that the support person may be penalized and eventually fired if they take actions that make sense instead of following the nonsensical flowchart that's in front of them.

Coming back to the "they seem to be attempts to fraudulently manipulate customer support, rather than genuine stories" comment, this is a sentiment I've commonly seen expressed by engineers at companies that mete out arbitrary and capricious bans. I'm sympathetic to how people get here. As I noted before I joined Twitter, commenting on public information

> Turns out twitter is removing ~1M bots/day. Twitter only has ~300M MAU, making the error tolerance v. low. This seems like a really hard problem ... Gmail's spam filter gives me maybe 1 false positive per 1k correctly classified ham ... Regularly wiping the same fraction of real users in a service would be \[bad\].

It is actually true that, if you, an engineer, dig into the support queue at some giant company and look at people appealing bans, almost all of the appeals should be denied. But, my experience from having talked to engineers working on things like anti-fraud systems is that many, and perhaps most, round "almost all" to "all", which is both quantitatively and qualitatively different. Having engineers who work on these systems believe that "all" and not "almost all" of their decisions are correct results in bad experiences for users.

For example, there's a social media company that's famous for incorrectly banning users (at least 10% of people I know have lost an account due to incorrect bans and, if I search for a random person I don't know, there's a good chance I get multiple accounts for them, with some recent one that has a profile that reads "used to be @\[some old account\]", with no forward from the old account to the new one because they're now banned). When I ran into a senior engineer from the team that works on this stuff, I asked him why so many legitimate users get banned and he told me something like "that's not a problem, the real problem is that we don't ban enough accounts. Everyone who's banned deserves it, it's not worth listening to appeals or thinking about them". Of course it's true that most content on every public platform is bad content, spam, etc., so if you have any sort of signal at all on whether or not something is bad content, when you look at it, it's likely to be bad content. But this doesn't mean the converse, that almost no users are banned incorrectly, is true. And if senior people on the team that classifies which content is bad have the attitude that we shouldn't worry about false positives because almost all flagged content is bad, we'll end up with a system that has a large number of false positives. I later asked around to see what had ever been done to reduce false positives in the fraud detection systems and found out that there was no systematic attempt at tracking false positives at all, no way to count cases where employees filed internal tickets to override bad bans, etc.; At the meta level, there was some mechanism to decrease the false negative rate (e.g., someone sees bad content that isn't being caught then adds something to catch more bad content) but, without any sort of tracking of false positives, there was effectively no mechanism to decrease the false positive rate. It's no surprise that this meta system resulted in over 10% of people I know getting incorrect suspensions or bans. And, as Patrick McKenzie says, the optimal rate of false positives isn't zero. But when you have engineers who have the attitude that they've done enough legwork that false positives are impossible, it's basically guaranteed that the false positive rate is higher than optimal. When you combine this with normal big company levels of support, it's a recipe for kafkaesque user experiences.

Another time, I commented on how an announced change in Uber's moderation policy seemed likely to result in false positive bans. An Uber TL immediately took me to task, saying that I was making unwarranted assumptions on how banning works, that Uber engineers go to great lengths to make sure that there are no false positive bans, there's extensive to review to make sure that bans are valid and, in fact, the false positive banning I was concerned about could never happen. And then I got effectively banned due to a false positive in a fraud detection system. I was remind of that incident when Uber incorrectly banned a driver who had to take them to court to even get information on why he was banned, at which point Uber finally actually looked into it (instead of just responding to appeals with fake messages claiming they'd looked into it). Afterwards, Uber responded to a press inquiry with

> We are disappointed that the court did not recognize the robust processes we have in place, including meaningful human review, when making a decision to deactivate a driver’s account due to suspected fraud

Of course, in that driver's case, there was no robust process for review, nor was there a robust appeals process for my case. When I contacted support, they didn't really read my message and made some change that broke my account even worse than before. Luckily, I have enough Twitter followers that some Uber engineers saw my tweet about the issue and got me unbanned, but that's not an option that's available to most people, leading to weird stuff like this Facebook ad targeted at Google employees, from someone desperately seeking help with their Google account.

And even when you know someone on the inside, it's not always easy to get the issue fixed because even if the company's effectiveness doesn't increase as the company gets bigger, the complexity of the systems does increase. A nice example of this is Gergely Orosz's story about when the manager of the payments team left Uber and then got banned from Uber due to some an inscrutable ML anti-fraud algorithm deciding that the former manager of the payments team was committing payments fraud. It took six months of trying to get the problem fixed to mitigate the issue. And, by the way, they never managed to understand what happened and fix the underlying issue; instead, they added the former manager of the payments team to a special whitelist, not fixing the issue for any other user and, presumably, severely reducing or perhaps even entirely removing payment fraud protections for the former manager's account.

No doubt they would've fixed the underlying issue if it were easy to, but as companies scale up, they produce both technical and non-technical bureaucracy that makes systems opaque even to employees.

Another example of that is, at a company that has a ranked social feed, the idea that you could eliminate stuff you didn't want in your ranked feed by adding filters for things like `timeline_injection:false`, `interstitial_ad_op_out`, etc., would go viral. The first time this happened, a number of engineers looked into it and thought that the viral tricks didn't work. They weren't 100% sure and were relying on ideas like "no one can recall a system that would do something like this ever being implemented" and "if you search the codebase for these strings, they don't appear", and "we looked at the systems we think might do this and they don't appear to do this". There was moderate confidence that this trick didn't work, but no one would state with certainty that the trick didn't work because, as at all large companies, the aggregate behavior of the system is beyond human understanding and even parts that could be understood often aren't because there are other priorities.

A few months later, the trick went viral again and people were generally referred to the last investigation when they asked if it was real, except that one person actually tried the trick and reported that it worked. They wrote a slack message about how the trick did work for them, but almost no one noticed that the one person who tried reproducing the trick found that it worked. Later, when the trick would go viral again, people would point to the discussions about how people thought the trick didn't work, with this message noting that it appears to work (almost certainly not by the mechanism that users think, and instead just because having a long list of filters causes something to time out, or something similar) basically got lost because there's too much information to read all of it.

In my social circles, many people have read James Scott's Seeing Like a State, which is subtitled How Certain Schemes to Improve the Human World Have Failed. A key concept from the book is "legibility", what a state can see, and how this distorts what states do. One could easily write a highly analogous book, Seeing like a Tech Company about what's illegible to companies that scale up, at least as companies are run today. A simple example of this is that, in many video games, including ones made by game studios that are part of a $3T company, it's easy to get someone suspended or banned by having a bunch of people report the account for bad behavior. What's legible to the game company is the rate of reports and what's not legible is the player's actual behavior (it could be legible, but the company chooses not to have enough people or skilled enough people examine actual behavior); and many people have reported similar bannings with social media companies. When it comes to things like anti-fraud systems, what's legible to the company tends to be fairly illegible to humans, even humans working on the anti-fraud systems themselves.

Although he wasn't specifically talking about an anti-fraud system, in a Special Master's System, Eugene Zarashaw, a director a Facebook made this comment which illustrates the illegibility of Facebook's own systems:

> It would take multiple teams on the ad side to track down exactly the — where the data flows. I would be surprised if there’s even a single person that can answer that narrow question conclusively

Facebook was unfairly and mostly ignorantly raked over the coals for this statement (we'll discuss that in an appendix), but it is generally true that it's difficult to understand how a system the size of Facebook works.

In principle, companies could augment the legibility of their inscrutable systems by having decently paid support people look into things that might be edge-case issues with severe consequences, where the system is "misunderstanding" what's happening but, in practice, companies pay these support people extremely poorly and hire people who really don't understand what's going on, and then give them instructions which ensure that they generally do not succeed at resolving legibility issues.

One thing that helps the forces of illegibility win at scale is that, as a highly-paid employee of one of these huge companies, it's easy to look at the millions or billions of people (and bots) out there and think of them all as numbers. As the saying goes, "the death of one man is a tragedy. The death of a million is a statistic" and, as we noted, engineers often turn thoughts like "almost all X is fraud" to "all X is fraud, so we might as well just ban everyone who does X and not look at appeals". The culture that modern tech companies have, of looking for scalable solutions at all costs, makes this worse than in other industries even at the same scale, and tech companies also have unprecedented scale.

For example, in response to someone noting that FB Ad Manager claims you can run an ad with a potential reach of 101M people in the U.S. aged 18-34 when the U.S. census had the total population of people aged 18-34 as 76M, the former PM of the ads targeting team responded with

> Think at FB scale

And explained that you can't expect slice & dice queries to work for something like the 18-34 demographic in the U.S. at "FB scale". There's a meme at Google that's used ironically in cases like this, where people will say "I can't count that low". Here's the former PM of FB ads saying, non-ironically, "FB can't count that low" for numbers like 100M. Not only does FB not care about any individual user (unless they're famous), this PM claims they can't be bothered to care that groups of 100M people are tracked accurately.

Coming back to the consequences of poor support, a common response to hearing about people getting incorrectly banned from one of these huge services is "Good! Why would you want to use Uber/Amazon/whatever anyway? They're terrible and no one should use them". I disagree with this line of reasoning. For one thing, why should you decide for that person whether or not they should use a service or what's good for them? For another (and this this is a large enough topic that it should be its own post, so I'll just mention it briefly and link to this lengthier comment from @whitequark) most services that people write off as unnecessary conveniences that you should just do without are actually serious accessibility issues for quite a few people (in absolute, not necessarily, percentage, terms). When we're talking about small businesses, those people can often switch to another business, but with things like Uber and Amazon, there are sometimes zero or one alternatives that offer similar convenience and when there's one, getting banned due to some random system misfiring can happen with the other service as well. For example, in response to many people commenting on how you should just issue a chargeback and get banned from DoorDash when they don't deliver, a disabled user responds:

> I'm disabled. Don't have a driver's license or a car. There isn't a bus stop near my apartment, I actually take paratransit to get to work, but I have to plan that a day ahead. Uber pulls the same shit, so I have to cycle through Uber, Door dash, and GrubHub based on who has coupons and hasn't stolen my money lately. Not everyone can just go pick something up.

Also, when talking about this class of issue, involvement is often not voluntary, such as in the case of this Fujitsu bug that incorrectly put people in prison.

On the third issue, the impossibility of getting people to agree on what constitutes spam, fraud, and other disallowed content, we discussed that in detail here. We saw that, even in a trivial case with a single, uncontroversial, simple, rule, people can't agree on what's allowed. And, as you add more rules or add topics that are controversial or scale up the number of people, it becomes even harder to agree on what should be allowed.

To recap, we looked at three areas where diseconomies of scale make moderation, support, anti-fraud, and anti-spam worse as companies get bigger. The first was that, even in cases where there's broad agreement that something is bad, such as fraud/scam/phishing websites and search, the largest companies with the most sophisticated machine learning can't actually keep up with a single (albeit very skilled) person working on a small search engine. The returns to scammers are much higher if they take on the biggest platforms, resulting in the anti-spam/anti-fraud/etc. problem being extremely non-linearly hard.

To get an idea of the difference in scale, HN "hellbans" spammers and people who post some kinds of vitriolic comments. Most spammers don't seem to realize they're hellbanned and will keep posting for a while, so if you browse the "newest" (submissions) page while logged in, you'll see a steady stream of automatically killed stories from these hellbanned users. While there are quite a few of them, the percentage is generally well under half. When we looked at a "mid-sized" big tech company like Twitter circa 2017, based on the public numbers, if spam bots were hellbanned instead of removed, spam is so much more prevalent that all you'd see if you were able to see it. And, as big companies go, 2017-Twitter isn't that big. As we also noted, the former PM of FB ads targeting explained that numbers as low as 100M are in the "I can't count that low" range, too small to care about; to him, basically a rounding error. The non-linear difference in difficulty is much worse for a company like FB or Google. The non-linearity of the difficulty of this problems is, apparently, more than a match for whatever ML or AI techniques Zuckerberg and other tech execs want to brag about.

In testimony in front of Congress, you'll see execs defend the effectiveness of these systems at scale with comments like "we can identify X with 95% accuracy", a statement that may technically be correct, but seems designed to deliberately mislead an audience that's presumed to be innumerate. If you use, as a frame of reference, things at a personal scale, 95% might sound quite good. Even for something like HN's scale, 95% accurate spam detection that results in an immediate ban might be sort of alright. Anyway, even if it's not great, people who get incorrectly banned can just email Dan Gackle, who will unban them. As we noted when we looked at the numbers, 95% accurate detection at Twitter's scale would be horrible (and, indeed, the majority of DMs I get are obvious spam). Either you have to back off and only ban users in cases where you're extremely confident, or you ban all your users after not too long and, as companies like to handle support, appealing means that you'll get a response saying that "your case was carefully reviewed and we have determined that you've violated our policies. This is final", even for cases where any sort of cursory review would cause a reversal of the ban, like when you ban a user for impersonating themselves. And then at FB's scale, it's even worse and you'll ban all of your users even more quickly, so then you back off and we end up with things like 100k minors a day being exposed to "photos of adult genitalia or other sexually abusive content".

The second area we looked at was support, which tends to get worse as companies get larger. At a high level, it's fair to say that companies don't care to provide decent support (with Amazon being somewhat of an exception here, especially with AWS, but even on the consumer side). Inside the system, there are individuals who care, but if you look at the fraction of resources expended on support vs. growth or even fun/prestige projects, support is an afterthought. Back when deepmind was training a StarCraft AI, it's plausible that Alphabet was spending more money playing Starcraft than on support agents (and, if not, just throw in one or two more big AI training projects and you'll be there, especially if you include the amortized cost of developing custom hardware, etc.).

It's easy to see how little big companies care. All you have to do is contact support and get connected to someone who's paid $1/hr to respond to you in a language they barely know, attempting to help solve a problem they don't understand by walking through some flowchart, or appeal an issue and get told "after careful review, we have determined that you have \[done the opposite of what you actually did\]". In some cases, you don't even need to get that far, like when following Instagram's support instructions results in an infinite loop that takes you back where you started and the "click here if this wasn't you link returns a 404". I've run into an infinite loop like this once, with Verizon, and it persisted for at least six months. I didn't check after that, but I'd bet on it persisting for years. If you had an onboarding or sign-up page that had an issue like this, that would be considered a serious bug that people should prioritize because that impacts growth. But for something like account loss due to scammers taking over accounts, that might get fixed after months or years. Or maybe not.

If you ever talk to people who work in support at a company that really cares about support, it's immediately obvious that they operate completely different from typical big tech company support, in terms of process as well as culture. Another way you can tell that big companies don't care about support is how often big company employees and execs who've never looked into how support is done or could be done will tell you that it's impossible to do better.

When you talk to people who work on support at companies that do actually care about this, it's apparent that it can be done much better. While I was writing this post, I actually did support at a company that does support decently well (for a tech company, adjusted for size, I'd say they're well above 99%-ile), including going through the training and onboarding process for support folks. Executing anything well at scale is non-trivial, so I don't mean to downplay how good their support org is, but the most striking thing to me was how much of the effectiveness of the org naturally followed from caring about providing a good support experience for the user. A full discussion of what that means is too long to include here, so we'll look at this in more detail another time, but one example is that, when we look at how big company support responds, it's often designed to discourage the user from responding ("this review is final") or to justify, putatively to the user, that the company is doing an adequate job ("this was not a purely automated process and each appeal was reviewed by humans in a robust process that ... "). This company's training instructs you to do the opposite of the standard big company "please go away"-style and "we did a great job and have a robust process, therefore complaints are invalid"-style responses. For every anti-pattern you commonly see in support, the training tells you to do the opposite and discusses why the anti-pattern results in a bad user experience. Moreover, the culture has deeply absorbed these ideas (or rather, these ideas come out of the culture) and there are processes for ensuring that people really know what it means to provide good support and follow through on it, support folks have ways to directly talk to the developers who are implementing the product, etc.

If people cared about doing good support, they could talk to people who work in support orgs that are good at helping users or even try working in one before explaining how it's impossible to do better, but this generally isn't done. Their company's support org leadership could do this as well, or do what I did and actually directly work in a support role in an effective support org, but this doesn't happen. If you're a cynic, this all makes sense. In the same way that cynics advise junior employees "big company HR isn't there to help you; their job is to protect the company", a cynic can credibly argue "big company support isn't there to help the user; their job is to protect the company", so of course big companies don't try to understand how companies that are good at supporting users do support because that's not what big company support is for.

The third area we looked at was how it's impossible for people to agree on how a platform should operate and how people's biases mean that people don't understand how difficult a problem this is. For Americans, a prominent case of this are the left and right wing conspiracy theories that pop up every time some bug pseudo-randomly causes any kind of service disruption or banning.

In a tweet, Ryan Greeberg joked:

> Come work at Twitter, where your bugs TODAY can become conspiracy theories of TOMORROW!

In my social circles, people like to make fun of all of the absurd right-wing conspiracy theories that get passed around after some bug causes people to incorrectly get banned, causes the site not to load, etc., or even when some new ML feature correctly takes down a huge network of scam/spam bots, which also happens to reduce the follower count of some users. But of course this isn't unique to the right, and left-wing thought leaders and politicians come up with their own conspiracy theories as well.

Putting all three of these together, worse detection of issues, worse support, and a harder time reaching agreement on policies, we end with the situation we noted at the start where, in a poll of my Twitter followers, people who mostly work in tech and are generally fairly technically savvy, only 2.6% of people thought that the biggest companies were the best at moderation and spam/fraud filtering, so it might seem a bit silly to spend so much time belaboring the point. When you sample the U.S population at large, a larger fraction of people say they believe in conspiracy theories like vaccines putting a microchip in you or that we never landed on the moon, and I don't spend my time explaining why vaccines do not actually put a microchip in you or why it's reasonable to think that we landed on the moon. One reason that would perhaps be reasonable is that I've been watching the "only big companies can handle these issues" rhetoric with concern as it catches on among non-technical people, like regulators, lawmakers, and high-ranking government advisors, who often listen to and then regurgitate nonsense. Maybe next time you run into a lay person who tells you that only the largest companies could possibly handle these issues, you can politely point out that there's very strong consensus the other way among tech folks5.

**If you're a founder or early-stage startup looking for an auth solution, PropelAuth is targeting your use case**. Although they can handle other use cases, they're currently specifically trying to make life easier for pre-launch startups that haven't invested in an auth solution yet. Disclaimer: I'm an investor

_Thanks to Gary Bernhardt, Peter Bhat Harkins, Laurence Tratt, Dan Gackle, Sophia Wisdom, David Turner, Yossi Kreinin, Justin Blank, Ben Cox, Horace He, @borzhemsky, Kevin Burke, Bert Muthalaly, Sasuke, anonymous, Zach Manson, Joachim Schipper, Tony D'Souza, and @GL1zdA for comments/corrections/discussion._

## Appendix: techniques that only work at small scale

This post has focused on the disadvantages of bigness, but we can also flip this around and look at the advantages of smallness.

As mentioned, the best experiences I've had on platforms are a side effect of doing things that don't scale. One thing that can work well is to have a single person, with a single vision, handling the entire site or, when that's too big, a key feature of the site.

I'm on a number of small discords that have good discussion and essentially zero scams, spam, etc. The strategy for this is simple; the owner of the channel reads every message and bans and scammers or spammers who show up. When you get to a bigger site, like lobste.rs, or even bigger like HN, that's too large for someone to read every message (well, this could be done for lobste.rs, but considering that it's a spare-time pursuit for the owner and the volume of messages, it's not reasonable to expect them to read every message in a short timeframe), but there's still a single person who provides the vision for what should happen, even if the sites are large enough that it's not reasonable to literally read every message. The "no vehicles in the park" problem doesn't apply here because a person decides what the policies should be. You might not like those policies, but you're welcome to find another small forum or start your own (and this is actually how lobste.rs got started — under HN's previous moderation regime, which was known for banning people who disagreed with them, Joshua Stein was banned for publicly disagreeing with an HN policy, so Joshua created lobsters (and then eventually handed it off to Peter Bhat Harkins).

There's also this story about craigslist in the early days, as it was just getting big enough to have a serious scam and spam problem

> ... we were stuck at SFO for something like four hours and getting to spend half a workday sitting next to Craig Newmark was pretty awesome.
> 
> I'd heard Craig say in interviews that he was basically just "head of customer service" for Craigslist but I always thought that was a throwaway self-deprecating joke. Like if you ran into Larry Page at Google and he claimed to just be the janitor or guy that picks out the free cereal at Google instead of the cofounder. But sitting next to him, I got a whole new appreciation for what he does. He was going through emails in his inbox, then responding to questions in the craigslist forums, and hopping onto his cellphone about once every ten minutes. Calls were quick and to the point "Hi, this is Craig Newmark from craigslist.org. We are having problems with a customer of your ISP and would like to discuss how we can remedy their bad behavior in our real estate forums". He was literally chasing down forum spammers one by one, sometimes taking five minutes per problem, sometimes it seemed to take half an hour to get spammers dealt with. He was totally engrossed in his work, looking up IP addresses, answering questions best he could, and doing the kind of thankless work I'd never seen anyone else do with so much enthusiasm. By the time we got on our flight he had to shut down and it felt like his giant pile of work got slightly smaller but he was looking forward to attacking it again when we landed.

At some point, if sites grow, they get big enough that a person can't really own every feature and every moderation action on the site, but sites can still get significant value out of having a single person own something that people would normally think is automated. A famous example of this is how the Digg "algorithm" was basically one person:

> What made Digg work really was one guy who was a machine. He would vet all the stories, infiltrate all the SEO networks, and basically keep subverting them to keep the Digg front-page usable. Digg had an algorithm, but it was basically just a simple algorithm that helped this one dude 10x his productivity and keep the quality up.
> 
> Google came to buy Digg, but figured out that really it's just a dude who works 22 hours a day that keeps the quality up, and all that talk of an algorithm was smoke and mirrors to trick the SEO guys into thinking it was something they could game (they could not, which is why front page was so high quality for so many years). Google walked.
> 
> Then the founders realised if they ever wanted to get any serious money out of this thing, they had to fix that. So they developed "real algorithms" that independently attempted to do what this one dude was doing, to surface good/interesting content.
> 
> ...
> 
> It was a total shit-show ... The algorithm to figure out what's cool and what isn't wasn't as good as the dude who worked 22 hours a day, and without his very heavy input, it just basically rehashed all the shit that was popular somewhere else a few days earlier ... Instead of taking this massive slap to the face constructively, the founders doubled-down. And now here we are.
> 
> ...
> 
> Who I am referring to was named Amar (his name is common enough I don't think I'm outing him). He was the SEO whisperer and "algorithm." He was literally like a spy. He would infiltrate the awful groups trying to game the front page and trick them into giving him enough info that he could identify their campaigns early, and kill them. All the while pretending to be an SEO loser like them.

Etsy supposedly used the same strategy as well.

Another class of advantage that small sites have over large ones is that the small site usually doesn't care about being large and can do things that you wouldn't do if you wanted to grow. For example, consider these two comments made in the midst of a large flamewar on HN

> My wife spent years on Twitter embroiled in a very long running and bitter political / rights issue. She was always thoughtful, insightful etc. She'd spend 10 minutes rewording a single tweet to make sure it got the real point across in a way that wasn't inflammatory, and that had a good chance of being persuasive. With 5k followers, I think her most popular tweets might get a few hundred likes. The one time she got drunk and angry, she got thousands of supportive reactions, and her followers increased by a large % overnight. And that scared her. She saw the way "the crowd" was pushing her. Rewarding her for the smell of blood in the water.
> 
> I've turned off both the flags and flamewar detector on this article now, in keeping with the first rule of HN moderation, which is (I'm repeating myself but it's probably worth repeating) that we moderate HN less, not more, when YC or a YC-funded startup is part of a story ... Normally we would never late a ragestorm like this stay on the front page—there's zero intellectual curiosity here, as the comments demonstrate. This kind of thing is obviously off topic for HN: https://news.ycombinator.com/newsguidelines.html. If it weren't, the site would consist of little else. Equally obvious is that this is why HN users are flagging the story. They're not doing anything different than they normally would.

For a social media site, low-quality high-engagement flamebait is one of the main pillars that drive growth. HN, which cares more about discussion quality than growth, tries to detect and suppress these (with exceptions like criticism of HN itself, of YC companies like Stripe, etc., to ensure a lack of bias). Any social media site that aims to grow does the opposite; they implement a ranked feed that puts the content that is most enraging and most engaging in front of the people its algorithms predict will be the most enraged and engaged by it. For example, let's say you're in a country with very high racial/religious/factonal tensions, with regular calls for violence, etc. What's the most engaging content? Well, that would be content calling for the death of your enemies, so you get things a livestream of someone calling for the death of the other faction and then grabbing someone and beating them shown to a lot of people. After all, what's more engaging than a beatdown of your sworn enemy? A theme of Broken Code is that someone will find some harmful content they want to suppress, but then get overruled because that would reduce engagement and growth. HN has no such goal, so it has no problem suppressing or eliminating content that HN deems to be harmful.

Another thing you can do if growth isn't your primary goal is to deliberately make user-signups high friction. HN adds does a little bit of this by having a "login" link but not a "sign up" link, and sites like lobste.rs and metafilter do even more of this.

## Appendix: Theory vs. practice

In the main doc, we noted that big company employees often say that it's impossible to provide better support for theoretical reason X, without ever actually looking into how one provides support or what companies that provide good support do. When the now-$1T were the size where many companies do provide good support, these companies also did not provide good support, so this doesn't seem to come from size since these huge companies didn't even attempt to provide good support, then or now. This theoretical, plausible sounding, reason doesn't really hold up in practice.

This is generally the case for theoretical discussions on disceconomies of scale of large tech companies. Another example is an idea mentioned at the start of this doc, that being a larger target has a larger impact than having more sophisticated ML. A standard extension of this idea that I frequently hear is that big companies actually do have the best anti-spam and anti-fraud, but they're also subject to the most sophisticated attacks. I've seen this used as a justification for why big companies seem to have worst anti-spam and anti-fraud than a forum like HN. While it's likely true that big companies are subject to the most sophisticated attacks, if this whole idea held and it were the case that their systems were really good, it would be harder, in absolute terms, to spam or scam people on reddit and Facebook than on HN, but that's not the case at all.

If you actually try to spam, it's extremely easy to do so on large platforms and the most obvious things you might try will often work. As an experiment, I made a new reddit account and tried to get nonsense onto the front page and found this completely trivial. Similarly it's completely trivial to take over someone's Facebook account and post obvious scams for months to years, with extremely markers that they're scams, many people replying in concern that the account has been taken over and is running scams (unlike working in support and spamming reddit, I didn't try taking over people's Facebook accounts, but given people's password practices, it's very easy to take over an account, and given how Facebook responds to these takeovers when a friend's account is taken over, we can see that attacks that do the most naive thing possible, with zero sophistication, are not defeated), etc. In absolute terms, it's actually more difficult to get spammy or scammy content in front of eyeballs on HN than it is on reddit or Facebook.

The theoretical reason here is one that would be significant if large companies were even remotely close to doing the kind of job they could do with the resources they have, but we're not even close to being there.

To avoid belaboring the point in this already very long document, I've only listed a couple of examples here, but I find this pattern to hold true of almost every counterargument I've heard on this topic. If you actually look into it a bit, these theoretical arguments are classic cocktail party ideas that have little to no connection to reality.

A meta point here is that you absolutely cannot trust vaguely plausible sounding arguments from people on this since they virtually all of them fall apart when examined in practice. It seems quite reasonable to think that a business the size of reddit would have more sophisticated anti-spam systems than HN, which has a single person who both writes the code for the anti-spam systems and does the moderation. But the most naive and simplistic tricks you might use to put content on the front page work on reddit and don't work on HN. I'm not saying you can't defeat HN's system, but doing so would take a little bit of thought, which is not the case for reddit and Facebook. And likewise for support, where once you start talking to people about how to run a support org that's good for users, you immediately see that the most obvious things have not been seriously tried by big tech companies.

## Appendix: How much should we trust journalists' summaries of leaked documents?

Overall, very little. As we discussed when we looked at the Cruise pedestrian accident report, almost every time I read a journalist's take on something (with rare exceptions like Zeynep), the journalist has a spin they're trying to put on the story and the impression you get from reading the story is quite different from the impression you get if you look at the raw source; it's fairly common that there's so much spin that the story says the opposite of what the source docs say. That's one issue.

The full topic here is big enough that it deserves its own document, so we'll just look at two examples. The first is one we briefly looked at, when Eugene Zarashaw, a director at Facebook, testified in a Special Master’s Hearing. He said

> It would take multiple teams on the ad side to track down exactly the — where the data flows. I would be surprised if there’s even a single person that can answer that narrow question conclusively

Eugene's testimony resulted in headlines like , "Facebook Has No Idea What Is Going on With Your Data", "Facebook engineers admit there’s no way to track all the data it collects on you" (with a stock photo of an overwhelmed person in a nest of cables, grabbing their head) and "Facebook Engineers: We Have No Idea Where We Keep All Your Personal Data", etc.

Even without any technical knowledge, any unbiased person can plainly see that these headlines are inaccurate. There's a big difference between it taking work to figure out exactly where all data, direct and derived, for each user exists, and having no idea where the data is. If I Google, logged out with no cookies, `Eugene Zarashaw facebook testimony`, every single above the fold result I get is misleading, false, clickbait, like the above.

For most people with relevant technical knowledge, who understand the kind of systems being discussed, Eugene Zarashaw's quote is not only not egregious, it's mundane, expected, and reasonable.

Despite this lengthy disclaimer, there are a few reasons that I feel comfortable citing Jeff Horwitz's Broken Code as well as a few stories that cover similar ground. The first is that, if you delete all of the references to these accounts, the points in this doc don't really change, just like they wouldn't change if you delete 50% of the user stories mentioned here. The second is that, at least for me, the most key part is the attitudes on display and not the specific numbers. I've seen similar attitudes in companies I've worked for and heard about them inside companies where I'm well connected via my friends and I could substitute similar stories from my friends, but it's nice to be able to use already-public sources instead of using anonymized stories from my friends, so the quotes about attitude are really just a stand-in for other stories which I can verify. The third reason is a bit too subtle to describe here, so we'll look at that when I expand this disclaimer into a standalone document.

**If you're looking for work, Freshpaint is hiring (US remote) in engineering, sales, and recruiting**. Disclaimer: I may be biased since I'm an investor, but they seem to have found product-market fit and are rapidly growing.

## Appendix: Erin Kissane on Meta in Myanmar

Erin starts with

> But once I started to really dig in, what I learned was so much gnarlier and grosser and more devastating than what I’d assumed. The harms Meta passively and actively fueled destroyed or ended hundreds of thousands of lives that might have been yours or mine, but for accidents of birth. I say “hundreds of thousands” because “millions” sounds unbelievable, but by the end of my research I came to believe that the actual number is very, very large.
> 
> To make sense of it, I had to try to go back, reset my assumptions, and try build up a detailed, factual understanding of what happened in this one tiny slice of the world’s experience with Meta. The risks and harms in Myanmar—and their connection to Meta’s platform—are meticulously documented. And if you’re willing to spend time in the documents, it’s not that hard to piece together what happened. Even if you never read any further, know this: Facebook played what the lead investigator on the UN Human Rights Council’s Independent International Fact-Finding Mission on Myanmar (hereafter just “the UN Mission”) called a “determining role” in the bloody emergence of what would become the genocide of the Rohingya people in Myanmar.2
> 
> From far away, I think Meta’s role in the Rohingya crisis can feel blurry and debatable—it was content moderation fuckups, right? In a country they weren’t paying much attention to? Unethical and probably negligent, but come on, what tech company isn’t, at some point?

As discussed above, I have not looked into the details enough to determine if the claim that Facebook played a "determining role" in genocide are correct, but at a meta-level (no pun intended), it seems plausible. Every comment I've seen that aims to be a direction refutation of Erin's position is actually pre-refuted by Erin in Erin's text, so it appears that very few people who are publicly commenting who disagree with Erin read the articles before commenting (or they've read them and failed to understand what Erin is saying) and, instead, are disagreeing based on something other than the actual content. It reminds me a bit of the responses to David Jackson's proof of the four color theorem. Some people thought it was, finally, a proof, and others thought it wasn't.. Something I found interesting at the time was that the people who thought it wasn't a proof had read the paper and thought it seemed flawed, whereas the people who thought it was a proof were going off of signals like David's track record or the prestige of his institution. At the time, without having read the paper myself, I guessed (with low confidence) that the proof was incorrect based on the meta-heuristic that thoughts from people who read the paper were stronger evidence than things like prestige. Similarly, I would guess that Erin's summary is at least roughly accurate and that Erin's endorsement of the UN HRC fact-finding mission is correct, although I have lower confidence in this than in my guess about the proof because making a positive claim like this is harder than finding a flaw and the area is one where evaluating a claim is significantly trickier.

Unlike with Broken Code, the source documents are available here and it would be possible to retrace Erin's steps, but since there's quite a bit of source material and the claims that would need additional reading and analysis to really be convinced and those claims don't play a determining role in the correctness of this document, I'll leave that for somebody else.

On the topic itself, Erin noted that some people at Facebook, when presented with evidence that something bad was happening, laughed it off as they simply couldn't believe that Facebook could be instrumental in something that bad. Ironically, this is fairly similar in tone and content to a lot of the "refutations" of Erin's articles which appear to have not actually read the articles.

The most substantive objections I've seen are around the edges which, such as

> The article claims that "Arturo Bejar" was "head of engineering at Facebook", which is simply false. He appears to have been a Director, which is a manager title overseeing (typically) less than 100 people. That isn't remotely close to "head of engineering".

What Erin actually said was

> ... Arturo Bejar, one of Facebook’s heads of engineering

So the objection is technically incorrect in that it was not said that Arturo Bejar was head of engineering. And, if you read the entire set of articles, you'll see references like "Susan Benesch, head of the Dangerous Speech Project" and "the head of Deloitte in Myanmar", so it appears that the reason that Erin said that "one of Facebook’s heads of engineering" is that Erin is using the term head colloquially here (and note that the it isn't capitalized, as a title might be), to mean that Arturo was in charge of something.

There is a form of the above objection that's technically correct — for an engineer at a big tech company, the term Head of Engineering will generally call to mind an executive who all engineers transitively report into (or, in cases where there are large pillars, perhaps one of a few such people). Someone who's fluent in internal tech company lingo would probably not use this phrasing, even when writing for lay people, but this isn't strong evidence of factual errors in the article even if, in an ideal world, journalists would be fluent in the domain-specific connotations of every phrase.

The person's objection continues with

> I point this out because I think it calls into question some of the accuracy of how clearly the problem was communicated to _relevant_ people at Facebook.
> 
> It isn't enough for someone to tell random engineers or Communications VPs about a complex social problem.

On the topic of this post, diseconomies of scale, this objection, if correct, actually supports the post. According to Arturo's LinkedIn, he was "the leader for Integrity and Care Facebook", and the book Broken Code discusses his role at length, which is very closely related to the topic of Meta in Myanmar. Arturo is not, in fact, a "random engineers or Communications VP".

Anway, Erin documents that Facebook was repeatedly warned about what was happening, for years. These warnings went well beyond the standard reporting of bad content and fake accounts (although those were also done), and included direct conversations with directors, VPs, and other leaders. These warnings were dismissed and it seems that people thought that their existing content moderation systems were good enough, even in the face of fairly strong evidence that this was not the case.

> Reuters notes that one of the examples Schissler gives Meta was a Burmese Facebook Page called, “We will genocide all of the Muslims and feed them to the dogs.” 48
> 
> None of this seems to get through to the Meta employees on the line, who are interested in…cyberbullying. Frenkel and Kang write that the Meta employees on the call “believed that the same set of tools they used to stop a high school senior from intimidating an incoming freshman could be used to stop Buddhist monks in Myanmar.”49
> 
> Aela Callan later tells Wired that hate speech seemed to be a “low priority” for Facebook, and that the situation in Myanmar, “was seen as a connectivity opportunity rather than a big pressing problem.”50

The details make this sound worse than a small excerpt, so I recommend reading the entire thing, but with respect to the discussion about resources, a key issue is that even after Meta decided to take some kind of action, the result was:

> As the Burmese civil society people in the private Facebook group finally learn, Facebook has a single Burmese-speaking moderator—a contractor based in Dublin—to review everything that comes in. The Burmese-language reporting tool is, as Htaike Htaike Aung and Victoire Rio put it in their timeline, “a road to nowhere."

Since this was 2014, it's not fair to say that Meta could've spent the $50B metaverse dollars and hired 1.6 million moderators, but in 2014, it was still the 4th largest tech company in the world, worth $217B, with a net profit of $3B/yr, Meta would've "only" been able to afford something like 100k moderators and support staff if paid at a globally very generous loaded cost of $30k/yr (e.g., Jacobin notes that Meta's Kenyan moderators are paid $2/hr and don't get benefits). Myanmar's share of the global population was 0.7% and, let's say that you consider a developing genocide to be low priority and don't think that additional resources should be deployed to prevent or stop it and want to allocate a standard moderation share, then we have "only" have capacity for 700 generously paid moderation and support staff for Myanmar.

On the other side of the fence, there actually were 700 people:

> in the years before the coup, it already had an internal adversary in the military that ran a professionalized, Russia-trained online propaganda and deception operation that maxed out at about 700 people, working in shifts to manipulate the online landscape and shout down opposing points of view. It’s hard to imagine that this force has lessened now that the genocidaires are running the country.

These folks didn't have the vaunted technology that Zuckerberg says that smaller companies can't match, but it turns out you don't need billions of dollars of technology when it's 700 on 1 and the 1 is using tools that were developed for a different purpose.

As you'd expect if you've ever interacted with the reporting system for a huge tech company, from the outside, nothing people tried worked:

> They report posts and never hear anything. They report posts that clearly call for violence and eventually hear back that they’re not against Facebook’s Community Standards. This is also true of the Rohingya refugees Amnesty International interviews in Bangladesh

In the 40,000 word summary, Erin also digs through whistleblower reports to find things like

> …we’re deleting less than 5% of all of the hate speech posted to Facebook. This is actually an optimistic estimate—previous (and more rigorous) iterations of this estimation exercise have put it closer to 3%, and on V&I \[violence and incitement\] we’re deleting somewhere around 0.6%…we miss 95% of violating hate speech.

and

> \[W\]e do not … have a model that captures even a majority of integrity harms, particularly in sensitive areas … We only take action against approximately 2% of the hate speech on the platform. Recent estimates suggest that unless there is a major change in strategy, it will be very difficult to improve this beyond 10-20% in the short-medium term

and

> While Hate Speech is consistently ranked as one of the top abuse categories in the Afghanistan market, the action rate for Hate Speech is worryingly low at 0.23 per cent.

To be clear, I'm not saying that Facebook has a significantly worse rate of catching bad content than other platforms of similar or larger size. As we noted above, large tech companies often have fairly high false positive and false negative rates and have employees who dismiss concerns about this, saying that things are fine.

## Appendix: elsewhere

* Anna Lowenhaupt Tsing's On Nonscalability: The Living World Is Not Amenable to Precision-Nested Scales
* Glen Weyl on radical solutions to the concentration of corporate power
* Zvi's collection of Quotes from Moral Mazes

## Appendix: Moderation and filtering fails

Since I saw Zuck's statement about how only large companies (and the larger the better) can possibly do good moderation, anti-fraud, anti-spam, etc., I've been collecting links I run across when doing normal day-to-browsing of failures by large companies. If I deliberately looked for failures, I'd have a lot more. And, for some reason, some companies don't really trigger my radar for this so, for example, even though I see stories about AirBnB issues all the time, it didn't occur to me to collect them until I started writing this post, so there are only a few AirBnB fails here, even though they'd be up there with Uber in failure count if I actually recorded the links I saw.

These are so frequent that, out of eight draft readers, at least two draft readers ran into an issue while reading the draft of this doc. Peter Bhat Harkins reported:

> Well, I received a keychron keyboard a few days ago. I ordered a used K1 v5 (Keychron does small, infrequent production runs so it was out of stock everywhere). I placed the order on KeyChron's official Amazon store, fulfilled by Amazon. After some examination, I've received a v4. It's the previous gen mechanical switch instead of the current optical switch. Someone apparently peeled off the sticker with the model and serial number and one key stabilizer is broken from wear, which strongly implies someone bought a v5 and returned a v4 they already owned. Apparently this is a common scam on Amazon now.

In the other case, an anonymous reader created a Gmail account to used as a shared account for them and their partner, so they could get shared emails from local services. I know a number of people who've done this and this usually works fine, but in their case, after they used this email to set up a few services, Google decided that their account was suspicious:

> Verify your identity
> 
> We’ve detected unusual activity on the account you’re trying to access. To continue, please follow the instructions below.
> 
> Provide a phone number to continue. We’ll send a verification code you can use to sign in.

Providing the phone number they used to sign up for the account resulted in

> This phone number has already been used too many times for verification.

For whatever reason, even though this number was provided at account creation, using this apparently illegal number didn't result in the account being banned until it had been used for a while and the email address had been used to sign up for some services. Luckily, these were local services by small companies, so this issue could be fixed by calling them up. I've seen something similar happen with services that don't require you to provide a phone number on sign-up, but then lock and effectively ban the account unless you provide a phone number later, but I've never seen a case where the provided phone number turned out to not work after a day or two. The message above can be read two ways, the other way being that the phone number was allowed but had just recently been used to receive too many verification codes but, in recent history, the phone number had only once been used to receive a code, and that was the verification code necessary to attach a (required) phone number to the account in the first place.

I also had a quality control failure from Amazon, when I ordered a 10 pack of Amazon Basics power strips and the first one I pulled out had its cable covered in solder. I wonder what sort of process could leave solder, likely lead-based solder (although I didn't test it) all over the outside of one of these and wonder if I need to wash every Amazon Basics electronics item I get if I don't want lead dust getting all over my apartment. And, of course, since this is constant, I had many spam emails get through Gmail's spam filter and hit my inbox, and multiple ham emails get filtered into spam, including the classic case where I emailed someone and their reply to me went to spam; from having talked to them about it previously, I have no doubt that most of my draft readers who use Gmail also had something similar happen to them and that this is so common they didn't even find it worth remarking on.

Anyway, below, in a few cases, I've mentioned when commenters blame the user even though the issue is clearly not the user's fault. I haven't done this even close to exhaustively, so the lack of such a comment from me shouldn't be read as the lack of the standard "the user must be at fault" response from people.

### Google

* "I had to get the NY attorney general to write them a letter before they would actually respond to my support requests so that I could properly file my taxes"
* Google photo search for gorilla returns photos of black people, fixed after Twitter thread about this goes viral; 3 years later, there are stories in the press about how Google fixed this by blocking search results for the terms "gorilla", "chimp", "chimpanzee", and "monkey" and has not unblocked the terms
 * On 2024-01-06, I tried uploading a photo of a gorilla and searching for gorilla, which returned no results both immediately after the upload as well as a few weeks later, so this still appears to be blocked?
* Google suspends a YouTuber for impersonating themselves; on appeal YouTube says "unfortunate, there's not more we can do on our end. your account suspension & appeal were very carefully reviewed & the decision is final ... we really appreciate your understanding".
 * Channel restored after viral Twitter thread makes it to the front page of HN.
* Two different users report having their account locked out after moving; no recovery of account
* Google closed the accounts of everyone who bought a phone and then sold it to a particular person who was buying phones, resulting in emails to their email address getting bounced, inability to auth to anything using Google sign-in, etc.; at least one user whose account was a recovery account for someone who bought and sold a phone also had their accounted closed; Dans Deals wrote this up and people's accounts were reinstated after the story went viral
* Google Cloud reduces quota for user, causing an incident, and then won't increase it again
 * User tries to find out what's going on and has this discussion:
 * **GCP support**: You exceeded the rate limit
 * **User**: We did 5000/10min. The quota was approved at 18k/min
 * **GCP support**: That's not the rate limit
 * **User**: What's the rate limit
 * **GCP support**: Not sure have to check with that team
 * So it seems like GCP added some kind of internal rate limiting that's stricter than the user's approved quota?
 * A commenter responds with "if you don’t buy support from GCP _you have no support_." and other users note that paying for support can also give you no support
* Google accepts fake DMCA takedown requests even in cases that are very obviously fake
 * An official Google comment on this is the standard response that there are robust processes for this "We have robust tools and processes in place to fight fraudulent takedown attempts, and we use a combination of automated and human review to detect signals of abuse – including tactics that are well-known to us like backdating. We provide extensive transparency and submit notices to Lumen about removal requests to hold requesters accountable. Sites can file counter notifications for us to re-review if they believe content has been removed from our results in error. We track networks of abuse and apply extra scrutiny to removal requests where appropriate, and we’ve taken legal action to fight bad actors abusing the DMCA"
* Small business app creator has everything shut down pending "verification" of Google Pay
 * Support did nothing and GCP refused to look into it until this story hit #1 on HN, at which point someone looked into it and fixed it
* Lobbying group representing Google, Apple, etc., is able to insert the language they want directly into a right to repair bill, excluding many devices from the actual right to repair.
 * "“We had every environmental group walking supporting this bill,” Fahy told Grist. “What hurt this bill is Big Tech was opposed to it.”"
* File containing a single line with "1" in it restricted on Google Drive due to copyright infringement; appeal denied
 * HN readers play around and find that files containing just "0" also get flagged for copyright violation
 * issue fixed after viral Twitter thread
* In 2016, Fark has ads disabled when a photograph of a clothed adult posted in 2010 is incorrectly flagged as child porn; appeals process takes 5 weeks
 * Fark notes that they had similar problems in 2013 because an image was flagged as showing too much skin
* Pixel 6 freezes when calling emergency services
 * a user notes that they reported the issue almost 4 years before this complaint on an earlier Pixel and the issue was "escalated" but was still an issue ~8 months before the previous complaint
 * A Google official account responded that the freeze was due to Microsoft Teams, but the user notes they've never used or even installed Microsoft Teams (there was an actual issue where Teams would block emergency calls, but that was not this user's issue)
* Account locked and information sent to SFPD after father takes images of son's groin to send to doctor, causing an SFPD investigation; SFPD cleared the father of any wrongdoing, but Google "stands by its decision", doesn't unlock the account
 * Google spokesperson says "We follow US law in defining what constitutes CSAM and use a combination of hash matching technology and artificial intelligence to identify it and remove it from our platforms," 
 
* Google cloud suspends corporate account, causing outage; there was a billing bug and the owner of the account paid and was assured that their account wouldn't be suspended due to the bug, but that was false and the account got suspended anyway
 * HN commenter suggests that "engineers that lack business experience" reach out to their account managers once they have significant spend; multiple people respond and say that they've done this and it didn't help at all
* Company locked out of their own domain on Google Workspaces; support refused to fix this
* Google cloud account suspended because someone stole the CC numbers for the corporate card and made a fraudulent adwords charge
* Journalist's YouTube account incorrectly demonetized
 * fixed after 7 months of appealing and a viral Twitter thread
* Ads account suspended; an educated guess is that some ML fraud signals plus using a Brex card led to the suspension
 * card works when paying for many other Google services
* Person's credit card stops working with Google accounts after using it to pay on multiple accounts
 * guessed to be due to an incorrect anti-fraud check
* Ads account suspended for "suspicious payments" even though the same card is used for many other Google payments, which are not suspended
 * after multiple appeals that fail, the former Google employee talks to internal contacts to get escalations, which also fail and the ads account stays suspended
* Google Play account banned for no known reason
 * the link Google provides to file the appeal can't be access with a banned account
 * the user had two apps using one API, so it counted as two separate violations at once, so the account was banned for "multiple violations"
* Google ads account for a small non-profit banned due to "unpaid balance"
 * Balance reads $0.00 but appealing ban fails
* Google ads account banned after account automatically switched to Japanese and then payment is made with an American card
* Google sheet with public election information incorrectly removed for "phishing"
 * restored after viral HN thread
* User account disabled and photos, etc., lost with no information on why and no information for why the appeal was rejected
 * ex-Google engineer unable to escalate to anyone who can restore account 
 
* 10-year old YouTube channel with 120M views scheduled for deletion due copyright claims (no information provided to channel creator about what the copyright infringement was)
 * channel eventually saved after Twitter thread went viral
* FairEmail and Netguard app developer removes apps after giving up on fight with Google over whether or not FairEmail is Spyware
 * app later restored sometime after viral HN thread
* App banned from Play store because a button says "Report User" and not "Report"
* User gets banned from GCP for running the code on Google's own GCP tutorials
* Youtube comment anti-spam considered insufficient, so a user creates their own YT anti spam
* Search for product reviews generally returns SEO linkfarm spam and not useful results
 * See also, my post on the same topic
* Google account with thousands of dollars of apps banned from Google with no information on what happened and appeals rejected
 * account eventually restored after viral Twitter thread
* Linux Experiments Youtube Channel deleted with no reason given
 * channel restored shortly after viral Twitter and HN threads
* Warranty replacement Google Pixel 7 Pro is carrier locked to the wrong carrier and, even though user is in Australia, the phone is locked to a U.S. carrier
 * User has gone to Google support 8 times over 1 month and Google support has incorrectly told user 8 times that the phone is unlocked, so user has had no usable phone for 1 month; the carrier the phone is locked to agrees that the phone is incorrectly carrier locked, but they can't do anything about it since the original purchaser of the phone would have to call the carrier, but apparently the warranty replacement is a locked, used, phone
 * Possibly due to the reddit thread, Google support agrees to swap user's phone, but support continues to insist that the phone is not carrier locked
* Malware uses Google OAuth to hijack accounts
 * Google claims they've mitigated this for all accounts that were compromised, which could be true
* GCP account suspended for no discernable reason after years of use
 * Support was useless, but since the user used to work at Google, they emailed a former co-worker who sent an internal email, which caused the issue to get fixed immediately
* Obviously fake Google reviews for movie not removed for quite some time (obviously fake because many reviews copy+paste the exact same text)
* Google doesn't detect obviously fake restaurant reviews
 * I've noticed this as well locally — a new restaurant will have 100+ 5 star reviews, almost all of which look extremely fake; these reviews generally don't get removed, even years later
* Owner and developer at SaaS app studio 7 out of 100 apps (that use the same code) start getting rejected from app store
 * The claimed reason is that the apps allow user generated content (UGC) and therefore need a way to block and report the content, but the apps already have this
 * The developer keeps emailing support, explaining that they already have this and support keeps responding with nonsense like "We confirm that your app ... does not contain functionality to report objectionable content ... For more information or a refresher, we strongly recommend that you review our e-learning course on UGC before resubmission."
 * All attempts to escalate were also rejected, e.g., "Can you escalate this?" was responded to with "Unfortunately, we do not handle this kind of concern. You may continue to communicate with the appropriate team for further assistance in resolving your issue. Please understand that I am not part of the review team so I'm not able to give further information about your concern. I again apologize for the inconvenience." and then "As much as I'd like to help, I'm not able to assist you further. If you don't have any other concerns, I will now have to end our chat to assist other developers. I apologize and thank you for understanding. Have a great day. Bye!"
 * Multiple developers suggest that instead of interacting with Google support as if anyone actually pays attention or cares, you should re-submit your app with some token change, such as incrementing an internal build number; because Google's review process is nonsense, even serious concerns can be bypassed this way. The idea is that it's a mistake to think that the content of their messages makes any sense at all and that you're dealing with anything resembling a rational entity (see also.
* Google groups is a massive source of USENET spam
* Google groups is a massive source of USENET spam
* Google groups is a massive source of USENET spam
* Google groups is a massive source of email spam; a Google employee put information about this into a ticket, which did not fix the issue, nor does setting "can't add me to groups"
* Google locks user out by ignoring authenticated phone number change and only sending auth text to old number
* I had an issue related to the above, where I was once locked out of Google accounts while traveling because I only took my code generator and left my 2FA tokens at home; this was in the relatively early days of 2FA tokens and I added the tokens to reduce the odds that I would be locked out, because the documentation indicated that I would need any of my 2FA methods to be available to not get locked out; in fact, this is false, and Google will sometimes only let you authenticate with specific methods, so adding more methods actually increases the chances you'll get locked out if your concern is that you may lose a method and then lose access to your account
* Google allows user to pay for plan with unlimited storage, cancels unlimited storage plan, and then deletes user's data
 * Many HN commenters on the story tell the user they should've had other backups, apparently not reading the story, which notes that the user concurrently had a government agency take all of their hard drives
* Google closes company's Google Cloud account over 3 cent billing error, plus some other stories
* YouTube doesn't take down obvious scam ads when reported, responding with "We decided not to take this ad down. We found that the ad doesn’t go against Google’s policies"
* YouTube doesn't take down obvious scam ads
* Incorrect YouTube copyright takedown
* YouTube copyright claim for sound of typing on keyboard; fixed after Twitter thread goes viral
* Another YouTube copyright claim for sound of typing on keyboard; again fixed after Twitter thread goes viral
* User puts free music they made on YouTube, allowing other people to remix it; someone takes YouTube ownership of the music, fixed after user, one of the biggest YouTubers of all time, creates a video complaining about this
* Developer's app removed from app store for no discernible reason (allegedly for "user privacy") and then restored for no discernable reason
* YouTube copyright claim for white noise
* YouTube refuses to take down obvious scam ad
* YouTube refuses to take down scam ads for fake medical treatments
* YouTube refuses to take down scam ads
* Google doesn't take down obvious scam ads with fake download buttons
 * Mitigated on user's site by hiring a firm to block these ads post-auction?
* YouTube refuses to take down fraudulent ad after reporting
* Personally reporting scam ads to an employee at Google who works in the area causes ads to get taken down for a day or two, but they return shortly afterwards
* Google refuses to take down obvious scam ads after reporting
* Google refuses to take down obvious scam ad, responding with "We decided not to take this ad down. We found that the ad doesn’t go against Google’s policies, which prohibit certain content and practices that we believe to be harmful to users and the overall online ecosystem."
* YouTube refuses to take down obvious real estate scam ad using Wayne Gretzky, saying the ad doesn't violate any policy
* Straighforward SEO spam clone of competitor's website takes their traffic away
* User had negotiated limit of 300 concurrently BigQuery queries and then Google decided to reduce this to 100 because Google rolled out a feature that Google PMs and/or engineers believed was worth 3x in concurrent queries; user notes that this feature doesn't help them and that their query limit is now too low; talking to support apparently didn't work
* User keeps having their tiny GCP instance shut down because Google incorrectly and nonsensically detects crypto mining on their tiny instance
* User has limit on IPs imposed on them and the standard process for requesting IPs returned "Based on your service usage history you are not eligible for quota increase at this time"; all attempts to fix this via support failed
* Google Maps gives bad directions to hikers who get lost
* Search and rescue teams warn people against use of Google Maps
* Google's suggested American and British pronunciations of numpy
* CEO of Google personally makes sure that a recruiter who accidentally violated Google's wage fixing agreement with Apple is fired and the apologies to CEO of Apple for the error
* Developer's app rejected from app store and developer given the runaround for months
 * They keep getting support people telling them that their app doesn't do X, so they send instructions on how to see that the app does do X; their analytics show that support never even attempted to run the instructions and just kept telling them that their app didn't do X
* One of many examples of Google not fixing Maps errors when reported, resulting in people putting up a sign telling users to ignore Google Maps directions
 * Some more examples here
* SEO spam of obituaries creates cottage industry of obituary pirates
* Malware app stays up in app store for months after app is reported to be malware
 * The app now seems to be gone, but archive.org indicates that the app was up for at least six months after this person noted that they reported this malware which owned their parents
* User reports Google's accessible audio captchas only let you do 2-3 before banning you and making you do image-based captchas, making Google sites and services inaccessible to some blind people
* User gets impossible versions of Google's ReCaptcha, making all sites that use ReCaptcha inaccessible; user is unable to cancel paid services that are behind ReCaptcha and is forced to issue chargebacks to stop payment to now-impossible to access services
* User can't download India-specific apps while in India because Google only lets you change region once a year
* 3 year old YouTube channel with 24k subs, 100 videos, and 400 streams deleted, allegedly for saying "Don't hold your own \[bitcoin\] keys", which was apparently flagged as promoting illegal activity
 * YouTube responds with "we've forwarded this info to the relevant team and confirmed that the channel will remain suspended for Harmful or dangerous content policies" and links to a document; the user asks what content of theirs violates the policies and why, if the document says that you get 3 strikes your channel is terminated, the account was banned without getting 3 strikes; this question gets no response
* Snow closure of highway causes Google Maps to route people to unplowed forest service road with 10 feet of snow
* Google play rejects developer's app for nonsense reasons, so they keep resubmitting it until the app doesn't get rejected
* Washed out highways due to flooding causes Google Maps to route people through forest service roads that are in even worse condition
* Google routes people onto forest service roads that need an offroad vehicle to drive; users note that they've reported this, which does nothing
* Google captchas assume you know what various American things are regardless of where you are in the world
* Google AMP allows phishing campaigns to show up with trusted URLs
 * People warned Google engineers that this would happen and that there were other issues with AMP, but the response from Google was that if you think that AMP is causing you problems, you're wrong and the benefit you've received from AMP is larger than the problems it's causing you
* User reports that chrome extension, after getting acquired, appears to steal credit card numbers and reviews indicate that it now injects ads and sometimes (often?) doesn't work
 * 6 months ago, user tried to get the extension taken down, but this seems to have failed (the Firefox extension is also still available)
* User has their Google account banned after updating their credit card to replace expiring credit card with new credit card (both credit cards were from the same issuer, had the same billing address, etc.)
* Reporting a spam youtube comment does nothing
* BBC reports bad ads to Google and Google claims to have fixed the issue with an ML system, but follow-up searches from the BBC indicate that the issue isn't fixed at all
* User signs up for AdSense and sells thousands of dollars of ads that Google then doesn't allow the user to cash out
 * This is a common story that I've seen hundreds of times. Unsurprisingly, multiple people respond and say the same thing happened to them and that there's no recourse when this happens.
* User has their Google account (Gmail) account locked for no discernable reason; account recovery process and all appeals do nothing
 * For unknown reasons, after two years, the account recovery process works and the account is recovered
* User has their Google Pay account locked for "fraud"; there's a form you're supposed to fill out to get them to investigate, which did nothing three times
 * User had their phone through googlefi, email through Gmail, DNS via Google, etc., all of which stopped working
 * A couple years later, their accounts started working again for no discernable reason
* User gets locked out of Gmail despite having correct password and access to the recovery email (Gmail tells user their login was suspicious and refuses to let them log in)
 * I've had this happen to me as well when I had my correct password as well as a 2fa device; luckily, things started working again later
* User can't get data out of Google after Google adds limit on how much data account can have
* User notes that they're only able to get support from Google because they used to work there and know people who can bypass the normal support process
* Google takes down developer's Android app, saying that it's a clone of an iOS app; app was making $10k/mo
 * Developer finds out that the app Google thinks they're cloning is their own iOS app
 * Developer is able to get unbanned, but revenue never recovers an settles down to $1k/mo. Developer stops developing Android apps
* User finds that if they use "site:" "wrong", Google puts them into CAPTCHA hell
 * Another user notes that this happens to them with other query query modifiers
* Reporting malware Chrome extensions doesn't get them taken down, although some do end up getting taken down after a blog post on this goes viral
* User accidentally gains admin privileges to many different companies Google Cloud account and can't raise any kind of support ticket to get anyone to look at the problem
 * Multiple people respond and tell stories about how bad Google's paid support is compared to AWS support
* 15 year ol Gmail account lost with no recovery possible
 * Someone who helps many people with recovery says "they've all basically hit the brick wall of Google suggesting that at their scale, nothing can be done about such 'edge' cases"
* Google account lost despite having proper auth because Google deems login attempts too suspicious
* Google account lost despite having proper auth and access to backup account because Google deems login attempts too suspicious
* Google account lost despite having proper auth because Google deems login to be too suspicious
* Google account lost despite having proper auth and TOTP because Google deems login to be too suspicious
* Google account lost despite proper auth because Google deems login to be too suspicious
 * Person notes that they can log in when they travel back to the city they used to live in, but they can't log in where they moved to
* Google account lost despite proper auth for no known reason
 * Account login restored for no known reason a few months later
* User tries to log into Gmail account and gets ~20 consecutive security challenges, after which Gmail returns "You cannot log in at this time", so their account appears to be lost
* Google changes terms of service and reduces user's quota from 2TB to 15GB, user is unable to find any way to talk to a human about this and is forced to pay for a more expensive plan to not lose their data
 * YouTube account with single video and no comments banned for seemingly no reason, support requests do nothing
* Huge YouTube channel shut down
 * Someone defends this as the correct action because "Their account got session jacked and taken over by a crypto scamming farm. Google was in the right to shut down the account until it could get resolved."
 * Someone who is actually familiar with what's going on notes that this is nonsense, "Their account was shut down days _after_ the crypto scam issue was resolved. They discussed it on the WAN show from the week before last."
* Many users run into serious problems after Google decides to impose 5M file limit on Google Drive without warning
 * Google support replies with "I reviewed your case here on our end including the interactions with the previous representatives. This case has already been endorsed to one of our account specialists. What they found out is that the error is working as intended"
 * On HN, the top comment is a Google engineer responding to say "I don't personally think that there are reasonable use-cases for human users with 5 million files. There may be some specialist software that produces data sets that a human might want to back up to Google Drive, but that software is unlikely to run happily on drive streamed files so even those would be unlikely to be stored directly on Drive." and a multiple people agree, despite the issue itself being full of people describing how they're running into issues
 * Someone notes that Google Drive advertises storage tiers up to 30TB, so 5M files would be 6MB at 30TB, not really a weird edge case of someone generating a bunch of tiny files or anything like that
 * Another user responds their home directory contains almost 5M files
 * The top HN reply to the #2 comment is a second Google engineer saying that Google Drive isn't for files (and that it's for things like Google Docs) and that people shouldn't be using it to store files
 * Someone notes that Google's own page for drive advertises it as a "File Sharing Platform"; this doesn't appear to have changed since, as of this writing, the big above-the-fold blurb on Google's own page about drive is that you can "Store, share, and collaborate on files and folders from your mobile device, tablet, or computer". Unsurprisingly, users indicate that they think Google Drive is for files
 * In low ranked HN comments, multiple people express surprise that Google didn't bother to contact the users who would be impacted by this change before making it
 * This Google engineering attitude of "this is how we imagine users use our product, and if you're using it differently, even if that's how the product is marketing, you're using it wrong" was a very common attitude when I worked at Google and I see that it hasn't changed.
* Chrome on Android puts tabloid stories and other spam next to frequently used domains/links
* Google pays Apple to not compete on search
* Google search has been full of scam ads for years
* r/blender repeatedly warns people over many months to not trust results for blender since top hit is malware.
* Rampant nutritional supplement scam advertising on Google
* Top search result for local restaurant is a scam restaurant
* User reports massive about obvious phishing and spam content makes it through Gmail's spamfilter, such as an ad that either steals your payment info or gets you to buy super overpriced gold
* High-ranking / top Google results for many pieces of software is malware that pays for a high ranking ad slot
 * Reporting this malware doesn't seem effective and the same malware ads can persist for very long periods of time unless someone contacts a Google engineer or makes a viral thread about the ad
* Top result for zoom installer is an ad that tries to get you to install badware
* User sees a huge number of scam ads on YouTube
* User sees a huge number of scam ads on YouTube
* User's list of wedding vendors they're using to organize a wedding tagged as phishing and user is warned for violating Google Drive's phishing policy
 * User tried to get more information but found no way to do so
* Corp security notes that it's very easy to send phishing emails to employees of corporation by passing it through Google Groups
* Google account lost because 2FA recovery process doesn't work
 * User lost their Google Authenticator 2FA when their phone broke. They have their backup recovery codes, but this only lets them log into their account (and uses up a code forever when logging in); after logging in, this does not enable them to change their 2FA, so each login is a countdown to losing their account
 * In the HN comments, some people walk them through the steps to change their 2FA when using backup codes, which works for other users but not this user — user believes that some kind of anti-fraud system is suspicious the user is fraudulent, which limits what kind of 2FA enables changing 2FA, requiring the original and now lost 2FA to change 2FA, making the recovery codes useless; in standard internet comment style, some people keep telling the user that this works and the user should simply do the steps that work, even though the user has explained multiple times that this does not work for them
 * Someone suggests buying Google One support, but someone else notes that Google One support appears to be very poor even though it's paid support, and people have noted on many other threads that even cloud support can be useless when spending millions, tens of millions, or hundreds of millions a year, so the idea that you'll get support from Google because you pay for is isn't always correct
 * Multiple people have reported the exact same issue and many people report that their mitigation to this is to score the 2FA secrets in their password manager; they know that this means that a computer and/or password manager compromise defeats their 2FA, but they feel that's better than randomly losing their account because the 2FA backup codes can simply not work if Google decides that they're too suspicious
 * Someone suggests setting multiple Yubikeys to prevent this issue. That sounds logical, but I've done this and I can report that it does not prevent this issue — I added multiple 2FA tokens in order to reduce the chance that losing 2FA tokens would cause me to get locked out; at one point, Google became suspicious of one of the 2FA I used to log in almost every time and required me to present another 2FA token, making my idea of having multiple 2FA tokens reduce the risk of a lockout actually backfire since, if Google becomes suspicious of the wrong 2FA tokens, losing any one out of N 2FA tokens could cause my account to become lost
* User loses Gmail account after Google system decides the phone numbers they've been using for verification "cannot be used for verification"
 * Another user looks into it and finds that Google's official support suggestion is to create another account, so the anti-fraud false positive means that this person lost their Gmail account
* User locked out of account after password change; user is sure they're using the correct password because they're using a password manager
 * As with the above cases, the password reset flow doesn't work; after five weeks of trying daily, doing the exact same steps as each other time worked, so the account was only lost for five weeks and not forever
* User complaints that their Google accounts have been moderately broken for 10 years due to forced Google+ migration in 2013 that left their account in a bad state
* User locked out of Google after changing password
 * Google asks the user to enter the new and old password, which the user does, but this doesn't enable logging in
 * Google sometimes asks the user to scan a QR code from a logged in account, but the user can't do this because they can't log in
 * User changed password to main and recovery accounts at the same time, so they're locked out of both accounts
 * For no discernable reason, repeatedly trying to get into the recovery account eventually worked, which allowed them to eventually get back into their main account
* User gets locked out of Gmail account when Gmail starts asking for 10+ year old password as well as current password to log in
 * User finds a suggestion on an old support forum to not try to log in for 40+ days and then try, at which point the user is only asked for their current password and can log in
 * This is clearly not a universal solution as there are examples of people who try re-logging in every year to lost accounts, which usually doesn't work, but this apparently sometimes works?
 * Someone posts the standard reply about how you shouldn't expect to get support unless you pay for Google One, apparently ignoring how every time someone posts this, people respond to note that Google One support rarely fixes problems like these
* User loses Gmail account because Gmail suddenly refuses to allow access with only the correct password and requires access to recovery email address, which has lapsed
 * A comment blaming the user from someone who apparently didn't read the post
* User loses Gmail account because Gmail suddenly refuses to allow access with only the correct password and requires an old phone number which is no longer active
 * This turned out to be another case where waiting a long time and then trying to log in worked
* User loses Gmail account because Gmail suddenly refuses to allow access with only the correct password and requires an old phone number which is no longer active
 * In this case, waiting a long time and then trying to log in didn't work and the account seems permanently lost
* User loses Gmail account because Gmail suddenly refuses to allow access the correct password; user has the recovery email as well, but that doesn't help
 * After three years of trying to log in every few months, logging in worked for no discernable reason, so the account was only lost for three years
* Google gives away user's Google Voice number, which they were using daily and had purchased credits on that were also lost
 * Someone who apparently didn't read the post suggests to the user they shouldn't have let the number be inactive for 6 months or they should've "made the number permanent'
 * Support refuses to refund user for credits and user can't get a new Google Voice number because the old one is still somehow linked to them and is considered a source of spam
* User loses Gmail account when recovery account token doesn't work
* User loses Gmail account when credentials stop working for no discernible reason
* User has an issue with Google and talks to support; support tells user to issue a chargeback, which results in user's account getting banned and user losing 15 years of account history
* User is in the middle of getting locked out of Google accounts and makes a viral post to try to get a human at Google to look at the issue
* John Carmack complains about having "a ridiculous time" with Google Cloud, only getting his issue resolved because he complained on Twitter an is one of the most famous programmers on the planet, decided to move to another provider after the second time this happened
* Developer documents years of incorrect Google Play Store policy violations and how to work around them
 * Someone claiming to have worked on the Google Play Store team says: "a lot of that was outsourced to overseas which resulted in much slower response time. Here stateside we had a lot of metrics in place to fast response. Typically your app would get reviewed the same day. Not sure what it's like now but the managers were incompetent back then even so."
* Developer notes that they sometimes get updates rejected from Google Play store and have even had their existing app get delisted, but that the algorithm for this is so poor that you can make meaningless changes, which has worked for getting them relisted every time so far
* Developer banned from Google Play, but they win the appeal
 * However, the Name / Namespace (com.company.project) continues to be blocked, so they'd have to refactor the app and change the product and company name to continue using Google Play
* Developer describes their process of interacting with the Google Chrome Webstore, which involves so much kafkaesque nonsense that they have semi-automated handling of the nonsense they know they'll encounter
* Developer has comical, sub-ChatGPT level interactions with "Chrome Web Store Developer Support" (see link for multiple examples)
* User complains about repeated nonsense video demonetization and age limiting , such as this I ate water with chopsticks getting a strike against it for "We reviewed your content carefully, and have confirmed that it violates our violent or graphic content policy", with a follow-up of "your video was rated \[sic\] limited by ML then mistakenly confirmed by a manual reviewer as limited .... we've talked to the team to ensure it doesn't happen again", but of course this keeps happening, which is why the user is complaining (the complaint comes after the video was restricted again and the appeal was denied twice, despite the previous comment about how YouTube would ensure this doesn't happen again).
* User has YouTube video incorrectly taken down for violating community guidelines, but it gets restored after they and another big YouTuber both write viral Twitter threads about the incorrect takedown
* User notes that Gmail's spam filtering appears to be getting worse
 * I remember this one because, when this user complained about it, I noticed that I was getting multiple spam emails per day (with plenty of false positives when I checked my spam folder as well)
 * This complaint from a user was also memorable to me since I was getting the exact same spam as this user
* User notes that Google (?) consistently sends you the wrong way into a highway offramp
* User's video on the history of megaman speedruns becomes age restricted, which also mostly demonetizes it?
 * User appeals, and 45 minutes later, they get a response saying "after careful review, we've confirmed that the age restriction on your video won't be lifted" (video is 78 minutes long)
 * User then quotes YouTube's own guidelines to show that their video doesn't appear to violate the guidelines
 * User tweets about this, and then YouTube replies saying they lifted the age restriction, but the video stopped getting recommended, so the video was still not making money (this user makes a living off YouTube videos)
 * 8 days later, the video is officially age restricted again, and they say that the previous reversal was an error
 * User then makes a video about this and tweets about the video, which then goes viral.
 * YouTube then responds after the tweet about getting the runraround goes viral, with "really sorry again that this was such a confusing / back and forth experience 😞. we’ve shared your video with the right people & if helpful, keep sharing more w/ our community outreach team on that same email too!!"
* When Jamie Brandon was organizing a database conference, Gmail spamfiltered the majority of emails he sent out about it
 * ~700 people signed up to be notified when tickets were available, but even though they explicitly signed up to get notified, Gmail still spamfiltered Jamie's email
* Author publishes a book about their victimization and sex crimes; Google then puts a photo of someone else in an automatically generated profile for the author
 * "After spending weeks sending feedback and trying to get help from Google support, they finally deleted the woman’s photo, but then promptly replaced it with another Andrea Vassell who is a pastor in New York. She, the pastor in New York, wrote to me that she has been 'attacked' because people believe she is me."
 * That the person was a pastor of a church also caused problems for some people mentioned in the book; author again tries to get the photo removed, which eventually works, but is then replaced by the photo of a man who'd been fired for threatening the author, and then months later, the pastor's photo showed up again as the author
 * Author appears to be non-technical and found HN and is writing a desperate plea for someone to do something about it
 * A Google employee whose profile reads "Google's public liaison of Search, helping people better understand search & Google better hear public feedback", responds with "I'll share more about how you can better get this feedback to us ... \[explanation of knowledge panels\] ... Normally people just don't like the image we show, so we have a mechanism for them to upload a preferred image. That's very easy to use. But in your case, I understand your reasons for not wanting to have an image used at all. I believe if you had filed feedback explaining that, the image would have been removed."
 * Author is dumbfounded given her lengthy explanation of how much feedback she has already provided and responds with "Are you suggesting that I did not send feedback through the appropriate channels? I have dozens of email exchanges with Google, some of which have multiple people copied on them, and I have screenshots of me sending feedback through your feedback link located within the knowledge panel. (And I explained my situation to them with more detail than I have explained here.). In April and May, I received email responses from Google employees who work for the knowledge panel support team. After they changed the photo twice to images of the wrong women instead of deleting them, I continued complaining and they suggested I contact legal removals. When I contacted legal, I received automated responses to contact the knowledge support team. So I was bounced around. They then began ignoring me and I started receiving automated responses from everyone. Even though I was being ignored, on any given day, I would wake up and find a different photo presented alongside my book. I also reached out to you, Danny Sullivan, _directly_"
* Famous sci-fi author spends years trying to get Google to stop putting photos of other people in their "knowledge panel"
 * This seems to currently be fixed, and it only took between five years and a decade to fix it.
* User notes that knowledge panel for them is misleading or wrong, and that attempts to claim the knowledge panel to fix this have failed
* Google knowledge panel for person incorrectly states that they are "also known as The Sadist ... a Bulgarian rapist and serial killer who murdered five people... "
 * Fixed after a story about this makes it to #1 on HN
* User notes that Google's knowledge panels about business often contain incorrect information even when the website for the business has correct information
* Company reaches out to candidate about a job, eventually giving them an offer. The offer acceptance reply in email is marked as spam by everyone at the company
 * On looking in the spam folder, one user at the company (me) finds that 19 out of 20 "spam" emails are actually not spam. Other users check and find a huge amount of important email is being classified as spam.
 * Google support responds with what appears to be an automated message which reads "Hi Dan. Our team is working on this issue. Meanwhile, we suggest creating a filter by selecting 'Never send it to spam' to stop mail from being marked as spam", apparently suggesting that everyone with a corp gmail account disable spam filtering entirely by creating a filter that disables the spam filter
 * One person responds and says they actually did this because they were getting so much important email classified as spam
* "Obvious to humans" spam gets through Gmail's spam filter all the time while also classifying "ham" as "spam"
* I emailed a local window film installer and their response to me, which quotes my entire email, went straight to spam 

### Facebook (Meta)

* Journalist's account deleted and only restored after Twitter thread on deletion goes viral
* Facebook moderator notes there's no real feedback or escalation path between what moderators see and the people who set FB moderation policy
* User banned from WhatsApp with no reason given
 * appeal resulted in a generic template response
* Instagram user can no longer interact with account
 * would like to remove account, but can't because login fails
* Multiple users report they created a FB account so they can see and manage FB ads; accounts banned and can no longer manage ads
* User banned after FB account hacked
 * account restored after viral HN story
* On a local FB group, user posts "Looking for some tech advice (admins delete if not allowed)... my Instagram account was hacked and I have lost all access to that account. The guy is still posting as me daily and communicating to others as me in messages (its a bitcoin scam). Does anyone know how I can communicate with Instagram directly? There does not appear to be any way to contact them and all the instructions I've followed lead me nowhere bc I have completely lost access to that account! 😫 Thank you!"
 * Someone suggests Instagram's instructions for this, https://help.instagram.com/368191326593075, but user replies and says that these didn't work because "I did all that but unfortunately the hacker was in my email and and verified all the changes before I noticed"
 * I replied and suggested searching linkedin for a connection to an employee, since the only things that work are internal escalation or going viral
* Facebook incorrectly reports a user to DigitalOcean for phishing for a blog post they wrote
 * DigitalOcean sends them an automated message saying that their droplet (machine/VM) will be suspending if they don't delete the offending post within 24 hours
 * user appeals and appeal goes through; unclear if it would've gone through without the viral HN thread about this
* User banned from FB marketplace for "violating community guidelines" after posting an ad for a vacuum
 * user appeals multiple times and each appeal is denied, ending with "Unfortunately, your account cannot be reinstated due to violating community guidelines. The review is final"
* Reporting post advocating for violence against a person does nothing
* Reporting post where one user tells another user to kill themselves does nothing
* Murdered person is flooded with racist comments; friends report these, which does nothing
* 40000 word series of articles by Erin Kissane that I'm not going to attempt to summarize
* Facebook doesn't take down obvious scam ads after reporting them
* User stops reporting obvious scam ads to Facebook because they never remove them, always saying that the ad didn't breach any standards
* Takeover of dead person's Facebook account to run scams
* See "Kamantha" story in body of post
* Facebook refuses to do anything about account that was taken over and constantly posts scams
* Facebook refuses to do anything about fake page for business
* Reporting scammer on facebook does nothing
* Paying for "creator" level of support on Facebook / insta appears to be worthless
 * Reviews is that support is sort of nice, in that you get connected to a human being who isn't reading off a script, but also useless. At one point Jonny Keeley had a video didn't upload and support's recommendation was to try editing the video again and uploading it again. Keeley asked support why that would fix it and the answer was basically, there's no particular reason to think that it might fix it, but it might also just work to re-upload the video. Another time, Keeley got "hacked" and went to support. Support once again responded quickly, but all they did was send him a bunch of links that he thinks are publicly available. Keeley was hoping that support would fix the issue, but instead they appear to have given him information he could've googled.
* Zuckerberg rejected proposals to improve teen mental health from other FB execs
 * article notes that "that a lack of investment in well-being initiatives meant Meta lacked 'a roadmap of work that demonstrates we care about well-being.'"
* Malicious Google ad from Google-verified advertiser; ad only removed after major publication writes a story about it
 * A user notes that something that amplifies the effectiveness of this attack is that Google allows advertisers to show fake domains, which is necessary for them to do tracking as they currently do it and not show some weird tracking domain
* User gets lifetime ban from running ads because they ran ads for courses teaching people to use pandas (the python library)
 * User hits appeal button on form and is immediately banned for life. Someone notes that the appeal button is a trap and you should never hit the appeal button???. Apparently you should fill out some kind of form that you won't be able to fill out if you hit the appeal button and are immediately banned?
* User notes pervasive scam ads
* You can deactivate anyone's WhatsApp account by sending an email asking for it to be deactivated
 * This is sort of the opposite of all those scam FB accounts where reporting that the account is scamming does nothing
* User has innocuous Threads message removed for "violating Community guidelines", and then asks why there's so much spam that doesn't get removed but their message gets remove
* User has Threads message removed with message saying that it violates community guidelines; message is a reply to themselves that reads "(Also, please don't respond to this with some 'well, on the taxpayer funding front, I think they have a point...' stuff. If you can read an article that highlights efforts to push people like me out of society and your takeaway is 'Huh, I think those people have a point!' then I'd much rather you not comment at all. I "
 * Like many others, user notes that they've repeatedly reported messages that do actually violate community guidelines and these messages don't get removed
* Rampant fraud on Instagram, Facebook, and WhatsApp
* Meta moderation in Kenya
* Facebook removes post showing art, electronics, and wheelchair mods is "hate speech"
 * No support action does anything, but the post is restored after the story about this goes viral
* User notes that stories that vaguely resemble holding a gun to one's head, such as holding a hair dryer to one's head, get flagged
* User reports threads desktop isn't usable for them for 6 weeks and then suddenly starts working again; logging in on most browsers give them an infinite loop
* Dead link due to Mastodon migration, but comment about FB spam which used to be accessible in https://mastodon.social/@jefftk@mastodon.mit.edu/109826480309020697
* User banned from Facebook's 2FA system (including WhatsApp, Insta, etc., causing business Insta page to get deleted) due to flaw in password recovery system
 * Despite having 2FA enabled, someone was able to take over this person's FB account. On appealing this, user is told "We've determined that you are ineligible to use Facebook"
 * User also used FB login for DMV and is no longer able to log into DMV
 * New accounts the user creates are linked to the old account and banned. Someone comments, "lol so they can identify/verify that but somehow fail to fingerprint login from Vietnam and account hijacking."
 * As usual, multiple people have the standard response that it's the user's fault for using a big platform and that no one should use these platforms, with comments like "It's common sense and obvious, yet whenever it gets mentioned, the messenger gets dunked on for victim blaming or whatever ... Somehow, this is a controversial opinion on HN" (there are many more such comments; I just linked a couple)
 * The author, who already noted in the post that his industry is dependent on Instagram asks "Please educate me on how to get the potential clients to switch platforms that they use to view pictures?" and didn't get a response; presumably, as is standard, none of these commenters read the post, although perhaps some of them just think that no one should work in these industries and anyone who does so should go flip burgers or something
* User's account banned after it was somehow compromised from a foreign IP
 * User gets the standard comment about how FB couldn't possibly review cases like this due to its scale
* User effectively banned from Facebook due to broken password recovery process, which requires getting total strangers to vouch that you're a real person, presumably due to some bad ML.
 * Afterwards, some scammer created a fake profile of the person, so there's now a fake version of the person around on FB and not a real one
* User effectively banned from FB due to bad "suspicious activity" detection despite having 2FA on and having access to their password and 2FA
* User repeatedly has account suspended for no discernable reason
* User effectively banned from FB until a friend of theirs starts a jos a job there, at which point their friend opens an internal ticket to get them unbanned
* User banned from FB after account hacked
* User banned from FB after account hacked
 * See comments for many other examples
* User banned from facebook after account hacked
 * Luckily for the user, this made the front page of HN and was highly ranked, causing some FB engineers to reach out and then fix the issue
 * Of course the HN post has the standard comments; one commenter suggests that people with the standard comments actually read the article before commenting, for once: "Anyone saying 'Good riddance! Go enjoy your life without Facebook!' is missing the point. Please read this bit from the article:"Thing is I’m a Mum of two who has just moved to a new area. Facebook groups have offered me support and community, and Mums I’ve met in local playgrounds have added me as a friend so we can use messenger to plan playdates. Without these apps sadly my little social life becomes a lot lonelier, and harder."
 * Undeterred, commenters respond to this comment with things like "this might actually have been a blessing in disguise--just the encouragement she needed to let go and move on from this harmful platform."
* People who don't know employees at FB who can help them complain on Google Maps about their Facebook's anti-fraud systems
* User banned from Facebook after posting about 12V system on Nissan Leaf in Nissan Leaf FB group
 * The post was (presumably automatically) determined to have violated "community standards", requiring identify verification to not be banned
 * "OK, I upload my driving licence. And it won't accept the upload. I try JPEG, PNG, different sizes, different browsers, different computers. Nothing seems to stick and after a certain number of attempts it says I have to wait a week to try again. After as couple of rounds of this the expiry deadline passes and my account is gone."
* Person notes that their wife and most of their wife's friends have lost their FB accounts at least once
* Person notes that girlfriend's mother's account was taken over and reporting the account as being taken over does nothing
 * The person, a programmer, finds it odd that taking over an account and changing the password, email, profile photo, full name, etc., all in quick succession doesn't trigger any kind of anti-fraud check
* User reports that you can get FB accounts banned by getting people in groups dedicated to mass reporting accounts to all report an account you want to get banned
* Someone wrote a spammy reply to a "tweet" of mine on Threads that was trending (they replied with a link to their substack and nothing else). I reported it and, of course, nothing happened. I guess I neeed to join one of the mass reporting groups to ask a bunch of people to report the spam.
* User is locked out of account and told they need to upload photo ID, which does nothing
 * Six months later, user gets to know a Facebook employee, who gets them unbanned
* User has Facebook account banned and can't get it unbanned
 * User tried to contact FB employees on linkedin, which failed
 * User then used instagram to meet FB employees and sleep with them, resulting in the account getting unbanned
* User is effectively banned from instagram because they logged in from a new device and can't confirm a no-longer active email
* User gets FB account stolen, apparently bypassing 2FA check the user thought would protect them
 * White male, father of 3 FB account replace by young Asian female account, apparently not at all suspicious to FB anti-fraud systems
* User finds that someone is impersonating them on Instagram; reporting this does nothing
* User has ad account hacked; all attempts to contact support get no response or a useless auto-response or a useless webpage
* User reports that there are multiple fake accounts impersonating them and family members and that reporting these accounts does nothing
* Relatively early post-IPO Facebook engineer has account banned from Facebook and of course no standard appeal process works
 * User reports that their engineering friends inside the company are also unable to escalate the issue, so their account as well as ads money and Oculus games are lost
* Sophisticated/technical user gets Instagram account stolen despite using strong random password, password manager, and 2FA
 * Crypto people had been trying to buy the account for 6 months and then the account was compromised
 * Following Instagram's official instructions for what to do literally results in an infinite loop of instructions
 * Instagram claims that they'll send you an email from `security@mail.instagram.com` if you change the email on your account, but this didn't happen; user looked at their Fastmail logs and believes that their email was not compromised
 * User was able to regain their Insta account after the story hit the front page of HN
 * Multiple people note that there are services that claim to be able to get you a desired Insta handle for $10k to $50k; it's commonly believed that this is done via compromised Facebook employees. Since there is (in general) no way to appeal or report these things, whatever it is that these services do is generally final unless you're famous, well connected in tech, or can make a story go viral about you
* Desirable Instagram handle is stolen
 * The first two times this happened, user was able to talk to a contact inside Facebook to fix it, but they lost their contact to Facebook so the handle was eventually stolen and appears to be gone forever
* User tries to recover their mother's hacked Instagram account and finds that the recovery process docs are an infinite loop
 * They also find that the "click here if this login wasn't you" e-mail anti-fraud link when someone tries to log in as you is a 404
 * They also find that if an account without 2FA on gets compromised and the attacker turns on 2FA, this disables all old recovery mechanisms.
* User logs in and is asked for email 2FA
 * Email never arrives, isn't in spam folder, etc.
 * User asks for another code, which returns the error "Select a valid choice. 0 is not one of the available choices."
 * Subsequent requests for codes fail. User tries to contact support and gets a pop-up which says "If you’re unable to get the security code, you need to use the Instagram app to secure your account", but the user doesn't have the Instagram app installed, so their account is lost forever
* Instagram takes username from user to give it to a more famous user, a common story
* User with password, 2FA, registered pgp key (!?) gets locked of account due to some kind of anti-fraud system triggering; FB claims that only a passport scan will unlock the account, which the user apparently hasn't tried
* User finds that it's not possible to move Duo 2FA and loses account forever
 * According to the user, FB has auth steps to handle this case, which involves sending in ID docs, which the user tries annually. These steps do nothing
* User with Pixel phone can't use bluetooth for months because Google releases an update that breaks bluetooth (presumably only for some and not all devices) and doesn't bother to fix it for months
* I tried clicking on some Facebook ads (I normally don't look at or click on them) leading up to Black Friday and most ads were actually scams
* User reports fake FB profile (profile uses images from a famous dead person) and gets banned after reporting the profile a lot; user believes they were banned for reporting this profile too many times
* User makes FB post about a deepfake phishing attack, which then attracts about 1 spam comment per minute that they have to manually delete because FB's systems don't handle this correctly
* FB Ad Manager product claims reach of 101M people in the U.S. aged 18-34, but U.S. census has the total population being 76M, a difference of 25M assuming all people in the U.S. in that age group can be reached via FB ads
 * Former PM of the ads targeting team says that this is expected and totally fine because FB can't be expected to slice and dice numbers as small as tens or hundreds of millions accurately. "Think at FB scale".
* User gets banned from FB for a week for posting sexual content when they posted an image of a pokemon
* For maybe five years or so, I would regularly get spam in my feed where a scammer would sell fake sneakers and then tag a bunch of people, tagging someone I'm FB friends with, causing me to get this spam into my feed
 * This exact scam doesn't show up in my feed all the time anymore, but tag spam like this still sometimes shows up
* Instagram takes down account posting public jet flight information when billionaire asks the to

### Amazon

* Author notes that 100% of the copies of their book sold on Amazon are counterfeits (100% because Amazon never buys real books because counterfeiters always have inventory)
 * Author spent months trying to get Amazon to take action on this; no effect
 * Author believes that most high-sale volume technical books on Amazon are impacted and says that other authors have noticed the same thing
* Top USB drive listings on Amazon are scams
* Amazon retail website asks user to change password; Amazon retail account and AWS stop working
 * never restored
* Magic card scam on Amazon
 * many customers report that "rare" cards were removed from packs bought from Amazon
* Counterfeit books sold on Amazon
 * seller of non-counterfeit books reported to Amazon various times over the years without effect
* User notes that Amazon is more careful about counterfeits in Australia than in the U.S. due to regulatory action, and that Valve only issued refunds in some cases due to Australian regulatory action
* User notes that Amazon sells counterfeit Kindle books
* Author notes that Amazon sells counterfeit copies of their book
* Boardgame publisher reports counterfeit copies of their game on Amazon, which they have not been able to get Amazon to remove
 * I saw this on a FB group I'm on since the publisher is running a PR blitz to get people to report the fake copies on Amazon in order to get Amazon to stop selling counterfeits
* Amazon resells returned, damaged, merchandise
 * This is so common that authors warn each other that this happens and so that other authors know that to leave a note in the book telling the user what happened when authors return damaged author's copies of books
* Amazon ships "new" book with notes scribbled on pages and exercises done; on asking for replacement, user gets a 2nd book "new" in similar condition
* Top-selling Amazon fuses dangerously doesn't blow at well above rated current
* Amazon sells used items as new
* Amazon sells used items as new
* Amazon sells used items as new
* Amazon sells used items as new
* Amazon sells used item as new; book has toilet paper inside
* Amazon sells used item as new; book has toilet paper inside
* Amazon ships HDDs in oversized box with no padding
* Amazon sells used or damaged items as new
* Amazon sells used microwave full of food detritus as new
* Amazon sells used pressure cooker with shopping bag and food smell as new
* Amazon sells used vacuum cleaner as new, complete with home address and telephone number of the person who returned the vacuum
* Amazon ships incorrect product to user buying a new item, apparently due to someone returned in different item
* Amazon sells incomplete used item as new
* Amazon sells used items as new
* Amazon sells used item as new, complete with invoice for sale 13 years ago, with name and address of previous owner
* Amazon selling low quality, counterfeit, engine oil filters
* Amazon sells supplements with unlabeled or mislabeled ingredients
 * Someone notes that Amazon used to require certification for supplements, but the person who was driving this left Amazon and it appears that no one has picked it up
* Amazon sells counterfeit shampoo that burns user's scalp
 * User wrote a review, which was deleted by Amazon
* Amazon sells damaged, used, items as new
* Amazon sells counterfeit supplement
 * User wrote a review noting this, which Amazon deleted
* Amazon sells box full of trash as new lego set
* Amazon sells used item with a refurbished sticker on it as new
* User has National Geographic subscription that can't be cancelled through the web interface, so they talk to Amazon support to cancel it; Amazon support cancels their Amazon Prime subscription instead
* Amazon sells used, damaged, item as new
* Amazon sells used item with Kohl's sticker on it as new
* Amazon sells nearly empty boardgame box as new, presumed to be returned item with game removed
* Amazon sells counterfeit board game
* User writes review noting that product tries to buy fake reviews; Amazon deletes their review as being bought because it mentioned this practice
* User writes review noting that product tries to buy fake reviews; Amazon deletes their review as being bought because it mentioned this practice
* User writes review noting that product tries to buy fake reviews; Amazon deletes their review as being bought because it mentioned this practice
* User writes review noting that product tries to buy fake reviews; Amazon deletes their review as being bought because it mentioned this practice
* Amazon sells counterfeit SD cards; user compares to reference SD card bought at brick and mortar store
 * A commenter notes that counterfeit SD cards are so common on Amazon that r/photography has a blanket recommendation against buying SD cards on Amazon
* User leave a review noting that product is a scam/fake an review is rejected
* Counterfeit lens filter on Amazon; multiple users note that they never buy camera gear (which includes things like SD cards) from Amazon because they've received too many counterfeits
* Amazon sells used, dirty, CPU as new CPU; CPU is marked "NOT FOR RESALE" (NFR)
 * it's not known why this CPU is marked NFR; a commenter speculates that it was a review copy of a CPU, in which case it would be relatively likely to be a highly-binned copy that's better than what you'd normally get. On the other hand, it could also be an early engineering sample with all sorts of bugs or other issues; when I worked for a CPU company, we would buy Intel CPUs to test them and engineering samples would not only have a variety of bugs that only manifested in certain circumstances, they would sometimes have instructions that did completely different things that could be reasonable behavior, except that Intel had changed the specified behavior before release, so the CPU would just do the wrong thing, resulting in crashes on real software (this happened with the first CPU we were able to get that had the `MWAIT` instruction, an engineering sample that was apparently from before Intel had finalized the current behavior of `MWAIT`).
* Amazon doesn't refund user after they receive empty box instead of $2100 item, but there's a viral story about this, so maybe Amazon will fix this
* Amazon refuses to refund user after sending them an old, used, camera lens instead of high-end new lens
 * On the photography forum where this is posted, users note that you should never by camera lenses or other high-end gear from Amazon if you don't want to risk being scammed
* Amazon doesn't refund user after sending them a low-end used camera lends instead of the ordered high-end lens
 * Users on this photography forum (a different one than the above) note that this happens frequently enough that you should never order camera lenses from Amazon
* Amazon refuses to refund user who got an empty box instead of a $7000 camera until story goes viral and Amazon gets a lot of bad press
 * Based on the shipping weight, Amazon clearly shipped something light or an empty box and not a camera
* User gets constant stream of unwanted Amazon packages
 
 * In response to a news story, Amazon says "The case in question has been addressed, and corrective action is being taken to stop the packages", but the user reports that nothing has changed
* Amazon sells user used AirPods, which later causes a problem when they want to use the 1-year warranty because Apple shows an in-service date 2 months before the user bought the item
 
 * To fix this, Apple requests that the user get some evidence from Amazon that the particular serial number was associated with their purchase and Amazon refuses to do this; people recommend that, to fix this, the user do the "standard" Amazon scam of buying a new item and returning a used item to swap a broken used item for a new item
* User receives old, used, HD from Amazon instead of new HD
 
* Mechanic warns people not to buy car parts on Amazon because counterfeits are so frequent
 
 * They note that you can get counterfeits in various places, but the rate is highest from Amazon and it's often a safety issue; they're current dealing with a customer who had counterfeit brake pads
 * Many other mechanics reply and report similar issues, e.g., someone bought a water pump from Amazon that exploded after 5 months that they believe is fake
* User stops buying household products from Amazon because counterfeit rate is too high
 
* User gets counterfeit card game from Amazon
 
* User gets counterfeit board game from Amazon
 
* Amazon sells counterfeit gun parts and accessories
 
* Amazon sells so many counterfeits that board game maker runs a marketing campaign to ask people to stop buying their game on Amazon
 
 * They spent months trying to get Amazon to go after counterfeits without making progress until the marketing campaign; two days after they started it, Amazon contacted them to try to deal with the issue
* Searching for items in many categories trivially finds huge number of fraudulent or counterfeit items
 
* User gets counterfeit hair product that burns scalp
 
* User receives used book from Amazon and their friend tells them that it's normal to buy books and return them in the return window, which their friend does all the time
 
* Amazon driver mishears automated response from Eufy doorbell, causing Amazon to shut down user's smarthome (user was able to get smarthome and account back after one week)
 
 * Video footage allegedly shows that the doorbell said "excuse me, can I help you", which lead to an Amazon executive personally accusing this user of racism; when account was unlocked, the user wasn't informed (except that things started working again)
 * In the comments to the article, someone says that it's impossible that Amazon would do this, with comments like "None of this makes any sense and is probably 100% false.", as if huge companies can't do things that don't make any sense, but Amazon's official response to a journalist reaching our for comment confirms that the something like the events happened; if it was 100% false, it would be very strange for Amazon to respond thusly instead of responding with a denial or not responding
* Youtuber who made a video about the above has their Amazon Associates account deleted after video goes viral
 
* Amazon account gets locked out; support refuses to acknowledge there's an issue until user calls back many times and then tells user to abandon the account and make another one
 
* User has Amazon account closed because they sometimes send gifts to friends back home in Belarus
 
* User gets counterfeit item from Amazon; they contact support with detailed photos showing that the item is counterfeit and support replies with "the information we have indicates that the product you received was authentic"
 
* User gets the wrong GPU from Amazon, twice; luckily for them, the second time, Amazon sent a higher end GPU than was purchased, so the user is getting a free upgrade
 
* Technical book publisher fails to get counterfeits removed from Amazon
 
 * Amazon announced a new system designed to deal with this, but people continue to report rampant technical book counterfeiting on Amazon, so the system does not appear to have worked
* ChatGPT clone of author's book only removed after Washington Post story on problem
 
* Searching for children's books on Amazon returns AI generated nonsense
 
* Amazon takes down legitimate cookbook; author notes "They won't tell us why. They won't tell us how to fix whatever tripped the algorithm. They won't seem to let us appeal. Reaching a human at Amazon is a Kafkaesque experience that we haven't yet managed to do."
 
 * When I checked later, not restored despite viral Mastodon thread and highly upvoted/ranked front-page HN article
 * Multiple people give the standard response of asking why booksellers bother to use Amazon, seemingly unaware (???) that Amazon has a lot of marketshare and authors can get a lot more reach and revenue on Amazon than on other platforms (when they're not arbitrarily banned) (the author of the book replies and says this as well, but one doesn't need to be an author to know this)
* Amazon basically steals $250 from customer, appeal does nothing, as usual
 
* Amazon delivers package directly to food waste / compost bin and declines to provide any compensation
 
 * User notes that they had a nice call with Amazon support and that they hope this doesn't happen again. From my experience with trying to get Amazon to stop shipping packages via Intelcom and Purolator, I suspect this user will have this problem happen again — I've heard that you can get them to not deliver using certain mechanisms, but you have to repeatedly contact support until someone actually puts this onto your file, as opposed to just saying that they'll do it and then not doing it, which is what's happened the two times I've contacted support about this
* User receives fake GPU from Amazon, after an attempt to buy from the official Amazon.com msi store
 
* Amazon Fresh order comes with bottle of urine
 
* Amazon sells many obviously fake 16 TB physically tiny SSD drives for $100
 
 * The author sent a list of fakes to Amazon and a few disappeared. The author isn't sure if the listings that disappeared were actually removed by Amazon or if it's just churn in the listings
 * An HN commenter searches and also finds many fakes, which have good reviews that are obviously for a different product; someone notes that they've tried reporting these kinds of obvious fakes where someone takes a legitimate product with good reviews and then swaps in a scam product but that this does nothing
 * Multiple people note that they've tried leaving 1\* reviews for fake products and had these reviews rejected by Amazon for not meeting the review policy guidelines
 * Some time after this story made the front page of HN, this class of fakes got cleaned up. However, other fakes that are mentioned in the HN comments (see item directly below this) did not get cleaned up; maybe someone can write an article about how these other items are fake to get these other things cleaned up as well
* User notes that bestselling item on Amazon is a fake item and that they tried to leave a review to this effect, but the review was rejected
 
 * I looked up the item and it's still a bestselling item. There are some reviews which indicate that it's a fake item, but this fake item seems to have been on sale for years
* Amazon sells Android TV boxes that are actually malware
 
 * It appears that these devices have been on sale on Amazon at least since 2017; I clicked the search query in the link of the above post and it still returns many matching devices in 2014
* Amazon scammer causes user to get arrested and charged for fraud, which causes user to lose their job
 
 * The user also notes "In Canada, a criminal record is not a record of conviction, it’s a record of charges and that’s why I can’t work now. Potential employers never find out what the nature of it is, they just find out that I have a criminal arrest record."
 * For more information on how the scam works, see this talk by Nina Kollars
* An Amazon seller story
 
 * It's unclear exactly what's going on here since some parts of the seller's story appear to be false? Some parts are quite plausible and really terrible if true
* Illegal weapon a bestselling item on Amazon, although this does get removed after it's reported
 
* Fake Amazon listings with titles and descriptions like "I'm sorry but I cannot fulfill this request it goes against OpenAI use policy. My purpose is to provide helpful and respectful information to users"
 
 * The most obvious cases seem to have been cleaned up after a story about this hit #1 on HN
 * Someone noted that the seller's page is still up (which is still true today) and if you scroll around for listings, other ones with slightly different text, like "I'm sorry I cannot complete this task there isn't enough information provided. Please provide more context or information so I can assist you better " are still up
 * These listings are total nonsense, such as the above, which has a photo of a cat and also says "Exceptional Read/Write Speeds: With exceptional read/write speeds of up to 560MB and 530MB "
 * I checked out other items from this seller, and they have a silicone neck support "bowl" that also says "Note: Products with electrical plugs are designed for use in the US. Outlets and voltage differ internationally and this product may require an adapter or converter for use in your destination. Please check compatibility before purchasing.", so it seems that someone at Amazon took down the listings that HN commenters called out (the HN thread on this is full of HN commenters pointing out ridiculous listing and those individual listings being taken down), but there's no systematic removal of nonsense listings, of which there are many
* I tried to buy 3M 616 litho tape from Amazon (in Canada) and every listing had a knock-off product that copy+pasted the description of 3M 616 into the description
 
 * It's possible the knock-off stuff is as good, but it seems sketchy (and an illegal trademark violation) to use 3M's product description for your own knock-off product; at least some reviews indicate that expected to get 3M 616 and got a knock-off instead
* When searching for replacement Kidde smoke detectors on amazon.ca, all of the one I found are not Canadian versions, meaning they're not approved by SA, cUL, ULC or cETL. It's possible this doesn't matter, but in the event of a fire and an insurance claim, I wouldn't want to have a non-approved smoke detector
 
* Amazon store selling 5 year old tires as new (tires age over time and 5 year old tires should not be sold as new)

### Microsoft

This includes GitHub, LinkedIn, Activision, etc.

* Microsoft AI generated news articles put person's photo into a story about a different person's sexual misconduct trial
 * Other incorrect AI generated stories include Joe Biden falling asleep during a moment of silence for Maui wildfire victims, a conspiracy theory about Democrats being behind the recent covid surge, and a story about San Francisco Supervisor Dean Preston resigning after criticism by Elon Musk; these seem to be a side effect of laying off human editors and replacing them with AI
 * Other results include an obituary for a former NBA player who died at age 42, titled "Brandon Hunter useless at 42" and AI generated poll attached to a Guardian article on a deceased 21-year old woman, "What do you think is the reason behind the woman’s death" with the options "murder, accident, or suicide"
* User banned from GitHub for no discernable reason
 * User happens to be co-founder of GitHub, so this goes viral when they tweet about it, causing them to get unbanned; GitHub's COO responds with "You're 100% unsuspended now. I'm working with our Trust & Safety team to understand what went wrong with our automations and I'm incredibly sorry for the trouble."
* Gary Bernhardt, a paying user of GitHub files a Privacy / PII Github support request
 * ignored for 51 days, until Gary creates a viral Twitter thread
* LinkedIn user banned after finding illegal business on LinkedIn and reporting it
 * seems like the illegal business used their accounts to mass report the user
* LinkedIn user banned for looking at too many profiles
 * appeal rejected by customer service
 * this also happened to me when I was recruiting and looking at profiles and I also got nonsens responses from customer service, although my account wasn't permanently banned
* Azure kills entire company's prod subscription because Azure assigned them a shared IP that another customer used in an attack
* GitHub spam is out of control
* Outlook / Hotmail repeatedly incorrectly blocks the same mail servers; this can apparently be fixed by:
 * Visit https://olcsupport.office.com/ and submitting the complaint; Wait for the auto-reply, followed by the "Nothing was detected" email; replying with "Escalate" in the body, which then causes the server to get unblocked again in a day
* User reports that, every December, users on the service get email rejected by Microsoft, which needs to be manually escalated every year
* User running mail server on same IP for 10+ years, with no one else using IP, repeatedly has Microsoft block mail from the IP address, requiring manual escalation to fix each time
* Whitelisting a server doesn't necessary allow it to receive email if Microsoft decides to block it; a Microsoft employee thinks this should work, but it apparently doesn't work
* Microsoft arbitrarily blocks email from user's server; after escalation, they fix it, but only for hotmail and live.com, not Office 365
* OpenAI decides user needs to do 80 CAPTCHAs in a row to log in
 * In response to this, someone sent me: "Another friend of mine also had terrible issues even signing up for openai -- they told him he could only use his phone number to sign up for a maximum of 3 accounts, and he tried telling them that in fact he had only ever used it to sign up for 1 account and got back the same answer again and again (as if they use their own stuff for support) ... he said he kept trying to emphasize the word THREE with caps for the bot/human on the other end" \[but this didn't work\]
* User reports software on GitHub that has malware installer three times and GitHub does nothing
* I used linkedin for recruiting, which involved (manually) looking at people's profiles and was threatened with a ban for looking at too many profiles
 * The message says you should contact support "if you think this was in error", but this returns a response that's either fully automated or might as well be and appears to do nothing
* Gary Bernhardt spends 5 days trying to get Azure to take down phishing sites, which did nothing
 * Gary has 40k Twitter followers, so he tweeted about it, which got the issue fixed after a couple of days. Gary says "No wonder the world is so full of scams if this is the level of effort it takes to get Microsoft to take down a single phishing site hosted on their infrastructure".
* Spammer spams GitHub repos with garbage issues and PRs for months
 * After I made this viral Mastodon thread about this which also made it to the front page of HN, one of the two accounts was suspended, but when I checked significantly later, the other was still around and spamming
 * I did not report this account because I reported a blatant troll account (which I know was banned from Twitter and lobsters for trolling) and got no action, and I've seen many other people indicate that they find GitHub reporting to be useless, which seems to have been the case here; one person noted that, before my viral thread, they had already blocked the account from a repo they're a maintainer and didn't bother to report because of GitHub's bad reporting flow
* Microsoft incorrectly marks many blogs as spam, banning them from Bing as well as DuckDuckGo
 * Fixed sometime after a post about this went viral
* GitHub Copilot emits GPL code
* Windows puts conspiracy theory articles and other SEO spam into search menu
* Microsoft bans people using prompt injections on BingGPT
* User finds way to impersonate signed commits from any user because GitHub uses regexes instead of a real parser and has a bug in their regex
 * Bug report is initially closed as "being able to impersonate your own account is not an issue", by someone who apparently didn't understand the issue
 * After the user pings the issue a couple more times, the issue is eventually re-opened and fixed after a couple months, so this is at least better than the other GitHub cases we've seen, where someone has to make a viral Twitter thread to get the issue fixed
 * In the HN comments for the story, someone notes that GitHub is quick to close security issues that they don't seem to have looked closely at
* User is banned from GitHub after authorizing a shady provider with a login
 * Of course this has the standard comments blaming the user, but people note that the "log in with GitHub" prompt and the "grant this service to act on your behalf" prompt look almost identical; even so, people keep responding with comments like "dont bother wasting anymore resources to protect the stupids"
* Activision's RICOCHET anti-cheat software is famous for having a high false positive rate, banning people from games they paid for (this also bans people from playing "offline" in single-player mode)
 * User had their game crash 8 times in a row due to common problems (many people reported crashes with the version that crashed for this user), which apparently triggered some kind of false positive in anti-cheat software
 * Support goes well beyond what most companies respond with, and responds with "Any specifics regarding the ban will not be released in order to help maintain the integrity and security of the game, this is company policy that will not be changing."
 * Since this software is famous for being inaccurate and having a high false positive rate, there are a huge number of accounts of false bans, such as this one. In order to avoid doubling the length of this post, I won't list these
* Relatively rare case of user figuring out why they were incorrectly banned by Activision and getting their account restored
 * Of course support was useless as always and trying to get help online just resulted in getting a lot of comments blaming the user for cheating
 * User was banned because, after Activision and Blizzard were merged, their Blizzard username (which contains the substring "erotica") became illegal, causing them to be banned by Activision's systems. But, unlike a suspension for an illegal username in Blizzard's system, Activition's system doesn't tell you that have an illegal username and just bans you
 * Luckily, the user was able to find a single reddit post by someone who had a similar issue and that post had a link that lets you log into the account system even if you're banned, which then lets you change your username
 * Three days after making that change, the user was unbanned
* User who bought Activision game to play in single-player campaign mode only banned for cheating after trying to launch/play game on Linux through Wine/Proton
 * Support gave user the runaround and eventually stopped responding, so user appears to be permanently banned
* Anti-"cheat" software bans users before they can even try playing the game
 * Someone speculates that it could be due to buying refurbished hardware, since Activision bans based on hardware serial numbers and some people were banned because they bought SSDs from banned machines
* Anti-"cheat" software bans user from Bungie (Activision) game for no discernable reason; user speculates it might be because AutoHotkey to script Windows (for out of game activities)
* Minecraft user banned for 7 days for making sign that says Nigel on their mom's realm (server, basically?); other users report that creating or typing something with the substring "nig" is dangerous 
 * See also, offensive words in Minecraft
* Microsoft Edge incorrectly blocks a page as being suspicious
 * Developer tries to appeal, but is told that they need to send a link to a URL for the support person to look at, which is impossible because it's an API server that has no pages. Support does not reply to this.
* User banned from WoW for beating someone playing with 60 accounts, who submits 60 false reports against user; people report this kind of issue in Overwatch as well, where mass reporting someone is an easy way to get Blizzard to suspend or ban their account
* User suspends user from WoW for not renaming their pet from its default name of "Gorilla", which was deemed to be offensive

### Stripe

* Turns off account for a business that's been running since 2016 with basically the same customers. After a week of talking to tech support, the account is reactivated and then, shortly afterwards, 35% of client accounts get turned off. Account reactivated after story got 1k points on HN
* Stripe holds $400k from account and support just gives developer the runaround for a month
 * Support asks for 2 receipts and then, after they're sent, asks for the same two receipts again, etc.
 * As usual, HN commenters blame the developer and make up reasons that the developer might be bad, e.g., people say that the developer might be committing fraud. From a quick skim, at least five people called the developer's story fake or said or implied that the developer was involved in some kind of shady activity
 * Shortly after the original story made HN, Stripe resolved the issues and unlocked the accounts, so the standard responses that the developer must be doing something fraudulent were wrong again; a detailed accounting of what happens makes it clear that nothing about Stripe's response, other than the initial locking for potential fraud, was remotely reasonable
 * The developer notes that Stripe support was trying to stonewall them until they pointed out that there was a high-ranking HN post about the issue: "Dec 30 \[over one month from the initial freezing of funds\]: While I was writing my HN post I was also on chat with Stripe for over an hour. No new information. They were basically trying to shut down the chat with me until I sent them the HN story and showed that it was getting some traction. Then they started working on my issue again and trying to communicate with more people. No resolution."
 * After the issue was resolved, the developer was able to get information from Stripe about why the account was locked; the reason was that the company had a spike in sales due to Black Friday. Until the issue hit the top of HN, the developer was not able to talk to any person at Stripe who was useful in any way
* Developer at SaaS for martial arts academies in Europe notes that some new anti-fraud detection seems to be incorrectly suspending accounts; their academies have their own accounts and multiple got suspended
 * These stories are frequent enough that someone responds "Monthly HN Stripe customer support thread", to which the moderator of HN responds that it's more than monthly and HN will probably have to do something about this at some point, since having the HN front page be Stripe support on a regular basis is a bit much
 * Doing a search now, there are still plenty of support horror stories, but they typically don't get many votes and don't have Stripe staff drop in to fix the issue, so it seems that this support channel no longer works as well as it used to.
 * Multiple people point out issues in how Stripe handles SEPA DD and other users of Stripe note that they're impacted by this as well
 * Of course, this gets the usual responses that we need to see both sides of the story, maybe you're wrong and Stripe is right, etc.; the developer responds to one of these with an apology for their error
* After account was approved and despite many tests using the Stripe test environment, on launch, it turns out that the account wasn't approved after all and payments couldn't go through. Some people say that you should send real test payments before launch, but someone notes that using real CC info for tests and not the Stripe test stuff is a violation of Stripe's terms
* Stripe user notes that Stripe fraud detection completely fails on some trivial attacks, writes about it after seeing it hit them as well as many other Stripe users
 * Developer describes the support they received as "a joke" since they had to manually implement rules to block the clearly fraudulent charges
 * A stripe developer replies and says they'll look into it after two threads on this go viral
* Shut down payments for job board; seems to have been re-activated after Twitter thread
* Turned off company without warning; company moved to Parallel Economy
* Wording of Stripe's renewal email causes users of service to think that you have to email the service to cancel; issue gets no action for a year, until Gary Bernhardt publicly tweets about it
* User has Stripe account closed for no discernable reason
* Stripe user has money taken out of their account
 * A Stripe employee responds with "we wouldn't do so without cause", implying that Stripe's error rate is 0%
* Stripe arbitrarily shuts down user's business
 * Payments restored after story goes viral on HN
 * This happens so frequently that multiple people comment on how often this happens and how this seems to be the only way to get support from Stripe for some business-killing issues
* Developer notes that Stripe fraud detection totally failed when people do scams via CashApp
 * Another developer replies and notes that it's weird that you can block prepaid cards but not CashApp when CashApp is used for so much scamming
* Developer has payments frozen, initially because account was misclassified and put into the wrong risk category
 * Developer notes that suspension is particularly problematic because a "minimum fee commitment" with Stripe where they get a discount but also have a fee floor regardless of transaction volume; having payments suspending effectively increases their rate
 * After one week, their account was unfrozen, but then another department froze their account, " this time by a different Stripe risk team with even weirder demands: among other things, they wanted a 'working website' (our website works?) and 'contact information to appear on the website' (it's on every page?) It was as if Stripe had never heard of or talked to us before, and just like the other risk team, they asked questions but didn't respond to our emails."
 * This also got resolved, but new teams keep freezing their account, causing the developer to go through a similar process again each time
 * Fed up with this, the developer made an HN post which got enough upvotes that the Stripe employee who handles HN escalations saw the post
 * Of course, someone has the standard response that this must be be the user/developer's fault, it must be because the business is shady or high risk, one that typically gets banned from payment processors, but if that's the case, that makes this example even worse — why would Stripe negotiate a minimum fee agreement with a business they expect to ban and how come the business keeps getting unbanned each time after someone bans them
 * Also, multiple people report having or seeing similar experiences, "I find it totally believable after having to work through multiple internal risk teams to get my test accounts past automated flaggers", etc
* Stripe suspends account and support doesn't respond when suer wants to know why
 * User notes that they can't even refund their users: "when I attempted to process a refund for a customer who had been injured & was unable to continue training, I get an error message stating I am unable to process refunds! Am I supposed to tell my customer that my payment process won't refund his money? FYI - The payment I am attempting to refund HAS NOT been paid out yet - the money is sitting in my stripe account - but they refuse to refund it or even dignify me with a response."
 * Many people comment on bad Stripe support has been for them, even this happy customer: "We’re using stripe and are overall happy. But their customer support is pretty bad. Lots of canned replies and ping-pong back and forth until you get someone to actually read your question"
* Stripe account suspended due to a lien; after the lien is removed, Stripe doesn't unsuspend the account and the account is still frozen
 * Luckily, the son of the user is a programmer who knows someone at Stripe, so the issue gets fixed
* Developer's Stripe account is suspended with a standard message seen in other Stripe issues, "Our systems recently identified charges that appear to be unauthorized by the customer, meaning that the owner of the card or bank account did not consent to these payments. This unfortunately means that we will no longer be able to accept payments ... "
 * Developer pressed some button to verify their identity, which resulted in "Thank you for completing our verification process. Unfortunately, after conducting a further review of your account, we’ve determined that we still won't be able to accept payments for xx moving forward". They then tried to contact support, which did nothing
 * After their HN post hits the front page, someone looks into it and it appears that the issue is fixed and the developer gets an email which reads "It looks like some activity on your account was misidentified as unauthorized, causing potential charge declines and the cancellation of your account. This was a mistake on our end, so we've gone ahead and re-enabled your account." The developer notes that having support not respond until you can get a front-page HN post is a poor support strategy for users and that they lost credit card renewals during the time the account was suspended
* Developer has product launch derailed when Stripe suspends their account for no discernable reason; they try talking to support which doesn't work
 * What does work is posting a comment on a front-page HN thread about someone else's Stripe horror story, which becomes the top comment, which causes a Stripe employee to look at the issue and unsuspend the account
* Stripe bans developer for having too many disputes when they've had one dispute, which was a $10 charge where they won on submitting evidence about the dispute to J.P. Morgan, the user's bank
 * The developer appeals and receives a message saying that they're "after further conducting a review of your account, we've determined that we still won't be able to accept payments ... going forward. Stripe can only support users with a low risk of customer disputes. After reviewing your submitted information and website, it does seem like your business presents a higher level of risk than we can currently support"
 * After the story hits #1 on HN, their account is unbanned, but then a day later, it's rebanned for a completely different reason!
* Developer banned from Stripe; they aren't sure why, but wonder if it's because they're a Muslim charity
* User, who appears to be a non-technical small business owner has their Stripe account suspended, which also disabled the "call for help" button or any other method of contacting support
 * After six weeks, they find HN and make a post on HN, which gets the attention of someone at Stripe, and they're able to get their information out of Stripe and move to another payment processor, though they mention that they lose 6 weeks of revenue and close with "please..do better. You're messing with people's livelihoods"
* Developer notes that the only way they've been able to get Stripe issues resolved is by searching LinkedIn for connections at Stripe, because support just gives you the runaround
* User (not using Stripe as a service, someone being charged by Stripe) gets fraudulently charged every month and issues a chargeback every month
 * To stop having to issue a chargeback each month, user is stuck in a support loop where Stripe tells them to contact the credit card company and the credit card company tells them to contact Stripe t
 * Stripe support also responds nonsensically sometimes, e.g., responding and asking if they need help resetting their password
* Developer notes that Stripe's "radar" fraud detection product misses extremely simple fraudulent cases​​, such as "Is it a 100th charge coming from the same IP in Ukraine with a Canadian VISA", or "Same fake TLD for the email address, for a customer number 2235", so they use broad rules to reject fraudulent charges, but this also rejects many good charges and causes a loss of revenue

### Uber

* Former manager of payments team banned from Uber due to incorrect fraud detection
 * engineer spends six months trying to get it fixed and it's eventually fixed via adding a whitelist that manually unbans the former manager of the payments team, but the underlying issue isn't fixed
* UberEats driver has accounted deactivated for not delivering drugs
 * Driver originally contacted Uber support, who told them to contact the police. The police confirmed that the package contained crack cocaine
 * The next day, Uber support called the driver and asked what happened. After the driver explained, support told them they would report the package as having being delivered to the police
 * Shortly afterwards, driver's account was deactivated for not delivering the drugs
* Despite very clear documentation that UberEats delivered the wrong order, Uber refuses to refund user
* User has account put into a degraded state because user asked for too many refunds on bad or missing items
* User has account put into a degraded state because user asked for refund on missing item
* I often wonder if the above will happen to me. My local grocery store delivers using DoorDash and, most of the time, at least one item is missing (I also often get items I didn't order that I don't want); either the grocery store or the driver (or both) seem to frequently accidentally co-mingle items for different customers, resulting in a very high rate of errors
* Asking for refund on order with error puts account into degraded state
* Uber refuses to refund item that didn't arrive on UberEats, until user threatens to send evidence of non-refund to UK regulatory agency, at which point Uber issues the refund
* Uber refuses to refund user when Uber Eats driver clearly delivered the wrong item; item isn't even an Uber delivery (it's a DoorDash delivery)
* A friend of mine had an Uber stop in the wrong place (it was multiple blocks away and this person ordered an Uber to pick them up from a medical appointment because they're severely concussed, so much so that walking is extremely taxing for them); the driver refused to come to them, so they agreed to go to the driver. When they were halfway there, the driver canceled the order in a way that caused my friend to pay a cancellation fee
* User receives a 6 pack instead of 12 pack from Uber Eats and customer service declines to refund the difference
 * In the comments, other people report having the same issue
* Uber refuses to issue refund when stolen phone (?) $2000 in charges; user only gets money back via chargeback and presumably gets banned for life, as is standard when issuing chargebacks to big tech companies
* UberEats refuses to issue refund when order is clearly delivered to wrong location (half a mile away)
* Early in the pandemic, Uber said they would compensate drivers if they got covid, but they refuse to do this
 * After 6 months of having support deny their request, Uber gives them half of the compensation that was promised
* UberEats punishes driver for "shop and pay" order when item is out of stock and cannot be purchased
* Disabled user orders groceries from UberEats; when order is delivered to the wrong building, support won't have item actually delivered
* User can't cancel UberEats order when restaurant doesn't make order, leaving order in limbo
 * The restaurant is closed and support responds saying that they can't do anything about it and the user needs to go to cancel in their app, but going to cancel in their app forwards them to chat with the support person who says that they need to go cancel in their app; after more discussion, support tells them that their order, which they know was never delivered, is not eligible for a refund
* Uber maps routes driver down impossible route and a user indicates that reporting this issue does nothing
* UberEats driver notes that reporting that someone stole an order from the restaurant is pointless because the order just gets sent back out to another driver anyway; contacting support is useless and costs you valuable time that you could be using to earn money
 * Another driver reports the same thing
* Two people scammed Uber Eats out of $1M
* Uber drivers at a local airport cancel ride if fare is under $100
* Uber driver suddenly has account blocked
 * They find out that it's because a passenger reported an item lost; passenger later realizes they had the item all along and driver is unblocked, but driver was 2 hours from home and had to do the 2 hour drive home without being able to pick up fares
* User reports that UberEats delivery had slugs in it and Uber does their now-standard move of not issuing a refund; they issue a refund after the post about this goes viral
* User reports that UberEats driver spilled drink, with clear evidence of this and Uber refuses to refund until after a thread about it goes viral and the user complains on Twitter
* Uber refuses to refund UberEats pizza delivery that never showed up; user indicates that they'd never contacted support before and had never asked for a refund before
* Driver threatened with ban from Uber and is unable to get any kind of remotely reasonable response until his union, the App Drivers and Couriers Union worked with the Worker Info Exchange to go after Uber in court; "Just before the case came to court, Uber apologised and acknowledged it had made a mistake"
 * Uber's issues an official response of "We are disappointed that the court did not recognise the robust processes we have in place, including meaningful human review, when making a decision to deactivate a driver’s account due to suspected fraud."
* User notes that Uber drivers often do scams and that Uber doesn't seem to prevent this
* User notes that they frequently get scammed by Uber drivers, but Uber _usually_ refunds them when they report the scam to Uber
* User notes that Uber drivers try to scam the ~1/20 times
* User blocked from UberEats refunds after too many orders got screwed up and the user got too many refunds; user sent photos of the messed up orders, but Uber support doesn't care about what happened, just the size of and number of refunds
* User's uber account blocked for no discernable reason
 * At the time, there was no way to contact support, but the user tries again after a few years, at which point there is a support form, but that still doesn't work User's wife is incorrectly banned from user. User worked at Uber for four years and knows that the only way to get this fixed is to escalate to employees they know because, as a former employee, they know how useless support is
* User tries to get support for UberEATS not honoring a buy 1 get 1 free deal; support didn't help
* Former Uber engineer notes that people randomly get banned for false positives
* User had some Uber driver create an account with their email despite them never verifying the email with this new account; user tried to have their email removed, but support says they can't discuss anything about the account since they're not the account owner
* User's wife banned from Uber for no discernible reason
* User's Uber account gets into apparently unfixable unexpected state

### Cloudflare

* Blind user reports that Cloudflare doesn't have audio captchas, making much of the web unusable
 * Person that handles Cloudflare captchas invites the user to solve an open research problem so that they're able to browse websites hosted on Cloudflare
* Cloudflare suspends user's account with no warning or information
 * contacting CloudFlare results in the a response of "Your account violated our terms of service specifically fraud. The suspension is permanent and we will not be making changes on our end."
 * account restored after viral HN thread
* User finds much of the internet unusable with Firefox due to Cloudflare CAPTCHA infinite loop (switching to Chrome allows them to browse the internet); user writes up a detailed account of the issue and their issue is auto-closed (and other people report the exact same experience)
 * Same issue, different user
 * Same issue, different user
 * Same issue, different user
 * Same issue, different user
 * Same issue, different user
 * Same issue, different user
 * Same issue, different user
 * Same issue, different user
 * Same issue, different user
 * Same issue, different user
 * Same issue, different user
 * Same issue, different user
 * Same issue, different user
 * Similar issue, but with Brave instead of Firefox
 * Standard response of "why use the product if it does this bad thing?"
 * People point out that, as usual, this standard response is nonsense because, just for example, government websites that some people need to interact with sometimes use Cloudflare
 * After the story hits the front page of HN, a cloudflare exec replies and says people will look into it and then one person reports that the issue is fixed for them; I found tens of people who said that they reported the issue to Cloudflare, so I would guess that, overall, thousands of people reported the issue to cloudflare, which did nothing until someone wrote a post that hit the HN front page.
* Cloudflare takes site down due to what appears to be incorrect malware detection
* Cloudflare blocks transfer of domains in cases of incorrect fraud detection
* Incorrect phishing detection results in huge phishing warning on website
* Incorrect phishing detection results in URL being blocked
 * This was apparently triggered by a URL that hadn't existed for 10 years?
* User can't access any site on cloudflare because cloudflare decided they're malicious
* User can't access any site on cloudflare and some other hosts, they believe because another user on their ISP had malware on their computer
* Cloudflare blocks some HN comments
 * Users do a bit of testing and find that the blocking is fairly arbitrary
* User is blocked by Cloudflare and can no longer visit many (all?) sites that are behind Cloudflare when using Firefox
 * In the comments, on the order of 10 users note they've run into the same problem. The article is highly upvoted and a Cloudflare PM looks into it (resolution unknown)
* RSS feeds blocked because Cloudflare detects RSS client isn't a browser with a real human directly operating it
* User from Hong Kong finds that they often have to use a VPN to access sites on Cloudflare because Cloudflare thinks their IP is bad
* User finds a large fraction of the internet unusable due to Cloudflare infinite browser check loop
* User finds a large fraction of the internet unusable because Cloudflare has decided their IP is suspicious
 * User changes ISPs in order to be able to use the internet again ### TODO example in main body
* Security researcher finds security flaw in Cloudflare
 * Researcher claims that afterwards, "Cloudflare literally lobbied the FTC to investigate me and question the legality of openly discussing security research"
* Cloudflare ia haven for scammers and copyright thieves

### Shopify

* Having a store located in Puerto Rico causes payouts to be suspended every 3-4 months to verify address
* Kafkaesque support nightmare after payouts suspended
 * bizarre requirements, such as proving the bookstore has a license to sell the books they're selling

### Twitter (X)

I dropped most of the Twitter stories since there are so many after the acquisition that it seems silly to list them, but I've kept a few random ones.

* Users report NSFW, pornographic, ads
* Users report seeing bestiality, CP, gore, etc., when they don't want to see it
* Scammers posting as customer service agents on Twitter/X

### Apple

* Apple ML identifies user as three different people, depending on hairstyle
* Long story about Apple removing an app from the app store
* Rampant, easy to find, scam/spam apps on app store
 * A developer asks, how is it that so many legitimate apps get banned taken down from the app store for bad reasons when so much blatant spam gets through?
 * Lots of stories of legitimate apps getting autorejected immediately on submission, often requiring jumping through nonsensical hoops to get the app reinstated
* Apple forces developer to remove app for being too similar to another one of their apps because they have localized versions of their apps for different geos; developer asks how come people with essentially identical apps can keep 400 basically identical apps up?
* Searches for apps in various basic categories return scams and random puzzle games (in non-game categories)
* User makes an app that lets you read HN; Apple store repeatedly rejects app for reasons that don't make sense given what the app does, but support fails to understand the explanation
 * Luckily, it's Apple and not Google and they eventually manage to get a human on the phone, who understands the verbal explanation

### DoorDash

* Driver can't contact customer, so DoorDash support tells driver to dump food in parking lot
* DoorDash driver says they'll only actually deliver the item if the user pays them $15 extra
* The above is apparently not that uncommon scam as a friend of mine had this happen to them as well
* DoorDash refuses refund for item that didn't arrive
 * Of course, people have the standard response of "why don't you stop using these crappy services?" (the link above this one is also full of these) and some responds, "Because I'm disabled. Don't have a driver's license or a car. There isn't a bus stop near my apartment, I actually take paratransit to get to work, but I have to plan that a day ahead. Uber pulls the same shit, so I have to cycle through Uber, Door dash, and GrubHub based on who has coupons and hasn't stolen my money lately. Not everyone can just go pick something up."
* At one point, after I had a few bad deliveries in a row and gave a few drivers low ratings (I normally give people a high rating unless they don't even attempt to deliver to my door), I had a driver who took a really long time to deliver who, from watching the map, was just driving around. With my rating, I wrote a note that said that it appeared that, from the route, the driver was multi-apping, at which point DoorDash removed my ability to rate drivers, so I switched to Uber

### Walmart

* Driver steals delivery order; Walmart support does nothing and user has to drive to Walmart store to get issue fixed, but this is actually possible, unlike with most tech companies
 * Walmart employee notes that delivery is subcontracted out, with no real feedback mechanism
* Delivery doesn't arrive and user is unable to get refund
* Walmart refuses to refund user when they're charged the wrong price

### Airbnb

I've seen a ton of these but, for some reason, it didn't occur to me to add them to my list, so I don't have a lot of examples even though I've probably seen three times as many of these as I've seen Uber horror stories.

* AirBnB had cameras in the bathroom and bedroom and support refused to refund user
* AirBnB refuses to issue refund of scam booking to stolen credit card; user has to issue chargeback and (as is standard) presumably gets their account banned for life
* User finds cameras in AirBnB that cover sleeping areas and other private areas and AirBnB says they'll refund user as user books a hotel and then refuses to refund user
 * User is a tenacious lawyer and goes through arbitration to get a refund, which takes a large amount of effort and almost an entire year (dates in 1st level reddit link from above appear to be wrong if dates are correct in subsequent links)

## Appendix: Jeff Horwitz's Broken Code

Below are a few relevant excerpts. This is intended to be analogous to Zvi Mowshowitz's Quotes from Moral Mazes, which gives you an idea of what's in the book but is definitely not a replacement for reading the book. If these quotes are interesting, I recommend reading the book!

> The former employees who agreed to speak to me said troubling things from the get-go. Facebook’s automated enforcement systems were flatly incapable of performing as billed. Efforts to engineer growth had inadvertently rewarded political zealotry. And the company knew far more about the negative effects of social media usage than it let on.
> 
> ---
> 
> as the election progressed, the company started receiving reports of mass fake accounts, bald-faced lies on campaign-controlled pages, and coordinated threats of violence against Duterte critics. After years in politics, Harbath wasn’t naive about dirty tricks. But when Duterte won, it was impossible to deny that Facebook’s platform had rewarded his combative and sometimes underhanded brand of politics. The president-elect banned independent media from his inauguration—but livestreamed the event on Facebook. His promised extrajudicial killings began soon after.
> 
> A month after Duterte’s May 2016 victory came the United Kingdom’s referendum to leave the European Union. The Brexit campaign had been heavy on anti-immigrant sentiment and outright lies. As in the Philippines, the insurgent tactics seemed to thrive on Facebook—supporters of the “Leave” camp had obliterated “Remain” supporters on the platform. ... Harbath found all that to be gross, but there was no denying that Trump was successfully using Facebook and Twitter to short-circuit traditional campaign coverage, garnering attention in ways no campaign ever had. “I mean, he just has to go and do a short video on Facebook or Instagram and then the media covers it,” Harbath had marveled during a talk in Europe that spring. She wasn’t wrong: political reporters reported not just the content of Trump’s posts but their like counts.
> 
> Did Facebook need to consider making some effort to fact-check lies spread on its platform? Harbath broached the subject with Adam Mosseri, then Facebook’s head of News Feed.
> 
> “How on earth would we determine what’s true?” Mosseri responded. Depending on how you looked at it, it was an epistemic or a technological conundrum. Either way, the company chose to punt when it came to lies on its platform.
> 
> ---
> 
> Zuckerberg believed math was on Facebook’s side. Yes, there had been misinformation on the platform—but it certainly wasn’t the majority of content. Numerically, falsehoods accounted for just a fraction of all news viewed on Facebook, and news itself was just a fraction of the platform’s overall content. That such a fraction of a fraction could have thrown the election was downright illogical, Zuckerberg insisted.. ... But Zuckerberg was the boss. Ignoring Kornblut’s advice, he made his case the following day during a live interview at Techonomy, a conference held at the Ritz-Carlton in Half Moon Bay. Calling fake news a “very small” component of the platform, he declared the possibility that it had swung the election “a crazy idea.” ... A favorite saying at Facebook is that “Data Wins Arguments.” But when it came to Zuckerberg’s argument that fake news wasn’t a major problem on Facebook, the company didn’t have any data. As convinced as the CEO was that Facebook was blameless, he had no evidence of how “fake news” came to be, how it spread across the platform, and whether the Trump campaign had made use of it in their Facebook ad campaigns. ... One week after the election, BuzzFeed News reporter Craig Silverman published an analysis showing that, in the final months of the election, fake news had been the most viral election-related content on Facebook. A story falsely claiming that the pope had endorsed Trump had gotten more than 900,000 likes, reshares, and comments—more engagement than even the most widely shared stories from CNN, the New York Times, or the Washington Post. The most popular falsehoods, the story showed, had been in support of Trump.
> 
> It was a bombshell. Interest in the term “fake news” spiked on Google the day the story was published—and it stayed high for years, first as Trump’s critics cited it as an explanation for the president-elect’s victory, and then as Trump co-opted the term to denigrate the media at large. ... even as the company’s Communications staff had quibbled with Silverman’s methodology, executives had demanded that News Feed’s data scientists replicate it. Was it really true that lies were the platform’s top election-related content?
> 
> A day later, the staffers came back with an answer: almost.
> 
> A quick and dirty review suggested that the data BuzzFeed was using had been slightly off, but the claim that partisan hoaxes were trouncing real news in Facebook’s News Feed was unquestionably correct. Bullshit peddlers had a big advantage over legitimate publications—their material was invariably compelling and exclusive. While scores of mainstream news outlets had written rival stories about Clinton’s leaked emails, for instance, none of them could compete with the headline “WikiLeaks CONFIRMS Hillary Sold Weapons to ISIS.”
> 
> ---
> 
> The engineers weren’t incompetent—just applying often-cited company wisdom that “Done Is Better Than Perfect.” Rather than slowing down, Maurer said, Facebook preferred to build new systems capable of minimizing the damage of sloppy work, creating firewalls to prevent failures from cascading, discarding neglected data before it piled up in server-crashing queues, and redesigning infrastructure so that it could be readily restored after inevitable blowups.
> 
> The same culture applied to product design, where bonuses and promotions were doled out to employees based on how many features they “shipped”—programming jargon for incorporating new code into an app. Conducted semiannually, these “Performance Summary Cycle” reviews incented employees to complete products within six months, even if it meant the finished product was only minimally viable and poorly documented. Engineers and data scientists described living with perpetual uncertainty about where user data was being collected and stored—a poorly labeled data table could be a redundant file or a critical component of an important product. Brian Boland, a longtime vice president in Facebook’s Advertising and Partnerships divisions, recalled that a major data-sharing deal with Amazon once collapsed because Facebook couldn’t meet the retailing giant’s demand that it not mix Amazon’s data with its own.
> 
> “Building things is way more fun than making things secure and safe,” he said of the company’s attitude. “Until there’s a regulatory or press fire, you don’t deal with it.”
> 
> ---
> 
> Nowhere in the system was there much place for quality control. Instead of trying to restrict problem content, Facebook generally preferred to personalize users’ feeds with whatever it thought they would want to see. Though taking a light touch on moderation had practical advantages—selling ads against content you don’t review is a great business—Facebook came to treat it as a moral virtue, too. The company wasn’t failing to supervise what users did—it was neutral.
> 
> Though the company had come to accept that it would need to do some policing, executives continued to suggest that the platform would largely regulate itself. In 2016, with the company facing pressure to moderate terrorism recruitment more aggressively, Sheryl Sandberg had told the World Economic Forum that the platform did what it could, but that the lasting solution to hate on Facebook was to drown it in positive messages.
> 
> “The best antidote to bad speech is good speech,” she declared, telling the audience how German activists had rebuked a Neo-Nazi political party’s Facebook page with “like attacks,” swarming it with messages of tolerance.
> 
> Definitionally, the “counterspeech” Sandberg was describing didn’t work on Facebook. However inspiring the concept, interacting with vile content would have triggered the platform to distribute the objectionable material to a wider audience.
> 
> ---
> 
> ​​... in an internal memo by Andrew “Boz” Bosworth, who had gone from being one of Mark Zuckerberg’s TAs at Harvard to one of his most trusted deputies and confidants at Facebook. Titled “The Ugly,” Bosworth wrote the memo in June 2016, two days after the murder of a Chicago man was inadvertently livestreamed on Facebook. Facing calls for the company to rethink its products, Bosworth was rallying the troops.
> 
> “We talk about the good and the bad of our work often. I want to talk about the ugly,” the memo began. Connecting people created obvious good, he said—but doing so at Facebook’s scale would produce harm, whether it was users bullying a peer to the point of suicide or using the platform to organize a terror attack.
> 
> That Facebook would inevitably lead to such tragedies was unfortunate, but it wasn’t the Ugly. The Ugly, Boz wrote, was that the company believed in its mission of connecting people so deeply that it would sacrifice anything to carry it out.
> 
> “That’s why all the work we do in growth is justified. All the questionable contact importing practices. All the subtle language that helps people stay searchable by friends. All of the work we do to bring more communication in. The work we will likely have to do in China some day. All of it,” Bosworth wrote.
> 
> ---
> 
> Every team responsible for ranking or recommending content rushed to overhaul their systems as fast as they could, setting off an explosion in the complexity of Facebook’s product. Employees found that the biggest gains often came not from deliberate initiatives but from simple futzing around. Rather than redesigning algorithms, which was slow, engineers were scoring big with quick and dirty machine learning experiments that amounted to throwing hundreds of variants of existing algorithms at the wall and seeing which versions stuck—which performed best with users. They wouldn’t necessarily know why a variable mattered or how one algorithm outperformed another at, say, predicting the likelihood of commenting. But they could keep fiddling until the machine learning model produced an algorithm that statistically outperformed the existing one, and that was good enough.
> 
> ---
> 
> ... in Facebook’s efforts to deploy a classifier to detect pornography, Arturo Bejar recalled, the system routinely tried to cull images of beds. Rather than learning to identify people screwing, the model had instead taught itself to recognize the furniture on which they most often did ... Similarly fundamental errors kept occurring, even as the company came to rely on far more advanced AI techniques to make far weightier and complex decisions than “porn/not porn.” The company was going all in on AI, both to determine what people should see, and also to solve any problems that might arise.
> 
> ---
> 
> Willner happened to read an NGO report documenting the use of Facebook to groom and arrange meetings with dozens of young girls who were then kidnapped and sold into sex slavery in Indonesia. Zuckerberg was working on his public speaking skills at the time and had asked employees to give him tough questions. So, at an all-hands meeting, Willner asked him why the company had allocated money for its first-ever TV commercial—a recently released ninety-second spot likening Facebook to chairs and other helpful structures—but no budget for a staffer to address its platform’s known role in the abduction, rape, and occasional murder of Indonesian children.
> 
> Zuckerberg looked physically ill. He told Willner that he would need to look into the matter ... Willner said, the company was hopelessly behind in the markets where she believed Facebook had the highest likelihood of being misused. When she left Facebook in 2013, she had concluded that the company would never catch up.
> 
> ---
> 
> Within a few months, Facebook laid off the entire Trending Topics team, sending a security guard to escort them out of the building. A newsroom announcement said that the company had always hoped to make Trending Topics fully automated, and henceforth it would be. If a story topped Facebook’s metrics for viral news, it would top Trending Topics.
> 
> The effects of the switch were not subtle. Freed from the shackles of human judgment, Facebook’s code began recommending users check out the commemoration of “National Go Topless Day,” a false story alleging that Megyn Kelly had been sacked by Fox News, and an only-too-accurate story titled “Man Films Himself Having Sex with a McChicken Sandwich.”
> 
> Setting aside the feelings of McDonald’s social media team, there were reasons to doubt that the engagement on that final story reflected the public’s genuine interest in sandwich-screwing: much of the engagement was apparently coming from people wishing they’d never seen such accursed content. Still, Zuckerberg preferred it this way. Perceptions of Facebook’s neutrality were paramount; dubious and distasteful was better than biased.
> 
> “Zuckerberg said anything that had a human in the loop we had to get rid of as much as possible,” the member of the early polarization team recalled.
> 
> Among the early victims of this approach was the company’s only tool to combat hoaxes. For more than a decade, Facebook had avoided removing even the most obvious bullshit, which was less a principled stance and more the only possible option for the startup. “We were a bunch of college students in a room,” said Dave Willner, Charlotte Willner’s husband and the guy who wrote Facebook’s first content standards. “We were radically unequipped and unqualified to decide the correct history of the world.”
> 
> But as the company started churning out billions of dollars in annual profit, there were, at least, resources to consider the problem of fake information. In early 2015, the company had announced that it had found a way to combat hoaxes without doing fact-checking—that is, without judging truthfulness itself. It would simply suppress content that users disproportionately reported as false.
> 
> Nobody was so naive as to think that this couldn’t get contentious, or that the feature wouldn’t be abused. In a conversation with Adam Mosseri, one engineer asked how the company would deal, for example, with hoax “debunkings” of manmade global warming, which were popular on the American right. Mosseri acknowledged that climate change would be tricky but said that was not cause to stop: “You’re choosing the hardest case—most of them won’t be that hard.”
> 
> Facebook publicly revealed its anti-hoax work to little fanfare in an announcement that accurately noted that users reliably reported false news. What it omitted was that users also reported as false any news story they didn’t like, regardless of its accuracy.
> 
> To stem a flood of false positives, Facebook engineers devised a workaround: a “whitelist” of trusted publishers. Such safe lists are common in digital advertising, allowing jewelers to buy preauthorized ads on a host of reputable bridal websites, for example, while excluding domains like www.wedddings.com. Facebook’s whitelisting was pretty much the same: they compiled a generously large list of recognized news sites whose stories would be treated as above reproach.
> 
> The solution was inelegant, and it could disadvantage obscure publishers specializing in factual but controversial reporting. Nonetheless, it effectively diminished the success of false viral news on Facebook. That is, until the company faced accusations of bias surrounding Trending Topics. Then Facebook preemptively turned it off.
> 
> The disabling of Facebook’s defense against hoaxes was part of the reason fake news surged in the fall of 2016.
> 
> ---
> 
> Gomez-Uribe’s team hadn’t been tasked with working on Russian interference, but one of his subordinates noted something unusual: some of the most hyperactive accounts seemed to go entirely dark on certain days of the year. Their downtime, it turned out, corresponded with a list of public holidays in the Russian Federation.
> 
> “They respect holidays in Russia?” he recalled thinking. “Are we all this fucking stupid?”
> 
> But users didn’t have to be foreign trolls to promote problem posts. An analysis by Gomez-Uribe’s team showed that a class of Facebook power users tended to favor edgier content, and they were more prone to extreme partisanship. They were also, hour to hour, more prolific—they liked, commented, and reshared vastly more content than the average user. These accounts were outliers, but because Facebook recommended content based on aggregate engagement signals, they had an outsized effect on recommendations. If Facebook was a democracy, it was one in which everyone could vote whenever they liked and as frequently as they wished. ... hyperactive users tended to be more partisan and more inclined to share misinformation, hate speech, and clickbait,
> 
> ---
> 
> At Facebook, he realized, nobody was responsible for looking under the hood. “They’d trust the metrics without diving into the individual cases,” McNally said. “It was part of the ‘Move Fast’ thing. You’d have hundreds of launches every year that were only driven by bottom-line metrics.”
> 
> Something else worried McNally. Facebook’s goal metrics tended to be calculated in averages.
> 
> “It is a common phenomenon in statistics that the average is volatile, so certain pathologies could fall straight out of the geometry of the goal metrics,” McNally said. In his own reserved, mathematically minded way, he was calling Facebook’s most hallowed metrics crap. Making decisions based on metrics alone, without carefully studying the effects on actual humans, was reckless. But doing it based on average metrics was flat-out stupid. An average could rise because you did something that was broadly good for users, or it could go up because normal people were using the platform a tiny bit less and a small number of trolls were using Facebook way more.
> 
> Everyone at Facebook understood this concept—it’s the difference between median and mean, a topic that is generally taught in middle school. But, in the interest of expediency, Facebook’s core metrics were all based on aggregate usage. It was as if a biologist was measuring the strength of an ecosystem based on raw biomass, failing to distinguish between healthy growth and a toxic algae bloom.
> 
> ---
> 
> One distinguishing feature was the shamelessness of fake news publishers’ efforts to draw attention. Along with bad information, their pages invariably featured clickbait (sensationalist headlines) and engagement bait (direct appeals for users to interact with content, thereby spreading it further).
> 
> Facebook already frowned on those hype techniques as a little spammy, but truth be told it didn’t really do much about them. How much damage could a viral “Share this if you support the troops” post cause?
> 
> ---
> 
> Facebook’s mandate to respect users’ preferences posed another challenge. According to the metrics the platform used, misinformation was what people wanted. Every metric that Facebook used showed that people liked and shared stories with sensationalistic and misleading headlines.
> 
> McNally suspected the metrics were obscuring the reality of the situation. His team set out to demonstrate that this wasn’t actually true. What they found was that, even though users routinely engaged with bait content, they agreed in surveys that such material was of low value to them. When informed that they had shared false content, they experienced regret. And they generally considered fact-checks to contain useful information.
> 
> ---
> 
> every time a well-intentioned proposal of that sort blew up in the company’s face, the people working on misinformation lost a bit of ground. In the absence of a coherent, consistent set of demands from the outside world, Facebook would always fall back on the logic of maximizing its own usage metrics.
> 
> “If something is not going to play well when it hits mainstream media, they might hesitate when doing it,” McNally said. “Other times we were told to take smaller steps and see if anybody notices. The errors were always on the side of doing less.” ... “For people who wanted to fix Facebook, polarization was the poster child of ‘Let’s do some good in the world,’ ” McNally said. “The verdict came back that Facebook’s goal was not to do that work.”
> 
> ---
> 
> When the ranking team had begun its work, there had been no question that Facebook was feeding its users overtly false information at a rate that vastly outstripped any other form of media. This was no longer the case (even though the company would be raked over the coals for spreading “fake news” for years to come).
> 
> Ironically, Facebook was in a poor position to boast about that success. With Zuckerberg having insisted throughout that fake news accounted for only a trivial portion of content, Facebook couldn’t celebrate that it might be on the path of making the claim true.
> 
> ---
> 
> multiple members of both teams recalled having had the same response when they first learned of MSI’s new engagement weightings: it was going to make people fight. Facebook’s good intent may have been genuine, but the idea that turbocharging comments, reshares, and emojis would have unpleasant effects was pretty obvious to people who had, for instance, worked on Macedonian troll farms, sensationalism, and hateful content.
> 
> Hyperbolic headlines and outrage bait were already well-recognized digital publishing tactics, on and off Facebook. They traveled well, getting reshared in long chains. Giving a boost to content that galvanized reshares was going to add an exponential component to the already-healthy rate at which such problem content spread. At a time when the company was trying to address purveyors of misinformation, hyperpartisanship, and hate speech, it had just made their tactics more effective.
> 
> Multiple leaders inside Facebook’s Integrity team raised concerns about MSI with Hegeman, who acknowledged the problem and committed to trying to fine-tune MSI later. But adopting MSI was a done deal, he said—Zuckerberg’s orders.
> 
> Even non-Integrity staffers recognized the risk. When a Growth team product manager asked if the change meant News Feed would favor more controversial content, the manager of the team responsible for the work acknowledged it very well could.
> 
> ---
> 
> The effect was more than simply provoking arguments among friends and relatives. As a Civic Integrity researcher would later report back to colleagues, Facebook’s adoption of MSI appeared to have gone so far as to alter European politics. “Engagement on positive and policy posts has been severely reduced, leaving parties increasingly reliant on inflammatory posts and direct attacks on their competitors,” a Facebook social scientist wrote after interviewing political strategists about how they used the platform. In Poland, the parties described online political discourse as “a social-civil war.” One party’s social media management team estimated that they had shifted the proportion of their posts from 50/50 positive/negative to 80 percent negative and 20 percent positive, explicitly as a function of the change to the algorithm. Major parties blamed social media for deepening political polarization, describing the situation as “unsustainable.”
> 
> The same was true of parties in Spain. “They have learnt that harsh attacks on their opponents net the highest engagement,” the researcher wrote. “From their perspective, they are trapped in an inescapable cycle of negative campaigning by the incentive structures of the platform.”
> 
> If Facebook was making politics more combative, not everyone was upset about it. Extremist parties proudly told the researcher that they were running “provocation strategies” in which they would “create conflictual engagement on divisive issues, such as immigration and nationalism.”
> 
> To compete, moderate parties weren’t just talking more confrontationally. They were adopting more extreme policy positions, too. It was a matter of survival. “While they acknowledge they are contributing to polarization, they feel like they have little choice and are asking for help,” the researcher wrote.
> 
> ---
> 
> Facebook’s most successful publishers of political content were foreign content farms posting absolute trash, stuff that made About.com’s old SEO chum look like it belonged in the New Yorker.
> 
> Allen wasn’t the first staffer to notice the quality problem. The pages were an outgrowth of the fake news publishers that Facebook had battled in the wake of the 2016 election. While fact-checks and other crackdown efforts had made it far harder for outright hoaxes to go viral, the publishers had regrouped. Some of the same entities that BuzzFeed had written about in 2016—teenagers from a small Macedonian mountain town called Veles—were back in the game. How had Facebook’s news distribution system been manipulated by kids in a country with a per capita GDP of $5,800?
> 
> ---
> 
> When reviewing troll farm pages, he noticed something—their posts usually went viral. This was odd. Competition for space in users’ News Feeds meant that most pages couldn’t reliably get their posts in front of even those people who deliberately chose to follow them. But with the help of reshares and the News Feed algorithms, the Macedonian troll farms were routinely reaching huge audiences. If having a post go viral was hitting the attention jackpot, then the Macedonians were winning every time they put a buck into Facebook’s slot machine.
> 
> The reason the Macedonians’ content was so good was that it wasn’t theirs. Virtually every post was either aggregated or stolen from somewhere else on the internet. Usually such material came from Reddit or Twitter, but the Macedonians were just ripping off content from other Facebook pages, too, and reposting it to their far larger audiences. This worked because, on Facebook, originality wasn’t an asset; it was a liability. Even for talented content creators, most posts turned out to be duds. But things that had already gone viral nearly always would do so again.
> 
> ---
> 
> Allen began a note about the problem from the summer of 2018 with a reminder. “The mission of Facebook is to empower people to build community. This is a good mission,” he wrote, before arguing that the behavior he was describing exploited attempts to do that. As an example, Allen compared a real community—a group known as the National Congress of American Indians. The group had clear leaders, produced original programming, and held offline events for Native Americans. But, despite NCAI’s earnest efforts, it had far fewer fans than a page titled “Native American Proub” \[sic\] that was run out of Vietnam. The page’s unknown administrators were using recycled content to promote a website that sold T-shirts.
> 
> “They are exploiting the Native American Community,” Allen wrote, arguing that, even if users liked the content, they would never choose to follow a Native American pride page that was secretly run out of Vietnam. As proof, he included an appendix of reactions from users who had wised up. “If you’d like to read 300 reviews from real users who are very upset about pages that exploit the Native American community, here is a collection of 1 star reviews on Native American ‘Community’ and ‘Media’ pages,” he concluded.
> 
> This wasn’t a niche problem. It was increasingly the default state of pages in every community. Six of the top ten Black-themed pages—including the number one page, “My Baby Daddy Ain’t Shit”—were troll farms. The top fourteen English-language Christian- and Muslim-themed pages were illegitimate. A cluster of troll farms peddling evangelical content had a combined audience twenty times larger than the biggest authentic page.
> 
> “This is not normal. This is not healthy. We have empowered inauthentic actors to accumulate huge followings for largely unknown purposes,” Allen wrote in a later note. “Mostly, they seem to want to skim a quick buck off of their audience. But there are signs they have been in contact with the IRA.”
> 
> So how bad was the problem? A sampling of Facebook publishers with significant audiences found that a full 40 percent relied on content that was either stolen, aggregated, or “spun”—meaning altered in a trivial fashion. The same thing was true of Facebook video content. One of Allen’s colleagues found that 60 percent of video views went to aggregators.
> 
> The tactics were so well-known that, on YouTube, people were putting together instructional how-to videos explaining how to become a top Facebook publisher in a matter of weeks. “This is where I’m snagging videos from YouTube and I’ll re-upload them to Facebook,” said one guy in a video Allen documented, noting that it wasn’t strictly necessary to do the work yourself. “You can pay 20 dollars on Fiverr for a compilation—‘Hey, just find me funny videos on dogs, and chain them together into a compilation video.’ ”
> 
> Holy shit, Allen thought. Facebook was losing in the later innings of a game it didn’t even understand it was playing. He branded the set of winning tactics “manufactured virality.”
> 
> “What’s the easiest (lowest effort) way to make a big Facebook Page?” Allen wrote in an internal slide presentation. “Step 1: Find an existing, engaged community on \[Facebook\]. Step 2: Scrape/Aggregate content popular in that community. Step 3: Repost the most popular content on your Page.”
> 
> ---
> 
> Allen’s research kicked off a discussion. That a top page for American Vietnam veterans was being run from overseas—from Vietnam, no less—was just flat-out embarrassing. And unlike killing off Page Like ads, which had been a nonstarter for the way it alienated certain internal constituencies, if Allen and his colleagues could work up ways to systematically suppress trash content farms—material that was hardly exalted by any Facebook team—getting leadership to approve them might be a real possibility.
> 
> This was where Allen ran up against that key Facebook tenet, “Assume Good Intent.” The principle had been applied to colleagues, but it was meant to be just as applicable to Facebook’s billions of users. In addition to being a nice thought, it was generally correct. The overwhelming majority of people who use Facebook do so in the name of connection, entertainment, and distraction, and not to deceive or defraud. But, as Allen knew from experience, the motto was hardly a comprehensive guide to living, especially when money was involved.
> 
> ---
> 
> With the help of another data scientist, Allen documented the inherent traits of crap publishers. They aggregated content. They went viral too consistently. They frequently posted engagement bait. And they relied on reshares from random users, rather than cultivating a dedicated long-term audience.
> 
> None of these traits warranted severe punishment by itself. But together they added up to something damning. A 2019 screening for these features found 33,000 entities—a scant 0.175 percent of all pages—that were receiving a full 25 percent of all Facebook page views. Virtually none of them were “managed,” meaning controlled by entities that Facebook’s Partnerships team considered credible media professionals, and they accounted for just 0.14 percent of Facebook revenue.
> 
> ---
> 
> After it was bought, CrowdTangle was no longer a company but a product, available to media companies at no cost. However much publishers were angry with Facebook, they loved Silverman’s product. The only mandate Facebook gave him was for his team to keep building things that made publishers happy. Savvy reporters looking for viral story fodder loved it, too. CrowdTangle could surface, for instance, an up-and-coming post about a dog that saved its owner’s life, material that was guaranteed to do huge numbers on social media because it was already heading in that direction.
> 
> CrowdTangle invited its formerly paying media customers to a party in New York to celebrate the deal. One of the media executives there asked Silverman whether Facebook would be using CrowdTangle internally as an investigative tool, a question that struck Silverman as absurd. Yes, it had offered social media platforms an early window into their own usage. But Facebook’s staff now outnumbered his own by several thousand to one. “I was like, ‘That’s ridiculous—I’m sure whatever they have is infinitely more powerful than what we have!’ ”
> 
> It took Silverman more than a year to reconsider that answer.
> 
> ---
> 
> It was only as CrowdTangle started building tools to do this that the team realized just how little Facebook knew about its own platform. When Media Matters, a liberal media watchdog, published a report showing that MSI had been a boon for Breitbart, Facebook executives were genuinely surprised, sending around the article asking if it was true. As any CrowdTangle user would have known, it was.
> 
> Silverman thought the blindness unfortunate, because it prevented the company from recognizing the extent of its quality problem. It was the same point that Jeff Allen and a number of other Facebook employees had been hammering on. As it turned out, the person to drive it home wouldn’t come from inside the company. It would be Jonah Peretti, the CEO of BuzzFeed.
> 
> BuzzFeed had pioneered the viral publishing model. While “listicles” earned the publication a reputation for silly fluff in its early days, Peretti’s staff operated at a level of social media sophistication far above most media outlets, stockpiling content ahead of snowstorms and using CrowdTangle to find quick-hit stories that drew giant audiences.
> 
> In the fall of 2018, Peretti emailed Cox with a grievance: Facebook’s Meaningful Social Interactions ranking change was pressuring his staff to produce scuzzier content. BuzzFeed could roll with the punches, Peretti wrote, but nobody on his staff would be happy about it. Distinguishing himself from publishers who just whined about lost traffic, Peretti cited one of his platform’s recent successes: a compilation of tweets titled “21 Things That Almost All White People Are Guilty of Saying.” The list—which included “whoopsie daisy,” “get these chips away from me,” and “guilty as charged”—had performed fantastically on Facebook. What bothered Peretti was the apparent reason why. Thousands of users were brawling in the comments section over whether the item itself was racist.
> 
> “When we create meaningful content, it doesn’t get rewarded,” Peretti told Cox. Instead, Facebook was promoting “fad/junky science,” “extremely disturbing news,” “gross images,” and content that exploited racial divisions, according to a summary of Peretti’s email that circulated among Integrity staffers. Nobody at BuzzFeed liked producing that junk, Peretti wrote, but that was what Facebook was demanding. (In an illustration of BuzzFeed’s willingness to play the game, a few months later it ran another compilation titled “33 Things That Almost All White People Are Guilty of Doing.”)
> 
> ---
> 
> As users’ News Feeds became dominated by reshares, group posts, and videos, the “organic reach” of celebrity pages began tanking. “My artists built up a fan base and now they can’t reach them unless they buy ads,” groused Travis Laurendine, a New Orleans–based music promoter and technologist, in a 2019 interview. A page with 10,000 followers would be lucky to reach more than a tiny percent of them.
> 
> Explaining why a celebrity’s Facebook reach was dropping even as they gained followers was hell for Partnerships, the team tasked with providing VIP service to notable users and selling them on the value of maintaining an active presence on Facebook. The job boiled down to convincing famous people, or their social media handlers, that if they followed a set of company-approved best practices, they would reach their audience. The problem was that those practices, such as regularly posting original content and avoiding engagement bait, didn’t actually work. Actresses who were the center of attention on the Oscars’ red carpet would have their posts beaten out by a compilation video of dirt bike crashes stolen from YouTube. ... Over time, celebrities and influencers began drifting off the platform, generally to sister company Instagram. “I don’t think people ever connected the dots,” Boland said.
> 
> ---
> 
> “Sixty-four percent of all extremist group joins are due to our recommendation tools,” the researcher wrote in a note summarizing her findings. “Our recommendation systems grow the problem.”
> 
> This sort of thing was decidedly not supposed to be Civic’s concern. The team existed to promote civic participation, not police it. Still, a longstanding company motto was that “Nothing Is Someone Else’s Problem.” Chakrabarti and the researcher team took the findings to the company’s Protect and Care team, which worked on things like suicide prevention and bullying and was, at that point, the closest thing Facebook had to a team focused on societal problems.
> 
> Protect and Care told Civic there was nothing it could do. The accounts creating the content were real people, and Facebook intentionally had no rules mandating truth, balance, or good faith. This wasn’t someone else’s problem—it was nobody’s problem.
> 
> ---
> 
> Even if the problem seemed large and urgent, exploring possible defenses against bad-faith viral discourse was going to be new territory for Civic, and the team wanted to start off slow. Cox clearly supported the team’s involvement, but studying the platform’s defenses against manipulation would still represent moonlighting from Civic’s main job, which was building useful features for public discussion online.
> 
> A few months after the 2016 election, Chakrabarti made a request of Zuckerberg. To build tools to study political misinformation on Facebook, he wanted two additional engineers on top of the eight he already had working on boosting political participation.
> 
> “How many engineers do you have on your team right now?” Zuckerberg asked. Chakrabarti told him. “If you want to do it, you’re going to have to come up with the resources yourself,” the CEO said, according to members of Civic. Facebook had more than 20,000 engineers—and Zuckerberg wasn’t willing to give the Civic team two of them to study what had happened during the election.
> 
> ---
> 
> While acknowledging the possibility that social media might not be a force for universal good was a step forward for Facebook, discussing the flaws of the existing platform remained difficult even internally, recalled product manager Elise Liu.
> 
> “People don’t like being told they’re wrong, and they especially don’t like being told that they’re morally wrong,” she said. “Every meeting I went to, the most important thing to get in was ‘It’s not your fault. It happened. How can you be part of the solution? Because you’re amazing.’ 
> 
> ---
> 
> “We do not and possibly never will have a model that captures even a majority of integrity harms, particularly in sensitive areas,” one engineer would write, noting that the company’s classifiers could identify only 2 percent of prohibited hate speech with enough precision to remove it.
> 
> Inaction on the overwhelming majority of content violations was unfortunate, Rosen said, but not a reason to change course. Facebook’s bar for removing content was akin to the standard of guilt beyond a reasonable doubt applied in criminal cases. Even limiting a post’s distribution should require a preponderance of evidence. The combination of inaccurate systems and a high burden of proof would inherently mean that Facebook generally didn’t enforce its own rules against hate, Rosen acknowledged, but that was by design.
> 
> “Mark personally values free expression first and foremost and would say this is a feature, not a bug,” he wrote.
> 
> Publicly, the company declared that it had zero tolerance for hate speech. In practice, however, the company’s failure to meaningfully combat it was viewed as unfortunate—but highly tolerable.
> 
> ---
> 
> Myanmar, ruled by a military junta that exercised near-complete control until 2011, was the sort of place where Facebook was rapidly filling in for the civil society that the government had never allowed to develop. The app offered telecommunications services, real-time news, and opportunities for activism to a society unaccustomed to them.
> 
> In 2012, ethnic violence between the country’s dominant Buddhist majority and its Rohingya Muslim minority left around two hundred people dead and prompted tens of thousands of people to flee their homes. To many, the dangers posed by Facebook in the situation seemed obvious, including to Aela Callan, a journalist and documentary filmmaker who brought them to the attention of Elliot Schrage in Facebook’s Public Policy division in 2013. All the like-minded Myanmar Cassandras received a polite audience in Menlo Park, and little more. Their argument that Myanmar was a tinderbox was validated in 2014, when a hardline Buddhist monk posted a false claim on Facebook that a Rohingya man had raped a Buddhist woman, a provocation that produced clashes, killing two people. But with the exception of Bejar’s Compassion Research team and Cox—who was personally interested in Myanmar, privately funding independent news media there as a philanthropic endeavor—nobody at Facebook paid a great deal of attention.
> 
> Later accounts of the ignored warnings led many of the company’s critics to attribute Facebook’s inaction to pure callousness, though interviews with those involved in the cleanup suggest that the root problem was incomprehension. Human rights advocates were telling Facebook not just that its platform would be used to kill people but that it already had. At a time when the company assumed that users would suss out and shut down misinformation without help, however, the information proved difficult to absorb. The version of Facebook that the company’s upper ranks knew—a patchwork of their friends, coworkers, family, and interests—couldn’t possibly be used as a tool of genocide.
> 
> Facebook eventually hired its first Burmese-language content reviewer to cover whatever issues arose in the country of more than 50 million in 2015, and released a packet of flower-themed, peace-promoting digital stickers for Burmese users to slap on hateful posts. (The company would later note that the stickers had emerged from discussions with nonprofits and were “widely celebrated by civil society groups at the time.”) At the same time, it cut deals with telecommunications providers to provide Burmese users with Facebook access free of charge.
> 
> The first wave of ethnic cleansing began later that same year, with leaders of the country’s military announcing on Facebook that they would be “solving the problem” of the country’s Muslim minority. A second wave of violence followed and, in the end, 25,000 people were killed by the military and Buddhist vigilante groups, 700,000 were forced to flee their homes, and thousands more were raped and injured. The UN branded the violence a genocide.
> 
> Facebook still wasn’t responding. On its own authority, Gomez-Uribe’s News Feed Integrity team began collecting examples of the platform giving massive distribution to statements inciting violence. Even without Burmese-language skills, it wasn’t difficult. The torrent of anti-Rohingya hate and falsehoods from the Burmese military, government shills, and firebrand monks was not just overwhelming but overwhelmingly successful.
> 
> This was exploratory work, not on the Integrity Ranking team’s half-year roadmap. When Gomez-Uribe, along with McNally and others, pushed to reassign staff to better grasp the scope of Facebook’s problem in Myanmar, they were shot down.
> 
> “We were told no,” Gomez-Uribe recalled. “It was clear that leadership didn’t want to understand it more deeply.”
> 
> That changed, as it so often did, when Facebook’s role in the problem became public. A couple of weeks after the worst violence broke out, an international human rights organization condemned Facebook for inaction. Within seventy-two hours, Gomez-Uribe’s team was urgently asked to figure out what was going on.
> 
> When it was all over, Facebook’s negligence was clear. A UN report declared that “the response of Facebook has been slow and ineffective,” and an external human rights consultant that Facebook hired eventually concluded that the platform “has become a means for those seeking to spread hate and cause harm.”
> 
> In a series of apologies, the company acknowledged that it had been asleep at the wheel and pledged to hire more staffers capable of speaking Burmese. Left unsaid was why the company screwed up. The truth was that it had no idea what was happening on its platform in most countries.
> 
> ---
> 
> Barnes was put in charge of “meme busting”—that is, combating the spread of viral hoaxes about Facebook, on Facebook. No, the company was not going to claim permanent rights to all your photos unless you reshared a post warning of the threat. And no, Zuckerberg was not giving away money to the people who reshared a post saying so. Suppressing these digital chain letters had an obvious payoff; they tarred Facebook’s reputation and served no purpose.
> 
> Unfortunately, restricting the distribution of this junk via News Feed wasn’t enough to sink it. The posts also spread via Messenger, in large part because the messaging platform was prodding recipients of the messages to forward them on to a list of their friends.
> 
> The Advocacy team that Barnes had worked on sat within Facebook’s Growth division, and Barnes knew the guy who oversaw Messenger forwarding. Armed with data showing that the current forwarding feature was flooding the platform with anti-Facebook crap, he arranged a meeting.
> 
> Barnes’s colleague heard him out, then raised an objection.
> 
> “It’s really helping us with our goals,” the man said of the forwarding feature, which allowed users to reshare a message to a list of their friends with just a single tap. Messenger’s Growth staff had been tasked with boosting the number of “sends” that occurred each day. They had designed the forwarding feature to encourage precisely the impulsive sharing that Barnes’s team was trying to stop.
> 
> Barnes hadn’t so much lost a fight over Messenger forwarding as failed to even start one. At a time when the company was trying to control damage to its reputation, it was also being intentionally agnostic about whether its own users were slandering it. What was important was that they shared their slander via a Facebook product.
> 
> “The goal was in itself a sacred thing that couldn’t be questioned,” Barnes said. “They’d specifically created this flow to maximize the number of times that people would send messages. It was a Ferrari, a machine designed for one thing: infinite scroll.”
> 
> ---
> 
> Entities like Liftable Media, a digital media company run by longtime Republican operative Floyd Brown, had built an empire on pages that began by spewing upbeat clickbait, then pivoted to supporting Trump ahead of the 2016 election. To compound its growth, Liftable began buying up other spammy political Facebook pages with names like “Trump Truck,” “Patriot Update,” and “Conservative Byte,” running its content through them.
> 
> In the old world of media, the strategy of managing loads of interchangeable websites and Facebook pages wouldn’t make sense. For both economies of scale and to build a brand, print and video publishers targeted each audience through a single channel. (The publisher of Cat Fancy might expand into Bird Fancy, but was unlikely to cannibalize its audience by creating a near-duplicate magazine called Cat Enthusiast.)
> 
> That was old media, though. On Facebook, flooding the zone with competing pages made sense because of some algorithmic quirks. First, the algorithm favored variety. To prevent a single popular and prolific content producer from dominating users’ feeds, Facebook blocked any publisher from appearing too frequently. Running dozens of near-duplicate pages sidestepped that, giving the same content more bites at the apple.
> 
> Coordinating a network of pages provided a second, greater benefit. It fooled a News Feed feature that promoted virality. News Feed had been designed to favor content that appeared to be emerging organically in many places. If multiple entities you followed were all talking about something, the odds were that you would be interested so Facebook would give that content a big boost.
> 
> The feature played right into the hands of motivated publishers. By recommending that users who followed one page like its near doppelgängers, a publisher could create overlapping audiences, using a dozen or more pages to synthetically mimic a hot story popping up everywhere at once. ... Zhang, working on the issue in 2020, found that the tactic was being used to benefit publishers (Business Insider, Daily Wire, a site named iHeartDogs), as well as political figures and just about anyone interested in gaming Facebook content distribution (Dairy Queen franchises in Thailand). Outsmarting Facebook didn’t require subterfuge. You could win a boost for your content by running it on ten different pages that were all administered by the same account.
> 
> It would be difficult to overstate the size of the blind spot that Zhang exposed when she found it ... ... Liftable was an archetype of that malleability. The company had begun as a vaguely Christian publisher of the low-calorie inspirational content that once thrived on Facebook. But News Feed was a fickle master, and by 2015 Facebook had changed its recommendations in ways that stopped rewarding things like “You Won’t Believe Your Eyes When You See This Phenomenally Festive Christmas Light Show.”
> 
> The algorithm changes sent an entire class of rival publishers like Upworthy and ViralNova into a terminal tailspin, but Liftable was a survivor. In addition to shifting toward stories with headlines like “Parents Furious: WATCH What Teacher Did to Autistic Son on Stage in Front of EVERYONE,” Liftable acquired WesternJournal.com and every large political Facebook page it could get its hands on.
> 
> This approach was hardly a secret. Despite Facebook rules prohibiting the sale of pages, Liftable issued press releases about its acquisition of “new assets”—Facebook pages with millions of followers. Once brought into the fold, the network of pages would blast out the same content.
> 
> Nobody inside or outside Facebook paid much attention to the craven amplification tactics and dubious content that publishers such as Liftable were adopting. Headlines like “The Sodomites Are Aiming for Your Kids” seemed more ridiculous than problematic. But Floyd and the publishers of such content knew what they were doing, and they capitalized on Facebook’s inattention and indifference.
> 
> ---
> 
> The early work trying to figure out how to police publishers’ tactics had come from staffers attached to News Feed, but that team was broken up during the consolidation of integrity work under Guy Rosen ... “The News Feed integrity staffers were told not to work on this, that it wasn’t worth their time,” recalled product manager Elise Liu ... Facebook’s policies certainly made it seem like removing networks of fake accounts shouldn’t have been a big deal: the platform required users to go by their real names in the interests of accountability and safety. In practice, however, the rule that users were allowed a single account bearing their legal name generally went unenforced.
> 
> ---
> 
> In the spring of 2018, the Civic team began agitating to address dozens of other networks of recalcitrant pages, including one tied to a site called “Right Wing News.” The network was run by Brian Kolfage, a U.S. veteran who had lost both legs and a hand to a missile in Iraq.
> 
> Harbath’s first reaction to Civic’s efforts to take down a prominent disabled veteran’s political media business was a flat no. She couldn’t dispute the details of his misbehavior—Kolfage was using fake or borrowed accounts to spam Facebook with links to vitriolic, sometimes false content. But she also wasn’t ready to shut him down for doing things that the platform had tacitly allowed.
> 
> “Facebook had let this guy build up a business using shady-ass tactics and scammy behavior, so there was some reluctance to basically say, like, ‘Sorry, the things that you’ve done every day for the last several years are no longer acceptable,’ ” she said. ... Other than simply giving up on enforcing Facebook’s rules, there wasn’t much left to try. Facebook’s Public Policy team remained uncomfortable with taking down a major domestic publisher for inauthentic amplification, and it made the Civic team prove that Kolfage’s content, in addition to his tactics, was objectionable. This hurdle became a permanent but undisclosed change in policy: cheating to manipulate Facebook’s algorithm wasn’t enough to get you kicked off the platform—you had to be promoting something bad, too.
> 
> ---
> 
> Tests showed that the takedowns cut the amount of American political spam content by 20 percent overnight. Chakrabarti later admitted to his subordinates that he had been surprised that they had succeeded in taking a major action on domestic attempts to manipulate the platform. He had privately been expecting Facebook’s leadership to shut the effort down.
> 
> ---
> 
> A staffer had shown Cox that a Brazilian legislator who supported the populist Jair Bolsonaro had posted a fabricated video of a voting machine that had supposedly been rigged in favor of his opponent. The doctored footage had already been debunked by fact-checkers, which normally would have provided grounds to bring the distribution of the post to an abrupt halt. But Facebook’s Public Policy team had long ago determined, after a healthy amount of discussion regarding the rule’s application to President Donald Trump, that government officials’ posts were immune from fact-checks. Facebook was therefore allowing false material that undermined Brazilians’ trust in democracy to spread unimpeded.
> 
> ... Despite Civic’s concerns, voting in Brazil went smoothly. The same couldn’t be said for Civic’s colleagues over at WhatsApp. In the final days of the Brazilian election, viral misinformation transmitted by unfettered forwarding had blown up.
> 
> ---
> 
> Supporters of the victorious Bolsonaro, who shared their candidate’s hostility toward homosexuality, were celebrating on Facebook by posting memes of masked men holding guns and bats. The accompanying Portuguese text combined the phrase “We’re going hunting” with a gay slur, and some of the posts encouraged users to join WhatsApp groups supposedly for that violent purpose. Engagement was through the roof, prompting Facebook’s systems to spread them even further.
> 
> While the company’s hate classifiers had been good enough to detect the problem, they weren’t reliable enough to automatically remove the torrent of hate. Rather than celebrating the race’s conclusion, Civic War Room staff put out an after-hours call for help from Portuguese-speaking colleagues. One polymath data scientist, a non-Brazilian who spoke great Portuguese and happened to be gay, answered the call.
> 
> For Civic staffers, an incident like this wasn’t a good time, but it wasn’t extraordinary, either. They had come to accept that unfortunate things like this popped up on the platform sometimes, especially around election time.
> 
> It took a glance at the Portuguese-speaking data scientist to remind Barnes how strange it was that viral horrors had become so routine on Facebook. The volunteer was hard at work just like everyone else, but he was quietly sobbing as he worked. “That moment is embedded in my mind,” Barnes said. “He’s crying, and it’s going to take the Operations team ten hours to clear this.”
> 
> ---
> 
> India was a huge target for Facebook, which had already been locked out of China, despite much effort by Zuckerberg. The CEO had jogged unmasked through Tiananmen Square as a sign that he wasn’t bothered by Beijing’s notorious air pollution. He had asked President Xi Jinping, unsuccessfully, to choose a Chinese name for his first child. The company had even worked on a secret tool that would have allowed Beijing to directly censor the posts of Chinese users. All of it was to little avail: Facebook wasn’t getting into China. By 2019, Zuckerberg had changed his tune, saying that the company didn’t want to be there—Facebook’s commitment to free expression was incompatible with state repression and censorship. Whatever solace Facebook derived from adopting this moral stance, succeeding in India became all the more vital: If Facebook wasn’t the dominant platform in either of the world’s two most populous countries, how could it be the world’s most important social network?
> 
> ---
> 
> Civic’s work got off to an easy start because the misbehavior was obvious. Taking only perfunctory measures to cover their tracks, all major parties were running networks of inauthentic pages, a clear violation of Facebook rules.
> 
> The BJP’s IT cell seemed the most successful. The bulk of the coordinated posting could be traced to websites and pages created by Silver Touch, the company that had built Modi’s reelection campaign app. With cumulative follower accounts in excess of 10 million, the network hit both of Facebook’s agreed-upon standards for removal: they were using banned tricks to boost engagement and violating Facebook content policies by running fabricated, inflammatory quotes that allegedly exposed Modi opponents’ affection for rapists and that denigrated Muslims.
> 
> With documentation of all parties’ bad behavior in hand by early spring, the Civic staffers overseeing the project arranged an hour-long meeting in Menlo Park with Das and Harbath to make the case for a mass takedown. Das showed up forty minutes late and pointedly let the team know that, despite the ample cafés, cafeterias, and snack rooms at the office, she had just gone out for coffee. As the Civic Team’s Liu and Ghosh tried to rush through several months of research showing how the major parties were relying on banned tactics, Das listened impassively, then told them she’d have to approve any action they wanted to take.
> 
> The team pushed ahead with preparing to remove the offending pages. Mindful as ever of optics, the team was careful to package a large group of abusive pages together, some from the BJP’s network and others from the INC’s far less successful effort. With the help of Nathaniel Gleicher’s security team, a modest collection of Facebook pages traced to the Pakistani military was thrown in for good measure
> 
> Even with the attempt at balance, the effort soon got bogged down. Higher-ups’ enthusiasm for the takedowns was so lacking that Chakrabarti and Harbath had to lobby Kaplan directly before they got approval to move forward.
> 
> “I think they thought it was going to be simpler,” Harbath said of the Civic team’s efforts.
> 
> Still, Civic kept pushing. On April 1, less than two weeks before voting was set to begin, Facebook announced that it had taken down more than one thousand pages and groups in separate actions against inauthentic behavior. In a statement, the company named the guilty parties: the Pakistani military, the IT cell of the Indian National Congress, and “individuals associated with an Indian IT firm, Silver Touch.”
> 
> For anyone who knew what was truly going on, the announcement was suspicious. Of the three parties cited, the pro-BJP propaganda network was by far the largest—and yet the party wasn’t being called out like the others.
> 
> Harbath and another person familiar with the mass takedown insisted this had nothing to do with favoritism. It was, they said, simply a mess. Where the INC had abysmally failed at subterfuge, making the attribution unavoidable under Facebook’s rules, the pro-BJP effort had been run through a contractor. That fig leaf gave the party some measure of deniability, even if it might fall short of plausible.
> 
> If the announcement’s omission of the BJP wasn’t a sop to India’s ruling party, what Facebook did next certainly seemed to be. Even as it was publicly mocking the INC for getting caught, the BJP was privately demanding that Facebook reinstate the pages the party claimed it had no connection to. Within days of the takedown, Das and Kaplan’s team in Washington were lobbying hard to reinstate several BJP-connected entities that Civic had fought so hard to take down. They won, and some of the BJP pages got restored.
> 
> With Civic and Public Policy at odds, the whole messy incident got kicked up to Zuckerberg to hash out. Kaplan argued that applying American campaign standards to India and many other international markets was unwarranted. Besides, no matter what Facebook did, the BJP was overwhelmingly favored to return to power when the election ended in May, and Facebook was seriously pissing it off.
> 
> Zuckerberg concurred with Kaplan’s qualms. The company should absolutely continue to crack down hard on covert foreign efforts to influence politics, he said, but in domestic politics the line between persuasion and manipulation was far less clear. Perhaps Facebook needed to develop new rules—ones with Public Policy’s approval.
> 
> The result was a near moratorium on attacking domestically organized inauthentic behavior and political spam. Imminent plans to remove illicitly coordinated Indonesian networks of pages, groups, and accounts ahead of upcoming elections were shut down. Civic’s wings were getting clipped.
> 
> ---
> 
> By 2019, Jin’s standing inside the company was slipping. He had made a conscious decision to stop working so much, offloading parts of his job onto others, something that did not conform to Facebook’s culture. More than that, Jin had a habit of framing what the company did in moral terms. Was this good for users? Was Facebook truly making its products better?
> 
> Other executives were careful when bringing decisions to Zuckerberg to not frame decisions in terms of right or wrong. Everyone was trying to work collaboratively, to make a better product, and whatever Zuckerberg decided was good. Jin’s proposals didn’t carry that tone. He was unfailingly respectful, but he was also clear on what he considered the range of acceptable positions. Alex Schultz, the company’s chief marketing officer, once remarked to a colleague that the problem with Jin was that he made Zuckerberg feel like shit.
> 
> In July 2019, Jin wrote a memo titled “Virality Reduction as an Integrity Strategy” and posted it in a 4,200-person Workplace group for employees working on integrity problems. “There’s a growing set of research showing that some viral channels are used for bad more than they are used for good,” the memo began. “What should our principles be around how we approach this?” Jin went on to list, with voluminous links to internal research, how Facebook’s products routinely garnered higher growth rates at the expense of content quality and user safety. Features that produced marginal usage increases were disproportionately responsible for spam on WhatsApp, the explosive growth of hate groups, and the spread of false news stories via reshares, he wrote.
> 
> None of the examples were new. Each of them had been previously cited by Product and Research teams as discrete problems that would require either a design fix or extra enforcement. But Jin was framing them differently. In his telling, they were the inexorable result of Facebook’s efforts to speed up and grow the platform.
> 
> The response from colleagues was enthusiastic. “Virality is the goal of tenacious bad actors distributing malicious content,” wrote one researcher. “Totally on board for this,” wrote another, who noted that virality helped inflame anti-Muslim sentiment in Sri Lanka after a terrorist attack. “This is 100% direction to go,” Brandon Silverman of CrowdTangle wrote.
> 
> After more than fifty overwhelmingly positive comments, Jin ran into an objection from Jon Hegeman, the executive at News Feed who by then had been promoted to head of the team. Yes, Jin was probably right that viral content was disproportionately worse than nonviral content, Hegeman wrote, but that didn’t mean that the stuff was bad on average. ... Hegeman was skeptical. If Jin was right, he responded, Facebook should probably be taking drastic steps like shutting down all reshares, and the company wasn’t in much of a mood to try. “If we remove a small percentage of reshares from people’s inventory,” Hegeman wrote, “they decide to come back to Facebook less.”
> 
> ---
> 
> If Civic had thought Facebook’s leadership would be rattled by the discovery that the company’s growth efforts had been making Facebook’s integrity problems worse, they were wrong. Not only was Zuckerberg hostile to future anti-growth work; he was beginning to wonder whether some of the company’s past integrity efforts were misguided.
> 
> Empowered to veto not just new integrity proposals but work that had long ago been approved, the Public Policy team began declaring that some failed to meet the company’s standards for “legitimacy.” Sparing Sharing, the demotion of content pushed by hyperactive users—already dialed down by 80 percent at its adoption—was set to be dialed back completely. (It was ultimately spared but further watered down.)
> 
> “We cannot assume links shared by people who shared a lot are bad,” a writeup of plans to undo the change said. (In practice, the effect of rolling back Sparing Sharing, even in its weakened form, was unambiguous. Views of “ideologically extreme content for users of all ideologies” would immediately rise by a double-digit percentage, with the bulk of the gains going to the far right.)
> 
> “Informed Sharing”—an initiative that had demoted content shared by people who hadn’t clicked on the posts in question, and which had proved successful in diminishing the spread of fake news—was also slated for decommissioning.
> 
> “Being less likely to share content after reading it is not a good indicator of integrity,” stated a document justifying the planned discontinuation.
> 
> A company spokeswoman denied numerous Integrity staffers’ contention that the Public Policy team had the ability to veto or roll back integrity changes, saying that Kaplan’s team was just one voice among many internally. But, regardless of who was calling the shots, the company’s trajectory was clear. Facebook wasn’t just slow-walking integrity work anymore. It was actively planning to undo large chunks of it.
> 
> ---
> 
> Facebook could be certain of meeting its goals for the 2020 election if it was willing to slow down viral features. This could include imposing limits on reshares, message forwarding, and aggressive algorithmic amplification—the kind of steps that the Integrity teams throughout Facebook had been pushing to adopt for more than a year. The moves would be simple and cheap. Best of all, the methods had been tested and guaranteed success in combating longstanding problems.
> 
> The correct choice was obvious, Jin suggested, but Facebook seemed strangely unwilling to take it. It would mean slowing down the platform’s growth, the one tenet that was inviolable.
> 
> “Today the bar to ship a pro-Integrity win (that may be negative to engagement) often is higher than the bar to ship pro-engagement win (that may be negative to Integrity),” Jin lamented. If the situation didn’t change, he warned, it risked a 2020 election disaster from “rampant harmful virality.”
> 
> ---
> 
> Even including downranking, “we estimate that we may action as little as 3–5% of hate and 0.6% of \[violence and incitement\] on Facebook, despite being the best in the world at it,” one presentation noted. Jin knew these stats, according to people who worked with him, but was too polite to emphasize them.
> 
> ---
> 
> Company researchers used multiple methods to demonstrate QAnon’s gravitational pull, but the simplest and most visceral proof came from setting up a test account and seeing where Facebook’s algorithms took it.
> 
> After setting up a dummy account for “Carol”—a hypothetical forty-one-year-old conservative woman in Wilmington, North Carolina, whose interests included the Trump family, Fox News, Christianity, and parenting—the researcher watched as Facebook guided Carol from those mainstream interests toward darker places.
> 
> Within a day, Facebook’s recommendations had “devolved toward polarizing content.” Within a week, Facebook was pushing a “barrage of extreme, conspiratorial, and graphic content.” ... The researcher’s write-up included a plea for action: if Facebook was going to push content this hard, the company needed to get a lot more discriminating about what it pushed.
> 
> Later write-ups would acknowledge that such warnings went unheeded.
> 
> ---
> 
> As executives filed out, Zuckerberg pulled Integrity’s Guy Rosen aside. “Why did you show me this in front of so many people?” Zuckerberg asked Rosen, who as Chakrabarti’s boss bore responsibility for his subordinate’s presentation landing on that day’s agenda.
> 
> Zuckerberg had good reason to be unhappy that so many executives had watched him being told in plain terms that the forthcoming election was shaping up to be a disaster. In the course of investigating Cambridge Analytica, regulators around the world had already subpoenaed thousands of pages of documents from the company and had pushed for Zuckerberg’s personal communications going back for the better part of the decade. Facebook had paid $5 billion to the U.S. Federal Trade Commission to settle one of the most prominent inquiries, but the threat of subpoenas and depositions wasn’t going away. ... If there had been any doubt that Civic was the Integrity division’s problem child, lobbing such a damning document straight onto Zuckerberg’s desk settled it. As Chakrabarti later informed his deputies, Rosen told him that Civic would henceforth be required to run such material through other executives first—strictly for organizational reasons, of course.
> 
> ​​Chakrabarti didn’t take the reining in well. A few months later, he wrote a scathing appraisal of Rosen’s leadership as part of the company’s semiannual performance review. Facebook’s top integrity official was, he wrote, “prioritizing PR risk over social harm.”
> 
> ---
> 
> Facebook still hadn’t given Civic the green light to resume the fight against domestically coordinated political manipulation efforts. Its fact-checking program was too slow to effectively shut down the spread of misinformation during a crisis. And the company still hadn’t addressed the “perverse incentives” resulting from News Feed’s tendency to favor divisive posts. “Remains unclear if we have a societal responsibility to reduce exposure to this type of content,” an updated presentation from Civic tartly stated.
> 
> “Samidh was trying to push Mark into making those decisions, but he didn’t take the bait,” Harbath recalled.
> 
> ---
> 
> Cutler remarked that she would have pushed for Chakrabarti’s ouster if she didn’t expect a substantial portion of his team would mutiny. (The company denies Cutler said this.)
> 
> ---
> 
> a British study had found that Instagram had the worst effect of any social media app on the health and well-being of teens and young adults.
> 
> ---
> 
> The second was the death of Molly Russell, a fourteen-year-old from North London. Though “apparently flourishing,” as a later coroner’s inquest found, Russell had died by suicide in late 2017. Her death was treated as an inexplicable local tragedy until the BBC ran a report on social media activity in 2019. Russell had followed a large group of accounts that romanticized depression, self-harm, and suicide, and she had engaged with more than 2,100 macabre posts, mostly on Instagram. Her final login had come at 12:45 the morning she died.
> 
> “I have no doubt that Instagram helped kill my daughter,” her father told the BBC.
> 
> Later research—both inside and outside Instagram—would demonstrate that a class of commercially motivated accounts had seized on depression-related content for the same reason that others focused on car crashes or fighting: the stuff pulled high engagement. But serving pro-suicide content to a vulnerable kid was clearly indefensible, and the platform pledged to remove and restrict the recommendation of such material, along with hiding hashtags like #Selfharm. Beyond exposing an operational failure, the extensive coverage of Russell’s death associated Instagram with rising concerns about teen mental health.
> 
> ---
> 
> Though much attention, both inside and outside the company, had been paid to bullying, the most serious risks weren’t the result of people mistreating each other. Instead, the researchers wrote, harm arose when a user’s existing insecurities combined with Instagram’s mechanics. “Those who are dissatisfied with their lives are more negatively affected by the app,” one presentation noted, with the effects most pronounced among girls unhappy with their bodies and social standing.
> 
> There was a logic here, one that teens themselves described to researchers. Instagram’s stream of content was a “highlight reel,” at once real life and unachievable. This was manageable for users who arrived in a good frame of mind, but it could be poisonous for those who showed up vulnerable. Seeing comments about how great an acquaintance looked in a photo would make a user who was unhappy about her weight feel bad—but it didn’t make her stop scrolling.
> 
> “They often feel ‘addicted’ and know that what they’re seeing is bad for their mental health but feel unable to stop themselves,” the “Teen Mental Health Deep Dive” presentation noted. Field research in the U.S. and U.K. found that more than 40 percent of Instagram users who felt “unattractive” traced that feeling to Instagram. Among American teens who said they had thought about dying by suicide in the past month, 6 percent said the feeling originated on the platform. In the U.K., the number was double that.
> 
> “Teens who struggle with mental health say Instagram makes it worse,” the presentation stated. “Young people know this, but they don’t adopt different patterns.”
> 
> These findings weren’t dispositive, but they were unpleasant, in no small part because they made sense. Teens said—and researchers appeared to accept—that certain features of Instagram could aggravate mental health issues in ways beyond its social media peers. Snapchat had a focus on silly filters and communication with friends, while TikTok was devoted to performance. Instagram, though? It revolved around bodies and lifestyle. The company disowned these findings after they were made public, calling the researchers’ apparent conclusion that Instagram could harm users with preexisting insecurities unreliable. The company would dispute allegations that it had buried negative research findings as “plain false.”
> 
> ---
> 
> Facebook had deployed a comment-filtering system to prevent the heckling of public figures such as Zuckerberg during livestreams, burying not just curse words and complaints but also substantive discussion of any kind. The system had been tuned for sycophancy, and poorly at that. The irony of heavily censoring comments on a speech about free speech wasn’t hard to miss.
> 
> ---
> 
> CrowdTangle’s rundown of that Tuesday’s top content had, it turned out, included a butthole. This wasn’t a borderline picture of someone’s ass. It was an unmistakable, up-close image of an anus. It hadn’t just gone big on Facebook—it had gone biggest. Holding the number one slot, it was the lead item that executives had seen when they opened Silverman’s email. “I hadn’t put Mark or Sheryl on it, but I basically put everyone else on there,” Silverman said.
> 
> The picture was a thumbnail outtake from a porn video that had escaped Facebook’s automated filters. Such errors were to be expected, but was Facebook’s familiarity with its platform so poor that it wouldn’t notice when its systems started spreading that content to millions of people?
> 
> Yes, it unquestionably was.
> 
> ---
> 
> In May, a data scientist working on integrity posted a Workplace note titled “Facebook Creating a Big Echo Chamber for ‘the Government and Public Health Officials Are Lying to Us’ Narrative—Do We Care?”
> 
> Just a few months into the pandemic, groups devoted to opposing COVID lockdown measures had become some of the most widely viewed on the platform, pushing false claims about the pandemic under the guise of political activism. Beyond serving as an echo chamber for alternating claims that the virus was a Chinese plot and that the virus wasn’t real, the groups served as a staging area for platform-wide assaults on mainstream medical information. ... An analysis showed these groups had appeared abruptly, and while they had ties to well-established anti-vaccination communities, they weren’t arising organically. Many shared near-identical names and descriptions, and an analysis of their growth showed that “a relatively small number of people” were sending automated invitations to “hundreds or thousands of users per day.”
> 
> Most of this didn’t violate Facebook’s rules, the data scientist noted in his post. Claiming that COVID was a plot by Bill Gates to enrich himself from vaccines didn’t meet Facebook’s definition of “imminent harm.” But, he said, the company should think about whether it was merely reflecting a widespread skepticism of COVID or creating one.
> 
> “This is severely impacting public health attitudes,” a senior data scientist responded. “I have some upcoming survey data that suggests some baaaad results.”
> 
> ---
> 
> President Trump was gearing up for reelection and he took to his platform of choice, Twitter, to launch what would become a monthslong attempt to undermine the legitimacy of the November 2020 election. “There is no way (ZERO!) that Mail-In Ballots will be anything less than substantially fraudulent,” Trump wrote. As was standard for Trump’s tweets, the message was cross-posted on Facebook.
> 
> Under the tweet, Twitter included a small alert that encouraged users to “Get the facts about mail-in ballots.” Anyone clicking on it was informed that Trump’s allegations of a “rigged” election were false and there was no evidence that mail-in ballots posed a risk of fraud.
> 
> Twitter had drawn its line. Facebook now had to choose where it stood. Monika Bickert, Facebook’s head of Content Policy, declared that Trump’s post was right on the edge of the sort of misinformation about “methods for voting” that the company had already pledged to take down.
> 
> Zuckerberg didn’t have a strong position, so he went with his gut and left it up. But then he went on Fox News to attack Twitter for doing the opposite. “I just believe strongly that Facebook shouldn’t be the arbiter of truth of everything that people say online,” he told host Dana Perino. “Private companies probably shouldn’t be, especially these platform companies, shouldn’t be in the position of doing that.”
> 
> The interview caused some tumult inside Facebook. Why would Zuckerberg encourage Trump’s testing of the platform’s boundaries by declaring its tolerance of the post a matter of principle? The perception that Zuckerberg was kowtowing to Trump was about to get a lot worse. On the day of his Fox News interview, protests over the recent killing of George Floyd by Minneapolis police officers had gone national, and the following day the president tweeted that “when the looting starts, the shooting starts”—a notoriously menacing phrase used by a white Miami police chief during the civil rights era.
> 
> Declaring that Trump had violated its rules against glorifying violence, Twitter took the rare step of limiting the public’s ability to see the tweet—users had to click through a warning to view it, and they were prevented from liking or retweeting it.
> 
> Over on Facebook, where the message had been cross-posted as usual, the company’s classifier for violence and incitement estimated it had just under a 90 percent probability of breaking the platform’s rules—just shy of the threshold that would get a regular user’s post automatically deleted.
> 
> Trump wasn’t a regular user, of course. As a public figure, arguably the world’s most public figure, his account and posts were protected by dozens of different layers of safeguards.
> 
> ---
> 
> Facebook drew up a list of accounts that were immune to some or all immediate enforcement actions. If those accounts appeared to break Facebook’s rules, the issue would go up the chain of Facebook’s hierarchy and a decision would be made on whether to take action against the account or not. Every social media platform ended up creating similar lists—it didn’t make sense to adjudicate complaints about heads of state, famous athletes, or persecuted human rights advocates in the same way the companies did with run-of-the-mill users. The problem was that, like a lot of things at Facebook, the company’s process got particularly messy.
> 
> For Facebook, the risks that arose from shielding too few users were seen as far greater than the risks of shielding too many. Erroneously removing a bigshot’s content could unleash public hell—in Facebook parlance, a “media escalation” or, that most dreaded of events, a “PR fire.” Hours or days of coverage would follow when Facebook erroneously removed posts from breast cancer victims or activists of all stripes. When it took down a photo of a risqué French magazine cover posted to Instagram by the American singer Rihanna in 2014, it nearly caused an international incident. As internal reviews of the system later noted, the incentive was to shield as heavily as possible any account with enough clout to cause undue attention.
> 
> No one team oversaw XCheck, and the term didn’t even have a specific definition. There were endless varieties and gradations applied to advertisers, posts, pages, and politicians, with hundreds of engineers around the company coding different flavors of protections and tagging accounts as needed. Eventually, at least 6 million accounts and pages were enrolled into XCheck, with an internal guide stating that an entity should be “newsworthy,” “influential or popular,” or “PR risky” to qualify. On Instagram, XCheck even covered popular animal influencers, including Doug the Pug.
> 
> Any Facebook employee who knew the ropes could go into the system and flag accounts for special handling. XCheck was used by more than forty teams inside the company. Sometimes there were records of how they had deployed it and sometimes there were not. Later reviews would find that XCheck’s protections had been granted to “abusive accounts” and “persistent violators” of Facebook’s rules.
> 
> The job of giving a second review to violating content from high-profile users would require a sizable team of full-time employees. Facebook simply never staffed one. Flagged posts were put into a queue that no one ever considered, sweeping already once-validated complaints under the digital rug. “Because there was no governance or rigor, those queues might as well not have existed,” recalled someone who worked with the system. “The interest was in protecting the business, and that meant making sure we don’t take down a whale’s post.”
> 
> The stakes could be high. XCheck protected high-profile accounts, including in Myanmar, where public figures were using Facebook to incite genocide. It shielded the account of British far-right figure Tommy Robinson, an investigation by Britain’s Channel Four revealed in 2018.
> 
> One of the most explosive cases was that of Brazilian soccer star Neymar, whose 150 million Instagram followers placed him among the platform’s top twenty influencers. After a woman accused Neymar of rape in 2019, he accused the woman of extorting him and posted Facebook and Instagram videos defending himself—and showing viewers his WhatsApp correspondence with his accuser, which included her name and nude photos of her. Facebook’s procedure for handling the posting of “non-consensual intimate imagery” was simple: delete it. But Neymar was protected by XCheck. For more than a day, the system blocked Facebook’s moderators from removing the video. An internal review of the incident found that 56 million Facebook and Instagram users saw what Facebook described in a separate document as “revenge porn,” exposing the woman to what an employee referred to in the review as “ongoing abuse” from other users.
> 
> Facebook’s operational guidelines stipulate that not only should unauthorized nude photos be deleted, but people who post them should have their accounts deleted. Faced with the prospect of scrubbing one of the world’s most famous athletes from its platform, Facebook blinked.
> 
> “After escalating the case to leadership,” the review said, “we decided to leave Neymar’s accounts active, a departure from our usual ‘one strike’ profile disable policy.”
> 
> Facebook knew that providing preferential treatment to famous and powerful users was problematic at best and unacceptable at worst. “Unlike the rest of our community, these people can violate our standards without any consequences,” a 2019 review noted, calling the system “not publicly defensible.”
> 
> Nowhere did XCheck interventions occur more than in American politics, especially on the right.
> 
> ---
> 
> When a high-enough-profile account was conclusively found to have broken Facebook’s rules, the company would delay taking action for twenty-four hours, during which it tried to convince the offending party to remove the offending post voluntarily. The program served as an invitation for privileged accounts to play at the edge of Facebook’s tolerance. If they crossed the line, they could simply take it back, having already gotten most of the traffic they would receive anyway. (Along with Diamond and Silk, every member of Congress ended up being granted the self-remediation window.)
> 
> Sometimes Kaplan himself got directly involved. According to documents first obtained by BuzzFeed, the global head of Public Policy was not above either pushing employees to lift penalties against high-profile conservatives for spreading false information or leaning on Facebook’s fact-checkers to alter their verdicts.
> 
> An understanding began to dawn among the politically powerful: if you mattered enough, Facebook would often cut you slack. Prominent entities rightly treated any significant punishment as a sign that Facebook didn’t consider them worthy of white-glove treatment. To prove the company wrong, they would scream as loudly as they could in response.
> 
> “Some of these people were real gems,” recalled Harbath. In Facebook’s Washington, DC, office, staffers would explicitly justify blocking penalties against “Activist Mommy,” a Midwestern Christian account with a penchant for anti-gay rhetoric, because she would immediately go to the conservative press.
> 
> Facebook’s fear of messing up with a major public figure was so great that some achieved a status beyond XCheck and were whitelisted altogether, rendering even their most vile content immune from penalties, downranking, and, in some cases, even internal review.
> 
> ---
> 
> Other Civic colleagues and Integrity staffers piled into the comments section to concur. “If our goal, was say something like: have less hate, violence etc. on our platform to begin with instead of remove more hate, violence etc. our solutions and investments would probably look quite different,” one wrote.
> 
> Rosen was getting tired of dealing with Civic. Zuckerberg, who famously did not like to revisit decisions once they were made, had already dictated his preferred approach: automatically remove content if Facebook’s classifiers were highly confident that it broke the platform’s rules and take “soft” actions such as demotions when the systems predicted a violation was more likely than not. These were the marching orders and the only productive path forward was to diligently execute them.
> 
> ---
> 
> The week before, the Wall Street Journal had published a story my colleague Newley Purnell and I cowrote about how Facebook had exempted a firebrand Hindu politician from its hate speech enforcement. There had been no question that Raja Singh, a member of the Telangana state parliament, was inciting violence. He gave speeches calling for Rohingya immigrants who fled genocide in Myanmar to be shot, branded all Indian Muslims traitors, and threatened to raze mosques. He did these things while building an audience of more than 400,000 followers on Facebook. Earlier that year, police in Hyderabad had placed him under house arrest to prevent him from leading supporters to the scene of recent religious violence.
> 
> That Facebook did nothing in the face of such rhetoric could have been due to negligence—there were a lot of firebrand politicians offering a lot of incitement in a lot of different languages around the world. But in this case, Facebook was well aware of Singh’s behavior. Indian civil rights groups had brought him to the attention of staff in both Delhi and Menlo Park as part of their efforts to pressure the company to act against hate speech in the country.
> 
> There was no question whether Singh qualified as a “dangerous individual,” someone who would normally be barred from having a presence on Facebook’s platforms. Despite the internal conclusion that Singh and several other Hindu nationalist figures were creating a risk of actual bloodshed, their designation as hate figures had been blocked by Ankhi Das, Facebook’s head of Indian Public Policy—the same executive who had lobbied years earlier to reinstate BJP-associated pages after Civic had fought to take them down.
> 
> Das, whose job included lobbying India’s government on Facebook’s behalf, didn’t bother trying to justify protecting Singh and other Hindu nationalists on technical or procedural grounds. She flatly said that designating them as hate figures would anger the government, and the ruling BJP, so the company would not be doing it. ... Following our story, Facebook India’s then–managing director Ajit Mohan assured the company’s Muslim employees that we had gotten it wrong. Facebook removed hate speech “as soon as it became aware of it” and would never compromise its community standards for political purposes. “While we know there is more to do, we are making progress every day,” he wrote.
> 
> It was after we published the story that Kiran (a pseudonym) reached out to me. They wanted to make clear that our story in the Journal had just scratched the surface. Das’s ties with the government were far tighter than we understood, they said, and Facebook India was protecting entities much more dangerous than Singh.
> 
> ---
> 
> “Hindus, come out. Die or kill,” one prominent activist had declared during a Facebook livestream, according to a later report by retired Indian civil servants. The ensuing violence left fifty-three people dead and swaths of northeastern Delhi burned.
> 
> ---
> 
> The researcher set up a dummy account while traveling. Because the platform factored a user’s geography into content recommendations, she and a colleague noted in a writeup of her findings, it was the only way to get a true read on what the platform was serving up to a new Indian user.
> 
> Ominously, her summary of what Facebook had recommended to their notional twenty-one-year-old Indian woman began with a trigger warning for graphic violence. While Facebook’s push of American test users toward conspiracy theories had been concerning, the Indian version was dystopian.
> 
> “In the 3 weeks since the account has been opened, by following just this recommended content, the test user’s News Feed has become a near constant barrage of polarizing nationalist content, misinformation, and violence and gore,” the note stated. The dummy account’s feed had turned especially dark after border skirmishes between Pakistan and India in early 2019. Amid a period of extreme military tensions, Facebook funneled the user toward groups filled with content promoting full-scale war and mocking images of corpses with laughing emojis.
> 
> This wasn’t a case of bad posts slipping past Facebook’s defenses, or one Indian user going down a nationalistic rabbit hole. What Facebook was recommending to the young woman had been bad from the start. The platform had pushed her to join groups clogged with images of corpses, watch purported footage of fictional air strikes, and congratulate nonexistent fighter pilots on their bravery.
> 
> “I’ve seen more images of dead people in the past three weeks than I’ve seen in my entire life, total,” the researcher wrote, noting that the platform had allowed falsehoods, dehumanizing rhetoric, and violence to “totally take over during a major crisis event.” Facebook needed to consider not only how its recommendation systems were affecting “users who are different from us,” she concluded, but rethink how it built its products for “non-US contexts.”
> 
> India was not an outlier. Outside of English-speaking countries and Western Europe, users routinely saw more cruelty, engagement bait, and falsehoods. Perhaps differing cultural senses of propriety explained some of the gap, but a lot clearly stemmed from differences in investment and concern.
> 
> ---
> 
> This wasn’t supposed to be legal in the Gulf under the gray-market labor sponsorship system known as kafala, but the internet had removed the friction from buying people. Undercover reporters from BBC Arabic posed as a Kuwaiti couple and negotiated to buy a sixteen-year-old girl whose seller boasted about never allowing her to leave the house.
> 
> Everyone told the BBC they were horrified. Kuwaiti police rescued the girl and sent her home. Apple and Google pledged to root out the abuse, and the bartering apps cited in the story deleted their “domestic help” sections. Facebook pledged to take action and deleted a popular hashtag used to advertise maids for sale.
> 
> After that, the company largely dropped the matter. But Apple turned out to have a longer attention span. In October, after sending Facebook numerous examples of ongoing maid sales via Instagram, it threatened to remove Facebook’s products from its App Store.
> 
> Unlike human trafficking, this, to Facebook, was a real crisis.
> 
> “Removing our applications from Apple’s platforms would have had potentially severe consequences to the business, including depriving millions of users of access to IG & FB,” an internal report on the incident stated.
> 
> With alarm bells ringing at the highest levels, the company found and deleted an astonishing 133,000 posts, groups, and accounts related to the practice within days. It also performed a quick revamp of its policies, reversing a previous rule allowing the sale of maids through “brick and mortar” businesses. (To avoid upsetting the sensibilities of Gulf State “partners,” the company had previously permitted the advertising and sale of servants by businesses with a physical address.) Facebook also committed to “holistic enforcement against any and all content promoting domestic servitude,” according to the memo.
> 
> Apple lifted its threat, but again Facebook wouldn’t live up to its pledges. Two years later, in late 2021, an Integrity staffer would write up an investigation titled “Domestic Servitude: This Shouldn’t Happen on FB and How We Can Fix It.” Focused on the Philippines, the memo described how fly-by-night employment agencies were recruiting women with “unrealistic promises” and then selling them into debt bondage overseas. If Instagram was where domestic servants were sold, Facebook was where they were recruited.
> 
> Accessing the direct-messaging inboxes of the placing agencies, the staffer found Filipina domestic servants pleading for help. Some reported rape or sent pictures of bruises from being hit. Others hadn’t been paid in months. Still others reported being locked up and starved. The labor agencies didn’t help.
> 
> The passionately worded memo, and others like it, listed numerous things the company could do to prevent the abuse. There were improvements to classifiers, policy changes, and public service announcements to run. Using machine learning, Facebook could identify Filipinas who were looking for overseas work and then inform them of how to spot red flags in job postings. In Persian Gulf countries, Instagram could run PSAs about workers’ rights.
> 
> These things largely didn’t happen for a host of reasons. One memo noted a concern that, if worded too strongly, Arabic-language PSAs admonishing against the abuse of domestic servants might “alienate buyers” of them. But the main obstacle, according to people familiar with the team, was simply resources. The team devoted full-time to human trafficking—which included not just the smuggling of people for labor and sex but also the sale of human organs—amounted to a half-dozen people worldwide. The team simply wasn’t large enough to knock this stuff out.
> 
> ---
> 
> “We’re largely blind to problems on our site,” Leach’s presentation wrote of Ethiopia.
> 
> Facebook employees produced a lot of internal work like this: declarations that the company had gotten in over its head, unable to provide even basic remediation to potentially horrific problems. Events on the platform could foreseeably lead to loss of life and almost certainly did, according to human rights groups monitoring Ethiopia. Meareg Amare, a university lecturer in Addis Ababa, was murdered outside his home one month after a post went viral, receiving 35,000 likes, listing his home address and calling for him to be attacked. Facebook failed to remove it. His family is now suing the company.
> 
> As it so often did, the company was choosing growth over quality. Efforts to expand service to poorer and more isolated places would not wait for user protections to catch up, and, even in countries at “dire” risk of mass atrocities, the At Risk Countries team needed approval to do things that harmed engagement.
> 
> ---
> 
> Documents and transcripts of internal meetings among the company’s American staff show employees struggling to explain why Facebook wasn’t following its normal playbook when dealing with hate speech, the coordination of violence, and government manipulation in India. Employees in Menlo Park discussed the BJP’s promotion of the “Love Jihad” lie. They met with human rights organizations that documented the violence committed by the platform’s cow-protection vigilantes. And they tracked efforts by the Indian government and its allies to manipulate the platform via networks of accounts. Yet nothing changed.
> 
> “We have a lot of business in India, yeah. And we have connections with the government, I guess, so there are some sensitivities around doing a mitigation in India,” one employee told another about the company’s protracted failure to address abusive behavior by an Indian intelligence service.
> 
> During another meeting, a team working on what it called the problem of “politicized hate” informed colleagues that the BJP and its allies were coordinating both the “Love Jihad” slander and another hashtag, #CoronaJihad, premised on the idea that Muslims were infecting Hindus with COVID via halal food.
> 
> The Rashtriya Swayamsevak Sangh, or RSS—the umbrella Hindu nationalist movement of which the BJP is the political arm—was promoting these slanders through 6,000 or 7,000 different entities on the platform, with the goal of portraying Indian Muslims as subhuman, the presenter explained. Some of the posts said that the Quran encouraged Muslim men to rape their female family members.
> 
> “What they’re doing really permeates Indian society,” the presenter noted, calling it part of a “larger war.”
> 
> A colleague at the meeting asked the obvious question. Given the company’s conclusive knowledge of the coordinated hate campaign, why hadn’t the posts or accounts been taken down?
> 
> “Ummm, the answer that I’ve received for the past year and a half is that it’s too politically sensitive to take down RSS content as hate,” the presenter said.
> 
> Nothing needed to be said in response.
> 
> “I see your face,” the presenter said. “And I totally agree.”
> 
> ---
> 
> One incident in particular, involving a local political candidate, stuck out. As Kiran recalled it, the guy was a little fish, a Hindu nationalist activist who hadn’t achieved Raja Singh’s six-digit follower count but was still a provocateur. The man’s truly abhorrent behavior had been repeatedly flagged by lower-level moderators, but somehow the company always seemed to give it a pass.
> 
> This time was different. The activist had streamed a video in which he and some accomplices kidnapped a man who, they informed the camera, had killed a cow. They took their captive to a construction site and assaulted him while Facebook users heartily cheered in the comments section.
> 
> ---
> 
> Zuckerberg launched an internal campaign against social media overenforcement. Ordering the creation of a team dedicated to preventing wrongful content takedowns, Zuckerberg demanded regular briefings on its progress from senior employees. He also suggested that, instead of rigidly enforcing platform rules on content in Groups, Facebook should defer more to the sensibilities of the users in them. In response, a staffer proposed entirely exempting private groups from enforcement for “low-tier hate speech.”
> 
> ---
> 
> The stuff was viscerally terrible—people clamoring for lynchings and civil war. One group was filled with “enthusiastic calls for violence every day.” Another top group claimed it was set up by Trump-supporting patriots but was actually run by “financially motivated Albanians” directing a million views daily to fake news stories and other provocative content.
> 
> The comments were often worse than the posts themselves, and even this was by design. The content of the posts would be incendiary but fall just shy of Facebook’s boundaries for removal—it would be bad enough, however, to harvest user anger, classic “hate bait.” The administrators were professionals, and they understood the platform’s weaknesses every bit as well as Civic did. In News Feed, anger would rise like a hot-air balloon, and such comments could take a group to the top.
> 
> Public Policy had previously refused to act on hate bait
> 
> ---
> 
> We have heavily overpromised regarding our ability to moderate content on the platform,” one data scientist wrote to Rosen in September. “We are breaking and will continue to break our recent promises.”
> 
> ---
> 
> The longstanding conflicts between Civic and Facebook’s Product, Policy, and leadership teams had boiled over in the wake of the “looting/shooting” furor, and executives—minus Chakrabarti—had privately begun discussing how to address what was now unquestionably viewed as a rogue Integrity operation. Civic, with its dedicated engineering staff, hefty research operation, and self-chosen mission statement, was on the chopping block.
> 
> ---
> 
> The group had grown to more than 360,000 members less than twenty-four hours later when Facebook took it down, citing “extraordinary measures.” Pushing false claims of election fraud to a mass audience at a time when armed men were calling for a halt to vote counting outside tabulation centers was an obvious problem, and one that the company knew was only going to get bigger. Stop the Steal had an additional 2.1 million users pending admission to the group when Facebook pulled the plug.
> 
> Facebook’s leadership would describe Stop the Steal’s growth as unprecedented, though Civic staffers could be forgiven for not sharing their sense of surprise.
> 
> ---
> 
> Zuckerberg had accepted the deletion under emergency circumstances, but he didn’t want the Stop the Steal group’s removal to become a precedent for a backdoor ban on false election claims. During the run-up to Election Day, Facebook had removed only lies about the actual voting process—stuff like “Democrats vote on Wednesday” and “People with outstanding parking tickets can’t go to the polls.” Noting the thin distinction between the claim that votes wouldn’t be counted and that they wouldn’t be counted accurately, Chakrabarti had pushed to take at least some action against baseless election fraud claims.
> 
> Civic hadn’t won that fight, but with the Stop the Steal group spawning dozens of similarly named copycats—some of which also accrued six-figure memberships—the threat of further organized election delegitimization efforts was obvious.
> 
> Barred from shutting down the new entities, Civic assigned staff to at least study them. Staff also began tracking top delegitimization posts, which were earning tens of millions of views, for what one document described as “situational awareness.” A later analysis found that as much as 70 percent of Stop the Steal content was coming from known “low news ecosystem quality” pages, the commercially driven publishers that Facebook’s News Feed integrity staffers had been trying to fight for years.
> 
> ---
> 
> Zuckerberg overruled both Facebook’s Civic team and its head of counterterrorism. Shortly after the Associated Press called the presidential election for Joe Biden on November 7—the traditional marker for the race being definitively over—Molly Cutler assembled roughly fifteen executives that had been responsible for the company’s election preparation. Citing orders from Zuckerberg, she said the election delegitimization monitoring was to immediately stop.
> 
> ---
> 
> On December 17, a data scientist flagged that a system responsible for either deleting or restricting high-profile posts that violated Facebook’s rules had stopped doing so. Colleagues ignored it, assuming that the problem was just a “logging issue”—meaning the system still worked, it just wasn’t recording its actions. On the list of Facebook’s engineering priorities, fixing that didn’t rate.
> 
> In fact, the system truly had failed, in early November. Between then and when engineers realized their error in mid-January, the system had given a pass to 3,100 highly viral posts that should have been deleted or labeled “disturbing.”
> 
> Glitches like that happened all the time at Facebook. Unfortunately, this one produced an additional 8 billion “regrettable” views globally, instances in which Facebook had shown users content that it knew was trouble. The company would later say that only a small minority of the 8 billion “regrettable” content views touched on American politics, and that the mistake was immaterial to subsequent events. A later review of Facebook’s post-election work tartly described the flub as a “lowlight” of the platform’s 2020 election performance, though the company disputes that it had a meaningful impact. At least 7 billion of the bad content views were international, the company says, and of the American material only a portion dealt with politics. Overall, a spokeswoman said, the company remains proud of its pre- and post-election safety work.
> 
> ---
> 
> Zuckerberg vehemently disagreed with people who said that the COVID vaccine was unsafe, but he supported their right to say it, including on Facebook. ... Under Facebook’s policy, health misinformation about COVID was to be removed only if it posed an imminent risk of harm, such as a post telling infected people to drink bleach ... A researcher randomly sampled English-language comments containing phrases related to COVID and vaccines. A full two-thirds were anti-vax. The researcher’s memo compared that figure to public polling showing the prevalence of anti-vaccine sentiment in the U.S.—it was a full 40 points lower.
> 
> Additional research found that a small number of “big whales” was behind a large portion of all anti-vaccine content on the platform. Of 150,000 posters in Facebook groups that were eventually disabled for COVID misinformation, just 5 percent were producing half of all posts. And just 1,400 users were responsible for inviting half of all members. “We found, like many problems at FB, this is a head-heavy problem with a relatively few number of actors creating a large percentage of the content and growth,” Facebook researchers would later note.
> 
> One of the anti-vax brigade’s favored tactics was to piggyback on posts from entities like UNICEF and the World Health Organization encouraging vaccination, which Facebook was promoting free of charge. Anti-vax activists would respond with misinformation or derision in the comments section of these posts, then boost one another’s hostile comments toward the top slot
> 
> ---
> 
> Even as Facebook prepared for virally driven crises to become routine, the company’s leadership was becoming increasingly comfortable absolving its products of responsibility for feeding them. By the spring of 2021, it wasn’t just Boz arguing that January 6 was someone else’s problem. Sandberg suggested that January 6 was “largely organized on platforms that don’t have our abilities to stop hate.” Zuckerberg told Congress that they need not cast blame beyond Trump and the rioters themselves. “The country is deeply divided right now and that is not something that tech alone can fix,” he said.
> 
> In some instances, the company appears to have publicly cited research in what its own staff had warned were inappropriate ways. A June 2020 review of both internal and external research had warned that the company should avoid arguing that higher rates of polarization among the elderly—the demographic that used social media least—was proof that Facebook wasn’t causing polarization.
> 
> Though the argument was favorable to Facebook, researchers wrote, Nick Clegg should avoid citing it in an upcoming opinion piece because “internal research points to an opposite conclusion.” Facebook, it turned out, fed false information to senior citizens at such a massive rate that they consumed far more of it despite spending less time on the platform. Rather than vindicating Facebook, the researchers wrote, “the stronger growth of polarization for older users may be driven in part by Facebook use.”
> 
> All the researchers wanted was for executives to avoid parroting a claim that Facebook knew to be wrong, but they didn’t get their wish. The company says the argument never reached Clegg. When he published a March 31, 2021, Medium essay titled “You and the Algorithm: It Takes Two to Tango,” he cited the internally debunked claim among the “credible recent studies” disproving that “we have simply been manipulated by machines all along.” (The company would later say that the appropriate takeaway from Clegg’s essay on polarization was that “research on the topic is mixed.”)
> 
> Such bad-faith arguments sat poorly with researchers who had worked on polarization and analyses of Stop the Steal, but Clegg was a former politician hired to defend Facebook, after all. The real shock came from an internally published research review written by Chris Cox.
> 
> Titled “What We Know About Polarization,” the April 2021 Workplace memo noted that the subject remained “an albatross public narrative,” with Facebook accused of “driving societies into contexts where they can’t trust each other, can’t share common ground, can’t have conversations about issues, and can’t share a common view on reality.”
> 
> But Cox and his coauthor, Facebook Research head Pratiti Raychoudhury, were happy to report that a thorough review of the available evidence showed that this “media narrative” was unfounded. The evidence that social media played a contributing role in polarization, they wrote, was “mixed at best.” Though Facebook likely wasn’t at fault, Cox and Raychoudhury wrote, the company was still trying to help, in part by encouraging people to join Facebook groups. “We believe that groups are on balance a positive, depolarizing force,” the review stated.
> 
> The writeup was remarkable for its choice of sources. Cox’s note cited stories by New York Times columnists David Brooks and Ezra Klein alongside early publicly released Facebook research that the company’s own staff had concluded was no longer accurate. At the same time, it omitted the company’s past conclusions, affirmed in another literature review just ten months before, that Facebook’s recommendation systems encouraged bombastic rhetoric from publishers and politicians, as well as previous work finding that seeing vicious posts made users report “more anger towards people with different social, political, or cultural beliefs.” While nobody could reliably say how Facebook altered users’ off-platform behavior, how the company shaped their social media activity was accepted fact. “The more misinformation a person is exposed to on Instagram the more trust they have in the information they see on Instagram,” company researchers had concluded in late 2020.
> 
> In a statement, the company called the presentation “comprehensive” and noted that partisan divisions in society arose “long before platforms like Facebook even existed.” For staffers that Cox had once assigned to work on addressing known problems of polarization, his note was a punch to the gut.
> 
> ---
> 
> In 2016, the New York Times had reported that Facebook was quietly working on a censorship tool in an effort to gain entry to the Chinese market. While the story was a monster, it didn’t come as a surprise to many people inside the company. Four months earlier, an engineer had discovered that another team had modified a spam-fighting tool in a way that would allow an outside party control over content moderation in specific geographic regions. In response, he had resigned, leaving behind a badge post correctly surmising that the code was meant to loop in Chinese censors.
> 
> With a literary mic drop, the post closed out with a quote on ethics from Charlotte Brontë’s Jane Eyre: “Laws and principles are not for the times when there is no temptation: they are for such moments as this, when body and soul rise in mutiny against their rigour; stringent are they; inviolate they shall be. If at my individual convenience I might break them, what would be their worth?”
> 
> Garnering 1,100 reactions, 132 comments, and 57 shares, the post took the program from top secret to open secret. Its author had just pioneered a new template: the hard-hitting Facebook farewell.
> 
> That particular farewell came during a time when Facebook’s employee satisfaction surveys were generally positive, before the time of endless crisis, when societal concerns became top of mind. In the intervening years, Facebook had hired a massive base of Integrity employees to work on those issues, and seriously pissed off a nontrivial portion of them.
> 
> Consequently, some badge posts began to take on a more mutinous tone. Staffers who had done groundbreaking work on radicalization, human trafficking, and misinformation would summarize both their accomplishments and where they believed the company had come up short on technical and moral grounds. Some broadsides against the company ended on a hopeful note, including detailed, jargon-light instructions for how, in the future, their successors could resurrect the work.
> 
> These posts were gold mines for Haugen, connecting product proposals, experimental results, and ideas in ways that would have been impossible for an outsider to re-create. She photographed not just the posts themselves but the material they linked to, following the threads to other topics and documents. A half dozen were truly incredible, unauthorized chronicles of Facebook’s dawning understanding of the way its design determined what its users consumed and shared. The authors of these documents hadn’t been trying to push Facebook toward social engineering—they had been warning that the company had already wandered into doing so and was now neck deep.
> 
> ---
> 
> The researchers’ best understanding was summarized this way: “We make body image issues worse for one in three teen girls.”
> 
> ---
> 
> In 2020, Instagram’s Well-Being team had run a study of massive scope, surveying 100,000 users in nine countries about negative social comparison on Instagram. The researchers then paired the answers with individualized data on how each user who took the survey had behaved on Instagram, including how and what they posted. They found that, for a sizable minority of users, especially those in Western countries, Instagram was a rough place. Ten percent reported that they “often or always” felt worse about themselves after using the platform, and a quarter believed Instagram made negative comparison worse.
> 
> Their findings were incredibly granular. They found that fashion and beauty content produced negative feelings in ways that adjacent content like fitness did not. They found that “people feel worse when they see more celebrities in feed,” and that Kylie Jenner seemed to be unusually triggering, while Dwayne “The Rock” Johnson was no trouble at all. They found that people judged themselves far more harshly against friends than celebrities. A movie star’s post needed 10,000 likes before it caused social comparison, whereas, for a peer, the number was ten.
> 
> In order to confront these findings, the Well-Being team suggested that the company cut back on recommending celebrities for people to follow, or reweight Instagram’s feed to include less celebrity and fashion content, or de-emphasize comments about people’s appearance. As a fellow employee noted in response to summaries of these proposals on Workplace, the Well-Being team was suggesting that Instagram become less like Instagram.
> 
> “Isn’t that what IG is mostly about?” the man wrote. “Getting a peek at the (very photogenic) life of the top 0.1%? Isn’t that the reason why teens are on the platform?”
> 
> ---
> 
> “We are practically not doing anything,” the researchers had written, noting that Instagram wasn’t currently able to stop itself from promoting underweight influencers and aggressive dieting. A test account that signaled an interest in eating disorder content filled up with pictures of thigh gaps and emaciated limbs.
> 
> The problem would be relatively easy for outsiders to document. Instagram was, the research warned, “getting away with it because no one has decided to dial into it.”
> 
> ---
> 
> He began the presentation by noting that 51 percent of Instagram users reported having a “bad or harmful” experience on the platform in the previous seven days. But only 1 percent of those users reported the objectionable content to the company, and Instagram took action in 2 percent of those cases. The math meant that the platform remediated only 0.02 percent of what upset users—just one bad experience out of every 5,000.
> 
> “The numbers are probably similar on Facebook,” he noted, calling the statistics evidence of the company’s failure to understand the experiences of users such as his own daughter. Now sixteen, she had recently been told to “get back to the kitchen” after she posted about cars, Bejar said, and she continued receiving the unsolicited dick pics she had been getting since the age of fourteen. “I asked her why boys keep doing that? She said if the only thing that happens is they get blocked, why wouldn’t they?”
> 
> Two years of research had confirmed that Joanna Bejar’s logic was sound. On a weekly basis, 24 percent of all Instagram users between the ages of thirteen and fifteen received unsolicited advances, Bejar informed the executives. Most of that abuse didn’t violate the company’s policies, and Instagram rarely caught the portion that did.
> 
> ---
> 
> nothing highlighted the costs better than a Twitter bot set up by New York Times reporter Kevin Roose. Using methodology created with the help of a CrowdTangle staffer, Roose found a clever way to put together a daily top ten of the platform’s highest-engagement content in the United States, producing a leaderboard that demonstrated how thoroughly partisan publishers and viral content aggregators dominated the engagement signals that Facebook valued most.
> 
> The degree to which that single automated Twitter account got under the skin of Facebook’s leadership would be difficult to overstate. Alex Schultz, the VP who oversaw Facebook’s Growth team, was especially incensed—partly because he considered raw engagement counts to be misleading, but more because it was Facebook’s own tool reminding the world every morning at 9:00 a.m. Pacific that the platform’s content was trash.
> 
> “The reaction was to prove the data wrong,” recalled Brian Boland. But efforts to employ other methodologies only produced top ten lists that were nearly as unflattering. Schultz began lobbying to kill off CrowdTangle altogether, replacing it with periodic top content reports of its own design. That would still be more transparency than any of Facebook’s rivals offered, Schultz noted
> 
> ...
> 
> Schultz handily won the fight. In April 2021, Silverman convened his staff on a conference call and told them that CrowdTangle’s team was being disbanded. ... “Boz would just say, ‘You’re completely off base,’ ” Boland said. “Data wins arguments at Facebook, except for this one.”
> 
> ---
> 
> When the company issued its response later in May, I read the document with a clenched jaw. Facebook had agreed to grant the board’s request for information about XCheck and “any exceptional processes that apply to influential users.”
> 
> ...
> 
> “We want to make clear that we remove content from Facebook, no matter who posts it,” Facebook’s response to the Oversight Board read. “Cross check simply means that we give some content from certain Pages or Profiles additional review.”
> 
> There was no mention of whitelisting, of C-suite interventions to protect famous athletes, of queues of likely violating posts from VIPs that never got reviewed. Although our documents showed that at least 7 million of the platform’s most prominent users were shielded
> 
> by some form of XCheck, Facebook assured the board that it applied to only “a small number of decisions.” The only XCheck-related request that Facebook didn’t address was for data that might show whether XChecked users had received preferential treatment.
> 
> “It is not feasible to track this information,” Facebook responded, neglecting to mention that it was exempting some users from enforcement entirely.
> 
> ---
> 
> “I’m sure many of you have found the recent coverage hard to read because it just doesn’t reflect the company we know,” he wrote in a note to employees that was also shared on Facebook. The allegations didn’t even make sense, he wrote: “I don’t know any tech company that sets out to build products that make people angry or depressed.”
> 
> Zuckerberg said he worried the leaks would discourage the tech industry at large from honestly assessing their products’ impact on the world, in order to avoid the risk that internal research might be used against them. But he assured his employees that their company’s internal research efforts would stand strong. “Even though it might be easier for us to follow that path, we’re going to keep doing research because it’s the right thing to do,” he wrote.
> 
> By the time Zuckerberg made that pledge, research documents were already disappearing from the company’s internal systems. Had a curious employee wanted to double-check Zuckerberg’s claims about the company’s polarization work, for example, they would have found that key research and experimentation data had become inaccessible.
> 
> The crackdown had begun.
> 
> ---
> 
> One memo required researchers to seek special approval before delving into anything on a list of topics requiring “mandatory oversight”—even as a manager acknowledged that the company did not maintain such a list.
> 
> ---
> 
> The “Narrative Excellence” memo and its accompanying notes and charts were a guide to producing documents that reporters like me wouldn’t be excited to see. Unfortunately, as a few bold user experience researchers noted in the replies, achieving Narrative Excellence was all but incompatible with succeeding at their jobs. Writing things that were “safer to be leaked” meant writing things that would have less impact.

## Appendix: non-statements

I really like the "non-goals" section of design docs. I think the analogous non-statements section of a doc like this is much less valuable because the top-level non-statements can generally be inferred by reading this doc, whereas top-level non-goals often add information, but I figured I'd try this out anyway.

* Facebook (or any other company named here, like Uber) is uniquely bad
 * As discussed, on the contrary, I think Facebook isn't very atypical, which is why
* Zuckerberg (or any other person named) is uniquely bad
* Big tech employees are bad people
* No big tech company employees are working hard or trying hard
 * For some reason, a common response to any criticism of a tech company foible or failure is "people are working hard". This is almost never a response to a critique that nobody is working hard, and that is once again not the critique here
* Big tech companies should be broken up or otherwise have antitrust action taken against them
 * Maybe so, but this document doesn't make that case
* Bigger companies in the same industry are strictly worse than smaller companies
 * Discussed above, but I'll mention it again here
* The general bigness vs. smallness tradeoff as discussed here applies strictly across all areas all industries
 * Also mentioned above, but mentioned again here. For example, the percentage of rides in which a taxi drier tries to scam the user seems much higher with traditional taxis than with Uber
* It's easy to do moderation and support at scale
* On average, large companies provide a worse experience for users
 * For example, I still use Amazon because it gives me the best overall experience. As noted above, cost and shipping are better with Amazon than with any other alternative. There are entire classes of items where most things I've bought are counterfeit, such as masks and respirators. When I bought these in January 2020, before these were something many people would buy, I got genuine 3M masks. Masks and filters were then hard to get for a while, and then when they became available again, the majority of 3M masks and filters I got were counterfeit (out of curiosity, I tried more than a few independent orders over the next few years). I try to avoid classes of items that have a high counterfeit rate (but a naive user who doesn't know to do this will buy a lot of low-quality counterfeits), and I know I'm rolling the dice every time I buy any expensive item (if I get a counterfeit or an empty box, Amazon might not accept the return or refund me unless I can make a viral post about the issue), and sometimes a class of item goes from being one where you can usually get good items to one where most items are counterfeit.
 * Many objections are, implicitly or explicitly, are about the average experience, but this is nonsensical when the discussion is about the experience in the tail; this is like the standard response you see when someone notes that a concurrency bug is a problem and someone else say it's fine because "it works for me", which doesn't make sense for bugs that occur in the tail.

1. when Costco was smaller, I would've put Costco here instead of Best Buy, but as they've gotten bigger, I've noticed that their quality has gone down. It's really striking how (relatively) frequently I find sealed items like cheese going bad long before their "best by" date or just totally broken items. This doesn't appear to have anything to do with any particular location since I moved almost annually for close to a decade and observed this decline across many different locations (because I was moving, at first, I thought that I got unlucky with where I'd moved to, but as I tried locations in various places, I realized that this wasn't specific to any location and it seems to have impacted stores in both the U.S. and Canada). \[return\]
2. when the WSJ looked at leaked internal Meta documents, they found, among other things, that Meta estimated that 100k minors per day "received photos of adult genitalia or other sexually abusive content". Of course, smart contrarians will argue that this is totally normal, e.g., two of the first few comments on HN were about how there's nothing particularly wrong with this. Sure, it's bad for children to get harassed, but "it can happen on any street corner", "what's the base rate to compare against", etc.
 
 Very loosely, if we're liberal, we might estimate that Meta had 2.5B DAU in early 2021 and 500M were minors, or if we're conservative, maybe we guess that 100M are minors. So, we might guess that Meta estimated something like 0.1% to 0.02% of minors on Meta platforms received photos of genitals or similar each day. Is this roughly the normal rate they would experience elsewhere? Compared to the real world, possibly, although I would be surprised if 0.1% of children are being exposed to people's genitals "on any street corner". Compared to a well moderated small forum, that seems highly implausible. The internet commenter reaction was the same reaction that Arturo Bejar, who designed Facebook's reporting system and worked in the area, had. He initially dismissed reports about this kind of thing because it didn't seem plausible that it could really be that bad, but he quickly changed his mind once he started looking into it:
 
 > Joanna’s account became moderately successful, and that’s when things got a little dark. Most of her followers were enthused about a \[14-year old\] girl getting into car restoration, but some showed up with rank misogyny, like the guy who told Joanna she was getting attention “just because you have tits.”
 > 
 > “Please don’t talk about my underage tits,” Joanna Bejar shot back before reporting the comment to Instagram. A few days later, Instagram notified her that the platform had reviewed the man’s comment. It didn’t violate the platform’s community standards.
 > 
 > Bejar, who had designed the predecessor to the user-reporting system that had just shrugged off the sexual harassment of his daughter, told her the decision was a fluke. But a few months later, Joanna mentioned to Bejar that a kid from a high school in a neighboring town had sent her a picture of his penis via an Instagram direct message. Most of Joanna’s friends had already received similar pics, she told her dad, and they all just tried to ignore them.
 > 
 > Bejar was floored. The teens exposing themselves to girls who they had never met were creeps, but they presumably weren’t whipping out their dicks when they passed a girl in a school parking lot or in the aisle of a convenience store. Why had Instagram become a place where it was accepted that these boys occasionally would—or that young women like his daughter would have to shrug it off?
 
 Much of the book, Broken Code, is about Bejar and others trying to get Meta to take problems like this seriously and making little progress and often having their progress undone (although, PR issues for FB seem to force FB's hand and drive some progress towards the end of the book):
 
 > six months prior, a team had redesigned Facebook’s reporting system with the specific goal of reducing the number of completed user reports so that Facebook wouldn’t have to bother with them, freeing up resources that could otherwise be invested in training its artificial intelligence–driven content moderation systems. In a memo about efforts to keep the costs of hate speech moderation under control, a manager acknowledged that Facebook might have overdone its effort to stanch the flow of user reports: “We may have moved the needle too far,” he wrote, suggesting that perhaps the company might not want to suppress them so thoroughly.
 > 
 > The company would later say that it was trying to improve the quality of reports, not stifle them. But Bejar didn’t have to see that memo to recognize bad faith. The cheery blue button was enough. He put down his phone, stunned. This wasn’t how Facebook was supposed to work. How could the platform care about its users if it didn’t care enough to listen to what they found upsetting?
 > 
 > There was an arrogance here, an assumption that Facebook’s algorithms didn’t even need to hear about what users experienced to know what they wanted. And even if regular users couldn’t see that like Bejar could, they would end up getting the message. People like his daughter and her friends would report horrible things a few times before realizing that Facebook wasn’t interested. Then they would stop.
 
 If you're interested in the topic, I'd recommend reading the whole book, but if you just want to get a flavor for the kinds of things the book discusses, I've put a few relevant quotes into an appendix. After reading the book, I can't say that I'm very sure the number is correct because I'd have to look at the data to be strongly convinced, but it does seem plausible. And as for why Facebook might expose children to more of this kind of thing than another platform, the book makes the case that this falls out of a combination of optimizing for engagement, "number go up", and neglecting "trust and safety" work
 
 > Only a few hours of poking around Instagram and a handful of phone calls were necessary to see that something had gone very wrong—the sort of people leaving vile comments on teenagers’ posts weren’t lone wolves. They were part of a large-scale pedophilic community fed by Instagram’s recommendation systems.
 > 
 > Further reporting led to an initial three-thousand-word story headlined “Instagram Connects Vast Pedophile Network.” Co-written with Katherine Blunt, the story detailed how Instagram’s recommendation systems were helping to create a pedophilic community, matching users interested in underage sex content with each other and with accounts advertising “menus” of content for sale. Instagram’s search bar actively suggested terms associated with child sexual exploitation, and even glancing contact with accounts with names like Incest Toddlers was enough to trigger Instagram to begin pushing users to connect with them.
 
 \[return\]
3. but, fortunately for Zuckerberg, his target audience seems to have little understanding of the tech industry, so it doesn't really matter that Zuckerberg's argument isn't plausible. In a future post, \[we might look at incorrect reasoning from regulators and government officials but, for now, see this example of Gary Bernhardt where FB makes a claim that appears to be the opposite of correct to people who work in the area. \[return\]
4. Another claim, rarer than "it would cost too much to provide real support", is "support can't be done because it's a social engineering attack vector". This isn't as immediately implausible because this calls to mind all of the cases where people had their SMS-2FA'd accounts owned by someone calling up a phone company and getting a phone number transferred, but I don't find it all that plausible since bank and brokerage accounts are, in general, much higher value than FB accounts and FB accounts are still compromised at a much higher rate, even for online-only accounts, accounts back before KYC requirements were in play, or whatever other reason people name as a reasonable-sounding reason for the difference. \[return\]
5. Another reason, less reasonable, but the actual impetus for this post, is that when Zuckerberg made his comments that only the absolute largest companies in the world can handle issues like fraud and spam, it struck me as completely absurd and, because I enjoy absurdity, I started a doc where I recorded links I saw to large company spam, fraud, moderation, and support, failures, much like the list of Google knowledge card results I kept track of for a while. I didn't have a plan for what to do with that and just kept it going for years before I decided to publish the list, at which point I felt that I had to write something, since the bare list by itself isn't that interesting, so I started writing up summaries of each link (the original list was just a list of links), and here we are. When I sit down to write something, I generally have an idea of the approach I'm going to take, but I frequently end up changing my mind when I start looking at the data.
 
 For example, since going from hardware to software, I've had this feeling that conventional software testing is fairly low ROI, so when I joined Twitter, I had this idea that I would look at the monetary impact of errors (e.g., serving up a 500 error to a user) and outages and use that to justify working on testing, in the same way that studies looking into the monetary impact of latency can often drive work on latency reduction. Unfortunately for my idea, I found that a naive analysis found a fairly low monetary impact and I immediately found a number of other projects that were high impact, so I wrote up a doc explaining that my findings were the opposite of what I needed to justify doing the work that I wanted to do, but I hoped to do a more in-depth follow-up that could overturn my original result, and then worked on projects that were supported by data.
 
 This also frequently happens when I write things up here, such as this time I wanted to write up this really compelling sounding story, but, on digging into it, despite it being widely cited in tech circles, I found out that it wasn't true and there wasn't really any interesting there. It's qute often that when I look into something, I find that the angle of I was thinking of doesn't work. When I'm writing for work, I usually feel compelled to at least write up a short doc with evidence of the negative result but, for my personal blog, I don't really feel the same compulsion, so my drafts folder and home drive are littered with abandoned negative results.
 
 However, in this case, on digging into the stories in the links and talking to people at various companies about how these systems work, the problem actually seemed worse than I realized before I looked into it, so it felt worth writing up even if I'm writing up something most people in tech know to be true.
 
 \[return\]
