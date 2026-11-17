<script lang="ts" setup>
const { theme } = useSchwarzTheme();
const { clear: handleLogout } = useUserSession();

const { execute: handleMockLogin } = await useFetch("/api/auth/mock", {
  immediate: false,
});
</script>

<template>
  <div>
    <OnyxHeadline is="h1">Hello World</OnyxHeadline>

    <p>Active theme: {{ theme }}</p>

    <OnyxButton label="Login (mock)" @click="handleMockLogin" />
    <OnyxButton label="Logout" @click="handleLogout" />
  </div>
</template>
