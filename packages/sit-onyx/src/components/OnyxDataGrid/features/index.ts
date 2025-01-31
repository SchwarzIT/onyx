import moreHorizontal from "@sit-onyx/icons/more-horizontal.svg?raw";
import { h, type Component, type WatchSource } from "vue";
import type { ComponentSlots } from "vue-component-type-helpers";
import { injectI18n } from "../../../i18n";
import type { OnyxMenuItem } from "../../OnyxNavBar/modules";
import OnyxFlyoutMenu from "../../OnyxNavBar/modules/OnyxFlyoutMenu/OnyxFlyoutMenu.vue";
import OnyxSystemButton from "../../OnyxSystemButton/OnyxSystemButton.vue";
import type { DataGridRendererColumn, DataGridRendererRow } from "../OnyxDataGridRenderer/types";
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
    func: (state: Readonly<TEntry>[]) => unknown;
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
      iconComponent?: Component;
      menuItems: Component<typeof OnyxMenuItem>[];
    }[];
    /**
     * Adds header icon button(s)
     * `iconComponent` of an removeAction is shown after the header label and before the actions. There are always visible in the header
     */
    removeActions?: (column: keyof TEntry) => {
      iconComponent: Component;
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
export function createFeature<
  TEntry extends DataGridEntry,
  TFeatureName extends symbol,
  TArgs extends unknown[],
>(featureDefinition: (...args: TArgs) => DataGridFeature<TEntry, TFeatureName>) {
  return featureDefinition;
}

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
  TEntry extends DataGridEntry,
  // Intersection with the empty array is necessary for TypeScript to infer the array entries as tuple values instead of an array
  // e.g. (Feature1 | Feature2)[] vs. [Feature1, Feature2]
  // The inference of tuple values allows us to create types that are more precise
  T extends DataGridFeature<TEntry, symbol>[] | [],
>(
  features: T,
  t: ReturnType<typeof injectI18n>["t"],
) => {
  const createRendererColumns = (
    columns: (keyof TEntry)[],
  ): DataGridRendererColumn<TEntry, object>[] => {
    const headerFeatures = features.map((feature) => feature.header).filter((header) => !!header);
    const headerActions = headerFeatures
      .map((feature) => feature.actions)
      .filter((actions) => !!actions);
    const headerRemoveActions = headerFeatures
      .map((feature) => feature.removeActions)
      .filter((removeActions) => !!removeActions);
    return columns.map((column) => {
      const actions = headerActions.flatMap((actionFactory) => actionFactory(column));
      const iconComponent = actions.map(({ iconComponent }) => iconComponent);
      const removeActions = headerRemoveActions.flatMap((actionFactory) => actionFactory(column));
      const removeActionIconComponet = removeActions.map(({ iconComponent }) => iconComponent);

      const menuItems = actions.map(({ menuItems }) => menuItems).filter((item) => !!item);

      const flyoutMenu = h(
        OnyxFlyoutMenu,
        {
          label: t.value("navigation.moreActionsFlyout", { column: column.toString() }),
          trigger: "click",
        },
        {
          button: ({ trigger }) =>
            h(OnyxSystemButton, {
              class: actions.length > 1 ? "onyx-system-button--multiple-actions" : "",
              label: t.value("navigation.moreActionsTrigger"),
              color: "medium",
              icon: moreHorizontal,
              ...trigger,
            }),
          options: () => menuItems,
        } satisfies ComponentSlots<typeof OnyxFlyoutMenu>,
      );
      if (actions.length > 1) {
        return {
          key: column,
          component: () =>
            h(
              HeaderCell,
              { label: String(column) },
              { removeActions: () => removeActionIconComponet, actions: () => flyoutMenu },
            ),
          props: {},
        };
      }

      return {
        key: column,
        component: () =>
          h(
            HeaderCell,
            { label: String(column) },
            {
              removeActions: () => removeActionIconComponet,
              actions: () =>
                !iconComponent[0] && menuItems.length > 0 ? flyoutMenu : iconComponent,
            },
          ),
        props: {},
      };
    });
  };

  const createRendererRows = (
    entries: TEntry[],
    columns: (keyof TEntry)[],
  ): DataGridRendererRow<TEntry, DataGridMetadata>[] => {
    const mutations = features.map((f) => f.mutation).filter((m) => !!m);
    let processedEntries = [...entries];
    mutations.forEach(({ func }) => {
      const result = func(processedEntries);
      if (Array.isArray(result)) {
        processedEntries = result;
      }
    });

    return processedEntries.map((entry) => {
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
