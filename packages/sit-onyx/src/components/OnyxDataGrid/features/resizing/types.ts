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
   * Changes to column widths will be communicated via the `onColumnWidthsChange` callback.
   */
  columnWidths?: MaybeRef<Partial<Record<keyof TEntry, string>>>;
  /**
   * Callback invoked when column widths change due to user interaction.
   *
   * @param newWidths - The updated column widths after resizing.
   * @param diff - A tuple containing the key of the resized column, its old width, and its new width.
   */
  onColumnWidthsChange?: (
    columnWidths: Partial<Record<keyof TEntry, string>>,
    diff: [key: keyof TEntry, oldWidth?: string, newWidth?: string],
  ) => void;
};
