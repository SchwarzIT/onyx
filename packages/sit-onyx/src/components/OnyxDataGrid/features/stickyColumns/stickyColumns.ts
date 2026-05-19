import { computed, nextTick, onMounted, onUnmounted, ref, toValue, useId, watch } from "vue";
import { mergeVueProps } from "../../../../utils/attrs.js";
import { escapeCSS } from "../../../../utils/dom.js";
import type { TableColumnGroup } from "../../../OnyxTable/types.js";
import type { DataGridEntry } from "../../types.js";
import {
  createFeature,
  type ColumnGroupConfig,
  type InternalColumnConfig,
  type ModifyColumnGroups,
  type ModifyColumns,
} from "../index.js";
import { SELECTION_COLUMN } from "../selection/selection.js";
import "./stickyColumns.scss";
import { type StickyColumnDef, type StickyColumnsOptions } from "./types.js";

export const STICKY_COLUMNS_FEATURE = Symbol("StickyColumns");
export const STICKY_COLUMNS_MUTATION_ORDER = 5000;

export const useStickyColumns = <TEntry extends DataGridEntry>(
  options?: StickyColumnsOptions<TEntry>,
) =>
  createFeature(() => {
    const stickyId = useId();
    const globalPosition = computed(() => toValue(options?.position) ?? "left");

    /**
     * Saving a ref to the container element so we can apply the CSS Variables there.
     */
    const containerElement = ref<HTMLElement>();

    /**
     * Saving the columnConfig, so we can use it to order the columns.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- any for compatibility
    const columnConfig = ref<Readonly<InternalColumnConfig<TEntry, any>[]>>([]);

    const normalizedStickyColumns = computed(() => {
      const rawColumns = toValue(options?.columns) ?? [];
      const normalized = columnConfig.value
        // Use the original column order - The correct order is important to calculate the offset correctly
        .map<StickyColumnDef<TEntry> | undefined>(({ key }) =>
          rawColumns.find((r) => (typeof r === "object" ? r.key === key : r === key)),
        )
        .filter((col) => !!col)
        .map((col) => {
          if (typeof col === "object") {
            return { key: col.key, position: col.position ?? globalPosition.value };
          }
          return { key: col!, position: globalPosition.value };
        });

      normalized.unshift({ key: SELECTION_COLUMN, position: "left" });

      return normalized;
    });

    const leftStickyKeys = computed(() =>
      normalizedStickyColumns.value.filter((c) => c.position === "left").map((c) => c.key),
    );
    const rightStickyKeys = computed(() =>
      normalizedStickyColumns.value.filter((c) => c.position === "right").map((c) => c.key),
    );

    /**
     * The column header elements are used to get the width of each column
     */
    const columnHeader = ref<Record<PropertyKey, HTMLElement>>({});
    const elementWidths = ref<Record<PropertyKey, number>>({});

    const isScrolledLeft = ref(false);
    const isScrolledRight = ref(false);

    const buildStickyPositionCssVar = (key: PropertyKey) =>
      `--onyx-data-grid-sticky-column-position-${stickyId}-${escapeCSS(key)}`;

    const updatePositioning = (key: PropertyKey, position: "left" | "right") => {
      if (!containerElement.value) {
        return;
      }
      const relevantKeys = position === "left" ? leftStickyKeys.value : rightStickyKeys.value;
      const index = relevantKeys.indexOf(key);
      if (index === -1) return;

      const width = relevantKeys
        .slice(0, index)
        .reduce<number>((acc, colKey) => acc + (elementWidths.value[colKey] || 0), 0);

      containerElement.value.style.setProperty(buildStickyPositionCssVar(key), `${width}px`);
    };

    watch(
      normalizedStickyColumns,
      (newCols) => {
        void nextTick(() => newCols.forEach((col) => updatePositioning(col.key, col.position)));
      },
      { deep: true, immediate: true },
    );

    const handleScroll = () => {
      if (!containerElement.value) {
        return;
      }
      const el = containerElement.value;
      const width = el.scrollWidth - el.clientWidth;
      const scrollLeft = Math.round(el.scrollLeft);
      isScrolledLeft.value = scrollLeft > 0;
      isScrolledRight.value = scrollLeft < width;
    };

    // ensure ResizeObserver is only called on mount to support server side rendering
    onMounted(() => {
      if (!("ResizeObserver" in window)) return;

      const resizeObserver = new ResizeObserver(() => {
        Reflect.ownKeys(columnHeader.value).forEach((column) => {
          const el = columnHeader.value[column];
          elementWidths.value[column] = el?.getBoundingClientRect().width || 0;
        });

        normalizedStickyColumns.value.forEach((col) => updatePositioning(col.key, col.position));
      });

      watch(
        columnHeader,
        () => {
          resizeObserver.disconnect();

          Reflect.ownKeys(columnHeader.value).forEach((column) => {
            const el = columnHeader.value[column];
            if (el) resizeObserver.observe(el);
          });
        },
        { deep: true, immediate: true },
      );
      onUnmounted(() => resizeObserver.disconnect());
    });

    return {
      name: STICKY_COLUMNS_FEATURE,
      watch: [normalizedStickyColumns, isScrolledLeft, isScrolledRight],

      modifyColumns: [
        {
          // Save column config before applying sorting
          order: STICKY_COLUMNS_MUTATION_ORDER - 1,
          func: (_columnConfig) => (columnConfig.value = _columnConfig),
        },
        {
          order: STICKY_COLUMNS_MUTATION_ORDER,
          func: (columnConfig) => {
            type ColumnDef = (typeof columnConfig)[number];

            const leftSticky: ColumnDef[] = [];
            const rightSticky: ColumnDef[] = [];
            const nonSticky: ColumnDef[] = [];

            columnConfig.forEach((column) => {
              const stickyDef = normalizedStickyColumns.value.find((c) => c.key === column.key);
              if (!stickyDef) {
                nonSticky.push(column);
                return;
              }

              const pos = stickyDef.position;
              const isScrolled = pos === "left" ? isScrolledLeft.value : isScrolledRight.value;

              const stickyAttrs = {
                style: {
                  [pos === "left" ? "right" : "left"]: "auto",
                  [pos]: `var(${buildStickyPositionCssVar(column.key)})`,
                },
                class: {
                  "onyx-data-grid-sticky-columns--sticky": true,
                  [pos]: true,
                  isScrolled,
                },
              };

              const modifiedColumn = {
                ...column,
                thAttributes: mergeVueProps(
                  {
                    ...stickyAttrs,
                    ref: (el) => {
                      if (el) columnHeader.value[column.key] = el as HTMLElement;
                      else delete columnHeader.value[column.key];
                    },
                  },
                  column.thAttributes,
                ),
                tdAttributes: mergeVueProps(stickyAttrs, column.tdAttributes),
              };

              if (pos === "left") leftSticky.push(modifiedColumn);
              else rightSticky.push(modifiedColumn);
            });

            return [...leftSticky, ...nonSticky, ...rightSticky.slice().reverse()];
          },
        },
      ] satisfies ModifyColumns<TEntry>,

      modifyColumnGroups: {
        func: (groups, columns) => {
          let currentIdx = 0;
          const processedGroups: TableColumnGroup[] = [];

          groups.forEach((group) => {
            const groupColumns = columns.slice(currentIdx, currentIdx + group.span);
            currentIdx += group.span;

            const groupStickyDefs = groupColumns
              .map((col) => normalizedStickyColumns.value.find((c) => c.key === col.key))
              .filter((def) => def !== undefined);

            const stickyCount = groupStickyDefs.length;
            const allSticky = stickyCount === groupColumns.length;
            const partiallySticky = stickyCount > 0 && stickyCount < groupColumns.length;

            const groupPosition = groupStickyDefs[0]?.position ?? "left";
            const isGroupScrolled =
              groupPosition === "left" ? isScrolledLeft.value : isScrolledRight.value;

            // Only split if partially sticky and the table is currently scrolled
            if (partiallySticky && isGroupScrolled) {
              const stickyPartCols = groupColumns.filter((c) =>
                normalizedStickyColumns.value.some((def) => def.key === c.key),
              );
              const normalPartCols = groupColumns.filter(
                (c) => !normalizedStickyColumns.value.some((def) => def.key === c.key),
              );

              const leadStickyCol =
                groupPosition === "left" ? stickyPartCols[0] : stickyPartCols.at(-1);

              const stickyPart: TableColumnGroup = {
                key: `${group.key.toString()}-sticky`,
                span: stickyPartCols.length,
                header: group.header,
                class: leadStickyCol?.thAttributes?.class,
                style: leadStickyCol?.thAttributes?.style,
              };

              const normalPart: TableColumnGroup = {
                key: group.key,
                span: normalPartCols.length,
                header: group.header,
              };

              if (groupPosition === "left") {
                processedGroups.push(stickyPart, normalPart);
              } else {
                processedGroups.push(normalPart, stickyPart);
              }
            } else {
              // if all columns are sticky, apply the sticky styles to the group header
              const modifiedGroup = { ...group };
              if (allSticky) {
                const leadCol = groupPosition === "left" ? groupColumns[0] : groupColumns.at(-1);
                modifiedGroup.class = leadCol?.thAttributes?.class;
                modifiedGroup.style = leadCol?.thAttributes?.style;
              }
              processedGroups.push(modifiedGroup);
            }
          });

          return processedGroups;
        },
      } satisfies ModifyColumnGroups<TEntry, ColumnGroupConfig>,
      scrollContainerAttributes: () => ({
        ref: async (el) => {
          if (!el) return;
          containerElement.value = el as HTMLElement;
          await nextTick();
          handleScroll();
        },
        onScrollPassive: () => handleScroll(),
      }),
    };
  });
