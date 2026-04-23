<script lang="ts" setup>
import GlobalSearch from "#layers/onyx/app/components/GlobalSearch.vue";

const { loggedIn } = useUserSession();
</script>

<template>
  <!-- this file is needed so we can dynamically exclude auth-only content from the search if the user is NOT logged in -->
  <GlobalSearch :options="loggedIn ? undefined : { ignoredTags: ['auth-only'] }" />
</template>
