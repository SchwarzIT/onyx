<script lang="ts" setup>
import arrowSmallLeft from "@sit-onyx/icons/arrow-small-left.svg?raw";
import { computed, inject, provide, toRef } from "vue";
import { useLink } from "../../../../composables/useLink";
import { useMoreListChild } from "../../../../composables/useMoreList";
import { useVModel } from "../../../../composables/useVModel";
import { injectI18n } from "../../../../i18n";
import type { Nullable } from "../../../../types";
import { mergeVueProps, useRootAttrs } from "../../../../utils/attrs";
import OnyxButton from "../../../OnyxButton/OnyxButton.vue";
import {
  MOBILE_NAV_BAR_INJECTION_KEY,
  NAV_BAR_IS_TOP_LEVEL_INJECTION_KEY,
  NAV_BAR_MORE_LIST_INJECTION_KEY,
  NAV_BAR_MORE_LIST_TARGET_INJECTION_KEY,
} from "../../types";
import OnyxFlyoutMenu from "../OnyxFlyoutMenu/OnyxFlyoutMenu.vue";
import OnyxNavItemFacade from "../OnyxNavItemFacade/OnyxNavItemFacade.vue";
import OnyxNavSeparator from "../OnyxNavSeparator/OnyxNavSeparator.vue";
import type { OnyxNavItemProps } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<OnyxNavItemProps>(), {
  active: "auto",
  open: undefined,
});

const emit = defineEmits<{
  /**
   * Emitted when the state of mobile children visibility changes.
   */
  "update:open": [value: Nullable<boolean>];
}>();

const slots = defineSlots<{
  /**
   * You can replace the label of the menuitem with your custom content.
   */
  default?(): unknown;
  /**
   * OnyxNavItem Children can be nested here.
   */
  children?(): unknown;
}>();

const { t } = injectI18n();

/**
 * Controls the open state.
 */
const open = useVModel({
  props,
  emit,
  key: "open",
  default: false,
});

const { restAttrs, rootAttrs } = useRootAttrs();

const hasChildren = computed(() => !!slots.children);

const { isActive } = useLink();
const active = computed(() => {
  if (props.active !== "auto") return props.active;
  return isActive.value(props.link);
});

const isMobile = inject(
  MOBILE_NAV_BAR_INJECTION_KEY,
  computed(() => false),
);

const moreList = inject(NAV_BAR_MORE_LIST_TARGET_INJECTION_KEY);

const isTopLevel = inject(NAV_BAR_IS_TOP_LEVEL_INJECTION_KEY, true);
provide(NAV_BAR_IS_TOP_LEVEL_INJECTION_KEY, false);

// only top-level nav-items are relevant for the "more list"
const { componentRef, isVisible } = isTopLevel
  ? useMoreListChild(NAV_BAR_MORE_LIST_INJECTION_KEY)
  : { isVisible: toRef(true) };
</script>

<template>
  <!-- Mobile Parent is open -->
  <div
    v-if="isMobile && open"
    :class="{
      'onyx-component': true,
      'onyx-nav-item-wrapper': true,
      'onyx-nav-item-wrapper--open': open,
    }"
    v-bind="rootAttrs"
  >
    <div class="onyx-nav-item-wrapper__controls">
      <OnyxButton
        :label="t('back')"
        mode="plain"
        color="neutral"
        :icon="arrowSmallLeft"
        @click="open = false"
      />

      <template v-if="props.link">
        <OnyxNavItemFacade v-bind="mergeVueProps(props, restAttrs)" :active context="mobile">
          <slot></slot>
        </OnyxNavItemFacade>
        <OnyxNavSeparator orientation="horizontal" />
      </template>
    </div>
    <ul role="menu" class="onyx-nav-item-wrapper__mobile-children">
      <slot name="children"></slot>
    </ul>
  </div>
  <!-- Mobile item displayed in list -->
  <OnyxNavItemFacade
    v-else-if="isMobile"
    v-bind="mergeVueProps(props, $attrs)"
    :active
    context="mobile"
    @click="hasChildren && (open = true)"
  >
    <slot></slot>
    <template v-if="slots.children" #children><slot name="children"></slot></template>
  </OnyxNavItemFacade>
  <!-- Desktop parent item in navbar with children in a flyout -->
  <OnyxFlyoutMenu
    v-else-if="isTopLevel && hasChildren && isVisible"
    v-bind="rootAttrs"
    :label="t('navItemOptionsLabel', { label: props.label })"
  >
    <template #button="{ trigger }">
      <OnyxNavItemFacade
        v-bind="mergeVueProps<any>(restAttrs, props, trigger)"
        ref="componentRef"
        :active
        context="navbar"
      >
        <slot></slot>
        <template v-if="slots.children" #children><slot name="children"></slot></template>
      </OnyxNavItemFacade>
    </template>

    <template #options>
      <slot name="children"></slot>
    </template>
  </OnyxFlyoutMenu>
  <!-- Desktop nav button directly in navbar  -->
  <OnyxNavItemFacade
    v-else-if="isTopLevel && isVisible"
    v-bind="mergeVueProps(props, $attrs)"
    ref="componentRef"
    :active
    context="navbar"
  >
    <slot></slot>
  </OnyxNavItemFacade>
  <!-- Desktop nav item nested in a list flyout -->
  <OnyxNavItemFacade
    v-else-if="isVisible"
    v-bind="mergeVueProps(props, $attrs)"
    :active
    context="list"
  >
    <slot></slot>
  </OnyxNavItemFacade>
  <!-- Desktop top-level nav item in more list -->
  <template v-else>
    <Teleport
      v-if="moreList?.open.value"
      defer
      :disabled="!moreList?.teleportTarget"
      :to="moreList?.teleportTarget"
    >
      <OnyxNavItemFacade v-bind="mergeVueProps(props, $attrs)" :active context="list">
        <slot></slot>
      </OnyxNavItemFacade>
    </Teleport>
  </template>
</template>

<style lang="scss">
@use "../../../../styles/mixins/layers";

.onyx-nav-item-wrapper {
  @include layers.component() {
    &__mobile-children,
    &--open {
      padding: 0;
      width: 100%;

      display: flex;
      flex-direction: column;
      gap: var(--onyx-spacing-2xs);
    }

    /**
     * control items should act as flex items
     */
    &__controls {
      display: contents;
    }

    /**
     * Don't display controls when a child element is opened.
     */
    &--open:has(&--open) > &__controls {
      display: none;
    }
  }
}

.onyx-nav-item {
  @include layers.component() {
    /**
     * Hide siblings before and after an opened item.
     */
    &:has(~ .onyx-nav-item-wrapper--open),
    .onyx-nav-item-wrapper--open ~ & {
      display: none;
    }
  }
}
</style>
