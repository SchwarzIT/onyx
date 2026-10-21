<script lang="ts" setup>
const variables = [
  "var(--onyx-shadow-medium-top)",
  "var(--onyx-shadow-medium-bottom)",
  "var(--onyx-shadow-medium-left)",
  "var(--onyx-shadow-medium-right)",
  "var(--onyx-shadow-soft-top)",
  "var(--onyx-shadow-soft-bottom)",
  "var(--onyx-shadow-soft-left)",
  "var(--onyx-shadow-soft-right)",
];
</script>

<template>
  <CssVariablesTable :variables>
    <template #preview="{ variable }">
      <div class="preview-container">
        <div class="preview" :style="{ boxShadow: variable }"></div>
      </div>
    </template>
  </CssVariablesTable>
</template>

<style lang="scss" scoped>
.preview-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--onyx-spacing-md);
}

.preview {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--onyx-radius-xs);
  background-color: var(--onyx-color-base-background-blank);

  .dark & {
    border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
  }
}
</style>
