Edit

# What is Azure Functions?

Azure Functions is a serverless solution that allows you to build robust apps while using less code, and with less infrastructure and lower costs. Instead of worrying about deploying and maintaining servers, you can use the cloud infrastructure to provide all the up-to-date resources needed to keep your applications running.

You focus on the code that matters most to you, in the most productive language for you, and Azure Functions handles the rest. For a list of supported languages, see Supported languages in Azure Functions.

## Scenarios

Functions provides a comprehensive set of event-driven triggers and bindings that connect your functions to other services without having to write extra code.

The following list includes common integrated scenarios that use Functions.

If you want to...

then...

Process file uploads

Run code when a file is uploaded or changed in blob storage.

Process data in real time

Capture and transform data from event and IoT source streams on the way to storage.

Run AI inference

Pull text from a queue and present it to various AI services for analysis and classification.

Run scheduled task

Execute data clean-up code on predefined timed intervals.

Build a scalable web API

Implement a set of REST endpoints for your web applications using HTTP triggers.

Build a serverless workflow

Create an event-driven workflow from a series of functions using Durable Functions.

Respond to database changes

Run custom logic when a document is created or updated in a database.

Create reliable message systems

Process message queues using Azure Queue Storage, Service Bus, or Event Hubs.

These scenarios allow you to build event-driven systems using modern architectural patterns. For more information, see Azure Functions scenarios.

## Development lifecycle

Functions supports you through every stage of app development:

1. **Code** in C#, Java, JavaScript, PowerShell, or Python, or use custom handlers for languages like Rust and Go.
2. **Develop and debug** locally with Visual Studio, Visual Studio Code, Maven, and other tools.
3. **Deploy** to Azure using CLI, CI/CD pipelines, or your IDE.
4. **Monitor** performance and diagnose issues with built-in Azure Monitor and Application Insights integration.

## Hosting options

Functions provides various hosting options for your business needs and application workload.

Hosting option

Description

Flex Consumption plan

**Recommended.** Fast event-driven scaling, virtual network integration, and pay-as-you-go billing.

Premium plan

Always-warm instances for the fastest response times, unlimited execution duration, and virtual network integration.

Dedicated plan

Run functions in an existing App Service plan with predictable scaling and costs.

Container Apps

Deploy fully customized containerized function apps alongside microservices in Azure Container Apps.

Consumption plan

Legacy serverless plan (Windows only). Use the Flex Consumption plan for new apps.

For a detailed comparison, see Azure Functions hosting options.

* Azure Functions scenarios
* Get started with Azure Functions

Was this page helpful?

No

* Last updated on 2026-03-23
