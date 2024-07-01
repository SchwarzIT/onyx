<script setup lang="ts" generic="TValue extends SelectOptionValue = SelectOptionValue">
import { createMenuButton, debounce } from "@sit-onyx/headless";
import type { SelectOptionValue } from "../../../types";
import { provide, toRef, type VNode } from "vue";
import { injectI18n } from "../../../i18n";
import { MENU_BUTTON_ITEM_INJECTION_KEY } from "../../OnyxMenuItem/types";
import { useManagedState } from "../../../composables/useManagedState";

const props = withDefaults(
  defineProps<{
    /**
     * If the flyout is expanded or not.
     */
    open?: boolean;
  }>(),
  { open: undefined },
);

const emit = defineEmits<{
  "update:open": [open: boolean];
}>();

const slots = defineSlots<{
  /**
   * The trigger for the flyout menu
   */
  default(): VNode[];
  /**
   * OnyxListItems to show
   */
  options?(): VNode[];
  /**
   * Optional header content to display above the options.
   */
  header?(): unknown;
  /**
   * Optional footer content to display below the options (will replace `message` property).
   */
  footer?(): unknown;
}>();

const open = useManagedState(
  toRef(() => props.open),
  false,
  (val) => emit("update:open", val),
);

const {
  elements: { button, menu, menuItem, listItem },
} = createMenuButton({ isExpanded: open, onToggle: () => (open.value = !open.value) });

/**
 * Debounced expanded state that will only be toggled after a given timeout.
 */
const updateDebouncedExpanded = debounce((expanded: boolean) => (open.value = expanded), 200);

provide(MENU_BUTTON_ITEM_INJECTION_KEY, { menuItem, listItem });

const { t } = injectI18n();
</script>

<template>
  <!-- eslint-disable-next-line vuejs-accessibility/no-static-element-interactions -->
  <div
    class="onyx-future-flyout-menu"
    @focusin="open = true"
    @focusout="open = false"
    @mouseover="() => updateDebouncedExpanded(true)"
    @mouseout="() => updateDebouncedExpanded(false)"
  >
    <component :is="slots.default?.()?.[0]" v-bind="button" />
    <div
      v-if="slots.options || slots.header || slots.footer"
      v-show="open"
      :aria-label="t('navigation.navigationHeadline')"
      :class="{
        'onyx-future-flyout-menu__list--with-header': !!slots.header,
        'onyx-future-flyout-menu__list--with-footer': !!slots.footer,
        'onyx-future-flyout-menu__list': true,
      }"
    >
      <slot name="header"></slot>
      <ul
        v-if="slots.options"
        v-bind="menu"
        class="onyx-future-flyout-menu__wrapper onyx-flyout-menu__group"
      >
        <slot name="options"></slot>
      </ul>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../../styles/mixins/layers";

// TODO: replace 'onyx-future-flyout-menu' class name with 'onyx-flyout-menu' after merging this component
// with the official OnyxFlyoutMenu
.onyx-future-flyout-menu {
  @include layers.component() {
    // TODO: remove comment after replacing this component with the official OnyxFlyoutMenu
    // display: inline-block;
    width: min-content;

    &__list {
      position: absolute;
      margin-top: var(--onyx-spacing-sm);
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
