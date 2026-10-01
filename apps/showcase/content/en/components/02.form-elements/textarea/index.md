---
title: Textarea
componentName: OnyxTextarea
---

Textarea components support large text entries, giving users a spacious area to input or format continuous text, making them ideal for comments, descriptions, or other longer texts.

### Basic

By default, the height of the textarea is sized automatically, which ensures a minimum height that grows as the user types until a maximum height is reached. You can customize the minimum and maximum number of rows using the `autosize` property, or you can disable the maximum height completely, allowing the textarea to grow infinitely.

_Type multiple rows into the example below to see the autosizing in action._

Additionally, the user can resize the textarea manually by dragging the bottom right corner vertically. You can disable this feature using the `disableManualResize` property.

<<< ./examples/Basic.example.vue preview=true  layout="grow"

### Readonly & Disabled

Readonly and disabled are used to indicate that the textarea is currently not editable.

<<< ./examples/Readonly.example.vue preview=true  layout="grow"

### Min and max length

If `minlength` or `maxlength` is defined, the user must enter at least `minlength` and at most `maxlength` characters before the textarea becomes valid. Otherwise the textarea is invalid and an error message is displayed. Optionally, a character counter can be displayed.

<<< ./examples/MinMaxLength.example.vue preview=true  layout="grow"

### Loading & Skeleton

The loading state is used after a user interaction to indicate that the triggered action is currently loading / in progress. On the other hand, the skeleton should be used on initial page load when the data for the page / textarea is initially loaded.

<<< ./examples/Loading.example.vue preview=true  layout="grow"

### Message

An optional message, error or success message can be displayed. Each message supports showing an info tooltip with further information.
When multiple message types are defined at once, only the most relevant will be displayed (e.g. error message takes precedent over the regular message).

<<< ./examples/Message.example.vue preview=true  layout="grow" orientation="vertical"

### Slots

Custom content can be passed to the `leadingIcons` slot if needed.

<<< ./examples/Slots.example.vue preview=true  layout="grow"

### Label positions

The textarea label can be positioned in several ways to support a wide variety of layouts.

<<< ./examples/LabelPositions.example.vue preview=true  layout="grow" orientation="vertical"
