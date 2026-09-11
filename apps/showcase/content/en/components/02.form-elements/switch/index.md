---
title: Switch
componentName: OnyxSwitch
---

Switches are a common UI element used to control binary states, such as on/off, enable/disable or active/inactive. They consist of a toggle mechanism that allow users to switch between two distinct states with a simple interaction.

## Examples

### Basic

The switch can be used with or without a visual label.

:component-example{name="Basic"}

### Loading & Skeleton

The loading state is used after a user interaction to indicate that the triggered action is currently loading / in progress. On the other hand, the skeleton should be used on initial page load when the data for the page / switch is initially loaded.

:component-example{name="Loading"}

### Message

An optional message, error or success message can be displayed. Each message supports showing an info tooltip with further information.
When multiple message types are defined at once, only the most relevant will be displayed (e.g. error message takes precedent over the regular message).

:component-example{name="Message" layout="grow" orientation="vertical"}

### Disabled

The switch can be disabled to indicate that its action is currently not available and the switch can not be toggled.
For an improved user experience, it should be clear to the user _why_ the switch is disabled.

:component-example{name="Disabled"}

### Label positions

The switch label can be positioned in several ways to support a wide variety of layouts.

:component-example{ name="LabelPositions" orientation="vertical"}

### Value label

The switch value label can be used to display different labels depending on its state.

:component-example{ name="ValueLabel"}

