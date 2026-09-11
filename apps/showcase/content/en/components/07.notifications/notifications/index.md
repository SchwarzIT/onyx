---
title: Notifications
---

Notifications are used to display (temporary) messages to the user. They are commonly used to build a [notification center](/components/notifications/notification-center).

We recommend to not display at most 5 notifications at the same time to improve user experience.

## Prerequisites

You must use the [OnyxAppLayout](/components/layouts/app-layout) component in the root of your application to correctly display notifications.

<prose-details>
<prose-summary>Not using the OnyxAppLayout?</prose-summary>

If you are not using our app layout component (strongly recommend), you need to set up the notifications manually. Add the `<OnyxNotifications />` component once in the root of your application:

```vue [App.vue]
<script lang="ts" setup>
import { OnyxNotifications } from "sit-onyx";
</script>

<template>
    <OnyxNotifications />
</template>
```

</prose-details>

## Examples

### Basic

Use the `useNotification()` composable to show a new notification from anywhere in your application. The notification will close automatically after a certain time by default but you can adjust the time via the `duration` option. Set it to `0` to permanently show the notification and require the user to manually close it if needed.

:component-example{name="Basic"}
