# Artificial intelligence

**Artificial intelligence** (**AI**) is the capability of computational systems to perform tasks typically associated with human intelligence, such as learning, reasoning, problem-solving, perception, and decision-making. It is a field of research in engineering, mathematics and computer science that develops and studies methods and software that enable machines to perceive their environment and use learning and intelligence to take actions that maximize their chances of achieving defined goals.\[1\]

High-profile applications of AI include advanced web search engines, chatbots, virtual assistants, autonomous vehicles, and play and analysis in strategy games (e.g., chess and Go). Since the 2020s, generative AI has become widely available to generate images, audio, and videos from text prompts.

The traditional goals of AI research include learning, reasoning, knowledge representation, planning, natural language processing, and perception, as well as support for robotics.\[a\] To reach these goals, AI researchers have used techniques including state space search and mathematical optimization, formal logic, artificial neural networks, and methods based on statistics, operations research, and economics.\[b\] AI also draws upon psychology, linguistics, philosophy, neuroscience, and other fields.\[2\] Some companies, such as OpenAI, Google DeepMind and Meta, aim to create artificial general intelligence (AGI) – AI that can complete virtually any cognitive task at least as well as a human.\[3\]

Artificial intelligence was founded as an academic discipline in 1956,\[4\] and the field went through multiple cycles of optimism throughout its history,\[5\]\[6\] followed by periods of disappointment and loss of funding, known as AI winters.\[7\]\[8\] Funding and interest increased substantially after 2012, when graphics processing units began being used to accelerate neural networks, and deep learning outperformed previous AI techniques.\[9\] This growth accelerated further after 2017 with the transformer architecture.\[10\] In the 2020s, an AI boom has coincided with advances in generative AI, which allowed for the creation and modification of media. In addition to AI safety and unintended consequences and harms from the use of AI, ethical concerns, AI's long-term effects, and potential existential risks have prompted discussions of AI regulation.

## Goals

The general problem of simulating (or creating) intelligence has been broken into subproblems. These consist of particular traits or capabilities that researchers expect an intelligent system to display. The traits described below have received the most attention and cover the scope of AI research.\[a\]

### Reasoning and problem-solving

Early researchers developed algorithms that imitated step-by-step reasoning that humans use when they solve puzzles or make logical deductions.\[11\] By the late 1980s and 1990s, methods were developed for dealing with uncertain or incomplete information, employing concepts from probability and economics.\[12\]

Many of these algorithms are insufficient for solving large reasoning problems because they experience a "combinatorial explosion": They become exponentially slower as the problems grow.\[13\] Even humans rarely use the step-by-step deduction that early AI research could model. They solve most of their problems using fast, intuitive judgments.\[14\] Accurate and efficient reasoning is an unsolved problem.

### Knowledge representation

Knowledge representation and knowledge engineering\[15\] allow AI programs to answer questions intelligently and make deductions about real-world facts. Formal knowledge representations are used in content-based indexing and retrieval,\[16\] scene interpretation,\[17\] clinical decision support,\[18\] knowledge discovery (mining "interesting" and actionable inferences from large databases),\[19\] and other areas.\[20\]

A knowledge base is a body of knowledge represented in a form that can be used by a program. An ontology is the set of objects, relations, concepts, and properties used by a particular domain of knowledge.\[21\] Knowledge bases need to represent things such as objects, properties, categories, and relations between objects;\[22\] situations, events, states, and time;\[23\] causes and effects;\[24\] knowledge about knowledge (what we know about what other people know);\[25\] default reasoning (things that humans assume are true until they are told differently and will remain true even when other facts are changing);\[26\] and many other aspects and domains of knowledge.

Among the most difficult problems in knowledge representation are the breadth of commonsense knowledge (the set of atomic facts that the average person knows is enormous);\[27\] and the sub-symbolic form of most commonsense knowledge (much of what people know is not represented as "facts" or "statements" that they could express verbally).\[14\] There is also the difficulty of knowledge acquisition, the problem of obtaining knowledge for AI applications.\[c\]

### Planning and decision-making

An "agent" is any entity (artificial or not) that perceives and takes actions in the world. A rational agent has goals or preferences and takes actions to make them happen.\[d\]\[30\] In automated planning, the agent has a specific goal.\[31\] In automated decision-making, the agent has preferences—there are some situations it would prefer to be in, and some situations it is trying to avoid. The decision-making agent assigns a number to each situation (called the "utility") that measures how much the agent prefers it. For each possible action, it can calculate the "expected utility": the utility of all possible outcomes of the action, weighted by the probability that the outcome will occur. It can then choose the action with the maximum expected utility.\[32\]

In classical planning, the agent knows exactly what the effect of any action will be.\[33\] In most real-world problems, however, the agent may not be certain about the situation they are in (it is "unknown" or "unobservable") and it may not know for certain what will happen after each possible action (it is not "deterministic"). It must choose an action by making a probabilistic guess and then reassess the situation to see if the action worked.\[34\]

Alongside thorough testing and improvement based on previous decisions, having an explanation for why the agent took certain decisions is a way to build trust, especially when the decisions have to be relied upon.\[35\]

In some problems, the agent's preferences may be uncertain, especially if there are other agents or humans involved. These can be learned (e.g., with inverse reinforcement learning), or the agent can seek information to improve its preferences.\[36\] Information value theory can be used to weigh the value of exploratory or experimental actions.\[37\] The space of possible future actions and situations is typically intractably large, so the agents must take actions and evaluate situations while being uncertain of what the outcome will be.

A Markov decision process has a transition model that describes the probability that a particular action will change the state in a particular way and a reward function that supplies the utility of each state and the cost of each action. A policy associates a decision with each possible state. The policy could be calculated (e.g., by iteration), be heuristic, or it can be learned.\[38\]

Game theory describes the rational behavior of multiple interacting agents and is used in AI programs that make decisions that involve other agents.\[39\]

### Learning

Machine learning is the study of programs that can improve their performance on a given task automatically.\[40\] It has been a part of AI from the beginning.\[e\]

There are several kinds of machine learning. Unsupervised learning analyzes a stream of data and finds patterns and makes predictions without any other guidance.\[43\] Supervised learning requires labeling the training data with the expected answers, and comes in two main varieties: classification (where the program must learn to predict what category the input belongs in) and regression (where the program must deduce a numeric function based on numeric input).\[44\]

In reinforcement learning, the agent is rewarded for good responses and punished for bad ones. The agent learns to choose responses that are classified as "good".\[45\] Transfer learning is when the knowledge gained from one problem is applied to a new problem.\[46\] Deep learning is a type of machine learning that runs inputs through biologically inspired artificial neural networks for all of these types of learning.\[47\]

Computational learning theory can assess learners by computational complexity, by sample complexity (how much data is required), or by other notions of optimization.\[48\]

### Natural language processing

Natural language processing (NLP) allows programs to read, write and communicate in human languages.\[49\] Specific problems include speech recognition, speech synthesis, machine translation, information extraction, information retrieval and question answering.\[50\]

Early work, based on Noam Chomsky's generative grammar and semantic networks, had difficulty with word-sense disambiguation\[f\] unless restricted to small domains called "micro-worlds" (due to the common sense knowledge problem\[27\]). Margaret Masterman believed that it was meaning and not grammar that was the key to understanding languages, and that thesauri and not dictionaries should be the basis of computational language structure.

Modern deep learning techniques for NLP include word embedding (representing words, typically as vectors encoding their meaning),\[51\] transformers (a deep learning architecture using an attention mechanism),\[52\] and others.\[53\] In 2019, generative pre-trained transformer (or "GPT") language models began to generate coherent text,\[54\]\[55\] and by 2023, these models were able to get human-level scores on the bar exam, SAT test, GRE test, and many other real-world applications.\[56\]

### Perception

Machine perception is the ability to use input from sensors (such as cameras, microphones, wireless signals, active lidar, sonar, radar, and tactile sensors) to deduce aspects of the world. Computer vision is the ability to analyze visual input.\[57\]

The field includes speech recognition,\[58\] image classification,\[59\] facial recognition, object recognition,\[60\] object tracking,\[61\] and robotic perception.\[62\]

### Social intelligence

Affective computing is a field that comprises systems that recognize, interpret, process, or simulate human feeling, emotion, and mood.\[64\] For example, some virtual assistants are programmed to speak conversationally or even to banter humorously; it makes them appear more sensitive to the emotional dynamics of human interaction, or to otherwise facilitate human–computer interaction.

However, this tends to give naïve users an unrealistic conception of the intelligence of existing computer agents.\[65\] Moderate successes related to affective computing include textual sentiment analysis and, more recently, multimodal sentiment analysis, wherein AI classifies the effects displayed by a videotaped subject.\[66\]

### General intelligence

A machine with artificial general intelligence would be able to solve a wide variety of problems with breadth and versatility similar to human intelligence.\[67\]

## Techniques

AI research uses a wide variety of techniques to accomplish the goals above.\[b\]

### Search and optimization

There are two different kinds of search used in AI: state space search and local search:

#### State space search

State space search searches through a tree of possible states to try to find a goal state.\[68\] For example, planning algorithms search through trees of goals and subgoals, attempting to find a path to a target goal, a process called means-ends analysis.\[69\]

Simple exhaustive searches\[70\] are rarely sufficient for most real-world problems: the search space (the number of places to search) quickly grows to astronomical numbers. The result is a search that is too slow or never completes.\[13\] "Heuristics" or "rules of thumb" can help prioritize choices that are more likely to reach a goal.\[71\]

Adversarial search is used for game-playing programs, such as chess or Go. It searches through a tree of possible moves and countermoves, looking for a winning position.\[72\]

#### Local search

Local search uses mathematical optimization to find a solution to a problem. It begins with some form of guess and refines it incrementally.\[73\]

Gradient descent is a type of local search that optimizes a set of numerical parameters by incrementally adjusting them to minimize a loss function. Variants of gradient descent are commonly used to train neural networks,\[74\] through the backpropagation algorithm.

Another type of local search is evolutionary computation, which aims to iteratively improve a set of candidate solutions by "mutating" and "recombining" them, selecting only the fittest to survive each generation.\[75\]

Distributed search processes can coordinate via swarm intelligence algorithms. Two popular swarm algorithms used in search are particle swarm optimization (inspired by bird flocking) and ant colony optimization (inspired by ant trails).\[76\]

### Logic

Formal logic is used for reasoning and knowledge representation.\[77\] Formal logic comes in two main forms: propositional logic (which operates on statements that are true or false and uses logical connectives such as "and", "or", "not" and "implies")\[78\] and predicate logic (which also operates on objects, predicates and relations and uses quantifiers such as "_Every_ _X_ is a _Y_" and "There are _some_ _X_s that are _Y_s").\[79\]

Deductive reasoning in logic is the process of proving a new statement (conclusion) from other statements that are given and assumed to be true (the premises).\[80\] Proofs can be structured as proof trees, in which nodes are labelled by sentences, and children nodes are connected to parent nodes by inference rules.

Given a problem and a set of premises, problem-solving reduces to searching for a proof tree whose root node is labelled by a solution of the problem and whose leaf nodes are labelled by premises or axioms. In the case of Horn clauses, problem-solving search can be performed by reasoning forwards from the premises or backwards from the problem.\[81\] In the more general case of the clausal form of first-order logic, resolution is a single, axiom-free rule of inference, in which a problem is solved by proving a contradiction from premises that include the negation of the problem to be solved.\[82\]

Inference in both Horn clause logic and first-order logic is undecidable, and therefore intractable. However, backward reasoning with Horn clauses, which underpins computation in the logic programming language Prolog, is Turing complete. Moreover, its efficiency is competitive with computation in other symbolic programming languages.\[83\]

Fuzzy logic assigns a "degree of truth" between 0 and 1. It can therefore handle propositions that are vague and partially true.\[84\]

Non-monotonic logics, including logic programming with negation as failure, are designed to handle default reasoning.\[26\] Other specialized versions of logic have been developed to describe many complex domains.

### Probabilistic methods for uncertain reasoning

Many problems in AI (including reasoning, planning, learning, perception, and robotics) require the agent to operate with incomplete or uncertain information. AI researchers have devised a number of tools to solve these problems using methods from probability theory and economics.\[85\] Precise mathematical tools have been developed that analyze how an agent can make choices and plan, using decision theory, decision analysis,\[86\] and information value theory.\[87\] These tools include models such as Markov decision processes,\[88\] dynamic decision networks,\[89\] game theory and mechanism design.\[90\]

Bayesian networks\[91\] are a tool that can be used for reasoning (using the Bayesian inference algorithm),\[g\]\[93\] learning (using the expectation–maximization algorithm),\[h\]\[95\] planning (using decision networks)\[96\] and perception (using dynamic Bayesian networks).\[89\]

Probabilistic algorithms can also be used for filtering, prediction, smoothing, and finding explanations for streams of data, thus helping perception systems analyze processes that occur over time (e.g., hidden Markov models or Kalman filters).\[89\]

### Classifiers and statistical learning methods

The simplest AI applications can be divided into two types: classifiers (e.g., "if shiny then diamond"), on one hand, and controllers (e.g., "if diamond then pick up"), on the other hand. Classifiers\[97\] are functions that use pattern matching to determine the closest match. They can be fine-tuned based on chosen examples using supervised learning. Each pattern (also called an "observation") is labeled with a certain predefined class. All the observations combined with their class labels are known as a data set. When a new observation is received, that observation is classified based on previous experience.\[44\]

There are many kinds of classifiers in use.\[98\] The decision tree is the simplest and most widely used symbolic machine learning algorithm.\[99\] K-nearest neighbor algorithm was the most widely used analogical AI until the mid-1990s, and Kernel methods such as the support vector machine (SVM) displaced k-nearest neighbor in the 1990s.\[100\] The naive Bayes classifier is reportedly the "most widely used learner"\[101\] at Google, due in part to its scalability.\[102\] Neural networks are also used as classifiers.\[103\]

### Artificial neural networks

An artificial neural network is based on a collection of nodes also known as artificial neurons, which loosely model the neurons in a biological brain. It is trained to recognise patterns; once trained, it can recognise those patterns in fresh data. There is an input, at least one hidden layer of nodes and an output. Each node applies a function and once the weight crosses its specified threshold, the data is transmitted to the next layer. A network is typically called a deep neural network if it has at least 2 hidden layers.\[103\]

Learning algorithms for neural networks use local search to choose the weights that will get the right output for each input during training. The most common training technique is the backpropagation algorithm.\[104\] Neural networks learn to model complex relationships between inputs and outputs and find patterns in data. In theory, a neural network can learn any function.\[105\]

In feedforward neural networks the signal passes in only one direction.\[106\] The term perceptron typically refers to a single-layer neural network.\[107\] In contrast, deep learning uses many layers.\[108\] Recurrent neural networks (RNNs) feed the output signal back into the input, which allows short-term memories of previous input events. Long short-term memory networks (LSTMs) are recurrent neural networks that better preserve longterm dependencies and are less sensitive to the vanishing gradient problem.\[109\] Convolutional neural networks (CNNs) use layers of kernels to more efficiently process local patterns. This local processing is especially important in image processing, where the early CNN layers typically identify simple local patterns such as edges and curves, with subsequent layers detecting more complex patterns like textures, and eventually whole objects.\[110\]

### Deep learning

Deep learning uses several layers of neurons between the network's inputs and outputs.\[108\] The multiple layers can progressively extract higher-level features from the raw input. For example, in image processing, lower layers may identify edges, while higher layers may identify the concepts relevant to a human such as digits, letters, or faces.\[112\]

Deep learning has profoundly improved the performance of programs in many important subfields of artificial intelligence, including computer vision, speech recognition, natural language processing, image classification,\[113\] and others. The reason that deep learning performs so well in so many applications is not known as of 2021.\[114\] The sudden success of deep learning in 2012–2015 did not occur because of some new discovery or theoretical breakthrough (deep neural networks and backpropagation had been described by many people, as far back as the 1950s)\[i\] but because of two factors: the incredible increase in computer power (including the hundred-fold increase in speed by switching to GPUs) and the availability of vast amounts of training data, especially the giant curated datasets used for benchmark testing, such as ImageNet.\[j\]

### GPT

Generative pre-trained transformers (GPT) are large language models (LLMs) that generate text based on the semantic relationships between words in sentences. Text-based GPT models are pre-trained on a large corpus of text that can be from the Internet. The pretraining consists of predicting the next token (a token being usually a word, subword, or punctuation). Throughout this pretraining, GPT models accumulate knowledge about the world and can then generate human-like text by repeatedly predicting the next token. Typically, a subsequent training phase makes the model more truthful, useful, and harmless, usually with a technique called reinforcement learning from human feedback (RLHF). Current GPT models are prone to generating falsehoods called "hallucinations". These can be reduced with RLHF and quality data, but the problem has been getting worse for reasoning systems.\[122\] Such systems are used in chatbots, which allow people to ask a question or request a task in simple text.\[123\]\[124\]

Current models and services include ChatGPT, Claude, Gemini, Copilot, and Meta AI.\[125\] Multimodal GPT models can process different types of data (modalities) such as images, videos, sound, and text.\[126\]

### Hardware and software

Main articles: Programming languages for artificial intelligence and Hardware for artificial intelligence

In the late 2010s, graphics processing units (GPUs) that were increasingly designed with AI-specific enhancements and used with specialized TensorFlow software had replaced previously used central processing unit (CPUs) as the dominant means for large-scale (commercial and academic) machine learning models' training.\[127\] Specialized programming languages such as Prolog were used in early AI research,\[128\] but general-purpose programming languages like Python have become predominant.\[129\]

The transistor density in integrated circuits has been observed to roughly double every 18 months—a trend known as Moore's law, named after the Intel co-founder Gordon Moore, who first identified it. Improvements in GPUs have been even faster,\[130\] a trend sometimes called Huang's law,\[131\] named after Nvidia co-founder and CEO Jensen Huang.

## Applications

Main article: Applications of artificial intelligence

AI and machine learning technology is used in most of the essential applications of the 2020s, including:

* search engines (such as Google Search)
* targeting online advertisements
* recommendation systems (offered by Netflix, YouTube or Amazon) driving internet traffic
* targeted advertising (AdSense, Facebook)
* virtual assistants (such as Siri or Alexa)
* autonomous vehicles (including drones, ADAS and self-driving cars)
* automatic language translation (Microsoft Translator, Google Translate)
* facial recognition (Apple's FaceID or Microsoft's DeepFace and Google's FaceNet)
* image labeling (used by Facebook, Apple's Photos and TikTok).

The deployment of AI may be overseen by a chief automation officer (CAO).

### Health and medicine

Main article: Artificial intelligence in healthcare

It has been suggested that AI can overcome discrepancies in funding allocated to different fields of research.\[132\]

AlphaFold 2 (2021) demonstrated the ability to approximate, in hours rather than months, the 3D structure of a protein.\[133\] In 2023, it was reported that AI-guided drug discovery helped find a class of antibiotics capable of killing two different types of drug-resistant bacteria.\[134\] In 2024, researchers used machine learning to accelerate the search for Parkinson's disease drug treatments. Their aim was to identify compounds that block the clumping, or aggregation, of alpha-synuclein (the protein that characterises Parkinson's disease). They were able to speed up the initial screening process ten-fold and reduce the cost by a thousand-fold.\[135\]\[136\]

### Gaming

Main article: Artificial intelligence in video games

Game playing programs have been used since the 1950s to demonstrate and test AI's most advanced techniques.\[137\] Deep Blue became the first computer chess-playing system to beat a reigning world chess champion, Garry Kasparov, on 11 May 1997.\[138\] In 2011, in a _Jeopardy!_ quiz show exhibition match, IBM's question answering system, Watson, defeated the two greatest _Jeopardy!_ champions, Brad Rutter and Ken Jennings, by a significant margin.\[139\] In March 2016, AlphaGo won 4 out of 5 games of Go in a match with Go champion Lee Sedol, becoming the first computer Go\-playing system to beat a professional Go player without handicaps. Then, in 2017, it defeated Ke Jie, who was the best Go player in the world.\[140\] Other programs handle imperfect-information games, such as the poker\-playing program Pluribus.\[141\] DeepMind developed increasingly generalistic reinforcement learning models, such as with MuZero, which could be trained to play chess, Go, or Atari games.\[142\] In 2019, DeepMind's AlphaStar achieved grandmaster level in StarCraft II, a particularly challenging real-time strategy game that involves incomplete knowledge of what happens on the map.\[143\] In 2021, an AI agent competed in a PlayStation Gran Turismo competition, winning against four of the world's best Gran Turismo drivers using deep reinforcement learning.\[144\] In 2024, Google DeepMind introduced SIMA, a type of AI capable of autonomously playing nine previously unseen open-world video games by observing screen output, as well as executing short, specific tasks in response to natural language instructions.\[145\]

### Mathematics

In mathematics, probabilistic large language models are versatile, but can also produce wrong answers in the form of hallucinations. The Alibaba Group developed a version of its _Qwen_ models called _Qwen2-Math_, that achieved state-of-the-art performance on several mathematical benchmarks, including 84% accuracy on the MATH dataset of competition mathematics problems.\[146\] In January 2025, Microsoft proposed the technique _rStar-Math_ that leverages Monte Carlo tree search and step-by-step reasoning, enabling a relatively small language model like _Qwen-7B_ to solve 53% of the AIME 2024 and 90% of the MATH benchmark problems.\[147\] Google DeepMind has developed models for solving mathematical problems: _AlphaTensor_, _AlphaGeometry_, _AlphaProof_ and _AlphaEvolve._\[148\]\[149\]

When natural language is used to describe mathematical problems, converters can transform such prompts into a formal language such as Lean to define mathematical tasks. The experimental model _Gemini Deep Think_ accepts natural language prompts directly and achieved gold medal results in the International Math Olympiad of 2025.\[150\]

Topological deep learning integrates various topological approaches.

### Finance

According to Nicolas Firzli, director of the World Pensions & Investments Forum, it may be too early to see the emergence of highly innovative AI-informed financial products and services. He argues that "the deployment of AI tools will simply further automatise things: destroying tens of thousands of jobs in banking, financial planning, and pension advice in the process, but I'm not sure it will unleash a new wave of \[e.g., sophisticated\] pension innovation."\[151\]

### Military

Main article: Military applications of artificial intelligence

Various countries are deploying AI military applications.\[152\] The main applications enhance command and control, communications, sensors, integration and interoperability.\[153\] Research is targeting intelligence collection and analysis, logistics, cyber operations, information operations, and semiautonomous and autonomous vehicles.\[152\] AI technologies enable coordination of sensors and effectors, threat detection and identification, marking of enemy positions, target acquisition, coordination and deconfliction of distributed Joint Fires between networked combat vehicles, both human-operated and autonomous.\[153\]

AI has been used in military operations in Iraq, Syria, Israel and Ukraine.\[152\]\[154\]\[155\]\[156\]

### Generative AI

These paragraphs are an excerpt from Generative AI.\[edit\]

Generative artificial intelligence, also known as generative AI or GenAI, is a subfield of artificial intelligence that uses generative models to generate text, images, videos, audio, software code or other forms of data.\[157\] These models learn the underlying patterns and structures of their training data, and use them to generate new data\[158\] in response to input, which often takes the form of natural language _prompts_.\[159\]\[160\]

The prevalence of generative AI tools has increased significantly since the AI boom in the 2020s. This boom was made possible by improvements in deep neural networks, particularly large language models (LLMs), which are based on the transformer architecture. Generative AI applications include chatbots such as ChatGPT, Claude, Copilot, DeepSeek, Google Gemini and Grok; text-to-image models such as Stable Diffusion, Flux, Midjourney, and DALL-E; and text-to-video models such as Veo, LTX and Sora.\[161\]\[162\]\[163\]

Companies in a variety of sectors have used generative AI, including those in software development, healthcare,\[164\] finance,\[165\] entertainment,\[166\] customer service,\[167\] sales and marketing,\[168\] art, writing,\[169\] and product design.\[170\]

### Agents

Main article: Agentic AI

AI agents are software entities designed to perceive their environment, make decisions, and take actions autonomously to achieve specific goals. These agents can interact with users, their environment, or other agents. AI agents are used in various applications, including virtual assistants, chatbots, autonomous vehicles, game-playing systems, and industrial robotics. AI agents operate within the constraints of their programming, available computational resources, and hardware limitations. This means they are restricted to performing tasks within their defined scope and have finite memory and processing capabilities. In real-world applications, AI agents often face time constraints for decision-making and action execution. Many AI agents incorporate learning algorithms, enabling them to improve their performance over time through experience or training. Using machine learning, AI agents can adapt to new situations and optimise their behaviour for their designated tasks.\[171\]\[172\]\[173\]

### Web search

Microsoft introduced Copilot Search in February 2023 under the name Bing Chat. Copilot Search provides AI-generated summaries.\[174\]

Google introduced an AI Mode at its Google I/O event on 20 May 2025.\[175\]

### Sexuality

Applications of AI in this domain include AI-enabled menstruation and fertility trackers that analyze user data to offer predictions,\[176\] AI-integrated sex toys (e.g., teledildonics),\[177\] AI-generated sexual education content,\[178\] and AI agents that simulate sexual and romantic partners (e.g., Replika).\[179\] AI is also used for the production of non-consensual deepfake pornography, raising significant ethical and legal concerns.\[180\]

AI technologies have also been used to attempt to identify online gender-based violence and online sexual grooming of minors.\[181\]\[182\]

### Other industry-specific tasks

In a 2017 survey, one in five companies reported having incorporated "AI" in some offerings or processes.\[183\]

In the field of evacuation and disaster management, AI has been used to investigate patterns in large-scale and small-scale evacuations using historical data from GPS, videos or social media.\[184\]\[185\]\[186\]

During the 2024 Indian elections, US$50 million was spent on authorized AI-generated content, notably by creating deepfakes of allied (including sometimes deceased) politicians to better engage with voters, and by translating speeches to various local languages.\[187\]

## Ethics

Main article: Ethics of artificial intelligence

AI has potential benefits and potential risks.\[190\] AI may be able to advance science and find solutions for serious problems: Demis Hassabis of DeepMind hopes to "solve intelligence, and then use that to solve everything else".\[191\] However, as the use of AI has become widespread, several unintended consequences and risks have been identified.\[192\]\[193\] In-production systems can sometimes not factor ethics and bias into their AI training processes, especially when the AI algorithms are inherently unexplainable in deep learning.\[194\]

### Risks and harm

#### Privacy and copyright

Further information: Information privacy and Artificial intelligence and copyright

Machine learning algorithms require large amounts of data. The techniques used to acquire this data have raised concerns about privacy, surveillance and copyright.

AI-powered devices and services, such as virtual assistants and IoT products, continuously collect personal information, raising concerns about intrusive data gathering and unauthorized access by third parties. The loss of privacy is further exacerbated by AI's ability to process and combine vast amounts of data, potentially leading to a surveillance society where individual activities are constantly monitored and analyzed without adequate safeguards or transparency.

Sensitive user data collected may include online activity records, geolocation data, video, or audio.\[195\] For example, in order to build speech recognition algorithms, Amazon has recorded millions of private conversations and allowed temporary workers to listen to and transcribe some of them.\[196\] Opinions about this widespread surveillance range from those who see it as a necessary evil to those for whom it is clearly unethical and a violation of the right to privacy.\[197\]

AI developers argue that this is the only way to deliver valuable applications and have developed several techniques that attempt to preserve privacy while still obtaining the data, such as data aggregation, de-identification and differential privacy.\[198\] Since 2016, some privacy experts, such as Cynthia Dwork, have begun to view privacy in terms of fairness. Brian Christian wrote that experts have pivoted "from the question of 'what they know' to the question of 'what they're doing with it'."\[199\]

Generative AI is often trained on unlicensed copyrighted works, including in domains such as images or computer code; the output is then used under the rationale of "fair use". Experts disagree about how well and under what circumstances this rationale will hold up in courts of law; relevant factors may include "the purpose and character of the use of the copyrighted work" and "the effect upon the potential market for the copyrighted work".\[200\]\[201\] Website owners can indicate that they do not want their content scraped via a "robots.txt" file.\[202\] However, some companies will scrape content regardless\[203\]\[204\] because the robots.txt file has no real authority. In 2023, leading authors (including John Grisham and Jonathan Franzen) sued AI companies for using their work to train generative AI.\[205\]\[206\] Another discussed approach is to envision a separate _sui generis_ system of protection for creations generated by AI to ensure fair attribution and compensation for human authors.\[207\]

#### Dominance by tech giants

The commercial AI scene is dominated by Big Tech companies such as Alphabet Inc., Amazon, Apple Inc., Meta Platforms, and Microsoft.\[208\]\[209\]\[210\] Some of these players already own the vast majority of existing cloud infrastructure and computing power from data centers, allowing them to entrench further in the marketplace.\[211\]\[212\]

#### Power needs and environmental impacts

See also: Environmental impacts of artificial intelligence

Technology companies have built electricity and artificial intelligence infrastructure to facilitate the AI boom of the 2020s. A 2025 report from the consulting firm McKinsey & Company estimated that by 2030, $2.7 trillion would be invested into AI infrastructure and data centers in the US, surpassing World War II's Manhattan Project every month.\[214\]

In January 2024, the International Energy Agency (IEA) released _Electricity 2024, Analysis and Forecast to 2026_.\[215\] This is the first IEA report to make projections for data centers and power consumption by AI and cryptocurrency. The report states that power demand for these uses might double by 2026, with the additional power consumption equaling that of Japan.\[216\]

Power consumption by AI is responsible for an increase in fossil fuel use, and has delayed closings of obsolete, carbon-emitting coal energy facilities. A ChatGPT search involves the use of 10 times the electrical energy as a Google search.\[217\]

A 2024 Goldman Sachs Research Paper, _AI Data Centers and the Coming US Power Demand Surge_, found "US power demand (is) likely to experience growth not seen in a generation...." and forecasts that, by 2030, US data centers will consume 8% of US power, as opposed to 3% in 2022, presaging growth for the electrical power generation industry by a variety of means.\[218\] Data centers' need for more and more electrical power is such that they might max out the electrical grid. The Big Tech companies counter that AI can be used to maximize the utilization of the grid by all.\[219\]

In 2024, the _Wall Street Journal_ reported that big AI companies have begun negotiations with the US nuclear power providers to provide electricity to the data centers. In March 2024 Amazon purchased a Pennsylvania nuclear-powered data center for US$650 million.\[220\]

In September 2024, Microsoft announced an agreement with Constellation Energy to re-open the Three Mile Island nuclear power plant to provide Microsoft with 100% of all electric power produced by the plant for 20 years. Reopening the plant, which suffered a partial nuclear meltdown of its Unit 2 reactor in 1979, will require Constellation to get through strict regulatory processes which will include extensive safety scrutiny from the US Nuclear Regulatory Commission. If approved (this will be the first ever US re-commissioning of a nuclear plant), over 835 megawatts of power – enough for 800,000 homes – of energy will be produced. The cost for re-opening and upgrading is estimated at US$1.6 billion and is dependent on tax breaks for nuclear power contained in the 2022 US Inflation Reduction Act.\[221\] As of 2024, the US government and the state of Michigan have been investing almost US$2 billion to reopen the Palisades Nuclear reactor on Lake Michigan. Closed since 2022, the plant was planned to be reopened in October 2025.\[222\]

After the last approval in September 2023, Taiwan suspended the approval of data centers north of Taoyuan with a capacity of more than 5 MW in 2024, due to power supply shortages.\[223\] Taiwan aims to phase out nuclear power by 2025.\[223\]

Singapore imposed a ban on the opening of data centers in 2019 due to electric power, but in 2022, lifted this ban.\[223\]

Although most nuclear plants in Japan have been shut down after the 2011 Fukushima nuclear accident, according to an October 2024 _Bloomberg_ article in Japanese, cloud gaming services company Ubitus, in which Nvidia has a stake, is looking for land in Japan near a nuclear power plant for a new data center for generative AI.\[224\]

On 1 November 2024, the Federal Energy Regulatory Commission (FERC) rejected an application submitted by Talen Energy for approval to supply some electricity from the nuclear power station Susquehanna to Amazon's data center.\[225\] According to the Commission Chairman Willie L. Phillips, it is a burden on the electricity grid as well as a significant cost shifting concern to households and other business sectors.\[225\]

In 2025, a report prepared by the IEA estimated the greenhouse gas emissions from the energy consumption of AI at 180 million tons. By 2035, these emissions could rise to 300–500 million tonnes depending on what measures will be taken. This is below 1.5% of the energy sector emissions. The emissions reduction potential of AI was estimated at 5% of the energy sector emissions, but rebound effects (for example if people switch from public transport to autonomous cars) can reduce it.\[226\]

#### Misinformation

See also: Content moderation

YouTube, Facebook and others use recommender systems to guide users to more content. These AI programs were given the goal of maximizing user engagement (that is, the only goal was to keep people watching). The AI learned that users tended to choose misinformation, conspiracy theories, and extreme partisan content, and, to keep them watching, the AI recommended more of it. Users also tended to watch more content on the same subject, so the AI led people into filter bubbles where they received multiple versions of the same misinformation.\[227\] This convinced many users that the misinformation was true, and ultimately undermined trust in institutions, the media and the government.\[228\] The AI program had correctly learned to maximize its goal, but the result was harmful to society. After the U.S. election in 2016, major technology companies took some steps to mitigate the problem.\[229\]

In the early 2020s, generative AI began to create images, audio, and texts that are virtually indistinguishable from real photographs, recordings, or human writing,\[230\] while realistic AI-generated videos became feasible in the mid-2020s.\[231\]\[232\]\[233\] It is possible for bad actors to use this technology to create massive amounts of misinformation or propaganda;\[234\] one such potential malicious use is deepfakes for computational propaganda.\[235\] AI pioneer and Nobel Prize-winning computer scientist Geoffrey Hinton expressed concern about AI enabling "authoritarian leaders to manipulate their electorates" on a large scale, among other risks.\[236\] The ability to influence electorates has been proved in at least one study. This same study shows more inaccurate statements from the models when they advocate for candidates of the political right.\[237\]

AI researchers at Microsoft, OpenAI, universities and other organisations have suggested using "personhood credentials" as a way to overcome online deception enabled by AI models.\[238\]

#### Algorithmic bias and fairness

Main articles: Algorithmic bias and Fairness (machine learning)

Machine learning applications can be biased\[k\] if they learn from biased data.\[240\] The developers may not be aware that the bias exists.\[241\] Discriminatory behavior by some LLMs can be observed in their output.\[242\] Bias can be introduced by the way training data is selected and by the way a model is deployed.\[243\]\[240\] If a biased algorithm is used to make decisions that can seriously harm people (as it can in medicine, finance, recruitment, housing or policing) then the algorithm may cause discrimination.\[244\] The field of fairness studies how to prevent harms from algorithmic biases.

On 28 June 2015, Google Photos's new image labeling feature mistakenly identified Jacky Alcine and a friend as "gorillas" because they were black. The system was trained on a dataset that contained very few images of black people,\[245\] a problem called "sample size disparity".\[246\] Google "fixed" this problem by preventing the system from labelling _anything_ as a "gorilla". Eight years later, in 2023, Google Photos still could not identify a gorilla, and neither could similar products from Apple, Facebook, Microsoft and Amazon.\[247\]

COMPAS is a commercial program widely used by U.S. courts to assess the likelihood of a defendant becoming a recidivist. In 2016, Julia Angwin at ProPublica discovered that COMPAS exhibited racial bias, despite the fact that the program was not told the races of the defendants. Although the error rate for both whites and blacks was calibrated equal at exactly 61%, the errors for each race were different—the system consistently overestimated the chance that a black person would re-offend and would underestimate the chance that a white person would not re-offend.\[248\] In 2017, several researchers\[l\] showed that it was mathematically impossible for COMPAS to accommodate all possible measures of fairness when the base rates of re-offense were different for whites and blacks in the data.\[250\]

A program can make biased decisions even if the data does not explicitly mention a problematic feature (such as "race" or "gender"). The feature will correlate with other features (like "address", "shopping history" or "first name"), and the program will make the same decisions based on these features as it would on "race" or "gender".\[251\] Moritz Hardt said "the most robust fact in this research area is that fairness through blindness doesn't work."\[252\]

Criticism of COMPAS highlighted that machine learning models are designed to make "predictions" that are only valid if we assume that the future will resemble the past. If they are trained on data that includes the results of racist decisions in the past, machine learning models must predict that racist decisions will be made in the future. If an application then uses these predictions as _recommendations_, some of these "recommendations" will likely be racist.\[253\] Thus, machine learning is not well suited to help make decisions in areas where there is hope that the future will be _better_ than the past. It is descriptive rather than prescriptive.\[m\]

Bias and unfairness may go undetected because the developers are overwhelmingly white and male: among AI engineers, about 4% are black and 20% are women.\[246\]

There are various conflicting definitions and mathematical models of fairness. These notions depend on ethical assumptions, and are influenced by beliefs about society. One broad category is distributive fairness, which focuses on the outcomes, often identifying groups and seeking to compensate for statistical disparities. Representational fairness tries to ensure that AI systems do not reinforce negative stereotypes or render certain groups invisible. Procedural fairness focuses on the decision process rather than the outcome. The most relevant notions of fairness may depend on the context, notably the type of AI application and the stakeholders. The subjectivity in the notions of bias and fairness makes it difficult for companies to operationalize them. Having access to sensitive attributes such as race or gender is also considered by many AI ethicists to be necessary in order to compensate for biases, but it may conflict with anti-discrimination laws.\[239\]

At the 2022 ACM Conference on Fairness, Accountability, and Transparency a paper reported that a CLIP‑based (Contrastive Language-Image Pre-training) robotic system reproduced harmful gender‑ and race‑linked stereotypes in a simulated manipulation task. The authors recommended robot‑learning methods which physically manifest such harms be "paused, reworked, or even wound down when appropriate, until outcomes can be proven safe, effective, and just."\[255\]\[256\]\[257\]

#### Lack of transparency

See also: Explainable AI, Algorithmic transparency, and Right to explanation

Many AI systems are so complex that their designers cannot explain how they reach their decisions.\[258\] Particularly with deep neural networks, in which there are many non-linear relationships between inputs and outputs. But some popular explainability techniques exist.\[259\]

It is impossible to be certain that a program is operating correctly if no one knows how exactly it works. There have been many cases where a machine learning program passed rigorous tests, but nevertheless learned something different than what the programmers intended. For example, a system that could identify skin diseases better than medical professionals was found to actually have a strong tendency to classify images with a ruler as "cancerous", because pictures of malignancies typically include a ruler to show the scale.\[260\] Another machine learning system designed to help effectively allocate medical resources was found to classify patients with asthma as being at "low risk" of dying from pneumonia. Having asthma is actually a severe risk factor, but since the patients having asthma would usually get much more medical care, they were relatively unlikely to die according to the training data. The correlation between asthma and low risk of dying from pneumonia was real, but misleading.\[261\]

People who have been harmed by an algorithm's decision have a right to an explanation.\[262\] Doctors, for example, are expected to clearly and completely explain to their colleagues the reasoning behind any decision they make. Early drafts of the European Union's General Data Protection Regulation in 2016 included an explicit statement that this right exists.\[n\] Industry experts noted that this is an unsolved problem with no solution in sight. Regulators argued that nevertheless the harm is real: if the problem has no solution, the tools should not be used.\[263\]

DARPA established the XAI ("Explainable Artificial Intelligence") program in 2014 to try to solve these problems.\[264\]

Several approaches aim to address the transparency problem. SHAP enables to visualise the contribution of each feature to the output.\[265\] LIME can locally approximate a model's outputs with a simpler, interpretable model.\[266\] Multitask learning provides a large number of outputs in addition to the target classification. These other outputs can help developers deduce what the network has learned.\[267\] Deconvolution, DeepDream and other generative methods can allow developers to see what different layers of a deep network for computer vision have learned, and produce output that can suggest what the network is learning.\[268\] For generative pre-trained transformers, Anthropic developed a technique based on dictionary learning that associates patterns of neuron activations with human-understandable concepts.\[269\]

#### Bad actors and weaponized AI

Main articles: Lethal autonomous weapon, Artificial intelligence arms race, and AI safety

Artificial intelligence provides a number of tools that are useful to bad actors, such as authoritarian governments, terrorists, criminals or rogue states.

A lethal autonomous weapon is a machine that locates, selects and engages human targets without human supervision.\[o\] Widely available AI tools can be used by bad actors to develop inexpensive autonomous weapons and, if produced at scale, they are potentially weapons of mass destruction.\[271\] Even when used in conventional warfare, they currently cannot reliably choose targets and could potentially kill an innocent person.\[271\] In 2014, 30 nations (including China) supported a ban on autonomous weapons under the United Nations' Convention on Certain Conventional Weapons, however the United States and others disagreed.\[272\] By 2015, over fifty countries were reported to be researching battlefield robots.\[273\]

AI tools make it easier for authoritarian governments to efficiently control their citizens in several ways. Face and voice recognition allow widespread surveillance. Machine learning, operating this data, can classify potential enemies of the state and prevent them from hiding. Recommendation systems can precisely target propaganda and misinformation for maximum effect. Deepfakes and generative AI aid in producing misinformation. Advanced AI can make authoritarian centralized decision-making more competitive than liberal and decentralized systems such as markets. It lowers the cost and difficulty of digital warfare and advanced spyware.\[274\] All these technologies have been available since 2020 or earlier—AI facial recognition systems are already being used for mass surveillance in China.\[275\]\[276\]

There are many other ways in which AI is expected to help bad actors, some of which can not be foreseen. For example, machine-learning AI is able to design tens of thousands of toxic molecules in a matter of hours.\[277\]

#### Technological unemployment

Main articles: Workplace impact of artificial intelligence and Technological unemployment

Economists have frequently highlighted the risks of redundancies from AI, and speculated about unemployment if there is no adequate social policy for full employment.\[278\]

In the past, technology has tended to increase rather than reduce total employment, but economists acknowledge that "we're in uncharted territory" with AI.\[279\] A survey of economists showed disagreement about whether the increasing use of robots and AI will cause a substantial increase in long-term unemployment, but they generally agree that it could be a net benefit if productivity gains are redistributed.\[280\] Risk estimates vary; for example, in the 2010s, Michael Osborne and Carl Benedikt Frey estimated 47% of U.S. jobs are at "high risk" of potential automation, while an OECD report classified only 9% of U.S. jobs as "high risk".\[p\]\[282\] The methodology of speculating about future employment levels has been criticised as lacking evidential foundation, and for implying that technology, rather than social policy, creates unemployment, as opposed to redundancies.\[278\] In April 2023, it was reported that 70% of the jobs for Chinese video game illustrators had been eliminated by generative artificial intelligence.\[283\]\[284\] Early-career workers showed decreasing employment rates in some AI-exposed occupations.\[285\]

Unlike previous waves of automation, many middle-class jobs may be eliminated by artificial intelligence; _The Economist_ stated in 2015 that "the worry that AI could do to white-collar jobs what steam power did to blue-collar ones during the Industrial Revolution" is "worth taking seriously".\[286\] Jobs at extreme risk range from paralegals to fast food cooks, while job demand is likely to increase for care-related professions ranging from personal healthcare to the clergy.\[287\] In July 2025, Ford CEO Jim Farley predicted that "artificial intelligence is going to replace literally half of all white-collar workers in the U.S."\[288\]

From the early days of the development of artificial intelligence, there have been arguments, for example, those put forward by Joseph Weizenbaum, about whether tasks that can be done by computers actually should be done by them, given the difference between computers and humans, and between quantitative calculation and qualitative, value-based judgement.\[289\]

#### Substitution for human–human interaction

See also: Deaths linked to chatbots

With the increase of loneliness in the early 21st century, AI is sometimes identified as a potential source of relief to this problem. It would be possible, via human-like qualities built into AI products,\[290\] for individuals to assume that this need can be met by artificial means.\[291\]\[292\] In some cases, people approach artificial intelligence for companionship when they believe that they would not find acceptance due to feeling outcast.\[293\] Examples of harm coming to humans from advanced chatbots have been reported in courts in the United States, with AI companies accused of creating products that endanger humans through emotional confusion or deception.\[294\]\[295\]

#### Existential risk

Main article: Existential risk from artificial intelligence

Recent public debates in artificial intelligence have increasingly focused on its broader societal and ethical implications. It has been argued AI will become so powerful that humanity may irreversibly lose control of it. This could, as physicist Stephen Hawking stated, "spell the end of the human race".\[296\] This scenario has been common in science fiction, when a computer or robot suddenly develops a human-like "self-awareness" (or "sentience" or "consciousness") and becomes a malevolent character.\[q\] These sci-fi scenarios are misleading in several ways.

First, AI does not require human-like sentience to be an existential risk. Modern AI programs are given specific goals and use learning and intelligence to achieve them. Philosopher Nick Bostrom argued that if one gives _almost any_ goal to a sufficiently powerful AI, it may choose to destroy humanity to achieve it (he used the example of an automated paperclip factory that destroys the world to get more iron for paperclips).\[298\] Stuart Russell gives the example of household robot that tries to find a way to kill its owner to prevent it from being unplugged, reasoning that "you can't fetch the coffee if you're dead."\[299\] In order to be safe for humanity, a superintelligence would have to be genuinely aligned with humanity's morality and values so that it is "fundamentally on our side".\[300\]

Second, Yuval Noah Harari argues that AI does not require a robot body or physical control to pose an existential risk. The essential parts of civilization are not physical. Things like ideologies, law, government, money and the economy are built on language; they exist because there are stories that billions of people believe. The current prevalence of misinformation suggests that an AI could use language to convince people to believe anything, even to take actions that are destructive.\[301\] Geoffrey Hinton said in 2025 that modern AI is particularly "good at persuasion" and getting better all the time. He asks "Suppose you wanted to invade the capital of the US. Do you have to go there and do it yourself? No. You just have to be good at persuasion."\[302\]

The opinions amongst experts and industry insiders are mixed, with sizable fractions both concerned and unconcerned by risk from eventual superintelligent AI.\[303\] Personalities such as Stephen Hawking, Bill Gates, and Elon Musk,\[304\] as well as AI pioneers such as Geoffrey Hinton, Yoshua Bengio, Stuart Russell, Demis Hassabis, and Sam Altman, have expressed concerns about existential risk from AI.

In May 2023, Geoffrey Hinton announced his resignation from Google in order to be able to "freely speak out about the risks of AI" without "considering how this impacts Google".\[305\] He notably mentioned risks of an AI takeover,\[306\] and stressed that in order to avoid the worst outcomes, establishing safety guidelines will require cooperation among those competing in use of AI.\[307\]

In 2023, many leading AI experts endorsed the joint statement that "Mitigating the risk of extinction from AI should be a global priority alongside other societal-scale risks such as pandemics and nuclear war".\[308\]

Some other researchers were more optimistic. AI pioneer Jürgen Schmidhuber did not sign the joint statement, emphasising that in 95% of all cases, AI research is about making "human lives longer and healthier and easier."\[309\] While the tools that are now being used to improve lives can also be used by bad actors, "they can also be used against the bad actors."\[310\]\[311\] Andrew Ng also argued that "it's a mistake to fall for the doomsday hype on AI—and that regulators who do will only benefit vested interests."\[312\] Yann LeCun, a Turing Award winner, disagreed with the idea that AI will subordinate humans "simply because they are smarter, let alone destroy \[us\]",\[313\] "scoff\[ing\] at his peers' dystopian scenarios of supercharged misinformation and even, eventually, human extinction." In contrast, he claimed that "intelligent machines will usher in a new renaissance for humanity, a new era of enlightenment."\[314\] In the early 2010s, experts argued that the risks are too distant in the future to warrant research or that humans will be valuable from the perspective of a superintelligent machine.\[315\] However, after 2016, the study of current and future risks and possible solutions became a serious area of research.\[316\]

### Ethical machines and alignment

Main articles: Machine ethics, AI safety, Friendly artificial intelligence, Artificial moral agents, and Human Compatible

See also: Human-AI interaction

Friendly AI are machines that have been designed from the beginning to minimize risks and to make choices that benefit humans. Eliezer Yudkowsky, who coined the term, argues that developing friendly AI should be a higher research priority: it may require a large investment and it must be completed before AI becomes an existential risk.\[317\]

Machines with intelligence have the potential to use their intelligence to make ethical decisions. The field of machine ethics provides machines with ethical principles and procedures for resolving ethical dilemmas.\[318\] The field of machine ethics is also called computational morality,\[318\] and was founded at an AAAI symposium in 2005.\[319\]

Other approaches include Wendell Wallach's "artificial moral agents"\[320\] and Stuart J. Russell's three principles for developing provably beneficial machines.\[321\]

### Open source

See also: Open-source artificial intelligence and Lists of open-source artificial intelligence software

Active organizations in the AI open-source community include Hugging Face,\[322\] Google,\[323\] EleutherAI and Meta.\[324\] Various AI models, such as Llama 2, Mistral or Stable Diffusion, have been made open-weight,\[325\]\[326\] meaning that their architecture and trained parameters (the "weights") are publicly available. Open-weight models can be freely fine-tuned, which allows companies to specialize them with their own data and for their own use-case.\[327\] Open-weight models are useful for research and innovation but can also be misused. Since they can be fine-tuned, any built-in security measure, such as objecting to harmful requests, can be trained away until it becomes ineffective. Some researchers warn that future AI models may develop dangerous capabilities (such as the potential to drastically facilitate bioterrorism) and that once released on the Internet, they cannot be deleted everywhere if needed. They recommend pre-release audits and cost-benefit analyses.\[328\]

### Frameworks

Artificial intelligence projects can be guided by ethical considerations during the design, development, and implementation of an AI system. An AI framework such as the Care and Act Framework, developed by the Alan Turing Institute and based on the SUM values, outlines four main ethical dimensions, defined as follows:\[329\]\[330\]

* **Respect** the dignity of individual people
* **Connect** with other people sincerely, openly, and inclusively
* **Care** for the wellbeing of everyone
* **Protect** social values, justice, and the public interest

Other developments in ethical frameworks include those decided upon during the Asilomar Conference, the Montreal Declaration for Responsible AI, and the IEEE's Ethics of Autonomous Systems initiative, among others;\[331\] however, these principles are not without criticism, especially regarding the people chosen to contribute to these frameworks.\[332\]

Promotion of the wellbeing of the people and communities that these technologies affect requires consideration of the social and ethical implications at all stages of AI system design, development and implementation, and collaboration between job roles such as data scientists, product managers, data engineers, domain experts, and delivery managers.\[333\]

The UK AI Safety Institute released in 2024 a testing toolset called 'Inspect' for AI safety evaluations available under an MIT open-source licence which is freely available on GitHub and can be improved with third-party packages. It can be used to evaluate AI models in a range of areas including core knowledge, ability to reason, and autonomous capabilities.\[334\]

### Regulation

Main articles: Regulation of artificial intelligence, Regulation of algorithms, and AI safety

The regulation of artificial intelligence is the development of public sector policies and laws for promoting and regulating AI; it is therefore related to the broader regulation of algorithms.\[335\] The regulatory and policy landscape for AI is an emerging issue in jurisdictions globally.\[336\] According to AI Index at Stanford, the annual number of AI-related laws passed in the 127 survey countries jumped from one passed in 2016 to 37 passed in 2022 alone.\[337\]\[338\] Between 2016 and 2020, more than 30 countries adopted dedicated strategies for AI.\[339\] Most EU member states had released national AI strategies, as had Canada, China, India, Japan, Mauritius, the Russian Federation, Saudi Arabia, United Arab Emirates, U.S., and Vietnam. Others were in the process of elaborating their own AI strategy, including Bangladesh, Malaysia and Tunisia.\[339\] The Global Partnership on Artificial Intelligence was launched in June 2020, stating a need for AI to be developed in accordance with human rights and democratic values, to ensure public confidence and trust in the technology.\[339\] Henry Kissinger, Eric Schmidt, and Daniel Huttenlocher published a joint statement in November 2021 calling for a government commission to regulate AI.\[340\] In 2023, OpenAI leaders published recommendations for the governance of superintelligence, which they believe may happen in less than 10 years.\[341\] In 2023, the United Nations also launched an advisory body to provide recommendations on AI governance; the body comprises technology company executives, government officials and academics.\[342\] On 1 August 2024, the EU Artificial Intelligence Act entered into force, establishing the first comprehensive EU-wide AI regulation.\[343\] In 2024, the Council of Europe created the first international legally binding treaty on AI, called the "Framework Convention on Artificial Intelligence and Human Rights, Democracy and the Rule of Law". It was adopted by the European Union, the United States, the United Kingdom, and other signatories.\[344\]

In a 2022 Ipsos survey, attitudes towards AI varied greatly by country; 78% of Chinese citizens, but only 35% of Americans, agreed that "products and services using AI have more benefits than drawbacks".\[337\] A 2023 Reuters/Ipsos poll found that 61% of Americans agree, and 22% disagree, that AI poses risks to humanity.\[345\] In a 2023 Fox News poll, 35% of Americans thought it "very important", and an additional 41% thought it "somewhat important", for the federal government to regulate AI, versus 13% responding "not very important" and 8% responding "not at all important".\[346\]\[347\]

In November 2023, the first global AI Safety Summit was held in Bletchley Park in the UK to discuss the near and far term risks of AI and the possibility of mandatory and voluntary regulatory frameworks.\[348\] 28 countries including the United States, China, and the European Union issued a declaration at the start of the summit, calling for international co-operation to manage the challenges and risks of artificial intelligence.\[349\]\[350\] In May 2024 at the AI Seoul Summit, 16 global AI tech companies agreed to safety commitments on the development of AI.\[351\]\[352\]

In March 2026, the United Nations convened the inaugural meeting of the Independent International Scientific Panel on AI, a 40-member expert body established under the Global Digital Compact to produce annual evidence-based reports on AI's societal impacts.\[353\]

## History

Main article: History of artificial intelligence

For a chronological guide, see Timeline of artificial intelligence.

The study of mechanical or "formal" reasoning began with philosophers and mathematicians in antiquity. The study of logic led directly to Alan Turing's theory of computation, which suggested that a machine, by shuffling symbols as simple as "0" and "1", could simulate any conceivable form of mathematical reasoning.\[355\]\[356\] This, along with concurrent discoveries in cybernetics, information theory and neurobiology, led researchers to consider the possibility of building an "electronic brain".\[r\] They developed several areas of research that would become part of AI,\[358\] such as McCulloch and Pitts design for "artificial neurons" in 1943,\[115\] and Turing's influential 1950 paper 'Computing Machinery and Intelligence', which introduced the Turing test and showed that "machine intelligence" was plausible.\[359\]\[356\]

The field of AI research was founded at a workshop at Dartmouth College in 1956.\[s\]\[4\] The attendees became the leaders of AI research in the 1960s.\[t\] They and their students produced programs that the press described as "astonishing":\[u\] computers were learning checkers strategies, solving word problems in algebra, proving logical theorems and speaking English.\[v\]\[5\] Artificial intelligence laboratories were set up at a number of British and U.S. universities in the latter 1950s and early 1960s.\[356\]

Researchers in the 1960s and the 1970s were convinced that their methods would eventually succeed in creating a machine with general intelligence and considered this the goal of their field.\[363\] In 1965 Herbert Simon predicted, "machines will be capable, within twenty years, of doing any work a man can do".\[364\] In 1967 Marvin Minsky agreed, writing that "within a generation ... the problem of creating 'artificial intelligence' will substantially be solved".\[365\] They had, however, underestimated the difficulty of the problem.\[w\] In 1974, both the U.S. and British governments cut off exploratory research in response to the criticism of Sir James Lighthill\[367\] and ongoing pressure from the U.S. Congress to fund more productive projects.\[368\] Minsky and Papert's book _Perceptrons_ was understood as proving that artificial neural networks would never be useful for solving real-world tasks, thus discrediting the approach altogether.\[369\] The "AI winter", a period when obtaining funding for AI projects was difficult, followed.\[7\]

In the early 1980s, AI research was revived by the commercial success of expert systems,\[370\] a form of AI program that simulated the knowledge and analytical skills of human experts. By 1985, the market for AI had reached over a billion dollars. At the same time, Japan's fifth generation computer project inspired the U.S. and British governments to restore funding for academic research.\[6\] However, beginning with the collapse of the Lisp Machine market in 1987, AI once again fell into disrepute, and a second, longer-lasting winter began.\[8\]

Up to this point, most of AI's funding had gone to projects that used high-level symbols to represent mental objects like plans, goals, beliefs, and known facts. In the 1980s, some researchers began to doubt that this approach would be able to imitate all the processes of human cognition, especially perception, robotics, learning and pattern recognition,\[371\] and began to look into "sub-symbolic" approaches.\[372\] Rodney Brooks rejected "representation" in general and focussed directly on engineering machines that move and survive.\[x\] Judea Pearl, Lotfi Zadeh, and others developed methods that handled incomplete and uncertain information by making reasonable guesses rather than precise logic.\[85\]\[377\] But the most important development was the revival of "connectionism", including neural network research, by Geoffrey Hinton and others.\[378\] In 1990, Yann LeCun successfully showed that convolutional neural networks can recognize handwritten digits, the first of many successful applications of neural networks.\[379\]

AI gradually restored its reputation in the late 1990s and early 21st century by exploiting formal mathematical methods and by finding specific solutions to specific problems. This "narrow" and "formal" focus allowed researchers to produce verifiable results and collaborate with other fields (such as statistics, economics and mathematics).\[380\] By 2000, solutions developed by AI researchers were being widely used, although in the 1990s they were rarely described as "artificial intelligence" (a tendency known as the AI effect).\[381\] However, several academic researchers became concerned that AI was no longer pursuing its original goal of creating versatile, fully intelligent machines. Beginning around 2002, they founded the subfield of artificial general intelligence (or "AGI"), which had several well-funded institutions by the 2010s.\[67\]

Deep learning began to dominate industry benchmarks in 2012 and was adopted throughout the field.\[9\] For many specific tasks, other methods were abandoned.\[y\] Deep learning's success was based on both hardware improvements (faster computers,\[383\] graphics processing units, cloud computing\[384\]) and access to large amounts of data\[385\] (including curated datasets,\[384\] such as ImageNet). Deep learning's success led to an enormous increase in interest and funding in AI.\[z\] The amount of machine learning research (measured by total publications) increased by 50% in the years 2015–2019.\[339\]

In 2016, issues of fairness and the misuse of technology were catapulted into center stage at machine learning conferences, publications vastly increased, funding became available, and many researchers re-focussed their careers on these issues. The alignment problem became a serious field of academic study.\[316\]

In the late 2010s and early 2020s, AGI companies began to deliver programs that created enormous interest. In 2015, AlphaGo, developed by DeepMind, beat the world champion Go player. The program taught only the game's rules and developed a strategy by itself. GPT-3 is a large language model that was released in 2020 by OpenAI and is capable of generating high-quality human-like text.\[386\] ChatGPT, launched on 30 November 2022, became the fastest-growing consumer software application in history, gaining over 100 million users in two months.\[387\] It marked what is widely regarded as AI's breakout year, bringing it into the public consciousness.\[388\] These programs, and others, inspired an aggressive AI boom, where large companies began investing billions of dollars in AI research. According to AI Impacts, about US$50 billion annually was invested in "AI" around 2022 in the U.S. alone and about 20% of the new U.S. Computer Science PhD graduates have specialized in "AI".\[389\] About 800,000 "AI"-related U.S. job openings existed in 2022.\[390\] According to PitchBook research, 22% of newly funded startups in 2024 claimed to be AI companies.\[391\]

## Philosophy

Main article: Philosophy of artificial intelligence

Philosophical debates have historically sought to determine the nature of intelligence and how to make intelligent machines.\[392\] Another major focus has been whether machines can be conscious, and the associated ethical implications.\[393\] Many other topics in philosophy are relevant to AI, such as epistemology and free will.\[394\] Rapid advancements have intensified public discussions on the philosophy and ethics of AI.\[393\]

### Defining artificial intelligence

See also: Synthetic intelligence, Intelligent agent, Artificial mind, Virtual intelligence, and Dartmouth workshop

Alan Turing wrote in 1950 "I propose to consider the question 'can machines think'?"\[395\] He advised changing the question from whether a machine "thinks", to "whether or not it is possible for machinery to show intelligent behaviour".\[395\] He devised the Turing test, which measures the ability of a machine to simulate human conversation.\[359\] Since we can only observe the behavior of the machine, it does not matter if it is "actually" thinking or literally has a "mind". Turing notes that we can not determine these things about other people but "it is usual to have a polite convention that everyone thinks."\[396\]

Russell and Norvig agree with Turing that intelligence must be defined in terms of external behavior, not internal structure.\[1\] However, they are critical that the test requires the machine to imitate humans. "Aeronautical engineering texts", they wrote, "do not define the goal of their field as making 'machines that fly so exactly like pigeons that they can fool other pigeons.'"\[398\] AI founder John McCarthy agreed, writing that "Artificial intelligence is not, by definition, simulation of human intelligence".\[399\]

McCarthy defines intelligence as "the computational part of the ability to achieve goals in the world".\[400\] Another AI founder, Marvin Minsky, similarly describes it as "the ability to solve hard problems".\[401\] _Artificial Intelligence: A Modern Approach_ defines it as the study of agents that perceive their environment and take actions that maximize their chances of achieving defined goals.\[1\]

The many differing definitions of AI have been critically analyzed.\[402\]\[403\]\[404\] During the 2020s AI boom, the term has been used as a marketing buzzword to promote products and services which do not use AI.\[405\]

#### Legal definitions

The International Organization for Standardization describes an AI system as a "an engineered system that generates outputs such as content, forecasts, recommendations, or decisions for a given set of human‑defined objectives, and can operate with varying levels of automation".\[406\] The EU AI Act defines an AI system as "a machine-based system that is designed to operate with varying levels of autonomy and that may exhibit adaptiveness after deployment, and that, for explicit or implicit objectives, infers, from the input it receives, how to generate outputs such as predictions, content, recommendations, or decisions that can influence physical or virtual environments".\[407\] In the United States, influential but non‑binding guidance such as the National Institute of Standards and Technology's AI Risk Management Framework describes an AI system as "an engineered or machine-based system that can, for a given set of objectives, generate outputs such as predictions, recommendations, or decisions influencing real or virtual environments. AI systems are designed to operate with varying levels of autonomy".\[408\]

### Evaluating approaches to AI

No established unifying theory or paradigm has guided AI research for most of its history.\[aa\] The unprecedented success of statistical machine learning in the 2010s eclipsed all other approaches (so much so that some sources, especially in the business world, use the term "artificial intelligence" to mean "machine learning with neural networks"). This approach is mostly sub-symbolic, soft and narrow. Critics argue that these questions may have to be revisited by future generations of AI researchers.

#### Symbolic AI and its limits

Symbolic AI (or "GOFAI")\[410\] simulated the high-level conscious reasoning that people use when they solve puzzles, express legal reasoning and do mathematics. They were highly successful at "intelligent" tasks such as algebra or IQ tests. In the 1960s, Newell and Simon proposed the physical symbol systems hypothesis: "A physical symbol system has the necessary and sufficient means of general intelligent action."\[411\]

However, the symbolic approach failed on many tasks that humans solve easily, such as learning, recognizing an object or commonsense reasoning. Moravec's paradox is the discovery that high-level "intelligent" tasks were easy for AI, but low level "instinctive" tasks were extremely difficult.\[412\] Philosopher Hubert Dreyfus had argued since the 1960s that human expertise depends on unconscious instinct rather than conscious symbol manipulation, and on having a "feel" for the situation, rather than explicit symbolic knowledge.\[413\] Although his arguments had been ridiculed and ignored when they were first presented, eventually, AI research came to agree with him.\[ab\]\[14\]

The issue is not resolved: sub-symbolic reasoning can make many of the same inscrutable mistakes that human intuition does, such as algorithmic bias. Critics such as Noam Chomsky argue continuing research into symbolic AI will still be necessary to attain general intelligence,\[415\]\[416\] in part because sub-symbolic AI is a move away from explainable AI: it can be difficult or impossible to understand why a modern statistical AI program made a particular decision. The emerging field of neuro-symbolic artificial intelligence attempts to bridge the two approaches.

#### Neat vs. scruffy

Main article: Neats and scruffies

"Neats" hope that intelligent behavior is described using simple, elegant principles (such as logic, optimization, or neural networks). "Scruffies" expect that it necessarily requires solving a large number of unrelated problems. Neats defend their programs with theoretical rigor, scruffies rely mainly on incremental testing to see if they work. This issue was actively discussed in the 1970s and 1980s,\[417\] but eventually was seen as irrelevant. Modern AI has elements of both.

#### Soft vs. hard computing

Main article: Soft computing

Finding a provably correct or optimal solution is intractable for many important problems.\[13\] Soft computing is a set of techniques, including genetic algorithms, fuzzy logic and neural networks, that are tolerant of imprecision, uncertainty, partial truth and approximation. Soft computing was introduced in the late 1980s and most successful AI programs in the 21st century are examples of soft computing with neural networks.

#### Narrow vs. general AI

Main articles: Weak artificial intelligence and Artificial general intelligence

AI researchers are divided as to whether to pursue the goals of artificial general intelligence and superintelligence directly or to solve as many specific problems as possible (narrow AI) in hopes these solutions will lead indirectly to the field's long-term goals.\[418\]\[419\] General intelligence is difficult to define and difficult to measure, and modern AI has had more verifiable successes by focusing on specific problems with specific solutions. The sub-field of artificial general intelligence studies this area exclusively.

### Machine consciousness, sentience, and mind

Main articles: Philosophy of artificial intelligence and Artificial consciousness

There is no settled consensus in philosophy of mind on whether a machine can have a mind, consciousness and mental states in the same sense that human beings do. This issue considers the internal experiences of the machine, rather than its external behavior. Mainstream AI research considers this issue irrelevant because it does not affect the goals of the field: to build machines that can solve problems using intelligence. Russell and Norvig add that "\[t\]he additional project of making a machine conscious in exactly the way humans are is not one that we are equipped to take on."\[420\] However, the question has become central to the philosophy of mind. It is also typically the central question at issue in artificial intelligence in fiction.

#### Consciousness

Main articles: Hard problem of consciousness and Theory of mind

David Chalmers identified two problems in understanding the mind, which he named the "hard" and "easy" problems of consciousness.\[421\] The easy problem is understanding how the brain processes signals, makes plans and controls behavior. The hard problem is explaining how this _feels_ or why it should feel like anything at all, assuming we are right in thinking that it truly does feel like something (Dennett's consciousness illusionism says this is an illusion). While human information processing is easy to explain, human subjective experience is difficult to explain. For example, it is easy to imagine a color-blind person who has learned to identify which objects in their field of view are red, but it is not clear what would be required for the person to _know what red looks like_.\[422\]

#### Computationalism and functionalism

Main articles: Computational theory of mind and Functionalism (philosophy of mind)

Computationalism is the position in the philosophy of mind that the human mind is an information processing system and that thinking is a form of computing. Computationalism argues that the relationship between mind and body is similar or identical to the relationship between software and hardware and thus may be a solution to the mind–body problem. This philosophical position was inspired by the work of AI researchers and cognitive scientists in the 1960s and was originally proposed by philosophers Jerry Fodor and Hilary Putnam.\[423\]

Philosopher John Searle characterized this position as "strong AI": "The appropriately programmed computer with the right inputs and outputs would thereby have a mind in exactly the same sense human beings have minds."\[ac\] Searle challenges this claim with his Chinese room argument, which attempts to show that even a computer capable of perfectly simulating human behavior would not have a mind.\[427\]

#### AI welfare and rights

It is difficult or impossible to reliably evaluate whether an advanced AI is sentient (has the ability to feel), and if so, to what degree.\[428\] But if there is a significant chance that a given machine can feel and suffer, then it may be entitled to certain rights or welfare protection measures, similarly to animals.\[429\]\[430\] Sapience (a set of capacities related to high intelligence, such as discernment or self-awareness) may provide another moral basis for AI rights.\[429\] Robot rights are also sometimes proposed as a practical way to integrate autonomous agents into society.\[431\]

In 2017, the European Union considered granting "electronic personhood" to some of the most capable AI systems. Similarly to the legal status of companies, it would have conferred rights but also responsibilities.\[432\] Critics argued in 2018 that granting rights to AI systems would downplay the importance of human rights, and that legislation should focus on user needs rather than speculative futuristic scenarios. They also noted that robots lacked the autonomy to take part in society on their own.\[433\]\[434\]

Progress in AI increased interest in the topic. Proponents of AI welfare and rights often argue that AI sentience, if it emerges, would be particularly easy to deny. They warn that this may be a moral blind spot analogous to slavery or factory farming, which could lead to large-scale suffering if sentient AI is created and carelessly exploited.\[430\]\[429\]

## Future

### Superintelligence and the singularity

A superintelligence is a hypothetical agent that would possess intelligence far surpassing that of the brightest and most gifted human mind.\[419\] If research into artificial general intelligence produced sufficiently intelligent software, it might be able to reprogram and improve itself. The improved software would be even better at improving itself, leading to what I. J. Good called an "intelligence explosion" and Vernor Vinge called a "singularity".\[435\]

However, technologies cannot improve exponentially indefinitely, and typically follow an S-shaped curve, slowing when they reach the physical limits of what the technology can do.\[436\]

### Transhumanism

Main article: Transhumanism

Robot designer Hans Moravec, cyberneticist Kevin Warwick and inventor Ray Kurzweil have predicted that humans and machines may merge in the future into cyborgs that are more capable and powerful than either. This idea, called transhumanism, has roots in the writings of Aldous Huxley and Robert Ettinger.\[437\]

Edward Fredkin argues that "artificial intelligence is the next step in evolution", an idea first proposed by Samuel Butler's "Darwin among the Machines" as far back as 1863, and expanded upon by George Dyson in his 1998 book _Darwin Among the Machines: The Evolution of Global Intelligence_.\[438\]

## In fiction

Main article: Artificial intelligence in fiction

Thought-capable artificial beings have appeared as storytelling devices since antiquity,\[439\] and have been a persistent theme in science fiction.\[440\]

A common trope in these works began with Mary Shelley's _Frankenstein_, where a human creation becomes a threat to its masters. This includes such works as Arthur C. Clarke's and Stanley Kubrick's _2001: A Space Odyssey_ (both 1968), with HAL 9000, the murderous computer in charge of the _Discovery One_ spaceship, as well as _Blade Runner_ (1982), _The Terminator_ (1984) and _The Matrix_ (1999). In contrast, the rare loyal robots such as Gort from _The Day the Earth Stood Still_ (1951) and Bishop from _Aliens_ (1986) are less prominent in popular culture.\[441\]

Isaac Asimov introduced the Three Laws of Robotics in many stories, most notably with the "Multivac" super-intelligent computer. Asimov's laws are often brought up during lay discussions of machine ethics;\[442\] while almost all artificial intelligence researchers are familiar with Asimov's laws through popular culture, they generally consider the laws useless for many reasons, one of which is their ambiguity.\[443\]

Several works use AI to force us to confront the fundamental question of what makes us human, showing us artificial beings that have the ability to feel, and thus to suffer. This appears in Karel Čapek's _R.U.R._, the films _A.I. Artificial Intelligence_ and _Ex Machina_, as well as the novel _Do Androids Dream of Electric Sheep?_, by Philip K. Dick. Dick considers the idea that our understanding of human subjectivity is altered by technology created with artificial intelligence.\[444\]

## See also

* Artificial consciousness – Field in cognitive science
* Artificial intelligence and elections
* Artificial intelligence content detection – Software to detect AI-generated content
* Artificial intelligence in Wikimedia projects – Use of artificial intelligence to develop Wikipedia and other Wikimedia projects
* Association for the Advancement of Artificial Intelligence (AAAI)
* Behavior selection algorithm – Algorithm that selects actions for intelligent agents
* Business process automation – Automation of business processes
* Case-based reasoning – Process of solving new problems based on the solutions of similar past problems
* Computational intelligence – Computer science field of study
* DARWIN EU – A European Union initiative coordinated by the European Medicines Agency (EMA) to generate and utilize real world evidence (RWE) to support the evaluation and supervision of medicines across the EU
* Digital immortality – Hypothetical concept of storing a personality in digital form
* Emergent algorithm – Algorithm exhibiting emergent behavior
* Female gendering of AI technologies – Gender biases in digital technologyPages displaying short descriptions of redirect targets
* Glossary of artificial intelligence – List of concepts in artificial intelligence
* Intelligence amplification – Use of information technology to augment human intelligence
* Intelligent agent – Software agent which acts autonomously
* Intelligent automation – Software process that combines robotic process automation and artificial intelligence
* List of artificial intelligence books
* List of artificial intelligence journals
* List of artificial intelligence projects
* Mind uploading – Hypothetical process of digitally emulating a brain
* Organoid intelligence – Use of brain cells and brain organoids for intelligent computing
* Pseudorandomness – Appearing random but actually being generated by a deterministic, causal process
* Robotic process automation – Form of business process automation technology
* _The Last Day_ – 1967 Welsh science fiction novel
* Wetware computer – Computer composed of organic material

## Explanatory notes

1. ^ _**a**_ _**b**_ This list of intelligent traits is based on the topics covered by the major AI textbooks, including: Russell & Norvig (2021), Luger & Stubblefield (2004), Poole, Mackworth & Goebel (1998) and Nilsson (1998).
2. ^ _**a**_ _**b**_ This list of tools is based on the topics covered by the major AI textbooks, including: Russell & Norvig (2021), Luger & Stubblefield (2004), Poole, Mackworth & Goebel (1998) and Nilsson (1998).
3. **^** It is among the reasons that expert systems proved to be inefficient for capturing knowledge.\[28\]\[29\]
4. **^** "Rational agent" is general term used in economics, philosophy and theoretical artificial intelligence. It can refer to anything that directs its behavior to accomplish goals, such as a person, an animal, a corporation, a nation, or in the case of AI, a computer program.
5. **^** Alan Turing discussed the centrality of learning as early as 1950, in his classic paper "Computing Machinery and Intelligence".\[41\] In 1956, at the original Dartmouth AI summer conference, Ray Solomonoff wrote a report on unsupervised probabilistic machine learning: "An Inductive Inference Machine".\[42\]
6. **^** See AI winter § Machine translation and the ALPAC report of 1966.
7. **^** Compared with symbolic logic, formal Bayesian inference is computationally expensive. For inference to be tractable, most observations must be conditionally independent of one another. AdSense uses a Bayesian network with over 300 million edges to learn which ads to serve.\[92\]
8. **^** Expectation–maximization, one of the most popular algorithms in machine learning, allows clustering in the presence of unknown latent variables.\[94\]
9. **^** Some form of deep neural networks (without a specific learning algorithm) were described by: Warren S. McCulloch and Walter Pitts (1943);\[115\] Alan Turing (1948);\[116\] Karl Steinbuch and Roger David Joseph (1961).\[117\] Deep or recurrent networks that learned (or used gradient descent) were developed by: Frank Rosenblatt (1957);\[116\] Oliver Selfridge (1959);\[117\] Alexey Ivakhnenko and Valentin Lapa (1965);\[118\] Kaoru Nakano (1971);\[119\] Shun-Ichi Amari (1972); \[119\] and John Joseph Hopfield (1982).\[119\] Precursors to backpropagation were developed by: Henry J. Kelley (1960);\[116\] Arthur E. Bryson (1962);\[116\] Stuart Dreyfus (1962);\[116\] Arthur E. Bryson and Yu-Chi Ho (1969).\[116\] Backpropagation was independently developed by: Seppo Linnainmaa (1970);\[120\] and Paul Werbos (1974).\[116\]
10. **^** Geoffrey Hinton said, of his work on neural networks in the 1990s, "our labeled datasets were thousands of times too small. \[And\] our computers were millions of times too slow."\[121\]
11. **^** In statistics, a bias is a systematic error or deviation from the correct value. But in the context of fairness, it refers to a tendency in favor or against a certain group or individual characteristic, usually in a way that is considered unfair or harmful. A statistically unbiased AI system that produces disparate outcomes for different demographic groups may thus be viewed as biased in the ethical sense.\[239\]
12. **^** Including Jon Kleinberg (Cornell University), Sendhil Mullainathan (University of Chicago), Cynthia Chouldechova (Carnegie Mellon) and Sam Corbett-Davis (Stanford)\[249\]
13. **^** Moritz Hardt (a director at the Max Planck Institute for Intelligent Systems) argues that machine learning "is fundamentally the wrong tool for a lot of domains, where you're trying to design interventions and mechanisms that change the world."\[254\]
14. **^** When the law was passed in 2018, it still contained a form of this provision.
15. **^** This is the United Nations' definition, and includes things like land mines as well.\[270\]
16. **^** See table 4; 9% is both the OECD average and the U.S. average.\[281\]
17. **^** Sometimes called a "robopocalypse"\[297\]
18. **^** "Electronic brain" was the term used by the press around this time.\[355\]\[357\]
19. **^** Daniel Crevier wrote, "the conference is generally recognized as the official birthdate of the new science."\[360\] Russell and Norvig called the conference "the inception of artificial intelligence."\[115\]
20. **^** Russell and Norvig wrote "for the next 20 years the field would be dominated by these people and their students."\[361\]
21. **^** Russell and Norvig wrote, "it was astonishing whenever a computer did anything kind of smartish".\[362\]
22. **^** The programs described are Arthur Samuel's checkers program for the IBM 701, Daniel Bobrow's STUDENT, Newell and Simon's Logic Theorist and Terry Winograd's SHRDLU.
23. **^** Russell and Norvig wrote: "in almost all cases, these early systems failed on more difficult problems".\[366\]
24. **^** Embodied approaches to AI\[373\] were championed by Hans Moravec\[374\] and Rodney Brooks\[375\] and went by many names: Nouvelle AI.\[375\] Developmental robotics.\[376\]
25. **^** Matteo Wong wrote in _The Atlantic_: "Whereas for decades, computer-science fields such as natural-language processing, computer vision, and robotics used extremely different methods, now they all use a programming method called "deep learning". As a result, their code and approaches have become more similar, and their models are easier to integrate into one another."\[382\]
26. **^** Jack Clark wrote in Bloomberg: "After a half-decade of quiet breakthroughs in artificial intelligence, 2015 has been a landmark year. Computers are smarter and learning faster than ever", and noted that the number of software projects that use machine learning at Google increased from a "sporadic usage" in 2012 to more than 2,700 projects in 2015.\[384\]
27. **^** Nils Nilsson wrote in 1983: "Simply put, there is wide disagreement in the field about what AI is all about."\[409\]
28. **^** Daniel Crevier wrote that "time has proven the accuracy and perceptiveness of some of Dreyfus's comments. Had he formulated them less aggressively, constructive actions they suggested might have been taken much earlier."\[414\]
29. **^** Searle presented this definition of "Strong AI" in 1999.\[424\] Searle's original formulation was "The appropriately programmed computer really is a mind, in the sense that computers given the right programs can be literally said to understand and have other cognitive states."\[425\] Strong AI is defined similarly by Russell and Norvig: "Stong AI – the assertion that machines that do so are _actually_ thinking (as opposed to _simulating_ thinking)."\[426\]

## References

1. ^ _**a**_ _**b**_ _**c**_ Russell & Norvig (2021), pp. 1–4.
2. **^** Russell & Norvig (2021, §1.2).
3. **^** "Tech companies want to build artificial general intelligence. But who decides when AGI is attained?". _AP News_. 4 April 2024. Retrieved 20 May 2025.
4. ^ _**a**_ _**b**_ Dartmouth workshop: Russell & Norvig (2021, p. 18), McCorduck (2004, pp. 111–136), NRC (1999, pp. 200–201) 
 The proposal: McCarthy et al. (1955)
5. ^ _**a**_ _**b**_ Successful programs of the 1960s: McCorduck (2004, pp. 243–252), Crevier (1993, pp. 52–107), Moravec (1988, p. 9), Russell & Norvig (2021, pp. 19–21)
6. ^ _**a**_ _**b**_ Funding initiatives in the early 1980s: Fifth Generation Project (Japan), Alvey (UK), Microelectronics and Computer Technology Corporation (US), Strategic Computing Initiative (US): McCorduck (2004, pp. 426–441), Crevier (1993, pp. 161–162, 197–203, 211, 240), Russell & Norvig (2021, p. 23), NRC (1999, pp. 210–211), Newquist (1994, pp. 235–248)
7. ^ _**a**_ _**b**_ First AI Winter, Lighthill report, Mansfield Amendment: Crevier (1993, pp. 115–117), Russell & Norvig (2021, pp. 21–22), NRC (1999, pp. 212–213), Howe (1994), Newquist (1994, pp. 189–201)
8. ^ _**a**_ _**b**_ Second AI Winter: Russell & Norvig (2021, p. 24), McCorduck (2004, pp. 430–435), Crevier (1993, pp. 209–210), NRC (1999, pp. 214–216), Newquist (1994, pp. 301–318)
9. ^ _**a**_ _**b**_ Deep learning revolution, AlexNet: Goldman (2022), Russell & Norvig (2021, p. 26), McKinsey (2018)
10. **^** Toews (2023).
11. **^** Problem-solving, puzzle solving, game playing, and deduction: Russell & Norvig (2021, chpt. 3–5), Russell & Norvig (2021, chpt. 6) (constraint satisfaction), Poole, Mackworth & Goebel (1998, chpt. 2, 3, 7, 9), Luger & Stubblefield (2004, chpt. 3, 4, 6, 8), Nilsson (1998, chpt. 7–12)
12. **^** Uncertain reasoning: Russell & Norvig (2021, chpt. 12–18), Poole, Mackworth & Goebel (1998, pp. 345–395), Luger & Stubblefield (2004, pp. 333–381), Nilsson (1998, chpt. 7–12)
13. ^ _**a**_ _**b**_ _**c**_ Intractability and efficiency and the combinatorial explosion: Russell & Norvig (2021, p. 21)
14. ^ _**a**_ _**b**_ _**c**_ Psychological evidence of the prevalence of sub-symbolic reasoning and knowledge: Kahneman (2011), Dreyfus & Dreyfus (1986), Wason & Shapiro (1966), Kahneman, Slovic & Tversky (1982)
15. **^** Knowledge representation and knowledge engineering: Russell & Norvig (2021, chpt. 10), Poole, Mackworth & Goebel (1998, pp. 23–46, 69–81, 169–233, 235–277, 281–298, 319–345), Luger & Stubblefield (2004, pp. 227–243), Nilsson (1998, chpt. 17.1–17.4, 18)
16. **^** Smoliar & Zhang (1994).
17. **^** Neumann & Möller (2008).
18. **^** Kuperman, Reichley & Bailey (2006).
19. **^** McGarry (2005).
20. **^** Bertini, Del Bimbo & Torniai (2006).
21. **^** Russell & Norvig (2021), pp. 272.
22. **^** Representing categories and relations: Semantic networks, description logics, inheritance (including frames, and scripts): Russell & Norvig (2021, §10.2 & 10.5), Poole, Mackworth & Goebel (1998, pp. 174–177), Luger & Stubblefield (2004, pp. 248–258), Nilsson (1998, chpt. 18.3)
23. **^** Representing events and time:Situation calculus, event calculus, fluent calculus (including solving the frame problem): Russell & Norvig (2021, §10.3), Poole, Mackworth & Goebel (1998, pp. 281–298), Nilsson (1998, chpt. 18.2)
24. **^** Causal calculus: Poole, Mackworth & Goebel (1998, pp. 335–337)
25. **^** Representing knowledge about knowledge: Belief calculus, modal logics: Russell & Norvig (2021, §10.4), Poole, Mackworth & Goebel (1998, pp. 275–277)
26. ^ _**a**_ _**b**_ Default reasoning, Frame problem, default logic, non-monotonic logics, circumscription, closed world assumption, abduction: Russell & Norvig (2021, §10.6), Poole, Mackworth & Goebel (1998, pp. 248–256, 323–335), Luger & Stubblefield (2004, pp. 335–363), Nilsson (1998, ~18.3.3) (Poole _et al._ places abduction under "default reasoning". Luger _et al._ places this under "uncertain reasoning").
27. ^ _**a**_ _**b**_ Breadth of commonsense knowledge: Lenat & Guha (1989, Introduction), Crevier (1993, pp. 113–114), Moravec (1988, p. 13), Russell & Norvig (2021, pp. 241, 385, 982) (qualification problem)
28. **^** Newquist (1994), p. 296.
29. **^** Crevier (1993), pp. 204–208.
30. **^** Russell & Norvig (2021), p. 528.
31. **^** Automated planning: Russell & Norvig (2021, chpt. 11).
32. **^** Automated decision making, Decision theory: Russell & Norvig (2021, chpt. 16–18).
33. **^** Classical planning: Russell & Norvig (2021, Section 11.2).
34. **^** Sensorless or "conformant" planning, contingent planning, replanning (a.k.a. online planning): Russell & Norvig (2021, Section 11.5).
35. **^** Trust, interpretability, and explainability: Russell & Norvig (2021, Section 19.9.4).
36. **^** Uncertain preferences: Russell & Norvig (2021, Section 16.7) Inverse reinforcement learning: Russell & Norvig (2021, Section 22.6)
37. **^** Information value theory: Russell & Norvig (2021, Section 16.6).
38. **^** Markov decision process: Russell & Norvig (2021, chpt. 17).
39. **^** Game theory and multi-agent decision theory: Russell & Norvig (2021, chpt. 18).
40. **^** Learning: Russell & Norvig (2021, chpt. 19–22), Poole, Mackworth & Goebel (1998, pp. 397–438), Luger & Stubblefield (2004, pp. 385–542), Nilsson (1998, chpt. 3.3, 10.3, 17.5, 20)
41. **^** Turing (1950).
42. **^** Solomonoff (1956).
43. **^** Unsupervised learning: Russell & Norvig (2021, pp. 653) (definition), Russell & Norvig (2021, pp. 738–740) (cluster analysis), Russell & Norvig (2021, pp. 846–860) (word embedding)
44. ^ _**a**_ _**b**_ Supervised learning: Russell & Norvig (2021, §19.2) (Definition), Russell & Norvig (2021, Chpt. 19–20) (Techniques)
45. **^** Reinforcement learning: Russell & Norvig (2021, chpt. 22), Luger & Stubblefield (2004, pp. 442–449)
46. **^** Transfer learning: Russell & Norvig (2021, pp. 281), The Economist (2016)
47. **^** "Artificial Intelligence (AI): What Is AI and How Does It Work?". _Built In_. Retrieved 30 October 2023.
48. **^** Computational learning theory: Russell & Norvig (2021, pp. 672–674), Jordan & Mitchell (2015)
49. **^** Natural language processing (NLP): Russell & Norvig (2021, chpt. 23–24), Poole, Mackworth & Goebel (1998, pp. 91–104), Luger & Stubblefield (2004, pp. 591–632)
50. **^** Subproblems of NLP: Russell & Norvig (2021, pp. 849–850)
51. **^** Russell & Norvig (2021), pp. 856–858.
52. **^** Dickson (2022).
53. **^** Modern statistical and deep learning approaches to NLP: Russell & Norvig (2021, chpt. 24), Cambria & White (2014)
54. **^** Vincent (2019).
55. **^** Russell & Norvig (2021), pp. 875–878.
56. **^** Bushwick (2023).
57. **^** Computer vision: Russell & Norvig (2021, chpt. 25), Nilsson (1998, chpt. 6)
58. **^** Russell & Norvig (2021), pp. 849–850.
59. **^** Russell & Norvig (2021), pp. 895–899.
60. **^** Russell & Norvig (2021), pp. 899–901.
61. **^** Challa et al. (2011).
62. **^** Russell & Norvig (2021), pp. 931–938.
63. **^** MIT AIL (2014).
64. **^** Affective computing: Thro (1993), Edelson (1991), Tao & Tan (2005), Scassellati (2002)
65. **^** Waddell (2018).
66. **^** Poria et al. (2017).
67. ^ _**a**_ _**b**_ Artificial general intelligence: Russell & Norvig (2021, pp. 32–33, 1020–1021) 
 Proposal for the modern version: Pennachin & Goertzel (2007) 
 Warnings of overspecialization in AI from leading researchers: Nilsson (1995), McCarthy (2007), Beal & Winston (2009)
68. **^** State space search: Russell & Norvig (2021, chpt. 3)
69. **^** Russell & Norvig (2021), sect. 11.2.
70. **^** Uninformed searches (breadth first search, depth-first search and general state space search): Russell & Norvig (2021, sect. 3.4), Poole, Mackworth & Goebel (1998, pp. 113–132), Luger & Stubblefield (2004, pp. 79–121), Nilsson (1998, chpt. 8)
71. **^** Heuristic or informed searches (e.g., greedy best first and A\*): Russell & Norvig (2021, sect. 3.5), Poole, Mackworth & Goebel (1998, pp. 132–147), Poole & Mackworth (2017, sect. 3.6), Luger & Stubblefield (2004, pp. 133–150)
72. **^** Adversarial search: Russell & Norvig (2021, chpt. 5)
73. **^** Local or "optimization" search: Russell & Norvig (2021, chpt. 4)
74. **^** Singh Chauhan, Nagesh (18 December 2020). "Optimization Algorithms in Neural Networks". _KDnuggets_. Retrieved 13 January 2024.
75. **^** Evolutionary computation: Russell & Norvig (2021, sect. 4.1.2)
76. **^** Merkle & Middendorf (2013).
77. **^** Logic: Russell & Norvig (2021, chpts. 6–9), Luger & Stubblefield (2004, pp. 35–77), Nilsson (1998, chpt. 13–16)
78. **^** Propositional logic: Russell & Norvig (2021, chpt. 6), Luger & Stubblefield (2004, pp. 45–50), Nilsson (1998, chpt. 13)
79. **^** First-order logic and features such as equality: Russell & Norvig (2021, chpt. 7), Poole, Mackworth & Goebel (1998, pp. 268–275), Luger & Stubblefield (2004, pp. 50–62), Nilsson (1998, chpt. 15)
80. **^** Logical inference: Russell & Norvig (2021, chpt. 10)
81. **^** logical deduction as search: Russell & Norvig (2021, sects. 9.3, 9.4), Poole, Mackworth & Goebel (1998, pp. ~46–52), Luger & Stubblefield (2004, pp. 62–73), Nilsson (1998, chpt. 4.2, 7.2)
82. **^** Resolution and unification: Russell & Norvig (2021, sections 7.5.2, 9.2, 9.5)
83. **^** Warren, D.H.; Pereira, L.M.; Pereira, F. (1977). "Prolog-the language and its implementation compared with Lisp". _ACM SIGPLAN Notices_. **12** (8): 109–115\. doi:10.1145/872734.806939.
84. **^** Fuzzy logic: Russell & Norvig (2021, pp. 214, 255, 459), Scientific American (1999)
85. ^ _**a**_ _**b**_ Stochastic methods for uncertain reasoning: Russell & Norvig (2021, chpt. 12–18, 20), Poole, Mackworth & Goebel (1998, pp. 345–395), Luger & Stubblefield (2004, pp. 165–191, 333–381), Nilsson (1998, chpt. 19)
86. **^** decision theory and decision analysis: Russell & Norvig (2021, chpt. 16–18), Poole, Mackworth & Goebel (1998, pp. 381–394)
87. **^** Information value theory: Russell & Norvig (2021, sect. 16.6)
88. **^** Markov decision processes and dynamic decision networks: Russell & Norvig (2021, chpt. 17)
89. ^ _**a**_ _**b**_ _**c**_ Stochastic temporal models: Russell & Norvig (2021, chpt. 14) Hidden Markov model: Russell & Norvig (2021, sect. 14.3) Kalman filters: Russell & Norvig (2021, sect. 14.4) Dynamic Bayesian networks: Russell & Norvig (2021, sect. 14.5)
90. **^** Game theory and mechanism design: Russell & Norvig (2021, chpt. 18)
91. **^** Bayesian networks: Russell & Norvig (2021, sects. 12.5–12.6, 13.4–13.5, 14.3–14.5, 16.5, 20.2–20.3), Poole, Mackworth & Goebel (1998, pp. 361–381), Luger & Stubblefield (2004, pp. ~182–190, ≈363–379), Nilsson (1998, chpt. 19.3–19.4)
92. **^** Domingos (2015), chpt. 6.
93. **^** Bayesian inference algorithm: Russell & Norvig (2021, sect. 13.3–13.5), Poole, Mackworth & Goebel (1998, pp. 361–381), Luger & Stubblefield (2004, pp. ~363–379), Nilsson (1998, chpt. 19.4 & 7)
94. **^** Domingos (2015), p. 210.
95. **^** Bayesian learning and the expectation–maximization algorithm: Russell & Norvig (2021, chpt. 20), Poole, Mackworth & Goebel (1998, pp. 424–433), Nilsson (1998, chpt. 20), Domingos (2015, p. 210)
96. **^** Bayesian decision theory and Bayesian decision networks: Russell & Norvig (2021, sect. 16.5)
97. **^** Statistical learning methods and classifiers: Russell & Norvig (2021, chpt. 20),
98. **^** Ciaramella, Alberto; Ciaramella, Marco (2024). _Introduction to Artificial Intelligence: from data analysis to generative AI_. Intellisemantic Editions. ISBN 978-8-8947-8760-3.
99. **^** Decision trees: Russell & Norvig (2021, sect. 19.3), Domingos (2015, p. 88)
100. **^** Non-parameteric learning models such as K-nearest neighbor and support vector machines: Russell & Norvig (2021, sect. 19.7), Domingos (2015, p. 187) (k-nearest neighbor)
 
 * Domingos (2015, p. 88) (kernel methods)
 
101. **^** Domingos (2015), p. 152.
102. **^** Naive Bayes classifier: Russell & Norvig (2021, sect. 12.6), Domingos (2015, p. 152)
103. ^ _**a**_ _**b**_ Neural networks: Russell & Norvig (2021, chpt. 21), Domingos (2015, Chapter 4)
104. **^** Gradient calculation in computational graphs, backpropagation, automatic differentiation: Russell & Norvig (2021, sect. 21.2), Luger & Stubblefield (2004, pp. 467–474), Nilsson (1998, chpt. 3.3)
105. **^** Universal approximation theorem: Russell & Norvig (2021, p. 752) The theorem: Cybenko (1988), Hornik, Stinchcombe & White (1989)
106. **^** Feedforward neural networks: Russell & Norvig (2021, sect. 21.1)
107. **^** Perceptrons: Russell & Norvig (2021, pp. 21, 22, 683, 22)
108. ^ _**a**_ _**b**_ Deep learning: Russell & Norvig (2021, chpt. 21), Goodfellow, Bengio & Courville (2016), Hinton _et al._ (2016), Schmidhuber (2015)
109. **^** Recurrent neural networks: Russell & Norvig (2021, sect. 21.6)
110. **^** Convolutional neural networks: Russell & Norvig (2021, sect. 21.3)
111. **^** Sindhu V, Nivedha S, Prakash M (February 2020). "An Empirical Science Research on Bioinformatics in Machine Learning". _Journal of Mechanics of Continua and Mathematical Sciences_ (7). doi:10.26782/jmcms.spl.7/2020.02.00006.
112. **^** Deng & Yu (2014), pp. 199–200.
113. **^** Ciresan, Meier & Schmidhuber (2012).
114. **^** Russell & Norvig (2021), p. 750.
115. ^ _**a**_ _**b**_ _**c**_ Russell & Norvig (2021), p. 17.
116. ^ _**a**_ _**b**_ _**c**_ _**d**_ _**e**_ _**f**_ _**g**_ Russell & Norvig (2021), p. 785.
117. ^ _**a**_ _**b**_ Schmidhuber (2022), sect. 5.
118. **^** Schmidhuber (2022), sect. 6.
119. ^ _**a**_ _**b**_ _**c**_ Schmidhuber (2022), sect. 7.
120. **^** Schmidhuber (2022), sect. 8.
121. **^** Quoted in Christian (2020, p. 22)
122. **^** Metz, Cade; Weise, Karen (5 May 2025). "A.I. Hallucinations Are Getting Worse, Even as New Systems Become More Powerful". _The New York Times_. ISSN 0362-4331. Retrieved 6 May 2025.
123. **^** Smith (2023).
124. **^** "Explained: Generative AI". _MIT News | Massachusetts Institute of Technology_. 9 November 2023.
125. **^** "AI Writing and Content Creation Tools". _MIT Sloan Teaching & Learning Technologies_. Archived from the original on 25 December 2023. Retrieved 25 December 2023.
126. **^** Marmouyet (2023).
127. **^** Kobielus (2019).
128. **^** Thomason, James (21 May 2024). "Mojo Rising: The resurgence of AI-first programming languages". _VentureBeat_. Archived from the original on 27 June 2024. Retrieved 26 May 2024.
129. **^** Wodecki, Ben (5 May 2023). "7 AI Programming Languages You Need to Know". _AI Business_. Archived from the original on 25 July 2024. Retrieved 5 October 2024.
130. **^** Plumb, Taryn (18 September 2024). "Why Jensen Huang and Marc Benioff see 'gigantic' opportunity for agentic AI". _VentureBeat_. Archived from the original on 5 October 2024. Retrieved 4 October 2024.
131. **^** Mims, Christopher (19 September 2020). "Huang's Law Is the New Moore's Law, and Explains Why Nvidia Wants Arm". _Wall Street Journal_. ISSN 0099-9660. Archived from the original on 2 October 2023. Retrieved 19 January 2025.
132. **^** Dankwa-Mullan, Irene (2024). "Health Equity and Ethical Considerations in Using Artificial Intelligence in Public Health and Medicine". _Preventing Chronic Disease_. **21** 240245: E64. doi:10.5888/pcd21.240245. ISSN 1545-1151. PMC 11364282. PMID 39173183.
133. **^** Jumper, J; Evans, R; Pritzel, A (2021). "Highly accurate protein structure prediction with AlphaFold". _Nature_. **596** (7873): 583–589\. Bibcode:2021Natur.596..583J. doi:10.1038/s41586-021-03819-2. PMC 8371605. PMID 34265844.
134. **^** "AI discovers new class of antibiotics to kill drug-resistant bacteria". _New Scientist_. 20 December 2023. Archived from the original on 16 September 2024. Retrieved 5 October 2024.
135. **^** "AI speeds up drug design for Parkinson's ten-fold". _University of Cambridge_. Cambridge University. 17 April 2024. Archived from the original on 5 October 2024. Retrieved 5 October 2024.
136. **^** Horne, Robert I.; Andrzejewska, Ewa A.; Alam, Parvez; Brotzakis, Z. Faidon; Srivastava, Ankit; Aubert, Alice; Nowinska, Magdalena; Gregory, Rebecca C.; Staats, Roxine; Possenti, Andrea; Chia, Sean; Sormanni, Pietro; Ghetti, Bernardino; Caughey, Byron; Knowles, Tuomas P. J.; Vendruscolo, Michele (17 April 2024). "Discovery of potent inhibitors of α-synuclein aggregation using structure-based iterative learning". _Nature Chemical Biology_. **20** (5). Nature: 634–645\. doi:10.1038/s41589-024-01580-x. PMC 11062903. PMID 38632492.
137. **^** Grant, Eugene F.; Lardner, Rex (25 July 1952). "The Talk of the Town – It". _The New Yorker_. ISSN 0028-792X. Archived from the original on 16 February 2020. Retrieved 28 January 2024.
138. **^** Anderson, Mark Robert (11 May 2017). "Twenty years on from Deep Blue vs Kasparov: how a chess match started the big data revolution". _The Conversation_. Archived from the original on 17 September 2024. Retrieved 28 January 2024.
139. **^** Markoff, John (16 February 2011). "Computer Wins on 'Jeopardy!': Trivial, It's Not". _The New York Times_. ISSN 0362-4331. Archived from the original on 22 October 2014. Retrieved 28 January 2024.
140. **^** Byford, Sam (27 May 2017). "AlphaGo retires from competitive Go after defeating world number one 3–0". _The Verge_. Archived from the original on 7 June 2017. Retrieved 28 January 2024.
141. **^** Brown, Noam; Sandholm, Tuomas (30 August 2019). "Superhuman AI for multiplayer poker". _Science_. **365** (6456): 885–890\. Bibcode:2019Sci...365..885B. doi:10.1126/science.aay2400. PMID 31296650.
142. **^** "MuZero: Mastering Go, chess, shogi and Atari without rules". _Google DeepMind_. 23 December 2020. Retrieved 28 January 2024.
143. **^** Sample, Ian (30 October 2019). "AI becomes grandmaster in 'fiendishly complex' StarCraft II". _The Guardian_. ISSN 0261-3077. Archived from the original on 29 December 2020. Retrieved 28 January 2024.
144. **^** Wurman, P. R.; Barrett, S.; Kawamoto, K. (2022). "Outracing champion Gran Turismo drivers with deep reinforcement learning" (PDF). _Nature_. **602** (7896): 223–228\. Bibcode:2022Natur.602..223W. doi:10.1038/s41586-021-04357-7. PMID 35140384.
145. **^** Wilkins, Alex (13 March 2024). "Google AI learns to play open-world video games by watching them". _New Scientist_. Archived from the original on 26 July 2024. Retrieved 21 July 2024.
146. **^** Franzen, Carl (8 August 2024). "Alibaba claims no. 1 spot in AI math models with Qwen2-Math". _VentureBeat_. Retrieved 16 February 2025.
147. **^** Franzen, Carl (9 January 2025). "Microsoft's new rStar-Math technique upgrades small models to outperform OpenAI's o1-preview at math problems". _VentureBeat_. Retrieved 26 January 2025.
148. **^** "AlphaEvolve Tackles Kissing Problem and More | AlphaEvolve made several mathematical discoveries and practical optimizations". _IEEE Spectrum_. 14 May 2025. Retrieved 7 June 2025.
149. **^** Roberts, Siobhan (25 July 2024). "AI achieves silver-medal standard solving International Mathematical Olympiad problems". _The New York Times_. Archived from the original on 26 September 2024. Retrieved 7 August 2024.
150. **^** Metz, Cade (21 July 2025). "Google A.I. System Wins Gold Medal in International Math Olympiad". _The New York Times_. ISSN 0362-4331. Retrieved 24 July 2025.
151. **^** M. Nicolas, J. Firzli: Pensions Age / European Pensions magazine, "Artificial Intelligence: Ask the Industry", May–June 2024. https://videovoice.org/ai-in-finance-innovation-entrepreneurship-vs-over-regulation-with-the-eus-artificial-intelligence-act-wont-work-as-intended/ Archived 11 September 2024 at the Wayback Machine.
152. ^ _**a**_ _**b**_ _**c**_ Congressional Research Service (2019). _Artificial Intelligence and National Security_ (PDF). Washington, DC: Congressional Research Service. Archived (PDF) from the original on 8 May 2020. Retrieved 25 February 2024.PD-notice
153. ^ _**a**_ _**b**_ Slyusar, Vadym (2019). Artificial intelligence as the basis of future control networks (Preprint). doi:10.13140/RG.2.2.30247.50087.
154. **^** Iraqi, Amjad (3 April 2024). "'Lavender': The AI machine directing Israel's bombing spree in Gaza". _+972 Magazine_. Archived from the original on 10 October 2024. Retrieved 6 April 2024.
155. **^** Davies, Harry; McKernan, Bethan; Sabbagh, Dan (1 December 2023). "'The Gospel': how Israel uses AI to select bombing targets in Gaza". _The Guardian_. Archived from the original on 6 December 2023. Retrieved 4 December 2023.
156. **^** Marti, J Werner (10 August 2024). "Drohnen haben den Krieg in der Ukraine revolutioniert, doch sie sind empfindlich auf Störsender – deshalb sollen sie jetzt autonom operieren". _Neue Zürcher Zeitung_ (in German). Archived from the original on 10 August 2024. Retrieved 10 August 2024.
157. **^** Banh, Leonardo; Strobel, Gero (2023). "Generative artificial intelligence". _Electronic Markets_. **33** (1) 63. doi:10.1007/s12525-023-00680-1.
158. **^** Pasick, Adam (27 March 2023). "Artificial Intelligence Glossary: Neural Networks and Other Terms Explained". _The New York Times_. ISSN 0362-4331. Archived from the original on 1 September 2023. Retrieved 22 April 2023.
159. **^** Griffith, Erin; Metz, Cade (27 January 2023). "Anthropic Said to Be Closing In on $300 Million in New A.I. Funding". _The New York Times_. Archived from the original on 9 December 2023. Retrieved 14 March 2023.
160. **^** Lanxon, Nate; Bass, Dina; Davalos, Jackie (10 March 2023). "A Cheat Sheet to AI Buzzwords and Their Meanings". _Bloomberg News_. Archived from the original on 17 November 2023. Retrieved 14 March 2023.
161. **^** Roose, Kevin (21 October 2022). "A Coming-Out Party for Generative A.I., Silicon Valley's New Craze". _The New York Times_. Archived from the original on 15 February 2023. Retrieved 14 March 2023.
162. **^** Shahaf, Tal; Shahaf, Tal (23 October 2025). "Lightricks unveils powerful AI video model challenging OpenAI and Google". _Ynetglobal_. Retrieved 22 December 2025.
163. **^** Metz, Cade (15 February 2024). "OpenAI Unveils A.I. That Instantly Generates Eye-Popping Videos". _The New York Times_. ISSN 0362-4331. Archived from the original on 15 February 2024. Retrieved 16 February 2024.
164. **^** Raza, Marium M.; Venkatesh, Kaushik P.; Kvedar, Joseph C. (7 March 2024). "Generative AI and large language models in health care: pathways to implementation". _npj Digital Medicine_. **7** (1): 62. doi:10.1038/s41746-023-00988-4. ISSN 2398-6352. PMC 10920625. PMID 38454007.
165. **^** Mogaji, Emmanuel (7 January 2025). "How generative AI is transforming financial services – and what it means for customers". _The Conversation_. Retrieved 10 April 2025.
166. **^** Bean, Thomas H. Davenport and Randy (19 June 2023). "The Impact of Generative AI on Hollywood and Entertainment". _MIT Sloan Management Review_. Archived from the original on 6 August 2024. Retrieved 10 April 2025.
167. **^** Brynjolfsson, Erik; Li, Danielle; Raymond, Lindsey R. (April 2023), _Generative AI at Work_ (Working Paper), Working Paper Series, doi:10.3386/w31161, archived from the original on 28 March 2024, retrieved 21 January 2024
168. **^** "Don't fear an AI-induced jobs apocalypse just yet". The Economist. 6 March 2023. Archived from the original on 17 November 2023. Retrieved 14 March 2023.
169. **^** Coyle, Jake (27 September 2023). "In Hollywood writers' battle against AI, humans win (for now)". _AP News_. Associated Press. Archived from the original on 3 April 2024. Retrieved 26 January 2024.
170. **^** "How Generative AI Can Augment Human Creativity". _Harvard Business Review_. 16 June 2023. ISSN 0017-8012. Archived from the original on 20 June 2023. Retrieved 20 June 2023.
171. **^** Poole, David; Mackworth, Alan (2023). _Artificial Intelligence, Foundations of Computational Agents_ (3rd ed.). Cambridge University Press. doi:10.1017/9781009258227. ISBN 978-1-0092-5819-7.
172. **^** Russell, Stuart; Norvig, Peter (2020). _Artificial Intelligence: A Modern Approach_ (4th ed.). Pearson. ISBN 978-0-1346-1099-3.
173. **^** "Why agents are the next frontier of generative AI". _McKinsey Digital_. 24 July 2024. Archived from the original on 3 October 2024. Retrieved 10 August 2024.
174. **^** Peters, Jay (14 March 2023). "The Bing AI bot has been secretly running GPT-4". _The Verge_. Retrieved 31 August 2025.
175. **^** Wiggers, Kyle; Levy, Karyne (20 May 2025). "Google I/O 2025: Everything announced at this year's developer conference". _TechCrunch_. Archived from the original on 15 January 2026. Retrieved 26 February 2026.
176. **^** Figueiredo, Mayara Costa; Ankrah, Elizabeth; Powell, Jacquelyn E.; Epstein, Daniel A.; Chen, Yunan (12 January 2024). "Powered by AI: Examining How AI Descriptions Influence Perceptions of Fertility Tracking Applications". _Proceedings of the ACM on Interactive, Mobile, Wearable and Ubiquitous Technologies_. **7** (4): 1–24\. doi:10.1145/3631414.
177. **^** Power, Jennifer; Pym, Tinonee; James, Alexandra; Waling, Andrea (5 July 2024). "Smart Sex Toys: A Narrative Review of Recent Research on Cultural, Health and Safety Considerations". _Current Sexual Health Reports_. **16** (3): 199–215\. doi:10.1007/s11930-024-00392-3. ISSN 1548-3592.
178. **^** Marcantonio, Tiffany L.; Avery, Gracie; Thrash, Anna; Leone, Ruschelle M. (10 September 2024). "Large Language Models in an App: Conducting a Qualitative Synthetic Data Analysis of How Snapchat's 'My AI' Responds to Questions About Sexual Consent, Sexual Refusals, Sexual Assault, and Sexting". _The Journal of Sex Research_. **62** (9): 1905–1919\. doi:10.1080/00224499.2024.2396457. PMC 11891083. PMID 39254628.
179. **^** Hanson, Kenneth R.; Bolthouse, Hannah (2024). ""Replika Removing Erotic Role-Play Is Like Grand Theft Auto Removing Guns or Cars": Reddit Discourse on Artificial Intelligence Chatbots and Sexual Technologies". _Socius: Sociological Research for a Dynamic World_. **10** 23780231241259627. doi:10.1177/23780231241259627. ISSN 2378-0231.
180. **^** Mania, Karolina (2024). "Legal Protection of Revenge and Deepfake Porn Victims in the European Union: Findings from a Comparative Legal Study". _Trauma, Violence, & Abuse_. **25** (1): 117–129\. doi:10.1177/15248380221143772. PMID 36565267.
181. **^** Singh, Suyesha; Nambiar, Vaishnavi (2024). "Role of Artificial Intelligence in the Prevention of Online Child Sexual Abuse: A Systematic Review of Literature". _Journal of Applied Security Research_. **19** (4): 586–627\. doi:10.1080/19361610.2024.2331885.
182. **^** Razi, Afsaneh; Kim, Seunghyun; Alsoubai, Ashwaq; Stringhini, Gianluca; Solorio, Thamar; De Choudhury, Munmun; Wisniewski, Pamela J. (13 October 2021). "A Human-Centered Systematic Literature Review of the Computational Approaches for Online Sexual Risk Detection". _Proceedings of the ACM on Human-Computer Interaction_. **5** (CSCW2): 1–38\. doi:10.1145/3479609.
183. **^** Ransbotham, Sam; Kiron, David; Gerbert, Philipp; Reeves, Martin (6 September 2017). "Reshaping Business With Artificial Intelligence". _MIT Sloan Management Review_. Archived from the original on 13 February 2024.
184. **^** Sun, Yuran; Zhao, Xilei; Lovreglio, Ruggiero; Kuligowski, Erica (2024). "AI for large-scale evacuation modeling: Promises and challenges". _Interpretable Machine Learning for the Analysis, Design, Assessment, and Informed Decision Making for Civil Infrastructure_. pp. 185–204\. doi:10.1016/B978-0-12-824073-1.00014-9. ISBN 978-0-12-824073-1.
185. **^** Gomaa, Islam; Adelzadeh, Masoud; Gwynne, Steven; Spencer, Bruce; Ko, Yoon; Bénichou, Noureddine; Ma, Chunyun; Elsagan, Nour; Duong, Dana; Zalok, Ehab; Kinateder, Max (1 November 2021). "A Framework for Intelligent Fire Detection and Evacuation System". _Fire Technology_. **57** (6): 3179–3185\. doi:10.1007/s10694-021-01157-3.
186. **^** Zhao, Xilei; Lovreglio, Ruggiero; Nilsson, Daniel (1 May 2020). "Modelling and interpreting pre-evacuation decision-making using machine learning". _Automation in Construction_. **113** 103140. doi:10.1016/j.autcon.2020.103140. hdl:10179/17315.
187. **^** "India's latest election embraced AI technology. Here are some ways it was used constructively". _PBS News_. 12 June 2024. Archived from the original on 17 September 2024. Retrieved 28 October 2024.
188. **^** "Экономист Дарон Асемоглу написал книгу об угрозах искусственного интеллекта — и о том, как правильное управление может обратить его на пользу человечеству Спецкор "Медузы" Маргарита Лютова узнала у ученого, как скоро мир сможет приблизиться к этой утопии". _Meduza_ (in Russian). Archived from the original on 20 June 2023. Retrieved 21 June 2023.
189. **^** "Learning, thinking, artistic collaboration and other such human endeavours in the age of AI". _The Hindu_. 2 June 2023. Archived from the original on 21 June 2023. Retrieved 21 June 2023.
190. **^** Müller, Vincent C. (30 April 2020). "Ethics of Artificial Intelligence and Robotics". _Stanford Encyclopedia of Philosophy Archive_. Archived from the original on 5 October 2024. Retrieved 5 October 2024.
191. **^** Simonite (2016).
192. **^** Russell & Norvig (2021), p. 987.
193. **^** "Assessing potential future artificial intelligence risks, benefits and policy imperatives". _OECD_. 14 November 2024. Retrieved 1 August 2025.
194. **^** Laskowski (2023).
195. **^** GAO (2022).
196. **^** Valinsky (2019).
197. **^** Russell & Norvig (2021), p. 991.
198. **^** Russell & Norvig (2021), pp. 991–992.
199. **^** Christian (2020), p. 63.
200. **^** Vincent (2022).
201. **^** Kopel, Matthew. "Copyright Services: Fair Use". _Cornell University Library_. Archived from the original on 26 September 2024. Retrieved 26 April 2024.
202. **^** Burgess, Matt. "How to Stop Your Data From Being Used to Train AI". _Wired_. ISSN 1059-1028. Archived from the original on 3 October 2024. Retrieved 26 April 2024.
203. **^** "Exclusive: Multiple AI companies bypassing web standard to scrape publisher sites, licensing firm says". _Reuters_. Archived from the original on 10 November 2024. Retrieved 13 November 2025.
204. **^** Shilov, Anton (21 June 2024). "Several AI companies said to be ignoring robots dot txt exclusion, scraping content without permission: report". _Tom's Hardware_. Retrieved 13 November 2025.
205. **^** Reisner (2023).
206. **^** Alter & Harris (2023).
207. **^** "Getting the Innovation Ecosystem Ready for AI. An IP policy toolkit" (PDF). _WIPO_.
208. **^** Hammond, George (27 December 2023). "Big Tech is spending more than VC firms on AI startups". _Ars Technica_. Archived from the original on 10 January 2024.
209. **^** Wong, Matteo (24 October 2023). "The Future of AI Is GOMA". _The Atlantic_. Archived from the original on 5 January 2024.
210. **^** "Big tech and the pursuit of AI dominance". _The Economist_. 26 March 2023. Archived from the original on 29 December 2023.
211. **^** Fung, Brian (19 December 2023). "Where the battle to dominate AI may be won". _CNN Business_. Archived from the original on 13 January 2024.
212. **^** Metz, Cade (5 July 2023). "In the Age of A.I., Tech's Little Guys Need Big Friends". _The New York Times_. Archived from the original on 8 July 2024. Retrieved 5 October 2024.
213. **^** Bhattarai, Abha; Lerman, Rachel (25 December 2025). "10 charts that show where the economy is heading / 3. AI related investments". _The Washington Post_. Source: MSCI
214. **^** Coren, Michael (24 March 2026). "How to get Big Tech to pay your energy bills". _The Washington Post_.
215. **^** "Electricity 2024 – Analysis and Forecast to 2026". _IEA_. 24 January 2024. Retrieved 13 July 2024.
216. **^** Calvert, Brian (28 March 2024). "AI already uses as much energy as a small country. It's only the beginning". _Vox_. New York, New York. Archived from the original on 3 July 2024. Retrieved 5 October 2024.
217. **^** Halper, Evan; O'Donovan, Caroline (21 June 2024). "AI is exhausting the power grid. Tech firms are seeking a miracle solution". _The Washington Post_.
218. **^** Davenport, Carly. "AI Data Centers and the Coming YS Power Demand Surge" (PDF). _Goldman Sachs_. Archived from the original (PDF) on 26 July 2024. Retrieved 5 October 2024.
219. **^** Ryan, Carol (12 April 2024). "Energy-Guzzling AI Is Also the Future of Energy Savings". _Wall Street Journal_. Dow Jones.
220. **^** Hiller, Jennifer (1 July 2024). "Tech Industry Wants to Lock Up Nuclear Power for AI". _Wall Street Journal_. Dow Jones. Archived from the original on 5 October 2024. Retrieved 5 October 2024.
221. **^** Halper, Evan (20 September 2024). "Microsoft deal would reopen Three Mile Island nuclear plant to power AI". _Washington Post_.
222. **^** Hiller, Jennifer (20 September 2024). "Three Mile Island's Nuclear Plant to Reopen, Help Power Microsoft's AI Centers". _Wall Street Journal_. Dow Jones. Archived from the original on 5 October 2024. Retrieved 5 October 2024.
223. ^ _**a**_ _**b**_ _**c**_ Niva Yadav (19 August 2024). "Taiwan to stop large data centers in the North, cites insufficient power". DatacenterDynamics. Archived from the original on 8 November 2024. Retrieved 7 November 2024.
224. **^** Mochizuki, Takashi; Oda, Shoko (18 October 2024). "エヌビディア出資の日本企業、原発近くでΑIデータセンター新設検討". _Bloomberg_ (in Japanese). Archived from the original on 8 November 2024. Retrieved 7 November 2024.
225. ^ _**a**_ _**b**_ Naureen S Malik and Will Wade (5 November 2024). "Nuclear-Hungry AI Campuses Need New Plan to Find Power Fast". Bloomberg.
226. **^** "Energy and AI Executive summary". _International Energy Agency_. Retrieved 10 April 2025.
227. **^** Nicas (2018).
228. **^** Rainie, Lee; Keeter, Scott; Perrin, Andrew (22 July 2019). "Trust and Distrust in America". _Pew Research Center_. Archived from the original on 22 February 2024.
229. **^** Kosoff, Maya (8 February 2018). "YouTube Struggles to Contain Its Conspiracy Problem". _Vanity Fair_. Retrieved 10 April 2025.
230. **^** Berry, David M. (19 March 2025). "Synthetic media and computational capitalism: towards a critical theory of artificial intelligence". _AI & Society_. **40** (7): 5257–5269\. doi:10.1007/s00146-025-02265-2. ISSN 1435-5655.
231. **^** "Unreal: A quantum leap in AI video". _The Week_. 17 June 2025. Retrieved 20 June 2025.
232. **^** Snow, Jackie (16 June 2025). "AI video is getting real. Beware what comes next". _Quartz_. Retrieved 20 June 2025.
233. **^** Chow, Andrew R.; Perrigo, Billy (3 June 2025). "Google's New AI Tool Generates Convincing Deepfakes of Riots, Conflict, and Election Fraud". _Time_. Retrieved 20 June 2025.
234. **^** Williams (2023).
235. **^** Olanipekun, Samson Olufemi (2025). "Computational propaganda and misinformation: AI technologies as tools of media manipulation". _World Journal of Advanced Research and Reviews_. **25** (1): 911–923\. doi:10.30574/wjarr.2025.25.1.0131. ISSN 2581-9615.
236. **^** Taylor & Hern (2023).
237. **^** Lin, Hause; Czarnek, Gabriela; Lewis, Benjamin; White, Joshua P.; Berinsky, Adam J.; Costello, Thomas; Pennycook, Gordon; Rand, David G. (2025). "Persuading voters using human–artificial intelligence dialogues". _Nature_. **648** (8093): 394–401\. Bibcode:2025Natur.648..394L. doi:10.1038/s41586-025-09771-9. PMID 41345316.
238. **^** "To fight AI, we need 'personhood credentials,' say AI firms". _The Register_. 3 September 2024. Archived from the original on 24 April 2025. Retrieved 9 May 2025.
239. ^ _**a**_ _**b**_ Samuel, Sigal (19 April 2022). "Why it's so damn hard to make AI fair and unbiased". _Vox_. Archived from the original on 5 October 2024. Retrieved 24 July 2024.
240. ^ _**a**_ _**b**_ Rose (2023).
241. **^** CNA (2019).
242. **^** Mazeika, Mantas; Yin, Xuwang; Tamirisa, Rishub; Lim, Jaehyuk; Lee, Bruce W.; Ren, Richard; Phan, Long; Mu, Norman; Khoja, Adam (2025), _Utility Engineering: Analyzing and Controlling Emergent Value Systems in AIs_, Figure 16, arXiv:2502.08640
243. **^** Goffrey (2008), p. 17.
244. **^** Berdahl et al. (2023); Goffrey (2008, p. 17); Rose (2023); Russell & Norvig (2021, p. 995)
245. **^** Christian (2020), p. 25.
246. ^ _**a**_ _**b**_ Russell & Norvig (2021), p. 995.
247. **^** Grant & Hill (2023).
248. **^** Larson & Angwin (2016).
249. **^** Christian (2020), p. 67–70.
250. **^** Christian (2020, pp. 67–70); Russell & Norvig (2021, pp. 993–994)
251. **^** Russell & Norvig (2021, p. 995); Lipartito (2011, p. 36); Goodman & Flaxman (2017, p. 6); Christian (2020, pp. 39–40, 65)
252. **^** Quoted in Christian (2020, p. 65).
253. **^** Russell & Norvig (2021, p. 994); Christian (2020, pp. 40, 80–81)
254. **^** Quoted in Christian (2020, p. 80)
255. **^** Hundt, Andrew; Agnew, William; Zeng, Vicky; Kacianka, Severin; Gombolay, Matthew (21–24 June 2022). "Robots Enact Malignant Stereotypes". _Proceedings of the 2022 ACM Conference on Fairness, Accountability, and Transparency (FAccT '22)_. Seoul, South Korea: Association for Computing Machinery. doi:10.1145/3531146.3533138.
256. **^** For accessible summaries, see the Georgia Tech release and ScienceDaily coverage of the study's findings."Flawed AI Makes Robots Racist, Sexist". _Georgia Tech Research News_. 23 June 2022.
257. **^** "Robots turn racist and sexist with flawed AI, study finds". _ScienceDaily_. 21 June 2022.
258. **^** Sample (2017).
259. **^** "Black Box AI". 16 June 2023. Archived from the original on 15 June 2024. Retrieved 5 October 2024.
260. **^** Christian (2020), p. 110.
261. **^** Christian (2020), pp. 88–91.
262. **^** Christian (2020, p. 83); Russell & Norvig (2021, p. 997)
263. **^** Christian (2020), p. 91.
264. **^** Christian (2020), p. 83.
265. **^** Verma (2021).
266. **^** Rothman (2020).
267. **^** Christian (2020), pp. 105–108.
268. **^** Christian (2020), pp. 108–112.
269. **^** Ropek, Lucas (21 May 2024). "New Anthropic Research Sheds Light on AI's 'Black Box'". _Gizmodo_. Archived from the original on 5 October 2024. Retrieved 23 May 2024.
270. **^** Russell & Norvig (2021), p. 989.
271. ^ _**a**_ _**b**_ Russell & Norvig (2021), pp. 987–990.
272. **^** Russell & Norvig (2021), p. 988.
273. **^** Robitzski (2018); Sainato (2015)
274. **^** Harari (2018).
275. **^** Buckley, Chris; Mozur, Paul (22 May 2019). "How China Uses High-Tech Surveillance to Subdue Minorities". _The New York Times_. Archived from the original on 25 November 2019. Retrieved 2 July 2019.
276. **^** Whittaker, Zack (3 May 2019). "Security lapse exposed a Chinese smart city surveillance system". _TechCrunch_. Archived from the original on 7 March 2021. Retrieved 14 September 2020.
277. **^** Urbina et al. (2022).
278. ^ _**a**_ _**b**_ McGaughey (2022).
279. **^** Ford & Colvin (2015);McGaughey (2022)
280. **^** IGM Chicago (2017).
281. **^** Arntz, Gregory & Zierahn (2016), p. 33.
282. **^** Lohr (2017); Frey & Osborne (2017); Arntz, Gregory & Zierahn (2016, p. 33)
283. **^** Zhou, Viola (11 April 2023). "AI is already taking video game illustrators' jobs in China". _Rest of World_. Archived from the original on 21 February 2024. Retrieved 17 August 2023.
284. **^** Carter, Justin (11 April 2023). "China's game art industry reportedly decimated by growing AI use". _Game Developer_. Archived from the original on 17 August 2023. Retrieved 17 August 2023.
285. **^** "Canaries in the Coal Mine? Six Facts about the Recent Employment Effects of Artificial Intelligence". _Stanford Digital Economy Lab_. 2026. Retrieved 6 March 2026.
286. **^** Morgenstern (2015).
287. **^** Mahdawi (2017); Thompson (2014)
288. **^** Ma, Jason (5 July 2025). "Ford CEO Jim Farley warns AI will wipe out half of white-collar jobs, but the 'essential economy' has a huge shortage of workers". _Fortune_. Retrieved 21 October 2025.
289. **^** Tarnoff, Ben (4 August 2023). "Lessons from Eliza". _The Guardian Weekly_. pp. 34–39.
290. **^** Kühne, Rinaldo; Peter, Jochen (2023). "Anthropomorphism in human–robot interactions: a multidimensional conceptualization". _Communication Theory_. **33** (1): 42–52\. doi:10.1093/ct/qtac020.
291. **^** Reeves, Byron; Nass, Clifford (1996). _The Media Equation: How People Treat Computers, Television, and New Media Like Real People and Places_. New York: Cambridge University Press. ISBN 978-1-57586-053-4.
292. **^** Nass, Clifford; Moon, Youngme (2000). "Machines and mindlessness: Social responses to computers". _Journal of Social Issues_. **56** (1): 81–103\. doi:10.1111/0022-4537.00153.
293. **^** Salles, Arleen; Evers, Kathinka; Farisco, Michele (2020). "Anthropomorphism in AI". _AJOB Neuroscience_. 2020 Vol 11 (2): 88–95\. doi:10.1080/21507740.2020.1740350. PMID 32228388. An additional concern is that socialization with entities that are not truly social, even if designed to offer new tools for enriching users' emotional life and even if beneficial in some specific cases (for example, when enhancing the well-being of those who would otherwise be social outcasts) is not truly meaningful and it can only limitedly replace the richness of human interactions.... Another common objection to anthropomorphism by design is that it is deceptive insofar as it would appear that in order to meet specific, e.g. emotional or social needs, AI must actually "fool" users by making them believe that they have the capacity to engage emotionally
294. **^** Jargon, Julie (4 March 2026). "Gemini Said They Could Only Be Together if He Killed Himself. Soon, He Was Dead". _Wall Street Journal_. Retrieved 27 March 2026.
295. **^** Watwe, Shweta (15 October 2025). "AI Chatbot Suits Open New Frontier in Debate Over Online Speech". _Bloomberg Law_. Retrieved 27 March 2026.
296. **^** Cellan-Jones (2014).
297. **^** Russell & Norvig 2021, p. 1001.
298. **^** Bostrom (2014).
299. **^** Russell (2019).
300. **^** Bostrom (2014); Müller & Bostrom (2014); Bostrom (2015).
301. **^** Harari (2023).
302. **^** Stewart (2025).
303. **^** Müller & Bostrom (2014).
304. **^** Leaders' concerns about the existential risks of AI around 2015: Rawlinson (2015), Holley (2015), Gibbs (2014), Sainato (2015)
305. **^** ""Godfather of artificial intelligence" talks impact and potential of new AI". _CBS News_. 25 March 2023. Archived from the original on 28 March 2023. Retrieved 28 March 2023.
306. **^** Pittis, Don (4 May 2023). "Canadian artificial intelligence leader Geoffrey Hinton piles on fears of computer takeover". _CBC_. Archived from the original on 7 July 2024. Retrieved 5 October 2024.
307. **^** "'50–50 chance' that AI outsmarts humanity, Geoffrey Hinton says". _Bloomberg BNN_. 14 June 2024. Archived from the original on 14 June 2024. Retrieved 6 July 2024.
308. **^** Valance (2023).
309. **^** Taylor, Josh (7 May 2023). "Rise of artificial intelligence is inevitable but should not be feared, 'father of AI' says". _The Guardian_. Archived from the original on 23 October 2023. Retrieved 26 May 2023.
310. **^** Colton, Emma (7 May 2023). "'Father of AI' says tech fears misplaced: 'You cannot stop it'". _Fox News_. Archived from the original on 26 May 2023. Retrieved 26 May 2023.
311. **^** Jones, Hessie (23 May 2023). "Juergen Schmidhuber, Renowned 'Father Of Modern AI,' Says His Life's Work Won't Lead To Dystopia". _Forbes_. Archived from the original on 26 May 2023. Retrieved 26 May 2023.
312. **^** McMorrow, Ryan (19 December 2023). "Andrew Ng: 'Do we think the world is better off with more or less intelligence?'". _Financial Times_. Archived from the original on 25 January 2024. Retrieved 30 December 2023.
313. **^** Will Douglas Heaven (2 May 2023). "Geoffrey Hinton tells us why he's now scared of the tech he helped build". _MIT Technology Review_. Ideas AI. Retrieved 4 January 2026.
314. **^** Levy, Steven (22 December 2023). "How Not to Be Stupid About AI, With Yann LeCun". _Wired_. Archived from the original on 28 December 2023. Retrieved 30 December 2023.
315. **^** Arguments that AI is not an imminent risk: Brooks (2014), Geist (2015), Madrigal (2015), Lee (2014)
316. ^ _**a**_ _**b**_ Christian (2020), pp. 67, 73.
317. **^** Yudkowsky (2008).
318. ^ _**a**_ _**b**_ Anderson & Anderson (2011).
319. **^** AAAI (2014).
320. **^** Wallach (2010).
321. **^** Russell (2019), p. 173.
322. **^** Stewart, Ashley; Melton, Monica. "Hugging Face CEO says he's focused on building a 'sustainable model' for the $4.5 billion open-source-AI startup". _Business Insider_. Archived from the original on 25 September 2024. Retrieved 14 April 2024.
323. **^** Wiggers, Kyle (9 April 2024). "Google open sources tools to support AI model development". _TechCrunch_. Archived from the original on 10 September 2024. Retrieved 14 April 2024.
324. **^** Heaven, Will Douglas (12 May 2023). "The open-source AI boom is built on Big Tech's handouts. How long will it last?". _MIT Technology Review_. Retrieved 14 April 2024.
325. **^** Brodsky, Sascha (19 December 2023). "Mistral AI's New Language Model Aims for Open Source Supremacy". _AI Business_. Archived from the original on 5 September 2024. Retrieved 5 October 2024.
326. **^** Edwards, Benj (22 February 2024). "Stability announces Stable Diffusion 3, a next-gen AI image generator". _Ars Technica_. Archived from the original on 5 October 2024. Retrieved 14 April 2024.
327. **^** Marshall, Matt (29 January 2024). "How enterprises are using open source LLMs: 16 examples". _VentureBeat_. Archived from the original on 26 September 2024. Retrieved 5 October 2024.
328. **^** Piper, Kelsey (2 February 2024). "Should we make our most powerful AI models open source to all?". _Vox_. Archived from the original on 5 October 2024. Retrieved 14 April 2024.
329. **^** Alan Turing Institute (2019). "Understanding artificial intelligence ethics and safety" (PDF). Archived (PDF) from the original on 11 September 2024. Retrieved 5 October 2024.
330. **^** Alan Turing Institute (2023). "AI Ethics and Governance in Practice" (PDF). Archived (PDF) from the original on 11 September 2024. Retrieved 5 October 2024.
331. **^** Floridi, Luciano; Cowls, Josh (23 June 2019). "A Unified Framework of Five Principles for AI in Society". _Harvard Data Science Review_. **1** (1). doi:10.1162/99608f92.8cd550d1.
332. **^** Buruk, Banu; Ekmekci, Perihan Elif; Arda, Berna (1 September 2020). "A critical perspective on guidelines for responsible and trustworthy artificial intelligence". _Medicine, Health Care and Philosophy_. **23** (3): 387–399\. doi:10.1007/s11019-020-09948-1. PMID 32236794.
333. **^** Kamila, Manoj Kumar; Jasrotia, Sahil Singh (1 January 2023). "Ethical issues in the development of artificial intelligence: recognizing the risks". _International Journal of Ethics and Systems_. **41** (ahead-of-print): 45–63\. doi:10.1108/IJOES-05-2023-0107.
334. **^** "AI Safety Institute releases new AI safety evaluations platform". UK Government. 10 May 2024. Archived from the original on 5 October 2024. Retrieved 14 May 2024.
335. **^** Regulation of AI to mitigate risks: Berryhill et al. (2019), Barfield & Pagallo (2018), Iphofen & Kritikos (2019), Wirtz, Weyerer & Geyer (2018), Buiten (2019)
336. **^** Law Library of Congress (U.S.). Global Legal Research Directorate (2019).
337. ^ _**a**_ _**b**_ Vincent (2023).
338. **^** Stanford University (2023).
339. ^ _**a**_ _**b**_ _**c**_ _**d**_ UNESCO (2021).
340. **^** Kissinger (2021).
341. **^** Altman, Brockman & Sutskever (2023).
342. **^** n.a. (25 October 2023). "UN Announces Advisory Body on Artificial Intelligence". _Voice of America_. Archived from the original on 18 September 2024. Retrieved 5 October 2024.
343. **^** "AI Act enters into force". _European Commission_. Retrieved 11 August 2025.
344. **^** "Council of Europe opens first ever global treaty on AI for signature". _Council of Europe_. 5 September 2024. Archived from the original on 17 September 2024. Retrieved 17 September 2024.
345. **^** Edwards (2023).
346. **^** Kasperowicz (2023).
347. **^** Fox News (2023).
348. **^** Milmo, Dan (3 November 2023). "Hope or Horror? The great AI debate dividing its pioneers". _The Guardian Weekly_. pp. 10–12.
349. **^** "The Bletchley Declaration by Countries Attending the AI Safety Summit, 1–2 November 2023". _GOV.UK_. 1 November 2023. Archived from the original on 1 November 2023. Retrieved 2 November 2023.
350. **^** "Countries agree to safe and responsible development of frontier AI in landmark Bletchley Declaration". _GOV.UK_ (Press release). Archived from the original on 1 November 2023. Retrieved 1 November 2023.
351. **^** "Second global AI summit secures safety commitments from companies". Reuters. 21 May 2024. Retrieved 23 May 2024.
352. **^** "Frontier AI Safety Commitments, AI Seoul Summit 2024". gov.uk. 21 May 2024. Archived from the original on 23 May 2024. Retrieved 23 May 2024.
353. **^** "UN launches independent scientific panel on artificial intelligence". UN News. 3 March 2026. Retrieved 7 March 2026.
354. ^ _**a**_ _**b**_ Buntz, Brian (3 November 2024). "Quality vs. quantity: US and China chart different paths in global AI patent race in 2024 / Geographical breakdown of AI patents in 2024". _Research & Development World_. R&D World. Archived from the original on 9 December 2024.
355. ^ _**a**_ _**b**_ Russell & Norvig 2021, p. 9.
356. ^ _**a**_ _**b**_ _**c**_ Copeland, J., ed. (2004). _The Essential Turing: the ideas that gave birth to the computer age_. Oxford, England: Clarendon Press. ISBN 0-1982-5079-7.
357. **^** "Google books ngram". Archived from the original on 5 October 2024. Retrieved 5 October 2024.
358. **^** AI's immediate precursors: McCorduck (2004, pp. 51–107), Crevier (1993, pp. 27–32), Russell & Norvig (2021, pp. 8–17), Moravec (1988, p. 3)
359. ^ _**a**_ _**b**_ Turing's original publication of the Turing test in "Computing machinery and intelligence": Turing (1950) Historical influence and philosophical implications: Haugeland (1985, pp. 6–9), Crevier (1993, p. 24), McCorduck (2004, pp. 70–71), Russell & Norvig (2021, pp. 2, 984)
360. **^** Crevier (1993), pp. 47–49.
361. **^** Russell & Norvig (2003), p. 17.
362. **^** Russell & Norvig (2003), p. 18.
363. **^** Newquist (1994), pp. 86–86.
364. **^** Simon (1965, p. 96) quoted in Crevier (1993, p. 109)
365. **^** Minsky (1967, p. 2) quoted in Crevier (1993, p. 109)
366. **^** Russell & Norvig (2021), p. 21.
367. **^** Lighthill (1973).
368. **^** NRC 1999, pp. 212–213.
369. **^** Russell & Norvig (2021), p. 22.
370. **^** Expert systems: Russell & Norvig (2021, pp. 23, 292), Luger & Stubblefield (2004, pp. 227–331), Nilsson (1998, chpt. 17.4), McCorduck (2004, pp. 327–335, 434–435), Crevier (1993, pp. 145–162, 197–203), Newquist (1994, pp. 155–183)
371. **^** Russell & Norvig (2021), p. 24.
372. **^** Nilsson (1998), p. 7.
373. **^** McCorduck (2004), pp. 454–462.
374. **^** Moravec (1988).
375. ^ _**a**_ _**b**_ Brooks (1990).
376. **^** Developmental robotics: Weng et al. (2001), Lungarella et al. (2003), Asada et al. (2009), Oudeyer (2010)
377. **^** Russell & Norvig (2021), p. 25.
378. **^** Crevier (1993, pp. 214–215), Russell & Norvig (2021, pp. 24, 26)
379. **^** Russell & Norvig (2021), p. 26.
380. **^** Formal and narrow methods adopted in the 1990s: Russell & Norvig (2021, pp. 24–26), McCorduck (2004, pp. 486–487)
381. **^** AI widely used in the late 1990s: Kurzweil (2005, p. 265), NRC (1999, pp. 216–222), Newquist (1994, pp. 189–201)
382. **^** Wong (2023).
383. **^** Moore's Law and AI: Russell & Norvig (2021, pp. 14, 27)
384. ^ _**a**_ _**b**_ _**c**_ Clark (2015b).
385. **^** Big data: Russell & Norvig (2021, p. 26)
386. **^** Sagar, Ram (3 June 2020). "OpenAI Releases GPT-3, The Largest Model So Far". _Analytics India Magazine_. Archived from the original on 4 August 2020. Retrieved 15 March 2023.
387. **^** Milmo, Dan (2 February 2023). "ChatGPT reaches 100 million users two months after launch". _The Guardian_. ISSN 0261-3077. Archived from the original on 3 February 2023. Retrieved 31 December 2024.
388. **^** Gorichanaz, Tim (29 November 2023). "ChatGPT turns 1: AI chatbot's success says as much about humans as technology". _The Conversation_. Archived from the original on 31 December 2024. Retrieved 31 December 2024.
389. **^** DiFeliciantonio (2023).
390. **^** Goswami (2023).
391. **^** "Nearly 1 in 4 new startups is an AI company". _PitchBook_. 24 December 2024. Retrieved 3 January 2025.
392. **^** Grayling, Anthony; Ball, Brian (1 August 2024). "Philosophy is crucial in the age of AI". _The Conversation_. Archived from the original on 5 October 2024. Retrieved 4 October 2024.
393. ^ _**a**_ _**b**_ Jarow, Oshan (15 June 2024). "Will AI ever become conscious? It depends on how you think about biology". _Vox_. Archived from the original on 21 September 2024. Retrieved 4 October 2024.
394. **^** McCarthy, John. "The Philosophy of AI and the AI of Philosophy". _jmc.stanford.edu_. Archived from the original on 23 October 2018. Retrieved 3 October 2024.
395. ^ _**a**_ _**b**_ Turing (1950), p. 1.
396. **^** Turing (1950), Under "The Argument from Consciousness".
397. **^** Kirk-Giannini, Cameron Domenico; Goldstein, Simon (16 October 2023). "AI is closer than ever to passing the Turing test for 'intelligence'. What happens when it does?". _The Conversation_. Archived from the original on 25 September 2024. Retrieved 17 August 2024.
398. **^** Russell & Norvig (2021), p. 3.
399. **^** Maker (2006).
400. **^** McCarthy (1999).
401. **^** Minsky (1986).
402. **^** Suchman, Lucy (2023). "The uncontroversial 'thingness' of AI". _Big Data & Society_. **10** (2) 20539517231206794. doi:10.1177/20539517231206794.
403. **^** Rehak, Rainer (2025). "AI Narrative Breakdown. A Critical Assessment of Power and Promise". _Proceedings of the 2025 ACM Conference on Fairness, Accountability, and Transparency_. pp. 1250–1260\. doi:10.1145/3715275.3732083. ISBN 979-8-4007-1482-5.
404. **^** Musser, George (1 September 2023). "How AI Knows Things No One Told It". _Scientific American_. Retrieved 17 July 2025.
405. **^** "AI or BS? How to tell if a marketing tool really uses artificial intelligence". _The Drum_. 30 March 2023. Retrieved 31 July 2024.
406. **^** _Information technology - Artificial intelligence - Artificial intelligence concepts and terminology_, BSI British Standards, doi:10.3403/30467396
407. **^** "Regulation - EU - 2024/1689 - EN". _EUR-Lex_. Retrieved 30 January 2026.
408. **^** Tabassi, Elham (26 January 2023). Artificial Intelligence Risk Management Framework (AI RMF 1.0) (Report). Gaithersburg, MD: National Institute of Standards and Technology (U.S.). doi:10.6028/nist.ai.100-1.
409. **^** Nilsson (1983), p. 10.
410. **^** Haugeland (1985), pp. 112–117.
411. **^** Physical symbol system hypothesis: Newell & Simon (1976, p. 116) Historical significance: McCorduck (2004, p. 153), Russell & Norvig (2021, p. 19)
412. **^** Moravec's paradox: Moravec (1988, pp. 15–16), Minsky (1986, p. 29), Pinker (2007, pp. 190–191)
413. **^** Dreyfus' critique of AI: Dreyfus (1972), Dreyfus & Dreyfus (1986) Historical significance and philosophical implications: Crevier (1993, pp. 120–132), McCorduck (2004, pp. 211–239), Russell & Norvig (2021, pp. 981–982), Fearn (2007, chpt. 3)
414. **^** Crevier (1993), p. 125.
415. **^** Langley (2011).
416. **^** Katz (2012).
417. **^** Neats vs. scruffies, the historic debate: McCorduck (2004, pp. 421–424, 486–489), Crevier (1993, p. 168), Nilsson (1983, pp. 10–11), Russell & Norvig (2021, p. 24) A classic example of the "scruffy" approach to intelligence: Minsky (1986) A modern example of neat AI and its aspirations in the 21st century: Domingos (2015)
418. **^** Pennachin & Goertzel (2007).
419. ^ _**a**_ _**b**_ Roberts (2016).
420. **^** Russell & Norvig (2021), p. 986.
421. **^** Chalmers (1995).
422. **^** Dennett (1991).
423. **^** Horst (2005).
424. **^** Searle (1999).
425. **^** Searle (1980), p. 1.
426. **^** Russell & Norvig (2021), p. 9817.
427. **^** Searle's Chinese room argument: Searle (1980). Searle's original presentation of the thought experiment., Searle (1999). Discussion: Russell & Norvig (2021, pp. 985), McCorduck (2004, pp. 443–445), Crevier (1993, pp. 269–271)
428. **^** Leith, Sam (7 July 2022). "Nick Bostrom: How can we be certain a machine isn't conscious?". _The Spectator_. Archived from the original on 26 September 2024. Retrieved 23 February 2024.
429. ^ _**a**_ _**b**_ _**c**_ Thomson, Jonny (31 October 2022). "Why don't robots have rights?". _Big Think_. Archived from the original on 13 September 2024. Retrieved 23 February 2024.
430. ^ _**a**_ _**b**_ Kateman, Brian (24 July 2023). "AI Should Be Terrified of Humans". _Time_. Archived from the original on 25 September 2024. Retrieved 23 February 2024.
431. **^** Wong, Jeff (10 July 2023). "What leaders need to know about robot rights". _Fast Company_.
432. **^** Hern, Alex (12 January 2017). "Give robots 'personhood' status, EU committee argues". _The Guardian_. ISSN 0261-3077. Archived from the original on 5 October 2024. Retrieved 23 February 2024.
433. **^** Dovey, Dana (14 April 2018). "Experts Don't Think Robots Should Have Rights". _Newsweek_. Archived from the original on 5 October 2024. Retrieved 23 February 2024.
434. **^** Cuddy, Alice (13 April 2018). "Robot rights violate human rights, experts warn EU". _euronews_. Archived from the original on 19 September 2024. Retrieved 23 February 2024.
435. **^** The Intelligence explosion and technological singularity: Russell & Norvig (2021, pp. 1004–1005), Omohundro (2008), Kurzweil (2005) I. J. Good's "intelligence explosion": Good (1965) Vernor Vinge's "singularity": Vinge (1993)
436. **^** Russell & Norvig (2021), p. 1005.
437. **^** Transhumanism: Moravec (1988), Kurzweil (2005), Russell & Norvig (2021, p. 1005)
438. **^** AI as evolution: Edward Fredkin is quoted in McCorduck (2004, p. 401), Butler (1863), Dyson (1998)
439. **^** AI in myth: McCorduck (2004, pp. 4–5)
440. **^** McCorduck (2004), pp. 340–400.
441. **^** Buttazzo (2001).
442. **^** Anderson (2008).
443. **^** McCauley (2007).
444. **^** Galvan (1997).

### Textbooks

* Luger, George; Stubblefield, William (2004). _Artificial Intelligence: Structures and Strategies for Complex Problem Solving_ (5th ed.). Benjamin/Cummings. ISBN 978-0-8053-4780-7. Archived from the original on 26 July 2020. Retrieved 17 December 2019.
* Nilsson, Nils (1998). _Artificial Intelligence: A New Synthesis_. Morgan Kaufmann. ISBN 978-1-5586-0467-4. Archived from the original on 26 July 2020. Retrieved 18 November 2019.
* Poole, David; Mackworth, Alan; Goebel, Randy (1998). _Computational Intelligence: A Logical Approach_. New York: Oxford University Press. ISBN 978-0-1951-0270-3. Archived from the original on 26 July 2020. Retrieved 22 August 2020. Later edition: Poole, David; Mackworth, Alan (2017). _Artificial Intelligence: Foundations of Computational Agents_ (2nd ed.). Cambridge University Press. ISBN 978-1-1071-9539-4. Archived from the original on 7 December 2017. Retrieved 6 December 2017.
* Rich, Elaine; Knight, Kevin; Nair, Shivashankar (2010). _Artificial Intelligence_ (3rd ed.). New Delhi: Tata McGraw Hill India. ISBN 978-0-0700-8770-5.
* Russell, Stuart J.; Norvig, Peter (2021). _Artificial Intelligence: A Modern Approach_ (4th ed.). Hoboken: Pearson. ISBN 978-0-1346-1099-3. LCCN 20190474.
* Russell, Stuart J.; Norvig, Peter (2003), _Artificial Intelligence: A Modern Approach_ (2nd ed.), Upper Saddle River, New Jersey: Prentice Hall, ISBN 0-13-790395-2.

### History of AI

* Crevier, Daniel (1993). _AI: The Tumultuous Search for Artificial Intelligence_. New York, NY: BasicBooks. ISBN 0-465-02997-3.
* McCorduck, Pamela (2004), _Machines Who Think_ (2nd ed.), Natick, Massachusetts: A. K. Peters, ISBN 1-5688-1205-1
* Newquist, H. P. (1994). _The Brain Makers: Genius, Ego, And Greed In The Quest For Machines That Think_. New York: Macmillan/SAMS. ISBN 978-0-6723-0412-5.

### Other sources

* AI & ML in Fusion
* AI & ML in Fusion, video lecture Archived 2 July 2023 at the Wayback Machine
* Alter, Alexandra; Harris, Elizabeth A. (20 September 2023), "Franzen, Grisham and Other Prominent Authors Sue OpenAI", _The New York Times_, archived from the original on 14 September 2024, retrieved 5 October 2024
* Altman, Sam; Brockman, Greg; Sutskever, Ilya (22 May 2023). "Governance of Superintelligence". _openai.com_. Archived from the original on 27 May 2023. Retrieved 27 May 2023.
* Anderson, Susan Leigh (2008). "Asimov's 'three laws of robotics' and machine metaethics". _AI & Society_. **22** (4): 477–493\. doi:10.1007/s00146-007-0094-5.
* Anderson, Michael; Anderson, Susan Leigh (2011). _Machine Ethics_. Cambridge University Press.
* Arntz, Melanie; Gregory, Terry; Zierahn, Ulrich (2016), "The risk of automation for jobs in OECD countries: A comparative analysis", _OECD Social, Employment, and Migration Working Papers 189_
* Asada, M.; Hosoda, K.; Kuniyoshi, Y.; Ishiguro, H.; Inui, T.; Yoshikawa, Y.; Ogino, M.; Yoshida, C. (2009). "Cognitive developmental robotics: a survey". _IEEE Transactions on Autonomous Mental Development_. **1** (1): 12–34\. Bibcode:2009ITAMD...1...12A. doi:10.1109/tamd.2009.2021702.
* "Ask the AI experts: What's driving today's progress in AI?". _McKinsey & Company_. Archived from the original on 13 April 2018. Retrieved 13 April 2018.
* Barfield, Woodrow; Pagallo, Ugo (2018). _Research handbook on the law of artificial intelligence_. Cheltenham, UK: Edward Elgar Publishing. ISBN 978-1-7864-3904-8. OCLC 1039480085.
* Beal, J.; Winston, Patrick (2009), "The New Frontier of Human-Level Artificial Intelligence", _IEEE Intelligent Systems_, **24** (4): 21–24, Bibcode:2009IISys..24d..21B, doi:10.1109/MIS.2009.75, hdl:1721.1/52357
* Berdahl, Carl Thomas; Baker, Lawrence; Mann, Sean; Osoba, Osonde; Girosi, Federico (7 February 2023). "Strategies to Improve the Impact of Artificial Intelligence on Health Equity: Scoping Review". _JMIR AI_. **2** e42936. doi:10.2196/42936. PMC 11041459. PMID 38875587.
* Berryhill, Jamie; Heang, Kévin Kok; Clogher, Rob; McBride, Keegan (2019). _Hello, World: Artificial Intelligence and its Use in the Public Sector_ (PDF). Paris: OECD Observatory of Public Sector Innovation. Archived (PDF) from the original on 20 December 2019. Retrieved 9 August 2020.
* Bertini, Marco; Del Bimbo, Alberto; Torniai, Carlo (2006). "Automatic annotation and semantic retrieval of video sequences using multimedia ontologies". _Proceedings of the 14th ACM international conference on Multimedia_. pp. 679–682\. doi:10.1145/1180639.1180782. ISBN 1-59593-447-2.
* Bostrom, Nick (2014). _Superintelligence: Paths, Dangers, Strategies_. Oxford University Press.
* Bostrom, Nick (2015). "What happens when our computers get smarter than we are?". TED (conference). Archived from the original on 25 July 2020. Retrieved 30 January 2020.
* Brooks, Rodney (10 November 2014). "artificial intelligence is a tool, not a threat". _Rethink Robotics_. Archived from the original on 12 November 2014.
* Brooks, Rodney A. (1990). "Elephants don't play chess". _Robotics and Autonomous Systems_. **6** (1–2): 3–15\. doi:10.1016/S0921-8890(05)80025-9.
* Buiten, Miriam C (2019). "Towards Intelligent Regulation of Artificial Intelligence". _European Journal of Risk Regulation_. **10** (1): 41–59\. doi:10.1017/err.2019.8. ISSN 1867-299X.
* Bushwick, Sophie (16 March 2023), "What the New GPT-4 AI Can Do", _Scientific American_, archived from the original on 22 August 2023, retrieved 5 October 2024
* Butler, Samuel (13 June 1863). "Darwin among the Machines". Letters to the Editor. _The Press_. Christchurch, New Zealand. Archived from the original on 19 September 2008. Retrieved 16 October 2014 – via Victoria University of Wellington.
* Buttazzo, G. (July 2001). "Artificial consciousness: Utopia or real possibility?". _Computer_. **34** (7): 24–30\. Bibcode:2001Compr..34g..24B. doi:10.1109/2.933500.
* Cambria, Erik; White, Bebo (May 2014). "Jumping NLP Curves: A Review of Natural Language Processing Research \[Review Article\]". _IEEE Computational Intelligence Magazine_. **9** (2): 48–57\. doi:10.1109/MCI.2014.2307227.
* Cellan-Jones, Rory (2 December 2014). "Stephen Hawking warns artificial intelligence could end mankind". _BBC News_. Archived from the original on 30 October 2015. Retrieved 30 October 2015.
* Chalmers, David (1995). "Facing up to the problem of consciousness". _Journal of Consciousness Studies_. **2** (3): 200–219.
* Challa, Subhash; Moreland, Mark R.; Mušicki, Darko; Evans, Robin J. (2011). _Fundamentals of Object Tracking_. Cambridge University Press. doi:10.1017/CBO9780511975837. ISBN 978-0-5218-7628-5.
* Christian, Brian (2020). _The Alignment Problem: Machine learning and human values_. W. W. Norton & Company. ISBN 978-0-3938-6833-3. OCLC 1233266753.
* Ciresan, D.; Meier, U.; Schmidhuber, J. (2012). "Multi-column deep neural networks for image classification". _2012 IEEE Conference on Computer Vision and Pattern Recognition_. pp. 3642–3649\. arXiv:1202.2745. doi:10.1109/cvpr.2012.6248110. ISBN 978-1-4673-1228-8.
* Clark, Jack (2015b). "Why 2015 Was a Breakthrough Year in Artificial Intelligence". _Bloomberg.com_. Archived from the original on 23 November 2016. Retrieved 23 November 2016.
* CNA (12 January 2019). "Commentary: Bad news. Artificial intelligence is biased". _CNA_. Archived from the original on 12 January 2019. Retrieved 19 June 2020.
* Cybenko, G. (1988). Continuous valued neural networks with two hidden layers are sufficient (Report). Department of Computer Science, Tufts University.
* Deng, L.; Yu, D. (2014). "Deep Learning: Methods and Applications" (PDF). _Foundations and Trends in Signal Processing_. **7** (3–4): 197–387\. doi:10.1561/2000000039. Archived (PDF) from the original on 14 March 2016. Retrieved 18 October 2014.
* Dennett, Daniel (1991). _Consciousness Explained_. The Penguin Press. ISBN 978-0-7139-9037-9.
* DiFeliciantonio, Chase (3 April 2023). "AI has already changed the world. This report shows how". _San Francisco Chronicle_. Archived from the original on 19 June 2023. Retrieved 19 June 2023.
* Dickson, Ben (2 May 2022). "Machine learning: What is the transformer architecture?". _TechTalks_. Archived from the original on 22 November 2023. Retrieved 22 November 2023.
* Domingos, Pedro (2015). _The Master Algorithm: How the Quest for the Ultimate Learning Machine Will Remake Our World_. Basic Books. ISBN 978-0-4650-6570-7.
* Dreyfus, Hubert (1972). _What Computers Can't Do_. New York: MIT Press. ISBN 978-0-0601-1082-6.
* Dreyfus, Hubert; Dreyfus, Stuart (1986). _Mind over Machine: The Power of Human Intuition and Expertise in the Era of the Computer_. Oxford: Blackwell. ISBN 978-0-0290-8060-3. Archived from the original on 26 July 2020. Retrieved 22 August 2020.
* Dyson, George (1998). _Darwin among the Machines_. Allan Lane Science. ISBN 978-0-7382-0030-9. Archived from the original on 26 July 2020. Retrieved 22 August 2020.
* Edelson, Edward (1991). _The Nervous System_. New York: Chelsea House. ISBN 978-0-7910-0464-7. Archived from the original on 26 July 2020. Retrieved 18 November 2019.
* Edwards, Benj (17 May 2023). "Poll: AI poses risk to humanity, according to majority of Americans". _Ars Technica_. Archived from the original on 19 June 2023. Retrieved 19 June 2023.
* Fearn, Nicholas (2007). _The Latest Answers to the Oldest Questions: A Philosophical Adventure with the World's Greatest Thinkers_. New York: Grove Press. ISBN 978-0-8021-1839-4.
* Ford, Martin; Colvin, Geoff (6 September 2015). "Will robots create more jobs than they destroy?". _The Guardian_. Archived from the original on 16 June 2018. Retrieved 13 January 2018.
* Fox News (2023). "Fox News Poll" (PDF). Fox News. Archived (PDF) from the original on 12 May 2023. Retrieved 19 June 2023.
* Frey, Carl Benedikt; Osborne, Michael A (2017). "The future of employment: How susceptible are jobs to computerisation?". _Technological Forecasting and Social Change_. **114**: 254–280\. doi:10.1016/j.techfore.2016.08.019.
* "From not working to neural networking". _The Economist_. 2016. Archived from the original on 31 December 2016. Retrieved 26 April 2018.
* Galvan, Jill (1 January 1997). "Entering the Posthuman Collective in Philip K. Dick's "Do Androids Dream of Electric Sheep?"". _Science Fiction Studies_. **24** (3): 413–429\. doi:10.1525/sfs.24.3.0413. JSTOR 4240644.
* Geist, Edward Moore (9 August 2015). "Is artificial intelligence really an existential threat to humanity?". _Bulletin of the Atomic Scientists_. Archived from the original on 30 October 2015. Retrieved 30 October 2015.
* Gibbs, Samuel (27 October 2014). "Elon Musk: artificial intelligence is our biggest existential threat". _The Guardian_. Archived from the original on 30 October 2015. Retrieved 30 October 2015.
* Goffrey, Andrew (2008). "Algorithm". In Fuller, Matthew (ed.). _Software studies: a lexicon_. Cambridge, Mass.: MIT Press. pp. 15–20. ISBN 978-1-4356-4787-9.
* Goldman, Sharon (14 September 2022). "10 years later, deep learning 'revolution' rages on, say AI pioneers Hinton, LeCun and Li". _VentureBeat_. Archived from the original on 5 October 2024. Retrieved 8 December 2023.
* Good, I. J. (1965), _Speculations Concerning the First Ultraintelligent Machine_, archived from the original on 10 July 2023, retrieved 5 October 2024
* Goodfellow, Ian; Bengio, Yoshua; Courville, Aaron (2016), _Deep Learning_, MIT Press., archived from the original on 16 April 2016, retrieved 12 November 2017
* Goodman, Bryce; Flaxman, Seth (2017). "EU regulations on algorithmic decision-making and a 'right to explanation'". _AI Magazine_. **38** (3): 50. arXiv:1606.08813. doi:10.1609/aimag.v38i3.2741.
* Government Accountability Office (13 September 2022). Consumer Data: Increasing Use Poses Risks to Privacy. _gao.gov_ (Report). Archived from the original on 13 September 2024. Retrieved 5 October 2024.
* Grant, Nico; Hill, Kashmir (22 May 2023). "Google's Photo App Still Can't Find Gorillas. And Neither Can Apple's". _The New York Times_. Archived from the original on 14 September 2024. Retrieved 5 October 2024.
* Goswami, Rohan (5 April 2023). "Here's where the A.I. jobs are". _CNBC_. Archived from the original on 19 June 2023. Retrieved 19 June 2023.
* Harari, Yuval Noah (October 2018). "Why Technology Favors Tyranny". _The Atlantic_. Archived from the original on 25 September 2021. Retrieved 23 September 2021.
* Harari, Yuval Noah (2023). "AI and the future of humanity". _YouTube_. Archived from the original on 30 September 2024. Retrieved 5 October 2024.
* Haugeland, John (1985). _Artificial Intelligence: The Very Idea_. Cambridge, Mass.: MIT Press. ISBN 978-0-2620-8153-5.
* Hinton, G.; Deng, L.; Yu, D.; Dahl, G.; Mohamed, A.; Jaitly, N.; Senior, A.; Vanhoucke, V.; Nguyen, P.; Sainath, T.; Kingsbury, B. (2012). "Deep Neural Networks for Acoustic Modeling in Speech Recognition – The shared views of four research groups". _IEEE Signal Processing Magazine_. **29** (6): 82–97\. Bibcode:2012ISPM...29...82H. doi:10.1109/msp.2012.2205597.
* Holley, Peter (28 January 2015). "Bill Gates on dangers of artificial intelligence: 'I don't understand why some people are not concerned'". _The Washington Post_. ISSN 0190-8286. Archived from the original on 30 October 2015. Retrieved 30 October 2015.
* Hornik, Kurt; Stinchcombe, Maxwell; White, Halbert (1989). _Multilayer Feedforward Networks are Universal Approximators_ (PDF). _Neural Networks_. Vol. 2. Pergamon Press. pp. 359–366\. Archived (PDF) from the original on 21 April 2023. Retrieved 5 October 2024.
* Horst, Steven (2005). "The Computational Theory of Mind". _The Stanford Encyclopedia of Philosophy_. Archived from the original on 6 March 2016. Retrieved 7 March 2016.
* Howe, J. (November 1994). "Artificial Intelligence at Edinburgh University: a Perspective". Archived from the original on 15 May 2007. Retrieved 30 August 2007.
* IGM Chicago (30 June 2017). "Robots and Artificial Intelligence". _igmchicago.org_. Archived from the original on 1 May 2019. Retrieved 3 July 2019.
* Iphofen, Ron; Kritikos, Mihalis (3 January 2019). "Regulating artificial intelligence and robotics: ethics by design in a digital society". _Contemporary Social Science_. **16** (2): 170–184\. doi:10.1080/21582041.2018.1563803. ISSN 2158-2041.
* Jordan, M. I.; Mitchell, T. M. (16 July 2015). "Machine learning: Trends, perspectives, and prospects". _Science_. **349** (6245): 255–260\. Bibcode:2015Sci...349..255J. doi:10.1126/science.aaa8415. PMID 26185243.
* Kahneman, Daniel; Slovic, Paul; Tversky, Amos (1982). _Judgment Under Uncertainty: Heuristics and Biases_. Cambridge University Press.
* Kahneman, Daniel (2011). _Thinking, Fast and Slow_. Macmillan. ISBN 978-1-4299-6935-2. Archived from the original on 15 March 2023. Retrieved 8 April 2012.
* Kasperowicz, Peter (1 May 2023). "Regulate AI? GOP much more skeptical than Dems that government can do it right: poll". _Fox News_. Archived from the original on 19 June 2023. Retrieved 19 June 2023.
* Katz, Yarden (1 November 2012). "Noam Chomsky on Where Artificial Intelligence Went Wrong". _The Atlantic_. Archived from the original on 28 February 2019. Retrieved 26 October 2014.
* "Kismet". MIT Artificial Intelligence Laboratory, Humanoid Robotics Group. Archived from the original on 17 October 2014. Retrieved 25 October 2014.
* Kissinger, Henry (1 November 2021). "The Challenge of Being Human in the Age of AI". _The Wall Street Journal_. Archived from the original on 4 November 2021. Retrieved 4 November 2021.
* Kobielus, James (27 November 2019). "GPUs Continue to Dominate the AI Accelerator Market for Now". _InformationWeek_. Archived from the original on 19 October 2021. Retrieved 11 June 2020.
* Kuperman, G. J.; Reichley, R. M.; Bailey, T. C. (1 July 2006). "Using Commercial Knowledge Bases for Clinical Decision Support: Opportunities, Hurdles, and Recommendations". _Journal of the American Medical Informatics Association_. **13** (4): 369–371\. doi:10.1197/jamia.M2055. PMC 1513681. PMID 16622160.
* Kurzweil, Ray (2005). _The Singularity is Near_. Penguin Books. ISBN 978-0-6700-3384-3.
* Langley, Pat (2011). "The changing science of machine learning". _Machine Learning_. **82** (3): 275–279\. doi:10.1007/s10994-011-5242-y.
* Larson, Jeff; Angwin, Julia (23 May 2016). "How We Analyzed the COMPAS Recidivism Algorithm". _ProPublica_. Archived from the original on 29 April 2019. Retrieved 19 June 2020.
* Laskowski, Nicole (November 2023). "What is Artificial Intelligence and How Does AI Work? TechTarget". _Enterprise AI_. Archived from the original on 5 October 2024. Retrieved 30 October 2023.
* Law Library of Congress (U.S.). Global Legal Research Directorate, issuing body. (2019). _Regulation of artificial intelligence in selected jurisdictions_. LCCN 2019668143. OCLC 1110727808.
* Lee, Timothy B. (22 August 2014). "Will artificial intelligence destroy humanity? Here are 5 reasons not to worry". _Vox_. Archived from the original on 30 October 2015. Retrieved 30 October 2015.
* Lenat, Douglas; Guha, R. V. (1989). _Building Large Knowledge-Based Systems_. Addison-Wesley. ISBN 978-0-2015-1752-1.
* Lighthill, James (1973). "Artificial Intelligence: A General Survey". _Artificial Intelligence: a paper symposium_. Science Research Council.
* Lipartito, Kenneth (6 January 2011), _The Narrative and the Algorithm: Genres of Credit Reporting from the Nineteenth Century to Today_ (PDF) (Unpublished manuscript), SSRN 1736283, archived (PDF) from the original on 9 October 2022
* Lohr, Steve (2017). "Robots Will Take Jobs, but Not as Fast as Some Fear, New Report Says". _The New York Times_. Archived from the original on 14 January 2018. Retrieved 13 January 2018.
* Lungarella, M.; Metta, G.; Pfeifer, R.; Sandini, G. (2003). "Developmental robotics: a survey". _Connection Science_. **15** (4): 151–190\. Bibcode:2003ConSc..15..151L. doi:10.1080/09540090310001655110.
* "Machine Ethics". _aaai.org_. Archived from the original on 29 November 2014.
* Madrigal, Alexis C. (27 February 2015). "The case against killer robots, from a guy actually working on artificial intelligence". _Fusion.net_. Archived from the original on 4 February 2016. Retrieved 31 January 2016.
* Mahdawi, Arwa (26 June 2017). "What jobs will still be around in 20 years? Read this to prepare your future". _The Guardian_. Archived from the original on 14 January 2018. Retrieved 13 January 2018.
* Maker, Meg Houston (2006), _AI@50: AI Past, Present, Future_, Dartmouth College, archived from the original on 8 October 2008, retrieved 16 October 2008
* Marmouyet, Françoise (15 December 2023). "Google's Gemini: is the new AI model really better than ChatGPT?". _The Conversation_. Archived from the original on 4 March 2024. Retrieved 25 December 2023.
* Minsky, Marvin (1986), _The Society of Mind_, Simon and Schuster
* McCarthy, John; Minsky, Marvin; Rochester, Nathan; Shannon, Claude (1955). "A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence". _stanford.edu_. Archived from the original on 26 August 2007. Retrieved 30 August 2007.
* McCarthy, John (2007), "From Here to Human-Level AI", _Artificial Intelligence_, p. 171
* McCarthy, John (1999), _What is AI?_, archived from the original on 4 December 2022, retrieved 4 December 2022
* McCauley, Lee (2007). "AI armageddon and the three laws of robotics". _Ethics and Information Technology_. **9** (2): 153–164\. doi:10.1007/s10676-007-9138-2. ProQuest 222198675.
* McGarry, Ken (1 December 2005). "A survey of interestingness measures for knowledge discovery". _The Knowledge Engineering Review_. **20** (1): 39–61\. doi:10.1017/S0269888905000408.
* McGaughey, Ewan (2022). "Will Robots Automate Your Job Away? Full Employment, Basic Income and Economic Democracy". _Industrial Law Journal_. **51** (3): 511–559\. doi:10.1093/indlaw/dwab010. SSRN 3044448.
* Merkle, Daniel; Middendorf, Martin (2013). "Swarm Intelligence". In Burke, Edmund K.; Kendall, Graham (eds.). _Search Methodologies: Introductory Tutorials in Optimization and Decision Support Techniques_. Springer Science & Business Media. ISBN 978-1-4614-6940-7.
* Minsky, Marvin (1967), _Computation: Finite and Infinite Machines_, Englewood Cliffs, N.J.: Prentice-Hall
* Moravec, Hans (1988). _Mind Children_. Harvard University Press. ISBN 978-0-6745-7616-2. Archived from the original on 26 July 2020. Retrieved 18 November 2019.
* Morgenstern, Michael (9 May 2015). "Automation and anxiety". _The Economist_. Archived from the original on 12 January 2018. Retrieved 13 January 2018.
* Müller, Vincent C.; Bostrom, Nick (2014). "Future Progress in Artificial Intelligence: A Poll Among Experts". _AI Matters_. **1** (1): 9–11\. doi:10.1145/2639475.2639478.
* Neumann, Bernd; Möller, Ralf (January 2008). "On scene interpretation with description logics". _Image and Vision Computing_. **26** (1): 82–101\. doi:10.1016/j.imavis.2007.08.013.
* Nilsson, Nils (1995), "Eyes on the Prize", _AI Magazine_, vol. 16, pp. 9–17
* Newell, Allen; Simon, H. A. (1976). "Computer Science as Empirical Inquiry: Symbols and Search". _Communications of the ACM_. **19** (3): 113–126\. doi:10.1145/360018.360022.
* Nicas, Jack (7 February 2018). "How YouTube Drives People to the Internet's Darkest Corners". _The Wall Street Journal_. ISSN 0099-9660. Archived from the original on 5 October 2024. Retrieved 16 June 2018.
* Nilsson, Nils (1983). "Artificial Intelligence Prepares for 2001" (PDF). _AI Magazine_. **1** (1). Archived (PDF) from the original on 17 August 2020. Retrieved 22 August 2020. Presidential Address to the Association for the Advancement of Artificial Intelligence.
* NRC (United States National Research Council) (1999). "Developments in Artificial Intelligence". _Funding a Revolution: Government Support for Computing Research_. National Academies Press. ISBN 978-0-309-52501-5.
* Omohundro, Steve (2008). _The Nature of Self-Improving Artificial Intelligence_ (PDF). 2007 Singularity Summit. San Francisco, CA.
* Oudeyer, P-Y. (2010). "On the impact of robotics in behavioral and cognitive sciences: from insect navigation to human cognitive development". _IEEE Transactions on Autonomous Mental Development_. **2** (1): 2–16\. Bibcode:2010ITAMD...2....2O. doi:10.1109/tamd.2009.2039057.
* Pennachin, C.; Goertzel, B. (2007). "Contemporary Approaches to Artificial General Intelligence". _Artificial General Intelligence_. Cognitive Technologies. Berlin, Heidelberg: Springer. pp. 1–30\. doi:10.1007/978-3-540-68677-4\_1. ISBN 978-3-5402-3733-4.
* Pinker, Steven (2007) \[1994\], _The Language Instinct_, Perennial Modern Classics, Harper, ISBN 978-0-0613-3646-1
* Poria, Soujanya; Cambria, Erik; Bajpai, Rajiv; Hussain, Amir (September 2017). "A review of affective computing: From unimodal analysis to multimodal fusion". _Information Fusion_. **37**: 98–125\. Bibcode:2017InfFu..37...98P. doi:10.1016/j.inffus.2017.02.003. hdl:1893/25490.
* Rawlinson, Kevin (29 January 2015). "Microsoft's Bill Gates insists AI is a threat". _BBC News_. Archived from the original on 29 January 2015. Retrieved 30 January 2015.
* Reisner, Alex (19 August 2023), "Revealed: The Authors Whose Pirated Books are Powering Generative AI", _The Atlantic_, archived from the original on 3 October 2024, retrieved 5 October 2024
* Roberts, Jacob (2016). "Thinking Machines: The Search for Artificial Intelligence". _Distillations_. Vol. 2, no. 2. pp. 14–23\. Archived from the original on 19 August 2018. Retrieved 20 March 2018.
* Robitzski, Dan (5 September 2018). "Five experts share what scares them the most about AI". _Futurism_. Archived from the original on 8 December 2019. Retrieved 8 December 2019.
* Rose, Steve (11 July 2023). "AI Utopia or dystopia?". _The Guardian Weekly_. pp. 42–43.
* Russell, Stuart (2019). _Human Compatible: Artificial Intelligence and the Problem of Control_. United States: Viking. ISBN 978-0-5255-5861-3. OCLC 1083694322.
* Sainato, Michael (19 August 2015). "Stephen Hawking, Elon Musk, and Bill Gates Warn About Artificial Intelligence". _Observer_. Archived from the original on 30 October 2015. Retrieved 30 October 2015.
* Sample, Ian (5 November 2017). "Computer says no: why making AIs fair, accountable and transparent is crucial". _The Guardian_. Archived from the original on 10 October 2022. Retrieved 30 January 2018.
* Rothman, Denis (7 October 2020). "Exploring LIME Explanations and the Mathematics Behind It". _Codemotion_. Archived from the original on 25 November 2023. Retrieved 25 November 2023.
* Scassellati, Brian (2002). "Theory of mind for a humanoid robot". _Autonomous Robots_. **12** (1): 13–24\. doi:10.1023/A:1013298507114.
* Schmidhuber, J. (2015). "Deep Learning in Neural Networks: An Overview". _Neural Networks_. **61**: 85–117\. arXiv:1404.7828. Bibcode:2015NN.....61...85S. doi:10.1016/j.neunet.2014.09.003. PMID 25462637.
* Schmidhuber, Jürgen (2022). "Annotated History of Modern AI and Deep Learning". Archived from the original on 7 August 2023. Retrieved 5 October 2024.
* Searle, John (1980). "Minds, Brains and Programs". _Behavioral and Brain Sciences_. **3** (3): 417–457\. doi:10.1017/S0140525X00005756.
* Searle, John (1999). _Mind, language and society_. New York: Basic Books. ISBN 978-0-4650-4521-1. OCLC 231867665. Archived from the original on 26 July 2020. Retrieved 22 August 2020.
* Simon, H. A. (1965), _The Shape of Automation for Men and Management_, New York: Harper & Row, OCLC 1483817127
* Simonite, Tom (31 March 2016). "How Google Plans to Solve Artificial Intelligence". _MIT Technology Review_. Archived from the original on 16 September 2024. Retrieved 5 October 2024.
* Smith, Craig S. (15 March 2023). "ChatGPT-4 Creator Ilya Sutskever on AI Hallucinations and AI Democracy". _Forbes_. Archived from the original on 18 September 2024. Retrieved 25 December 2023.
* Smoliar, Stephen W.; Zhang, HongJiang (1994). "Content based video indexing and retrieval". _IEEE MultiMedia_. **1** (2): 62–72\. doi:10.1109/93.311653.
* Solomonoff, Ray (1956). _An Inductive Inference Machine_ (PDF). Dartmouth Summer Research Conference on Artificial Intelligence. Archived (PDF) from the original on 26 April 2011. Retrieved 22 March 2011 – via std.com, pdf scanned copy of the original. Later published as 
 Solomonoff, Ray (1957). "An Inductive Inference Machine". _IRE Convention Record_. Vol. Section on Information Theory, part 2. pp. 56–62.
* Stanford University (2023). "Artificial Intelligence Index Report 2023/Chapter 6: Policy and Governance" (PDF). AI Index. Archived (PDF) from the original on 19 June 2023. Retrieved 19 June 2023.
* Stewart, Jon (9 October 2025). "AI: What Could Go Wrong? With Geoffrey Hinton". _The Weekly Show with Jon Stewart_ (Podcast).
* Tao, Jianhua; Tan, Tieniu (2005). _Affective Computing and Intelligent Interaction_. Affective Computing: A Review. Lecture Notes in Computer Science. Vol. 3784. Springer. pp. 981–995\. doi:10.1007/11573548. ISBN 978-3-5402-9621-8.
* Taylor, Josh; Hern, Alex (2 May 2023). "'Godfather of AI' Geoffrey Hinton quits Google and warns over dangers of misinformation". _The Guardian_. Archived from the original on 5 October 2024. Retrieved 5 October 2024.
* Thompson, Derek (23 January 2014). "What Jobs Will the Robots Take?". _The Atlantic_. Archived from the original on 24 April 2018. Retrieved 24 April 2018.
* Thro, Ellen (1993). _Robotics: The Marriage of Computers and Machines_. New York: Facts on File. ISBN 978-0-8160-2628-9. Archived from the original on 26 July 2020. Retrieved 22 August 2020.
* Toews, Rob (3 September 2023). "Transformers Revolutionized AI. What Will Replace Them?". _Forbes_. Archived from the original on 8 December 2023. Retrieved 8 December 2023.
* Turing, Alan (October 1950). "Computing Machinery and Intelligence". _Mind_. **59** (236): 433–460\. doi:10.1093/mind/LIX.236.433. ISSN 1460-2113. JSTOR 2251299. S2CID 14636783.

* _UNESCO Science Report: the Race Against Time for Smarter Development_. Paris: UNESCO. 2021. ISBN 978-9-2310-0450-6. Archived from the original on 18 June 2022. Retrieved 18 September 2021.
* Urbina, Fabio; Lentzos, Filippa; Invernizzi, Cédric; Ekins, Sean (7 March 2022). "Dual use of artificial-intelligence-powered drug discovery". _Nature Machine Intelligence_. **4** (3): 189–191\. doi:10.1038/s42256-022-00465-9. PMC 9544280. PMID 36211133.
* Valance, Christ (30 May 2023). "Artificial intelligence could lead to extinction, experts warn". _BBC News_. Archived from the original on 17 June 2023. Retrieved 18 June 2023.
* Valinsky, Jordan (11 April 2019), "Amazon reportedly employs thousands of people to listen to your Alexa conversations", _CNN.com_, archived from the original on 26 January 2024, retrieved 5 October 2024
* Verma, Yugesh (25 December 2021). "A Complete Guide to SHAP – SHAPley Additive exPlanations for Practitioners". _Analytics India Magazine_. Archived from the original on 25 November 2023. Retrieved 25 November 2023.
* Vincent, James (7 November 2019). "OpenAI has published the text-generating AI it said was too dangerous to share". _The Verge_. Archived from the original on 11 June 2020. Retrieved 11 June 2020.
* Vincent, James (15 November 2022). "The scary truth about AI copyright is nobody knows what will happen next". _The Verge_. Archived from the original on 19 June 2023. Retrieved 19 June 2023.
* Vincent, James (3 April 2023). "AI is entering an era of corporate control". _The Verge_. Archived from the original on 19 June 2023. Retrieved 19 June 2023.
* Vinge, Vernor (1993). "The Coming Technological Singularity: How to Survive in the Post-Human Era". _Vision 21: Interdisciplinary Science and Engineering in the Era of Cyberspace_: 11. Bibcode:1993vise.nasa...11V. Archived from the original on 1 January 2007. Retrieved 14 November 2011.
* Waddell, Kaveh (2018). "Chatbots Have Entered the Uncanny Valley". _The Atlantic_. Archived from the original on 24 April 2018. Retrieved 24 April 2018.
* Wallach, Wendell (2010). _Moral Machines_. Oxford University Press.
* Wason, P. C.; Shapiro, D. (1966). "Reasoning". In Foss, B. M. (ed.). _New horizons in psychology_. Harmondsworth: Penguin. Archived from the original on 26 July 2020. Retrieved 18 November 2019.
* Weng, J.; McClelland; Pentland, A.; Sporns, O.; Stockman, I.; Sur, M.; Thelen, E. (2001). "Autonomous mental development by robots and animals". _Science_. **291** (5504): 599–600\. doi:10.1126/science.291.5504.599. PMID 11229402.
* "What is 'fuzzy logic'? Are there computers that are inherently fuzzy and do not apply the usual binary logic?". _Scientific American_. 21 October 1999. Archived from the original on 6 May 2018. Retrieved 5 May 2018.
* Williams, Rhiannon (28 June 2023), "Humans may be more likely to believe disinformation generated by AI", _MIT Technology Review_, archived from the original on 16 September 2024, retrieved 5 October 2024
* Wirtz, Bernd W.; Weyerer, Jan C.; Geyer, Carolin (24 July 2018). "Artificial Intelligence and the Public Sector – Applications and Challenges". _International Journal of Public Administration_. **42** (7): 596–615\. doi:10.1080/01900692.2018.1498103.
* Wong, Matteo (19 May 2023), "ChatGPT Is Already Obsolete", _The Atlantic_, archived from the original on 18 September 2024, retrieved 5 October 2024
* Yudkowsky, E (2008), "Artificial Intelligence as a Positive and Negative Factor in Global Risk" (PDF), _Global Catastrophic Risks_, Oxford University Press, 2008, Bibcode:2008gcr..book..303Y, archived (PDF) from the original on 19 October 2013, retrieved 24 September 2021

## External links

Scholia has a _topic_ profile for _**Artificial intelligence**_.

* Hauser, Larry. "Artificial Intelligence". In Fieser, James; Dowden, Bradley (eds.). _Internet Encyclopedia of Philosophy_. ISSN 2161-0002. OCLC 37741658.
