<script lang="ts" setup>
import { computed, provide } from "vue";
import { MOBILE_NAV_BAR_INJECTION_KEY, NAV_BAR_IS_TOP_LEVEL_INJECTION_KEY } from "../../types";
import OnyxNavItem from "./OnyxNavItem.vue";
import type { OnyxNavItemProps } from "./types";

const props = defineProps<
  OnyxNavItemProps & {
    /**
     *
     */
    mobile: boolean;
    /**
     *
     */
    topLeveL: boolean;
  }
>();

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
  computed(() => props.mobile),
);

// eslint-disable-next-line vue/no-setup-props-reactivity-loss
provide(NAV_BAR_IS_TOP_LEVEL_INJECTION_KEY, props.topLeveL);
</script>

<!-- eslint-disable vue/no-static-inline-styles -->
<template>
  <OnyxNavItem style="width: 24rem" v-bind="props">
    <slot></slot>

    <template v-if="slots.children" #children>
      <slot name="children"></slot>
    </template>
  </OnyxNavItem>
</template>
