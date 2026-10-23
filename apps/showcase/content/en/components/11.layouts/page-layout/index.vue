<script setup lang="ts">
import { iconPlaceholder } from "@sit-onyx/icons";
import {
  OnyxAppLayout,
  OnyxBottomBar,
  OnyxButton,
  OnyxHeadline,
  OnyxPageLayout,
  OnyxSidebar,
} from "sit-onyx";
</script>

<template>
  <OnyxAppLayout>
    <OnyxPageLayout>
      <template #sidebar>
        <OnyxSidebar class="sidebar" label="Sidebar">
          <div class="sidebar__content">
            <ClientOnly>
              <OnyxSidebarItem v-for="i in 3" :key="i" :link="`#link-${i}`">
                <OnyxIcon :icon="iconPlaceholder" />
                Item {{ i }}
              </OnyxSidebarItem>
            </ClientOnly>
          </div>
        </OnyxSidebar>
      </template>

      <OnyxHeadline is="h1">Page content</OnyxHeadline>

      <template #footer>
        <OnyxBottomBar>
          <OnyxButton label="Button" />
        </OnyxBottomBar>
      </template>
    </OnyxPageLayout>
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
.onyx-app {
  --onyx-grid-margin-vertical: var(--onyx-density-lg);
  zoom: 0.45;
  border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-secondary);
}

.sidebar {
  --onyx-sidebar-width: 12rem;

  &__content {
    padding: var(--onyx-sidebar-padding);
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-2xs);
  }
}
</style>
