import type { FunctionalComponent, HTMLAttributes } from "vue";

export type TableEntry = {
  id: string | number;
  [key: string]: unknown;
};

/**
 * Props of the TableRenderLayer
 */
export type RendererProps<TEntry extends TableEntry> = {
  columns: RenderColumn<TEntry>[];
  rows: RenderRow<TEntry>[];
};

export type RenderColumn<
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
  TableEntry extends object,
  Key extends keyof TableEntry = keyof TableEntry,
  CellData extends TableEntry[Key] = TableEntry[Key],
> = {
  /**
   * Key of the column - usually a key of the tabledata.
   * But can also be used for custom columns.
   */
  key: Key;
  /**
   * Data that is provided to the component via the `metadata` prop
   */
  metadata?: object;
  /**
   * table data that is provided to the component via the `metadata` prop
   */
  value: CellData;
  /**
   * The component that renders the actual cell content.
   */
  cell: FunctionalComponent;
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
  cells: Record<string, RenderCell<TEntry>>;
};
