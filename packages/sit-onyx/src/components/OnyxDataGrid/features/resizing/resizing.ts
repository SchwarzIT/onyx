import { h, ref, toRef, watch, type Ref, type Slots, type ThHTMLAttributes } from "vue";
import { mergeVueProps } from "../../../../utils/attrs.js";
import { escapeCSS } from "../../../../utils/dom.js";
import OnyxResizeHandle from "../../../OnyxResizeHandle/OnyxResizeHandle.vue";
import type { DataGridEntry } from "../../types.js";
import { createFeature, useFeatureContext, type InternalColumnConfig } from "../index.js";
import "./resizing.scss";
import type { ResizeState, ResizingOptions } from "./types.js";

export const RESIZING_FEATURE = Symbol("Resizing");

export const useResizing = <TEntry extends DataGridEntry>(options?: ResizingOptions<TEntry>) =>
  createFeature((ctx) => {
    const resizingCol = ref<keyof TEntry>();
    const MIN_COLUMN_WIDTH = 3 * 16;
    const headers = ref(new Map<keyof TEntry, HTMLElement>());
    const { isEnabled } = useFeatureContext(ctx, options);
    const resizeState: Ref<ResizeState<TEntry>> = toRef(options?.resizeState ?? new Map());
    const scrollContainer = ref<HTMLElement>();
    const lastColumnKey = ref<keyof TEntry>();
    const lastColumnActiveMinWidth = ref(MIN_COLUMN_WIDTH);
    const lastColumnStartWidth = ref(MIN_COLUMN_WIDTH);

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

        // If the last column is being resized, we automatically scroll the container to the right.
        if (resizingCol.value === lastColumnKey.value && scrollContainer.value) {
          scrollContainer.value.scrollLeft =
            scrollContainer.value.scrollWidth - scrollContainer.value.clientWidth;
        }
      },
      { flush: "post", deep: true },
    );

    const modifyColumns = (cols: Readonly<InternalColumnConfig<TEntry>[]>) => {
      if (cols.length > 0) {
        lastColumnKey.value = cols.at(-1)!.key;
      }

      return cols.map((column) => {
        if (!isEnabled.value(column.key)) return column;

        const isActive = column.key === resizingCol.value;

        const thAttributes = {
          class: [
            "onyx-data-grid-resize-cell",
            {
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
      if (!isEnabled.value(column.key)) return slotContent;

      const currentMin =
        column.key === lastColumnKey.value ? lastColumnActiveMinWidth.value : MIN_COLUMN_WIDTH;

      return [
        h(OnyxResizeHandle, {
          min: currentMin,
          element: headers.value.get(column.key),
          active: resizingCol.value === column.key,
          onStart: () => {
            resizingCol.value = column.key;

            let otherColumnsWidthSum = 0;
            const containerWidth = scrollContainer.value
              ? scrollContainer.value.getBoundingClientRect().width
              : 0;

            headers.value.forEach((el, col) => {
              const width = getColumnWidth(col, el);
              resizeState.value.set(col, `${Math.max(MIN_COLUMN_WIDTH, width)}px`);

              if (col !== lastColumnKey.value) {
                otherColumnsWidthSum += width;
              } else {
                lastColumnStartWidth.value = width;
              }
            });

            lastColumnActiveMinWidth.value =
              column.key === lastColumnKey.value && containerWidth > 0
                ? Math.max(MIN_COLUMN_WIDTH, containerWidth - otherColumnsWidthSum)
                : MIN_COLUMN_WIDTH;
          },
          onEnd: () => {
            resizingCol.value = undefined;
            const lastKey = lastColumnKey.value;
            // Prevents the last column from being permanently frozen at a fixed width when it could actually fill the remaining space.
            if (!lastKey) return;

            const lastColWidthStr = resizeState.value.get(lastKey);
            if (!lastColWidthStr?.endsWith("px")) return;

            const lastColWidth = parseFloat(lastColWidthStr);
            if (isNaN(lastColWidth)) return;

            const containerWidth = scrollContainer.value
              ? scrollContainer.value.getBoundingClientRect().width
              : 0;

            let otherColumnsWidthSum = 0;
            headers.value.forEach((el, col) => {
              if (col !== lastKey) {
                otherColumnsWidthSum += getColumnWidth(col, el);
              }
            });

            const isResizingLastColumn = column.key === lastKey;
            const isBelowActiveMin =
              isResizingLastColumn && lastColWidth <= lastColumnActiveMinWidth.value;
            const tableFitsWithLastCol =
              !isResizingLastColumn && otherColumnsWidthSum + lastColWidth <= containerWidth + 2;

            if (isBelowActiveMin || tableFitsWithLastCol) {
              resizeState.value.delete(lastKey);
            }
          },
          onUpdateWidth: (width) => {
            const lastKey = lastColumnKey.value;

            if (column.key === lastKey) {
              // Prevents shrinking the table below the container size when dragging
              const finalWidth = Math.max(lastColumnActiveMinWidth.value, width);
              resizeState.value.set(column.key, `${finalWidth}px`);
              return;
            }

            const containerWidth = scrollContainer.value
              ? scrollContainer.value.getBoundingClientRect().width
              : 0;

            if (containerWidth > 0 && lastKey) {
              let otherColumnsSum = 0;
              headers.value.forEach((el, col) => {
                if (col !== column.key && col !== lastKey) {
                  otherColumnsSum += getColumnWidth(col, el);
                }
              });

              const neededLastColWidth = containerWidth - (otherColumnsSum + width);
              if (neededLastColWidth > lastColumnStartWidth.value) {
                resizeState.value.set(column.key, `${width}px`);
                resizeState.value.set(lastKey, `${neededLastColWidth}px`);
              } else {
                resizeState.value.set(column.key, `${width}px`);
              }
            } else {
              resizeState.value.set(column.key, `${width}px`);
            }
          },
          onAutoSize: () => {
            if (column.key === lastColumnKey.value) {
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
