import type { h } from "vue";

export type UseExpandableRowsOptions<TEntry> = {
  renderDetails: (row: TEntry) => ReturnType<typeof h>;
};
