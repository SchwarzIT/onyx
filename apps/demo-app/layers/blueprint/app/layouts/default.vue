<script lang="ts" setup>
import { iconBellRing, iconCircleAttention } from "@sit-onyx/icons";
import { OnyxFAB, useNotification, type OnyxPageLayoutProps } from "sit-onyx";
import type { MyNotification } from "../../../../app/components/NotificationCenter.vue";
import NotificationCenter from "../../../../app/components/NotificationCenter.vue";

const props = defineProps<OnyxPageLayoutProps>();

defineSlots<{
  /**
   * Page content.
   */
  default(): unknown;
}>();

const { t } = useI18n();
const store = useNotificationStore();
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
</script>

<template>
  <OnyxPageLayout v-bind="props">
    <slot></slot>
    <template #sidebar>
      <NotificationCenter />
    </template>
    <OnyxFAB :icon="iconBellRing" :label="t('notification.fab')" @click="addExampleNotification" />
  </OnyxPageLayout>
</template>
