---
title: Toast
---

Toasts provide immediate feedback to users after actions, offering concise, time-limited messages to confirm or notify without interrupting their workflow.

We recommend to display at most 5 toasts at the same time to improve user experience.

## Prerequisites

You must use the [OnyxAppLayout](/components/layouts/app-layout) component in the root of your application to correctly display toasts.

<prose-details>
<prose-summary>Not using the OnyxAppLayout?</prose-summary>

If you are not using our app layout component (strongly recommend), you need to set up the toasts manually. Add the `<OnyxToast />` component once in the root of your application:

```vue [App.vue]
<script lang="ts" setup>
import { OnyxToast } from "sit-onyx";
</script>

<template>
    <OnyxToast />
</template>
```

</prose-details>

## Examples

### Basic

Use the `useToast()` composable to show a new toast from anywhere in your application. The toast will close automatically after a certain time by default but you can adjust the time via the `duration` option. Set it to `0` to permanently show the toast and require the user to manually close it if needed.

Make sure that the headline is short and speaking. Use the description for longer text such as detailed error information.

<<< ./examples/Basic.example.vue preview=true

### Clickable

A toast can also be clickable so that any custom action is triggered when the user clicks on the toast.

<<< ./examples/Clickable.example.vue preview=true
