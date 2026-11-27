<script lang="ts" setup>
import { iconBell } from "@sit-onyx/icons";
import { OnyxNotificationDot, OnyxNavButton } from "sit-onyx";
</script>

<template>
  <OnyxNotificationDot>
    <OnyxNavButton :icon="iconBell" label="Notifications" hide-label />
  </OnyxNotificationDot>

  <OnyxNotificationDot color="primary">
    <OnyxNavButton :icon="iconBell" label="Notifications" hide-label />
  </OnyxNotificationDot>

  <OnyxNotificationDot color="neutral">
    <OnyxNavButton :icon="iconBell" label="Notifications" hide-label />
  </OnyxNotificationDot>

  <OnyxNotificationDot color="danger">
    <OnyxNavButton :icon="iconBell" label="Notifications" hide-label />
  </OnyxNotificationDot>

  <OnyxNotificationDot color="success">
    <OnyxNavButton :icon="iconBell" label="Notifications" hide-label />
  </OnyxNotificationDot>

  <OnyxNotificationDot color="info">
    <OnyxNavButton :icon="iconBell" label="Notifications" hide-label />
  </OnyxNotificationDot>
</template>
