The last email you received was, in all likelihood, laid out as an RFC 5322-compliant message, a spec last updated in 2008. It might have included attachments (enabled by MIME in 1996, updated a year later to support file names) or Unicode (including emoji) characters in the subject line (not supported without workarounds until 2012).

Someone typed up the email, hit send, at which point SMTP took over (refined in 2008 with RFC 5321). That message bounced around a few agents before being synced to your phone or computer over IMAP—the more than two-decade-old IMAP4rev1 standard from RFC 3501, that is, not the newer IMAP4rev2 since Google, Office 365, and other major players have yet to upgrade.

Your phone’s operating system is likely less than a year old. Odds are it’ll get updated again sometime over the next few months, but also will be considered obsolete in a few years. Email, meanwhile, runs on a stack of standards, some of which haven’t been updated in over two decades.

Not for lack of trying. Among the 9,953 _Request for Comments_ that have been published so far to standardize internet technology, over 550 reference mail or email at some level, depending on what you include. That’s an email-focused RFC every five weeks, on average, for the past 57 years. Those RFCs defined how emails are structured, how they’re transmitted over SMTP and IMAP, how they handle attachments and non-English characters and more.

They’re slow-moving; some RFCs that Gmail partly implemented over a decade ago are yet to be fully standardized, and all go through at least 5 major revisions on average before publication. But one iteration at a time, they give us a window into where email may go over the next decade or two—and into which email features are most likely to gain widespread adoption.

## The newest email features you may not have noticed

It’s happened already: Email has gained new features from RFCs over the past few years with little fanfare.

Did you know, for example, that `武@メール.グーグル` is as valid an email address today as `bob@gmail.com`? Or that you technically can use an emoji in your email address, that you could write me at `😅@techinch.com` and your email will show up in my inbox?

‘Tis true: It works, thanks to a trio of RFCs starting with 6530 that set the framework for Unicode support to internationalize email (or EAI) in 2012, quickly followed up by adding SMTP and header support. IMAP4rev2 came with Unicode support baked in; rev1 gained it with an extension thanks to RFC 6855. To this day, though, older IMAP servers and other email infrastructure still may not support it, and the Unicode address support updates to x.509 security certificates, SPF, DKIM, and DMARC are still evolving.

And so it’s a standard in limbo, as are so many new email features. Gmail announced support for _receiving_ messages from Unicode addresses in 2014. “Language should never be a barrier when it comes to connecting with others,” wrote Google engineer Pedro Monferrer at the launch, promising that “there's still a ways to go” and that “in the future, we want to make it possible for you to use them to create Gmail accounts.” Over a decade later, we’re still waiting. You can send mail to Unicode-formatted addresses and receive mail from them in Gmail (and in Apple Mail on Mac; on iOS, though, `😅@techinch.com` shows up as `_=F0=9F=98=85@techinch.com`). Actual Gmail addresses, though, are still restricted to letters, numbers, and periods.

Other features move faster. One-click unsubscribe, the tech behind the _Unsubscribe_ buttons you might see when reading your favorite newsletters in Gmail, Apple Mail, Outlook, and other mail apps, was proposed with RFC 8058 in 2017. It’s a simple header field, one additional line of text email senders need to add to ensure readers can quickly unsubscribe if needed.

It’s still only a Proposed Standard, but is already a requirement on most email platforms. Gmail and Yahoo! both started requiring one-click unsubscribe in 2024 for lists sending more than 5,000 emails per day. It’s a de facto standard if you want to reliably send bulk email, even if it still may take a while before the Internet Engineering Task Force makes it an official internet standard.

Similarly, you might have seen favicons beside some emails in Gmail. That’s thanks to BIMI or _Brand Indicators for Message Identification_, something that’s an internet draft from 2021, not even a full RFC yet. But the BIMI effort started in 2019, and Gmail baked in support before the first line of the spec was submitted to the IETF.

When all the major players in the email space are behind an idea, and it’s something that makes email more secure or better for business, it’s bound to be pushed through. The standardized RFC can wait—as can emojified email addresses.

## The new email features you may never get to use

The opposite is true for some of email’s most ambitious new features, including the email filtering language Sieve and the JSON-powered email syncing standard JMAP. They’re real, used by a percentage of email users daily, yet unlikely to become a part of the average Gmail, Outlook, and other major email platform user’s email routine.

### Sieve

```
if address :is "From" "pal@mypals.org" {
 fileinto "INBOX.My Best Pal";
 stop;
}
```

Sieve is both one of the longer-running email projects and on the internet standards track. Started in 1999 as part of Carnegie Mellon University’s Cyrus IMAP server, Sieve is a scripting language to filter email messages on your server, right before they’re delivered to your inbox. It’s in active development, as the subject of 42 RFCs including one most recently published in late 2024.

It works. Fastmail supports Sieve today, as does the Cyrus IMAP server where it started, with full programmatic filtering including variables, conditional branching, and logic. It’s powerful enough to build your own spam filters, or to automate tasks like out-of-office replies. And the same Sieve scripts in Fastmail would work on any other server that supports Sieve, so you could migrate email services and take your filters and auto-replies with you.

But don’t hold your breath for Sieve support in Google Workspace or Office 365. Standard or not, email services aren’t required to support every RFC, and both already have their own built-in filtering. There’s little incentive to support a more geeky way to script your email. And while the dream lives on, with the most recent Sieve RFC published only a couple years ago, the project’s site is dead, accessible only via the Internet Archive.

### JMAP

JMAP has fared better so far. An even more ambitious project to reinvent email, calendar, contacts, and file syncing with a JSON-based standard, JMAP is also on the standards track with a dozen related RFCs so far.

“Everybody uses email,” Fastmail Chief Product Officer and JMAP RFC editor Neil Jenkins wrote. “However, the current open protocols connecting email clients and servers, such as IMAP, were not designed for the modern age.” JMAP, instead, is a “robust data synchronization model ... flexible enough to go beyond email, so we can standardize contacts and calendar sync via the same method.” One RFC at a time, the standard has been mapped out from syncing JSON text to formatting standardized email in JSON to syncing everything else, for an open standard that could rival Outlook’s Exchange sync.

JMAP is better for developers. Instead of needing to parse plain text emails line-by-line, JMAP emails are formatted in JSON, clearly differentiating each header and body section. It comes with Gmail-style filters, push notifications, and better server-side search and attachment support out of the box. Yet each of those features are already baked into most modern email systems, through extensions and ad hoc additions—things that were difficult for Google and Microsoft developers to build out but that today are essentially invisible to most people using email.

“JMAP is complicated,” wrote developer Jason Munro when working on support for the Cypht open-source email app. “But it is really (really) well designed.”

But even that doesn’t guarantee broader industry adoption. JMAP works today, most notably in Fastmail whose team led JMAP’s development, but also in the atmail email service, in some email server software including Apache James and Stalwart, and in some applications such as 1Password’s masked email service. But wider adoption is unlikely, when Microsoft has their MAPI sync in Exchange and Gmail has in-house apps plus IMAP support.

Asked whether JMAP will take off, Munro replied: “JMAP is an open, smart, modern, and powerful E-mail protocol, so probably not.”

## Meet the new email. Looks the same as the old email.

And that’s fine. It’s that stability that’s given email such a long half-life, that makes it one of the few cross-platform bits of text that reliably works.

Yet developers can’t help but tilt at windmills, every so often. What if email was better, they wonder, before formalizing their ideas into proposals and RFCs.

That’s how, over the coming years, email may slowly change even as it continues to work much as it always has.

Email works, in large part, because of its “if it’s not broken, don’t fix it” ethos and its decentralized nature that evince its foundations in freewheeling research labs and universities. It’s fixed when needs be, especially to enhance security and broaden email’s global usefulness. Other, nice-but-not-necessary things get floated, discussed, and implemented on the edges, but often fail to gain wider adoption. Better to stick with what works and carefully iterate on that than to risk breaking or—worse in email maintainers’ eyes—centralizing email.

Thus it’s the smaller revisions that are most likely to gain wide adoption. SMTP, for instance, is due for a cleanup, with RFC 5321bis on its 44th revision that “consolidates, updates and clarifies” the way email is transported around the internet, but doesn’t materially change SMTP itself. IMAP, too, is due for an update, with an early internet draft thanks again to the good folks at Fastmail that aims to pull together a handful of IMAP extensions. With luck, it’ll make server-side search queries, compression, moving messages with a command, a NOTIFY command for push messages, and more part of standard IMAP. All good quality of life features, things your favorite email app’s developers have to workaround to support today and that one day might be simpler.

Those, and security updates, are the core focus of RFCs that are most likely to see wide adoption. ARC, the Authenticated Received Chain that increases security in forwarded emails, started life as an experimental RFC in 2019 and was quickly implemented in Gmail and Outlook. But it’s set to go silently into the ether, with a December 2025 proposal to fold it into the next version of DKIM. Similarly, RFC 9788 aims to bring encryption to email headers, 8997 and 8689 upgrade TLS encryption requirements, and DMARCbis is a proposed update to DMARC (itself still only a proposed standard).

A tweak here, a tuck there, and email is slowly modernized, a ship of Theseus hanging on to its original keel. The security updates will get pushed along, adopted as needed likely far before they’re fully standardized. The larger email changes will be adopted as needed, especially by smaller email players who have fewer legacy features to support. Email apps themselves will continue to experiment with new interfaces, new AI-powered features, new takes on how email should look and work, powered behind-the-scenes by the same old SMTP and IMAP that have kept things going so far.

And email will chug along, in its beautiful simplicity, defined by evolving standards that keep it relevant and cross-platform over half a century after it was originally conceived.

Image

Credit

Header photo

Cassie Matias via Unsplash
