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

    <template #reference="{ ref }">
      <!-- key is needed to update the value if light/dark mode changes -->
      <div :key="$colorMode.value" :ref></div>
    </template>
  </CssVariablesTable>
</template>

<style lang="scss" scoped>
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
