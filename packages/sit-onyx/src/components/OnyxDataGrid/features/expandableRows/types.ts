import type { Component } from "vue";

/**
 * Options for rendering detail content for expanded rows.
 */
export type UseExpandableRowsOptions<TEntry> = {
  /**
   * Function to render the detail content.
   */
  detailsComponent: (row: TEntry) => Component;
};
