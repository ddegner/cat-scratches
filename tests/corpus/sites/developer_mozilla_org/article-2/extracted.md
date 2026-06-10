Baseline Widely available \*

This feature is well established and works across many devices and browser versions. It’s been available across browsers since October 2017.

\* Some parts of this feature may have varying levels of support.

* [Learn more](/en-US/docs/Glossary/Baseline/Compatibility)
* [See full compatibility](#browser_compatibility)
* [Report feedback](https://survey.alchemer.com/s3/7634825/MDN-baseline-feedback?page=%2Fen-US%2Fdocs%2FWeb%2FCSS%2FReference%2FProperties%2Fgrid-template-columns&level=high)

The **`grid-template-columns`** [CSS](/en-US/docs/Web/CSS) property defines the line names and track sizing functions of the [grid columns](/en-US/docs/Glossary/Grid_Column).

## [Try it](#try_it)

```
grid-template-columns: 60px 60px;
```

```
grid-template-columns: 1fr 60px;
```

```
grid-template-columns: 1fr 2fr;
```

```
grid-template-columns: 8ch auto;
```

```
<section class="default-example" id="default-example">
  <div class="example-container">
    <div class="transition-all" id="example-element">
      <div>One</div>
      <div>Two</div>
      <div>Three</div>
      <div>Four</div>
      <div>Five</div>
    </div>
  </div>
</section>
```

```
#example-element {
  border: 1px solid #c5c5c5;
  display: grid;
  grid-auto-rows: 40px;
  grid-gap: 10px;
  width: 200px;
}

#example-element > div {
  background-color: rgb(0 0 255 / 0.2);
  border: 3px solid blue;
}
```
css

```
/* Keyword value */
grid-template-columns: none;

/* <track-list> values */
grid-template-columns: 100px 1fr;
grid-template-columns: [line-name] 100px;
grid-template-columns: [line-name1] 100px [line-name2 line-name3];
grid-template-columns: minmax(100px, 1fr);
grid-template-columns: fit-content(40%);
grid-template-columns: repeat(3, 200px);
grid-template-columns: subgrid;
grid-template-columns: masonry;

/* <auto-track-list> values */
grid-template-columns: 200px repeat(auto-fill, 100px) 300px;
grid-template-columns:
  minmax(100px, max-content)
  repeat(auto-fill, 200px) 20%;
grid-template-columns:
  [line-name1] 100px [line-name2]
  repeat(auto-fit, [line-name3 line-name4] 300px)
  100px;
grid-template-columns:
  [line-name1 line-name2] 100px
  repeat(auto-fit, [line-name1] 300px) [line-name3];

/* Global values */
grid-template-columns: inherit;
grid-template-columns: initial;
grid-template-columns: revert;
grid-template-columns: revert-layer;
grid-template-columns: unset;
```
[`none`](#none)

Indicates that there is no explicit grid. Any columns will be implicitly generated and their size will be determined by the [`grid-auto-columns`](/en-US/docs/Web/CSS/Reference/Properties/grid-auto-columns) property.

[`[line-name]`](#line-name)

A [`<custom-ident>`](/en-US/docs/Web/CSS/Reference/Values/custom-ident) specifying a name for the line in that location. The ident may be any valid string other than the reserved words `span` and `auto`. Lines may have multiple names separated by a space inside the square brackets, for example `[line-name-a line-name-b]`.

[`<length>`](/en-US/docs/Web/CSS/Reference/Values/length)

A non-negative length, giving the width of the column.

[`<percentage>`](/en-US/docs/Web/CSS/Reference/Values/percentage)

A non-negative [`<percentage>`](/en-US/docs/Web/CSS/Reference/Values/percentage) value relative to the inline size of the grid container. If the size of the grid container depends on the size of its tracks, the browser treats the percentage as `auto`. The browser may adjust the intrinsic size contributions of the track to the size of the grid container and may increase the final size of the track by the minimum amount that would result in honoring the percentage.

[`<flex>`](/en-US/docs/Web/CSS/Reference/Values/flex_value)

Is a non-negative dimension with the unit `fr` specifying the track's flex factor. Each `<flex>`\-sized track takes a share of the remaining space in proportion to its flex factor.

When appearing outside a `minmax()` notation, it implies an automatic minimum (i.e., `minmax(auto, <flex>)`).

[`max-content`](/en-US/docs/Web/CSS/Reference/Values/max-content)

Is a keyword representing the largest [maximal content contribution](https://drafts.csswg.org/css-sizing-3/#max-content) of the grid items occupying the grid track. For example, if the first element of the grid track contains the sentence _"Repetitio est mater studiorum"_ and the second element contains the sentence _"Dum spiro, spero"_, maximal content contribution will be defined by the size of the largest sentence among all of the grid elements - _"Repetitio est mater studiorum"_.

[`min-content`](/en-US/docs/Web/CSS/Reference/Values/min-content)

Is a keyword representing the largest [minimal content contribution](https://drafts.csswg.org/css-sizing-3/#min-content) of the grid items occupying the grid track. For example, if the first element of the grid track contains the sentence _"Repetitio est mater studiorum"_ and the second element contains the sentence _"Dum spiro, spero"_, minimal content contribution will be defined by the size of the largest word among all of the sentences in the grid elements - _"studiorum"_.

[`minmax(min, max)`](/en-US/docs/Web/CSS/Reference/Values/minmax)

Is a functional notation that defines a size range greater than or equal to _min_ and less than or equal to _max_. If _max_ is smaller than _min_, then _max_ is ignored and the function is treated as _min_. As a maximum, a `<flex>` value sets the track's flex factor. It is invalid as a minimum.

[`auto`](#auto)

As a maximum value, it represents the largest [`max-content`](/en-US/docs/Web/CSS/Reference/Values/max-content) size of the items in that track.

As a minimum value, it represents the largest minimum size of items in that track (specified by the [`min-width`](/en-US/docs/Web/CSS/Reference/Properties/min-width)/[`min-height`](/en-US/docs/Web/CSS/Reference/Properties/min-height) properties of the items). This often corresponds to the [`min-content`](/en-US/docs/Web/CSS/Reference/Values/min-content) size, but not always.

If used outside of [`minmax()`](/en-US/docs/Web/CSS/Reference/Values/minmax) notation, `auto` represents the range between the minimum and maximum values described above. In most cases, this behaves similarly to `minmax(min-content,max-content)`.

**Note:** `auto` track sizes (and only `auto` track sizes) can be stretched by the [`align-content`](/en-US/docs/Web/CSS/Reference/Properties/align-content) and [`justify-content`](/en-US/docs/Web/CSS/Reference/Properties/justify-content) properties. Therefore, by default, an `auto`\-sized track will take up any remaining space in the grid container.

[`fit-content( [ <length> | <percentage> ] )`](/en-US/docs/Web/CSS/Reference/Values/fit-content_function)

Represents the formula `max(minimum, min(limit, max-content))`, where _minimum_ represents an `auto` minimum (which is often, but not always, equal to a [`min-content`](/en-US/docs/Web/CSS/Reference/Values/min-content) minimum), and _limit_ is the track sizing function passed as an argument to fit-content(). This is essentially calculated as the smaller of `minmax(auto, max-content)` and `minmax(auto, limit)`.

[`repeat( [ <positive-integer> | auto-fill | auto-fit ] , <track-list> )`](/en-US/docs/Web/CSS/Reference/Values/repeat)

Represents a repeated fragment of the track list, allowing a large number of columns that exhibit a recurring pattern to be written in a more compact form.

[`masonry`](/en-US/docs/Web/CSS/Guides/Grid_layout/Masonry_layout)

The masonry value indicates that this axis should be laid out according to the masonry algorithm.

[`subgrid`](/en-US/docs/Web/CSS/Guides/Grid_layout/Subgrid)

The `subgrid` value indicates that the grid will adopt the spanned portion of its parent grid in that axis. Rather than being specified explicitly, the sizes of the grid rows/columns will be taken from the parent grid's definition.

## [Formal definition](#formal_definition)

## [Formal syntax](#formal_syntax)

grid-template-columns = 
  none [|](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#single_bar "Single bar: exactly one of the entities must be present") 
  <track-list> [|](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#single_bar "Single bar: exactly one of the entities must be present") 
  <auto-track-list> [|](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#single_bar "Single bar: exactly one of the entities must be present") 
  subgrid <line-name-list>[?](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#question_mark "Question mark: the entity is optional") 
  
<track-list> = 
  [\ <line-names>[?](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#question_mark "Question mark: the entity is optional") [\ <track-size> [|](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#single_bar "Single bar: exactly one of the entities must be present") <track-repeat> [\]](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#brackets "Brackets: enclose several entities, combinators, and multipliers to transform them as a single component") [\]](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#brackets "Brackets: enclose several entities, combinators, and multipliers to transform them as a single component")[+](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#plus "Plus: the entity may occur one or several times") <line-names>[?](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#question_mark "Question mark: the entity is optional") 
  
<auto-track-list> = 
  [\ <line-names>[?](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#question_mark "Question mark: the entity is optional") [\ <fixed-size> [|](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#single_bar "Single bar: exactly one of the entities must be present") <fixed-repeat> [\]](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#brackets "Brackets: enclose several entities, combinators, and multipliers to transform them as a single component") [\]](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#brackets "Brackets: enclose several entities, combinators, and multipliers to transform them as a single component")[\*](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#asterisk "Asterisk: the entity may occur zero, one or several times") <line-names>[?](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#question_mark "Question mark: the entity is optional") <auto-repeat> [\ <line-names>[?](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#question_mark "Question mark: the entity is optional") [\ <fixed-size> [|](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#single_bar "Single bar: exactly one of the entities must be present") <fixed-repeat> [\]](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#brackets "Brackets: enclose several entities, combinators, and multipliers to transform them as a single component") [\]](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#brackets "Brackets: enclose several entities, combinators, and multipliers to transform them as a single component")[\*](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#asterisk "Asterisk: the entity may occur zero, one or several times") <line-names>[?](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#question_mark "Question mark: the entity is optional") 
  
<line-name-list> = 
  [\ <line-names> [|](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#single_bar "Single bar: exactly one of the entities must be present") <name-repeat> [\]](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#brackets "Brackets: enclose several entities, combinators, and multipliers to transform them as a single component")[+](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#plus "Plus: the entity may occur one or several times") 
  
<line-names> = 
  '\[' [<custom-ident>](/en-US/docs/Web/CSS/Reference/Values/custom-ident)[\*](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#asterisk "Asterisk: the entity may occur zero, one or several times") '\]' 
  
<track-size> = 
  <track-breadth> [|](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#single_bar "Single bar: exactly one of the entities must be present") 
  minmax( <inflexible-breadth> , <track-breadth> ) [|](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#single_bar "Single bar: exactly one of the entities must be present") 
  fit-content( <length-percentage \[0,∞\]> ) 
  
<track-repeat> = 
  repeat( [\ <integer \[1,∞\]> [\]](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#brackets "Brackets: enclose several entities, combinators, and multipliers to transform them as a single component") , [\ <line-names>[?](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#question_mark "Question mark: the entity is optional") <track-size> [\]](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#brackets "Brackets: enclose several entities, combinators, and multipliers to transform them as a single component")[+](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#plus "Plus: the entity may occur one or several times") <line-names>[?](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#question_mark "Question mark: the entity is optional") ) 
  
<fixed-size> = 
  <fixed-breadth> [|](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#single_bar "Single bar: exactly one of the entities must be present") 
  minmax( <fixed-breadth> , <track-breadth> ) [|](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#single_bar "Single bar: exactly one of the entities must be present") 
  minmax( <inflexible-breadth> , <fixed-breadth> ) 
  
<fixed-repeat> = 
  repeat( [\ <integer \[1,∞\]> [\]](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#brackets "Brackets: enclose several entities, combinators, and multipliers to transform them as a single component") , [\ <line-names>[?](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#question_mark "Question mark: the entity is optional") <fixed-size> [\]](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#brackets "Brackets: enclose several entities, combinators, and multipliers to transform them as a single component")[+](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#plus "Plus: the entity may occur one or several times") <line-names>[?](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#question_mark "Question mark: the entity is optional") ) 
  
<auto-repeat> = 
  repeat( [\ auto-fill [|](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#single_bar "Single bar: exactly one of the entities must be present") auto-fit [\]](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#brackets "Brackets: enclose several entities, combinators, and multipliers to transform them as a single component") , [\ <line-names>[?](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#question_mark "Question mark: the entity is optional") <track-size> [\]](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#brackets "Brackets: enclose several entities, combinators, and multipliers to transform them as a single component")[+](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#plus "Plus: the entity may occur one or several times") <line-names>[?](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#question_mark "Question mark: the entity is optional") ) 
  
<name-repeat> = 
  repeat( [\ <integer \[1,∞\]> [|](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#single_bar "Single bar: exactly one of the entities must be present") auto-fill [\]](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#brackets "Brackets: enclose several entities, combinators, and multipliers to transform them as a single component") , <line-names>[+](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#plus "Plus: the entity may occur one or several times") ) 
  
<track-breadth> = 
  <length-percentage \[0,∞\]> [|](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#single_bar "Single bar: exactly one of the entities must be present") 
  <flex \[0,∞\]> [|](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#single_bar "Single bar: exactly one of the entities must be present") 
  min-content [|](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#single_bar "Single bar: exactly one of the entities must be present") 
  max-content [|](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#single_bar "Single bar: exactly one of the entities must be present") 
  auto 
  
<inflexible-breadth> = 
  <length-percentage \[0,∞\]> [|](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#single_bar "Single bar: exactly one of the entities must be present") 
  min-content [|](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#single_bar "Single bar: exactly one of the entities must be present") 
  max-content [|](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#single_bar "Single bar: exactly one of the entities must be present") 
  auto 
  
<length-percentage> = 
  [<length>](/en-US/docs/Web/CSS/Reference/Values/length) [|](/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#single_bar "Single bar: exactly one of the entities must be present") 
  [<percentage>](/en-US/docs/Web/CSS/Reference/Values/percentage) 
  
<integer> = 
  <number-token> 
  
<fixed-breadth> = 
  <length-percentage \[0,∞\]> 

## [Examples](#examples)

### [Specifying grid column sizes](#specifying_grid_column_sizes)

#### HTML

html

```
<div id="grid">
  <div id="areaA">A</div>
  <div id="areaB">B</div>
</div>
```
css

```
#grid {
  display: grid;
  width: 100%;
  grid-template-columns: 50px 1fr;
}

#areaA {
  background-color: lime;
}

#areaB {
  background-color: yellow;
}
```
## [Specifications](#specifications)

Specification

[CSS Grid Layout Module Level 2 
\# track-sizing](https://drafts.csswg.org/css-grid/#track-sizing)

[CSS Grid Layout Module Level 2 
\# subgrids](https://drafts.csswg.org/css-grid/#subgrids)

## [Browser compatibility](#browser_compatibility)

## [See also](#see_also)

* [`grid-template-rows`](/en-US/docs/Web/CSS/Reference/Properties/grid-template-rows)
* [`grid-template-areas`](/en-US/docs/Web/CSS/Reference/Properties/grid-template-areas)
* [`grid-template`](/en-US/docs/Web/CSS/Reference/Properties/grid-template)
* [Basic concepts of grid layout: grid tracks](/en-US/docs/Web/CSS/Guides/Grid_layout/Basic_concepts#grid_tracks)
* Video: [Defining a grid](https://gridbyexample.com/video/series-define-a-grid/)
* [Subgrid](/en-US/docs/Web/CSS/Guides/Grid_layout/Subgrid)

## Help improve MDN

[Learn how to contribute](/en-US/docs/MDN/Community/Getting_started)

This page was last modified on Dec 16, 2025 by [MDN contributors](/en-US/docs/Web/CSS/Reference/Properties/grid-template-columns/contributors.txt).

[View this page on GitHub](https://github.com/mdn/content/blob/main/files/en-us/web/css/reference/properties/grid-template-columns/index.md?plain=1 "Folder: en-us/web/css/reference/properties/grid-template-columns (Opens in a new tab)") • [Report a problem with this content](https://github.com/mdn/content/issues/new?template=page-report.yml&mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2FReference%2FProperties%2Fgrid-template-columns&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EPage+report+details%3C%2Fsummary%3E%0A%0A*+Folder%3A+%60en-us%2Fweb%2Fcss%2Freference%2Fproperties%2Fgrid-template-columns%60%0A*+MDN+URL%3A+https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2FReference%2FProperties%2Fgrid-template-columns%0A*+GitHub+URL%3A+https%3A%2F%2Fgithub.com%2Fmdn%2Fcontent%2Fblob%2Fmain%2Ffiles%2Fen-us%2Fweb%2Fcss%2Freference%2Fproperties%2Fgrid-template-columns%2Findex.md%0A*+Last+commit%3A+https%3A%2F%2Fgithub.com%2Fmdn%2Fcontent%2Fcommit%2F33094d735e90b4dcae5733331b79c51fee997410%0A*+Document+last+modified%3A+2025-12-16T15%3A14%3A26.000Z%0A%0A%3C%2Fdetails%3E "This will take you to GitHub to file a new issue.")
