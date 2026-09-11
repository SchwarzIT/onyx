<script setup lang="ts">
import { iconArrowsSort, iconListArrowDown, iconListArrowUp } from "@sit-onyx/icons";
import { computed } from "vue";
import { injectI18n } from "../../../../i18n/index.js";
import OnyxSystemButton from "../../../OnyxSystemButton/OnyxSystemButton.vue";
import type { HeaderActionIconComponentContext } from "../index.js";
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
  sortDirection: SortDirection;
  /**
   * Data grid context for the header action.
   */
  ctx?: HeaderActionIconComponentContext;
}>();

const emit = defineEmits<{
  "update:sortDirection": [direction: SortDirection];
}>();

const { t } = injectI18n();

const nextDirection = computed(() => {
  const shouldSkipNone = props.ctx?.hasFlyoutMenu ?? false;
  return nextSortDirection(props.sortDirection, shouldSkipNone);
});

const icon = computed(() => {
  if (props.sortDirection === "asc") return iconListArrowUp;
  if (props.sortDirection === "desc") return iconListArrowDown;
  return iconArrowsSort;
});

const buttonLabel = computed(() => {
  return t.value(`dataGrid.head.sorting.action.${nextDirection.value}`, {
    field: props.columnLabel,
  });
});

const handleClick = () => {
  emit("update:sortDirection", nextDirection.value);
};
</script>

<template>
  <OnyxSystemButton :label="buttonLabel" :icon="icon" color="medium" @click="handleClick" />
</template>
