<script lang="ts" setup>
defineSlots<{
  /**
   * Default slot to place the avatars.
   */
  default(): unknown;
}>();
</script>

<template>
  <div class="onyx-avatar-stack">
    <slot></slot>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-avatar-stack {
  @include layers.component() {
    display: flex;
    align-items: center;

    > .onyx-avatar:not(:first-child) {
      // move by 50% (minus border)
      margin-left: calc(-0.5 * var(--onyx-avatar-size) - var(--onyx-1px-in-rem));
    }
  }
}
</style>
