<script lang="ts" setup>
import { computed } from "vue";
import { useDensity } from "../../composables/density";
import OnyxNavSeparator from "../OnyxNavBar/modules/OnyxNavSeparator/OnyxNavSeparator.vue";
import OnyxProgressStep from "../OnyxProgressStep/OnyxProgressStep.vue";
import type { ProgressStepStatus } from "../OnyxProgressStep/types";
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
      <OnyxNavSeparator
        v-if="index < props.steps.length - 1"
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

    &__separator {
      width: var(--onyx-density-xl);
      margin: 0;
    }

    &--vertical {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--onyx-density-2xs);

      .onyx-progress-steps__separator {
        width: var(--onyx-1px-in-rem);
        min-height: 0.5rem;
        margin-left: calc(var(--onyx-1px-in-rem) + var(--onyx-density-2xs) + 1.5rem / 2);
      }
    }
  }
}
</style>
