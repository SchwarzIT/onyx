<script lang="ts" setup>
import { SKELETON_INJECTED_SYMBOL } from "../../composables/useSkeletonState.js";
import { useForwardProps } from "../../utils/props.js";
import OnyxInlinePagination from "./OnyxInlinePagination.vue";
import OnyxSelectPagination from "./OnyxSelectPagination.vue";
import type { OnyxPaginationProps } from "./types.js";

const props = withDefaults(defineProps<OnyxPaginationProps>(), {
  disabled: false,
  skeleton: SKELETON_INJECTED_SYMBOL,
  mode: "select",
});

const emit = defineEmits<{
  /**
   * Emitted when the selected page changes.
   */
  "update:modelValue": [page: number];
}>();

const paginationProps = useForwardProps(props, OnyxSelectPagination);
</script>

<template>
  <OnyxInlinePagination
    v-if="props.type === 'inline'"
    v-bind="paginationProps"
    @update:model-value="emit('update:modelValue', $event)"
  />
  <OnyxSelectPagination
    v-else
    v-bind="paginationProps"
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>
