<script lang="ts" setup>
defineSlots<{
  default(): unknown;
}>();
</script>

<template>
  <code class="onyx-text--small">
    <slot></slot>
  </code>
</template>

<style lang="scss" scoped>
code {
  background-color: var(--onyx-color-base-background-blank);
  border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
  border-radius: var(--onyx-radius-sm);
  padding: var(--onyx-density-3xs) var(--onyx-density-2xs);
}
</style>
