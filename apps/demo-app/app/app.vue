<script lang="ts" setup>
import App from "#layers/blueprint/app/app.vue";

const settingsStore = useSettingsStore();

// we need to apply the CSS class to the `<html>` element so the density is correctly defined for all components
// otherwise (if we would e.g. just bind it to the app below), global styles (e.g. the vertical grid margin etc. would not consider the corresponding density)
useHead({
  htmlAttrs: {
    class: computed(() => `onyx-density-${settingsStore.settings.density}`),
  },
});
</script>

<template>
  <App />
</template>
