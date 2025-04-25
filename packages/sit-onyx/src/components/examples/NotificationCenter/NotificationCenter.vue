<script lang="ts" setup>
import bell from "@sit-onyx/icons/bell.svg?raw";
import checkSmall from "@sit-onyx/icons/check-small.svg?raw";
import circleAttention from "@sit-onyx/icons/circle-attention.svg?raw";
import inbox from "@sit-onyx/icons/inbox.svg?raw";
import settings from "@sit-onyx/icons/settings.svg?raw";
import { computed, ref } from "vue";
import {
  OnyxAccordion,
  OnyxAccordionItem,
  OnyxAppLayout,
  OnyxBadge,
  OnyxBottomBar,
  OnyxButton,
  OnyxDrawer,
  OnyxEmpty,
  OnyxHeadline,
  OnyxIcon,
  OnyxIconButton,
  OnyxMenuItem,
  OnyxNavBar,
  OnyxNavItem,
  OnyxNotificationCard,
  OnyxNotificationDot,
  OnyxNotifications,
  OnyxUserMenu,
  useNotification,
  type OnyxNotificationCardProps,
} from "../../..";

/**
 * Custom notification type for your project. This can also include custom properties depending in your needs (e.g. an ID etc.).
 */
type MyNotification = OnyxNotificationCardProps & {
  /**
   * Description/content of the notification.
   */
  description: string;
};

/**
 * Store that will persist all user notifications of the application.
 * In a real project, this could e.g. be a pinia store.
 */
const useNotificationStore = () => {
  const notifications = ref<MyNotification[]>([]);

  const unreadNotifications = computed(() => notifications.value.filter(({ unread }) => unread));
  const readNotifications = computed(() => notifications.value.filter(({ unread }) => !unread));

  /**
   * Marks all existing notifications as read.
   */
  const markAllAsRead = () => {
    notifications.value = notifications.value.map((notification) => ({
      ...notification,
      unread: false,
    }));
  };

  /**
   * Adds a new unread notification.
   */
  const add = (notification: Omit<MyNotification, "unread">) => {
    notifications.value.unshift({ ...notification, unread: true });
  };

  return {
    notifications,
    unreadNotifications,
    readNotifications,
    markAllAsRead,
    add,
  };
};

const { show } = useNotification();
const store = useNotificationStore();

const openAccordions = ref(["unread"]);
const isDrawerOpen = ref(false);

/**
 * Adds a new example notifications. Usually this should be provided by your backend / API
 */
const addExampleNotification = () => {
  const icon = Math.random() < 0.5 ? circleAttention : undefined;

  const notification: MyNotification = {
    headline: `Example notification ${store.notifications.value.length + 1}`,
    createdAt: Date.now(),
    icon,
    description:
      "Lorem ipsum dolor sit amet consectetur. Dui purus quisque est varius vulputate. Ut odio dui diam pulvinar velit mollis cursus eu ut.",
  };

  // persist the notification in our store
  store.add(notification);

  // temporarily show a notification message to the user in the top right of the page to grab the users attention
  show({ ...notification, icon });
};
</script>

<template>
  <OnyxAppLayout>
    <template #navBar>
      <!-- NAV BAR -->
      <OnyxNavBar app-name="Notification center" logo-url="/onyx-logo.svg">
        <OnyxNavItem label="Page 1" />
        <OnyxNavItem label="Page 2" />

        <template #globalContextArea>
          <OnyxNotificationDot :hidden="!store.unreadNotifications.value.length">
            <OnyxIconButton
              label="Notifications"
              color="neutral"
              :icon="bell"
              @click="isDrawerOpen = true"
            />
          </OnyxNotificationDot>
        </template>

        <template #contextArea>
          <OnyxUserMenu full-name="Jane Doe">
            <OnyxMenuItem>
              <OnyxIcon :icon="settings" />
              Settings
            </OnyxMenuItem>
          </OnyxUserMenu>
        </template>
      </OnyxNavBar>
    </template>

    <!-- EXAMPLE PAGE CONTENT -->
    <div class="onyx-grid-container page">
      <OnyxHeadline is="h1">Page content</OnyxHeadline>

      <p>
        This is an example for the notification center. Click on the bell icon inside the nav bar at
        the top of the page to open the notification center.
      </p>

      <OnyxButton label="Add example notification" @click="addExampleNotification" />
    </div>

    <!-- NOTIFICATION CENTER -->
    <OnyxDrawer
      class="notification-center"
      label="Notifications"
      alignment="right"
      :open="isDrawerOpen"
      @close="isDrawerOpen = false"
    >
      <template #headline="{ label }">
        <OnyxHeadline is="h2">{{ label }}</OnyxHeadline>
        <OnyxBadge v-if="store.unreadNotifications.value.length" color="neutral" density="compact">
          {{ store.unreadNotifications.value.length }}
        </OnyxBadge>
      </template>

      <template #description> See all notifications from all touchpoints here. </template>

      <!-- unread notifications -->
      <OnyxAccordion
        v-model="openAccordions"
        class="notification-center__accordions"
        type="nested-small"
      >
        <OnyxAccordionItem value="unread">
          <template #header>Unread</template>

          <OnyxEmpty
            v-if="!store.unreadNotifications.value.length"
            class="notification-center__empty"
          >
            <template #icon>
              <OnyxIcon :icon="inbox" size="48px" />
            </template>
            No new messages in your inbox
          </OnyxEmpty>

          <OnyxNotificationCard
            v-for="notification in store.unreadNotifications.value"
            :key="notification.createdAt.toString()"
            v-bind="notification"
          >
            {{ notification.description }}

            <template #actions>
              <OnyxButton label="Button" color="neutral" />
              <OnyxButton label="Button" />
            </template>
          </OnyxNotificationCard>
        </OnyxAccordionItem>

        <!-- read notifications -->
        <OnyxAccordionItem value="read">
          <template #header>Read</template>

          <OnyxEmpty
            v-if="!store.readNotifications.value.length"
            class="notification-center__empty"
          >
            <template #icon>
              <OnyxIcon :icon="inbox" size="48px" />
            </template>
            No new messages in your inbox
          </OnyxEmpty>

          <OnyxNotificationCard
            v-for="notification in store.readNotifications.value"
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
            :disabled="!store.unreadNotifications.value.length"
            @click="store.markAllAsRead"
          />
        </OnyxBottomBar>
      </template>
    </OnyxDrawer>

    <OnyxNotifications />
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-grid-gutter);
}

.notification-center {
  &__accordions {
    :deep(.onyx-accordion-item__panel) {
      padding: 0;
    }
  }

  &__empty {
    margin-inline: auto;
  }
}
</style>
