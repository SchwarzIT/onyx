---
title: App layout
componentName: OnyxAppLayout
---

The app layout structures your whole application and ensures that the content is sized correctly, scroll containers are defined as well as providing global functionalities such as [toasts](/components/feedback/toast), [notifications](/components/notifications/notifications) and more. It supports slots for common global app elements, e.g. the nav bar and page content. We **strongly recommended** to use the app layout once in the root of your application (typically the App.vue file) and place your actual application content inside it.

## Examples

### Basic

A basic app layout contains a [nav bar](/components/navigation/nav-bar) and the main page content. Use our [page layout](/components/layouts/page-layout) component for the page content.

<<< ./examples/Basic.example.vue preview=true layout=fullWidth

### Vertical navigation

The nav bar can also be placed vertically. For further information, please refer to our [nav bar](/components/navigation/nav-bar) component.

<<< ./examples/Vertical.example.vue preview=true layout=fullWidth
