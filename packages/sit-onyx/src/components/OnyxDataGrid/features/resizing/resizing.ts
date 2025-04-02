import { h, ref, type Slot, type ThHTMLAttributes } from "vue";
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
    const { isEnabled } = useIsFeatureEnabled(options);
    const columnWidths = new Map<keyof TEntry, number>();

    const onMouseMove = (ev: { clientX: number }) => {
      // Calculate the desired width
      const width =
        ev.clientX - headerBeingResized.value[resizingCol.key].getBoundingClientRect().left;

      columnWidths.set(resizingCol.key, width);

      // Changing the width directly is needed to avoid re-rendering the table too often.
      headerBeingResized.value[resizingCol.key]
        .closest<HTMLElement>(".onyx-table-wrapper__container")
        ?.style.setProperty(
          `--onyx-data-grid-column-${String(resizingCol.key)}`,
          Math.max(min, width) + "px",
        );
    };

    // Clean up event listeners, classes, etc.
    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      headerBeingResized.value[resizingCol.key].classList.remove("header--being-resized");
    };

    const initResize = (ev: Event, cols: Readonly<InternalColumnConfig<TEntry>>) => {
      const target = ev.target as HTMLElement;
      resizingCol = cols;

      headerBeingResized.value[resizingCol.key] = target.closest("th")!;
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      window.addEventListener("mouseup", onMouseUp);
      headerBeingResized.value[resizingCol.key].classList.add("header--being-resized");
    };

    const modifyColumns = (cols: Readonly<InternalColumnConfig<TEntry>[]>) => {
      return cols.map((column) => {
        if (!isEnabled.value(column.key)) return column;

        const thAttributes = {
          ref: (el: HTMLElement) => (headerBeingResized.value[column.key] = el),
          class:
            resizingCol?.key !== null && resizingCol?.key === column.key
              ? "header--being-resized"
              : "",
        } as ThHTMLAttributes;

        const resizedWidth = columnWidths.get(column.key);

        return {
          ...column,
          width: resizedWidth ? `${Math.max(min, resizedWidth)}px` : column.width,
          thAttributes: mergeVueProps(thAttributes, column.thAttributes),
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
      watch: [headerBeingResized],
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
