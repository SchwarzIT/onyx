<script setup lang="ts">
import { ref } from "vue";
import { OnyxButton, OnyxHeadline, OnyxPageLayout, OnyxSidebar } from "../../..";

const isSidebarOpen = ref(false);
</script>

<template>
  <OnyxPageLayout>
    <template #sidebar>
      <OnyxSidebar
        :drawer="{ label: 'Example sidebar', open: isSidebarOpen }"
        @close="isSidebarOpen = false"
      >
        <template #description>
          Lorem ipsum dolor sit amet consectetur. Dui purus quisque est.
        </template>

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

      <OnyxButton label="Open sidebar" @click="isSidebarOpen = true" />
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
