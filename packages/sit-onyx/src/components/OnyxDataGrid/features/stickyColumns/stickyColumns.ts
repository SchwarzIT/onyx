import { computed, nextTick, onMounted, onUnmounted, ref, toValue, useId, watch } from "vue";
import { createFeature, type ModifyColumns } from "../index.js";

import { mergeVueProps } from "../../../../utils/attrs.js";
import { escapeCSS } from "../../../../utils/dom.js";
import type { DataGridEntry } from "../../types.js";
import "./stickyColumns.scss";
import type { StickyColumnsOptions } from "./types.js";

export const STICKY_COLUMNS_FEATURE = Symbol("StickyColumns");

export const useStickyColumns = <TEntry extends DataGridEntry>(
  options?: StickyColumnsOptions<TEntry>,
) =>
  createFeature(() => {
    const stickyColumns = computed(() => toValue(options?.columns) ?? []);
    const position = computed(() => toValue(options?.position) ?? "left");
    const elementWidths = ref<Record<PropertyKey, number>>({});
    const elementsToStyle = ref<Record<PropertyKey, HTMLElement>>({});
    const stickyId = useId();
    const isScrolled = ref(false);

    const createStickyPositionCssVar = (key: PropertyKey) =>
      `--onyx-data-grid-sticky-column-position-${stickyId}-${escapeCSS(key)}`;

    // ensure ResizeObserver is only called on mount to support server side rendering
    onMounted(() => {
      if (!("ResizeObserver" in window)) return;

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
        { deep: true, immediate: true },
      );
      onUnmounted(() => resizeObserver.disconnect());
    });

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
    const handleScroll = (el: Element) => {
      const width = el.scrollWidth - el.clientWidth;
      const scrollLeft = Math.round(el.scrollLeft);
      isScrolled.value =
        (position.value === "left" && scrollLeft > 0) ||
        (position.value === "right" && scrollLeft < width);
    };

    return {
      name: STICKY_COLUMNS_FEATURE,
      watch: [position, stickyColumns, isScrolled],
      modifyColumns: {
        func: (columnConfig) => {
          const sticky = columnConfig
            .filter((col) => stickyColumns.value.includes(col.key))
            .map((column) => {
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
                thAttributes: mergeVueProps(
                  {
                    style,
                    class: {
                      "onyx-data-grid-sticky-columns--sticky": true,
                      [position.value]: true,
                      isScrolled: isScrolled.value,
                    },
                    ref: (el) => {
                      if (el) {
                        elementsToStyle.value[column.key] = el as HTMLElement;
                      } else {
                        delete elementsToStyle.value[column.key];
                      }
                    },
                  },
                  column.thAttributes,
                ),
                tdAttributes: {
                  style,
                  class: {
                    "onyx-data-grid-sticky-columns--sticky": true,
                    [position.value]: true,
                    isScrolled: isScrolled.value,
                  },
                },
              };
            });
          const nonSticky = columnConfig.filter((col) => !stickyColumns.value.includes(col.key));
          return position.value === "left"
            ? [...sticky, ...nonSticky]
            : [...nonSticky, ...sticky.slice().reverse()];
        },
      } satisfies ModifyColumns<TEntry> as ModifyColumns<TEntry>,
      scrollContainerAttributes: () => ({
        ref: (el) => {
          if (el) {
            nextTick(() => handleScroll(el as Element));
          }
        },
        onScrollCapturePassive: (e: Event) => handleScroll(e.target as HTMLElement),
      }),
    };
  });
