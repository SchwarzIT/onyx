<script setup lang="ts">
import arrowSmallDown from "@sit-onyx/icons/arrow-small-down.svg?raw";
import arrowSmallUp from "@sit-onyx/icons/arrow-small-up.svg?raw";
import arrowsSort from "@sit-onyx/icons/arrows-sort.svg?raw";
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
    ? arrowSmallUp
    : props.sortDirection === "desc"
      ? arrowSmallDown
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
