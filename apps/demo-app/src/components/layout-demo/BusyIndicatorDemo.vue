<script lang="ts" setup>
import { OnyxHeadline } from "sit-onyx";
import { FooterDemo } from ".";

defineSlots<{
  /**
   * Overlay content.
   */
  default?(): unknown;
}>();
</script>

<template>
  <div class="busy-indicator">
    <section class="busy-indicator__content">
      <OnyxHeadline is="h2">Busy indicator overlay</OnyxHeadline>

      <slot></slot>
    </section>
    <FooterDemo />
  </div>
</template>

<style lang="scss" scoped>
.busy-indicator {
  background-color: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(0.25rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  &__content {
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: var(--onyx-spacing-md);
    box-sizing: border-box;
  }
}
</style>
