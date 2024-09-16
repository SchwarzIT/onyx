import type { FunctionalComponent, HTMLAttributes } from "vue";
import type { OnyxTableProps } from "../../OnyxTable/types";
import type { DataGridEntry, DataGridKey, DataGridMetadata } from "../types";

export type OnyxDataGridRendererProps<
  TEntry extends DataGridEntry = DataGridEntry,
  TMetadata extends DataGridMetadata = DataGridMetadata,
> = OnyxTableProps & {
  columns: DataGridRendererHeader<keyof TEntry>[];
  rows: DataGridRendererRow<TEntry, TMetadata>[];
};

export type DataGridRendererHeader<TKey extends DataGridKey, TProps extends object = object> = {
  /**
   * Key of the column - usually a key of the table data.
   * But can also be used for custom columns.
   */
  key: TKey;
  /**
   * The component that renders the header content.
   */
  is: FunctionalComponent<HTMLAttributes & TProps>;
  /**
   * Attributes and data that is provided to the component using `v-bind`.
   */
  props: HTMLAttributes & TProps;
};

export type DataGridRendererRow<
  TEntry extends DataGridEntry,
  TMetadata extends DataGridMetadata = DataGridMetadata,
> = {
  /**
   * Unique id of the row.
   */
  id: DataGridKey;
  cells: Partial<Record<keyof TEntry, DataGridRendererCell<TEntry, TMetadata>>>;
};

export type DataGridRendererCell<
  TEntry extends DataGridEntry,
  TMetadata extends DataGridMetadata = DataGridMetadata,
> = {
  /**
   * The component that renders the actual cell content.
   */
  is: DataGridRendererCellComponent<TEntry, TMetadata>;
  props: DataGridRendererCellComponentProps<TEntry, TMetadata>;
};

/**
 * Vue component that renders the actual content of a single data grid cell.
 */
export type DataGridRendererCellComponent<
  TEntry extends DataGridEntry,
  TMetadata extends DataGridMetadata = DataGridMetadata,
> = FunctionalComponent<HTMLAttributes & DataGridRendererCellComponentProps<TEntry, TMetadata>>;

export type DataGridRendererCellComponentProps<
  TEntry extends DataGridEntry,
  TMetadata extends DataGridMetadata,
> = {
  /**
   * Complete row data.
   */
  row: TEntry;
  /**
   * Cell data that is provided to the component via the `metadata` prop.
   */
  metadata?: TMetadata;
  /**
   * Cell data that is provided to the component via the `modelValue` prop.
   */
  modelValue?: TEntry[keyof TEntry];
};
