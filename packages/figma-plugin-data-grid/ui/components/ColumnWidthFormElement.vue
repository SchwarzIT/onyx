<script lang="ts" setup>
import {
  OnyxSegmentedControl,
  OnyxStepper,
  OnyxUnstableDataGridFormElementWrapper,
  type OnyxSegmentedControlOption,
  type OnyxStepperProps,
} from "sit-onyx";
import { computed } from "vue";
import type { ColumnDefinition } from "../types/index.js";

const props = defineProps<{
  modelValue: ColumnDefinition["width"];
}>();

const emit = defineEmits<{
  "update:modelValue": [value: ColumnDefinition["width"]];
}>();

const options: OnyxSegmentedControlOption[] = [
  { label: "hug", value: "hug" },
  { label: "auto", value: "auto" },
  { label: "fixed", value: "fixed" },
];

const segmentedControlValue = computed({
  get: () => {
    if (typeof props.modelValue === "number") return "fixed";
    return props.modelValue;
  },
  set: (newValue) => {
    const value = newValue === "fixed" ? 180 : newValue;
    emit("update:modelValue", value);
  },
});

const stepperValue = computed({
  get: () => {
    if (typeof props.modelValue === "number" && !isNaN(props.modelValue)) return props.modelValue;
    return undefined;
  },
  set: (newValue) => {
    emit("update:modelValue", newValue || "auto");
  },
});

const stepperProps = {
  hideButtons: true,
  precision: 0,
  min: 1,
  formatNumber: (value) => `${value}px`,
} satisfies Partial<OnyxStepperProps>;
</script>

<template>
  <div class="wrapper">
    <OnyxSegmentedControl v-model="segmentedControlValue" class="segmented-control" :options />

    <OnyxUnstableDataGridFormElementWrapper
      :is="OnyxStepper"
      v-bind="stepperProps"
      v-model="stepperValue"
      :class="['stepper', { 'stepper--hidden': segmentedControlValue !== 'fixed' }]"
      label="Width"
    />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  padding-block: var(--onyx-table-padding-block);
  display: flex;
  align-items: center;
  gap: var(--onyx-density-md);
}

.segmented-control {
  flex-grow: 1;
  flex-shrink: 0;
}

.stepper {
  // fit 4-digit number + "px" suffix
  --onyx-form-element-v2-input-width: 6ch;

  // we only visually hide the stepper but preserve its width so the layout does not jump
  &--hidden {
    visibility: hidden;
  }
}
</style>
