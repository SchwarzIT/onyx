---
title: Notification center
---

The notification center is a combination of multiple components to achieve displaying and managing global notifications for the application. When a new notification is coming in (e.g. sent by the backend), a temporary notification is shown in the top right of the screen. To view all available notifications, the notification center can be opened (typically using a bell icon inside the nav bar).

## Examples

Since a notification center is very specific to an application, we only provide an example here and no dedicated notification center component. This way, it can be fully customized as needed.

### Basic

To show a new temporary notification, use the [useNotifications()](/components/notifications/notifications) composable.

<<< ./examples/Basic.example.vue preview=true layout=fullWidth provideNotifications=true

## Support components

Find a list of support components which are designed to build up the notification center.

<div class="onyx-grid">

::component-overview-card
---
path: /components/notifications/notifications
class: onyx-grid-span-4
---
::

::component-overview-card
---
path: /components/notifications/notification-card
class: onyx-grid-span-4
---
::

::component-overview-card
---
path: /components/notifications/notification-dot
class: onyx-grid-span-4
---
::

::component-overview-card
---
path: /components/navigation/sidebar
class: onyx-grid-span-4
---
::

</div>
