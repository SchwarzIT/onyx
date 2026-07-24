import {
  iconCheckSmall,
  iconDraggable,
  iconToolExpandVertically,
  iconUndo,
  iconX,
} from "@sit-onyx/icons";
import { computed, h, ref, shallowRef, toRef, toValue, type HTMLAttributes } from "vue";
import OnyxIcon from "../../../OnyxIcon/OnyxIcon.vue";
import type { DataGridEntry } from "../../types.js";
import {
  createTypeRenderer,
  type DataGridActionGroup,
  type RowRearrangeOptions,
  type RowRearrangeState,
} from "../all.js";
import "./rowRearrange.scss";
import { createFeature, type DataGridFeature } from "../index.js";

export const ROW_REARRANGE_FEATURE = Symbol("RowRearrange");
const REARRANGE_COLUMN_KEY = Symbol();
const REARRANGE_COLUMN_TYPE = Symbol();

/**
 * Given a list of entries and the current `order` map, return a new array with
 * entries sorted by their assigned index. Entries missing from the map keep
 * their original relative position and are appended at the end.
 */
const applyOrder = <TEntry extends DataGridEntry>(
  entries: Readonly<TEntry>[],
  order: ReadonlyMap<TEntry["id"], number>,
): Readonly<TEntry>[] => {
  if (order.size === 0) return entries;
  const orderedEntries = [...entries];

  order.forEach((order, rowId) => {
    const row = orderedEntries.find((r) => r.id === rowId);
    if (!row) return;

    orderedEntries.splice(orderedEntries.indexOf(row), 1);
    orderedEntries.splice(order - 1, 0, row);
  });

  return orderedEntries;
};

export const useRowRearrange = <TEntry extends DataGridEntry>(
  options?: RowRearrangeOptions<TEntry>,
) =>
  createFeature(() => {
    const isEnabled = computed(() => toValue(options?.enabled) ?? true);
    const state = toRef(
      options?.state ?? ({ active: false, order: new Map() } satisfies RowRearrangeState<TEntry>),
    );

    /**
     * ID of the row currently being dragged.
     */
    const draggedRow = shallowRef<{ id: TEntry["id"]; tr: HTMLElement | null }>();

    /**
     * The current new order that the target would be sorted to when dropping.
     */
    const targetOrder = ref<number>();

    const onDragstart = (event: DragEvent, entry: TEntry) => {
      const tr = event.target ? (event.target as HTMLElement).closest("tr") : null;
      draggedRow.value = { id: entry.id, tr };

      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = "move";

        // use the entire row as the drag preview instead of just the drag cell
        if (tr) event.dataTransfer.setDragImage(tr, 0, 0);
      }
    };

    const cleanUp = () => {
      draggedRow.value = undefined;
      targetOrder.value = undefined;
    };

    const onDragend = () => cleanUp();

    let isDragoverAnimationFrameTicking = false;

    const onDragover = (event: DragEvent) => {
      event.preventDefault(); // required to allow a drop

      // optimize triggering too many events by throttling them with animation frames
      if (!isDragoverAnimationFrameTicking) {
        requestAnimationFrame(() => {
          handleDragover(event);
          isDragoverAnimationFrameTicking = false;
        });
        isDragoverAnimationFrameTicking = true;
      }
    };

    const getTargetOrder = (event: DragEvent) => {
      const target = event.target as Element | null;
      const tr = target?.closest("tr");
      if (!tr) return;

      // ignore events while dragging over the same row that should be moved
      if (tr === draggedRow.value?.tr) return;

      const rect = tr.getBoundingClientRect();
      const position = event.clientY < rect.top + rect.height / 2 ? "before" : "after";

      const draggedRowOrder = getRowOrder(draggedRow.value?.tr);
      const order = getRowOrder(tr);
      if (order == undefined || draggedRowOrder == undefined) return;

      let newOrder: number;

      if (order < draggedRowOrder) {
        // case 1: row is moved top
        newOrder = position === "after" ? order + 1 : order;
      } else {
        // case 2: row is moved bottom
        newOrder = position === "after" ? order : order - 1;
      }

      return newOrder === draggedRowOrder ? undefined : newOrder;
    };

    const handleDragover = (event: DragEvent) => {
      targetOrder.value = getTargetOrder(event);

      if (targetOrder.value != undefined) {
        if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
      }
    };

    const onDrop = (event: DragEvent) => {
      if (targetOrder.value == undefined || !draggedRow.value) return;
      event.preventDefault();

      state.value.order.set(draggedRow.value.id, targetOrder.value);

      // TODO: adjust previously moved rows if needed

      cleanUp();
    };

    return {
      name: ROW_REARRANGE_FEATURE,
      watch: [isEnabled, state, targetOrder],
      mutation: {
        order: Number.MIN_SAFE_INTEGER,
        func: (entries) => {
          if (!isEnabled.value) return entries;
          return applyOrder(entries, state.value.order);
        },
      },
      actions: () => {
        if (!isEnabled.value) return [];

        if (state.value.active) {
          const group: DataGridActionGroup = {
            name: "Rearrange rows",
            order: 0,
          };

          return [
            {
              label: "Reset changes",
              icon: iconUndo,
              color: "neutral",
              displayAs: "iconButton",
              group,
              onClick: () => state.value.order.clear(),
            },
            {
              label: "Cancel",
              icon: iconX,
              color: "neutral",
              displayAs: "iconButton",
              group,
              onClick: () => (state.value = { active: false, order: new Map() }),
            },
            {
              label: "Save",
              icon: iconCheckSmall,
              displayAs: "button",
              group,
              onClick: () => (state.value.active = false),
            },
          ];
        }

        return [
          {
            label: "Rearrange rows",
            icon: iconToolExpandVertically,
            color: "neutral",
            displayAs: "button",
            onClick: () => (state.value.active = true),
          },
        ];
      },
      modifyColumns: {
        func: (columns) => {
          if (!state.value.active || !isEnabled.value) return columns;

          return [
            {
              key: REARRANGE_COLUMN_KEY,
              label: "",
              type: { name: REARRANGE_COLUMN_TYPE },
              width: "max-content",
            },
            ...columns,
          ];
        },
      },
      typeRenderer: {
        [REARRANGE_COLUMN_TYPE]: createTypeRenderer<object, TEntry>({
          cell: {
            // we define the tdAttributes via "enhanceCells" below instead of here
            // since we need access to the row / entry data
            component: () => {
              return h(OnyxIcon, { icon: iconDraggable });
            },
          },
          header: {
            // ensure no other header features are rendered for the rearrange column
            component: () => null,
          },
        }),
      },
      enhanceCells: {
        func: (cell, entry) => {
          if (cell.props.column !== REARRANGE_COLUMN_KEY) return {};
          return {
            tdAttributes: {
              class: "onyx-data-grid-row-rearrange-cell",
              // Only the handle cell is the drag source; drop targets are attached
              // to the whole row via `enhanceRow` so the user can drop anywhere.
              draggable: true,
              onDragstart: (event) => onDragstart(event, entry),
              onDragend,
            },
          };
        },
      },
      enhanceRow: {
        func: (row, entry, index) => {
          const order = index + 1;
          const draggedRowOrder = getRowOrder(draggedRow.value?.tr);
          let highlighted = false;

          if (targetOrder.value != undefined && draggedRowOrder != undefined) {
            // The highlight can only be shown as a bottom border, so we always
            // highlight the row *above* the drop position.
            // - Moving down: drop position is after row `targetOrder`, so highlight it.
            // - Moving up: drop position is before row `targetOrder`, so highlight row `targetOrder - 1`.
            const rowToHighlight =
              targetOrder.value > draggedRowOrder ? targetOrder.value : targetOrder.value - 1;
            highlighted = order === rowToHighlight;
          }

          return {
            trAttributes: {
              "data-order": order.toString(),
              class: {
                "onyx-data-grid-rearrange-row--highlighted": highlighted,
              },
            } as HTMLAttributes,
          };
        },
      },
      tableAttributes: () => ({
        onDragover,
        onDrop,
      }),
    };
  }) as DataGridFeature<TEntry>;

function getRowOrder(row?: HTMLElement | null) {
  const order = Number.parseInt(row?.dataset.order ?? "");
  return isNaN(order) ? undefined : order;
}
