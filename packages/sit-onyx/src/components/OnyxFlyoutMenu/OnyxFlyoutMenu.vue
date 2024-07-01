<script setup lang="ts" generic="TValue extends SelectOptionValue = SelectOptionValue">
import { createMenuButton } from "@sit-onyx/headless";
import { computed, provide, type VNode } from "vue";
import { injectI18n } from "../../i18n";
import type { SelectOptionValue } from "../../types";
import { MENU_BUTTON_ITEM_INJECTION_KEY } from "../OnyxMenuItem/types";

const slots = defineSlots<{
  /**
   * The trigger for the flyout menu. Should be an interactive component like a button or link.
   */
  default?(): VNode[];
  /**
   * OnyxListItems to show
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
  elements: { button, menu, menuItem, listItem, flyout },
  state: { isExpanded },
} = createMenuButton({});

provide(MENU_BUTTON_ITEM_INJECTION_KEY, { menuItem, listItem });

const { t } = injectI18n();

const buttonComponent = computed(() => {
  if (!slots.default) return;
  const vnode = slots.default().at(0);

  if (vnode?.type.toString() === "Symbol(v-fgt)") {
    return Array.isArray(vnode?.children) ? vnode?.children?.at(0) : undefined;
  }
  return vnode;
});
</script>

<template>
  <div class="onyx-flyout-menu">
    <component :is="buttonComponent" v-bind="button" />

    <div
      v-if="slots.options || slots.header || slots.footer"
      v-show="isExpanded"
      v-bind="flyout"
      :aria-label="t('navigation.navigationHeadline')"
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
@use "../../styles/mixins/layers";

.onyx-flyout-menu {
  @include layers.component() {
    display: inline-block;
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
