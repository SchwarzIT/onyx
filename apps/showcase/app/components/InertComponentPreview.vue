<script lang="ts" setup>
defineSlots<{
  default(): unknown;
}>();
</script>

<template>
  <div class="preview" inert>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.preview {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
