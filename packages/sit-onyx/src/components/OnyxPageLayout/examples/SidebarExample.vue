<script setup lang="ts">
import { OnyxHeadline, OnyxPageLayout } from "../../..";
</script>

<template>
  <OnyxPageLayout class="page">
    <template #sidebar>
      <aside class="sidebar">OnyxSidebar component coming soon! Stay tuned.</aside>
    </template>

    <!-- page content -->
    <OnyxHeadline is="h1">Page content</OnyxHeadline>
  </OnyxPageLayout>
</template>

<style lang="scss" scoped>
.page {
  // only needed for this example. Can be removed if used together with the OnyxAppLayout
  height: 100dvh;
}

.sidebar {
  border-right: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
  background-color: var(--onyx-color-base-background-blank);
  height: 100%;
  padding: var(--onyx-density-md);
}
</style>
