<script setup lang="ts">
import { createMenuItems } from "@sit-onyx/headless";
import { iconArrowSmallLeft } from "@sit-onyx/icons";
import { computed, inject, nextTick, provide, toValue, useTemplateRef, withModifiers } from "vue";
import { useLink } from "../../../../composables/useLink.js";
import { useVModel } from "../../../../composables/useVModel.js";
import { injectI18n } from "../../../../i18n/index.js";
import { mergeVueProps, useRootAttrs } from "../../../../utils/attrs.js";
import OnyxBasicPopover from "../../../OnyxBasicPopover/OnyxBasicPopover.vue";
import OnyxIcon from "../../../OnyxIcon/OnyxIcon.vue";
import OnyxListItem from "../../../OnyxListItem/OnyxListItem.vue";
import OnyxMenuItemContent from "./OnyxMenuItemContent.vue";
import {
  MENU_ITEM_DRILLDOWN_INJECTION_KEY,
  MENU_ITEM_INJECTION_KEY,
  type NestedMenuContext,
  type NestedMenuDrilldownModeContext,
  type OnyxMenuItemProps,
} from "./types.js";

defineOptions({ inheritAttrs: false });

const { t } = injectI18n();

const { rootAttrs, restAttrs } = useRootAttrs();

const props = withDefaults(defineProps<OnyxMenuItemProps>(), {
  active: "auto",
  open: undefined,
});

const emit = defineEmits<{
  /**
   * Emitted when the open state should update.
   */
  "update:open": [value: boolean];
}>();

const slots = defineSlots<{
  /**
   * Button/link text and additional inline content.
   */
  default(): unknown;
  /**
   * Children menuitems.
   */
  children(): unknown;
}>();

/**
 * Controls the open state.
 */
const open = useVModel({
  props,
  emit,
  key: "open",
  default: false,
});

const parentMenu = inject<NestedMenuContext | null>(MENU_ITEM_INJECTION_KEY, null);
const flyoutMenu = inject<NestedMenuDrilldownModeContext | null>(
  MENU_ITEM_DRILLDOWN_INJECTION_KEY,
  null,
);
const effectiveNestedMode = computed(() => toValue(flyoutMenu?.drilldownMode) ?? "internal");

const backButton = useTemplateRef<{ buttonOrLink: HTMLAnchorElement | HTMLButtonElement }>(
  "backButton",
);

defineExpose({
  buttonOrLink: computed(() => menuItemElement.value?.$el as HTMLAnchorElement | HTMLButtonElement),
});

const menuItemElement = useTemplateRef("menuItemElementRef");
const externalChildren = useTemplateRef("externalChildrenRef");
const popover = useTemplateRef("popoverRef");

const hasChildren = computed(() => !!slots.children);

const isExternal = computed(() => effectiveNestedMode.value === "external" && hasChildren.value);

const handleOpen = async () => {
  if (!hasChildren.value) return;
  open.value = true;

  if (!isExternal.value) {
    await nextTick();
    backButton.value?.buttonOrLink.focus();
  } else {
    const firstFocusable = externalChildren.value?.querySelector<HTMLElement>("button, a");
    firstFocusable?.focus();
  }
};

const getCalculatedOpenDirection = (): "left" | "right" => {
  if (effectiveNestedMode.value === "internal" && !parentMenu) {
    return "right";
  }

  if (parentMenu?.openDirection) {
    return toValue(parentMenu.openDirection);
  }

  const el = menuItemElement.value?.$el;
  if (!el || !popover.value) return "right";
  return popover.value.popoverPosition as "right" | "left";
};

const getOpeningArrowDirection = () => {
  return getCalculatedOpenDirection() === "right" ? "ArrowRight" : "ArrowLeft";
};

const {
  elements: {
    listItem,
    menuItem,
    internalChildren,
    backButton: backButtonProps,
    externalChildren: externalChildrenProps,
  },
  internals: { handlePopoverMouseEnter, handlePopoverMouseLeave },
} = createMenuItems({
  isExpanded: open,
  isExternal,
  disabled: computed(() => props.disabled),
  externalChildrenRef: externalChildren,
  onOpen: handleOpen,
  onClose: async () => {
    if (!isExternal.value) await nextTick();
    menuItemElement.value?.$el.focus();
  },
  onFocusTrigger: () => menuItemElement.value?.$el.focus(),
  onHoverEnterParent: () => parentMenu?.onHoverEnter(),
  onHoverLeaveParent: () => parentMenu?.onHoverLeave(),
  openingArrowDirection: getOpeningArrowDirection,
});

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

const childrenClickHandler = computed(() =>
  hasChildren.value
    ? {
        onClick: withModifiers(handleOpen, ["stop"]),
      }
    : null,
);

provide<NestedMenuContext>(MENU_ITEM_INJECTION_KEY, {
  onHoverEnter: handlePopoverMouseEnter,
  onHoverLeave: handlePopoverMouseLeave,
  openDirection: () => getCalculatedOpenDirection(),
});
</script>

<template>
  <OnyxListItem
    :selected="isActive"
    :active="isActive"
    :color="props.color"
    :disabled="props.disabled"
    class="onyx-menu-item"
    :class="{
      'onyx-menu-item--open': open,
      'onyx-menu-item--internal': !isExternal,
    }"
    v-bind="mergeVueProps(listItem, rootAttrs)"
  >
    <template v-if="!isExternal">
      <OnyxMenuItemContent
        v-show="!open"
        ref="menuItemElementRef"
        :disabled="props.disabled"
        :link="props.link"
        :icon="props.icon"
        :label="props.label"
        :has-children="hasChildren"
        v-bind="mergeVueProps(menuItemProps, restAttrs, childrenClickHandler)"
      >
        <slot></slot>
      </OnyxMenuItemContent>

      <ul
        v-if="hasChildren"
        v-show="open"
        class="onyx-menu-item__children"
        v-bind="internalChildren"
      >
        <OnyxMenuItem ref="backButton" class="onyx-menu-item__back" v-bind="backButtonProps">
          <OnyxIcon :icon="iconArrowSmallLeft" />
          {{ t("back") }}
        </OnyxMenuItem>
        <slot name="children"></slot>
      </ul>
    </template>

    <OnyxBasicPopover
      v-else
      ref="popoverRef"
      :label="props.label ?? t('navigation.showMoreNavItemsLabel')"
      :open="open"
      position="auto-inline"
      alignment="auto"
      class="onyx-menu-item__popover"
      role="menu"
    >
      <OnyxMenuItemContent
        ref="menuItemElementRef"
        :disabled="props.disabled"
        :link="props.link"
        :icon="props.icon"
        :label="props.label"
        :has-children="hasChildren"
        v-bind="mergeVueProps(menuItemProps, restAttrs, childrenClickHandler)"
      >
        <slot></slot>
      </OnyxMenuItemContent>
      <template #content>
        <div class="onyx-flyout-menu__list-header"></div>
        <ul
          ref="externalChildrenRef"
          class="onyx-menu-item__children"
          v-bind="externalChildrenProps"
        >
          <slot name="children"></slot>
        </ul>
        <div class="onyx-flyout-menu__list-footer"></div>
      </template>
    </OnyxBasicPopover>
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

    &__children {
      padding: 0;
      width: 100%;

      display: flex;
      flex-direction: column;
      // when nested internal child item is open, hide all other items in the same layer (including back button)
      &:has(> .onyx-menu-item--internal.onyx-menu-item--open) {
        > .onyx-menu-item:not(.onyx-menu-item--open) {
          display: none;
        }
      }
    }

    &__chevron {
      flex: 1 0 1.5rem;
      display: flex;
      justify-content: end;
    }

    &__back {
      font-weight: var(--onyx-font-weight-semibold);
    }

    &__popover {
      width: 100%;
      .onyx-basic-popover__dialog {
        margin-top: calc(-1 * var(--onyx-spacing-2xs));
      }
    }
  }
}
</style>
