<script lang="ts" setup>
defineSlots<{
  default(): unknown;
}>();
</script>

<template>
  <ol>
    <slot></slot>
  </ol>
</template>

<style lang="scss" scoped>
ol {
  margin-top: var(--onyx-density-xs);
  margin-bottom: var(--onyx-density-xs);
}
</style>
