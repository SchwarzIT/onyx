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
    const MIN_COLUMN_WIDTH = 2 * 16 + 40; // 2 * padding + 2.5rem min width
    const headers = ref(new Map<keyof TEntry, HTMLElement>());
    const { isEnabled } = useFeatureContext(ctx, options);
    const resizeState: Ref<ResizeState<TEntry>> = toRef(options?.resizeState ?? new Map());
    const scrollContainer = ref<HTMLElement>();
    const lastColumnKey = ref<keyof TEntry>();
    const lastColumnActiveMinWidth = ref(MIN_COLUMN_WIDTH);

    watch(
      [headers, resizeState],
      () => {
        // Changing the width directly is needed to avoid re-rendering the table too often.
        headers.value.forEach((th, columnKey) => {
          const property = `--onyx-data-grid-column-${escapeCSS(columnKey)}`;
          const container = th.closest<HTMLElement>(".onyx-table-wrapper__container");
          const width = resizeState.value.get(columnKey);
          if (width) {
            container?.style.setProperty(property, width);
          } else {
            container?.style.removeProperty(property);
          }
        });
      },
      { flush: "post", deep: true },
    );

    const modifyColumns = (cols: Readonly<InternalColumnConfig<TEntry>[]>) => {
      if (cols.length > 0) {
        lastColumnKey.value = cols[cols.length - 1]!.key;
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

    const renderWrapper = (
      slots: Slots,
      column: Readonly<InternalColumnConfig<TEntry>>,
      noResizeHandle: boolean,
    ) => {
      const slotContent = slots.default?.();
      if (!isEnabled.value(column.key) || noResizeHandle) return slotContent;

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
            const thElement = headers.value.get(column.key);
            const container =
              thElement?.closest<HTMLElement>(".onyx-table-wrapper__container") ||
              scrollContainer.value;
            const containerWidth = container ? container.getBoundingClientRect().width : 0;

            Array.from(headers.value.entries()).forEach(([col, el]) => {
              const { width } = el.getBoundingClientRect();
              if (col !== lastColumnKey.value || column.key === lastColumnKey.value) {
                resizeState.value.set(col, `${Math.max(MIN_COLUMN_WIDTH, width)}px`);
              } else {
                resizeState.value.delete(col);
              }
              if (col !== lastColumnKey.value) {
                otherColumnsWidthSum += width;
              }
            });

            if (column.key === lastColumnKey.value && containerWidth > 0) {
              lastColumnActiveMinWidth.value = Math.max(
                MIN_COLUMN_WIDTH,
                containerWidth - otherColumnsWidthSum,
              );
            } else {
              lastColumnActiveMinWidth.value = MIN_COLUMN_WIDTH;
            }
          },
          onEnd: () => {
            resizingCol.value = undefined;
          },
          onUpdateWidth: (width) => {
            resizeState.value.set(column.key, `${width}px`);
          },
          onAutoSize: () => {
            if (column.key === lastColumnKey.value) {
              resizeState.value.delete(column.key);
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
          (_, { slots }) => {
            return renderWrapper(slots, cols, false);
          },
      },
    };
  });
