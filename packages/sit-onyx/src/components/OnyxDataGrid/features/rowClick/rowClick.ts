import { computed, toValue } from "vue";
import {
  DataGridRowOptionsSymbol,
  type DataGridEntry,
  type DataGridEntryOptions,
} from "../../types.js";
import { createFeature } from "../index.js";
import "./rowClick.scss";
import type { RowClickOptions } from "./types.js";

export const ROW_CLICK_FEATURE = Symbol("rowClick");

export const useRowClick = <TEntry extends DataGridEntry>(options: RowClickOptions<TEntry>) =>
  createFeature(() => {
    const isEnabled = computed(() => {
      const featureEnabled =
        typeof options.enabled === "function" ? true : (toValue(options.enabled) ?? true);

      return (row?: TEntry) => {
        if (row && typeof options.enabled === "function") {
          return options.enabled(row) ?? featureEnabled;
        }
        return featureEnabled;
      };
    });

    const handleClick = (row: TEntry, event: MouseEvent) => {
      // check if the user has selected text inside the row and ignore the click then
      if (!options.ignoreSelection) {
        const selection = window.getSelection();
        const hasSelection = !!selection?.toString();
        const anchorNode = selection?.anchorNode;
        const rowNode = (event.target as HTMLElement).closest("tr");

        if (hasSelection && anchorNode && rowNode?.contains(anchorNode)) {
          return;
        }
      }

      options.onClick?.(row);
    };

    return {
      name: ROW_CLICK_FEATURE,
      watch: [isEnabled],
      mutation: {
        func: (rows) => {
          if (!isEnabled.value()) return rows;

          return rows.map((row) => {
            if (!isEnabled.value(row)) return row;

            return {
              ...row,
              [DataGridRowOptionsSymbol]: {
                trAttributes: {
                  class: "onyx-data-grid__row--clickable",
                  onClick: (event) => handleClick(row, event),
                },
              } satisfies DataGridEntryOptions,
            };
          });
        },
      },
    };
  });
