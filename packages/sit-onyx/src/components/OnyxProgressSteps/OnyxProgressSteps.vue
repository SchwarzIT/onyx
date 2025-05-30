<script lang="ts" setup>
import { computed } from "vue";
import { useDensity } from "../../composables/density";
import OnyxProgressStep from "../OnyxProgressStep/OnyxProgressStep.vue";
import type { ProgressStepStatus } from "../OnyxProgressStep/types";
import OnyxSeparator from "../OnyxSeparator/OnyxSeparator.vue";
import type { OnyxProgressStepsProps } from "./types";

const props = withDefaults(defineProps<OnyxProgressStepsProps>(), {
  orientation: "horizontal",
  modelValue: 1,
});

const emit = defineEmits<{
  /**
   * Emitted when the currently active step changes.
   */
  "update:modelValue": [value: number];
}>();

const { densityClass } = useDensity(props);

const getStatus = computed(() => {
  return (stepNumber: number): ProgressStepStatus => {
    if (stepNumber === props.modelValue) return "active";
    else if (stepNumber < props.modelValue) return "visited";
    return "default";
  };
});
</script>

<template>
  <div
    :class="[
      'onyx-component',
      'onyx-progress-steps',
      densityClass,
      props.orientation === 'vertical' ? 'onyx-progress-steps--vertical' : '',
    ]"
  >
    <template v-for="(step, index) in props.steps" :key="index">
      <OnyxProgressStep
        v-bind="step"
        :value="index + 1"
        :status="getStatus(index + 1)"
        :disabled="index > props.modelValue - 1"
        @click="emit('update:modelValue', index + 1)"
      />
      <OnyxSeparator
        v-if="index < props.steps.length - 1"
        aria-hidden="true"
        class="onyx-progress-steps__separator"
        :orientation="props.orientation"
      />
    </template>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-progress-steps {
  @include layers.component() {
    display: inline-flex;
    align-items: center;
    gap: var(--onyx-density-sm);

    &--vertical {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--onyx-density-2xs);

      .onyx-progress-steps__separator {
        --onyx-separator-min-size: 0.5rem;
        // --onyx-density-2xs = padding of step circle/bubble, 1.5rem = width of step circle/bubble
        margin-left: calc(var(--onyx-separator-size) + var(--onyx-density-2xs) + 1.5rem / 2);
      }
    }
  }
}
</style>
