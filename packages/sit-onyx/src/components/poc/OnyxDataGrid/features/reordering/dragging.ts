import { h } from "vue";
import type { TableFeature } from "../../OnyxDataGrid.feature";
import type { TableEntry } from "../../OnyxDataGridRenderer";
import DragIndicator from "./DragIndicator.vue";

const DRAG_FEATURE = Symbol("drag-feature");
const DRAG_KEY = Symbol("drag-key");
const DRAG_TYPE = Symbol("drag-type");

export const withDraggingFeature = <TEntry extends TableEntry>(): TableFeature<
  TEntry,
  typeof DRAG_TYPE,
  typeof DRAG_FEATURE,
  { dropzone: boolean }
> => {
  return {
    name: DRAG_FEATURE,
    state: [],
    tbodyProps: {
      onDragenter: (event) => {
        let target = event.target as HTMLElement | null | undefined;
        // eslint-disable-next-line no-cond-assign
        if ((target = target?.closest("tr"))) {
          target.classList.add("dragover");
          event.preventDefault();
        }
      },
      onDragover: (event) => {
        let target = event.target as HTMLElement | null | undefined;
        // eslint-disable-next-line no-cond-assign
        if ((target = target?.closest("tr"))) {
          event.preventDefault();
          // eslint-disable-next-line no-console
          console.log("🚀 ~ event:", event.dataTransfer);
        }
      },
      onDragleave: (event) => {
        let target = event.target as HTMLElement | null | undefined;
        // eslint-disable-next-line no-cond-assign
        if ((target = target?.closest("tr"))) {
          target.classList.remove("dragover");
          event.preventDefault();
        }
      },
    },
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
    mapping: {
      order: 2,
      func: ({ context }) => {
        context.dropzone = true;
      },
    },
    reducers: {
      dropzone: ({ contextValue, id }) =>
        contextValue
          ? {
              trProps: {
                onDrop: (event) => {
                  let target = event.target as HTMLElement | null | undefined;
                  // eslint-disable-next-line no-cond-assign
                  if ((target = target?.closest("tr"))) {
                    const sourceId = event.dataTransfer?.getData("text/onyx-table-row-id-source");
                    const targetId = id;
                    alert(`row ${sourceId} was dropped on ${targetId}`);
                    document
                      .querySelectorAll(".dragover")
                      .forEach((e) => e.classList?.remove("dragover"));
                  }
                },
              },
            }
          : undefined,
    },
  };
};
