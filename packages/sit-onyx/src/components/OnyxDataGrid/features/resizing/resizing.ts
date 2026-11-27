import { h, ref, toRef, watch, type Ref, type Slots, type ThHTMLAttributes } from "vue";
import { mergeVueProps } from "../../../../utils/attrs.js";
import { escapeCSS } from "../../../../utils/dom.js";
import OnyxResizeHandle from "../../../OnyxResizeHandle/OnyxResizeHandle.vue";
import type { DataGridEntry } from "../../types.js";
import { BUTTON_COLUMN_KEY } from "../expandableRows/expandableRows.js";
import "./resizing.scss";
import { HIDE_COLUMNS_MUTATION_ORDER, HIDDEN_COLUMN } from "../hideColumns/hideColumns.js";
import { createFeature, useFeatureContext, type InternalColumnConfig } from "../index.js";
import { SELECTION_COLUMN } from "../selection/selection.js";
import type { ResizeState, ResizingOptions } from "./types.js";

export const RESIZING_FEATURE = Symbol("Resizing");
export const RESIZE_COLUMNS_MUTATION_ORDER = HIDE_COLUMNS_MUTATION_ORDER + 1000;

export const useResizing = <TEntry extends DataGridEntry>(options?: ResizingOptions<TEntry>) =>
  createFeature((ctx) => {
    const resizingCol = ref<keyof TEntry>();
    const MIN_COLUMN_WIDTH = 3 * 16;
    const headers = ref(new Map<keyof TEntry, HTMLElement>());
    const { isEnabled } = useFeatureContext(ctx, options);
    const resizeState: Ref<ResizeState<TEntry>> = toRef(options?.resizeState ?? new Map());
    const scrollContainer = ref<HTMLElement>();
    const lastResizableColumnKey = ref<keyof TEntry>();

    const isResizable = (column: InternalColumnConfig<TEntry>): boolean => {
      if (
        column.key === HIDDEN_COLUMN ||
        column.key === SELECTION_COLUMN ||
        column.key === BUTTON_COLUMN_KEY
      )
        return false;
      return isEnabled.value(column.key);
    };

    const getColumnWidth = (key: keyof TEntry, el: HTMLElement): number => {
      const stateWidth = resizeState.value.get(key);
      if (stateWidth?.endsWith("px")) {
        const parsed = parseFloat(stateWidth);
        if (!isNaN(parsed)) return parsed;
      }
      return el.getBoundingClientRect().width;
    };

    watch(
      [headers, resizeState],
      () => {
        // Changing the width directly is needed to avoid re-rendering the table too often.

        headers.value.forEach((_, columnKey) => {
          const property = `--onyx-data-grid-column-${escapeCSS(columnKey)}`;
          const width = resizeState.value.get(columnKey);
          if (width) {
            scrollContainer.value?.style.setProperty(property, width);
          } else {
            scrollContainer.value?.style.removeProperty(property);
          }
        });

        // If the last resizable column is being resized, we automatically scroll the container to the right.
        if (resizingCol.value === lastResizableColumnKey.value && scrollContainer.value) {
          scrollContainer.value.scrollLeft =
            scrollContainer.value.scrollWidth - scrollContainer.value.clientWidth;
        }
      },
      { flush: "post", deep: true },
    );

    const modifyColumns = (cols: Readonly<InternalColumnConfig<TEntry>[]>) => {
      const resizableCols = cols.filter(isResizable);
      const nextLastKey = resizableCols.at(-1)?.key;

      if (nextLastKey !== lastResizableColumnKey.value) {
        lastResizableColumnKey.value = nextLastKey;

        if (nextLastKey) {
          const nextWidth = resizeState.value.get(nextLastKey);
          if (nextWidth && !nextWidth.startsWith("minmax(")) {
            resizeState.value.set(nextLastKey, `minmax(${nextWidth}, 1fr)`);
          }
        }
      }
      return cols.map((column) => {
        const canResize = isResizable(column);
        if (!canResize) return column;

        const isActive = column.key === resizingCol.value;

        const thAttributes: ThHTMLAttributes = {
          class: [
            "onyx-data-grid-resize-cell",
            {
              "onyx-data-grid-resize-cell--last": column.key === lastResizableColumnKey.value,
              "onyx-data-grid-resize-cell--active": isActive,
              // the "hover" class is supported by the OnyxTable to force showing the column hover effect
              hover: isActive,
            },
          ],
          ref: (el?: HTMLElement) => {
            if (el) {
              headers.value.set(column.key, el);
            } else {
              headers.value.delete(column.key);
            }
          },
        } as ThHTMLAttributes;

        const resizedWidth = resizeState.value.get(column.key);

        return {
          ...column,
          width: resizedWidth || column.width,
          thAttributes: mergeVueProps(thAttributes, column.thAttributes),
        };
      });
    };

    const renderWrapper = (slots: Slots, column: Readonly<InternalColumnConfig<TEntry>>) => {
      const slotContent = slots.default?.();

      if (!isResizable(column)) return slotContent;

      const isLastContentColumn = column.key === lastResizableColumnKey.value;

      return [
        h(OnyxResizeHandle, {
          min: MIN_COLUMN_WIDTH,
          element: headers.value.get(column.key),
          active: resizingCol.value === column.key,
          onStart: () => {
            resizingCol.value = column.key;

            headers.value.forEach((el, colKey) => {
              const width = Math.max(MIN_COLUMN_WIDTH, Math.round(getColumnWidth(colKey, el)));
              if (colKey === lastResizableColumnKey.value) {
                resizeState.value.set(colKey, `minmax(${width}px, 1fr)`);
              } else {
                resizeState.value.set(colKey, `${width}px`);
              }
            });
          },
          onEnd: () => {
            resizingCol.value = undefined;
          },
          onUpdateWidth: (width) => {
            const finalWidth = Math.max(MIN_COLUMN_WIDTH, Math.round(width));
            // Prevents shrinking the table below the container size when dragging
            if (isLastContentColumn) {
              resizeState.value.set(column.key, `minmax(${finalWidth}px, 1fr)`);
            } else {
              resizeState.value.set(column.key, `${finalWidth}px`);
            }
          },
          onAutoSize: () => {
            if (isLastContentColumn) {
              resizeState.value.set(column.key, "minmax(max-content, 1fr)");
            } else {
              resizeState.value.set(column.key, "max-content");
            }
          },
        }),
        slotContent,
      ];
    };

    return {
      name: RESIZING_FEATURE,
      watch: [resizingCol],
      modifyColumns: {
        order: RESIZE_COLUMNS_MUTATION_ORDER,
        func: modifyColumns,
      },
      scrollContainerAttributes: () => ({
        ref: (el) => {
          scrollContainer.value = el as typeof scrollContainer.value;
        },
      }),
      header: {
        wrapper:
          (cols) =>
          (_, { slots }) =>
            renderWrapper(slots, cols),
      },
    };
  });
