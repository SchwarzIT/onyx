<script setup lang="ts">
const props = defineProps<{ active?: boolean }>();
</script>
<template>
  <li
    :class="{
      'onyx-list-item': true,
      'onyx-list-item--active': props.active,
    }"
  >
    <slot></slot>
  </li>
</template>
<style lang="scss">
@use "../../styles/mixins/layers";
@use "../../styles/mixins/listitem";

.onyx-list-item {
  @include layers.component() {
    @include listitem.styles(&);
  }
}
</style>
