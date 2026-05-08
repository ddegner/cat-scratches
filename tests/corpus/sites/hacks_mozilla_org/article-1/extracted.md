In our previous blog post about the web testing ecosystem, we described the tradeoffs involved in automating the browser via the HTTP-based WebDriver standard versus DevTools protocols such as Chrome DevTools Protocol (CDP). Although there are benefits to WebDriver’s HTTP-based approach, we know there are many developers who find the additional functionality and ergonomics of CDP-based test tools compelling.

It’s clear that WebDriver needs to grow to meet the capabilities of DevTools-based automation. However, that process will take time, and we want more developers to be able to run their automated tests in Firefox today.

To that end, we have shipped an experimental implementation of parts of CDP in Firefox Nightly, specifically targeting the use cases of end-to-end testing using Google’s Puppeteer, and the CDP-based features of Selenium 4.

For users looking to use CDP tooling with stable releases of Firefox, we are currently going through the process to enable the feature on release channels and we hope to make this available as soon as possible.

The remainder of this post will look at the details of how to use Firefox with CDP-based tools.

## Puppeteer Automation

Puppeteer is a Node.js library that provides an intuitive async browser-automation API on top of CDP.

Puppeteer itself now offers experimental support for Firefox, based on our CDP implementation. This change was made in collaboration with the Puppeteer maintainers, and allows many existing Puppeteer tests to run in Firefox with only minimal configuration changes.

To use Puppeteer with Firefox, install the puppeteer package and set its product option to “firefox”. As of version 3.0, Puppeteer’s npm install script can automatically fetch the appropriate Firefox Nightly binary for you, making it easier to get up and running.

PUPPETEER\_PRODUCT=firefox npm install puppeteer

The following example shows how to launch Firefox in headless mode using Puppeteer:

```javascript

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    product: 'firefox',
  });
});
```

That’s all there is to it! Adding that one launch option is all that’s required to run a Puppeteer script against Firefox.

You can find a longer example script in the Puppeteer repository that also demonstrates troubleshooting tips such as printing internal browser logs.

Expanding the script from above, let’s navigate to a page and test an element property. You can see a similar example using WebDriver in this series’ first blog post.

```javascript

const page = await browser.newPage();
await page.goto('http://localhost:8000');
const element = await page.$('.test');
expect(await element.evaluate(node => node.tagName)).toBe('DIV');
```

Although this has the same functionality as the WebDriver script in the first post, there’s considerably more going on under the hood. With WebDriver this kind of script maps pretty directly onto the protocol, with one remote call per line. For Puppeteer, browser initialization alone depends on fifteen different CDP methods and three kinds of events.

The call to page.goto checks multiple CDP events to ensure that navigation has succeeded, while the calls to page.$ and element.evaluate are both high-level abstractions on top of remote script evaluation.

This additional complexity presents an implementation challenge; making even a simple script work requires a browser to implement many commands and events, and even apparently small deviations from the behaviour of Blink can break assumptions made in the client.

That fragility is not just a result of CDP offering lower-level control than WebDriver, but a consequence of implementing a proprietary protocol which wasn’t designed with cross-browser support in mind.

The CDP support available in Firefox Nightly today enables core Puppeteer features such as navigation, script evaluation, element interaction and screen capture. We understand that many users will depend on APIs we don’t yet support. For example, we know that network request interception is a compelling feature that isn’t yet supported by the Firefox CDP implementation.

Nevertheless, we are interested in feedback when Puppeteer scripts don’t work as expected in Firefox; see the end of this post for how to get in touch.

## Selenium 4

As well as fully CDP-based clients like Puppeteer, WebDriver-based clients are starting to add additional functionality based on CDP. For example, Selenium 4 will use CDP to offer new APIs for logging, network request interception, and responding to DOM mutation. Firefox Nightly already has support for the CDP features needed to support access to console log messages.

This represents a longstanding feature request from test authors who want to assert that their test completes without unanticipated error messages, and to collect any logged messages to help debug in the case of a failure.

For example, given a page that logs a message e.g.

```html

<title>Test page</title>

```

and the following script using the latest trunk Selenium Python bindings:

```python

import trio
from selenium import webdriver
from selenium.webdriver.common.bidi.console import Console

async def get_console_errors():
 driver = webdriver.Firefox()

 async with driver.add_listener(Console.ALL) as messages:
 driver.get("http://localhost:8000/test.html")
 print(messages['message'])

 driver.quit()

trio.run(get_console_errors)
```

The script will output “`A log message`”.

We are working to enable more Selenium 4 features for Firefox users, and collaborating with the Selenium authors to ensure that they are supported in all the provided language bindings.

## Accessing the CDP Connection Directly

For users who want to experiment with the underlying CDP protocol in Firefox without relying on an existing client, the mechanism to enable CDP support is very similar to that for Chrome. To start the CDP server, launch Firefox Nightly with the `--remote-debugging-port` command-line option. By default, this starts a server on port 9222. The browser process will print a message like the following to stderr:

DevTools listening on ws://localhost:9222/devtools/browser/9fa78d94-9133-4460-a4f2-f8ffa149b354

This provides the WebSocket URL that is used for interacting with CDP. The server also exposes a couple of useful HTTP endpoints. For example, you can get a list of all available WebSocket targets from `http://localhost:9222/json/list`.

## Bringing advanced automation to all browsers

Our experimentation with CDP in Firefox is an early step toward developing a new version of the WebDriver protocol called WebDriver BiDi. While we participate in the standardization process, our team is interested in feedback around cross-browser end-to-end testing workflows. We invite developers to try running their Puppeteer, or other CDP-based, tests against Firefox Nightly.

If you encounter unexpected behaviour or if there are features that you are missing, there are several ways to reach out to us:

* We are looking out for Firefox-specific reports on Puppeteer’s issue tracker.
* If you’re accessing Firefox’s CDP connection directly without a client library, the best place to report issues is Mozilla’s Bugzilla
* Feel free to ask questions on our Matrix channel #remote-protocol

Wherever you send your feedback, we love to receive protocol-level logs

An automation solution based on a proprietary protocol will always be limited in the range of browsers it can support. The success of the web is built on multi-vendor standards. It’s important that test tooling builds on standards as well so that tests work across all the browsers and devices where the web works.

In the future, we may publish more posts to introduce the work we’re exploring with other vendors on WebDriver-BiDi, a standardization project to specify a bidirectional, automation-focused, protocol for the future.

## Acknowledgements

Thanks to Tantek Çelik, Karl Dubost, Jan Odvarko, Devin Reams, and Maire Reavy for their valuable feedback and suggestions.

## About Maja Frydrychowicz

* https://www.erranderr.com/

More articles by Maja Frydrychowicz…

## About James Graham

Software engineer focused on maintaining a healthy open web. Web-platform-tests core team member.

* https://hoppipolla.co.uk

More articles by James Graham…

## About Henrik Skupin

* https://www.hskupin.info/

More articles by Henrik Skupin…
