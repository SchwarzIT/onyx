<script lang="ts" setup>
import { iconCheckRead } from "@sit-onyx/icons";
import {
  OnyxAccordion,
  OnyxAccordionItem,
  OnyxAppLayout,
  OnyxBadge,
  OnyxBottomBar,
  OnyxButton,
  OnyxHeadline,
  OnyxNotificationCard,
  OnyxSidebar,
  TemporarySidebar,
} from "sit-onyx";
import { ref } from "vue";

const openAccordions = ref(["unread"]);

// "modal: false" is important so the dialog can be placed inside the overview card instead of above the while viewport
const temporarySidebar = { open: true, modal: false } as TemporarySidebar;

const createdAt = new Date();
createdAt.setHours(createdAt.getHours() - 1);
</script>

<template>
  <OnyxAppLayout>
    <OnyxSidebar
      class="notification-center"
      label="Notifications"
      alignment="right"
      :collapse-sidebar="false"
      :temporary="temporarySidebar"
    >
      <template #headline="{ label }">
        <OnyxHeadline is="h2">{{ label }}</OnyxHeadline>
        <OnyxBadge color="neutral" density="compact"> 2 </OnyxBadge>
      </template>

      <template #description> See all notifications from all touchpoints here. </template>

      <OnyxAccordion
        v-model="openAccordions"
        class="notification-center__accordions"
        type="nested-small"
      >
        <!-- unread notifications -->
        <OnyxAccordionItem value="unread">
          <template #header>Unread</template>

          <OnyxNotificationCard v-for="i in 2" :key="i" headline="Notification" :created-at>
            Lorem ipsum dolor sit amet consectetur. Dui purus quisque est varius vulputate. Ut odio
            dui diam pulvinar velit mollis cursus eu ut.

            <template #actions>
              <OnyxButton label="Button" color="neutral" />
              <OnyxButton label="Button" />
            </template>
          </OnyxNotificationCard>
        </OnyxAccordionItem>

        <!-- read notifications -->
        <OnyxAccordionItem value="read">
          <template #header>Read</template>
        </OnyxAccordionItem>
      </OnyxAccordion>

      <template #footer>
        <OnyxBottomBar density="compact">
          <OnyxButton label="Mark as all read" :icon="iconCheckRead" color="neutral" />
        </OnyxBottomBar>
      </template>
    </OnyxSidebar>
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
.onyx-app {
  zoom: 0.3;
}

.notification-center {
  --onyx-sidebar-width: 22rem;
  margin-right: 0;

  &__accordions {
    :deep(.onyx-accordion-item__panel) {
      padding: 0;
    }
  }

  // we use the OnyxBottomBar which already provides its own padding + border
  :deep(.onyx-sidebar__footer) {
    padding: 0;
    border-top: none;
  }
}
</style>
