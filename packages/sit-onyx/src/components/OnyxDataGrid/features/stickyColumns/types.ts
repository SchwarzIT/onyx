import type { DataGridEntry } from "../../types";
/*
 * The configuration options for the stickyColumn feature in the OnyxDataGrid component.
 */
export type StickyColumnsOptions<TEntry extends DataGridEntry> = {
  /**
   * Defines the columns that should remain sticky.
   */
  columns: (keyof TEntry)[];
  /**
   * * Determines the side to which the columns are sticked.
   * @default `left`
   */
  position?: "left" | "right";
};
