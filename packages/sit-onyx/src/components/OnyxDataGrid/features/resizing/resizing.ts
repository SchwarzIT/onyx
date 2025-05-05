import { h, ref, watch, type Slot, type ThHTMLAttributes } from "vue";
import { createFeature, useIsFeatureEnabled, type InternalColumnConfig } from "..";
import { mergeVueProps } from "../../../../utils/attrs";
import OnyxResizeHandle from "../../../OnyxResizeHandle/OnyxResizeHandle.vue";
import type { DataGridEntry } from "../../types";
import "./resizing.scss";
import type { ResizingOptions } from "./types";

export const RESIZING_FEATURE = Symbol("Resizing");
export const useResizing = createFeature(
  <TEntry extends DataGridEntry>(options?: ResizingOptions<TEntry>) => {
    const headers = ref(new Map<keyof TEntry, HTMLElement>());
    const { isEnabled } = useIsFeatureEnabled(options);
    const colWidths = ref(new Map<keyof TEntry, string>());

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

    const modifyColumns = (cols: Readonly<InternalColumnConfig<TEntry>[]>) => {
      return cols.map((column) => {
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
    };

    const renderWrapper = (
      slots: Readonly<{ [name: string]: Slot | undefined }>,
      cols: Readonly<InternalColumnConfig<TEntry>>,
      isLastColumn: boolean,
    ) =>
      !isEnabled.value(cols.key) || isLastColumn
        ? slots.default?.()
        : [
            h(OnyxResizeHandle, {
              element: (event) => (event.target as HTMLElement).closest("th"),
              onAutoSize: () => colWidths.value.set(cols.key, "max-content"),
              onUpdateWidth: (newWidth) => colWidths.value.set(cols.key, `${newWidth}px`),
              min: 3 * 16,
            }),
            slots.default?.(),
          ];

    return {
      name: RESIZING_FEATURE,
      watch: [],
      modifyColumns: {
        func: modifyColumns,
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
