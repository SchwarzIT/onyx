<script setup lang="ts">
import { createMenuItems } from "@sit-onyx/headless";
import { iconArrowSmallLeft, iconChevronRightSmall } from "@sit-onyx/icons";
import { computed, nextTick, useTemplateRef, withModifiers } from "vue";
import { useLink } from "../../../../composables/useLink.js";
import { useVModel } from "../../../../composables/useVModel.js";
import { injectI18n } from "../../../../i18n/index.js";
import type { Nullable } from "../../../../types/index.js";
import { mergeVueProps, useRootAttrs } from "../../../../utils/attrs.js";
import { extractLinkProps } from "../../../../utils/router.js";
import ButtonOrLinkLayout from "../../../OnyxButton/ButtonOrLinkLayout.vue";
import OnyxExternalLinkIcon from "../../../OnyxExternalLinkIcon/OnyxExternalLinkIcon.vue";
import OnyxIcon from "../../../OnyxIcon/OnyxIcon.vue";
import OnyxListItem from "../../../OnyxListItem/OnyxListItem.vue";
import { type OnyxMenuItemProps } from "./types.js";

defineOptions({ inheritAttrs: false });

const { t } = injectI18n();

const { rootAttrs, restAttrs } = useRootAttrs();

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

const props = withDefaults(defineProps<OnyxMenuItemProps>(), {
  active: "auto",
});

const emit = defineEmits<{
  /**
   * Emitted when the open state should update.
   */
  "update:open": [value: Nullable<boolean>];
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

const backButton = useTemplateRef("backButtonRef");
const menuItemElementRef = useTemplateRef("menuItemRef");

const {
  elements: { listItem, menuItem },
} = createMenuItems({
  onOpen: async () => {
    if (!hasChildren.value) return;
    open.value = true;
    await nextTick();
    backButton.value?.$el.querySelector("button").focus();
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

const hasChildren = computed(() => !!slots.children);

const childrenClickHandler = computed(() =>
  hasChildren.value
    ? {
        onClick: withModifiers(() => (open.value = true), ["stop"]),
      }
    : null,
);

const handleBackButtonKeydown = async (event: KeyboardEvent) => {
  switch (event.key) {
    case "ArrowLeft":
    case " ":
    case "Enter":
      event.preventDefault();
      open.value = false;
      await nextTick();
      menuItemElementRef.value?.$el.focus();
      break;
  }
};
</script>

<template>
  <OnyxListItem
    :selected="isActive"
    :active="isActive"
    :color="props.color"
    :disabled="props.disabled"
    class="onyx-menu-item"
    :class="{ 'onyx-menu-item--open': open }"
    v-bind="mergeVueProps(listItem, rootAttrs)"
  >
    <ButtonOrLinkLayout
      v-show="!open"
      ref="menuItemRef"
      class="onyx-menu-item__trigger"
      :disabled="props.disabled"
      :link="props.link"
      v-bind="mergeVueProps(menuItemProps, restAttrs, childrenClickHandler)"
    >
      <slot>
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
        ref="backButtonRef"
        class="onyx-menu-item__back"
        @keydown="handleBackButtonKeydown"
        @click.stop="open = false"
      >
        <OnyxIcon :icon="iconArrowSmallLeft" />
        {{ t("back") }}
      </OnyxMenuItem>
      <slot name="children"></slot>
    </ul>
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

      // when nested child item is open, hide all other items in the same layer (including back button)
      &:has(.onyx-menu-item--open) {
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
  }
}
</style>
