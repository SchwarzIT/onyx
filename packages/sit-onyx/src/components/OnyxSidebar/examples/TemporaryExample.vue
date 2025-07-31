<script setup lang="ts">
import { iconPlaceholder } from "@sit-onyx/icons";
import { ref } from "vue";
import {
  OnyxAppLayout,
  OnyxButton,
  OnyxHeadline,
  OnyxIcon,
  OnyxPageLayout,
  OnyxSidebar,
  OnyxSidebarItem,
} from "../../../index.js";

const isOpen = ref(false);
</script>

<template>
  <OnyxAppLayout>
    <OnyxPageLayout>
      <template #sidebar>
        <OnyxSidebar label="Example sidebar" :temporary="{ open: isOpen }" @close="isOpen = false">
          <template #description>
            Lorem ipsum dolor sit amet consectetur. Dui purus quisque est.
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
      </template>

      <!-- page content -->
      <OnyxHeadline is="h1">Page content</OnyxHeadline>
      <OnyxButton class="button" label="Open sidebar" @click="isOpen = true" />
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

.button {
  margin-top: var(--onyx-grid-gutter);
}
</style>
