13th May 2024 - Link Blog

**Hello GPT-4o**. OpenAI announced a new model today: GPT-4o, where the o stands for "omni".

It looks like this is the `gpt2-chatbot` we've been seeing in the Chat Arena the past few weeks.

GPT-4o doesn't seem to be a huge leap ahead of GPT-4 in terms of "intelligence" - whatever that might mean - but it has a bunch of interesting new characteristics.

First, it's multi-modal across text, images and audio as well. The audio demos from this morning's launch were extremely impressive.

ChatGPT's previous voice mode worked by passing audio through a speech-to-text model, then an LLM, then a text-to-speech for the output. GPT-4o does everything with the one model, reducing latency to the point where it can act as a live interpreter between people speaking in two different languages. It also has the ability to interpret tone of voice, and has much more control over the voice and intonation it uses in response.

It's very science fiction, and has hints of uncanny valley. I can't wait to try it out - it should be rolling out to the various OpenAI apps "in the coming weeks".

Meanwhile the new model itself is already available for text and image inputs via the API and in the Playground interface, as model ID "gpt-4o" or "gpt-4o-2024-05-13". My first impressions are that it feels notably faster than `gpt-4-turbo`.

This announcement post also includes examples of image output from the new model. It looks like they may have taken big steps forward in two key areas of image generation: output of text (the "Poetic typography" examples) and maintaining consistent characters across multiple prompts (the "Character design - Geary the robot" example).

The size of the vocabulary of the tokenizer - effectively the number of unique integers used to represent text - has increased to ~200,000 from ~100,000 for GPT-4 and GPT-3.5. Inputs in Gujarati use 4.4x fewer tokens, Japanese uses 1.4x fewer, Spanish uses 1.1x fewer. Previously languages other than English paid a material penalty in terms of how much text could fit into a prompt, it's good to see that effect being reduced.

Also notable: the price. OpenAI claim a 50% price reduction compared to GPT-4 Turbo. Conveniently, `gpt-4o` costs exactly 10x `gpt-3.5`: 4o is $5/million input tokens and $15/million output tokens. 3.5 is $0.50/million input tokens and $1.50/million output tokens.

(I was a little surprised not to see a price decrease there to better compete with the less expensive Claude 3 Haiku.)

The price drop is particularly notable because OpenAI are promising to make this model available to free ChatGPT users as well - the first time they've directly made their "best" model available to non-paying customers.

Tucked away right at the end of the post:

> We plan to launch support for GPT-4o's new audio and video capabilities to a small group of trusted partners in the API in the coming weeks.

I'm looking forward to learning more about these video capabilities, which were hinted at by some of the live demos in this morning's presentation.

Posted 13th May 2024 at 7:09 pm
