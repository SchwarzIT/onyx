<script lang="ts" setup>
const variables = [
  "var(--onyx-spacing-5xs)",
  "var(--onyx-spacing-4xs)",
  "var(--onyx-spacing-3xs)",
  "var(--onyx-spacing-2xs)",
  "var(--onyx-spacing-xs)",
  "var(--onyx-spacing-sm)",
  "var(--onyx-spacing-md)",
  "var(--onyx-spacing-lg)",
  "var(--onyx-spacing-xl)",
  "var(--onyx-spacing-2xl)",
  "var(--onyx-spacing-3xl)",
  "var(--onyx-spacing-4xl)",
];
</script>

<template>
  <CssVariablesTable :variables>
    <template #preview="{ variable }">
      <VariablePreviewHeight :variable />
    </template>
  </CssVariablesTable>
</template>
