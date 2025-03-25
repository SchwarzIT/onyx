<script lang="ts" setup>
import { computed, inject, provide } from "vue";
import { useMoreListChild } from "../../../../composables/useMoreList";
import { useVModel, type Nullable } from "../../../../composables/useVModel";
import {
  MOBILE_NAV_BAR_INJECTION_KEY,
  NAV_BAR_IS_TOP_LEVEL_INJECTION_KEY,
  NAV_BAR_MORE_LIST_INJECTION_KEY,
} from "../../types";
import NavButtonLayout from "./NavButtonLayout.vue";
import type { OnyxNavButtonProps } from "./types";

const props = withDefaults(defineProps<OnyxNavButtonProps>(), {
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
   * An optional slot to override the label content.
   */
  default?(): unknown;
  /**
   * An optional slot to render nested children.
   */
  children?(): unknown;
}>();

/**
 * Controls the open state for the mobile children.
 */
const open = useVModel({
  props,
  emit,
  key: "open",
  initialValue: false,
});
const isMobile = inject(
  MOBILE_NAV_BAR_INJECTION_KEY,
  computed(() => false),
);

const isTopLevel = inject(NAV_BAR_IS_TOP_LEVEL_INJECTION_KEY, true);
provide(NAV_BAR_IS_TOP_LEVEL_INJECTION_KEY, false);

const { componentRef, isVisible } = useMoreListChild(NAV_BAR_MORE_LIST_INJECTION_KEY);
</script>

<template>
  <NavButtonLayout
    v-show="isMobile || isVisible"
    ref="componentRef"
    v-bind="props"
    v-model:open="open"
    :class="{
      'onyx-component': true,
      'onyx-nav-button': true,
      'onyx-nav-button--mobile': isMobile,
    }"
    :is-top-level="isTopLevel"
    :is-mobile="isMobile"
  >
    <template v-if="slots.children" #options>
      <slot name="children"></slot>
    </template>
  </NavButtonLayout>
</template>
