Artifact: androidx.compose.ui:ui

View Source

Added in 1.0.0

Common/AllAndroid/JVM

* Cmn
 
 interface Modifier

Known direct subclasses

CombinedModifier, Modifier.Companion, Modifier.Element

`CombinedModifier`

A node in a `Modifier` chain.

`Modifier.Companion`

The companion object `Modifier` is the empty, default, or starter `Modifier` that contains no `elements`.

`Modifier.Element`

A single element contained within a `Modifier` chain.

Known indirect subclasses

DrawCacheModifier, DrawModifier, FocusEventModifier, FocusOrderModifier, FocusRequesterModifier, InspectableModifier.End, InspectableModifier, LayoutModifier, ModifierLocalConsumer, ModifierLocalProvider, ModifierNodeElement, OnGloballyPositionedModifier, OnPlacedModifier, OnRemeasuredModifier, ParentDataModifier, PointerInputModifier, RemeasurementModifier, SemanticsModifier

`DrawCacheModifier`

`DrawModifier` implementation that supports building a cache of objects to be referenced across draw calls

`DrawModifier`

A `Modifier.Element` that draws into the space of the layout.

`FocusEventModifier`

**This interface is deprecated.** Use FocusEventModifierNode instead

`FocusOrderModifier`

**This interface is deprecated.** Use Modifier.focusProperties() instead

`FocusRequesterModifier`

**This interface is deprecated.** Use FocusRequesterModifierNode instead

`InspectableModifier.End`

**This class is deprecated.** This API will create more invalidations of your modifier than necessary, so it's use is discouraged.

`InspectableModifier`

**This class is deprecated.** This API will create more invalidations of your modifier than necessary, so it's use is discouraged.

`LayoutModifier`

A `Modifier.Element` that changes how its wrapped content is measured and laid out.

`ModifierLocalConsumer`

A Modifier that can be used to consume `ModifierLocal`s that were provided by other modifiers to the left of this modifier, or above this modifier in the layout tree.

`ModifierLocalProvider`

A Modifier that can be used to provide `ModifierLocal`s that can be read by other modifiers to the right of this modifier, or modifiers that are children of the layout node that this modifier is attached to.

`ModifierNodeElement`

A `Modifier.Element` which manages an instance of a particular `Modifier.Node` implementation.

`OnGloballyPositionedModifier`

A modifier whose `onGloballyPositioned` is called with the final LayoutCoordinates of the Layout when the global position of the content may have changed.

`OnPlacedModifier`

A modifier whose `onPlaced` is called after the parent `LayoutModifier` and parent layout has been placed and before child `LayoutModifier` is placed.

`OnRemeasuredModifier`

A modifier whose `onRemeasured` is called when the layout content is remeasured.

`ParentDataModifier`

A `Modifier` that provides data to the parent `Layout`.

`PointerInputModifier`

A `Modifier.Element` that can interact with pointer input.

`RemeasurementModifier`

A `Modifier.Element` that provides a `Remeasurement` object associated with the layout node the modifier is applied to.

`SemanticsModifier`

A `Modifier.Element` that adds semantics key/value for use in testing, accessibility, and similar use cases.

An ordered, immutable collection of `modifier elements` that decorate or add behavior to Compose UI elements. For example, backgrounds, padding and click event listeners decorate or add behavior to rows, text or buttons.

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.padding
import androidx.compose.material.Text
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

Text(
 "Hello, World!",
 Modifier.padding(16.dp) // Outer padding; outside background
 .background(color \= Color.Green) // Solid element background color
 .padding(16.dp), // Inner padding; inside background, around text
)

Modifier implementations should offer a fluent factory extension function on `Modifier` for creating combined modifiers by starting from existing modifiers:

import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

class FancyModifier(val level: Float) : Modifier.Element

fun Modifier.fancy(level: Float) \= this.then(FancyModifier(level))

Row(Modifier.fancy(1f).padding(10.dp)) {
 // content
}

Modifier elements may be combined using `then`. Order is significant; modifier elements that appear first will be applied first.

Composables that accept a `Modifier` as a parameter to be applied to the whole component represented by the composable function should name the parameter `modifier` and assign the parameter a default value of `Modifier`. It should appear as the first optional parameter in the parameter list; after all required parameters (except for trailing lambda parameters) but before any other parameters with default values. Any default modifiers desired by a composable function should come after the `modifier` parameter's value in the composable function's implementation, keeping `Modifier` as the default parameter value. For example:

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun PaddedColumn(modifier: Modifier \= Modifier) {
 Column(modifier.padding(10.dp)) {
 // ...
 }
}

The pattern above allows default modifiers to still be applied as part of the chain if a caller also supplies unrelated modifiers.

Composables that accept modifiers to be applied to a specific subcomponent `foo` should name the parameter `fooModifier` and follow the same guidelines above for default values and behavior. Subcomponent modifiers should be grouped together and follow the parent composable's modifier. For example:

import androidx.compose.foundation.layout.Row
import androidx.compose.material.Button
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier

@Composable
fun ButtonBar(
 onOk: () \-\> Unit,
 onCancel: () \-\> Unit,
 modifier: Modifier \= Modifier,
 buttonModifier: Modifier \= Modifier,
) {
 Row(modifier) {
 Button(onCancel, buttonModifier) { Text("Cancel") }
 Button(onOk, buttonModifier) { Text("Ok") }
 }
}

## Summary

### Nested types

`object Modifier.Companion : Modifier`

The companion object `Modifier` is the empty, default, or starter `Modifier` that contains no `elements`.

`interface Modifier.Element : Modifier`

A single element contained within a `Modifier` chain.

`abstract class Modifier.Node : DelegatableNode`

The longer-lived object that is created for each `Modifier.Element` applied to a `androidx.compose.ui.layout.Layout`.

 ### Public companion functions

`open Boolean`

`all(predicate: (Modifier.Element) -> Boolean)`

Returns `true` if `predicate` returns true for all `Element`s in this `Modifier` or if this `Modifier` contains no `Element`s.

Cmn

`open Boolean`

`any(predicate: (Modifier.Element) -> Boolean)`

Returns `true` if `predicate` returns true for any `Element` in this `Modifier`.

Cmn

`open R`

`<R : Any?> foldIn(initial: R, operation: (Modifier.Element, R) -> R)`

Accumulates a value starting with `initial` and applying `operation` to the current value and each element from outside in.

Cmn

`open R`

`<R : Any?> foldOut(initial: R, operation: (Modifier.Element, R) -> R)`

Accumulates a value starting with `initial` and applying `operation` to the current value and each element from inside out.

Cmn

`open infix Modifier`

`then(other: Modifier)`

Concatenates this modifier with another.

Cmn

`open String`

`toString()`

Cmn

 ### Public functions

`Boolean`

`all(predicate: (Modifier.Element) -> Boolean)`

Returns `true` if `predicate` returns true for all `Element`s in this `Modifier` or if this `Modifier` contains no `Element`s.

Cmn

`Boolean`

`any(predicate: (Modifier.Element) -> Boolean)`

Returns `true` if `predicate` returns true for any `Element` in this `Modifier`.

Cmn

`R`

`<R : Any?> foldIn(initial: R, operation: (Modifier.Element, R) -> R)`

Accumulates a value starting with `initial` and applying `operation` to the current value and each element from outside in.

Cmn

`R`

`<R : Any?> foldOut(initial: R, operation: (Modifier.Element, R) -> R)`

Accumulates a value starting with `initial` and applying `operation` to the current value and each element from inside out.

Cmn

`open infix Modifier`

`then(other: Modifier)`

Concatenates this modifier with another.

Cmn

 ### Extension functions

`Modifier`

`Modifier.paddingFrom(alignmentLine: AlignmentLine, before: Dp, after: Dp)`

A `Modifier` that can add padding to position the content according to specified distances from its bounds to an `alignment line`.

Cmn

`Modifier`

`Modifier.paddingFrom(     alignmentLine: AlignmentLine,     before: TextUnit,     after: TextUnit )`

A `Modifier` that can add padding to position the content according to specified distances from its bounds to an `alignment line`.

Cmn

`Modifier`

`Modifier.paddingFromBaseline(top: Dp, bottom: Dp)`

A `Modifier` that positions the content in a layout such that the distance from the top of the layout to the `baseline of the first line of text in the content` is `top`, and the distance from the `baseline of the last line of text in the content` to the bottom of the layout is `bottom`.

Cmn

`Modifier`

`Modifier.paddingFromBaseline(top: TextUnit, bottom: TextUnit)`

A `Modifier` that positions the content in a layout such that the distance from the top of the layout to the `baseline of the first line of text in the content` is `top`, and the distance from the `baseline of the last line of text in the content` to the bottom of the layout is `bottom`.

Cmn

`Modifier`

`Modifier.alpha(alpha: Float)`

Draw content with modified alpha that may be less than 1.

Cmn

`Modifier`

`<T : Any?> Modifier.anchoredDraggable(     state: AnchoredDraggableState<T>,     orientation: Orientation,     enabled: Boolean,     interactionSource: MutableInteractionSource?,     overscrollEffect: OverscrollEffect?,     flingBehavior: FlingBehavior? )`

Enable drag gestures between a set of predefined values.

Cmn

`Modifier`

`<T : Any?> Modifier.anchoredDraggable(     state: AnchoredDraggableState<T>,     orientation: Orientation,     enabled: Boolean,     interactionSource: MutableInteractionSource?,     overscrollEffect: OverscrollEffect?,     startDragImmediately: Boolean,     flingBehavior: FlingBehavior? )`

**This function is deprecated.** startDragImmediately has been removed without replacement.

Cmn

`Modifier`

`<T : Any?> Modifier.anchoredDraggable(     state: AnchoredDraggableState<T>,     reverseDirection: Boolean,     orientation: Orientation,     enabled: Boolean,     interactionSource: MutableInteractionSource?,     overscrollEffect: OverscrollEffect?,     flingBehavior: FlingBehavior? )`

Enable drag gestures between a set of predefined values.

Cmn

`Modifier`

`<T : Any?> Modifier.anchoredDraggable(     state: AnchoredDraggableState<T>,     reverseDirection: Boolean,     orientation: Orientation,     enabled: Boolean,     interactionSource: MutableInteractionSource?,     overscrollEffect: OverscrollEffect?,     startDragImmediately: Boolean,     flingBehavior: FlingBehavior? )`

**This function is deprecated.** startDragImmediately has been removed without replacement.

Cmn

`Modifier`

`@ExperimentalFoundationApi Modifier.dragAndDropSource(block: suspend DragAndDropSourceScope.() -> Unit)`

**This function is deprecated.** Replaced by overload with a callback for obtain a transfer data,start detection is performed by Compose itself

android

`Modifier`

`Modifier.animateBounds(     lookaheadScope: LookaheadScope,     modifier: Modifier,     boundsTransform: BoundsTransform,     animateMotionFrameOfReference: Boolean )`

`Modifier` to animate layout changes (position and/or size) that occur within a `LookaheadScope`.

Cmn

`Modifier`

`Modifier.animateContentSize(     animationSpec: FiniteAnimationSpec<IntSize>,     finishedListener: ((initialValue: IntSize, targetValue: IntSize) -> Unit)? )`

This modifier animates its own size when its child modifier (or the child composable if it is already at the tail of the chain) changes size.

Cmn

`Modifier`

`Modifier.animateContentSize(     animationSpec: FiniteAnimationSpec<IntSize>,     alignment: Alignment,     finishedListener: ((initialValue: IntSize, targetValue: IntSize) -> Unit)? )`

This modifier animates its own size when its child modifier (or the child composable if it is already at the tail of the chain) changes size.

Cmn

`Modifier`

`Modifier.aspectRatio(     ratio: @FloatRange(from = 0.0, fromInclusive = false) Float,     matchHeightConstraintsFirst: Boolean )`

Attempts to size the content to match a specified aspect ratio by trying to match one of the incoming constraints in the following order: `Constraints.maxWidth`, `Constraints.maxHeight`, `Constraints.minWidth`, `Constraints.minHeight` if `matchHeightConstraintsFirst` is `false` (which is the default), or `Constraints.maxHeight`, `Constraints.maxWidth`, `Constraints.minHeight`, `Constraints.minWidth` if `matchHeightConstraintsFirst` is `true`.

Cmn

`Modifier`

`Modifier.contentType(contentType: ContentType)`

Set autofill hint with `contentType`.

Cmn

`Modifier`

`Modifier.background(color: Color, shape: Shape)`

Draws `shape` with a solid `color` behind the content.

Cmn

`Modifier`

`Modifier.background(     brush: Brush,     shape: Shape,     alpha: @FloatRange(from = 0.0, to = 1.0) Float )`

Draws `shape` with `brush` behind the content.

Cmn

`Modifier`

`Modifier.basicMarquee(     iterations: Int,     animationMode: MarqueeAnimationMode,     repeatDelayMillis: Int,     initialDelayMillis: Int,     spacing: MarqueeSpacing,     velocity: Dp )`

Applies an animated marquee effect to the modified content if it's too wide to fit in the available space.

Cmn

`Modifier`

`Modifier.edgeSwipeToDismiss(     swipeToDismissBoxState: SwipeToDismissBoxState,     edgeWidth: Dp )`

Handles swipe to dismiss from the edge of the viewport.

android

`Modifier`

`Modifier.blur(radius: Dp, edgeTreatment: BlurredEdgeTreatment)`

Draw content blurred with the specified radii.

Cmn

`Modifier`

`Modifier.blur(     radiusX: Dp,     radiusY: Dp,     edgeTreatment: BlurredEdgeTreatment )`

Draw content blurred with the specified radii.

Cmn

`Modifier`

`Modifier.border(border: BorderStroke, shape: Shape)`

Modify element to add border with appearance specified with a `border` and a `shape` and clip it.

Cmn

`Modifier`

`Modifier.border(width: Dp, brush: Brush, shape: Shape)`

Modify element to add border with appearance specified with a `width`, a `brush` and a `shape` and clip it.

Cmn

`Modifier`

`Modifier.border(width: Dp, color: Color, shape: Shape)`

Modify element to add border with appearance specified with a `width`, a `color` and a `shape` and clip it.

Cmn

`Modifier`

`Modifier.bringIntoViewRequester(     bringIntoViewRequester: BringIntoViewRequester )`

Modifier that can be used to send `bringIntoView` requests.

Cmn

`Modifier`

`Modifier.bringIntoViewResponder(responder: BringIntoViewResponder)`

**This function is deprecated.** Use BringIntoViewModifierNode instead

Cmn

`Modifier`

`Modifier.clickable(     enabled: Boolean,     onClickLabel: String?,     role: Role?,     interactionSource: MutableInteractionSource?,     onClick: () -> Unit )`

Configure component to receive clicks via input or accessibility "click" event.

Cmn

`Modifier`

`Modifier.clickable(     interactionSource: MutableInteractionSource?,     indication: Indication?,     enabled: Boolean,     onClickLabel: String?,     role: Role?,     onClick: () -> Unit )`

Configure component to receive clicks via input or accessibility "click" event.

Cmn

`Modifier`

`Modifier.combinedClickable(     enabled: Boolean,     onClickLabel: String?,     role: Role?,     onLongClickLabel: String?,     onLongClick: (() -> Unit)?,     onDoubleClick: (() -> Unit)?,     hapticFeedbackEnabled: Boolean,     interactionSource: MutableInteractionSource?,     onClick: () -> Unit )`

Configure component to receive clicks, double clicks and long clicks via input or accessibility "click" event.

Cmn

`Modifier`

`Modifier.combinedClickable(     interactionSource: MutableInteractionSource?,     indication: Indication?,     enabled: Boolean,     onClickLabel: String?,     role: Role?,     onLongClickLabel: String?,     onLongClick: (() -> Unit)?,     onDoubleClick: (() -> Unit)?,     hapticFeedbackEnabled: Boolean,     onClick: () -> Unit )`

Configure component to receive clicks, double clicks and long clicks via input or accessibility "click" event.

Cmn

`Modifier`

`Modifier.clip(shape: Shape)`

Clip the content to `shape`.

Cmn

`Modifier`

`Modifier.clipToBounds()`

Clip the content to the bounds of a layer defined at this modifier.

Cmn

`Modifier`

`Modifier.clipScrollableContainer(orientation: Orientation)`

Clips bounds of scrollable container on main axis while leaving space for background effects (like shadows) on cross axis.

Cmn

`Modifier`

`Modifier.composed(     inspectorInfo: InspectorInfo.() -> Unit,     factory: @Composable Modifier.() -> Modifier )`

Declare a just-in-time composition of a `Modifier` that will be composed for each element it modifies.

Cmn

`Modifier`

`Modifier.composed(     fullyQualifiedName: String,     key1: Any?,     inspectorInfo: InspectorInfo.() -> Unit,     factory: @Composable Modifier.() -> Modifier )`

Declare a just-in-time composition of a `Modifier` that will be composed for each element it modifies.

Cmn

`Modifier`

`Modifier.composed(     fullyQualifiedName: String,     vararg keys: Any?,     inspectorInfo: InspectorInfo.() -> Unit,     factory: @Composable Modifier.() -> Modifier )`

Declare a just-in-time composition of a `Modifier` that will be composed for each element it modifies.

Cmn

`Modifier`

`Modifier.composed(     fullyQualifiedName: String,     key1: Any?,     key2: Any?,     inspectorInfo: InspectorInfo.() -> Unit,     factory: @Composable Modifier.() -> Modifier )`

Declare a just-in-time composition of a `Modifier` that will be composed for each element it modifies.

Cmn

`Modifier`

`Modifier.composed(     fullyQualifiedName: String,     key1: Any?,     key2: Any?,     key3: Any?,     inspectorInfo: InspectorInfo.() -> Unit,     factory: @Composable Modifier.() -> Modifier )`

Declare a just-in-time composition of a `Modifier` that will be composed for each element it modifies.

Cmn

`Modifier`

`Modifier.layoutId(layoutId: String, tag: String?)`

Alternative to `androidx.compose.ui.layout.layoutId` that enables the use of `tag`.

android

`Modifier`

`Modifier.contentColorProvider(contentColor: Color)`

Provides `contentColor` for text and iconography to consume.

android

`Modifier`

`Modifier.depthEffect(depthEffect: DepthEffect?, shape: Shape)`

Renders shadows for the provided `depthEffect`.

android

`Modifier`

`Modifier.dragAndDropSource(     transferData: (Offset) -> DragAndDropTransferData? )`

A `Modifier` that allows an element it is applied to be treated like a source for drag and drop operations.

Cmn

`Modifier`

`@ExperimentalFoundationApi Modifier.dragAndDropSource(     drawDragDecoration: DrawScope.() -> Unit,     block: suspend DragAndDropSourceScope.() -> Unit )`

**This function is deprecated.** Replaced by overload with a callback for obtain a transfer data,start detection is performed by Compose itself

android

`Modifier`

`Modifier.dragAndDropSource(     drawDragDecoration: DrawScope.() -> Unit,     transferData: (Offset) -> DragAndDropTransferData? )`

A `Modifier` that allows an element it is applied to be treated like a source for drag and drop operations.

Cmn

`Modifier`

`Modifier.dragAndDropTarget(     shouldStartDragAndDrop: (startEvent: DragAndDropEvent) -> Boolean,     target: DragAndDropTarget )`

A modifier that allows for receiving from a drag and drop gesture.

Cmn

`Modifier`

`Modifier.draggable2D(     state: Draggable2DState,     enabled: Boolean,     interactionSource: MutableInteractionSource?,     startDragImmediately: Boolean,     onDragStarted: (startedPosition: Offset) -> Unit,     onDragStopped: (velocity: Velocity) -> Unit,     reverseDirection: Boolean )`

Configure touch dragging for the UI element in both orientations.

Cmn

`Modifier`

`Modifier.draggable(     state: DraggableState,     orientation: Orientation,     enabled: Boolean,     interactionSource: MutableInteractionSource?,     startDragImmediately: Boolean,     onDragStarted: suspend CoroutineScope.(startedPosition: Offset) -> Unit,     onDragStopped: suspend CoroutineScope.(velocity: Float) -> Unit,     reverseDirection: Boolean )`

Configure touch dragging for the UI element in a single `Orientation`.

Cmn

`Modifier`

`Modifier.drawBehind(onDraw: DrawScope.() -> Unit)`

Draw into a `Canvas` behind the modified content.

Cmn

`Modifier`

`Modifier.drawWithCache(onBuildDrawCache: CacheDrawScope.() -> DrawResult)`

Draw into a `DrawScope` with content that is persisted across draw calls as long as the size of the drawing area is the same or any state objects that are read have not changed.

Cmn

`Modifier`

`Modifier.drawWithContent(onDraw: ContentDrawScope.() -> Unit)`

Creates a `DrawModifier` that allows the developer to draw before or after the layout's contents.

Cmn

`Modifier`

`Modifier.excludeFromSystemGesture()`

**This function is deprecated.** Use systemGestureExclusion

android

`Modifier`

`Modifier.excludeFromSystemGesture(     exclusion: (LayoutCoordinates) -> Rect )`

**This function is deprecated.** Use systemGestureExclusion

android

`Modifier`

`Modifier.animateFloatingActionButton(     visible: Boolean,     alignment: Alignment,     targetScale: Float,     scaleAnimationSpec: AnimationSpec<Float>?,     alphaAnimationSpec: AnimationSpec<Float>? )`

Apply this modifier to a `FloatingActionButton` to show or hide it with an animation, typically based on the app's main content scrolling.

Cmn

`Modifier`

`Modifier.onFocusChanged(onFocusChanged: (FocusState) -> Unit)`

Add this modifier to a component to observe focus state events.

Cmn

`Modifier`

`Modifier.onFocusEvent(onFocusEvent: (FocusState) -> Unit)`

Add this modifier to a component to observe focus state events.

Cmn

`Modifier`

`Modifier.focusModifier()`

**This function is deprecated.** Replaced by focusTarget

Cmn

`Modifier`

`Modifier.focusTarget()`

Add this modifier to a component to make it focusable.

Cmn

`Modifier`

`Modifier.focusOrder(focusOrderReceiver: FocusOrder.() -> Unit)`

**This function is deprecated.** Use focusProperties() instead

Cmn

`Modifier`

`Modifier.focusOrder(focusRequester: FocusRequester)`

**This function is deprecated.** Use focusRequester() instead

Cmn

`Modifier`

`Modifier.focusOrder(     focusRequester: FocusRequester,     focusOrderReceiver: FocusOrder.() -> Unit )`

**This function is deprecated.** Use focusProperties() and focusRequester() instead

Cmn

`Modifier`

`Modifier.focusProperties(scope: FocusProperties.() -> Unit)`

This modifier allows you to specify properties that are accessible to `focusTarget`s further down the modifier chain or on child layout nodes.

Cmn

`Modifier`

`Modifier.focusRequester(focusRequester: FocusRequester)`

Add this modifier to a component to request changes to focus.

Cmn

`Modifier`

`Modifier.focusRestorer(fallback: FocusRequester)`

This modifier can be used to save and restore focus to a focus group.

Cmn

`Modifier`

`@ExperimentalComposeUiApi Modifier.focusRestorer(onRestoreFailed: (() -> FocusRequester)?)`

**This function is deprecated.** Use focusRestorer(FocusRequester) instead

Cmn

`Modifier`

`Modifier.focusGroup()`

Creates a focus group or marks this component as a focus group.

Cmn

`Modifier`

`Modifier.focusable(     enabled: Boolean,     interactionSource: MutableInteractionSource? )`

Configure component to be focusable via focus system or accessibility "focus" event.

Cmn

`Modifier`

`Modifier.onFocusedBoundsChanged(     onPositioned: (LayoutCoordinates?) -> Unit )`

Calls `onPositioned` whenever the bounds of the currently-focused area changes.

Cmn

`Modifier`

`Modifier.preferredFrameRate(frameRateCategory: FrameRateCategory)`

Set a requested frame rate on Composable

Cmn

`Modifier`

`Modifier.preferredFrameRate(     frameRate: @FloatRange(from = 0.0, to = 360.0) Float )`

Set a requested frame rate on Composable

Cmn

`Modifier`

`Modifier.graphicsLayer(block: GraphicsLayerScope.() -> Unit)`

A `Modifier.Node` that makes content draw into a draw layer.

Cmn

`Modifier`

`Modifier.graphicsLayer(     scaleX: Float,     scaleY: Float,     alpha: Float,     translationX: Float,     translationY: Float,     shadowElevation: Float,     rotationX: Float,     rotationY: Float,     rotationZ: Float,     cameraDistance: Float,     transformOrigin: TransformOrigin,     shape: Shape,     clip: Boolean,     renderEffect: RenderEffect?,     ambientShadowColor: Color,     spotShadowColor: Color,     compositingStrategy: CompositingStrategy,     blendMode: BlendMode,     colorFilter: ColorFilter?,     outsets: LayerOutsets )`

A `Modifier.Element` that makes content draw into a draw layer.

Cmn

`Modifier`

`Modifier.toolingGraphicsLayer()`

A `Modifier.Element` that adds a draw layer such that tooling can identify an element in the drawn image.

Cmn

`Modifier`

`Modifier.handwritingDetector(callback: () -> Unit)`

Configures an element to act as a handwriting detector which detects stylus handwriting and delegates handling of the recognised text to another element.

android

`Modifier`

`Modifier.handwritingHandler()`

Configures an element to act as a stylus handwriting handler which can handle text input from a handwriting session which was triggered by stylus handwriting on a handwriting detector.

android

`Modifier`

`Modifier.hierarchicalFocusGroup(active: Boolean)`

`hierarchicalFocusGroup` is used to annotate composables in an application, so we can keep track of what is the active part of the composition.

android

`Modifier`

`Modifier.requestFocusOnHierarchyActive()`

This Modifier is used in conjunction with `hierarchicalFocusGroup` and will request focus on the following focusable element when needed (i.e. this needs to be before that element in the Modifier chain).

android

`Modifier`

`Modifier.hoverable(     interactionSource: MutableInteractionSource,     enabled: Boolean )`

Configure component to be hoverable via pointer enter/exit events.

Cmn

`Modifier`

`Modifier.indication(     interactionSource: InteractionSource,     indication: Indication? )`

Draws visual effects for this component when interactions occur.

Cmn

`Modifier`

`Modifier.onIndirectPointerGesture(     enabled: Boolean,     onSwipeForward: (() -> Unit)?,     onSwipeBackward: (() -> Unit)?,     onClick: (() -> Unit)? )`

A `Modifier` that detects high-level click and horizontal swipe gestures from an `IndirectPointerEvent` source.

android

`inline Modifier`

`Modifier.inspectable(     noinline inspectorInfo: InspectorInfo.() -> Unit,     factory: Modifier.() -> Modifier )`

**This function is deprecated.** This API will create more invalidations of your modifier than necessary, so it's use is discouraged.

Cmn

`Modifier`

`Modifier.minimumInteractiveComponentSize()`

Reserves at least 48.dp in size to disambiguate touch interactions if the element would measure smaller.

Cmn

`Modifier`

`Modifier.minimumInteractiveComponentSize()`

Reserves at least 48.dp in size to disambiguate touch interactions if the element would measure smaller.

Cmn

`Modifier`

`Modifier.minimumInteractiveComponentSize()`

Reserves at least 48.dp in size to disambiguate touch interactions if the element would measure smaller.

android

`Modifier`

`Modifier.height(intrinsicSize: IntrinsicSize)`

Declare the preferred height of the content to be the same as the min or max intrinsic height of the content.

Cmn

`Modifier`

`Modifier.requiredHeight(intrinsicSize: IntrinsicSize)`

Declare the height of the content to be exactly the same as the min or max intrinsic height of the content.

Cmn

`Modifier`

`Modifier.requiredWidth(intrinsicSize: IntrinsicSize)`

Declare the width of the content to be exactly the same as the min or max intrinsic width of the content.

Cmn

`Modifier`

`Modifier.width(intrinsicSize: IntrinsicSize)`

Declare the preferred width of the content to be the same as the min or max intrinsic width of the content.

Cmn

`Modifier`

`Modifier.keepScreenOn()`

A modifier that keeps the device screen on as long as it is part of the composition on supported platforms.

Cmn

`Modifier`

`Modifier.onKeyEvent(onKeyEvent: (KeyEvent) -> Boolean)`

Adding this `modifier` to the `modifier` parameter of a component will allow it to intercept hardware key events when it (or one of its children) is focused.

Cmn

`Modifier`

`Modifier.onPreviewKeyEvent(onPreviewKeyEvent: (KeyEvent) -> Boolean)`

Adding this `modifier` to the `modifier` parameter of a component will allow it to intercept hardware key events when it (or one of its children) is focused.

Cmn

`Modifier`

`Modifier.layoutBounds(holder: LayoutBoundsHolder)`

This will map the `RelativeLayoutBounds` of the modifier into the provided `LayoutBoundsHolder`.

Cmn

`Modifier`

`Modifier.layoutId(layoutId: Any)`

Tag the element with `layoutId` to identify the element within its parent.

Cmn

`Modifier`

`Modifier.layout(measure: MeasureScope.(Measurable, Constraints) -> MeasureResult)`

Creates a `LayoutModifier` that allows changing how the wrapped element is measured and laid out.

Cmn

`Modifier`

`Modifier.approachLayout(     isMeasurementApproachInProgress: (lookaheadSize: IntSize) -> Boolean,     isPlacementApproachInProgress: Placeable.PlacementScope.(lookaheadCoordinates: LayoutCoordinates) -> Boolean,     approachMeasure: ApproachMeasureScope.(measurable: Measurable, constraints: Constraints) -> MeasureResult )`

Creates an approach layout intended to help gradually approach the destination layout calculated in the lookahead pass.

Cmn

`Modifier`

`Modifier.magnifier(     sourceCenter: Density.() -> Offset,     magnifierCenter: (Density.() -> Offset)?,     onSizeChanged: ((DpSize) -> Unit)?,     zoom: Float,     size: DpSize,     cornerRadius: Dp,     elevation: Dp,     clip: Boolean )`

Shows a `Magnifier` widget that shows an enlarged version of the content at `sourceCenter` relative to the current layout node.

android

`Modifier`

`Modifier.meshGradient(     rows: @IntRange(from = 1) Int,     columns: @IntRange(from = 1) Int,     hasBicubicColor: Boolean,     block: MeshGradientScope.() -> Unit )`

A MeshGradient is a 2D grid of patches defined by vertices.

Cmn

`Modifier`

`Modifier.modifierLocalConsumer(consumer: ModifierLocalReadScope.() -> Unit)`

A Modifier that can be used to consume `ModifierLocal`s that were provided by other modifiers to the left of this modifier, or above this modifier in the layout tree.

Cmn

`Modifier`

`<T : Any?> Modifier.modifierLocalProvider(     key: ProvidableModifierLocal<T>,     value: () -> T )`

A Modifier that can be used to provide `ModifierLocal`s that can be read by other modifiers to the right of this modifier, or modifiers that are children of the layout node that this modifier is attached to.

Cmn

`Modifier`

`Modifier.nestedScroll(     connection: NestedScrollConnection,     dispatcher: NestedScrollDispatcher? )`

Modify element to make it participate in the nested scrolling hierarchy.

Cmn

`Modifier`

`Modifier.absoluteOffset(offset: Density.() -> IntOffset)`

Offset the content by `offset` px.

Cmn

`Modifier`

`Modifier.absoluteOffset(x: Dp, y: Dp)`

Offset the content by (`x` dp, `y` dp).

Cmn

`Modifier`

`Modifier.offset(offset: Density.() -> IntOffset)`

Offset the content by `offset` px.

Cmn

`Modifier`

`Modifier.offset(x: Dp, y: Dp)`

Offset the content by (`x` dp, `y` dp).

Cmn

`Modifier`

`Modifier.onFirstVisible(     minDurationMs: @IntRange(from = 0) Long,     minFractionVisible: @FloatRange(from = 0.0, to = 1.0) Float,     viewportBounds: LayoutBoundsHolder?,     callback: () -> Unit )`

**This function is deprecated.** This modifier is deprecated as its behavior is misleading and doesn't always follow the contract claimed by the name.

Cmn

`Modifier`

`Modifier.onGloballyPositioned(     onGloballyPositioned: (LayoutCoordinates) -> Unit )`

Invoke `onGloballyPositioned` with the `LayoutCoordinates` of the element when the global position of the content may have changed.

Cmn

`Modifier`

`Modifier.onLayoutRectChanged(     throttleMillis: Long,     debounceMillis: Long,     callback: (RelativeLayoutBounds) -> Unit )`

Invokes `callback` with the position of this layout node relative to the coordinate system of the root of the composition, as well as in screen coordinates and window coordinates.

Cmn

`Modifier`

`Modifier.onPlaced(onPlaced: (LayoutCoordinates) -> Unit)`

Invoke `onPlaced` after the parent `LayoutModifier` and parent layout has been placed and before child `LayoutModifier` is placed.

Cmn

`Modifier`

`Modifier.onSizeChanged(onSizeChanged: (IntSize) -> Unit)`

Invoked with the size of the modified Compose UI element when the element is first measured or when the size of the element changes.

Cmn

`Modifier`

`Modifier.onVisibilityChanged(     minDurationMs: @IntRange(from = 0) Long,     minFractionVisible: @FloatRange(from = 0.0, to = 1.0) Float,     viewportBounds: LayoutBoundsHolder?,     callback: (Boolean) -> Unit )`

Registers a callback to monitor whether or not the node is inside of the viewport of the window or not.

Cmn

`Modifier`

`@Composable Modifier.oneHandedGesture(     action: GestureAction,     key: String?,     priority: GesturePriority,     enabledInAmbient: Boolean,     interactionSource: MutableInteractionSource?,     onShowIndicator: () -> Unit,     onGesture: suspend () -> Unit )`

Registers a gesture handler.

android

`Modifier`

`Modifier.overscroll(overscrollEffect: OverscrollEffect?)`

Renders overscroll from the provided `overscrollEffect`.

Cmn

`Modifier`

`Modifier.absolutePadding(left: Dp, top: Dp, right: Dp, bottom: Dp)`

Apply additional space along each edge of the content in `Dp`: `left`, `top`, `right` and `bottom`.

Cmn

`Modifier`

`Modifier.padding(all: Dp)`

Apply `all` dp of additional space along each edge of the content, left, top, right and bottom.

Cmn

`Modifier`

`Modifier.padding(paddingValues: PaddingValues)`

Apply `PaddingValues` to the component as additional space along each edge of the content's left, top, right and bottom.

Cmn

`Modifier`

`Modifier.padding(horizontal: Dp, vertical: Dp)`

Apply `horizontal` dp space along the left and right edges of the content, and `vertical` dp space along the top and bottom edges.

Cmn

`Modifier`

`Modifier.padding(start: Dp, top: Dp, end: Dp, bottom: Dp)`

Apply additional space along each edge of the content in `Dp`: `start`, `top`, `end` and `bottom`.

Cmn

`Modifier`

`Modifier.paint(     painter: Painter,     sizeToIntrinsics: Boolean,     alignment: Alignment,     contentScale: ContentScale,     alpha: Float,     colorFilter: ColorFilter? )`

Paint the content using `painter`.

Cmn

`Modifier`

`@ExperimentalWearMaterialApi @Composable Modifier.placeholder(     placeholderState: PlaceholderState,     shape: Shape,     color: Color )`

Draws a placeholder shape over the top of a composable and animates a wipe off effect to remove the placeholder.

android

`Modifier`

`@Composable Modifier.placeholder(     placeholderState: PlaceholderState,     shape: Shape,     color: Color )`

Modifier.placeholder draws a skeleton shape over a component, for situations when no provisional content (such as cached data) is available.

android

`Modifier`

`@ExperimentalWearMaterialApi @Composable Modifier.placeholderShimmer(     placeholderState: PlaceholderState,     shape: Shape,     color: Color )`

Modifier to draw a placeholder shimmer over a component.

android

`Modifier`

`@Composable Modifier.placeholderShimmer(     placeholderState: PlaceholderState,     shape: Shape,     color: Color )`

Modifier.placeholderShimmer draws a periodic shimmer over content, indicating to the user that contents are loading or potentially out of date.

android

`Modifier`

`Modifier.pointerHoverIcon(     icon: PointerIcon,     overrideDescendants: Boolean )`

Modifier that lets a developer define a pointer icon to display when the cursor is hovered over the element.

Cmn

`Modifier`

`Modifier.stylusHoverIcon(     icon: PointerIcon,     overrideDescendants: Boolean,     touchBoundsExpansion: DpTouchBoundsExpansion? )`

Modifier that lets a developer define a pointer icon to display when a stylus is hovered over the element.

Cmn

`Modifier`

`Modifier.motionEventSpy(watcher: (motionEvent: MotionEvent) -> Unit)`

Calls `watcher` with each `MotionEvent` that the layout area or any child `pointerInput` receives.

android

`Modifier`

`Modifier.pointerInteropFilter(     requestDisallowInterceptTouchEvent: RequestDisallowInterceptTouchEvent?,     onTouchEvent: (MotionEvent) -> Boolean )`

A special PointerInputModifier that provides access to the underlying `MotionEvent`s originally dispatched to Compose.

android

`Modifier`

`Modifier.preferKeepClear()`

Mark the layout rectangle as preferring to stay clear of floating windows.

android

`Modifier`

`Modifier.preferKeepClear(rectProvider: (LayoutCoordinates) -> Rect)`

Mark a rectangle within the local layout coordinates preferring to stay clear of floating windows.

android

`Modifier`

`Modifier.progressSemantics()`

Contains the `semantics` required for an indeterminate progress indicator, that represents the fact of the in-progress operation.

Cmn

`Modifier`

`Modifier.progressSemantics(     value: Float,     valueRange: ClosedFloatingPointRange<Float>,     steps: @IntRange(from = 0) Int )`

Contains the `semantics` required for a determinate progress indicator or the progress part of a slider, that represents progress within `valueRange`.

Cmn

`Modifier`

`@ExperimentalMaterialApi Modifier.pullRefreshIndicatorTransform(     state: PullRefreshState,     scale: Boolean )`

A modifier for translating the position and scaling the size of a pull-to-refresh indicator based on the given `PullRefreshState`.

Cmn

`Modifier`

`@ExperimentalMaterialApi Modifier.pullRefresh(state: PullRefreshState, enabled: Boolean)`

A nested scroll modifier that provides scroll events to `state`.

Cmn

`Modifier`

`@ExperimentalMaterialApi Modifier.pullRefresh(     onPull: (pullDelta: Float) -> Float,     onRelease: suspend (flingVelocity: Float) -> Float,     enabled: Boolean )`

A nested scroll modifier that provides `onPull` and `onRelease` callbacks to aid building custom pull refresh components.

Cmn

`Modifier`

`Modifier.pullToRefresh(     isRefreshing: Boolean,     state: PullToRefreshState,     enabled: Boolean,     threshold: Dp,     onRefresh: () -> Unit )`

A Modifier that adds nested scroll to a container to support a pull-to-refresh gesture.

Cmn

`Modifier`

`Modifier.rangeSemantics(     value: Float,     enabled: Boolean,     onValueChange: (Float) -> Unit,     valueRange: ClosedFloatingPointRange<Float>,     steps: Int )`

Modifier to add semantics signifying progress of the Stepper/Slider.

android

`Modifier`

`@ExperimentalFoundationApi Modifier.contentReceiver(     receiveContentListener: ReceiveContentListener )`

Configures the current node and any children nodes as a Content Receiver.

Cmn

`Modifier`

`Modifier.onPreRotaryScrollEvent(     onPreRotaryScrollEvent: (RotaryScrollEvent) -> Boolean )`

Adding this `modifier` to the `modifier` parameter of a component will allow it to intercept `RotaryScrollEvent`s if it (or one of its children) is focused.

Cmn

`Modifier`

`Modifier.onRotaryScrollEvent(     onRotaryScrollEvent: (RotaryScrollEvent) -> Boolean )`

Adding this `modifier` to the `modifier` parameter of a component will allow it to intercept `RotaryScrollEvent`s if it (or one of its children) is focused.

Cmn

`Modifier`

`Modifier.rotaryScrollable(     behavior: RotaryScrollableBehavior,     focusRequester: FocusRequester,     reverseDirection: Boolean,     overscrollEffect: OverscrollEffect? )`

A modifier which connects rotary events with scrollable containers such as Column, LazyList and others.

android

`Modifier`

`Modifier.rotate(degrees: Float)`

Sets the degrees the view is rotated around the center of the composable.

Cmn

`Modifier`

`Modifier.fitInside(rulers: RectRulers)`

Fits the contents within `rulers`.

Cmn

`Modifier`

`Modifier.fitOutside(rulers: RectRulers)`

If one of the `Ruler`s in `rulers` has a value within the bounds of the Layout, this sizes the content to that `Ruler` and the edge.

Cmn

`Modifier`

`Modifier.scale(scale: Float)`

Scale the contents of both the horizontal and vertical axis uniformly by the same scale factor.

Cmn

`Modifier`

`Modifier.scale(scaleX: Float, scaleY: Float)`

Scale the contents of the composable by the following scale factors along the horizontal and vertical axis respectively.

Cmn

`Modifier`

`Modifier.scrollAway(     scrollInfoProvider: ScrollInfoProvider,     screenStage: () -> ScreenStage )`

Scroll an item vertically in/out of view based on scroll state provided by a scrolling list.

android

`Modifier`

`Modifier.scrollAway(scrollState: ScrollState, offset: Dp)`

Scroll an item vertically in/out of view based on a `ScrollState`.

android

`Modifier`

`Modifier.scrollAway(     scrollState: LazyListState,     itemIndex: Int,     offset: Dp )`

Scroll an item vertically in/out of view based on a `LazyListState`.

android

`Modifier`

`Modifier.scrollAway(     scrollState: ScalingLazyListState,     itemIndex: Int,     offset: Dp )`

Scroll an item vertically in/out of view based on a `ScalingLazyListState`.

android

`Modifier`

`Modifier.scrollAway(     scrollState: ScalingLazyListState,     itemIndex: Int,     offset: Dp )`

**This function is deprecated.** This overload is provided for backwards compatibility with Compose for Wear OS 1.1.A newer overload is available which uses ScalingLazyListState from wear.compose.foundation.lazy package

android

`Modifier`

`Modifier.horizontalScroll(     state: ScrollState,     enabled: Boolean,     flingBehavior: FlingBehavior?,     reverseScrolling: Boolean )`

Modify element to allow to scroll horizontally when width of the content is bigger than max constraints allow.

Cmn

`Modifier`

`Modifier.horizontalScroll(     state: ScrollState,     overscrollEffect: OverscrollEffect?,     enabled: Boolean,     flingBehavior: FlingBehavior?,     reverseScrolling: Boolean )`

Modify element to allow to scroll horizontally when width of the content is bigger than max constraints allow.

Cmn

`Modifier`

`Modifier.verticalScroll(     state: ScrollState,     enabled: Boolean,     flingBehavior: FlingBehavior?,     reverseScrolling: Boolean )`

Modify element to allow to scroll vertically when height of the content is bigger than max constraints allow.

Cmn

`Modifier`

`Modifier.verticalScroll(     state: ScrollState,     overscrollEffect: OverscrollEffect?,     enabled: Boolean,     flingBehavior: FlingBehavior?,     reverseScrolling: Boolean )`

Modify element to allow to scroll vertically when height of the content is bigger than max constraints allow.

Cmn

`Modifier`

`Modifier.scrollable2D(     state: Scrollable2DState,     enabled: Boolean,     overscrollEffect: OverscrollEffect?,     flingBehavior: FlingBehavior?,     interactionSource: MutableInteractionSource? )`

Configure touch scrolling and flinging for the UI element in both XY orientations.

Cmn

`Modifier`

`Modifier.scrollableArea(     state: ScrollableState,     orientation: Orientation,     enabled: Boolean,     reverseScrolling: Boolean,     flingBehavior: FlingBehavior?,     interactionSource: MutableInteractionSource?,     bringIntoViewSpec: BringIntoViewSpec? )`

Configure a component to act as a scrollable area.

Cmn

`Modifier`

`Modifier.scrollableArea(     state: ScrollableState,     orientation: Orientation,     overscrollEffect: OverscrollEffect?,     enabled: Boolean,     reverseScrolling: Boolean,     flingBehavior: FlingBehavior?,     interactionSource: MutableInteractionSource?,     bringIntoViewSpec: BringIntoViewSpec? )`

Configure a component to act as a scrollable area.

Cmn

`Modifier`

`Modifier.scrollable(     state: ScrollableState,     orientation: Orientation,     enabled: Boolean,     reverseDirection: Boolean,     flingBehavior: FlingBehavior?,     interactionSource: MutableInteractionSource? )`

Configure touch scrolling and flinging for the UI element in a single `Orientation`.

Cmn

`Modifier`

`Modifier.scrollable(     state: ScrollableState,     orientation: Orientation,     overscrollEffect: OverscrollEffect?,     enabled: Boolean,     reverseDirection: Boolean,     flingBehavior: FlingBehavior?,     interactionSource: MutableInteractionSource?,     bringIntoViewSpec: BringIntoViewSpec? )`

Configure touch scrolling and flinging for the UI element in a single `Orientation`.

Cmn

`Modifier`

`Modifier.selectableGroup()`

Use this modifier to group a list of `selectable` items like Tabs or RadioButtons together for accessibility purpose.

Cmn

`Modifier`

`Modifier.selectable(     selected: Boolean,     enabled: Boolean,     role: Role?,     interactionSource: MutableInteractionSource?,     onClick: () -> Unit )`

Configure component to be selectable, usually as a part of a mutually exclusive group, where only one item can be selected at any point in time.

Cmn

`Modifier`

`Modifier.selectable(     selected: Boolean,     interactionSource: MutableInteractionSource?,     indication: Indication?,     enabled: Boolean,     role: Role?,     onClick: () -> Unit )`

Configure component to be selectable, usually as a part of a mutually exclusive group, where only one item can be selected at any point in time.

Cmn

`Modifier`

`Modifier.clearAndSetSemantics(properties: SemanticsPropertyReceiver.() -> Unit)`

Clears the semantics of all the descendant nodes and sets new semantics.

Cmn

`Modifier`

`Modifier.semantics(mergeDescendants: Boolean, properties: SemanticsPropertyReceiver.() -> Unit)`

Add semantics key/value pairs to the layout node, for use in testing, accessibility, etc.

Cmn

`Modifier`

`Modifier.sensitiveContent(isContentSensitive: Boolean)`

This modifier hints that the composable renders sensitive content (i.e. username, password, credit card etc) on the screen, and the content should be protected during screen share in supported environments.

Cmn

`Modifier`

`Modifier.dropShadow(shape: Shape, block: DropShadowScope.() -> Unit)`

Draws a drop shadow behind the rest of the content with the geometry specified by the given shape and the shadow properties defined the `DropShadowScope`.

Cmn

`Modifier`

`Modifier.dropShadow(shape: Shape, shadow: Shadow)`

Draws a drop shadow behind the rest of the content with the geometry specified by the given shape and the shadow properties defined by the `Shadow`.

Cmn

`Modifier`

`Modifier.innerShadow(shape: Shape, block: InnerShadowScope.() -> Unit)`

Draws an inner shadow behind the rest of the content with the geometry specified by the given shape and the shadow properties defined the `InnerShadowScope`.

Cmn

`Modifier`

`Modifier.innerShadow(shape: Shape, shadow: Shadow)`

Draws an inner shadow on top of the rest of the content with the geometry specified by the given shape and the shadow properties defined by the `Shadow`.

Cmn

`Modifier`

`Modifier.shadow(     elevation: Dp,     shape: Shape,     clip: Boolean,     ambientColor: Color,     spotColor: Color )`

Creates a `graphicsLayer` that draws a shadow.

Cmn

`Modifier`

`Modifier.defaultMinSize(minWidth: Dp, minHeight: Dp)`

Constrain the size of the wrapped layout only when it would be otherwise unconstrained: the `minWidth` and `minHeight` constraints are only applied when the incoming corresponding constraint is `0`.

Cmn

`Modifier`

`Modifier.fillMaxHeight(fraction: @FloatRange(from = 0.0, to = 1.0) Float)`

Have the content fill (possibly only partially) the `Constraints.maxHeight` of the incoming measurement constraints, by setting the `minimum height` and the `maximum height` to be equal to the `maximum height` multiplied by `fraction`.

Cmn

`Modifier`

`Modifier.fillMaxSize(fraction: @FloatRange(from = 0.0, to = 1.0) Float)`

Have the content fill (possibly only partially) the `Constraints.maxWidth` and `Constraints.maxHeight` of the incoming measurement constraints, by setting the `minimum width` and the `maximum width` to be equal to the `maximum width` multiplied by `fraction`, as well as the `minimum height` and the `maximum height` to be equal to the `maximum height` multiplied by `fraction`.

Cmn

`Modifier`

`Modifier.fillMaxWidth(fraction: @FloatRange(from = 0.0, to = 1.0) Float)`

Have the content fill (possibly only partially) the `Constraints.maxWidth` of the incoming measurement constraints, by setting the `minimum width` and the `maximum width` to be equal to the `maximum width` multiplied by `fraction`.

Cmn

`Modifier`

`Modifier.height(height: Dp)`

Declare the preferred height of the content to be exactly `height`dp.

Cmn

`Modifier`

`Modifier.heightIn(min: Dp, max: Dp)`

Constrain the height of the content to be between `min`dp and `max`dp as permitted by the incoming measurement `Constraints`.

Cmn

`Modifier`

`Modifier.requiredHeight(height: Dp)`

Declare the height of the content to be exactly `height`dp.

Cmn

`Modifier`

`Modifier.requiredHeightIn(min: Dp, max: Dp)`

Constrain the height of the content to be between `min`dp and `max`dp.

Cmn

`Modifier`

`Modifier.requiredSize(size: Dp)`

Declare the size of the content to be exactly `size`dp width and height.

Cmn

`Modifier`

`Modifier.requiredSize(size: DpSize)`

Declare the size of the content to be exactly `size`.

Cmn

`Modifier`

`Modifier.requiredSize(width: Dp, height: Dp)`

Declare the size of the content to be exactly `width`dp and `height`dp.

Cmn

`Modifier`

`Modifier.requiredSizeIn(     minWidth: Dp,     minHeight: Dp,     maxWidth: Dp,     maxHeight: Dp )`

Constrain the width of the content to be between `minWidth`dp and `maxWidth`dp, and the height of the content to be between `minHeight`dp and `maxHeight`dp.

Cmn

`Modifier`

`Modifier.requiredWidth(width: Dp)`

Declare the width of the content to be exactly `width`dp.

Cmn

`Modifier`

`Modifier.requiredWidthIn(min: Dp, max: Dp)`

Constrain the width of the content to be between `min`dp and `max`dp.

Cmn

`Modifier`

`Modifier.size(size: Dp)`

Declare the preferred size of the content to be exactly `size`dp square.

Cmn

`Modifier`

`Modifier.size(size: DpSize)`

Declare the preferred size of the content to be exactly `size`.

Cmn

`Modifier`

`Modifier.size(width: Dp, height: Dp)`

Declare the preferred size of the content to be exactly `width`dp by `height`dp.

Cmn

`Modifier`

`Modifier.sizeIn(minWidth: Dp, minHeight: Dp, maxWidth: Dp, maxHeight: Dp)`

Constrain the width of the content to be between `minWidth`dp and `maxWidth`dp and the height of the content to be between `minHeight`dp and `maxHeight`dp as permitted by the incoming measurement `Constraints`.

Cmn

`Modifier`

`Modifier.width(width: Dp)`

Declare the preferred width of the content to be exactly `width`dp.

Cmn

`Modifier`

`Modifier.widthIn(min: Dp, max: Dp)`

Constrain the width of the content to be between `min`dp and `max`dp as permitted by the incoming measurement `Constraints`.

Cmn

`Modifier`

`Modifier.wrapContentHeight(     align: Alignment.Vertical,     unbounded: Boolean )`

Allow the content to measure at its desired height without regard for the incoming measurement `minimum height constraint`, and, if `unbounded` is true, also without regard for the incoming measurement `maximum height constraint`.

Cmn

`Modifier`

`Modifier.wrapContentSize(align: Alignment, unbounded: Boolean)`

Allow the content to measure at its desired size without regard for the incoming measurement `minimum width` or `minimum height` constraints, and, if `unbounded` is true, also without regard for the incoming maximum constraints.

Cmn

`Modifier`

`Modifier.wrapContentWidth(     align: Alignment.Horizontal,     unbounded: Boolean )`

Allow the content to measure at its desired width without regard for the incoming measurement `minimum width constraint`, and, if `unbounded` is true, also without regard for the incoming measurement `maximum width constraint`.

Cmn

`Modifier`

`Modifier.onInterceptKeyBeforeSoftKeyboard(     onInterceptKeyBeforeSoftKeyboard: (KeyEvent) -> Boolean )`

Adding this `modifier` to the `modifier` parameter of a component will allow it to intercept hardware key events before they are sent to the software keyboard.

Cmn

`Modifier`

`Modifier.onPreInterceptKeyBeforeSoftKeyboard(     onPreInterceptKeyBeforeSoftKeyboard: (KeyEvent) -> Boolean )`

Adding this `modifier` to the `modifier` parameter of a component will allow it to intercept hardware key events before they are sent to the software keyboard.

Cmn

`Modifier`

`@ExperimentalFoundationStyleApi Modifier.styleable(styleState: StyleState?)`

**This function is deprecated.** The styleable() modifier must provide one or more 'style' parameter values.

Cmn

`Modifier`

`@ExperimentalFoundationStyleApi Modifier.styleable(styleState: StyleState?, style: Style)`

Modifier that creates a region that is styled by the given `Style` object for the component this Modifier is attached to.

Cmn

`Modifier`

`@ExperimentalFoundationStyleApi Modifier.styleable(styleState: StyleState?, vararg styles: Style)`

Modifier that creates a region that is styled by the given `Style` object for the component this Modifier is attached to.

Cmn

`Modifier`

`@Composable Modifier.surface(     focusable: Boolean,     shape: Shape,     color: Color,     contentColor: Color,     depthEffect: SurfaceDepthEffect?,     border: BorderStroke?,     interactionSource: MutableInteractionSource? )`

A surface is a fundamental building block in Glimmer.

android

`Modifier`

`@Composable Modifier.surface(     enabled: Boolean,     shape: Shape,     color: Color,     contentColor: Color,     depthEffect: SurfaceDepthEffect?,     border: BorderStroke?,     interactionSource: MutableInteractionSource?,     onClick: () -> Unit )`

A surface is a fundamental building block in Glimmer.

android

`Modifier`

`Modifier.pointerInput(block: suspend PointerInputScope.() -> Unit)`

**This function is deprecated.** Modifier.pointerInput must provide one or more 'key' parameters that define the identity of the modifier and determine when its previous input processing coroutine should be cancelled and a new effect launched for the new key.

Cmn

`Modifier`

`Modifier.pointerInput(key1: Any?, block: PointerInputEventHandler)`

Create a modifier for processing pointer input within the region of the modified element.

Cmn

`Modifier`

`Modifier.pointerInput(vararg keys: Any?, block: PointerInputEventHandler)`

Create a modifier for processing pointer input within the region of the modified element.

Cmn

`Modifier`

`Modifier.pointerInput(     key1: Any?,     key2: Any?,     block: PointerInputEventHandler )`

Create a modifier for processing pointer input within the region of the modified element.

Cmn

`Modifier`

`Modifier.edgeSwipeToDismiss(     swipeToDismissBoxState: SwipeToDismissBoxState,     edgeWidth: Dp )`

**This function is deprecated.** SwipeToDismiss has been migrated to androidx.wear.compose.foundation.

android

`Modifier`

`@ExperimentalMaterialApi <T : Any?> Modifier.swipeable(     state: SwipeableState<T>,     anchors: Map<Float, T>,     orientation: Orientation,     enabled: Boolean,     reverseDirection: Boolean,     interactionSource: MutableInteractionSource?,     thresholds: (from, to) -> ThresholdConfig,     resistance: ResistanceConfig?,     velocityThreshold: Dp )`

**This function is deprecated.** Material's Swipeable has been replaced by Foundation's AnchoredDraggable APIs.

Cmn

`Modifier`

`@ExperimentalWearMaterialApi <T : Any?> Modifier.swipeable(     state: SwipeableState<T>,     anchors: Map<Float, T>,     orientation: Orientation,     enabled: Boolean,     reverseDirection: Boolean,     interactionSource: MutableInteractionSource?,     thresholds: (from, to) -> ThresholdConfig,     resistance: ResistanceConfig?,     velocityThreshold: Dp )`

Enable swipe gestures between a set of predefined states.

android

`Modifier`

`Modifier.systemGestureExclusion()`

Excludes the layout rectangle from the system gesture.

android

`Modifier`

`Modifier.systemGestureExclusion(exclusion: (LayoutCoordinates) -> Rect)`

Excludes a rectangle within the local layout coordinates from the system gesture.

android

`Modifier`

`Modifier.testTag(tag: String)`

Applies a tag to allow modified element to be found in tests.

Cmn

`Modifier`

`Modifier.appendTextContextMenuComponents(builder: TextContextMenuBuilderScope.() -> Unit)`

Adds a `builder` to be run when the text context menu is shown within this hierarchy.

Cmn

`Modifier`

`Modifier.filterTextContextMenuComponents(     filter: (TextContextMenuComponent) -> Boolean )`

Adds a `filter` to be run when the text context menu is shown within this hierarchy.

Cmn

`Modifier`

`Modifier.toggleable(     value: Boolean,     enabled: Boolean,     role: Role?,     interactionSource: MutableInteractionSource?,     onValueChange: (Boolean) -> Unit )`

Configure component to make it toggleable via input and accessibility events

Cmn

`Modifier`

`Modifier.toggleable(     value: Boolean,     interactionSource: MutableInteractionSource?,     indication: Indication?,     enabled: Boolean,     role: Role?,     onValueChange: (Boolean) -> Unit )`

Configure component to make it toggleable via input and accessibility events.

Cmn

`Modifier`

`Modifier.triStateToggleable(     state: ToggleableState,     enabled: Boolean,     role: Role?,     interactionSource: MutableInteractionSource?,     onClick: () -> Unit )`

Configure component to make it toggleable via input and accessibility events with three states: On, Off and Indeterminate.

Cmn

`Modifier`

`Modifier.triStateToggleable(     state: ToggleableState,     interactionSource: MutableInteractionSource?,     indication: Indication?,     enabled: Boolean,     role: Role?,     onClick: () -> Unit )`

Configure component to make it toggleable via input and accessibility events with three states: On, Off and Indeterminate.

Cmn

`Modifier`

`Modifier.touchTargetAwareSize(size: Dp)`

Modifier to set both the size and recommended touch target for `IconButton` and TextButton.

android

`Modifier`

`Modifier.transformable(     state: TransformableState,     lockRotationOnZoomPan: Boolean,     enabled: Boolean )`

Enable transformation gestures of the modified UI element.

Cmn

`Modifier`

`Modifier.transformable(     state: TransformableState,     canPan: (Offset) -> Boolean,     lockRotationOnZoomPan: Boolean,     enabled: Boolean )`

Enable transformation gestures of the modified UI element.

Cmn

`Modifier`

`Modifier.transformedHeight(     scope: TransformingLazyColumnItemScope,     transformationSpec: TransformationSpec )`

Convenience modifier to calculate transformed height using `TransformationSpec`.

android

`Modifier`

`Modifier.visible(visible: Boolean)`

A `Modifier` that controls the visibility of the Layout it is applied to.

Cmn

`Modifier`

`@ExperimentalLayoutApi Modifier.imeNestedScroll()`

Controls the soft keyboard as a nested scrolling on Android `R` and later.

android

`Modifier`

`Modifier.captionBarPadding()`

Adds padding to accommodate the `caption bar` insets.

Cmn

android

`Modifier`

`Modifier.consumeWindowInsets(insets: WindowInsets)`

Consume insets that haven't been consumed yet by other insets Modifiers similar to `windowInsetsPadding` without adding any padding.

Cmn

`Modifier`

`Modifier.consumeWindowInsets(paddingValues: PaddingValues)`

Consume `paddingValues` as insets as if the padding was added irrespective of insets.

Cmn

`Modifier`

`Modifier.displayCutoutPadding()`

Adds padding to accommodate the `display cutout`.

Cmn

android

`Modifier`

`Modifier.imePadding()`

Adds padding to accommodate the `ime` insets.

Cmn

android

`Modifier`

`Modifier.mandatorySystemGesturesPadding()`

Adds padding to accommodate the `mandatory system gestures` insets.

Cmn

android

`Modifier`

`Modifier.navigationBarsPadding()`

Adds padding to accommodate the `navigation bars` insets.

Cmn

android

`Modifier`

`Modifier.onConsumedWindowInsetsChanged(     block: (consumedWindowInsets: WindowInsets) -> Unit )`

Calls `block` with the `WindowInsets` that have been consumed, either by `consumeWindowInsets` or one of the padding Modifiers, such as `imePadding`.

Cmn

`Modifier`

`Modifier.recalculateWindowInsets()`

This recalculates the `WindowInsets` based on the size and position.

Cmn

`Modifier`

`Modifier.safeContentPadding()`

Adds padding to accommodate the `safe content` insets.

Cmn

android

`Modifier`

`Modifier.safeDrawingPadding()`

Adds padding to accommodate the `safe drawing` insets.

Cmn

android

`Modifier`

`Modifier.safeGesturesPadding()`

Adds padding to accommodate the `safe gestures` insets.

Cmn

android

`Modifier`

`Modifier.statusBarsPadding()`

Adds padding to accommodate the `status bars` insets.

Cmn

android

`Modifier`

`Modifier.systemBarsPadding()`

Adds padding to accommodate the `system bars` insets.

Cmn

android

`Modifier`

`Modifier.systemGesturesPadding()`

Adds padding to accommodate the `system gestures` insets.

Cmn

android

`Modifier`

`Modifier.waterfallPadding()`

Adds padding to accommodate the `waterfall` insets.

Cmn

android

`Modifier`

`Modifier.windowInsetsPadding(insets: WindowInsets)`

Adds padding so that the content doesn't enter `insets` space.

Cmn

`Modifier`

`Modifier.windowInsetsBottomHeight(insets: WindowInsets)`

Sets the height to that of `insets` at the `bottom` of the screen.

Cmn

`Modifier`

`Modifier.windowInsetsEndWidth(insets: WindowInsets)`

Sets the width to that of `insets` at the `end` of the screen, using either `left` or `right`, depending on the `LayoutDirection`.

Cmn

`Modifier`

`Modifier.windowInsetsStartWidth(insets: WindowInsets)`

Sets the width to that of `insets` at the `start` of the screen, using either `left` or `right`, depending on the `LayoutDirection`.

Cmn

`Modifier`

`Modifier.windowInsetsTopHeight(insets: WindowInsets)`

Sets the height to that of `insets` at the `top` of the screen.

Cmn

`Modifier`

`Modifier.zIndex(zIndex: Float)`

Creates a modifier that controls the drawing order for the children of the same layout parent.

Cmn

`Modifier`

`@UnstableApi @Composable Modifier.resizeWithContentScale(     contentScale: ContentScale,     sourceSizeDp: Size?,     density: Density )`

Attempts to size the original content rectangle to be inscribed into a destination by applying a specified `ContentScale` type.

android

## Public companion functions

### all

Cmn

open fun all(predicate: (Modifier.Element) \-> Boolean): Boolean

Returns `true` if `predicate` returns true for all `Element`s in this `Modifier` or if this `Modifier` contains no `Element`s.

### any

Cmn

open fun any(predicate: (Modifier.Element) \-> Boolean): Boolean

Returns `true` if `predicate` returns true for any `Element` in this `Modifier`.

### foldIn

Cmn

open fun <R : Any?> foldIn(initial: R, operation: (Modifier.Element, R) \-> R): R

Accumulates a value starting with `initial` and applying `operation` to the current value and each element from outside in.

Elements wrap one another in a chain from left to right; an `Element` that appears to the left of another in a `+` expression or in `operation`'s parameter order affects all of the elements that appear after it. `foldIn` may be used to accumulate a value starting from the parent or head of the modifier chain to the final wrapped child.

### foldOut

Cmn

open fun <R : Any?> foldOut(initial: R, operation: (Modifier.Element, R) \-> R): R

Accumulates a value starting with `initial` and applying `operation` to the current value and each element from inside out.

Elements wrap one another in a chain from left to right; an `Element` that appears to the left of another in a `+` expression or in `operation`'s parameter order affects all of the elements that appear after it. `foldOut` may be used to accumulate a value starting from the child or tail of the modifier chain up to the parent or head of the chain.

### then

Cmn

open infix fun then(other: Modifier): Modifier

Concatenates this modifier with another.

Returns a `Modifier` representing this modifier followed by `other` in sequence.

### toString

Cmn

open fun toString(): String

## Public functions

### all

Cmn

Added in 1.0.0

fun all(predicate: (Modifier.Element) \-> Boolean): Boolean

Returns `true` if `predicate` returns true for all `Element`s in this `Modifier` or if this `Modifier` contains no `Element`s.

### any

Cmn

Added in 1.0.0

fun any(predicate: (Modifier.Element) \-> Boolean): Boolean

Returns `true` if `predicate` returns true for any `Element` in this `Modifier`.

### foldIn

Cmn

Added in 1.0.0

fun <R : Any?> foldIn(initial: R, operation: (Modifier.Element, R) \-> R): R

Accumulates a value starting with `initial` and applying `operation` to the current value and each element from outside in.

Elements wrap one another in a chain from left to right; an `Element` that appears to the left of another in a `+` expression or in `operation`'s parameter order affects all of the elements that appear after it. `foldIn` may be used to accumulate a value starting from the parent or head of the modifier chain to the final wrapped child.

### foldOut

Cmn

Added in 1.0.0

fun <R : Any?> foldOut(initial: R, operation: (Modifier.Element, R) \-> R): R

Accumulates a value starting with `initial` and applying `operation` to the current value and each element from inside out.

Elements wrap one another in a chain from left to right; an `Element` that appears to the left of another in a `+` expression or in `operation`'s parameter order affects all of the elements that appear after it. `foldOut` may be used to accumulate a value starting from the child or tail of the modifier chain up to the parent or head of the chain.

### then

Cmn

Added in 1.0.0

open infix fun then(other: Modifier): Modifier

Concatenates this modifier with another.

Returns a `Modifier` representing this modifier followed by `other` in sequence.

## Extension functions

### Modifier.paddingFrom

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.paddingFrom( 
    alignmentLine: AlignmentLine, 
    before: Dp = Dp.Unspecified, 
    after: Dp = Dp.Unspecified 
): Modifier

A `Modifier` that can add padding to position the content according to specified distances from its bounds to an `alignment line`. Whether the positioning is vertical or horizontal is defined by the orientation of the given `alignmentLine` (if the line is horizontal, `before` and `after` will refer to distances from top and bottom, otherwise they will refer to distances from start and end). The opposite axis sizing and positioning will remain unaffected. The modified layout will try to include the required padding, subject to the incoming max layout constraints, such that the distance from its bounds to the `alignmentLine` of the content will be `before` and `after`, respectively. When the max constraints do not allow this, satisfying the `before` requirement will have priority over `after`. When the modified layout is min constrained in the affected layout direction and the padded layout is smaller than the constraint, the modified layout will satisfy the min constraint and the content will be positioned to satisfy the `before` requirement if specified, or the `after` requirement otherwise.

Example usage:

import androidx.compose.foundation.layout.paddingFrom
import androidx.compose.material.Text
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.FirstBaseline
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

// We want to have 30.sp distance from the top of the layout box to the baseline of the
// first line of text.
val distanceToBaseline \= 30.sp
// We convert the 30.sp value to dps, which is required for the paddingFrom API.
val distanceToBaselineDp \= with(LocalDensity.current) { distanceToBaseline.toDp() }
// The result will be a layout with 30.sp distance from the top of the layout box to the
// baseline of the first line of text.
Text(
 text \= "This is an example.",
 modifier \= Modifier.paddingFrom(FirstBaseline, before \= distanceToBaselineDp),
)

Parameters

`alignmentLine: AlignmentLine`

the alignment line relative to which the padding is defined

`before: Dp = Dp.Unspecified`

the distance between the container's top edge and the horizontal alignment line, or the container's start edge and the vertical alignment line

`after: Dp = Dp.Unspecified`

the distance between the container's bottom edge and the horizontal alignment line, or the container's end edge and the vertical alignment line

See also

`paddingFromBaseline`

### Modifier.paddingFrom

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.paddingFrom( 
    alignmentLine: AlignmentLine, 
    before: TextUnit = TextUnit.Unspecified, 
    after: TextUnit = TextUnit.Unspecified 
): Modifier

A `Modifier` that can add padding to position the content according to specified distances from its bounds to an `alignment line`. Whether the positioning is vertical or horizontal is defined by the orientation of the given `alignmentLine` (if the line is horizontal, `before` and `after` will refer to distances from top and bottom, otherwise they will refer to distances from start and end). The opposite axis sizing and positioning will remain unaffected. The modified layout will try to include the required padding, subject to the incoming max layout constraints, such that the distance from its bounds to the `alignmentLine` of the content will be `before` and `after`, respectively. When the max constraints do not allow this, satisfying the `before` requirement will have priority over `after`. When the modified layout is min constrained in the affected layout direction and the padded layout is smaller than the constraint, the modified layout will satisfy the min constraint and the content will be positioned to satisfy the `before` requirement if specified, or the `after` requirement otherwise.

Example usage:

import androidx.compose.foundation.layout.paddingFrom
import androidx.compose.material.Text
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.FirstBaseline
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

// We want to have 30.sp distance from the top of the layout box to the baseline of the
// first line of text.
val distanceToBaseline \= 30.sp
// We convert the 30.sp value to dps, which is required for the paddingFrom API.
val distanceToBaselineDp \= with(LocalDensity.current) { distanceToBaseline.toDp() }
// The result will be a layout with 30.sp distance from the top of the layout box to the
// baseline of the first line of text.
Text(
 text \= "This is an example.",
 modifier \= Modifier.paddingFrom(FirstBaseline, before \= distanceToBaselineDp),
)

Parameters

`alignmentLine: AlignmentLine`

the alignment line relative to which the padding is defined

`before: TextUnit = TextUnit.Unspecified`

the distance between the container's top edge and the horizontal alignment line, or the container's start edge and the vertical alignment line

`after: TextUnit = TextUnit.Unspecified`

the distance between the container's bottom edge and the horizontal alignment line, or the container's end edge and the vertical alignment line

See also

`paddingFromBaseline`

### Modifier.paddingFromBaseline

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.paddingFromBaseline( 
    top: Dp = Dp.Unspecified, 
    bottom: Dp = Dp.Unspecified 
): Modifier

A `Modifier` that positions the content in a layout such that the distance from the top of the layout to the `baseline of the first line of text in the content` is `top`, and the distance from the `baseline of the last line of text in the content` to the bottom of the layout is `bottom`.

When the modified layout is min height constrained and the padded layout is smaller than the constraint, the modified layout will satisfy the min constraint and the content will be positioned to satisfy the `top` requirement if specified, or the `bottom` requirement otherwise.

Example usage:

import androidx.compose.foundation.layout.paddingFrom
import androidx.compose.foundation.layout.paddingFromBaseline
import androidx.compose.material.Text
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.FirstBaseline
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

// We want to have 30.dp distance from the top of the layout box to the baseline of the
// first line of text, and a 40.dp distance from the bottom of the layout box to the baseline
// of the last line of text. Note it is good practice to specify these distances in sp for font
// scaling, which can be done with the other overload.
val distanceToFirstBaseline \= 30.dp
val distanceFromLastBaseline \= 40.dp
Text(
 text \= "This line has the first baseline.\\nThis line has the last baseline.",
 modifier \= Modifier.paddingFromBaseline(distanceToFirstBaseline, distanceFromLastBaseline),
)

See also

`paddingFrom`

### Modifier.paddingFromBaseline

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.paddingFromBaseline( 
    top: TextUnit = TextUnit.Unspecified, 
    bottom: TextUnit = TextUnit.Unspecified 
): Modifier

A `Modifier` that positions the content in a layout such that the distance from the top of the layout to the `baseline of the first line of text in the content` is `top`, and the distance from the `baseline of the last line of text in the content` to the bottom of the layout is `bottom`.

When the modified layout is min height constrained and the padded layout is smaller than the constraint, the modified layout will satisfy the min constraint and the content will be positioned to satisfy the `top` requirement if specified, or the `bottom` requirement otherwise.

Example usage:

import androidx.compose.foundation.layout.paddingFrom
import androidx.compose.foundation.layout.paddingFromBaseline
import androidx.compose.material.Text
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.FirstBaseline
import androidx.compose.ui.unit.sp

// We want to have 30.sp distance from the top of the layout box to the baseline of the
// first line of text, and a 40.sp distance from the bottom of the layout box to the baseline
// of the last line of text.
val distanceToFirstBaseline \= 30.sp
val distanceFromLastBaseline \= 40.sp
Text(
 text \= "This line has the first baseline.\\nThis line has the last baseline.",
 modifier \= Modifier.paddingFromBaseline(distanceToFirstBaseline, distanceFromLastBaseline),
)

See also

`paddingFrom`

### Modifier.alpha

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.alpha(alpha: Float): Modifier

Draw content with modified alpha that may be less than 1.

Usage of this API renders this composable into a separate graphics layer. Note when an alpha less than 1.0f is provided, contents are implicitly clipped to their bounds. This is because an intermediate compositing layer is created to render contents into first before being drawn into the destination with the desired alpha. This layer is sized to the bounds of the composable this modifier is configured on, and contents outside of these bounds are omitted.

Performance Note: For animating alpha, it is highly recommended to use `Modifier.graphicsLayer` instead (e.g., `Modifier.graphicsLayer { alpha = ... }`). Changing the `alpha` parameter on `Modifier.alpha` causes the composable to be recomposed, which is less efficient than updating the `alpha` property within `graphicsLayer`, as `graphicsLayer` can optimize this change without requiring recomposition.

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

Box(Modifier.size(100.dp).alpha(alpha \= 0.5f).background(Color.Red))

Parameters

`alpha: Float`

the fraction of children's alpha value and must be between `0` and `1`, inclusive.

See also

`graphicsLayer`

Example usage:

### Modifier.anchoredDraggable

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun <T : Any?> Modifier.anchoredDraggable( 
    state: AnchoredDraggableState<T>, 
    orientation: Orientation, 
    enabled: Boolean = true, 
    interactionSource: MutableInteractionSource? = null, 
    overscrollEffect: OverscrollEffect? = null, 
    flingBehavior: FlingBehavior? = null 
): Modifier

Enable drag gestures between a set of predefined values.

When a drag is detected, the offset of the `AnchoredDraggableState` will be updated with the drag delta. If the `orientation` is set to `Orientation.Horizontal` and `LocalLayoutDirection`'s value is `LayoutDirection.Rtl`, the drag deltas will be reversed. You should use this offset to move your content accordingly (see `Modifier.offset`). When the drag ends, the offset will be animated to one of the anchors and when that anchor is reached, the value of the `AnchoredDraggableState` will also be updated to the value corresponding to the new anchor.

Dragging is constrained between the minimum and maximum anchors.

Parameters

`state: AnchoredDraggableState<T>`

The associated `AnchoredDraggableState`.

`orientation: Orientation`

The orientation in which the `anchoredDraggable` can be dragged.

`enabled: Boolean = true`

Whether this `anchoredDraggable` is enabled and should react to the user's input.

`interactionSource: MutableInteractionSource? = null`

Optional `MutableInteractionSource` that will passed on to the internal `Modifier.draggable`.

`overscrollEffect: OverscrollEffect? = null`

optional effect to dispatch any excess delta or velocity to. The excess delta or velocity are a result of dragging/flinging and reaching the bounds. If you provide an `overscrollEffect`, make sure to apply `androidx.compose.foundation.overscroll` to render the effect as well.

`flingBehavior: FlingBehavior? = null`

Optionally configure how the anchored draggable performs the fling. By default (if passing in null), this will snap to the closest anchor considering the velocity thresholds and positional thresholds. See `AnchoredDraggableDefaults.flingBehavior`.

### Modifier.anchoredDraggable

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun <T : Any?> Modifier.anchoredDraggable( 
    state: AnchoredDraggableState<T>, 
    orientation: Orientation, 
    enabled: Boolean = true, 
    interactionSource: MutableInteractionSource? = null, 
    overscrollEffect: OverscrollEffect? = null, 
    startDragImmediately: Boolean = state.isAnimationRunning, 
    flingBehavior: FlingBehavior? = null 
): Modifier

Enable drag gestures between a set of predefined values.

When a drag is detected, the offset of the `AnchoredDraggableState` will be updated with the drag delta. If the `orientation` is set to `Orientation.Horizontal` and `LocalLayoutDirection`'s value is `LayoutDirection.Rtl`, the drag deltas will be reversed. You should use this offset to move your content accordingly (see `Modifier.offset`). When the drag ends, the offset will be animated to one of the anchors and when that anchor is reached, the value of the `AnchoredDraggableState` will also be updated to the value corresponding to the new anchor.

Dragging is constrained between the minimum and maximum anchors.

Parameters

`state: AnchoredDraggableState<T>`

The associated `AnchoredDraggableState`.

`orientation: Orientation`

The orientation in which the `anchoredDraggable` can be dragged.

`enabled: Boolean = true`

Whether this `anchoredDraggable` is enabled and should react to the user's input.

`interactionSource: MutableInteractionSource? = null`

Optional `MutableInteractionSource` that will passed on to the internal `Modifier.draggable`.

`overscrollEffect: OverscrollEffect? = null`

optional effect to dispatch any excess delta or velocity to. The excess delta or velocity are a result of dragging/flinging and reaching the bounds. If you provide an `overscrollEffect`, make sure to apply `androidx.compose.foundation.overscroll` to render the effect as well.

`startDragImmediately: Boolean = state.isAnimationRunning`

when set to false, `draggable` will start dragging only when the gesture crosses the touchSlop. This is useful to prevent users from "catching" an animating widget when pressing on it. See `draggable` to learn more about startDragImmediately.

`flingBehavior: FlingBehavior? = null`

Optionally configure how the anchored draggable performs the fling. By default (if passing in null), this will snap to the closest anchor considering the velocity thresholds and positional thresholds. See `AnchoredDraggableDefaults.flingBehavior`.

### Modifier.anchoredDraggable

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun <T : Any?> Modifier.anchoredDraggable( 
    state: AnchoredDraggableState<T>, 
    reverseDirection: Boolean, 
    orientation: Orientation, 
    enabled: Boolean = true, 
    interactionSource: MutableInteractionSource? = null, 
    overscrollEffect: OverscrollEffect? = null, 
    flingBehavior: FlingBehavior? = null 
): Modifier

Enable drag gestures between a set of predefined values.

When a drag is detected, the offset of the `AnchoredDraggableState` will be updated with the drag delta. You should use this offset to move your content accordingly (see `Modifier.offset`). When the drag ends, the offset will be animated to one of the anchors and when that anchor is reached, the value of the `AnchoredDraggableState` will also be updated to the value corresponding to the new anchor.

Dragging is constrained between the minimum and maximum anchors.

Parameters

`state: AnchoredDraggableState<T>`

The associated `AnchoredDraggableState`.

`reverseDirection: Boolean`

Whether to reverse the direction of the drag, so a top to bottom drag will behave like bottom to top, and a left to right drag will behave like right to left. If not specified, this will be determined based on `orientation` and `LocalLayoutDirection` through the other `anchoredDraggable` overload.

`orientation: Orientation`

The orientation in which the `anchoredDraggable` can be dragged.

`enabled: Boolean = true`

Whether this `anchoredDraggable` is enabled and should react to the user's input.

`interactionSource: MutableInteractionSource? = null`

Optional `MutableInteractionSource` that will passed on to the internal `Modifier.draggable`.

`overscrollEffect: OverscrollEffect? = null`

optional effect to dispatch any excess delta or velocity to. The excess delta or velocity are a result of dragging/flinging and reaching the bounds. If you provide an `overscrollEffect`, make sure to apply `androidx.compose.foundation.overscroll` to render the effect as well.

`flingBehavior: FlingBehavior? = null`

Optionally configure how the anchored draggable performs the fling. By default (if passing in null), this will snap to the closest anchor considering the velocity thresholds and positional thresholds. See `AnchoredDraggableDefaults.flingBehavior`.

### Modifier.anchoredDraggable

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun <T : Any?> Modifier.anchoredDraggable( 
    state: AnchoredDraggableState<T>, 
    reverseDirection: Boolean, 
    orientation: Orientation, 
    enabled: Boolean = true, 
    interactionSource: MutableInteractionSource? = null, 
    overscrollEffect: OverscrollEffect? = null, 
    startDragImmediately: Boolean = state.isAnimationRunning, 
    flingBehavior: FlingBehavior? = null 
): Modifier

Enable drag gestures between a set of predefined values.

When a drag is detected, the offset of the `AnchoredDraggableState` will be updated with the drag delta. You should use this offset to move your content accordingly (see `Modifier.offset`). When the drag ends, the offset will be animated to one of the anchors and when that anchor is reached, the value of the `AnchoredDraggableState` will also be updated to the value corresponding to the new anchor.

Dragging is constrained between the minimum and maximum anchors.

Parameters

`state: AnchoredDraggableState<T>`

The associated `AnchoredDraggableState`.

`reverseDirection: Boolean`

Whether to reverse the direction of the drag, so a top to bottom drag will behave like bottom to top, and a left to right drag will behave like right to left. If not specified, this will be determined based on `orientation` and `LocalLayoutDirection` through the other `anchoredDraggable` overload.

`orientation: Orientation`

The orientation in which the `anchoredDraggable` can be dragged.

`enabled: Boolean = true`

Whether this `anchoredDraggable` is enabled and should react to the user's input.

`interactionSource: MutableInteractionSource? = null`

Optional `MutableInteractionSource` that will passed on to the internal `Modifier.draggable`.

`overscrollEffect: OverscrollEffect? = null`

optional effect to dispatch any excess delta or velocity to. The excess delta or velocity are a result of dragging/flinging and reaching the bounds. If you provide an `overscrollEffect`, make sure to apply `androidx.compose.foundation.overscroll` to render the effect as well.

`startDragImmediately: Boolean = state.isAnimationRunning`

when set to false, `draggable` will start dragging only when the gesture crosses the touchSlop. This is useful to prevent users from "catching" an animating widget when pressing on it. See `draggable` to learn more about startDragImmediately.

`flingBehavior: FlingBehavior? = null`

Optionally configure how the anchored draggable performs the fling. By default (if passing in null), this will snap to the closest anchor considering the velocity thresholds and positional thresholds. See `AnchoredDraggableDefaults.flingBehavior`.

### Modifier.dragAndDropSource

android

Artifact: androidx.compose.foundation:foundation

View Source

@ExperimentalFoundationApi 
fun Modifier.dragAndDropSource(block: suspend DragAndDropSourceScope.() \-> Unit): Modifier

A Modifier that allows an element it is applied to to be treated like a source for drag and drop operations. It displays the element dragged as a drag shadow.

Learn how to use `Modifier.dragAndDropSource`:

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.border
import androidx.compose.foundation.draganddrop.dragAndDropSource
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Text
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draganddrop.DragAndDropTransferData
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

val label \= remember { "Drag me" }
Box(
 modifier \=
 modifier
 .dragAndDropSource { \_ \-\>
 DragAndDropTransferData(
 clipData \= ClipData.newPlainText(label, label),
 flags \= View.DRAG\_FLAG\_GLOBAL,
 )
 }
 .border(
 border \=
 BorderStroke(
 width \= 4.dp,
 brush \= Brush.linearGradient(listOf(Color.Magenta, Color.Magenta)),
 ),
 shape \= RoundedCornerShape(16.dp),
 )
 .padding(24.dp)
) {
 Text(modifier \= Modifier.align(Alignment.Center), text \= label)
}

Parameters

`block: suspend DragAndDropSourceScope.() -> Unit`

A lambda with a `DragAndDropSourceScope` as a receiver which provides a `PointerInputScope` to detect the drag gesture, after which a drag and drop gesture can be started with `DragAndDropSourceScope.startTransfer`.

### Modifier.animateBounds

Cmn

Artifact: androidx.compose.animation:animation

View Source

fun Modifier.animateBounds( 
    lookaheadScope: LookaheadScope, 
    modifier: Modifier = Modifier, 
    boundsTransform: BoundsTransform = DefaultBoundsTransform, 
    animateMotionFrameOfReference: Boolean = false 
): Modifier

`Modifier` to animate layout changes (position and/or size) that occur within a `LookaheadScope`.

So, the given `lookaheadScope` defines the coordinate space considered to trigger an animation. For example, if `lookaheadScope` was defined at the root of the app hierarchy, then any layout changes visible within the screen will trigger an animation, if it, in contrast was defined within a scrolling parent, then, as long the `LookaheadScope` scrolls with is content, no animation will be triggered, as there will be no changes within its coordinate space.

The animation is driven with a `FiniteAnimationSpec` produced by the given `BoundsTransform` function, which you may use to customize the animations based on the initial and target bounds.

Do note that certain Layout Modifiers when chained with `animateBounds`, may only cause an immediate observable change to either the child or the parent Layout which can result in undesired behavior. For those cases you can instead provide it to the `modifier` parameter. This allows `animateBounds` to envelop the size and constraints change and propagate them gradually to both its parent and child Layout.

You may see the difference when supplying a Layout Modifier in `modifier` on the following example:

import androidx.compose.animation.BoundsTransform
import androidx.compose.animation.animateBounds
import androidx.compose.animation.core.VisibilityThreshold
import androidx.compose.animation.core.spring
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Text
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Rect
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.LookaheadScope
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.round

// Example showing the difference between providing a Layout Modifier as a parameter of
// \`animateBounds\` and chaining the Layout Modifier.

// We use \`padding\` in this example, as it provides an immediate change in layout to its child,
// but not the parent, which sees the same resulting layout. The difference can be seen in the
// Text (content under padding) and an accompanying Cyan Box (a sibling, under the same Row
// parent).
LookaheadScope {
 val boundsTransform \= remember {
 BoundsTransform { \_, \_ \-\>
 spring(stiffness \= 50f, visibilityThreshold \= Rect.VisibilityThreshold)
 }
 }

 var toggleAnimation by remember { mutableStateOf(true) }

 Column(Modifier.clickable { toggleAnimation \= !toggleAnimation }) {
 Text(
 "See the difference in animation when the Layout Modifier is a parameter of animateBounds. Padding, in this example."
 )
 Spacer(Modifier.height(12.dp))
 Text("Layout Modifier as a parameter.")
 Row(Modifier.fillMaxWidth()) {
 Box(
 Modifier.animateBounds(
 lookaheadScope \= this@LookaheadScope,
 modifier \=
 // By providing this Modifier as a parameter of \`animateBounds\`,
 // both content and parent see a gradual/animated change in Layout.
 Modifier.padding(
 horizontal \= if (toggleAnimation) 10.dp else 50.dp
 ),
 boundsTransform \= boundsTransform,
 )
 .background(Color.Red, RoundedCornerShape(12.dp))
 .height(50.dp)
 ) {
 Text("Layout Content", Modifier.align(Alignment.Center))
 }
 Box(Modifier.size(50.dp).background(Color.Cyan, RoundedCornerShape(12.dp)))
 }
 Spacer(Modifier.height(12.dp))
 Text("Layout Modifier after AnimateBounds.")
 Row(Modifier.fillMaxWidth()) {
 Box(
 Modifier.animateBounds(
 lookaheadScope \= this@LookaheadScope,
 boundsTransform \= boundsTransform,
 )
 // The content is able to animate the change in padding, but since the
 // parent Layout sees no difference, the change in position is immediate.
 .padding(horizontal \= if (toggleAnimation) 10.dp else 50.dp)
 .background(Color.Red, RoundedCornerShape(12.dp))
 .height(50.dp)
 ) {
 Text("Layout Content", Modifier.align(Alignment.Center))
 }
 Box(Modifier.size(50.dp).background(Color.Cyan, RoundedCornerShape(12.dp)))
 }
 Spacer(Modifier.height(12.dp))
 Text("Layout Modifier before AnimateBounds.")
 Row(Modifier.fillMaxWidth()) {
 Box(
 Modifier
 // The parent is able to see the change in position and the animated size,
 // so it can smoothly place both its children, but the content of the Box
 // cannot see the gradual changes so it remains constant.
 .padding(horizontal \= if (toggleAnimation) 10.dp else 50.dp)
 .animateBounds(
 lookaheadScope \= this@LookaheadScope,
 boundsTransform \= boundsTransform,
 )
 .background(Color.Red, RoundedCornerShape(12.dp))
 .height(50.dp)
 ) {
 Text("Layout Content", Modifier.align(Alignment.Center))
 }
 Box(Modifier.size(50.dp).background(Color.Cyan, RoundedCornerShape(12.dp)))
 }
 }
}

By default, changes in position under `LayoutCoordinates.introducesMotionFrameOfReference` are excluded from the animation and are instead immediately applied, as they are expected to be frequent/continuous (to handle Layouts under Scroll). You may change this behavior by passing `animateMotionFrameOfReference` as `true`. Keep in mind, doing that under a scroll may result in the Layout "chasing" the scroll offset, as it will constantly animate to the latest position.

A basic use-case is animating a layout based on content changes, such as the String changing on a Text:

import androidx.compose.animation.animateBounds
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material.Text
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.LookaheadScope
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.round

// Example where the change in content triggers the layout change on the item with animateBounds
val textShort \= remember { "Foo ".repeat(10) }
val textLong \= remember { "Bar ".repeat(50) }

var toggle by remember { mutableStateOf(true) }

LookaheadScope {
 Box(
 modifier \= Modifier.fillMaxSize().clickable { toggle \= !toggle },
 contentAlignment \= Alignment.Center,
 ) {
 Text(
 text \= if (toggle) textShort else textLong,
 modifier \=
 Modifier.fillMaxWidth(0.7f)
 .background(Color.LightGray)
 .animateBounds(this@LookaheadScope)
 .padding(10.dp),
 )
 }
}

It also provides an easy way to animate layout changes of a complex Composable Layout:

import androidx.compose.animation.animateBounds
import androidx.compose.animation.animateContentSize
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Text
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.LookaheadScope
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.round
import androidx.compose.ui.util.fastForEach

var itemRowCount by remember { mutableIntStateOf(1) }
val colors \= remember { listOf(Color.Cyan, Color.Magenta, Color.Yellow, Color.Green) }

// A case showing \`animateBounds\` being used to animate layout changes driven by a parent Layout
LookaheadScope {
 Column(Modifier.clickable { itemRowCount \= if (itemRowCount != 2) 2 else 1 }) {
 Text("Click to toggle animation.")
 FlowRow(
 modifier \=
 Modifier.fillMaxWidth()
 // Note that the wrap content size changes for FlowRow as the content
 // adjusts
 // to one or two lines, we can simply use \`animateContentSize()\` to make
 // sure
 // all items are visible during their animation.
 .animateContentSize(),
 // Try changing the arrangement as well!
 horizontalArrangement \= Arrangement.spacedBy(8.dp),
 verticalArrangement \= Arrangement.spacedBy(8.dp),
 // We use the maxItems parameter to change the layout of the FlowRow at different
 // states
 maxItemsInEachRow \= itemRowCount,
 ) {
 colors.fastForEach {
 Box(
 Modifier.animateBounds(this@LookaheadScope)
 // Note the modifier order, we declare the background after
 // \`animateBounds\` to make sure it animates with the rest of the content
 .background(it, RoundedCornerShape(12.dp))
 .weight(weight \= 1f, fill \= true)
 .height(100.dp)
 )
 }
 }
 }
}

Since `BoundsTransform` is called when initiating an animation, you may also use it to calculate a keyframe based animation:

import androidx.compose.animation.BoundsTransform
import androidx.compose.animation.animateBounds
import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.keyframesWithSpline
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Text
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Rect
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.LookaheadScope
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.round

var toggle by remember { mutableStateOf(true) }

// Example using BoundsTransform to calculate an animation using keyframes with splines.
LookaheadScope {
 Box(Modifier.fillMaxSize().clickable { toggle \= !toggle }) {
 Text(
 text \= "Hello, World!",
 textAlign \= TextAlign.Center,
 modifier \=
 Modifier.align(if (toggle) Alignment.TopStart else Alignment.TopEnd)
 .animateBounds(
 lookaheadScope \= this@LookaheadScope,
 boundsTransform \= { initialBounds, targetBounds \-\>
 // We'll use a keyframe to emphasize the animation in position and
 // size.
 keyframesWithSpline {
 durationMillis \= 1200

 // Emphasize with an increase in size
 val size \= targetBounds.size.times(2f)

 // Emphasize the path with a slight curve at the halfway point
 val position \=
 targetBounds.topLeft
 .plus(initialBounds.topLeft)
 .times(0.5f)
 .plus(
 Offset(
 // Consider the increase in size (from the
 // center,
 // to keep the Layout aligned at the keyframe)
 x \= \-(size.width \- targetBounds.width) \* 0.5f,
 // Emphasize the path with a vertical offset
 y \= size.height \* 0.5f,
 )
 )

 // Only need to define the intermediate keyframe, initial and
 // target are implicit.
 Rect(position, size).atFraction(0.5f).using(LinearEasing)
 }
 },
 )
 .background(Color.LightGray, RoundedCornerShape(50))
 .padding(10.dp)
 // Text is laid out with the animated fixed Constraints, relax constraints
 // back to wrap content to be able to center Align vertically.
 .wrapContentSize(Alignment.Center),
 )
 }
}

It may also be used together with `movableContent` as long as the given `LookaheadScope` is in a common place within the Layout hierarchy of the slots presenting the `movableContent`:

import androidx.compose.animation.animateBounds
import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.VisibilityThreshold
import androidx.compose.animation.core.spring
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.runtime.movableContentWithReceiverOf
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Rect
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.LookaheadScope
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.round

// Example showing how to animate a Layout that can be presented on different Layout Composables
// as the state changes using \`movableContent\`.
var position by remember { mutableIntStateOf(\-1) }

val movableContent \= remember {
 // To animate a Layout that can be presented in different Composables, we can use
 // \`animateBounds\` with \`movableContent\`.
 movableContentWithReceiverOf<LookaheadScope> {
 Box(
 Modifier.animateBounds(
 lookaheadScope \= this@movableContentWithReceiverOf,
 boundsTransform \= { \_, \_ \-\>
 spring(
 dampingRatio \= Spring.DampingRatioLowBouncy,
 stiffness \= Spring.StiffnessVeryLow,
 visibilityThreshold \= Rect.VisibilityThreshold,
 )
 },
 )
 // Our movableContent can always fill its container in this example.
 .fillMaxSize()
 .background(Color.Cyan, RoundedCornerShape(8.dp))
 )
 }
}

LookaheadScope {
 Box(Modifier.fillMaxSize()) {
 // Initial container of our Layout, at the center of the screen.
 Box(
 Modifier.size(200.dp)
 .border(3.dp, Color.Red, RoundedCornerShape(8.dp))
 .align(Alignment.Center)
 .clickable { position \= \-1 }
 ) {
 if (position < 0) {
 movableContent()
 }
 }

 repeat(4) { index \-\>
 // Four additional Boxes where our content may be move to.
 Box(
 Modifier.size(100.dp)
 .border(2.dp, Color.Blue, RoundedCornerShape(8.dp))
 .align { size, space, \_ \-\>
 val horizontal \= if (index % 2 \== 0) 0.15f else 0.85f
 val vertical \= if (index < 2) 0.15f else 0.85f

 Offset(
 x \= (space.width \- size.width) \* horizontal,
 y \= (space.height \- size.height) \* vertical,
 )
 .round()
 }
 .clickable { position \= index }
 ) {
 if (position \== index) {
 // The call to movable content will trigger \`Modifier.animateBounds()\` to
 // animate the content's position and size from its previous state.
 movableContent()
 }
 }
 }
 }
}

Parameters

`lookaheadScope: LookaheadScope`

The scope from which this `animateBounds` will calculate its animations from. This implies that as long as you're expecting an animation the reference of the given `LookaheadScope` shouldn't change, otherwise you may get unexpected behavior.

`modifier: Modifier = Modifier`

Optional intermediate Modifier, may be used in cases where otherwise immediate layout changes are perceived as gradual by both the parent and child Layout.

`boundsTransform: BoundsTransform = DefaultBoundsTransform`

Produce a customized `FiniteAnimationSpec` based on the initial and target bounds, called when an animation is triggered.

`animateMotionFrameOfReference: Boolean = false`

When `true`, changes under `LayoutCoordinates.introducesMotionFrameOfReference` (for continuous positional changes, such as Scroll Offset) are included when calculating an animation. `false` by default, where the changes are instead applied directly into the layout without triggering an animation.

See also

`ApproachLayoutModifierNode`

`LookaheadScope`

### Modifier.animateContentSize

Cmn

Artifact: androidx.compose.animation:animation

View Source

fun Modifier.animateContentSize( 
    animationSpec: FiniteAnimationSpec<IntSize\> = spring(
 stiffness = Spring.StiffnessMediumLow,
 visibilityThreshold = IntSize.VisibilityThreshold,
 ), 
    finishedListener: ((initialValue: IntSize, targetValue: IntSize) \-> Unit)? = null 
): Modifier

This modifier animates its own size when its child modifier (or the child composable if it is already at the tail of the chain) changes size. This allows the parent modifier to observe a smooth size change, resulting in an overall continuous visual change.

A `FiniteAnimationSpec` can be optionally specified for the size change animation. By default, `spring` will be used.

An optional `finishedListener` can be supplied to get notified when the size change animation is finished. Since the content size change can be dynamic in many cases, both initial value and target value (i.e. final size) will be passed to the `finishedListener`. **Note:** if the animation is interrupted, the initial value will be the size at the point of interruption. This is intended to help determine the direction of the size change (i.e. expand or collapse in x and y dimensions).

import androidx.compose.animation.animateContentSize
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.LocalTextStyle
import androidx.compose.material.Text
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

val shortText \= "Hi"
val longText \= "Very long text\\nthat spans across\\nmultiple lines"
var short by remember { mutableStateOf(true) }
Box(
 modifier \=
 Modifier.background(Color.Blue, RoundedCornerShape(15.dp))
 .clickable { short \= !short }
 .padding(20.dp)
 .wrapContentSize()
 .animateContentSize()
) {
 Text(
 if (short) {
 shortText
 } else {
 longText
 },
 style \= LocalTextStyle.current.copy(color \= Color.White),
 )
}

Parameters

`animationSpec: FiniteAnimationSpec<IntSize> = spring( stiffness = Spring.StiffnessMediumLow, visibilityThreshold = IntSize.VisibilityThreshold, )`

a finite animation that will be used to animate size change, `spring` by default

`finishedListener: ((initialValue: IntSize, targetValue: IntSize) -> Unit)? = null`

an optional listener to be called when the content change animation is completed.

### Modifier.animateContentSize

Cmn

Artifact: androidx.compose.animation:animation

View Source

fun Modifier.animateContentSize( 
    animationSpec: FiniteAnimationSpec<IntSize\> = spring(
 stiffness = Spring.StiffnessMediumLow,
 visibilityThreshold = IntSize.VisibilityThreshold,
 ), 
    alignment: Alignment = Alignment.TopStart, 
    finishedListener: ((initialValue: IntSize, targetValue: IntSize) \-> Unit)? = null 
): Modifier

This modifier animates its own size when its child modifier (or the child composable if it is already at the tail of the chain) changes size. This allows the parent modifier to observe a smooth size change, resulting in an overall continuous visual change.

A `FiniteAnimationSpec` can be optionally specified for the size change animation. By default, `spring` will be used.

An optional `finishedListener` can be supplied to get notified when the size change animation is finished. Since the content size change can be dynamic in many cases, both initial value and target value (i.e. final size) will be passed to the `finishedListener`. **Note:** if the animation is interrupted, the initial value will be the size at the point of interruption. This is intended to help determine the direction of the size change (i.e. expand or collapse in x and y dimensions).

import androidx.compose.animation.animateContentSize
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.LocalTextStyle
import androidx.compose.material.Text
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

val shortText \= "Hi"
val longText \= "Very long text\\nthat spans across\\nmultiple lines"
var short by remember { mutableStateOf(true) }
Box(
 modifier \=
 Modifier.background(Color.Blue, RoundedCornerShape(15.dp))
 .clickable { short \= !short }
 .padding(20.dp)
 .wrapContentSize()
 .animateContentSize()
) {
 Text(
 if (short) {
 shortText
 } else {
 longText
 },
 style \= LocalTextStyle.current.copy(color \= Color.White),
 )
}

Parameters

`animationSpec: FiniteAnimationSpec<IntSize> = spring( stiffness = Spring.StiffnessMediumLow, visibilityThreshold = IntSize.VisibilityThreshold, )`

a finite animation that will be used to animate size change, `spring` by default

`alignment: Alignment = Alignment.TopStart`

sets the alignment of the content during the animation. `Alignment.TopStart` by default.

`finishedListener: ((initialValue: IntSize, targetValue: IntSize) -> Unit)? = null`

an optional listener to be called when the content change animation is completed.

### Modifier.aspectRatio

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.aspectRatio( 
    ratio: @FloatRange(from = 0.0, fromInclusive = false) Float, 
    matchHeightConstraintsFirst: Boolean = false 
): Modifier

Attempts to size the content to match a specified aspect ratio by trying to match one of the incoming constraints in the following order: `Constraints.maxWidth`, `Constraints.maxHeight`, `Constraints.minWidth`, `Constraints.minHeight` if `matchHeightConstraintsFirst` is `false` (which is the default), or `Constraints.maxHeight`, `Constraints.maxWidth`, `Constraints.minHeight`, `Constraints.minWidth` if `matchHeightConstraintsFirst` is `true`. The size in the other dimension is determined by the aspect ratio. The combinations will be tried in this order until one non-empty is found to satisfy the constraints. If no valid size is obtained this way, it means that there is no non-empty size satisfying both the constraints and the aspect ratio, so the constraints will not be respected and the content will be sized such that the `Constraints.maxWidth` or `Constraints.maxHeight` is matched (depending on `matchHeightConstraintsFirst`).

Example usage:

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.width
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

Box(Modifier.width(100.dp).aspectRatio(2f).background(Color.Green))

Parameters

`ratio: @FloatRange(from = 0.0, fromInclusive = false) Float`

the desired width/height positive ratio

`matchHeightConstraintsFirst: Boolean = false`

if true, height constraints will be matched before width constraints and used to calculate the resulting size according to `ratio`

### Modifier.contentType

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.contentType(contentType: ContentType): Modifier

Set autofill hint with `contentType`.

This applies the `contentType` to the modifier's semantics, in turn enabling autofill and marking the hint to be associated with this composable. This allows autofill frameworks to provide relevant suggestions to users.

Using `contentType` is equivalent to simply setting the `contentType` semantic property, i.e. `Modifier.contentType(ContentType.NewUsername)` is equivalent to setting `Modifier.semantics { contentType = ContentType.NewUsername }`.

import androidx.compose.foundation.text.input.rememberTextFieldState
import androidx.compose.material.Text
import androidx.compose.material.TextField
import androidx.compose.ui.Modifier
import androidx.compose.ui.autofill.ContentType
import androidx.compose.ui.autofill.contentType
import androidx.compose.ui.semantics.contentType

TextField(
 state \= rememberTextFieldState(),
 label \= { Text("Enter your new username here.") },
 // Set the content type hint with the modifier extension.
 modifier \= Modifier.contentType(ContentType.NewUsername),
)

import androidx.compose.foundation.text.input.rememberTextFieldState
import androidx.compose.material.Text
import androidx.compose.material.TextField
import androidx.compose.ui.Modifier
import androidx.compose.ui.autofill.ContentType
import androidx.compose.ui.autofill.contentType
import androidx.compose.ui.semantics.contentType
import androidx.compose.ui.semantics.semantics

TextField(
 state \= rememberTextFieldState(),
 label \= { Text("Enter your new password here.") },
 // Set the content type hint with semantics.
 modifier \= Modifier.semantics { contentType \= ContentType.NewPassword },
)

Parameters

`contentType: ContentType`

The `ContentType` to apply to the component's semantics.

Returns

`Modifier`

The `Modifier` with the specified `ContentType` semantics set.

### Modifier.background

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.background(color: Color, shape: Shape = RectangleShape): Modifier

Draws `shape` with a solid `color` behind the content.

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.padding
import androidx.compose.material.Text
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

Text("Text with background", Modifier.background(color \= Color.Magenta).padding(10.dp))

Parameters

`color: Color`

color to paint background with

`shape: Shape = RectangleShape`

desired shape of the background

### Modifier.background

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.background( 
    brush: Brush, 
    shape: Shape = RectangleShape, 
    alpha: @FloatRange(from = 0.0, to = 1.0) Float = 1.0f 
): Modifier

Draws `shape` with `brush` behind the content.

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.CutCornerShape
import androidx.compose.material.Text
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

val gradientBrush \=
 Brush.horizontalGradient(
 colors \= listOf(Color.Red, Color.Blue, Color.Green),
 startX \= 0.0f,
 endX \= 500.0f,
 )
Text(
 "Text with gradient back",
 Modifier.background(brush \= gradientBrush, shape \= CutCornerShape(8.dp)).padding(10.dp),
)

Parameters

`brush: Brush`

brush to paint background with

`shape: Shape = RectangleShape`

desired shape of the background

`alpha: @FloatRange(from = 0.0, to = 1.0) Float = 1.0f`

Opacity to be applied to the `brush`, with `0` being completely transparent and `1` being completely opaque. The value must be between `0` and `1`.

### Modifier.basicMarquee

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.basicMarquee( 
    iterations: Int = Iterations, 
    animationMode: MarqueeAnimationMode = Immediately, 
    repeatDelayMillis: Int = RepeatDelayMillis, 
    initialDelayMillis: Int = if (animationMode == Immediately) repeatDelayMillis else 0, 
    spacing: MarqueeSpacing = Spacing, 
    velocity: Dp = Velocity 
): Modifier

Applies an animated marquee effect to the modified content if it's too wide to fit in the available space. This modifier has no effect if the content fits in the max constraints. The content will be measured with unbounded width.

When the animation is running, it will restart from the initial state any time:

* any of the parameters to this modifier change, or
 
* the content or container size change.

The animation only affects the drawing of the content, not its position. The offset returned by the `LayoutCoordinates` of anything inside the marquee is undefined relative to anything outside the marquee, and may not match its drawn position on screen. This modifier also does not currently support content that accepts position-based input such as pointer events.

To only animate when the composable is focused, specify `animationMode` and make the composable focusable. This modifier does not add any visual effects aside from scrolling, but you can add your own by placing modifiers before this one.

import androidx.compose.foundation.basicMarquee
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.width
import androidx.compose.material.Text
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

// Marquee only animates when the content doesn't fit in the max width.
Column(Modifier.width(30.dp)) { Text("hello world", Modifier.basicMarquee()) }

import androidx.compose.foundation.MarqueeSpacing
import androidx.compose.foundation.basicMarquee
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.widthIn
import androidx.compose.material.Text
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawWithContent
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.BlendMode
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.CompositingStrategy
import androidx.compose.ui.graphics.drawscope.ContentDrawScope
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.unit.dp

val edgeWidth \= 32.dp
fun ContentDrawScope.drawFadedEdge(leftEdge: Boolean) {
 val edgeWidthPx \= edgeWidth.toPx()
 drawRect(
 topLeft \= Offset(if (leftEdge) 0f else size.width \- edgeWidthPx, 0f),
 size \= Size(edgeWidthPx, size.height),
 brush \=
 Brush.horizontalGradient(
 colors \= listOf(Color.Transparent, Color.Black),
 startX \= if (leftEdge) 0f else size.width,
 endX \= if (leftEdge) edgeWidthPx else size.width \- edgeWidthPx,
 ),
 blendMode \= BlendMode.DstIn,
 )
}

Text(
 "the quick brown fox jumped over the lazy dogs",
 Modifier.widthIn(max \= edgeWidth \* 4)
 // Rendering to an offscreen buffer is required to get the faded edges' alpha to be
 // applied only to the text, and not whatever is drawn below this composable (e.g. the
 // window).
 .graphicsLayer { compositingStrategy \= CompositingStrategy.Offscreen }
 .drawWithContent {
 drawContent()
 drawFadedEdge(leftEdge \= true)
 drawFadedEdge(leftEdge \= false)
 }
 .basicMarquee(
 // Animate forever.
 iterations \= Int.MAX\_VALUE,
 spacing \= MarqueeSpacing(0.dp),
 )
 .padding(start \= edgeWidth),
)

import androidx.compose.foundation.MarqueeAnimationMode
import androidx.compose.foundation.basicMarquee
import androidx.compose.foundation.clickable
import androidx.compose.foundation.focusable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.width
import androidx.compose.material.Text
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.unit.dp

val focusRequester \= remember { FocusRequester() }

// Marquee only animates when the content doesn't fit in the max width.
Column(Modifier.width(30.dp)) {
 Text(
 "hello world",
 Modifier.clickable { focusRequester.requestFocus() }
 .basicMarquee(animationMode \= MarqueeAnimationMode.WhileFocused)
 .focusRequester(focusRequester)
 .focusable(),
 )
}

Parameters

`iterations: Int = Iterations`

The number of times to repeat the animation. `Int.MAX_VALUE` will repeat forever, and 0 will disable animation.

`animationMode: MarqueeAnimationMode = Immediately`

Whether the marquee should start animating `Immediately` or only `WhileFocused`. In `WhileFocused` mode, the modified node or the content must be made `focusable`. Note that the `initialDelayMillis` is part of the animation, so this parameter determines when that initial delay starts counting down, not when the content starts to actually scroll.

`repeatDelayMillis: Int = RepeatDelayMillis`

The duration to wait before starting each subsequent iteration, in millis.

`initialDelayMillis: Int = if (animationMode == Immediately) repeatDelayMillis else 0`

The duration to wait before starting the first iteration of the animation, in millis. By default, there will be no initial delay if `animationMode` is `WhileFocused`, otherwise the initial delay will be `repeatDelayMillis`.

`spacing: MarqueeSpacing = Spacing`

A `MarqueeSpacing` that specifies how much space to leave at the end of the content before showing the beginning again.

`velocity: Dp = Velocity`

The speed of the animation in dps / second. A positive velocity means that the marquee will animate in the direction of the current `LayoutDirection`.

### Modifier.edgeSwipeToDismiss

android

Artifact: androidx.wear.compose:compose-foundation

View Source

fun Modifier.edgeSwipeToDismiss( 
    swipeToDismissBoxState: SwipeToDismissBoxState, 
    edgeWidth: Dp = SwipeToDismissBoxDefaults.EdgeWidth 
): Modifier

Handles swipe to dismiss from the edge of the viewport.

Used when the content of the `BasicSwipeToDismissBox` is handling all the gestures of the viewport, which prevents `BasicSwipeToDismissBox` from handling the swipe-to-dismiss gesture. Examples of this scenario are horizontal paging, such as 2-d scrolling a Map or swiping horizontally between pages.

Use of `Modifier.edgeSwipeToDismiss` defines a zone on the left side of the viewport of width `edgeWidth` in which the swipe-right gesture is intercepted. Other touch events are ignored - vertical scroll, click, long click, etc.

Currently Edge swipe, like swipe to dismiss, is only supported on the left part of the viewport regardless of layout direction as content is swiped away from left to right.

Requires that the element to which this modifier is applied exists within a `BasicSwipeToDismissBox` which is using the same `SwipeToDismissBoxState` instance. As such, `Modifier.edgeSwipeToDismiss` is also compatible with SwipeDismissableNavHost up to and including API 35. However, for API 36 onwards, SwipeDismissableNavHost uses platform predictive back events for navigation, and is not compatible with `Modifier.edgeSwipeToDismiss`.

Requires that the element to which this modifier is applied notifies the nested scroll system about the scrolling events that are happening on the element. For example, using a `NestedScrollDispatcher`.

Example of a modifier usage with SwipeToDismiss

import androidx.compose.foundation.background
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.rememberScrollState
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.wear.compose.foundation.BasicSwipeToDismissBox
import androidx.wear.compose.foundation.edgeSwipeToDismiss
import androidx.wear.compose.foundation.rememberSwipeToDismissBoxState
import androidx.wear.compose.material.MaterialTheme
import androidx.wear.compose.material.Text

val state \= rememberSwipeToDismissBoxState()

// When using Modifier.edgeSwipeToDismiss, it is required that the element on which the
// modifier applies exists within a SwipeToDismissBox which shares the same state.
BasicSwipeToDismissBox(state \= state, onDismissed \= navigateBack) { isBackground \-\>
 val horizontalScrollState \= rememberScrollState(0)
 if (isBackground) {
 Box(modifier \= Modifier.fillMaxSize().background(MaterialTheme.colors.secondaryVariant))
 } else {
 Box(modifier \= Modifier.fillMaxSize()) {
 Text(
 modifier \=
 Modifier.align(Alignment.Center)
 .edgeSwipeToDismiss(state)
 .horizontalScroll(horizontalScrollState),
 text \=
 "This text can be scrolled horizontally - to dismiss, swipe " +
 "right from the left edge of the screen (called Edge Swiping)",
 )
 }
 }
}

Parameters

`swipeToDismissBoxState: SwipeToDismissBoxState`

State of `BasicSwipeToDismissBox`. Used to trigger swipe gestures on SwipeToDismissBox.

`edgeWidth: Dp = SwipeToDismissBoxDefaults.EdgeWidth`

Width of the edge zone in which the swipe will be recognised.

### Modifier.blur

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.blur( 
    radius: Dp, 
    edgeTreatment: BlurredEdgeTreatment = BlurredEdgeTreatment.Rectangle 
): Modifier

Draw content blurred with the specified radii. Note this effect is only supported on Android 12 and above. Attempts to use this Modifier on older Android versions will be ignored.

Usage of this API renders the corresponding composable into a separate graphics layer. Because the blurred content renders a larger area by the blur radius, this layer is explicitly clipped to the content bounds. It is recommended introduce additional space around the drawn content by the specified blur radius to remain within the content bounds.

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.BlurredEdgeTreatment
import androidx.compose.ui.draw.blur
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

Box(
 Modifier.size(300.dp)
 // Blur content allowing the result to extend beyond the bounds of the original content
 .blur(30.dp, edgeTreatment \= BlurredEdgeTreatment.Unbounded)
 .background(Color.Red, CircleShape)
)

import androidx.compose.foundation.Image
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.BlurredEdgeTreatment
import androidx.compose.ui.draw.blur
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp

Image(
 painter \= painterResource(R.drawable.circus),
 contentDescription \= "sample blurred image",
 // Blur content within the original bounds, clipping the result to a rounded rectangle
 modifier \= Modifier.blur(30.dp, BlurredEdgeTreatment(RoundedCornerShape(5.dp))),
)

Parameters

`radius: Dp`

Radius of the blur along both the x and y axis

`edgeTreatment: BlurredEdgeTreatment = BlurredEdgeTreatment.Rectangle`

Strategy used to render pixels outside of bounds of the original input

See also

`graphicsLayer`

Example usage:

### Modifier.blur

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.blur( 
    radiusX: Dp, 
    radiusY: Dp, 
    edgeTreatment: BlurredEdgeTreatment = BlurredEdgeTreatment.Rectangle 
): Modifier

Draw content blurred with the specified radii. Note this effect is only supported on Android 12 and above. Attempts to use this Modifier on older Android versions will be ignored.

Usage of this API renders the corresponding composable into a separate graphics layer. Because the blurred content renders a larger area by the blur radius, this layer is explicitly clipped to the content bounds. It is recommended introduce additional space around the drawn content by the specified blur radius to remain within the content bounds.

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.BlurredEdgeTreatment
import androidx.compose.ui.draw.blur
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

Box(
 Modifier.size(300.dp)
 // Blur content allowing the result to extend beyond the bounds of the original content
 .blur(30.dp, edgeTreatment \= BlurredEdgeTreatment.Unbounded)
 .background(Color.Red, CircleShape)
)

import androidx.compose.foundation.Image
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.BlurredEdgeTreatment
import androidx.compose.ui.draw.blur
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp

Image(
 painter \= painterResource(R.drawable.circus),
 contentDescription \= "sample blurred image",
 // Blur content within the original bounds, clipping the result to a rounded rectangle
 modifier \= Modifier.blur(30.dp, BlurredEdgeTreatment(RoundedCornerShape(5.dp))),
)

Parameters

`radiusX: Dp`

Radius of the blur along the x axis

`radiusY: Dp`

Radius of the blur along the y axis

`edgeTreatment: BlurredEdgeTreatment = BlurredEdgeTreatment.Rectangle`

Strategy used to render pixels outside of bounds of the original input

See also

`graphicsLayer`

Example usage:

### Modifier.border

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.border(border: BorderStroke, shape: Shape = RectangleShape): Modifier

Modify element to add border with appearance specified with a `border` and a `shape` and clip it.

import androidx.compose.foundation.border
import androidx.compose.foundation.layout.padding
import androidx.compose.material.Text
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

Text("Text with square border", modifier \= Modifier.border(4.dp, Color.Magenta).padding(10.dp))

Parameters

`border: BorderStroke`

`BorderStroke` class that specifies border appearance, such as size and color

`shape: Shape = RectangleShape`

shape of the border

### Modifier.border

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.border(width: Dp, brush: Brush, shape: Shape): Modifier

Modify element to add border with appearance specified with a `width`, a `brush` and a `shape` and clip it.

import androidx.compose.foundation.border
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.Text
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.TileMode
import androidx.compose.ui.unit.dp

val gradientBrush \=
 Brush.horizontalGradient(
 colors \= listOf(Color.Red, Color.Blue, Color.Green),
 startX \= 0.0f,
 endX \= 500.0f,
 tileMode \= TileMode.Repeated,
 )
Text(
 "Text with gradient border",
 modifier \=
 Modifier.border(width \= 2.dp, brush \= gradientBrush, shape \= CircleShape).padding(10.dp),
)

import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.CutCornerShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Button
import androidx.compose.material.Text
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.TileMode
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

val widthRange \= (1..10)
var width by remember { mutableStateOf((widthRange.random()).dp) }

val shapes \= remember { listOf(CutCornerShape(8.dp), CircleShape, RoundedCornerShape(20)) }
var selectedShape by remember { mutableStateOf(shapes.random()) }

val colors \=
 listOf(
 Color.Black,
 Color.DarkGray,
 Color.Gray,
 Color.LightGray,
 Color.White,
 Color.Red,
 Color.Blue,
 Color.Green,
 Color.Yellow,
 Color.Cyan,
 Color.Magenta,
 )
var gradientBrush by remember {
 mutableStateOf(
 Brush.horizontalGradient(
 colors \= listOf(colors.random(), colors.random(), colors.random()),
 startX \= 0.0f,
 endX \= 500.0f,
 tileMode \= TileMode.Repeated,
 )
 )
}

Column(Modifier.padding(2.dp)) {
 Text(text \= "Update border with buttons")
 Row {
 Button(
 modifier \= Modifier.width(60.dp),
 onClick \= { width \= (widthRange.random()).dp },
 ) {
 Text(fontSize \= 8.sp, text \= "width")
 }
 Button(
 modifier \= Modifier.width(60.dp),
 onClick \= {
 gradientBrush \=
 Brush.horizontalGradient(
 colors \= listOf(colors.random(), colors.random(), colors.random()),
 startX \= 0.0f,
 endX \= 500.0f,
 tileMode \= TileMode.Repeated,
 )
 },
 ) {
 Text(fontSize \= 8.sp, text \= "brush")
 }
 Button(
 modifier \= Modifier.width(60.dp),
 onClick \= { selectedShape \= shapes.random() },
 ) {
 Text(fontSize \= 8.sp, text \= "shape")
 }
 }
 Text(
 "Dynamic border",
 modifier \=
 Modifier.border(width \= width, brush \= gradientBrush, shape \= selectedShape)
 .padding(10.dp),
 )
}

Parameters

`width: Dp`

width of the border. Use `Dp.Hairline` for a hairline border.

`brush: Brush`

brush to paint the border with

`shape: Shape`

shape of the border

### Modifier.border

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.border(width: Dp, color: Color, shape: Shape = RectangleShape): Modifier

Modify element to add border with appearance specified with a `width`, a `color` and a `shape` and clip it.

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.CutCornerShape
import androidx.compose.material.Text
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

Text(
 "Text with gradient border",
 modifier \=
 Modifier.border(border \= BorderStroke(2.dp, Color.Blue), shape \= CutCornerShape(8.dp))
 .padding(10.dp),
)

Parameters

`width: Dp`

width of the border. Use `Dp.Hairline` for a hairline border.

`color: Color`

color to paint the border with

`shape: Shape = RectangleShape`

shape of the border

### Modifier.bringIntoViewRequester

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.bringIntoViewRequester( 
    bringIntoViewRequester: BringIntoViewRequester 
): Modifier

Modifier that can be used to send `bringIntoView` requests.

The following example uses a `bringIntoViewRequester` to bring an item into the parent bounds. The example demonstrates how a composable can ask its parents to scroll so that the component using this modifier is brought into the bounds of all its parents.

import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.relocation.BringIntoViewRequester
import androidx.compose.foundation.relocation.bringIntoViewRequester
import androidx.compose.foundation.rememberScrollState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.focusTarget
import androidx.compose.ui.focus.onFocusChanged

Row(Modifier.horizontalScroll(rememberScrollState())) {
 repeat(100) {
 val bringIntoViewRequester \= remember { BringIntoViewRequester() }
 val coroutineScope \= rememberCoroutineScope()
 Box(
 Modifier
 // This associates the RelocationRequester with a Composable that wants to be
 // brought into view.
 .bringIntoViewRequester(bringIntoViewRequester)
 .onFocusChanged {
 if (it.isFocused) {
 coroutineScope.launch {
 // This sends a request to all parents that asks them to scroll so
 // that this item is brought into view.
 bringIntoViewRequester.bringIntoView()
 }
 }
 }
 .focusTarget()
 )
 }
}

Parameters

`bringIntoViewRequester: BringIntoViewRequester`

An instance of `BringIntoViewRequester`. This hoisted object can be used to send `bringIntoView` requests to parents of the current composable.

### Modifier.bringIntoViewResponder

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.bringIntoViewResponder(responder: BringIntoViewResponder): Modifier

A parent that can respond to `BringIntoViewRequester` requests from its children, and adjust itself so that the item is visible on screen. See `BringIntoViewResponder` for more details about how this mechanism works.

import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.relocation.BringIntoViewRequester
import androidx.compose.foundation.relocation.bringIntoViewRequester
import androidx.compose.foundation.rememberScrollState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.focusTarget
import androidx.compose.ui.focus.onFocusChanged

Row(Modifier.horizontalScroll(rememberScrollState())) {
 repeat(100) {
 val bringIntoViewRequester \= remember { BringIntoViewRequester() }
 val coroutineScope \= rememberCoroutineScope()
 Box(
 Modifier
 // This associates the RelocationRequester with a Composable that wants to be
 // brought into view.
 .bringIntoViewRequester(bringIntoViewRequester)
 .onFocusChanged {
 if (it.isFocused) {
 coroutineScope.launch {
 // This sends a request to all parents that asks them to scroll so
 // that this item is brought into view.
 bringIntoViewRequester.bringIntoView()
 }
 }
 }
 .focusTarget()
 )
 }
}

See also

`BringIntoViewRequester`

### Modifier.clickable

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.clickable( 
    enabled: Boolean = true, 
    onClickLabel: String? = null, 
    role: Role? = null, 
    interactionSource: MutableInteractionSource? = null, 
    onClick: () \-> Unit 
): Modifier

Configure component to receive clicks via input or accessibility "click" event.

Add this modifier to the element to make it clickable within its bounds and show a default indication when it's pressed.

This overload will use the `Indication` from `LocalIndication`. Use the other overload to explicitly provide an `Indication` instance. Note that this overload only supports `IndicationNodeFactory` instances provided through `LocalIndication` - it is strongly recommended to migrate to `IndicationNodeFactory`, but you can use the other overload if you still need to support `Indication` instances that are not `IndicationNodeFactory`.

If `interactionSource` is `null`, an internal `MutableInteractionSource` will be lazily created only when needed. This reduces the performance cost of clickable during composition, as creating the `indication` can be delayed until there is an incoming `androidx.compose.foundation.interaction.Interaction`. If you are only passing a remembered `MutableInteractionSource` and you are never using it outside of clickable, it is recommended to instead provide `null` to enable lazy creation. If you need the `Indication` to be created eagerly, provide a remembered `MutableInteractionSource`.

If you need to support double click or long click alongside the single click, consider using `combinedClickable`.

_**Note**_ Any removal operations on Android Views from `clickable` should wrap `onClick` in a `post { }` block to guarantee the event dispatch completes before executing the removal. (You do not need to do this when removing a composable because Compose guarantees it completes via the snapshot state system.)

import androidx.compose.foundation.clickable
import androidx.compose.material.Text
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier

val count \= remember { mutableStateOf(0) }
// content that you want to make clickable
Text(text \= count.value.toString(), modifier \= Modifier.clickable { count.value += 1 })

Parameters

`enabled: Boolean = true`

Controls the enabled state. When `false`, `onClick`, and this modifier will appear disabled for accessibility services

`onClickLabel: String? = null`

semantic / accessibility label for the `onClick` action

`role: Role? = null`

the type of user interface element. Accessibility services might use this to describe the element or do customizations

`interactionSource: MutableInteractionSource? = null`

`MutableInteractionSource` that will be used to dispatch `PressInteraction.Press` when this clickable is pressed. If `null`, an internal `MutableInteractionSource` will be created if needed.

`onClick: () -> Unit`

will be called when user clicks on the element

### Modifier.clickable

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.clickable( 
    interactionSource: MutableInteractionSource?, 
    indication: Indication?, 
    enabled: Boolean = true, 
    onClickLabel: String? = null, 
    role: Role? = null, 
    onClick: () \-> Unit 
): Modifier

Configure component to receive clicks via input or accessibility "click" event.

Add this modifier to the element to make it clickable within its bounds and show an indication as specified in `indication` parameter.

If `interactionSource` is `null`, and `indication` is an `IndicationNodeFactory`, an internal `MutableInteractionSource` will be lazily created along with the `indication` only when needed. This reduces the performance cost of clickable during composition, as creating the `indication` can be delayed until there is an incoming `androidx.compose.foundation.interaction.Interaction`. If you are only passing a remembered `MutableInteractionSource` and you are never using it outside of clickable, it is recommended to instead provide `null` to enable lazy creation. If you need `indication` to be created eagerly, provide a remembered `MutableInteractionSource`.

If `indication` is _not_ an `IndicationNodeFactory`, and instead implements the deprecated `Indication.rememberUpdatedInstance` method, you should explicitly pass a remembered `MutableInteractionSource` as a parameter for `interactionSource` instead of `null`, as this cannot be lazily created inside clickable.

If you need to support double click or long click alongside the single click, consider using `combinedClickable`.

_**Note**_ Any removal operations on Android Views from `clickable` should wrap `onClick` in a `post { }` block to guarantee the event dispatch completes before executing the removal. (You do not need to do this when removing a composable because Compose guarantees it completes via the snapshot state system.)

import androidx.compose.foundation.clickable
import androidx.compose.material.Text
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier

val count \= remember { mutableStateOf(0) }
// content that you want to make clickable
Text(text \= count.value.toString(), modifier \= Modifier.clickable { count.value += 1 })

Parameters

`interactionSource: MutableInteractionSource?`

`MutableInteractionSource` that will be used to dispatch `PressInteraction.Press` when this clickable is pressed. If `null`, an internal `MutableInteractionSource` will be created if needed.

`indication: Indication?`

indication to be shown when modified element is pressed. By default, indication from `LocalIndication` will be used. Pass `null` to show no indication, or current value from `LocalIndication` to show theme default

`enabled: Boolean = true`

Controls the enabled state. When `false`, `onClick`, and this modifier will appear disabled for accessibility services

`onClickLabel: String? = null`

semantic / accessibility label for the `onClick` action

`role: Role? = null`

the type of user interface element. Accessibility services might use this to describe the element or do customizations

`onClick: () -> Unit`

will be called when user clicks on the element

### Modifier.combinedClickable

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.combinedClickable( 
    enabled: Boolean = true, 
    onClickLabel: String? = null, 
    role: Role? = null, 
    onLongClickLabel: String? = null, 
    onLongClick: (() \-> Unit)? = null, 
    onDoubleClick: (() \-> Unit)? = null, 
    hapticFeedbackEnabled: Boolean = true, 
    interactionSource: MutableInteractionSource? = null, 
    onClick: () \-> Unit 
): Modifier

Configure component to receive clicks, double clicks and long clicks via input or accessibility "click" event.

Add this modifier to the element to make it clickable within its bounds.

If you need only click handling, and no double or long clicks, consider using `clickable`

This overload will use the `Indication` from `LocalIndication`. Use the other overload to explicitly provide an `Indication` instance. Note that this overload only supports `IndicationNodeFactory` instances provided through `LocalIndication` - it is strongly recommended to migrate to `IndicationNodeFactory`, but you can use the other overload if you still need to support `Indication` instances that are not `IndicationNodeFactory`.

If `interactionSource` is `null`, an internal `MutableInteractionSource` will be lazily created only when needed. This reduces the performance cost of combinedClickable during composition, as creating the `indication` can be delayed until there is an incoming `androidx.compose.foundation.interaction.Interaction`. If you are only passing a remembered `MutableInteractionSource` and you are never using it outside of combinedClickable, it is recommended to instead provide `null` to enable lazy creation. If you need the `Indication` to be created eagerly, provide a remembered `MutableInteractionSource`.

Note, if the modifier instance gets re-used between a key down and key up events, the ongoing input will be aborted.

_**Note**_ Any removal operations on Android Views from `clickable` should wrap `onClick` in a `post { }` block to guarantee the event dispatch completes before executing the removal. (You do not need to do this when removing a composable because Compose guarantees it completes via the snapshot state system.)

import androidx.compose.foundation.clickable
import androidx.compose.material.Text
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier

val count \= remember { mutableStateOf(0) }
// content that you want to make clickable
Text(text \= count.value.toString(), modifier \= Modifier.clickable { count.value += 1 })

Parameters

`enabled: Boolean = true`

Controls the enabled state. When `false`, `onClick`, `onLongClick` or `onDoubleClick` won't be invoked

`onClickLabel: String? = null`

semantic / accessibility label for the `onClick` action

`role: Role? = null`

the type of user interface element. Accessibility services might use this to describe the element or do customizations

`onLongClickLabel: String? = null`

semantic / accessibility label for the `onLongClick` action

`onLongClick: (() -> Unit)? = null`

will be called when user long presses on the element

`onDoubleClick: (() -> Unit)? = null`

will be called when user double clicks on the element

`hapticFeedbackEnabled: Boolean = true`

whether to use the default `HapticFeedback` behavior

`interactionSource: MutableInteractionSource? = null`

`MutableInteractionSource` that will be used to dispatch `PressInteraction.Press` when this clickable is pressed. If `null`, an internal `MutableInteractionSource` will be created if needed.

`onClick: () -> Unit`

will be called when user clicks on the element

### Modifier.combinedClickable

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.combinedClickable( 
    interactionSource: MutableInteractionSource?, 
    indication: Indication?, 
    enabled: Boolean = true, 
    onClickLabel: String? = null, 
    role: Role? = null, 
    onLongClickLabel: String? = null, 
    onLongClick: (() \-> Unit)? = null, 
    onDoubleClick: (() \-> Unit)? = null, 
    hapticFeedbackEnabled: Boolean = true, 
    onClick: () \-> Unit 
): Modifier

Configure component to receive clicks, double clicks and long clicks via input or accessibility "click" event.

Add this modifier to the element to make it clickable within its bounds.

If you need only click handling, and no double or long clicks, consider using `clickable`.

Add this modifier to the element to make it clickable within its bounds.

If `interactionSource` is `null`, and `indication` is an `IndicationNodeFactory`, an internal `MutableInteractionSource` will be lazily created along with the `indication` only when needed. This reduces the performance cost of clickable during composition, as creating the `indication` can be delayed until there is an incoming `androidx.compose.foundation.interaction.Interaction`. If you are only passing a remembered `MutableInteractionSource` and you are never using it outside of clickable, it is recommended to instead provide `null` to enable lazy creation. If you need `indication` to be created eagerly, provide a remembered `MutableInteractionSource`.

If `indication` is _not_ an `IndicationNodeFactory`, and instead implements the deprecated `Indication.rememberUpdatedInstance` method, you should explicitly pass a remembered `MutableInteractionSource` as a parameter for `interactionSource` instead of `null`, as this cannot be lazily created inside clickable.

Note, if the modifier instance gets re-used between a key down and key up events, the ongoing input will be aborted.

_**Note**_ Any removal operations on Android Views from `clickable` should wrap `onClick` in a `post { }` block to guarantee the event dispatch completes before executing the removal. (You do not need to do this when removing a composable because Compose guarantees it completes via the snapshot state system.)

import androidx.compose.foundation.clickable
import androidx.compose.material.Text
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier

val count \= remember { mutableStateOf(0) }
// content that you want to make clickable
Text(text \= count.value.toString(), modifier \= Modifier.clickable { count.value += 1 })

Parameters

`interactionSource: MutableInteractionSource?`

`MutableInteractionSource` that will be used to emit `PressInteraction.Press` when this clickable is pressed. If `null`, an internal `MutableInteractionSource` will be created if needed.

`indication: Indication?`

indication to be shown when modified element is pressed. By default, indication from `LocalIndication` will be used. Pass `null` to show no indication, or current value from `LocalIndication` to show theme default

`enabled: Boolean = true`

Controls the enabled state. When `false`, `onClick`, `onLongClick` or `onDoubleClick` won't be invoked

`onClickLabel: String? = null`

semantic / accessibility label for the `onClick` action

`role: Role? = null`

the type of user interface element. Accessibility services might use this to describe the element or do customizations

`onLongClickLabel: String? = null`

semantic / accessibility label for the `onLongClick` action

`onLongClick: (() -> Unit)? = null`

will be called when user long presses on the element

`onDoubleClick: (() -> Unit)? = null`

will be called when user double clicks on the element

`hapticFeedbackEnabled: Boolean = true`

whether to use the default `HapticFeedback` behavior

`onClick: () -> Unit`

will be called when user clicks on the element

### Modifier.clip

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.clip(shape: Shape): Modifier

Clip the content to `shape`.

Parameters

`shape: Shape`

the content will be clipped to this `Shape`.

### Modifier.clipToBounds

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.clipToBounds(): Modifier

Clip the content to the bounds of a layer defined at this modifier.

### Modifier.clipScrollableContainer

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.clipScrollableContainer(orientation: Orientation): Modifier

Clips bounds of scrollable container on main axis while leaving space for background effects (like shadows) on cross axis.

Parameters

`orientation: Orientation`

orientation of the scrolling

### Modifier.composed

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.composed( 
    inspectorInfo: InspectorInfo.() \-> Unit = NoInspectorInfo, 
    factory: @Composable Modifier.() \-> Modifier 
): Modifier

Declare a just-in-time composition of a `Modifier` that will be composed for each element it modifies. `composed` may be used to implement **stateful modifiers** that have instance-specific state for each modified element, allowing the same `Modifier` instance to be safely reused for multiple elements while maintaining element-specific state.

If `inspectorInfo` is specified this modifier will be visible to tools during development. Specify the name and arguments of the original modifier.

Example usage:

import androidx.compose.ui.Modifier
import androidx.compose.ui.composed
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.debugInspectorInfo

// let's create your own custom stateful modifier
fun Modifier.myColorModifier(color: Color) \=
 composed(
 // pass inspector information for debug
 inspectorInfo \=
 debugInspectorInfo {
 // name should match the name of the modifier
 name \= "myColorModifier"
 // specify a single argument as the value when the argument name is irrelevant
 value \= color
 },
 // pass your modifier implementation that resolved per modified element
 factory \= {
 // add your modifier implementation here
 Modifier
 },
 )

import androidx.compose.ui.Modifier
import androidx.compose.ui.composed
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.debugInspectorInfo
import androidx.compose.ui.unit.Dp

// let's create your own custom stateful modifier with multiple arguments
fun Modifier.myModifier(width: Dp, height: Dp, color: Color) \=
 composed(
 // pass inspector information for debug
 inspectorInfo \=
 debugInspectorInfo {
 // name should match the name of the modifier
 name \= "myModifier"
 // add name and value of each argument
 properties\["width"\] \= width
 properties\["height"\] \= height
 properties\["color"\] \= color
 },
 // pass your modifier implementation that resolved per modified element
 factory \= {
 // add your modifier implementation here
 Modifier
 },
 )

`materialize` must be called to create instance-specific modifiers if you are directly applying a `Modifier` to an element tree node.

### Modifier.composed

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.composed( 
    fullyQualifiedName: String, 
    key1: Any?, 
    inspectorInfo: InspectorInfo.() \-> Unit = NoInspectorInfo, 
    factory: @Composable Modifier.() \-> Modifier 
): Modifier

Declare a just-in-time composition of a `Modifier` that will be composed for each element it modifies. `composed` may be used to implement **stateful modifiers** that have instance-specific state for each modified element, allowing the same `Modifier` instance to be safely reused for multiple elements while maintaining element-specific state.

When keys are provided, `composed` produces a `Modifier` that will compare `equals` to another modifier constructed with the same keys in order to take advantage of caching and skipping optimizations. `fullyQualifiedName` should be the fully-qualified `import` name for your modifier factory function, e.g. `com.example.myapp.ui.fancyPadding`.

If `inspectorInfo` is specified this modifier will be visible to tools during development. Specify the name and arguments of the original modifier.

Example usage:

import androidx.compose.ui.Modifier
import androidx.compose.ui.composed
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.debugInspectorInfo

// let's create your own custom stateful modifier
fun Modifier.myColorModifier(color: Color) \=
 composed(
 // pass inspector information for debug
 inspectorInfo \=
 debugInspectorInfo {
 // name should match the name of the modifier
 name \= "myColorModifier"
 // specify a single argument as the value when the argument name is irrelevant
 value \= color
 },
 // pass your modifier implementation that resolved per modified element
 factory \= {
 // add your modifier implementation here
 Modifier
 },
 )

import androidx.compose.ui.Modifier
import androidx.compose.ui.composed
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.debugInspectorInfo
import androidx.compose.ui.unit.Dp

// let's create your own custom stateful modifier with multiple arguments
fun Modifier.myModifier(width: Dp, height: Dp, color: Color) \=
 composed(
 // pass inspector information for debug
 inspectorInfo \=
 debugInspectorInfo {
 // name should match the name of the modifier
 name \= "myModifier"
 // add name and value of each argument
 properties\["width"\] \= width
 properties\["height"\] \= height
 properties\["color"\] \= color
 },
 // pass your modifier implementation that resolved per modified element
 factory \= {
 // add your modifier implementation here
 Modifier
 },
 )

`materialize` must be called to create instance-specific modifiers if you are directly applying a `Modifier` to an element tree node.

### Modifier.composed

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.composed( 
    fullyQualifiedName: String, 
    vararg keys: Any?, 
    inspectorInfo: InspectorInfo.() \-> Unit = NoInspectorInfo, 
    factory: @Composable Modifier.() \-> Modifier 
): Modifier

Declare a just-in-time composition of a `Modifier` that will be composed for each element it modifies. `composed` may be used to implement **stateful modifiers** that have instance-specific state for each modified element, allowing the same `Modifier` instance to be safely reused for multiple elements while maintaining element-specific state.

When keys are provided, `composed` produces a `Modifier` that will compare `equals` to another modifier constructed with the same keys in order to take advantage of caching and skipping optimizations. `fullyQualifiedName` should be the fully-qualified `import` name for your modifier factory function, e.g. `com.example.myapp.ui.fancyPadding`.

If `inspectorInfo` is specified this modifier will be visible to tools during development. Specify the name and arguments of the original modifier.

Example usage:

import androidx.compose.ui.Modifier
import androidx.compose.ui.composed
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.debugInspectorInfo

// let's create your own custom stateful modifier
fun Modifier.myColorModifier(color: Color) \=
 composed(
 // pass inspector information for debug
 inspectorInfo \=
 debugInspectorInfo {
 // name should match the name of the modifier
 name \= "myColorModifier"
 // specify a single argument as the value when the argument name is irrelevant
 value \= color
 },
 // pass your modifier implementation that resolved per modified element
 factory \= {
 // add your modifier implementation here
 Modifier
 },
 )

import androidx.compose.ui.Modifier
import androidx.compose.ui.composed
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.debugInspectorInfo
import androidx.compose.ui.unit.Dp

// let's create your own custom stateful modifier with multiple arguments
fun Modifier.myModifier(width: Dp, height: Dp, color: Color) \=
 composed(
 // pass inspector information for debug
 inspectorInfo \=
 debugInspectorInfo {
 // name should match the name of the modifier
 name \= "myModifier"
 // add name and value of each argument
 properties\["width"\] \= width
 properties\["height"\] \= height
 properties\["color"\] \= color
 },
 // pass your modifier implementation that resolved per modified element
 factory \= {
 // add your modifier implementation here
 Modifier
 },
 )

`materialize` must be called to create instance-specific modifiers if you are directly applying a `Modifier` to an element tree node.

### Modifier.composed

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.composed( 
    fullyQualifiedName: String, 
    key1: Any?, 
    key2: Any?, 
    inspectorInfo: InspectorInfo.() \-> Unit = NoInspectorInfo, 
    factory: @Composable Modifier.() \-> Modifier 
): Modifier

Declare a just-in-time composition of a `Modifier` that will be composed for each element it modifies. `composed` may be used to implement **stateful modifiers** that have instance-specific state for each modified element, allowing the same `Modifier` instance to be safely reused for multiple elements while maintaining element-specific state.

When keys are provided, `composed` produces a `Modifier` that will compare `equals` to another modifier constructed with the same keys in order to take advantage of caching and skipping optimizations. `fullyQualifiedName` should be the fully-qualified `import` name for your modifier factory function, e.g. `com.example.myapp.ui.fancyPadding`.

If `inspectorInfo` is specified this modifier will be visible to tools during development. Specify the name and arguments of the original modifier.

Example usage:

import androidx.compose.ui.Modifier
import androidx.compose.ui.composed
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.debugInspectorInfo

// let's create your own custom stateful modifier
fun Modifier.myColorModifier(color: Color) \=
 composed(
 // pass inspector information for debug
 inspectorInfo \=
 debugInspectorInfo {
 // name should match the name of the modifier
 name \= "myColorModifier"
 // specify a single argument as the value when the argument name is irrelevant
 value \= color
 },
 // pass your modifier implementation that resolved per modified element
 factory \= {
 // add your modifier implementation here
 Modifier
 },
 )

import androidx.compose.ui.Modifier
import androidx.compose.ui.composed
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.debugInspectorInfo
import androidx.compose.ui.unit.Dp

// let's create your own custom stateful modifier with multiple arguments
fun Modifier.myModifier(width: Dp, height: Dp, color: Color) \=
 composed(
 // pass inspector information for debug
 inspectorInfo \=
 debugInspectorInfo {
 // name should match the name of the modifier
 name \= "myModifier"
 // add name and value of each argument
 properties\["width"\] \= width
 properties\["height"\] \= height
 properties\["color"\] \= color
 },
 // pass your modifier implementation that resolved per modified element
 factory \= {
 // add your modifier implementation here
 Modifier
 },
 )

`materialize` must be called to create instance-specific modifiers if you are directly applying a `Modifier` to an element tree node.

### Modifier.composed

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.composed( 
    fullyQualifiedName: String, 
    key1: Any?, 
    key2: Any?, 
    key3: Any?, 
    inspectorInfo: InspectorInfo.() \-> Unit = NoInspectorInfo, 
    factory: @Composable Modifier.() \-> Modifier 
): Modifier

Declare a just-in-time composition of a `Modifier` that will be composed for each element it modifies. `composed` may be used to implement **stateful modifiers** that have instance-specific state for each modified element, allowing the same `Modifier` instance to be safely reused for multiple elements while maintaining element-specific state.

When keys are provided, `composed` produces a `Modifier` that will compare `equals` to another modifier constructed with the same keys in order to take advantage of caching and skipping optimizations. `fullyQualifiedName` should be the fully-qualified `import` name for your modifier factory function, e.g. `com.example.myapp.ui.fancyPadding`.

If `inspectorInfo` is specified this modifier will be visible to tools during development. Specify the name and arguments of the original modifier.

Example usage:

import androidx.compose.ui.Modifier
import androidx.compose.ui.composed
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.debugInspectorInfo

// let's create your own custom stateful modifier
fun Modifier.myColorModifier(color: Color) \=
 composed(
 // pass inspector information for debug
 inspectorInfo \=
 debugInspectorInfo {
 // name should match the name of the modifier
 name \= "myColorModifier"
 // specify a single argument as the value when the argument name is irrelevant
 value \= color
 },
 // pass your modifier implementation that resolved per modified element
 factory \= {
 // add your modifier implementation here
 Modifier
 },
 )

import androidx.compose.ui.Modifier
import androidx.compose.ui.composed
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.debugInspectorInfo
import androidx.compose.ui.unit.Dp

// let's create your own custom stateful modifier with multiple arguments
fun Modifier.myModifier(width: Dp, height: Dp, color: Color) \=
 composed(
 // pass inspector information for debug
 inspectorInfo \=
 debugInspectorInfo {
 // name should match the name of the modifier
 name \= "myModifier"
 // add name and value of each argument
 properties\["width"\] \= width
 properties\["height"\] \= height
 properties\["color"\] \= color
 },
 // pass your modifier implementation that resolved per modified element
 factory \= {
 // add your modifier implementation here
 Modifier
 },
 )

`materialize` must be called to create instance-specific modifiers if you are directly applying a `Modifier` to an element tree node.

### Modifier.layoutId

android

Artifact: androidx.constraintlayout:constraintlayout-compose

View Source

fun Modifier.layoutId(layoutId: String, tag: String? = null): Modifier

Alternative to `androidx.compose.ui.layout.layoutId` that enables the use of `tag`.

Parameters

`layoutId: String`

The unique Id string assigned to the Composable

`tag: String? = null`

A string to represent a group of Composables that may be affected by a ConstraintLayout function. Eg: The `Variables` block in a JSON5 based `ConstraintSet`

### Modifier.contentColorProvider

android

Artifact: androidx.xr.glimmer:glimmer

View Source

fun Modifier.contentColorProvider(contentColor: Color): Modifier

Provides `contentColor` for text and iconography to consume. Content color is provided automatically by `surface` - contentColorProvider can be used for cases where some text or icons inside a surface require a different color for emphasis.

Parameters

`contentColor: Color`

the content color to provide for descendants

See also

`surface`

`calculateContentColor`

### Modifier.depthEffect

android

Artifact: androidx.xr.glimmer:glimmer

View Source

fun Modifier.depthEffect(depthEffect: DepthEffect?, shape: Shape): Modifier

Renders shadows for the provided `depthEffect`.

Parameters

`depthEffect: DepthEffect?`

Depth effect to render shadows for. If `null`, no shadows will be rendered.

`shape: Shape`

`Shape` of the shadows

### Modifier.dragAndDropSource

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.dragAndDropSource( 
    transferData: (Offset) \-> DragAndDropTransferData? 
): Modifier

A `Modifier` that allows an element it is applied to be treated like a source for drag and drop operations. It displays the element dragged as a drag shadow.

Learn how to use `Modifier.dragAndDropSource`:

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.border
import androidx.compose.foundation.draganddrop.dragAndDropSource
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Text
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draganddrop.DragAndDropTransferData
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

val label \= remember { "Drag me" }
Box(
 modifier \=
 modifier
 .dragAndDropSource { \_ \-\>
 DragAndDropTransferData(
 clipData \= ClipData.newPlainText(label, label),
 flags \= View.DRAG\_FLAG\_GLOBAL,
 )
 }
 .border(
 border \=
 BorderStroke(
 width \= 4.dp,
 brush \= Brush.linearGradient(listOf(Color.Magenta, Color.Magenta)),
 ),
 shape \= RoundedCornerShape(16.dp),
 )
 .padding(24.dp)
) {
 Text(modifier \= Modifier.align(Alignment.Center), text \= label)
}

Parameters

`transferData: (Offset) -> DragAndDropTransferData?`

A function that receives the current offset of the drag operation and returns the `DragAndDropTransferData` to be transferred. If null is returned, the drag and drop transfer won't be started.

### Modifier.dragAndDropSource

android

Artifact: androidx.compose.foundation:foundation

View Source

@ExperimentalFoundationApi 
fun Modifier.dragAndDropSource( 
    drawDragDecoration: DrawScope.() \-> Unit, 
    block: suspend DragAndDropSourceScope.() \-> Unit 
): Modifier

A Modifier that allows an element it is applied to to be treated like a source for drag and drop operations.

Learn how to use `Modifier.dragAndDropSource` while providing a custom drag shadow:

import androidx.compose.foundation.background
import androidx.compose.foundation.draganddrop.dragAndDropSource
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

Box(
 modifier \=
 Modifier.size(56.dp).background(color \= color).dragAndDropSource(
 drawDragDecoration \= { drawRect(color) }
 ) { \_ \-\>
 color.toDragAndDropTransfer()
 }
)

Parameters

`drawDragDecoration: DrawScope.() -> Unit`

provides the visual representation of the item dragged during the drag and drop gesture.

`block: suspend DragAndDropSourceScope.() -> Unit`

A lambda with a `DragAndDropSourceScope` as a receiver which provides a `PointerInputScope` to detect the drag gesture, after which a drag and drop gesture can be started with `DragAndDropSourceScope.startTransfer`.

### Modifier.dragAndDropSource

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.dragAndDropSource( 
    drawDragDecoration: DrawScope.() \-> Unit, 
    transferData: (Offset) \-> DragAndDropTransferData? 
): Modifier

A `Modifier` that allows an element it is applied to be treated like a source for drag and drop operations.

Learn how to use `Modifier.dragAndDropSource` while providing a custom drag shadow:

import androidx.compose.foundation.background
import androidx.compose.foundation.draganddrop.dragAndDropSource
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

Box(
 modifier \=
 Modifier.size(56.dp).background(color \= color).dragAndDropSource(
 drawDragDecoration \= { drawRect(color) }
 ) { \_ \-\>
 color.toDragAndDropTransfer()
 }
)

Parameters

`drawDragDecoration: DrawScope.() -> Unit`

provides the visual representation of the item dragged during the drag and drop gesture.

`transferData: (Offset) -> DragAndDropTransferData?`

A function that receives the current offset of the drag operation and returns the `DragAndDropTransferData` to be transferred. If null is returned, the drag and drop transfer won't be started.

### Modifier.dragAndDropTarget

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.dragAndDropTarget( 
    shouldStartDragAndDrop: (startEvent: DragAndDropEvent) \-> Boolean, 
    target: DragAndDropTarget 
): Modifier

A modifier that allows for receiving from a drag and drop gesture.

Learn how to use `Modifier.dragAndDropTarget` to receive drag and drop events from inside your app or from other apps:

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.draganddrop.dragAndDropTarget
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.Text
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draganddrop.DragAndDropEvent
import androidx.compose.ui.draganddrop.DragAndDropTarget
import androidx.compose.ui.draganddrop.mimeTypes
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

val validMimeTypePrefixes \= remember {
 setOf(ClipDescription.MIMETYPE\_TEXT\_INTENT, "image/", "text/", "video/", "audio/")
}
var backgroundColor by remember { mutableStateOf(Color.Transparent) }
val dragAndDropTarget \= remember {
 object : DragAndDropTarget {
 override fun onStarted(event: DragAndDropEvent) {
 backgroundColor \= Color.DarkGray.copy(alpha \= 0.2f)
 }

 override fun onDrop(event: DragAndDropEvent): Boolean {
 onDragAndDropEventDropped(event)
 return true
 }

 override fun onEnded(event: DragAndDropEvent) {
 backgroundColor \= Color.Transparent
 }
 }
}
Box(
 modifier \=
 Modifier.fillMaxSize()
 .dragAndDropTarget(
 shouldStartDragAndDrop \= accept@{ startEvent \-\>
 val hasValidMimeType \=
 startEvent.mimeTypes().any { eventMimeType \-\>
 validMimeTypePrefixes.any(eventMimeType::startsWith)
 }
 hasValidMimeType
 },
 target \= dragAndDropTarget,
 )
 .background(backgroundColor)
 .border(width \= 4.dp, color \= Color.Magenta, shape \= RoundedCornerShape(16.dp))
) {
 when (eventSummary) {
 null \-\> Text(modifier \= Modifier.align(Alignment.Center), text \= "Drop anything here")
 else \-\>
 Text(
 modifier \=
 Modifier.padding(horizontal \= 16.dp, vertical \= 24.dp)
 .verticalScroll(rememberScrollState()),
 text \= eventSummary,
 )
 }
}

Parameters

`shouldStartDragAndDrop: (startEvent: DragAndDropEvent) -> Boolean`

Allows the Composable to decide if it wants to receive from a given drag and drop session by inspecting the `DragAndDropEvent` that started the session.

`target: DragAndDropTarget`

The `DragAndDropTarget` that will receive events for a given drag and drop session.

All drag and drop target modifiers in the hierarchy will be given an opportunity to participate in a given drag and drop session via `shouldStartDragAndDrop`.

### Modifier.draggable2D

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.draggable2D( 
    state: Draggable2DState, 
    enabled: Boolean = true, 
    interactionSource: MutableInteractionSource? = null, 
    startDragImmediately: Boolean = false, 
    onDragStarted: (startedPosition: Offset) \-> Unit = NoOpOnDragStart, 
    onDragStopped: (velocity: Velocity) \-> Unit = NoOpOnDragStop, 
    reverseDirection: Boolean = false 
): Modifier

Configure touch dragging for the UI element in both orientations. The drag distance reported to `Draggable2DState`, allowing users to react to the drag delta and update their state.

The common common usecase for this component is when you need to be able to drag something inside the component on the screen and represent this state via one float value

If you are implementing dragging in a single orientation, consider using `draggable`.

import androidx.compose.foundation.background
import androidx.compose.foundation.gestures.draggable2D
import androidx.compose.foundation.gestures.rememberDraggable2DState
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.dp

// Draw a box that has a a grey background
// with a red square that moves along 300.dp dragging in both directions
val max \= 200.dp
val min \= 0.dp
val (minPx, maxPx) \= with(LocalDensity.current) { min.toPx() to max.toPx() }
// this is the offset we will update while dragging
var offsetPositionX by remember { mutableStateOf(0f) }
var offsetPositionY by remember { mutableStateOf(0f) }

Box(
 modifier \=
 Modifier.width(max)
 .height(max)
 .draggable2D(
 state \=
 rememberDraggable2DState { delta \-\>
 val newValueX \= offsetPositionX + delta.x
 val newValueY \= offsetPositionY + delta.y
 offsetPositionX \= newValueX.coerceIn(minPx, maxPx)
 offsetPositionY \= newValueY.coerceIn(minPx, maxPx)
 }
 )
 .background(Color.LightGray)
) {
 Box(
 Modifier.offset {
 IntOffset(offsetPositionX.roundToInt(), offsetPositionY.roundToInt())
 }
 .size(50.dp)
 .background(Color.Red)
 )
}

Parameters

`state: Draggable2DState`

`Draggable2DState` state of the draggable2D. Defines how drag events will be interpreted by the user land logic.

`enabled: Boolean = true`

whether or not drag is enabled

`interactionSource: MutableInteractionSource? = null`

`MutableInteractionSource` that will be used to emit `DragInteraction.Start` when this draggable is being dragged.

`startDragImmediately: Boolean = false`

when set to true, draggable2D will start dragging immediately and prevent other gesture detectors from reacting to "down" events (in order to block composed press-based gestures). This is intended to allow end users to "catch" an animating widget by pressing on it. It's useful to set it when value you're dragging is settling / animating.

`onDragStarted: (startedPosition: Offset) -> Unit = NoOpOnDragStart`

callback that will be invoked when drag is about to start at the starting position, allowing user to perform preparation for drag.

`onDragStopped: (velocity: Velocity) -> Unit = NoOpOnDragStop`

callback that will be invoked when drag is finished, allowing the user to react on velocity and process it.

`reverseDirection: Boolean = false`

reverse the direction of the dragging, so top to bottom dragging will behave like bottom to top and left to right will behave like right to left.

### Modifier.draggable

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.draggable( 
    state: DraggableState, 
    orientation: Orientation, 
    enabled: Boolean = true, 
    interactionSource: MutableInteractionSource? = null, 
    startDragImmediately: Boolean = false, 
    onDragStarted: suspend CoroutineScope.(startedPosition: Offset) \-> Unit = NoOpOnDragStarted, 
    onDragStopped: suspend CoroutineScope.(velocity: Float) \-> Unit = NoOpOnDragStopped, 
    reverseDirection: Boolean = false 
): Modifier

Configure touch dragging for the UI element in a single `Orientation`. The drag distance reported to `DraggableState`, allowing users to react on the drag delta and update their state.

The common usecase for this component is when you need to be able to drag something inside the component on the screen and represent this state via one float value

If you need to control the whole dragging flow, consider using `pointerInput` instead with the helper functions like `detectDragGestures`.

If you want to enable dragging in 2 dimensions, consider using `draggable2D`.

If you are implementing scroll/fling behavior, consider using `scrollable`.

import androidx.compose.foundation.background
import androidx.compose.foundation.gestures.Orientation
import androidx.compose.foundation.gestures.draggable
import androidx.compose.foundation.gestures.rememberDraggableState
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.dp

// Draw a seekbar-like composable that has a black background
// with a red square that moves along the 300.dp drag distance
val max \= 300.dp
val min \= 0.dp
val (minPx, maxPx) \= with(LocalDensity.current) { min.toPx() to max.toPx() }
// this is the state we will update while dragging
val offsetPosition \= remember { mutableStateOf(0f) }

// seekbar itself
Box(
 modifier \=
 Modifier.width(max)
 .draggable(
 orientation \= Orientation.Horizontal,
 state \=
 rememberDraggableState { delta \-\>
 val newValue \= offsetPosition.value + delta
 offsetPosition.value \= newValue.coerceIn(minPx, maxPx)
 },
 )
 .background(Color.Black)
) {
 Box(
 Modifier.offset { IntOffset(offsetPosition.value.roundToInt(), 0) }
 .size(50.dp)
 .background(Color.Red)
 )
}

Parameters

`state: DraggableState`

`DraggableState` state of the draggable. Defines how drag events will be interpreted by the user land logic.

`orientation: Orientation`

orientation of the drag

`enabled: Boolean = true`

whether or not drag is enabled

`interactionSource: MutableInteractionSource? = null`

`MutableInteractionSource` that will be used to emit `DragInteraction.Start` when this draggable is being dragged.

`startDragImmediately: Boolean = false`

when set to true, draggable will start dragging immediately and prevent other gesture detectors from reacting to "down" events (in order to block composed press-based gestures). This is intended to allow end users to "catch" an animating widget by pressing on it. It's useful to set it when value you're dragging is settling / animating.

`onDragStarted: suspend CoroutineScope.(startedPosition: Offset) -> Unit = NoOpOnDragStarted`

callback that will be invoked when drag is about to start at the starting position, allowing user to suspend and perform preparation for drag, if desired. This suspend function is invoked with the draggable scope, allowing for async processing, if desired. Note that the scope used here is the one provided by the draggable node, for long running work that needs to outlast the modifier being in the composition you should use a scope that fits the lifecycle needed.

`onDragStopped: suspend CoroutineScope.(velocity: Float) -> Unit = NoOpOnDragStopped`

callback that will be invoked when drag is finished, allowing the user to react on velocity and process it. This suspend function is invoked with the draggable scope, allowing for async processing, if desired. Note that the scope used here is the one provided by the draggable node, for long running work that needs to outlast the modifier being in the composition you should use a scope that fits the lifecycle needed.

`reverseDirection: Boolean = false`

reverse the direction of the scroll, so top to bottom scroll will behave like bottom to top and left to right will behave like right to left.

### Modifier.drawBehind

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.drawBehind(onDraw: DrawScope.() \-> Unit): Modifier

Draw into a `Canvas` behind the modified content.

### Modifier.drawWithCache

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.drawWithCache(onBuildDrawCache: CacheDrawScope.() \-> DrawResult): Modifier

Draw into a `DrawScope` with content that is persisted across draw calls as long as the size of the drawing area is the same or any state objects that are read have not changed. In the event that the drawing area changes, or the underlying state values that are being read change, this method is invoked again to recreate objects to be used during drawing

For example, a `androidx.compose.ui.graphics.LinearGradient` that is to occupy the full bounds of the drawing area can be created once the size has been defined and referenced for subsequent draw calls without having to re-allocate.

import androidx.compose.foundation.layout.Box
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawWithCache
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color

Box(
 Modifier.drawWithCache {
 val gradient \=
 Brush.linearGradient(
 colors \= listOf(Color.Red, Color.Blue),
 start \= Offset.Zero,
 end \= Offset(size.width, size.height),
 )
 onDrawBehind { drawRect(gradient) }
 }
)

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawWithCache
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color

val colors1 \= listOf(Color.Red, Color.Blue)
val colors2 \= listOf(Color.Yellow, Color.Green)
var toggle by remember { mutableStateOf(true) }
Box(
 Modifier.clickable { toggle \= !toggle }
 .drawWithCache {
 val gradient \=
 Brush.linearGradient(
 colors \= if (toggle) colors1 else colors2,
 start \= Offset.Zero,
 end \= Offset(size.width, size.height),
 )
 onDrawBehind { drawRect(gradient) }
 }
)

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.requiredSize
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawWithCache
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.BlendMode
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.vector.Path
import androidx.compose.ui.graphics.vector.PathData
import androidx.compose.ui.graphics.vector.rememberVectorPainter
import androidx.compose.ui.unit.dp

val vectorPainter \=
 rememberVectorPainter(24.dp, 24.dp, autoMirror \= true) { viewportWidth, viewportHeight \-\>
 Path(
 pathData \=
 PathData {
 lineTo(viewportWidth, 0f)
 lineTo(0f, viewportHeight)
 close()
 },
 fill \= SolidColor(Color.Black),
 )
 }
Image(
 painter \= vectorPainter,
 contentDescription \= null,
 modifier \=
 Modifier.requiredSize(120.dp).drawWithCache {
 val gradient \=
 Brush.linearGradient(
 colors \= listOf(Color.Red, Color.Blue),
 start \= Offset.Zero,
 end \= Offset(0f, size.height),
 )
 onDrawWithContent {
 drawContent()
 drawRect(gradient, blendMode \= BlendMode.Plus)
 }
 },
)

### Modifier.drawWithContent

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.drawWithContent(onDraw: ContentDrawScope.() \-> Unit): Modifier

Creates a `DrawModifier` that allows the developer to draw before or after the layout's contents. It also allows the modifier to adjust the layout's canvas.

### Modifier.excludeFromSystemGesture

android

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.excludeFromSystemGesture(): Modifier

Excludes the layout rectangle from the system gesture.

See also

`setSystemGestureExclusionRects`

### Modifier.excludeFromSystemGesture

android

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.excludeFromSystemGesture( 
    exclusion: (LayoutCoordinates) \-> Rect 
): Modifier

Excludes a rectangle within the local layout coordinates from the system gesture. After layout, `exclusion` is called to determine the `Rect` to exclude from the system gesture area.

The `LayoutCoordinates` of the `Modifier`'s location in the layout is passed as passed as `exclusion`'s parameter.

See also

`setSystemGestureExclusionRects`

### Modifier.animateFloatingActionButton

Cmn

Artifact: androidx.compose.material3:material3

View Source

fun Modifier.animateFloatingActionButton( 
    visible: Boolean, 
    alignment: Alignment, 
    targetScale: Float = FloatingActionButtonDefaults.ShowHideTargetScale, 
    scaleAnimationSpec: AnimationSpec<Float\>? = null, 
    alphaAnimationSpec: AnimationSpec<Float\>? = null 
): Modifier

Apply this modifier to a `FloatingActionButton` to show or hide it with an animation, typically based on the app's main content scrolling.

import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material3.FabPosition
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.FloatingActionButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MediumFloatingActionButton
import androidx.compose.material3.PlainTooltip
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TooltipAnchorPosition
import androidx.compose.material3.TooltipBox
import androidx.compose.material3.TooltipDefaults
import androidx.compose.material3.animateFloatingActionButton
import androidx.compose.material3.rememberTooltipState
import androidx.compose.runtime.derivedStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

val listState \= rememberLazyListState()
// The FAB is initially shown. Upon scrolling past the first item we hide the FAB by using a
// remembered derived state to minimize unnecessary compositions.
val fabVisible by remember { derivedStateOf { listState.firstVisibleItemIndex \== 0 } }

Scaffold(
 floatingActionButton \= {
 // A FAB should have a tooltip associated with it.
 TooltipBox(
 positionProvider \=
 TooltipDefaults.rememberTooltipPositionProvider(TooltipAnchorPosition.Above),
 tooltip \= { PlainTooltip { Text("Localized description") } },
 state \= rememberTooltipState(),
 ) {
 MediumFloatingActionButton(
 modifier \=
 Modifier.animateFloatingActionButton(
 visible \= fabVisible,
 alignment \= Alignment.BottomEnd,
 ),
 onClick \= { /\* do something \*/ },
 ) {
 Icon(
 Icons.Filled.Add,
 contentDescription \= "Localized description",
 modifier \= Modifier.size(FloatingActionButtonDefaults.MediumIconSize),
 )
 }
 }
 },
 floatingActionButtonPosition \= FabPosition.End,
) {
 LazyColumn(state \= listState, modifier \= Modifier.fillMaxSize()) {
 for (index in 0 until 100) {
 item { Text(text \= "List item - $index", modifier \= Modifier.padding(24.dp)) }
 }
 }
}

Parameters

`visible: Boolean`

whether the FAB should be shown or hidden with an animation

`alignment: Alignment`

the direction towards which the FAB should be scaled to and from

`targetScale: Float = FloatingActionButtonDefaults.ShowHideTargetScale`

the initial scale value when showing the FAB and the final scale value when hiding the FAB

`scaleAnimationSpec: AnimationSpec<Float>? = null`

the `AnimationSpec` to use for the scale part of the animation, if null the Fast Spatial spring spec from the `MotionScheme` will be used

`alphaAnimationSpec: AnimationSpec<Float>? = null`

the `AnimationSpec` to use for the alpha part of the animation, if null the Fast Effects spring spec from the `MotionScheme` will be used

### Modifier.onFocusChanged

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.onFocusChanged(onFocusChanged: (FocusState) \-> Unit): Modifier

Add this modifier to a component to observe focus state events. `onFocusChanged` is invoked when the focus state changes. The `onFocusChanged` modifier listens to the state of the first `focusTarget` following this modifier.

import androidx.compose.foundation.border
import androidx.compose.foundation.focusable
import androidx.compose.foundation.layout.Box
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.onFocusChanged
import androidx.compose.ui.graphics.Color.Companion.Black
import androidx.compose.ui.graphics.Color.Companion.Green
import androidx.compose.ui.unit.dp

var color by remember { mutableStateOf(Black) }
Box(
 Modifier.border(2.dp, color)
 // The onFocusChanged should be added BEFORE the focusable that is being observed.
 .onFocusChanged { color \= if (it.isFocused) Green else Black }
 .focusable()
)

Note: If you want to be notified every time the internal focus state is written to (even if it hasn't changed), use `onFocusEvent` instead.

### Modifier.onFocusEvent

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.onFocusEvent(onFocusEvent: (FocusState) \-> Unit): Modifier

Add this modifier to a component to observe focus state events.

### Modifier.focusModifier

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.focusModifier(): Modifier

Add this modifier to a component to make it focusable.

### Modifier.focusTarget

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.focusTarget(): Modifier

Add this modifier to a component to make it focusable.

Focus state is stored within this modifier. The bounds of this modifier reflect the bounds of the focus box.

Note: This is a low level modifier. Before using this consider using `Modifier.focusable()`. It uses a `focusTarget` in its implementation. `Modifier.focusable()` adds semantics that are needed for accessibility.

import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Box
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.focusTarget
import androidx.compose.ui.focus.onFocusChanged
import androidx.compose.ui.graphics.Color.Companion.Black
import androidx.compose.ui.graphics.Color.Companion.Green
import androidx.compose.ui.unit.dp

var color by remember { mutableStateOf(Black) }
Box(
 Modifier.border(2.dp, color)
 // The onFocusChanged should be added BEFORE the focusTarget that is being observed.
 .onFocusChanged { color \= if (it.isFocused) Green else Black }
 .focusTarget()
)

### Modifier.focusOrder

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.focusOrder(focusOrderReceiver: FocusOrder.() \-> Unit): Modifier

Use this modifier to specify a custom focus traversal order.

import androidx.compose.foundation.focusable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusProperties
import androidx.compose.ui.focus.focusRequester

Column(Modifier.fillMaxSize(), Arrangement.SpaceEvenly) {
 val (item1, item2, item3, item4) \= remember { FocusRequester.createRefs() }
 Row(Modifier.fillMaxWidth(), Arrangement.SpaceEvenly) {
 Box(
 Modifier.focusRequester(item1)
 .focusProperties {
 next \= item2
 right \= item2
 down \= item3
 previous \= item4
 }
 .focusable()
 )
 Box(
 Modifier.focusRequester(item2)
 .focusProperties {
 next \= item3
 right \= item1
 down \= item4
 previous \= item1
 }
 .focusable()
 )
 }
 Row(Modifier.fillMaxWidth(), Arrangement.SpaceEvenly) {
 Box(
 Modifier.focusRequester(item3).focusProperties {
 next \= item4
 right \= item4
 up \= item1
 previous \= item2
 }
 )
 Box(
 Modifier.focusRequester(item4).focusProperties {
 next \= item1
 left \= item3
 up \= item2
 previous \= item3
 }
 )
 }
}

Parameters

`focusOrderReceiver: FocusOrder.() -> Unit`

Specifies `FocusRequester`s that are used when the user wants to move the current focus to the `next` item, or wants to move focus `left`, `right`, `up` or `down`.

### Modifier.focusOrder

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.focusOrder(focusRequester: FocusRequester): Modifier

A modifier that lets you specify a `FocusRequester` for the current composable so that this `focusRequester` can be used by another composable to specify a custom focus order.

import androidx.compose.foundation.focusable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusProperties
import androidx.compose.ui.focus.focusRequester

Column(Modifier.fillMaxSize(), Arrangement.SpaceEvenly) {
 val (item1, item2, item3, item4) \= remember { FocusRequester.createRefs() }
 Row(Modifier.fillMaxWidth(), Arrangement.SpaceEvenly) {
 Box(
 Modifier.focusRequester(item1)
 .focusProperties {
 next \= item2
 right \= item2
 down \= item3
 previous \= item4
 }
 .focusable()
 )
 Box(
 Modifier.focusRequester(item2)
 .focusProperties {
 next \= item3
 right \= item1
 down \= item4
 previous \= item1
 }
 .focusable()
 )
 }
 Row(Modifier.fillMaxWidth(), Arrangement.SpaceEvenly) {
 Box(
 Modifier.focusRequester(item3).focusProperties {
 next \= item4
 right \= item4
 up \= item1
 previous \= item2
 }
 )
 Box(
 Modifier.focusRequester(item4).focusProperties {
 next \= item1
 left \= item3
 up \= item2
 previous \= item3
 }
 )
 }
}

### Modifier.focusOrder

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.focusOrder( 
    focusRequester: FocusRequester, 
    focusOrderReceiver: FocusOrder.() \-> Unit 
): Modifier

A modifier that lets you specify a `FocusRequester` for the current composable along with `focusOrder`.

### Modifier.focusProperties

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.focusProperties(scope: FocusProperties.() \-> Unit): Modifier

This modifier allows you to specify properties that are accessible to `focusTarget`s further down the modifier chain or on child layout nodes.

import androidx.compose.foundation.focusable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.focusProperties
import androidx.compose.ui.focus.focusTarget
import androidx.compose.ui.input.InputMode.Companion.Touch
import androidx.compose.ui.platform.LocalInputModeManager

Column {
 // Always focusable.
 Box(modifier \= Modifier.focusProperties { canFocus \= true }.focusTarget())
 // Only focusable in non-touch mode.
 val inputModeManager \= LocalInputModeManager.current
 Box(
 modifier \=
 Modifier.focusProperties { canFocus \= inputModeManager.inputMode != Touch }
 .focusTarget()
 )
}

### Modifier.focusRequester

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.focusRequester(focusRequester: FocusRequester): Modifier

Add this modifier to a component to request changes to focus.

import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.focusable
import androidx.compose.foundation.layout.Box
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.focus.onFocusChanged
import androidx.compose.ui.graphics.Color.Companion.Black
import androidx.compose.ui.graphics.Color.Companion.Green
import androidx.compose.ui.unit.dp

val focusRequester \= remember { FocusRequester() }
var color by remember { mutableStateOf(Black) }
Box(
 Modifier.clickable { focusRequester.requestFocus() }
 .border(2.dp, color)
 // The focusRequester should be added BEFORE the focusable.
 .focusRequester(focusRequester)
 // The onFocusChanged should be added BEFORE the focusable that is being observed.
 .onFocusChanged { color \= if (it.isFocused) Green else Black }
 .focusable()
)

### Modifier.focusRestorer

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.focusRestorer(fallback: FocusRequester = Default): Modifier

This modifier can be used to save and restore focus to a focus group. When focus leaves the focus group, it stores a reference to the item that was previously focused. Then when focus re-enters this focus group, it restores focus to the previously focused item.

import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.material.Button
import androidx.compose.material.Text
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.focusRestorer

LazyRow(Modifier.focusRestorer()) {
 item { Button(onClick \= {}) { Text("1") } }
 item { Button(onClick \= {}) { Text("2") } }
 item { Button(onClick \= {}) { Text("3") } }
 item { Button(onClick \= {}) { Text("4") } }
}

import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.material.Button
import androidx.compose.material.Text
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.focus.focusRestorer

val focusRequester \= remember { FocusRequester() }
LazyRow(
 // If restoration fails, focus would fallback to the item associated with focusRequester.
 Modifier.focusRestorer(focusRequester)
) {
 item {
 Button(modifier \= Modifier.focusRequester(focusRequester), onClick \= {}) { Text("1") }
 }
 item { Button(onClick \= {}) { Text("2") } }
 item { Button(onClick \= {}) { Text("3") } }
 item { Button(onClick \= {}) { Text("4") } }
}

Parameters

`fallback: FocusRequester = Default`

A `FocusRequester` that is used when focus restoration fails to restore the initially focused item. For example, this might happen if the item is not available to be focused. The default value of `FocusRequester.Default` chooses the default focusable item.

### Modifier.focusRestorer

Cmn

Artifact: androidx.compose.ui:ui

View Source

@ExperimentalComposeUiApi 
fun Modifier.focusRestorer(onRestoreFailed: (() \-> FocusRequester)?): Modifier

Deprecated focusRestorer API. Use the version accepting `FocusRequester` instead of the lambda. This method will be removed soon after submitting.

### Modifier.focusGroup

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.focusGroup(): Modifier

Creates a focus group or marks this component as a focus group. This means that when we move focus using the keyboard or programmatically using `FocusManager.moveFocus()`, the items within the focus group will be given a higher priority before focus moves to items outside the focus group.

In the sample below, each column is a focus group, so pressing the tab key will move focus to all the buttons in column 1 before visiting column 2.

import androidx.compose.foundation.focusGroup
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.material.Button
import androidx.compose.material.Text
import androidx.compose.ui.Modifier

Row {
 Column(Modifier.focusGroup()) {
 Button({}) { Text("Row1 Col1") }
 Button({}) { Text("Row2 Col1") }
 Button({}) { Text("Row3 Col1") }
 }
 Column(Modifier.focusGroup()) {
 Button({}) { Text("Row1 Col2") }
 Button({}) { Text("Row2 Col2") }
 Button({}) { Text("Row3 Col2") }
 }
}

Note: The focusable children of a focusable parent automatically form a focus group. This modifier is to be used when you want to create a focus group where the parent is not focusable. If you encounter a component that uses a `focusGroup` internally, you can make it focusable by using a `focusable` modifier. In the second sample here, the `LazyRow` is a focus group that is not itself focusable. But you can make it focusable by adding a `focusable` modifier.

import androidx.compose.foundation.border
import androidx.compose.foundation.focusable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsFocusedAsState
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.material.Button
import androidx.compose.material.Text
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color.Companion.Black
import androidx.compose.ui.graphics.Color.Companion.Red
import androidx.compose.ui.unit.dp

val interactionSource \= remember { MutableInteractionSource() }
LazyRow(
 Modifier.focusable(interactionSource \= interactionSource)
 .border(1.dp, if (interactionSource.collectIsFocusedAsState().value) Red else Black)
) {
 repeat(10) { item { Button({}) { Text("Button$it") } } }
}

### Modifier.focusable

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.focusable( 
    enabled: Boolean = true, 
    interactionSource: MutableInteractionSource? = null 
): Modifier

Configure component to be focusable via focus system or accessibility "focus" event.

Add this modifier to the element to make it focusable within its bounds.

import androidx.compose.foundation.focusable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsFocusedAsState
import androidx.compose.foundation.layout.Column
import androidx.compose.material.Button
import androidx.compose.material.Text
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester

// initialize focus reference to be able to request focus programmatically
val focusRequester \= remember { FocusRequester() }
// MutableInteractionSource to track changes of the component's interactions (like "focused")
val interactionSource \= remember { MutableInteractionSource() }

// text below will change when we focus it via button click
val isFocused \= interactionSource.collectIsFocusedAsState().value
val text \=
 if (isFocused) {
 "Focused! tap anywhere to free the focus"
 } else {
 "Bring focus to me by tapping the button below!"
 }
Column {
 // this Text will change it's text parameter depending on the presence of a focus
 Text(
 text \= text,
 modifier \=
 Modifier
 // add focusRequester modifier before the focusable (or even in the parent)
 .focusRequester(focusRequester)
 .focusable(interactionSource \= interactionSource),
 )
 Button(onClick \= { focusRequester.requestFocus() }) {
 Text("Bring focus to the text above")
 }
}

Parameters

`enabled: Boolean = true`

Controls the enabled state. When `false`, element won't participate in the focus

`interactionSource: MutableInteractionSource? = null`

`MutableInteractionSource` that will be used to emit `FocusInteraction.Focus` when this element is being focused.

### Modifier.onFocusedBoundsChanged

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.onFocusedBoundsChanged( 
    onPositioned: (LayoutCoordinates?) \-> Unit 
): Modifier

Calls `onPositioned` whenever the bounds of the currently-focused area changes. If a child of this node has focus, `onPositioned` will be called immediately with a non-null `LayoutCoordinates` that can be queried for the focused bounds, and again every time the focused child changes or is repositioned. When a child loses focus, `onPositioned` will be passed `null`.

When an event occurs, it is bubbled up from the focusable node, so the nearest parent gets the event first, and then its parent, etc.

Note that there may be some cases where the focused bounds change but the callback is _not_ invoked, but the last `LayoutCoordinates` will always return the most up-to-date bounds.

### Modifier.preferredFrameRate

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.preferredFrameRate(frameRateCategory: FrameRateCategory): Modifier

Set a requested frame rate on Composable

You can set the preferred frame rate (frames per second) for a Composable using a frame rate category see: `FrameRateCategory`.

For increased frame rates, please consider using FrameRateCategory.High.

Keep in mind that the preferred frame rate affects the frame rate for the next frame, so use this method carefully. It's important to note that the preference is valid as long as the Composable is drawn.

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.size
import androidx.compose.material.Button
import androidx.compose.material.LocalContentColor
import androidx.compose.material.Text
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.FrameRateCategory
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.preferredFrameRate
import androidx.compose.ui.unit.dp

var targetAlpha by remember { mutableFloatStateOf(1f) }
val context \= LocalContext.current
val activity: Activity? \= findOwner(context)
DisposableEffect(activity) {
 activity?.window?.frameRateBoostOnTouchEnabled \= false
 onDispose { activity?.window?.frameRateBoostOnTouchEnabled \= true }
}

val alpha by
 animateFloatAsState(targetValue \= targetAlpha, animationSpec \= tween(durationMillis \= 5000))

Column(modifier \= Modifier.size(300.dp)) {
 Button(
 onClick \= { targetAlpha \= if (targetAlpha \== 1f) 0.2f else 1f },
 modifier \=
 Modifier.testTag("frameRateTag")
 .background(LocalContentColor.current.copy(alpha \= alpha)),
 ) {
 Text(
 text \= "Click Me for alpha change with frame rate category High",
 color \= LocalContentColor.current.copy(alpha \= alpha),
 modifier \= Modifier.preferredFrameRate(FrameRateCategory.High),
 )
 }
}

Parameters

`frameRateCategory: FrameRateCategory`

The preferred frame rate category the content should be rendered at.

See also

`graphicsLayer`

### Modifier.preferredFrameRate

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.preferredFrameRate( 
    frameRate: @FloatRange(from = 0.0, to = 360.0) Float 
): Modifier

Set a requested frame rate on Composable

You can set the preferred frame rate (frames per second) for a Composable using a non-negative number. This API should only be used when a specific frame rate is needed for your Composable. For example, 24 or 30 for video play.

If multiple frame rates are requested, they will be aggregated to determine a feasible frame rate.

If you no longer want this modifier to influence the frame rate, clear the preference by setting it to 0.

Keep in mind that the preferred frame rate affects the frame rate for the next frame, so use this method carefully. It's important to note that the preference is valid as long as the Composable is drawn.

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.size
import androidx.compose.material.Button
import androidx.compose.material.LocalContentColor
import androidx.compose.material.Text
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.preferredFrameRate
import androidx.compose.ui.unit.dp

var targetAlpha by remember { mutableFloatStateOf(1f) }
val context \= LocalContext.current
val activity: Activity? \= findOwner(context)
DisposableEffect(activity) {
 activity?.window?.frameRateBoostOnTouchEnabled \= false
 onDispose { activity?.window?.frameRateBoostOnTouchEnabled \= true }
}

val alpha by
 animateFloatAsState(targetValue \= targetAlpha, animationSpec \= tween(durationMillis \= 5000))

Column(modifier \= Modifier.size(300.dp)) {
 Button(
 onClick \= { targetAlpha \= if (targetAlpha \== 1f) 0.2f else 1f },
 modifier \=
 Modifier.testTag("frameRateTag")
 .background(LocalContentColor.current.copy(alpha \= alpha)),
 ) {
 Text(
 text \= "Click Me for alpha change with 30 Hz frame rate",
 color \= LocalContentColor.current.copy(alpha \= alpha), // Adjust text alpha
 modifier \= Modifier.preferredFrameRate(30f),
 )
 }
}

Parameters

`frameRate: @FloatRange(from = 0.0, to = 360.0) Float`

The preferred frame rate the content should be rendered at. Default value is 0.

See also

`graphicsLayer`

### Modifier.graphicsLayer

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.graphicsLayer(block: GraphicsLayerScope.() \-> Unit): Modifier

A `Modifier.Node` that makes content draw into a draw layer. The draw layer can be invalidated separately from parents. A `graphicsLayer` should be used when the content updates independently from anything above it to minimize the invalidated content.

`graphicsLayer` can be used to apply effects to content, such as scaling, rotation, opacity, shadow, and clipping. Prefer this version when you have layer properties backed by a `androidx.compose.runtime.State` or an animated value as reading a state inside `block` will only cause the layer properties update without triggering recomposition and relayout.

NOTE: `block` can be invoked multiple times, which is why it's important for performance to minimize work done inside of it. `block` may also be invoked before effects.

import androidx.compose.animation.core.Animatable
import androidx.compose.material.Text
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.graphicsLayer

val animatedAlpha \= remember { Animatable(0f) }
Text(
 "Hello World",
 Modifier.graphicsLayer {
 alpha \= animatedAlpha.value
 clip \= true
 },
)
LaunchedEffect(animatedAlpha) { animatedAlpha.animateTo(1f) }

Parameters

`block: GraphicsLayerScope.() -> Unit`

block on `GraphicsLayerScope` where you define the layer properties.

### Modifier.graphicsLayer

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.graphicsLayer( 
    scaleX: Float = 1.0f, 
    scaleY: Float = 1.0f, 
    alpha: Float = 1.0f, 
    translationX: Float = 0.0f, 
    translationY: Float = 0.0f, 
    shadowElevation: Float = 0.0f, 
    rotationX: Float = 0.0f, 
    rotationY: Float = 0.0f, 
    rotationZ: Float = 0.0f, 
    cameraDistance: Float = DefaultCameraDistance, 
    transformOrigin: TransformOrigin = TransformOrigin.Center, 
    shape: Shape = RectangleShape, 
    clip: Boolean = false, 
    renderEffect: RenderEffect? = null, 
    ambientShadowColor: Color = DefaultShadowColor, 
    spotShadowColor: Color = DefaultShadowColor, 
    compositingStrategy: CompositingStrategy = CompositingStrategy.Auto, 
    blendMode: BlendMode = BlendMode.SrcOver, 
    colorFilter: ColorFilter? = null, 
    outsets: LayerOutsets = LayerOutsets.Zero 
): Modifier

A `Modifier.Element` that makes content draw into a draw layer. The draw layer can be invalidated separately from parents. A `graphicsLayer` should be used when the content updates independently from anything above it to minimize the invalidated content.

`graphicsLayer` can also be used to apply effects to content, such as scaling (`scaleX`, `scaleY`), rotation (`rotationX`, `rotationY`, `rotationZ`), opacity (`alpha`), shadow (`shadowElevation`, `shape`), clipping (`clip`, `shape`), as well as altering the result of the layer with `RenderEffect`. Shadow color and ambient colors can be modified by configuring the `spotShadowColor` and `ambientShadowColor` respectively.

`CompositingStrategy` determines whether or not the contents of this layer are rendered into an offscreen buffer. This is useful in order to optimize alpha usages with `CompositingStrategy.ModulateAlpha` which will skip the overhead of an offscreen buffer but can generate different rendering results depending on whether or not the contents of the layer are overlapping. Similarly leveraging `CompositingStrategy.Offscreen` is useful in situations where creating an offscreen buffer is preferred usually in conjunction with `BlendMode` usage.

Note that if you provide a non-zero `shadowElevation` and if the passed `shape` is concave the shadow will not be drawn on Android versions less than 10.

Also note that alpha values less than 1.0f will have their contents implicitly clipped to their bounds unless `CompositingStrategy.ModulateAlpha` is specified or layer outsets are provided. This is because an intermediate compositing layer is created to render contents into first before being drawn into the destination with the desired alpha. This layer is sized to the bounds of the composable this modifier is configured on, and contents outside of these bounds are omitted. To avoid this implicit clipping, `LayerOutsets` can be used to increase the size of this layer further from the composable's size. Note that the `clip`, `shape`, `shadowElevation`, `TransformOrigin` will all still be based on the original size i.e. the bounds of the composable.

If the layer parameters are backed by a `androidx.compose.runtime.State` or an animated value prefer an overload with a lambda block on `GraphicsLayerScope` as reading a state inside the block will only cause the layer properties update without triggering recomposition and relayout.

import androidx.compose.material.Text
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.graphicsLayer

Text("Hello World", Modifier.graphicsLayer(alpha \= 0.5f, clip \= true))

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.size
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.CompositingStrategy
import androidx.compose.ui.graphics.drawscope.inset
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.unit.dp

Canvas(
 modifier \=
 Modifier.size(100.dp)
 .background(Color.Black)
 .graphicsLayer(
 alpha \= 0.5f,
 compositingStrategy \= CompositingStrategy.ModulateAlpha,
 )
) {
 // Configuring an alpha less than 1.0 and specifying
 // CompositingStrategy.ModulateAlpha ends up with the overlapping region
 // of the 2 draw rect calls to blend transparent blue and transparent red
 // against the black background instead of just transparent blue which is what would
 // occur with CompositingStrategy.Auto or CompositingStrategy.Offscreen
 inset(0f, 0f, size.width / 3, size.height / 3) { drawRect(color \= Color.Red) }
 inset(size.width / 3, size.height / 3, 0f, 0f) { drawRect(color \= Color.Blue) }
}

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.size
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.LayerOutsets
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.unit.dp

Box(Modifier.size(100.dp).graphicsLayer(alpha \= 0.5f, outsets \= LayerOutsets(100.dp))) {
 // Configuring an alpha less than 1.0 has promoted the layer to an offscreen buffer thus
 // implicitly clipping
 // the layer to its bounds. The inner box draws a Rect which extends beyond the layout
 // bounds of the outer
 // box. LayerOutsets are provided to the layer that is promoted to the offscreen buffer to
 // extend its visual bounds
 // to avoid clipping the content drawn by its children.
 Box(
 Modifier.fillMaxSize().drawBehind {
 drawRect(
 topLeft \= Offset(100f, 100f),
 brush \= SolidColor(Color.Red),
 size \= Size(800f, 500f),
 )
 }
 )
}

Parameters

`scaleX: Float = 1.0f`

see `GraphicsLayerScope.scaleX`

`scaleY: Float = 1.0f`

see `GraphicsLayerScope.scaleY`

`alpha: Float = 1.0f`

see `GraphicsLayerScope.alpha`

`translationX: Float = 0.0f`

see `GraphicsLayerScope.translationX`

`translationY: Float = 0.0f`

see `GraphicsLayerScope.translationY`

`shadowElevation: Float = 0.0f`

see `GraphicsLayerScope.shadowElevation`

`rotationX: Float = 0.0f`

see `GraphicsLayerScope.rotationX`

`rotationY: Float = 0.0f`

see `GraphicsLayerScope.rotationY`

`rotationZ: Float = 0.0f`

see `GraphicsLayerScope.rotationZ`

`cameraDistance: Float = DefaultCameraDistance`

see `GraphicsLayerScope.cameraDistance`

`transformOrigin: TransformOrigin = TransformOrigin.Center`

see `GraphicsLayerScope.transformOrigin`

`shape: Shape = RectangleShape`

see `GraphicsLayerScope.shape`

`clip: Boolean = false`

see `GraphicsLayerScope.clip`

`renderEffect: RenderEffect? = null`

see `GraphicsLayerScope.renderEffect`

`ambientShadowColor: Color = DefaultShadowColor`

see `GraphicsLayerScope.ambientShadowColor`

`spotShadowColor: Color = DefaultShadowColor`

see `GraphicsLayerScope.spotShadowColor`

`compositingStrategy: CompositingStrategy = CompositingStrategy.Auto`

see `GraphicsLayerScope.compositingStrategy`

`blendMode: BlendMode = BlendMode.SrcOver`

see `GraphicsLayerScope.blendMode`

`colorFilter: ColorFilter? = null`

see `GraphicsLayerScope.colorFilter`

`outsets: LayerOutsets = LayerOutsets.Zero`

see `GraphicsLayerScope.outsets`

### Modifier.toolingGraphicsLayer

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.toolingGraphicsLayer(): Modifier

A `Modifier.Element` that adds a draw layer such that tooling can identify an element in the drawn image.

### Modifier.handwritingDetector

android

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.handwritingDetector(callback: () \-> Unit): Modifier

Configures an element to act as a handwriting detector which detects stylus handwriting and delegates handling of the recognised text to another element.

Stylus movement on the element will start a handwriting session, and trigger the `callback`. The `callback` implementation is expected to show and focus a text input field with a `handwritingHandler` modifier which can handle the recognized text from the handwriting session.

A common use case is a component which looks like a text input field but does not actually support text input itself, and clicking on this fake text input field causes a real text input field to be shown. To support handwriting initiation in this case, this modifier can be applied to the fake text input field to configure it as a detector, and a `handwritingHandler` modifier can be applied to the real text input field. The `callback` implementation is typically the same as the `onClick` implementation for the fake text field's `clickable` modifier, which shows and focuses the real text input field.

This function returns a no-op modifier on API levels below Android U (34) as stylus handwriting is not supported.

import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.requiredWidth
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.text.handwriting.handwritingDetector
import androidx.compose.foundation.text.handwriting.handwritingHandler
import androidx.compose.foundation.text.input.TextFieldState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.Card
import androidx.compose.material.ContentAlpha
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.snapshotFlow
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.platform.LocalWindowInfo
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Dialog

var openDialog by remember { mutableStateOf(false) }
val focusRequester \= remember { FocusRequester() }

Column(
 Modifier.imePadding().requiredWidth(300.dp).verticalScroll(rememberScrollState()),
 verticalArrangement \= Arrangement.Center,
 horizontalAlignment \= Alignment.CenterHorizontally,
) {
 Text(
 "This is not an actual text field, but it is a handwriting detector so you can use " +
 "a stylus to write here."
 )
 Spacer(Modifier.size(16.dp))
 Text(
 "Fake text field",
 Modifier.fillMaxWidth()
 .handwritingDetector { openDialog \= !openDialog }
 .padding(4.dp)
 .border(
 1.dp,
 MaterialTheme.colors.onSurface.copy(alpha \= ContentAlpha.disabled),
 RoundedCornerShape(4.dp),
 )
 .padding(16.dp),
 color \= MaterialTheme.colors.onSurface.copy(alpha \= ContentAlpha.medium),
 )
}

if (openDialog) {
 Dialog(onDismissRequest \= { openDialog \= false }) {
 Card(modifier \= Modifier.width(300.dp), shape \= RoundedCornerShape(16.dp)) {
 Column(
 modifier \= Modifier.padding(24.dp),
 verticalArrangement \= Arrangement.Center,
 horizontalAlignment \= Alignment.CenterHorizontally,
 ) {
 Text("This text field is a handwriting handler.")
 Spacer(Modifier.size(16.dp))
 val state \= remember { TextFieldState() }
 BasicTextField(
 state \= state,
 modifier \=
 Modifier.fillMaxWidth()
 .focusRequester(focusRequester)
 .handwritingHandler(),
 decorator \= { innerTextField \-\>
 Box(
 Modifier.padding(4.dp)
 .border(
 1.dp,
 MaterialTheme.colors.onSurface,
 RoundedCornerShape(4.dp),
 )
 .padding(16.dp)
 ) {
 innerTextField()
 }
 },
 )
 }
 }

 val windowInfo \= LocalWindowInfo.current
 LaunchedEffect(windowInfo) {
 snapshotFlow { windowInfo.isWindowFocused }
 .collect { isWindowFocused \-\>
 if (isWindowFocused) {
 focusRequester.requestFocus()
 }
 }
 }
 }
}

Parameters

`callback: () -> Unit`

a callback which will be triggered when stylus handwriting is detected

### Modifier.handwritingHandler

android

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.handwritingHandler(): Modifier

Configures an element to act as a stylus handwriting handler which can handle text input from a handwriting session which was triggered by stylus handwriting on a handwriting detector.

When this element gains focus, if there is an ongoing stylus handwriting delegation which was triggered by stylus handwriting on a handwriting detector, this element will receive text input from the handwriting session via its input connection.

A common use case is a component which looks like a text input field but does not actually support text input itself, and clicking on this fake text input field causes a real text input field to be shown. To support handwriting initiation in this case, a `handwritingDetector` modifier can be applied to the fake text input field to configure it as a detector, and this modifier can be applied to the real text input field. The `callback` implementation for the fake text field's `handwritingDetector` modifier is typically the same as the `onClick` implementation its `clickable` modifier, which shows and focuses the real text input field.

This function returns a no-op modifier on API levels below Android U (34) as stylus handwriting is not supported.

import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.requiredWidth
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.text.handwriting.handwritingDetector
import androidx.compose.foundation.text.handwriting.handwritingHandler
import androidx.compose.foundation.text.input.TextFieldState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.Card
import androidx.compose.material.ContentAlpha
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.snapshotFlow
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.platform.LocalWindowInfo
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Dialog

var openDialog by remember { mutableStateOf(false) }
val focusRequester \= remember { FocusRequester() }

Column(
 Modifier.imePadding().requiredWidth(300.dp).verticalScroll(rememberScrollState()),
 verticalArrangement \= Arrangement.Center,
 horizontalAlignment \= Alignment.CenterHorizontally,
) {
 Text(
 "This is not an actual text field, but it is a handwriting detector so you can use " +
 "a stylus to write here."
 )
 Spacer(Modifier.size(16.dp))
 Text(
 "Fake text field",
 Modifier.fillMaxWidth()
 .handwritingDetector { openDialog \= !openDialog }
 .padding(4.dp)
 .border(
 1.dp,
 MaterialTheme.colors.onSurface.copy(alpha \= ContentAlpha.disabled),
 RoundedCornerShape(4.dp),
 )
 .padding(16.dp),
 color \= MaterialTheme.colors.onSurface.copy(alpha \= ContentAlpha.medium),
 )
}

if (openDialog) {
 Dialog(onDismissRequest \= { openDialog \= false }) {
 Card(modifier \= Modifier.width(300.dp), shape \= RoundedCornerShape(16.dp)) {
 Column(
 modifier \= Modifier.padding(24.dp),
 verticalArrangement \= Arrangement.Center,
 horizontalAlignment \= Alignment.CenterHorizontally,
 ) {
 Text("This text field is a handwriting handler.")
 Spacer(Modifier.size(16.dp))
 val state \= remember { TextFieldState() }
 BasicTextField(
 state \= state,
 modifier \=
 Modifier.fillMaxWidth()
 .focusRequester(focusRequester)
 .handwritingHandler(),
 decorator \= { innerTextField \-\>
 Box(
 Modifier.padding(4.dp)
 .border(
 1.dp,
 MaterialTheme.colors.onSurface,
 RoundedCornerShape(4.dp),
 )
 .padding(16.dp)
 ) {
 innerTextField()
 }
 },
 )
 }
 }

 val windowInfo \= LocalWindowInfo.current
 LaunchedEffect(windowInfo) {
 snapshotFlow { windowInfo.isWindowFocused }
 .collect { isWindowFocused \-\>
 if (isWindowFocused) {
 focusRequester.requestFocus()
 }
 }
 }
 }
}

### Modifier.hierarchicalFocusGroup

android

Artifact: androidx.wear.compose:compose-foundation

View Source

fun Modifier.hierarchicalFocusGroup(active: Boolean): Modifier

`hierarchicalFocusGroup` is used to annotate composables in an application, so we can keep track of what is the active part of the composition. In turn, this is used to coordinate focus in a declarative way, requesting focus when needed, as the user navigates through the app (such as between screens or between pages within a screen). In most cases, this is automatically handled by Wear Compose components and no action is necessary. In particular this is done by `BasicSwipeToDismissBox`, `HorizontalPager`, `VerticalPager` and PickerGroup. This modifier is useful if you implement a custom component that needs to direct focus to one of several children, like a custom Pager, a Tabbed layout, etc.

`hierarchicalFocusGroup`s can be nested to form a focus tree, with an implicit root. For sibling `hierarchicalFocusGroup`s, only one should have active = true. Within the focus tree, components that need to request focus can do so using `Modifier.requestFocusOnHierarchyActive`. Note that ScalingLazyColumn and TransformingLazyColumn are using it already, so there is no need to add it explicitly.

When focus changes, the focus tree is examined and the topmost (closest to the root of the tree) `requestFocusOnHierarchyActive` which has all its `hierarchicalFocusGroup` ancestors with active = true will request focus. If no such `requestFocusOnHierarchyActive` exists, the focus will be cleared.

NOTE: This shouldn't be used together with `FocusRequester.requestFocus` calls in `LaunchedEffect`.

Example usage:

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.focusable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.text.BasicText
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.onFocusChanged
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.wear.compose.foundation.hierarchicalFocusGroup
import androidx.wear.compose.foundation.requestFocusOnHierarchyActive

var selected by remember { mutableIntStateOf(0) }

Row(Modifier.fillMaxSize(), verticalAlignment \= Alignment.CenterVertically) {
 repeat(5) { colIx \-\>
 Box(
 Modifier.hierarchicalFocusGroup(active \= selected \== colIx)
 .weight(1f)
 .clickable { selected \= colIx }
 .then(
 if (selected \== colIx) {
 Modifier.border(BorderStroke(2.dp, Color.Red))
 } else {
 Modifier
 }
 )
 ) {
 // This is used a Gray background to the currently focused item, as seen by the
 // focus system.
 var focused by remember { mutableStateOf(false) }

 BasicText(
 "$colIx",
 style \=
 TextStyle(
 color \= Color.White,
 fontSize \= 20.sp,
 textAlign \= TextAlign.Center,
 ),
 modifier \=
 Modifier.fillMaxWidth()
 .requestFocusOnHierarchyActive()
 .onFocusChanged { focused \= it.isFocused }
 .focusable()
 .then(
 if (focused) {
 Modifier.background(Color.Gray)
 } else {
 Modifier
 }
 ),
 )
 }
 }
}

Sample using nested `hierarchicalFocusGroup`:

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.text.BasicText
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.sp
import androidx.wear.compose.foundation.hierarchicalFocusGroup
import androidx.wear.compose.foundation.lazy.ScalingLazyColumn
import androidx.wear.compose.foundation.requestFocusOnHierarchyActive

Column(Modifier.fillMaxSize()) {
 var selectedRow by remember { mutableIntStateOf(0) }
 repeat(2) { rowIx \-\>
 Row(
 Modifier.weight(1f)
 .fillMaxWidth()
 .hierarchicalFocusGroup(active \= selectedRow \== rowIx)
 ) {
 var selectedItem by remember { mutableIntStateOf(0) }
 repeat(2) { itemIx \-\>
 Box(
 Modifier.weight(1f).hierarchicalFocusGroup(active \= selectedItem \== itemIx)
 ) {
 // ScalingLazyColumn uses requestFocusOnHierarchyActive internally
 ScalingLazyColumn(
 Modifier.fillMaxWidth().clickable {
 selectedRow \= rowIx
 selectedItem \= itemIx
 }
 ) {
 val prefix \= (rowIx \* 2 + itemIx + 'A'.code).toChar()
 items(20) {
 BasicText(
 "$prefix $it",
 style \=
 TextStyle(
 color \= Color.White,
 fontSize \= 20.sp,
 textAlign \= TextAlign.Center,
 ),
 )
 }
 }
 }
 }
 }
 }
}

Parameters

`active: Boolean`

Pass true when this sub tree of the focus tree is active and may require the focus - otherwise, pass false. For example, a pager can apply this modifier to each page's content with a call to `hierarchicalFocusGroup`, marking only the current page as active.

### Modifier.requestFocusOnHierarchyActive

android

Artifact: androidx.wear.compose:compose-foundation

View Source

fun Modifier.requestFocusOnHierarchyActive(): Modifier

This Modifier is used in conjunction with `hierarchicalFocusGroup` and will request focus on the following focusable element when needed (i.e. this needs to be before that element in the Modifier chain). The focusable element is usually a `androidx.wear.compose.foundation.rotary.rotaryScrollable` (or, in some rarer cases a `androidx.compose.foundation.focusable` or `androidx.compose.ui.focus.focusTarget`)

Multiple `requestFocusOnHierarchyActive` Modifiers shouldn't be siblings, in those cases they need to surround each with a `hierarchicalFocusGroup`, and at most one of them should have active = true, to inform which `requestFocusOnHierarchyActive` should get the focus.

NOTE: This shouldn't be used together with `FocusRequester.requestFocus` calls in `LaunchedEffect`.

Example usage:

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.focusable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.text.BasicText
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.onFocusChanged
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.wear.compose.foundation.hierarchicalFocusGroup
import androidx.wear.compose.foundation.requestFocusOnHierarchyActive

var selected by remember { mutableIntStateOf(0) }

Row(Modifier.fillMaxSize(), verticalAlignment \= Alignment.CenterVertically) {
 repeat(5) { colIx \-\>
 Box(
 Modifier.hierarchicalFocusGroup(active \= selected \== colIx)
 .weight(1f)
 .clickable { selected \= colIx }
 .then(
 if (selected \== colIx) {
 Modifier.border(BorderStroke(2.dp, Color.Red))
 } else {
 Modifier
 }
 )
 ) {
 // This is used a Gray background to the currently focused item, as seen by the
 // focus system.
 var focused by remember { mutableStateOf(false) }

 BasicText(
 "$colIx",
 style \=
 TextStyle(
 color \= Color.White,
 fontSize \= 20.sp,
 textAlign \= TextAlign.Center,
 ),
 modifier \=
 Modifier.fillMaxWidth()
 .requestFocusOnHierarchyActive()
 .onFocusChanged { focused \= it.isFocused }
 .focusable()
 .then(
 if (focused) {
 Modifier.background(Color.Gray)
 } else {
 Modifier
 }
 ),
 )
 }
 }
}

### Modifier.hoverable

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.hoverable( 
    interactionSource: MutableInteractionSource, 
    enabled: Boolean = true 
): Modifier

Configure component to be hoverable via pointer enter/exit events.

import androidx.compose.foundation.background
import androidx.compose.foundation.hoverable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsHoveredAsState
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.material.Text
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

// MutableInteractionSource to track changes of the component's interactions (like "hovered")
val interactionSource \= remember { MutableInteractionSource() }
val isHovered by interactionSource.collectIsHoveredAsState()

// the color will change depending on the presence of a hover
Box(
 modifier \=
 Modifier.size(128.dp)
 .background(if (isHovered) Color.Red else Color.Blue)
 .hoverable(interactionSource \= interactionSource),
 contentAlignment \= Alignment.Center,
) {
 Text(if (isHovered) "Hovered" else "Unhovered")
}

Parameters

`interactionSource: MutableInteractionSource`

`MutableInteractionSource` that will be used to emit `HoverInteraction.Enter` when this element is being hovered.

`enabled: Boolean = true`

Controls the enabled state. When `false`, hover events will be ignored.

### Modifier.indication

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.indication( 
    interactionSource: InteractionSource, 
    indication: Indication? 
): Modifier

Draws visual effects for this component when interactions occur.

import androidx.compose.foundation.LocalIndication
import androidx.compose.foundation.clickable
import androidx.compose.foundation.indication
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.requiredHeight
import androidx.compose.material.Text
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

val interactionSource \= remember { MutableInteractionSource() }
Column {
 Text(
 text \= "Click me and my neighbour will indicate as well!",
 modifier \=
 Modifier
 // clickable will dispatch events using MutableInteractionSource
 .clickable(
 interactionSource \= interactionSource,
 indication \= LocalIndication.current,
 ) {
 /\*\* do something \*/
 }
 .padding(10.dp),
 )
 Spacer(Modifier.requiredHeight(10.dp))
 Text(
 text \= "I'm neighbour and I indicate when you click the other one",
 modifier \=
 Modifier
 // this element doesn't have a click, but will show default indication from the
 // CompositionLocal as it accepts the same MutableInteractionSource
 .indication(interactionSource, LocalIndication.current)
 .padding(10.dp),
 )
}

Parameters

`interactionSource: InteractionSource`

`InteractionSource` that will be used by `indication` to draw visual effects - this `InteractionSource` represents the stream of `Interaction`s for this component.

`indication: Indication?`

`Indication` used to draw visual effects. If `null`, no visual effects will be shown for this component.

### Modifier.onIndirectPointerGesture

android

Artifact: androidx.xr.glimmer:glimmer

View Source

fun Modifier.onIndirectPointerGesture( 
    enabled: Boolean = true, 
    onSwipeForward: (() \-> Unit)? = null, 
    onSwipeBackward: (() \-> Unit)? = null, 
    onClick: (() \-> Unit)? = null 
): Modifier

A `Modifier` that detects high-level click and horizontal swipe gestures from an `IndirectPointerEvent` source. The component (or one of its descendants) using this modifier **must be focused** to intercept events.

This modifier allows optionality for swipe gesture callbacks. If a specific swipe gesture callback is `null`, the corresponding swipe events will not be consumed by this modifier. For example:

* When nesting `onIndirectPointerGesture` modifiers, if the inner modifier provides an `onSwipeBackward` callback but leaves `onSwipeForward` as `null`, the outer modifier can still detect and handle the forward swipe, and vice versa.

Note that the initial `down` event is always consumed by this modifier (if not already consumed) as long as at least one callback (`onClick`, `onSwipeForward`, or `onSwipeBackward`) is provided.

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.focusTarget
import androidx.xr.glimmer.onIndirectPointerGesture

Box(
 modifier \=
 Modifier.fillMaxSize()
 .onIndirectPointerGesture(
 enabled \= true,
 onSwipeForward \= { /\* onSwipeForward \*/ },
 onSwipeBackward \= { /\* onSwipeBackward \*/ },
 onClick \= { /\* onClick \*/ },
 )
 .focusTarget()
) {
 // App()
}

Parameters

`enabled: Boolean = true`

Controls whether gesture detection is active. When `false`, this modifier has no effect and no callbacks will be invoked.

`onSwipeForward: (() -> Unit)? = null`

Invoked when a successful forward swipe is detected.

`onSwipeBackward: (() -> Unit)? = null`

Invoked when a successful backward swipe is detected.

`onClick: (() -> Unit)? = null`

Invoked when a successful click is detected.

### Modifier.inspectable

Cmn

Artifact: androidx.compose.ui:ui

View Source

inline fun Modifier.inspectable( 
    noinline inspectorInfo: InspectorInfo.() \-> Unit, 
    factory: Modifier.() \-> Modifier 
): Modifier

Use this to group a common set of modifiers and provide `InspectorInfo` for the resulting modifier.

import androidx.compose.foundation.background
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.debugInspectorInfo
import androidx.compose.ui.platform.inspectable
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

/\*\* Sample with a single parameter \*/
fun Modifier.simpleFrame(color: Color) \=
 inspectable(
 inspectorInfo \=
 debugInspectorInfo {
 name \= "simpleFrame"
 value \= color
 }
 ) {
 background(color, RoundedCornerShape(5.0.dp))
 }

/\*\* Sample with multiple parameters \*/
fun Modifier.fancyFrame(size: Dp, color: Color) \=
 inspectable(
 inspectorInfo \=
 debugInspectorInfo {
 name \= "fancyFrame"
 properties\["size"\] \= size
 properties\["color"\] \= color
 }
 ) {
 background(color, RoundedCornerShape(size))
 }

### Modifier.minimumInteractiveComponentSize

Cmn

Artifact: androidx.compose.material:material

View Source

fun Modifier.minimumInteractiveComponentSize(): Modifier

Reserves at least 48.dp in size to disambiguate touch interactions if the element would measure smaller.

https://m2.material.io/design/usability/accessibility.html#layout-and-typography

This uses the Material recommended minimum size of 48.dp x 48.dp, which may not the same as the system enforced minimum size. The minimum clickable / touch target size (48.dp by default) is controlled by the system via `ViewConfiguration` and automatically expanded at the touch input layer.

This modifier is not needed for touch target expansion to happen. It only affects layout, to make sure there is adequate space for touch target expansion.

Because layout constraints are affected by modifier order, for this modifier to take effect, it must come before any size modifiers on the element that might limit its constraints.

### Modifier.minimumInteractiveComponentSize

Cmn

Artifact: androidx.compose.material:material

View Source

fun Modifier.minimumInteractiveComponentSize(): Modifier

Reserves at least 48.dp in size to disambiguate touch interactions if the element would measure smaller.

Target sizes

This uses the Material recommended minimum size of 48.dp x 48.dp, which may not the same as the system enforced minimum size. The minimum clickable / touch target size (48.dp by default) is controlled by the system via `ViewConfiguration` and automatically expanded at the touch input layer.

This modifier is not needed for touch target expansion to happen. It only affects layout, to make sure there is adequate space for touch target expansion.

Because layout constraints are affected by modifier order, for this modifier to take effect, it must come before any size modifiers on the element that might limit its constraints.

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.size
import androidx.compose.material3.minimumInteractiveComponentSize
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@Composable
fun Widget(color: Color, modifier: Modifier \= Modifier) {
 // Default size is 24.dp, which is smaller than the recommended touch target
 Box(modifier.size(24.dp).background(color))
}

Column(Modifier.border(1.dp, Color.Black)) {
 // Not interactable, no need for touch target enforcement
 Widget(Color.Red)

 Widget(
 color \= Color.Green,
 modifier \=
 Modifier.clickable { /\* do something \*/ }
 // Component is now interactable, so it should enforce a sufficient touch target
 .minimumInteractiveComponentSize(),
 )

 Widget(
 color \= Color.Blue,
 modifier \=
 Modifier.clickable { /\* do something \*/ }
 // Component is now interactable, so it should enforce a sufficient touch target
 .minimumInteractiveComponentSize()
 // Any size modifiers should come after \`minimumInteractiveComponentSize\`
 // so as not to interfere with layout expansion
 .size(36.dp),
 )
}

import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.selection.toggleable
import androidx.compose.material3.Checkbox
import androidx.compose.material3.Text
import androidx.compose.material3.minimumInteractiveComponentSize
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.unit.dp

var checked by remember { mutableStateOf(false) }

// The entire row accepts interactions to toggle the checkbox,
// so we apply \`minimumInteractiveComponentSize\`
Row(
 verticalAlignment \= Alignment.CenterVertically,
 modifier \=
 Modifier.toggleable(
 value \= checked,
 onValueChange \= { checked \= it },
 role \= Role.Checkbox,
 )
 .minimumInteractiveComponentSize(),
) {
 // Cannot rely on Checkbox for touch target expansion because it only enforces
 // \`minimumInteractiveComponentSize\` if onCheckedChange is non-null
 Checkbox(checked \= checked, onCheckedChange \= null)
 Spacer(Modifier.width(8.dp))
 Text("Label for checkbox")
}

See also

`LocalMinimumInteractiveComponentSize`

`MinimumInteractiveTopAlignmentLine`

`MinimumInteractiveLeftAlignmentLine`

### Modifier.minimumInteractiveComponentSize

android

Artifact: androidx.compose.material:material

View Source

fun Modifier.minimumInteractiveComponentSize(): Modifier

Reserves at least 48.dp in size to disambiguate touch interactions if the element would measure smaller.

https://m3.material.io/foundations/accessible-design/accessibility-basics#28032e45-c598-450c-b355-f9fe737b1cd8

This uses the Material recommended minimum size of 48.dp x 48.dp, which may not the same as the system enforced minimum size.

This modifier is not needed for touch target expansion to happen. It only affects layout, to make sure there is adequate space for touch target expansion.

### Modifier.height

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.height(intrinsicSize: IntrinsicSize): Modifier

Declare the preferred height of the content to be the same as the min or max intrinsic height of the content. The incoming measurement `Constraints` may override this value, forcing the content to be either smaller or larger.

See `width` for other options of sizing to intrinsic width. Also see `height` and `heightIn` for other options to set the preferred height.

Example usage for min intrinsic:

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.IntrinsicSize
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.material.Text
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

// Builds a layout containing two pieces of text separated by a divider, where the divider
// is sized according to the height of the longest text.
//
// Here height min intrinsic is adding a height premeasurement pass for the Row,
// whose minimum intrinsic height will correspond to the height of the largest Text. Then
// height min intrinsic will measure the Row with tight height, the same as the
// premeasured minimum intrinsic height, which due to fillMaxHeight will force the Texts and
// the divider to use the same height.
Box {
 Row(Modifier.height(IntrinsicSize.Min)) {
 Text(
 text \= "This is a really short text",
 modifier \= Modifier.weight(1f).fillMaxHeight(),
 )
 Box(Modifier.width(1.dp).fillMaxHeight().background(Color.Black))
 Text(
 text \=
 "This is a much much much much much much much much much much" +
 " much much much much much much longer text",
 modifier \= Modifier.weight(1f).fillMaxHeight(),
 )
 }
}

Example usage for max intrinsic:

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.IntrinsicSize
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

// Builds a layout containing two aspectRatios separated by a divider, where the divider
// is sized according to the height of the taller aspectRatio.
//
// Here height max intrinsic is adding a height premeasurement pass for the
// Row, whose maximum intrinsic height will correspond to the height of the taller
// aspectRatio. Then height max intrinsic will measure the Row with tight height,
// the same as the premeasured maximum intrinsic height, which due to fillMaxHeight modifier
// will force the aspectRatios and the divider to use the same height.
//
Box {
 Row(Modifier.height(IntrinsicSize.Max)) {
 val modifier \= Modifier.fillMaxHeight().weight(1f)
 Box(modifier.aspectRatio(2f).background(Color.Gray))
 Box(Modifier.width(1.dp).fillMaxHeight().background(Color.Black))
 Box(modifier.aspectRatio(1f).background(Color.Blue))
 }
}

### Modifier.requiredHeight

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.requiredHeight(intrinsicSize: IntrinsicSize): Modifier

Declare the height of the content to be exactly the same as the min or max intrinsic height of the content. The incoming measurement `Constraints` will not override this value. If the content intrinsic height does not satisfy the incoming `Constraints`, the parent layout will be reported a size coerced in the `Constraints`, and the position of the content will be automatically offset to be centered on the space assigned to the child by the parent layout under the assumption that `Constraints` were respected.

See `width` for options of sizing to intrinsic width. See `height` and `heightIn` for options to set the preferred height. See `requiredHeight` and `requiredHeightIn` for other options to set the required height.

### Modifier.requiredWidth

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.requiredWidth(intrinsicSize: IntrinsicSize): Modifier

Declare the width of the content to be exactly the same as the min or max intrinsic width of the content. The incoming measurement `Constraints` will not override this value. If the content intrinsic width does not satisfy the incoming `Constraints`, the parent layout will be reported a size coerced in the `Constraints`, and the position of the content will be automatically offset to be centered on the space assigned to the child by the parent layout under the assumption that `Constraints` were respected.

See `height` for options of sizing to intrinsic height. See `width` and `widthIn` for options to set the preferred width. See `requiredWidth` and `requiredWidthIn` for other options to set the required width.

### Modifier.width

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.width(intrinsicSize: IntrinsicSize): Modifier

Declare the preferred width of the content to be the same as the min or max intrinsic width of the content. The incoming measurement `Constraints` may override this value, forcing the content to be either smaller or larger.

See `height` for options of sizing to intrinsic height. Also see `width` and `widthIn` for other options to set the preferred width.

Example usage for min intrinsic:

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.IntrinsicSize
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

// Builds a layout containing three Box having the same width as the widest one.
//
// Here width min intrinsic is adding a width premeasurement pass for the
// Column, whose minimum intrinsic width will correspond to the preferred width of the largest
// Box. Then width min intrinsic will measure the Column with tight width, the
// same as the premeasured minimum intrinsic width, which due to fillMaxWidth will force
// the Box's to use the same width.
Box {
 Column(Modifier.width(IntrinsicSize.Min).fillMaxHeight()) {
 Box(modifier \= Modifier.fillMaxWidth().size(20.dp, 10.dp).background(Color.Gray))
 Box(modifier \= Modifier.fillMaxWidth().size(30.dp, 10.dp).background(Color.Blue))
 Box(modifier \= Modifier.fillMaxWidth().size(10.dp, 10.dp).background(Color.Magenta))
 }
}

Example usage for max intrinsic:

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.IntrinsicSize
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.width
import androidx.compose.material.Text
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color

// Builds a layout containing three Text boxes having the same width as the widest one.
//
// Here width max intrinsic is adding a width premeasurement pass for the Column,
// whose maximum intrinsic width will correspond to the preferred width of the largest
// Box. Then width max intrinsic will measure the Column with tight width, the
// same as the premeasured maximum intrinsic width, which due to fillMaxWidth modifiers will
// force the Boxs to use the same width.

Box {
 Column(Modifier.width(IntrinsicSize.Max).fillMaxHeight()) {
 Box(Modifier.fillMaxWidth().background(Color.Gray)) { Text("Short text") }
 Box(Modifier.fillMaxWidth().background(Color.Blue)) {
 Text("Extremely long text giving the width of its siblings")
 }
 Box(Modifier.fillMaxWidth().background(Color.Magenta)) { Text("Medium length text") }
 }
}

### Modifier.keepScreenOn

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.keepScreenOn(): Modifier

A modifier that keeps the device screen on as long as it is part of the composition on supported platforms.

This is useful for scenarios where the user might not be interacting with the screen frequently but the content needs to remain visible, such as during video playback.

### Modifier.onKeyEvent

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.onKeyEvent(onKeyEvent: (KeyEvent) \-> Boolean): Modifier

Adding this `modifier` to the `modifier` parameter of a component will allow it to intercept hardware key events when it (or one of its children) is focused.

import androidx.compose.foundation.focusable
import androidx.compose.foundation.layout.Box
import androidx.compose.ui.Modifier
import androidx.compose.ui.input.key.Key
import androidx.compose.ui.input.key.key
import androidx.compose.ui.input.key.onKeyEvent
import androidx.compose.ui.input.key.onPreviewKeyEvent

// When the inner Box is focused, and the user presses a key, the key goes down the hierarchy
// and then back up to the parent. At any stage you can stop the propagation by returning
// true to indicate that you consumed the event.
Box(Modifier.onPreviewKeyEvent { keyEvent1 \-\> false }.onKeyEvent { keyEvent4 \-\> false }) {
 Box(
 Modifier.onPreviewKeyEvent { keyEvent2 \-\> false }
 .onKeyEvent { keyEvent3 \-\> false }
 .focusable()
 )
}

Parameters

`onKeyEvent: (KeyEvent) -> Boolean`

This callback is invoked when the user interacts with the hardware keyboard. While implementing this callback, return true to stop propagation of this event. If you return false, the key event will be sent to this `onKeyEvent`'s parent.

### Modifier.onPreviewKeyEvent

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.onPreviewKeyEvent(onPreviewKeyEvent: (KeyEvent) \-> Boolean): Modifier

Adding this `modifier` to the `modifier` parameter of a component will allow it to intercept hardware key events when it (or one of its children) is focused.

import androidx.compose.foundation.focusable
import androidx.compose.foundation.layout.Box
import androidx.compose.ui.Modifier
import androidx.compose.ui.input.key.Key
import androidx.compose.ui.input.key.key
import androidx.compose.ui.input.key.onKeyEvent
import androidx.compose.ui.input.key.onPreviewKeyEvent

// When the inner Box is focused, and the user presses a key, the key goes down the hierarchy
// and then back up to the parent. At any stage you can stop the propagation by returning
// true to indicate that you consumed the event.
Box(Modifier.onPreviewKeyEvent { keyEvent1 \-\> false }.onKeyEvent { keyEvent4 \-\> false }) {
 Box(
 Modifier.onPreviewKeyEvent { keyEvent2 \-\> false }
 .onKeyEvent { keyEvent3 \-\> false }
 .focusable()
 )
}

Parameters

`onPreviewKeyEvent: (KeyEvent) -> Boolean`

This callback is invoked when the user interacts with the hardware keyboard. It gives ancestors of a focused component the chance to intercept a `KeyEvent`. Return true to stop propagation of this event. If you return false, the key event will be sent to this `onPreviewKeyEvent`'s child. If none of the children consume the event, it will be sent back up to the root `KeyInputModifierNode` using the onKeyEvent callback.

### Modifier.layoutBounds

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.layoutBounds(holder: LayoutBoundsHolder): Modifier

This will map the `RelativeLayoutBounds` of the modifier into the provided `LayoutBoundsHolder`. A given instance of `LayoutBoundsHolder` should not be passed into more than one of these modifiers.

See also

`LayoutBoundsHolder`

`onVisibilityChanged`

### Modifier.layoutId

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.layoutId(layoutId: Any): Modifier

Tag the element with `layoutId` to identify the element within its parent.

Example usage:

import androidx.compose.foundation.layout.Box
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.Layout
import androidx.compose.ui.layout.layout
import androidx.compose.ui.layout.layoutId
import androidx.compose.ui.unit.Constraints

Layout({
 // Here the Containers are only needed to apply the modifiers. You could use the
 // modifier on header and footer directly if they are composables accepting modifiers.
 Box(Modifier.layoutId("header")) { header() }
 Box(Modifier.layoutId("footer")) { footer() }
}) { measurables, constraints \-\>
 val placeables \=
 measurables.map { measurable \-\>
 when (measurable.layoutId) {
 // You should use appropriate constraints. Here we measure fake constraints.
 "header" \-\> measurable.measure(Constraints.fixed(100, 100))
 "footer" \-\> measurable.measure(constraints)
 else \-\> error("Unexpected tag")
 }
 }
 // Size should be derived from children measured sizes on placeables,
 // but this is simplified for the purposes of the example.
 layout(100, 100) { placeables.forEach { it.placeRelative(0, 0) } }
}

### Modifier.layout

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.layout(measure: MeasureScope.(Measurable, Constraints) \-> MeasureResult): Modifier

Creates a `LayoutModifier` that allows changing how the wrapped element is measured and laid out.

This is a convenience API of creating a custom `LayoutModifier` modifier, without having to create a class or an object that implements the `LayoutModifier` interface. The intrinsic measurements follow the default logic provided by the `LayoutModifier`.

Example usage:

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.layout
import androidx.compose.ui.unit.offset

Box(
 Modifier.background(Color.Gray).layout { measurable, constraints \-\>
 // an example modifier that adds 50 pixels of vertical padding.
 val padding \= 50
 val placeable \= measurable.measure(constraints.offset(vertical \= \-padding))
 layout(placeable.width, placeable.height + padding) {
 placeable.placeRelative(0, padding)
 }
 }
) {
 Box(Modifier.fillMaxSize().background(Color.DarkGray))
}

See also

`LayoutModifier`

### Modifier.approachLayout

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.approachLayout( 
    isMeasurementApproachInProgress: (lookaheadSize: IntSize) \-> Boolean, 
    isPlacementApproachInProgress: Placeable.PlacementScope.(lookaheadCoordinates: LayoutCoordinates) \-> Boolean = defaultPlacementApproachInProgress, 
    approachMeasure: ApproachMeasureScope.(measurable: Measurable, constraints: Constraints) \-> MeasureResult 
): Modifier

Creates an approach layout intended to help gradually approach the destination layout calculated in the lookahead pass. This can be particularly helpful when the destination layout is anticipated to change drastically and would consequently result in visual disruptions.

In order to create a smooth approach, an interpolation (often through animations) can be used in `approachMeasure` to interpolate the measurement or placement from a previously recorded size and/or position to the destination/target size and/or position. The destination size is available in `ApproachMeasureScope` as `ApproachMeasureScope.lookaheadSize`. And the target position can also be acquired in `ApproachMeasureScope` during placement by using `LookaheadScope.localLookaheadPositionOf` with the layout's `Placeable.PlacementScope.coordinates`. The sample code below illustrates how that can be achieved.

`isMeasurementApproachInProgress` signals whether the measurement is in progress of approaching destination size. It will be queried after the destination has been determined by the lookahead pass, before `approachMeasure` is invoked. The lookahead size is provided to `isMeasurementApproachInProgress` for convenience in deciding whether the destination size has been reached.

`isMeasurementApproachInProgress` indicates whether the position is currently approaching destination defined by the lookahead, hence it's a signal to the system for whether additional approach placements are necessary. `isPlacementApproachInProgress` will be invoked after the destination position has been determined by lookahead pass, and before the placement phase in `approachMeasure`.

Once both `isMeasurementApproachInProgress` and `isPlacementApproachInProgress` return false, the system may skip approach pass until additional approach passes are necessary as indicated by `isMeasurementApproachInProgress` and `isPlacementApproachInProgress`.

**IMPORTANT**: It is important to be accurate in `isPlacementApproachInProgress` and `isMeasurementApproachInProgress`. A prolonged indication of incomplete approach will prevent the system from potentially skipping approach pass when possible.

import androidx.compose.animation.core.AnimationVector2D
import androidx.compose.animation.core.DeferredTargetAnimation
import androidx.compose.animation.core.VectorConverter
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.approachLayout
import androidx.compose.ui.layout.layout
import androidx.compose.ui.unit.Constraints
import androidx.compose.ui.unit.IntSize
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.round

// Creates a custom modifier that animates the constraints and measures child with the
// animated constraints. This modifier is built on top of \`Modifier.approachLayout\` to approach
// th destination size determined by the lookahead pass. A resize animation will be kicked off
// whenever the lookahead size changes, to animate children from current size to destination
// size. Fixed constraints created based on the animation value will be used to measure
// child, so the child layout gradually changes its animated constraints until the approach
// completes.
fun Modifier.animateConstraints(
 sizeAnimation: DeferredTargetAnimation<IntSize, AnimationVector2D\>,
 coroutineScope: CoroutineScope,
) \=
 this.approachLayout(
 isMeasurementApproachInProgress \= { lookaheadSize \-\>
 // Update the target of the size animation.
 sizeAnimation.updateTarget(lookaheadSize, coroutineScope)
 // Return true if the size animation has pending target change or hasn't finished
 // running.
 !sizeAnimation.isIdle
 }
 ) { measurable, \_ \-\>
 // In the measurement approach, the goal is to gradually reach the destination size
 // (i.e. lookahead size). To achieve that, we use an animation to track the current
 // size, and animate to the destination size whenever it changes. Once the animation
 // finishes, the approach is complete.

 // First, update the target of the animation, and read the current animated size.
 val (width, height) \= sizeAnimation.updateTarget(lookaheadSize, coroutineScope)
 // Then create fixed size constraints using the animated size
 val animatedConstraints \= Constraints.fixed(width, height)
 // Measure child with animated constraints.
 val placeable \= measurable.measure(animatedConstraints)
 layout(placeable.width, placeable.height) { placeable.place(0, 0) }
 }

var fullWidth by remember { mutableStateOf(false) }

// Creates a size animation with a target unknown at the time of instantiation.
val sizeAnimation \= remember { DeferredTargetAnimation(IntSize.VectorConverter) }
val coroutineScope \= rememberCoroutineScope()
Row(
 (if (fullWidth) Modifier.fillMaxWidth() else Modifier.width(100.dp))
 .height(200.dp)
 // Use the custom modifier created above to animate the constraints passed
 // to the child, and therefore resize children in an animation.
 .animateConstraints(sizeAnimation, coroutineScope)
 .clickable { fullWidth \= !fullWidth }
) {
 Box(Modifier.weight(1f).fillMaxHeight().background(Color(0xffff6f69)))
 Box(Modifier.weight(2f).fillMaxHeight().background(Color(0xffffcc5c)))
}

See also

`ApproachLayoutModifierNode`

### Modifier.magnifier

android

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.magnifier( 
    sourceCenter: Density.() \-> Offset, 
    magnifierCenter: (Density.() \-> Offset)? = null, 
    onSizeChanged: ((DpSize) \-> Unit)? = null, 
    zoom: Float = Float.NaN, 
    size: DpSize = DpSize.Unspecified, 
    cornerRadius: Dp = Dp.Unspecified, 
    elevation: Dp = Dp.Unspecified, 
    clip: Boolean = true 
): Modifier

Shows a `Magnifier` widget that shows an enlarged version of the content at `sourceCenter` relative to the current layout node.

This function returns a no-op modifier on API levels below P (28), since the framework does not support the `Magnifier` widget on those levels. However, even on higher API levels, not all magnifier features are supported on all platforms. Please refer to parameter explanations below to learn more about supported features on different platform versions.

This function does not allow configuration of `source bounds` since the magnifier widget does not support constraining to the bounds of composables.

import androidx.compose.foundation.gestures.detectDragGestures
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.magnifier
import androidx.compose.material.Text
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.input.pointer.pointerInput

// When the magnifier center position is Unspecified, it is hidden.
// Hide the magnifier until a drag starts.
var magnifierCenter by remember { mutableStateOf(Offset.Unspecified) }

if (Build.VERSION.SDK\_INT < 28) {
 Text("Magnifier is not supported on this platform.")
} else {
 Box(
 Modifier.magnifier(sourceCenter \= { magnifierCenter }, zoom \= 2f)
 .pointerInput(Unit) {
 detectDragGestures(
 // Show the magnifier at the original pointer position.
 onDragStart \= { magnifierCenter \= it },
 // Make the magnifier follow the finger while dragging.
 onDrag \= { \_, delta \-\> magnifierCenter += delta },
 // Hide the magnifier when the finger lifts.
 onDragEnd \= { magnifierCenter \= Offset.Unspecified },
 onDragCancel \= { magnifierCenter \= Offset.Unspecified },
 )
 }
 .drawBehind {
 // Some concentric circles to zoom in on.
 for (diameter in 2 until size.maxDimension.toInt() step 10) {
 drawCircle(color \= Color.Black, radius \= diameter / 2f, style \= Stroke())
 }
 }
 )
}

Parameters

`sourceCenter: Density.() -> Offset`

The offset of the center of the magnified content. Measured in pixels from the top-left of the layout node this modifier is applied to. This offset is passed to `Magnifier.show`.

`magnifierCenter: (Density.() -> Offset)? = null`

The offset of the magnifier widget itself, where the magnified content is rendered over the original content. Measured in density-independent pixels from the top-left of the layout node this modifier is applied to. If left null or returns an `unspecified` value, the magnifier widget will be placed at a default offset relative to `sourceCenter`. The value of that offset is specified by the system.

`onSizeChanged: ((DpSize) -> Unit)? = null`

An optional callback that will be invoked when the magnifier widget is initialized to report on its actual size. This can be useful when `size` parameter is left unspecified.

`zoom: Float = Float.NaN`

See `Magnifier.setZoom`. Only supported on API 29+.

`size: DpSize = DpSize.Unspecified`

See `Magnifier.Builder.setSize`. Only supported on API 29+.

`cornerRadius: Dp = Dp.Unspecified`

See `Magnifier.Builder.setCornerRadius`. Only supported on API 29+.

`elevation: Dp = Dp.Unspecified`

See `Magnifier.Builder.setElevation`. Only supported on API 29+.

`clip: Boolean = true`

See `Magnifier.Builder.setClippingEnabled`. Only supported on API 29+.

### Modifier.meshGradient

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.meshGradient( 
    rows: @IntRange(from = 1) Int, 
    columns: @IntRange(from = 1) Int, 
    hasBicubicColor: Boolean = false, 
    block: MeshGradientScope.() \-> Unit 
): Modifier

A MeshGradient is a 2D grid of patches defined by vertices. Each vertex has a position, color, and four optional Bezier control points (tangents) that define the curvature of the edges connecting neighboring vertices.

**Grid Dimensions:** For a given `rows` and `columns` (representing the number of patches), there are a total of `(rows + 1) * (columns + 1)` vertices. For example, a 1x1 mesh consists of 4 vertices forming a single rectangular patch.

**Coordinate System:** All positions and Bezier offsets use a **normalized coordinate system** where (0,0) is the top-left and (1,1) is the bottom-right of the modifier's drawing bounds.

**Bezier Tangents:** Bezier control points are provided as an `Offset` relative to the vertex position. The default value of a Bezier control point is `Offset.Unspecified`. If a control point is `Offset.Unspecified`, the renderer automatically infers a tangent based on the neighboring vertices to ensure C1 continuity (smooth transitions) across patches.

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.meshGradient
import androidx.compose.ui.unit.dp

val rows \= 1
val columns \= 1
Box(
 Modifier.size(300.dp).meshGradient(rows, columns) {
 // (row, column, position, color)
 setVertex(
 0,
 0,
 Offset(0f, 0f),
 Color.Red,
 rightControlPoint \= Offset(0.5f, 0.5f),
 ) // Top-Left
 setVertex(0, 1, Offset(1f, 0f), Color.Blue) // Top-Right
 setVertex(1, 0, Offset(0f, 1f), Color.Green) // Bottom-Left
 setVertex(1, 1, Offset(1f, 1f), Color.Yellow) // Bottom-Right
 }
)

Parameters

`rows: @IntRange(from = 1) Int`

The number of patches along the vertical axis. Must be at least 1.

`columns: @IntRange(from = 1) Int`

The number of patches along the horizontal axis. Must be at least 1.

`hasBicubicColor: Boolean = false`

When true, uses Catmull-Rom interpolation for colors, resulting in smoother transitions compared to bilinear interpolation.

`block: MeshGradientScope.() -> Unit`

Lambda invoked to configure the mesh. Use the provided `MeshGradientScope` to set the properties of each vertex.

### Modifier.modifierLocalConsumer

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.modifierLocalConsumer(consumer: ModifierLocalReadScope.() \-> Unit): Modifier

A Modifier that can be used to consume `ModifierLocal`s that were provided by other modifiers to the left of this modifier, or above this modifier in the layout tree.

### Modifier.modifierLocalProvider

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun <T : Any?> Modifier.modifierLocalProvider( 
    key: ProvidableModifierLocal<T>, 
    value: () \-> T 
): Modifier

A Modifier that can be used to provide `ModifierLocal`s that can be read by other modifiers to the right of this modifier, or modifiers that are children of the layout node that this modifier is attached to.

### Modifier.nestedScroll

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.nestedScroll( 
    connection: NestedScrollConnection, 
    dispatcher: NestedScrollDispatcher? = null 
): Modifier

Modify element to make it participate in the nested scrolling hierarchy.

There are two ways to participate in the nested scroll: as a scrolling child by dispatching scrolling events via `NestedScrollDispatcher` to the nested scroll chain; and as a member of nested scroll chain by providing `NestedScrollConnection`, which will be called when another nested scrolling child below dispatches scrolling events.

It's mandatory to participate as a `NestedScrollConnection` in the chain, but dispatching scrolling events is optional since there are cases where an element wants to participate in nested scrolling without being directly scrollable.

Here's the collapsing toolbar example that participates in a chain, but doesn't dispatch:

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material.Text
import androidx.compose.material.TopAppBar
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.input.nestedscroll.NestedScrollConnection
import androidx.compose.ui.input.nestedscroll.NestedScrollSource
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.dp

// here we use LazyColumn that has build-in nested scroll, but we want to act like a
// parent for this LazyColumn and participate in its nested scroll.
// Let's make a collapsing toolbar for LazyColumn
val toolbarHeight \= 48.dp
val toolbarHeightPx \= with(LocalDensity.current) { toolbarHeight.roundToPx().toFloat() }
// our offset to collapse toolbar
val toolbarOffsetHeightPx \= remember { mutableStateOf(0f) }
// now, let's create connection to the nested scroll system and listen to the scroll
// happening inside child LazyColumn
val nestedScrollConnection \= remember {
 object : NestedScrollConnection {
 override fun onPreScroll(available: Offset, source: NestedScrollSource): Offset {
 // try to consume before LazyColumn to collapse toolbar if needed, hence pre-scroll
 val delta \= available.y
 val newOffset \= toolbarOffsetHeightPx.value + delta
 toolbarOffsetHeightPx.value \= newOffset.coerceIn(\-toolbarHeightPx, 0f)
 // here's the catch: let's pretend we consumed 0 in any case, since we want
 // LazyColumn to scroll anyway for good UX
 // We're basically watching scroll without taking it
 return Offset.Zero
 }
 }
}
Box(
 Modifier.fillMaxSize()
 // attach as a parent to the nested scroll system
 .nestedScroll(nestedScrollConnection)
) {
 // our list with build in nested scroll support that will notify us about its scroll
 LazyColumn(contentPadding \= PaddingValues(top \= toolbarHeight)) {
 items(100) { index \-\>
 Text("I'm item $index", modifier \= Modifier.fillMaxWidth().padding(16.dp))
 }
 }
 TopAppBar(
 modifier \=
 Modifier.height(toolbarHeight).offset {
 IntOffset(x \= 0, y \= toolbarOffsetHeightPx.value.roundToInt())
 },
 title \= { Text("toolbar offset is ${toolbarOffsetHeightPx.value}") },
 )
}

On the other side, dispatch via `NestedScrollDispatcher` is optional. It's needed if a component is able to receive and react to the drag/fling events and you want this components to be able to notify parents when scroll occurs, resulting in better overall coordination.

Here's the example of the component that is draggable and dispatches nested scroll to participate in the nested scroll chain:

import androidx.compose.foundation.background
import androidx.compose.foundation.gestures.Orientation
import androidx.compose.foundation.gestures.draggable
import androidx.compose.foundation.gestures.rememberDraggableState
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material.Text
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.input.nestedscroll.NestedScrollConnection
import androidx.compose.ui.input.nestedscroll.NestedScrollDispatcher
import androidx.compose.ui.input.nestedscroll.NestedScrollSource
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.ui.unit.dp

// Let's take Modifier.draggable (which doesn't have nested scroll build in, unlike Modifier
// .scrollable) and add nested scroll support our component that contains draggable

// this will be a generic components that will work inside other nested scroll components.
// put it inside LazyColumn or / Modifier.verticalScroll to see how they will interact

// first, state and it's bounds
val basicState \= remember { mutableStateOf(0f) }
val minBound \= \-100f
val maxBound \= 100f
// lambda to update state and return amount consumed
val onNewDelta: (Float) \-\> Float \= { delta \-\>
 val oldState \= basicState.value
 val newState \= (basicState.value + delta).coerceIn(minBound, maxBound)
 basicState.value \= newState
 newState \- oldState
}
// create a dispatcher to dispatch nested scroll events (participate like a nested scroll child)
val nestedScrollDispatcher \= remember { NestedScrollDispatcher() }

// create nested scroll connection to react to nested scroll events (participate like a parent)
val nestedScrollConnection \= remember {
 object : NestedScrollConnection {
 override fun onPostScroll(
 consumed: Offset,
 available: Offset,
 source: NestedScrollSource,
 ): Offset {
 // we have no fling, so we're interested in the regular post scroll cycle
 // let's try to consume what's left if we need and return the amount consumed
 val vertical \= available.y
 val weConsumed \= onNewDelta(vertical)
 return Offset(x \= 0f, y \= weConsumed)
 }
 }
}
Box(
 Modifier.size(100.dp)
 .background(Color.LightGray)
 // attach ourselves to nested scroll system
 .nestedScroll(connection \= nestedScrollConnection, dispatcher \= nestedScrollDispatcher)
 .draggable(
 orientation \= Orientation.Vertical,
 state \=
 rememberDraggableState { delta \-\>
 // here's regular drag. Let's be good citizens and ask parents first if they
 // want to pre consume (it's a nested scroll contract)
 val parentsConsumed \=
 nestedScrollDispatcher.dispatchPreScroll(
 available \= Offset(x \= 0f, y \= delta),
 source \= NestedScrollSource.UserInput,
 )
 // adjust what's available to us since might have consumed smth
 val adjustedAvailable \= delta \- parentsConsumed.y
 // we consume
 val weConsumed \= onNewDelta(adjustedAvailable)
 // dispatch as a post scroll what's left after pre-scroll and our
 // consumption
 val totalConsumed \= Offset(x \= 0f, y \= weConsumed) + parentsConsumed
 val left \= adjustedAvailable \- weConsumed
 nestedScrollDispatcher.dispatchPostScroll(
 consumed \= totalConsumed,
 available \= Offset(x \= 0f, y \= left),
 source \= NestedScrollSource.UserInput,
 )
 // we won't dispatch pre/post fling events as we have no flinging here, but
 // the
 // idea is very similar:
 // 1. dispatch pre fling, asking parents to pre consume
 // 2. fling (while dispatching scroll events like above for any fling tick)
 // 3. dispatch post fling, allowing parent to react to velocity left
 },
 )
) {
 Text("State: ${basicState.value.roundToInt()}", modifier \= Modifier.align(Alignment.Center))
}

**Note:** It is recommended to reuse `NestedScrollConnection` and `NestedScrollDispatcher` objects between recompositions since different object will cause nested scroll graph to be recalculated unnecessary.

There are 4 main phases in nested scrolling system:

1. Pre-scroll. This callback is triggered when the descendant is about to perform a scroll operation and gives parent an opportunity to consume part of child's delta beforehand. This pass should happen every time scrollable components receives delta and dispatches it via `NestedScrollDispatcher`. Dispatching child should take into account how much all ancestors above the hierarchy consumed and adjust the consumption accordingly.
 
2. Post-scroll. This callback is triggered when the descendant consumed the delta already (after taking into account what parents pre-consumed in 1.) and wants to notify the ancestors with the amount of delta unconsumed. This pass should happen every time scrollable components receives delta and dispatches it via `NestedScrollDispatcher`. Any parent that receives `NestedScrollConnection.onPostScroll` should consume no more than `left` and return the amount consumed.
 
3. Pre-fling. Pass that happens when the scrolling descendant stopped dragging and about to fling with the some velocity. This callback allows ancestors to consume part of the velocity. This pass should happen before the fling itself happens. Similar to pre-scroll, parent can consume part of the velocity and nodes below (including the dispatching child) should adjust their logic to accommodate only the velocity left.
 
4. Post-fling. Pass that happens after the scrolling descendant stopped flinging and wants to notify ancestors about that fact, providing velocity left to consume as a part of this. This pass should happen after the fling itself happens on the scrolling child. Ancestors of the dispatching node will have opportunity to fling themselves with the `velocityLeft` provided. Parent must call `notifySelfFinish` callback in order to continue the propagation of the velocity that is left to ancestors above.

`androidx.compose.foundation.lazy.LazyColumn`, `androidx.compose.foundation.verticalScroll` and `androidx.compose.foundation.gestures.scrollable` have build in support for nested scrolling, however, it's desirable to be able to react and influence their scroll via nested scroll system.

**Note:** The nested scroll system is orientation independent. This mean it is based off the screen direction (x and y coordinates) rather than being locked to a specific orientation.

Parameters

`connection: NestedScrollConnection`

connection to the nested scroll system to participate in the event chaining, receiving events when scrollable descendant is being scrolled.

`dispatcher: NestedScrollDispatcher? = null`

object to be attached to the nested scroll system on which `dispatch*` methods can be called to notify ancestors within nested scroll system about scrolling happening

### Modifier.absoluteOffset

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.absoluteOffset(offset: Density.() \-> IntOffset): Modifier

Offset the content by `offset` px. The offsets can be positive as well as non-positive. Applying an offset only changes the position of the content, without interfering with its size measurement.

This modifier is designed to be used for offsets that change, possibly due to user interactions. It avoids recomposition when the offset is changing, and also adds a graphics layer that prevents unnecessary redrawing of the context when the offset is changing.

This modifier will not consider layout direction when calculating the position of the content: a positive horizontal offset will always move the content to the right. For a modifier that considers layout direction when applying the offset, see `offset`.

Example usage:

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.absoluteOffset
import androidx.compose.foundation.layout.offset
import androidx.compose.material.Text
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.dp

// This text will be offset in steps of 10.dp from the top left of the available space.
var offset by remember { mutableStateOf(0) }
Text(
 "Layout offset modifier sample",
 Modifier.clickable { offset += 10 }.absoluteOffset { IntOffset(offset, offset) },
)

See also

`absoluteOffset`

### Modifier.absoluteOffset

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.absoluteOffset(x: Dp = 0.dp, y: Dp = 0.dp): Modifier

Offset the content by (`x` dp, `y` dp). The offsets can be positive as well as non-positive. Applying an offset only changes the position of the content, without interfering with its size measurement.

This modifier will not consider layout direction when calculating the position of the content: a positive `x` offset will always move the content to the right. For a modifier that considers the layout direction when applying the offset, see `offset`.

Example usage:

import androidx.compose.foundation.layout.absoluteOffset
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.material.Text
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

// This text will be offset (10.dp, 20.dp) from the center of the available space.
Text(
 "Layout offset modifier sample",
 Modifier.fillMaxSize().wrapContentSize(Alignment.Center).absoluteOffset(10.dp, 20.dp),
)

See also

`offset`

### Modifier.offset

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.offset(offset: Density.() \-> IntOffset): Modifier

Offset the content by `offset` px. The offsets can be positive as well as non-positive. Applying an offset only changes the position of the content, without interfering with its size measurement.

This modifier is designed to be used for offsets that change, possibly due to user interactions. It avoids recomposition when the offset is changing, and also adds a graphics layer that prevents unnecessary redrawing of the context when the offset is changing.

This modifier will automatically adjust the horizontal offset according to the layout direction: when the LD is LTR, positive horizontal offsets will move the content to the right and when the LD is RTL, positive horizontal offsets will move the content to the left. For a modifier that offsets without considering layout direction, see `absoluteOffset`.

Example usage:

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.offset
import androidx.compose.material.Text
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.dp

// This text will be offset in steps of 10.dp from the top left of the available space in
// left-to-right context, and from top right in right-to-left context.
var offset by remember { mutableStateOf(0) }
Text(
 "Layout offset modifier sample",
 Modifier.clickable { offset += 10 }.offset { IntOffset(offset, offset) },
)

See also

`absoluteOffset`

### Modifier.offset

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.offset(x: Dp = 0.dp, y: Dp = 0.dp): Modifier

Offset the content by (`x` dp, `y` dp). The offsets can be positive as well as non-positive. Applying an offset only changes the position of the content, without interfering with its size measurement.

This modifier will automatically adjust the horizontal offset according to the layout direction: when the layout direction is LTR, positive `x` offsets will move the content to the right and when the layout direction is RTL, positive `x` offsets will move the content to the left. For a modifier that offsets without considering layout direction, see `absoluteOffset`.

Example usage:

import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.material.Text
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

// This text will be offset (10.dp, 20.dp) from the center of the available space. In the
// right-to-left context, the offset will be (-10.dp, 20.dp).
Text(
 "Layout offset modifier sample",
 Modifier.fillMaxSize().wrapContentSize(Alignment.Center).offset(10.dp, 20.dp),
)

See also

`absoluteOffset`

### Modifier.onFirstVisible

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.onFirstVisible( 
    minDurationMs: @IntRange(from = 0) Long = 0, 
    minFractionVisible: @FloatRange(from = 0.0, to = 1.0) Float = 1.0f, 
    viewportBounds: LayoutBoundsHolder? = null, 
    callback: () \-> Unit 
): Modifier

Registers a callback to monitor when the node is first inside of the viewport of the window or not. Example use cases for this include impression and view counting, starting animations, or doing work that is only required once the item is visible to the user.

import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.onFirstVisible

@Composable
fun VideoFeed(feedData: List<Video>, logger: Logger) {
 LazyColumn {
 items(feedData) { video \-\>
 VideoRow(
 video,
 Modifier.onFirstVisible(minDurationMs \= 500, minFractionVisible \= 1f) {
 logger.logImpression(video.id)
 },
 )
 }
 }
}

import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.LayoutBoundsHolder
import androidx.compose.ui.layout.layoutBounds
import androidx.compose.ui.layout.onFirstVisible

@Composable
fun VideoFeed(feedData: List<Video>, logger: Logger) {
 val viewport \= remember { LayoutBoundsHolder() }
 LazyColumn(Modifier.layoutBounds(viewport)) {
 items(feedData) { video \-\>
 VideoRow(
 video,
 Modifier.onFirstVisible(
 minDurationMs \= 500,
 minFractionVisible \= 1f,
 viewportBounds \= viewport,
 ) {
 logger.logImpression(video.id)
 },
 )
 }
 }
}

Parameters

`minDurationMs: @IntRange(from = 0) Long = 0`

the amount of time in milliseconds that this node should be considered visible before invoking the callback. Depending on your use case, it might be useful to provide a non-zero number here if it is desirable to avoid triggering the callback on elements during really fast scrolls where they are only visible for a short amount of time.

`minFractionVisible: @FloatRange(from = 0.0, to = 1.0) Float = 1.0f`

the fraction of the node which should be inside the viewport to be considered visible. A value of 1f means that the entire bounds of the rect need to be inside of the viewport, or that the rect fills 100% of the viewport. A value of 0f means that this will get triggered as soon as a non-zero amount of pixels are inside of the viewport.

`viewportBounds: LayoutBoundsHolder? = null`

a reference to the bounds to use as a "viewport" with which to calculate the amount of visibility this element has _inside_ of that viewport. This is most commonly used to account for UI elements such as navigation bars which are drawn on top of the content that this modifier is applied to. It is required that this be passed in to a `layoutBounds` somewhere else in order for this parameter to get used properly. If null is provided, the window of the application will be used as the viewport.

`callback: () -> Unit`

lambda that is invoked when the fraction of this node inside of the specified viewport is greater than minFractionVisible. This lambda will only get invoked a maximum of one time while the element is attached.

See also

`onVisibilityChanged`

`onLayoutRectChanged`

`registerOnLayoutRectChanged`

`fractionVisibleIn`

`layoutBounds`

### Modifier.onGloballyPositioned

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.onGloballyPositioned( 
    onGloballyPositioned: (LayoutCoordinates) \-> Unit 
): Modifier

Invoke `onGloballyPositioned` with the `LayoutCoordinates` of the element when the global position of the content may have changed. Note that it will be called **after** a composition when the coordinates are finalized.

This callback will be invoked at least once when the `LayoutCoordinates` are available, and every time the element's position changes within the window. However, it is not guaranteed to be invoked every time the position _relative to the screen_ of the modified element changes. For example, the system may move the contents inside a window around without firing a callback. If you are using the `LayoutCoordinates` to calculate position on the screen, and not just inside the window, you may not receive a callback.

Usage example:

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.size
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.onGloballyPositioned
import androidx.compose.ui.layout.positionInRoot
import androidx.compose.ui.layout.positionInWindow
import androidx.compose.ui.unit.dp

Column(
 Modifier.onGloballyPositioned { coordinates \-\>
 // This will be the size of the Column.
 coordinates.size
 // The position of the Column relative to the application window.
 coordinates.positionInWindow()
 // The position of the Column relative to the Compose root.
 coordinates.positionInRoot()
 // These will be the alignment lines provided to the layout (empty here for Column).
 coordinates.providedAlignmentLines
 // This will be a LayoutCoordinates instance corresponding to the parent of Column.
 coordinates.parentLayoutCoordinates
 }
) {
 Box(Modifier.size(20.dp).background(Color.Green))
 Box(Modifier.size(20.dp).background(Color.Blue))
}

### Modifier.onLayoutRectChanged

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.onLayoutRectChanged( 
    throttleMillis: Long = 0, 
    debounceMillis: Long = 64, 
    callback: (RelativeLayoutBounds) \-> Unit 
): Modifier

Invokes `callback` with the position of this layout node relative to the coordinate system of the root of the composition, as well as in screen coordinates and window coordinates. This will be called after layout pass. This API allows for throttling and debouncing parameters in order to moderate the frequency with which the callback gets invoked during high rates of change (e.g. scrolling).

Specifying `throttleMillis` will prevent `callback` from being executed more than once over that time period. Specifying `debounceMillis` will delay the execution of `callback` until that amount of time has elapsed without a new position, scheduling the callback to be executed when that amount of time expires.

Specifying 0 for both `throttleMillis` and `debounceMillis` will result in the callback being executed every time the position has changed. Specifying non-zero amounts for both will result in both conditions being met. Specifying a non-zero `throttleMillis` but a zero `debounceMillis` is equivalent to providing the same value for both `throttleMillis` and `debounceMillis`.

Parameters

`throttleMillis: Long = 0`

The duration, in milliseconds, to prevent `callback` from being executed more than once over that time period.

`debounceMillis: Long = 64`

The duration, in milliseconds, to delay the execution of `callback` until that amount of time has elapsed without a new position.

`callback: (RelativeLayoutBounds) -> Unit`

The callback to be executed.

See also

`RelativeLayoutBounds`

`onGloballyPositioned`

`registerOnLayoutRectChanged`

### Modifier.onPlaced

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.onPlaced(onPlaced: (LayoutCoordinates) \-> Unit): Modifier

Invoke `onPlaced` after the parent `LayoutModifier` and parent layout has been placed and before child `LayoutModifier` is placed. This allows child `LayoutModifier` to adjust its own placement based on where the parent is.

import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.AnimationVector2D
import androidx.compose.animation.core.Spring.StiffnessMediumLow
import androidx.compose.animation.core.VectorConverter
import androidx.compose.animation.core.spring
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.composed
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.onPlaced
import androidx.compose.ui.layout.positionInParent
import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.round

fun Modifier.animatePlacement(): Modifier \= composed {
 val scope \= rememberCoroutineScope()
 var targetOffset by remember { mutableStateOf(IntOffset.Zero) }
 var animatable by remember {
 mutableStateOf<Animatable<IntOffset, AnimationVector2D>?>(null)
 }
 this.onPlaced {
 // Calculate the position in the parent layout
 targetOffset \= it.positionInParent().round()
 }
 .offset {
 // Animate to the new target offset when alignment changes.
 val anim \=
 animatable
 ?: Animatable(targetOffset, IntOffset.VectorConverter).also {
 animatable \= it
 }
 if (anim.targetValue != targetOffset) {
 scope.launch {
 anim.animateTo(targetOffset, spring(stiffness \= StiffnessMediumLow))
 }
 }
 // Offset the child in the opposite direction to the targetOffset, and slowly catch
 // up to zero offset via an animation to achieve an overall animated movement.
 animatable?.let { it.value \- targetOffset } ?: IntOffset.Zero
 }
}

@Composable
fun AnimatedChildAlignment(alignment: Alignment) {
 Box(Modifier.fillMaxSize().padding(4.dp).border(1.dp, Color.Red)) {
 Box(
 modifier \=
 Modifier.animatePlacement().align(alignment).size(100.dp).background(Color.Red)
 )
 }
}

### Modifier.onSizeChanged

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.onSizeChanged(onSizeChanged: (IntSize) \-> Unit): Modifier

Invoked with the size of the modified Compose UI element when the element is first measured or when the size of the element changes.

There are no guarantees `onSizeChanged` will not be re-invoked with the same size.

Using the `onSizeChanged` size value in a `MutableState` to update layout causes the new size value to be read and the layout to be recomposed in the succeeding frame, resulting in a one frame lag.

You can use `onSizeChanged` to affect drawing operations. Use `Layout` or `SubcomposeLayout` to enable the size of one component to affect the size of another.

Example usage:

import androidx.compose.material.Text
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.onSizeChanged

// Use onSizeChanged() for diagnostics. Use Layout or SubcomposeLayout if you want
// to use the size of one component to affect the size of another component.
Text(
 "Hello $name",
 Modifier.onSizeChanged { size \-\> println("The size of the Text in pixels is $size") },
)

### Modifier.onVisibilityChanged

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.onVisibilityChanged( 
    minDurationMs: @IntRange(from = 0) Long = 0, 
    minFractionVisible: @FloatRange(from = 0.0, to = 1.0) Float = 1.0f, 
    viewportBounds: LayoutBoundsHolder? = null, 
    callback: (Boolean) \-> Unit 
): Modifier

Registers a callback to monitor whether or not the node is inside of the viewport of the window or not. Example use cases for this include, auto-playing videos in a feed, logging how long an item was visible, and starting/stopping animations.

import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.onVisibilityChanged

@Composable
fun VideoFeed(feedData: List<Video>) {
 LazyColumn {
 items(feedData) { video \-\>
 VideoRow(
 video,
 Modifier.onVisibilityChanged(minDurationMs \= 500, minFractionVisible \= 1f) {
 visible \-\>
 if (visible) video.play() else video.pause()
 },
 )
 }
 }
}

import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.LayoutBoundsHolder
import androidx.compose.ui.layout.layoutBounds
import androidx.compose.ui.layout.onVisibilityChanged

@Composable
fun VideoFeed(feedData: List<Video>) {
 val viewport \= remember { LayoutBoundsHolder() }
 LazyColumn(Modifier.layoutBounds(viewport)) {
 items(feedData) { video \-\>
 VideoRow(
 video,
 Modifier.onVisibilityChanged(
 minDurationMs \= 500,
 minFractionVisible \= 1f,
 viewportBounds \= viewport,
 ) { visible \-\>
 if (visible) video.play() else video.pause()
 },
 )
 }
 }
}

import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableLongStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.onVisibilityChanged

@Composable
fun VideoFeed(feedData: List<Video>, logger: Logger) {
 LazyColumn {
 items(feedData) { video \-\>
 var startTime by remember { mutableLongStateOf(\-1) }
 VideoRow(
 video,
 Modifier.onVisibilityChanged(minDurationMs \= 500, minFractionVisible \= 1f) {
 visible \-\>
 if (visible) {
 startTime \= System.currentTimeMillis()
 } else if (startTime \>\= 0) {
 val durationMs \= System.currentTimeMillis() \- startTime
 logger.logImpression(video.id, durationMs)
 startTime \= \-1
 }
 },
 )
 }
 }
}

Parameters

`minDurationMs: @IntRange(from = 0) Long = 0`

the amount of time in milliseconds that this node should be considered visible before invoking the callback with (true). Depending on your use case, it might be useful to provide a non-zero number here if it is desirable to avoid triggering the callback on elements during really fast scrolls where they went from visible to invisible in a really short amount of time.

`minFractionVisible: @FloatRange(from = 0.0, to = 1.0) Float = 1.0f`

the fraction of the node which should be inside the viewport for the callback to get called with a value of true. A value of 1f means that the entire bounds of the rect need to be inside of the viewport, or that the rect fills 100% of the viewport. A value of 0f means that this will get triggered as soon as a non-zero amount of pixels are inside of the viewport.

`viewportBounds: LayoutBoundsHolder? = null`

a reference to the bounds to use as a "viewport" with which to calculate the amount of visibility this element has _inside_ of that viewport. This is most commonly used to account for UI elements such as navigation bars which are drawn on top of the content that this modifier is applied to. It is required that this be passed in to a `layoutBounds` somewhere else in order for this parameter to get used properly. If null is provided, the window of the application will be used as the viewport.

`callback: (Boolean) -> Unit`

lambda that is invoked when the fraction of this node inside of the specified viewport crosses the `minFractionVisible`. The boolean argument passed into this lambda will be true in cases where the fraction visible is greater, and false when it is not.

See also

`onLayoutRectChanged`

`registerOnLayoutRectChanged`

`fractionVisibleIn`

`layoutBounds`

### Modifier.oneHandedGesture

android

Artifact: androidx.wear.compose:compose-material3

View Source

@Composable 
fun Modifier.oneHandedGesture( 
    action: GestureAction, 
    key: String? = null, 
    priority: GesturePriority = GesturePriority.Unspecified, 
    enabledInAmbient: Boolean = false, 
    interactionSource: MutableInteractionSource? = null, 
    onShowIndicator: () \-> Unit = {}, 
    onGesture: suspend () \-> Unit 
): Modifier

Registers a gesture handler.

**Visibility Management:** This gesture handler is active as long as the Modifier is part of the composition. On its own, it does not track whether the composable is visible or clipped (e.g., in a Lazy layout).

To prevent accidental triggers from off-screen items, developers should apply this modifier conditionally. For many cases, `androidx.compose.ui.layout.onVisibilityChanged` Modifier can be used to determine the visibility of a composable.

Example usage in a list:

var isVisible by remember { mutableStateOf(false) } 
val gestureModifier \= remember(isVisible) { 
 if (isVisible) Modifier.oneHandedGesture() else Modifier 
} 
 
Box( 
 modifier \= Modifier 
 .onVisibilityChanged { isVisible \= it } 
 .then(gestureModifier) 
) { 
 ... 
}

**Haptics:** When a gesture is successfully triggered, the system automatically performs haptic feedback to acknowledge the interaction; developers do not need to trigger haptics manually within `onGesture`.

Example of adding one-handed gesture handler to a `androidx.wear.compose.material3.Button`:

import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.wear.compose.material3.Button
import androidx.wear.compose.material3.Text
import androidx.wear.compose.material3.onehandedgesture.GestureAction
import androidx.wear.compose.material3.onehandedgesture.OneHandedGestureDefaults
import androidx.wear.compose.material3.onehandedgesture.oneHandedGesture

var label by remember { mutableStateOf("Gesturable Button") }
val onClick \= remember { { label \= "Clicked/Gestured" } }
var gestureIndicatorVisible by remember { mutableStateOf(false) }
val interactionSource \= remember { MutableInteractionSource() }

Box(modifier \= Modifier.fillMaxSize(), contentAlignment \= Alignment.Center) {
 Button(
 onClick \= onClick,
 interactionSource \= interactionSource,
 modifier \=
 Modifier.oneHandedGesture(
 action \= GestureAction.Primary,
 interactionSource \= interactionSource,
 onShowIndicator \= { gestureIndicatorVisible \= true },
 onGesture \= onClick,
 ),
 ) {
 OneHandedGestureDefaults.GestureIndicator(
 gestureIndicatorVisible,
 { gestureIndicatorVisible \= false },
 ) {
 Text(label)
 }
 }
}

Example of adding one-handed gesture handler to a `androidx.wear.compose.foundation.lazy.TransformingLazyColumn`:

import androidx.activity.compose.LocalOnBackPressedDispatcherOwner
import androidx.compose.foundation.gestures.Orientation
import androidx.compose.foundation.gestures.scrollable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.rememberOverscrollEffect
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.wear.compose.foundation.lazy.TransformingLazyColumn
import androidx.wear.compose.foundation.lazy.rememberTransformingLazyColumnState
import androidx.wear.compose.material3.Button
import androidx.wear.compose.material3.EdgeButton
import androidx.wear.compose.material3.ScreenScaffold
import androidx.wear.compose.material3.Text
import androidx.wear.compose.material3.onehandedgesture.GestureAction
import androidx.wear.compose.material3.onehandedgesture.GesturePriority
import androidx.wear.compose.material3.onehandedgesture.OneHandedGestureDefaults
import androidx.wear.compose.material3.onehandedgesture.oneHandedGesture

val backDispatcherOwner \= LocalOnBackPressedDispatcherOwner.current
val onClick \=
 remember<() \-\> Unit\> { { backDispatcherOwner?.onBackPressedDispatcher?.onBackPressed() } }
val tlcState \= rememberTransformingLazyColumnState()
var scrollGestureIndicatorVisible by remember { mutableStateOf(false) }
val interactionSource \= remember { MutableInteractionSource() }

ScreenScaffold(
 scrollState \= tlcState,
 edgeButton \= {
 var buttonGestureIndicatorVisible by remember { mutableStateOf(false) }
 EdgeButton(
 onClick \= onClick,
 interactionSource \= interactionSource,
 modifier \=
 if (tlcState.canScrollForward) {
 Modifier
 } else {
 // Apply the one-handed gesture modifier only when the container cannot
 // scroll further, ensuring the EdgeButton is fully visible and interactive
 Modifier.oneHandedGesture(
 action \= GestureAction.Primary,
 priority \= GesturePriority.Clickable,
 interactionSource \= interactionSource,
 onShowIndicator \= { buttonGestureIndicatorVisible \= true },
 onGesture \= onClick,
 )
 } then
 Modifier.scrollable(
 tlcState,
 orientation \= Orientation.Vertical,
 reverseDirection \= true,
 overscrollEffect \= rememberOverscrollEffect(),
 ),
 ) {
 OneHandedGestureDefaults.GestureIndicator(
 buttonGestureIndicatorVisible,
 { buttonGestureIndicatorVisible \= false },
 ) {
 Text("Close")
 }
 }
 },
 scrollIndicator \= {
 OneHandedGestureDefaults.ScrollGestureIndicator(
 scrollGestureIndicatorVisible,
 onGestureIndicatorFinished \= { scrollGestureIndicatorVisible \= false },
 tlcState,
 modifier \= Modifier.align(Alignment.CenterEnd),
 )
 },
) { contentPadding \-\>
 TransformingLazyColumn(
 state \= tlcState,
 contentPadding \= contentPadding,
 modifier \=
 Modifier.fillMaxSize()
 .oneHandedGesture(
 action \= GestureAction.Primary,
 priority \= GesturePriority.Scrollable,
 onGesture \= { OneHandedGestureDefaults.scrollDown(tlcState) },
 onShowIndicator \= { scrollGestureIndicatorVisible \= true },
 ),
 ) {
 items(10) { Text("Item $it") }
 }
}

Example of adding one-handed gesture handler to a `androidx.wear.compose.foundation.pager.HorizontalPager`:

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.wear.compose.foundation.pager.HorizontalPager
import androidx.wear.compose.foundation.pager.rememberPagerState
import androidx.wear.compose.material3.AnimatedPage
import androidx.wear.compose.material3.HorizontalPagerScaffold
import androidx.wear.compose.material3.ScreenScaffold
import androidx.wear.compose.material3.Text
import androidx.wear.compose.material3.onehandedgesture.GestureAction
import androidx.wear.compose.material3.onehandedgesture.OneHandedGestureDefaults
import androidx.wear.compose.material3.onehandedgesture.oneHandedGesture

val pagerState \= rememberPagerState(pageCount \= { 10 })
var pageGestureIndicatorVisible by remember { mutableStateOf(false) }

HorizontalPagerScaffold(
 pagerState \= pagerState,
 pageIndicator \= {
 OneHandedGestureDefaults.HorizontalPageGestureIndicator(
 pagerState \= pagerState,
 gestureIndicatorVisible \= pageGestureIndicatorVisible,
 onGestureIndicatorFinished \= { pageGestureIndicatorVisible \= false },
 )
 },
) {
 HorizontalPager(
 state \= pagerState,
 modifier \=
 Modifier.oneHandedGesture(
 action \= GestureAction.Primary,
 onShowIndicator \= { pageGestureIndicatorVisible \= true },
 ) {
 OneHandedGestureDefaults.scrollToNextPage(pagerState)
 },
 ) { page \-\>
 AnimatedPage(pageIndex \= page, pagerState \= pagerState) {
 ScreenScaffold {
 Column(
 modifier \= Modifier.fillMaxSize(),
 horizontalAlignment \= Alignment.CenterHorizontally,
 verticalArrangement \= Arrangement.Center,
 ) {
 Text(text \= "Page #$page")
 Spacer(modifier \= Modifier.height(8.dp))
 Text(text \= "Swipe left and right")
 }
 }
 }
 }
}

Example of adding one-handed gesture handler to a `androidx.wear.compose.foundation.pager.VerticalPager`:

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.wear.compose.foundation.pager.VerticalPager
import androidx.wear.compose.foundation.pager.rememberPagerState
import androidx.wear.compose.material3.AnimatedPage
import androidx.wear.compose.material3.ScreenScaffold
import androidx.wear.compose.material3.Text
import androidx.wear.compose.material3.VerticalPagerScaffold
import androidx.wear.compose.material3.onehandedgesture.GestureAction
import androidx.wear.compose.material3.onehandedgesture.OneHandedGestureDefaults
import androidx.wear.compose.material3.onehandedgesture.oneHandedGesture

val pagerState \= rememberPagerState(pageCount \= { 10 })
var pageGestureIndicatorVisible by remember { mutableStateOf(false) }

VerticalPagerScaffold(
 pagerState \= pagerState,
 pageIndicator \= {
 OneHandedGestureDefaults.VerticalPageGestureIndicator(
 pagerState \= pagerState,
 gestureIndicatorVisible \= pageGestureIndicatorVisible,
 onGestureIndicatorFinished \= { pageGestureIndicatorVisible \= false },
 )
 },
) {
 VerticalPager(
 state \= pagerState,
 modifier \=
 Modifier.oneHandedGesture(
 action \= GestureAction.Primary,
 onShowIndicator \= { pageGestureIndicatorVisible \= true },
 ) {
 OneHandedGestureDefaults.scrollToNextPage(pagerState)
 },
 ) { page \-\>
 AnimatedPage(pageIndex \= page, pagerState \= pagerState) {
 ScreenScaffold {
 Column(
 modifier \= Modifier.fillMaxSize(),
 horizontalAlignment \= Alignment.CenterHorizontally,
 verticalArrangement \= Arrangement.Center,
 ) {
 Text(text \= "Page #$page")
 Spacer(modifier \= Modifier.height(8.dp))
 Text(text \= "Swipe up and down")
 }
 }
 }
 }
}

Parameters

`action: GestureAction`

The gesture action to handle.

`key: String? = null`

A unique identifier for this gesture instance. This ID allows the system to track user interactions - for example, to mute gesture indicators that have been frequently shown or successfully performed, in accordance with user preferences. If the same key is reused across multiple gestures, they will share a common interaction history (such as frequency-based gesture indicator display logic). Note that this only affects the presentation of the UI; the underlying logic and handling remain independent for each instance. If `key` is null or empty, a unique key will be automatically generated based on the composition position of this gesture.

`priority: GesturePriority = GesturePriority.Unspecified`

The priority value; higher values take precedence if multiple handlers are registered for the same `action`. It is not recommended to register multiple gestures for the same action and priority (but if that is the case, all of them will be actioned).

`enabledInAmbient: Boolean = false`

Whether the gesture should remain active in ambient mode.

`interactionSource: MutableInteractionSource? = null`

`MutableInteractionSource` that will be used to dispatch `androidx.compose.foundation.interaction.Interaction`s for this gesture. This can be used to visualize the gesture state (e.g., showing a ripple or custom pressed state) when the one-handed gesture is being interacted with.

`onShowIndicator: () -> Unit = {}`

Callback invoked when the system determines a gesture indicator should be displayed for this component. This occurs when the component holds the highest priority for the current gesture. Only `GestureAction.Primary` gesture indicator callbacks will be called.

`onGesture: suspend () -> Unit`

The callback invoked when the gesture is triggered.

### Modifier.overscroll

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.overscroll(overscrollEffect: OverscrollEffect?): Modifier

Renders overscroll from the provided `overscrollEffect`.

This modifier attaches the provided `overscrollEffect`'s `OverscrollEffect.node` to the hierarchy, which renders the actual effect. Note that this modifier is only responsible for the visual part of overscroll - on its own it will not handle input events. In addition to using this modifier you also need to propagate events to the `overscrollEffect`, most commonly by using a `androidx.compose.foundation.gestures.scrollable`.

Alternatively, you can use a higher level API such as `verticalScroll` or `androidx.compose.foundation.lazy.LazyColumn` and provide a custom `OverscrollEffect` - these components will both render and provide events to the `OverscrollEffect`, so you do not need to manually render the effect with this modifier.

import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.spring
import androidx.compose.foundation.OverscrollEffect
import androidx.compose.foundation.background
import androidx.compose.foundation.gestures.Orientation
import androidx.compose.foundation.gestures.rememberScrollableState
import androidx.compose.foundation.gestures.scrollable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.overscroll
import androidx.compose.material.Text
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.input.nestedscroll.NestedScrollSource
import androidx.compose.ui.layout.Measurable
import androidx.compose.ui.layout.MeasureResult
import androidx.compose.ui.layout.MeasureScope
import androidx.compose.ui.node.DelegatableNode
import androidx.compose.ui.node.LayoutModifierNode
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.Constraints
import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.Velocity
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

// our custom offset overscroll that offset the element it is applied to when we hit the bound
// on the scrollable container.
class OffsetOverscrollEffect(val scope: CoroutineScope) : OverscrollEffect {
 private val overscrollOffset \= Animatable(0f)

 override fun applyToScroll(
 delta: Offset,
 source: NestedScrollSource,
 performScroll: (Offset) \-\> Offset,
 ): Offset {
 // in pre scroll we relax the overscroll if needed
 // relaxation: when we are in progress of the overscroll and user scrolls in the
 // different direction = substract the overscroll first
 val sameDirection \= sign(delta.y) \== sign(overscrollOffset.value)
 val consumedByPreScroll \=
 if (abs(overscrollOffset.value) > 0.5 && !sameDirection) {
 val prevOverscrollValue \= overscrollOffset.value
 val newOverscrollValue \= overscrollOffset.value + delta.y
 if (sign(prevOverscrollValue) != sign(newOverscrollValue)) {
 // sign changed, coerce to start scrolling and exit
 scope.launch { overscrollOffset.snapTo(0f) }
 Offset(x \= 0f, y \= delta.y + prevOverscrollValue)
 } else {
 scope.launch { overscrollOffset.snapTo(overscrollOffset.value + delta.y) }
 delta.copy(x \= 0f)
 }
 } else {
 Offset.Zero
 }
 val leftForScroll \= delta \- consumedByPreScroll
 val consumedByScroll \= performScroll(leftForScroll)
 val overscrollDelta \= leftForScroll \- consumedByScroll
 // if it is a drag, not a fling, add the delta left to our over scroll value
 if (abs(overscrollDelta.y) > 0.5 && source \== NestedScrollSource.UserInput) {
 scope.launch {
 // multiply by 0.1 for the sake of parallax effect
 overscrollOffset.snapTo(overscrollOffset.value + overscrollDelta.y \* 0.1f)
 }
 }
 return consumedByPreScroll + consumedByScroll
 }

 override suspend fun applyToFling(
 velocity: Velocity,
 performFling: suspend (Velocity) \-\> Velocity,
 ) {
 val consumed \= performFling(velocity)
 // when the fling happens - we just gradually animate our overscroll to 0
 val remaining \= velocity \- consumed
 overscrollOffset.animateTo(
 targetValue \= 0f,
 initialVelocity \= remaining.y,
 animationSpec \= spring(),
 )
 }

 override val isInProgress: Boolean
 get() \= overscrollOffset.value != 0f

 // Create a LayoutModifierNode that offsets by overscrollOffset.value
 override val node: DelegatableNode \=
 object : Modifier.Node(), LayoutModifierNode {
 override fun MeasureScope.measure(
 measurable: Measurable,
 constraints: Constraints,
 ): MeasureResult {
 val placeable \= measurable.measure(constraints)
 return layout(placeable.width, placeable.height) {
 val offsetValue \= IntOffset(x \= 0, y \= overscrollOffset.value.roundToInt())
 placeable.placeRelativeWithLayer(offsetValue.x, offsetValue.y)
 }
 }
 }
}

val offset \= remember { mutableStateOf(0f) }
val scope \= rememberCoroutineScope()
// Create the overscroll controller
val overscroll \= remember(scope) { OffsetOverscrollEffect(scope) }
// let's build a scrollable that scroll until -512 to 512
val scrollStateRange \= (\-512f).rangeTo(512f)
Box(
 Modifier.size(150.dp)
 .scrollable(
 orientation \= Orientation.Vertical,
 state \=
 rememberScrollableState { delta \-\>
 // use the scroll data and indicate how much this element consumed.
 val oldValue \= offset.value
 // coerce to our range
 offset.value \= (offset.value + delta).coerceIn(scrollStateRange)

 offset.value \- oldValue // indicate that we consumed what's needed
 },
 // pass the overscroll to the scrollable so the data is updated
 overscrollEffect \= overscroll,
 )
 .background(Color.LightGray),
 contentAlignment \= Alignment.Center,
) {
 Text(
 offset.value.roundToInt().toString(),
 style \= TextStyle(fontSize \= 32.sp),
 modifier \=
 Modifier
 // show the overscroll only on the text, not the containers (just for fun)
 .overscroll(overscroll),
 )
}

Parameters

`overscrollEffect: OverscrollEffect?`

the `OverscrollEffect` to render

### Modifier.absolutePadding

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.absolutePadding( 
    left: Dp = 0.dp, 
    top: Dp = 0.dp, 
    right: Dp = 0.dp, 
    bottom: Dp = 0.dp 
): Modifier

Apply additional space along each edge of the content in `Dp`: `left`, `top`, `right` and `bottom`. These paddings are applied without regard to the current `LayoutDirection`, see `padding` to apply relative paddings. Padding is applied before content measurement and takes precedence; content may only be as large as the remaining space.

Negative padding is not permitted — it will cause `IllegalArgumentException`. See `Modifier.offset`.

Example usage:

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.absolutePadding
import androidx.compose.foundation.layout.size
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

Box(Modifier.background(color \= Color.Gray)) {
 Box(
 Modifier.absolutePadding(left \= 20.dp, top \= 30.dp, right \= 20.dp, bottom \= 30.dp)
 .size(50.dp)
 .background(Color.Blue)
 )
}

### Modifier.padding

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.padding(all: Dp): Modifier

Apply `all` dp of additional space along each edge of the content, left, top, right and bottom. Padding is applied before content measurement and takes precedence; content may only be as large as the remaining space.

Negative padding is not permitted — it will cause `IllegalArgumentException`. See `Modifier.offset`.

Example usage:

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

Box(Modifier.background(color \= Color.Gray)) {
 Box(Modifier.padding(all \= 20.dp).size(50.dp).background(Color.Blue))
}

### Modifier.padding

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.padding(paddingValues: PaddingValues): Modifier

Apply `PaddingValues` to the component as additional space along each edge of the content's left, top, right and bottom. Padding is applied before content measurement and takes precedence; content may only be as large as the remaining space.

Negative padding is not permitted — it will cause `IllegalArgumentException`. See `Modifier.offset`.

Example usage:

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

val innerPadding \= PaddingValues(top \= 10.dp, start \= 15.dp)
Box(Modifier.background(color \= Color.Gray)) {
 Box(Modifier.padding(innerPadding).size(50.dp).background(Color.Blue))
}

### Modifier.padding

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.padding(horizontal: Dp = 0.dp, vertical: Dp = 0.dp): Modifier

Apply `horizontal` dp space along the left and right edges of the content, and `vertical` dp space along the top and bottom edges. Padding is applied before content measurement and takes precedence; content may only be as large as the remaining space.

Negative padding is not permitted — it will cause `IllegalArgumentException`. See `Modifier.offset`.

Example usage:

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

Box(Modifier.background(color \= Color.Gray)) {
 Box(
 Modifier.padding(horizontal \= 20.dp, vertical \= 30.dp)
 .size(50.dp)
 .background(Color.Blue)
 )
}

### Modifier.padding

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.padding(start: Dp = 0.dp, top: Dp = 0.dp, end: Dp = 0.dp, bottom: Dp = 0.dp): Modifier

Apply additional space along each edge of the content in `Dp`: `start`, `top`, `end` and `bottom`. The start and end edges will be determined by the current `LayoutDirection`. Padding is applied before content measurement and takes precedence; content may only be as large as the remaining space.

Negative padding is not permitted — it will cause `IllegalArgumentException`. See `Modifier.offset`.

Example usage:

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

Box(Modifier.background(color \= Color.Gray)) {
 Box(
 Modifier.padding(start \= 20.dp, top \= 30.dp, end \= 20.dp, bottom \= 30.dp)
 .size(50.dp)
 .background(Color.Blue)
 )
}

### Modifier.paint

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.paint( 
    painter: Painter, 
    sizeToIntrinsics: Boolean = true, 
    alignment: Alignment = Alignment.Center, 
    contentScale: ContentScale = ContentScale.Inside, 
    alpha: Float = DefaultAlpha, 
    colorFilter: ColorFilter? = null 
): Modifier

Paint the content using `painter`.

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.paint
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.DrawScope
import androidx.compose.ui.graphics.painter.Painter
import androidx.compose.ui.unit.dp

class CustomPainter : Painter() {

 override val intrinsicSize: Size
 get() \= Size(300.0f, 300.0f)

 override fun DrawScope.onDraw() {
 drawCircle(center \= center, radius \= size.minDimension / 2.0f, color \= Color.Red)
 }
}

Box(
 modifier \=
 Modifier.background(color \= Color.Gray)
 .padding(30.dp)
 .background(color \= Color.Yellow)
 .paint(CustomPainter())
) {
 /\*\* intentionally empty \*/
}

Parameters

`painter: Painter`

`Painter` to be drawn by this `Modifier`

`sizeToIntrinsics: Boolean = true`

`true` to size the element relative to `Painter.intrinsicSize`

`alignment: Alignment = Alignment.Center`

specifies alignment of the `painter` relative to content

`contentScale: ContentScale = ContentScale.Inside`

strategy for scaling `painter` if its size does not match the content size

`alpha: Float = DefaultAlpha`

opacity of `painter`

`colorFilter: ColorFilter? = null`

optional `ColorFilter` to apply to `painter`

### Modifier.placeholder

android

Artifact: androidx.wear.compose:compose-material

View Source

@ExperimentalWearMaterialApi 
@Composable 
fun Modifier.placeholder( 
    placeholderState: PlaceholderState, 
    shape: Shape = MaterialTheme.shapes.small, 
    color: Color = MaterialTheme.colors.onSurface
 .copy(alpha = 0.1f)
 .compositeOver(MaterialTheme.colors.surface) 
): Modifier

Draws a placeholder shape over the top of a composable and animates a wipe off effect to remove the placeholder. Typically used whilst content is 'loading' and then 'revealed'.

Example of a `Chip` with icon and a label that put placeholders over individual content slots:

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.style.TextOverflow
import androidx.wear.compose.material.Chip
import androidx.wear.compose.material.ChipDefaults
import androidx.wear.compose.material.Icon
import androidx.wear.compose.material.PlaceholderDefaults
import androidx.wear.compose.material.Text
import androidx.wear.compose.material.placeholder
import androidx.wear.compose.material.placeholderShimmer
import androidx.wear.compose.material.rememberPlaceholderState

var labelText by remember { mutableStateOf("") }
var iconResource: Int? by remember { mutableStateOf(null) }
val chipPlaceholderState \= rememberPlaceholderState {
 labelText.isNotEmpty() && iconResource != null
}

Chip(
 onClick \= { /\* Do something \*/ },
 enabled \= true,
 label \= {
 Text(
 text \= labelText,
 maxLines \= 2,
 overflow \= TextOverflow.Ellipsis,
 modifier \= Modifier.fillMaxWidth().placeholder(chipPlaceholderState),
 )
 },
 icon \= {
 Box(modifier \= Modifier.size(ChipDefaults.IconSize).placeholder(chipPlaceholderState)) {
 if (iconResource != null) {
 Icon(
 painter \= painterResource(id \= R.drawable.ic\_airplanemode\_active\_24px),
 contentDescription \= "airplane",
 modifier \=
 Modifier.wrapContentSize(align \= Alignment.Center)
 .size(ChipDefaults.IconSize)
 .fillMaxSize(),
 )
 }
 }
 },
 colors \=
 PlaceholderDefaults.placeholderChipColors(
 originalChipColors \= ChipDefaults.primaryChipColors(),
 placeholderState \= chipPlaceholderState,
 ),
 modifier \= Modifier.fillMaxWidth().placeholderShimmer(chipPlaceholderState),
)
// Simulate content loading completing in stages
LaunchedEffect(Unit) {
 delay(2000)
 iconResource \= R.drawable.ic\_airplanemode\_active\_24px
 delay(1000)
 labelText \= "A label"
}
if (!chipPlaceholderState.isShowContent) {
 LaunchedEffect(chipPlaceholderState) { chipPlaceholderState.startPlaceholderAnimation() }
}

Example of a `Chip` with icon and a primary and secondary labels that draws another `Chip` over the top of it when waiting for placeholder data to load:

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.wear.compose.material.Chip
import androidx.wear.compose.material.ChipDefaults
import androidx.wear.compose.material.Icon
import androidx.wear.compose.material.PlaceholderDefaults
import androidx.wear.compose.material.Text
import androidx.wear.compose.material.placeholder
import androidx.wear.compose.material.placeholderShimmer
import androidx.wear.compose.material.rememberPlaceholderState

var labelText by remember { mutableStateOf("") }
var secondaryLabelText by remember { mutableStateOf("") }
var iconResource: Int? by remember { mutableStateOf(null) }

val chipPlaceholderState \= rememberPlaceholderState {
 labelText.isNotEmpty() && secondaryLabelText.isNotEmpty() && iconResource != null
}
Box {
 if (chipPlaceholderState.isShowContent || chipPlaceholderState.isWipeOff) {
 Chip(
 onClick \= { /\* Do something \*/ },
 enabled \= true,
 label \= {
 Text(
 text \= labelText,
 maxLines \= 1,
 overflow \= TextOverflow.Ellipsis,
 modifier \= Modifier.fillMaxWidth(),
 )
 },
 secondaryLabel \= {
 Text(
 text \= secondaryLabelText,
 maxLines \= 1,
 overflow \= TextOverflow.Ellipsis,
 modifier \= Modifier.fillMaxWidth(),
 )
 },
 icon \= {
 if (iconResource != null) {
 Icon(
 painter \= painterResource(id \= R.drawable.ic\_airplanemode\_active\_24px),
 contentDescription \= "airplane",
 modifier \=
 Modifier.wrapContentSize(align \= Alignment.Center)
 .size(ChipDefaults.IconSize),
 )
 }
 },
 colors \= ChipDefaults.gradientBackgroundChipColors(),
 modifier \= Modifier.fillMaxWidth(),
 )
 }
 if (!chipPlaceholderState.isShowContent) {
 Chip(
 onClick \= { /\* Do something \*/ },
 enabled \= true,
 label \= {
 Box(
 modifier \=
 Modifier.fillMaxWidth()
 .height(16.dp)
 .padding(top \= 1.dp, bottom \= 1.dp)
 .placeholder(placeholderState \= chipPlaceholderState)
 )
 },
 secondaryLabel \= {
 Box(
 modifier \=
 Modifier.fillMaxWidth()
 .height(16.dp)
 .padding(top \= 1.dp, bottom \= 1.dp)
 .placeholder(placeholderState \= chipPlaceholderState)
 )
 },
 icon \= {
 Box(
 modifier \=
 Modifier.size(ChipDefaults.IconSize).placeholder(chipPlaceholderState)
 )
 // Simulate the icon becoming ready after a period of time
 LaunchedEffect(Unit) {
 delay(2000)
 iconResource \= R.drawable.ic\_airplanemode\_active\_24px
 }
 },
 colors \=
 PlaceholderDefaults.placeholderChipColors(
 placeholderState \= chipPlaceholderState
 ),
 modifier \= Modifier.fillMaxWidth().placeholderShimmer(chipPlaceholderState),
 )
 }
}
// Simulate data being loaded after a delay
LaunchedEffect(Unit) {
 delay(2500)
 secondaryLabelText \= "A secondary label"
 delay(500)
 labelText \= "A label"
}
if (!chipPlaceholderState.isShowContent) {
 LaunchedEffect(chipPlaceholderState) { chipPlaceholderState.startPlaceholderAnimation() }
}

The `placeholderState` determines when to 'show' and 'wipe off' the placeholder.

NOTE: The order of modifiers is important. If you are adding both `Modifier.placeholder` and `Modifier.placeholderShimmer` to the same composable then the shimmer must be first in the modifier chain. Example of `Text` composable with both placeholderShimmer and placeholder modifiers.

import androidx.compose.foundation.layout.width
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.wear.compose.material.Text
import androidx.wear.compose.material.placeholder
import androidx.wear.compose.material.placeholderShimmer
import androidx.wear.compose.material.rememberPlaceholderState

var labelText by remember { mutableStateOf("") }
val chipPlaceholderState \= rememberPlaceholderState { labelText.isNotEmpty() }

Text(
 text \= labelText,
 overflow \= TextOverflow.Ellipsis,
 textAlign \= TextAlign.Center,
 modifier \=
 Modifier.width(90.dp)
 .placeholderShimmer(chipPlaceholderState)
 .placeholder(chipPlaceholderState),
)

// Simulate content loading
LaunchedEffect(Unit) {
 delay(3000)
 labelText \= "A label"
}
if (!chipPlaceholderState.isShowContent) {
 LaunchedEffect(chipPlaceholderState) { chipPlaceholderState.startPlaceholderAnimation() }
}

Parameters

`placeholderState: PlaceholderState`

determines whether the placeholder is visible and controls animation effects for the placeholder.

`shape: Shape = MaterialTheme.shapes.small`

the shape to apply to the placeholder

`color: Color = MaterialTheme.colors.onSurface .copy(alpha = 0.1f) .compositeOver(MaterialTheme.colors.surface)`

the color of the placeholder.

### Modifier.placeholder

android

Artifact: androidx.wear.compose:compose-material3

View Source

@Composable 
fun Modifier.placeholder( 
    placeholderState: PlaceholderState, 
    shape: Shape = PlaceholderDefaults.shape, 
    color: Color = PlaceholderDefaults.color 
): Modifier

Modifier.placeholder draws a skeleton shape over a component, for situations when no provisional content (such as cached data) is available. The placeholder skeleton can be displayed instead, while the content is loading. The reveal of the content will be animated when it becomes available (and hidden again if the content becomes unavailable), unless the ReducedMotion setting is enabled, in which case those are instantaneous. NOTE: For animations to work, an `AppScaffold` should be used.

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.style.TextOverflow
import androidx.wear.compose.material3.ButtonDefaults
import androidx.wear.compose.material3.FilledTonalButton
import androidx.wear.compose.material3.Icon
import androidx.wear.compose.material3.Text
import androidx.wear.compose.material3.placeholder
import androidx.wear.compose.material3.placeholderShimmer
import androidx.wear.compose.material3.rememberPlaceholderState

var labelText by remember { mutableStateOf("") }
var imageVector: ImageVector? by remember { mutableStateOf(null) }
val buttonPlaceholderState \=
 rememberPlaceholderState(isVisible \= labelText.isEmpty() || imageVector \== null)

FilledTonalButton(
 onClick \= { /\* Do something \*/ },
 enabled \= true,
 modifier \= Modifier.fillMaxWidth().placeholderShimmer(buttonPlaceholderState),
 label \= {
 Text(
 text \= labelText,
 maxLines \= 2,
 overflow \= TextOverflow.Ellipsis,
 modifier \= Modifier.fillMaxWidth().placeholder(buttonPlaceholderState),
 )
 },
 icon \= {
 Box(
 modifier \=
 Modifier.size(ButtonDefaults.IconSize).placeholder(buttonPlaceholderState)
 ) {
 if (imageVector != null) {
 Icon(
 imageVector \= imageVector!!,
 contentDescription \= "Heart",
 modifier \=
 Modifier.wrapContentSize(align \= Alignment.Center)
 .size(ButtonDefaults.IconSize)
 .fillMaxSize(),
 )
 }
 }
 },
)
// Simulate content loading completing in stages
LaunchedEffect(Unit) {
 delay(2000)
 imageVector \= Icons.Filled.Favorite
 delay(1000)
 labelText \= "A label"
}

If there is some cached data for this field, it may be better to show that while loading, see

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.style.TextOverflow
import androidx.wear.compose.material3.ButtonDefaults
import androidx.wear.compose.material3.FilledTonalButton
import androidx.wear.compose.material3.Icon
import androidx.wear.compose.material3.Text
import androidx.wear.compose.material3.placeholder
import androidx.wear.compose.material3.placeholderShimmer
import androidx.wear.compose.material3.rememberPlaceholderState

var labelText by remember { mutableStateOf("Cached Data") }
var imageVector: ImageVector? by remember { mutableStateOf(null) }
val buttonPlaceholderState \=
 rememberPlaceholderState(isVisible \= labelText.isEmpty() || imageVector \== null)

// Put placeholderShimmer in the container and placeholder in the elements of the content that
// have no cached data.
FilledTonalButton(
 onClick \= { /\* Do something \*/ },
 enabled \= true,
 modifier \= Modifier.fillMaxWidth().placeholderShimmer(buttonPlaceholderState),
 label \= {
 Text(
 text \= labelText,
 maxLines \= 2,
 overflow \= TextOverflow.Ellipsis,
 modifier \= Modifier.fillMaxWidth(),
 )
 },
 icon \= {
 Box(
 modifier \=
 Modifier.size(ButtonDefaults.IconSize).placeholder(buttonPlaceholderState)
 ) {
 if (imageVector != null) {
 Icon(
 imageVector \= imageVector!!,
 contentDescription \= "Heart",
 modifier \=
 Modifier.wrapContentSize(align \= Alignment.Center)
 .size(ButtonDefaults.IconSize)
 .fillMaxSize(),
 )
 }
 }
 },
)
// Simulate content loading completing in stages
LaunchedEffect(Unit) {
 delay(2000)
 imageVector \= Icons.Filled.Favorite
 delay(1000)
 labelText \= "A label"
}

Note that the component should still be sized close to the target, so the final reveal of the content is less disruptive.

Parameters

`placeholderState: PlaceholderState`

the state used to coordinate several placeholder effects.

`shape: Shape = PlaceholderDefaults.shape`

the shape of the placeholder.

`color: Color = PlaceholderDefaults.color`

the color to use in the placeholder.

### Modifier.placeholderShimmer

android

Artifact: androidx.wear.compose:compose-material

View Source

@ExperimentalWearMaterialApi 
@Composable 
fun Modifier.placeholderShimmer( 
    placeholderState: PlaceholderState, 
    shape: Shape = MaterialTheme.shapes.small, 
    color: Color = MaterialTheme.colors.onSurface 
): Modifier

Modifier to draw a placeholder shimmer over a component. The placeholder shimmer is a 45 degree gradient from Top|Left of the screen to Bottom|Right. The shimmer is coordinated via the animation frame clock which orchestrates the shimmer so that every component will shimmer as the gradient progresses across the screen.

Example of a `Chip` with icon and a label that put placeholders over individual content slots and then draws a placeholder shimmer over the result:

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.style.TextOverflow
import androidx.wear.compose.material.Chip
import androidx.wear.compose.material.ChipDefaults
import androidx.wear.compose.material.Icon
import androidx.wear.compose.material.PlaceholderDefaults
import androidx.wear.compose.material.Text
import androidx.wear.compose.material.placeholder
import androidx.wear.compose.material.placeholderShimmer
import androidx.wear.compose.material.rememberPlaceholderState

var labelText by remember { mutableStateOf("") }
var iconResource: Int? by remember { mutableStateOf(null) }
val chipPlaceholderState \= rememberPlaceholderState {
 labelText.isNotEmpty() && iconResource != null
}

Chip(
 onClick \= { /\* Do something \*/ },
 enabled \= true,
 label \= {
 Text(
 text \= labelText,
 maxLines \= 2,
 overflow \= TextOverflow.Ellipsis,
 modifier \= Modifier.fillMaxWidth().placeholder(chipPlaceholderState),
 )
 },
 icon \= {
 Box(modifier \= Modifier.size(ChipDefaults.IconSize).placeholder(chipPlaceholderState)) {
 if (iconResource != null) {
 Icon(
 painter \= painterResource(id \= R.drawable.ic\_airplanemode\_active\_24px),
 contentDescription \= "airplane",
 modifier \=
 Modifier.wrapContentSize(align \= Alignment.Center)
 .size(ChipDefaults.IconSize)
 .fillMaxSize(),
 )
 }
 }
 },
 colors \=
 PlaceholderDefaults.placeholderChipColors(
 originalChipColors \= ChipDefaults.primaryChipColors(),
 placeholderState \= chipPlaceholderState,
 ),
 modifier \= Modifier.fillMaxWidth().placeholderShimmer(chipPlaceholderState),
)
// Simulate content loading completing in stages
LaunchedEffect(Unit) {
 delay(2000)
 iconResource \= R.drawable.ic\_airplanemode\_active\_24px
 delay(1000)
 labelText \= "A label"
}
if (!chipPlaceholderState.isShowContent) {
 LaunchedEffect(chipPlaceholderState) { chipPlaceholderState.startPlaceholderAnimation() }
}

Example of a `Chip` with icon and a primary and secondary labels that draws another `Chip` over the top of it when waiting for placeholder data to load and then draws a placeholder shimmer over the top:

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.wear.compose.material.Chip
import androidx.wear.compose.material.ChipDefaults
import androidx.wear.compose.material.Icon
import androidx.wear.compose.material.PlaceholderDefaults
import androidx.wear.compose.material.Text
import androidx.wear.compose.material.placeholder
import androidx.wear.compose.material.placeholderShimmer
import androidx.wear.compose.material.rememberPlaceholderState

var labelText by remember { mutableStateOf("") }
var secondaryLabelText by remember { mutableStateOf("") }
var iconResource: Int? by remember { mutableStateOf(null) }

val chipPlaceholderState \= rememberPlaceholderState {
 labelText.isNotEmpty() && secondaryLabelText.isNotEmpty() && iconResource != null
}
Box {
 if (chipPlaceholderState.isShowContent || chipPlaceholderState.isWipeOff) {
 Chip(
 onClick \= { /\* Do something \*/ },
 enabled \= true,
 label \= {
 Text(
 text \= labelText,
 maxLines \= 1,
 overflow \= TextOverflow.Ellipsis,
 modifier \= Modifier.fillMaxWidth(),
 )
 },
 secondaryLabel \= {
 Text(
 text \= secondaryLabelText,
 maxLines \= 1,
 overflow \= TextOverflow.Ellipsis,
 modifier \= Modifier.fillMaxWidth(),
 )
 },
 icon \= {
 if (iconResource != null) {
 Icon(
 painter \= painterResource(id \= R.drawable.ic\_airplanemode\_active\_24px),
 contentDescription \= "airplane",
 modifier \=
 Modifier.wrapContentSize(align \= Alignment.Center)
 .size(ChipDefaults.IconSize),
 )
 }
 },
 colors \= ChipDefaults.gradientBackgroundChipColors(),
 modifier \= Modifier.fillMaxWidth(),
 )
 }
 if (!chipPlaceholderState.isShowContent) {
 Chip(
 onClick \= { /\* Do something \*/ },
 enabled \= true,
 label \= {
 Box(
 modifier \=
 Modifier.fillMaxWidth()
 .height(16.dp)
 .padding(top \= 1.dp, bottom \= 1.dp)
 .placeholder(placeholderState \= chipPlaceholderState)
 )
 },
 secondaryLabel \= {
 Box(
 modifier \=
 Modifier.fillMaxWidth()
 .height(16.dp)
 .padding(top \= 1.dp, bottom \= 1.dp)
 .placeholder(placeholderState \= chipPlaceholderState)
 )
 },
 icon \= {
 Box(
 modifier \=
 Modifier.size(ChipDefaults.IconSize).placeholder(chipPlaceholderState)
 )
 // Simulate the icon becoming ready after a period of time
 LaunchedEffect(Unit) {
 delay(2000)
 iconResource \= R.drawable.ic\_airplanemode\_active\_24px
 }
 },
 colors \=
 PlaceholderDefaults.placeholderChipColors(
 placeholderState \= chipPlaceholderState
 ),
 modifier \= Modifier.fillMaxWidth().placeholderShimmer(chipPlaceholderState),
 )
 }
}
// Simulate data being loaded after a delay
LaunchedEffect(Unit) {
 delay(2500)
 secondaryLabelText \= "A secondary label"
 delay(500)
 labelText \= "A label"
}
if (!chipPlaceholderState.isShowContent) {
 LaunchedEffect(chipPlaceholderState) { chipPlaceholderState.startPlaceholderAnimation() }
}

NOTE: The order of modifiers is important. If you are adding both `Modifier.placeholder` and `Modifier.placeholderShimmer` to the same composable then the shimmer must be before in the modifier chain. Example of `Text` composable with both placeholderShimmer and placeholder modifiers.

import androidx.compose.foundation.layout.width
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.wear.compose.material.Text
import androidx.wear.compose.material.placeholder
import androidx.wear.compose.material.placeholderShimmer
import androidx.wear.compose.material.rememberPlaceholderState

var labelText by remember { mutableStateOf("") }
val chipPlaceholderState \= rememberPlaceholderState { labelText.isNotEmpty() }

Text(
 text \= labelText,
 overflow \= TextOverflow.Ellipsis,
 textAlign \= TextAlign.Center,
 modifier \=
 Modifier.width(90.dp)
 .placeholderShimmer(chipPlaceholderState)
 .placeholder(chipPlaceholderState),
)

// Simulate content loading
LaunchedEffect(Unit) {
 delay(3000)
 labelText \= "A label"
}
if (!chipPlaceholderState.isShowContent) {
 LaunchedEffect(chipPlaceholderState) { chipPlaceholderState.startPlaceholderAnimation() }
}

Parameters

`placeholderState: PlaceholderState`

the current placeholder state that determine whether the placeholder shimmer should be shown.

`shape: Shape = MaterialTheme.shapes.small`

the shape of the component.

`color: Color = MaterialTheme.colors.onSurface`

the color to use in the shimmer.

### Modifier.placeholderShimmer

android

Artifact: androidx.wear.compose:compose-material3

View Source

@Composable 
fun Modifier.placeholderShimmer( 
    placeholderState: PlaceholderState, 
    shape: Shape = PlaceholderDefaults.shape, 
    color: Color = PlaceholderDefaults.shimmerColor 
): Modifier

Modifier.placeholderShimmer draws a periodic shimmer over content, indicating to the user that contents are loading or potentially out of date. The placeholder shimmer is a 45 degree gradient from Top|Left of the screen to Bottom|Right. The shimmer is coordinated via the animation frame clock which orchestrates the shimmer so that every component will shimmer as the gradient progresses across the screen. NOTE: For animations to work, an `AppScaffold` should be used.

Example of a `Button` with icon and a label that put placeholders over individual content slots and then draws a placeholder shimmer over the result:

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.style.TextOverflow
import androidx.wear.compose.material3.ButtonDefaults
import androidx.wear.compose.material3.FilledTonalButton
import androidx.wear.compose.material3.Icon
import androidx.wear.compose.material3.Text
import androidx.wear.compose.material3.placeholder
import androidx.wear.compose.material3.placeholderShimmer
import androidx.wear.compose.material3.rememberPlaceholderState

var labelText by remember { mutableStateOf("") }
var imageVector: ImageVector? by remember { mutableStateOf(null) }
val buttonPlaceholderState \=
 rememberPlaceholderState(isVisible \= labelText.isEmpty() || imageVector \== null)

FilledTonalButton(
 onClick \= { /\* Do something \*/ },
 enabled \= true,
 modifier \= Modifier.fillMaxWidth().placeholderShimmer(buttonPlaceholderState),
 label \= {
 Text(
 text \= labelText,
 maxLines \= 2,
 overflow \= TextOverflow.Ellipsis,
 modifier \= Modifier.fillMaxWidth().placeholder(buttonPlaceholderState),
 )
 },
 icon \= {
 Box(
 modifier \=
 Modifier.size(ButtonDefaults.IconSize).placeholder(buttonPlaceholderState)
 ) {
 if (imageVector != null) {
 Icon(
 imageVector \= imageVector!!,
 contentDescription \= "Heart",
 modifier \=
 Modifier.wrapContentSize(align \= Alignment.Center)
 .size(ButtonDefaults.IconSize)
 .fillMaxSize(),
 )
 }
 }
 },
)
// Simulate content loading completing in stages
LaunchedEffect(Unit) {
 delay(2000)
 imageVector \= Icons.Filled.Favorite
 delay(1000)
 labelText \= "A label"
}

Example of a simple text placeholder:

import androidx.compose.foundation.layout.width
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.wear.compose.material3.Text
import androidx.wear.compose.material3.placeholder
import androidx.wear.compose.material3.placeholderShimmer
import androidx.wear.compose.material3.rememberPlaceholderState

var labelText by remember { mutableStateOf("") }
val placeholderState \= rememberPlaceholderState(isVisible \= labelText.isEmpty())

Text(
 text \= labelText,
 overflow \= TextOverflow.Ellipsis,
 textAlign \= TextAlign.Center,
 modifier \=
 Modifier.width(90.dp).placeholderShimmer(placeholderState).placeholder(placeholderState),
)

// Simulate content loading
LaunchedEffect(Unit) {
 delay(3000)
 labelText \= "A label"
}

Parameters

`placeholderState: PlaceholderState`

the current placeholder state that determine whether the placeholder shimmer should be shown.

`shape: Shape = PlaceholderDefaults.shape`

the shape of the component.

`color: Color = PlaceholderDefaults.shimmerColor`

the color to use in the shimmer.

### Modifier.pointerHoverIcon

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.pointerHoverIcon( 
    icon: PointerIcon, 
    overrideDescendants: Boolean = false 
): Modifier

Modifier that lets a developer define a pointer icon to display when the cursor is hovered over the element. When `overrideDescendants` is set to true, descendants cannot override the pointer icon using this modifier.

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.text.selection.SelectionContainer
import androidx.compose.material.Text
import androidx.compose.ui.Modifier
import androidx.compose.ui.input.pointer.PointerIcon
import androidx.compose.ui.input.pointer.pointerHoverIcon

Column(Modifier.pointerHoverIcon(PointerIcon.Crosshair)) {
 SelectionContainer {
 Column {
 Text("Selectable text")
 Text(
 modifier \= Modifier.pointerHoverIcon(PointerIcon.Hand, true),
 text \= "Selectable text with hand",
 )
 }
 }
 Text("Just text with global pointerIcon")
}

Parameters

`icon: PointerIcon`

the icon to set

`overrideDescendants: Boolean = false`

when false (by default), descendants are able to set their own pointer icon. If true, no descendants under this parent are eligible to change the icon (it will be set to the this (the parent's) icon).

### Modifier.stylusHoverIcon

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.stylusHoverIcon( 
    icon: PointerIcon, 
    overrideDescendants: Boolean = false, 
    touchBoundsExpansion: DpTouchBoundsExpansion? = null 
): Modifier

Modifier that lets a developer define a pointer icon to display when a stylus is hovered over the element. When `overrideDescendants` is set to true, descendants cannot override the pointer icon using this modifier.

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.requiredSize
import androidx.compose.material.Text
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.input.pointer.PointerIcon
import androidx.compose.ui.input.pointer.stylusHoverIcon
import androidx.compose.ui.unit.dp

Box(
 Modifier.requiredSize(200.dp)
 .border(BorderStroke(2.dp, SolidColor(Color.Red)))
 .stylusHoverIcon(PointerIcon.Crosshair)
) {
 Text(text \= "crosshair icon")
 Box(
 Modifier.padding(20.dp)
 .requiredSize(150.dp)
 .border(BorderStroke(2.dp, SolidColor(Color.Black)))
 .stylusHoverIcon(PointerIcon.Text)
 ) {
 Text(text \= "text icon")
 Box(
 Modifier.padding(40.dp)
 .requiredSize(100.dp)
 .border(BorderStroke(2.dp, SolidColor(Color.Blue)))
 .stylusHoverIcon(PointerIcon.Hand)
 ) {
 Text(text \= "hand icon")
 }
 }
}

Parameters

`icon: PointerIcon`

the icon to set

`overrideDescendants: Boolean = false`

when false (by default), descendants are able to set their own pointer icon. If true, no descendants under this parent are eligible to change the icon (it will be set to the this (the parent's) icon).

`touchBoundsExpansion: DpTouchBoundsExpansion? = null`

amount by which the element's bounds is expanded

### Modifier.motionEventSpy

android

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.motionEventSpy(watcher: (motionEvent: MotionEvent) \-> Unit): Modifier

Calls `watcher` with each `MotionEvent` that the layout area or any child `pointerInput` receives. The `MotionEvent` may or may not have been transformed to the local coordinate system. The Compose View will be considered as handling the `MotionEvent` in the area that the `motionEventSpy` is active.

This method can only be used to observe `MotionEvent`s and can not be used to capture an event stream.

`watcher` is called during the `PointerEventPass.Initial` pass.

Developers should use `pointerInput` to handle pointer input processing within Compose. `motionEventSpy` is only useful as part of Android View interoperability.

If you need to handle and consume `MotionEvent`s, use `pointerInteropFilter`.

### Modifier.pointerInteropFilter

android

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.pointerInteropFilter( 
    requestDisallowInterceptTouchEvent: RequestDisallowInterceptTouchEvent? = null, 
    onTouchEvent: (MotionEvent) \-> Boolean 
): Modifier

A special PointerInputModifier that provides access to the underlying `MotionEvent`s originally dispatched to Compose. Prefer `pointerInput` and use this only for interoperation with existing code that consumes `MotionEvent`s.

While the main intent of this Modifier is to allow arbitrary code to access the original `MotionEvent` dispatched to Compose, for completeness, analogs are provided to allow arbitrary code to interact with the system as if it were an Android View.

This includes 2 APIs,

1. `onTouchEvent` has a Boolean return type which is akin to the return type of `View.onTouchEvent`. If the provided `onTouchEvent` returns true, it will continue to receive the event stream (unless the event stream has been intercepted) and if it returns false, it will not.
 
2. `requestDisallowInterceptTouchEvent` is a lambda that you can optionally provide so that you can later call it (yes, in this case, you call the lambda that you provided) which is akin to calling `ViewParent.requestDisallowInterceptTouchEvent`. When this is called, any associated ancestors in the tree that abide by the contract will act accordingly and will not intercept the even stream.

See also

`onTouchEvent`

`requestDisallowInterceptTouchEvent`

### Modifier.preferKeepClear

android

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.preferKeepClear(): Modifier

Mark the layout rectangle as preferring to stay clear of floating windows.

This Modifier only has an effect on SDK 33 and above.

See also

`setPreferKeepClearRects`

### Modifier.preferKeepClear

android

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.preferKeepClear(rectProvider: (LayoutCoordinates) \-> Rect): Modifier

Mark a rectangle within the local layout coordinates preferring to stay clear of floating windows. After layout, `rectProvider` is called to determine the `Rect` to mark as keep clear.

The `LayoutCoordinates` of the `Modifier`'s location in the layout is passed as `rectProvider`'s parameter.

This Modifier only has an effect on SDK 33 and above.

See also

`setPreferKeepClearRects`

### Modifier.progressSemantics

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.progressSemantics(): Modifier

Contains the `semantics` required for an indeterminate progress indicator, that represents the fact of the in-progress operation.

If you need determinate progress 0.0 to 1.0, consider using overload with the progress parameter.

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.progressSemantics
import androidx.compose.material.Text
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color

Box(Modifier.progressSemantics().background(color \= Color.Cyan)) {
 Text("Operation is on progress")
}

### Modifier.progressSemantics

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.progressSemantics( 
    value: Float, 
    valueRange: ClosedFloatingPointRange<Float\> = 0f..1f, 
    steps: @IntRange(from = 0) Int = 0 
): Modifier

Contains the `semantics` required for a determinate progress indicator or the progress part of a slider, that represents progress within `valueRange`. `value` outside of this range will be coerced into this range.

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.progressSemantics
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

val progress \= 0.5f // emulate progress from some state
Box(
 Modifier.progressSemantics(progress)
 .size((progress \* 100).dp, 4.dp)
 .background(color \= Color.Cyan)
)

Parameters

`value: Float`

current value of the ProgressIndicator/Slider. If outside of `valueRange` provided, value will be coerced to this range. Must not be NaN.

`valueRange: ClosedFloatingPointRange<Float> = 0f..1f`

range of values that value can take. Passed `value` will be coerced to this range

`steps: @IntRange(from = 0) Int = 0`

if greater than 0, specifies the amounts of discrete values, evenly distributed between across the whole value range. If 0, any value from the range specified is allowed. Must not be negative.

### Modifier.pullRefreshIndicatorTransform

Cmn

Artifact: androidx.compose.material:material

View Source

@ExperimentalMaterialApi 
fun Modifier.pullRefreshIndicatorTransform( 
    state: PullRefreshState, 
    scale: Boolean = false 
): Modifier

A modifier for translating the position and scaling the size of a pull-to-refresh indicator based on the given `PullRefreshState`.

import androidx.compose.animation.core.animate
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.CircularProgressIndicator
import androidx.compose.material.ListItem
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.material.pullrefresh.pullRefresh
import androidx.compose.material.pullrefresh.pullRefreshIndicatorTransform
import androidx.compose.material.pullrefresh.rememberPullRefreshState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

val refreshScope \= rememberCoroutineScope()
var refreshing by remember { mutableStateOf(false) }
var itemCount by remember { mutableStateOf(15) }

fun refresh() \=
 refreshScope.launch {
 refreshing \= true
 delay(1500)
 itemCount += 5
 refreshing \= false
 }

val state \= rememberPullRefreshState(refreshing, ::refresh)
val rotation \= animateFloatAsState(state.progress \* 120)

Box(Modifier.fillMaxSize().pullRefresh(state)) {
 LazyColumn {
 if (!refreshing) {
 items(itemCount) { ListItem { Text(text \= "Item ${itemCount \- it}") } }
 }
 }

 Surface(
 modifier \=
 Modifier.size(40.dp)
 .align(Alignment.TopCenter)
 .pullRefreshIndicatorTransform(state)
 .rotate(rotation.value),
 shape \= RoundedCornerShape(10.dp),
 color \= Color.DarkGray,
 elevation \= if (state.progress > 0 || refreshing) 20.dp else 0.dp,
 ) {
 Box {
 if (refreshing) {
 CircularProgressIndicator(
 modifier \= Modifier.align(Alignment.Center).size(25.dp),
 color \= Color.White,
 strokeWidth \= 3.dp,
 )
 }
 }
 }
}

Parameters

`state: PullRefreshState`

The `PullRefreshState` which determines the position of the indicator.

`scale: Boolean = false`

A boolean controlling whether the indicator's size scales with pull progress or not.

### Modifier.pullRefresh

Cmn

Artifact: androidx.compose.material:material

View Source

@ExperimentalMaterialApi 
fun Modifier.pullRefresh(state: PullRefreshState, enabled: Boolean = true): Modifier

A nested scroll modifier that provides scroll events to `state`.

Note that this modifier must be added above a scrolling container, such as a lazy column, in order to receive scroll events. For example:

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material.ListItem
import androidx.compose.material.Text
import androidx.compose.material.pullrefresh.PullRefreshIndicator
import androidx.compose.material.pullrefresh.pullRefresh
import androidx.compose.material.pullrefresh.rememberPullRefreshState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier

val refreshScope \= rememberCoroutineScope()
var refreshing by remember { mutableStateOf(false) }
var itemCount by remember { mutableStateOf(15) }

fun refresh() \=
 refreshScope.launch {
 refreshing \= true
 delay(1500)
 itemCount += 5
 refreshing \= false
 }

val state \= rememberPullRefreshState(refreshing, ::refresh)

Box(Modifier.pullRefresh(state)) {
 LazyColumn(Modifier.fillMaxSize()) {
 if (!refreshing) {
 items(itemCount) { ListItem { Text(text \= "Item ${itemCount \- it}") } }
 }
 }

 PullRefreshIndicator(refreshing, state, Modifier.align(Alignment.TopCenter))
}

Parameters

`state: PullRefreshState`

The `PullRefreshState` associated with this pull-to-refresh component. The state will be updated by this modifier.

`enabled: Boolean = true`

If not enabled, all scroll delta and fling velocity will be ignored.

### Modifier.pullRefresh

Cmn

Artifact: androidx.compose.material:material

View Source

@ExperimentalMaterialApi 
fun Modifier.pullRefresh( 
    onPull: (pullDelta: Float) \-> Float, 
    onRelease: suspend (flingVelocity: Float) \-> Float, 
    enabled: Boolean = true 
): Modifier

A nested scroll modifier that provides `onPull` and `onRelease` callbacks to aid building custom pull refresh components.

Note that this modifier must be added above a scrolling container, such as a lazy column, in order to receive scroll events. For example:

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.animate
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material.LinearProgressIndicator
import androidx.compose.material.ListItem
import androidx.compose.material.Text
import androidx.compose.material.pullrefresh.pullRefresh
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.unit.dp

val refreshScope \= rememberCoroutineScope()
val threshold \= with(LocalDensity.current) { 160.dp.toPx() }

var refreshing by remember { mutableStateOf(false) }
var itemCount by remember { mutableStateOf(15) }
var currentDistance by remember { mutableStateOf(0f) }

val progress \= currentDistance / threshold

fun refresh() \=
 refreshScope.launch {
 refreshing \= true
 delay(1500)
 itemCount += 5
 refreshing \= false
 }

fun onPull(pullDelta: Float): Float \=
 when {
 refreshing \-\> 0f
 else \-\> {
 val newOffset \= (currentDistance + pullDelta).coerceAtLeast(0f)
 val dragConsumed \= newOffset \- currentDistance
 currentDistance \= newOffset
 dragConsumed
 }
 }

fun onRelease(velocity: Float): Float {
 if (refreshing) return 0f // Already refreshing - don't call refresh again.
 if (currentDistance > threshold) refresh()

 refreshScope.launch {
 animate(initialValue \= currentDistance, targetValue \= 0f) { value, \_ \-\>
 currentDistance \= value
 }
 }

 // Only consume if the fling is downwards and the indicator is visible
 return if (velocity > 0f && currentDistance > 0f) {
 velocity
 } else {
 0f
 }
}

Box(Modifier.pullRefresh(::onPull, ::onRelease)) {
 LazyColumn {
 if (!refreshing) {
 items(itemCount) { ListItem { Text(text \= "Item ${itemCount \- it}") } }
 }
 }

 // Custom progress indicator
 AnimatedVisibility(visible \= (refreshing || progress > 0)) {
 if (refreshing) {
 LinearProgressIndicator(Modifier.fillMaxWidth())
 } else {
 LinearProgressIndicator(progress, Modifier.fillMaxWidth())
 }
 }
}

Parameters

`onPull: (pullDelta: Float) -> Float`

Callback for dispatching vertical scroll delta, takes float pullDelta as argument. Positive delta (pulling down) is dispatched only if the child does not consume it (i.e. pulling down despite being at the top of a scrollable component), whereas negative delta (swiping up) is dispatched first (in case it is needed to push the indicator back up), and then the unconsumed delta is passed on to the child. The callback returns how much delta was consumed.

`onRelease: suspend (flingVelocity: Float) -> Float`

Callback for when drag is released, takes float flingVelocity as argument. The callback returns how much velocity was consumed - in most cases this should only consume velocity if pull refresh has been dragged already and the velocity is positive (the fling is downwards), as an upwards fling should typically still scroll a scrollable component beneath the pullRefresh. This is invoked before any remaining velocity is passed to the child.

`enabled: Boolean = true`

If not enabled, all scroll delta and fling velocity will be ignored and neither `onPull` nor `onRelease` will be invoked.

### Modifier.pullToRefresh

Cmn

Artifact: androidx.compose.material3:material3

View Source

fun Modifier.pullToRefresh( 
    isRefreshing: Boolean, 
    state: PullToRefreshState, 
    enabled: Boolean = true, 
    threshold: Dp = PullToRefreshDefaults.PositionalThreshold, 
    onRefresh: () \-> Unit 
): Modifier

A Modifier that adds nested scroll to a container to support a pull-to-refresh gesture. When the user pulls a distance greater than `threshold` and releases the gesture, `onRefresh` is invoked. `PullToRefreshBox` applies this automatically.

Parameters

`isRefreshing: Boolean`

whether a refresh is occurring or not, if there is no gesture in progress when isRefreshing is false the `state.distanceFraction` will animate to 0f, otherwise it will animate to 1f

`state: PullToRefreshState`

state that keeps track of the distance pulled

`enabled: Boolean = true`

whether nested scroll events should be consumed by this modifier

`threshold: Dp = PullToRefreshDefaults.PositionalThreshold`

how much distance can be scrolled down before `onRefresh` is invoked

`onRefresh: () -> Unit`

callback that is invoked when the distance pulled is greater than `threshold`

### Modifier.rangeSemantics

android

Artifact: androidx.wear.compose:compose-material3

View Source

fun Modifier.rangeSemantics( 
    value: Float, 
    enabled: Boolean, 
    onValueChange: (Float) \-> Unit, 
    valueRange: ClosedFloatingPointRange<Float\>, 
    steps: Int 
): Modifier

Modifier to add semantics signifying progress of the Stepper/Slider.

Parameters

`value: Float`

Current value of the ProgressIndicator/Slider. If outside of `valueRange` provided, value will be coerced to this range. Must not be NaN.

`enabled: Boolean`

If false then semantics will not be added.

`onValueChange: (Float) -> Unit`

Lambda which updates `value`.

`valueRange: ClosedFloatingPointRange<Float>`

Range of values that value can take. Passed `value` will be coerced to this range.

`steps: Int`

If greater than 0, specifies the amounts of discrete values, evenly distributed between across the whole value range. If 0, any value from the range specified is allowed. Must not be negative.

### Modifier.contentReceiver

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

@ExperimentalFoundationApi 
fun Modifier.contentReceiver( 
    receiveContentListener: ReceiveContentListener 
): Modifier

Configures the current node and any children nodes as a Content Receiver.

Content in this context refers to a `TransferableContent` that could be received from another app through Drag-and-Drop, Copy/Paste, or from the Software Keyboard.

There is no pre-filtering for the received content by media type, e.g. software Keyboard would assume that the app can handle any content that's sent to it. Therefore, it's crucial to check the received content's type and other related information before reading and processing it. Please refer to `TransferableContent.hasMediaType` and `TransferableContent.clipMetadata` to learn more about how to do proper checks on the received item.

Note that only `androidx.compose.foundation.text.input.TextFieldState` override of the text field supports being a content receiver.

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.content.MediaType
import androidx.compose.foundation.content.ReceiveContentListener
import androidx.compose.foundation.content.TransferableContent
import androidx.compose.foundation.content.consume
import androidx.compose.foundation.content.contentReceiver
import androidx.compose.foundation.content.hasMediaType
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.text.input.rememberTextFieldState
import androidx.compose.material.MaterialTheme
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.ImageBitmap

val state \= rememberTextFieldState()
var images by remember { mutableStateOf<List<ImageBitmap>\>(emptyList()) }
var dragging by remember { mutableStateOf(false) }
var hovering by remember { mutableStateOf(false) }
Column {
 Row { images.forEach { Image(bitmap \= it, contentDescription \= null) } }
 // Note that only TextFieldState override of the text field supports contentReceiver
 BasicTextField(
 state \= state,
 modifier \=
 Modifier.background(
 when {
 dragging \-\> Color.Red
 hovering \-\> Color.Green
 else \-\> MaterialTheme.colors.background
 }
 )
 .contentReceiver(
 receiveContentListener \=
 object : ReceiveContentListener {
 override fun onDragStart() {
 dragging \= true
 }

 override fun onDragEnd() {
 hovering \= false
 dragging \= false
 }

 override fun onDragEnter() {
 hovering \= true
 }

 override fun onDragExit() {
 hovering \= false
 }

 override fun onReceive(
 transferableContent: TransferableContent
 ): TransferableContent? {
 if (!transferableContent.hasMediaType(MediaType.Image)) {
 return transferableContent
 }
 val newImages \= mutableListOf<ImageBitmap>()
 return transferableContent
 .consume { item \-\>
 // only consume this item if we can read an imageBitmap
 item.readImageBitmap()?.let {
 newImages += it
 true
 } ?: false
 }
 .also { images \= newImages }
 }
 }
 ),
 )
}

Parameters

`receiveContentListener: ReceiveContentListener`

Listener to respond to the receive event. This interface also includes a set of callbacks for certain Drag-and-Drop state changes. Please checkout `ReceiveContentListener` docs for an explanation of each callback.

See also

`TransferableContent`

`hasMediaType`

### Modifier.onPreRotaryScrollEvent

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.onPreRotaryScrollEvent( 
    onPreRotaryScrollEvent: (RotaryScrollEvent) \-> Boolean 
): Modifier

Adding this `modifier` to the `modifier` parameter of a component will allow it to intercept `RotaryScrollEvent`s if it (or one of its children) is focused.

import androidx.compose.foundation.focusable
import androidx.compose.foundation.gestures.scrollBy
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Switch
import androidx.compose.material.Text
import androidx.compose.material.darkColors
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment.Companion.CenterHorizontally
import androidx.compose.ui.Alignment.Companion.CenterVertically
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.graphics.Color.Companion.White
import androidx.compose.ui.input.rotary.onPreRotaryScrollEvent
import androidx.compose.ui.input.rotary.onRotaryScrollEvent
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.dp

MaterialTheme(colors \= darkColors()) {
 val rowScrollState \= rememberScrollState()
 val columnScrollState \= rememberScrollState()
 val coroutineScope \= rememberCoroutineScope()
 val focusRequester \= remember { FocusRequester() }
 var interceptScroll by remember { mutableStateOf(false) }
 Column(
 Modifier.onPreRotaryScrollEvent {
 // You can intercept an event before it is sent to the child.
 if (interceptScroll) {
 coroutineScope.launch { rowScrollState.scrollBy(it.horizontalScrollPixels) }
 // return true to consume this event.
 true
 } else {
 // return false to ignore this event and continue propagation to the child.
 false
 }
 }
 .onRotaryScrollEvent {
 // If the child does not use the scroll, we get notified here.
 coroutineScope.launch { rowScrollState.scrollBy(it.horizontalScrollPixels) }
 true
 }
 ) {
 Row(
 modifier \= Modifier.align(CenterHorizontally),
 verticalAlignment \= CenterVertically,
 ) {
 Text(
 modifier \= Modifier.width(70.dp),
 text \= if (interceptScroll) "Row" else "Column",
 style \= TextStyle(color \= White),
 )
 Switch(checked \= interceptScroll, onCheckedChange \= { interceptScroll \= it })
 }
 Row(modifier \= Modifier.fillMaxWidth().horizontalScroll(rowScrollState)) {
 repeat(100) {
 Text(
 text \= "row item $it ",
 modifier \= Modifier.align(CenterVertically),
 color \= White,
 )
 }
 }
 Column(
 modifier \=
 Modifier.fillMaxWidth()
 .verticalScroll(columnScrollState)
 .onRotaryScrollEvent {
 coroutineScope.launch {
 columnScrollState.scrollBy(it.verticalScrollPixels)
 }
 true
 }
 .focusRequester(focusRequester)
 .focusable()
 ) {
 repeat(100) {
 Text(
 text \= "column item $it",
 modifier \= Modifier.align(CenterHorizontally),
 color \= White,
 )
 }
 }
 }

 LaunchedEffect(Unit) { focusRequester.requestFocus() }
}

Parameters

`onPreRotaryScrollEvent: (RotaryScrollEvent) -> Boolean`

This callback is invoked when the user interacts with the rotary button on a wear device. It gives ancestors of a focused component the chance to intercept a `RotaryScrollEvent`.

When the user rotates the side button on a wear device, a `RotaryScrollEvent` is sent to the focused item. Before reaching the focused item, this event starts at the root composable, and propagates down the hierarchy towards the focused item. It invokes any `onPreRotaryScrollEvent`s it encounters on ancestors of the focused item. After reaching the focused item, the event propagates up the hierarchy back towards the parent. It invokes any `onRotaryScrollEvent`s it encounters on its way back.

Return true to indicate that you consumed the event and want to stop propagation of this event.

Returns

`Modifier`

true if the event is consumed, false otherwise.

### Modifier.onRotaryScrollEvent

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.onRotaryScrollEvent( 
    onRotaryScrollEvent: (RotaryScrollEvent) \-> Boolean 
): Modifier

Adding this `modifier` to the `modifier` parameter of a component will allow it to intercept `RotaryScrollEvent`s if it (or one of its children) is focused.

import androidx.compose.foundation.focusable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.Text
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment.Companion.CenterHorizontally
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.graphics.Color.Companion.White
import androidx.compose.ui.input.rotary.onRotaryScrollEvent

val scrollState \= rememberScrollState()
val coroutineScope \= rememberCoroutineScope()
val focusRequester \= remember { FocusRequester() }
Column(
 modifier \=
 Modifier.fillMaxWidth()
 .verticalScroll(scrollState)
 .onRotaryScrollEvent {
 coroutineScope.launch {
 scrollState.scrollTo(
 (scrollState.value + it.verticalScrollPixels).roundToInt()
 )
 }
 true
 }
 .focusRequester(focusRequester)
 .focusable()
) {
 repeat(100) {
 Text(text \= "item $it", modifier \= Modifier.align(CenterHorizontally), color \= White)
 }
}

LaunchedEffect(Unit) { focusRequester.requestFocus() }

This sample demonstrates how a parent can add an `onRotaryScrollEvent` modifier to gain access to a `RotaryScrollEvent` when a child does not consume it:

import androidx.compose.foundation.focusable
import androidx.compose.foundation.gestures.scrollBy
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Switch
import androidx.compose.material.Text
import androidx.compose.material.darkColors
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment.Companion.CenterHorizontally
import androidx.compose.ui.Alignment.Companion.CenterVertically
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.graphics.Color.Companion.White
import androidx.compose.ui.input.rotary.onPreRotaryScrollEvent
import androidx.compose.ui.input.rotary.onRotaryScrollEvent
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.dp

MaterialTheme(colors \= darkColors()) {
 val rowScrollState \= rememberScrollState()
 val columnScrollState \= rememberScrollState()
 val coroutineScope \= rememberCoroutineScope()
 val focusRequester \= remember { FocusRequester() }
 var interceptScroll by remember { mutableStateOf(false) }
 Column(
 Modifier.onPreRotaryScrollEvent {
 // You can intercept an event before it is sent to the child.
 if (interceptScroll) {
 coroutineScope.launch { rowScrollState.scrollBy(it.horizontalScrollPixels) }
 // return true to consume this event.
 true
 } else {
 // return false to ignore this event and continue propagation to the child.
 false
 }
 }
 .onRotaryScrollEvent {
 // If the child does not use the scroll, we get notified here.
 coroutineScope.launch { rowScrollState.scrollBy(it.horizontalScrollPixels) }
 true
 }
 ) {
 Row(
 modifier \= Modifier.align(CenterHorizontally),
 verticalAlignment \= CenterVertically,
 ) {
 Text(
 modifier \= Modifier.width(70.dp),
 text \= if (interceptScroll) "Row" else "Column",
 style \= TextStyle(color \= White),
 )
 Switch(checked \= interceptScroll, onCheckedChange \= { interceptScroll \= it })
 }
 Row(modifier \= Modifier.fillMaxWidth().horizontalScroll(rowScrollState)) {
 repeat(100) {
 Text(
 text \= "row item $it ",
 modifier \= Modifier.align(CenterVertically),
 color \= White,
 )
 }
 }
 Column(
 modifier \=
 Modifier.fillMaxWidth()
 .verticalScroll(columnScrollState)
 .onRotaryScrollEvent {
 coroutineScope.launch {
 columnScrollState.scrollBy(it.verticalScrollPixels)
 }
 true
 }
 .focusRequester(focusRequester)
 .focusable()
 ) {
 repeat(100) {
 Text(
 text \= "column item $it",
 modifier \= Modifier.align(CenterHorizontally),
 color \= White,
 )
 }
 }
 }

 LaunchedEffect(Unit) { focusRequester.requestFocus() }
}

Parameters

`onRotaryScrollEvent: (RotaryScrollEvent) -> Boolean`

This callback is invoked when the user interacts with the rotary side button or the bezel on a wear device. While implementing this callback, return true to stop propagation of this event. If you return false, the event will be sent to this `onRotaryScrollEvent`'s parent.

Returns

`Modifier`

true if the event is consumed, false otherwise.

Here is an example of a scrollable container that scrolls in response to `RotaryScrollEvent`s.

### Modifier.rotaryScrollable

android

Artifact: androidx.wear.compose:compose-foundation

View Source

fun Modifier.rotaryScrollable( 
    behavior: RotaryScrollableBehavior, 
    focusRequester: FocusRequester, 
    reverseDirection: Boolean = false, 
    overscrollEffect: OverscrollEffect? = null 
): Modifier

A modifier which connects rotary events with scrollable containers such as Column, LazyList and others. `ScalingLazyColumn` has a build-in rotary support, and accepts `RotaryScrollableBehavior` directly as a parameter.

This modifier handles rotary input devices, used for scrolling. These devices can be categorized as high-resolution or low-resolution based on their precision.

* High-res devices: Offer finer control and can detect smaller rotations. This allows for more precise adjustments during scrolling. One example of a high-res device is the crown (also known as rotating side button), located on the side of the watch.
 
* Low-res devices: Have less granular control, registering larger rotations at a time. Scrolling behavior is adapted to compensate for these larger jumps. Examples include physical or virtual bezels, positioned around the screen.

This modifier supports rotary scrolling and snapping. The behaviour is configured by the provided `RotaryScrollableBehavior`: either provide `RotaryScrollableDefaults.behavior` for scrolling with/without fling or pass `RotaryScrollableDefaults.snapBehavior` when snap is required.

The default scroll direction of this modifier is aligned with the scroll direction of the `Modifier.verticalScroll` and `Modifier.horizontalScroll`, (please be aware that `Modifier.scrollable` has the opposite direction by default).

To keep the scroll direction aligned, `reverseDirection` flag should have the same value as the `reverseScrolling` parameter in `Modifier.verticalScroll` and `Modifier.horizontalScroll`, and the opposite value to the `reverseDirection` parameter used in `Modifier.scrollable`. When used for horizontal scrolling, RTL/LTR orientations should be taken into account, as these can affect the expected scroll behavior. It's recommended to use `ScrollableDefaults.reverseDirection` for handling LTR/RTL layouts for horizontal scrolling.

This overload provides the access to `OverscrollEffect` that defines the behaviour of the rotary over scrolling logic. Use `androidx.compose.foundation.rememberOverscrollEffect` to create an instance of the current provided overscroll implementation.

Example of scrolling with fling:

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.text.BasicText
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.wear.compose.foundation.requestFocusOnHierarchyActive
import androidx.wear.compose.foundation.rotary.RotaryScrollableDefaults
import androidx.wear.compose.foundation.rotary.rotaryScrollable
import androidx.wear.compose.material.Text

val scrollableState \= rememberLazyListState()
val focusRequester \= remember { FocusRequester() }
LazyColumn(
 modifier \=
 Modifier.fillMaxSize()
 .requestFocusOnHierarchyActive()
 .rotaryScrollable(
 behavior \= RotaryScrollableDefaults.behavior(scrollableState),
 focusRequester \= focusRequester,
 ),
 horizontalAlignment \= Alignment.CenterHorizontally,
 state \= scrollableState,
) {
 items(300) {
 BasicText(
 text \= "item $it",
 modifier \= Modifier.background(Color.Gray),
 style \= TextStyle.Default.copy(),
 )
 }
}

Example of scrolling with snap:

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.text.BasicText
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.util.fastSumBy
import androidx.wear.compose.foundation.requestFocusOnHierarchyActive
import androidx.wear.compose.foundation.rotary.RotaryScrollableDefaults
import androidx.wear.compose.foundation.rotary.RotarySnapLayoutInfoProvider
import androidx.wear.compose.foundation.rotary.rotaryScrollable
import androidx.wear.compose.material.Text

val scrollableState \= rememberLazyListState()
val focusRequester \= remember { FocusRequester() }
LazyColumn(
 modifier \=
 Modifier.fillMaxSize()
 .requestFocusOnHierarchyActive()
 .rotaryScrollable(
 behavior \=
 RotaryScrollableDefaults.snapBehavior(
 scrollableState,
 // This sample has a custom implementation of
 // RotarySnapLayoutInfoProvider which is required for snapping behavior.
 // ScalingLazyColumn has it built-in, so it's not required there.
 remember(scrollableState) {
 object : RotarySnapLayoutInfoProvider {

 override val averageItemSize: Float
 get() {
 val items \= scrollableState.layoutInfo.visibleItemsInfo
 return (items.fastSumBy { it.size } / items.size)
 .toFloat()
 }

 override val currentItemIndex: Int
 get() \= scrollableState.firstVisibleItemIndex

 override val currentItemOffset: Float
 get() \=
 scrollableState.firstVisibleItemScrollOffset.toFloat()

 override val totalItemCount: Int
 get() \= scrollableState.layoutInfo.totalItemsCount
 }
 },
 ),
 focusRequester \= focusRequester,
 ),
 horizontalAlignment \= Alignment.CenterHorizontally,
 state \= scrollableState,
) {
 items(300) {
 BasicText(text \= "item $it", modifier \= Modifier.background(Color.Gray).height(50.dp))
 }
}

Example of scrolling with overscroll:

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.overscroll
import androidx.compose.foundation.rememberOverscrollEffect
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.wear.compose.foundation.requestFocusOnHierarchyActive
import androidx.wear.compose.foundation.rotary.RotaryScrollableDefaults
import androidx.wear.compose.foundation.rotary.rotaryScrollable
import androidx.wear.compose.material.Text

val scrollableState \= rememberScrollState()
val focusRequester \= remember { FocusRequester() }
val overscrollEffect \= rememberOverscrollEffect()

val screenHeightDp \= LocalConfiguration.current.screenHeightDp.dp

Column(
 Modifier.fillMaxSize()
 .requestFocusOnHierarchyActive()
 .rotaryScrollable(
 behavior \= RotaryScrollableDefaults.behavior(scrollableState),
 focusRequester \= focusRequester,
 overscrollEffect \= overscrollEffect,
 )
 .verticalScroll(scrollableState, overscrollEffect)
 .overscroll(overscrollEffect),
 horizontalAlignment \= Alignment.CenterHorizontally,
) {
 Text("Top")
 Spacer(modifier \= Modifier.height(screenHeightDp / 2))
 Text("Scroll this list up and down with rotary input", textAlign \= TextAlign.Center)
 Spacer(modifier \= Modifier.height(screenHeightDp / 2))
 Text("Bottom")
}

Parameters

`behavior: RotaryScrollableBehavior`

Specified `RotaryScrollableBehavior` for rotary handling with snap or fling.

`focusRequester: FocusRequester`

Used to request the focus for rotary input. Each composable with this modifier should have a separate focusRequester, and only one of them at a time can be active. We recommend using `requestFocusOnHierarchyActive` and passing this focusRequester to it to handle requesting focus, as this will guarantee the proper behavior.

`reverseDirection: Boolean = false`

Reverses the direction of the rotary scroll. This direction should be aligned with the general touch scroll direction - and should be reversed if, for example, it was reversed in `.verticalScroll` or `.horizontalScroll` modifiers. If used with a `.scrollable` modifier - the scroll direction should be the opposite to the one specified there. When used for horizontal scrolling, RTL/LTR orientations should be taken into account, as these can affect the expected scroll behavior. It's recommended to use `ScrollableDefaults.reverseDirection` for handling LTR/RTL layouts for horizontal scrolling.

`overscrollEffect: OverscrollEffect? = null`

effect to which the deltas will be fed when the scrollable have some scrolling delta left. Pass `null` for no overscroll. If you pass an effect you should also apply `androidx.compose.foundation.overscroll` modifier.

### Modifier.rotate

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.rotate(degrees: Float): Modifier

Sets the degrees the view is rotated around the center of the composable. Increasing values result in clockwise rotation. Negative degrees are used to rotate in the counter clockwise direction

Usage of this API renders this composable into a separate graphics layer.

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.unit.dp

Box(Modifier.rotate(45f).size(100.dp, 100.dp))

See also

`graphicsLayer`

Example usage:

### Modifier.fitInside

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.fitInside(rulers: RectRulers): Modifier

Fits the contents within `rulers`. This only works when `Constraints` have `fixed width` and `fixed height`. This can be accomplished, for example, by having `Modifier.size`, or `Modifier.fillMaxSize`, or other size modifier before `fitInside`. If the `Constraints` sizes aren't fixed, `fitInside` will size the child to the `Constraints` and try to center the content within `rulers`.

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fitInside
import androidx.compose.foundation.layout.fitOutside
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.WindowInsetsRulers.Companion.NavigationBars
import androidx.compose.ui.layout.WindowInsetsRulers.Companion.SafeContent
import androidx.compose.ui.layout.WindowInsetsRulers.Companion.StatusBars

Box(Modifier.fillMaxSize()) {
 // Drawn behind the status bar
 Box(Modifier.fillMaxSize().fitOutside(StatusBars.current).background(Color.Blue))
 // Drawn behind the navigation bar
 Box(Modifier.fillMaxSize().fitOutside(NavigationBars.current).background(Color.Red))
 // Body of the app
 Box(Modifier.fillMaxSize().fitInside(SafeContent.current).background(Color.Yellow))
}

See also

`fitOutside`

### Modifier.fitOutside

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.fitOutside(rulers: RectRulers): Modifier

If one of the `Ruler`s in `rulers` has a value within the bounds of the Layout, this sizes the content to that `Ruler` and the edge. If multiple `Ruler`s have a value within the space, only one is chosen, in this order: `RectRulers.left`, `RectRulers.top`, `RectRulers.right`, `RectRulers.bottom`. This only works when `Constraints` have `fixed width` and `fixed height`. This can be accomplished, for example, by having `Modifier.size`, or `Modifier.fillMaxSize`, or other size modifier before `fitOutside`. If the `Constraints` sizes aren't fixed, or there are no `Ruler`s within the bounds of the layout, `fitOutside` will size the content area to 0x0.

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fitInside
import androidx.compose.foundation.layout.fitOutside
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.WindowInsetsRulers.Companion.NavigationBars
import androidx.compose.ui.layout.WindowInsetsRulers.Companion.SafeContent
import androidx.compose.ui.layout.WindowInsetsRulers.Companion.StatusBars

Box(Modifier.fillMaxSize()) {
 // Drawn behind the status bar
 Box(Modifier.fillMaxSize().fitOutside(StatusBars.current).background(Color.Blue))
 // Drawn behind the navigation bar
 Box(Modifier.fillMaxSize().fitOutside(NavigationBars.current).background(Color.Red))
 // Body of the app
 Box(Modifier.fillMaxSize().fitInside(SafeContent.current).background(Color.Yellow))
}

See also

`fitInside`

### Modifier.scale

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.scale(scale: Float): Modifier

Scale the contents of both the horizontal and vertical axis uniformly by the same scale factor.

Usage of this API renders this composable into a separate graphics layer

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.scale
import androidx.compose.ui.unit.dp

Box(Modifier.scale(2f).size(100.dp, 100.dp))

Parameters

`scale: Float`

Multiplier to scale content along the horizontal and vertical axis

See also

`graphicsLayer`

Example usage:

### Modifier.scale

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.scale(scaleX: Float, scaleY: Float): Modifier

Scale the contents of the composable by the following scale factors along the horizontal and vertical axis respectively. Negative scale factors can be used to mirror content across the corresponding horizontal or vertical axis.

Example usage:

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.scale
import androidx.compose.ui.unit.dp

Box(Modifier.scale(scaleX \= 2f, scaleY \= 3f).size(100.dp, 100.dp))

Usage of this API renders this composable into a separate graphics layer

Parameters

`scaleX: Float`

Multiplier to scale content along the horizontal axis

`scaleY: Float`

Multiplier to scale content along the vertical axis

See also

`graphicsLayer`

### Modifier.scrollAway

android

Artifact: androidx.wear.compose:compose-material3

View Source

fun Modifier.scrollAway( 
    scrollInfoProvider: ScrollInfoProvider, 
    screenStage: () \-> ScreenStage 
): Modifier

Scroll an item vertically in/out of view based on scroll state provided by a scrolling list. Typically used to scroll a `TimeText` item out of view as the user starts to scroll a vertically scrollable list of items upwards and bring additional items into view.

Example of using ScrollAway directly (in practice, it is recommended to use `AppScaffold` and `ScreenScaffold` to provide the correct scroll away behavior by default):

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.wear.compose.foundation.ScrollInfoProvider
import androidx.wear.compose.foundation.lazy.ScalingLazyColumn
import androidx.wear.compose.foundation.lazy.rememberScalingLazyListState
import androidx.wear.compose.material3.FilledTonalButton
import androidx.wear.compose.material3.ListHeader
import androidx.wear.compose.material3.ScreenStage
import androidx.wear.compose.material3.Text
import androidx.wear.compose.material3.TimeText
import androidx.wear.compose.material3.curvedText
import androidx.wear.compose.material3.scrollAway
import androidx.wear.compose.material3.timeTextSeparator

val state \= rememberScalingLazyListState()

Box(modifier \= Modifier.fillMaxSize()) {
 ScalingLazyColumn(state \= state, modifier \= Modifier.fillMaxSize()) {
 item {
 ListHeader {
 Text(
 modifier \= Modifier.fillMaxWidth(),
 text \= "ScalingLazyColumn",
 textAlign \= TextAlign.Center,
 )
 }
 }
 items(50) {
 FilledTonalButton(
 modifier \= Modifier.fillMaxWidth().padding(horizontal \= 36.dp),
 onClick \= {},
 label \= { Text("Item ${it + 1}") },
 )
 }
 }
 TimeText(
 // In practice, it is recommended to use the \[AppScaffold\] and \[ScreenScaffold\],
 // so that the Material3 scroll away behavior is provided by default, rather than using
 // \[Modifier.scrollAway\] directly.
 modifier \=
 Modifier.scrollAway(
 scrollInfoProvider \= ScrollInfoProvider(state),
 screenStage \= {
 if (state.isScrollInProgress) ScreenStage.Scrolling else ScreenStage.Idle
 },
 ),
 content \= { time \-\>
 curvedText("ScrollAway")
 timeTextSeparator()
 curvedText(time)
 },
 )
}

Parameters

`scrollInfoProvider: ScrollInfoProvider`

Used as the basis for the scroll-away implementation, based on the state of the scrollable container. See `ScrollInfoProvider` methods for creating a ScrollInfoProvider from common lists such as `ScalingLazyListState`.

`screenStage: () -> ScreenStage`

Function that returns the screen stage of the active screen. Scrolled away items are shown when the screen is new, then scrolled away or hidden when scrolling, and finally shown again when idle.

### Modifier.scrollAway

android

Artifact: androidx.wear.compose:compose-material

View Source

fun Modifier.scrollAway(scrollState: ScrollState, offset: Dp = 0.dp): Modifier

Scroll an item vertically in/out of view based on a `ScrollState`. Typically used to scroll a `TimeText` item out of view as the user starts to scroll a vertically scrollable `Column` of items upwards and bring additional items into view.

Parameters

`scrollState: ScrollState`

The `ScrollState` to used as the basis for the scroll-away.

`offset: Dp = 0.dp`

Adjustment to the starting point for scrolling away. Positive values result in the scroll away starting later.

### Modifier.scrollAway

android

Artifact: androidx.wear.compose:compose-material

View Source

fun Modifier.scrollAway( 
    scrollState: LazyListState, 
    itemIndex: Int = 0, 
    offset: Dp = 0.dp 
): Modifier

Scroll an item vertically in/out of view based on a `LazyListState`. Typically used to scroll a `TimeText` item out of view as the user starts to scroll a `LazyColumn` of items upwards and bring additional items into view.

Parameters

`scrollState: LazyListState`

The `LazyListState` to used as the basis for the scroll-away.

`itemIndex: Int = 0`

The item for which the scroll offset will trigger scrolling away.

`offset: Dp = 0.dp`

Adjustment to the starting point for scrolling away. Positive values result in the scroll away starting later.

### Modifier.scrollAway

android

Artifact: androidx.wear.compose:compose-material

View Source

fun Modifier.scrollAway( 
    scrollState: ScalingLazyListState, 
    itemIndex: Int = 1, 
    offset: Dp = 0.dp 
): Modifier

Scroll an item vertically in/out of view based on a `ScalingLazyListState`. Typically used to scroll a `TimeText` item out of view as the user starts to scroll a `ScalingLazyColumn` of items upwards and bring additional items into view.

Parameters

`scrollState: ScalingLazyListState`

The `ScalingLazyListState` to used as the basis for the scroll-away.

`itemIndex: Int = 1`

The item for which the scroll offset will trigger scrolling away.

`offset: Dp = 0.dp`

Adjustment to the starting point for scrolling away. Positive values result in the scroll away starting later, negative values start scrolling away earlier.

### Modifier.scrollAway

android

Artifact: androidx.wear.compose:compose-material

View Source

fun Modifier.scrollAway( 
    scrollState: ScalingLazyListState, 
    itemIndex: Int = 1, 
    offset: Dp = 0.dp 
): Modifier

Scroll an item vertically in/out of view based on a `ScalingLazyListState`. Typically used to scroll a `TimeText` item out of view as the user starts to scroll a `ScalingLazyColumn` of items upwards and bring additional items into view.

Parameters

`scrollState: ScalingLazyListState`

The `ScalingLazyListState` to used as the basis for the scroll-away.

`itemIndex: Int = 1`

The item for which the scroll offset will trigger scrolling away.

`offset: Dp = 0.dp`

Adjustment to the starting point for scrolling away. Positive values result in the scroll away starting later, negative values start scrolling away earlier.

### Modifier.horizontalScroll

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.horizontalScroll( 
    state: ScrollState, 
    enabled: Boolean = true, 
    flingBehavior: FlingBehavior? = null, 
    reverseScrolling: Boolean = false 
): Modifier

Modify element to allow to scroll horizontally when width of the content is bigger than max constraints allow.

import androidx.compose.foundation.background
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.TileMode
import androidx.compose.ui.unit.dp

val scrollState \= rememberScrollState()
val gradient \=
 Brush.horizontalGradient(
 listOf(Color.Red, Color.Blue, Color.Green),
 0.0f,
 10000.0f,
 TileMode.Repeated,
 )
Box(
 Modifier.horizontalScroll(scrollState)
 .size(width \= 10000.dp, height \= 200.dp)
 .background(brush \= gradient)
)

In order to use this modifier, you need to create and own `ScrollState`

See the other overload in order to provide a custom `OverscrollEffect`

Parameters

`state: ScrollState`

state of the scroll

`enabled: Boolean = true`

whether or not scrolling via touch input is enabled

`flingBehavior: FlingBehavior? = null`

logic describing fling behavior when drag has finished with velocity. If `null`, default from `ScrollableDefaults.flingBehavior` will be used.

`reverseScrolling: Boolean = false`

reverse the direction of scrolling, when `true`, 0 `ScrollState.value` will mean right, when `false`, 0 `ScrollState.value` will mean left

See also

`rememberScrollState`

### Modifier.horizontalScroll

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.horizontalScroll( 
    state: ScrollState, 
    overscrollEffect: OverscrollEffect?, 
    enabled: Boolean = true, 
    flingBehavior: FlingBehavior? = null, 
    reverseScrolling: Boolean = false 
): Modifier

Modify element to allow to scroll horizontally when width of the content is bigger than max constraints allow.

import androidx.compose.foundation.background
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.TileMode
import androidx.compose.ui.unit.dp

val scrollState \= rememberScrollState()
val gradient \=
 Brush.horizontalGradient(
 listOf(Color.Red, Color.Blue, Color.Green),
 0.0f,
 10000.0f,
 TileMode.Repeated,
 )
Box(
 Modifier.horizontalScroll(scrollState)
 .size(width \= 10000.dp, height \= 200.dp)
 .background(brush \= gradient)
)

In order to use this modifier, you need to create and own `ScrollState`

Parameters

`state: ScrollState`

state of the scroll

`overscrollEffect: OverscrollEffect?`

the `OverscrollEffect` that will be used to render overscroll for this modifier. Note that the `OverscrollEffect.node` will be applied internally as well - you do not need to use Modifier.overscroll separately.

`enabled: Boolean = true`

whether or not scrolling via touch input is enabled

`flingBehavior: FlingBehavior? = null`

logic describing fling behavior when drag has finished with velocity. If `null`, default from `ScrollableDefaults.flingBehavior` will be used.

`reverseScrolling: Boolean = false`

reverse the direction of scrolling, when `true`, 0 `ScrollState.value` will mean right, when `false`, 0 `ScrollState.value` will mean left

See also

`rememberScrollState`

### Modifier.verticalScroll

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.verticalScroll( 
    state: ScrollState, 
    enabled: Boolean = true, 
    flingBehavior: FlingBehavior? = null, 
    reverseScrolling: Boolean = false 
): Modifier

Modify element to allow to scroll vertically when height of the content is bigger than max constraints allow.

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.requiredHeight
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.TileMode
import androidx.compose.ui.unit.dp

val scrollState \= rememberScrollState()
val gradient \=
 Brush.verticalGradient(
 listOf(Color.Red, Color.Blue, Color.Green),
 0.0f,
 10000.0f,
 TileMode.Repeated,
 )
Box(
 Modifier.verticalScroll(scrollState)
 .fillMaxWidth()
 .requiredHeight(10000.dp)
 .background(brush \= gradient)
)

In order to use this modifier, you need to create and own `ScrollState`

See the other overload in order to provide a custom `OverscrollEffect`

Parameters

`state: ScrollState`

state of the scroll

`enabled: Boolean = true`

whether or not scrolling via touch input is enabled

`flingBehavior: FlingBehavior? = null`

logic describing fling behavior when drag has finished with velocity. If `null`, default from `ScrollableDefaults.flingBehavior` will be used.

`reverseScrolling: Boolean = false`

reverse the direction of scrolling, when `true`, 0 `ScrollState.value` will mean bottom, when `false`, 0 `ScrollState.value` will mean top

See also

`rememberScrollState`

### Modifier.verticalScroll

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.verticalScroll( 
    state: ScrollState, 
    overscrollEffect: OverscrollEffect?, 
    enabled: Boolean = true, 
    flingBehavior: FlingBehavior? = null, 
    reverseScrolling: Boolean = false 
): Modifier

Modify element to allow to scroll vertically when height of the content is bigger than max constraints allow.

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.requiredHeight
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.TileMode
import androidx.compose.ui.unit.dp

val scrollState \= rememberScrollState()
val gradient \=
 Brush.verticalGradient(
 listOf(Color.Red, Color.Blue, Color.Green),
 0.0f,
 10000.0f,
 TileMode.Repeated,
 )
Box(
 Modifier.verticalScroll(scrollState)
 .fillMaxWidth()
 .requiredHeight(10000.dp)
 .background(brush \= gradient)
)

In order to use this modifier, you need to create and own `ScrollState`

Parameters

`state: ScrollState`

state of the scroll

`overscrollEffect: OverscrollEffect?`

the `OverscrollEffect` that will be used to render overscroll for this modifier. Note that the `OverscrollEffect.node` will be applied internally as well - you do not need to use Modifier.overscroll separately.

`enabled: Boolean = true`

whether or not scrolling via touch input is enabled

`flingBehavior: FlingBehavior? = null`

logic describing fling behavior when drag has finished with velocity. If `null`, default from `ScrollableDefaults.flingBehavior` will be used.

`reverseScrolling: Boolean = false`

reverse the direction of scrolling, when `true`, 0 `ScrollState.value` will mean bottom, when `false`, 0 `ScrollState.value` will mean top

See also

`rememberScrollState`

### Modifier.scrollable2D

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.scrollable2D( 
    state: Scrollable2DState, 
    enabled: Boolean = true, 
    overscrollEffect: OverscrollEffect? = null, 
    flingBehavior: FlingBehavior? = null, 
    interactionSource: MutableInteractionSource? = null 
): Modifier

Configure touch scrolling and flinging for the UI element in both XY orientations.

Users should update their state themselves using default `Scrollable2DState` and its `consumeScrollDelta` callback or by implementing `Scrollable2DState` interface manually and reflect their own state in UI when using this component.

If you don't need to have fling or nested scroll support, but want to make component simply draggable, consider using `draggable2D`. If you're only interested in a single direction scroll, consider using `scrollable`.

This overload provides the access to `OverscrollEffect` that defines the behaviour of the over scrolling logic. Use `androidx.compose.foundation.rememberOverscrollEffect` to create an instance of the current provided overscroll implementation.

import androidx.compose.foundation.background
import androidx.compose.foundation.gestures.rememberScrollable2DState
import androidx.compose.foundation.gestures.scrollable2D
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.material.Text
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

// actual composable state that we will show on UI and update in \`Scrollable\`
val offset \= remember { mutableStateOf(Offset.Zero) }
Box(
 Modifier.size(150.dp)
 .scrollable2D(
 // state for Scrollable, describes how to consume scroll amount
 state \=
 rememberScrollable2DState { delta \-\>
 // use the scroll data and indicate how much this element consumed.
 // unconsumed deltas will be propagated to nested scrollables (if present)
 offset.value \= offset.value + delta // update the state
 delta // indicate that we consumed all the pixels available
 }
 )
 .background(Color.LightGray),
 contentAlignment \= Alignment.Center,
) {
 // Modifier.scrollable is not opinionated about its children's layouts. It will however
 // promote nested scrolling capabilities if those children also use the modifier.
 // The modifier will not change any layouts so one must handle any desired changes through
 // the delta values in the scrollable state
 Text(
 "X=${offset.value.x.roundToInt()} Y=${offset.value.y.roundToInt()}",
 style \= TextStyle(fontSize \= 32.sp),
 )
}

Parameters

`state: Scrollable2DState`

`Scrollable2DState` state of the scrollable. Defines how scroll events will be interpreted by the user land logic and contains useful information about on-going events.

`enabled: Boolean = true`

whether or not scrolling is enabled

`overscrollEffect: OverscrollEffect? = null`

effect to which the deltas will be fed when the scrollable have some scrolling delta left. Pass `null` for no overscroll. If you pass an effect you should also apply `androidx.compose.foundation.overscroll` modifier.

`flingBehavior: FlingBehavior? = null`

logic describing fling behavior when drag has finished with velocity. If `null`, default from `ScrollableDefaults.flingBehavior` will be used.

`interactionSource: MutableInteractionSource? = null`

`MutableInteractionSource` that will be used to emit drag events when this scrollable is being dragged.

### Modifier.scrollableArea

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.scrollableArea( 
    state: ScrollableState, 
    orientation: Orientation, 
    enabled: Boolean = true, 
    reverseScrolling: Boolean = false, 
    flingBehavior: FlingBehavior? = null, 
    interactionSource: MutableInteractionSource? = null, 
    bringIntoViewSpec: BringIntoViewSpec? = null 
): Modifier

Configure a component to act as a scrollable area. A scrollable area clips its content to its bounds, renders overscroll, and handles scroll gestures such that the content, not the viewport, moves with the user's gestures.

This modifier is a building block for creating custom scrollable containers, and serves as a higher-level abstraction over `androidx.compose.foundation.gestures.scrollable`. For simpler use cases, prefer higher-level components that are built with `scrollableArea`, such as `verticalScroll` and `androidx.compose.foundation.lazy.LazyColumn`. For example, `verticalScroll` offsets the content in the viewport out of the box to have scrollable container behavior.

The primary distinction between `scrollable` and `scrollableArea` is in how scroll deltas are handled. `scrollableArea` inverts the deltas to provide a natural "content-moving" experience. For instance, dragging a finger up results in a positive scroll delta, which accommodates content moving upwards within the layout. In contrast, the lower-level `scrollable` provides raw, un-inverted deltas, which is useful for custom gesture handling that isn't directly tied to content scrolling.

The direction of scrolling is automatically adjusted based on the `orientation`, the current `androidx.compose.ui.platform.LocalLayoutDirection`, and the `reverseScrolling` flag. Setting `reverseScrolling` to `true` is useful for layouts that grow from the end of the container to the beginning, like a chat feed. In such cases, the content within the container should also be laid out in reverse. The following table summarizes the resulting scroll delta for a user's drag gesture:

`orientation`

`LayoutDirection`

`reverseScrolling`

User Gesture

Scroll Delta

`Vertical`

`Ltr` and `Rtl`

`false`

Drag Up

Positive

`Vertical`

`Ltr` and `Rtl`

`true`

Drag Up

Negative

`Horizontal`

`Ltr`

`false`

Drag Left

Positive

`Horizontal`

`Ltr`

`true`

Drag Left

Negative

`Horizontal`

`Rtl`

`false`

Drag Left

Negative

`Horizontal`

`Rtl`

`true`

Drag Left

Positive

This `scrollableArea` overload uses overscroll provided through `LocalOverscrollFactory` by default. See the other overload to manually provide an `OverscrollEffect` instance, or disable overscroll.

import androidx.compose.foundation.background
import androidx.compose.foundation.gestures.Orientation
import androidx.compose.foundation.gestures.ScrollableState
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.scrollableArea
import androidx.compose.material.Text
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.Layout
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.util.fastCoerceIn

// This sample demonstrates how to create custom scrollable containers using the scrollableArea
// modifier.

// This ScrollableAreaSampleScrollState holds the scroll position and other relevant
// information. It implements the ScrollableState interface, making it compatible with the
// scrollableArea modifier, and is similar in function to the ScrollState used with
// Modifier.verticalScroll.
val scrollState \= rememberScrollableAreaSampleScrollState()

// For lists with many items, consider using a LazyLayout instead
Layout(
 modifier \=
 Modifier.size(150.dp)
 .scrollableArea(scrollState, Orientation.Vertical)
 .background(Color.LightGray),
 content \= {
 repeat(40) {
 Text(
 modifier \= Modifier.padding(vertical \= 2.dp),
 text \= "Item $it",
 fontSize \= 24.sp,
 textAlign \= TextAlign.Center,
 )
 }
 },
) { measurables, constraints \-\>
 var totalHeight \= 0

 val childConstraints \= constraints.copy(minWidth \= 0, minHeight \= 0)
 val placeables \=
 measurables.map { measurable \-\>
 val placeable \= measurable.measure(childConstraints)
 totalHeight += placeable.height
 placeable
 }

 val viewportHeight \= constraints.maxHeight
 // Update the maximum scroll value to not scroll beyond limits and stop when scroll
 // reaches the end.
 scrollState.maxValue \= (totalHeight \- viewportHeight).coerceAtLeast(0)

 // Position the children within the layout.
 layout(constraints.maxWidth, viewportHeight) {
 // The current vertical scroll position, in pixels.
 val scrollY \= scrollState.value
 val viewportCenterY \= scrollY + viewportHeight / 2

 var placeableLayoutPositionY \= 0
 placeables.forEach { placeable \-\>
 // This sample applies a scaling effect to items based on their distance
 // from the center, creating a wheel-like effect.
 val itemCenterY \= placeableLayoutPositionY + placeable.height / 2
 val distanceFromCenter \= abs(itemCenterY \- viewportCenterY)
 val normalizedDistance \=
 (distanceFromCenter / (viewportHeight / 2f)).fastCoerceIn(0f, 1f)

 // Items scale between 0.4 at the edges of the viewport and 1 at the center.
 val scaleFactor \= 1f \- (normalizedDistance \* 0.6f)

 // Place the item horizontally centered with a layer transformation for
 // scaling to achieve wheel-like effect.
 placeable.placeRelativeWithLayer(
 x \= constraints.maxWidth / 2 \- placeable.width / 2,
 // Offset y by the scroll position to make placeable visible in the viewport.
 y \= placeableLayoutPositionY \- scrollY,
 ) {
 scaleX \= scaleFactor
 scaleY \= scaleFactor
 }
 // Move to the next item's vertical position.
 placeableLayoutPositionY += placeable.height
 }
 }
}

Parameters

`state: ScrollableState`

The `ScrollableState` of the component.

`orientation: Orientation`

The `Orientation` of scrolling.

`enabled: Boolean = true`

Whether scrolling is enabled.

`reverseScrolling: Boolean = false`

reverses the direction of scrolling. This is useful for experiences where new items appear at the end and the list grows backwards. When `reverseScrolling` is true, the layout of the content inside the container should also be reversed by the user. For example, in a `verticalScroll`, setting `reverseScrolling` true will cause items to be laid out from bottom to top. When using `scrollableArea` directly in custom list implementations, ensure your layout logic also arranges content in reverse order (e.g. from end to start) to match the scroll behavior.

`flingBehavior: FlingBehavior? = null`

logic describing fling behavior when drag has finished with velocity. If `null`, default from `ScrollableDefaults.flingBehavior` will be used.

`interactionSource: MutableInteractionSource? = null`

an optional hoisted `MutableInteractionSource` for observing and emitting `Interaction`s for this scrollable area. Note that if `null` is provided, interactions will still happen internally.

`bringIntoViewSpec: BringIntoViewSpec? = null`

The configuration that this scrollable area should use to perform scrolling when scroll requests are received from the focus system. If `null` is provided, the system will use the behavior provided by `androidx.compose.foundation.gestures.LocalBringIntoViewSpec` which by default has a platform dependent implementation.

### Modifier.scrollableArea

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.scrollableArea( 
    state: ScrollableState, 
    orientation: Orientation, 
    overscrollEffect: OverscrollEffect?, 
    enabled: Boolean = true, 
    reverseScrolling: Boolean = false, 
    flingBehavior: FlingBehavior? = null, 
    interactionSource: MutableInteractionSource? = null, 
    bringIntoViewSpec: BringIntoViewSpec? = null 
): Modifier

Configure a component to act as a scrollable area. A scrollable area clips its content to its bounds, renders overscroll, and handles scroll gestures such that the content, not the viewport, moves with the user's gestures.

This modifier is a building block for creating custom scrollable containers, and serves as a higher-level abstraction over `androidx.compose.foundation.gestures.scrollable`. For simpler use cases, prefer higher-level components that are built with `scrollableArea`, such as `verticalScroll` and `androidx.compose.foundation.lazy.LazyColumn`. For example, `verticalScroll` offsets the content in the viewport out of the box to have scrollable container behavior.

The primary distinction between `scrollable` and `scrollableArea` is in how scroll deltas are handled. `scrollableArea` inverts the deltas to provide a natural "content-moving" experience. For instance, dragging a finger up results in a positive scroll delta, which accommodates content moving upwards within the layout. In contrast, the lower-level `scrollable` provides raw, un-inverted deltas, which is useful for custom gesture handling that isn't directly tied to content scrolling.

The direction of scrolling is automatically adjusted based on the `orientation`, the current `androidx.compose.ui.platform.LocalLayoutDirection`, and the `reverseScrolling` flag. Setting `reverseScrolling` to `true` is useful for layouts that grow from the end of the container to the beginning, like a chat feed. In such cases, the content within the container should also be laid out in reverse. The following table summarizes the resulting scroll delta for a user's drag gesture:

`orientation`

`LayoutDirection`

`reverseScrolling`

User Gesture

Scroll Delta

`Vertical`

`Ltr` and `Rtl`

`false`

Drag Up

Positive

`Vertical`

`Ltr` and `Rtl`

`true`

Drag Up

Negative

`Horizontal`

`Ltr`

`false`

Drag Left

Positive

`Horizontal`

`Ltr`

`true`

Drag Left

Negative

`Horizontal`

`Rtl`

`false`

Drag Left

Negative

`Horizontal`

`Rtl`

`true`

Drag Left

Positive

This overload allows providing `OverscrollEffect` that will be rendered within the scrollable area. See the other overload of `scrollableArea` in order to use a default `OverscrollEffect` provided by `LocalOverscrollFactory`.

import androidx.compose.foundation.background
import androidx.compose.foundation.gestures.Orientation
import androidx.compose.foundation.gestures.ScrollableState
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.scrollableArea
import androidx.compose.material.Text
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.Layout
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.util.fastCoerceIn

// This sample demonstrates how to create custom scrollable containers using the scrollableArea
// modifier.

// This ScrollableAreaSampleScrollState holds the scroll position and other relevant
// information. It implements the ScrollableState interface, making it compatible with the
// scrollableArea modifier, and is similar in function to the ScrollState used with
// Modifier.verticalScroll.
val scrollState \= rememberScrollableAreaSampleScrollState()

// For lists with many items, consider using a LazyLayout instead
Layout(
 modifier \=
 Modifier.size(150.dp)
 .scrollableArea(scrollState, Orientation.Vertical)
 .background(Color.LightGray),
 content \= {
 repeat(40) {
 Text(
 modifier \= Modifier.padding(vertical \= 2.dp),
 text \= "Item $it",
 fontSize \= 24.sp,
 textAlign \= TextAlign.Center,
 )
 }
 },
) { measurables, constraints \-\>
 var totalHeight \= 0

 val childConstraints \= constraints.copy(minWidth \= 0, minHeight \= 0)
 val placeables \=
 measurables.map { measurable \-\>
 val placeable \= measurable.measure(childConstraints)
 totalHeight += placeable.height
 placeable
 }

 val viewportHeight \= constraints.maxHeight
 // Update the maximum scroll value to not scroll beyond limits and stop when scroll
 // reaches the end.
 scrollState.maxValue \= (totalHeight \- viewportHeight).coerceAtLeast(0)

 // Position the children within the layout.
 layout(constraints.maxWidth, viewportHeight) {
 // The current vertical scroll position, in pixels.
 val scrollY \= scrollState.value
 val viewportCenterY \= scrollY + viewportHeight / 2

 var placeableLayoutPositionY \= 0
 placeables.forEach { placeable \-\>
 // This sample applies a scaling effect to items based on their distance
 // from the center, creating a wheel-like effect.
 val itemCenterY \= placeableLayoutPositionY + placeable.height / 2
 val distanceFromCenter \= abs(itemCenterY \- viewportCenterY)
 val normalizedDistance \=
 (distanceFromCenter / (viewportHeight / 2f)).fastCoerceIn(0f, 1f)

 // Items scale between 0.4 at the edges of the viewport and 1 at the center.
 val scaleFactor \= 1f \- (normalizedDistance \* 0.6f)

 // Place the item horizontally centered with a layer transformation for
 // scaling to achieve wheel-like effect.
 placeable.placeRelativeWithLayer(
 x \= constraints.maxWidth / 2 \- placeable.width / 2,
 // Offset y by the scroll position to make placeable visible in the viewport.
 y \= placeableLayoutPositionY \- scrollY,
 ) {
 scaleX \= scaleFactor
 scaleY \= scaleFactor
 }
 // Move to the next item's vertical position.
 placeableLayoutPositionY += placeable.height
 }
 }
}

Parameters

`state: ScrollableState`

The `ScrollableState` of the component.

`orientation: Orientation`

The `Orientation` of scrolling.

`overscrollEffect: OverscrollEffect?`

the `OverscrollEffect` that will be used to render overscroll for this scrollable area. Note that the `OverscrollEffect.node` will be applied internally as well - you do not need to use Modifier.overscroll separately.

`enabled: Boolean = true`

Whether scrolling is enabled.

`reverseScrolling: Boolean = false`

reverses the direction of scrolling. This is useful for experiences where new items appear at the end and the list grows backwards. When `reverseScrolling` is true, the layout of the content inside the container should also be reversed by the user. For example, in a `verticalScroll`, setting `reverseScrolling` true will cause items to be laid out from bottom to top. When using `scrollableArea` directly in custom list implementations, ensure your layout logic also arranges content in reverse order (e.g. from end to start) to match the scroll behavior.

`flingBehavior: FlingBehavior? = null`

logic describing fling behavior when drag has finished with velocity. If `null`, default from `ScrollableDefaults.flingBehavior` will be used.

`interactionSource: MutableInteractionSource? = null`

an optional hoisted `MutableInteractionSource` for observing and emitting `Interaction`s for this scrollable area. Note that if `null` is provided, interactions will still happen internally.

`bringIntoViewSpec: BringIntoViewSpec? = null`

The configuration that this scrollable area should use to perform scrolling when scroll requests are received from the focus system. If `null` is provided, the system will use the behavior provided by `androidx.compose.foundation.gestures.LocalBringIntoViewSpec` which by default has a platform dependent implementation.

### Modifier.scrollable

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.scrollable( 
    state: ScrollableState, 
    orientation: Orientation, 
    enabled: Boolean = true, 
    reverseDirection: Boolean = false, 
    flingBehavior: FlingBehavior? = null, 
    interactionSource: MutableInteractionSource? = null 
): Modifier

Configure touch scrolling and flinging for the UI element in a single `Orientation`.

Users should update their state themselves using default `ScrollableState` and its `consumeScrollDelta` callback or by implementing `ScrollableState` interface manually and reflect their own state in UI when using this component.

`scrollable` is a low level modifier that handles low level scrolling input gestures, without other behaviors commonly used for scrollable containers. For building scrollable containers, see `androidx.compose.foundation.scrollableArea`. `scrollableArea` clips its content to its bounds, renders overscroll, and adjusts the direction of scroll gestures to ensure that the content moves with the user's gestures. See also `androidx.compose.foundation.verticalScroll` and `androidx.compose.foundation.horizontalScroll` for high level scrollable containers that handle layout and move the content as the user scrolls.

If you don't need to have fling or nested scroll support, but want to make component simply draggable, consider using `draggable`.

import androidx.compose.foundation.background
import androidx.compose.foundation.gestures.Orientation
import androidx.compose.foundation.gestures.rememberScrollableState
import androidx.compose.foundation.gestures.scrollable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.material.Text
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

// actual composable state that we will show on UI and update in \`Scrollable\`
var offset by remember { mutableStateOf(0f) }
Box(
 Modifier.size(150.dp)
 .scrollable(
 orientation \= Orientation.Vertical,
 // state for Scrollable, describes how consume scroll amount
 state \=
 rememberScrollableState { delta \-\>
 // use the scroll data and indicate how much this element consumed.
 // unconsumed deltas will be propagated to nested scrollables (if present)
 offset \= offset + delta // update the state
 delta // indicate that we consumed all the pixels available
 },
 )
 .background(Color.LightGray),
 contentAlignment \= Alignment.Center,
) {
 // Modifier.scrollable is not opinionated about its children's layouts. It will however
 // promote nested scrolling capabilities if those children also use the modifier.
 // The modifier will not change any layouts so one must handle any desired changes
 // through the delta values in the scrollable state
 Text(offset.roundToInt().toString(), style \= TextStyle(fontSize \= 32.sp))
}

Parameters

`state: ScrollableState`

`ScrollableState` state of the scrollable. Defines how scroll events will be interpreted by the user land logic and contains useful information about on-going events.

`orientation: Orientation`

orientation of the scrolling

`enabled: Boolean = true`

whether or not scrolling in enabled

`reverseDirection: Boolean = false`

reverse the direction of the scroll, so top to bottom scroll will behave like bottom to top and left to right will behave like right to left.

`flingBehavior: FlingBehavior? = null`

logic describing fling behavior when drag has finished with velocity. If `null`, default from `ScrollableDefaults.flingBehavior` will be used.

`interactionSource: MutableInteractionSource? = null`

`MutableInteractionSource` that will be used to emit drag events when this scrollable is being dragged.

### Modifier.scrollable

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.scrollable( 
    state: ScrollableState, 
    orientation: Orientation, 
    overscrollEffect: OverscrollEffect?, 
    enabled: Boolean = true, 
    reverseDirection: Boolean = false, 
    flingBehavior: FlingBehavior? = null, 
    interactionSource: MutableInteractionSource? = null, 
    bringIntoViewSpec: BringIntoViewSpec? = null 
): Modifier

Configure touch scrolling and flinging for the UI element in a single `Orientation`.

Users should update their state themselves using default `ScrollableState` and its `consumeScrollDelta` callback or by implementing `ScrollableState` interface manually and reflect their own state in UI when using this component.

`scrollable` is a low level modifier that handles low level scrolling input gestures, without other behaviors commonly used for scrollable containers. For building scrollable containers, see `androidx.compose.foundation.scrollableArea`. `scrollableArea` clips its content to its bounds, renders overscroll, and adjusts the direction of scroll gestures to ensure that the content moves with the user's gestures. See also `androidx.compose.foundation.verticalScroll` and `androidx.compose.foundation.horizontalScroll` for high level scrollable containers that handle layout and move the content as the user scrolls.

If you don't need to have fling or nested scroll support, but want to make component simply draggable, consider using `draggable`.

This overload provides the access to `OverscrollEffect` that defines the behaviour of the over scrolling logic. Use `androidx.compose.foundation.rememberOverscrollEffect` to create an instance of the current provided overscroll implementation. Note: compared to other APIs that accept `overscrollEffect` such as `scrollableArea` and `verticalScroll`, `scrollable` does not render the overscroll, it only provides events. Manually add `androidx.compose.foundation.overscroll` to render the overscroll or use other APIs.

import androidx.compose.foundation.background
import androidx.compose.foundation.gestures.Orientation
import androidx.compose.foundation.gestures.rememberScrollableState
import androidx.compose.foundation.gestures.scrollable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.material.Text
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

// actual composable state that we will show on UI and update in \`Scrollable\`
var offset by remember { mutableStateOf(0f) }
Box(
 Modifier.size(150.dp)
 .scrollable(
 orientation \= Orientation.Vertical,
 // state for Scrollable, describes how consume scroll amount
 state \=
 rememberScrollableState { delta \-\>
 // use the scroll data and indicate how much this element consumed.
 // unconsumed deltas will be propagated to nested scrollables (if present)
 offset \= offset + delta // update the state
 delta // indicate that we consumed all the pixels available
 },
 )
 .background(Color.LightGray),
 contentAlignment \= Alignment.Center,
) {
 // Modifier.scrollable is not opinionated about its children's layouts. It will however
 // promote nested scrolling capabilities if those children also use the modifier.
 // The modifier will not change any layouts so one must handle any desired changes
 // through the delta values in the scrollable state
 Text(offset.roundToInt().toString(), style \= TextStyle(fontSize \= 32.sp))
}

Parameters

`state: ScrollableState`

`ScrollableState` state of the scrollable. Defines how scroll events will be interpreted by the user land logic and contains useful information about on-going events.

`orientation: Orientation`

orientation of the scrolling

`overscrollEffect: OverscrollEffect?`

effect to which the deltas will be fed when the scrollable have some scrolling delta left. Pass `null` for no overscroll. If you pass an effect you should also apply `androidx.compose.foundation.overscroll` modifier.

`enabled: Boolean = true`

whether or not scrolling in enabled

`reverseDirection: Boolean = false`

reverse the direction of the scroll, so top to bottom scroll will behave like bottom to top and left to right will behave like right to left.

`flingBehavior: FlingBehavior? = null`

logic describing fling behavior when drag has finished with velocity. If `null`, default from `ScrollableDefaults.flingBehavior` will be used.

`interactionSource: MutableInteractionSource? = null`

`MutableInteractionSource` that will be used to emit drag events when this scrollable is being dragged.

`bringIntoViewSpec: BringIntoViewSpec? = null`

The configuration that this scrollable should use to perform scrolling when scroll requests are received from the focus system. If null is provided the system will use the behavior provided by `LocalBringIntoViewSpec` which by default has a platform dependent implementation.

### Modifier.selectableGroup

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.selectableGroup(): Modifier

Use this modifier to group a list of `selectable` items like Tabs or RadioButtons together for accessibility purpose.

See also

`selectableGroup`

### Modifier.selectable

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.selectable( 
    selected: Boolean, 
    enabled: Boolean = true, 
    role: Role? = null, 
    interactionSource: MutableInteractionSource? = null, 
    onClick: () \-> Unit 
): Modifier

Configure component to be selectable, usually as a part of a mutually exclusive group, where only one item can be selected at any point in time. A typical example of mutually exclusive set is a RadioGroup or a row of Tabs. To ensure correct accessibility behavior, make sure to pass `Modifier.selectableGroup` modifier into the RadioGroup or the row.

If you want to make an item support on/off capabilities without being part of a set, consider using `Modifier.toggleable`

This overload will use the `Indication` from `LocalIndication`. Use the other overload to explicitly provide an `Indication` instance. Note that this overload only supports `IndicationNodeFactory` instances provided through `LocalIndication` - it is strongly recommended to migrate to `IndicationNodeFactory`, but you can use the other overload if you still need to support `Indication` instances that are not `IndicationNodeFactory`.

If `interactionSource` is `null`, an internal `MutableInteractionSource` will be lazily created only when needed. This reduces the performance cost of selectable during composition, as creating the `indication` can be delayed until there is an incoming `androidx.compose.foundation.interaction.Interaction`. If you are only passing a remembered `MutableInteractionSource` and you are never using it outside of selectable, it is recommended to instead provide `null` to enable lazy creation. If you need the `Indication` to be created eagerly, provide a remembered `MutableInteractionSource`.

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.selection.selectable
import androidx.compose.material.Text
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

val option1 \= Color.Red
val option2 \= Color.Blue
var selectedOption by remember { mutableStateOf(option1) }
Column {
 Text("Selected: $selectedOption")
 Row {
 listOf(option1, option2).forEach { color \-\>
 val selected \= selectedOption \== color
 Box(
 Modifier.size(100.dp)
 .background(color \= color)
 .selectable(selected \= selected, onClick \= { selectedOption \= color })
 )
 }
 }
}

Parameters

`selected: Boolean`

whether or not this item is selected in a mutually exclusion set

`enabled: Boolean = true`

whether or not this `selectable` will handle input events and appear enabled from a semantics perspective

`role: Role? = null`

the type of user interface element. Accessibility services might use this to describe the element or do customizations

`interactionSource: MutableInteractionSource? = null`

`MutableInteractionSource` that will be used to dispatch PressInteraction.Press when this selectable is pressed. If `null`, an internal `MutableInteractionSource` will be created if needed.

`onClick: () -> Unit`

callback to invoke when this item is clicked

### Modifier.selectable

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.selectable( 
    selected: Boolean, 
    interactionSource: MutableInteractionSource?, 
    indication: Indication?, 
    enabled: Boolean = true, 
    role: Role? = null, 
    onClick: () \-> Unit 
): Modifier

Configure component to be selectable, usually as a part of a mutually exclusive group, where only one item can be selected at any point in time. A typical example of mutually exclusive set is a RadioGroup or a row of Tabs. To ensure correct accessibility behavior, make sure to pass `Modifier.selectableGroup` modifier into the RadioGroup or the row.

If you want to make an item support on/off capabilities without being part of a set, consider using `Modifier.toggleable`

If `interactionSource` is `null`, and `indication` is an `IndicationNodeFactory`, an internal `MutableInteractionSource` will be lazily created along with the `indication` only when needed. This reduces the performance cost of selectable during composition, as creating the `indication` can be delayed until there is an incoming `androidx.compose.foundation.interaction.Interaction`. If you are only passing a remembered `MutableInteractionSource` and you are never using it outside of selectable, it is recommended to instead provide `null` to enable lazy creation. If you need `indication` to be created eagerly, provide a remembered `MutableInteractionSource`.

If `indication` is _not_ an `IndicationNodeFactory`, and instead implements the deprecated `Indication.rememberUpdatedInstance` method, you should explicitly pass a remembered `MutableInteractionSource` as a parameter for `interactionSource` instead of `null`, as this cannot be lazily created inside selectable.

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.selection.selectable
import androidx.compose.material.Text
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

val option1 \= Color.Red
val option2 \= Color.Blue
var selectedOption by remember { mutableStateOf(option1) }
Column {
 Text("Selected: $selectedOption")
 Row {
 listOf(option1, option2).forEach { color \-\>
 val selected \= selectedOption \== color
 Box(
 Modifier.size(100.dp)
 .background(color \= color)
 .selectable(selected \= selected, onClick \= { selectedOption \= color })
 )
 }
 }
}

Parameters

`selected: Boolean`

whether or not this item is selected in a mutually exclusion set

`interactionSource: MutableInteractionSource?`

`MutableInteractionSource` that will be used to dispatch PressInteraction.Press when this selectable is pressed. If `null`, an internal `MutableInteractionSource` will be created if needed.

`indication: Indication?`

indication to be shown when the modified element is pressed. By default, the indication from `LocalIndication` will be used. Set to `null` to show no indication, or current value from `LocalIndication` to show theme default

`enabled: Boolean = true`

whether or not this `selectable` will handle input events and appear enabled from a semantics perspective

`role: Role? = null`

the type of user interface element. Accessibility services might use this to describe the element or do customizations

`onClick: () -> Unit`

callback to invoke when this item is clicked

### Modifier.clearAndSetSemantics

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.clearAndSetSemantics(properties: SemanticsPropertyReceiver.() \-> Unit): Modifier

Clears the semantics of all the descendant nodes and sets new semantics.

In the merged semantics tree, this clears the semantic information provided by the node's descendants (but not those of the layout node itself, if any) and sets the provided semantics. (In the unmerged tree, the semantics node is marked with "`SemanticsConfiguration.isClearingSemantics`", but nothing is actually cleared.)

Compose's default semantics provide baseline usability for screen-readers, but this can be used to provide a more polished screen-reader experience: for example, clearing the semantics of a group of tiny buttons, and setting equivalent actions on the card containing them.

Parameters

`properties: SemanticsPropertyReceiver.() -> Unit`

properties to add to the semantics. `SemanticsPropertyReceiver` will be provided in the scope to allow access for common properties and its values.

Note: The `properties` lambda should be used to set semantic properties or semantic actions. Don't call `SemanticsModifierNode.applySemantics` from within the `properties` block. It will result in an infinite loop.

### Modifier.semantics

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.semantics( 
    mergeDescendants: Boolean = false, 
    properties: SemanticsPropertyReceiver.() \-> Unit 
): Modifier

Add semantics key/value pairs to the layout node, for use in testing, accessibility, etc.

The provided lambda receiver scope provides "key = value"-style setters for any `SemanticsPropertyKey`. Additionally, chaining multiple semantics modifiers is also a supported style.

The resulting semantics produce two `SemanticsNode` trees:

The "unmerged tree" rooted at `SemanticsOwner.unmergedRootSemanticsNode` has one `SemanticsNode` per layout node which has any `SemanticsModifier` on it. This `SemanticsNode` contains all the properties set in all the `SemanticsModifier`s on that node.

The "merged tree" rooted at `SemanticsOwner.rootSemanticsNode` has equal-or-fewer nodes: it simplifies the structure based on `mergeDescendants` and `clearAndSetSemantics`. For most purposes (especially accessibility, or the testing of accessibility), the merged semantics tree should be used.

Parameters

`mergeDescendants: Boolean = false`

Whether the semantic information provided by the owning component and its descendants should be treated as one logical entity. Most commonly set on screen-reader-focusable items such as buttons or form fields. In the merged semantics tree, all descendant nodes (except those themselves marked `mergeDescendants`) will disappear from the tree, and their properties will get merged into the parent's configuration (using a merging algorithm that varies based on the type of property -- for example, text properties will get concatenated, separated by commas). In the unmerged semantics tree, the node is simply marked with `SemanticsConfiguration.isMergingSemanticsOfDescendants`.

`properties: SemanticsPropertyReceiver.() -> Unit`

properties to add to the semantics. `SemanticsPropertyReceiver` will be provided in the scope to allow access for common properties and its values.

Note: The `properties` block should be used to set semantic properties or semantic actions. Don't call `SemanticsModifierNode.applySemantics` from within the `properties` block. It will result in an infinite loop.

### Modifier.sensitiveContent

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.sensitiveContent(isContentSensitive: Boolean = true): Modifier

This modifier hints that the composable renders sensitive content (i.e. username, password, credit card etc) on the screen, and the content should be protected during screen share in supported environments.

Parameters

`isContentSensitive: Boolean = true`

whether the content is sensitive or not. Defaults to true.

### Modifier.dropShadow

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.dropShadow(shape: Shape, block: DropShadowScope.() \-> Unit): Modifier

Draws a drop shadow behind the rest of the content with the geometry specified by the given shape and the shadow properties defined the `DropShadowScope`. This is different than `Modifier.shadow` as this does not introduce a graphicsLayer to render elevation based shadows. This shadow is rendered without a single light source and will render consistently regardless of the on screen position of the content. This is similar to `Modifier.dropShadow` except that specification of drop shadow parameters is done with the lambda with `DropShadowScope` allows for more efficient transformations for animated use cases without recomposition.

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.dropShadow
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.graphics.shadow.Shadow
import androidx.compose.ui.unit.dp

Box(Modifier.size(100.dp, 100.dp).dropShadow(RectangleShape, Shadow(12.dp)))

Parameters

`shape: Shape`

Geometry of the shadow

`block: DropShadowScope.() -> Unit`

`DropShadowScope` block where shadow properties are defined

### Modifier.dropShadow

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.dropShadow(shape: Shape, shadow: Shadow): Modifier

Draws a drop shadow behind the rest of the content with the geometry specified by the given shape and the shadow properties defined by the `Shadow`. This is different than `Modifier.shadow` as this does not introduce a graphicsLayer to render elevation based shadows. This shadow is rendered without a single light source and will render consistently regardless of the on screen position of the content.

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.dropShadow
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.graphics.shadow.Shadow
import androidx.compose.ui.unit.dp

Box(Modifier.size(100.dp, 100.dp).dropShadow(RectangleShape, Shadow(12.dp)))

Parameters

`shape: Shape`

Geometry of the shadow

`shadow: Shadow`

Properties of the shadow like radius, spread, offset, and fill properties like the color or brush

### Modifier.innerShadow

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.innerShadow(shape: Shape, block: InnerShadowScope.() \-> Unit): Modifier

Draws an inner shadow behind the rest of the content with the geometry specified by the given shape and the shadow properties defined the `InnerShadowScope`. This is different than `Modifier.shadow` as this does not introduce a graphicsLayer to render elevation based shadows. This shadow is rendered without a single light source and will render consistently regardless of the on screen position of the content. This is similar to `Modifier.innerShadow` except that specification of inner shadow parameters is done with the lambda with `InnerShadowScope` allows for more efficient transformations for animated use cases without recomposition.

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.innerShadow
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.graphics.shadow.Shadow
import androidx.compose.ui.unit.dp

Box(Modifier.size(100.dp, 100.dp).innerShadow(RectangleShape, Shadow(12.dp)))

Parameters

`shape: Shape`

Geometry of the shadow

`block: InnerShadowScope.() -> Unit`

`InnerShadowScope` block where shadow properties are defined

### Modifier.innerShadow

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.innerShadow(shape: Shape, shadow: Shadow): Modifier

Draws an inner shadow on top of the rest of the content with the geometry specified by the given shape and the shadow properties defined by the `Shadow`. This is different than `Modifier.shadow` as this does not introduce a graphicsLayer to render elevation based shadows. Additionally this shadow will render only within the geometry and can be used to provide a recessed like visual effect. This shadow is rendered without a single light source and will render consistently regardless of the on screen position of the content.

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.innerShadow
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.graphics.shadow.Shadow
import androidx.compose.ui.unit.dp

Box(Modifier.size(100.dp, 100.dp).innerShadow(RectangleShape, Shadow(12.dp)))

Parameters

`shape: Shape`

Geometry of the shadow

`shadow: Shadow`

Properties of the shadow like radius, spread, offset, and fill properties like the color or brush

### Modifier.shadow

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.shadow( 
    elevation: Dp, 
    shape: Shape = RectangleShape, 
    clip: Boolean = elevation > 0.dp, 
    ambientColor: Color = DefaultShadowColor, 
    spotColor: Color = DefaultShadowColor 
): Modifier

Creates a `graphicsLayer` that draws a shadow. The `elevation` defines the visual depth of the physical object. The physical object has a shape specified by `shape`.

If the passed `shape` is concave the shadow will not be drawn on Android versions less than 10.

Note that `elevation` is only affecting the shadow size and doesn't change the drawing order. Use a `androidx.compose.ui.zIndex` modifier if you want to draw the elements with larger `elevation` after all the elements with a smaller one.

Note that this parameter is only supported on Android 9 (Pie) and above. On older versions, this property always returns `Color.Black` and setting new values is ignored.

Usage of this API renders this composable into a separate graphics layer

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.unit.dp

Box(Modifier.shadow(12.dp, RectangleShape).size(100.dp, 100.dp))

Parameters

`elevation: Dp`

The elevation for the shadow in pixels

`shape: Shape = RectangleShape`

Defines a shape of the physical object

`clip: Boolean = elevation > 0.dp`

When active, the content drawing clips to the shape.

`ambientColor: Color = DefaultShadowColor`

Color of the ambient shadow drawn when `elevation`\> 0f

`spotColor: Color = DefaultShadowColor`

Color of the spot shadow that is drawn when `elevation`\> 0f

See also

`graphicsLayer`

Example usage:

### Modifier.defaultMinSize

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.defaultMinSize( 
    minWidth: Dp = Dp.Unspecified, 
    minHeight: Dp = Dp.Unspecified 
): Modifier

Constrain the size of the wrapped layout only when it would be otherwise unconstrained: the `minWidth` and `minHeight` constraints are only applied when the incoming corresponding constraint is `0`. The modifier can be used, for example, to define a default min size of a component, while still allowing it to be overidden with smaller min sizes across usages.

Example usage:

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.defaultMinSize
import androidx.compose.foundation.layout.requiredSize
import androidx.compose.foundation.layout.requiredSizeIn
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.sizeIn
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@Composable
fun DefaultMinBox(modifier: Modifier \= Modifier) {
 Box(modifier.defaultMinSize(minWidth \= 100.dp, minHeight \= 100.dp).background(Color.Blue))
}
// This will be a 100.dp x 100.dp blue box. Because we are not providing any min constraints
// to the DefaultMinBox, defaultMinSize will apply its min constraints.
DefaultMinBox()
// This will be a 50.dp x 50.dp blue box. Because we are providing min constraints
// to the DefaultMinBox, defaultMinSize will not apply its min constraints.
DefaultMinBox(Modifier.requiredSizeIn(minWidth \= 50.dp, minHeight \= 50.dp))
// Note that if DefaultMinBox used requiredSizeIn or sizeIn rather than
// defaultMinSize, the min constraints would have been applied with either
// of the above usages.

### Modifier.fillMaxHeight

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.fillMaxHeight( 
    fraction: @FloatRange(from = 0.0, to = 1.0) Float = 1.0f 
): Modifier

Have the content fill (possibly only partially) the `Constraints.maxHeight` of the incoming measurement constraints, by setting the `minimum height` and the `maximum height` to be equal to the `maximum height` multiplied by `fraction`. Note that, by default, the `fraction` is 1, so the modifier will make the content fill the whole available height. If the incoming maximum height is `Constraints.Infinity` this modifier will have no effect.

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.size
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

Box(Modifier.fillMaxHeight().background(Color.Red), contentAlignment \= Alignment.Center) {
 Box(Modifier.size(100.dp).background(color \= Color.Magenta))
}

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.requiredSize
import androidx.compose.foundation.layout.requiredWidth
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

Box(Modifier.requiredSize(100.dp).background(Color.Red), contentAlignment \= Alignment.Center) {
 // The inner Box will be (30.dp x 50.dp).
 Box(Modifier.requiredWidth(30.dp).fillMaxHeight(0.5f).background(color \= Color.Magenta))
}

Parameters

`fraction: @FloatRange(from = 0.0, to = 1.0) Float = 1.0f`

The fraction of the maximum height to use, between `0` and `1`, inclusive.

Example usage:

### Modifier.fillMaxSize

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.fillMaxSize(fraction: @FloatRange(from = 0.0, to = 1.0) Float = 1.0f): Modifier

Have the content fill (possibly only partially) the `Constraints.maxWidth` and `Constraints.maxHeight` of the incoming measurement constraints, by setting the `minimum width` and the `maximum width` to be equal to the `maximum width` multiplied by `fraction`, as well as the `minimum height` and the `maximum height` to be equal to the `maximum height` multiplied by `fraction`. Note that, by default, the `fraction` is 1, so the modifier will make the content fill the whole available space. If the incoming maximum width or height is `Constraints.Infinity` this modifier will have no effect in that dimension.

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.size
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

Box(Modifier.fillMaxSize().background(Color.Red), contentAlignment \= Alignment.Center) {
 Box(Modifier.size(100.dp).background(color \= Color.Magenta))
}

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.requiredSize
import androidx.compose.foundation.layout.requiredWidth
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

Box(Modifier.requiredSize(100.dp).background(Color.Red), contentAlignment \= Alignment.Center) {
 // The inner Box will be (50.dp x 50.dp).
 Box(Modifier.requiredWidth(30.dp).fillMaxSize(0.5f).background(color \= Color.Magenta))
}

Parameters

`fraction: @FloatRange(from = 0.0, to = 1.0) Float = 1.0f`

The fraction of the maximum size to use, between `0` and `1`, inclusive.

Example usage:

### Modifier.fillMaxWidth

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.fillMaxWidth(fraction: @FloatRange(from = 0.0, to = 1.0) Float = 1.0f): Modifier

Have the content fill (possibly only partially) the `Constraints.maxWidth` of the incoming measurement constraints, by setting the `minimum width` and the `maximum width` to be equal to the `maximum width` multiplied by `fraction`. Note that, by default, the `fraction` is 1, so the modifier will make the content fill the whole available width. If the incoming maximum width is `Constraints.Infinity` this modifier will have no effect.

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.size
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

Box(Modifier.fillMaxWidth().background(Color.Red), contentAlignment \= Alignment.Center) {
 Box(Modifier.size(100.dp).background(color \= Color.Magenta))
}

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.requiredHeight
import androidx.compose.foundation.layout.requiredSize
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

Box(Modifier.requiredSize(100.dp).background(Color.Red), contentAlignment \= Alignment.Center) {
 // The inner Box will be (50.dp x 30.dp).
 Box(
 Modifier.fillMaxWidth(fraction \= 0.5f)
 .requiredHeight(30.dp)
 .background(color \= Color.Magenta)
 )
}

Parameters

`fraction: @FloatRange(from = 0.0, to = 1.0) Float = 1.0f`

The fraction of the maximum width to use, between `0` and `1`, inclusive.

Example usage:

### Modifier.height

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.height(height: Dp): Modifier

Declare the preferred height of the content to be exactly `height`dp. The incoming measurement `Constraints` may override this value, forcing the content to be either smaller or larger.

For a modifier that sets the height of the content regardless of the incoming constraints see `Modifier.requiredHeight`. See `width` or `size` to set other preferred dimensions. See `widthIn`, `heightIn` or `sizeIn` to set a preferred size range.

Example usage:

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.height
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

Box { Box(Modifier.height(100.dp).aspectRatio(1f).background(Color.Blue)) }

### Modifier.heightIn

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.heightIn(min: Dp = Dp.Unspecified, max: Dp = Dp.Unspecified): Modifier

Constrain the height of the content to be between `min`dp and `max`dp as permitted by the incoming measurement `Constraints`. If the incoming constraints are more restrictive the requested size will obey the incoming constraints and attempt to be as close as possible to the preferred size.

### Modifier.requiredHeight

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.requiredHeight(height: Dp): Modifier

Declare the height of the content to be exactly `height`dp. The incoming measurement `Constraints` will not override this value. If the content chooses a size that does not satisfy the incoming `Constraints`, the parent layout will be reported a size coerced in the `Constraints`, and the position of the content will be automatically offset to be centered on the space assigned to the child by the parent layout under the assumption that `Constraints` were respected.

See `requiredHeightIn` and `requiredSizeIn` to set a size range. See `height` to set a preferred height, which is only respected when the incoming constraints allow it.

Example usage:

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.requiredHeight
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

// The result is a 50.dp x 50.dp blue box centered in a 100.dp x 100.dp space.
// Note that although a previous modifier asked it to be 100.dp height, this
// will not be respected. They would be respected if height was used instead of requiredHeight.
Box(
 Modifier.requiredHeight(100.dp).requiredHeight(50.dp).aspectRatio(1f).background(Color.Blue)
)

### Modifier.requiredHeightIn

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.requiredHeightIn(min: Dp = Dp.Unspecified, max: Dp = Dp.Unspecified): Modifier

Constrain the height of the content to be between `min`dp and `max`dp. If the content chooses a size that does not satisfy the incoming `Constraints`, the parent layout will be reported a size coerced in the `Constraints`, and the position of the content will be automatically offset to be centered on the space assigned to the child by the parent layout under the assumption that `Constraints` were respected.

### Modifier.requiredSize

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.requiredSize(size: Dp): Modifier

Declare the size of the content to be exactly `size`dp width and height. The incoming measurement `Constraints` will not override this value. If the content chooses a size that does not satisfy the incoming `Constraints`, the parent layout will be reported a size coerced in the `Constraints`, and the position of the content will be automatically offset to be centered on the space assigned to the child by the parent layout under the assumption that `Constraints` were respected.

See `requiredSizeIn` to set a size range. See `size` to set a preferred size, which is only respected when the incoming constraints allow it.

Example usage:

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.requiredSize
import androidx.compose.foundation.layout.size
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

// The result is a 50.dp x 50.dp red box centered in a 100.dp x 100.dp space.
// Note that although a previous modifier asked it to be 100.dp x 100.dp, this
// will not be respected. They would be respected if size was used instead of requiredSize.
Box(Modifier.requiredSize(100.dp, 100.dp).requiredSize(50.dp, 50.dp).background(Color.Red))

### Modifier.requiredSize

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.requiredSize(size: DpSize): Modifier

Declare the size of the content to be exactly `size`. The incoming measurement `Constraints` will not override this value. If the content chooses a size that does not satisfy the incoming `Constraints`, the parent layout will be reported a size coerced in the `Constraints`, and the position of the content will be automatically offset to be centered on the space assigned to the child by the parent layout under the assumption that `Constraints` were respected.

See `requiredSizeIn` to set a size range. See `size` to set a preferred size, which is only respected when the incoming constraints allow it.

### Modifier.requiredSize

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.requiredSize(width: Dp, height: Dp): Modifier

Declare the size of the content to be exactly `width`dp and `height`dp. The incoming measurement `Constraints` will not override this value. If the content chooses a size that does not satisfy the incoming `Constraints`, the parent layout will be reported a size coerced in the `Constraints`, and the position of the content will be automatically offset to be centered on the space assigned to the child by the parent layout under the assumption that `Constraints` were respected.

See `requiredSizeIn` to set a size range. See `size` to set a preferred size, which is only respected when the incoming constraints allow it.

### Modifier.requiredSizeIn

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.requiredSizeIn( 
    minWidth: Dp = Dp.Unspecified, 
    minHeight: Dp = Dp.Unspecified, 
    maxWidth: Dp = Dp.Unspecified, 
    maxHeight: Dp = Dp.Unspecified 
): Modifier

Constrain the width of the content to be between `minWidth`dp and `maxWidth`dp, and the height of the content to be between `minHeight`dp and `maxHeight`dp. If the content chooses a size that does not satisfy the incoming `Constraints`, the parent layout will be reported a size coerced in the `Constraints`, and the position of the content will be automatically offset to be centered on the space assigned to the child by the parent layout under the assumption that `Constraints` were respected.

### Modifier.requiredWidth

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.requiredWidth(width: Dp): Modifier

Declare the width of the content to be exactly `width`dp. The incoming measurement `Constraints` will not override this value. If the content chooses a size that does not satisfy the incoming `Constraints`, the parent layout will be reported a size coerced in the `Constraints`, and the position of the content will be automatically offset to be centered on the space assigned to the child by the parent layout under the assumption that `Constraints` were respected.

See `requiredWidthIn` and `requiredSizeIn` to set a size range. See `width` to set a preferred width, which is only respected when the incoming constraints allow it.

Example usage:

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.requiredWidth
import androidx.compose.foundation.layout.width
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

// The result is a 50.dp x 50.dp magenta box centered in a 100.dp x 100.dp space.
// Note that although a previous modifier asked it to be 100.dp width, this
// will not be respected. They would be respected if width was used instead of requiredWidth.
Box(
 Modifier.requiredWidth(100.dp)
 .requiredWidth(50.dp)
 .aspectRatio(1f)
 .background(Color.Magenta)
)

### Modifier.requiredWidthIn

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.requiredWidthIn(min: Dp = Dp.Unspecified, max: Dp = Dp.Unspecified): Modifier

Constrain the width of the content to be between `min`dp and `max`dp. If the content chooses a size that does not satisfy the incoming `Constraints`, the parent layout will be reported a size coerced in the `Constraints`, and the position of the content will be automatically offset to be centered on the space assigned to the child by the parent layout under the assumption that `Constraints` were respected.

### Modifier.size

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.size(size: Dp): Modifier

Declare the preferred size of the content to be exactly `size`dp square. The incoming measurement `Constraints` may override this value, forcing the content to be either smaller or larger.

For a modifier that sets the size of the content regardless of the incoming constraints, see `Modifier.requiredSize`. See `width` or `height` to set width or height alone. See `widthIn`, `heightIn` or `sizeIn` to set a preferred size range.

Example usage:

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

Box { Box(Modifier.size(100.dp, 100.dp).background(Color.Red)) }

### Modifier.size

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.size(size: DpSize): Modifier

Declare the preferred size of the content to be exactly `size`. The incoming measurement `Constraints` may override this value, forcing the content to be either smaller or larger.

For a modifier that sets the size of the content regardless of the incoming constraints, see `Modifier.requiredSize`. See `width` or `height` to set width or height alone. See `widthIn`, `heightIn` or `sizeIn` to set a preferred size range.

Example usage:

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.DpSize
import androidx.compose.ui.unit.dp

Box { Box(Modifier.size(DpSize(100.dp, 100.dp)).background(Color.Red)) }

### Modifier.size

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.size(width: Dp, height: Dp): Modifier

Declare the preferred size of the content to be exactly `width`dp by `height`dp. The incoming measurement `Constraints` may override this value, forcing the content to be either smaller or larger.

For a modifier that sets the size of the content regardless of the incoming constraints, see `Modifier.requiredSize`. See `width` or `height` to set width or height alone. See `widthIn`, `heightIn` or `sizeIn` to set a preferred size range.

Example usage:

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

Box { Box(Modifier.size(100.dp, 100.dp).background(Color.Red)) }

### Modifier.sizeIn

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.sizeIn( 
    minWidth: Dp = Dp.Unspecified, 
    minHeight: Dp = Dp.Unspecified, 
    maxWidth: Dp = Dp.Unspecified, 
    maxHeight: Dp = Dp.Unspecified 
): Modifier

Constrain the width of the content to be between `minWidth`dp and `maxWidth`dp and the height of the content to be between `minHeight`dp and `maxHeight`dp as permitted by the incoming measurement `Constraints`. If the incoming constraints are more restrictive the requested size will obey the incoming constraints and attempt to be as close as possible to the preferred size.

### Modifier.width

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.width(width: Dp): Modifier

Declare the preferred width of the content to be exactly `width`dp. The incoming measurement `Constraints` may override this value, forcing the content to be either smaller or larger.

For a modifier that sets the width of the content regardless of the incoming constraints see `Modifier.requiredWidth`. See `height` or `size` to set other preferred dimensions. See `widthIn`, `heightIn` or `sizeIn` to set a preferred size range.

Example usage:

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.width
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

Box { Box(Modifier.width(100.dp).aspectRatio(1f).background(Color.Magenta)) }

### Modifier.widthIn

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.widthIn(min: Dp = Dp.Unspecified, max: Dp = Dp.Unspecified): Modifier

Constrain the width of the content to be between `min`dp and `max`dp as permitted by the incoming measurement `Constraints`. If the incoming constraints are more restrictive the requested size will obey the incoming constraints and attempt to be as close as possible to the preferred size.

### Modifier.wrapContentHeight

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.wrapContentHeight( 
    align: Alignment.Vertical = Alignment.CenterVertically, 
    unbounded: Boolean = false 
): Modifier

Allow the content to measure at its desired height without regard for the incoming measurement `minimum height constraint`, and, if `unbounded` is true, also without regard for the incoming measurement `maximum height constraint`. If the content's measured size is smaller than the minimum height constraint, `align` it within that minimum height space. If the content's measured size is larger than the maximum height constraint (only possible when `unbounded` is true), `align` over the maximum height space.

Example usage:

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

// Here the result will be a 50.dp x 20.dp blue box centered vertically in a 50.dp x 50.dp
// space. Because of the size modifier, if wrapContentHeight did not exist,
// the blue rectangle would actually be 50.dp x 50.dp to satisfy the size set by the modifier.
// However, because we provide wrapContentHeight, the blue rectangle is specified to be wrap
// content in height - if the desired height is smaller than 50.dp, it will be centered
// vertically in this space. Therefore the 50.dp x 20.dp is centered vertically in the space.
Box(
 Modifier.size(50.dp)
 .wrapContentHeight(Alignment.CenterVertically)
 .height(20.dp)
 .background(Color.Blue)
)

### Modifier.wrapContentSize

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.wrapContentSize( 
    align: Alignment = Alignment.Center, 
    unbounded: Boolean = false 
): Modifier

Allow the content to measure at its desired size without regard for the incoming measurement `minimum width` or `minimum height` constraints, and, if `unbounded` is true, also without regard for the incoming maximum constraints. If the content's measured size is smaller than the minimum size constraint, `align` it within that minimum sized space. If the content's measured size is larger than the maximum size constraint (only possible when `unbounded` is true), `align` within the maximum space.

Example usage:

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.sizeIn
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

// Here the result will be a 20.dp x 20.dp blue box top-centered in a 40.dp x 40.dp space.
// Because of the sizeIn modifier, if wrapContentSize did not exist, the blue rectangle
// would actually be 40.dp x 40.dp to satisfy the min size set by the modifier. However,
// because we provide wrapContentSize, the blue rectangle is specified to be wrap
// content - if the desired size is smaller than 40.dp x 40.dp, it will be top-centered in
// this space. Therefore the 20.dp x 20.dp is top-centered in the space.
Box(
 Modifier.sizeIn(minWidth \= 40.dp, minHeight \= 40.dp)
 .wrapContentSize(Alignment.TopCenter)
 .size(20.dp)
 .background(Color.Blue)
)

### Modifier.wrapContentWidth

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.wrapContentWidth( 
    align: Alignment.Horizontal = Alignment.CenterHorizontally, 
    unbounded: Boolean = false 
): Modifier

Allow the content to measure at its desired width without regard for the incoming measurement `minimum width constraint`, and, if `unbounded` is true, also without regard for the incoming measurement `maximum width constraint`. If the content's measured size is smaller than the minimum width constraint, `align` it within that minimum width space. If the content's measured size is larger than the maximum width constraint (only possible when `unbounded` is true), `align` over the maximum width space.

Example usage:

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.wrapContentWidth
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

// Here the result will be a 20.dp x 50.dp blue box centered vertically in a 50.dp x 50.dp
// space. Because of the size modifier, if wrapContentWidth did not exist,
// the blue rectangle would actually be 50.dp x 50.dp to satisfy the size set by the modifier.
// However, because we provide wrapContentWidth, the blue rectangle is specified to be wrap
// content in width - if the desired width is smaller than 50.dp, it will be centered
// horizontally in this space. Therefore the 50.dp x 20.dp is centered horizontally
// in the space.
Box(
 Modifier.size(50.dp)
 .wrapContentWidth(Alignment.CenterHorizontally)
 .width(20.dp)
 .background(Color.Blue)
)

### Modifier.onInterceptKeyBeforeSoftKeyboard

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.onInterceptKeyBeforeSoftKeyboard( 
    onInterceptKeyBeforeSoftKeyboard: (KeyEvent) \-> Boolean 
): Modifier

Adding this `modifier` to the `modifier` parameter of a component will allow it to intercept hardware key events before they are sent to the software keyboard. This can be used to intercept key input from a DPad, or physical keyboard connected to the device and is not applicable to input that is sent to the soft keyboard via spell check or autocomplete.

import androidx.compose.foundation.focusable
import androidx.compose.foundation.layout.Box
import androidx.compose.ui.Modifier
import androidx.compose.ui.input.key.Key
import androidx.compose.ui.input.key.key
import androidx.compose.ui.input.key.onKeyEvent
import androidx.compose.ui.input.key.onPreviewKeyEvent

// When the inner Box is focused, and the user presses a key, the key goes down the hierarchy
// and then back up to the parent. At any stage you can stop the propagation by returning
// true to indicate that you consumed the event.
Box(Modifier.onPreviewKeyEvent { keyEvent1 \-\> false }.onKeyEvent { keyEvent4 \-\> false }) {
 Box(
 Modifier.onPreviewKeyEvent { keyEvent2 \-\> false }
 .onKeyEvent { keyEvent3 \-\> false }
 .focusable()
 )
}

Parameters

`onInterceptKeyBeforeSoftKeyboard: (KeyEvent) -> Boolean`

This callback is invoked when the user interacts with the hardware keyboard. While implementing this callback, return true to stop propagation of this event. If you return false, the key event will be sent to this `SoftKeyboardInterceptionModifierNode`'s parent, and ultimately to the software keyboard.

### Modifier.onPreInterceptKeyBeforeSoftKeyboard

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.onPreInterceptKeyBeforeSoftKeyboard( 
    onPreInterceptKeyBeforeSoftKeyboard: (KeyEvent) \-> Boolean 
): Modifier

Adding this `modifier` to the `modifier` parameter of a component will allow it to intercept hardware key events before they are sent to the software keyboard. This can be used to intercept key input from a DPad, or physical keyboard connected to the device and is not applicable to input that is sent to the soft keyboard via spell check or autocomplete. This modifier is similar to `onInterceptKeyBeforeSoftKeyboard`, but allows a parent composable to intercept the hardware key event before any child.

import androidx.compose.foundation.focusable
import androidx.compose.foundation.layout.Box
import androidx.compose.ui.Modifier
import androidx.compose.ui.input.key.Key
import androidx.compose.ui.input.key.key
import androidx.compose.ui.input.key.onKeyEvent
import androidx.compose.ui.input.key.onPreviewKeyEvent

// When the inner Box is focused, and the user presses a key, the key goes down the hierarchy
// and then back up to the parent. At any stage you can stop the propagation by returning
// true to indicate that you consumed the event.
Box(Modifier.onPreviewKeyEvent { keyEvent1 \-\> false }.onKeyEvent { keyEvent4 \-\> false }) {
 Box(
 Modifier.onPreviewKeyEvent { keyEvent2 \-\> false }
 .onKeyEvent { keyEvent3 \-\> false }
 .focusable()
 )
}

Parameters

`onPreInterceptKeyBeforeSoftKeyboard: (KeyEvent) -> Boolean`

This callback is invoked when the user interacts with the hardware keyboard. It gives ancestors of a focused component the chance to intercept a `KeyEvent`. Return true to stop propagation of this event. If you return false, the key event will be sent to this `SoftKeyboardInterceptionModifierNode`'s child. If none of the children consume the event, it will be sent back up to the root `KeyInputModifierNode` using the onKeyEvent callback, and ultimately to the software keyboard.

### Modifier.styleable

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

@ExperimentalFoundationStyleApi 
fun Modifier.styleable(styleState: StyleState?): Modifier

Modifier that creates a region that is styled by the given `Style` object for the component this Modifier is attached to. Styles that are further "to the right", will have the properties they set override set properties of Styles to the left of them.

Apply `styleable` to creates a "styleable" component whose looks can be customized using the provided `style` together with one or more default `Style` objects. This should be called by a component that wishes to make itself styleable via a `style: Style = Style` parameter. If a component already takes a `Style` parameter, then that component internally is applying the `styleable`, and that `Style` parameter should be used instead of applying `styleable` again,

If `styleable` is added to a modifier chain that is after an another `styleable`, then the second region will wrap around the first. For example, if the two regions both supply padding then the padding will the sum of both regions.

Parameters

`styleState: StyleState?`

the state the style will use to decide which styles should be applied. If `null` is supplied, the style will only see the default state that will never be changed.

See also

`MutableStyleState`

`Style`

`StyleScope`

### Modifier.styleable

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

@ExperimentalFoundationStyleApi 
fun Modifier.styleable(styleState: StyleState? = null, style: Style): Modifier

Modifier that creates a region that is styled by the given `Style` object for the component this Modifier is attached to.

Apply `styleable` to creates a "styleable" component whose looks can be customized using the provided style. This should be called by a component that wishes to make itself styleable via a `style: Style = Style` parameter. If a component already takes a `Style` parameter, then that component internally is applying the `styleable`, and that `Style` parameter should be used instead of applying `styleable` again.

If `styleable` is added to a modifier chain that is after an another `styleable`, then the second region will wrap around the first. For example, if the two regions both supply padding then the padding will the sum of both regions.

Parameters

`styleState: StyleState? = null`

the state the style will use to decide which styles should be applied. If `null` is supplied, the style will only see the default state that will never be changed.

`style: Style`

the style to apply to the styleable region.

See also

`MutableStyleState`

`Style`

`StyleScope`

### Modifier.styleable

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

@ExperimentalFoundationStyleApi 
fun Modifier.styleable(styleState: StyleState?, vararg styles: Style): Modifier

Modifier that creates a region that is styled by the given `Style` object for the component this Modifier is attached to. Styles that are further "to the right", will have the properties they set override set properties of Styles to the left of them.

Apply `styleable` to creates a "styleable" component whose looks can be customized using the provided `style` together with one or more default `Style` objects. This should be called by a component that wishes to make itself styleable via a `style: Style = Style` parameter. If a component already takes a `Style` parameter, then that component internally is applying the `styleable`, and that `Style` parameter should be used instead of applying `styleable` again,

If `styleable` is added to a modifier chain that is after an another `styleable`, then the second region will wrap around the first. For example, if the two regions both supply padding then the padding will the sum of both regions.

Parameters

`styleState: StyleState?`

the state the style will use to decide which styles should be applied. If `null` is supplied, the style will only see the default state that will never be changed.

`vararg styles: Style`

the styles to apply, in order, to the stylable region.

See also

`MutableStyleState`

`Style`

`StyleScope`

### Modifier.surface

android

Artifact: androidx.xr.glimmer:glimmer

View Source

@Composable 
fun Modifier.surface( 
    focusable: Boolean = true, 
    shape: Shape = GlimmerTheme.shapes.medium, 
    color: Color = GlimmerTheme.colors.surface, 
    contentColor: Color = calculateContentColor(color), 
    depthEffect: SurfaceDepthEffect? = null, 
    border: BorderStroke? = SurfaceDefaults.border(), 
    interactionSource: MutableInteractionSource? = null 
): Modifier

A surface is a fundamental building block in Glimmer. A surface represents a distinct visual area or 'physical' boundary for components such as buttons and cards. A surface is responsible for:

1. Clipping: a surface clips its children to the shape specified by `shape`
 
2. Border: a surface draws an inner `border` to emphasize the boundary of the component.
 
3. Background: a surface has a background color of `color`.
 
4. Depth effect: a surface can have different `DepthEffect` shadows for different states, as specified by `depthEffect`.
 
5. Content color: a surface provides a `contentColor` for text and icons inside the surface. By default this is calculated from the provided background color.
 
6. Interaction states: when focused, a surface displays draws a wider border with a focused highlight on top. When pressed, a surface draws a pressed overlay. This happens for interactions emitted from `interactionSource`, whether this surface is `focusable` or not.

This surface is focusable by default - set `focusable` to false for un-interactive / decorative surfaces. For handling clicks, use the other `surface` overload with an `onClick` parameter.

Simple usage:

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.xr.glimmer.Text
import androidx.xr.glimmer.surface

Box(Modifier.surface().padding(horizontal \= 24.dp, vertical \= 20.dp)) {
 Text("This is a surface")
}

For custom gesture handling, add the gesture modifier after this `surface`, and provide a shared `MutableInteractionSource` to enable this surface to handle focus / press states. You should also pass `false` for `focusable` if that modifier already includes a focus target by default. For example, to create a toggleable surface:

import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.selection.toggleable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.xr.glimmer.Text
import androidx.xr.glimmer.surface

var checked by remember { mutableStateOf(false) }
val interactionSource \= remember { MutableInteractionSource() }
Box(
 Modifier.surface(
 // Disable focus on the surface, since toggleable is already focusable
 focusable \= false,
 // Provide the same interaction source here and to toggleable to make sure that
 // surface appears focused and pressed when interacted with
 interactionSource \= interactionSource,
 )
 .toggleable(
 value \= checked,
 interactionSource \= interactionSource,
 onValueChange \= { checked \= it },
 )
 .padding(horizontal \= 24.dp, vertical \= 20.dp)
) {
 Text("Checked: $checked")
}

Parameters

`focusable: Boolean = true`

whether this surface is focusable, true by default. Most surfaces should be focusable to allow navigation between surfaces in a screen. Unfocusable surfaces may be used for decorative only elements, such as surfaces used in a compound component with a separate focusable area.

`shape: Shape = GlimmerTheme.shapes.medium`

the `Shape` used to clip this surface, and also used to draw the background and border

`color: Color = GlimmerTheme.colors.surface`

the background `Color` for this surface

`contentColor: Color = calculateContentColor(color)`

the `Color` for content inside this surface

`depthEffect: SurfaceDepthEffect? = null`

the `SurfaceDepthEffect` for this surface, representing the `DepthEffect` shadows rendered in different states.

`border: BorderStroke? = SurfaceDefaults.border()`

an optional inner border for this surface

`interactionSource: MutableInteractionSource? = null`

an optional hoisted `MutableInteractionSource` for observing and emitting `Interaction`s for this surface. Note that if `null` is provided, interactions will still happen internally.

### Modifier.surface

android

Artifact: androidx.xr.glimmer:glimmer

View Source

@Composable 
fun Modifier.surface( 
    enabled: Boolean = true, 
    shape: Shape = GlimmerTheme.shapes.medium, 
    color: Color = GlimmerTheme.colors.surface, 
    contentColor: Color = calculateContentColor(color), 
    depthEffect: SurfaceDepthEffect? = null, 
    border: BorderStroke? = SurfaceDefaults.border(), 
    interactionSource: MutableInteractionSource? = null, 
    onClick: () \-> Unit 
): Modifier

A surface is a fundamental building block in Glimmer. A surface represents a distinct visual area or 'physical' boundary for components such as buttons and cards. A surface is responsible for:

1. Clipping: a surface clips its children to the shape specified by `shape`
 
2. Border: a surface draws an inner `border` to emphasize the boundary of the component. When focused, a surface draws a wider border with a focused highlight on top to indicate the focus state.
 
3. Background: a surface has a background color of `color`.
 
4. Depth effect: a surface can have different `DepthEffect` shadows for different states, as specified by `depthEffect`.
 
5. Content color: a surface provides a `contentColor` for text and icons inside the surface. By default this is calculated from the provided background color.
 
6. Interaction states: when focused, a surface displays draws a wider border with a focused highlight on top. When pressed, a surface draws a pressed overlay. This happens for interactions emitted from `interactionSource`, whether this surface is `enabled` or not.

This surface is focusable and handles clicks. For non-clickable surfaces, use the other overload of `surface` instead. For surfaces with custom gesture handling, refer to the sample and guidance on the other overload of `surface`.

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.xr.glimmer.Text
import androidx.xr.glimmer.surface

Box(Modifier.surface(onClick \= {}).padding(horizontal \= 24.dp, vertical \= 20.dp)) {
 Text("This is a clickable surface")
}

Parameters

`enabled: Boolean = true`

whether this surface is enabled, true by default. When false, this surface will not respond to user input, and will not be focusable.

`shape: Shape = GlimmerTheme.shapes.medium`

the `Shape` used to clip this surface, and also used to draw the background and border

`color: Color = GlimmerTheme.colors.surface`

the background `Color` for this surface

`contentColor: Color = calculateContentColor(color)`

the `Color` for content inside this surface

`depthEffect: SurfaceDepthEffect? = null`

the `SurfaceDepthEffect` for this surface, representing the `DepthEffect` shadows rendered in different states.

`border: BorderStroke? = SurfaceDefaults.border()`

an optional inner border for this surface

`interactionSource: MutableInteractionSource? = null`

an optional hoisted `MutableInteractionSource` for observing and emitting `Interaction`s for this surface. Note that if `null` is provided, interactions will still happen internally.

`onClick: () -> Unit`

callback invoked when this surface is clicked

### Modifier.pointerInput

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.pointerInput(block: suspend PointerInputScope.() \-> Unit): Modifier

Create a modifier for processing pointer input within the region of the modified element.

It is an error to call `pointerInput` without at least one `key` parameter.

### Modifier.pointerInput

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.pointerInput(key1: Any?, block: PointerInputEventHandler): Modifier

Create a modifier for processing pointer input within the region of the modified element.

`pointerInput`s may call `PointerInputScope.awaitPointerEventScope` to install a pointer input handler that can `AwaitPointerEventScope.awaitPointerEvent` to receive and consume pointer input events. Extension functions on `PointerInputScope` or `AwaitPointerEventScope` may be defined to perform higher-level gesture detection. The pointer input handling `block` will be cancelled and **re-started** when `pointerInput` is recomposed with a different `key1` or the `block` class is different.

When a `pointerInput` modifier is created by composition, if `block` captures any local variables to operate on, two patterns are common for working with changes to those variables depending on the desired behavior.

Specifying the captured value as a `key` parameter will cause `block` to cancel and restart from the beginning if the value changes:

import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.input.pointer.pointerInput

@Composable
fun MyComposable(parameter: String) {
 Box(
 Modifier.fillMaxSize().pointerInput(parameter) {
 // This entire pointerInput block will restart from the beginning
 // if and when \`parameter\` changes, since it's used as a key in
 // the creation of the \`pointerInput\` modifier
 detectTapGestures { performAction(parameter) }
 }
 )
}

If `block` should **not** restart when a captured value is changed but the value should still be updated for its next use, use `rememberUpdatedState` to update a value holder that is accessed by `block`:

import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.rememberUpdatedState
import androidx.compose.ui.Modifier
import androidx.compose.ui.input.pointer.pointerInput

@Composable
fun MyComposable(parameter: String) {
 val currentParameter by rememberUpdatedState(parameter)
 Box(
 Modifier.fillMaxSize().pointerInput(Unit) {
 // This pointerInput block will never restart since
 // it specifies a key of \`Unit\`, which never changes
 detectTapGestures {
 // ...however, currentParameter is updated out from under this running
 // pointerInput suspend block by rememberUpdatedState, and will always
 // contain the latest value updated by the composition when a tap
 // is detected here.
 performAction(currentParameter)
 }
 }
 )
}

_**Note**_ Any removal operations on Android Views from `pointerInput` should wrap the `block` in a `post { }` block to guarantee the event dispatch completes before executing the removal. (You do not need to do this when removing a composable because Compose guarantees it completes via the snapshot state system.)

### Modifier.pointerInput

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.pointerInput(vararg keys: Any?, block: PointerInputEventHandler): Modifier

Create a modifier for processing pointer input within the region of the modified element.

`pointerInput`s may call `PointerInputScope.awaitPointerEventScope` to install a pointer input handler that can `AwaitPointerEventScope.awaitPointerEvent` to receive and consume pointer input events. Extension functions on `PointerInputScope` or `AwaitPointerEventScope` may be defined to perform higher-level gesture detection. The pointer input handling `block` will be cancelled and **re-started** when `pointerInput` is recomposed with any different `keys` or the `block` class is different.

When a `pointerInput` modifier is created by composition, if `block` captures any local variables to operate on, two patterns are common for working with changes to those variables depending on the desired behavior.

Specifying the captured value as a `key` parameter will cause `block` to cancel and restart from the beginning if the value changes:

import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.input.pointer.pointerInput

@Composable
fun MyComposable(parameter: String) {
 Box(
 Modifier.fillMaxSize().pointerInput(parameter) {
 // This entire pointerInput block will restart from the beginning
 // if and when \`parameter\` changes, since it's used as a key in
 // the creation of the \`pointerInput\` modifier
 detectTapGestures { performAction(parameter) }
 }
 )
}

If `block` should **not** restart when a captured value is changed but the value should still be updated for its next use, use `rememberUpdatedState` to update a value holder that is accessed by `block`:

import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.rememberUpdatedState
import androidx.compose.ui.Modifier
import androidx.compose.ui.input.pointer.pointerInput

@Composable
fun MyComposable(parameter: String) {
 val currentParameter by rememberUpdatedState(parameter)
 Box(
 Modifier.fillMaxSize().pointerInput(Unit) {
 // This pointerInput block will never restart since
 // it specifies a key of \`Unit\`, which never changes
 detectTapGestures {
 // ...however, currentParameter is updated out from under this running
 // pointerInput suspend block by rememberUpdatedState, and will always
 // contain the latest value updated by the composition when a tap
 // is detected here.
 performAction(currentParameter)
 }
 }
 )
}

_**Note**_ Any removal operations on Android Views from `pointerInput` should wrap the `block` in a `post { }` block to guarantee the event dispatch completes before executing the removal. (You do not need to do this when removing a composable because Compose guarantees it completes via the snapshot state system.)

### Modifier.pointerInput

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.pointerInput( 
    key1: Any?, 
    key2: Any?, 
    block: PointerInputEventHandler 
): Modifier

Create a modifier for processing pointer input within the region of the modified element.

`pointerInput`s may call `PointerInputScope.awaitPointerEventScope` to install a pointer input handler that can `AwaitPointerEventScope.awaitPointerEvent` to receive and consume pointer input events. Extension functions on `PointerInputScope` or `AwaitPointerEventScope` may be defined to perform higher-level gesture detection. The pointer input handling `block` will be cancelled and **re-started** when `pointerInput` is recomposed with a different `key1` or `key2`, or the `block` class is different.

When a `pointerInput` modifier is created by composition, if `block` captures any local variables to operate on, two patterns are common for working with changes to those variables depending on the desired behavior.

Specifying the captured value as a `key` parameter will cause `block` to cancel and restart from the beginning if the value changes:

import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.input.pointer.pointerInput

@Composable
fun MyComposable(parameter: String) {
 Box(
 Modifier.fillMaxSize().pointerInput(parameter) {
 // This entire pointerInput block will restart from the beginning
 // if and when \`parameter\` changes, since it's used as a key in
 // the creation of the \`pointerInput\` modifier
 detectTapGestures { performAction(parameter) }
 }
 )
}

If `block` should **not** restart when a captured value is changed but the value should still be updated for its next use, use `rememberUpdatedState` to update a value holder that is accessed by `block`:

import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.rememberUpdatedState
import androidx.compose.ui.Modifier
import androidx.compose.ui.input.pointer.pointerInput

@Composable
fun MyComposable(parameter: String) {
 val currentParameter by rememberUpdatedState(parameter)
 Box(
 Modifier.fillMaxSize().pointerInput(Unit) {
 // This pointerInput block will never restart since
 // it specifies a key of \`Unit\`, which never changes
 detectTapGestures {
 // ...however, currentParameter is updated out from under this running
 // pointerInput suspend block by rememberUpdatedState, and will always
 // contain the latest value updated by the composition when a tap
 // is detected here.
 performAction(currentParameter)
 }
 }
 )
}

_**Note**_ Any removal operations on Android Views from `pointerInput` should wrap the `block` in a `post { }` block to guarantee the event dispatch completes before executing the removal. (You do not need to do this when removing a composable because Compose guarantees it completes via the snapshot state system.)

### Modifier.edgeSwipeToDismiss

android

Artifact: androidx.wear.compose:compose-material

View Source

fun Modifier.edgeSwipeToDismiss( 
    swipeToDismissBoxState: SwipeToDismissBoxState, 
    edgeWidth: Dp = SwipeToDismissBoxDefaults.EdgeWidth 
): Modifier

Handles swipe to dismiss from the edge of the viewport.

Used when the content of the `BasicSwipeToDismissBox` is handling all the gestures of the viewport, which prevents `BasicSwipeToDismissBox` from handling the swipe-to-dismiss gesture. Examples of this scenario are horizontal paging, such as 2-d scrolling a Map or swiping horizontally between pages.

Use of `Modifier.edgeSwipeToDismiss` defines a zone on the left side of the viewport of width `edgeWidth` in which the swipe-right gesture is intercepted. Other touch events are ignored - vertical scroll, click, long click, etc.

Currently Edge swipe, like swipe to dismiss, is only supported on the left part of the viewport regardless of layout direction as content is swiped away from left to right.

Requires that the element to which this modifier is applied exists within a `BasicSwipeToDismissBox` which is using the same `SwipeToDismissBoxState` instance.

Requires that the element to which this modifier is applied notifies the nested scroll system about the scrolling events that are happening on the element. For example, using a `NestedScrollDispatcher`.

Example of a modifier usage with SwipeToDismiss

import androidx.compose.foundation.background
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.rememberScrollState
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.wear.compose.foundation.edgeSwipeToDismiss
import androidx.wear.compose.foundation.rememberSwipeToDismissBoxState
import androidx.wear.compose.material.MaterialTheme
import androidx.wear.compose.material.SwipeToDismissBox
import androidx.wear.compose.material.Text

val state \= rememberSwipeToDismissBoxState()

// When using Modifier.edgeSwipeToDismiss, it is required that the element on which the
// modifier applies exists within a SwipeToDismissBox which shares the same state.
SwipeToDismissBox(state \= state, onDismissed \= navigateBack) { isBackground \-\>
 val horizontalScrollState \= rememberScrollState(0)
 if (isBackground) {
 Box(modifier \= Modifier.fillMaxSize().background(MaterialTheme.colors.secondaryVariant))
 } else {
 Box(modifier \= Modifier.fillMaxSize()) {
 Text(
 modifier \=
 Modifier.align(Alignment.Center)
 .edgeSwipeToDismiss(state)
 .horizontalScroll(horizontalScrollState),
 text \=
 "This text can be scrolled horizontally - to dismiss, swipe " +
 "right from the left edge of the screen (called Edge Swiping)",
 )
 }
 }
}

Parameters

`swipeToDismissBoxState: SwipeToDismissBoxState`

A state of SwipeToDismissBox. Used to trigger swipe gestures on SwipeToDismissBox

`edgeWidth: Dp = SwipeToDismissBoxDefaults.EdgeWidth`

A width of edge, where swipe should be recognised

### Modifier.swipeable

Cmn

Artifact: androidx.compose.material:material

View Source

@ExperimentalMaterialApi 
fun <T : Any?> Modifier.swipeable( 
    state: SwipeableState<T>, 
    anchors: Map<Float, T>, 
    orientation: Orientation, 
    enabled: Boolean = true, 
    reverseDirection: Boolean = false, 
    interactionSource: MutableInteractionSource? = null, 
    thresholds: (from, to) \-> ThresholdConfig = { \_, \_ -> FixedThreshold(56.dp) }, 
    resistance: ResistanceConfig? = resistanceConfig(anchors.keys), 
    velocityThreshold: Dp = VelocityThreshold 
): Modifier

Enable swipe gestures between a set of predefined states.

To use this, you must provide a map of anchors (in pixels) to states (of type `T`). Note that this map cannot be empty and cannot have two anchors mapped to the same state.

When a swipe is detected, the offset of the `SwipeableState` will be updated with the swipe delta. You should use this offset to move your content accordingly (see `Modifier.offsetPx`). When the swipe ends, the offset will be animated to one of the anchors and when that anchor is reached, the value of the `SwipeableState` will also be updated to the state corresponding to the new anchor. The target anchor is calculated based on the provided positional `thresholds`.

Swiping is constrained between the minimum and maximum anchors. If the user attempts to swipe past these bounds, a resistance effect will be applied by default. The amount of resistance at each edge is specified by the `resistance` config. To disable all resistance, set it to `null`.

For an example of a `swipeable` with three states, see:

import androidx.compose.foundation.background
import androidx.compose.foundation.gestures.Orientation
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.material.FractionalThreshold
import androidx.compose.material.Text
import androidx.compose.material.rememberSwipeableState
import androidx.compose.material.swipeable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

// Draw a slider-like composable consisting of a red square moving along a
// black background, with three states: "A" (min), "B" (middle), and "C" (max).
val width \= 350.dp
val squareSize \= 50.dp

val swipeableState \= rememberSwipeableState("A")
val sizePx \= with(LocalDensity.current) { (width \- squareSize).toPx() }
val anchors \= mapOf(0f to "A", sizePx / 2 to "B", sizePx to "C")

Box(
 modifier \=
 Modifier.width(width)
 .swipeable(
 state \= swipeableState,
 anchors \= anchors,
 thresholds \= { \_, \_ \-\> FractionalThreshold(0.5f) },
 orientation \= Orientation.Horizontal,
 )
 .background(Color.Black)
) {
 Box(
 Modifier.offset { IntOffset(swipeableState.offset.value.roundToInt(), 0) }
 .size(squareSize)
 .background(Color.Red),
 contentAlignment \= Alignment.Center,
 ) {
 Text(swipeableState.currentValue, color \= Color.White, fontSize \= 24.sp)
 }
}

Parameters

`<T : Any?>`

The type of the state.

`state: SwipeableState<T>`

The state of the `swipeable`.

`anchors: Map<Float, T>`

Pairs of anchors and states, used to map anchors to states and vice versa.

`orientation: Orientation`

The orientation in which the `swipeable` can be swiped.

`enabled: Boolean = true`

Whether this `swipeable` is enabled and should react to the user's input.

`reverseDirection: Boolean = false`

Whether to reverse the direction of the swipe, so a top to bottom swipe will behave like bottom to top, and a left to right swipe will behave like right to left.

`interactionSource: MutableInteractionSource? = null`

Optional `MutableInteractionSource` that will passed on to the internal `Modifier.draggable`.

`thresholds: (from, to) -> ThresholdConfig = { _, _ -> FixedThreshold(56.dp) }`

Specifies where the thresholds between the states are. The thresholds will be used to determine which state to animate to when swiping stops. This is represented as a lambda that takes two states and returns the threshold between them in the form of a `ThresholdConfig`. Note that the order of the states corresponds to the swipe direction.

`resistance: ResistanceConfig? = resistanceConfig(anchors.keys)`

Controls how much resistance will be applied when swiping past the bounds.

`velocityThreshold: Dp = VelocityThreshold`

The threshold (in dp per second) that the end velocity has to exceed in order to animate to the next state, even if the positional `thresholds` have not been reached.

### Modifier.swipeable

android

Artifact: androidx.wear.compose:compose-material

View Source

@ExperimentalWearMaterialApi 
fun <T : Any?> Modifier.swipeable( 
    state: SwipeableState<T>, 
    anchors: Map<Float, T>, 
    orientation: Orientation, 
    enabled: Boolean = true, 
    reverseDirection: Boolean = false, 
    interactionSource: MutableInteractionSource? = null, 
    thresholds: (from, to) \-> ThresholdConfig = { \_, \_ -> FractionalThreshold(0.5f) }, 
    resistance: ResistanceConfig? = resistanceConfig(anchors.keys), 
    velocityThreshold: Dp = VelocityThreshold 
): Modifier

Enable swipe gestures between a set of predefined states.

To use this, you must provide a map of anchors (in pixels) to states (of type `T`). Note that this map cannot be empty and cannot have two anchors mapped to the same state.

When a swipe is detected, the offset of the `SwipeableState` will be updated with the swipe delta. You should use this offset to move your content accordingly (see `Modifier.offsetPx`). When the swipe ends, the offset will be animated to one of the anchors and when that anchor is reached, the value of the `SwipeableState` will also be updated to the state corresponding to the new anchor. The target anchor is calculated based on the provided positional `thresholds`.

Swiping is constrained between the minimum and maximum anchors. If the user attempts to swipe past these bounds, a resistance effect will be applied by default. The amount of resistance at each edge is specified by the `resistance` config. To disable all resistance, set it to `null`.

For an example of a `swipeable` with three states, see:

Parameters

`<T : Any?>`

The type of the state.

`state: SwipeableState<T>`

The state of the `swipeable`.

`anchors: Map<Float, T>`

Pairs of anchors and states, used to map anchors to states and vice versa.

`orientation: Orientation`

The orientation in which the `swipeable` can be swiped.

`enabled: Boolean = true`

Whether this `swipeable` is enabled and should react to the user's input.

`reverseDirection: Boolean = false`

Whether to reverse the direction of the swipe, so a top to bottom swipe will behave like bottom to top, and a left to right swipe will behave like right to left.

`interactionSource: MutableInteractionSource? = null`

Optional `MutableInteractionSource` that will passed on to the internal `Modifier.draggable`.

`thresholds: (from, to) -> ThresholdConfig = { _, _ -> FractionalThreshold(0.5f) }`

Specifies where the thresholds between the states are. The thresholds will be used to determine which state to animate to when swiping stops. This is represented as a lambda that takes two states and returns the threshold between them in the form of a `ThresholdConfig`. Note that the order of the states corresponds to the swipe direction.

`resistance: ResistanceConfig? = resistanceConfig(anchors.keys)`

Controls how much resistance will be applied when swiping past the bounds.

`velocityThreshold: Dp = VelocityThreshold`

The threshold (in dp per second) that the end velocity has to exceed in order to animate to the next state, even if the positional `thresholds` have not been reached.

### Modifier.systemGestureExclusion

android

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.systemGestureExclusion(): Modifier

Excludes the layout rectangle from the system gesture.

See also

`setSystemGestureExclusionRects`

### Modifier.systemGestureExclusion

android

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.systemGestureExclusion(exclusion: (LayoutCoordinates) \-> Rect): Modifier

Excludes a rectangle within the local layout coordinates from the system gesture. After layout, `exclusion` is called to determine the `Rect` to exclude from the system gesture area.

The `LayoutCoordinates` of the `Modifier`'s location in the layout is passed as passed as `exclusion`'s parameter.

See also

`setSystemGestureExclusionRects`

### Modifier.testTag

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.testTag(tag: String): Modifier

Applies a tag to allow modified element to be found in tests.

This is a convenience method for a `semantics` that sets `SemanticsPropertyReceiver.testTag`.

### Modifier.appendTextContextMenuComponents

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.appendTextContextMenuComponents(builder: TextContextMenuBuilderScope.() \-> Unit): Modifier

Adds a `builder` to be run when the text context menu is shown within this hierarchy.

When there are multiple instances of this modifier in a layout hierarchy, the `builder`s are applied in order from bottom to top. They are then filtered by every `Modifier.filterTextContextMenuComponents` in the hierarchy.

import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.text.contextmenu.builder.item
import androidx.compose.foundation.text.contextmenu.modifier.appendTextContextMenuComponents
import androidx.compose.foundation.text.input.clearText
import androidx.compose.foundation.text.input.rememberTextFieldState
import androidx.compose.ui.Modifier

val textFieldState \= rememberTextFieldState()
BasicTextField(
 state \= textFieldState,
 modifier \=
 Modifier.appendTextContextMenuComponents {
 separator()
 item(key \= ClearKeyDataObject, label \= "Clear") {
 textFieldState.clearText()
 close()
 }
 separator()
 },
)

Parameters

`builder: TextContextMenuBuilderScope.() -> Unit`

a snapshot-aware builder function for adding components to the context menu. In this function you can use member functions from the receiver `TextContextMenuBuilderScope`, such as `separator()`, to add components. The `item` function is not in the common source set, but is instead defined as an extension function in the platform specific source sets.

### Modifier.filterTextContextMenuComponents

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.filterTextContextMenuComponents( 
    filter: (TextContextMenuComponent) \-> Boolean 
): Modifier

Adds a `filter` to be run when the text context menu is shown within this hierarchy.

`filter` will not be passed `TextContextMenuSeparator`, as they pass by default.

`filter`s added via this modifier will always run after every `builder` added via `Modifier.appendTextContextMenuComponents`. When there are multiple instances of this modifier in a layout hierarchy, every `filter` must pass in order for a context menu to be shown. They are always applied after all `Modifier.appendTextContextMenuComponents` have been applied, but the order in which they run should not be depended on.

import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.text.contextmenu.modifier.filterTextContextMenuComponents
import androidx.compose.foundation.text.input.rememberTextFieldState
import androidx.compose.ui.Modifier

val textFieldState \= rememberTextFieldState()
BasicTextField(
 state \= textFieldState,
 modifier \=
 Modifier.filterTextContextMenuComponents(
 filter \= { component \-\> component.key \=== ClearKeyDataObject }
 ),
)

Parameters

`filter: (TextContextMenuComponent) -> Boolean`

a snapshot-aware lambda that determines whether a `TextContextMenuComponent` should be included in the context menu.

### Modifier.toggleable

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.toggleable( 
    value: Boolean, 
    enabled: Boolean = true, 
    role: Role? = null, 
    interactionSource: MutableInteractionSource? = null, 
    onValueChange: (Boolean) \-> Unit 
): Modifier

Configure component to make it toggleable via input and accessibility events

This overload will use the `Indication` from `LocalIndication`. Use the other overload to explicitly provide an `Indication` instance. Note that this overload only supports `IndicationNodeFactory` instances provided through `LocalIndication` - it is strongly recommended to migrate to `IndicationNodeFactory`, but you can use the other overload if you still need to support `Indication` instances that are not `IndicationNodeFactory`.

If `interactionSource` is `null`, an internal `MutableInteractionSource` will be lazily created only when needed. This reduces the performance cost of toggleable during composition, as creating the `indication` can be delayed until there is an incoming `androidx.compose.foundation.interaction.Interaction`. If you are only passing a remembered `MutableInteractionSource` and you are never using it outside of toggleable, it is recommended to instead provide `null` to enable lazy creation. If you need the `Indication` to be created eagerly, provide a remembered `MutableInteractionSource`.

import androidx.compose.foundation.selection.toggleable
import androidx.compose.material.Text
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier

var checked by remember { mutableStateOf(false) }
// content that you want to make toggleable
Text(
 modifier \= Modifier.toggleable(value \= checked, onValueChange \= { checked \= it }),
 text \= checked.toString(),
)

Parameters

`value: Boolean`

whether Toggleable is on or off

`enabled: Boolean = true`

whether or not this `toggleable` will handle input events and appear enabled for semantics purposes

`role: Role? = null`

the type of user interface element. Accessibility services might use this to describe the element or do customizations

`interactionSource: MutableInteractionSource? = null`

`MutableInteractionSource` that will be used to dispatch `PressInteraction.Press` when this toggleable is pressed. If `null`, an internal `MutableInteractionSource` will be created if needed.

`onValueChange: (Boolean) -> Unit`

callback to be invoked when toggleable is clicked, therefore the change of the state in requested.

See also

`triStateToggleable`

if you require support for an indeterminate state.

### Modifier.toggleable

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.toggleable( 
    value: Boolean, 
    interactionSource: MutableInteractionSource?, 
    indication: Indication?, 
    enabled: Boolean = true, 
    role: Role? = null, 
    onValueChange: (Boolean) \-> Unit 
): Modifier

Configure component to make it toggleable via input and accessibility events.

If `interactionSource` is `null`, and `indication` is an `IndicationNodeFactory`, an internal `MutableInteractionSource` will be lazily created along with the `indication` only when needed. This reduces the performance cost of toggleable during composition, as creating the `indication` can be delayed until there is an incoming `androidx.compose.foundation.interaction.Interaction`. If you are only passing a remembered `MutableInteractionSource` and you are never using it outside of toggleable, it is recommended to instead provide `null` to enable lazy creation. If you need `indication` to be created eagerly, provide a remembered `MutableInteractionSource`.

If `indication` is _not_ an `IndicationNodeFactory`, and instead implements the deprecated `Indication.rememberUpdatedInstance` method, you should explicitly pass a remembered `MutableInteractionSource` as a parameter for `interactionSource` instead of `null`, as this cannot be lazily created inside toggleable.

import androidx.compose.foundation.selection.toggleable
import androidx.compose.material.Text
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier

var checked by remember { mutableStateOf(false) }
// content that you want to make toggleable
Text(
 modifier \= Modifier.toggleable(value \= checked, onValueChange \= { checked \= it }),
 text \= checked.toString(),
)

Parameters

`value: Boolean`

whether Toggleable is on or off

`interactionSource: MutableInteractionSource?`

`MutableInteractionSource` that will be used to dispatch `PressInteraction.Press` when this toggleable is pressed. If `null`, an internal `MutableInteractionSource` will be created if needed.

`indication: Indication?`

indication to be shown when modified element is pressed. Be default, indication from `LocalIndication` will be used. Pass `null` to show no indication, or current value from `LocalIndication` to show theme default

`enabled: Boolean = true`

whether or not this `toggleable` will handle input events and appear enabled for semantics purposes

`role: Role? = null`

the type of user interface element. Accessibility services might use this to describe the element or do customizations

`onValueChange: (Boolean) -> Unit`

callback to be invoked when toggleable is clicked, therefore the change of the state in requested.

See also

`triStateToggleable`

if you require support for an indeterminate state.

### Modifier.triStateToggleable

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.triStateToggleable( 
    state: ToggleableState, 
    enabled: Boolean = true, 
    role: Role? = null, 
    interactionSource: MutableInteractionSource? = null, 
    onClick: () \-> Unit 
): Modifier

Configure component to make it toggleable via input and accessibility events with three states: On, Off and Indeterminate.

TriStateToggleable should be used when there are dependent Toggleables associated to this component and those can have different values.

This overload will use the `Indication` from `LocalIndication`. Use the other overload to explicitly provide an `Indication` instance. Note that this overload only supports `IndicationNodeFactory` instances provided through `LocalIndication` - it is strongly recommended to migrate to `IndicationNodeFactory`, but you can use the other overload if you still need to support `Indication` instances that are not `IndicationNodeFactory`.

If `interactionSource` is `null`, an internal `MutableInteractionSource` will be lazily created only when needed. This reduces the performance cost of triStateToggleable during composition, as creating the `indication` can be delayed until there is an incoming `androidx.compose.foundation.interaction.Interaction`. If you are only passing a remembered `MutableInteractionSource` and you are never using it outside of triStateToggleable, it is recommended to instead provide `null` to enable lazy creation. If you need the `Indication` to be created eagerly, provide a remembered `MutableInteractionSource`.

import androidx.compose.foundation.selection.toggleable
import androidx.compose.foundation.selection.triStateToggleable
import androidx.compose.material.Text
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.state.ToggleableState

var checked by remember { mutableStateOf(ToggleableState.Indeterminate) }
// content that you want to make toggleable
Text(
 modifier \=
 Modifier.triStateToggleable(
 state \= checked,
 onClick \= {
 checked \=
 if (checked \== ToggleableState.On) ToggleableState.Off
 else ToggleableState.On
 },
 ),
 text \= checked.toString(),
)

Parameters

`state: ToggleableState`

current value for the component

`enabled: Boolean = true`

whether or not this `triStateToggleable` will handle input events and appear enabled for semantics purposes

`role: Role? = null`

the type of user interface element. Accessibility services might use this to describe the element or do customizations

`interactionSource: MutableInteractionSource? = null`

`MutableInteractionSource` that will be used to dispatch `PressInteraction.Press` when this toggleable is pressed. If `null`, an internal `MutableInteractionSource` will be created if needed.

`onClick: () -> Unit`

will be called when user clicks the toggleable.

See also

`toggleable`

if you want to support only two states: on and off

### Modifier.triStateToggleable

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.triStateToggleable( 
    state: ToggleableState, 
    interactionSource: MutableInteractionSource?, 
    indication: Indication?, 
    enabled: Boolean = true, 
    role: Role? = null, 
    onClick: () \-> Unit 
): Modifier

Configure component to make it toggleable via input and accessibility events with three states: On, Off and Indeterminate.

TriStateToggleable should be used when there are dependent Toggleables associated to this component and those can have different values.

If `interactionSource` is `null`, and `indication` is an `IndicationNodeFactory`, an internal `MutableInteractionSource` will be lazily created along with the `indication` only when needed. This reduces the performance cost of triStateToggleable during composition, as creating the `indication` can be delayed until there is an incoming `androidx.compose.foundation.interaction.Interaction`. If you are only passing a remembered `MutableInteractionSource` and you are never using it outside of triStateToggleable, it is recommended to instead provide `null` to enable lazy creation. If you need `indication` to be created eagerly, provide a remembered `MutableInteractionSource`.

If `indication` is _not_ an `IndicationNodeFactory`, and instead implements the deprecated `Indication.rememberUpdatedInstance` method, you should explicitly pass a remembered `MutableInteractionSource` as a parameter for `interactionSource` instead of `null`, as this cannot be lazily created inside triStateToggleable.

import androidx.compose.foundation.selection.toggleable
import androidx.compose.foundation.selection.triStateToggleable
import androidx.compose.material.Text
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.state.ToggleableState

var checked by remember { mutableStateOf(ToggleableState.Indeterminate) }
// content that you want to make toggleable
Text(
 modifier \=
 Modifier.triStateToggleable(
 state \= checked,
 onClick \= {
 checked \=
 if (checked \== ToggleableState.On) ToggleableState.Off
 else ToggleableState.On
 },
 ),
 text \= checked.toString(),
)

Parameters

`state: ToggleableState`

current value for the component

`interactionSource: MutableInteractionSource?`

`MutableInteractionSource` that will be used to dispatch `PressInteraction.Press` when this triStateToggleable is pressed. If `null`, an internal `MutableInteractionSource` will be created if needed.

`indication: Indication?`

indication to be shown when modified element is pressed. Be default, indication from `LocalIndication` will be used. Pass `null` to show no indication, or current value from `LocalIndication` to show theme default

`enabled: Boolean = true`

whether or not this `triStateToggleable` will handle input events and appear enabled for semantics purposes

`role: Role? = null`

the type of user interface element. Accessibility services might use this to describe the element or do customizations

`onClick: () -> Unit`

will be called when user clicks the toggleable.

See also

`toggleable`

if you want to support only two states: on and off

### Modifier.touchTargetAwareSize

android

Artifact: androidx.wear.compose:compose-material3

View Source

fun Modifier.touchTargetAwareSize(size: Dp): Modifier

Modifier to set both the size and recommended touch target for `IconButton` and TextButton.

### Modifier.transformable

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.transformable( 
    state: TransformableState, 
    lockRotationOnZoomPan: Boolean = false, 
    enabled: Boolean = true 
): Modifier

Enable transformation gestures of the modified UI element.

Users should update their state themselves using default `TransformableState` and its `onTransformation` callback or by implementing `TransformableState` interface manually and reflect their own state in UI when using this component.

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.gestures.animateZoomBy
import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.gestures.rememberTransformableState
import androidx.compose.foundation.gestures.transformable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.material.Text
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clipToBounds
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.geometry.center
import androidx.compose.ui.geometry.isSpecified
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.TransformOrigin
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.layout.onSizeChanged
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.unit.toSize

/\*\*
 \* Rotates the given offset around the origin by the given angle in degrees.
 \*
 \* A positive angle indicates a counterclockwise rotation around the right-handed 2D Cartesian
 \* coordinate system.
 \*
 \* See: \[Rotation matrix\](https://en.wikipedia.org/wiki/Rotation\_matrix)
 \*/
fun Offset.rotateBy(angle: Float): Offset {
 val angleInRadians \= angle \* (PI / 180)
 val cos \= cos(angleInRadians)
 val sin \= sin(angleInRadians)
 return Offset((x \* cos \- y \* sin).toFloat(), (x \* sin + y \* cos).toFloat())
}

Box(Modifier.size(200.dp).clipToBounds().background(Color.LightGray)) {
 // set up all transformation states
 var scale by remember { mutableStateOf(1f) }
 var rotation by remember { mutableStateOf(0f) }
 var offset by remember { mutableStateOf(Offset.Zero) }
 val coroutineScope \= rememberCoroutineScope()

 var size by remember { mutableStateOf(Size.Zero) }

 // let's create a modifier state to specify how to update our UI state defined above
 val state \=
 rememberTransformableState { centroid, zoomChange, offsetChange, rotationChange \-\>
 // note: scale goes by factor, not an absolute difference, so we need to multiply it
 // for this example, we don't allow downscaling, so cap it to 1f
 val oldScale \= scale
 val newScale \= max(scale \* zoomChange, 1f)

 // If the centroid isn't specified, assume it should be applied from the center
 val effectiveCentroid \= centroid.takeIf { it.isSpecified } ?: size.center

 // For natural zooming and rotating, the centroid of the gesture should
 // be the fixed point where zooming and rotating occurs.
 // We compute where the centroid was (in the pre-transformed coordinate
 // space), and then compute where it will be after this delta.
 // We then compute what the new offset should be to keep the centroid
 // visually stationary for rotating and zooming, and also apply the pan.
 offset \=
 (offset + effectiveCentroid / oldScale).rotateBy(rotationChange) \-
 (effectiveCentroid / newScale + offsetChange / oldScale)
 scale \= newScale
 rotation += rotationChange
 }
 Box(
 Modifier.onSizeChanged { size \= it.toSize() }
 // add transformable to listen to multitouch transformation events after offset
 .transformable(state \= state)
 // optional for example: add double click to zoom
 .pointerInput(Unit) {
 detectTapGestures(
 onDoubleTap \= { offset \-\>
 coroutineScope.launch { state.animateZoomBy(4f, centroid \= offset) }
 }
 )
 }
 .fillMaxSize()
 .border(1.dp, Color.Green)
 ) {
 Text(
 "\\uD83C\\uDF55",
 fontSize \= 32.sp,
 // apply other transformations like rotation and zoom on the pizza slice emoji
 modifier \=
 Modifier.fillMaxSize()
 .graphicsLayer {
 translationX \= \-offset.x \* scale
 translationY \= \-offset.y \* scale
 scaleX \= scale
 scaleY \= scale
 rotationZ \= rotation
 transformOrigin \= TransformOrigin(0f, 0f)
 }
 .wrapContentSize(align \= Alignment.Center),
 )
 }
}

Parameters

`state: TransformableState`

`TransformableState` of the transformable. Defines how transformation events will be interpreted by the user land logic, contains useful information about on-going events and provides animation capabilities.

`lockRotationOnZoomPan: Boolean = false`

If `true`, rotation is allowed only if touch slop is detected for rotation before pan or zoom motions. If not, pan and zoom gestures will be detected, but rotation gestures will not be. If `false`, once touch slop is reached, all three gestures are detected.

`enabled: Boolean = true`

whether zooming by gestures is enabled or not

### Modifier.transformable

Cmn

Artifact: androidx.compose.foundation:foundation

View Source

fun Modifier.transformable( 
    state: TransformableState, 
    canPan: (Offset) \-> Boolean, 
    lockRotationOnZoomPan: Boolean = false, 
    enabled: Boolean = true 
): Modifier

Enable transformation gestures of the modified UI element.

Users should update their state themselves using default `TransformableState` and its `onTransformation` callback or by implementing `TransformableState` interface manually and reflect their own state in UI when using this component.

This overload of transformable modifier provides `canPan` parameter, which allows the caller to control when the pan can start. making pan gesture to not to start when the scale is 1f makes transformable modifiers to work well within the scrollable container. See example:

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.gestures.animateZoomBy
import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.gestures.rememberTransformableState
import androidx.compose.foundation.gestures.transformable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.foundation.rememberScrollState
import androidx.compose.material.Text
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clipToBounds
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.geometry.center
import androidx.compose.ui.geometry.isSpecified
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.TransformOrigin
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.layout.onSizeChanged
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.unit.toSize

/\*\*
 \* Rotates the given offset around the origin by the given angle in degrees.
 \*
 \* A positive angle indicates a counterclockwise rotation around the right-handed 2D Cartesian
 \* coordinate system.
 \*
 \* See: \[Rotation matrix\](https://en.wikipedia.org/wiki/Rotation\_matrix)
 \*/
fun Offset.rotateBy(angle: Float): Offset {
 val angleInRadians \= angle \* (PI / 180)
 val cos \= cos(angleInRadians)
 val sin \= sin(angleInRadians)
 return Offset((x \* cos \- y \* sin).toFloat(), (x \* sin + y \* cos).toFloat())
}

Row(Modifier.size(width \= 120.dp, height \= 100.dp).horizontalScroll(rememberScrollState())) {
 // first child of the scrollable row is a transformable
 Box(Modifier.size(100.dp).clipToBounds().background(Color.LightGray)) {
 // set up all transformation states
 var scale by remember { mutableStateOf(1f) }
 var rotation by remember { mutableStateOf(0f) }
 var offset by remember { mutableStateOf(Offset.Zero) }
 val coroutineScope \= rememberCoroutineScope()

 var size by remember { mutableStateOf(Size.Zero) }

 // let's create a modifier state to specify how to update our UI state defined above
 val state \=
 rememberTransformableState { centroid, zoomChange, offsetChange, rotationChange \-\>
 val oldScale \= scale
 val newScale \= max(scale \* zoomChange, 1f)

 // If the centroid isn't specified, assume it should be applied from the center
 val effectiveCentroid \= centroid.takeIf { it.isSpecified } ?: size.center

 // For natural zooming and rotating, the centroid of the gesture should
 // be the fixed point where zooming and rotating occurs.
 // We compute where the centroid was (in the pre-transformed coordinate
 // space), and then compute where it will be after this delta.
 // We then compute what the new offset should be to keep the centroid
 // visually stationary for rotating and zooming, and also apply the pan.
 offset \=
 (offset + effectiveCentroid / oldScale).rotateBy(rotationChange) \-
 (effectiveCentroid / newScale + offsetChange / oldScale)
 scale \= newScale
 rotation += rotationChange
 }
 Box(
 Modifier.onSizeChanged { size \= it.toSize() }
 // add transformable to listen to multitouch transformation events after offset
 // To make sure our transformable work well within pager or scrolling lists,
 // disallow panning if we are not zoomed in.
 .transformable(state \= state, canPan \= { scale != 1f })
 // optional for example: add double click to zoom
 .pointerInput(Unit) {
 detectTapGestures(
 onDoubleTap \= { offset \-\>
 coroutineScope.launch { state.animateZoomBy(4f, centroid \= offset) }
 }
 )
 }
 .fillMaxSize()
 .border(1.dp, Color.Green)
 ) {
 Text(
 "\\uD83C\\uDF55",
 fontSize \= 32.sp,
 modifier \=
 Modifier.fillMaxSize()
 .graphicsLayer {
 translationX \= \-offset.x \* scale
 translationY \= \-offset.y \* scale
 scaleX \= scale
 scaleY \= scale
 rotationZ \= rotation
 transformOrigin \= TransformOrigin(0f, 0f)
 }
 .wrapContentSize(align \= Alignment.Center),
 )
 }
 }
 // other children are just colored boxes
 Box(Modifier.size(100.dp).background(Color.Red).border(2.dp, Color.Black))
}

Parameters

`state: TransformableState`

`TransformableState` of the transformable. Defines how transformation events will be interpreted by the user land logic, contains useful information about on-going events and provides animation capabilities.

`canPan: (Offset) -> Boolean`

whether the pan gesture can be performed or not given the pan offset

`lockRotationOnZoomPan: Boolean = false`

If `true`, rotation is allowed only if touch slop is detected for rotation before pan or zoom motions. If not, pan and zoom gestures will be detected, but rotation gestures will not be. If `false`, once touch slop is reached, all three gestures are detected.

`enabled: Boolean = true`

whether zooming by gestures is enabled or not

### Modifier.transformedHeight

android

Artifact: androidx.wear.compose:compose-material3

View Source

fun Modifier.transformedHeight( 
    scope: TransformingLazyColumnItemScope, 
    transformationSpec: TransformationSpec 
): Modifier

Convenience modifier to calculate transformed height using `TransformationSpec`.

### Modifier.visible

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.visible(visible: Boolean): Modifier

A `Modifier` that controls the visibility of the Layout it is applied to. When `visible` is `false`, the element will not be placed and thus will not be drawn or be interactable, but it will still be measured and take up space. It will also be invisible to accessibility services.

This is similar to the `View.INVISIBLE` visibility in the classic Android View system.

Note that `Modifier.visible` is not suitable for managing the visibility of a composable involved in a `androidx.compose.animation.SharedTransitionScope.sharedElement`/`androidx.compose.animation.SharedTransitionScope.sharedBounds` transition because it prevents placement.

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.visible
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

Box {
 // This box will not be visible but will still occupy 50.dp x 50.dp of space.
 Box(modifier \= Modifier.size(50.dp).background(Color.Red).visible(false))
}

Parameters

`visible: Boolean`

`true` to make the component visible, `false` to hide it.

### Modifier.imeNestedScroll

android

Artifact: androidx.compose.foundation:foundation-layout

View Source

@ExperimentalLayoutApi 
fun Modifier.imeNestedScroll(): Modifier

Controls the soft keyboard as a nested scrolling on Android `R` and later. This allows the user to drag the soft keyboard up and down.

After scrolling, the IME will animate either to the fully shown or fully hidden position, depending on the position and fling.

import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.imeNestedScroll
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material.Text
import androidx.compose.ui.Modifier

LazyColumn(
 modifier \=
 Modifier.fillMaxSize() // fill the window
 .imePadding() // pad out the bottom for the IME
 .imeNestedScroll(), // scroll IME at the bottom
 reverseLayout \= true, // First item is at the bottom
) {
 // content
 items(50) { Text("Hello World") }
}

### Modifier.captionBarPadding

Cmn android

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.captionBarPadding(): Modifier

Adds padding to accommodate the `caption bar` insets.

Any insets consumed by other insets padding modifiers or `consumeWindowInsets` on a parent layout will be excluded from the padding. `WindowInsets.Companion.captionBar` will be `consumed` for child layouts as well.

For example, if a parent layout uses `displayCutoutPadding`, the area that the parent layout pads for the status bars will not be padded again by this `captionBarPadding` modifier.

When used, the `WindowInsets` will be consumed.

import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.captionBarPadding
import androidx.compose.ui.Modifier
import androidx.core.view.WindowCompat

class SampleActivity : ComponentActivity() {
 override fun onCreate(savedInstanceState: Bundle?) {
 WindowCompat.setDecorFitsSystemWindows(window, false)
 super.onCreate(savedInstanceState)
 setContent {
 Box(Modifier.captionBarPadding()) {
 // app content
 }
 }
 }
}

### Modifier.consumeWindowInsets

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.consumeWindowInsets(insets: WindowInsets): Modifier

Consume insets that haven't been consumed yet by other insets Modifiers similar to `windowInsetsPadding` without adding any padding.

This can be useful when content offsets are provided by `WindowInsets.asPaddingValues`. This should be used further down the hierarchy than the `PaddingValues` is used so that the values aren't consumed before the padding is added.

import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.asPaddingValues
import androidx.compose.foundation.layout.consumeWindowInsets
import androidx.compose.foundation.layout.navigationBars
import androidx.compose.foundation.layout.padding
import androidx.compose.ui.Modifier
import androidx.core.view.WindowCompat

class SampleActivity : ComponentActivity() {
 override fun onCreate(savedInstanceState: Bundle?) {
 WindowCompat.setDecorFitsSystemWindows(window, false)
 super.onCreate(savedInstanceState)
 setContent {
 Box(Modifier.padding(WindowInsets.navigationBars.asPaddingValues())) {
 Box(Modifier.consumeWindowInsets(WindowInsets.navigationBars)) {
 // app content
 }
 }
 }
 }
}

### Modifier.consumeWindowInsets

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.consumeWindowInsets(paddingValues: PaddingValues): Modifier

Consume `paddingValues` as insets as if the padding was added irrespective of insets. Layouts further down the hierarchy that use `windowInsetsPadding`, `safeContentPadding`, and other insets padding Modifiers won't pad for the values that `paddingValues` provides. This can be useful when content offsets are provided by layout rather than `windowInsetsPadding` modifiers.

This method consumes all of `paddingValues` in addition to whatever has been consumed by other `windowInsetsPadding` modifiers by ancestors. `consumeWindowInsets` accepting a `WindowInsets` argument ensures that its insets are consumed and doesn't consume more if they have already been consumed by ancestors.

import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.consumeWindowInsets
import androidx.compose.foundation.layout.padding
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.unit.dp
import androidx.core.view.WindowCompat

class SampleActivity : ComponentActivity() {
 override fun onCreate(savedInstanceState: Bundle?) {
 WindowCompat.setDecorFitsSystemWindows(window, false)
 super.onCreate(savedInstanceState)
 setContent {
 with(LocalDensity.current) {
 val paddingValues \= PaddingValues(horizontal \= 20.dp)
 Box(Modifier.padding(paddingValues).consumeWindowInsets(paddingValues)) {
 // app content
 }
 }
 }
 }
}

### Modifier.displayCutoutPadding

Cmn android

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.displayCutoutPadding(): Modifier

Adds padding to accommodate the `display cutout`.

Any insets consumed by other insets padding modifiers or `consumeWindowInsets` on a parent layout will be excluded from the padding. `WindowInsets.Companion.displayCutout` will be `consumed` for child layouts as well.

For example, if a parent layout uses `statusBarsPadding`, the area that the parent layout pads for the status bars will not be padded again by this `displayCutoutPadding` modifier.

When used, the `WindowInsets` will be consumed.

import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.displayCutoutPadding
import androidx.compose.foundation.layout.statusBars
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.core.view.WindowCompat

class SampleActivity : ComponentActivity() {
 override fun onCreate(savedInstanceState: Bundle?) {
 WindowCompat.setDecorFitsSystemWindows(window, false)
 super.onCreate(savedInstanceState)
 setContent {
 Box(Modifier.background(Color.Blue).statusBarsPadding()) {
 Box(Modifier.background(Color.Yellow).displayCutoutPadding()) {
 // app content
 }
 }
 }
 }
}

### Modifier.imePadding

Cmn android

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.imePadding(): Modifier

Adds padding to accommodate the `ime` insets.

Any insets consumed by other insets padding modifiers or `consumeWindowInsets` on a parent layout will be excluded from the padding. `WindowInsets.Companion.ime` will be `consumed` for child layouts as well.

For example, if a parent layout uses `navigationBarsPadding`, the area that the parent layout pads for the status bars will not be padded again by this `imePadding` modifier.

When used, the `WindowInsets` will be consumed.

import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.ime
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.systemBars
import androidx.compose.foundation.layout.systemBarsPadding
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.core.view.WindowCompat

class SampleActivity : ComponentActivity() {
 override fun onCreate(savedInstanceState: Bundle?) {
 WindowCompat.setDecorFitsSystemWindows(window, false)
 super.onCreate(savedInstanceState)
 setContent {
 Box(Modifier.background(Color.Blue).systemBarsPadding()) {
 Box(Modifier.imePadding()) {
 // app content
 }
 }
 }
 }
}

### Modifier.mandatorySystemGesturesPadding

Cmn android

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.mandatorySystemGesturesPadding(): Modifier

Adds padding to accommodate the `mandatory system gestures` insets.

Any insets consumed by other insets padding modifiers or `consumeWindowInsets` on a parent layout will be excluded from the padding. `WindowInsets.Companion.mandatorySystemGestures` will be `consumed` for child layouts as well.

For example, if a parent layout uses `navigationBarsPadding`, the area that the parent layout pads for the status bars will not be padded again by this `mandatorySystemGesturesPadding` modifier.

When used, the `WindowInsets` will be consumed.

import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.mandatorySystemGesturesPadding
import androidx.compose.foundation.layout.systemBars
import androidx.compose.foundation.layout.systemBarsPadding
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.core.view.WindowCompat

class SampleActivity : ComponentActivity() {
 override fun onCreate(savedInstanceState: Bundle?) {
 WindowCompat.setDecorFitsSystemWindows(window, false)
 super.onCreate(savedInstanceState)
 setContent {
 Box(Modifier.background(Color.Blue).systemBarsPadding()) {
 // The app content won't interfere with the mandatory system gestures area.
 // It will just be white.
 Box(Modifier.background(Color.White).mandatorySystemGesturesPadding()) {
 // app content
 }
 }
 }
 }
}

### Modifier.navigationBarsPadding

Cmn android

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.navigationBarsPadding(): Modifier

Adds padding to accommodate the `navigation bars` insets.

Any insets consumed by other insets padding modifiers or `consumeWindowInsets` on a parent layout will be excluded from the padding. `WindowInsets.Companion.navigationBars` will be `consumed` for child layouts as well.

For example, if a parent layout uses `systemBarsPadding`, the area that the parent layout pads for the status bars will not be padded again by this `navigationBarsPadding` modifier.

When used, the `WindowInsets` will be consumed.

import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.navigationBars
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.statusBars
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.core.view.WindowCompat

class SampleActivity : ComponentActivity() {
 override fun onCreate(savedInstanceState: Bundle?) {
 WindowCompat.setDecorFitsSystemWindows(window, false)
 super.onCreate(savedInstanceState)
 setContent {
 Box(Modifier.background(Color.Blue).statusBarsPadding()) {
 Box(Modifier.background(Color.Green).navigationBarsPadding()) {
 // app content
 }
 }
 }
 }
}

### Modifier.onConsumedWindowInsetsChanged

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.onConsumedWindowInsetsChanged( 
    block: (consumedWindowInsets: WindowInsets) \-> Unit 
): Modifier

Calls `block` with the `WindowInsets` that have been consumed, either by `consumeWindowInsets` or one of the padding Modifiers, such as `imePadding`.

`block` can be called before or during measurement and layout. It should not be used to trigger changes to composition because composition will only be applied on the following frame, leading to the UI lagging WindowInsets by a frame.

import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.MutableWindowInsets
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.asPaddingValues
import androidx.compose.foundation.layout.exclude
import androidx.compose.foundation.layout.navigationBars
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.onConsumedWindowInsetsChanged
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeContent
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.core.view.WindowCompat

class SampleActivity : ComponentActivity() {
 override fun onCreate(savedInstanceState: Bundle?) {
 WindowCompat.setDecorFitsSystemWindows(window, false)
 super.onCreate(savedInstanceState)
 setContent {
 val remainingInsets \= remember { MutableWindowInsets() }
 val safeContent \= WindowInsets.safeContent
 Box(
 Modifier.navigationBarsPadding().onConsumedWindowInsetsChanged {
 consumedWindowInsets \-\>
 remainingInsets.insets \= safeContent.exclude(consumedWindowInsets)
 }
 ) {
 // padding can be used without recomposition when insets change.
 val padding \= remainingInsets.asPaddingValues()
 Box(Modifier.padding(padding))
 }
 }
 }
}

### Modifier.recalculateWindowInsets

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.recalculateWindowInsets(): Modifier

This recalculates the `WindowInsets` based on the size and position. This only works when `Constraints` have `fixed width` and `fixed height`. This can be accomplished, for example, by having `Modifier.size`, or `Modifier.fillMaxSize`, or other size modifier before `recalculateWindowInsets`. If the `Constraints` sizes aren't fixed, `recalculateWindowInsets` won't adjust the `WindowInsets` and won't have any affect on layout.

`recalculateWindowInsets` is useful when the parent does not call `consumeWindowInsets` when it aligns a child. For example, a `Column` with two children should have different `WindowInsets` for each child. The top item should exclude insets below its bottom and the bottom item should exclude the top insets, but the Column can't assign different insets for different children.

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.recalculateWindowInsets
import androidx.compose.foundation.layout.safeDrawingPadding
import androidx.compose.material.Button
import androidx.compose.material.Text
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color

var hasFirstItem by remember { mutableStateOf(true) }
var hasLastItem by remember { mutableStateOf(true) }
Column(Modifier.fillMaxSize()) {
 if (hasFirstItem) {
 Box(Modifier.weight(1f).fillMaxWidth().background(Color.Magenta))
 }
 Box(
 Modifier.fillMaxWidth() // force a fixed size on the content
 .recalculateWindowInsets()
 .weight(1f)
 .background(Color.Yellow)
 .safeDrawingPadding()
 ) {
 Button(
 onClick \= { hasFirstItem \= !hasFirstItem },
 Modifier.align(Alignment.TopCenter),
 ) {
 val action \= if (hasFirstItem) "Remove" else "Add"
 Text("$action First Item")
 }
 Button(
 onClick \= { hasLastItem \= !hasLastItem },
 Modifier.align(Alignment.BottomCenter),
 ) {
 val action \= if (hasLastItem) "Remove" else "Add"
 Text("$action Last Item")
 }
 }
 if (hasLastItem) {
 Box(Modifier.weight(1f).fillMaxWidth().background(Color.Cyan))
 }
}

Another use is when a parent doesn't properly `consumeWindowInsets` for all space that it consumes. For example, a 3rd-party container has padding that doesn't properly use `consumeWindowInsets`.

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.consumeWindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.recalculateWindowInsets
import androidx.compose.foundation.layout.safeContent
import androidx.compose.foundation.layout.safeContentPadding
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

// This outer Box is representing a 3rd-party layout that you don't control. It has a
// padding, but doesn't properly use consumeWindowInsets()
Box(Modifier.padding(10.dp)) {
 // This is the content that you control. You can make sure that the WindowInsets are correct
 // so you can pad your content despite the fact that the parent did not
 // consumeWindowInsets()
 Box(
 Modifier.fillMaxSize() // Force a fixed size on the content
 .recalculateWindowInsets()
 .safeContentPadding()
 .background(Color.Blue)
 )
}

In most cases you should not need to use this API, and the parent should instead use `consumeWindowInsets` to provide the correct values

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.consumeWindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeContent
import androidx.compose.foundation.layout.safeContentPadding
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

// The outer Box uses padding and properly compensates for it by using consumeWindowInsets()
Box(
 Modifier.fillMaxSize()
 .padding(10.dp)
 .consumeWindowInsets(WindowInsets(10.dp, 10.dp, 10.dp, 10.dp))
) {
 Box(Modifier.fillMaxSize().safeContentPadding().background(Color.Blue))
}

### Modifier.safeContentPadding

Cmn android

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.safeContentPadding(): Modifier

Adds padding to accommodate the `safe content` insets.

Any insets consumed by other insets padding modifiers or `consumeWindowInsets` on a parent layout will be excluded from the padding. `WindowInsets.Companion.safeContent` will be `consumed` for child layouts as well.

For example, if a parent layout uses `navigationBarsPadding`, the area that the parent layout pads for the status bars will not be padded again by this `safeContentPadding` modifier.

When used, the `WindowInsets` will be consumed.

import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.safeContent
import androidx.compose.foundation.layout.safeContentPadding
import androidx.compose.foundation.layout.systemBars
import androidx.compose.foundation.layout.systemBarsPadding
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.core.view.WindowCompat

class SampleActivity : ComponentActivity() {
 override fun onCreate(savedInstanceState: Bundle?) {
 WindowCompat.setDecorFitsSystemWindows(window, false)
 super.onCreate(savedInstanceState)
 setContent {
 Box(Modifier.background(Color.Black).systemBarsPadding()) {
 // The app content will only be drawn where there is no possible
 // gesture confusion and content will not be drawn over.
 // The rest will be plain white
 Box(Modifier.background(Color.White).safeContentPadding()) {
 // app content
 }
 }
 }
 }
}

### Modifier.safeDrawingPadding

Cmn android

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.safeDrawingPadding(): Modifier

Adds padding to accommodate the `safe drawing` insets.

Any insets consumed by other insets padding modifiers or `consumeWindowInsets` on a parent layout will be excluded from the padding. `WindowInsets.Companion.safeDrawing` will be `consumed` for child layouts as well.

For example, if a parent layout uses `statusBarsPadding`, the area that the parent pads for the status bars will not be padded again by this `safeDrawingPadding` modifier.

When used, the `WindowInsets` will be consumed.

import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.safeDrawingPadding
import androidx.compose.foundation.layout.systemBars
import androidx.compose.foundation.layout.systemBarsPadding
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.core.view.WindowCompat

class SampleActivity : ComponentActivity() {
 override fun onCreate(savedInstanceState: Bundle?) {
 WindowCompat.setDecorFitsSystemWindows(window, false)
 super.onCreate(savedInstanceState)
 setContent {
 Box(Modifier.background(Color.Black).systemBarsPadding()) {
 // The app content won't have anything drawing over it, but all the
 // background not in the status bars will be white.
 Box(Modifier.background(Color.White).safeDrawingPadding()) {
 // app content
 }
 }
 }
 }
}

### Modifier.safeGesturesPadding

Cmn android

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.safeGesturesPadding(): Modifier

Adds padding to accommodate the `safe gestures` insets.

Any insets consumed by other insets padding modifiers or `consumeWindowInsets` on a parent layout will be excluded from the padding. `WindowInsets.Companion.safeGestures` will be `consumed` for child layouts as well.

For example, if a parent layout uses `navigationBarsPadding`, the area that the parent layout pads for the status bars will not be padded again by this `safeGesturesPadding` modifier.

When used, the `WindowInsets` will be consumed.

import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.safeGesturesPadding
import androidx.compose.foundation.layout.systemBars
import androidx.compose.foundation.layout.systemBarsPadding
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.core.view.WindowCompat

class SampleActivity : ComponentActivity() {
 override fun onCreate(savedInstanceState: Bundle?) {
 WindowCompat.setDecorFitsSystemWindows(window, false)
 super.onCreate(savedInstanceState)
 setContent {
 Box(Modifier.background(Color.Black).systemBarsPadding()) {
 // The app content will only be drawn where there is no possible
 // gesture confusion. The rest will be plain white
 Box(Modifier.background(Color.White).safeGesturesPadding()) {
 // app content
 }
 }
 }
 }
}

### Modifier.statusBarsPadding

Cmn android

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.statusBarsPadding(): Modifier

Adds padding to accommodate the `status bars` insets.

Any insets consumed by other insets padding modifiers or `consumeWindowInsets` on a parent layout will be excluded from the padding. `WindowInsets.Companion.statusBars` will be `consumed` for child layouts as well.

For example, if a parent layout uses `displayCutoutPadding`, the area that the parent layout pads for the status bars will not be padded again by this `statusBarsPadding` modifier.

When used, the `WindowInsets` will be consumed.

import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.navigationBars
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.statusBars
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.core.view.WindowCompat

class SampleActivity : ComponentActivity() {
 override fun onCreate(savedInstanceState: Bundle?) {
 WindowCompat.setDecorFitsSystemWindows(window, false)
 super.onCreate(savedInstanceState)
 setContent {
 Box(Modifier.background(Color.Blue).statusBarsPadding()) {
 Box(Modifier.background(Color.Green).navigationBarsPadding()) {
 // app content
 }
 }
 }
 }
}

### Modifier.systemBarsPadding

Cmn android

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.systemBarsPadding(): Modifier

Adds padding to accommodate the `system bars` insets.

Any insets consumed by other insets padding modifiers or `consumeWindowInsets` on a parent layout will be excluded from the padding. `WindowInsets.Companion.systemBars` will be `consumed` for child layouts as well.

For example, if a parent layout uses `statusBarsPadding`, the area that the parent layout pads for the status bars will not be padded again by this `systemBarsPadding` modifier.

When used, the `WindowInsets` will be consumed.

import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.systemBars
import androidx.compose.foundation.layout.systemBarsPadding
import androidx.compose.ui.Modifier
import androidx.core.view.WindowCompat

class SampleActivity : ComponentActivity() {
 override fun onCreate(savedInstanceState: Bundle?) {
 WindowCompat.setDecorFitsSystemWindows(window, false)
 super.onCreate(savedInstanceState)
 setContent {
 Box(Modifier.systemBarsPadding()) {
 // app content
 }
 }
 }
}

### Modifier.systemGesturesPadding

Cmn android

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.systemGesturesPadding(): Modifier

Adds padding to accommodate the `system gestures` insets.

Any insets consumed by other insets padding modifiers or `consumeWindowInsets` on a parent layout will be excluded from the padding. `WindowInsets.Companion.systemGestures` will be `consumed` for child layouts as well.

For example, if a parent layout uses `waterfallPadding`, the area that the parent layout pads for the status bars will not be padded again by this `systemGesturesPadding` modifier.

When used, the `WindowInsets` will be consumed.

import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.systemBars
import androidx.compose.foundation.layout.systemBarsPadding
import androidx.compose.foundation.layout.systemGesturesPadding
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.core.view.WindowCompat

class SampleActivity : ComponentActivity() {
 override fun onCreate(savedInstanceState: Bundle?) {
 WindowCompat.setDecorFitsSystemWindows(window, false)
 super.onCreate(savedInstanceState)
 setContent {
 Box(Modifier.background(Color.Blue).systemBarsPadding()) {
 // The app content won't interfere with the system gestures area.
 // It will just be white.
 Box(Modifier.background(Color.White).systemGesturesPadding()) {
 // app content
 }
 }
 }
 }
}

### Modifier.waterfallPadding

Cmn android

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.waterfallPadding(): Modifier

Adds padding to accommodate the `waterfall` insets.

Any insets consumed by other insets padding modifiers or `consumeWindowInsets` on a parent layout will be excluded from the padding. `WindowInsets.Companion.waterfall` will be `consumed` for child layouts as well.

For example, if a parent layout uses `systemGesturesPadding`, the area that the parent layout pads for the status bars will not be padded again by this `waterfallPadding` modifier.

When used, the `WindowInsets` will be consumed.

import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.systemBars
import androidx.compose.foundation.layout.systemBarsPadding
import androidx.compose.foundation.layout.waterfallPadding
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.core.view.WindowCompat

class SampleActivity : ComponentActivity() {
 override fun onCreate(savedInstanceState: Bundle?) {
 WindowCompat.setDecorFitsSystemWindows(window, false)
 super.onCreate(savedInstanceState)
 setContent {
 Box(Modifier.background(Color.Blue).systemBarsPadding()) {
 // The app content shouldn't spill over the edges. They will be green.
 Box(Modifier.background(Color.Green).waterfallPadding()) {
 // app content
 }
 }
 }
 }
}

### Modifier.windowInsetsPadding

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.windowInsetsPadding(insets: WindowInsets): Modifier

Adds padding so that the content doesn't enter `insets` space.

Any insets consumed by other insets padding modifiers or `consumeWindowInsets` on a parent layout will be excluded from `insets`. `insets` will be `consumed` for child layouts as well.

For example, if an ancestor uses `statusBarsPadding` and this modifier uses `WindowInsets.Companion.systemBars`, the portion of the system bars that the status bars uses will not be padded again by this modifier.

import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.ime
import androidx.compose.foundation.layout.systemBars
import androidx.compose.foundation.layout.union
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.core.view.WindowCompat

class SampleActivity : ComponentActivity() {
 override fun onCreate(savedInstanceState: Bundle?) {
 WindowCompat.setDecorFitsSystemWindows(window, false)
 super.onCreate(savedInstanceState)
 setContent {
 val insets \= WindowInsets.systemBars.union(WindowInsets.ime)
 Box(Modifier.background(Color.White).fillMaxSize().windowInsetsPadding(insets)) {
 // app content
 }
 }
 }
}

See also

`WindowInsets`

### Modifier.windowInsetsBottomHeight

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.windowInsetsBottomHeight(insets: WindowInsets): Modifier

Sets the height to that of `insets` at the `bottom` of the screen.

When used, the `WindowInsets` will respect the consumed insets from `windowInsetsPadding` and `consumeWindowInsets`, but won't consume any insets.

import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.navigationBars
import androidx.compose.foundation.layout.windowInsetsBottomHeight
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.core.view.WindowCompat

class SampleActivity : ComponentActivity() {
 override fun onCreate(savedInstanceState: Bundle?) {
 WindowCompat.setDecorFitsSystemWindows(window, false)
 super.onCreate(savedInstanceState)
 setContent {
 Box(Modifier.fillMaxSize()) {
 // Background for navigation bar at the bottom
 Box(
 Modifier.windowInsetsBottomHeight(WindowInsets.navigationBars)
 .fillMaxWidth()
 .align(Alignment.BottomCenter)
 .background(Color.Red)
 )
 // app content
 }
 }
 }
}

### Modifier.windowInsetsEndWidth

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.windowInsetsEndWidth(insets: WindowInsets): Modifier

Sets the width to that of `insets` at the `end` of the screen, using either `left` or `right`, depending on the `LayoutDirection`.

When used, the `WindowInsets` will respect the consumed insets from `windowInsetsPadding` and `consumeWindowInsets`, but won't consume any insets.

import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.navigationBars
import androidx.compose.foundation.layout.windowInsetsEndWidth
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.core.view.WindowCompat

class SampleActivity : ComponentActivity() {
 override fun onCreate(savedInstanceState: Bundle?) {
 WindowCompat.setDecorFitsSystemWindows(window, false)
 super.onCreate(savedInstanceState)
 setContent {
 Box(Modifier.fillMaxSize()) {
 // Background for navigation bar at the end
 Box(
 Modifier.windowInsetsEndWidth(WindowInsets.navigationBars)
 .fillMaxHeight()
 .align(Alignment.CenterEnd)
 .background(Color.Red)
 )
 // app content
 }
 }
 }
}

### Modifier.windowInsetsStartWidth

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.windowInsetsStartWidth(insets: WindowInsets): Modifier

Sets the width to that of `insets` at the `start` of the screen, using either `left` or `right`, depending on the `LayoutDirection`.

When used, the `WindowInsets` will respect the consumed insets from `windowInsetsPadding` and `consumeWindowInsets`, but won't consume any insets.

import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.navigationBars
import androidx.compose.foundation.layout.windowInsetsStartWidth
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.core.view.WindowCompat

class SampleActivity : ComponentActivity() {
 override fun onCreate(savedInstanceState: Bundle?) {
 WindowCompat.setDecorFitsSystemWindows(window, false)
 super.onCreate(savedInstanceState)
 setContent {
 Box(Modifier.fillMaxSize()) {
 // Background for navigation bar at the start
 Box(
 Modifier.windowInsetsStartWidth(WindowInsets.navigationBars)
 .fillMaxHeight()
 .align(Alignment.CenterStart)
 .background(Color.Red)
 )
 // app content
 }
 }
 }
}

### Modifier.windowInsetsTopHeight

Cmn

Artifact: androidx.compose.foundation:foundation-layout

View Source

fun Modifier.windowInsetsTopHeight(insets: WindowInsets): Modifier

Sets the height to that of `insets` at the `top` of the screen.

When used, the `WindowInsets` will respect the consumed insets from `windowInsetsPadding` and `consumeWindowInsets`, but won't consume any insets.

import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.statusBars
import androidx.compose.foundation.layout.windowInsetsTopHeight
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.core.view.WindowCompat

class SampleActivity : ComponentActivity() {
 override fun onCreate(savedInstanceState: Bundle?) {
 WindowCompat.setDecorFitsSystemWindows(window, false)
 super.onCreate(savedInstanceState)
 setContent {
 Box(Modifier.fillMaxSize()) {
 // Background for status bar at the top
 Box(
 Modifier.windowInsetsTopHeight(WindowInsets.statusBars)
 .fillMaxWidth()
 .align(Alignment.TopCenter)
 .background(Color.Red)
 )
 // app content
 }
 }
 }
}

### Modifier.zIndex

Cmn

Artifact: androidx.compose.ui:ui

View Source

fun Modifier.zIndex(zIndex: Float): Modifier

Creates a modifier that controls the drawing order for the children of the same layout parent. A child with larger `zIndex` will be drawn on top of all the children with smaller `zIndex`. When children have the same `zIndex` the original order in which the parent placed the children is used.

Note that if there would be multiple `zIndex` modifiers applied for the same layout the sum of their values will be used as the final zIndex. If no `zIndex` were applied for the layout then the default zIndex is 0.

import androidx.compose.foundation.layout.Box
import androidx.compose.material.Text
import androidx.compose.ui.Modifier
import androidx.compose.ui.zIndex

Box {
 Text("Drawn second", Modifier.zIndex(1f))
 Text("Drawn first")
}

### Modifier.resizeWithContentScale

android

Artifact: androidx.media3:media3-ui-compose

View Source

@UnstableApi 
@Composable 
fun Modifier.resizeWithContentScale( 
    contentScale: ContentScale, 
    sourceSizeDp: Size?, 
    density: Density = LocalDensity.current 
): Modifier

Attempts to size the original content rectangle to be inscribed into a destination by applying a specified `ContentScale` type.
