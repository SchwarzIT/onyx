<script lang="ts" setup>
import { computed, useHead, useSchwarzTheme, useUserSession } from "#imports";

const { loggedIn } = useUserSession();
const { theme } = useSchwarzTheme();

useHead({
  htmlAttrs: {
    // its important to still add the class if the theme is "default" so the default theme is applied
    // even if the CSS files for other themes are imported
    class: computed(() => `onyx-theme-${theme.value}`),
  },
});
</script>

<!-- eslint-disable-next-line vue/no-root-v-if -->
<template>
  <UnauthenticatedThemes v-if="loggedIn" />
</template>
