import { h, type Ref, ref } from "vue";
import type { TableFeature } from "../OnyxDataGrid.feature";
import type { TableEntry } from "../OnyxDataGridRenderer";
import SortIndicator from "./SortIndicator.vue";

export type SortDirection = 1 | -1 | 0;

type SortingHeaderProps = {
  sortDirection: SortDirection;
};

export const withSortingFeature = <TEntry extends TableEntry>(): TableFeature<TEntry> => {
  const sortColumn: Ref<keyof TEntry> = ref("id");
  const sortDirection = ref<SortDirection>(0);
  const intlCompare = new Intl.Collator().compare;

  const withSorting: TableFeature<TEntry, SortingHeaderProps> = {
    name: Symbol("Sorting"),
    modifyColumns: {
      func: (cols) => {
        cols.forEach((c) => {
          const org = c.header;
          c.header = (props, ctx) => h("div", [h(SortIndicator, props), org(props, ctx)]);

          c.headerProps = {
            ...c.headerProps,
            sortDirection: sortColumn.value === c.key ? sortDirection.value : 0,
            onClick: () => {
              if (sortColumn.value === c.key) {
                sortDirection.value *= -1;
              } else {
                sortColumn.value = c.key;
                sortDirection.value = 1;
              }
            },
          };
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

  return withSorting as TableFeature<TEntry>;
};
