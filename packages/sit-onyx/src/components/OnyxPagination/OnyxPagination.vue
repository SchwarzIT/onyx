<script lang="ts" setup>
import SelectPagination from "./SelectPagination.vue";
import type { OnyxPaginationProps } from "./types";

const props = withDefaults(defineProps<OnyxPaginationProps>(), {
  disabled: false,
});

const emit = defineEmits<{
  /**
   * Emitted when the selected page changes.
   */
  "update:modelValue": [page: number];
}>();
</script>

<template>
  <SelectPagination v-bind="props" @update:model-value="emit('update:modelValue', $event)" />
  <!-- TODO: add "inline" mode, see https://github.com/SchwarzIT/onyx/issues/1714 -->
</template>
