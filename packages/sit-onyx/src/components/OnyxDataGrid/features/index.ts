import moreHorizontal from "@sit-onyx/icons/more-horizontal.svg?raw";
import { computed, h, toValue, type Component, type MaybeRefOrGetter, type WatchSource } from "vue";
import type { ComponentSlots } from "vue-component-type-helpers";
import { type OnyxI18n } from "../../../i18n";
import type { OnyxMenuItem } from "../../OnyxNavBar/modules";
import OnyxFlyoutMenu from "../../OnyxNavBar/modules/OnyxFlyoutMenu/OnyxFlyoutMenu.vue";
import OnyxSystemButton from "../../OnyxSystemButton/OnyxSystemButton.vue";
import type {
  DataGridRendererCell,
  DataGridRendererColumn,
  DataGridRendererRow,
} from "../OnyxDataGridRenderer/types";
import type { DataGridEntry, DataGridMetadata } from "../types";
import { createRenderer } from "./renderer";

/**
 * Function type for modifying the normalized column configuration.
 */
export type ModifyColumns<TEntry extends DataGridEntry> = {
  func: (
    columns: Readonly<NormalizedColumnConfig<TEntry, PropertyKey>[]>,
  ) => NormalizedColumnConfig<TEntry, PropertyKey>[];
};

/**
 * Defines how a specific column type should be rendered.
 */
export type TypeRenderer<TEntry extends DataGridEntry> = {
  header?: Omit<DataGridRendererColumn<TEntry>, "key">;
  cell: Omit<DataGridRendererCell<TEntry>, "props">;
};

/**
 * Maps a "type" key to a column renderer.
 * `symbol` keys are intended for internal/helper columns.
 */
export type TypeRenderMap<TEntry extends DataGridEntry> = Record<PropertyKey, TypeRenderer<TEntry>>;

/**
 * ColumnConfig as it can be defined by the user.
 */
export type ColumnConfig<TEntry extends DataGridEntry, TTypes> =
  | keyof TEntry
  | NormalizedColumnConfig<TEntry, TTypes>;

export type DefaultSupportedTypes = "string" | "number";

/**
 * Normalized column config for internal usage.
 */
export type NormalizedColumnConfig<TEntry extends DataGridEntry, TTypes = PropertyKey> = {
  /**
   * The `key` identifies which property of an `data` entry is used as a value.
   */
  key: keyof TEntry;
  /**
   * The `label` is displayed in the data grid as column header.
   * If not defined, the key is used instead.
   */
  label?: string;
  /**
   * The `type` of the column. It defines how the header and cells of a column is rendered.
   * If not defined the values are displayed as plain strings.
   */
  type?: TTypes | DefaultSupportedTypes;
};

/**
 * Complete Type for a single data grid feature.
 */
export type DataGridFeature<
  TEntry extends DataGridEntry,
  TTypeRenderer extends TypeRenderMap<TEntry>,
  TFeatureName extends symbol,
> = {
  /**
   * Unique name and identifier of the datagrid feature
   */
  name: TFeatureName;

  /**
   * An array of reactive states that should trigger a datagrid re-generation
   */
  watch?: WatchSource[];

  /**
   * Allows modifying the datagrid state as a whole.
   */
  mutation?: {
    func: (state: Readonly<TEntry>[]) => Readonly<TEntry>[] | void;
  };

  /**
   * Defines a renderer for a type.
   */
  typeRenderer?: TTypeRenderer;

  /**
   * Allows modification of the normalized column configuration.
   * While the entries are passed as readonly, but the array itself can be modified.
   * To change entries, you need to clone them first:
   *
   * @example
   * ```ts
   * {
   *   modifyColumns: (config) => configs.map(column => ({ ...column, type: "newType" }));
   * }
   * ```
   */
  modifyColumns?: ModifyColumns<TEntry>;

  /**
   * Allows the modification of the headers.
   */
  header?: {
    /**
     * Adds header icon button(s).
     * `iconComponent` of an action is shown after the header label.
     * The components must be ARIA-conform buttons.
     */
    actions?: (column: NormalizedColumnConfig<TEntry, keyof TTypeRenderer>) => {
      iconComponent?: Component;
      menuItems: Component<typeof OnyxMenuItem>[];
    }[];
    /**
     * Adds header icon button(s)
     * `iconComponent` of an removeAction is shown after the header label and before the actions. There are always visible in the header
     */
    removeActions?: (column: NormalizedColumnConfig<TEntry, keyof TTypeRenderer>) => {
      iconComponent: Component;
    }[];
  };
};

/**
 * Helper function that checks the generics of the DataGridFeature type, without breaking type inference.
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
  // any must be used here, otherwise the type inference breaks
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TArgs extends any[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TFeature extends DataGridFeature<any, any, any>,
  T extends (...args: TArgs) => CheckDataGridFeature<TFeature>,
>(featureDefinition: T) {
  return featureDefinition;
}

type CheckDataGridFeature<T> =
  T extends DataGridFeature<infer A, TypeRenderMap<infer A>, infer C>
    ? DataGridFeature<A, TypeRenderMap<A>, C>
    : never;

export type UseDataGridFeaturesOptions<TEntry extends DataGridEntry> = {
  columnConfig: MaybeRefOrGetter<ColumnConfig<TEntry, PropertyKey>[]>;
  i18n: OnyxI18n;
};

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
  TFeatureName extends symbol,
  TTypeRenderer extends TypeRenderMap<TEntry>,
  // Intersection with the empty array is necessary for TypeScript to infer the array entries as tuple values instead of an array
  // e.g. (Feature1 | Feature2)[] vs. [Feature1, Feature2]
  // The inference of tuple values allows us to create types that are more precise
  T extends DataGridFeature<TEntry, TTypeRenderer, TFeatureName>[] | [],
>(
  features: T,
  { i18n, columnConfig }: UseDataGridFeaturesOptions<TEntry>,
) => {
  const columns = computed(() => {
    const normalized = toValue(columnConfig).map((c) => (typeof c !== "object" ? { key: c } : c));
    return features
      .flatMap(({ modifyColumns }) => modifyColumns)
      .reduce((last, m) => (m?.func ? m.func(last) : last), normalized);
  });

  const renderer = computed(() => createRenderer(features));

  const createRendererColumns = (): DataGridRendererColumn<TEntry>[] => {
    const headerFeatures = features.map((feature) => feature.header).filter((header) => !!header);
    const headerActions = headerFeatures
      .map((feature) => feature.actions)
      .filter((actions) => !!actions);
    const headerRemoveActions = headerFeatures
      .map((feature) => feature.removeActions)
      .filter((removeActions) => !!removeActions);
    return columns.value.map<DataGridRendererColumn<TEntry>>((column) => {
      const header = getRendererFor("header", column.type);
      const label = column.label?.trim() ?? String(column.key);
      const actions = headerActions.flatMap((actionFactory) => actionFactory(column));
      const removeActions = headerRemoveActions.flatMap((actionFactory) => actionFactory(column));
      const removeActionIconComponet = removeActions.map(({ iconComponent }) => iconComponent);
      const menuItems = actions.map(({ menuItems }) => menuItems).filter((item) => !!item);

      const flyoutMenu = h(
        OnyxFlyoutMenu,
        {
          label: t.value("navigation.moreActionsFlyout", { column: label }),
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
          ...header,
          key: column.key,
          component: () =>
            h(
              header.component,
              { label },
              { removeActions: () => removeActionIconComponet, actions: () => flyoutMenu },
            ),
        };
      }
      const iconComponent = actions.map(({ iconComponent }) => iconComponent);

      return {
        ...header,
        key: column.key,
        component: () =>
          h(
            header.component,
            { label },
            {
              removeActions: () => removeActionIconComponet,
              actions: () =>
                !iconComponent[0] && menuItems.length > 0 ? flyoutMenu : iconComponent,
            },
          ),
      };
    });
  };

  const createRendererRows = (
    entries: TEntry[],
  ): DataGridRendererRow<TEntry, DataGridMetadata>[] => {
    const mutations = features.map((f) => f.mutation).filter((m) => !!m);

    let shallowCopy = [...entries];
    mutations.forEach(({ func }) => {
      const result = func(shallowCopy);
      if (result) {
        shallowCopy = result as TEntry[];
      }
    });
    return shallowCopy.map((entry) => {
      const cells = columns.value.reduce<DataGridRendererRow<TEntry, DataGridMetadata>["cells"]>(
        (cells, { key, type }) => {
          cells[key] = {
            ...renderer.value.getFor("cell", type),
            props: { row: entry, modelValue: entry[key] },
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

  const watchSources: WatchSource[] = features.flatMap((f) => f.watch ?? []);

  return {
    /** Takes the column definition and maps all, calls mutation func and maps at the end to RendererCell */
    createRendererRows,
    /** Takes the column definition and creates a RenderHeader for each, adds actions from features */
    createRendererColumns,
    // the combined `watch` for all features
    watchSources,
  };
};
