import { h } from "vue";
import type { TableFeature } from "../../OnyxDataGrid.feature";
import type { TableEntry } from "../../OnyxDataGridRenderer";
import DragIndicator from "./DragIndicator.vue";

export const withDraggingFeature = <TEntry extends TableEntry>(): TableFeature<TEntry> => {
  const featureName = "Dragging";
  const dragKey = Symbol("drag-key");
  const dragType = Symbol("drag-type");

  return {
    name: featureName,
    state: [],
    modifyHeaders: {
      func: (headers) => [{ key: dragKey, headerProps: {}, header: () => "" }, ...headers],
      order: 2,
    },
    modifyTypes: {
      order: 1,
      func: (types) => ({
        ...types,
        [dragType]: ({ row }) => h(DragIndicator, { rowId: row.id }),
      }),
    },
    modifyColumns: {
      func: (cols) => [{ key: dragKey, type: dragType }, ...cols],
      order: 1,
    },
    mutation: {
      order: 5,
      func: (state) => state,
    },
  };
};
