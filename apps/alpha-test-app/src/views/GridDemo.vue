<script lang="ts" setup>
import { OnyxPageLayout, OnyxSwitch } from "sit-onyx";
import { useGridStore } from "../stores/grid-store";

const gridStore = useGridStore();
</script>

<template>
  <OnyxPageLayout>
    <div class="onyx-grid">
      <OnyxSwitch
        v-model="gridStore.isMaxWidth"
        class="onyx-grid-span-3"
        label="Is max width (md)"
      />
      <OnyxSwitch
        v-if="gridStore.isMaxWidth"
        v-model="gridStore.isCentered"
        class="onyx-grid-span-3"
        label="Is centered"
      />

      <p class="content onyx-grid-span-16">Page content</p>
    </div>
  </OnyxPageLayout>
</template>

<style lang="scss" scoped>
.content {
  background-color: var(--onyx-color-base-info-200);
  color: var(--onyx-color-text-icons-info-bold);
}
</style>
