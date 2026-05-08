Published on 30 May 2025

SwiftUI’s `ViewBuilder` type is a key part of the library’s overall API design, in that it’s what enables multiple view expressions to be declared within a given scope (such as a `body` property implementation, or a closure passed to containers such as `HStack` or `VStack`) without requiring any manual grouping or wrapping at each call site.

For example, within the following `VStack`, we can simply place each subview within the closure we pass to it, and `ViewBuilder` will take care of collecting those views and _building_ them into the final content that then gets rendered within the stack:

```
VStack {
 Image(systemName: "star")
 Text("Hello, world!")
}
```

What’s interesting about `ViewBuilder` is that it’s completely possible to use SwiftUI for a significant amount of time before even discovering that it exists. After all, we don’t have to reference it explicitly in most situations, as SwiftUI’s various closures and protocols have already been annotated with the corresponding `@ViewBuilder` attribute out of the box.

For example, the `View` protocol that we use every time we want to define a custom view uses `ViewBuilder` implicitly, since the definition for the `body` property requirement looks like this:

```
@MainActor @preconcurrency public protocol View {
 associatedtype Body : View

 @ViewBuilder @MainActor @preconcurrency var body: Self.Body { get }
}
```

That’s what makes it possible to use things like control flow within our view `body` implementations, even when each branch within such a flow returns different types, and even when we don’t explicitly mark our property with `@ViewBuilder` ourselves:

```
struct RootView: View {
 @State private var user: User?

 var body: some View {
 if let user {
 HomeView(user: user)
} else {
 LoginView(user: $user)
}
 }
}
```

> The way our views automatically get annotated with `@ViewBuilder` works the same way as why we don’t have to manually mark our views as `@MainActor` to run them on the main thread — our custom view types automatically inherit those attributes from the `View` protocol declaration.

But there _are_ situations in which using `ViewBuilder` directly can be incredibly useful — so let’s go ahead and explore a few such examples, along with some tips and tricks that can be good to keep in mind when writing that kind of code.

Swift by Sundell is brought to you by the **Genius Scan SDK** — Add a powerful document scanner to any mobile app, and turn scans into high-quality PDFs with one line of code. Try it today.

## Custom containers

Any property, function, or closure can be marked with the `@ViewBuilder` attribute, which opts that code into getting the same _“DSL-like”_ capabilities as SwiftUI’s built-in APIs. For example, let’s say that we’re building a custom `Container` view, which renders a `header` on top of a `content` view, while also applying some default styling to those two components:

```
struct Container<Header: View, Content: View>: View {
 var header: Header
 var content: Content

 var body: some View {
 VStack(spacing: 0) {
 header
 .frame(maxWidth: .infinity)
 .padding()
 .foregroundStyle(.white)
 .background(Color.blue)

 ScrollView {
 content.padding()
 }
 }
 }
}
```

As our `Container` view is currently defined, we’re limited to using just a single view for both the `header` and `content` properties, and we’d pass them just like we’d pass any other Swift initializer values — for example like this:

```
Container(header: Text("Welcome"), content: ContentView())
```

Now, let’s go ahead and mark both `header` and `content` with the `@ViewBuilder` attribute, to see how that affects our view’s API:

```
struct Container<Header: View, Content: View>: View {
 @ViewBuilder var header: Header
 @ViewBuilder var content: Content

 var body: some View {
 ...
 }
}
```

What’s interesting is that, even though we haven’t redefined either of the above properties as being closures (they still both just store a single view value), their values must now be _passed_ as closures when we initialize our `Container` view. `ViewBuilder` will then take any closure that we passed, and apply its view building logic to it, resulting in a single output view, which is then stored within each property.

What that means is that we’re now able to use the same SwiftUI syntax as when interacting with the library’s built-in APIs when defining either our `header` or `content`. Let’s use that new capability to update our `RootView` from before to use our new `Container` implementation, as we’re now able to use an `if` statement with separate view branches to declare our view’s `content`:

```
struct RootView: View {
 @State private var user: User?

 var body: some View {
 Container(header: {
 Text("Welcome")
 }, content: {
 if let user {
 HomeView(user: user)
} else {
 LoginView(user: $user)
}
 })
 }
}
```

Neat! Next, let’s take a look at how we might handle situations when we want to omit a specific component from a custom container view.

## Making view builder properties optional

For example, let’s say that we want to make our `Container` view’s `header` optional. One way to get that done would be to write an extension on `Container` with a generic constraint on SwiftUI’s `EmptyView` type, which allows us to then pass that type’s initializer as a closure when calling our view’s member-wise initializer:

```
extension Container where Header == EmptyView {
 init(@ViewBuilder content: () -> Content) {
 self.init(header: EmptyView.init, content: content)
 }
}
```

Note that we have to use a closure for our `content` property above, rather than just a `Content` value. That’s because the automatic conversion from view builder closure to single view value that we utilized before only works for stored properties, not for function arguments. Our closure doesn’t need to be `@escaping`, though, since SwiftUI will still evaluate it directly and automatically convert it into a single view, just like when using our view’s member-wise initializer.

With the above in place, we could now update our `RootView` to no longer use a header, which in turn enables us to use trailing closure syntax to achieve a call site that looks exactly like when using SwiftUI’s built in containers (like `HStack` or `VStack`):

```
struct RootView: View {
 @State private var user: User?

 var body: some View {
 Container {
 if let user {
 HomeView(user: user)
 } else {
 LoginView(user: $user)
 }
 }
 }
}
```

While the above works great, there’s an alternative approach that we can take if we don’t want to define a constrained `Container` extension, but rather just use a custom initializer with default argument values instead.

What’s cool about using `ViewBuilder` is that, unlike when accepting separate view values directly, the compiler will automatically infer the concrete types for `Header` and `Content` if we use default arguments for their corresponding values.

So, if we specify `EmptyView.init` as the default value for our `header` property argument, then we can achieve the exact same result as when using the extension-based approach, while also giving us the option to keep adding more default values and convenience APIs in the future — all without having to define multiple extensions:

```
struct Container<Header: View, Content: View>: View {
 var header: Header
 var content: Content

 init(@ViewBuilder header: () -> Header = EmptyView.init,
 @ViewBuilder content: () -> Content) {
 self.header = header()
 self.content = content()
 }

 var body: some View {
 ...
 }
}
```

Note that we no longer need to add the `@ViewBuilder` attribute to our properties, since we now perform the closure-to-view conversion ourselves (by simply calling those closures within our view’s initializer).

An alternative approach would’ve been to instead store references to our closures within the `header` and `content` properties, and to then call those closures within our view’s `body`. Doing so wouldn’t make much of a difference in this particular case (besides requiring those closures to be `@escaping`, which most of SwiftUI’s own view builder closures aren’t), however, in some situations, taking that approach can significantly hurt performance — since we’ll end up re-evaluating those closures every time our view’s `body` gets re-evaluated. So, when possible, resolving each view builder closure up-front gives us the most predictable and consistent results.

## Handling multiple view expressions

Just like when using SwiftUI’s built-in containers, it’s also now possible to place multiple view expressions within either our `header` or `content` closures. For example, if we bring back the header within our `RootView`, we might use this capability to add a `NavigationLink` below our welcome text — like this:

```
struct RootView: View {
 ...

 var body: some View {
 Container(header: {
 Text("Welcome")
 NavigationLink("Info") {
 InfoView()
}
 }, content: {
 ...
 })
 }
}
```

However, call sites like the one above might not always produce the result we’d expect, since when processed by `ViewBuilder`, multiple view expressions will essentially be treated the same way as if they were added to a SwiftUI `Group` — in that they’ll each be independently styled, sized, and positioned according to the current context.

So, in the above example, we’re not actually adding a _combined header_ to our view, but rather _two separate headers_ — each with its own layout within the enclosing `VStack`, and each with its own set of modifiers applied to it.

To resolve that, it might be a good idea to wrap both our `header` and `content` views within explicit containers, so that their layout will always be predictable, even when multiple view expressions are used at a specific call site:

```
struct Container<Header: View, Content: View>: View {
 ...

 var body: some View {
 VStack(spacing: 0) {
 VStack { header }
 .frame(maxWidth: .infinity)
 .padding()
 .foregroundStyle(.white)
 .background(Color.blue)

 ScrollView {
 VStack { content }
 .padding()
 }
 }
 }
}
```

Whether to take the above approach (and enforce a specific layout within the container in question), or leave it up to each call site to define its own layout, will likely come down to a combination of personal/team preference and the specific container (and layout behaviors) that we’re implementing.

There are cases, though, where it’s arguably best to add an explicit container at the call site, in order to make our code more clear and easier to maintain. For example, here we’re using `@ViewBuilder` as a sort of code organization tool, in that we’re applying it to private functions that we’re using to build separate parts of our view — which in general is a really great way to structure increasingly complex SwiftUI view implementations, rather than allowing our `body` properties to grow too large in scope:

```
struct RootView: View {
 @State private var user: User?

 var body: some View {
 Container(header: header, content: content)
 }
}

private extension RootView {
 @ViewBuilder func header() -> some View {
 Text("Welcome")
 NavigationLink("Info") {
 InfoView()
 }
 }

 @ViewBuilder func content() -> some View {
 if let user {
 HomeView(user: user)
 } else {
 LoginView(user: $user)
 }
 }
}
```

However, while our above code is now very neatly organized, the semantics of our new `header` function are arguably a bit odd — since it doesn’t really return _a header_, but rather multiple view expressions that will be _built into a header_. It might be a nitpicky detail in the grand scheme of things, but aiming to write code to be as clear as possible does often really help when it comes to future maintainability.

A rule of thumb that can be good to follow is that a function or computed property should never return multiple root view expressions (since that gives us an implicit group, just like before). Instead, it would arguably be better if our `header` function didn’t actually use `ViewBuilder`, but rather just returned an explicit `VStack` which in turn contains our header view’s content. That way, it’ll become crystal clear how our header will be rendered, even if we end up changing how our `Container` view works in the future:

```
private extension RootView {
 func header() -> some View {
 VStack(spacing: 20) {
 Text("Welcome")
 NavigationLink("Info") {
 InfoView()
 }
 }
 }

 @ViewBuilder func content() -> some View {
 if let user {
 HomeView(user: user)
 } else {
 LoginView(user: $user)
 }
 }
}
```

We still want to keep using `@ViewBuilder` for our `content` function, though, since it returns just a single (albeit conditional) root view expression.

Swift by Sundell is brought to you by the **Genius Scan SDK** — Add a powerful document scanner to any mobile app, and turn scans into high-quality PDFs with one line of code. Try it today.

## Conclusion

SwiftUI’s `ViewBuilder` is a really powerful tool, and the fact that we can opt our own code into using it gives us a lot of flexibility when it comes to how we want to structure and reuse our UI code. By adopting it within our own custom containers, we can really craft APIs that feel right at home alongside SwiftUI’s own features, which in turn should help us improve the consistency and clarity of the UI code that we write.

I hope you enjoyed this article. If you have any questions, comments, or feedback, then feel free to reach out via either Mastodon or Bluesky.

Thanks for reading!
