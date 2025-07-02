<script lang="ts" setup>
import { provide } from "vue";
import PlaywrightTest from "./PlaywrightTest.ct.vue";
import {
  createNotificationsProvider,
  NOTIFICATIONS_PROVIDER_INJECTION_KEY,
} from "./useNotification.js";

provide(NOTIFICATIONS_PROVIDER_INJECTION_KEY, createNotificationsProvider());
</script>

<template>
  <PlaywrightTest class="onyx-component" />
</template>
