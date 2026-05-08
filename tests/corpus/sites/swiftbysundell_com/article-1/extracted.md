Published on 31 Aug 2025

As an app’s code base grows and evolves, it can be really tricky to maintain consistency within its UI. It’s easy for things like margins and padding, or colors and fonts, to start diverging, as different developers might use different values within each individual UI component’s implementation. At the same time, UI code can also become increasingly complex, since new features might be designed and implemented completely from scratch, which often leads to a minimum amount of code reuse and duplicated engineering efforts.

That’s where some form of _design system_ can be incredibly useful. Although a design system can take many different shapes and forms, the general idea is to formalize an app’s design and overall UI, by creating various components that can easily be reused within different contexts — leading to a more consistent, decoupled, and reusable overall implementation (both in terms of design and code).

At first, it might seem really tricky to start building such a system — as it’s common to consider it to be an enormous project that will require months to complete. Not to mention that the whole app then seemingly needs be rewritten to adopt the new system. The good news, though, is that a design system can very often be built incrementally, and there’s really no need to rewrite anything to get started.

So, in this article, I’d like to share how I’ve been helping the team at Genius Scan (which is also the company that has helped me bring back Swift by Sundell after a long hiatus, by promoting their SDK) to build an initial design system, which is being incrementally adopted across all of the company’s various code bases.

This article won’t be a step-by-step tutorial on how to build a design system for any app, but rather an example (real-world, although somewhat edited to work well for an article) of how to approach the task of building such a system. I hope it’ll be interesting, and serve as a nice source of inspiration.

Swift by Sundell is brought to you by the **Genius Scan SDK** — Add a powerful document scanner to any mobile app, and turn scans into high-quality PDFs with one line of code. Try it today.

## Picking an entry point

Like all good engineering solutions, building a design system should aim to solve an actual problem that we’re facing within a given project. So, in the case of Genius Scan, what prompted us to start building such a system was that we had been struggling to maintain consistency (which in turn lead to duplicate bug fixes, and code duplication) within certain parts of our UI code — specifically within our various _lists_.

Like many other iOS apps, Genius Scan has a lot of list views — which let you view your scanned documents, folders, export services, and so on. So the first goal for our design system was to create a robust solution for building such lists, that would enable us to share as much code and design properties as possible between them, while still having a system that would be flexible enough to accommodate each list’s different needs.

By picking an initial, reasonably sized goal like that, and not requiring an entire huge set of components to be built up front, we would be able to build and test the initial version of our design system quite quickly, and incrementally adopt it whenever we built a new list, or when an existing one was significantly updated or refactored.

## Composition is key

One mistake that’s sometimes made when building design systems is to lock them down too much around a specific set of prepared components. After all, even in the most consistent app code bases, different features will require different component tweaks, and app designs also tend to change over time.

So, just like how Apple designed SwiftUI’s overall API, placing a strong focus on _composition_ can be incredibly important in order to create a design system that’ll actually stand the test of time. Essentially, we want to create a set of robust, well-defined building blocks, that can then be combined in order to create the actual UI for the features that we want to build.

In the case of Genius Scan, since our initial focus was on lists, we started by creating a basic `Row` component, which would simply combine a leading and trailing element into a horizontal row:

```
// We define all of our design system APIs as 'public', since
// we're implementing our system as a separate Swift package.
public struct Row<Leading: View, Trailing: View>: View {
 public var leading: Leading
 public var trailing: Trailing

 public init(
 @ViewBuilder leading: () -> Leading,
 @ViewBuilder trailing: () -> Trailing = EmptyView.init
 ) {
 self.leading = leading()
 self.trailing = trailing()
 }
 
 public var body: some View {
 HStack {
 leading

 trailing
 .padding(.leading)
 .frame(maxWidth: .infinity, alignment: .trailing)
 }
 .frame(maxWidth: .infinity, alignment: .leading)
 }
}
```

Note how we evaluate both of our content closures within the view’s initializer, rather than within its `body`. That’s to avoid re-evaluating the closures every time the view is updated. To learn more, check out “Tips and tricks for when using SwiftUI’s ViewBuilder”.

The above component might not look that useful by itself, but it serves as a great starting point for building increasingly more complex row-based components. For example, using the above `Row`, we can now construct a specialized version of it for rendering a row that has a label and a text field — like this:

```
public struct TextFieldRow: View {
 public var title: String
 public var placeholder: String
 @Binding public var text: String

 @FocusState private var isTextFieldFocused

 public init(title: String, placeholder: String, text: Binding<String>) {
 self.title = title
 self.placeholder = placeholder
 _text = text
 }

 public var body: some View {
 Row(leading: {
 Text(title)
 .bold()
 .foregroundStyle(isTextFieldFocused ? .orange : .primary)
 .onTapGesture { isTextFieldFocused = true }
 }, trailing: {
 TextField(placeholder, text: $text)
 .multilineTextAlignment(.trailing)
 .focused($isTextFieldFocused)
 })
 }
}
```

We’re still building the foundation for our new design system, but we now already have a component that’s ready to be used as-is in a wide number of scenarios — for example whenever the user is entering text into some kind of form. But where the true power of a design system starts to show is when we start building in functionality into our components that all call sites get for free.

For example, if we add a `contentType` parameter to our `TextFieldRow`, then we can use that both to give the system a hint regarding what kind of text that the user is entering, as well as to choose the appropriate keyboard for that content type, and even automatically use a `SecureField` when the user is expected to input a password:

```
public struct TextFieldRow: View {
 ...
 public var contentType: UITextContentType?
 ...

 public init(
 title: String,
 placeholder: String,
 contentType: UITextContentType?,
 text: Binding<String>
 ) {
 ...
 self.contentType = contentType
 ...
 }

 public var body: some View {
 Row(leading: {
 ...
 }, trailing: {
 inputView
 .multilineTextAlignment(.trailing)
 .textContentType(contentType)
.keyboardType(contentType?.matchingKeyboardType ?? .default)
 .focused($isTextFieldFocused)
 })
 }

 @ViewBuilder private var inputView: some View {
 switch contentType {
case .password, .newPassword:
 SecureField(placeholder, text: $text)
default:
 TextField(placeholder, text: $text)
}
 }
}
```

One core aspect of SwiftUI that really makes it a great fit for building a design system is how easy it typically makes extracting one part of a component into a brand new implementation — which in turn gives us further opportunities for composition and code reuse.

For example, let’s say that we now wanted to make the above `UITextContentType`\-related logic reusable, so that it’s not specifically tied to `TextFieldRow`. That could be done by extracting all of those parts into a new `TextInputView`, which we’d then make `TextFieldRow` use:

```
public struct TextInputView: View {
 public var placeholder: String
 public var contentType: UITextContentType?
 @Binding public var text: String

 public init(
 placeholder: String,
 contentType: UITextContentType?,
 text: Binding<String>
 ) {
 self.placeholder = placeholder
 self.contentType = contentType
 _text = text
 }

 public var body: some View {
 inputView
 .textContentType(contentType)
 .keyboardType(contentType?.matchingKeyboardType ?? .default)
 }

 @ViewBuilder private var inputView: some View {
 switch contentType {
 case .password, .newPassword:
 SecureField(placeholder, text: $text)
 default:
 TextField(placeholder, text: $text)
 }
 }
}

public struct TextFieldRow: View {
 ...

 public var body: some View {
 Row(leading: {
 ...
 }, trailing: {
 TextInputView(
 placeholder: placeholder,
 contentType: contentType,
 text: $text
)
 .multilineTextAlignment(.trailing)
 .focused($isTextFieldFocused)
 })
 }
}
```

So, as the above examples illustrate, the process of getting started building a design system can really be quite simple, and as long as we focus on implementing composable building blocks, we’re quite likely to end up with a flexible solution that doesn’t require a lot of complex logic within each specific component.

For example, if a given feature within our app needs to show a label that’s different from the one that the default `TextFieldRow` uses, then that feature can now simply compose the root `Row` type with `TextInputView`, and define its own `leading` label for such rows, without having to add that additional complexity within our design system itself. That way the system itself can stay well-organized and focused, and defer all specialization to each individual feature.

## The power of the environment

When it comes to specialization and customization, we do still want to enable our components to be tweaked to some extent, so that we won’t end up requiring a brand new (composed) implementation each time. Otherwise, we can often end up with another problem — that very few features actually end up _using_ the design system that we’ve built, since building components from scratch ends up being easier.

The key here is to strike a nice balance between adding too much feature-specific functionality into our design system itself, versus making our components too simple and therefore not practically useable (which is also a big reason why it’s typically a good idea to have feature work drive the implementation of our design system, rather than building it in complete isolation).

For example, in the case of Genius Scan, some of the lists that we were building required each row to be inset with a certain amount of padding. Now, we could of course add support for that by adding a `padding` parameter to each of our row components, but that wouldn’t really be in favor of our consistency goal, and would also likely lead to code duplication and lots of magic numbers.

Instead, let’s take a look at how we can add a mechanism for changing a given row’s style using the _SwiftUI environment_.

To get started, let’s define a root `Configuration` value that we’re going to use to encapsulate all of our design system’s configurable parameters — which will also give us a great overview of what kind of design system aspects that are currently user-adjustable. In the case of Genius Scan, that configuration type ended up looking something like this:

```
struct Configuration {
 var rows = Row.Configuration()
 var colors = Color.Configuration()
 var icons = Icon.Configuration()
 ...
}

extension EnvironmentValues {
 @Entry var configuration = Configuration()
}
```

> Note how we also define an `@Entry` for our configuration within SwiftUI’s `EnvironmentValues` type. That’s so that we later will be able to get and set our design system’s configuration values through the SwiftUI environment.

As we can see above, the root `Configuration` type essentially just encapsulates other configuration types that are specific to each component category, such as `rows`. That way, we can prevent `Configuration` from having too many properties, while also adding a bit of extra structure to our configuration values.

Looking closer at `Row.Configuration` in particular, it’ll enable us to change which `RowStyle` to use, and what background color to use for rows that are using the `inset` style:

```
public enum RowStyle {
 case plain
 case inset
}

extension Row where Leading == Never, Trailing == Never {
 struct Configuration {
 var style = RowStyle.plain
 var insetBackgroundColor = Color.secondary
 ...
 }
}
```

> Above we’re specifying `Never` as the generic constraint for both our `Leading` and `Trailing` types, since we want to use a single, non-generic `Configuration` type for all of our `Row` variants. In theory, we could’ve picked any other type to constrain to (such as `Text`, or `Color`), but `Never` is a quite good fit here since otherwise it might seem like our configuration only applies to rows with a specific kind of leading or training content.

With the above pieces in place, let’s now update our `Row` component from before, by retrieving the `row` part of our design system’s configuration from the current environment, and to then use those configuration values to determine how to render each row’s `content` (which is the exact same UI code that we originally implemented directly within the `body` property):

```
public struct Row<Leading: View, Trailing: View>: View {
 ...
 @Environment(\.configuration.rows) private var configuration
 ...

 public var body: some View {
 switch configuration.style {
 case .plain:
 content
 case .inset:
 content
 .padding()
 .background(configuration.insetBackgroundColor)
 }
 }
 
 private var content: some View {
 HStack {
 leading

 trailing
 .padding(.leading)
 .frame(maxWidth: .infinity, alignment: .trailing)
 }
 .frame(maxWidth: .infinity, alignment: .leading)
 }
}
```

Alright, just one piece of the puzzle left. You might have noticed that we didn’t actually make our `Configuration` type `public` earlier, even though we of course want users of our design system to be able to change configuration values from within a consuming app target.

The reason for that is because we instead want to define explicit public APIs for changing different aspects of each configuration — by implementing modifier-like `View` methods that will blend in very nicely with SwiftUI’s own APIs. That way, our `Configuration` type becomes an internal implementation detail, and we can tailor what kind of configuration aspects that we want to give each call site control over, like this:

```
public extension View {
 func rowStyle(_ style: RowStyle) -> some View {
 environment(\.configuration.rows.style, style)
 }
 
 func rowInsetBackgroundColor(_ color: Color) -> some View {
 environment(\.configuration.rows.insetBackgroundColor, color)
 }
}
```

> Above we’re allowing any `Color` value to be set as the row inset background color, which favors flexibility. However, if we’d like to restrict our API users to instead only pick from a set of pre-defined colors, then we could’ve defined our own `Color` enum instead of using SwiftUI’s color type directly.

By continuously using the principles that we explored above, we can take this very early beginning of a design system and keep scaling it up — to add more components, more APIs, and to increase adoption within any apps that consume our system. A design system will probably never be “finished”, as it will likely need to be an ever-evolving code base that’s adapted to new designs, as well as system changes from Apple — such as the introduction of Liquid Glass in iOS 26.

Swift by Sundell is brought to you by the **Genius Scan SDK** — Add a powerful document scanner to any mobile app, and turn scans into high-quality PDFs with one line of code. Try it today.

## Conclusion

A design system is not something that you’d typically start building when an app’s code base is relatively small, but once a code base reaches a point where UI consistency and code duplication starts to become an issue, then building a design system can be a great solution to such problems.

Plus, I’ve personally found that building a design system can often really help make the collaboration between developers and designers much better. When everyone involved in designing and building an app’s UI is focused on how different components can be defined and then later composed, then the process of translating designs into code often becomes so much more streamlined, and communication becomes smother too — since everyone now has a shared “vocabulary” of sorts when talking about the app’s UI.

I hope that you found this article interesting. If you have any questions, comments, or feedback, then feel free to each out via either Mastodon or Bluesky.

Thanks for reading!
