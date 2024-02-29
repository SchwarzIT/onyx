<script lang="ts" setup>
import { OnyxHeadline } from "sit-onyx";
</script>

<template>
  <section class="page-loader">
    <OnyxHeadline is="h2">Busy indicator overlay</OnyxHeadline>

    <slot></slot>
  </section>
</template>

<style lang="scss" scoped>
.page-loader {
  background-color: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(4px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
}
</style>
