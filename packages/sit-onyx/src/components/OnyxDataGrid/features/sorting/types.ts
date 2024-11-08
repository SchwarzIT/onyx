import { type MaybeRef, type MaybeRefOrGetter } from "vue";
import type { DataGridEntry } from "../../types";

export type SortDirection = "asc" | "desc" | "none";

/**
 * -1: less than, 0: equal to, 1: greater than
 */
export type Compare<T> = (a: T, b: T) => -1 | 0 | 1;

export type SortState<TEntry extends DataGridEntry> = {
  column: keyof TEntry | undefined;
  direction: SortDirection;
};

export type SortColumnOptions<TEntry extends DataGridEntry> = {
  [TKey in keyof TEntry]?: {
    enabled: boolean;
    sortFunc?: Compare<TEntry[TKey]>;
  };
};

export type SortOptions<TEntry extends DataGridEntry> = {
  sortState?: MaybeRef<SortState<TEntry>>;
  columns?: MaybeRefOrGetter<SortColumnOptions<TEntry>>;
};
