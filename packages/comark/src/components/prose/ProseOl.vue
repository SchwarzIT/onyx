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
  margin-block: var(--onyx-density-xs);
}
</style>
