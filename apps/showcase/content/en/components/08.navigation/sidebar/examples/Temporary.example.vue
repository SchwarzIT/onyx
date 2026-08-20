<script setup lang="ts">
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxAppLayout, OnyxButton, OnyxPageLayout, OnyxSidebar } from "sit-onyx";
import { ref } from "vue";

const isOpen = ref(false);
</script>

<template>
  <OnyxAppLayout>
    <OnyxPageLayout>
      <template #sidebar>
        <OnyxSidebar
          class="sidebar"
          label="Example sidebar"
          :temporary="{ open: isOpen }"
          alignment="right"
          @close="isOpen = false"
        >
          <template #header> Header content </template>
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
      <OnyxButton label="Open sidebar" @click="isOpen = true" />
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
