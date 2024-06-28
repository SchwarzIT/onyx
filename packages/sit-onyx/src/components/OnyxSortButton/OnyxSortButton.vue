<script lang="ts" setup generic="T extends string = string">
import arrowSmallDown from "@sit-onyx/icons/arrow-small-down.svg?raw";
import arrowSmallUp from "@sit-onyx/icons/arrow-small-up.svg?raw";
import arrowsSort from "@sit-onyx/icons/arrows-sort.svg?raw";
import { computed } from "vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxSortButtonProps, SortValue } from "./types";

const props = defineProps<OnyxSortButtonProps<T>>();

const emit = defineEmits<{
  /**
   * Emitted when the sort changes.
   */
  "update:modelValue": [value?: SortValue<T>];
}>();

const icon = computed(() => {
  if (!props.modelValue) return arrowsSort;
  if (props.modelValue.order === "asc") return arrowSmallUp;
  return arrowSmallDown;
});

const handleClick = () => {
  if (!props.modelValue) {
    return emit("update:modelValue", { property: props.property, order: "asc" });
  }
  if (props.modelValue.order === "asc") {
    return emit("update:modelValue", { property: props.property, order: "desc" });
  }
  return emit("update:modelValue", undefined);
};
</script>

<template>
  <button
    class="onyx-sort-button"
    :aria-label="'Aria label'"
    :title="'Aria label'"
    @click="handleClick"
  >
    <OnyxIcon :icon="icon" color="neutral" />
  </button>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-sort-button {
  @include layers.component() {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    display: inline-grid;
    place-items: center;

    .onyx-icon {
      --icon-size: 1lh;
    }
  }
}
</style>
