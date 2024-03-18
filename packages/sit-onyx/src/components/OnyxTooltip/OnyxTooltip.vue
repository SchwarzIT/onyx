<script lang="ts" setup>
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxTooltipProps } from "./types";

const props = withDefaults(defineProps<OnyxTooltipProps>(), {
  color: "neutral",
  position: "top",
});
</script>

<template>
  <div
    class="onyx-tooltip onyx-text--small onyx-truncation-multiline"
    :class="{
      'onyx-tooltip__danger': props.color === 'danger',
      'onyx-tooltip--bottom': props.position === 'bottom',
    }"
    role="tooltip"
  >
    <OnyxIcon v-if="props.icon" class="onyx-tooltip__icon" :icon="props.icon" size="16px" />
    <span>{{ props.text }}</span>
  </div>
</template>

<style lang="scss">
.onyx-tooltip {
  --background-color: var(--onyx-color-base-neutral-900);

  border-radius: var(--onyx-radius-sm);
  padding: var(--onyx-spacing-4xs) var(--onyx-spacing-sm);
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
  z-index: var(--onyx-z-index-flyout);

  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: var(--onyx-spacing-4xs);
  position: relative;

  background-color: var(--background-color);
  color: var(--onyx-color-text-icons-neutral-inverted);
  font-family: var(--onyx-font-family);
  text-align: center;

  min-width: var(--onyx-spacing-3xl);
  max-width: 19rem;

  &__icon {
    min-width: 1rem;
  }

  &__danger {
    --background-color: var(--onyx-color-base-danger-200);
    color: var(--onyx-color-text-icons-danger-bold);
  }

  $wedge-size: 0.5rem;

  &::after {
    content: " ";
    position: absolute;
    top: 100%; /* At the bottom of the tooltip */
    left: 50%;
    margin-left: -$wedge-size;
    border-width: $wedge-size;
    border-style: solid;
    border-color: var(--background-color) transparent transparent transparent;
  }

  &--bottom {
    &::after {
      top: -2 * $wedge-size;
      border-color: transparent transparent var(--background-color) transparent;
    }
  }
}
</style>
