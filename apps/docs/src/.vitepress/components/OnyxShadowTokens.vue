<script lang="ts" setup>
import DesignTokenCard from "./DesignTokenCard.vue";

const shadows = [
  "onyx-shadow-medium-bottom",
  "onyx-shadow-medium-left",
  "onyx-shadow-medium-right",
  "onyx-shadow-soft-bottom",
  "onyx-shadow-soft-left",
  "onyx-shadow-soft-right",
];
</script>

<template>
  <DesignTokenCard v-for="shadow in shadows" :key="shadow" :name="shadow" class="token" hide-value>
    <figure class="preview" :style="{ boxShadow: `var(--${shadow})` }"></figure>
  </DesignTokenCard>
</template>

<style lang="scss" scoped>
.token {
  margin-bottom: var(--onyx-spacing-lg);
}

.preview {
  width: 4rem;
  height: 4rem;
  border-radius: var(--onyx-radius-sm);
  border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
  background: var(--onyx-color-base-neutral-100);
  margin: 0;
  box-sizing: border-box;
}
</style>
