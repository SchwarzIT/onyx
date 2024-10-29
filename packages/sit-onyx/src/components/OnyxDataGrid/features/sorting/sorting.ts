import { computed, h, ref } from "vue";
import { createFeature } from "..";
import { injectI18n } from "../../../../i18n";
import type { DataGridEntry } from "../../types";
import SortAction from "./SortAction.vue";

export type SortDirection = "asc" | "desc" | "none";

export const nextSortDirection = (current?: SortDirection): SortDirection => {
  switch (current) {
    case "asc":
      return "desc";
    case "desc":
      return "none";
    case "none":
    default:
      return "asc";
  }
};

const SORTING_FEATURE = Symbol("Sorting");

export const useDataGridSorting = createFeature(<TEntry extends DataGridEntry>() => {
  const sortColumn = ref<keyof TEntry>();
  const sortDirection = ref<SortDirection>("none");
  const locale = injectI18n().locale;
  const intlCompare = computed(() => new Intl.Collator(locale.value).compare);

  const handleClick = (column: keyof TEntry) => {
    if (sortColumn.value === column) {
      sortDirection.value = nextSortDirection(sortDirection.value);
    } else {
      sortColumn.value = column;
      sortDirection.value = nextSortDirection();
    }
    if (sortDirection.value === "none") {
      sortColumn.value = undefined;
    }
  };

  const sortData = (data: TEntry[]) => {
    const column = sortColumn.value;
    if (!column || sortDirection.value === "none") {
      return;
    }
    const multiplicand = sortDirection.value === "asc" ? 1 : -1;
    data.sort((a, b) => intlCompare.value(String(a[column]), String(b[column])) * multiplicand);
  };

  return {
    name: SORTING_FEATURE,
    watch: [sortColumn, sortDirection, locale],
    mutation: {
      func: sortData,
    },
    header: {
      actions: (column) => [
        {
          iconComponent: h(SortAction, {
            columnLabel: String(column),
            sortDirection: sortColumn.value === column ? sortDirection.value : undefined,
            onClick: () => handleClick(column),
          }),
        },
      ],
    },
  };
});
