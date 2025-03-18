import { h, ref, type Slot, type TdHTMLAttributes } from "vue";
import { createFeature, useIsFeatureEnabled, type InternalColumnConfig } from "..";
import { mergeVueProps } from "../../../../utils/attrs";
import type { DataGridEntry } from "../../types";
import "./resizing.scss";
import type { ResizingOptions } from "./types";

export const RESIZING_FEATURE = Symbol("Resizing");
export const useResizing = createFeature(
  <TEntry extends DataGridEntry>(options?: ResizingOptions<TEntry>) => {
    let column: Readonly<InternalColumnConfig<TEntry>>;
    const min = 70;
    const headerBeingResized = ref<Record<PropertyKey, HTMLElement>>({});
    const { isEnabled } = useIsFeatureEnabled(options);

    const onMouseMove = (ev: { clientX: number }) => {
      // Calculate the desired width
      const horizontalScrollOffset = document.documentElement.scrollLeft;
      const width =
        horizontalScrollOffset + ev.clientX - headerBeingResized.value[column.key].offsetLeft;

      headerBeingResized.value[column.key].style.width = Math.max(min, width) + "px";
    };

    // Clean up event listeners, classes, etc.
    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      headerBeingResized.value[column.key].classList.remove("header--being-resized");
      headerBeingResized.value = {};
    };

    const initResize = (ev: Event, cols: Readonly<InternalColumnConfig<TEntry>>) => {
      const target = ev.target as HTMLElement;
      column = cols;

      headerBeingResized.value[column.key] = target.closest("th")!;
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      headerBeingResized.value[column.key].classList.add("header--being-resized");
    };

    const modifyColumns = (cols: Readonly<InternalColumnConfig<TEntry>[]>) => {
      return cols.map((column) => {
        if (!isEnabled.value(column.key)) return column;

        const tdAttributes: TdHTMLAttributes | undefined = {
          class: Object.keys(headerBeingResized.value).includes(column.key as string)
            ? "onyx-data-grid--resize-border"
            : "",
        };

        return {
          ...column,
          tdAttributes: mergeVueProps(tdAttributes, column.tdAttributes),
        };
      });
    };

    const renderWrapper = (
      props: object,
      slots: Readonly<{ [name: string]: Slot | undefined }>,
      cols: Readonly<InternalColumnConfig<TEntry>>,
    ) => {
      const wrapper = !isEnabled.value(cols.key)
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
