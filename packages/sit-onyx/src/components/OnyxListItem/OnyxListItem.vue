<template>
  <li class="onyx-list-item">
    <slot></slot>
  </li>
</template>
<style lang="scss">
@use "../../styles/mixins/layers";
@use "../../styles/mixins/listitem";

.onyx-list-item {
  @include layers.component() {
    @include listitem.styles();
  }
}
</style>
