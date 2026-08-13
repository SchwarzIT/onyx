<script lang="ts" setup>
import { iconCircleAttention } from "@sit-onyx/icons";
import { OnyxNotificationCard } from "sit-onyx";
</script>

<template>
  <OnyxNotificationCard
    headline="Example notification"
    :icon="iconCircleAttention"
    :created-at="new Date()"
    unread
  >
    Lorem ipsum dolor sit amet consectetur. Dui purus quisque est varius vulputate. Ut odio dui diam
    pulvinar velit mollis cursus eu ut. Lorem ipsum dolor sit amet consectetur. Dui purus quisque
    est varius vulputate. Ut odio dui diam pulvinar velit mollis cursus eu ut. Lorem ipsum dolor sit
    amet consectetur. Dui purus quisque est varius vulputate. Ut odio dui diam pulvinar velit mollis
    cursus eu ut.
  </OnyxNotificationCard>
</template>
