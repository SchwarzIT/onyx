<script lang="ts" setup>
defineSlots<{
  /**
   * Toolbar actions related to this group.
   */
  default(): unknown;
}>();
</script>

<template>
  <div :class="['onyx-component', 'onyx-editor-toolbar-group']">
    <slot></slot>
  </div>
</template>

<style lang="scss">
@use "sit-onyx/src/styles/mixins/layers.scss";

.onyx-editor-toolbar-group {
  @include layers.component() {
    display: contents;

    &::after {
      content: "";
      background-color: var(--onyx-color-component-border-neutral);
      height: 1lh;
      width: var(--onyx-1px-in-rem);
    }

    // hide group / separator when group is empty / all features are disabled
    &:empty {
      display: none;
    }

    // hide separator for last group
    &:last-of-type,
    &:has(+ .onyx-editor-toolbar-group:empty) {
      &::after {
        display: none;
      }
    }
  }
}
</style>
