import type { OnyxTableProps } from "../../OnyxTable/types";

export type OnyxDataGridRendererProps = OnyxTableProps & {
  columns: unknown[];
  rows: unknown[];
};
