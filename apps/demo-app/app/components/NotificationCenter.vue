<script lang="ts" setup>
import {
  iconBell,
  iconBellRing,
  iconCheckRead,
  iconCircleAttention,
  iconInbox,
} from "@sit-onyx/icons";
import {
  OnyxAccordion,
  OnyxAccordionItem,
  OnyxBadge,
  OnyxBottomBar,
  OnyxEmpty,
  OnyxHeadline,
  OnyxNotificationCard,
  OnyxSidebar,
  useGlobalFAB,
  useNotification,
} from "sit-onyx";
import { ref } from "vue";

const store = useNotificationStore();
const { t } = useI18n();

const isSidebarOpen = ref(false);

// simulate loading notifications
const skeleton = ref(0);
watch(
  () => isSidebarOpen,
  (isNewValue) => {
    if (isNewValue) {
      skeleton.value = store.unreadNotifications.length;
      setTimeout(() => {
        skeleton.value = 0;
      }, 1000);
    }
  },
);

const openAccordions = ref(["unread"]);

// Add Global Fab
const { show } = useNotification();

const addExampleNotification = () => {
  const icon = Math.random() < 0.5 ? iconCircleAttention : undefined;

  const notification: MyNotification = {
    headline: `${t("notification.notificationTitle")} ${store.notifications.length + 1}`,
    createdAt: Date.now(),
    icon,
    description:
      "Lorem ipsum dolor sit amet consectetur. Dui purus quisque est varius vulputate. Ut odio dui diam pulvinar velit mollis cursus eu ut.",
  };

  store.add(notification);
  show({ ...notification, icon });
};
const globalFAB = useGlobalFAB();

const id = useId();

onMounted(() => {
  globalFAB.add(
    computed(() => ({
      id,
      label: t("notification.fab"),
      icon: iconBellRing,
      onClick: () => addExampleNotification(),
    })),
  );
});
onUnmounted(globalFAB.remove(id));
</script>

<template>
  <OnyxNotificationDot :hidden="!store.unreadNotifications.length">
    <OnyxIconButton
      :label="$t('notification.headline')"
      color="neutral"
      :icon="iconBell"
      @click="isSidebarOpen = true"
    />
  </OnyxNotificationDot>

  <OnyxSidebar
    class="notification-center"
    :label="t('notification.headline')"
    alignment="right"
    :temporary="{ open: isSidebarOpen, floating: true }"
    @close="isSidebarOpen = false"
  >
    <template #headline="{ label }">
      <OnyxHeadline is="h2">{{ label }}</OnyxHeadline>
      <OnyxBadge v-if="store.unreadNotifications.length" color="neutral" density="compact">
        {{ store.unreadNotifications.length }}
      </OnyxBadge>
    </template>

    <template #description> {{ t("notification.description") }} </template>

    <!-- unread notifications -->

    <div v-if="skeleton" class="notification-center__skeletons">
      <OnyxNotificationCard
        v-for="n in typeof skeleton === 'number' ? skeleton : 6"
        :key="n"
        headline="Loading"
        created-at="Loading"
        skeleton
      />
    </div>
    <OnyxAccordion
      v-else
      v-model="openAccordions"
      class="notification-center__accordions"
      type="nested-small"
    >
      <OnyxAccordionItem value="unread">
        <template #header>{{ t("notification.unread") }}</template>

        <OnyxEmpty v-if="!store.unreadNotifications.length" class="notification-center__empty">
          <template #icon>
            <OnyxIcon :icon="iconInbox" size="48px" />
          </template>
          {{ t("notification.noNewMessages") }}
        </OnyxEmpty>

        <OnyxNotificationCard
          v-for="notification in store.unreadNotifications"
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
        <template #header>{{ t("notification.read") }}</template>

        <OnyxEmpty v-if="!store.readNotifications.length" class="notification-center__empty">
          <template #icon>
            <OnyxIcon :icon="iconInbox" size="48px" />
          </template>
          {{ t("notification.noNewMessages") }}
        </OnyxEmpty>

        <OnyxNotificationCard
          v-for="notification in store.readNotifications"
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
          :label="t('notification.markAllAsRead')"
          :icon="iconCheckRead"
          color="neutral"
          :disabled="!store.unreadNotifications.length"
          @click="store.markAllAsRead"
        />
      </OnyxBottomBar>
    </template>
  </OnyxSidebar>
</template>

<style lang="scss" scoped>
.notification-center {
  &__accordions {
    :deep(.onyx-accordion-item__panel) {
      padding: 0;
    }
  }

  &__empty {
    margin-inline: auto;
  }

  &__skeletons {
    display: flex;
    flex-direction: column;
    padding: var(--onyx-density-md);
    gap: var(--onyx-density-md);
  }

  // we use the OnyxBottomBar which already provides its own padding + border
  :deep(.onyx-sidebar__footer) {
    padding: 0;
    border-top: none;
  }
}
</style>
