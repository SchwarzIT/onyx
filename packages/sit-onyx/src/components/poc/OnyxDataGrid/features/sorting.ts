import { h, type Ref, ref } from "vue";
import type { TableFeature } from "../OnyxDataGrid.feature";
import type { TableEntry } from "../OnyxDataGridRenderer";
import SortIndicator from "./SortIndicator.vue";

export type SortDirection = 1 | -1 | 0;

export const withSortingFeature = <TEntry extends TableEntry>(): TableFeature<TEntry> => {
  const sortColumn: Ref<keyof TEntry> = ref("id");
  const sortDirection = ref<SortDirection>(0);
  const intlCompare = new Intl.Collator().compare;

  return {
    name: Symbol("Sorting"),
    state: [sortColumn, sortDirection],
    modifyColumns: {
      func: (cols) => {
        cols.forEach((c) => {
          const org = c.header;
          c.header = (props, ctx) =>
            h("div", [
              h(SortIndicator, {
                sortDirection: sortColumn.value === c.key ? sortDirection.value : 0,
                "onUpdate:sortDirection": (newSortDirection) => {
                  sortColumn.value = c.key;
                  sortDirection.value = newSortDirection;
                },
              }),
              org(props, ctx),
            ]);
        });
        return cols;
      },
      order: 1,
    },
    mutation: {
      order: 1,
      func: (state) =>
        sortDirection.value === 0
          ? state
          : state.sort(
              (a, b) =>
                intlCompare(`${a.entry[sortColumn.value]}`, `${b.entry[sortColumn.value]}`) *
                sortDirection.value,
            ),
    },
  };
};
