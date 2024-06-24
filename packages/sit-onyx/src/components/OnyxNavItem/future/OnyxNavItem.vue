<script setup lang="ts">
import { inject } from "vue";
import OnyxListItem from "../../OnyxListItem/OnyxListItem.vue";
import { MENU_BUTTON_ITEM_INJECTION_KEY, type OnyxNavItemProps } from "./types";

const props = defineProps<OnyxNavItemProps>();
const emit = defineEmits<{
  /**
   * Emitted when the nav item is clicked (via click or keyboard).
   */
  click: [];
}>();

const menuButton = inject(MENU_BUTTON_ITEM_INJECTION_KEY);
</script>
<template>
  <OnyxListItem :selected="props.active" class="onyx-nav-item" @click="emit('click')">
    <a
      v-bind="menuButton?.menuItem({ active: props.active })"
      :href="props.href ?? 'javascript:void(0)'"
    >
      <slot></slot>
    </a>
  </OnyxListItem>
</template>
<style lang="scss">
.onyx-nav-item {
  &:focus-within {
  }
}
</style>
