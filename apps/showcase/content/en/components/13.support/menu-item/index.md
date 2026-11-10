---
title: Menu item
componentName: OnyxMenuItem
---

The menu item represents a single action inside of a parent menu component such as the [flyout menu](/components/basic/flyout-menu). It is **not** intended for standalone use.

## Belongs to

This component is used as a support component within several other components and should NOT be used standalone. Use it for example together with:

<div class="onyx-grid">

::component-overview-card
---
path: /components/basic/flyout-menu
class: onyx-grid-span-4
---
::

::component-overview-card
---
path: /components/navigation/user-menu
class: onyx-grid-span-4
---
::

::component-overview-card
---
path: /components/buttons/split-button
class: onyx-grid-span-4
---
::

</div>

## Examples

### Basic

The basic menu item supports a label and an optional icon. It can be used either as link or as button with a custom action.

<<< ./examples/Basic.example.vue preview=true layout=vertical

### Disabled

Use the disabled item to indicate that the associated action is currently not available.

<<< ./examples/Disabled.example.vue preview=true

### Custom content

Use custom content to add additional information such as metadata etc.

<<< ./examples/CustomContent.example.vue preview=true
