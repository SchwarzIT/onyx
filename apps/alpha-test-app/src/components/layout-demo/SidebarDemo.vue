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
  height: 100%;
  padding: 1rem;
  box-sizing: border-box;
}
</style>
