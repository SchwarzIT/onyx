<script setup lang="ts">
import { createMenuItems } from "@sit-onyx/headless";
import { computed } from "vue";
import { useLink } from "../../../../composables/useLink";
import { extractLinkProps } from "../../../../utils/router";
import OnyxListItem from "../../../OnyxListItem/OnyxListItem.vue";
import OnyxRouterLink from "../../../OnyxRouterLink/OnyxRouterLink.vue";
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

const headlessProps = computed(() =>
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
    <OnyxRouterLink
      v-if="props.link"
      class="onyx-menu-item__trigger"
      v-bind="{ ...headlessProps, ...extractLinkProps(props.link) }"
    >
      <slot></slot>
    </OnyxRouterLink>

    <button
      v-else
      class="onyx-menu-item__trigger"
      type="button"
      :disabled="props.disabled"
      v-bind="headlessProps"
    >
      <slot></slot>
    </button>
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
