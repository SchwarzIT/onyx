<script lang="ts" setup>
import { OnyxHeadline } from "sit-onyx";
</script>

<template>
  <section class="page-loader">
    <OnyxHeadline is="h2">Page loader overlay</OnyxHeadline>

    <slot></slot>
  </section>
</template>

<style lang="scss" scoped>
.page-loader {
  background-color: rgba(212, 212, 212, 0.78);
  backdrop-filter: blur(4px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
