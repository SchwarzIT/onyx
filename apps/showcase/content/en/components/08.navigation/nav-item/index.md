---
title: Nav item
componentName: OnyxNavItem
navigation: false
---

An individual item within a navigation bar that can function either as a direct page link or as a trigger that expands a flyout menu of sub-pages.

## Belongs to

::support-component-belongs-to
---
path: /components/navigation/nav-bar
---
::

## Examples

### Basic

The nav item is automatically highlighted active if the current page matches the nav item link. Custom content is supported.

<<< ./examples/Basic.example.vue preview=true

### Children

Hierarchical page structures can be displayed using children that are shown when hovering the parent item.

<<< ./examples/Nested.example.vue preview=true

### Internal drilldown

When multiple layers of children are defined, an internal drilldown is used by default that supports navigation between the child layers.

<<< ./examples/NestedInternal.example.vue preview=true

### External drilldown

Additional, the drilldown can be external which displays the nested child layers using multiple flyouts. Please only use a limit amount of layers with the external drilldown since the available screen size can be limited on smaller screens.

<<< ./examples/NestedExternal.example.vue preview=true
