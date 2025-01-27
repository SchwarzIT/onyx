<script lang="ts" setup>
import { computed, provide } from "vue";
import { MOBILE_NAV_BAR_INJECTION_KEY } from "../../types";
import OnyxNavButton from "./OnyxNavButton.vue";
import type { OnyxNavButtonProps } from "./types";

const props = defineProps<OnyxNavButtonProps>();

const slots = defineSlots<{
  /**
   * An optional slot to show additional content behind the label (e.g. a `OnyxBadge`).
   */
  default?(): unknown;
  /**
   * An optional slot to render nested children.
   */
  children?(): unknown;
}>();

provide(
  MOBILE_NAV_BAR_INJECTION_KEY,
  computed(() => true),
);
</script>

<!-- eslint-disable vue/no-static-inline-styles -->
<template>
  <OnyxNavButton style="width: 24rem" v-bind="props">
    <slot></slot>

    <template v-if="slots.children" #children>
      <slot name="children"></slot>
    </template>
  </OnyxNavButton>
</template>
