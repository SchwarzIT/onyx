---
title: Nav bar
componentName: OnyxNavBar
---

The navigation bar is the foundation of an application's main navigation, allowing users to seamlessly move between pages and sections within the application. Additionally, it can provide access to global system-related information and interactions such as the user login, application language, color theme (light/dark mode), global search, notifications and more.

The nav bar is intended to be used within the [app layout](/components/layouts/app-layout) component.

## Examples

### Basic

A basic nav bar contains the application name and logo (if one exists) and navigation items linking to the main pages of the application. On smaller screen sizes, the nav bar automatically switches to an optimized mobile mode.

The individual nav items can either be standalone or contain nested children that are shown when hovering the parent nav item. For a full list of nav item examples, please refer to the [nav item](/components/navigation/nav-item) component. Nav items can also link to external applications.

:component-example{name="Basic" layout="fullWidth"}

### Context area

Use the context area on the right of the nav bar to show global system-related information and interactions such as the user's login or application language. The nav bar also supports a `globalContextArea` which will not be moved to a flyout menu in mobile mode.

:component-example{name="ContextArea" layout="fullWidth"}

<br />

We support several components that you can use inside of the context area. Check out their documentation for further information on how to use them:

<div class="onyx-grid">

<link-card class="onyx-grid-span-4" headline="User menu" link="/components/navigation/user-menu">
Display the currently logged in user with additional actions such as logout, settings and more.
</link-card>

<link-card class="onyx-grid-span-4" headline="Nav button" link="/components/navigation/nav-button">
Button to provide additional nav bar context actions such as language selection, notifications and more. Supports text and icon.
</link-card>

<link-card class="onyx-grid-span-4" headline="Timer" link="/components/navigation/timer">
Countdown timer, e.g. for when the user's login session expires.
</link-card>

<link-card class="onyx-grid-span-4" headline="Notification center" link="/components/notifications/notification-center">
Manage global notifications for the application.
</link-card>

<link-card class="onyx-grid-span-4" headline="Global search" link="/components/search-and-filter/global-search">
Provide a global search to allow the user to quickly find relevant content.
</link-card>

</div>

<br />

### Back button

An optional back button can be displayed to allow the user to navigate back to the previously opened page.

:component-example{name="BackButton" layout="fullWidth"}

### Vertical

The nav bar can also be displayed vertically depending on the application layout. It can then be expanded and collapsed. Each nav item **must** define an icon so they can be correctly displayed when collapsed. We strongly recommend to automatically switch to a horizontal nav bar on smaller screens.

:component-example{name="Vertical" layout="fullWidth"}
