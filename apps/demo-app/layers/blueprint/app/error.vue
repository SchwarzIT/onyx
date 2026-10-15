<script setup lang="ts">
import type { NuxtError } from "#app";
import { OnyxError } from "#components";
import App from "./app.vue";

const props = defineProps<{
  error: NuxtError;
}>();
</script>

<template>
  <App>
    <OnyxError :error="props.error" />
  </App>
</template>
