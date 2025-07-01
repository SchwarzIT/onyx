<script setup lang="ts">
import { useDensity } from "../../composables/density";
import type { OnyxListItemProps } from "./types";

const props = withDefaults(defineProps<OnyxListItemProps>(), {
  active: false,
  disabled: false,
  selected: false,
  checked: false,
});

defineSlots<{
  /**
   * Option content.
   */
  default(): unknown;
}>();

const { densityClass } = useDensity(props);
</script>

<template>
  <li
    :class="{
      'onyx-component': true,
      'onyx-list-item': true,
      ...densityClass,
      'onyx-list-item--active': props.active,
      [`onyx-list-item--${props.color}`]: props.color,
      'onyx-list-item--disabled': props.disabled,
      'onyx-list-item--selected': props.selected,
      'onyx-list-item--checked': props.checked,
    }"
  >
    <slot></slot>
  </li>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-list-item {
  @include layers.component() {
    --onyx-list-item-color: var(--onyx-color-text-icons-neutral-intense);
    --onyx-list-item-color-selected: var(--onyx-color-text-icons-primary-bold);
    --onyx-list-item-background: var(--onyx-color-base-background-blank);
    --onyx-list-item-background-hover: var(--onyx-color-base-primary-100);
    --onyx-list-item-background-selected: var(--onyx-color-base-primary-200);
    --onyx-list-item-padding: var(--onyx-density-xs) var(--onyx-density-sm);

    font-family: var(--onyx-font-family);
    color: var(--onyx-list-item-color);
    padding: var(--onyx-list-item-padding);
    background-color: var(--onyx-list-item-background);
    font-weight: var(--onyx-font-weight-regular);
    font-size: var(--onyx-font-size-md);
    line-height: var(--onyx-font-line-height-md);

    border: none;
    width: 100%;
    outline: none;

    display: flex;
    align-items: center;
    gap: var(--onyx-density-sm);

    &:not(&--disabled) {
      cursor: pointer;

      &:hover,
      &:focus-within,
      &.onyx-list-item--active {
        background-color: var(--onyx-list-item-background-hover);
      }

      &:focus-within {
        color: var(--onyx-list-item-color-selected);
      }

      // single select
      &.onyx-list-item--selected {
        background-color: var(--onyx-list-item-background-selected);

        &:hover,
        &.onyx-list-item--active {
          color: var(--onyx-list-item-color-selected);
        }
      }

      // multiselect
      &.onyx-list-item--checked {
        &:hover,
        &.onyx-list-item--active {
          background-color: var(--onyx-list-item-background-selected);
          color: var(--onyx-list-item-color-selected);
        }
      }
    }

    &--disabled {
      color: var(--onyx-color-text-icons-neutral-soft);
    }

    &--danger {
      --onyx-list-item-color: var(--onyx-color-text-icons-danger-intense);
      --onyx-list-item-color-selected: var(--onyx-color-text-icons-danger-intense);
      --onyx-list-item-background-hover: var(--onyx-color-base-danger-100);
      --onyx-list-item-background-selected: var(--onyx-color-base-danger-200);
    }
  }
}
</style>
