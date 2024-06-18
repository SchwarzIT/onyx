<script setup lang="ts" generic="TValue extends SelectOptionValue = SelectOptionValue">
import { createMenuButton } from "@sit-onyx/headless";
import type { SelectOptionValue } from "../../../types";
import { computed, ref, type VNode } from "vue";
import { injectI18n } from "../../../i18n";

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

const activeItem = ref<string>();

const {
  elements: { button, menu, menuItems, listItem, flyout },
  state: { isExpanded },
} = createMenuButton({
  onSelect: (value) => {
    activeItem.value = value;
  },
});

const getSlotComponents = (vnodes: VNode[]): VNode[] => {
  // if the slot only contains a v-for, we need to use the children here which are the "actual" slot content
  const isVFor = vnodes.length === 1 && vnodes[0].type.toString() === "Symbol(v-fgt)";

  const allNodes =
    isVFor && Array.isArray(vnodes[0].children)
      ? (vnodes[0].children as Extract<(typeof vnodes)[number]["children"], []>)
      : vnodes;

  return allNodes;
};

const options = computed(() => {
  return getSlotComponents(slots.options?.() ?? []);
});

const { t } = injectI18n();
</script>

<template>
  <div class="onyx-future-flyout-menu">
    <component :is="slots.default?.()?.[0]" v-bind="button" />
    <div
      v-if="slots.options || slots.header || slots.footer"
      v-show="isExpanded"
      v-bind="flyout"
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
        <li
          v-for="(item, index) in options"
          v-bind="listItem"
          :key="index"
          class="onyx-future-flyout-menu__option"
        >
          <component
            :is="item"
            v-bind="
              item.props?.href
                ? menuItems({ active: activeItem === item.props.href, value: item.props.href })
                : undefined
            "
          />
        </li>
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

    &__option {
      list-style: none;
    }
  }
}
</style>
