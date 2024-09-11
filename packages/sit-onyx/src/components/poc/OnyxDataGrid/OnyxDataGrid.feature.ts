/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  mergeProps,
  type Component,
  type FunctionalComponent,
  type HTMLAttributes,
  type WatchSource,
} from "vue";
import type { Merge } from "../../../types/typing";
import type {
  CellRenderFunc,
  Metadata,
  RenderCell,
  RenderCellProps,
  RenderHeader,
  RenderRow,
  TableEntry,
} from "./OnyxDataGridRenderer";

export type NativeProps<
  TAttributes extends HTMLAttributes = HTMLAttributes,
  Props = { [key: string]: unknown },
> = TAttributes & Props;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyKey = keyof any;

export type ColumnDefinition<TEntry extends TableEntry, TType extends AnyKey> = {
  key: keyof TEntry;
  type: TType;
};

type EntryState<TEntry extends TableEntry, TContextData extends Context> = {
  entry: Readonly<TEntry>;
  context: TContextData;
};

type Order = {
  order: number;
};

export type CellTypeMap<
  TEntry extends TableEntry,
  TCellProps extends Metadata,
  CellTypes extends AnyKey = AnyKey,
> = Record<CellTypes, CellRenderFunc<TEntry, TCellProps>>;

export type TableFeature<
  TEntry extends TableEntry,
  TType extends AnyKey,
  TFeatureName extends symbol,
  TContextData extends Partial<Context> = Context,
  TCellProps extends Metadata = Metadata,
  THeaderProps extends object = object,
> = {
  /**
   * Unique name and identifier of the table feature
   */
  name: TFeatureName;

  /**
   * An array of reactive states that should trigger a table re-render
   */
  state: WatchSource[];

  /**
   * Allows to add context to table rows.
   */
  mapping?: {
    /**
     * context must be edited
     */
    func: (ctx: { entry: Readonly<TEntry>; context: TContextData }) => undefined;
  } & Order;

  /**
   * Allows modifying the table state as a whole.
   * TODO: global context and reducer
   */
  mutation?: {
    func: (state: EntryState<TEntry, TContextData>[]) => EntryState<TEntry, TContextData>[];
  } & Order;

  modifyTypes?: {
    func: (types: CellTypeMap<TEntry, TCellProps>) => CellTypeMap<TEntry, TCellProps>;
  } & Order;

  modifyColumns?: {
    func: (cols: ColumnDefinition<TEntry, TType>[]) => ColumnDefinition<TEntry, TType>[];
  } & Order;

  theadProps?: NativeProps<HTMLAttributes>;
  tbodyProps?: NativeProps<HTMLAttributes>;
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
  reducers?: Reducers<TEntry, TContextData, TCellProps>;

  after?: Component;
};

type ReducerInput<
  TEntry extends TableEntry,
  TContextData extends Context,
  TMetaKey extends keyof TContextData = keyof TContextData,
> = {
  contextName: TMetaKey;
  contextValue: TContextData[TMetaKey];
  entry: TEntry;
  id: string | number;
};

type Wrapper<TEntry extends TableEntry, TCellProps extends Metadata> = FunctionalComponent<
  RenderCellProps<TEntry, TCellProps>,
  Record<string, never>,
  { default: Wrapper<TEntry, TCellProps> }
>;

type ReducerResult<TEntry extends TableEntry, TCellProps extends Metadata> = Partial<
  Omit<RenderRow<TEntry, TCellProps>, "id" | "cells">
> & { id?: never } & {
  cells?: Record<
    keyof TEntry,
    Pick<RenderCell<TEntry, TCellProps>, "props" | "tdProps"> & {
      wrap?: Wrapper<TEntry, TCellProps>;
    }
  >;
};

type Reducer<
  TEntry extends TableEntry,
  TContextData extends Context,
  TCellProps extends Metadata,
> = (input: ReducerInput<TEntry, TContextData>) => ReducerResult<TEntry, TCellProps> | undefined;

type Reducers<
  TEntry extends TableEntry,
  TContextData extends Context,
  TCellProps extends Metadata,
> = Record<keyof TContextData, Reducer<TEntry, TContextData, TCellProps>>;

/**
 * Context that is reduced to row data
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
type Context = Record<string, unknown>;

const MAPPING_SYMBOL = Symbol("MAPPING_SYMBOL");

type BUILTIN_SYMBOLS = typeof MAPPING_SYMBOL;

const ensurePropsMerge = <T extends object>(obj: T, key: keyof T, toMerge: Partial<T>) => {
  if (!toMerge[key] && !obj[key]) {
    return;
  }
  if (toMerge[key] && obj[key]) {
    obj[key] = mergeProps(obj[key], toMerge[key]) as T[keyof T];
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj[key] = (obj[key] ?? toMerge[key]) as any;
};

type ExtractTEntry<T> = T extends TableFeature<infer I, any, any, any, any, any>[] ? I : never;
type ExtractTType<T> = T extends TableFeature<any, infer I, any, any, any, any>[] ? I : never;
type ExtractTFeatureName<T> = T extends TableFeature<any, any, infer I, any, any, any>[]
  ? I
  : never;
type ExtractTContext<T> = T extends TableFeature<any, any, any, infer I, any, any> ? I : never;
type ExtractTCellProps<T> = T extends TableFeature<any, any, any, any, infer I, any>[] ? I : never;

type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;

export const useTableFeatures = <
  T extends TableFeature<any, any, any, any, any, any>[] | [],
  TContext extends Context = Merge<Flatten<{ [P in keyof T]: ExtractTContext<T[P]> }>>,
  TCellProps extends Metadata = Merge<Flatten<{ [P in keyof T]: ExtractTCellProps<T[P]> }>>,
  TEntry extends TableEntry = ExtractTEntry<T>,
  TType extends AnyKey = ExtractTType<T>,
  TFeatureName extends symbol = ExtractTFeatureName<T>,
>(
  features: T,
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
      {} as CellTypeMap<TEntry, TCellProps>,
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

  const mapping = (entry: TEntry, context: TContext) =>
    sortedMappings.forEach(({ mapFunc }) => mapFunc({ context, entry }));

  const sortedMutations = features
    .filter((e) => e.mutation?.func)
    .map(({ name, mutation }) => ({
      name: name as TFeatureName | BUILTIN_SYMBOLS,
      func: mutation!.func,
      order: mutation!.order,
    }))
    .concat([
      {
        name: MAPPING_SYMBOL,
        func: (state) => {
          state.forEach((entryState) => mapping(entryState.entry, entryState.context));
          return state;
        },
        order: 10,
      },
    ])
    .sort((a, b) => a.order - b.order);

  const states = features.flatMap(({ state }) => state).filter(Boolean);

  const afters = features.flatMap(({ after }) => after).filter(Boolean);
  console.log("🚀 ~ afters:", afters);

  const enrichTableData = (
    rawData: TEntry[],
    _columns: ColumnDefinition<TEntry, TType>[],
  ): RenderRow<TEntry, TCellProps>[] => {
    const initialState = rawData.map((entry) => ({
      entry: Object.freeze(entry),
      context: {} as TContext,
    }));

    const state = sortedMutations.reduce((newState, { func }) => func(newState), initialState);

    const columns = enrichColumns(_columns);

    const reducers = (features
      .map(({ reducers }) => reducers)
      .reduce((prev, reducers) => ({ ...prev, ...reducers }), {}) ?? {}) as Record<
      keyof TContext,
      Reducer<TEntry, TContext, TCellProps>
    >;

    return state.map(({ entry, context }) => {
      const cells = columns.reduce(
        (obj, { key, type }) => {
          obj[key] = {
            props: {
              row: entry,
              value: entry[key],
              metadata: {} as TCellProps,
            },
            is: cellTypesMap[type] ?? (() => String(entry[key])),
          };
          return obj;
        },
        {} as Record<keyof TEntry, RenderCell<TEntry, TCellProps>>,
      );

      return Object.entries(context)
        .map((contextEntry) => {
          const contextName = contextEntry[0] as keyof TContext;
          const contextValue = contextEntry[0] as TContext[keyof TContext];
          return reducers[contextName]?.({ contextName, contextValue, entry, id: entry.id });
        })
        .reduce(
          (row, result) => {
            if (!result) {
              return row;
            }
            if (result.trProps) {
              row.trProps = mergeProps(row.trProps, result.trProps as Record<string, unknown>);
            }
            if (result.cells) {
              Object.entries(result.cells).forEach(([key, cell]) => {
                const rowCells = row.cells[key];
                if (!rowCells) {
                  return;
                }
                if (cell) {
                  ensurePropsMerge(rowCells, "props", cell);
                  ensurePropsMerge(rowCells, "tdProps", cell);
                }
                if (cell.wrap) {
                  rowCells.is = ((props, ctx) =>
                    cell.wrap!(props, {
                      attrs: {},
                      emit: () => {},
                      slots: { default: () => rowCells.is(props, ctx) },
                    })) satisfies CellRenderFunc<TEntry, TCellProps>;
                }
              });
            }
            return row;
          },
          { id: entry.id, cells, trProps: {} } satisfies RenderRow<TEntry, TCellProps>,
        );
    });
  };

  const provideRootProps = () => {
    return {
      tbodyProps: mergeProps(
        ...features.map((f) => f.tbodyProps!).filter((props) => Boolean(props)),
      ),
      theadProps: mergeProps(
        ...features.map((f) => f.theadProps!).filter((props) => Boolean(props)),
      ),
    };
  };

  return {
    enrichTableData,
    enrichHeaders,
    provideRootProps,
    afters,
    states,
  };
};
