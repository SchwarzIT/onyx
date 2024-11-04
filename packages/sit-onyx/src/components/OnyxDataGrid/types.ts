export type DataGridMetadata = Record<string, unknown>;

/**
 * @experimental The DataGrid is still working in progress and the props will change in the future.
 */
export type OnyxDataGridProps<TEntry extends DataGridEntry> = {
  /**
   * The order of and which columns should be rendered.
   */
  columns: (keyof TEntry)[];
  /**
   * The data that should be used to fill the datagrid.
   */
  data: TEntry[];
};

/**
 * "Raw" user data for a data grid entry/row, e.g. fetched from a backend service.
 */
export type DataGridEntry = {
  id: PropertyKey;
  [key: PropertyKey]: unknown;
};
