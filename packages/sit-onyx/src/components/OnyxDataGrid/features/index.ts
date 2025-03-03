import moreHorizontalSmall from "@sit-onyx/icons/more-horizontal-small.svg?raw";
import {
  computed,
  h,
  toValue,
  type Component,
  type MaybeRefOrGetter,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
  type WatchSource,
} from "vue";
import type { ComponentSlots } from "vue-component-type-helpers";
import { type OnyxI18n } from "../../../i18n";
import { mergeVueProps } from "../../../utils/attrs";
import type { OnyxMenuItem } from "../../OnyxNavBar/modules";
import OnyxFlyoutMenu from "../../OnyxNavBar/modules/OnyxFlyoutMenu/OnyxFlyoutMenu.vue";
import OnyxSystemButton from "../../OnyxSystemButton/OnyxSystemButton.vue";
import type { TableColumnGroup } from "../../OnyxTable/types";
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
  func: (columns: Readonly<InternalColumnConfig<TEntry>[]>) => InternalColumnConfig<TEntry>[];
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
export type ColumnConfig<
  TEntry extends DataGridEntry,
  TColumnGroup extends ColumnGroupConfig,
  TTypes,
> = keyof TEntry | PublicNormalizedColumnConfig<TEntry, TColumnGroup, TTypes>;

export type DefaultSupportedTypes = "string" | "number";

/**
 * Configuration for the column groupings.
 */
export type ColumnGroupConfig = Record<
  string,
  {
    label: string;
  }
>;

/**
 * Column config used internally and by the `modifyColumns` functions.
 */
export type InternalColumnConfig<
  TEntry extends DataGridEntry,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TColumnGroup extends ColumnGroupConfig = any,
  TTypes extends PropertyKey = PropertyKey,
> = {
  /**
   * Attributes that should be set on all `td` elements
   */
  tdAttributes?: TdHTMLAttributes;
  /**
   * Attributes that should be set on all `th` elements
   */
  thAttributes?: ThHTMLAttributes;
} & PublicNormalizedColumnConfig<TEntry, TColumnGroup, TTypes>;

/**
 * Normalized column config for internal usage.
 */
export type PublicNormalizedColumnConfig<
  TEntry extends DataGridEntry,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TColumnGroup extends ColumnGroupConfig = any,
  TTypes = PropertyKey,
> = {
  /**
   * The `key` identifies which property of an `data` entry is used as `modelValue` for a cell.
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
  /**
   * Key of the ColumnGroup that this column should be visually grouped in.
   * The columns have to be defined in the correct order.
   * So columns that should be grouped together have to actually be defined after eachother.
   *
   * The label for the column group can be configured via the `columnGroups` prop.
   */
  columnGroupKey?: keyof TColumnGroup;
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
    /**
     * Defines the order in which the mutation is handled.
     * This can be used to control the sequence of operations when multiple mutations are applied.
     */
    order?: number;
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
    actions?: (column: PublicNormalizedColumnConfig<TEntry>) => {
      iconComponent?: Component | { iconComponent: Component; position?: string };
      menuItems: Component<typeof OnyxMenuItem>[];
      showFlyoutMenu?: boolean;
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

export type UseDataGridFeaturesOptions<
  TEntry extends DataGridEntry,
  TColumnGroup extends ColumnGroupConfig,
> = {
  columnConfig: MaybeRefOrGetter<ColumnConfig<TEntry, TColumnGroup, PropertyKey>[]>;
  i18n: OnyxI18n;
  columnGroups: MaybeRefOrGetter<TColumnGroup>;
};

export const createTableColumnGroups = <TEntry extends DataGridEntry>(
  columns?: PublicNormalizedColumnConfig<TEntry>[],
  columnGroups?: ColumnGroupConfig,
) => {
  // Only if there is at least a single column group defined.
  if (!columns?.some((c) => c.columnGroupKey)) {
    return undefined;
  }

  /** Remember start of the current group */
  let currentStart = 0;
  const result: TableColumnGroup[] = [];

  for (let i = 1; i <= columns.length; i++) {
    const element = columns[i];
    const currentKey = columns[currentStart].columnGroupKey ?? "";
    // When it's the last iteration or the current group key changed:
    if (i === columns.length || element?.columnGroupKey !== currentKey) {
      // add a new TableColumnGroup
      result.push({
        key: currentKey,
        span: i - currentStart,
        header: columnGroups?.[currentKey as string]?.label ?? String(currentKey),
      });
      currentStart = i;
    }
  }
  return result;
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
  TColumnGroup extends ColumnGroupConfig,
  // Intersection with the empty array is necessary for TypeScript to infer the array entries as tuple values instead of an array
  // e.g. (Feature1 | Feature2)[] vs. [Feature1, Feature2]
  // The inference of tuple values allows us to create types that are more precise
  T extends DataGridFeature<TEntry, TTypeRenderer, TFeatureName>[] | [],
>(
  features: T,
  { i18n, columnConfig, columnGroups }: UseDataGridFeaturesOptions<TEntry, TColumnGroup>,
) => {
  const columns = computed(() => {
    const normalized = toValue(columnConfig).map<InternalColumnConfig<TEntry>>((c) =>
      typeof c !== "object" ? { key: c } : c,
    );
    return features
      .flatMap(({ modifyColumns }) => modifyColumns)
      .reduce((last, m) => (m?.func ? m.func(last) : last), normalized);
  });

  const renderer = computed(() => createRenderer(features));

  const createRendererColumnGroups = () =>
    createTableColumnGroups(columns.value, toValue(columnGroups));

  const createRendererColumns = (): DataGridRendererColumn<TEntry>[] => {
    const headerFeatures = features.map((feature) => feature.header).filter((header) => !!header);
    const headerActions = headerFeatures
      .map((feature) => feature.actions)
      .filter((actions) => !!actions);

    return columns.value.map<DataGridRendererColumn<TEntry>>((column) => {
      const actions = headerActions.flatMap((actionFactory) => actionFactory(column));
      const header = renderer.value.getFor("header", column.type);
      const label = column.label?.trim() ?? String(column.key);

      const menuItems = actions.map(({ menuItems }) => menuItems).filter((item) => !!item);
      const iconComponent = actions.map(({ iconComponent }) => iconComponent);

      const flyoutMenu = h(
        OnyxFlyoutMenu,
        {
          label: i18n.t.value("navigation.moreActionsFlyout", { column: label }),
          trigger: "click",
        },
        {
          button: ({ trigger }) =>
            h(OnyxSystemButton, {
              class: actions.length > 1 ? "onyx-system-button--multiple-actions" : "",
              label: i18n.t.value("navigation.moreActionsTrigger"),
              color: "medium",
              icon: moreHorizontalSmall,
              ...trigger,
            }),
          options: () => menuItems,
        } satisfies ComponentSlots<typeof OnyxFlyoutMenu>,
      );
      return {
        thAttributes: mergeVueProps(header.thAttributes, column.thAttributes),
        key: column.key,
        component: () =>
          h(
            header.component,
            { label },
            {
              actions: () => {
                // normalizing the iconComponents from Component to {iconComponent: Component}
                const iconsArray = Array.isArray(iconComponent)
                  ? iconComponent
                  : iconComponent
                    ? [iconComponent]
                    : [];
                const normalizedIcons = iconsArray.map((ic) => {
                  if (typeof ic === "object" && "iconComponent" in ic) {
                    return ic;
                  }
                  return { iconComponent: ic };
                });

                const headerIcons = normalizedIcons
                  .filter((ic) => ic?.position === "header")
                  .map((ic) => ic.iconComponent);

                const nonHeaderIcon =
                  normalizedIcons.find((ic) => !ic.position)?.iconComponent ?? null;

                const shouldShowFlyout =
                  actions.length > 1 || actions.some((action) => action.showFlyoutMenu);

                return [...headerIcons, shouldShowFlyout ? flyoutMenu : nonHeaderIcon].filter(
                  Boolean,
                );
              },
            },
          ),
      };
    });
  };

  const createRendererRows = (
    entries: TEntry[],
  ): DataGridRendererRow<TEntry, DataGridMetadata>[] => {
    const mutations = features
      .map((f) => f.mutation)
      .filter((m) => !!m)
      .sort((a, b) => (b.order ?? 0) - (a.order ?? 0));

    let shallowCopy = [...entries];
    mutations.forEach(({ func }) => {
      const result = func(shallowCopy);
      if (result) {
        shallowCopy = result as TEntry[];
      }
    });
    return shallowCopy.map((entry) => {
      const cells = columns.value.reduce<DataGridRendererRow<TEntry, DataGridMetadata>["cells"]>(
        (cells, { key, type, tdAttributes }) => {
          const cellRenderer = renderer.value.getFor("cell", type);
          cells[key] = {
            component: cellRenderer.component,
            props: { row: entry, modelValue: entry[key] },
            tdAttributes: mergeVueProps(tdAttributes, cellRenderer.tdAttributes),
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
    /** Uses the column definition and available column group config to generate the column groups for the underlying OnyxTable */
    createRendererColumnGroups,
    /** Takes the column definition and maps all, calls mutation func and maps at the end to RendererCell */
    createRendererRows,
    /** Takes the column definition and creates a RenderHeader for each, adds actions from features */
    createRendererColumns,
    // the combined `watch` for all features
    watchSources,
  };
};
