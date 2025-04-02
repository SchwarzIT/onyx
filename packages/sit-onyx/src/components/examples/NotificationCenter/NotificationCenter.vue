<script lang="ts" setup>
import { ref } from "vue";
import {
  OnyxAccordion,
  OnyxAccordionItem,
  OnyxBadge,
  OnyxDrawer,
  OnyxHeadline,
  OnyxNotificationCard,
} from "../../..";

const openAccordions = ref(["unread"]);
</script>

<template>
  <OnyxDrawer label="Notifications" alignment="right" open>
    <template #headline="{ label }">
      <OnyxHeadline is="h2">{{ label }}</OnyxHeadline>
      <OnyxBadge color="neutral" density="compact">2</OnyxBadge>
    </template>

    <template #description> See all notifications from all touchpoints here. </template>

    <OnyxAccordion v-model="openAccordions" class="accordions" type="nested-small">
      <OnyxAccordionItem value="unread">
        <template #header>Unread</template>

        <OnyxNotificationCard :created-at="Date.now()" headline="Example notification" unread>
          Lorem ipsum dolor sit amet consectetur. Dui purus quisque est varius vulputate. Ut odio
          dui diam pulvinar velit mollis cursus eu ut.
        </OnyxNotificationCard>

        <OnyxNotificationCard :created-at="Date.now()" headline="Example notification" unread>
          Lorem ipsum dolor sit amet consectetur. Dui purus quisque est varius vulputate. Ut odio
          dui diam pulvinar velit mollis cursus eu ut.
        </OnyxNotificationCard>
      </OnyxAccordionItem>

      <OnyxAccordionItem value="read">
        <template #header>Read</template>

        <OnyxNotificationCard :created-at="Date.now()" headline="Example notification">
          Lorem ipsum dolor sit amet consectetur. Dui purus quisque est varius vulputate. Ut odio
          dui diam pulvinar velit mollis cursus eu ut.
        </OnyxNotificationCard>
      </OnyxAccordionItem>
    </OnyxAccordion>
  </OnyxDrawer>
</template>

<style lang="scss" scoped>
.accordions {
  :deep(.onyx-accordion-item__panel) {
    padding: 0;
  }
}
</style>
