/*
 * The configuration options for the stickyColumn feature in the OnyxDataGrid component.
 */
export type StickyColumnsOptions = {
  /**
   * The stickyColumn options for each column, including whether stickyColumn is enabled, the custom filter function, and the column-specific filter configuration.
   */
  columns: string[];
  /**
   * Determs the position the columns are sticked.
   */
  direction?: "left" | "right";
};
