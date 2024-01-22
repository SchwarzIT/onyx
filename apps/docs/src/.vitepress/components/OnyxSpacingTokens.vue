<script lang="ts" setup>
import SpacingToken from "./SpacingToken.vue";
</script>

<template>
  <div class="tokens">
    <SpacingToken name="onyx-spacing-3xs" />
    <SpacingToken name="onyx-spacing-2xs" />
    <SpacingToken name="onyx-spacing-xs" />
    <SpacingToken name="onyx-spacing-sm" />
    <SpacingToken name="onyx-spacing-md" />
    <SpacingToken name="onyx-spacing-lg" />
    <SpacingToken name="onyx-spacing-xl" />
    <SpacingToken name="onyx-spacing-2xl" />
    <SpacingToken name="onyx-spacing-3xl" />
  </div>
</template>

<style lang="scss" scoped>
.tokens {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-spacing-md);
}
</style>
