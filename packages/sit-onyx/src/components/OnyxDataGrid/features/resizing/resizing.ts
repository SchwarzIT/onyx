import { h, ref, type Slot, type TdHTMLAttributes, type ThHTMLAttributes } from "vue";
import { createFeature, useIsFeatureEnabled, type InternalColumnConfig } from "..";
import { mergeVueProps } from "../../../../utils/attrs";
import type { DataGridEntry } from "../../types";
import "./resizing.scss";
import type { ResizingOptions } from "./types";

export const RESIZING_FEATURE = Symbol("Resizing");
export const useResizing = createFeature(
  <TEntry extends DataGridEntry>(options?: ResizingOptions<TEntry>) => {
    let resizingCol: Readonly<InternalColumnConfig<TEntry>>;
    const min = 70;
    const headerBeingResized = ref<Record<PropertyKey, HTMLElement>>({});
    const rowsBeingResized = ref<HTMLElement[]>([]); //ref<HTMLElement>(HTMLElement[]);
    const { isEnabled } = useIsFeatureEnabled(options);
    const columnWidths = ref<Record<PropertyKey, number>>({});

    const onMouseMove = (ev: { clientX: number }) => {
      // Calculate the desired width
      const horizontalScrollOffset = document.documentElement.scrollLeft;
      const width =
        horizontalScrollOffset + ev.clientX - headerBeingResized.value[resizingCol.key].offsetLeft;

      columnWidths.value[resizingCol.key as PropertyKey] = width;

      // Changing the width directly is needed to avoid re-rendering the table too often.
      headerBeingResized.value[resizingCol.key].style.width = Math.max(min, width) + "px";
    };

    // Clean up event listeners, classes, etc.
    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      headerBeingResized.value[resizingCol.key].classList.remove("header--being-resized");
      rowsBeingResized.value.forEach((row) =>
        row.classList.remove("onyx-data-grid--resize-border"),
      );
    };

    const initResize = (ev: Event, cols: Readonly<InternalColumnConfig<TEntry>>) => {
      const target = ev.target as HTMLElement;
      const tableEl = target.closest("table");
      resizingCol = cols;

      Object.entries(headerBeingResized.value).forEach(([key, headerRef]) => {
        const width = headerRef.getBoundingClientRect().width;
        headerRef.style.width = width + "px";
        columnWidths.value[key] = width;
      });

      headerBeingResized.value[resizingCol.key] = target.closest("th")!;
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      headerBeingResized.value[resizingCol.key].classList.add("header--being-resized");
      rowsBeingResized.value.forEach((row) => row.classList.add("onyx-data-grid--resize-border"));
      tableEl!.style.tableLayout = "fixed";
    };

    const modifyColumns = (cols: Readonly<InternalColumnConfig<TEntry>[]>) => {
      return cols.map((column) => {
        if (!isEnabled.value(column.key)) return column;

        const style = {
          width: Math.max(min, columnWidths.value[column.key]) + "px",
        };

        const tdAttributes: TdHTMLAttributes = {
          ref: (el: HTMLElement) =>
            resizingCol?.key !== null &&
            resizingCol?.key === column.key &&
            rowsBeingResized.value.push(el),
          class:
            resizingCol?.key !== null && resizingCol?.key === column.key
              ? "onyx-data-grid--resize-border"
              : "",
        } as TdHTMLAttributes;

        const thAttributes = {
          ref: (el: HTMLElement) => (headerBeingResized.value[column.key] = el),
          class:
            resizingCol?.key !== null && resizingCol?.key === column.key
              ? "header--being-resized"
              : "",
          style,
        } as ThHTMLAttributes;

        return {
          ...column,
          thAttributes: mergeVueProps(thAttributes, column.thAttributes),
          tdAttributes: mergeVueProps(tdAttributes, column.tdAttributes),
        };
      });
    };

    const renderWrapper = (
      props: object,
      slots: Readonly<{ [name: string]: Slot | undefined }>,
      cols: Readonly<InternalColumnConfig<TEntry>>,
    ) => {
      const lastColumn = Object.entries(headerBeingResized.value)[
        Object.entries(headerBeingResized.value).length - 1
      ];
      const isLastColumn = lastColumn !== undefined && lastColumn[0] === cols.key;

      const wrapper =
        !isEnabled.value(cols.key) || isLastColumn
          ? [slots.default?.()]
          : [
              h("div", {
                ...props,
                class: "onyx-data-grid--resize-handle",
                onmousedown: (ev: MouseEvent) => initResize(ev, cols),
              }),
              slots.default?.(),
            ];
      return wrapper;
    };

    return {
      name: RESIZING_FEATURE,
      watch: [headerBeingResized, columnWidths],
      modifyColumns: {
        func: modifyColumns,
      },
      header: {
        wrapper:
          (cols) =>
          (props, { slots }) =>
            renderWrapper(props, slots, cols),
      },
    };
  },
);
