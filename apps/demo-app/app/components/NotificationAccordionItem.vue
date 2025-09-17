<script lang="ts" setup>
import { iconInbox } from "@sit-onyx/icons";
import { OnyxAccordionItem, OnyxEmpty, OnyxIcon, OnyxNotificationCard } from "sit-onyx";
import { useI18n } from "vue-i18n";
import type { MyNotification } from "../stores/notification-store.js";

const { t } = useI18n();

const props = defineProps<{
  notifications: MyNotification[];
  header: string;
  value: string;
}>();
</script>

<template>
  <OnyxAccordionItem :value="props.value">
    <template #header>
      {{ props.header }}
    </template>

    <OnyxEmpty v-if="!props.notifications.length" class="notification-accordion-item__empty">
      <template #icon>
        <OnyxIcon :icon="iconInbox" size="48px" />
      </template>
      {{ t("notification.noNewMessages") }}
    </OnyxEmpty>

    <OnyxNotificationCard
      v-for="notification in props.notifications"
      :key="notification.createdAt.toString()"
      v-bind="notification"
    >
      {{ notification.description }}
      <template #actions>
        <OnyxButton label="Button" color="neutral" @click="() => (notification.unread = false)" />
        <OnyxButton label="Button" @click="() => (notification.unread = false)" />
      </template>
    </OnyxNotificationCard>
  </OnyxAccordionItem>
</template>

<style lang="scss" scoped>
.notification-accordion-item__empty {
  margin-inline: auto;
}
</style>
