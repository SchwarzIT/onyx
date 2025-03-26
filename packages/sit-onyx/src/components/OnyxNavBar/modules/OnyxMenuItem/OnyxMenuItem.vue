<script setup lang="ts">
import { createMenuItems } from "@sit-onyx/headless";
import { computed } from "vue";
import { useLink } from "../../../../composables/useLink";
import ButtonOrLinkLayout from "../../../OnyxButton/ButtonOrLinkLayout.vue";
import OnyxListItem from "../../../OnyxListItem/OnyxListItem.vue";
import { type OnyxMenuItemProps } from "./types";

defineSlots<{
  /**
   * Text content of the menu item.
   */
  default: () => unknown;
}>();

const props = withDefaults(defineProps<OnyxMenuItemProps>(), {
  active: "auto",
});

const {
  elements: { listItem, menuItem },
} = createMenuItems();

const { isActive: isPathActive } = useLink();
const isActive = computed(() => {
  if (props.active !== "auto") return props.active;
  return isPathActive.value(props.link);
});

const menuItemProps = computed(() =>
  menuItem({
    active: isActive.value,
    disabled: props.disabled,
  }),
);
</script>

<template>
  <OnyxListItem
    :selected="isActive"
    :active="isActive"
    :color="props.color"
    :disabled="props.disabled"
    class="onyx-component onyx-menu-item"
    v-bind="listItem"
  >
    <ButtonOrLinkLayout
      class="onyx-menu-item__trigger"
      :disabled="props.disabled"
      :link="props.link"
      v-bind="menuItemProps"
    >
      <slot></slot>
    </ButtonOrLinkLayout>
  </OnyxListItem>
</template>

<style lang="scss">
@use "../../../../styles/mixins/layers";

.onyx-menu-item {
  @include layers.component() {
    --onyx-menu-item-gap: var(--onyx-density-sm);

    // in order for the full menu item to be clickable, we remove the padding here
    // and set it on the anchor/button instead
    padding: 0;

    &__trigger {
      display: flex;
      align-items: center;
      gap: var(--onyx-menu-item-gap);
      color: inherit;
      text-decoration: none;
      padding: var(--onyx-list-item-padding);
      width: 100%;
      height: 100%;
      border-radius: inherit;
      cursor: pointer;

      &:focus {
        outline: none;
      }

      &:is(button) {
        background-color: inherit;
        border: none;
      }
    }
  }
}
</style>
