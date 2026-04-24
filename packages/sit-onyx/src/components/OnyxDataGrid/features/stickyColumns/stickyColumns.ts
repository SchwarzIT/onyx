import { computed, nextTick, onMounted, onUnmounted, ref, toValue, useId, watch } from "vue";
import { mergeVueProps } from "../../../../utils/attrs.js";
import { escapeCSS } from "../../../../utils/dom.js";
import type { TableColumnGroup } from "../../../OnyxTable/types.js";
import type { DataGridEntry } from "../../types.js";
import {
  createFeature,
  type ColumnGroupConfig,
  type ModifyColumnGroups,
  type ModifyColumns,
} from "../index.js";
import { SELECTION_COLUMN } from "../selection/selection.js";
import "./stickyColumns.scss";
import type { StickyColumnsOptions } from "./types.js";

export const STICKY_COLUMNS_FEATURE = Symbol("StickyColumns");
export const STICKY_COLUMNS_MUTATION_ORDER = 5000;

export const useStickyColumns = <TEntry extends DataGridEntry>(
  options?: StickyColumnsOptions<TEntry>,
) =>
  createFeature(() => {
    const globalPosition = computed(() => toValue(options?.position) ?? "left");

    const normalizedStickyColumns = computed(() => {
      const rawColumns = toValue(options?.columns) ?? [];
      const normalized = rawColumns.map((col) => {
        if (typeof col === "object") {
          return { key: col.key, position: col.position ?? globalPosition.value };
        }
        return { key: col, position: globalPosition.value };
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

    const elementWidths = ref<Record<PropertyKey, number>>({});
    const elementsToStyle = ref<Record<PropertyKey, HTMLElement>>({});
    const stickyId = useId();

    const isScrolledLeft = ref(false);
    const isScrolledRight = ref(false);

    const createStickyPositionCssVar = (key: PropertyKey) =>
      `--onyx-data-grid-sticky-column-position-${stickyId}-${escapeCSS(key)}`;

    const setElementStyles = (key: PropertyKey, position: "left" | "right") => {
      const relevantKeys = position === "left" ? leftStickyKeys.value : rightStickyKeys.value;
      const index = relevantKeys.indexOf(key);
      if (index === -1) return;

      const width = relevantKeys
        .slice(0, index)
        .reduce<number>((acc, colKey) => acc + (elementWidths.value[colKey] || 0), 0);

      document.body.style.setProperty(createStickyPositionCssVar(key), `${width}px`);
    };

    watch(
      normalizedStickyColumns,
      (newCols) => {
        nextTick(() => {
          newCols.forEach((col) => setElementStyles(col.key, col.position));
        });
      },
      { deep: true, immediate: true },
    );

    const handleScroll = (el: Element) => {
      const width = el.scrollWidth - el.clientWidth;
      const scrollLeft = Math.round(el.scrollLeft);
      isScrolledLeft.value = scrollLeft > 0;
      isScrolledRight.value = scrollLeft < width;
    };

    // ensure ResizeObserver is only called on mount to support server side rendering
    onMounted(() => {
      if (!("ResizeObserver" in window)) return;

      const resizeObserver = new ResizeObserver(() => {
        Reflect.ownKeys(elementsToStyle.value).forEach((column) => {
          const el = elementsToStyle.value[column];
          elementWidths.value[column] = el?.getBoundingClientRect().width || 0;
        });

        normalizedStickyColumns.value.forEach((col) => setElementStyles(col.key, col.position));
      });

      watch(
        elementsToStyle,
        () => {
          resizeObserver.disconnect();

          Reflect.ownKeys(elementsToStyle.value).forEach((column) => {
            const el = elementsToStyle.value[column];
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

      modifyColumns: {
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
                [pos]: `var(${createStickyPositionCssVar(column.key)})`,
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
                    if (el) elementsToStyle.value[column.key] = el as HTMLElement;
                    else delete elementsToStyle.value[column.key];
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
      } satisfies ModifyColumns<TEntry>,

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
          await nextTick();
          handleScroll(el as Element);
        },
        onScrollCapturePassive: (e: Event) => handleScroll(e.target as HTMLElement),
      }),
    };
  });
