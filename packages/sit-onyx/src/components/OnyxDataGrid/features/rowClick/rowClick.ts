import { computed, toValue, type TdHTMLAttributes } from "vue";
import { mergeVueProps } from "../../../../utils/attrs.js";
import {
  DataGridRowOptionsSymbol,
  type DataGridEntry,
  type DataGridEntryOptions,
} from "../../types.js";
import { createFeature, type DataGridFeature } from "../index.js";
import "./rowClick.scss";
import type { RowClickOptions } from "./types.js";

export const ROW_CLICK_FEATURE = Symbol("rowClick");
const notClickableClass = "onyx-data-grid__cell--not-clickable";

export const useRowClick = <TEntry extends DataGridEntry>(options: RowClickOptions<TEntry>) =>
  createFeature(() => {
    /** Whether the feature is enabled in general. */
    const isFeatureEnabled = computed(() => {
      if (typeof options.enabled == "function") return true;
      return toValue(options.enabled) ?? true;
    });

    /** Whether a specific cell is enabled. */
    const isCellEnabled = computed(() => {
      return (row: TEntry, column: keyof TEntry) => {
        if (typeof options.enabled === "function") {
          return options.enabled(row, column) ?? isFeatureEnabled.value;
        }
        return isFeatureEnabled.value;
      };
    });

    const handleClick = (row: TEntry, event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      // check if the user has selected text inside the row and ignore the click then
      const rowElement = target.closest("tr");
      if (!options.ignoreSelection && hasSelection(rowElement)) return;

      // check if cell is configured to not be clickable
      const cellElement = target.closest("td");
      if (cellElement?.classList.contains(notClickableClass)) {
        return;
      }

      options.onClick?.(row, event);
    };

    return {
      name: ROW_CLICK_FEATURE,
      watch: [isFeatureEnabled, isCellEnabled],
      mutation: {
        func: (rows) => {
          if (!isFeatureEnabled.value) return rows;

          return rows.map((row) => {
            return {
              ...row,
              [DataGridRowOptionsSymbol]: {
                trAttributes: {
                  class: "onyx-data-grid__row",
                  onClick: (event) => handleClick(row, event),
                },
              } satisfies DataGridEntryOptions,
            };
          });
        },
      },
      enhanceCells: {
        func: (cell, entry) => {
          if (isCellEnabled.value(entry, cell.props.column)) return cell;

          return {
            ...cell,
            tdAttributes: mergeVueProps(cell.tdAttributes, {
              class: notClickableClass,
            } satisfies TdHTMLAttributes),
          };
        },
      },
    };
  }) as DataGridFeature<TEntry>;

/**
 * Checks whether the given element contains a [selection](https://developer.mozilla.org/en-US/docs/Web/API/Selection).
 */
function hasSelection(element: HTMLElement | null): boolean {
  if (!element) return false;
  const selection = window.getSelection();
  if (!selection?.toString()) return false;
  return element.contains(selection.anchorNode);
}
