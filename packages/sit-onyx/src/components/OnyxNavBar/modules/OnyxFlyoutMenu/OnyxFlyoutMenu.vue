<script setup lang="ts" generic="TValue extends SelectOptionValue = SelectOptionValue">
import { createMenuButton } from "@sit-onyx/headless";
import { computed, toRef } from "vue";
import { MANAGED_SYMBOL, useManagedState } from "../../../../composables/useManagedState";
import type { SelectOptionValue } from "../../../../types";
import type { OnyxFlyoutMenuProps } from "./types";

const props = withDefaults(defineProps<OnyxFlyoutMenuProps>(), {
  open: MANAGED_SYMBOL,
  trigger: "hover",
});

const emit = defineEmits<{
  "update:open": [isOpen: boolean];
}>();

const { state: isExpanded } = useManagedState(
  toRef(() => props.open),
  false,
  (newVal) => emit("update:open", newVal),
);

const slots = defineSlots<{
  /**
   * The trigger for the flyout menu. Should be an interactive component like a button or link.
   */
  button?(params: {
    /**
     * Attributes and event listeners that must be bound to an interactive element (button or link), that should act as the flyout trigger.
     */
    trigger: object;
  }): unknown;
  /**
   * OnyxMenuItem's to show
   */
  options?(): unknown;
  /**
   * Optional header content to display above the options.
   */
  header?(): unknown;
  /**
   * Optional footer content to display below the options.
   */
  footer?(): unknown;
}>();

const {
  elements: { root, button, menu },
} = createMenuButton({
  isExpanded: computed(() => !!isExpanded.value),
  onToggle: () => (isExpanded.value = !isExpanded.value),
  trigger: computed(() => props.trigger),
});
</script>

<template>
  <div class="onyx-component onyx-flyout-menu" v-bind="root">
    <slot name="button" :trigger="button"></slot>

    <div
      v-if="slots.options || slots.header || slots.footer"
      v-show="isExpanded"
      :aria-label="props.label"
      :class="{
        'onyx-flyout-menu__list--with-header': !!slots.header,
        'onyx-flyout-menu__list--with-footer': !!slots.footer,
        'onyx-flyout-menu__list': true,
      }"
    >
      <slot name="header"></slot>

      <ul
        v-if="slots.options"
        v-bind="menu"
        class="onyx-flyout-menu__wrapper onyx-flyout-menu__group"
      >
        <slot name="options"></slot>
      </ul>

      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../../../styles/mixins/layers";

.onyx-flyout-menu {
  @include layers.component() {
    --onyx-flyout-menu-gap: var(--onyx-spacing-2xs);
    display: inline-flex;
    width: min-content;
    position: relative;

    &__list {
      position: absolute;
      top: calc(100% + var(--onyx-flyout-menu-gap));
      border-radius: var(--onyx-radius-md);
      background-color: var(--onyx-color-base-background-blank);
      padding: var(--onyx-spacing-2xs) 0;
      box-shadow: var(--onyx-shadow-medium-bottom);
      box-sizing: border-box;
      width: max-content;
      min-width: var(--onyx-spacing-4xl);
      max-width: 20rem;
      font-family: var(--onyx-font-family);
      z-index: var(--onyx-z-index-flyout);

      &--with-header {
        padding-top: 0;
      }

      &--with-footer {
        padding-bottom: 0;
      }
    }

    &__wrapper {
      padding: 0;
    }
  }
}
</style>
