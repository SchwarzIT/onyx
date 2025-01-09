<script lang="ts" setup>
import chevronLeftSmall from "@sit-onyx/icons/chevron-left-small.svg?raw";
import { computed, inject, useId } from "vue";
import { ACCORDION_INJECTION_KEY, useDensity } from "../../";
import { SKELETON_INJECTED_SYMBOL, useSkeletonContext } from "../../composables/useSkeletonState";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxAccordionItemProps } from "./types";

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
const accordionContext = inject(ACCORDION_INJECTION_KEY);

const isOpen = computed({
  get: () => accordionContext?.openItems.value.has(itemId) || props.open || false,
  set: (value: boolean) => {
    accordionContext?.updateOpen(itemId, value);
  },
});

const skeleton = useSkeletonContext(props);
const { densityClass } = useDensity(props);
const isDisabled = computed(() => accordionContext?.disabled.value || props.disabled);
</script>

<template>
  <div
    v-if="skeleton || accordionContext?.skeleton.value"
    :class="['onyx-component', 'onyx-accordion-item-skeleton', densityClass]"
  >
    <OnyxSkeleton class="onyx-accordion-item-skeleton__main" />
    <OnyxSkeleton class="onyx-accordion-item-skeleton__icon" />
  </div>

  <details
    v-else
    class="onyx-component onyx-accordion-item"
    :class="[densityClass]"
    :open="isOpen"
    @toggle="isOpen = ($event.target as HTMLDetailsElement).open"
  >
    <summary
      :id="'header-' + itemId"
      class="onyx-accordion-item__header"
      role="button"
      :tabindex="isDisabled ? -1 : 0"
      :aria-expanded="isOpen"
      :aria-controls="'panel-' + itemId"
      :aria-disabled="isDisabled"
    >
      <div class="onyx-accordion-item__header-content">
        <slot name="header"></slot>
      </div>

      <OnyxIcon :icon="chevronLeftSmall" class="onyx-accordion-item__header-icon" />
    </summary>
    <div
      :id="'panel-' + itemId"
      class="onyx-accordion-item__panel"
      role="region"
      :aria-labelledby="'header-' + itemId"
    >
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
      &-content {
        display: flex;
      }

      &-icon {
        color: inherit;
      }
    }
    &[open] &__header-icon {
      transform: rotate(-90deg);
    }
    &:has(&__header:focus-visible) {
      border-radius: var(--onyx-radius-md);
      border-bottom: none;
      outline: var(--onyx-outline-width) solid var(--onyx-color-component-focus-primary);
    }

    &:not([open]) &__header {
      color: var(--onyx-color-text-icons-neutral-medium);
      &:hover,
      &:focus-visible {
        color: var(--onyx-color-text-icons-neutral-intense);
      }
      &:focus-visible {
        border-radius: var(--onyx-radius-md);
      }
    }
    &[open] &__header {
      &:focus-visible {
        border-radius: var(--onyx-radius-md) var(--onyx-radius-md) 0 0;
      }

      &::after {
        transform: rotate(90deg);
      }
    }
    &__panel {
      padding: var(--onyx-density-md);
    }
    &:has(&__header[aria-disabled="true"]) {
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
    border-bottom: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);

    &__main {
      width: calc(100% - 3 * var(--onyx-density-md));
      height: 1.5rem;
    }
    &__icon {
      height: 1.5rem;
      width: var(--onyx-density-md);
    }
  }
}
</style>
