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
.backdrop {
  height: 100%;
  widows: 100%;
  z-index: var(--onyx-z-index-app-overlay);
  background-color: rgba(0, 0, 0, 0.5);
}

.top-bar-fly-out__content {
  background-color: white;
  padding: 4px;
}
</style>
