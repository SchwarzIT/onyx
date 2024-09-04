import type { FunctionalComponent, HTMLAttributes } from "vue";

export type TableEntry = {
  id: string | number;
  [key: keyof any]: unknown;
};

export type CellRenderFunc<
  TEntry extends TableEntry,
  CellData extends unknown = unknown,
  Metadata extends object = object,
> = FunctionalComponent<{ value: CellData; row: TEntry; metadata?: Metadata }>;

/**
 * Props of the TableRenderLayer
 */
export type RendererProps<TEntry extends TableEntry> = {
  columns: RenderHeader<TEntry>[];
  rows: RenderRow<TEntry>[];
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

export type RenderCell<
  TEntry extends TableEntry,
  Key extends keyof TEntry,
  CellData = TEntry[Key],
  Metadata = object,
> = {
  /**
   * Complete row data
   */
  row: TEntry;
  /**
   * Data that is provided to the component via the `metadata` prop
   */
  metadata?: Metadata;
  /**
   * table data that is provided to the component via the `metadata` prop
   */
  value: CellData;
  /**
   * The component that renders the actual cell content.
   */
  is: CellRenderFunc<TEntry>;
};

export type RenderRow<TEntry extends TableEntry> = {
  /**
   * Unique id of the row.
   */
  id: TableEntry["id"];
  /**
   * Data that is provided to the row component using via the `metadata` prop
   */
  metadata?: object;
  cells: Record<keyof TEntry, RenderCell<TEntry, keyof TEntry>>;
};
