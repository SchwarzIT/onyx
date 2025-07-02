<script setup lang="ts">
import {
  OnyxAppLayout,
  OnyxHeadline,
  OnyxLink,
  OnyxPageLayout,
  OnyxSidebar,
} from "../../../index.js";
</script>

<template>
  <OnyxAppLayout>
    <OnyxPageLayout>
      <template #sidebar>
        <OnyxSidebar label="Example sidebar">
          <div class="sidebar__content">
            For sidebar examples, see:
            <OnyxLink href="/?path=/docs/navigation-sidebar--docs" target="_parent">
              OnyxSidebar
            </OnyxLink>
          </div>
        </OnyxSidebar>
      </template>

      <!-- page content -->
      <OnyxHeadline is="h1">Page content</OnyxHeadline>

      <template #footer>
        <!-- we are using the "onyx-grid-container" class here to sync the footer with the global application max-width, alignment and horizontal padding -->
        <footer class="footer onyx-grid-container">Footer content</footer>
      </template>
    </OnyxPageLayout>
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
.sidebar {
  &__content {
    padding: var(--onyx-sidebar-padding);
  }
}

.footer {
  border-top: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
  background-color: var(--onyx-color-base-background-blank);
  padding-top: var(--onyx-density-md);
  padding-bottom: var(--onyx-density-md);
}
</style>
