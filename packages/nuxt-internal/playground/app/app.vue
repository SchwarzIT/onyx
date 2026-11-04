<script lang="ts" setup>
provideSchwarzTheme();
</script>

<template>
  <OnyxAppLayout>
    <template #navBar>
      <NavBar />
    </template>

    <div class="onyx-grid-layout">
      <NuxtPage />
    </div>
  </OnyxAppLayout>
</template>
