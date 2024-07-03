<script lang="ts" setup>
import { computed, provide } from "vue";
import { MOBILE_NAV_BAR_INJECTION_KEY } from "../../types";
import OnyxNavButton from "./OnyxNavButton.vue";
import type { OnyxNavButtonProps } from "./types";

const props = defineProps<OnyxNavButtonProps>();

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

<template>
  <OnyxNavButton
    style="width: 24rem"
    :label="props.label"
    :href="props.href"
    :active="props.active"
    @click="emit('click', $event)"
  >
    <slot></slot>

    <template #children>
      <slot name="children"></slot>
    </template>
  </OnyxNavButton>
</template>
