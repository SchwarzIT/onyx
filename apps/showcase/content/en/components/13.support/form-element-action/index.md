---
title: Form element action
componentName: OnyxFormElementAction
status: experimental
---

A button placed within a form element (input, select etc.) to trigger contextual actions, such as copying content, toggling visibility, or opening auxiliary pickers.
Some of our form components already have built-in features for e.g. clearing the current value or show/hide the password. So check the component examples and properties first.

## Examples

### Small

Displays a small inline action inside the `leadingIcons` or `trailingIcons` slot of a form element.

<<< ./examples/Small.example.vue preview=true layout=grow

### Large

Displays a large full-size action inside the `leading` or `trailing` slot of a form element.

<<< ./examples/Large.example.vue preview=true layout=grow

### Toggle

Use a toggle button if it toggles a feature, content etc. between two values, e.g. to show or hide additional filters. This example toggles a [dialog](/components/feedback/dialog) with additional information.

<<< ./examples/Toggle.example.vue preview=true layout=grow

### Show on focus

To show the action only when the input is focused, enable the `showOnFocus` property.

<<< ./examples/ShowOnFocus.example.vue preview=true layout=grow

### Highlight

The action can visually be highlighted. When set to `auto`, the highlighting is shown automatically when the input is hovered, focused or the associated flyout is opened (e.g. inside a select).

<<< ./examples/Highlight.example.vue preview=true layout=grow
