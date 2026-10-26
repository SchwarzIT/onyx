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
<link-card class="onyx-grid-span-4" headline="Nav item" link="/components/navigation/nav-item">
Explore navigation item variants and configuration options.
</link-card>
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

<link-card class="onyx-grid-span-4" headline="User menu" link="/components/navigation/user-menu">
User profile summary with logout, settings, and profile links.
</link-card>

<link-card class="onyx-grid-span-4" headline="Nav button" link="/components/navigation/nav-button">
Context buttons for custom dialogs, locale triggers, or alerts.
</link-card>

<link-card class="onyx-grid-span-4" headline="Timer" link="/components/navigation/timer">
Session countdown and auto-logout warning display.
</link-card>

<link-card class="onyx-grid-span-4" headline="Notification center" link="/components/notifications/notification-center">
In-app notification drawer and feed.
</link-card>

<link-card class="onyx-grid-span-4" headline="Global search" link="/components/search-and-filter/global-search">
Keyboard-driven search trigger for cross-app navigation.
</link-card>

<link-card class="onyx-grid-span-4" headline="Language menu item" link="/components/navigation/language-menu-item">
Dropdown trigger to switch application locales.
</link-card>

<link-card class="onyx-grid-span-4" headline="Color scheme menu item" link="/components/navigation/color-scheme-menu-item">
Theme switcher menu for light, dark, and system modes.
</link-card>

<link-card class="onyx-grid-span-4" headline="Color scheme dialog" link="/components/navigation/color-scheme-dialog">
Theme selection modal dialog.
</link-card>

</div>

<br />

### Back button

An optional back button enables navigation to the previous route.

<<< ./examples/BackButton.example.vue preview=true  layout="fullWidth"

### Vertical

The navigation bar can also render vertically along the side of the application. Vertical mode supports expanding and collapsing. Every nav item **must** include an icon so it remains identifiable when collapsed. We recommend switching to a horizontal navigation bar on small viewports.

<<< ./examples/Vertical.example.vue preview=true  layout="fullWidth"
