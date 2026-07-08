* Rock star developer, News

When great thinkers think about problems, they start to see patterns. They look at the problem of people sending each other word-processor files, and then they look at the problem of people sending each other spreadsheets, and they realize that there’s a general pattern: sending files. That’s one level of abstraction already. Then they go up one more level: people _send_ files, but web browsers also “_send_” requests for web pages. And when you think about it, calling a method on an object is like sending a message to an object! It’s the same thing again! Those are all _sending_ operations, so our clever thinker invents a new, higher, broader abstraction called _messaging_, but now it’s getting _really_ vague and nobody really knows what they’re talking about any more. Blah.

When you go too far up, abstraction-wise, you run out of oxygen. Sometimes smart thinkers just don’t know when to stop, and they create these absurd, all-encompassing, high-level pictures of the universe that are all good and fine, but don’t actually mean anything at all. 

These are the people I call Architecture Astronauts. It’s very hard to get them to write code or design programs, because they won’t stop thinking about Architecture. They’re astronauts because they are above the oxygen level, I don’t know _how_ they’re breathing. They tend to work for really big companies that can afford to have lots of unproductive people with really advanced degrees that don’t contribute to the bottom line.

A recent example illustrates this. Your typical architecture astronaut will take a fact like “Napster is a peer-to-peer service for downloading music” and ignore everything but the architecture, thinking it’s interesting because it’s peer to peer, completely missing the point that it’s interesting because you can type the name of a song and listen to it _right away_.

All they’ll talk about is peer-to-peer this, that, and the other thing. Suddenly you have peer-to-peer conferences, peer-to-peer venture capital funds, and even peer-to-peer backlash with the imbecile business journalists dripping with glee as they copy each other’s stories: “Peer To Peer: Dead!”

The Architecture Astronauts will say things like: “Can you imagine a program like Napster where you can download _anything,_ not just songs?” Then they’ll build applications like Groove that they think are _more_ general than Napster, but which seem to have neglected that wee little feature that lets you type the name of a song and then listen to it — the feature we wanted in the first place. Talk about missing the point. If Napster _wasn’t_ peer-to-peer but it _did_ let you type the name of a song and then listen to it, it would have been just as popular.

Another common thing Architecture Astronauts like to do is invent some new architecture and claim it solves something. Java, XML, Soap, XmlRpc, Hailstorm, .NET, Jini, oh lord I can’t keep up. And that’s just in the last 12 months!

I’m not saying there’s anything wrong with these architectures… by no means. They are quite good architectures. What bugs me is the stupendous amount of millennial _hype_ that surrounds them. Remember the Microsoft Dot Net white paper? 

> The next generation of the Windows desktop platform, Windows.NET supports productivity, creativity, management, entertainment and much more, and is designed to put users in control of their digital lives.

That was about 9 months ago. Last month, we got Microsoft Hailstorm. That white paper says:

> People are not in control of the technology that surrounds them….HailStorm makes the technology in your life work together on your behalf and under your control.

Oh, good, so now the high tech halogen light in my apartment will stop blinking randomly.

Microsoft is not alone. Here’s a quote from a Sun Jini whitepaper:

> These three facts (you are the new sys admin, computers are nowhere, the one computer is everywhere) should combine to improve the world of using computers as computers — by making the boundaries of computers disappear, by making the computer be everywhere, and by making the details of working with the computer as simple as putting a DVD into your home theater system.

And don’t even _remind_ me of the fertilizer George Gilder spread about Java:

> A fundamental break in the history of technology…

That’s one sure tip-off to the fact that you’re being assaulted by an Architecture Astronaut: the incredible amount of bombast; the heroic, utopian grandiloquence; the boastfulness; the complete lack of reality. And people buy it! The business press goes wild!

Why the hell are people so impressed by boring architectures that often amount to nothing more than a new format on the wire for RPC, or a new virtual machine? These things might be good architectures, they will certainly benefit the developers that use them, but they are _not_, I repeat, _not_, a good substitute for the messiah riding his white ass into Jerusalem, or world peace. No, Microsoft, computers are _not_ suddenly going to start reading our minds and doing what we want automatically just because everyone in the world has to have a Passport account. No, Sun, we’re _not_ going to be able to analyze our corporate sales data “as simply as putting a DVD into your home theatre system.”

Remember that the architecture people are solving problems that they think they can solve, not problems which are _useful_ to solve. Soap + WSDL may be the Hot New Thing, but it doesn’t really let you do anything you couldn’t do before using other technologies — if you had a reason to. All that Distributed Services Nirvana the architecture astronauts are blathering about was promised to us in the past, if we used DCOM, or JavaBeans, or OSF DCE, or CORBA.

It’s nice that we can use XML now for the format on the wire. Whoopee. But that’s about as interesting to me as learning that my supermarket uses trucks to get things from the warehouse. Yawn. _Mangos_, that’s interesting. Tell me something new that I can do that I couldn’t do before, O Astronauts, or stay up there in space and don’t waste any more of my time.
