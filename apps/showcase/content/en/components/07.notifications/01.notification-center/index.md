---
title: Notification center
---

The notification center is a combination of multiple components to achieve displaying and managing global notifications for the application. When a new notification is coming in (e.g. sent by the backend), a temporary notification is shown in the top right of the screen. To view all available notifications, the notification center can be opened (typically using a bell icon inside the nav bar).

## Examples

Since a notification center is very specific to an application, we only provide an example here and no dedicated notification center component. This way, it can be fully customized as needed.

### Basic

To show a new temporary notification, use the [useNotifications()](/components/notifications/notifications) composable.

::component-example
---
name: Basic
layout: fullWidth
provide:
    notifications: true
---
::
