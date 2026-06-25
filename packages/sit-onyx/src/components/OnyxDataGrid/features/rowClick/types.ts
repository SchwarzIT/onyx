import type { MaybeRef } from "vue";
import type { DataGridEntry } from "../../types.js";

export type RowClickOptions<TEntry extends DataGridEntry> = {
  /**
   * Callback when a specific row is clicked.
   */
  onClick: (entry: TEntry) => void;
  /**
   * Whether the also trigger the click when the user has selection (e.g. marked text to copy).
   *
   * @default false
   */
  ignoreSelection?: boolean;
  /**
   * Whether the feature is enabled.
   * Can also be a function that returns the enabled state for the given entry/row.
   *
   * @default true
   */
  enabled?: MaybeRef<boolean | undefined> | ((entry: TEntry) => boolean | undefined);
};
