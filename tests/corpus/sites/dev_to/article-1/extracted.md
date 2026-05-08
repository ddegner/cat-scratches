MiroFish is an open-source AI prediction engine that takes real-world data (news, reports, even novels), spawns thousands of AI agents with unique personalities and memories, lets them interact in a simulated world, and produces a prediction report based on what emerges. Think of it as SimCity meets AI forecasting.

## What Problem Does MiroFish Solve?

Traditional prediction models — whether statistical or ML-based — treat the world like a math equation. You feed in numbers, you get numbers out. But the real world doesn't work that way. People react to each other. Opinions shift. Coalitions form and break apart. A single tweet can change the trajectory of a news cycle.

MiroFish takes a fundamentally different approach. Instead of crunching numbers, it **simulates the messy, social dynamics of the real world** using thousands of AI agents that talk, argue, persuade, and evolve — just like people do.

The result? You get a prediction that accounts for group behavior, social contagion, and emergent patterns that traditional models simply can't capture.

## How It Actually Works (The 5-Step Pipeline)

Here's the workflow, broken down without the buzzwords:

### Step 1: Knowledge Graph Construction

You upload "seed material" — this could be a news article, a financial report, a policy document, or even the first 80 chapters of a novel (yes, they actually did this with _Dream of the Red Chamber_ to predict its lost ending).

MiroFish uses **GraphRAG** (Graph-based Retrieval Augmented Generation) to parse your input and extract entities and relationships. Instead of treating your document as a flat bag of text, it builds a structured knowledge graph — who are the key players, how are they connected, what pressures exist, what institutions are involved.

This graph becomes the "reality" that the simulated world is built on.

### Step 2: Environment Setup & Agent Creation

Based on the knowledge graph, MiroFish automatically generates **agent personas**. Each agent gets:

* A unique personality and background
* A distinct stance or perspective on the topic
* Long-term memory (powered by Zep Cloud)
* Behavioral logic that governs how they interact

An "Environment Configuration Agent" then sets up the simulation parameters — essentially deciding the rules of the world these agents will live in.

### Step 3: Dual-Platform Parallel Simulation

This is where things get interesting. MiroFish runs simulations on **two platforms simultaneously** (think Twitter-like and Reddit-like environments). Dozens or hundreds of agents start interacting — posting, commenting, debating, forming opinions, influencing each other.

The simulation engine under the hood is **OASIS** (Open Agent Social Interaction Simulations), built by the CAMEL-AI team. OASIS can scale up to one million agents and supports 23 different social actions (following, commenting, reposting, etc.).

During the simulation, the system automatically tracks your prediction question and dynamically updates each agent's memory as events unfold.

### Step 4: Report Generation

After the simulation ends, a dedicated **ReportAgent** steps in. This agent has access to a rich toolkit and interacts with the post-simulation environment to synthesize everything that happened. It analyzes how agents' opinions shifted, what coalitions formed, and what patterns emerged — then produces a structured prediction report.

### Step 5: Deep Interaction

The report isn't the final product. You can:

* **Chat with any agent** in the simulated world to understand their reasoning
* **Talk to the ReportAgent** to ask follow-up questions or get alternative analyses
* **Inject new variables** and re-run scenarios ("What if we change X?")

## The Tech Stack

Here's what's under the hood:

Component

Technology

Backend

Python 3.11+

Frontend

Vue.js

Simulation Engine

OASIS (by CAMEL-AI)

Knowledge Graphs

GraphRAG

Agent Memory

Zep Cloud

LLM Support

Any OpenAI SDK-compatible model

Recommended LLM

Qwen-plus (via Alibaba's Bailian platform)

Package Manager

uv (for Python)

## Getting Started (Self-Hosted Setup)

> **Note:** MiroFish was developed and tested on macOS. Windows compatibility is still being tested.

### Prerequisites

* Node.js 18+
* Python 3.11+
* uv (Python package manager)

### 1\. Clone and Configure

```
git clone https://github.com/666ghj/MiroFish.git
cd MiroFish

# Copy the example env file
cp .env.example .env
```

Edit the `.env` file with your API keys: 

```
# LLM Configuration (any OpenAI SDK-compatible LLM)
# Recommended: Qwen-plus on Alibaba's Bailian platform
LLM_API_KEY=your_api_key
LLM_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
LLM_MODEL_NAME=qwen-plus

# Zep Cloud (for agent memory persistence)
# Free tier is enough for basic usage: https://app.getzep.com/
ZEP_API_KEY=your_zep_api_key
```

### 2\. Install Dependencies

```
# One command to install everything (root + frontend + backend)
npm run setup:all
```

Or step by step: 

```
# Node dependencies (root + frontend)
npm run setup

# Python dependencies (auto-creates virtual environment)
npm run setup:backend
```

### 3\. Run It

```
# Start both frontend and backend
npm run dev
```

That's it. Your frontend will be at `http://localhost:3000` and the API at `http://localhost:5001`.

You can also start them separately: 

```
npm run backend # Backend only
npm run frontend # Frontend only
```

## What Can You Actually Predict With This?

The team has demonstrated several use cases:

**Public Opinion Simulation** — Feed in a news event and simulate how public sentiment might evolve. The demo shows a prediction of how a university controversy might unfold across social media.

**Financial Forecasting** — Inject market signals and watch how simulated traders, analysts, and retail investors react to each other's moves.

**Policy Impact Testing** — Upload a policy draft and see how different stakeholder groups might respond, form alliances, or push back.

**Creative Exploration** — The team fed the first 80 chapters of a classic Chinese novel into MiroFish and had it predict the lost ending based on how the characters would behave. This is a fun one — it shows the engine isn't limited to "serious" forecasting.

## Important Caveats

Let's be real about what this is and isn't:

**It's not a crystal ball.** The team hasn't published benchmarks comparing predictions against actual outcomes. The simulations illustrate _plausible_ scenarios based on emergent agent behavior — they're not probability estimates.

**LLM costs add up.** Running hundreds of agents through multiple simulation rounds means lots of LLM API calls. The README recommends starting with fewer than 40 rounds to manage costs.

**Agent bias matters.** The OASIS research paper notes that LLM agents tend to be _more_ susceptible to herd behavior than real humans. Simulated crowds can polarize faster than real ones.

**It's early.** Version 0.1.0 was released in December 2025. This is a v0 product — powerful in concept, but still maturing.

## The Backstory

MiroFish was built by Guo Hangjiang, a senior undergraduate student in China. It topped GitHub's Global Trending list in March 2026 and has attracted investment from Shanda Group founder Chen Tianqiao. The project's predecessor, BettaFish (a multi-agent public opinion analysis tool), also hit #1 on GitHub Trending in late 2024.

The core simulation engine comes from OASIS, an open-source project by the CAMEL-AI research community that supports up to one million agent interactions and has been published in peer-reviewed research.

## Why Developers Should Care

Even if you're not building a prediction engine, MiroFish is worth studying because it's a clean example of several patterns coming together:

* **GraphRAG for knowledge grounding** — how to give agents structured context, not just raw text
* **Persistent agent memory** — using Zep to let agents remember across simulation rounds
* **Multi-agent orchestration at scale** — coordinating hundreds of autonomous agents in real-time
* **Emergent behavior as a feature** — designing systems where the output isn't programmed but _emerges_ from agent interactions

These are patterns you'll see increasingly in production AI systems, and MiroFish packages them in a way that's easy to study and experiment with.

## Links

* **GitHub:** github.com/666ghj/MiroFish
