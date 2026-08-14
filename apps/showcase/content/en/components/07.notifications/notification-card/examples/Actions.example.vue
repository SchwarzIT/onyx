<script lang="ts" setup>
import { iconCheckSmall, iconTrash } from "@sit-onyx/icons";
import { OnyxButton, OnyxMenuItem, OnyxNotificationCard } from "sit-onyx";
</script>

<template>
  <OnyxNotificationCard headline="Example notification" :created-at="new Date()">
    Lorem ipsum dolor sit amet consectetur. Dui purus quisque est varius vulputate. Ut odio dui diam
    pulvinar velit mollis cursus eu ut. Lorem ipsum dolor sit amet consectetur. Dui purus quisque
    est varius vulputate. Ut odio dui diam pulvinar velit mollis cursus eu ut. Lorem ipsum dolor sit
    amet consectetur. Dui purus quisque est varius vulputate. Ut odio dui diam pulvinar velit mollis
    cursus eu ut.

    <template #actions>
      <OnyxButton color="neutral" label="Button" />
      <OnyxButton label="Button" />
    </template>

    <template #headerActions>
      <OnyxMenuItem label="Mark as read" :icon="iconCheckSmall" />
      <OnyxMenuItem label="Delete" :icon="iconTrash" color="danger" />
    </template>
  </OnyxNotificationCard>
</template>
