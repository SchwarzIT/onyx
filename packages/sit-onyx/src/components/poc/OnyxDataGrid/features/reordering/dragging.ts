import { h } from "vue";
import type { TableFeature } from "../../OnyxDataGrid.feature";
import type { TableEntry } from "../../OnyxDataGridRenderer";
import DragIndicator from "./DragIndicator.vue";

const DRAG_FEATURE = Symbol("drag-feature");
const DRAG_KEY = Symbol("drag-key");
const DRAG_TYPE = Symbol("drag-type");

export const withDraggingFeature = <TEntry extends TableEntry>(): TableFeature<
  TEntry,
  typeof DRAG_TYPE
> => {
  return {
    name: DRAG_FEATURE,
    state: [],
    modifyHeaders: {
      func: (headers) => [{ key: DRAG_KEY, headerProps: {}, header: () => "" }, ...headers],
      order: 2,
    },
    modifyTypes: {
      order: 1,
      func: (types) => ({
        ...types,
        [DRAG_TYPE]: ({ row }) => h(DragIndicator, { rowId: row.id }),
      }),
    },
    modifyColumns: {
      func: (cols) => [{ key: DRAG_KEY, type: DRAG_TYPE }, ...cols],
      order: 1,
    },
    mutation: {
      order: 5,
      func: (state) => state,
    },
  };
};
