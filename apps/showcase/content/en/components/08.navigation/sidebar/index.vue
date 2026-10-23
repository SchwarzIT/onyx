<script setup lang="ts">
import { iconPlaceholder } from "@sit-onyx/icons";
import {
  OnyxAppLayout,
  OnyxButton,
  OnyxPageLayout,
  OnyxSidebar,
  OnyxIcon,
  OnyxSidebarItem,
  OnyxUnstableSearch,
} from "sit-onyx";
</script>

<template>
  <OnyxAppLayout>
    <OnyxPageLayout>
      <template #sidebar>
        <ClientOnly>
          <OnyxSidebar class="sidebar" label="Example sidebar">
            <template #header>
              <OnyxUnstableSearch placeholder="Search..." />
            </template>

            <div class="sidebar__content">
              <OnyxSidebarItem v-for="i in 6" :key="i" :link="`#link-${i}`">
                <OnyxIcon :icon="iconPlaceholder" />
                Item {{ i }}
              </OnyxSidebarItem>
            </div>

            <template #footer>
              <OnyxButton color="neutral" label="Button" />
              <OnyxButton label="Button" />
            </template>
          </OnyxSidebar>
        </ClientOnly>
      </template>
    </OnyxPageLayout>
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
.onyx-app {
  zoom: 0.3;
  border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-secondary);
}

.sidebar {
  &__content {
    padding: var(--onyx-sidebar-padding);
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-2xs);
  }
}
</style>
