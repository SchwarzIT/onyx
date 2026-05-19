import { createFeature, DataGridRowOptionsSymbol, type DataGridEntry } from "sit-onyx";
/**
 * Custom Feature for Row Clicks.
 */
export const useRowClickFeature = <TEntry extends DataGridEntry>(rowClick: (row: TEntry) => void) =>
  createFeature(() => ({
    name: Symbol("row-click-feature"),
    mutation: {
      func: (rows: TEntry[]) =>
        rows.map((row) => {
          const existingOptions = row[DataGridRowOptionsSymbol] || {};

          return {
            ...row,
            [DataGridRowOptionsSymbol]: {
              ...existingOptions,
              trAttributes: {
                ...existingOptions.trAttributes,
                style: { cursor: "pointer" },
                onClick: (event: MouseEvent) => {
                  const target = event.target as HTMLElement;
                  const cell = target.closest("td");
                  if (!cell) return;

                  const hasSelection = !!window.getSelection()?.toString();

                  if (hasSelection) return;

                  rowClick(row);
                },
              },
            },
          };
        }),
    },
  }));
