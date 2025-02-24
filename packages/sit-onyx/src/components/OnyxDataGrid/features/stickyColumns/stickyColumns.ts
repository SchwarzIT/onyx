import { computed, nextTick, ref } from "vue";
import { createFeature } from "..";

import "./stickyColumns.scss";
import type { StickyColumnsOptions } from "./types";

export const STICKY_COLUMNS_FEATURE = Symbol("StickyColumns");

export const useStickyColumns = createFeature((options?: StickyColumnsOptions) => {
  const columns = computed(() => options?.columns ?? []);
  const direction = computed(() => options?.direction ?? "left");

  const firstStickyElement = ref();

  const setElementStyles = (el: HTMLElement) => {
    const refWidth = firstStickyElement.value.getBoundingClientRect().width;
    if (direction.value === "left") {
      el.style.left = `${refWidth}px`;
    } else {
      //needs a highter z-Index so that the shadow is working
      el.style.zIndex = "22";
      el.style.right = `${refWidth - 0.5}px`;
    }
  };

  const observeStickyState = (el: HTMLElement) => {
    const parent = el.closest(".onyx-table-wrapper__scroll-container");
    if (!parent) return;

    const updateStickyState = () => {
      const parentRect = parent.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();

      if (direction.value === "left") {
        parent.classList.toggle("is-sticky", elRect.left < parentRect.left);
      } else if (direction.value === "right") {
        // needs 0.5 px to detect movements because parentRect is not 0 like in left
        parent.classList.toggle("is-sticky", !(elRect.right < parentRect.right + 0.5));
      }
    };

    parent.addEventListener("scroll", updateStickyState);
    updateStickyState();
  };

  return {
    name: STICKY_COLUMNS_FEATURE,
    watch: [direction, columns],
    modifyColumns: {
      func: (columnConfig) => {
        return columnConfig.map((column) =>
          columns.value.includes(column.key as string)
            ? { key: column.key, type: column.key }
            : column,
        );
      },
    },

    typeRenderer: Object.fromEntries(
      // eslint-disable-next-line vue/no-ref-object-reactivity-loss
      columns.value.map((col, index) => {
        return [
          col,
          {
            header: {
              thAttributes: {
                class: `sticky ${direction.value}`,
                ref: (el: HTMLElement) => {
                  nextTick(() => {
                    if (index === 0) {
                      firstStickyElement.value = el;
                      observeStickyState(el);
                    } else {
                      nextTick(() => {
                        setElementStyles(el);
                      });
                    }
                  });
                },
              },
              component: (component) => component.label,
            },
            cell: {
              tdAttributes: {
                class: `sticky ${direction.value}`,
                ref: (el: HTMLElement) => {
                  nextTick(() => {
                    if (index !== 0) setElementStyles(el);
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
