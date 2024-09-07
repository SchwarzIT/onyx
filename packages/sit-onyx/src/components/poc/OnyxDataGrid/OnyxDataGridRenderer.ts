import type { FunctionalComponent, HTMLAttributes, TdHTMLAttributes } from "vue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyKey = keyof any;

export type TableEntry = {
  id: string | number;
  [key: AnyKey]: unknown;
};

export type CellRenderFunc<
  TEntry extends TableEntry,
  TMetadata extends object = object,
> = FunctionalComponent<RenderCellProps<TEntry, TMetadata>>;

/**
 * Props of the TableRenderLayer
 */
export type RendererProps<TEntry extends TableEntry, TMetadata extends object> = {
  theadProps?: HTMLAttributes;
  tbodyProps?: HTMLAttributes;
  columns: RenderHeader<TEntry>[];
  rows: RenderRow<TEntry, TMetadata>[];
};

export type RenderHeader<
  TEntry extends TableEntry,
  TKey extends keyof TEntry = keyof TEntry,
  TProps extends object = object,
> = {
  /**
   * Key of the column - usually a key of the tabledata.
   * But can also be used for custom columns.
   */
  key: TKey;
  /**
   * Attributes and data that is provided to the component using `v-bind`.
   */
  headerProps: HTMLAttributes & TProps;
  /**
   * The component that renders the header content.
   */
  header: FunctionalComponent<TProps>;
};

export type RenderRow<TEntry extends TableEntry, TMetadata extends object> = {
  /**
   * Unique id of the row.
   */
  id: TableEntry["id"];
  trProps?: HTMLAttributes;
  cells: Record<keyof TEntry, RenderCell<TEntry, TMetadata>>;
};

export type RenderCell<TEntry extends TableEntry, TMetadata extends object> = {
  props: RenderCellProps<TEntry, TMetadata>;
  tdProps?: TdHTMLAttributes;
  /**
   * The component that renders the actual cell content.
   */
  is: CellRenderFunc<TEntry, TMetadata>;
};

export type RenderCellProps<TEntry extends TableEntry, TMetadata extends object> = {
  /**
   * Complete row data
   */
  row: TEntry;
  /**
   * Data that is provided to the component via the `metadata` prop
   */
  metadata?: TMetadata;
  /**
   * table data that is provided to the component via the `metadata` prop
   */
  value: TEntry[keyof TEntry];
};
