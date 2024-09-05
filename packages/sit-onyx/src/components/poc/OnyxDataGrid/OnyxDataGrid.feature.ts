import type { WatchSource } from "vue";
import type {
  CellRenderFunc,
  RenderCell,
  RenderHeader,
  RenderRow,
  TableEntry,
} from "./OnyxDataGridRenderer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyKey = keyof any;

export type ColumnDefinition<TEntry extends TableEntry, TType extends AnyKey> = {
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
type Context<TEntry extends TableEntry> = Map<
  TableFeature<TEntry, AnyKey>["name"],
  Metadata | undefined
>;

type EntryState<TEntry extends TableEntry> = {
  entry: TEntry;
  context: Context<TEntry>;
};

type Order = {
  order: number;
};

export type CellTypeMap<TEntry extends TableEntry, CellTypes extends AnyKey = AnyKey> = Record<
  CellTypes,
  CellRenderFunc<TEntry>
>;

export type TableFeature<
  TEntry extends TableEntry,
  TType extends AnyKey,
  THeaderProps extends object = object,
> = {
  /**
   * Unique name and identifier of the table feature
   */
  name: symbol;

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
    func: (cols: ColumnDefinition<TEntry, TType>[]) => ColumnDefinition<TEntry, TType>[];
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
        featureName: symbol;
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

const MAPPING_SYMBOL = Symbol("MAPPING_SYMBOL");

export const useTableFeatures = <TEntry extends TableEntry, TType extends AnyKey>(
  features: TableFeature<TEntry, TType>[],
) => {
  const enrichColumns = (cols: ColumnDefinition<TEntry, TType>[]) =>
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
    sortedMappings.forEach(({ name, mapFunc }) => context.set(name, mapFunc({ context, entry })));

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
    rawData: TEntry[],
    _columns: ColumnDefinition<TEntry, TType>[],
  ): RenderRow<TEntry>[] => {
    const initialState = rawData.map<EntryState<TEntry>>((entry) => ({
      entry,
      context: new Map(),
    }));

    const state = sortedMutations.reduce(
      (newState, { mapFunc }) => mapFunc(newState),
      initialState,
    );

    const columns = enrichColumns(_columns);

    return state.map(({ entry, context }) => {
      const invertedContext = Array.from(context.entries()).reduce(
        (map, [featureName, featureContext]) => {
          Object.entries(featureContext ?? {}).forEach(([contextName, contextValue]) => {
            if (!contextValue) {
              return map;
            }
            const a = map.get(contextName) ?? [];
            if (a.length === 0) {
              map.set(contextName, a);
            }
            a.push({ featureName, contextValue });
          });
          return map;
        },
        new Map<string, { featureName: symbol; contextValue: unknown }[]>(),
      );

      const reducers =
        features
          .map(({ reducers }) => reducers)
          .reduce((prev, reducers) => ({ ...prev, ...reducers }), {}) ?? {};

      const metaDataEntries: [string, unknown][] = [];
      invertedContext.forEach((context, contextName) =>
        metaDataEntries.push([contextName, reducers[contextName]?.(context)]),
      );
      const metadata = Object.fromEntries(metaDataEntries);

      const cells = columns.reduce(
        (obj, { key, type }) => {
          obj[key] = {
            row: entry,
            value: entry[key],
            metadata,
            is: cellTypesMap[type] ?? (() => String(entry[key])),
          };
          return obj;
        },
        {} as Record<keyof TEntry, RenderCell<TEntry, keyof TEntry, TEntry[keyof TEntry], object>>,
      );

      return { cells, id: entry.id, metadata };
    });
  };
  return { enrichTableData, enrichHeaders, states };
};
