<script lang="ts" setup>
import { iconBell } from "@sit-onyx/icons";
import { OnyxNotificationDot, OnyxUnstableNavButton } from "sit-onyx";
</script>

<template>
  <OnyxNotificationDot>
    <OnyxUnstableNavButton :icon="iconBell" label="Notifications" hide-label />
  </OnyxNotificationDot>

  <OnyxNotificationDot color="primary">
    <OnyxUnstableNavButton :icon="iconBell" label="Notifications" hide-label />
  </OnyxNotificationDot>

  <OnyxNotificationDot color="neutral">
    <OnyxUnstableNavButton :icon="iconBell" label="Notifications" hide-label />
  </OnyxNotificationDot>

  <OnyxNotificationDot color="danger">
    <OnyxUnstableNavButton :icon="iconBell" label="Notifications" hide-label />
  </OnyxNotificationDot>

  <OnyxNotificationDot color="success">
    <OnyxUnstableNavButton :icon="iconBell" label="Notifications" hide-label />
  </OnyxNotificationDot>

  <OnyxNotificationDot color="info">
    <OnyxUnstableNavButton :icon="iconBell" label="Notifications" hide-label />
  </OnyxNotificationDot>
</template>
