<script setup lang="ts">
import type { NuxtError } from "#app";
import App from "./app.vue";

const props = defineProps<{
  error: NuxtError;
}>();
</script>

<template>
  <App>
    <ErrorDetails :error="props.error" />
  </App>
</template>
