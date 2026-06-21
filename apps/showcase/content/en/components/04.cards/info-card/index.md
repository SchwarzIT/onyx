---
title: Info card
componentName: OnyxInfoCard
---

Info cards are used to display informational content to the user or implement error handling within components. They can e.g. be used in cases where the user needs to manually review changes or to inform him about a system-related status.

## Examples

### Basic

A basic info card includes a headline and description text but can also only contain one of them. The default icon can be changed using the `icon` property or removed completely by setting the value to `false`.

:component-example{name="Basic" layout="grow"}

### Colors

Different colors are supported depending on the semantical meaning of the information. See our [color documentation](/introduction/foundation/colors#colors) for when to use which color.

:component-example{name="Colors" layout="grow" orientation="vertical"}

### Closable

For temporary or one-time information, the info card can be closable which allows the user to close it.

:component-example{name="Closable" layout="grow"}

### Buttons

Additional buttons are supported to perform custom actions.

:component-example{name="Buttons" layout="grow"}

### Header actions

Custom actions can be displayed inside the header using a [flyout menu](/components/basic/flyout-menu). See the [menu item](/components/basic/menu-item) component for all available options.

:component-example{name="HeaderActions" layout="grow"}
