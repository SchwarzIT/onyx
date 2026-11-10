<script lang="ts" setup>
import { ColorSchemeValue, OnyxColorSchemeDialog } from "sit-onyx";
import { ref } from "vue";

const colorScheme = ref<ColorSchemeValue>("auto");
</script>

<template>
  <!-- modal="false" is important so the dialog can be placed inside the overview card instead of above the while viewport -->
  <OnyxColorSchemeDialog v-model="colorScheme" :modal="false" open />
</template>

<style lang="scss" scoped>
.onyx-color-scheme-dialog {
  zoom: 0.2;
}
</style>
