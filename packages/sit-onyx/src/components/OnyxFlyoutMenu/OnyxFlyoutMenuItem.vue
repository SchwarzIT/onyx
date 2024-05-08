<script setup lang="ts">
const props = defineProps<{ active?: boolean }>();
</script>
<template>
  <li
    :class="{
      'onyx-flyout-menu-item': true,
      'onyx-flyout-menu-item--active': props.active,
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
