<script lang="ts" setup>
import { computed, inject } from "vue";
import { useDensity } from "../../composables/density";
import { SKELETON_INJECTED_SYMBOL, useSkeletonContext } from "../../composables/useSkeletonState";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import { TABS_INJECTION_KEY } from "../OnyxTabs/types";
import type { OnyxTabProps } from "./types";

const props = withDefaults(defineProps<OnyxTabProps>(), {
  disabled: false,
  skeleton: SKELETON_INJECTED_SYMBOL,
});

defineSlots<{
  /**
   * Tab panel / content.
   */
  default(): unknown;
  /**
   * Optional slot to override the tab content. By default, the `label` property will be displayed.
   */
  tab?(): unknown;
}>();

const { densityClass } = useDensity(props);
const tabsContext = inject(TABS_INJECTION_KEY);
const skeleton = useSkeletonContext(props);
const sizeClass = computed(() => `onyx-tab--${tabsContext?.size.value}`);

const tab = computed(() =>
  tabsContext?.headless.elements.tab.value({
    value: props.value,
    disabled: props.disabled || !!skeleton.value,
  }),
);
</script>

<template>
  <OnyxSkeleton
    v-if="skeleton"
    :class="['onyx-tab-skeleton', densityClass, sizeClass]"
    v-bind="tab"
  />
  <button
    v-else
    :class="[
      'onyx-component',
      'onyx-tab',
      densityClass,
      sizeClass,
      tab?.['aria-selected'] ? 'onyx-tab--selected' : '',
    ]"
    v-bind="tab"
    type="button"
    :disabled="props.disabled"
  >
    <div class="onyx-tab__label">
      <slot name="tab">{{ props.label }}</slot>
    </div>
  </button>

  <!-- The <Teleport> is used because we want to offer a nice API for the user
       so he can provide both tab and the panel content in one "OnyxTab" component.
       However, for the accessibility pattern (see https://www.w3.org/WAI/ARIA/apg/patterns/tabs/),
       we need a separated HTML structure where the tab and the panel must not be nested.
       The <Teleport> will allow us to achieve this by moving the panel content to the `OnyxTabs` component.
     -->
  <Teleport v-if="tabsContext?.panel.value" :to="tabsContext?.panel.value" defer>
    <div
      v-if="tab?.['aria-selected']"
      v-bind="tabsContext?.headless.elements.tabpanel.value({ value: props.value })"
      class="onyx-tab__panel"
    >
      <slot></slot>
    </div>
  </Teleport>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";
@use "../../styles/mixins/sizes.scss";

.onyx-tab,
.onyx-tab-skeleton {
  @include layers.component() {
    --onyx-tab-padding-vertical: var(--onyx-density-xs);
    --onyx-tab-highlight-gap: var(--onyx-density-3xs);

    @include sizes.define-headline-sizes();
  }
}

.onyx-tab {
  @include layers.component() {
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-medium);
    border-radius: var(--onyx-radius-sm);
    padding: var(--onyx-tab-padding-vertical) var(--onyx-density-md);
    font-weight: 600;
    // tabs should have their needed width and be horizontally scrollable instead if they exceed the max parent width
    // (will be handled by the OnyxTabs component)
    min-width: max-content;

    // reset button styles
    border: none;
    background-color: transparent;

    &--selected {
      color: var(--onyx-color-text-icons-neutral-intense);

      .onyx-tab__label {
        &::after {
          content: "";
          height: 0.125rem;
          background-color: var(--onyx-color-component-cta-default);
          width: calc(100% - 2 * var(--onyx-density-xs));
          min-width: 1rem;

          position: absolute;
          left: 50%;
          bottom: calc(-1 * var(--onyx-tab-highlight-gap));
          transform: translateX(-50%);
        }
      }
    }

    &:enabled {
      cursor: pointer;

      &:hover,
      &:focus-visible {
        background-color: var(--onyx-color-component-focus-primary);
      }

      &:focus-visible {
        outline: var(--onyx-outline-width) solid var(--onyx-color-component-focus-primary);
      }

      &:active {
        color: var(--onyx-color-text-icons-primary-bold);
      }
    }

    &:disabled {
      color: var(--onyx-color-text-icons-neutral-soft);
    }

    &__label {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--onyx-density-xs);
      position: relative;
    }

    &__panel {
      font-family: var(--onyx-font-family);
      color: var(--onyx-color-text-icons-neutral-intense);
    }

    &-skeleton {
      width: var(--onyx-density-4xl);
      height: calc(1lh + 2 * var(--onyx-tab-padding-vertical) + var(--onyx-tab-highlight-gap));
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>
