<script lang="ts" setup>
import chevronDownSmall from "@sit-onyx/icons/chevron-down-small.svg?raw";
import { computed, inject, useId } from "vue";
import { ACCORDION_INJECTION_KEY, useDensity } from "../../";
import { SKELETON_INJECTED_SYMBOL, useSkeletonContext } from "../../composables/useSkeletonState";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxAccordionItemProps } from "./types";

const props = withDefaults(defineProps<OnyxAccordionItemProps>(), {
  disabled: false,
  skeleton: SKELETON_INJECTED_SYMBOL,
  open: false,
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

const emit = defineEmits<{
  /**
   * Emitted when the open state is changed.
   */
  "update:open": [isOpen: boolean];
}>();

const isOpen = computed({
  get: () => accordionContext?.openItems.value.has(itemId) || props.open,
  set: (value: boolean) => {
    accordionContext?.updateOpen(itemId, value);
    emit("update:open", value);
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

      <OnyxIcon :icon="chevronDownSmall" class="onyx-accordion-item__header-icon" />
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

.onyx-accordion-item,
.onyx-accordion-item-skeleton {
  @include layers.component() {
    --onyx-accordion-item-padding: var(--onyx-density-md);
    --onyx-accordion-item-gap: var(--onyx-density-md);
    --onyx-accordion-item-border: var(--onyx-1px-in-rem) solid
      var(--onyx-color-component-border-neutral);
    --onyx-accordion-border-radius: var(--onyx-radius-md);
    --onyx-accordion-toggle-duration: 250ms;
  }
}

.onyx-accordion-item {
  @include layers.component() {
    border-bottom: var(--onyx-accordion-item-border);
    color: var(--onyx-color-text-icons-neutral-intense);
    font-family: var(--onyx-font-family);
    width: 100%;

    @supports selector(::details-content) {
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
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--onyx-accordion-item-gap);
      padding: var(--onyx-accordion-item-padding);
      cursor: pointer;

      list-style: none;
      &::-webkit-details-marker {
        display: none;
      }

      &:hover,
      &:focus-visible {
        background-color: var(--onyx-color-base-neutral-200);
        outline: none;
      }
    }

    &:has(&__header:focus-visible) {
      border-radius: var(--onyx-accordion-border-radius);
      border-bottom: none;
      outline: var(--onyx-outline-width) solid var(--onyx-color-component-focus-primary);
    }

    &[open] &__header-icon {
      transform: rotate(180deg);
    }

    &[open] &__header:focus-visible {
      border-radius: var(--onyx-accordion-border-radius) var(--onyx-accordion-border-radius) 0 0;
    }

    &:not([open]) &__header {
      color: var(--onyx-color-text-icons-neutral-medium);

      &:hover,
      &:focus-visible {
        color: var(--onyx-color-text-icons-neutral-intense);
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
    }
  }
}
</style>
