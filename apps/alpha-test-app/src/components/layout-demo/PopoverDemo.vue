<script lang="ts" setup>
import { OnyxHeadline } from "sit-onyx";
</script>

<template>
  <Teleport to="body">
    <div class="backdrop">
      <div class="demo popover">
        <OnyxHeadline is="h3">Popover / Modal content</OnyxHeadline>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped></style>
