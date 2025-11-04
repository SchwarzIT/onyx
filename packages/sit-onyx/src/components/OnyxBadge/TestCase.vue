<script setup lang="ts">
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxTooltip from "../OnyxTooltip/OnyxTooltip.vue";
import OnyxBadge from "./OnyxBadge.vue";
const props = defineProps<{
  /**
   * Alignment of items inside the layout.
   */
  alignItems?: "start" | "center" | "end";
}>();
</script>

<template>
  <div class="onyx-grid-layout onyx-component">
    <div class="flex" :style="{ alignItems: props.alignItems || 'start' }">
      <OnyxTooltip text="15.10.2025, 14:21">
        <template #default="{ trigger }">
          <OnyxBadge v-bind="trigger" color="neutral">OnyxBadge 1</OnyxBadge>
        </template>
      </OnyxTooltip>
      <div>-</div>
      <OnyxBadge color="neutral">OnyxBadge 2</OnyxBadge>
      <div>-</div>
      <div><OnyxBadge color="neutral">OnyxBadge 3</OnyxBadge></div>
      <div>-</div>
      <OnyxButton label="Button" />
    </div>
  </div>
</template>

<style>
.flex {
  display: flex;
  gap: var(--onyx-density-sm);
}
</style>
