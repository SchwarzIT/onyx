import { h, ref, watch, type Slots, type ThHTMLAttributes } from "vue";
import { mergeVueProps } from "../../../../utils/attrs.js";
import { escapeCSS } from "../../../../utils/dom.js";
import OnyxResizeHandle from "../../../OnyxResizeHandle/OnyxResizeHandle.vue";
import type { DataGridEntry } from "../../types.js";
import { createFeature, useFeatureContext, type InternalColumnConfig } from "../index.js";
import "./resizing.scss";
import type { ResizingOptions } from "./types.js";

export const RESIZING_FEATURE = Symbol("Resizing");
export const FILLER_COLUMN = Symbol("FILLER_COLUMN");
export const useResizing = <TEntry extends DataGridEntry>(options?: ResizingOptions<TEntry>) =>
  createFeature((ctx) => {
    const resizingCol = ref<Readonly<InternalColumnConfig<TEntry>>>();
    const MIN_COLUMN_WIDTH = 3 * 16;
    const headers = ref(new Map<keyof TEntry, HTMLElement>());
    const { isEnabled } = useFeatureContext(ctx, options);
    const colWidths = ref(new Map<keyof TEntry, string>());
    const scrollContainer = ref<HTMLElement>();

    watch(
      [headers, colWidths],
      () => {
        // Changing the width directly is needed to avoid re-rendering the table too often.
        headers.value.forEach((th, columnKey) => {
          const property = `--onyx-data-grid-column-${escapeCSS(String(columnKey))}`;
          const container = th.closest<HTMLElement>(".onyx-table-wrapper__container");
          const width = colWidths.value.get(columnKey);
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
      const columns = cols.map((column) => {
        if (!isEnabled.value(column.key)) return column;

        const thAttributes = {
          class: "onyx-data-grid-resize-cell",
          ref: (el?: HTMLElement) => {
            if (el) {
              headers.value.set(column.key, el);
            } else {
              headers.value.delete(column.key);
            }
          },
        } as ThHTMLAttributes;

        const resizedWidth = colWidths.value.get(column.key);

        return {
          ...column,
          width: resizedWidth || column.width,
          thAttributes: mergeVueProps(thAttributes, column.thAttributes),
        };
      });

      columns.push({ key: FILLER_COLUMN, type: { name: FILLER_COLUMN }, label: "" });

      return columns;
    };

    const renderWrapper = (
      slots: Slots,
      column: Readonly<InternalColumnConfig<TEntry>>,
      noResizeHandle: boolean,
    ) => {
      const slotContent = slots.default?.();
      if (!isEnabled.value(column.key) || noResizeHandle) return slotContent;

      return [
        h(OnyxResizeHandle, {
          min: MIN_COLUMN_WIDTH,
          element: headers.value.get(column.key),
          active: resizingCol.value?.key === column.key,
          onStart: () => {
            resizingCol.value = column;

            Array.from(headers.value.entries()).forEach(([col, el]) => {
              const { width } = el.getBoundingClientRect();
              colWidths.value.set(col, `${Math.max(MIN_COLUMN_WIDTH, width)}px`);
            });
          },
          onEnd: () => {
            resizingCol.value = undefined;
          },
          onUpdateWidth: (width) => {
            colWidths.value.set(column.key, `${width}px`);
          },
          onAutoSize: () => colWidths.value.set(column.key, "max-content"),
        }),
        slotContent,
      ];
    };

    return {
      name: RESIZING_FEATURE,
      modifyColumns: {
        func: modifyColumns,
      },
      scrollContainerAttributes: () => ({
        ref: (el) => {
          scrollContainer.value = el as typeof scrollContainer.value;
        },
      }),
      typeRenderer: {
        /**
         * The filler column stretches the remaining space in case the column widths are smaller than the table's intended width.
         */
        [FILLER_COLUMN]: {
          header: {
            thAttributes: { class: "onyx-data-grid-filler-column-cell", "aria-hidden": true },
            component: () => null,
          },
          cell: {
            tdAttributes: { class: "onyx-data-grid-filler-column-cell", "aria-hidden": true },
            component: () => null,
          },
        },
      },
      header: {
        wrapper:
          (cols, i, { length }) =>
          (_, { slots }) => {
            const isLastColumn = i === length - 1;
            const isFillerColumn = cols.type.name === FILLER_COLUMN;
            return renderWrapper(slots, cols, isLastColumn || isFillerColumn);
          },
      },
    };
  });
