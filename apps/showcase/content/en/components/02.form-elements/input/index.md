---
title: Input
componentName: OnyxInput
---

Text inputs are essential UI elements where users can enter textual information. These components play a fundamental role in facilitating user interactions and data input within applications and websites.

## Examples

### Basic

:component-example{name="Basic" layout="grow"}

### Readonly & Disabled

Readonly and disabled are used to indicate that the input is currently not editable.

:component-example{name="Readonly" layout="grow"}

### Min and max length

When a min or maxlength is defined, the user must enter at least `min` and at most `max` characters before the input is valid. Otherwise the input is invalid and a proper error message is displayed. Optionally, a character counter can be displayed.

:component-example{name="MinMaxLength" layout="grow"}

### Loading & Skeleton

The loading state is used after a user interaction to indicate that the triggered action is currently loading / in progress. On the other hand, the skeleton should be used on initial page load when the data for the page is initially loaded.

:component-example{name="Loading" layout="grow"}

### Message

An optional message, error or success message can be displayed. Each message supports showing an info tooltip with further information.
When multiple message types are defined at once, only the most relevant will be displayed (e.g. error is preferred over the regular message).

:component-example{name="Message" layout="grow" orientation="vertical"}

### Slots

Multiple slots are supported to pass in custom content if needed.

:component-example{name="Slots" layout="grow"}

### Password

For password inputs, an additional button is displayed that allows the user to reveal the entered password.

:component-example{name="Password" layout="grow"}

### Label positions

THe input label can be positioned in several ways to support a wide variety of layouts.

:component-example{name="LabelPositions" layout="grow" orientation="vertical"}
