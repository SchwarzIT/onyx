import type { FunctionalComponent, HTMLAttributes, ThHTMLAttributes } from "vue";
import type { AnyKey, WithHTMLAttributes } from "../../../types";
import type { OnyxTableProps } from "../../OnyxTable/types";
import type { DataGridEntry, DataGridMetadata } from "../types";

export type OnyxDataGridRendererProps<
  TEntry extends DataGridEntry = DataGridEntry,
  TMetadata extends DataGridMetadata = DataGridMetadata,
> = OnyxTableProps & {
  columns: DataGridRendererColumn<TEntry, object>[];
  rows: DataGridRendererRow<TEntry, TMetadata>[];
};

/**
 * Describes how a column header is rendered in the data grid.
 * Will also define which row columns are rendered in which order.
 */
export type DataGridRendererColumn<TEntry extends DataGridEntry, TProps extends object> = {
  /**
   * (Unique) Key of the column - usually a key of the table data.
   * But can also be used for custom columns.
   */
  key: keyof TEntry;
  /**
   * The component that renders the header content.
   */
  component: FunctionalComponent<WithHTMLAttributes<TProps>>;
  /**
   * Attributes and data that is provided to the component using `v-bind`.
   */
  props: WithHTMLAttributes<TProps>;
  /**
   * Attributes that are bound directly to the `<th>` element of the column.
   */
  thAttributes?: ThHTMLAttributes;
};

export type DataGridRendererRow<
  TEntry extends DataGridEntry,
  TMetadata extends DataGridMetadata = DataGridMetadata,
> = {
  /**
   * Unique id of the row.
   */
  id: AnyKey;
  cells: Partial<Record<keyof TEntry, DataGridRendererCell<TEntry, TMetadata>>>;
};

export type DataGridRendererCell<
  TEntry extends DataGridEntry,
  TMetadata extends DataGridMetadata = DataGridMetadata,
> = {
  /**
   * The component that renders the actual cell content.
   */
  component: DataGridRendererCellComponent<TEntry, TMetadata>;
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
