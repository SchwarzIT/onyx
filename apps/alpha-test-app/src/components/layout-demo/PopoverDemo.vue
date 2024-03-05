<script lang="ts" setup>
import { OnyxHeadline } from "sit-onyx";
</script>

<template>
  <div class="popover">
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
  max-width: 25rem;
  max-height: fit-content;
  margin: auto;

  border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
  background-color: var(--onyx-color-base-background-blank);
}
</style>
