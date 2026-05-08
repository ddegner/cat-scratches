There's an app for nearly every imaginable user and use case these days, but one thing they all have in common is that they're centered around one device: the smartphone.

That changes today as Hugging Face, the 10-year-old New York City startup best known for being the go-to place online to host and use cutting-edge, open-source AI models, agents and applications, launches a new App Store for Reachy Mini, its low-cost ($299) open-source physical robot that debuted back in July 2025 (itself the fruit of Hugging Face's acquisition of another startup, Pollen Robotics).

The new Hugging Face Reachy Mini App Store already hosts a library of over 200 community-built applications, and Reachy Mini owners will be able to download any of these free of charge to start (unlike smartphone apps, there's no monetization option for app creators on this store — yet).

The Reachy Mini App Store will also offer Reachy Mini owners — around 10,000 units have been sold so far since last year — an easy means of building their own custom apps for the tiny, stationary desktop robot with built-in camera eyes, speaker, and microphone, via Hugging Face's existing, AI-powered agent called "ML Intern."

The significance lies not just in the hardware, but in the removal of the "roboticist" barrier; for the first time, individuals without a background in engineering or coding are shipping functional robotics software in under an hour.

"Anyone can build the apps," said Clément Delangue, CEO and co-founder of Hugging Face, in a video interview with VentureBeat. "My intuition is that more and more \[AI\] model builders will release on Reachy Mini as a way to test the robotics ability of new models."

## **Make robots as accessible to laypeople as PCs and smartphones**

The technical bottleneck in robotics has historically been the scarcity of high-quality training data.

While Large Language Models (LLMs) have mastered general-purpose coding by training on massive repositories like Microsoft's GitHub, the volume of code specific to robotics remains "tiny" by comparison (though Github does contain likely the largest existent, publicly accessible library of robotics code to date, with more than 17,000 different repositories or "repos" dedicated to the field).

This lack of data has meant that, until now, AI agents were relatively poor at understanding the physical abstractions and firmware requirements of hardware.

Hugging Face’s solution is an **agentic toolkit** that acts as an intermediary. Rather than forcing a user to learn a specific robotics SDK or master the nuances of a robot's firmware, the toolkit allows a user to describe a desired behavior in plain English—for instance, "wave when someone says good morning".

An AI agent then handles the heavy lifting: it writes the code, tests it against the robot's specific constraints, and ships the final package

"Historically, it’s been extremely hard," Delangue told VentureBeat of building robotics applications. "But we’ve worked really hard on the topic with a mix of open sourcing everything we do, working on the right abstractions for robotics, and making it easier for agents to understand and use it."

The platform is model-agnostic, supporting a wide range of leading intelligence engines. Users can build apps using Hugging Face’s own ML Intern agent or leverage external models including GPT-5.5, Claude Opus 4.6, Kimmy 2.6, Mini Max GM5, and Deep Sig V4 Pro.

For real-time interaction, the official conversation apps utilize OpenAI Realtime and Gemini Live. By providing these high-level abstractions, Hugging Face has collapsed the traditional "integration weeks" of robotics work into a process that takes minutes.

## **Low-cost Reachy Mini is a hit**

In order to take advantage of the new Hugging Face Reachy Mini App Store, users are encouraged to purchase **Reachy Mini**, a cute desktop robot Hugging Face launched back in July 2025 as an affordable, open-source alternative to the existing, commercially available robots from the likes of Boston Dynamics, whose infamous Spot robot dog retails for around $70,000. Even Chinese competitors start at $1,900+.

In contrast, the Reachy Mini is accessibly priced for hobbyists and developers. It comes in two variants:

* **Reachy Mini Lite ($299 plus shipping)**: A tethered version that connects via USB and uses an external computer for processing.
 
* **Reachy Mini Wireless ($449 plus shipping):** A standalone version featuring an on-board Raspberry Pi CM 4 and Wi-Fi connectivity.

Delangue said that of the 10,000 Reachy Mini units sold so far, 3,000 were sold in just the past two weeks. Hugging Face expects to ship another 1,000 units within the next 30 days.

Even those who don't own a Reachy Mini can still develop apps for it, however, using the Reachy Mini App Store and the Reachy App, which contains a 3D simulation of the robot and its responses.

The **App Store** itself is hosted on the Hugging Face Hub. It functions much like a standard software repository but for hardware behaviors:

* **Search and Install**: Users can find apps, click a button, and install them directly to their robot.
 
* **Forkability**: Every app is "forkable," meaning a user can duplicate an existing app and ask an AI agent to modify it (e.g., "make it answer in French").
 
* **Simulation Mode**: Crucially, the store includes a browser-based simulator. This allows users who do not own a physical Reachy Mini to build, test, and play with the catalog in a virtual environment.

Both are part of Hugging Face's ongoing "Le Robot" effort — a project that began in 2024 with Hugging Face researchers specializing in robotics and AI developing and publishing on the web their own open-source code, tutorials, and hardware to make robotics development more accessible to a wider audience.

And unlike Github, which is designed for a developer audience, the Hugging Face Reachy Mini App Store is designed for robot owners and users who may have no technical experience or training whatsoever.

## **Continuing with the open-source ethos and practice**

Hugging Face’s strategy is rooted in the belief that closed-source hardware and software are "almost impossible" to build for at scale.

Delangue notes that closed systems prevent the training of agents and limit the ability of the community to innovate. Consequently, the entire Reachy Mini platform is open-source.

This open licensing model has two primary implications for the ecosystem:

1. **Accelerated Development**: Because the code is public and integrated with the Hugging Face ecosystem via "Spaces," Hugging Face's feature for hosting AI-powered web apps launched in 2021, agents can more easily learn how to interact with the hardware.
 
2. **Community Sovereignty**: Apps are not locked behind a proprietary wall. Currently, all 200+ apps on the store are free, though the platform's foundation on "Spaces" provides the flexibility for creators to potentially monetize their work in the future.

"For the moment, all the apps are free," Delangue noted. "It’s flexible, it’s built on \[Hugging Face\] Spaces, so at some point maybe people are going to make them paid."

## **Robotics enters its accessible hobbyist era**

Hugging Face's Reachy Mini App Store is launching with 200 apps already available.

So who built them, and how did they do it without this platform existing prior?

Delangue told VentureBeat that more than **150 different creators** have contributed to the store, most of whom had never written a line of robotics code before.

Yet, they have been able to do so thanks to Hugging Face's ML Intern and Github. The new Hugging Face Reachy Mini App Store now puts the tools and existing apps into one place for easier accessibility.

Delangue was keen to highlight one of the early Reachy robotics app developers in particular to VentureBeat: Joel Cohen, a 78-year-old retired marketing executive.

Cohen, who is colorblind and has no technical background, spent two weeks assembling his Reachy Mini Lite (a task that usually takes three hours). Despite these physical challenges, he used an AI agent to build a "VP of Future Thinking" facilitator for his Zoom-based CEO peer groups. The app enables the robot to:

* Greet 29 members by name.
 
* Fact-check discussions in real-time.
 
* Summarize key themes and push back on surface-level answers.

"I built this by describing what I needed in plain English," Cohen stated in a press release provided to VentureBeat ahead of the launch. "No SDK. No robotics background. No developer experience".

Other community-driven applications include:

* **Emotional Damage Chess**: A robot that plays chess and mocks the user’s blunders.
 
* **Reachy Phone Home**: An anti-procrastination tool that detects when a user picks up their phone and tells them to get back to work.
 
* **Language Tutor**: A physical companion that listens to speech and corrects accents.
 
* **F1 Race Commentator**: A desk companion that calls Formula 1 races live as they happen.

Delangue himself related to VentureBeat that in only a few hours, he built an app for his own Reachy Mini robot at the Hugging Face Miami office to have the robot act as a receptionist.

“It basically does face recognition to detect when you arrive in the office, and then it looks at you and onboards you," Delangue related. "It says, ‘Hey, welcome to the office. Who are you here to see?’ Then it sends me a message: ‘Carl just arrived at the office. He’s here to meet you, and for these reasons.’ It works a little bit as my welcoming booth at the office, and it took me less than two hours to build that.”

Even for an experienced founder and developer as Delangue, building apps for a robot was out of the question until the combination of Reachy Mini and ML Intern.

“For me, it would have been impossible," the Hugging Face CEO said. "If you weren’t a robotics developer, it probably would have been impossible, or it would have taken a few months."

## **Democratizing robotics**

The launch of the agentic App Store signals a fundamental shift in how we interact with machines. For sixty years, the field was gated by the requirement for deep technical expertise.

By combining low-cost open hardware with the reasoning capabilities of modern AI agents, Hugging Face is moving toward a future where the hardware is a commodity and the behavior is limited only by what a user can describe.

As Delangue noted during the launch, the goal was to provide a platform for people who "want to get into robotics but don’t have the hardware or the skills".

With nearly 10,000 robots now "in the wild" and a burgeoning store of agent-written apps, the Reachy Mini has become the most widely deployed open-source desktop robot in history.

The question is no longer how to build a robot, but what—now that the gate is open—we will ask them to do.
