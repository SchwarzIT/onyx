<script lang="ts" setup>
import DesignTokenCard from "./DesignTokenCard.vue";

const spacings = [
  "onyx-spacing-3xs",
  "onyx-spacing-2xs",
  "onyx-spacing-xs",
  "onyx-spacing-sm",
  "onyx-spacing-md",
  "onyx-spacing-lg",
  "onyx-spacing-xl",
  "onyx-spacing-2xl",
  "onyx-spacing-3xl",
];
</script>

<template>
  <DesignTokenCard v-for="spacing in spacings" :key="spacing" :name="spacing" class="token">
    <figure class="preview">
      <figure class="preview__area" :style="{ height: `var(--${spacing})` }"></figure>
    </figure>
  </DesignTokenCard>
</template>

<style lang="scss" scoped>
.token {
  margin-bottom: var(--onyx-spacing-md);
}

.preview {
  width: 4rem;
  min-height: 4rem;
  border-radius: var(--onyx-radius-sm);
  border: 1px solid var(--onyx-color-base-border-default);
  background: var(--onyx-color-base-neutral-100);
  display: flex;
  flex-direction: column;
  justify-content: center;

  &__area {
    border-top: 1px solid var(--onyx-color-base-warning-500);
    border-bottom: 1px solid var(--onyx-color-base-warning-500);
    background: var(--onyx-color-base-warning-200);
    width: 100%;
    margin: var(--onyx-spacing-xs) 0;
  }
}
</style>
