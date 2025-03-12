import type { DataGridEntry } from "../../types";

/**
 * Configuration for filtering on a per-column basis.
 * If at least one column has a filtering configuration, filtering must be explicitly enabled for all columns.
 */
export type ResizeColumnOptions<TEntry extends DataGridEntry> = {
  [TKey in keyof TEntry]?: {
    /**
     * Determines if resizing is enabled for this column.
     * If set to false, the column will not be resizable.
     */
    enabled: boolean;
  };
};

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
