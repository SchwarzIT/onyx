<script lang="ts" setup>
// this layout component is only used internally for the nav button component
// to easily switch between mobile and desktop layout
import arrowSmallLeft from "@sit-onyx/icons/arrow-small-left.svg?raw";
import { useVModel, type Nullable } from "../../../../composables/useVModel";
import { injectI18n } from "../../../../i18n";
import OnyxButton from "../../../OnyxButton/OnyxButton.vue";
import OnyxFlyoutMenu from "../OnyxFlyoutMenu/OnyxFlyoutMenu.vue";
import OnyxNavSeparator from "../OnyxNavSeparator/OnyxNavSeparator.vue";
import type { OnyxNavButtonProps } from "./types";

const props = withDefaults(
  defineProps<
    OnyxNavButtonProps & {
      /**
       * If the mobile layout should be used.
       */
      isMobile: boolean;
    }
  >(),
  { mobileChildrenOpen: undefined },
);
const emit = defineEmits<{
  /**
   * Emitted when the state of mobile children visibility changes.
   */
  "update:mobileChildrenOpen": [value: Nullable<boolean>];
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
const mobileChildrenOpen = useVModel({
  props,
  emit,
  key: "mobileChildrenOpen",
  initialValue: false,
});
</script>

<template>
  <li class="onyx-component" role="presentation">
    <template v-if="props.isMobile">
      <OnyxButton
        v-if="props.isMobile && mobileChildrenOpen"
        :label="t('back')"
        mode="plain"
        color="neutral"
        :icon="arrowSmallLeft"
        @click="mobileChildrenOpen = false"
      />

      <slot
        v-if="!mobileChildrenOpen || props.link"
        name="button"
        :trigger="{ trigger: {} }"
      ></slot>
      <OnyxNavSeparator v-if="mobileChildrenOpen && props.link" orientation="horizontal" />

      <ul
        v-show="mobileChildrenOpen"
        role="menu"
        class="onyx-nav-button__mobile-children"
        :class="{ 'onyx-nav-button__mobile-children--open': mobileChildrenOpen }"
      >
        <slot name="options"></slot>
      </ul>
    </template>

    <template v-else>
      <OnyxFlyoutMenu :label="t('navItemOptionsLabel', { label: props.label })">
        <template #button="{ trigger }">
          <slot name="button" :trigger="trigger"></slot>
        </template>

        <template v-if="slots.options" #options>
          <slot name="options"></slot>
        </template>
      </OnyxFlyoutMenu>
    </template>
  </li>
</template>
