<script setup lang="ts">
import { createMenuItem } from "@sit-onyx/headless";
import OnyxListItem from "../OnyxListItem/OnyxListItem.vue";
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
} = createMenuItem({});
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
      :class="{
        'onyx-menu-item__anchor': props.href,
        'onyx-menu-item__button': !props.href,
      }"
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
@use "../../styles/mixins/layers";

.onyx-menu-item {
  @include layers.component() {
    &__anchor {
      color: inherit;
      text-decoration: none;
      padding: 0;
      display: contents;

      &:focus {
        outline: none;
      }
    }

    &__button {
      background-color: inherit;
      color: inherit;
      padding: 0;
      cursor: pointer;
      border: none;
      outline: none;
      display: contents;
    }
  }
}
</style>
