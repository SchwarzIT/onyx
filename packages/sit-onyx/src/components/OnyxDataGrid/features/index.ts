import moreHorizontalSmall from "@sit-onyx/icons/more-horizontal-small.svg?raw";
import {
  computed,
  h,
  toValue,
  type Component,
  type HTMLAttributes,
  type MaybeRef,
  type MaybeRefOrGetter,
  type Ref,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
  type WatchSource,
} from "vue";
import type { ComponentSlots } from "vue-component-type-helpers";
import { type OnyxI18n } from "../../../i18n";
import type { DatetimeFormat } from "../../../i18n/datetime-formats";
import { mergeVueProps } from "../../../utils/attrs";
import { applyMapping, prepareMapping, type OrderableMapping } from "../../../utils/feature";
import { asArray } from "../../../utils/objects";
import type { OnyxMenuItem } from "../../OnyxNavBar/modules";
import OnyxFlyoutMenu from "../../OnyxNavBar/modules/OnyxFlyoutMenu/OnyxFlyoutMenu.vue";
import OnyxSystemButton from "../../OnyxSystemButton/OnyxSystemButton.vue";
import type { TableColumnGroup } from "../../OnyxTable/types";
import type {
  DataGridRendererCell,
  DataGridRendererColumn,
  DataGridRendererRow,
} from "../OnyxDataGridRenderer/types";
import type { DataGridEntry, DataGridMetadata, RenderTypesFromFeature } from "../types";
import type { BASE_FEATURE } from "./base/base";
import { createRenderer } from "./renderer";

/**
 * Function type for modifying the normalized column configuration.
 */
export type ModifyColumns<TEntry extends DataGridEntry> = OrderableMapping<
  InternalColumnConfig<TEntry>[]
>;

export type HeaderCellProps<TOptions = unknown> = { label: string; typeOptions?: TOptions };

export type TypeRendererHeaderDef<TEntry extends DataGridEntry, TOptions = undefined> = Omit<
  DataGridRendererColumn<TEntry, HeaderCellProps<TOptions>>,
  "key" | "props"
>;

export type CellMetadata<TOptions = unknown> = { typeOptions?: TOptions };

export type TypeRendererCell<TEntry extends DataGridEntry, TOptions = undefined> = Omit<
  DataGridRendererCell<TEntry, CellMetadata<TOptions>>,
  "props"
>;

/**
 * Defines how a specific column type should be rendered.
 */
export type TypeRenderer<TEntry extends DataGridEntry, TOptions = undefined> = {
  header?: TypeRendererHeaderDef<TEntry, TOptions>;
  cell: TypeRendererCell<TEntry, TOptions>;
};

/**
 * Maps a "type" key to a column renderer.
 * `symbol` keys are intended for internal/helper columns.
 */
export type TypeRenderMap<
  TEntry extends DataGridEntry,
  TKey extends PropertyKey = PropertyKey,
> = Partial<Record<TKey, Readonly<TypeRenderer<TEntry, object>>>>;

/**
 * ColumnConfig as it can be defined by the user.
 */
export type ColumnConfig<
  TEntry extends DataGridEntry,
  TColumnGroup extends ColumnGroupConfig = Record<string, never>,
  TTypes extends ColumnConfigTypeOption<PropertyKey, unknown> = never,
> =
  | keyof TEntry
  | PublicNormalizedColumnConfig<
      TEntry,
      TColumnGroup,
      TTypes | RenderTypesFromFeature<[ReturnType<typeof BASE_FEATURE>]>
    >;

export type DefaultSupportedTypes = "string" | "number" | DatetimeFormat;

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- we use any for type inference
  TColumnGroup extends ColumnGroupConfig = any,
> = Omit<PublicNormalizedColumnConfig<TEntry, TColumnGroup, never>, "label" | "type"> & {
  type: ColumnTypeNormalized<PropertyKey, unknown>;
  /**
   * Attributes that should be set on all `td` elements
   */
  tdAttributes?: TdHTMLAttributes;
  /**
   * Attributes that should be set on all `th` elements
   */
  thAttributes?: ThHTMLAttributes;
  /**
   * After normalization the label is always defined.
   */
  label: string;
};

export type ColumnTypeNormalized<TKey, TOptions> = { name: TKey; options?: TOptions };
export type ColumnConfigTypeOption<TKey, TOptions> = TKey | ColumnTypeNormalized<TKey, TOptions>;

/**
 * Normalized column config for public/external usage.
 */
export type PublicNormalizedColumnConfig<
  TEntry extends DataGridEntry,
  TColumnGroup extends ColumnGroupConfig,
  TTypes extends ColumnConfigTypeOption<PropertyKey, unknown>,
> = Pick<DataGridRendererColumn<TEntry>, "width" | "key"> & {
  /**
   * The `label` is displayed in the data grid as column header.
   * If not defined, the key is used instead.
   */
  label?: string;
  /**
   * The `type` of the column. It defines how the header and cells of a column is rendered.
   * If not defined the values are displayed as plain strings.
   */
  type?: TTypes;
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
 * Context that is passed to a feature when it is evaluated.
 */
export type DataGridFeatureContext = {
  async: Readonly<Ref<boolean>>;
  i18n: OnyxI18n;
};

/**
 * Complete Type for a single data grid feature.
 */
export type DataGridFeature<
  TEntry extends DataGridEntry,
  TTypeRenderer extends TypeRenderMap<TEntry> = TypeRenderMap<TEntry>,
  TFeatureName extends symbol = symbol,
> = (
  ctx: DataGridFeatureContext,
) => DataGridFeatureDescription<TEntry, TTypeRenderer, TFeatureName>;

/**
 * Object that describes the hooks and properties of a datagrid feature.
 */
export type DataGridFeatureDescription<
  TEntry extends DataGridEntry,
  TTypeRenderer extends TypeRenderMap<TEntry> = TypeRenderMap<TEntry>,
  TFeatureName extends symbol = symbol,
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
   * Defines a renderer for a column type.
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
   *   modifyColumns: [ { func: (config) => configs.map(column => ({ ...column, type: "newType" })) } ];
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
    actions?: (
      column: InternalColumnConfig<TEntry>,
      index: number,
      all: InternalColumnConfig<TEntry>[],
    ) => {
      iconComponent?:
        | Component
        | {
            iconComponent: Component;
            /**
             * Will force the iconcomponent to be always shown in the header and not be put into the menu
             */
            alwaysShowInHeader?: boolean;
          };
      menuItems?: Component<typeof OnyxMenuItem>[];
      showFlyoutMenu?: boolean;
    }[];
    wrapper?: (
      column: InternalColumnConfig<TEntry>,
      index: number,
      all: InternalColumnConfig<TEntry>[],
    ) => Component;
  };
  scrollContainerAttributes?: () => HTMLAttributes;
};

export type DataGridFeatureOptions<
  TEntry extends DataGridEntry,
  TColumnOptions extends Partial<Record<keyof TEntry, object>>,
  TWithAsync extends boolean = false,
> = {
  /**
   * Whether the feature is enabled by default. Can be overridden per column.
   *
   * @default true
   */
  enabled?: boolean;
  /**
   * Options for each column. Will override default/global options of the feature.
   */
  columns?: MaybeRef<
    | {
        [TKey in keyof TEntry]?: TColumnOptions[TKey] & {
          /**
           * Whether the feature is enabled for this column. If unset, the default/global `enabled` option of this feature will be used.
           */
          enabled?: boolean;
        };
      }
    | undefined
  >;
} & (TWithAsync extends true
  ? {
      /**
       * When async is `true`, then the internal data transformations are disabled and have to be performed by the user.
       */
      async?: boolean;
    }
  : unknown);

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- any must be used here, otherwise the type inference breaks
  TArgs extends any[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- we use any for simplicity
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
  TTypes extends ColumnConfigTypeOption<PropertyKey, unknown>,
> = {
  columnConfig: MaybeRefOrGetter<ColumnConfig<TEntry, TColumnGroup, TTypes>[]>;
  i18n: OnyxI18n;
  columnGroups: MaybeRefOrGetter<TColumnGroup>;
  async: Readonly<Ref<boolean>>;
};

export const createTableColumnGroups = <
  TEntry extends DataGridEntry,
  TColumnGroup extends ColumnGroupConfig,
>(
  columns?: InternalColumnConfig<TEntry, TColumnGroup>[],
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
  TTypes extends ColumnConfigTypeOption<PropertyKey, unknown>,
  // Intersection with the empty array is necessary for TypeScript to infer the array entries as tuple values instead of an array
  // e.g. (Feature1 | Feature2)[] vs. [Feature1, Feature2]
  // The inference of tuple values allows us to create types that are more precise
  T extends DataGridFeature<TEntry, TTypeRenderer, TFeatureName>[] | [],
>(
  featureDefinitions: T,
  {
    i18n,
    columnConfig,
    columnGroups,
    async,
  }: UseDataGridFeaturesOptions<TEntry, TColumnGroup, TTypes>,
) => {
  const features = featureDefinitions.map((f) => f({ async, i18n }));

  const columnMappings = computed(() =>
    prepareMapping<InternalColumnConfig<TEntry>[], typeof features, "modifyColumns">(
      features,
      "modifyColumns",
    ),
  );

  const columns = computed(() => {
    const normalized = toValue(columnConfig).map<InternalColumnConfig<TEntry>>((c) => {
      const obj = typeof c !== "object" ? { key: c } : c;
      return {
        ...obj,
        label: obj.label ?? String(obj.key),
        type: typeof obj.type === "object" ? obj.type : { name: obj.type ?? "string" },
      };
    });
    return applyMapping(columnMappings.value, normalized);
  });

  const renderer = computed(() => createRenderer(features));

  const createRendererColumnGroups = () =>
    createTableColumnGroups(columns.value, toValue(columnGroups));

  const createScrollContainerAttributes = () =>
    mergeVueProps(
      ...features.map(({ scrollContainerAttributes }) => scrollContainerAttributes?.()),
    );

  const createRendererColumns = (): DataGridRendererColumn<TEntry>[] => {
    const headerFeatures = features.map((feature) => feature.header).filter((header) => !!header);
    const headerActions = headerFeatures
      .map((feature) => feature.actions)
      .filter((actions) => !!actions);
    const headerWrappers = headerFeatures
      .map((feature) => feature.wrapper)
      .filter((wrapper) => !!wrapper);

    return columns.value.map<DataGridRendererColumn<TEntry>>((column, i, all) => {
      const actions = headerActions.flatMap((actionFactory) => actionFactory(column, i, all));
      const header = renderer.value.getFor("header", column.type.name);

      const menuItems = actions.map(({ menuItems }) => menuItems).filter((item) => !!item);
      const iconComponent = actions.map(({ iconComponent }) => iconComponent);

      const flyoutMenu = h(
        OnyxFlyoutMenu,
        {
          label: i18n.t.value("navigation.moreActionsFlyout", { column: column.label }),
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

      const actionsSlot = {
        actions: () => {
          // normalizing the iconComponents from Component to {iconComponent: Component}
          const iconsArray = asArray(iconComponent);
          const normalizedIcons = iconsArray.map((ic) => {
            if (typeof ic === "object" && "iconComponent" in ic) {
              return ic;
            }
            return { iconComponent: ic };
          });

          const headerIcons = normalizedIcons
            .filter((ic) => ic?.alwaysShowInHeader)
            .map((ic) => ic.iconComponent);

          const nonHeaderIcon =
            normalizedIcons.find((ic) => !ic.alwaysShowInHeader)?.iconComponent ?? null;

          const filteredActions = actions.filter(
            (action) =>
              !(action.iconComponent as { alwaysShowInHeader?: boolean })?.alwaysShowInHeader,
          );

          const shouldShowFlyout =
            filteredActions.length > 1 || actions.some((action) => action.showFlyoutMenu);

          return [
            ...(shouldShowFlyout ? headerIcons : []),
            shouldShowFlyout ? flyoutMenu : nonHeaderIcon,
          ].filter(Boolean);
        },
      };

      const wrapper = headerWrappers.reduce<Component>(
        (acc, component) => {
          return h(component(column, i, all), acc);
        },
        (props) => h(header.component, { label: column.label, ...props }, actionsSlot),
      );
      return {
        thAttributes: mergeVueProps(header.thAttributes, column.thAttributes),
        key: column.key,
        width: column.width,
        component: () => h(wrapper),
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
    return shallowCopy.map((row) => {
      const cells = columns.value.reduce<DataGridRendererRow<TEntry, DataGridMetadata>["cells"]>(
        (cells, { key, type, tdAttributes }) => {
          const cellRenderer = renderer.value.getFor("cell", type.name);
          cells[key] = {
            component: cellRenderer.component,
            props: {
              key,
              row,
              modelValue: row[key],
              metadata: { typeOptions: type.options },
            },
            tdAttributes: mergeVueProps(tdAttributes, cellRenderer.tdAttributes),
          };
          return cells;
        },
        {},
      );
      return {
        id: row.id,
        cells,
      };
    });
  };

  const watchSources: WatchSource[] = features.flatMap((f) => f.watch ?? []);

  return {
    /**
     * Takes the table attributes and maps all
     */
    createScrollContainerAttributes,
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

export const useFeatureContext = (
  ctx: DataGridFeatureContext,
  options?: DataGridFeatureOptions<DataGridEntry, object, boolean>,
) => {
  const isEnabled = computed(() => {
    return (column: PropertyKey) => {
      const columns = toValue(options?.columns);
      const defaultEnabled = options?.enabled ?? true;
      const isColumnEnabled = columns?.[column]?.enabled;
      return isColumnEnabled ?? defaultEnabled;
    };
  });

  const isAsync = computed(() => (options as { async?: boolean })?.async ?? ctx.async.value);

  return {
    /**
     * Checks whether a data grid feature is enabled for a given column.
     * Considers the feature defaults as well as column-specific overrides.
     *
     * @default true
     */
    isEnabled,
    /**
     * Whether the feature only or all features have data transformations enabled.
     */
    isAsync,
  };
};
