---
title: System button
componentName: OnyxSystemButton
---

The system button triggers interactions exclusively for a parent container - not for standalone actions / content - and is therefore smaller than regular buttons. For standalone usage, please prefer the regular [button](/components/buttons/button) or [icon button](/components/buttons/icon-button) instead.

It is commonly used for context menus, e.g. in combination with the [flyout menu](/components/basic/flyout-menu).

## Examples

### Basic

The system button is supported in two variants: Text or icon. A combination of both is not supported.

:component-example{name="Basic"}

### Colors

Different colors can be used, depending on the parent background to provide a good color contrast.

:component-example{name="Colors"}

### Disabled

The system button can be disabled to indicate that its associated action is currently not available.
For an improved user experience, it should be clear to the user _why_ the icon button is disabled.

:component-example{name="Disabled"}

### Context

The system button is intended to always be used as child component related to a parent to provide additional actions like copying a value, opening a link or showing a context menu.

:component-example{name="Context"}
