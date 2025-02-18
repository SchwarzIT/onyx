import { createFeature } from "..";

import "./stickyColumns.scss";
import type { StickyColumnsOptions } from "./types";

export const STICKY_COLUMNS_FEATURE = Symbol("StickyColumns");

export const useStickyColumns = createFeature((options?: StickyColumnsOptions) => {
  const columns: string[] = options?.columns || [];
  const direction = options?.direction || "right";

  const observeStickyState = (el: HTMLElement) => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        el.classList.toggle("is-sticky", entry.intersectionRatio < 1);
      },
      { threshold: [1] },
    );

    observer.observe(el);
  };

  return {
    name: STICKY_COLUMNS_FEATURE,

    modifyColumns: {
      func: (columnConfig) => {
        return columnConfig.map((column) =>
          columns.includes(column.key as string) ? { key: column.key, type: column.key } : column,
        );
      },
    },

    typeRenderer: Object.fromEntries(
      columns.map((col) => {
        return [
          col,
          {
            header: {
              thAttributes: {
                class: `sticky ${direction}`,
                ref: (el: HTMLElement) => observeStickyState(el),
              },
              component: (component) => component.label,
            },
            cell: {
              tdAttributes: {
                class: {
                  sticky: true,
                },
                ref: (el: HTMLElement) => observeStickyState(el),
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
