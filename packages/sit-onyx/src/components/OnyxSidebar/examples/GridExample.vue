<script setup lang="ts">
import { OnyxAppLayout, OnyxButton, OnyxHeadline, OnyxPageLayout, OnyxSidebar } from "../../..";
</script>

<template>
  <OnyxAppLayout>
    <OnyxPageLayout>
      <template #sidebar>
        <OnyxSidebar label="Example sidebar" resizable>
          <template #header> Header content </template>
          <div class="onyx-grid-layout">
            <div class="onyx-grid">
              <div v-for="i in 6" :key="i" class="onyx-grid-example">
                {{ i }}
              </div>
              <div class="onyx-grid-example onyx-grid-span-2">span 2</div>
              <div class="onyx-grid-example onyx-grid-span-full">full span</div>
            </div>
          </div>

          <template #footer>
            <OnyxButton color="neutral" label="Button" />
            <OnyxButton label="Button" />
          </template>
        </OnyxSidebar>
      </template>

      <!-- page content -->
      <OnyxHeadline is="h1">Page content</OnyxHeadline>
      <p>Breakpoints for the grid dynamically adjust based on the width of the sidebar.</p>
    </OnyxPageLayout>
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
.onyx-grid-example {
  border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-400);
  padding: var(--onyx-spacing-xs);
  border-radius: var(--onyx-radius-sm);

  display: flex;
  justify-content: center;
}
</style>
