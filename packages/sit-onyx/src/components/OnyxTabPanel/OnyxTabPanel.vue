<script lang="ts" setup>
defineSlots<{
  /**
   * Slot for the tab panel content.
   */
  default(): unknown;
}>();
</script>

<template>
  <div class="onyx-component onyx-tab-panel">
    <slot></slot>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

@include layers.component() {
  .onyx-tab-panel {
    font-family: var(--onyx-font-family-paragraph);
    color: var(--onyx-color-text-icons-neutral-intense);
    font-size: var(--onyx-font-size-md);
    line-height: var(--onyx-font-line-height-md);
  }
}
</style>
