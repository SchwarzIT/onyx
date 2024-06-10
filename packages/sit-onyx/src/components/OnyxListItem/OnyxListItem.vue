<script setup lang="ts">
import type { SelectOption } from "../OnyxSelect/types";

const props = defineProps<Pick<SelectOption, "color"> & { active?: boolean }>();
</script>
<template>
  <div
    :class="{
      'onyx-list-item': true,
      'onyx-list-item--active': props.active,
      'onyx-list-item--danger': props.color === 'danger',
    }"
  >
    <slot></slot>
  </div>
</template>
<style lang="scss">
@use "../../styles/mixins/layers";
@use "../../styles/mixins/density.scss";

.onyx-list-item {
  @include density.compact {
    --onyx-list-item-padding: var(--onyx-spacing-4xs) var(--onyx-spacing-sm);
  }
  @include density.default {
    --onyx-list-item-padding: var(--onyx-spacing-2xs) var(--onyx-spacing-sm);
  }
  @include density.cozy {
    --onyx-list-item-padding: var(--onyx-spacing-sm) var(--onyx-spacing-sm);
  }

  @include layers.component() {
    --onyx-list-item-color: var(--onyx-color-text-icons-neutral-intense);
    --onyx-list-item-color-selected: var(--onyx-color-text-icons-primary-bold);
    --onyx-list-item-background-hover: var(--onyx-color-base-primary-100);
    --onyx-list-item-background-selected: var(--onyx-color-base-primary-200);

    font-family: var(--onyx-font-family);
    color: var(--onyx-list-item-color);
    padding: var(--onyx-list-item-padding);
    background-color: var(--onyx-color-base-background-blank);
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5rem;

    border: none;
    width: 100%;
    outline: none;

    display: flex;
    align-items: center;
    gap: var(--onyx-spacing-sm);

    &:not([aria-disabled="true"]) {
      cursor: pointer;

      &:hover,
      &.onyx-list-item--active {
        background-color: var(--onyx-list-item-background-hover);
      }

      // single select
      &[aria-selected="true"] {
        background-color: var(--onyx-list-item-background-selected);

        &:hover,
        &.onyx-list-item--active {
          color: var(--onyx-list-item-color-selected);
        }
      }

      // multiselect
      &[aria-checked="true"] {
        &:hover,
        &.onyx-list-item--active {
          background-color: var(--onyx-list-item-background-selected);
          color: var(--onyx-list-item-color-selected);
        }
      }
    }

    &[aria-disabled="true"] {
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
