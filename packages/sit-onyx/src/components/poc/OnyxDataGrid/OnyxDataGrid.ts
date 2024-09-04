import type { ColumnDefinition } from "./OnyxDataGrid.feature";
import type { TableEntry } from "./OnyxDataGridRenderer";

export type OnyxDataGridProps<TEntry extends TableEntry> = {
  data: TEntry[];
  columns: ColumnDefinition<TEntry, any>[];
};
