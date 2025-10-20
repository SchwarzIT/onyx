<!-- eslint-disable vue/require-prop-comment -->
<script setup lang="ts">
import { useForwardProps } from "./props.js";
import PropsTestCaseSpec, { type PropsTestCaseProps } from "./PropsTestCase.spec.vue";

export type PropsForwardTestCaseProps = PropsTestCaseProps & {
  additional1: string;
  additional2?: string;
};

const props = defineProps<PropsForwardTestCaseProps>();

const forwardedProps = useForwardProps(props, PropsTestCaseSpec);
</script>

<template>
  <!-- eslint-disable-next-line sitOnyx/require-root-class -->
  <PropsTestCaseSpec v-bind="forwardedProps" />
</template>
