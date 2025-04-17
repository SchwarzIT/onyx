<script lang="ts" setup>
import { computed } from "vue";
import OnyxMenuItem from "../OnyxMenuItem/OnyxMenuItem.vue";
import type { OnyxMenuItemProps } from "../OnyxMenuItem/types";

const props = defineProps<
  OnyxMenuItemProps & {
    /**
     * The render context of the nav item.
     * Styling is changed based on the context prop.
     */
    context: "mobile" | "list" | "navbar";
  }
>();

const slots = defineSlots<{
  /**
   * Button/link text and additional inline content.
   */
  default(): unknown;
  /**
   * Children items of the nav item.
   */
  children(): unknown;
}>();

const hasChildren = computed(() => !!slots.children);
</script>

<template>
  <OnyxMenuItem
    v-bind="props"
    :link="hasChildren && props.context !== 'navbar' ? undefined : props.link"
    :class="{
      'onyx-nav-item': true,
      'onyx-nav-item--active': props.active,
      [`onyx-nav-item--${props.context}`]: true,
      'onyx-nav-item--open': props.open,
    }"
  >
    <slot></slot>
    <template v-if="hasChildren" #children><slot name="children"></slot></template>
  </OnyxMenuItem>
</template>

<style lang="scss">
@use "../../../../styles/mixins/layers";

@include layers.override() {
  .onyx-nav-item--navbar {
    position: relative;
    height: 2.5rem;
    width: max-content;
    border-radius: var(--onyx-radius-sm);
    white-space: nowrap;
    --onyx-list-item-background-hover: transparent;
    --onyx-list-item-background-selected: var(--onyx-color-base-background-blank);
    --onyx-list-item-padding: var(--onyx-spacing-2xs) var(--onyx-spacing-md);

    &:has(:focus-visible) {
      outline: var(--onyx-outline-width) solid var(--onyx-color-component-focus-primary);
    }

    &:hover {
      --onyx-list-item-background-selected: var(--onyx-color-base-neutral-200);
      --onyx-list-item-background-hover: var(--onyx-color-base-neutral-200);
    }

    & .onyx-menu-item__chevron {
      display: none;
    }

    &:has(.onyx-nav-item--active),
    &.onyx-nav-item--active {
      font-weight: 600;
      color: var(--onyx-color-text-icons-primary-intense);
      --onyx-list-item-color-selected: var(--onyx-color-text-icons-primary-intense);

      &::after {
        content: " ";
        position: absolute;
        width: 100%;
        height: 0.125rem;
        bottom: calc(-1 * var(--onyx-spacing-2xs));
        border-radius: var(--onyx-radius-full) var(--onyx-radius-full) 0 0;
        background: var(--onyx-color-component-cta-default);
        z-index: 1;
      }
    }
  }

  .onyx-nav-item--mobile {
    --onyx-list-item-padding: var(--onyx-spacing-sm);
    color: var(--onyx-color-text-icons-neutral-intense);
    width: 100%;
    align-self: stretch;
    line-height: 1.5rem;
    text-align: start;
    font-size: 1rem;
    font-weight: 400;
    border-radius: var(--onyx-radius-sm);
    border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);

    &:focus-within {
      background-color: var(--onyx-color-base-background-blank);
    }

    &:hover {
      background-color: var(--onyx-color-base-background-tinted);
    }

    &:has(.onyx-nav-item--active),
    &.onyx-nav-item--active {
      --onyx-list-item-background-selected: var(--onyx-color-base-primary-100);
      --onyx-list-item-color-selected: var(--onyx-color-text-icons-primary-intense);
      background-color: var(--onyx-list-item-background-selected);
      border-color: var(--onyx-color-base-primary-200);
      color: var(--onyx-color-text-icons-primary-bold);
      font-weight: 600;
    }

    &:has(.onyx-nav-item--active):hover,
    &.onyx-nav-item--active:hover {
      border-color: var(--onyx-component-border-primary);
    }

    &.onyx-nav-item--open {
      all: unset;
    }
  }
}
</style>
