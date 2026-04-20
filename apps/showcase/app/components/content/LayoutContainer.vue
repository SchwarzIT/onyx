<script lang="ts" setup>
defineSlots<{
  /**
   * Elements to place inside the layout.
   */
  default(): unknown;
}>();
</script>

<template>
  <div class="layout">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@use "sit-onyx/breakpoints.scss";

.layout {
  display: grid;
  gap: var(--onyx-density-lg);
  grid-template-columns: 1fr 1fr;
  margin-block: var(--onyx-density-lg);

  @include breakpoints.container(max, lg) {
    grid-template-columns: 1fr;
  }
}
</style>
