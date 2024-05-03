<template>
  <ul class="onyx-list">
    <div class="onyx-list__wrapper">
      <slot></slot>
    </div>
  </ul>
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
