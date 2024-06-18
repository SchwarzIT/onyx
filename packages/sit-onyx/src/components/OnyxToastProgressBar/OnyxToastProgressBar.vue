<script lang="ts" setup>
import { computed, watchEffect } from "vue";
import { useTimer } from "../../composables/useTimer";
import type { OnyxToastProps } from "../OnyxToast/types";

const props = defineProps<Required<Pick<OnyxToastProps, "duration">>>();

const emit = defineEmits<{
  /**
   * Emitted when the timer has ended.
   */
  timerEnded: [];
}>();

const { timeLeft, isEnded } = useTimer({
  endTime: computed(() => Date.now() + props.duration),
  useAnimationFrame: true,
});

const percentage = computed(() => {
  if (props.duration <= 0) return 0;
  return Math.min(100, (timeLeft.value / props.duration) * 100);
});

watchEffect(() => isEnded.value && emit("timerEnded"));
</script>

<template>
  <time
    class="onyx-toast-progress-bar"
    role="progressbar"
    :aria-valuemin="0"
    :aria-valuemax="props.duration"
    :aria-valuenow="percentage"
    :style="{ width: `${percentage}%` }"
  ></time>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-toast-progress-bar {
  @include layers.component() {
    display: block;
    height: var(--onyx-spacing-5xs);
    background-color: var(--onyx-toast-progress-bar-color);
  }
}
</style>
