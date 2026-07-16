<script setup lang="ts">
import type { Nullable } from "../types/index.js";
import { useVModel } from "./useVModel.js";

const props = defineProps<{
  /**
   * ModelValue
   */
  modelValue?: string;
  /**
   * NoDefault
   */
  noDefault?: string;
}>();

defineSlots<{ default: unknown }>();

const emit = defineEmits<{
  "update:modelValue": [string];
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
