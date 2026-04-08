<script setup lang="ts">
import { createMenuItems } from "@sit-onyx/headless";
import { iconArrowSmallLeft, iconChevronRightSmall } from "@sit-onyx/icons";
import {
  computed,
  inject,
  nextTick,
  onBeforeUnmount,
  provide,
  useTemplateRef,
  withModifiers,
} from "vue";
import { useLink } from "../../../../composables/useLink.js";
import { useVModel } from "../../../../composables/useVModel.js";
import { injectI18n } from "../../../../i18n/index.js";
import { mergeVueProps, useRootAttrs } from "../../../../utils/attrs.js";
import { extractLinkProps } from "../../../../utils/router.js";
import OnyxBasicPopover from "../../../OnyxBasicPopover/OnyxBasicPopover.vue";
import ButtonOrLinkLayout from "../../../OnyxButton/ButtonOrLinkLayout.vue";
import OnyxExternalLinkIcon from "../../../OnyxExternalLinkIcon/OnyxExternalLinkIcon.vue";
import OnyxIcon from "../../../OnyxIcon/OnyxIcon.vue";
import OnyxListItem from "../../../OnyxListItem/OnyxListItem.vue";
import { type NestedMenuContext, type OnyxMenuItemProps } from "./types.js";

defineOptions({ inheritAttrs: false });

const { t } = injectI18n();

const { rootAttrs, restAttrs } = useRootAttrs();

const props = withDefaults(defineProps<OnyxMenuItemProps>(), {
  active: "auto",
  open: undefined,
  nested: "internal",
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

const parentMenu = inject<NestedMenuContext | null>("onyx-nested-menu", null);

const backButton = useTemplateRef("backButton");
const menuItemElementRef = useTemplateRef("menuItemElementRef");
const externalChildrenRef = useTemplateRef<HTMLElement>("externalChildrenRef");

const hasChildren = computed(() => !!slots.children);

const isExternal = computed(() => props.nested === "external" && hasChildren.value);

const {
  elements: { listItem, menuItem },
} = createMenuItems({
  onOpen: async () => {
    if (!hasChildren.value) return;
    open.value = true;

    await nextTick();
    await nextTick();

    if (!isExternal.value) {
      backButton.value?.$el.querySelector("button")?.focus();
    } else {
      // Focus the first actionable item in the external popover slot
      const firstFocusable = externalChildrenRef.value?.querySelector("button, a") as
        | HTMLElement
        | undefined;
      firstFocusable?.focus();
    }
  },
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
        onClick: withModifiers(() => (open.value = true), ["stop"]),
      }
    : null,
);

const closeAndFocusTrigger = async () => {
  open.value = false;
  await nextTick();
  menuItemElementRef.value?.$el.focus();
};

const handleBackButtonKeydown = async (event: KeyboardEvent) => {
  if (["ArrowLeft", " ", "Enter"].includes(event.key)) {
    event.preventDefault();
    await closeAndFocusTrigger();
  }
};

const handleExternalChildrenKeydown = async (event: KeyboardEvent) => {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    event.stopPropagation();
    await closeAndFocusTrigger();
  }
};

let hoverTimeout: ReturnType<typeof setTimeout>;

onBeforeUnmount(() => {
  clearTimeout(hoverTimeout);
});

const handleTriggerMouseEnter = () => {
  if (isExternal.value && !props.disabled) {
    clearTimeout(hoverTimeout);
    open.value = true;
  }
};

const handleTriggerMouseLeave = () => {
  if (isExternal.value) {
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
      open.value = false;
    }, 300);
  }
};

const handlePopoverMouseEnter = () => {
  handleTriggerMouseEnter();
  parentMenu?.onHoverEnter();
};

const handlePopoverMouseLeave = () => {
  handleTriggerMouseLeave();
  parentMenu?.onHoverLeave();
};

provide<NestedMenuContext>("onyx-nested-menu", {
  onHoverEnter: handlePopoverMouseEnter,
  onHoverLeave: handlePopoverMouseLeave,
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
      <ButtonOrLinkLayout
        v-show="!open"
        ref="menuItemElementRef"
        class="onyx-menu-item__trigger"
        :disabled="props.disabled"
        :link="props.link"
        v-bind="mergeVueProps(menuItemProps, restAttrs, childrenClickHandler)"
      >
        <slot>
          <OnyxIcon v-if="props.icon" :icon="props.icon" size="24px" />
          <span>
            <span class="onyx-truncation-ellipsis">
              {{ props.label }}
            </span>
            <OnyxExternalLinkIcon v-bind="props.link ? extractLinkProps(props.link) : undefined" />
          </span>
        </slot>

        <div v-if="hasChildren" class="onyx-menu-item__chevron">
          <OnyxIcon :icon="iconChevronRightSmall" size="24px" />
        </div>
      </ButtonOrLinkLayout>

      <ul v-if="hasChildren" v-show="open" role="menu" class="onyx-menu-item__children">
        <OnyxMenuItem
          ref="backButton"
          class="onyx-menu-item__back"
          @keydown="handleBackButtonKeydown"
          @click.stop="open = false"
        >
          <OnyxIcon :icon="iconArrowSmallLeft" />
          {{ t("back") }}
        </OnyxMenuItem>
        <slot name="children"></slot>
      </ul>
    </template>

    <template v-else>
      <OnyxBasicPopover
        :label="props.label ?? 'external drill down'"
        :open="open"
        position="auto-inline"
        alignment="auto"
        class="onyx-menu-item__popover"
      >
        <template #default>
          <ButtonOrLinkLayout
            ref="menuItemElementRef"
            class="onyx-menu-item__trigger"
            :disabled="props.disabled"
            :link="props.link"
            v-bind="mergeVueProps(menuItemProps, restAttrs, childrenClickHandler)"
          >
            <slot>
              <OnyxIcon v-if="props.icon" :icon="props.icon" size="24px" />
              <span>
                <span class="onyx-truncation-ellipsis">
                  {{ props.label }}
                </span>
                <OnyxExternalLinkIcon v-bind="props.link ? extractLinkProps(props.link) : {}" />
              </span>
            </slot>

            <div v-if="hasChildren" class="onyx-menu-item__chevron">
              <OnyxIcon :icon="iconChevronRightSmall" size="24px" />
            </div>
          </ButtonOrLinkLayout>
        </template>
        <template #content>
          <ul
            ref="externalChildrenRef"
            role="menu"
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
        </template>
      </OnyxBasicPopover>
    </template>
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
    }
  }
}
</style>
