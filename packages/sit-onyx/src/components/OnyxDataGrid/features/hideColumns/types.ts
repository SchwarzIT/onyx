import { type MaybeRef } from "vue";
import type { DataGridEntry } from "../../types.js";
import type { DataGridFeatureOptions } from "../index.js";

export type HideColumnsState<TEntry extends DataGridEntry> = Set<keyof TEntry>;

/**
 * The options of the sorting feature for the OnyxDataGrid component.
 */
export type HideColumnsOptions<TEntry extends DataGridEntry> = DataGridFeatureOptions<
  TEntry,
  object
> & {
  /**
   * List of column keys that are hidden.
   */
  state?: MaybeRef<HideColumnsState<TEntry>>;
};
