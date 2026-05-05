<script lang="ts" setup>
defineSlots<{
  /**
   * Steps. Expected to contain "Step" components.
   */
  default(): unknown;
}>();
</script>

<template>
  <ol class="steps">
    <slot></slot>
  </ol>
</template>

<style lang="scss" scoped>
.steps {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--onyx-density-md);
  flex-grow: 1;
  padding-inline: var(--onyx-density-xs);
  margin-block: var(--onyx-markdown-renderer-margin-block);
}
</style>
