<script lang="ts" setup>
import { OnyxHeadline } from "sit-onyx";
</script>

<template>
  <section class="backdrop top-bar-fly-out">
    <OnyxHeadline is="h3">Mobile Top Bar Flyout</OnyxHeadline>
    <slot></slot>
  </section>
</template>

<style lang="scss" scoped>
.top-bar-fly-out {
  background-color: white;
  padding: 4px;
}
</style>
