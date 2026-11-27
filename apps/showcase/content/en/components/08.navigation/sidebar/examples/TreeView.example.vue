<script setup lang="ts">
import { iconPlaceholder } from "@sit-onyx/icons";
import {
  OnyxAppLayout,
  OnyxButton,
  OnyxHeadline,
  OnyxIcon,
  OnyxPageLayout,
  OnyxSidebar,
  OnyxSidebarItem,
  OnyxTreeView,
  OnyxTreeViewItem,
} from "sit-onyx";
</script>

<template>
  <OnyxAppLayout>
    <OnyxPageLayout>
      <template #sidebar>
        <OnyxSidebar label="Example sidebar">
          <template #header> Header content </template>

          <div class="sidebar__content">
            <OnyxTreeView label="Example tree view">
              <OnyxSidebarItem link="#link-1">
                <OnyxIcon :icon="iconPlaceholder" />
                Item 1
              </OnyxSidebarItem>

              <OnyxTreeViewItem label="Item 2" :icon="iconPlaceholder">
                <OnyxSidebarItem link="#link-2.1">
                  <OnyxIcon :icon="iconPlaceholder" />
                  Item 2.1
                </OnyxSidebarItem>

                <OnyxTreeViewItem label="Item 2.2" :icon="iconPlaceholder">
                  <OnyxSidebarItem link="#link-2.2.1">
                    <OnyxIcon :icon="iconPlaceholder" />
                    Item 2.2.1
                  </OnyxSidebarItem>
                  <OnyxSidebarItem link="#link-2.2.2">
                    <OnyxIcon :icon="iconPlaceholder" />
                    Item 2.2.2
                  </OnyxSidebarItem>
                </OnyxTreeViewItem>
              </OnyxTreeViewItem>

              <OnyxTreeViewItem label="Item 3" :icon="iconPlaceholder">
                <OnyxSidebarItem link="#link-3.1">
                  <OnyxIcon :icon="iconPlaceholder" />
                  Item 3.1
                </OnyxSidebarItem>
                <OnyxSidebarItem link="#link-3.2">
                  <OnyxIcon :icon="iconPlaceholder" />
                  Item 3.2
                </OnyxSidebarItem>
                <OnyxSidebarItem link="#link-3.3">
                  <OnyxIcon :icon="iconPlaceholder" />
                  Item 3.3
                </OnyxSidebarItem>
              </OnyxTreeViewItem>

              <OnyxSidebarItem link="#link-4">
                <OnyxIcon :icon="iconPlaceholder" />
                Item 4
              </OnyxSidebarItem>
            </OnyxTreeView>
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

<style scoped>
.sidebar {
  .sidebar__content {
    padding: var(--onyx-sidebar-padding);
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-2xs);
  }
}
</style>
