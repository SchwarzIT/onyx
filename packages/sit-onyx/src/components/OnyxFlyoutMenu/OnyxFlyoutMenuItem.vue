<script setup lang="ts">
import type { ListboxOption } from "../..";

const props = defineProps<Pick<ListboxOption, "color"> & { active?: boolean }>();
</script>
<template>
  <li
    :class="{
      'onyx-flyout-menu-item': true,
      'onyx-flyout-menu-item--active': props.active,
      'onyx-flyout-menu-item--danger': props.color === 'danger',
    }"
  >
    <slot></slot>
  </li>
</template>
<style lang="scss">
@use "../../styles/mixins/layers";
@use "../../styles/mixins/listitem";

.onyx-flyout-menu-item {
  @include layers.component() {
    @include listitem.styles(&);
  }
}
</style>
