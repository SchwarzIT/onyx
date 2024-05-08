<template>
  <div class="onyx-flyout-menu">
    <ul class="onyx-flyout-menu__wrapper onyx-flyout-menu__group">
      <slot></slot>
    </ul>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";
@use "../../styles/mixins/list";

.onyx-flyout-menu {
  @include layers.component() {
    @include list.styles();
  }
}
</style>
