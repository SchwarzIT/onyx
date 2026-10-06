<script lang="ts" setup>
defineSlots<{
  default(): unknown;
}>();
</script>

<template>
  <OnyxCard class="card">
    <slot></slot>
  </OnyxCard>
</template>

<style lang="scss" scoped>
.card {
  --onyx-card-gap: var(--onyx-density-md);
  border-radius: var(--onyx-radius-lg);
  padding: var(--onyx-density-xl);
  flex: 1;
  background: radial-gradient(
    ellipse at bottom right,
    color-mix(in srgb, var(--onyx-color-base-primary-500) 10%, transparent) 0%,
    transparent 100%
  );
}
</style>
