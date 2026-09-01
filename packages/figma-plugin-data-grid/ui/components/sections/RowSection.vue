<script lang="ts" setup>
import { OnyxCard, OnyxHeadline, OnyxStepper, type OnyxSegmentedControlOption } from "sit-onyx";
import type { GenerateDataGridPayload } from "../../types/index.js";
import SegmentedControl from "../SegmentedControl.vue";

const data = defineModel<GenerateDataGridPayload>({ required: true });

const styleOptions = [
  { label: "Striped", value: "striped" },
  { label: "Flat", value: "flat" },
] as const satisfies OnyxSegmentedControlOption[];

const strokeOptions = [
  { label: "Grid", value: "grid" },
  { label: "Horizontal", value: "horizontal" },
] as const satisfies OnyxSegmentedControlOption[];
</script>

<template>
  <OnyxCard>
    <div class="onyx-grid">
      <div class="onyx-grid-span-4 container">
        <OnyxHeadline is="h3">Rows</OnyxHeadline>

        <div class="onyx-grid">
          <OnyxStepper
            v-model="data.rows.count"
            class="onyx-grid-span-2"
            label="Count"
            :min="1"
            :precision="0"
            required
          />
        </div>
      </div>

      <div
        :class="[
          'onyx-grid-span-4',
          'container',
          { 'container--hidden': data.mode !== 'advanced' },
        ]"
      >
        <OnyxHeadline is="h3">Appearance</OnyxHeadline>
        <SegmentedControl v-model="data.rows.style" label="Style" :options="styleOptions" />
        <SegmentedControl v-model="data.rows.stroke" label="Stroke" :options="strokeOptions" />
      </div>
    </div>
  </OnyxCard>
</template>

<style lang="scss" scoped>
.container {
  container-type: inline-size;
  display: flex;
  flex-direction: column;
  gap: var(--onyx-density-sm);

  // we use visibility instead of v-if so the layout does not jump when switching between basic/advanced mode
  &--hidden {
    visibility: hidden;
  }
}
</style>
