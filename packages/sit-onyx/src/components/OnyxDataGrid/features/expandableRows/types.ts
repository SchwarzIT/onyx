import type { Component, Ref } from "vue";
import type { DataGridEntry } from "../../types.js";

/**
 * The configuration options for the expandable rows feature in the OnyxDataGrid component.
 */
export type UseExpandableRowsOptions<TEntry extends DataGridEntry> = {
  /**
   * Component to render when a specific row is expanded.
   */
  component: (row: TEntry) => Component;
  /**
   * A set of currently expanded rows IDs.
   */
  expandedState?: Ref<Set<TEntry["id"]>>;
};
