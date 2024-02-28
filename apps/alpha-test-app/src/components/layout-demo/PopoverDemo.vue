<script lang="ts" setup>
import { OnyxHeadline } from "sit-onyx";
</script>

<template>
  <div class="demo popover">
    <OnyxHeadline is="h2">Popover / Modal content</OnyxHeadline>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped></style>
