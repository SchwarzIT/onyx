<script setup lang="ts">
const { onyxDocs } = useAppConfig();
</script>

<template>
  <OnyxAppLayout>
    <template #navBar>
      <OnyxNavBar :app-name="onyxDocs.app.name" :logo-url="onyxDocs.app.logo" />
    </template>

    <NuxtRouteAnnouncer />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </OnyxAppLayout>
</template>
