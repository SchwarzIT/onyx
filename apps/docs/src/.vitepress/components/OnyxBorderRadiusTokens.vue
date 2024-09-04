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
  <DesignTokenCard
    v-for="borderRadius in tokens"
    :key="borderRadius"
    :name="borderRadius"
    class="token"
  >
    <figure
      class="token__preview"
      :class="{
        'token__preview--large': borderRadius.endsWith('-xl') || borderRadius.endsWith('-full'),
      }"
      :style="{
        borderTopRightRadius: `var(--${borderRadius})`,
        borderBottomRightRadius: `var(--${borderRadius})`,
      }"
    ></figure>
  </DesignTokenCard>
</template>

<style lang="scss" scoped>
.token {
  margin-bottom: var(--onyx-spacing-lg);

  &__preview {
    width: 4rem;
    height: 4rem;
    border-width: var(--onyx-1px-in-rem) var(--onyx-1px-in-rem) var(--onyx-1px-in-rem) 0;
    border-color: var(--onyx-color-base-warning-500);
    border-style: solid;
    background: var(--onyx-color-base-background-tinted);
    margin: 0;
    box-sizing: border-box;

    &--large {
      height: 5rem;
    }
  }

  // override token width so all border radius token names have the same width
  :deep(.token__name) {
    min-width: 16rem;
  }
}
</style>
