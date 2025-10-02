<!-- eslint-disable vue/require-prop-comment -->
<script setup lang="ts">
export type PropsTestCaseProps = {
  string: string;
  number: number;
  object: object;
  /**
   * Missing
   */
  missing: number;
};

defineProps<PropsTestCaseProps>();
</script>

<template>Test</template>
