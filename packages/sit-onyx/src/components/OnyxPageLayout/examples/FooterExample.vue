<script setup lang="ts">
import { OnyxHeadline, OnyxPageLayout } from "../../..";
</script>

<template>
  <OnyxPageLayout>
    <!-- page content -->
    <OnyxHeadline is="h1">Page content</OnyxHeadline>

    <template #footer>
      <!-- we are using the "onyx-grid-container" class here to sync the footer with the global application max-width, alignment and horizontal padding -->
      <footer class="footer onyx-grid-container">Footer content</footer>
    </template>
  </OnyxPageLayout>
</template>

<style lang="scss" scoped>
.footer {
  border-top: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
  background-color: var(--onyx-color-base-background-blank);
  padding-top: var(--onyx-density-md);
  padding-bottom: var(--onyx-density-md);
}
</style>
