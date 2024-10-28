import { h, type Component, type WatchSource } from "vue";
import type { DataGridRendererColumn, DataGridRendererRow } from "../../..";
import type { DataGridEntry } from "../types";

export type TableFeature<TEntry extends DataGridEntry, TFeatureName extends symbol> = {
  /**
   * Unique name and identifier of the table feature
   */
  name: TFeatureName;

  /**
   * An array of reactive states that should trigger a table re-generation
   */
  watch: WatchSource[];

  /**
   * Allows modifying the table state as a whole.
   */
  mutation?: {
    func: (state: TEntry[]) => void;
  };

  /**
   * Allows the modification of the headers.
   */
  header?: {
    /**
     * Adds header icon button(s).
     * `iconComponent` of an action is shown after the header label.
     * The components must be ARIA-conform buttons.
     */
    actions?: (column: keyof TEntry) => {
      iconComponent: Component;
      listComponent?: never;
    }[];
  };
};

/**
 * Helper function that infers the generics of the TableFeature type.
 * @example
 * ```ts
 *
 * const MY_FEATURE = Symbol("TABLE_HEADER_BUTTON");
 * export const useTableHeaderButton = createFeature(<TEntry extends DataGridEntry>() => {
 *   return {
 *     name: MY_FEATURE,
 *     header: {
 *       actions: (column) => [
 *         {
 *           iconComponent: h('button', { onClick: (column) => console.log(`Clicked on ${column}`) },),
 *         },
 *       ],
 *     },
 *   };
 * });
 * ```
 */
export const createFeature = <TFeatureName extends symbol, TArgs extends unknown[]>(
  featureDefinition: <TEntry extends DataGridEntry>(
    ...args: TArgs
  ) => TableFeature<TEntry, TFeatureName>,
) => featureDefinition;

type ExtractTEntry<T> = T extends TableFeature<infer I, symbol>[] ? I : never;

/**
 * Uses the defined table features to provide factory functions.
 * These factories are to be used to map data and configuration to `OnyxDataGridRenderer` properties.
 * The properties are then used to render the data grid.
 *
 * Make use of the `watchSources` to trigger re-rendering when state changes occur.
 * @example
 * ```vue
 * <script setup lang="ts">
 * // ...
 * // imports, props, emits, etc.
 * const withHeaderButton = useTableHeaderButton<TEntry>();
 *
 * const { watchSources, createRendererRows, createRendererColumns } = useTableFeatures([withSorting]);
 *
 * const renderCols: Ref<DataGridRendererColumn<TEntry, object>[]> = ref([]);
 * const renderRows: Ref<DataGridRendererRow<TEntry, DataGridMetadata>[]> = ref([]);
 *
 * const { columns, data } = toRefs(props);
 *
 * watch(
 *   [columns, data, ...watchSources],
 *   ([newColumns, newData]) => {
 *     renderCols.value = createRendererColumns(newColumns);
 *     renderRows.value = createRendererRows(newData, newColumns);
 *   },
 *   { immediate: true },
 * );
 * </script>
 * <template>
 *   <OnyxDataGridRenderer :columns="renderCols" :rows="renderRows" />
 * </template>
 * ```
 */
export const useTableFeatures = <
  T extends TableFeature<TEntry, symbol>[] | [],
  TEntry extends DataGridEntry = ExtractTEntry<T>,
>(
  features: T,
) => {
  const createRendererColumns = (columns: string[]): DataGridRendererColumn<TEntry, object>[] => {
    const headerFeatures = features.map((feature) => feature.header).filter((header) => !!header);
    const headerActions = headerFeatures
      .map((feature) => feature.actions)
      .filter((actions) => !!actions);

    return columns.map((column) => {
      const iconActions = headerActions
        .flatMap((actionFactory) => actionFactory(column))
        .map(({ iconComponent }) => iconComponent);

      return {
        key: column,
        component: () =>
          h("div", { class: getBemClass("header-cell") }, [
            column,
            ...iconActions.map((a) => h(a)),
          ]),
        props: {},
      };
    });
  };

  const createRendererRows = (
    entries: TEntry[],
    columns: (keyof TEntry)[],
  ): DataGridRendererRow<TEntry, Record<string, unknown>>[] => {
    const mutations = features.map((f) => f.mutation).filter((m) => !!m);
    const shallowCopy = [...entries];
    mutations.forEach(({ func }) => func(shallowCopy));

    return shallowCopy.map((entry) => {
      const cells = columns.reduce<DataGridRendererRow<TEntry, Record<string, unknown>>["cells"]>(
        (cells, column) => {
          cells[column] = {
            component: () => entry[column],
            props: { row: entry },
          };
          return cells;
        },
        {},
      );
      return {
        id: entry.id,
        cells,
      };
    });
  };

  const watchSources: WatchSource[] = features.flatMap((f) => f.watch);

  return {
    /** Takes the column definition and maps all, calls mutation func and maps at the end to RendererCell */
    createRendererRows,
    /** Takes the column definition and creates a RenderHeader for each, adds actions from features */
    createRendererColumns,
    // the combined `watch` for all features
    watchSources,
  };
};

type BemClasses = [{ block: "header-cell"; element: [] }];

/**
 * Used as a single source of truth for the OnyxDataGrid BEM classes.
 */
const getBemClass = <T extends BemClasses[number]>(
  block: T["block"],
  element?: T["element"][number],
) => `onyx-data-grid-${block}` + (element ? `__${element}` : "");
