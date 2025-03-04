import { computed, onUnmounted, ref, useId, watch } from "vue";
import { createFeature, type ModifyColumns } from "..";

import type { DataGridEntry } from "../../types";
import "./stickyColumns.scss";
import type { StickyColumnsOptions } from "./types";

export const STICKY_COLUMNS_FEATURE = Symbol("StickyColumns");

export const useStickyColumns = createFeature(
  <TEntry extends DataGridEntry>(options?: StickyColumnsOptions<TEntry>) => {
    const stickyColumns = computed(() => options?.columns ?? []);
    const position = computed(() => options?.position ?? "left");
    const elementWidths = ref<Record<PropertyKey, number>>({});
    const elementsToStyle = ref<Record<PropertyKey, HTMLElement>>({});
    const stickyId = useId();

    const createStickyPositionCssVar = (key: PropertyKey) =>
      `--onyx-data-grid-sticky-column-position-${stickyId}-${String(key)}`;

    const resizeObserver = new ResizeObserver(() => {
      Object.entries(elementsToStyle.value).forEach(
        ([column, el]: [PropertyKey, HTMLElement]) =>
          (elementWidths.value[column] = el.getBoundingClientRect().width),
      );

      stickyColumns.value.forEach((columnKey, i) => setElementStyles(columnKey, i));
    });

    watch(
      elementsToStyle,
      () => {
        resizeObserver.disconnect();
        Object.values(elementsToStyle.value).forEach((el) => resizeObserver.observe(el));
      },
      { deep: true },
    );
    onUnmounted(() => resizeObserver.disconnect());

    const setElementStyles = (key: PropertyKey, index: number) => {
      if (!options) return;
      const width = stickyColumns.value
        .map((key) => elementWidths.value[key])
        .reduce((acc, currentWidth, i) => {
          if (i < index) {
            return acc + currentWidth;
          }
          return acc;
        }, 0);

      document.body.style.setProperty(createStickyPositionCssVar(key), `${width}px`);
    };

    return {
      name: STICKY_COLUMNS_FEATURE,
      watch: [position, stickyColumns],
      modifyColumns: {
        func: (columnConfig) => {
          const sticky = columnConfig.filter((col) => stickyColumns.value.includes(col.key));
          const nonSticky = columnConfig.filter((col) => !stickyColumns.value.includes(col.key));
          return (
            position.value === "left"
              ? [...sticky, ...nonSticky]
              : [...nonSticky, ...sticky.slice().reverse()]
          ).map((column) => {
            if (!stickyColumns.value.includes(column.key)) return column;
            const style =
              position.value === "left"
                ? {
                    right: "auto",
                    left: `var(${createStickyPositionCssVar(column.key)})`,
                  }
                : {
                    left: "auto",
                    right: `var(${createStickyPositionCssVar(column.key)})`,
                  };
            return {
              ...column,
              thAttributes: {
                style,
                class: `onyx-data-grid-sticky-columns--sticky ${position.value}`,
                ref: (el: HTMLElement) => (elementsToStyle.value[column.key] = el),
              },
              tdAttributes: {
                style,
                class: `onyx-data-grid-sticky-columns--sticky ${position.value}`,
              },
            };
          });
        },
      } satisfies ModifyColumns<TEntry> as ModifyColumns<TEntry>,
    };
  },
);
