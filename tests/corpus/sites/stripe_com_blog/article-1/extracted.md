* ChatGPT users in the United States can buy from Etsy merchants (and, soon, from Shopify merchants) in the chat using checkout powered by Stripe. 
 
* Stripe releases the Agentic Commerce Protocol, an open standard codeveloped with OpenAI, to help businesses grow in the era of agentic commerce. 

SAN FRANCISCO—Stripe, the programmable financial services company, today announced that it is helping OpenAI launch a new commerce experience called Instant Checkout in ChatGPT. Starting today, ChatGPT users in the US can buy goods from US-based Etsy businesses—and, coming soon, over a million Shopify merchants, like Glossier, Vuori, Spanx, and SKIMS—directly in the chat. This milestone in the evolution of AI-enabled commerce is powered by the Agentic Commerce Protocol (ACP), a new, merchant-friendly open standard codeveloped by Stripe and OpenAI, informed by Stripe’s 15 years of experience building commerce infrastructure for the world's fastest-growing businesses.

As more people use AI tools in their everyday lives, interfaces like ChatGPT are quickly becoming a new kind of storefront. Merchants can now turn AI-driven discovery into a sale.

The flow is simple: a ChatGPT user asks for product recommendations in the chat. When they are ready to buy, they are presented with a Stripe-powered checkout inline in the chat. After the buyer uses their preferred payment method (including Link, Stripe’s consumer payments product), Stripe issues a Shared Payment Token (SPT), a new payment primitive that lets applications like ChatGPT initiate a payment without exposing the buyer’s payment credentials. SPTs are scoped to a specific merchant and cart total. Once issued, ChatGPT passes the token to the merchant via API. The merchant can then process the transaction through Stripe—or, if preferred, handle the payment with another provider while still benefiting from Stripe’s risk scores for fraud protection. ChatGPT acts like the buyer’s AI agent, helping them buy from businesses just like a personal shopper would.

Orders flow from ChatGPT to a merchant’s backend via ACP. Merchants can accept or decline the order, charge the payment method, calculate and remit sales tax, and handle fulfillment and returns, as they normally would. The result is a smooth commerce experience inside ChatGPT for consumers and a new sales channel for businesses.

“Stripe is building the economic infrastructure for AI,” said Will Gaybrick, Stripe’s president of technology and business. “We’re working alongside the most ambitious companies to create new AI-powered commerce experiences for billions of people, and building the tools businesses will need to thrive in a world where agent-led transactions are becoming the norm.”

“By co-developing the Agentic Commerce Protocol with Stripe, we’re making it possible for businesses of all sizes to meet people where they are—and for shoppers to complete purchases seamlessly in conversation,” said Fidji Simo, OpenAI’s CEO of Applications.

Traditional ecommerce was built for humans—businesses controlled the interface and payments while shoppers browsed and clicked. In AI-led commerce, agents act for the buyer, carrying their identity, payment method, and purchase context into the transaction.

"Stripe has spent the last 15 years optimizing commerce for human buyers. Now, we are starting to do the same for agents,” said Kevin Miller, head of payments at Stripe.

To support this shift, businesses must expose their products, pricing, and checkout in a way agents can use, while still protecting payment credentials and preventing fraud. Because agents now sit between businesses and consumers, everything from payments and checkout to fraud checks must be re-architected. And with many AI agents emerging, it’s not realistic for businesses to maintain integrations with each one.

That’s why Stripe and OpenAI have created ACP. It creates a shared language between businesses and AI agents. With a single integration, merchants will be able to start selling through AI agents while retaining full control over what’s sold, how their brand shows up, and how orders are fulfilled. ACP provides the standardization needed for businesses to participate in agentic commerce while preserving customer relationships and their existing systems. ACP is an open standard: businesses not processing with Stripe can still adopt it with their existing payment providers, and it works across AI agents.

Stripe and OpenAI have partnered since 2023, when OpenAI began using Stripe Billing and Stripe Checkout for ChatGPT Plus subscriptions, detecting fraud with Stripe Radar, and using Link for fast and easy checkout. With today’s announcement, Stripe is now helping OpenAI pioneer an entirely new revenue model for commerce through ChatGPT. Over time, Stripe and OpenAI will expand access to more businesses and consumers across more geographies.

Every company in the Forbes AI 50 that is accepting online payments is doing so with Stripe today. Most of them are also using Stripe for checkout, billing, fraud prevention, tax handling, and more. Over the last year, Stripe has been launching broadly available infrastructure—like the agent toolkit and Stripe MCP—to give businesses the building blocks to create new commerce experiences and business models in the AI era.

Learn more on the Agentic Commerce Protocol website.
