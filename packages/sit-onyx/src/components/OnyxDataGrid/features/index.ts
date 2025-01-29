import moreHorizontal from "@sit-onyx/icons/more-horizontal.svg?raw";
import { computed, h, toValue, type Component, type MaybeRefOrGetter, type WatchSource } from "vue";
import type { ComponentSlots } from "vue-component-type-helpers";
import { injectI18n } from "../../../i18n";
import { allObjectEntries } from "../../../utils/objects";
import type { OnyxMenuItem } from "../../OnyxNavBar/modules";
import OnyxFlyoutMenu from "../../OnyxNavBar/modules/OnyxFlyoutMenu/OnyxFlyoutMenu.vue";
import OnyxSystemButton from "../../OnyxSystemButton/OnyxSystemButton.vue";
import type {
  DataGridRendererCellComponent,
  DataGridRendererColumn,
  DataGridRendererRow,
} from "../OnyxDataGridRenderer/types";
import type { DataGridEntry, DataGridMetadata } from "../types";
import HeaderCell from "./HeaderCell.vue";

export type ModifyColumns<TEntry extends DataGridEntry> = {
  func: (
    columns: Readonly<NormalizedColumnConfig<TEntry, PropertyKey>[]>,
  ) => NormalizedColumnConfig<TEntry, PropertyKey>[];
};

export type TypeRenderer<TEntry extends DataGridEntry> = {
  header?: Component;
  cell: DataGridRendererCellComponent<TEntry>;
};

export type TypeRenderMap<TEntry extends DataGridEntry> = Record<PropertyKey, TypeRenderer<TEntry>>;

/**
 * Normalized config for internal usage
 */
export type NormalizedColumnConfig<TEntry extends DataGridEntry, TTypes> = {
  key: keyof TEntry;
  type?: TTypes;
};

/**
 * ColumnConfig for the enduser
 */
export type ColumnConfig<TEntry extends DataGridEntry, TTypes> =
  | keyof TEntry
  | NormalizedColumnConfig<TEntry, TTypes>;

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
  watch: WatchSource[];

  /**
   * Allows modifying the datagrid state as a whole.
   */
  mutation?: {
    func: (state: Readonly<TEntry>[]) => void;
  };

  /**
   * Defines a renderer for a type.
   */
  typeRenderer?: TTypeRenderer;

  /**
   * Allows modifying of the column configuration.
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
      iconComponent: Component;
      menuItems: Component<typeof OnyxMenuItem>[];
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
  TTypeRenderer extends TypeRenderMap<TEntry>,
>(featureDefinition: (...args: TArgs) => DataGridFeature<TEntry, TTypeRenderer, TFeatureName>) {
  return featureDefinition;
}

export type UseDataGridFeaturesOptions<TEntry extends DataGridEntry> = {
  columnConfig: MaybeRefOrGetter<ColumnConfig<TEntry, PropertyKey>[]>;
  t: ReturnType<typeof injectI18n>["t"];
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
  { t, columnConfig }: UseDataGridFeaturesOptions<TEntry>,
) => {
  const columns = computed(() => {
    const normalized = toValue(columnConfig).map((c) => (typeof c !== "object" ? { key: c } : c));
    return features
      .flatMap(({ modifyColumns }) => modifyColumns)
      .reduce((last, m) => (m?.func ? m.func(last) : last), normalized);
  });

  /**
   * Maps type names to their respective component.
   */
  const typeRenderer = new Map(
    features
      .flatMap(({ typeRenderer }) => typeRenderer! && allObjectEntries(typeRenderer))
      .filter(Boolean),
  );

  const createRendererColumns = (): DataGridRendererColumn<TEntry>[] => {
    const headerFeatures = features.map((feature) => feature.header).filter((header) => !!header);
    const headerActions = headerFeatures
      .map((feature) => feature.actions)
      .filter((actions) => !!actions);

    const getHeaderComponent = (type?: PropertyKey): Component => {
      const res = typeRenderer.get(type!)?.header;
      return res ?? HeaderCell;
    };

    return columns.value.map<DataGridRendererColumn<TEntry>>((column) => {
      const key = column.key;
      const actions = headerActions.flatMap((actionFactory) => actionFactory(column));

      if (actions.length > 1) {
        const menuItems = actions.map(({ menuItems }) => menuItems).filter((item) => !!item);

        const flyoutMenu = h(
          OnyxFlyoutMenu,
          {
            label: t.value("navigation.moreActionsFlyout", { column: String(key) }),
            trigger: "click",
          },
          {
            button: ({ trigger }) =>
              h(OnyxSystemButton, {
                label: t.value("navigation.moreActionsTrigger"),
                color: "medium",
                icon: moreHorizontal,
                ...trigger,
              }),
            options: () => menuItems,
          } satisfies ComponentSlots<typeof OnyxFlyoutMenu>,
        );

        return {
          key,
          component: () =>
            h(
              getHeaderComponent(column.type),
              { label: String(key) },
              { actions: () => flyoutMenu },
            ),
        };
      }
      const iconComponent = actions.map(({ iconComponent }) => iconComponent);

      return {
        key,
        component: () =>
          h(
            getHeaderComponent(column.type),
            { label: String(key) },
            { actions: () => iconComponent },
          ),
      };
    });
  };

  const defaultRender: DataGridRendererCellComponent<TEntry> = (props) => String(props.modelValue);
  const getColComponent = (type?: PropertyKey) => {
    const res = typeRenderer.get(type!)?.cell;
    return res || defaultRender;
  };

  const createRendererRows = (
    entries: TEntry[],
  ): DataGridRendererRow<TEntry, DataGridMetadata>[] => {
    const mutations = features.map((f) => f.mutation).filter((m) => !!m);
    const shallowCopy = [...entries];
    mutations.forEach(({ func }) => func(shallowCopy));

    return shallowCopy.map((entry) => {
      const cells = columns.value.reduce<DataGridRendererRow<TEntry, DataGridMetadata>["cells"]>(
        (cells, { key, type }) => {
          cells[key] = {
            component: getColComponent(type),
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
