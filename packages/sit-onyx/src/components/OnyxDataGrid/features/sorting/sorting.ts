import { computed, h, toRef, toValue, type Ref } from "vue";
import { createFeature } from "..";
import { injectI18n } from "../../../../i18n";
import type { DataGridEntry } from "../../types";
import SortAction from "./SortAction.vue";
import type { SortDirection, SortOptions, SortState } from "./types";

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

export const nextSortState = <TEntry extends DataGridEntry>(
  column: keyof TEntry,
  current?: SortState<TEntry>,
): SortState<TEntry> => {
  if (current?.column === column) {
    return {
      column: current.column,
      direction: nextSortDirection(current.direction),
    };
  } else {
    return { column, direction: nextSortDirection() };
  }
};

export const SORTING_FEATURE = Symbol("Sorting");

export const useDataGridSorting = createFeature(
  <TEntry extends DataGridEntry>(options?: SortOptions<TEntry>) => {
    const sortState: Ref<SortState<TEntry>> = toRef(
      options?.sortState ??
        ({
          column: undefined,
          direction: "none",
        } as const),
    );

    const getSortFunc = computed(() => (col: keyof TEntry) => {
      const config = toValue(options?.columns);
      return config?.[col]?.sortFunc ?? intlCompare.value;
    });

    const getSortEnabled = computed(() => (col: keyof TEntry) => {
      const config = toValue(options?.columns);
      return !config || config?.[col]?.enabled === true;
    });

    const { locale } = injectI18n();
    const intlCompare = computed(
      () => (a: unknown, b: unknown) =>
        new Intl.Collator(locale.value).compare(String(a), String(b)),
    );

    const handleClick = (column: keyof TEntry) => {
      if (sortState.value.column === column) {
        sortState.value.direction = nextSortDirection(sortState.value.direction);
      } else {
        sortState.value = { column, direction: nextSortDirection() };
      }
      if (sortState.value.direction === "none") {
        sortState.value.column = undefined;
      }
    };

    const sortData = (data: Readonly<TEntry>[]) => {
      const { column, direction } = sortState.value;
      if (!column || direction === "none") {
        return;
      }
      const multiplicand = direction === "asc" ? 1 : -1;
      const sortFunc = getSortFunc.value(column);
      data.sort((a, b) => sortFunc(a[column], b[column]) * multiplicand);
    };

    return {
      name: SORTING_FEATURE,
      watch: [sortState, intlCompare],
      mutation: {
        func: sortData,
      },
      header: {
        actions: (column) =>
          getSortEnabled.value(column) === true
            ? [
                {
                  iconComponent: h(SortAction, {
                    columnLabel: String(column),
                    sortDirection:
                      sortState.value.column === column ? sortState.value.direction : undefined,
                    onClick: () => handleClick(column),
                  }),
                },
              ]
            : [],
      },
    };
  },
);
