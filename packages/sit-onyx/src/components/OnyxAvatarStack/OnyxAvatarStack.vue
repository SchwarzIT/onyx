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
    flex-wrap: wrap;
    width: max-content;
    max-width: 100%;

    > .onyx-avatar {
      $border-width: var(--onyx-1px-in-rem);
      border: $border-width solid var(--onyx-color-base-primary-700);

      &:not(:last-child) {
        // move by 50% (minus border)
        margin-right: calc(-0.5 * var(--onyx-avatar-size) - $border-width);
      }
    }
  }
}
</style>
