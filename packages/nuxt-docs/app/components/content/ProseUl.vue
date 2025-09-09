<script lang="ts" setup>
defineSlots<{
  default(): unknown;
}>();
</script>

<template>
  <ul>
    <slot></slot>
  </ul>
</template>

<style lang="scss" scoped>
ul {
  margin-top: var(--onyx-density-xs);
  margin-bottom: var(--onyx-density-xs);
}
</style>
