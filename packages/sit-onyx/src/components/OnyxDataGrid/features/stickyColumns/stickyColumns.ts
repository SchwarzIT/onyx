import { computed, nextTick, onBeforeUnmount, ref, watchEffect } from "vue";
import { createFeature, type ModifyColumns } from "..";

import type { DataGridEntry } from "../../types";
import "./stickyColumns.scss";
import type { StickyColumnsOptions } from "./types";

export const STICKY_COLUMNS_FEATURE = Symbol("StickyColumns");

export const useStickyColumns = createFeature(
  <TEntry extends DataGridEntry>(options?: StickyColumnsOptions) => {
    const columns = computed(() => options?.columns ?? []);
    const direction = computed(() => options?.direction ?? "left");
    const elementWidths = ref<number[]>([]);
    const elementsToStyle = ref<{ el: HTMLElement; index: number }[]>([]);

    const setElementStyles = (el: HTMLElement, index: number) => {
      if (index === 0) return;
      const width = elementWidths.value.reduce((acc, currentWidth, i) => {
        if (i < index) {
          return acc + currentWidth;
        }
        return acc;
      }, 0);

      if (direction.value === "left") {
        el.style.right = "auto";
        el.style.left = `${width}px`;
      } else {
        el.style.zIndex = "22";
        el.style.left = "auto";
        el.style.right = `${width - 0.5}px`;
      }
    };

    const observeStickyState = (el: HTMLElement) => {
      const parent = el.closest(".onyx-table-wrapper__container");
      if (!parent) return;

      const updateStickyState = () => {
        const parentRect = parent.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();

        if (direction.value === "left") {
          parent.classList.toggle("is-sticky", elRect.left < parentRect.left + 1);
        } else if (direction.value === "right") {
          parent.classList.toggle("is-sticky", !(elRect.right < parentRect.right - 0.5));
        }
      };

      parent.addEventListener("scroll", updateStickyState);
      updateStickyState();
      onBeforeUnmount(() => {
        parent.removeEventListener("scroll", updateStickyState);
      });
    };
    watchEffect(() => {
      if (elementWidths.value.length > 0) {
        elementsToStyle.value.forEach(({ el, index }) => {
          setElementStyles(el, index);
        });
      }
    });

    return {
      name: STICKY_COLUMNS_FEATURE,
      watch: [direction, columns],
      modifyColumns: {
        func: (columnConfig) => {
          return columnConfig.map((column) => {
            const columnIndex = columns.value.findIndex((col) => col === column.key);
            return columns.value.includes(column.key as string)
              ? {
                  key: column.key,
                  type: column.key,
                  thAttributes: {
                    class: `sticky ${direction.value}`,
                    ref: (el: HTMLElement) => {
                      elementsToStyle.value.push({ el, index: columnIndex });
                      nextTick(() => {
                        elementWidths.value[columnIndex] = el.getBoundingClientRect().width;
                        if (columnIndex === 0) {
                          observeStickyState(el);
                        }
                      });
                    },
                  },
                  tdAttributes: {
                    class: `sticky ${direction.value}`,
                    ref: (el: HTMLElement) => {
                      elementsToStyle.value.push({ el, index: columnIndex });
                      nextTick(() => {});
                    },
                  },
                }
              : column;
          });
        },
        // TODO: Check why it isn't working without type assertion
      } satisfies ModifyColumns<TEntry> as ModifyColumns<TEntry>,
    };
  },
);
