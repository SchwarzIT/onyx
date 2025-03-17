<script lang="ts" setup>
import { ref } from "vue";
import OnyxNotificationDot from "../OnyxNotificationDot/OnyxNotificationDot.vue";
import { useNotification } from "./useNotification";

const notificationProvider = useNotification();
const currentNotification = ref(notificationProvider.notificationsQueue.value[0]);

const removeNotification = () => {
  notificationProvider.remove(currentNotification.value.id);
  if (notificationProvider.notificationsQueue.value.length !== 0) {
    currentNotification.value = notificationProvider.notificationsQueue.value[0];
  }
};

const handleManualClose = () => {
  removeNotification();
};
</script>

<!-- eslint-disable vue/no-root-v-if -->
<template>
  <div v-if="notificationProvider.notificationsQueue.value.length" class="onyx-component">
    <OnyxNotificationDot v-bind="currentNotification" @close="handleManualClose" />
  </div>
</template>
