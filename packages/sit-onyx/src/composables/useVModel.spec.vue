<script setup lang="ts">
import type { Nullable } from "../types";
import { useVModel } from "./useVModel";

const props = defineProps<{
  /**
   * modelValue
   */
  modelValue?: string;
  /**
   * noDefault
   */
  noDefault?: string;
}>();

defineSlots<{ default: unknown }>();

const emit = defineEmits<{
  "update:modelValue": [Nullable<string>];
  "update:noDefault": [Nullable<string>];
}>();

const _modelValue = useVModel({
  key: "modelValue",
  props,
  emit,
  default: "default",
});

const _noDefault = useVModel({
  key: "noDefault",
  props,
  emit,
});

defineExpose({ _modelValue, _noDefault });
</script>

<template><slot></slot></template>
