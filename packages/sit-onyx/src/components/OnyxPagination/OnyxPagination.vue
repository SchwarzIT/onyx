<script lang="ts" setup>
import ModernPagination from "./ModernPagination.vue";
import type { OnyxPaginationProps } from "./types";

const props = defineProps<OnyxPaginationProps>();

const emit = defineEmits<{
  /**
   * Emitted when the selected page changes. Value is the zero-based page index.
   */
  "update:modelValue": [pageIndex: number];
}>();
</script>

<template>
  <ModernPagination v-bind="props" @update:model-value="emit('update:modelValue', $event)" />
  <!-- TODO: add classic pagination, see https://github.com/SchwarzIT/onyx/issues/1714 -->
</template>
