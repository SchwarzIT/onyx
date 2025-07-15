<script lang="ts" setup>
import chevronDownSmall from "@sit-onyx/icons/chevron-down-small.svg?raw";
import { computed, inject, watch } from "vue";
import { useDensity } from "../../composables/density.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import { ACCORDION_INJECTION_KEY } from "../OnyxAccordion/types.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxAccordionItemProps } from "./types.js";

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

const accordionContext = inject(ACCORDION_INJECTION_KEY, undefined);

const isOpen = computed({
  get: () => accordionContext?.openItems.value.includes(props.value),
  set: (open: boolean) => accordionContext?.updateOpen(props.value, open),
});

watch(
  () => props.value,
  (newValue, oldValue) => {
    accordionContext?.updateOpen(newValue, accordionContext?.openItems.value.includes(newValue));
    accordionContext?.updateOpen(oldValue, false);
  },
);

const skeleton = useSkeletonContext(props);
const { densityClass } = useDensity(props);
const isDisabled = computed(() => accordionContext?.disabled.value || props.disabled);
const type = computed(() => accordionContext?.type.value ?? "default");

const headerId = computed(() => `header-${props.value.toString()}`);
const panelId = computed(() => `panel-${props.value.toString()}`);
</script>

<template>
  <div
    v-if="skeleton || accordionContext?.skeleton.value"
    :class="[
      'onyx-component',
      'onyx-accordion-item-skeleton',
      densityClass,
      type !== 'default' ? `onyx-accordion-item-skeleton--${type}` : '',
    ]"
  >
    <OnyxSkeleton class="onyx-accordion-item-skeleton__main" />
    <OnyxSkeleton class="onyx-accordion-item-skeleton__icon" />
  </div>

  <details
    v-else
    :class="[
      'onyx-component',
      'onyx-accordion-item',
      densityClass,
      type !== 'default' ? `onyx-accordion-item--${type}` : '',
    ]"
    :open="isOpen"
  >
    <!-- eslint-disable-next-line vuejs-accessibility/click-events-have-key-events, vuejs-accessibility/interactive-supports-focus -- false positives -->
    <summary
      :id="headerId"
      class="onyx-accordion-item__header"
      role="button"
      :tabindex="isDisabled ? -1 : 0"
      :aria-expanded="isOpen"
      :aria-controls="panelId"
      :aria-disabled="isDisabled"
      @click.prevent="isOpen = !isOpen"
    >
      <div class="onyx-accordion-item__header-content">
        <slot name="header"></slot>
      </div>

      <OnyxIcon :icon="chevronDownSmall" class="onyx-accordion-item__header-icon" />
    </summary>

    <div :id="panelId" class="onyx-accordion-item__panel" role="region" :aria-labelledby="headerId">
      <slot></slot>
    </div>
  </details>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-accordion-item,
.onyx-accordion-item-skeleton {
  @include layers.component() {
    --onyx-accordion-item-padding: var(--onyx-density-md);
    --onyx-accordion-item-gap: var(--onyx-density-md);
    --onyx-accordion-item-border: var(--onyx-1px-in-rem) solid
      var(--onyx-color-component-border-neutral);
    --onyx-accordion-item-border-focus: none;
    --onyx-accordion-item-border-radius: var(--onyx-radius-md);
    --onyx-accordion-item-font-size: var(--onyx-font-size-md);
    --onyx-accordion-item-line-height: var(--onyx-font-line-height-md);
    --onyx-accordion-item-font-weight: var(--onyx-font-weight-regular);
    --onyx-accordion-item-justify: space-between;
    --onyx-accordion-item-chevron-rotation: 0deg;
    --onyx-accordion-item-chevron-rotation-open: 180deg;

    // colors
    --onyx-accordion-item-color: var(--onyx-color-text-icons-neutral-medium);
    --onyx-accordion-item-color-hover: var(--onyx-color-text-icons-neutral-intense);
    --onyx-accordion-item-color-open: var(--onyx-accordion-item-color-hover);
    --onyx-accordion-item-background: transparent;
    --onyx-accordion-item-background-hover: var(--onyx-color-base-neutral-200);
    --onyx-accordion-item-background-focus: var(--onyx-accordion-item-background-hover);
    --onyx-accordion-item-outline: var(--onyx-outline-width) solid
      var(--onyx-color-component-focus-primary);
    &--nested-large,
    &--nested-small {
      --onyx-accordion-item-font-weight: var(--onyx-font-weight-semibold);
      --onyx-accordion-item-gap: var(--onyx-density-xs);
      --onyx-accordion-item-justify: flex-start;
      --onyx-accordion-item-chevron-rotation: 90deg;
      --onyx-accordion-item-chevron-rotation-open: 0deg;
      --onyx-accordion-item-color-open: var(--onyx-accordion-item-color);
      --onyx-accordion-item-outline: none;
      --onyx-accordion-item-border-radius: 0;
      --onyx-accordion-item-border-focus: var(--onyx-accordion-item-border);
    }

    &--nested-large {
      --onyx-accordion-item-color: var(--onyx-color-text-icons-neutral-intense);
      --onyx-accordion-item-background: var(--onyx-color-base-background-blank);
      --onyx-accordion-item-background-hover: var(--onyx-color-base-background-tinted);
      --onyx-accordion-item-background-focus: var(--onyx-color-base-neutral-200);
    }

    &--nested-small {
      --onyx-accordion-item-padding: var(--onyx-density-xs) var(--onyx-density-md);
      --onyx-accordion-item-font-size: var(--onyx-font-size-sm);
      --onyx-accordion-item-line-height: var(--onyx-font-line-height-sm);
      --onyx-accordion-item-color: var(--onyx-color-text-icons-neutral-medium);
      --onyx-accordion-item-background: var(--onyx-color-base-background-tinted);
      --onyx-accordion-item-background-hover: var(--onyx-color-base-neutral-200);
      --onyx-accordion-item-background-focus: var(--onyx-color-base-neutral-300);
    }
  }
}

.onyx-accordion-item {
  @include layers.component() {
    --onyx-accordion-toggle-duration: var(--onyx-duration-sm);

    border-bottom: var(--onyx-accordion-item-border);
    font-family: var(--onyx-font-family);
    width: 100%;

    @supports selector(::details-content) and (interpolate-size: allow-keywords) {
      interpolate-size: allow-keywords;

      &::details-content {
        height: 0;
        overflow: clip;
        transition:
          content-visibility var(--onyx-accordion-toggle-duration) ease,
          height var(--onyx-accordion-toggle-duration) ease;
        transition-behavior: allow-discrete;
      }

      &[open]::details-content {
        height: auto;
      }
    }

    &__header {
      color: var(--onyx-accordion-item-color);
      width: 100%;
      display: flex;
      justify-content: var(--onyx-accordion-item-justify);
      align-items: center;
      gap: var(--onyx-accordion-item-gap);
      padding: var(--onyx-accordion-item-padding);
      cursor: pointer;
      font-size: var(--onyx-accordion-item-font-size);
      line-height: var(--onyx-accordion-item-line-height);
      font-weight: var(--onyx-accordion-item-font-weight);
      background-color: var(--onyx-accordion-item-background);

      list-style: none;
      &::-webkit-details-marker {
        display: none;
      }

      &:hover,
      &:focus-visible {
        outline: none;
        color: var(--onyx-accordion-item-color-hover);
      }

      &:hover {
        background-color: var(--onyx-accordion-item-background-hover);
      }

      &:focus-visible {
        background-color: var(--onyx-accordion-item-background-focus);
      }
    }

    &--nested-large,
    &--nested-small {
      .onyx-accordion-item__header {
        position: sticky;
        top: 0;
        z-index: var(--onyx-z-index-sticky-content);
      }
    }

    &:has(&__header:focus-visible) {
      border-radius: var(--onyx-accordion-item-border-radius);
      border-bottom: var(--onyx-accordion-item-border-focus);
      outline: var(--onyx-accordion-item-outline);
    }

    &__header-icon {
      transition: transform var(--onyx-accordion-toggle-duration) ease;
      transform: rotate(var(--onyx-accordion-item-chevron-rotation));
    }

    &[open] > &__header &__header-icon {
      transform: rotate(var(--onyx-accordion-item-chevron-rotation-open));
    }

    &[open] &__header {
      color: var(--onyx-accordion-item-color-open);

      &:focus-visible {
        border-radius: var(--onyx-accordion-item-border-radius)
          var(--onyx-accordion-item-border-radius) 0 0;
      }
    }

    &__panel {
      padding: var(--onyx-accordion-item-padding);
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
    $icon-size: 1.5rem;
    padding: var(--onyx-accordion-item-padding);
    display: flex;
    gap: var(--onyx-accordion-item-gap);
    border-bottom: var(--onyx-accordion-item-border);

    &__main {
      width: 100%;
      height: $icon-size;
    }

    &__icon {
      height: $icon-size;
      width: $icon-size;
      flex-shrink: 0;
    }
  }
}
</style>
