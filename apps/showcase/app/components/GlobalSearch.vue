<script lang="ts" setup>
import GlobalSearch from "#layers/onyx/app/components/GlobalSearch.vue";
import type { Collections } from "@nuxt/content";

const { loggedIn } = useUserSession();
const { locale } = useI18n();

const collections = computed<(keyof Collections)[]>(() => {
  return [`content_${locale.value}`, `components_${locale.value}`] as const;
});
</script>

<template>
  <!-- this file is needed so we can dynamically exclude auth-only content from the search if the user is NOT logged in -->
  <GlobalSearch :options="loggedIn ? undefined : { ignoredTags: ['auth-only'] }" :collections />
</template>
