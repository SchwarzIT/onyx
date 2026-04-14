<script lang="ts" setup>
import { computed, watch } from "vue";
import { useDensity } from "../../composables/density.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
import OnyxProgressItem from "../OnyxProgressItem/OnyxProgressItem.vue";
import type { OnyxProgressItemProps, ProgressItemStatus } from "../OnyxProgressItem/types.js";
import OnyxSeparator from "../OnyxSeparator/OnyxSeparator.vue";
import type { OnyxProgressStepsProps } from "./types.js";

const props = withDefaults(defineProps<OnyxProgressStepsProps>(), {
  orientation: "horizontal",
  modelValue: 1,
  skeleton: SKELETON_INJECTED_SYMBOL,
});

const emit = defineEmits<{
  /**
   * Emitted when the currently active step changes.
   */
  "update:modelValue": [value: number];
  /**
   * Emitted when the highest visited step/value changes.
   */
  "update:highestValue": [value: number];
}>();

defineSlots<{
  /**
   * Optional slot to override the label content for an item (can be used to add custom content).
   */
  step?(props: { step: OnyxProgressItemProps }): unknown;
}>();

const { densityClass } = useDensity(props);
const skeleton = useSkeletonContext(props);

const highestValue = useVModel({
  props,
  emit,
  key: "highestValue",
  default: 1,
});

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue > highestValue.value) {
      highestValue.value = newValue;
    }
  },
  { immediate: true },
);

const mappedSteps = computed(() => {
  return props.steps.map<OnyxProgressItemProps>((step, index) => {
    const value = index + 1;

    let status: ProgressItemStatus = "default";
    if (value === props.modelValue) status = "active";
    else if (value < props.modelValue) status = "completed";
    else if (value <= highestValue.value - 1) status = "visited";

    const disabled = status === "default" && value !== highestValue.value;

    return {
      value,
      disabled,
      status,
      skeleton: skeleton.value,
      // allow user to override step properties so he has full control, therefore we add "...step" at the very end
      ...step,
    };
  });
});
</script>

<template>
  <div
    :class="[
      'onyx-component',
      'onyx-progress-steps',
      densityClass,
      { 'onyx-progress-steps--vertical': props.orientation === 'vertical' },
    ]"
  >
    <div v-for="step in mappedSteps" :key="step.value" class="onyx-progress-steps__group">
      <OnyxProgressItem v-bind="step" @click="emit('update:modelValue', step.value)">
        <slot name="step" :step></slot>
      </OnyxProgressItem>

      <OnyxSeparator
        v-if="step.value < mappedSteps.length"
        aria-hidden="true"
        class="onyx-progress-steps__separator"
        :orientation="props.orientation"
      />
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-progress-steps {
  @include layers.component() {
    display: flex;
    flex-wrap: wrap;
    gap: var(--onyx-density-sm);

    &__group {
      display: flex;
      gap: var(--onyx-density-sm);
      align-items: center;
    }
    &--vertical {
      flex-direction: column;
      gap: var(--onyx-density-2xs);

      .onyx-progress-steps {
        &__group {
          flex-direction: column;
          align-items: flex-start;
          gap: var(--onyx-density-2xs);
        }
        &__separator {
          --onyx-separator-min-size: 0.5rem;
          // --onyx-density-2xs = padding of step circle/bubble, 1.5rem = width of step circle/bubble
          margin-left: calc(var(--onyx-separator-size) + var(--onyx-density-2xs) + 1.5rem / 2);
        }
      }
    }
  }
}
</style>
