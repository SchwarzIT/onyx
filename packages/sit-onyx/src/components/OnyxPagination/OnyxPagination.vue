<script lang="ts" setup>
import { SKELETON_INJECTED_SYMBOL } from "../../composables/useSkeletonState.js";
import { useForwardProps } from "../../utils/props.js";
import OnyxSelectPagination from "./OnyxSelectPagination.vue";
import type { OnyxPaginationProps } from "./types.js";

const props = withDefaults(defineProps<OnyxPaginationProps>(), {
  disabled: false,
  skeleton: SKELETON_INJECTED_SYMBOL,
});

const emit = defineEmits<{
  /**
   * Emitted when the selected page changes.
   */
  "update:modelValue": [page: number];
}>();

const selectPaginationProps = useForwardProps(props, OnyxSelectPagination);
</script>

<template>
  <OnyxSelectPagination
    v-bind="selectPaginationProps"
    @update:model-value="emit('update:modelValue', $event)"
  />
  <!-- TODO: add "inline" mode, see https://github.com/SchwarzIT/onyx/issues/1714 -->
</template>
