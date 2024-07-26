<script lang="ts" setup>
import { createTooltip } from "@sit-onyx/headless";
import { computed } from "vue";
import { useDensity } from "../../composables/density";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxTooltipProps } from "./types";

const props = withDefaults(defineProps<OnyxTooltipProps>(), {
  color: "neutral",
  position: "top",
  fitParent: false,
  open: "hover",
});

defineSlots<{
  /**
   * Default slot where the parent content is placed that should open/close the tooltip.
   *
   * **Accessibility**: Please ensure that your content includes at least one focusable element
   * (e.g. by using a button or input element).
   */
  default(): unknown;
  /**
   * Optional slot to place custom content for the tooltip text.
   *
   * **Accessibility**: Make sure that the tooltip content is NOT focusable/interactive.
   */
  tooltip?(): unknown;
}>();

const {
  elements: { root, trigger, tooltip },
  state: { isVisible },
} = createTooltip({
  open: computed(() => props.open),
});

const { densityClass } = useDensity(props);
</script>

<template>
  <div :class="['onyx-tooltip-wrapper', densityClass]" v-bind="root">
    <div
      v-bind="tooltip"
      class="onyx-tooltip onyx-text--small onyx-truncation-multiline"
      :class="{
        'onyx-tooltip--danger': props.color === 'danger',
        'onyx-tooltip--bottom': props.position === 'bottom',
        'onyx-tooltip--fit-parent': props.fitParent,
        'onyx-tooltip--hidden': !isVisible,
      }"
    >
      <OnyxIcon v-if="props.icon" :icon="props.icon" size="16px" />
      <slot name="tooltip">
        <span>{{ props.text }}</span>
      </slot>
    </div>

    <div v-bind="trigger">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

$wedge-size: 0.5rem;

.onyx-tooltip {
  @include layers.component() {
    --background-color: var(--onyx-color-base-neutral-900);
    --color: var(--onyx-color-text-icons-neutral-inverted);

    border-radius: var(--onyx-radius-sm);
    padding: var(--onyx-density-2xs) var(--onyx-density-sm);
    box-shadow: var(--onyx-shadow-medium-bottom);
    z-index: var(--onyx-z-index-flyout);

    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--onyx-density-2xs);
    height: max-content;
    margin-bottom: $wedge-size;

    background-color: var(--background-color);
    color: var(--color);
    font-family: var(--onyx-font-family);
    text-align: center;
    white-space: pre-line;

    min-width: var(--onyx-spacing-3xl);
    width: max-content;
    max-width: 19rem;

    // positioning
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 100%;

    &--hidden {
      display: none;
    }

    &--fit-parent {
      width: 100%;
    }

    &--danger {
      --background-color: var(--onyx-color-base-danger-200);
      --color: var(--onyx-color-text-icons-danger-bold);
    }

    &::after {
      content: " ";
      position: absolute;
      top: 100%; /* At the bottom of the tooltip */
      left: 50%;
      margin-left: -$wedge-size;
      border-width: $wedge-size;
      border-style: solid;
      border-color: var(--background-color) transparent transparent;
      white-space: normal;
    }

    &--bottom {
      margin-bottom: 0;
      margin-top: $wedge-size;
      bottom: 0;
      top: 100%;

      &::after {
        top: -2 * $wedge-size;
        border-color: transparent transparent var(--background-color);
      }
    }
  }
}

.onyx-tooltip-wrapper {
  @include layers.component() {
    position: relative;
    width: max-content;
  }
}
</style>
