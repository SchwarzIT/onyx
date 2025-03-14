import type { MaybeRef } from "vue";

export type HideColumnsOptions = {
  /**
   * Defines which columns can be hidden
   * If omitted, all columns are hidable
   */
  columns?: MaybeRef<HideColumn[]>;
};

export type HideColumn = {
  /** The name of the column */
  name: string;
  /** Whether the column is hidden (default: false) */
  hidden?: boolean;
};
