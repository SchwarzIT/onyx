export type DataGridKey = string | number | symbol;

export type DataGridMetadata = Record<string, unknown>;

/**
 * "Raw" user data for a data grid entry/row, e.g. fetched from a backend service.
 */
export type DataGridEntry = {
  id: DataGridKey;
  [key: DataGridKey]: unknown;
};
