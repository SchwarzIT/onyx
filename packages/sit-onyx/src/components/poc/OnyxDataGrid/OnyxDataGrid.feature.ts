import type { RenderColumn, RenderRow, TableEntry } from "./OnyxDataGridRenderer";

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

type TableFeature<TEntry extends TableEntry> = {
  name: string | symbol;

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

  /**
   * Allows the modification of the header columns before render.
   */
  modifyColumns?: {
    func: (cols: RenderColumn<TEntry>[]) => RenderColumn<TEntry>[];
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

const MAPPING_SYMBOL = Symbol("MAPPING_SYMBOL");

export const useTableFeatures = <TEntry extends TableEntry>(features: TableFeature<TEntry>[]) => {
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

  const enrichTableData = (userData: TEntry[]): RenderRow<TEntry>[] => {
    const state = userData.map((entry) => ({ entry, context: {} })) as EntryState<TEntry>[];
    sortedMutations.forEach(({ mapFunc }) => mapFunc(state));

    return state.map(({ entry, context }) => {
      const invertedContext = Object.entries(context).reduce(
        (agg, [featureName, featureContext]) => {
          Object.entries(featureContext ?? {}).forEach(([contextName, contextValue]) => {
            if (!contextValue) {
              return agg;
            }
            let a = agg[contextName];
            if (!a) {
              a = agg[contextName] = [];
            }
            a.push({ featureName, contextValue });
          });
          return agg;
        },
        {} as Record<string, { featureName: string; contextValue: unknown }[] | undefined>,
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
        Object.entries(entry).map(([name, value]) => [
          name,
          { key: name, value: value as TEntry[keyof TEntry], metadata, cell: () => `${value}` },
        ]),
      );

      return { cells, id: entry.id, metadata };
    });
  };
  return { enrichTableData };
};
