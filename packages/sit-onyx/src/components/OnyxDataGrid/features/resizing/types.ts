import type { MaybeRef } from "vue";
import type { DataGridEntry } from "../../types.js";
import { type DataGridFeatureOptions } from "../index.js";

/**
 * The configuration options for the resizing feature in the OnyxDataGrid component.
 * Includes settings for the individual columns and general resizing behavior.
 */
export type ResizingOptions<TEntry extends DataGridEntry> = DataGridFeatureOptions<
  TEntry,
  object
> & {
  /**
   * Controllable column widths.
   * If provided, the resizing feature will use these widths as the source of truth.
   */
  columnWidths?: MaybeRef<Partial<Record<keyof TEntry, string>>>;
};
