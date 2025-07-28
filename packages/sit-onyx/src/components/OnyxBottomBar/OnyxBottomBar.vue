<script lang="ts" setup>
import { useDensity } from "../../composables/density.js";
import type { OnyxBottomBarProps } from "./types.js";

const props = withDefaults(defineProps<OnyxBottomBarProps>(), {
  hideBorder: false,
});

defineSlots<{
  /**
   * Bottom bar content. This slot is left aligned and should be used by buttons and icon buttons.
   */
  left?(): unknown;
  /**
   * Bottom bar content. This slot is right aligned and should be used by buttons and icon buttons.
   */
  default?(): unknown;
}>();

const { densityClass } = useDensity(props);
</script>

<template>
  <div
    :class="[
      'onyx-component',
      'onyx-bottom-bar',
      densityClass,
      props.hideBorder ? '' : 'onyx-bottom-bar--border',
    ]"
  >
    <div class="onyx-bottom-bar__content">
      <div class="onyx-bottom-bar__content--left">
        <slot name="left"></slot>
      </div>
      <div class="onyx-bottom-bar__content--right">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-bottom-bar {
  @include layers.component() {
    position: sticky;
    bottom: 0;
    width: 100%;
    background-color: var(--onyx-color-base-background-blank);

    &--border {
      border-top: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
    }

    &__content {
      display: flex;
      justify-content: space-between;
      gap: var(--onyx-density-xs);
      overflow-x: auto;
      max-width: var(--onyx-grid-max-width);
      margin-inline: var(--onyx-grid-margin-inline);

      // by default the horizontal padding should be aligned with the grid
      // however, when used inside the modal dialog, it should automatically adapt to the dialog padding
      padding: var(--onyx-spacing-2xs) var(--onyx-modal-padding-inline, var(--onyx-grid-margin));

      &--left,
      &--right {
        display: flex;
        gap: var(--onyx-density-xs);
      }
    }
  }
}
</style>
