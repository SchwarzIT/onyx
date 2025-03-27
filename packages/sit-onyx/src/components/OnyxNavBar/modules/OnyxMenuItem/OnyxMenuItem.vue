<script setup lang="ts">
import { createMenuItems } from "@sit-onyx/headless";
import chevronRightSmall from "@sit-onyx/icons/chevron-right-small.svg?raw";
import { computed } from "vue";
import { useLink } from "../../../../composables/useLink";
import { extractLinkProps } from "../../../../utils/router";
import ButtonOrLinkLayout from "../../../OnyxButton/ButtonOrLinkLayout.vue";
import OnyxExternalLinkIcon from "../../../OnyxExternalLinkIcon/OnyxExternalLinkIcon.vue";
import OnyxIcon from "../../../OnyxIcon/OnyxIcon.vue";
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
    :class="{ 'onyx-menu-item': true }"
    v-bind="listItem"
  >
    <ButtonOrLinkLayout
      class="onyx-menu-item__trigger onyx-text"
      :disabled="props.disabled"
      :link="props.link"
      v-bind="menuItemProps"
    >
      <slot>
        <span>
          <span class="onyx-truncation-ellipsis">
            {{ props.label }}
          </span>
          <OnyxExternalLinkIcon v-bind="props.link ? extractLinkProps(props.link) : undefined" />
        </span>
      </slot>

      <div v-if="props.hasChildren" class="onyx-menu-item__chevron">
        <OnyxIcon :icon="chevronRightSmall" size="24px" />
      </div>
    </ButtonOrLinkLayout>
  </OnyxListItem>
</template>

<style lang="scss">
@use "../../../../styles/mixins/layers";

@layer onyx.reset {
  button.onyx-menu-item__trigger,
  a.onyx-menu-item__trigger {
    all: unset;
  }
}

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
      border-radius: inherit;

      &:enabled {
        cursor: pointer;
      }

      &:focus {
        outline: none;
      }

      &:is(button) {
        background-color: inherit;
        border: none;
      }
    }

    &__chevron {
      flex: 1 0 1.5rem;
      display: flex;
      justify-content: end;
    }
  }
}
</style>
