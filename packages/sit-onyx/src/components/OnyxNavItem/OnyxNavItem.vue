<script setup lang="ts">
import OnyxMenuItem from "../OnyxMenuItem/OnyxMenuItem.vue";
import type { OnyxNavItemProps } from "./types";

const props = defineProps<OnyxNavItemProps>();

const emit = defineEmits<{
  /**
   * Emitted when the nav item is clicked.
   */
  click: [href: string];
}>();

defineSlots<{
  /**
   * Content of the nav item.
   */
  default?(): unknown;
}>();
</script>

<template>
  <OnyxMenuItem
    :active="props.active"
    :href="props.href ?? 'javascript:void(0)'"
    @click="props.href && emit('click', props.href)"
  >
    <slot></slot>
  </OnyxMenuItem>
</template>
