<script lang="ts" setup>
import App from "#layers/blueprint/app/app.vue";

const settingsStore = useSettingsStore();
</script>

<template>
  <App :class="`onyx-density-${settingsStore.settings.density}`" />
</template>
