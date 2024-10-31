<script lang="ts" setup>
import DesignVariableCard from "./DesignVariableCard.vue";

const variables = [
  "onyx-radius-xs",
  "onyx-radius-sm",
  "onyx-radius-md",
  "onyx-radius-lg",
  "onyx-radius-xl",
  "onyx-radius-full",
];
</script>

<template>
  <DesignVariableCard
    v-for="borderRadius in variables"
    :key="borderRadius"
    :name="borderRadius"
    class="variable"
  >
    <figure
      class="variable__preview"
      :class="{
        'variable__preview--large': borderRadius.endsWith('-xl') || borderRadius.endsWith('-full'),
      }"
      :style="{
        borderTopRightRadius: `var(--${borderRadius})`,
        borderBottomRightRadius: `var(--${borderRadius})`,
      }"
    ></figure>
  </DesignVariableCard>
</template>

<style lang="scss" scoped>
.variable {
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
}
</style>
