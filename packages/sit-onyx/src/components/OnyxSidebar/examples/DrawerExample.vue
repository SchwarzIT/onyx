<script setup lang="ts">
import { ref } from "vue";
import { OnyxAppLayout, OnyxButton, OnyxHeadline, OnyxPageLayout, OnyxSidebar } from "../../..";

const isOpen = ref(false);
</script>

<template>
  <OnyxAppLayout>
    <OnyxPageLayout>
      <template #sidebar>
        <OnyxSidebar :drawer="{ label: 'Example sidebar', open: isOpen }" @close="isOpen = false">
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
        <OnyxButton class="button" label="Open sidebar" @click="isOpen = true" />
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

.button {
  margin-top: var(--onyx-grid-gutter);
}
</style>
