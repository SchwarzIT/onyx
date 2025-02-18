import { nextTick } from "vue";
import { createFeature } from "..";

import "./stickyColumns.scss";
import type { StickyColumnsOptions } from "./types";

export const STICKY_COLUMNS_FEATURE = Symbol("StickyColumns");

export const useStickyColumns = createFeature((options?: StickyColumnsOptions) => {
  const columns = options?.columns || [];
  const direction = options?.direction || "left";

  let firstStickyElement: HTMLElement | null = null; // Hier speichern wir das erste Sticky-Element

  const applyElementStyles = (el: HTMLElement, index: number) => {
    if (index !== 0) nextTick(() => setElementStyles(el));
  };
  const setElementStyles = (el: HTMLElement) => {
    if (!el || !firstStickyElement) return;

    const refWidth = firstStickyElement.getBoundingClientRect().width;
    if (direction === "left") {
      el.style.left = `${refWidth}px`;
    } else {
      el.style.right = `${refWidth}px`;
    }
  };

  const observeStickyState = (el: HTMLElement) => {
    const parent = el.closest(".onyx-table-wrapper__scroll-container");
    if (!parent) return;

    const updateStickyState = () => {
      const parentRect = parent.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      if (direction === "left") {
        parent.classList.toggle("is-sticky", elRect.left < parentRect.left);
      } else if (direction === "right") {
        parent.classList.toggle("is-sticky", !(elRect.right < parentRect.right + 0.5));
      }
    };
    parent.addEventListener("scroll", updateStickyState);
    updateStickyState(); // Initial check
  };

  return {
    name: STICKY_COLUMNS_FEATURE,
    watch: [options],
    modifyColumns: {
      func: (columnConfig) => {
        return columnConfig.map((column) =>
          columns.includes(column.key as string) ? { key: column.key, type: column.key } : column,
        );
      },
    },

    typeRenderer: Object.fromEntries(
      columns.map((col, index) => {
        return [
          col,
          {
            header: {
              thAttributes: {
                class: `sticky ${direction}`,
                ref: (el: HTMLElement) => {
                  nextTick(() => {
                    if (index === 0) {
                      firstStickyElement = el;
                      observeStickyState(el);
                    } else {
                      setElementStyles(el);
                    }
                  });
                },
              },
              component: (component) => component.label,
            },
            cell: {
              tdAttributes: {
                class: `sticky ${direction}`,
                ref: (el: HTMLElement) => {
                  nextTick(() => {
                    applyElementStyles(el, index);
                  });
                },
              },
              component: (component) => {
                return component.modelValue;
              },
            },
          },
        ];
      }),
    ),
  };
});
