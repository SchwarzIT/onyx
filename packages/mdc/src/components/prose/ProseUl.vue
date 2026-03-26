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
  margin-block: var(--onyx-density-xs);
}
</style>
