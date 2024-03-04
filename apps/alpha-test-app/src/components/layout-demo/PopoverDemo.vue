<script lang="ts" setup>
import { OnyxHeadline } from "sit-onyx";
</script>

<template>
  <div class="demo popover">
    <OnyxHeadline is="h2">Popover / Modal content</OnyxHeadline>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.popover {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  max-width: 400px;
  max-height: fit-content;
  margin: auto;

  outline: 1px solid lightgrey;
  background-color: white;
}
</style>
