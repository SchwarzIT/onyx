<script setup lang="ts">
const props = defineProps<{ active?: boolean }>();
</script>
<template>
  <li
    :class="{
      'onyx-future-nav-item': true,
      'onyx-future-nav-item--active': props.active,
    }"
  >
    <slot></slot>
  </li>
</template>
<style lang="scss">
@use "../../../styles/mixins/layers";
@use "../../../styles/mixins/density.scss";

// TODO: Remove 'future' from className after officialy merging this component with current OnyxNavItem
.onyx-future-nav-item {
  @include density.compact {
    --onyx-nav-item-padding: var(--onyx-spacing-4xs) var(--onyx-spacing-sm);
  }
  @include density.default {
    --onyx-nav-item-padding: var(--onyx-spacing-2xs) var(--onyx-spacing-sm);
  }
  @include density.cozy {
    --onyx-nav-item-padding: var(--onyx-spacing-sm) var(--onyx-spacing-sm);
  }

  @include layers.component() {
    --onyx-nav-item-color: var(--onyx-color-text-icons-neutral-intense);
    --onyx-nav-item-color-selected: var(--onyx-color-text-icons-primary-bold);
    --onyx-nav-item-background-hover: var(--onyx-color-base-primary-100);
    --onyx-nav-item-background-selected: var(--onyx-color-base-primary-200);

    font-family: var(--onyx-font-family);
    color: var(--onyx-nav-item-color);
    padding: var(--onyx-nav-item-padding);
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
      &.onyx-future-nav-item--active {
        background-color: var(--onyx-nav-item-background-hover);
      }

      &[aria-selected="true"] {
        background-color: var(--onyx-nav-item-background-selected);

        &:hover,
        &.onyx-future-nav-item--active {
          color: var(--onyx-nav-item-color-selected);
        }
      }
    }

    &[aria-disabled="true"] {
      color: var(--onyx-color-text-icons-neutral-soft);
    }
  }
}
</style>
