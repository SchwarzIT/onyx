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
      <template #sidebarRight>
        <OnyxSidebar label="Example sidebar" alignment="right">
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
