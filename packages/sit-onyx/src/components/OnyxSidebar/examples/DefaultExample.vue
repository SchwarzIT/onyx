<script setup lang="ts">
import { OnyxButton, OnyxHeadline, OnyxPageLayout, OnyxSidebar } from "../../..";
</script>

<template>
  <OnyxPageLayout>
    <template #sidebar>
      <OnyxSidebar>
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
</template>

<style lang="scss" scoped>
.sidebar {
  &__content {
    padding: var(--onyx-sidebar-padding);
  }
}
</style>
