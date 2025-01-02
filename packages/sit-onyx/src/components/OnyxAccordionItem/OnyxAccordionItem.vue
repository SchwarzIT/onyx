<script lang="ts" setup>
import chevronLeftSmall from "@sit-onyx/icons/chevron-left-small.svg?raw";
import { useId } from "vue";
import { useDensity } from "../../";
import { SKELETON_INJECTED_SYMBOL, useSkeletonContext } from "../../composables/useSkeletonState";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import OnyxSystemButton from "../OnyxSystemButton/OnyxSystemButton.vue";
import type { OnyxAccordionItemProps } from "./types";
import { useAccordionItem } from "./useAccordionItem";

const props = withDefaults(defineProps<OnyxAccordionItemProps>(), {
  disabled: false,
  skeleton: SKELETON_INJECTED_SYMBOL,
});

defineSlots<{
  /**
   * Displays the header content.
   */
  header(): unknown;

  /**
   * Displays the panel content.
   */
  default?(): unknown;
}>();
const itemId = useId();

const { accordionContext, isOpen } = useAccordionItem(itemId);

const skeleton = useSkeletonContext(props);
const { densityClass } = useDensity(props);
</script>

<template>
  <div
    v-if="skeleton || accordionContext?.skeleton.value"
    :class="['onyx-component', 'onyx-accordion-item-skeleton', densityClass]"
  >
    <OnyxSkeleton class="onyx-accordion-item-skeleton__main" />
    <OnyxSystemButton label="chevron-left" class="onyx-accordion-item-skeleton__decoration" />
  </div>

  <details
    v-else
    class="onyx-component onyx-accordion-item"
    :class="[
      densityClass,
      accordionContext?.disabled.value || props.disabled ? 'onyx-accordion-item--disabled' : '',
    ]"
    :open="isOpen"
    @toggle="isOpen = ($event.target as HTMLDetailsElement).open"
  >
    <summary
      class="onyx-accordion-item__header"
      role="heading"
      :tabindex="accordionContext?.disabled.value || props.disabled ? -1 : 0"
      aria-level="2"
      :aria-expanded="isOpen"
      :aria-controls="'panel-' + itemId"
      :aria-disabled="accordionContext?.disabled.value || props.disabled"
    >
      <div class="onyx-accordion-item__header__content">
        <slot name="header"></slot>
      </div>

      <OnyxSystemButton
        label="chevron-left"
        :icon="chevronLeftSmall"
        class="onyx-accordion-item__header__icon"
        tabindex="-1"
      />
    </summary>
    <div class="onyx-accordion-item__panel" role="region" :aria-labelledby="'header-' + itemId">
      <slot></slot>
    </div>
  </details>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";
.onyx-accordion-item {
  @include layers.component() {
    border-bottom: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
    color: var(--onyx-color-text-icons-neutral-intense);
    overflow: hidden;
    font-family: var(--onyx-font-family);
    position: relative;
    width: 100%;

    &__header {
      width: 100%;
      position: relative;
      display: flex;
      justify-content: space-between;
      gap: var(--onyx-density-md);
      align-items: center;
      padding: var(--onyx-density-md);

      cursor: pointer;
      &:hover,
      &:focus-visible {
        background-color: var(--onyx-color-base-neutral-200);
        outline: none;
      }
      &__content {
        display: flex;
      }

      &__icon {
        pointer-events: none;
        right: var(--onyx-density-md);
        color: inherit;
        figure {
          height: 100%;
          width: 100%;
        }
      }
    }
    &[open] &__header__icon {
      transform: rotate(-90deg);
    }
    &:has(:focus-visible) {
      border-radius: var(--onyx-radius-md);
      border-bottom: none;
      z-index: 1;
      outline: var(--onyx-outline-width) solid var(--onyx-color-component-focus-primary);
    }

    &:not([open]) &__header {
      color: var(--onyx-color-text-icons-neutral-medium);
      &:hover,
      &:focus-visible {
        color: var(--onyx-color-text-icons-neutral-intense);
      }
    }
    &[open] &__header::after {
      transform: rotate(90deg);
    }
    &__panel {
      padding: var(--onyx-density-md);
    }
    &--disabled {
      color: var(--onyx-color-text-icons-neutral-soft);
      pointer-events: none;
      .onyx-accordion-item__header {
        color: var(--onyx-color-text-icons-neutral-soft);
      }
    }
  }
  &-skeleton {
    padding: var(--onyx-density-md);
    display: flex;
    gap: var(--onyx-density-md);
    border-bottom: 1px solid var(--onyx-color-component-border-neutral);

    &__main {
      width: calc(100% - 3 * var(--onyx-density-md));
      height: var(--onyx-density-md);
    }
    &__decoration {
      height: var(--onyx-density-md);
      width: var(--onyx-density-md);
    }
  }
}
</style>
