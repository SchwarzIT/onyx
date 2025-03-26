<script lang="ts" setup>
// this layout component is only used internally for the nav button component
// to easily switch between mobile and desktop layout
import arrowSmallLeft from "@sit-onyx/icons/arrow-small-left.svg?raw";
import { computed, inject, provide } from "vue";
import { useLink } from "../../../../composables/useLink";
import { useMoreListChild } from "../../../../composables/useMoreList";
import { useVModel, type Nullable } from "../../../../composables/useVModel";
import { injectI18n } from "../../../../i18n";
import { mergeVueProps } from "../../../../utils/attrs";
import OnyxButton from "../../../OnyxButton/OnyxButton.vue";
import {
  MOBILE_NAV_BAR_INJECTION_KEY,
  NAV_BAR_IS_TOP_LEVEL_INJECTION_KEY,
  NAV_BAR_MORE_LIST_INJECTION_KEY,
} from "../../types";
import OnyxFlyoutMenu from "../OnyxFlyoutMenu/OnyxFlyoutMenu.vue";
import OnyxNavItemFacade from "../OnyxNavItemFacade/OnyxNavItemFacade.vue";
import OnyxNavSeparator from "../OnyxNavSeparator/OnyxNavSeparator.vue";
import type { OnyxNavButtonProps } from "./types";

const props = withDefaults(defineProps<OnyxNavButtonProps>(), {
  open: undefined,
  active: "auto",
});

const emit = defineEmits<{
  /**
   * Emitted when the state of mobile children visibility changes.
   */
  "update:open": [value: Nullable<boolean>];
}>();

const slots = defineSlots<{
  /**
   * The trigger for the flyout menu. Should be an interactive component like a button or link.
   */
  button?(params: {
    /**
     * Attributes and event listeners that must be bound to an interactive element (button or link), that should act as the flyout trigger.
     */
    trigger: object;
  }): unknown;
  options?(): unknown;
}>();

const { t } = injectI18n();

const open = useVModel({
  props,
  emit,
  key: "open",
  initialValue: false,
});

const hasChildren = computed(() => !!slots.options);

const { isActive } = useLink();
const active = computed(() => {
  if (props.active !== "auto") return props.active;
  return isActive.value(props.link);
});

const { componentRef, isVisible } = useMoreListChild(NAV_BAR_MORE_LIST_INJECTION_KEY);

const isMobile = inject(
  MOBILE_NAV_BAR_INJECTION_KEY,
  computed(() => false),
);

const isTopLevel = inject(NAV_BAR_IS_TOP_LEVEL_INJECTION_KEY, true);
provide(NAV_BAR_IS_TOP_LEVEL_INJECTION_KEY, false);
</script>

<template>
  <li
    v-if="isMobile"
    :class="{
      'onyx-component': true,
      'onyx-nav-button-layout': true,
      'onyx-nav-button-layout--mobile': isMobile,
      'onyx-nav-button-layout--open': open,
    }"
    role="presentation"
  >
    <template v-if="open">
      <div class="onyx-nav-button-layout__controls" role="presentation">
        <OnyxButton
          :label="t('back')"
          mode="plain"
          color="neutral"
          :icon="arrowSmallLeft"
          @click="open = false"
        />

        <OnyxNavItemFacade v-bind="props" :active :has-children="false" context="mobile" />
        <OnyxNavSeparator orientation="horizontal" />
      </div>
      <ul role="menu" class="onyx-nav-button-layout__mobile-children">
        <slot name="options"></slot>
      </ul>
    </template>
    <OnyxNavItemFacade
      v-else
      v-bind="props"
      :active
      :has-children
      context="mobile"
      @click="hasChildren && (open = true)"
    />
  </li>
  <template v-else>
    <li v-if="isTopLevel" v-show="isVisible" class="onyx-component onyx-nav-button-layout">
      <OnyxFlyoutMenu v-if="hasChildren" :label="t('navItemOptionsLabel', { label: props.label })">
        <template #button="{ trigger }">
          <OnyxNavItemFacade
            v-bind="mergeVueProps<any>(props, trigger)"
            ref="componentRef"
            :active
            context="navbar"
          />
        </template>

        <template #options>
          <slot name="options"></slot>
        </template>
      </OnyxFlyoutMenu>
      <OnyxNavItemFacade v-else v-bind="props" ref="componentRef" :active context="navbar" />
    </li>
    <OnyxNavItemFacade v-else v-bind="props" :active context="list" />
  </template>
</template>

<style lang="scss">
.onyx-nav-button-layout {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--onyx-spacing-xs);

  &__mobile-children {
    padding: 0;
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: var(--onyx-spacing-2xs);
  }

  &__controls {
    display: contents;
  }

  &:has(~ .onyx-nav-button-layout--open),
  &--open ~ .onyx-nav-button-layout {
    display: none;
  }

  &--open:has(.onyx-nav-button-layout--open) > &__controls {
    display: none;
  }
}
</style>
