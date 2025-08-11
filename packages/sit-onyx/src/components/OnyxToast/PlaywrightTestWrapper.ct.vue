<script lang="ts" setup>
import { provide } from "vue";
import PlaywrightTest from "./PlaywrightTest.ct.vue";
import { createToastProvider, TOAST_PROVIDER_INJECTION_KEY } from "./useToast.js";

provide(TOAST_PROVIDER_INJECTION_KEY, createToastProvider());
</script>

<template>
  <PlaywrightTest class="onyx-component" />
</template>
