<script lang="ts" setup>
import { useDensity } from "../../composables/density";
import type { OnyxBottomBarProps } from "./types";

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
    <div class="onyx-bottom-bar__left">
      <slot name="left"></slot>
    </div>
    <div class="onyx-bottom-bar__right">
      <slot></slot>
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
    margin-inline: var(--onyx-grid-margin-inline);

    background-color: var(--onyx-color-base-background-blank);
    display: flex;
    justify-content: space-between;
    gap: var(--onyx-density-xs);
    padding: var(--onyx-spacing-2xs) var(--onyx-grid-margin);
    overflow-x: auto;

    &--border {
      border-top: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
    }

    &__left,
    &__right {
      position: relative;
      display: flex;
      max-width: var(--onyx-grid-max-width, max-content);
      gap: var(--onyx-density-xs);
    }
  }
}
</style>
