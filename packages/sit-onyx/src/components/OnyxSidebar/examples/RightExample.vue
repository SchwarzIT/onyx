<script setup lang="ts">
import {
  OnyxAppLayout,
  OnyxButton,
  OnyxHeadline,
  OnyxPageLayout,
  OnyxSidebar,
} from "../../../index.js";
</script>

<template>
  <OnyxAppLayout>
    <OnyxPageLayout>
      <template #sidebarRight>
        <OnyxSidebar label="Example sidebar" alignment="right">
          <template #header> Header content </template>

          <div class="sidebar__content">
            <ul>
              <li><b>Drag the left border</b> the resize the sidebar</li>
              <li><b>Double click</b> it to reset the width back to the original size</li>
              <li>
                <b>Press escape</b> while dragging to cancel the current resizing and revert to the
                previous width
              </li>
            </ul>
          </div>

          <template #footer>
            <OnyxButton color="neutral" label="Button" />
            <OnyxButton label="Button" />
          </template>
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
