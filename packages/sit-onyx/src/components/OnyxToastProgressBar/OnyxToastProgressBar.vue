<script lang="ts" setup>
import type { OnyxToastProps } from "../OnyxToast/types";

const props = defineProps<Required<Pick<OnyxToastProps, "duration">>>();

const emit = defineEmits<{
  /**
   * Emitted when the timer has ended.
   */
  timerEnded: [];
}>();
</script>

<template>
  <!-- key is used to restart the animation when the duration changes -->
  <time
    :key="props.duration.toString()"
    aria-hidden="true"
    class="onyx-toast-progress-bar"
    :style="{ animationDuration: `${props.duration}ms` }"
    @animationend="emit('timerEnded')"
  ></time>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-toast-progress-bar {
  @include layers.component() {
    display: block;
    height: var(--onyx-spacing-5xs);
    background-color: var(--onyx-toast-progress-bar-color, var(--onyx-color-base-primary-300));
    animation: onyx-toast-progress-bar linear;
    width: 0;

    @keyframes onyx-toast-progress-bar {
      0% {
        width: 100%;
      }
      100% {
        width: 0%;
      }
    }
  }
}
</style>
