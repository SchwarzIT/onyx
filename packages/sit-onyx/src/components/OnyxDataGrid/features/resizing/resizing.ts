import { h, ref, watch, type HTMLAttributes, type Slots, type ThHTMLAttributes } from "vue";
import { createFeature, useIsFeatureEnabled, type InternalColumnConfig } from "..";
import { useResizeObserver } from "../../../../composables/useResizeObserver";
import { mergeVueProps } from "../../../../utils/attrs";
import OnyxResizeHandle from "../../../OnyxResizeHandle/OnyxResizeHandle.vue";
import type { DataGridEntry } from "../../types";
import "./resizing.scss";
import type { ResizingOptions } from "./types";

export const RESIZING_FEATURE = Symbol("Resizing");
export const EMPTY_COLUMN = Symbol("EmptyColumn");
export const useResizing = createFeature(
  <TEntry extends DataGridEntry>(options?: ResizingOptions<TEntry>) => {
    const resizingCol = ref<Readonly<InternalColumnConfig<TEntry>>>();
    const MIN_COLUMN_WIDTH = 3 * 16;
    const headers = ref(new Map<keyof TEntry, HTMLElement>());
    const { isEnabled } = useIsFeatureEnabled(options);
    const colWidths = ref(new Map<keyof TEntry, string>());
    const showLastCol = ref(false);
    const scrollContainer = ref<HTMLElement>();
    let tableWidth: number;
    let tableWrapperWidth: number;

    watch(
      [headers, colWidths],
      () => {
        // Changing the width directly is needed to avoid re-rendering the table too often.
        headers.value.forEach((th, columnKey) => {
          const property = `--onyx-data-grid-column-${CSS.escape(String(columnKey))}`;
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

    const { width } = useResizeObserver(scrollContainer);
    watch(width, () => updateLastCol());

    const updateLastCol = () => {
      const header = resizingCol.value ? headers.value.get(resizingCol.value.key) : undefined;
      if (!header) return;

      tableWidth = header.closest(".onyx-table")?.getBoundingClientRect().width ?? 0;
      tableWrapperWidth =
        header.closest(".onyx-table-wrapper__container")?.getBoundingClientRect().width ?? 0;

      showLastCol.value = tableWrapperWidth > tableWidth;
    };

    const modifyColumns = (cols: Readonly<InternalColumnConfig<TEntry>[]>) => {
      const columns = cols.map((column) => {
        if (!isEnabled.value(column.key)) return column;

        const thAttributes = {
          ref: (el: HTMLElement) => headers.value.set(column.key, el),
          class: "onyx-data-grid-resize-cell",
        } as ThHTMLAttributes;

        const resizedWidth = colWidths.value.get(column.key);

        return {
          ...column,
          width: resizedWidth || column.width,
          thAttributes: mergeVueProps(thAttributes, column.thAttributes),
        };
      });

      if (showLastCol.value) columns.push({ key: EMPTY_COLUMN, type: EMPTY_COLUMN, label: "" });

      return columns;
    };

    const renderWrapper = (
      slots: Slots,
      cols: Readonly<InternalColumnConfig<TEntry>>,
      isLastColumn: boolean,
    ) => {
      const slotContent = slots.default?.();
      if (!isEnabled.value(cols.key) || isLastColumn) return slotContent;

      return [
        h(OnyxResizeHandle, {
          min: MIN_COLUMN_WIDTH,
          element: headers.value.get(cols.key),
          active: resizingCol.value?.key === cols.key,
          onMousedown: () => {
            resizingCol.value = cols;

            Array.from(headers.value.entries()).forEach(([col, el]) => {
              const { width } = el.getBoundingClientRect();
              colWidths.value.set(col, `${Math.max(MIN_COLUMN_WIDTH, width)}px`);
            });
          },
          onMouseup: () => {
            resizingCol.value = undefined;
          },
          onMove: () => {
            updateLastCol();
          },
          onUpdateWidth: (width) => {
            colWidths.value.set(cols.key, `${width}px`);
          },
          onAutoSize: () => colWidths.value.set(cols.key, "max-content"),
        }),
        slotContent,
      ];
    };

    return {
      name: RESIZING_FEATURE,
      watch: [showLastCol],
      modifyColumns: {
        func: modifyColumns,
      },
      scrollContainerAttributes: () =>
        ({
          ref: (el?: HTMLElement) => {
            scrollContainer.value = el;
          },
        }) as HTMLAttributes,
      typeRenderer: {
        [EMPTY_COLUMN]: {
          header: {
            thAttributes: { class: "onyx-data-grid-empty-columns-cell" },
            component: () => null,
          },
          cell: {
            tdAttributes: { class: "onyx-data-grid-empty-columns-cell" },
            component: () => null,
          },
        },
      },
      header: {
        wrapper:
          (cols, i, { length }) =>
          (_, { slots }) =>
            renderWrapper(slots, cols, i === length - 1),
      },
    };
  },
);
