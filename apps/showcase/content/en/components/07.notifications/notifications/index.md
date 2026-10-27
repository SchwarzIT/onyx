---
title: Notifications
---

Notifications display persistent or temporary status updates to users, typically integrating with a [notification center](/components/notifications/notification-center).

We recommend displaying at most 5 notifications simultaneously to maintain visual clarity.

## Examples

### Basic

Use the `useNotification()` composable to dispatch notifications anywhere in your application. Notifications auto-dismiss after a preset duration, or pass `duration: 0` to require manual dismissal by the user.

<<< ./examples/Basic.example.vue preview=true

## Prerequisites

Notifications require [OnyxAppLayout](/components/layouts/app-layout) at the root of your application.

<prose-details>
<prose-summary>Not using OnyxAppLayout?</prose-summary>

If you cannot use `OnyxAppLayout`, mount the `<OnyxNotifications />` component manually at the root of your app:

```vue [App.vue]
<script lang="ts" setup>
import { OnyxNotifications } from "sit-onyx";
</script>

<template>
    <OnyxNotifications />
</template>
```

</prose-details>
