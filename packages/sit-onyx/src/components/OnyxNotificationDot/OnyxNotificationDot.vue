<script lang="ts" setup>
import { computed } from "vue";
import type { OnyxNotificationDotProps } from "./types";

const props = withDefaults(defineProps<OnyxNotificationDotProps>(), {
  color: "warning",
  pulsing: false,
  bouncing: false,
  visible: false,
});

defineSlots<{
  /**
   * Host component.
   */
  default(): unknown;
}>();

const positionCss = computed(() => {
  const styles: Record<string, string> = {};
  if (props.position) {
    if (props.position.top) styles.top = props.position.top;
    if (props.position.right) styles.right = props.position.right;
    if (props.position.left) styles.left = props.position.left;
    if (props.position.bottom) styles.bottom = props.position.bottom;
  }

  return styles;
});
</script>

<template>
  <div
    class="onyx-component onyx-notification-indicator__container"
    data-testid="indicator-container"
  >
    <slot></slot>
    <div
      v-if="props.visible"
      class="onyx-notification-indicator__dot"
      :class="[
        `onyx-notification-indicator__dot--${props.color}`,
        { 'onyx-notification-indicator__dot--pulsing': props.pulsing },
        { 'onyx-notification-indicator__dot--bouncing': props.bouncing },
      ]"
      :style="positionCss"
      data-testid="indicator-dot"
    ></div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";
@use "../../styles/mixins/sizes";

.onyx-notification-indicator {
  &__container {
    display: flex;
    position: relative;
    width: fit-content;
  }

  &__dot {
    width: 0.5rem;
    height: 0.5rem;
    background-color: var(--notification-dot);
    border-radius: var(--onyx-radius-sm);
    position: absolute;

    $colors: primary, secondary, neutral, danger, warning, success, info;

    @each $color in $colors {
      &--#{$color} {
        --notification-dot: var(--onyx-color-base-#{$color}-600);
      }
    }
  }

  &__dot--pulsing {
    animation: pulse 1s infinite;
  }

  &__dot--bouncing {
    animation: bounce 1s infinite;
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.3);
    opacity: 0.5;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(0.3125rem);
  }
}
</style>
