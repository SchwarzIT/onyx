<script lang="ts" setup>
const props = defineProps<{
  /**
   * CSS variable.
   */
  variable: string;
}>();
</script>

<template>
  <div class="preview" :style="{ '--variable-value': props.variable }"></div>
</template>

<style lang="scss" scoped>
.preview {
  border-radius: var(--onyx-radius-sm);
  border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
  padding: var(--onyx-spacing-sm) var(--onyx-spacing-5xs);

  &::after {
    content: "";
    height: var(--variable-value);
    width: 100%;
    background-color: var(--onyx-color-text-icons-info-soft);
    display: block;
  }
}
</style>
