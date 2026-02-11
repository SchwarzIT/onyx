<script lang="ts" setup>
defineSlots<{
  default(): unknown;
}>();
</script>

<template>
  <p>
    <slot></slot>
  </p>
</template>

<style lang="scss" scoped>
p {
  margin-block: var(--onyx-density-md);
}
</style>
