import { h, type Component, type WatchSource } from "vue";
import type { DataGridRendererColumn, DataGridRendererRow } from "../../..";
import type { DataGridEntry, DataGridMetadata } from "../types";
import HeaderCell from "./HeaderCell.vue";

export type DataGridFeature<TEntry extends DataGridEntry, TFeatureName extends symbol> = {
  /**
   * Unique name and identifier of the datagrid feature
   */
  name: TFeatureName;

  /**
   * An array of reactive states that should trigger a datagrid re-generation
   */
  watch: WatchSource[];

  /**
   * Allows modifying the datagrid state as a whole.
   */
  mutation?: {
    func: (state: Readonly<TEntry>[]) => void;
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
 * Helper function that infers the generics of the DataGridFeature type.
 * @example
 * ```ts
 *
 * const MY_FEATURE = Symbol("TABLE_HEADER_BUTTON");
 * export const useDataGridHeaderButton = createFeature(<TEntry extends DataGridEntry>() => {
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
  ) => DataGridFeature<TEntry, TFeatureName>,
) => featureDefinition;

type ExtractTEntry<T> = T extends DataGridFeature<infer I, symbol>[] ? I : never;

/**
 * Uses the defined datagrid features to provide factory functions.
 * These factories are to be used to map data and configuration to `OnyxDataGridRenderer` properties.
 * The properties are then used to render the data grid.
 *
 * Make use of the `watchSources` to trigger re-rendering when state changes occur.
 * @example
 * ```vue
 * <script setup lang="ts">
 * // ...
 * // imports, props, emits, etc.
 * const withHeaderButton = useDataGridHeaderButton<TEntry>();
 *
 * const { watchSources, createRendererRows, createRendererColumns } = useDataGridFeatures([withHeaderButton]);
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
export const useDataGridFeatures = <
  // Intersection with the empty array is necessary for TypeScript to infer the array entries as tuple values instead of an array
  // e.g. (Feature1 | Feature2)[] vs. [Feature1, Feature2]
  // The inference of tuple values allows us to create types that are more precise
  T extends DataGridFeature<TEntry, symbol>[] | [],
  TEntry extends DataGridEntry = ExtractTEntry<T>,
>(
  features: T,
) => {
  const createRendererColumns = (
    columns: (keyof TEntry)[],
  ): DataGridRendererColumn<TEntry, object>[] => {
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
        component: () => h(HeaderCell, { label: String(column) }, { actions: iconActions }),
        props: {},
      };
    });
  };

  const createRendererRows = (
    entries: TEntry[],
    columns: (keyof TEntry)[],
  ): DataGridRendererRow<TEntry, DataGridMetadata>[] => {
    const mutations = features.map((f) => f.mutation).filter((m) => !!m);
    const shallowCopy = [...entries];
    mutations.forEach(({ func }) => func(shallowCopy));

    return shallowCopy.map((entry) => {
      const cells = columns.reduce<DataGridRendererRow<TEntry, DataGridMetadata>["cells"]>(
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
