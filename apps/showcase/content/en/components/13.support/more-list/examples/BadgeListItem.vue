<script lang="ts" setup>
import { OnyxBadge, useMoreListChild } from "sit-onyx";
import { EXAMPLE_MORE_LIST_INJECTION_KEY } from "./index.js";

const props = defineProps<{
  label: string;
}>();

const { componentRef, isVisible } = useMoreListChild(EXAMPLE_MORE_LIST_INJECTION_KEY);
</script>

<template>
  <li v-show="isVisible" ref="componentRef">
    <OnyxBadge>{{ props.label }}</OnyxBadge>
  </li>
</template>
