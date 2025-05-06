<script setup lang="ts">
import { OnyxAppLayout, OnyxButton, OnyxHeadline, OnyxPageLayout, OnyxSidebar } from "../../..";
</script>

<template>
  <OnyxAppLayout>
    <OnyxPageLayout>
      <template #sidebar>
        <OnyxSidebar label="Example sidebar">
          <template #header> Header content </template>

          <div class="sidebar__content">Body content</div>

          <template #footer>
            <OnyxButton color="neutral" label="Button" />
            <OnyxButton label="Button" />
          </template>
        </OnyxSidebar>
      </template>

      <!-- page content -->
      <div class="onyx-grid-container">
        <OnyxHeadline is="h1">Page content</OnyxHeadline>
      </div>
    </OnyxPageLayout>
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
.sidebar {
  &__content {
    padding: var(--onyx-sidebar-padding);
  }
}
</style>
