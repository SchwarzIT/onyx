<script lang="ts" setup>
import { computed, inject } from "vue";
import { useDensity } from "../../composables/density";
import { TABS_INJECTION_KEY } from "../OnyxTabs/types";
import type { OnyxTabProps } from "./types";

const props = withDefaults(defineProps<OnyxTabProps>(), {
  disabled: false,
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

const tab = computed(() => tabsContext?.headless.elements.tab.value({ value: props.value }));
</script>

<template>
  <button
    :class="[
      'onyx-tab',
      'onyx-text--large',
      densityClass,
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
  <Teleport :to="tabsContext?.panelRef.value" :disabled="!tabsContext?.panelRef.value" defer>
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

.onyx-tab {
  @include layers.component() {
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-medium);
    border-radius: var(--onyx-radius-sm);
    padding: var(--onyx-density-xs) var(--onyx-density-md);
    font-weight: 600;

    // reset button styles
    border: none;
    background-color: transparent;

    &--selected {
      color: var(--onyx-color-text-icons-neutral-intense);

      .onyx-tab__label {
        &::after {
          content: "";
          height: 0.125rem;
          background-color: var(--onyx-color-base-primary-500);
          width: calc(100% - 2 * var(--onyx-density-xs));
          min-width: 1rem;

          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
        }
      }
    }

    &:enabled {
      cursor: pointer;

      &:hover,
      &:focus-visible {
        background-color: var(--onyx-color-base-neutral-200);
      }

      &:focus-visible {
        outline: 0.25rem solid var(--onyx-color-base-primary-200);
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
      padding-bottom: var(--onyx-density-3xs);
    }

    &__panel {
      font-family: var(--onyx-font-family);
      color: var(--onyx-color-text-icons-neutral-intense);
    }
  }
}
</style>
