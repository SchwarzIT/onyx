<script setup lang="ts" generic="TValue extends SelectOptionValue = SelectOptionValue">
import { createMenuButton } from "@sit-onyx/headless";
import type { SelectOptionValue } from "../../types";
import { ref, type VNode } from "vue";

// const props = defineProps<OnyxFlyoutMenuProps<TValue>>();

const slots = defineSlots<{
  /**
   * OnyxFlyoutMenuItem to show
   */
  default?(): VNode[];
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
  elements: { button, menu, menuItem, listItem },
  state: { isExpanded },
} = createMenuButton({
  onSelect: (href) => {
    activeItem.value = href;
  },
});
</script>

<template>
  <div>
    <button v-bind="button">Click Me</button>
    <div
      :class="{
        'onyx-flyout-menu': true,
        'onyx-flyout-menu--with-header': !!slots.header,
        'onyx-flyout-menu--with-footer': !!slots.footer,
      }"
    >
      <slot name="header"></slot>
      <ul
        v-show="isExpanded"
        v-bind="menu"
        class="onyx-flyout-menu__wrapper onyx-flyout-menu__group"
      >
        <li v-for="(item, index) in slots.default?.()" v-bind="listItem" :key="index">
          <component
            :is="item"
            v-bind="
              item.props?.href
                ? menuItem({ active: activeItem === item.props.href, value: item.props.href })
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
@use "../../styles/mixins/layers";
@use "../../styles/mixins/list";

.onyx-flyout-menu {
  @include layers.component() {
    @include list.styles();

    &--with-header {
      padding-top: 0;
    }

    &--with-footer {
      padding-bottom: 0;
    }
  }
}
</style>
