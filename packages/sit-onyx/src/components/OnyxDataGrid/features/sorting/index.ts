import { ref } from "vue";
import type { DataGridFeature } from "../../composables/useDataGridFeatures";
import type { DataGridEntry } from "../../types";

export type SortOrder = "asc" | "desc" | undefined;

export const withSorting = <TEntry extends DataGridEntry>() => {
  const order = ref<SortOrder>();

  return {
    name: "sorting",
    watch: [order],
    mutation: {
      func: (state) => {
        return state;
      },
    },
  } satisfies DataGridFeature<string, TEntry>;
};
