<script lang="ts" setup>
import { OnyxHeadline } from "sit-onyx";
</script>

<template>
  <section class="top-bar-fly-out">
    <div class="top-bar-fly-out__content">
      <OnyxHeadline is="h2">Mobile Top Bar Flyout</OnyxHeadline>
      <slot></slot>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.top-bar-fly-out {
  height: 100%;
  widows: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  &__content {
    background-color: var(--onyx-color-base-background-blank);
    padding: var(--onyx-spacing-4xs);
  }
}
</style>
