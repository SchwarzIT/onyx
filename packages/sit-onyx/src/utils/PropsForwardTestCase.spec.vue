<!-- eslint-disable vue/require-prop-comment -->
<script setup lang="ts">
import PropsTestCaseSpec, { type PropsTestCaseProps } from "./PropsTestCase.spec.vue";

export type PropsForwardTestCaseProps = PropsTestCaseProps & {
  additional1: string;
  additional2?: string;
};

const props = defineProps<PropsForwardTestCaseProps>();
</script>

<template>
  <!-- eslint-disable-next-line sitOnyx/require-root-class -->
  <PropsTestCaseSpec v-bind="props" />
</template>
