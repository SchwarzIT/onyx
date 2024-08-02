<script lang="ts" setup>
// this layout component is only used internally for the nav button component
// to easily switch between mobile and desktop layout
import arrowSmallLeft from "@sit-onyx/icons/arrow-small-left.svg?raw";
import { injectI18n } from "../../../../i18n";
import OnyxButton from "../../../OnyxButton/OnyxButton.vue";
import OnyxFlyoutMenu from "../OnyxFlyoutMenu/OnyxFlyoutMenu.vue";
import OnyxNavSeparator from "../OnyxNavSeparator/OnyxNavSeparator.vue";
import type { OnyxNavButtonProps } from "./types";

const props = defineProps<OnyxNavButtonProps & { isMobile: boolean }>();

const slots = defineSlots<{
  button?(): unknown;
  options?(): unknown;
}>();

const { t } = injectI18n();

const mobileChildrenOpen = defineModel<boolean>("mobileChildrenOpen");
</script>

<template>
  <li role="presentation">
    <template v-if="props.isMobile">
      <OnyxButton
        v-if="props.isMobile && mobileChildrenOpen"
        :label="t('back')"
        mode="plain"
        color="neutral"
        :icon="arrowSmallLeft"
        @click="mobileChildrenOpen = false"
      />

      <slot v-if="!mobileChildrenOpen || props.href" name="button"></slot>
      <OnyxNavSeparator v-if="mobileChildrenOpen && props.href" orientation="horizontal" />

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
        <slot name="button"></slot>

        <template v-if="slots.options" #options>
          <slot name="options"></slot>
        </template>
      </OnyxFlyoutMenu>
    </template>
  </li>
</template>
