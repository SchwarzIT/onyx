<script lang="ts" setup>
import App from "#layers/onyx/app/app.vue";

useHead({
  titleTemplate: (pageTitle) => {
    const appName = "Onyx Design System";
    return pageTitle ? `${pageTitle} | ${appName}` : appName;
  },
});
</script>

<template>
  <App />
</template>
