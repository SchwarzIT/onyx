<script lang="ts" setup>
import { computed } from "vue";
import { SKELETON_INJECTED_SYMBOL } from "../../composables/useSkeletonState.js";
import { useViewportWidth } from "../../composables/useViewportWidth.js";
import { ONYX_BREAKPOINTS } from "../../utils/breakpoints.js";
import { useForwardProps } from "../../utils/props.js";
import OnyxCompactPagination from "./OnyxCompactPagination.vue";
import OnyxInlinePagination from "./OnyxInlinePagination.vue";
import OnyxSelectPagination from "./OnyxSelectPagination.vue";
import type { OnyxPaginationProps } from "./types.js";

const props = withDefaults(defineProps<OnyxPaginationProps>(), {
  disabled: false,
  skeleton: SKELETON_INJECTED_SYMBOL,
  type: "select",
  autoTypeDetection: true,
});

const emit = defineEmits<{
  /**
   * Emitted when the selected page changes.
   */
  "update:modelValue": [page: number];
}>();

const width = useViewportWidth();

const actualType = computed(() => {
  if (props.autoTypeDetection && width.value !== 0 && width.value < ONYX_BREAKPOINTS.xs) {
    return "compact";
  }
  return props.type ?? "select";
});

const paginationProps = useForwardProps(props, OnyxSelectPagination);
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
