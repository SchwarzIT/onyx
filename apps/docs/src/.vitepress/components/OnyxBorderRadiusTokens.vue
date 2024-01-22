<script lang="ts" setup>
import DesignTokenCard from "./DesignTokenCard.vue";

const tokens = [
  "onyx-radius-xs",
  "onyx-radius-sm",
  "onyx-radius-md",
  "onyx-radius-lg",
  "onyx-radius-xl",
  "onyx-radius-full",
];
</script>

<template>
  <div class="tokens">
    <DesignTokenCard v-for="borderRadius in tokens" :key="borderRadius" :name="borderRadius">
      <figure
        class="radius"
        :class="{ 'radius--large': borderRadius.endsWith('-xl') || borderRadius.endsWith('-full') }"
        :style="{
          borderTopRightRadius: `var(--${borderRadius})`,
          borderBottomRightRadius: `var(--${borderRadius})`,
        }"
      ></figure>
    </DesignTokenCard>
  </div>
</template>

<style lang="scss" scoped>
.tokens {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-spacing-md);
}

.radius {
  width: 4rem;
  height: 4rem;
  border-width: 1px 1px 1px 0;
  border-color: var(--onyx-color-base-warning-500);
  border-style: solid;
  background: var(--onyx-color-base-neutral-100);

  &--large {
    height: 5rem;
  }
}
</style>
