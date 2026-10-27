---
title: Toast
---

Toasts provide non-disruptive feedback following user actions, displaying concise, temporary messages that auto-dismiss.

We recommend displaying at most 5 toasts simultaneously to prevent screen clutter.

## Examples

### Basic

Use the `useToast()` composable to dispatch toasts from anywhere in your application. Toasts dismiss automatically after a default duration, or you can pass `duration: 0` to require manual dismissal.

Keep headlines concise and action-oriented. Use the description field for additional details or error messages.

<<< ./examples/Basic.example.vue preview=true

### Clickable

Toasts can be interactive, triggering a custom callback when clicked.

<<< ./examples/Clickable.example.vue preview=true

## Prerequisites

Toasts require [OnyxAppLayout](/components/layouts/app-layout) at the root of your application.

<prose-details>
<prose-summary>Not using OnyxAppLayout?</prose-summary>

If you cannot use `OnyxAppLayout`, mount the `<OnyxToast />` container component manually at the root of your app:

```vue [App.vue]
<script lang="ts" setup>
import { OnyxToast } from "sit-onyx";
</script>

<template>
    <OnyxToast />
</template>
```

</prose-details>
