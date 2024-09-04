import { h, ref } from "vue";
import { normalizedIncludes } from "../../../../../utils/strings";
import type { TableFeature } from "../../OnyxDataGrid.feature";
import type { TableEntry } from "../../OnyxDataGridRenderer";
import FilterInputButton from "./FilterInputButton.vue";

export const withFilteringFeature = <TEntry extends TableEntry>(): TableFeature<TEntry> => {
  const featureName = Symbol("Filtering");
  const filterColumn = ref<keyof TEntry>();
  const filterValue = ref("");

  return {
    name: featureName,
    state: [filterColumn, filterValue],
    modifyHeaders: {
      func: (cols) => {
        cols.forEach((c) => {
          const org = c.header;
          c.header = (props, ctx) =>
            h("div", [
              h(FilterInputButton, {
                isFiltering: filterColumn.value === c.key,
                onReset: () => {
                  filterColumn.value = undefined;
                  filterValue.value = "";
                },
                onFilter: (searchTerm) => {
                  filterValue.value = searchTerm;
                  filterColumn.value = c.key;
                },
              }),
              org(props, ctx),
            ]);
        });
        return cols;
      },
      order: 0,
    },
    mapping: {
      order: 2,
      func: ({ entry }) => {
        if (!filterColumn.value) {
          return;
        }
        return { hidden: !normalizedIncludes(`${entry[filterColumn.value]}`, filterValue.value) };
      },
    },
    mutation: {
      order: 11,
      func: (state) => state.filter((entryState) => !entryState.context[featureName]?.["hidden"]),
    },
  };
};
