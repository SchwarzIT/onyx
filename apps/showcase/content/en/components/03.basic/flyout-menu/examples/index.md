---
title: Flyout menu
componentName: OnyxFlyoutMenu
---

The flyout menu is used to build up navigation or action menus that are placed relative to a parent element and are shown on click or hover.

## Examples

### Basic

A pre-defined [system button](/components/buttons/system-button) will be used as trigger button if not defined otherwise.
Each option supports a label, icon and optional link by default but custom content can be passed as slot if needed.

<steps>

::step
#headline
Hover

#default
The flyout menu is triggered on hover by default.

:component-example{name="Hover"}
::

::step
#headline
Click

#default
Optionally, the flyout menu can be triggered on click.

:component-example{name="Click"}
::

</steps>

<br />

### Custom trigger

The default trigger button can be overridden with any custom component. However, the trigger should be an interactive element such as a button or link. Make sure to bind the `trigger` slot property to the custom trigger, otherwise the flyout will not open/close on hover or click.

:component-example{name="CustomTrigger"}

### Nested options

Nested hierarchical data can be displayed using a drilldown where the user can open an option to see the nested related options.

<steps>

::step
#headline
Internal drilldown

#default
The internal drilldown only shows a single flyout menu which is replaced with the nested options when navigating. A "Back" button is shown to navigate back to the previous layer.

:component-example{name="InternalDrilldown"}
::

::step
#headline
External drilldown

#default
With the external drilldown, the nested options are expanded using additional flyout menus so all layers can be display at the same time. Make sure to only use a limited number of layers with the external drilldown to prevent cluttering the screen with many flyouts.

:component-example{name="ExternalDrilldown"}
::

</steps>

<br />

### Position and alignment

The position (placement of the flyout menu around the trigger) and alignment (relative to the trigger, based on the position) are calculated automatically depending on the placement on the screen. This ensures optimized visibility across multiple layouts and screen sizes. The position and alignment can be changed if needed but be aware that the flyout might not be ideally placed or not fully visible on all devices and layouts then.

:component-example{name="PositionAndAlignment"}

### Disabled

The disabled state can be used to prevent opening the flyout.

:component-example{name="Disabled"}
