<script lang="ts" setup>
import checkSmall from "@sit-onyx/icons/check-small.svg?raw";
import inbox from "@sit-onyx/icons/inbox.svg?raw";
import { computed, ref } from "vue";
import {
  OnyxAccordion,
  OnyxAccordionItem,
  OnyxBadge,
  OnyxBottomBar,
  OnyxButton,
  OnyxDrawer,
  OnyxEmpty,
  OnyxHeadline,
  OnyxIcon,
  OnyxNotificationCard,
  type OnyxNotificationCardProps,
} from "../../..";

const openAccordions = ref(["unread"]);

const notifications = ref<(OnyxNotificationCardProps & { description: string })[]>([
  {
    headline: "Example notification",
    createdAt: Date.now(),
    description:
      "Lorem ipsum dolor sit amet consectetur. Dui purus quisque est varius vulputate. Ut odio dui diam pulvinar velit mollis cursus eu ut.",
    unread: true,
  },
  {
    headline: "Example notification",
    createdAt: Date.now() - 1000 * 60 * 30,
    description:
      "Lorem ipsum dolor sit amet consectetur. Dui purus quisque est varius vulputate. Ut odio dui diam pulvinar velit mollis cursus eu ut.",
    unread: true,
  },
  {
    headline: "Example notification",
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
    description:
      "Lorem ipsum dolor sit amet consectetur. Dui purus quisque est varius vulputate. Ut odio dui diam pulvinar velit mollis cursus eu ut.",
  },
]);

const unreadNotifications = computed(() => notifications.value.filter(({ unread }) => unread));
const readNotifications = computed(() => notifications.value.filter(({ unread }) => !unread));

const markAllAsRead = () => {
  notifications.value = notifications.value.map((notification) => ({
    ...notification,
    unread: false,
  }));
};
</script>

<template>
  <OnyxDrawer label="Notifications" alignment="right" open>
    <template #headline="{ label }">
      <OnyxHeadline is="h2">{{ label }}</OnyxHeadline>
      <OnyxBadge v-if="unreadNotifications.length" color="neutral" density="compact">
        {{ unreadNotifications.length }}
      </OnyxBadge>
    </template>

    <template #description> See all notifications from all touchpoints here. </template>

    <OnyxAccordion v-model="openAccordions" class="accordions" type="nested-small">
      <OnyxAccordionItem value="unread">
        <template #header>Unread</template>

        <OnyxEmpty v-if="!unreadNotifications.length" class="empty">
          <template #icon>
            <OnyxIcon :icon="inbox" size="48px" />
          </template>
          No new messages in your inbox
        </OnyxEmpty>

        <OnyxNotificationCard
          v-for="notification in unreadNotifications"
          :key="notification.createdAt.toString()"
          v-bind="notification"
        >
          {{ notification.description }}
        </OnyxNotificationCard>
      </OnyxAccordionItem>

      <OnyxAccordionItem value="read">
        <template #header>Read</template>

        <OnyxEmpty v-if="!readNotifications.length" class="empty">
          <template #icon>
            <OnyxIcon :icon="inbox" size="48px" />
          </template>
          No new messages in your inbox
        </OnyxEmpty>

        <OnyxNotificationCard
          v-for="notification in readNotifications"
          :key="notification.createdAt.toString()"
          v-bind="notification"
        >
          {{ notification.description }}
        </OnyxNotificationCard>
      </OnyxAccordionItem>
    </OnyxAccordion>

    <template #footer>
      <OnyxBottomBar density="compact">
        <OnyxButton
          label="Mark as all read"
          :icon="checkSmall"
          color="neutral"
          :disabled="!unreadNotifications.length"
          @click="markAllAsRead"
        />
      </OnyxBottomBar>
    </template>
  </OnyxDrawer>
</template>

<style lang="scss" scoped>
.accordions {
  :deep(.onyx-accordion-item__panel) {
    padding: 0;
  }
}

.empty {
  margin-inline: auto;
}
</style>
