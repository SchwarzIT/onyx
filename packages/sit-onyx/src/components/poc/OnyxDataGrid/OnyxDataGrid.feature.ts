import type { WatchSource } from "vue";
import type { CellRenderFunc, RenderHeader, RenderRow, TableEntry } from "./OnyxDataGridRenderer";

export type ColumnDefinition<TEntry extends TableEntry, TType extends keyof any> = {
  key: keyof TEntry;
  type: TType;
};

/**
 * keeps track of all changes by every feature for a single row
 *
 * @example type {
 *   filtering?: Metadata;
 *   deletion?: Metadata;
 *   creation?: Metadata;
 *   editing?: Metadata;
 * }
 *
 * @example content {
 *   filtering: { hidden: true };
 *   addition: { hidden: false };
 *   editing: { edits: { fruit: "apple" }, hasChanges: { fruit: true } };
 * }
 *
 */
type Context<TEntry extends TableEntry> = Record<
  TableFeature<TEntry>["name"],
  Metadata | undefined
>;

type EntryState<TEntry extends TableEntry> = {
  entry: TEntry;
  context: Context<TEntry>;
};

type Order = {
  order: number;
};

export type CellTypeMap<
  TEntry extends TableEntry,
  CellTypes extends keyof any = keyof any,
> = Record<CellTypes, CellRenderFunc<TEntry>>;

export type TableFeature<TEntry extends TableEntry, THeaderProps extends object = object> = {
  /**
   * Unique name and identifier of the table feature
   */
  name: string;

  /**
   * An array of reactive states that should trigger a table re-render
   */
  state: WatchSource[];

  /**
   * Allows to add context to table rows.
   */
  mapping?: {
    /**
     * The returned metadata is added (if not undefined) to the context object with the table feature name as key.
     */
    func: (ctx: { entry: Readonly<TEntry>; context: Context<TEntry> }) => Metadata | undefined;
  } & Order;

  /**
   * Allows modifying the table state as a whole.
   */
  mutation?: {
    func: (state: EntryState<TEntry>[]) => EntryState<TEntry>[];
  } & Order;

  modifyTypes?: {
    func: (types: CellTypeMap<TEntry>) => CellTypeMap<TEntry>;
  } & Order;

  modifyColumns?: {
    func: (cols: ColumnDefinition<TEntry, any>[]) => ColumnDefinition<TEntry, any>[];
  } & Order;

  /**
   * Allows the modification of the header columns before render.
   */
  modifyHeaders?: {
    func: (
      headers: RenderHeader<TEntry, keyof TEntry, THeaderProps>[],
    ) => RenderHeader<TEntry, keyof TEntry, THeaderProps>[];
  } & Order;

  /**
   * Define how a specific metadata entry of a row is mapped.
   * @default Depends on the metadata key. Usually uses the first non-nullable entry.
   */
  reducers?: Record<
    keyof Metadata,
    (
      context: {
        featureName: string;
        contextValue: unknown;
      }[],
    ) => unknown
  >;
};

/**
 * Metadata that is passed to the row as render information.
 * @example
 * ```ts
 * {
 *   hidden?: boolean;
 *   virtual?: boolean;
 *   created?: boolean;
 *   edit?: TValue;
 * }
 * ```
 */
type Metadata = Record<string, unknown>;

const MAPPING_SYMBOL = "MAPPING_SYMBOL";

export const useTableFeatures = <TEntry extends TableEntry, TTypes extends keyof any>(
  features: TableFeature<TEntry>[],
) => {
  const enrichColumns = (cols: ColumnDefinition<TEntry, TTypes>[]) =>
    features
      .map((f) => f.modifyColumns!)
      .filter(Boolean)
      .sort((a, b) => a.order - b.order)
      .reduce((_cols, { func }) => func(cols), cols);

  const cellTypesMap = features
    .map((f) => f.modifyTypes!)
    .filter(Boolean)
    .sort((a, b) => a.order - b.order)
    .reduce(
      (_cellTypesMap, { func }) => func(_cellTypesMap),
      {} as CellTypeMap<TEntry, string | number | symbol>,
    );

  const enrichHeaders = (headers: RenderHeader<TEntry>[]): RenderHeader<TEntry>[] =>
    features
      .map((f) => f.modifyHeaders!)
      .filter(Boolean)
      .sort((a, b) => a.order - b.order)
      .reduce((_cols, { func }) => func(_cols), headers);

  const sortedMappings = features
    .filter((e) => e.mapping?.func)
    .map(({ name, mapping }) => ({ name, mapFunc: mapping!.func, order: mapping!.order }))
    .sort((a, b) => a.order - b.order);

  const mapping = (entry: TEntry, context: Context<TEntry>) =>
    sortedMappings.forEach(({ name, mapFunc }) => (context[name] = mapFunc({ context, entry })));

  const sortedMutations = features
    .filter((e) => e.mutation?.func)
    .map(({ name, mutation }) => ({ name, mapFunc: mutation!.func, order: mutation!.order }))
    .concat([
      {
        name: MAPPING_SYMBOL,
        mapFunc: (state) => {
          state.forEach(({ entry, context }) => mapping(entry, context));
          return state;
        },
        order: 10,
      },
    ])
    .sort((a, b) => a.order - b.order);

  const states = features.flatMap(({ state }) => state).filter(Boolean);

  const enrichTableData = (
    _userData: TEntry[],
    _columns: ColumnDefinition<TEntry, any>[],
  ): RenderRow<TEntry>[] => {
    const userData = _userData.map((entry) => ({ entry, context: {} })) as EntryState<TEntry>[];
    const state = sortedMutations.reduce((newState, { mapFunc }) => mapFunc(newState), userData);
    const columns = enrichColumns(_columns);

    return state.map(({ entry, context }) => {
      const invertedContext = Object.entries(context).reduce(
        (agg, [featureName, featureContext]) => {
          Object.entries(featureContext ?? {}).forEach(
            ([contextName, contextValue]: [keyof TEntry, unknown]) => {
              if (!contextValue) {
                return agg;
              }
              let a = agg[contextName];
              if (!a) {
                a = agg[contextName] = [];
              }
              a.push({ featureName, contextValue });
            },
          );
          return agg;
        },
        {} as Record<keyof TEntry, { featureName: string; contextValue: unknown }[] | undefined>,
      );

      const reducers =
        features
          .map(({ reducers }) => reducers)
          .reduce((prev, reducers) => ({ ...prev, ...reducers }), {}) ?? {};

      const metadata = Object.fromEntries(
        Object.entries(invertedContext).map(([contextName, context]) => [
          contextName,
          reducers[contextName]?.(context ?? []),
        ]),
      );

      const cells = Object.fromEntries(
        columns.map(({ key, type }) => [
          key,
          {
            row: entry,
            value: entry[key],
            metadata,
            is: cellTypesMap[type] ?? (() => String(entry[key])),
          },
        ]),
      );

      return { cells, id: entry.id, metadata };
    }) as any;
  };
  return { enrichTableData, enrichHeaders, states };
};
