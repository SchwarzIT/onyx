/*
 * The configuration options for the stickyColumn feature in the OnyxDataGrid component.
 */
export type StickyColumnsOptions = {
  /**
   * Defines the columns that should remain sticky.
   * @remarks
   * The order should start with the column closest to the border.
   */
  columns: PropertyKey[];
  /**
   * Determs the position the columns are sticked.
   */
  direction?: "left" | "right";
};
