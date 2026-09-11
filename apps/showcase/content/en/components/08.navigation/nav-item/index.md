---
title: Nav item
componentName: OnyxNavItem
navigation: false
---

The nav item is used to build the [navigation bar](/components/navigation/nav-bar) component and not intended to be used standalone.

<div class="onyx-grid">
<link-card class="onyx-grid-span-4" headline="Nav bar documentation" link="/components/navigation/nav-bar">
Please refer to the nav bar component for a full list of examples.
</link-card>
</div>

## Examples

### Basic

The nav item is automatically highlighted active if the current page matches the nav item link. Custom content is supported.

:component-example{name="Basic"}

### Children

Hierarchical page structures can be displayed using children that are shown when hovering the parent item.

:component-example{name="Nested"}

### Internal drilldown

When multiple layers of children are defined, an internal drilldown is used by default that supports navigation between the child layers.

:component-example{name="NestedInternal"}

### External drilldown

Additional, the drilldown can be external which displays the nested child layers using multiple flyouts. Please only use a limit amount of layers with the external drilldown since the available screen size can be limited on smaller screens.

:component-example{name="NestedExternal"}
