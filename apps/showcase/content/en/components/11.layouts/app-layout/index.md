---
title: App layout
componentName: OnyxAppLayout
---

The app layout provides the outer application shell, establishing viewport bounds, top-level scroll containers, and mounting points for global services like [toasts](/components/feedback/toast) and [notifications](/components/notifications/notifications). We strongly recommend mounting `OnyxAppLayout` once at the root of your application (typically `App.vue`).

## Examples

### Basic

A standard application shell includes an [OnyxNavBar](/components/navigation/nav-bar) slot and a default slot containing the page content wrapped in [OnyxPageLayout](/components/layouts/page-layout).

<<< ./examples/Basic.example.vue preview=true layout=fullWidth

### Vertical navigation

The layout also accommodates vertical navigation bars. See [OnyxNavBar](/components/navigation/nav-bar) for vertical mode configuration.

<<< ./examples/Vertical.example.vue preview=true layout=fullWidth
