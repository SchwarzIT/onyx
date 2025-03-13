import type { DataGridEntry } from "../../types";
/**
 * The configuration options for the resizing feature in the OnyxDataGrid component.
 * Includes settings for the individual columns and general resizing behavior.
 */
export type ResizingOptions<TEntry extends DataGridEntry> = {
  /**
   * Defines the columns for which the resizing behavior is disabled.
   */
  disabledColumns?: (keyof TEntry)[];
  /**
   * Whether column resizing is enabled. This setting applies for every column.
   * If undefined, resizing will be disabled.
   */
  columnResizing?: boolean;
};
