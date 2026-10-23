<script lang="ts" setup>
import { iconCircleAttention } from "@sit-onyx/icons";
import { OnyxButton, OnyxNotificationCard } from "sit-onyx";
</script>

<template>
  <OnyxNotificationCard
    headline="Example notification"
    :icon="iconCircleAttention"
    :created-at="new Date()"
    unread
  >
    Lorem ipsum dolor sit amet consectetur. Dui purus quisque est varius vulputate. Ut odio dui diam
    pulvinar velit mollis cursus eu ut. Lorem ipsum dolor sit amet consectetur.

    <template #actions>
      <OnyxButton color="neutral" label="Button" />
      <OnyxButton label="Button" />
    </template>
  </OnyxNotificationCard>
</template>

<style lang="scss" scoped>
.onyx-notification-card {
  zoom: 0.55;
}
</style>
