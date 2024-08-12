<script lang="ts" setup>
import ModernPagination from "./ModernPagination.vue";
import type { OnyxPaginationProps } from "./types";

const props = withDefaults(defineProps<OnyxPaginationProps>(), {
  type: "modern",
  disabled: false,
  skeleton: false,
});

const emit = defineEmits<{
  /**
   * Emitted when the selected page changes.
   */
  "update:modelValue": [page: number];
}>();
</script>

<template>
  <ModernPagination v-bind="props" @update:model-value="emit('update:modelValue', $event)" />
  <!-- TODO: add classic pagination, see https://github.com/SchwarzIT/onyx/issues/1714 -->
</template>
