<script lang="ts" setup generic="TValue extends SelectOptionValue">
import { useId } from "vue";
import { useDensity } from "../../composables/density.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
import type { SelectOptionValue } from "../../types/components.js";
import OnyxSegmentedControlElement from "../OnyxSegmentedControlElement/OnyxSegmentedControlElement.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import { type OnyxSegmentedControlProps } from "./types.js";

type Props = OnyxSegmentedControlProps<TValue>;

const props = withDefaults(defineProps<Props>(), {
  name: () => useId(), // the name must be globally unique
  skeleton: SKELETON_INJECTED_SYMBOL,
});

const emit = defineEmits<{
  /**
   * Emitted when the selected value changes.
   */
  "update:modelValue": [value: TValue];
}>();

const skeleton = useSkeletonContext(props);
const { densityClass } = useDensity(props);

const modelValue = useVModel<Props, "modelValue", TValue>({
  props,
  emit,
  key: "modelValue",
});

const handleChange = (value: TValue) => {
  modelValue.value = value;
};
</script>

<template>
  <OnyxSkeleton v-if="skeleton" :class="['onyx-segmented-control-skeleton', densityClass]" />
  <div v-else :class="['onyx-component', 'onyx-segmented-control', densityClass]">
    <OnyxSegmentedControlElement
      v-for="option in options"
      :key="option.value.toString()"
      v-bind="option"
      :name="props.name"
      :checked="option.value === modelValue"
      @change="handleChange(option.value)"
    />
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-segmented-control {
  @include layers.component() {
    --outline-color: var(--onyx-color-component-focus-primary);
    display: flex;
    gap: var(--onyx-density-xs);
    padding: var(--onyx-density-2xs);
    background-color: var(--onyx-color-base-neutral-200);
    border-radius: var(--onyx-radius-md);

    &:has(.onyx-segmented-control-element__icon):not(:has(.onyx-segmented-control-element__text)) {
      width: fit-content;
    }

    &-skeleton {
      height: calc(var(--onyx-font-line-height-md) + 4 * var(--onyx-density-2xs));
      border-radius: var(--onyx-radius-sm);
    }
  }
}
</style>
