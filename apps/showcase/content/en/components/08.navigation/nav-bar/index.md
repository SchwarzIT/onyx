---
title: Nav bar
componentName: OnyxNavBar
---

The navigation bar provides the primary routing header for an application, allowing users to navigate between sections. It also accommodates global actions such as authentication, language switching, theme selection, global search, and notification centers.

The navigation bar is designed to be placed inside the `#navBar` slot of [OnyxAppLayout](/components/layouts/app-layout).

## Examples

### Basic

A basic navigation bar displays the application title, logo, and top-level navigation links. On compact viewports, it switches automatically to mobile mode.

Navigation items can be standalone links or parent menus with nested links revealed on hover or click.

<<< ./examples/Basic.example.vue preview=true  layout="fullWidth"

<br />

<div class="onyx-grid">

::component-overview-card
---
title: Nav item
path: /components/navigation/nav-item
class: onyx-grid-span-4
---
::

</div>

<br />

### Nested nav items

Navigation items support multilevel nested hierarchies.

<steps>

::step
#headline
Children

#default
Child items open in a dropdown menu from the parent item. The parent item can optionally link to an overview page.

<<< ./examples/Nested.example.vue preview=true  layout="fullWidth"
::

::step
#headline
Internal drilldown

#default
When navigating deeper hierarchies, nested submenus slide smoothly within the same dropdown panel.

<<< ./examples/NestedInternal.example.vue preview=true  layout="fullWidth"
::

::step
#headline
External drilldown

#default
Displays child layers in cascading flyout panels. Limit nesting depth when using external drilldowns to prevent viewport overflow.

<<< ./examples/NestedExternal.example.vue preview=true  layout="fullWidth"
::

</steps>

<br />

### Context area

The context area on the right hosts global actions such as account settings, notifications, or locale selectors. Items placed in `globalContextArea` remain pinned and visible in mobile views rather than collapsing into the hamburger menu.

<<< ./examples/ContextArea.example.vue preview=true  layout="fullWidth"

<br />

Available components designed for the context area:

<div class="onyx-grid">

::component-overview-card
---
title: User menu
path: /components/navigation/user-menu
class: onyx-grid-span-4
---
::

::component-overview-card
---
title: Nav button
path: /components/navigation/nav-button
class: onyx-grid-span-4
---
::

::component-overview-card
---
title: Timer
path: /components/navigation/timer
class: onyx-grid-span-4
---
::

::component-overview-card
---
title: Notification center
path: /components/notifications/notification-center
class: onyx-grid-span-4
---
::

::component-overview-card
---
title: Global search
path: /components/search-and-filter/global-search
class: onyx-grid-span-4
---
::

::component-overview-card
---
title: Language menu item
path: /components/navigation/language-menu-item
class: onyx-grid-span-4
---
::

::component-overview-card
---
title: Color scheme menu item
path: /components/navigation/color-scheme-menu-item
class: onyx-grid-span-4
---
::

::component-overview-card
---
title: Color scheme dialog
path: /components/navigation/color-scheme-dialog
class: onyx-grid-span-4
---
::

</div>

<br />

### Back button

An optional back button enables navigation to the previous route.

<<< ./examples/BackButton.example.vue preview=true  layout="fullWidth"

### Vertical

The navigation bar can also render vertically along the side of the application. Vertical mode supports expanding and collapsing. Every nav item **must** include an icon so it remains identifiable when collapsed. We recommend switching to a horizontal navigation bar on small viewports.

<<< ./examples/Vertical.example.vue preview=true  layout="fullWidth"
