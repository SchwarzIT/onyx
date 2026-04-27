<script setup lang="ts">
import { createMenuItems, debounce } from "@sit-onyx/headless";
import { iconArrowSmallLeft } from "@sit-onyx/icons";
import {
  computed,
  inject,
  nextTick,
  onBeforeUnmount,
  provide,
  toValue,
  useTemplateRef,
  withModifiers,
} from "vue";
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
  elements: { listItem, menuItem },
} = createMenuItems({
  onOpen: () => void handleOpen(),
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

const debouncedClose = debounce(() => {
  open.value = false;
}, 300);

onBeforeUnmount(() => {
  debouncedClose.abort();
});

const closeAndFocusTrigger = async () => {
  debouncedClose.abort();
  open.value = false;
  if (!isExternal.value) await nextTick();
  menuItemElement.value?.$el.focus();
};

const handleBackButtonKeydown = async (event: KeyboardEvent) => {
  const closeKey = getCalculatedOpenDirection() === "right" ? "ArrowLeft" : "ArrowRight";
  if ([closeKey, " ", "Enter"].includes(event.key)) {
    event.preventDefault();
    event.stopPropagation();
    await closeAndFocusTrigger();
  }
};

const handleExternalChildrenKeydown = (event: KeyboardEvent) => {
  const closeKey = getCalculatedOpenDirection() === "right" ? "ArrowLeft" : "ArrowRight";

  if (event.key === closeKey) {
    event.preventDefault();
    event.stopPropagation();
    menuItemElement.value?.$el.focus();
  }
};

const handleTriggerMouseEnter = (event?: Event) => {
  if (isExternal.value && !props.disabled) {
    if (event?.type === "focusin") {
      const focusEvent = event as FocusEvent;
      const relatedTarget = focusEvent.relatedTarget as Node | null;
      const target = focusEvent.target as Node | null;

      const isFocusInsidePopover = externalChildren.value?.contains(target);

      if (
        !isFocusInsidePopover &&
        relatedTarget &&
        externalChildren.value?.contains(relatedTarget)
      ) {
        debouncedClose.abort();
        return;
      }
    }

    debouncedClose.abort();
    open.value = true;
  }
};

const handleTriggerMouseLeave = () => {
  if (isExternal.value) {
    debouncedClose.abort();
    debouncedClose();
  }
};

const handlePopoverMouseEnter = (event?: Event) => {
  handleTriggerMouseEnter(event);
  parentMenu?.onHoverEnter();
};

const handlePopoverMouseLeave = () => {
  handleTriggerMouseLeave();
  parentMenu?.onHoverLeave();
};

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
    @mouseenter="handleTriggerMouseEnter"
    @mouseleave="handleTriggerMouseLeave"
    @focusin="handleTriggerMouseEnter"
    @focusout="handleTriggerMouseLeave"
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

      <ul v-if="hasChildren" v-show="open" role="menu" class="onyx-menu-item__children">
        <OnyxMenuItem
          ref="backButton"
          class="onyx-menu-item__back"
          @keydown="handleBackButtonKeydown"
          @click.stop="closeAndFocusTrigger"
        >
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
          role="presentation"
          tabindex="-1"
          class="onyx-menu-item__children"
          @mouseenter="handlePopoverMouseEnter"
          @mouseleave="handlePopoverMouseLeave"
          @focusin="handlePopoverMouseEnter"
          @focusout="handlePopoverMouseLeave"
          @keydown="handleExternalChildrenKeydown"
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
