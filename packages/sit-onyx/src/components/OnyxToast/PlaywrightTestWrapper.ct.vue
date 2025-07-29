<script lang="ts" setup>
import { provide } from "vue";
import {
  createGlobalFABProvider,
  GLOBAL_FAB_PROVIDER_INJECTION_KEY,
} from "../OnyxGlobalFAB/useGlobalFAB.js";
import PlaywrightTest from "./PlaywrightTest.ct.vue";
import { createToastProvider, TOAST_PROVIDER_INJECTION_KEY } from "./useToast.js";

provide(TOAST_PROVIDER_INJECTION_KEY, createToastProvider());
provide(GLOBAL_FAB_PROVIDER_INJECTION_KEY, createGlobalFABProvider());
</script>

<template>
  <PlaywrightTest class="onyx-component" />
</template>
