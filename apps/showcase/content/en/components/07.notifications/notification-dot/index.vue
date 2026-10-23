<script lang="ts" setup>
import { iconBell } from "@sit-onyx/icons";
import { OnyxNotificationDot, OnyxUnstableNavButton } from "sit-onyx";
</script>

<template>
  <OnyxNotificationDot>
    <OnyxUnstableNavButton :icon="iconBell" label="Notifications" hide-label />
  </OnyxNotificationDot>
</template>
