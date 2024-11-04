<script lang="ts" setup>
import { computed, inject } from "vue";
import { TABS_INJECTION_KEY } from "../OnyxTabs/types";
import type { OnyxTabProps } from "./types";

const props = defineProps<OnyxTabProps>();

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

const tabsContext = inject(TABS_INJECTION_KEY);

const isActive = computed(() => tabsContext?.headless.state.isVisible.value(props.value) ?? false);
</script>

<template>
  <button
    class="onyx-tab onyx-text--large"
    :class="{ 'onyx-tab--active': isActive }"
    v-bind="tabsContext?.headless.elements.tab.value({ value: props.value })"
    type="button"
  >
    <slot name="tab">{{ props.label }}</slot>
  </button>

  <!-- The <Teleport> is used because we want to offer a nice API for the user
       so he can provide both tab and the panel content in one "OnyxTab" component.
       However, for the accessibility pattern (see https://www.w3.org/WAI/ARIA/apg/patterns/tabs/),
       we need a separated HTML structure where the tab and the panel must not be nested.
       The <Teleport> will allow us to achieve this by moving the panel content to the `OnyxTabs` component.
     -->
  <Teleport :to="tabsContext?.panelRef.value" :disabled="!tabsContext?.panelRef.value" defer>
    <div
      v-if="isActive"
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
    --padding-vertical: var(--onyx-density-xs);
    --padding-inline: var(--onyx-density-md);

    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-medium);
    border-radius: var(--onyx-radius-sm);
    padding: var(--padding-vertical) var(--padding-inline);
    cursor: pointer;
    font-weight: 600;

    display: flex;
    align-items: center;
    gap: var(--onyx-density-xs);

    // reset button styles
    border: none;
    background-color: transparent;

    &--active {
      color: var(--onyx-color-text-icons-neutral-intense);
      position: relative;

      &::after {
        content: "";
        height: 0.125rem;
        background-color: var(--onyx-color-base-primary-500);
        width: calc(100% - 2 * var(--onyx-density-md) - 2 * var(--onyx-density-xs));

        position: absolute;
        left: 50%;
        bottom: calc(var(--padding-vertical) - var(--onyx-density-3xs));
        transform: translateX(-50%);
      }
    }

    &:hover {
      background-color: var(--onyx-color-base-neutral-200);
    }

    &:focus-visible {
      background-color: var(--onyx-color-base-background-blank);
      outline: 0.25rem solid var(--onyx-color-base-primary-200);
    }

    &__panel {
      font-family: var(--onyx-font-family);
      color: var(--onyx-color-text-icons-neutral-intense);
    }
  }
}
</style>
