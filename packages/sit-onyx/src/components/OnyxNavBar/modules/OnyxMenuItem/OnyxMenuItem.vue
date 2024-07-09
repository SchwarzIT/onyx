<script setup lang="ts">
import { createMenuItems } from "@sit-onyx/headless";
import OnyxListItem from "../../../OnyxListItem/OnyxListItem.vue";
import { type OnyxMenuItemProps } from "./types";

const props = defineProps<OnyxMenuItemProps>();

const emit = defineEmits<{
  /**
   * Emitted when the menu item is clicked (via click or keyboard).
   */
  click: [];
}>();

const {
  elements: { listItem, menuItem },
} = createMenuItems();
</script>

<template>
  <OnyxListItem
    :selected="props.active"
    :active="props.active"
    :color="props.color"
    :disabled="props.disabled"
    class="onyx-menu-item"
    v-bind="listItem"
  >
    <component
      :is="props.href ? 'a' : 'button'"
      class="onyx-menu-item__trigger"
      :disabled="!props.href && props.disabled"
      :href="props.href"
      v-bind="
        menuItem({
          active: props.active,
          disabled: !props.href && props.disabled,
        })
      "
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

    &__trigger {
      display: flex;
      align-items: center;
      gap: var(--onyx-spacing-sm);
      color: inherit;
      text-decoration: none;
      padding: var(--onyx-list-item-padding);
      width: 100%;
      height: 100%;
      border-radius: inherit;

      &:focus {
        outline: none;
      }

      &:is(button) {
        background-color: inherit;
        cursor: inherit;
        border: none;
      }
    }
  }
}
</style>
