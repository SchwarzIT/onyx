<script setup lang="ts">
import { inject } from "vue";
import OnyxListItem from "../OnyxListItem/OnyxListItem.vue";
import { MENU_BUTTON_ITEM_INJECTION_KEY } from "../OnyxNavItem/future/types";
import { type OnyxMenuItemProps } from "./types";

const props = defineProps<OnyxMenuItemProps>();
const emit = defineEmits<{
  /**
   * Emitted when the menu item is clicked (via click or keyboard).
   */
  click: [];
}>();

const menuButton = inject(MENU_BUTTON_ITEM_INJECTION_KEY);
</script>
<template>
  <OnyxListItem
    :selected="props.active"
    v-bind="menuButton?.listItem"
    :color="props.color"
    :disabled="props.disabled"
    class="onyx-menu-item"
  >
    <component
      :is="props.href ? 'a' : 'button'"
      :class="{
        'onyx-list-item': true,
        'onyx-menu-item__anchor': props.href,
        'onyx-menu-item__button': !props.href,
        'onyx-list-item--active': props.active,
        [`onyx-list-item--${props.color}`]: props.color,
        'onyx-list-item--disabled': props.disabled,
      }"
      :disabled="!props.href && props.disabled"
      v-bind="
        menuButton?.menuItem({ active: props.active, disabled: !props.href && props.disabled })
      "
      :href="props.href"
      @click="emit('click')"
    >
      <slot></slot>
    </component>
  </OnyxListItem>
</template>
<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-menu-item {
  @include layers.component() {
    &__anchor {
      color: inherit;
      text-decoration: none;

      &:focus {
        outline: none;
      }
    }

    &__button {
      background-color: inherit;
      color: inherit;
      padding: 0;
    }
  }
}
</style>
