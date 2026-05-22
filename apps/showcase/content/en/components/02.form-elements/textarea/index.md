---
title: Textarea
componentName: OnyxTextarea
---

Textarea components support large text entries, giving users a spacious area to input or format continuous text, making them ideal for comments, descriptions, or other longer texts.

### Basic

The height of the textarea is sized automatically by default which ensures that there is a minimum height which grows as the user types in until the maximum height is reached. You can customize the minimum and maximum number of rows using the `autosize` property or disable the maximum height completely so the textarea grows infinitely.

_Type in multiple rows in the example below to see the autosize in action._

Additionally, the user can resize the textarea manually by dragging the bottom right corner vertically. You can disable this feature using the `disableManualResize` property.

:component-example{name="Basic" layout="grow"}

### Readonly & Disabled

Readonly and disabled are used to indicate that the textarea is currently not editable.

:component-example{name="Readonly" layout="grow"}

### Min and max length

When a min or maxlength is defined, the user must enter at least `min` and at most `max` characters before the textarea is valid. Otherwise the textarea is invalid and a proper error message is displayed. Optionally, a character counter can be displayed.

:component-example{name="MinMaxLength" layout="grow"}

### Loading & Skeleton

The loading state is used after a user interaction to indicate that the triggered action is currently loading / in progress. On the other hand, the skeleton should be used on initial page load when the data for the page / textarea is initially loaded.

:component-example{name="Loading" layout="grow"}

### Message

An optional message, error or success message can be displayed. Each message supports showing an info tooltip with further information.
When multiple message types are defined at once, only the most relevant will be displayed (e.g. error is preferred over the regular message).

:component-example{name="Message" layout="grow" orientation="vertical"}

### Slots

Custom content can be passed to the `leadingIcons` slot if needed.

:component-example{name="Slots" layout="grow"}

### Label positions

The textarea label can be positioned in several ways to support a wide variety of layouts.

:component-example{name="LabelPositions" layout="grow" orientation="vertical"}
