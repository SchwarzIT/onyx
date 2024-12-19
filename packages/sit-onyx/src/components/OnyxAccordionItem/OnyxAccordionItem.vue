<script lang="ts" setup>
import chevronLeftSmall from "@sit-onyx/icons/chevron-left-small.svg?raw";
import { computed, inject, useId } from "vue";
import { ACCORDION_INJECTION_KEY, OnyxIcon, useDensity } from "../../";
import { SKELETON_INJECTED_SYMBOL, useSkeletonContext } from "../../composables/useSkeletonState";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxAccordionItemProps } from "./types";

const props = withDefaults(defineProps<OnyxAccordionItemProps>(), {
  disabled: false,
  skeleton: SKELETON_INJECTED_SYMBOL,
});
const itemId = useId();

defineSlots<{
  header(): unknown;
  panel(): unknown;
}>();

const accordionContext = inject(ACCORDION_INJECTION_KEY);

const isOpen = computed({
  get: () => accordionContext?.openItems.value.has(itemId) || false,
  set: (value: boolean) => {
    accordionContext?.updateOpen(itemId, value);
  },
});

const skeleton = useSkeletonContext(props);
const { densityClass } = useDensity(props);
</script>

<template>
  <div
    v-if="skeleton || accordionContext?.skeleton.value"
    :class="['onyx-component', 'onyx-accordion-item-skeleton', densityClass]"
  >
    <OnyxSkeleton class="onyx-accordion-item-skeleton__main" />
    <OnyxSkeleton class="onyx-accordion-item-skeleton__decoration" />
  </div>

  <details
    v-else-if="accordionContext"
    class="onyx-component onyx-accordion-item"
    :class="[densityClass, props.disabled || accordionContext.disabled.value ? 'disabled' : '']"
    :open="isOpen"
    @toggle="(e) => (isOpen = (e.target as HTMLDetailsElement).open)"
  >
    <summary
      class="onyx-accordion-item__header"
      :tabindex="props.disabled || accordionContext.disabled.value ? -1 : 0"
    >
      <slot name="header"></slot>
      <OnyxIcon :icon="chevronLeftSmall" class="onyx-accordion-item__header__icon" />
    </summary>
    <div class="onyx-accordion-item__panel">
      <slot name="panel"></slot>
    </div>
  </details>
  <!-- Fallback if AccordionItem is used without Accordion -->
  <details
    v-else
    class="onyx-component onyx-accordion-item"
    :class="[densityClass, props.disabled ? 'disabled' : '']"
  >
    <summary class="onyx-accordion-item__header" :tabindex="props.disabled ? -1 : 0">
      <slot name="header"></slot>
      <OnyxIcon :icon="chevronLeftSmall" class="onyx-accordion-item__header__icon" />
    </summary>
    <div class="onyx-accordion-item__panel">
      <slot name="panel"></slot>
    </div>
  </details>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";
.onyx-accordion-item {
  @include layers.component() {
    border-bottom: 1px solid var(--onyx-color-component-border-neutral);
    color: var(--onyx-color-text-icons-neutral-intense);
    overflow: hidden;
    font-family: var(--onyx-font-family);
    position: relative;
    width: 100%;

    &__header {
      width: 100%;
      position: relative;
      display: flex;
      align-items: center;
      padding: var(--onyx-density-md);
      cursor: pointer;
      &:hover,
      &:focus-visible {
        background-color: var(--onyx-color-base-neutral-200);
        outline: none;
      }
      &__icon {
        position: absolute;
        right: var(--onyx-density-md);
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
    &.disabled {
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
