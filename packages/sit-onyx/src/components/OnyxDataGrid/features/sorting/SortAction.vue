<script setup lang="ts">
import arrowsSort from "@sit-onyx/icons/arrows-sort.svg?raw";
import listArrowDown from "@sit-onyx/icons/list-arrow-down.svg?raw";
import listArrowUp from "@sit-onyx/icons/list-arrow-up.svg?raw";
import { computed } from "vue";
import { injectI18n } from "../../../../i18n";
import OnyxSystemButton from "../../../OnyxSystemButton/OnyxSystemButton.vue";
import { nextSortDirection } from "./sorting";
import type { SortDirection } from "./types";

const props = defineProps<{
  /**
   * Label of this Column.
   */
  columnLabel: string;
  /**
   * The current sorting direction, that should be indicated.
   */
  sortDirection?: SortDirection;
}>();

const { t } = injectI18n();

const icon = computed(() =>
  props.sortDirection === "asc"
    ? listArrowUp
    : props.sortDirection === "desc"
      ? listArrowDown
      : arrowsSort,
);

const buttonLabel = computed(() => {
  const nextDirection = nextSortDirection(props.sortDirection);
  return t.value(`dataGrid.head.sorting.action.${nextDirection}`, {
    field: props.columnLabel,
  });
});
</script>

<template>
  <OnyxSystemButton :label="buttonLabel" :icon="icon" color="medium" />
</template>
