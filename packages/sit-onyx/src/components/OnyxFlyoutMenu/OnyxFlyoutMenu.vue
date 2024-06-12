<script setup lang="ts">
const slots = defineSlots<{
  /**
   * OnyxFlyoutMenuItem to show
   */
  default?(): unknown;
  /**
   * Optional header content to display above the options.
   */
  header?(): unknown;
  /**
   * Optional footer content to display below the options (will replace `message` property).
   */
  footer?(): unknown;
}>();
</script>

<template>
  <div
    :class="{
      'onyx-flyout-menu': true,
      'onyx-flyout-menu--with-header': !!slots.header,
      'onyx-flyout-menu--with-footer': !!slots.footer,
    }"
  >
    <slot name="header"></slot>
    <ul class="onyx-flyout-menu__wrapper onyx-flyout-menu__group">
      <slot></slot>
    </ul>
    <slot name="footer"></slot>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";
@use "../../styles/mixins/list";

.onyx-flyout-menu {
  @include layers.component() {
    @include list.styles();

    &--with-header {
      padding-top: 0;
    }

    &--with-footer {
      padding-bottom: 0;
    }
  }
}
</style>
