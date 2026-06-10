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
  OnyxUnstableTreeView,
  OnyxUnstableTreeViewItem,
} from "../../../index.js";
</script>

<template>
  <OnyxAppLayout>
    <OnyxPageLayout>
      <template #sidebar>
        <OnyxSidebar label="Example sidebar">
          <template #header> Header content </template>

          <div class="sidebar__content">
            <OnyxUnstableTreeView label="Example tree view">
              <OnyxSidebarItem link="#link-1">
                <OnyxIcon :icon="iconPlaceholder" />
                Item 1
              </OnyxSidebarItem>

              <OnyxUnstableTreeViewItem label="Item 2" :icon="iconPlaceholder">
                <OnyxSidebarItem link="#link-2.1">
                  <OnyxIcon :icon="iconPlaceholder" />
                  Item 2.1
                </OnyxSidebarItem>

                <OnyxUnstableTreeViewItem label="Item 2.2" :icon="iconPlaceholder">
                  <OnyxSidebarItem link="#link-2.2.1">
                    <OnyxIcon :icon="iconPlaceholder" />
                    Item 2.2.1
                  </OnyxSidebarItem>
                  <OnyxSidebarItem link="#link-2.2.2">
                    <OnyxIcon :icon="iconPlaceholder" />
                    Item 2.2.2
                  </OnyxSidebarItem>
                </OnyxUnstableTreeViewItem>
              </OnyxUnstableTreeViewItem>

              <OnyxUnstableTreeViewItem label="Item 3" :icon="iconPlaceholder">
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
              </OnyxUnstableTreeViewItem>

              <OnyxSidebarItem link="#link-4">
                <OnyxIcon :icon="iconPlaceholder" />
                Item 4
              </OnyxSidebarItem>
            </OnyxUnstableTreeView>
          </div>

          <template #footer>
            <OnyxButton color="neutral" label="Button" />
            <OnyxButton label="Button" />
          </template>
        </OnyxSidebar>
      </template>

      <OnyxHeadline is="h1">Page content</OnyxHeadline>
    </OnyxPageLayout>
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
.sidebar {
  &__content {
    padding: var(--onyx-sidebar-padding);
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-2xs);
  }
}
</style>
