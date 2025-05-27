<script setup lang="ts">
import placeholder from "@sit-onyx/icons/placeholder.svg?raw";
import {
  OnyxAppLayout,
  OnyxButton,
  OnyxHeadline,
  OnyxIcon,
  OnyxPageLayout,
  OnyxSidebar,
  OnyxSidebarItem,
} from "../../..";
</script>

<template>
  <OnyxAppLayout>
    <OnyxPageLayout>
      <template #sidebar>
        <OnyxSidebar label="Example sidebar">
          <template #header> Header content </template>

          <div class="sidebar__content">
            <OnyxSidebarItem v-for="i in 6" :key="i" :link="`#link-${i}`">
              <OnyxIcon :icon="placeholder" />
              Item {{ i }}
            </OnyxSidebarItem>
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
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-2xs);
  }
}
</style>
