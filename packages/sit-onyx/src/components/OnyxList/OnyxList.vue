<template>
  <div class="onyx-list">
    <ul class="onyx-list__wrapper">
      <slot></slot>
    </ul>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";
@use "../../styles/mixins/list";

.onyx-list {
  @include layers.component() {
    @include list.styles();
  }
}
</style>
