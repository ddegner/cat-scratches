**Listen to this **post**:**

Log in to listen

In the beginning was the mainframe.

In 1945 the U.S. government built ENIAC, an acronym for _E_lectronic _N_umerical _I_ntegrator _a_nd _C_omputer, to do ballistics trajectory calculations for the military; World War 2 was nearing its conclusion, however, so ENIAC’s first major job was to do calculations that undergirded the development of the hydrogen bomb. Six years later, J. Presper Eckert and John Mauchly, who led the development of ENIAC, launched UNIVAC, the Universal Automatic Computer, for broader government and commercial applications. Early use cases included calculating the U.S. census and assisting with calculation-intensive back office operations like payroll and bookkeeping.

These were hardly computers as we know them today, but rather calculation machines that took in reams of data (via punch cards or magnetic tape) and returned results according to hardwired calculation routines; the “operating system” were the humans actually inputting the data, scheduling jobs, and giving explicit hardware instructions. Originally this instruction also happened via punch cards and magnetic tape, but later models added consoles to both provide status and also allow for register-level control; these consoles evolved into terminals, but the first versions of these terminals, like the one that was available for the original version of the IBM System/360, were used to initiate batch programs.

Any recounting of computing history usually focuses on the bottom two levels of that stack — the device and the input method — because they tend to evolve in parallel. For example, here are the three major computing paradigms to date:

These aren’t perfect delineations; the first PCs had terminal-like interfaces, and pre-iPhone smartphones used windows-icons-menus-pointer (WIMP) interaction paradigms, with built-in keyboards and styluses. In the grand scheme of things, though, the distinction is pretty clear, and, by extension, it’s pretty easy to predict what is next:

Wearables is an admittedly broad category that includes everything from smart watches to earpieces to glasses, but I think it is a cogent one: the defining characteristic of all of these devices, particularly in contrast to the three previous paradigms, is the absence of a direct mechanical input mechanism; that leaves speech, gestures, and at the most primitive level, thought.

Fortunately there is good progress being made on on all of these fronts: the quality and speed of voice interaction has increased dramatically over the last few years; camera-intermediated gestures on the Oculus and Vision Pro work well, and Meta’s Orion wristband uses electromyography (EMG) to interpret gestures without any cameras at all. Neuralink is even more incredible: an implant in the brain captures thoughts directly and translates them into actions.

These paradigms, however, do not exist in isolation. First off, mainframes still exist, and I’m typing this Article on a PC, even if you may consume it on a phone or via a wearable like a set of AirPods. What stands out to me, however, is the top level of the initial stack I illustrated above: the application layer on one paradigm provides the bridge to the next one. This, more than anything, is why generative AI is a big deal in terms of realizing the future.

### Bridges to the Future

I mentioned the seminal IBM System/360 above, which was actually a family of mainframes; the first version was the Model 30, which, as I noted, did batch processing: you would load up a job using punch cards or magnetic tape and execute the job, just like you did with the ENIAC or UNIVAC. Two years later, however, IBM came out with the Model 67 and the TSS/360 operating system: now you could actually interact with a program via the terminal. This represented a new paradigm at the application layer:

It is, admittedly, a bit confusing to refer to this new paradigm at the application layer as Applications, but it is the most accurate nomenclature; what differentiated an application from a program was that while the latter was a pre-determined set of actions that ran as a job, the former could be interacted with and amended while running.

That new application layer, meanwhile, opened up the possibility for an entirely new industry to create those applications, which could run across the entire System/360 family of mainframes. New applications, in turn, drove demand for more convenient access to the computer itself. This ultimately led to the development of the personal computer (PC), which was an individual application platform:

Initial PCs operated from a terminal-like text interface, but truly exploded in popularity with the roll-out of the WIMP interface, which was invented by Xerox PARC, commercialized by Apple, and disseminated by Microsoft. The key point in terms of this Article, however, is that Applications came first: the concept created the bridge from mainframes to PCs.

PCs underwent their own transformation over their two decades of dominance, first in terms of speed and then in form factor, with the rise of laptops. The key innovation at the application layer, however, was the Internet:

The Internet differed from traditional applications by virtue of being available on every PC, facilitating communication between PCs, and by being agnostic to the actual device it was accessed on. This, in turn, provided the bridge to the next device paradigm, the smartphone, with its touch interface:

I’ve long noted that Microsoft did not miss mobile; their error was in trying to extend the PC paradigm to mobile. This not only led to a focus on the wrong interface (WIMP via stylus and built-in keyboard), but also an assumption that the application layer, which Windows dominated, would be a key differentiator.

Apple, famously, figured out the right interface for the smartphone, and built an entirely new operating system around touch. Yes, iOS is based on macOS at a low level, but it was a completely new operating system in a way that Windows Mobile was not; at the same time, because iOS was based on macOS, it was far more capable than smartphone-only alternatives like BlackBerry OS or PalmOS. The key aspect of this capability was that the iPhone could access the _real_ Internet.

What is funny is that Steve Jobs’ initial announcement of this capability was met with much less enthusiasm than the iPhone’s other two selling points of being a widescreen iPod and a mobile phone:

> Today, we’re introducing three revolutionary products of this class. The first one is a wide-screen iPod with touch controls. The second is a revolutionary mobile phone. The third is a breakthrough Internet communications device…These are not three separate devices, this is one device, and we are calling iPhone. Today, Apple is going to reinvent the phone.

I’ve watched that segment hundreds of times, and the audience’s confusion at “Internet communications device” cracks me up every time; in fact, that was the key factor in reinventing the phone, because it was the bridge that linked a device in your pocket to the world of computing writ large, via the Internet. Jobs listed the initial Internet features later on in the keynote:

> Now let’s take a look at an Internet communications device, part of the iPhone. What’s this all about? Well, we’ve got some real breakthroughs here: to start off with, we’ve got rich HTML email on iPhone. The first time, really rich email on a mobile device, and it works with any IMAP or POP email service. You’ve got your favorite mail service, it’ll likely work with it, and it’s rich text email. We wanted the best web browser on our phone, not a baby browser or a WAP browser, a real browser, and we picked the best one in the world: Safari, and we have Safari running on iPhone. It is the first fully-usable HTML browser on a phone. Third, we have Google Maps. Maps, satellite images, directions, and traffic. This is unbelievable, wait until you see it. We have Widgets, starting off with weather and stocks. And, this communicates with the Internet over Edge and Wifi, and iPhone automatically detects Wifi and switches seamless to it. You don’t have to manage the network, it just does the right thing.

Notice that the Internet is not just the web; in fact, while Apple wouldn’t launch a 3rd-party App Store until the following year, it did, with the initial iPhone, launch the app paradigm which, in contrast to standalone Applications from the PC days, assumed and depended on the Internet for functionality.

### The Generative AI Bridge

We already established above that the next paradigm is wearables. Wearables today, however, are very much in the pre-iPhone era. On one hand you have standalone platforms like Oculus, with its own operating system, app store, etc.; the best analogy is a video game console, which is technically a computer, but is not commonly thought of as such given its singular purpose. On the other hand, you have devices like smart watches, AirPods, and smart glasses, which are extensions of the phone; the analogy here is the iPod, which provided great functionality but was not a general computing device.

Now Apple might dispute this characterization in terms of the Vision Pro specifically, which not only has a PC-class M2 chip, along with its own visionOS operating system and apps, but can also run iPad apps. In truth, though, this makes the Vision Pro akin to Microsoft Mobile: yes, it is a capable device, but it is stuck in the wrong paradigm, i.e. the previous one that Apple dominated. Or, to put it another way, I don’t view “apps” as the bridge between mobile and wearables; apps are just the way we access the Internet on mobile, and the Internet was the old bridge, not the new one.

To think about the next bridge, it’s useful to jump forward to the future and work backwards; that jump forward is a lot easier to envision, for me anyways, thanks to my experience with Meta’s Orion AR glasses:

> They’re real and they’re spectacular. pic.twitter.com/hIJZuS6taY
> 
> — Ben Thompson (@benthompson) September 25, 2024

The most impressive aspect of Orion is the resolution, which is perfect. I’m referring, of course, to the fact that you can see the real world with your actual eyes; I wrote in an Update:

> The reality is that the only truly satisfactory answer to passthrough is to not need it at all. Orion has perfect field-of-view and infinite resolution because you’re looking at the real world; it’s also dramatically smaller and lighter. Moreover, this perfect fidelity actually gives more degrees of freedom in terms of delivering the AR experience: no matter how high resolution the display is, it will still be lower resolution than the world around it; I tried a version of Orion with double the resolution and, honestly, it wasn’t that different, because the magic was in having augmented reality at all, not in its resolution. I suspect the same thing applies to field of view: 70 degrees seemed massive on Orion, even though that is less than the Vision Pro’s 100 degrees, because the edge of the field of view for Orion was reality, whereas the edge for the Vision Pro is, well, nothing.

The current iteration of Orion’s software did have an Oculus-adjacent launch screen, and an Instagram prototype; it was, in my estimation, the least impressive part of the demonstration, for the same reason that I think the Vision Pro’s iPad app compatibility is a long-term limitation: it was simply taking the mobile paradigm and putting it in front of my face, and honestly, I’d rather just use my phone.

One of the most impressive demos, meanwhile, had the least UI: it was just a notification. I glanced up, saw that someone was calling me, touched my fingers together to “click” on the accept button that accompanied the notification, and was instantly talking to someone in another room while still being able to interact freely with the world around me. Of course phone calls aren’t some sort of new invention; what made the demo memorable was that I only got the UI I needed when I needed it.

This, I think, is the future: the exact UI you need — and nothing more — exactly when you need it, and at no time else. This specific example was, of course, programmed deterministically, but you can imagine a future where the glasses are smart enough to generate UI on the fly based on the context of not just your request, but also your broader surroundings and state.

This is where you start to see the bridge: what I am describing is an application of generative AI, specifically to on-demand UI interfaces. It’s also an application that you can imagine being useful on devices that already exist. A watch application, for example, would be much more usable if, instead of trying to navigate by touch like a small iPhone, it could simply show you the exact choices you need to make at a specific moment in time. Again, we get hints of that today through deterministic programming, but the ultimate application will be on-demand via generative AI.

Of course generative AI is also usable on the phone, and that is where I expect most of the exploration around generative UI to happen for now. We certainly see plenty of experimentation and rapid development of generative AI broadly, just as we saw plenty of experimentation and rapid development of the Internet on PCs. That experimentation and development was not just usable on the PC, but it also created the bridge to the smartphone; I think that generative AI is doing the same thing in terms of building a bridge to wearables that are not accessories, but general purpose computers in their own right:

This is exciting in the long-term, and bullish for Meta (and I’ve previously noted how generative AI is the key to the metaverse, as well). It’s also, clearly, well into the future. It also helps explain why Orion isn’t shipping today: it’s not just that the hardware isn’t yet in a production state, particularly from a cost perspective, but the entire application layer needs to be built out, first on today’s devices, enabling the same sort of smooth transition that the iPhone had. No, Apple didn’t have the App Store, but the iPhone was extraordinarily useful on day one, because it was an Internet Communicator.

### Survey Complete

Ten years ago I wrote a post entitled The State of Consumer Technology in 2014, where I explored some of the same paradigm-shifts I detailed in this Article. This was the illustration I made then:

There is a perspective in which 2024 has been a bit of a letdown in terms of generative AI; there hasn’t been a GPT-5 level model released; the more meaningful developments have been in the vastly increased efficiency and reduction in size of GPT-4 level models, and the inference-scaling possibilities of `o1`. Concerns are rising that we may have hit a data wall, and that there won’t be more intelligent AI without new fundamental breakthroughs in AI architecture.

I, however, feel quite optimistic. To me the story of 2024 has been filling in those question marks in that illustration. The product overhang from the generative AI capabilities we have today are absolutely massive: there are so many new things to be built, and completely new application layer paradigms are at the top of the list. That, by extension, is the bridge that will unlock entirely new paradigms of computing. The road to the future needs to be built; it’s exciting to have the sense that the surveying is now complete.
