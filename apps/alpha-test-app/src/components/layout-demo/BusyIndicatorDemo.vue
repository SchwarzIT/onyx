<script lang="ts" setup>
import { OnyxHeadline } from "sit-onyx";
import { FooterDemo } from ".";
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
  backdrop-filter: blur(4px);
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
    padding: 16px;
    box-sizing: border-box;
  }
}
</style>
