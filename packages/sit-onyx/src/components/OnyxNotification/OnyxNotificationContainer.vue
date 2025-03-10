<script lang="ts" setup>
import { ref } from "vue";
import OnyxNotification from "./OnyxNotification.vue";
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

<template>
  <div v-if="notificationProvider.notificationsQueue.value.length" class="onyx-component">
    <OnyxNotification v-bind="currentNotification" @close="handleManualClose" />
  </div>
  <template v-else></template>
</template>
