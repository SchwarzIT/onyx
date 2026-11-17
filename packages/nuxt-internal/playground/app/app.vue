<script lang="ts" setup></script>

<template>
  <OnyxAppLayout>
    <template #navBar>
      <NavBar />
    </template>

    <div class="onyx-grid-layout">
      <NuxtPage />
    </div>

    <SchwarzThemeProvider />
  </OnyxAppLayout>
</template>
