<script lang="ts" setup>
import { OnyxHeadline } from "sit-onyx";
</script>

<template>
  <section class="backdrop top-bar-fly-out">
    <div class="top-bar-fly-out__content">
      <OnyxHeadline is="h2">Mobile Top Bar Flyout</OnyxHeadline>
      <slot></slot>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.top-bar-fly-out__content {
  background-color: white;
  padding: 4px;
}
</style>
