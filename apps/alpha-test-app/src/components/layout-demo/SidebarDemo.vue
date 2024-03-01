<script lang="ts" setup>
import { OnyxHeadline } from "sit-onyx";
</script>

<template>
  <div class="demo sidebar">
    <OnyxHeadline is="h2">Sidebar</OnyxHeadline>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  overflow-y: auto;
  padding: 1rem;
  box-sizing: border-box;
}
</style>
