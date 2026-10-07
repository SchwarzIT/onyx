---
title: Page layout
componentName: OnyxPageLayout
---

The page layout structures a single page of the application and should be used on every page. It supports slots for common page layouts like sidebar, footer and more. It should be used together with the [app layout](/components/layouts/app-layout) component.

## Examples

### Basic

For a basic page, simply place your content directly inside of the page layout.

<steps>

::step
#headline
Padded

#default
The page content is padded automatically by default depending on the screen breakpoint.

<<< ./examples/Basic.example.vue preview=true layout=fullWidth

::

::step
#headline
No padding

#default
Use the `noPadding` property to remove the default page padding if you want to place full with content such as a hero or footer. Use the `onyx-grid-layout` CSS class to then apply the padding to the part of the page that should be padded.

<<< ./examples/NoPadding.example.vue preview=true layout=fullWidth

::

</steps>

<br />

### Sidebar

A sidebar can be displayed on either side of the application. Please refer to our [sidebar](/components/navigation/sidebar) component for further information.

<steps>

::step
#headline
Left sidebar

#default

<<< ./examples/SidebarLeft.example.vue preview=true layout=fullWidth

::

::step
#headline
Right sidebar

#default

<<< ./examples/SidebarRight.example.vue preview=true layout=fullWidth

::

</steps>

<br />

### Footer

The footer can be used to e.g. display page-related interactions such as a save button when working with forms or global information such as legal information.

<steps>

::step
#headline
Fixed

#default

Use the `footer` slot to place fixed content such as a [bottom bar](/components/navigation/bottom-bar) that is always visible, even if the page content scrolls. You can e.g. place the submit button for a form here.

<<< ./examples/FooterFixed.example.vue preview=true layout=fullWidth

::

::step
#headline
Inline

#default

To add traditional footer content such as legal information that is placed below the page content but is not fixed so it shows at the end of the scrollable content, do not use the `footer` slot but place the footer directly after the page content.

<<< ./examples/FooterInline.example.vue preview=true layout=fullWidth

::

::step
#headline
Sidebar with full width footer

#default

When using both a sidebar and a footer, the footer is placed across the full width by default.

<<< ./examples/FooterSidebar.example.vue preview=true layout=fullWidth

::

::step
#headline
Sidebar with page footer

#default

When using both a sidebar and a footer, set the `footer-alignment="page"` property to place the footer only below the page content but next to the sidebar.

<<< ./examples/FooterSidebarPage.example.vue preview=true layout=fullWidth

::

</steps>

<br />

### Skeleton

Use the skeleton on the page layout on initial page load while the data for the page is loading to automatically set all components within the page to skeleton. You can exclude components from the skeleton by explicitly disabling the skeleton for those components.

<<< ./examples/Skeleton.example.vue preview=true layout=fullWidth
