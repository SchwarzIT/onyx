import type { Component } from "vue";

/**
 * The configuration options for the expandable rows feature in the OnyxDataGrid component.
 */
export type UseExpandableRowsOptions<TEntry> = {
  /**
   * Component to render when a specific row is expanded.
   */
  component: (row: TEntry) => Component;
};
