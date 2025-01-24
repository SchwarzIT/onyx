<script setup lang="ts">
import { createMenuItems } from "@sit-onyx/headless";
import { computed } from "vue";
import { injectI18n } from "../../../../i18n";
import OnyxListItem from "../../../OnyxListItem/OnyxListItem.vue";
import OnyxRouterLink from "../../../OnyxRouterLink/OnyxRouterLink.vue";
import OnyxVisuallyHidden from "../../../OnyxVisuallyHidden/OnyxVisuallyHidden.vue";
import { type OnyxMenuItemProps } from "./types";

defineSlots<{
  /**
   * Text content of the menu item.
   */
  default: () => unknown;
}>();

const props = withDefaults(defineProps<OnyxMenuItemProps>(), {
  target: "_self",
});

const { t } = injectI18n();

const {
  elements: { listItem, menuItem },
} = createMenuItems();

const headlessProps = computed(() =>
  menuItem({
    active: props.active,
    disabled: props.disabled,
  }),
);
</script>

<template>
  <OnyxListItem
    :selected="props.active"
    :active="props.active"
    :color="props.color"
    :disabled="props.disabled"
    class="onyx-component onyx-menu-item"
    v-bind="listItem"
  >
    <OnyxRouterLink
      v-if="props.href"
      class="onyx-menu-item__trigger"
      :href="props.href"
      :target="props.target"
      v-bind="headlessProps"
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

      <OnyxVisuallyHidden v-if="props.target === '_blank'">
        {{ t("link.opensExternally") }}
      </OnyxVisuallyHidden>
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
