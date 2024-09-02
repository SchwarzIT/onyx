import type { TableEntry } from "./OnyxDataGridRenderer";

export type OnyxDataGridProps<TEntry extends TableEntry> = {
  data: TEntry[];
};
