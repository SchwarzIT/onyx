import type {
  Component,
  FunctionalComponent,
  HTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "vue";
import type { WithHTMLAttributes } from "../../../types";
import type { OnyxTableProps } from "../../OnyxTable/types";
import type { DataGridEntry, DataGridMetadata } from "../types";

export type OnyxDataGridRendererProps<
  TEntry extends DataGridEntry = DataGridEntry,
  TMetadata extends DataGridMetadata = DataGridMetadata,
> = OnyxTableProps & {
  /**
   * Will define which columns and their headers are rendered in which order.
   */
  columns: DataGridRendererColumn<TEntry>[];
  rows: DataGridRendererRow<TEntry, TMetadata>[];
};

/**
 * Describes how a column header is rendered in the data grid.
 */
export type DataGridRendererColumn<TEntry extends DataGridEntry> = {
  /**
   * (Unique) Key of the column - usually a key of the table data.
   * But can also be used for custom columns.
   */
  key: keyof TEntry;
  /**
   * The component that renders the header content and is placed into the `<th>` element.
   */
  component: Component;
  /**
   * Attributes that are bound directly to the `<th>` element of the column.
   */
  thAttributes?: ThHTMLAttributes;
};

/**
 * Describes how a specific row is rendered in the data grid.
 */
export type DataGridRendererRow<
  TEntry extends DataGridEntry,
  TMetadata extends DataGridMetadata = DataGridMetadata,
> = {
  /**
   * Unique id of the row.
   */
  id: PropertyKey;
  /**
   * Describes how a cell in a specific row is rendered in the data grid.
   * Only cells that are defined in the columns will be rendered in the defined order.
   */
  cells: Partial<Record<keyof TEntry, DataGridRendererCell<TEntry, TMetadata>>>;
  /**
   * Attributes that are bound directly to the `<tr>` element of the row.
   */
  trAttributes?: HTMLAttributes;
};

/**
 * Describes how a single cell in a specific row is rendered in the data grid.
 */
export type DataGridRendererCell<
  TEntry extends DataGridEntry,
  TMetadata extends DataGridMetadata = DataGridMetadata,
> = {
  /**
   * The component that renders the actual cell content and is placed into the `<td>` element.
   */
  component: DataGridRendererCellComponent<TEntry, TMetadata>;
  /**
   * Attributes and data that is provided to the component using `v-bind`.
   */
  props: DataGridRendererCellComponentProps<TEntry, TMetadata>;
  /**
   * Attributes that are bound directly to the `<td>` element of the cell.
   */
  tdAttributes?: TdHTMLAttributes;
};

/**
 * Vue component that renders the actual content of a single data grid cell.
 */
export type DataGridRendererCellComponent<
  TEntry extends DataGridEntry,
  TMetadata extends DataGridMetadata = DataGridMetadata,
> = FunctionalComponent<
  WithHTMLAttributes<DataGridRendererCellComponentProps<TEntry, TMetadata>, TdHTMLAttributes>
>;

export type DataGridRendererCellComponentProps<
  TEntry extends DataGridEntry,
  TMetadata extends DataGridMetadata,
> = {
  /**
   * Complete row data.
   */
  row: Readonly<TEntry>;
  /**
   * Cell data that is provided to the component via the `metadata` prop.
   */
  metadata?: TMetadata;
  /**
   * Cell data that is provided to the component via the `modelValue` prop.
   * If the cell renders readonly, this will just be the non-editable value.
   */
  modelValue?: TEntry[keyof TEntry];
};
