<script setup lang="ts">
import { inject } from "vue";
import OnyxListItem from "../../../OnyxListItem/OnyxListItem.vue";
import { MENU_BUTTON_ITEM_INJECTION_KEY, type OnyxMenuItemProps } from "./types";

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
    :active="props.active"
    v-bind="menuButton?.listItem"
    :color="props.color"
    :disabled="props.disabled"
    class="onyx-menu-item"
  >
    <component
      :is="props.href ? 'a' : 'button'"
      :class="{
        'onyx-menu-item__anchor': props.href,
        'onyx-menu-item__button': !props.href,
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
@use "../../../../styles/mixins/layers";

.onyx-menu-item {
  @include layers.component() {
    // in order for the full menu item to be clickable, we remove the padding here
    // and set it on the anchor/button instead
    padding: 0;

    &__anchor {
      color: inherit;
      text-decoration: none;
      padding: var(--onyx-list-item-padding);

      &:focus {
        outline: none;
      }
    }

    &__button {
      background-color: inherit;
      color: inherit;
      padding: var(--onyx-list-item-padding);
      cursor: pointer;
      border: none;
      outline: none;
      display: flex;
      align-items: center;
      gap: var(--onyx-spacing-sm);
      width: 100%;
    }
  }
}
</style>
