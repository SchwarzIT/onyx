<script lang="ts" setup>
import { computed, provide } from "vue";
import { MOBILE_NAV_BAR_INJECTION_KEY } from "../../../OnyxNavBar/types";
import OnyxNavItem from "./OnyxNavItem.vue";
import type { OnyxNavItemProps } from "./types";

const props = defineProps<OnyxNavItemProps>();

const emit = defineEmits<{
  /**
   * An optional slot to override the label content.
   */
  click: [href: string];
}>();

defineSlots<{
  /**
   * An optional slot to show additional content behind the label (e.g. a `OnyxBadge`).
   */
  default?(): unknown;
}>();

provide(
  MOBILE_NAV_BAR_INJECTION_KEY,
  computed(() => true),
);
</script>

<template>
  <OnyxNavItem
    style="width: 24rem"
    :label="props.label"
    :href="props.href"
    :active="props.active"
    :options="props.options"
    @click="emit('click', $event)"
  >
    <slot></slot>
  </OnyxNavItem>
</template>
