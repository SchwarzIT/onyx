import { createDragAndDrop } from "@sit-onyx/headless";
import {
  iconCheckSmall,
  iconDraggable,
  iconToolExpandVertically,
  iconUndo,
  iconX,
} from "@sit-onyx/icons";
import {
  computed,
  h,
  ref,
  shallowRef,
  toRef,
  toValue,
  type HTMLAttributes,
  type Ref,
  type TdHTMLAttributes,
} from "vue";
import { mergeVueProps } from "../../../../utils/attrs.js";
import "./rowRearrange.scss";
import OnyxSystemButton from "../../../OnyxSystemButton/OnyxSystemButton.vue";
import type { DataGridEntry } from "../../types.js";
import {
  createTypeRenderer,
  type DataGridActionGroup,
  type RowRearrangeOptions,
  type RowRearrangeState,
} from "../all.js";
import { createFeature, type DataGridFeature } from "../index.js";

export const ROW_REARRANGE_FEATURE = Symbol("RowRearrange");
export const ROW_REARRANGE_COLUMN_KEY = Symbol("RowRearrangeColumn");
const ROW_REARRANGE_COLUMN_TYPE = Symbol();

/**
 * Given a list of entries and the current `order` map, return a new array with
 * entries sorted by their assigned index. Entries missing from the map keep
 * their original relative position and fill the remaining slots.
 */
const applyOrder = <TEntry extends DataGridEntry>(
  entries: Readonly<TEntry>[],
  order: ReadonlyMap<TEntry["id"], number>,
): Readonly<TEntry>[] => {
  if (order.size === 0) return entries;

  const placed = new Map<number, Readonly<TEntry>>();
  const unplaced: Readonly<TEntry>[] = [];

  // Separate entries into those with an assigned position and those without.
  // Later insertions win if two entries claim the same position (mirrors the
  // previous sequential behavior for that edge case).
  for (const entry of entries) {
    const assigned = order.get(entry.id);
    if (assigned == undefined) {
      unplaced.push(entry);
    } else {
      const existing = placed.get(assigned);
      if (existing) unplaced.push(existing);
      placed.set(assigned, entry);
    }
  }

  // Build the final list by placing assigned entries at their 1-based index
  // and filling the remaining slots with unplaced entries in original order.
  const result: Readonly<TEntry>[] = new Array(entries.length);
  for (let i = 0; i < result.length; i++) {
    const entry = placed.get(i + 1);
    if (entry) result[i] = entry;
  }
  for (let i = 0; i < result.length; i++) {
    if (result[i] === undefined) result[i] = unplaced.shift()!;
  }

  return result;
};

export const useRowRearrange = <TEntry extends DataGridEntry>(
  options?: RowRearrangeOptions<TEntry>,
) =>
  createFeature((ctx) => {
    const isEnabled = computed(() => toValue(options?.enabled) ?? true);
    const state = toRef(options?.state ?? { active: false, order: new Map() }) as Ref<
      RowRearrangeState<TEntry>
    >;

    /**
     * ID of the row currently being dragged.
     */
    const draggedRow = shallowRef<{ id: TEntry["id"]; tr: HTMLElement | null }>();

    /**
     * The current new order that the target would be sorted to when dropping.
     */
    const targetOrder = ref<number>();

    const cleanUp = () => {
      draggedRow.value = undefined;
      targetOrder.value = undefined;
    };

    const headless = createDragAndDrop<TEntry>({
      onDragstart: (event, entry) => {
        const tr = event.target ? (event.target as Element).closest("tr") : null;
        draggedRow.value = { id: entry.id, tr };

        if (event.dataTransfer) {
          event.dataTransfer.effectAllowed = "move";
          if (tr) event.dataTransfer.setDragImage(tr, 0, 0);
        }
      },
      onDragend: cleanUp,
      onDragover: (event) => {
        targetOrder.value = getTargetOrder(event);

        if (targetOrder.value != undefined) {
          if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
        }
      },
      onDrop: (event) => {
        const draggedRowOrderOld = getRowOrder(draggedRow.value?.tr);
        const draggedRowOrderNew = targetOrder.value;
        if (
          draggedRowOrderOld == undefined ||
          draggedRowOrderNew == undefined ||
          !draggedRow.value
        ) {
          return;
        }

        event.preventDefault();

        // adjust previously moved rows if needed
        state.value.order.forEach((order, rowId) => {
          if (draggedRowOrderOld < order && draggedRowOrderNew >= order) {
            // case 1: dropped row comes before previous re-ordered row
            state.value.order.set(rowId, order - 1);
          } else if (draggedRowOrderOld > order && draggedRowOrderNew <= order) {
            // case 2: dropped row comes after previous re-ordered row
            state.value.order.set(rowId, order + 1);
          }
        });

        state.value.order.set(draggedRow.value.id, draggedRowOrderNew);

        cleanUp();
      },
    });

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
            name: ctx.i18n.t.value("dataGrid.rowRearrange.rearrange"),
            order: 0,
          };

          return [
            {
              label: ctx.i18n.t.value("dataGrid.rowRearrange.reset"),
              icon: iconUndo,
              color: "neutral",
              displayAs: "iconButton",
              group,
              onClick: () => state.value.order.clear(),
            },
            {
              label: ctx.i18n.t.value("cancel"),
              icon: iconX,
              color: "neutral",
              displayAs: "iconButton",
              group,
              onClick: () => (state.value = { active: false, order: new Map() }),
            },
            {
              label: ctx.i18n.t.value("save"),
              icon: iconCheckSmall,
              displayAs: "button",
              group,
              onClick: () => (state.value.active = false),
            },
          ];
        }

        return [
          {
            label: ctx.i18n.t.value("dataGrid.rowRearrange.rearrange"),
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
              key: ROW_REARRANGE_COLUMN_KEY,
              label: "",
              type: { name: ROW_REARRANGE_COLUMN_TYPE },
              width: "max-content",
            },
            ...columns,
          ];
        },
      },
      typeRenderer: {
        [ROW_REARRANGE_COLUMN_TYPE]: createTypeRenderer<object, TEntry>({
          cell: {
            // we define the tdAttributes via "enhanceCells" below instead of here
            // since we need access to the row / entry data
            component: () => {
              return h(OnyxSystemButton, {
                label: ctx.i18n.t.value("dataGrid.rowRearrange.dragToMove"),
                icon: iconDraggable,
                class: "onyx-data-grid-row-rearrange-cell__button",
              });
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
          if (cell.props.column !== ROW_REARRANGE_COLUMN_KEY) return {};

          return {
            tdAttributes: mergeVueProps(headless.elements.trigger({ item: entry }), {
              class: "onyx-data-grid-row-rearrange-cell",
            } satisfies TdHTMLAttributes),
          };
        },
      },
      enhanceRow: {
        func: (row, entry, index) => {
          if (!isEnabled.value || !state.value.active) return {};

          const order = index + 1;
          const draggedRowOrder = getRowOrder(draggedRow.value?.tr);

          const before = targetOrder.value === 1 && order === 1;
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
                "onyx-data-grid-rearrange-row--highlighted": before || highlighted,
                "onyx-data-grid-rearrange-row--highlighted-before": before,
              },
            } as HTMLAttributes,
          };
        },
      },
      tableAttributes: () => {
        if (!isEnabled.value || !state.value.active) return {};
        return headless.elements.target;
      },
    };
  }) as DataGridFeature<TEntry>;

function getRowOrder(row?: HTMLElement | null) {
  const order = Number.parseInt(row?.dataset.order ?? "");
  return isNaN(order) ? undefined : order;
}
