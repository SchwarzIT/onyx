<script lang="ts" setup>
import { computed } from "vue";
import { useResizeObserver } from "../../composables/useResizeObserver.js";
import { SKELETON_INJECTED_SYMBOL } from "../../composables/useSkeletonState.js";
import { ONYX_BREAKPOINTS } from "../../utils/breakpoints.js";
import { useForwardProps } from "../../utils/props.js";
import OnyxCompactPagination from "./OnyxCompactPagination.vue";
import OnyxInlinePagination from "./OnyxInlinePagination.vue";
import OnyxSelectPagination from "./OnyxSelectPagination.vue";
import type { OnyxPaginationProps, PaginationType } from "./types.js";

const props = withDefaults(defineProps<OnyxPaginationProps>(), {
  disabled: false,
  skeleton: SKELETON_INJECTED_SYMBOL,
  type: "select",
  autoCompact: false,
});

const emit = defineEmits<{
  /**
   * Emitted when the selected page changes.
   */
  "update:modelValue": [page: number];
}>();

const { width } = useResizeObserver();

const actualType = computed<PaginationType>(() => {
  if (!props.autoCompact || !width.value) return props.type;

  let threshold: number;
  if (typeof props.autoCompact === "number") threshold = props.autoCompact;
  if (typeof props.autoCompact === "string") threshold = ONYX_BREAKPOINTS[props.autoCompact];
  else threshold = ONYX_BREAKPOINTS.xs;

  return width.value < threshold ? "compact" : props.type;
});

const paginationProps = useForwardProps(props, OnyxSelectPagination);

defineExpose({
  /**
   * The actually used type when `autoCompact` property is enabled.
   */
  type: actualType,
});
</script>

<template>
  <OnyxInlinePagination
    v-if="actualType === 'inline'"
    v-bind="paginationProps"
    @update:model-value="emit('update:modelValue', $event)"
  />
  <OnyxCompactPagination
    v-else-if="actualType === 'compact'"
    v-bind="paginationProps"
    @update:model-value="emit('update:modelValue', $event)"
  />
  <OnyxSelectPagination
    v-else
    v-bind="paginationProps"
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>
