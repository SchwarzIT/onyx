<script setup lang="ts">
import {
  OnyxAppLayout,
  OnyxButton,
  OnyxHeadline,
  OnyxPageLayout,
  OnyxSidebar,
  OnyxCard,
} from "sit-onyx";
</script>

<template>
  <OnyxAppLayout>
    <OnyxPageLayout>
      <template #sidebar>
        <OnyxSidebar label="Example sidebar">
          <template #header> Header content </template>
          <div class="onyx-grid-layout">
            <div class="onyx-grid">
              <OnyxCard v-for="i in 6" :key="i" class="card"> {{ i }} </OnyxCard>
              <OnyxCard class="card onyx-grid-span-2">2 columns</OnyxCard>
              <OnyxCard class="card onyx-grid-span-full">full width</OnyxCard>
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
    </OnyxPageLayout>
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
.card {
  flex-direction: row;
  justify-content: center;
}
</style>
