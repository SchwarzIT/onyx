<script lang="ts" setup>
import { iconCircleAttention } from "@sit-onyx/icons";
import { OnyxButton, OnyxNotificationMessage } from "sit-onyx";
</script>

<template>
  <OnyxNotificationMessage headline="Notification" :icon="iconCircleAttention" :duration="0">
    Lorem ipsum dolor sit amet consectetur. Dui purus quisque est varius vulputate. Ut odio dui diam
    pulvinar velit mollis cursus eu ut.

    <template #buttons>
      <OnyxButton label="Button" color="neutral" />
    </template>
  </OnyxNotificationMessage>
</template>

<style lang="scss" scoped>
.onyx-notification-message {
  zoom: 0.6;
}
</style>
