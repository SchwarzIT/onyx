<script lang="ts" setup>
import { OnyxBadge, useMoreListChild } from "sit-onyx";
import { EXAMPLE_MORE_LIST_INJECTION_KEY } from "./index.js";

const props = defineProps<{
  label: string;
}>();

const { componentRef, isVisible } = useMoreListChild(EXAMPLE_MORE_LIST_INJECTION_KEY);
</script>

<template>
  <OnyxBadge v-show="isVisible" ref="componentRef">{{ props.label }}</OnyxBadge>
</template>
