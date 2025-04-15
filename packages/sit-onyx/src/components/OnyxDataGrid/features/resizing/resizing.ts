import { h, ref, watch, type Slot, type ThHTMLAttributes } from "vue";
import { createFeature, useIsFeatureEnabled, type InternalColumnConfig } from "..";
import { mergeVueProps } from "../../../../utils/attrs";
import type { DataGridEntry } from "../../types";
import ResizeHandle from "./ResizeHandle.vue";
import type { ResizingOptions } from "./types";

export const RESIZING_FEATURE = Symbol("Resizing");
export const useResizing = createFeature(
  <TEntry extends DataGridEntry>(options?: ResizingOptions<TEntry>) => {
    const resizingCol = ref<Readonly<InternalColumnConfig<TEntry>>>();
    const min = 3 * 16;
    const headers = ref(new Map<keyof TEntry, HTMLElement>());
    const { isEnabled } = useIsFeatureEnabled(options);
    const colWidths = ref(new Map<keyof TEntry, string>());
    let previousWidth: string | undefined = undefined;
    let abortController: AbortController | undefined = undefined;

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

    const onMouseMove = (ev: MouseEvent) => {
      const colKey = resizingCol.value?.key;
      const header = headers.value.get(colKey!);
      if (!header || !colKey) {
        return;
      }

      // Calculate the desired width
      const width = ev.clientX - header.getBoundingClientRect().left;
      colWidths.value.set(colKey, `${Math.max(min, width)}px`);
    };

    // Clean up event listeners, classes, etc.
    const onMouseUp = () => {
      abortController?.abort();
      previousWidth = undefined;
      resizingCol.value = undefined;
    };

    const onKeydown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }
      if (previousWidth && resizingCol.value) {
        colWidths.value.set(resizingCol.value.key, previousWidth);
      }
      onMouseUp();
    };

    const initResize = (ev: Event, col: Readonly<InternalColumnConfig<TEntry>>) => {
      const target = ev.target as HTMLElement;
      resizingCol.value = col;
      previousWidth = colWidths.value.get(resizingCol.value.key);

      Array.from(headers.value.entries()).forEach(([col, el]) => {
        const { width } = el.getBoundingClientRect();
        colWidths.value.set(col, `${Math.max(min, width)}px`);
      });

      const th = target.closest("th")!;
      headers.value.set(resizingCol.value.key, th);

      abortController = new AbortController();
      const options = { signal: abortController.signal, passive: true };
      window.addEventListener("mousemove", onMouseMove, options);
      window.addEventListener("mouseup", onMouseUp, options);
      window.addEventListener("keydown", onKeydown, options);
    };

    const modifyColumns = (cols: Readonly<InternalColumnConfig<TEntry>[]>) => {
      return cols.map((column) => {
        if (!isEnabled.value(column.key)) return column;

        const thAttributes = {
          ref: (el: HTMLElement) => headers.value.set(column.key, el),
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
            h(ResizeHandle, {
              beingResized: resizingCol.value?.key === cols.key,
              onStartResize: (ev: MouseEvent) => initResize(ev, cols),
              onAutoSize: () => colWidths.value.set(cols.key, "max-content"),
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
