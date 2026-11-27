<script lang="ts" setup>
import { iconBell } from "@sit-onyx/icons";
import { OnyxNotificationDot, OnyxNavButton } from "sit-onyx";
</script>

<template>
  <OnyxNotificationDot>
    <OnyxNavButton :icon="iconBell" label="Notifications" hide-label />
  </OnyxNotificationDot>
</template>
