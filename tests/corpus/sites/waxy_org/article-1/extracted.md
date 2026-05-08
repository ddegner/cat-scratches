Last week, we launched XOXO Explore, a permanent archive for XOXO, the Portland-based festival and conference I co-organized with Andy McMillan for eight years between 2012 and 2024.

This was a huge undertaking, bringing together every lineup, schedule, recap video, conference talk, and standalone website that we ever made into a single permanent archive, filled with little photos and ephemera from the festival. It includes the final versions of our policies, which we refined over several years and released under open licenses, along with an archive of our guide. We even finally made a proper About page.

This is something we first started talking about back in 2015, and attempted three times, but it was never finished until now.

We’re really proud of it, and to mark the occasion, we made a line of limited-run merch, which you can preorder until the **end of the day tomorrow, Friday, May 1**. This includes all-new shirts, hats, stickers, felt and enamel pins, but also ridiculously niche artifacts, like a custom LEGO set of the XOXO 2024 festival grounds, miniature versions of the “Lower Your Expectations” sign we hung over the entrance to XOXO 2024, and a zine by Jez Burrows documenting one ridiculous thread from the XOXO Slack that spiraled out of control.

Andy McMillan wrote more about it on the XOXO blog, if you’d like to read more.

## A Snapshot of Web Design History

There’s a lot to explore in Explore, but one easy-to-miss detail is the “Website Archive” at the bottom of each year index, collecting and archiving all of our past websites for posterity.

After XOXO started in 2012, we made three separate sites every year, with three different purposes:

1. **Teaser.** Our first sites were always single-serving pages to announce the dates, usually encouraging people to sign up for our email list to get notified when registration opens.
2. **Lineup.** The first time we announce a big chunk of the festival and conference lineup, the cost for passes, and details on registration dates.
3. **Schedule.** These sites were more involved, with full minute-by-minute details of the full festival with speaker/performer bios.

Part of my job on XOXO Explore was revisiting all these sites and migrating them off our paid hosting onto Cloudflare Pages, since XOXO LLC was officially closed with nobody to pay the bills.

Creating static builds of each site, either by recreating the development environment in Docker in the best case or crawling them, was like a time capsule of web dev tooling and trends between 2012 to 2024.

It was different almost every time, sometimes changing stacks in a single year: PHP/MySQL and no build tools at all in 2012, Gulp/Bower/SASS in 2014, Bourbon/Middleman in 2015, Jekyll and Rails in 2016, Node/Express and serverless computing in 2018, Gatsby in 2019, Eleventy in 2024…

To capture the MySQL-backed Rails app that we created for our 2016 schedule, I had to scrape the responses from every possible API query and store everything statically to recreate its dynamic category/year filtering and pagination. Ridiculous.

Some of my favorites from the archive:

* The original 2012 and 2013 schedule sites by Paulo are instantly nostalgic for me. It’s where it all started.
* The 2014 lineup site with colorful geometric illustrations by Jon Han.
* For our 2015 teaser and lineup sites, painter Brendan Monroe made beautiful illustrations in his stark black-and-white style, and then joined us to paint several murals in person at the festival.
* The 2015 schedule site by Scribble Tone cleverly plays with CSS blend modes. (Don’t miss the “Don’t Touch” easter egg in the bottom-left.)
* After a year hiatus, we hired four artists to paint a mural together on a 12-hour livestream for our 2018 teaser. (Click “Watch timelapse” to see it happen in seconds.)
* The 2018 lineup site made by Paulo using a vibrant original illustration from Shawna X.
* The 2019 lineup site by Friends of the Web, anchored by several floral illustrations from Cate Andrews.
* The dark/light mode clicker game hidden in our 2024 teaser, made by BRAIN’s Brian Moore and Mike Lacher.
* The circus-themed 2024 lineup site by Ashur and Emily Cabrera.

It was a big pain, but we felt it was an important part of the festival’s history and worth preserving.

## Wrapping XOXO

It took longer than we anticipated, but launching this site was the last thing on our XOXO to-do list. It feels weird to say goodbye to a project that was a part of our lives for so long.

The XOXO festival ran for eight years, but Andy and I ran the XOXO _community_ for over 12 years, as it grew from an annual festival to a year-round Slack community, local meetups, a 16,000-square foot workspace, an aborted funding platform, and many other experiments along the way.

I’m deeply thankful to everyone who was a part of it. The Credits page names some of the key people behind the festival, Slack community, and our web and design efforts. But there were so many more volunteers, patrons, and attendees — literally thousands of people — that made it feel unlike any other event I’ve been a part of.

This has been a very difficult year for me, filled with stress from a family crisis that upended my life and work for the last four months. It’s the reason I’ve largely been absent from posting here and on social media this year, but things are starting to look better.

For right now, it feels good to once again release something new into the world with my name attached to it.

I loved XOXO, which remains one of the most meaningful things I’ve ever worked on. I’m grateful to Andy McMillan for pushing for years to build this beautiful new archive that honors the work we did together.
