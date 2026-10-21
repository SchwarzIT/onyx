<script lang="ts" setup>
const variables = [
  "var(--onyx-radius-xs)",
  "var(--onyx-radius-sm)",
  "var(--onyx-radius-md)",
  "var(--onyx-radius-lg)",
  "var(--onyx-radius-xl)",
  "var(--onyx-radius-full)",
];
</script>

<template>
  <CssVariablesTable :variables>
    <template #preview="{ variable }">
      <div class="preview" :style="{ borderRadius: variable }"></div>
    </template>
  </CssVariablesTable>
</template>

<style lang="scss" scoped>
.preview {
  width: 2.5rem;
  height: 2.5rem;
  background-color: var(--onyx-color-base-background-tinted);
  border: 0.125rem solid var(--onyx-color-base-info-500);
}
</style>
