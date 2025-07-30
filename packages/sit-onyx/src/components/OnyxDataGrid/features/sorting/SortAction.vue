<script setup lang="ts">
import { iconArrowsSort, iconListArrowDown, iconListArrowUp } from "@sit-onyx/icons";
import { computed } from "vue";
import { injectI18n } from "../../../../i18n/index.js";
import OnyxSystemButton from "../../../OnyxSystemButton/OnyxSystemButton.vue";
import { nextSortDirection } from "./sorting.js";
import type { SortDirection } from "./types.js";

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
    ? iconListArrowUp
    : props.sortDirection === "desc"
      ? iconListArrowDown
      : iconArrowsSort,
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
