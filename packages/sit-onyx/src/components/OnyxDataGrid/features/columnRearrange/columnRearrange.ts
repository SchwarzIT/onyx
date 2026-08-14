import { createDragAndDrop } from "@sit-onyx/headless";
import {
  iconCheckSmall,
  iconDraggableHorizontal,
  iconToolExpandHorizontally,
  iconUndo,
  iconX,
} from "@sit-onyx/icons";
import { computed, h, ref, shallowRef, toRef, toValue, type Ref, type ThHTMLAttributes } from "vue";
import { mergeVueProps } from "../../../../utils/attrs.js";
import OnyxSystemButton from "../../../OnyxSystemButton/OnyxSystemButton.vue";
import "./columnRearrange.scss";
import type { DataGridEntry } from "../../types.js";
import {
  type ColumnRearrangeOptions,
  type ColumnRearrangeState,
  type DataGridActionGroup,
} from "../all.js";
import { createFeature, type DataGridFeature } from "../index.js";

export const COLUMN_REARRANGE_FEATURE = Symbol("ColumnRearrange");

const applyColumnOrder = <TColumn extends { key: PropertyKey }>(
  columns: readonly TColumn[],
  order: ReadonlyMap<PropertyKey, number>,
): TColumn[] => {
  if (order.size === 0) return [...columns];

  const placed = new Map<number, TColumn>();
  const unplaced: TColumn[] = [];

  for (const column of columns) {
    const assigned = order.get(column.key);
    if (assigned == undefined) {
      unplaced.push(column);
    } else {
      const existing = placed.get(assigned);
      if (existing) unplaced.push(existing);
      placed.set(assigned, column);
    }
  }

  const result: TColumn[] = new Array(columns.length);
  for (let i = 0; i < result.length; i++) {
    const column = placed.get(i + 1);
    if (column) result[i] = column;
  }
  for (let i = 0; i < result.length; i++) {
    if (result[i] === undefined) result[i] = unplaced.shift()!;
  }

  return result;
};

export const useColumnRearrange = <TEntry extends DataGridEntry = DataGridEntry>(
  options?: ColumnRearrangeOptions,
) =>
  createFeature((ctx) => {
    const isEnabled = computed(() => toValue(options?.enabled) ?? true);
    const state = toRef(
      options?.state ?? { active: false, order: new Map() },
    ) as Ref<ColumnRearrangeState>;

    const draggedColumn = shallowRef<{ key: PropertyKey; th: HTMLElement | null }>();
    const targetOrder = ref<number>();
    const isHandleClicked = ref(false);

    const cleanUp = () => {
      draggedColumn.value = undefined;
      targetOrder.value = undefined;
      isHandleClicked.value = false;
    };

    const headless = createDragAndDrop<{ key: PropertyKey }>({
      onDragstart: (event, column) => {
        if (!isHandleClicked.value) {
          event.preventDefault();
          return;
        }

        const th = (event.target as Element | null)?.closest("th") ?? null;
        draggedColumn.value = { key: column.key, th };

        if (event.dataTransfer) {
          event.dataTransfer.effectAllowed = "move";
          if (th) event.dataTransfer.setDragImage(th, 0, 0);
        }
      },
      onDragend: cleanUp,
      onDragover: (event) => {
        targetOrder.value = getTargetOrder(event);

        if (event.dataTransfer) {
          event.dataTransfer.dropEffect = targetOrder.value != undefined ? "move" : "none";
        }
      },
      onDrop: (event) => {
        const draggedColOrderOld = getColumnOrder(draggedColumn.value?.th);
        const draggedColOrderNew = targetOrder.value;
        if (
          draggedColOrderOld == undefined ||
          draggedColOrderNew == undefined ||
          !draggedColumn.value
        ) {
          return;
        }

        event.preventDefault();

        state.value.order.forEach((order, colKey) => {
          if (draggedColOrderOld < order && draggedColOrderNew >= order) {
            state.value.order.set(colKey, order - 1);
          } else if (draggedColOrderOld > order && draggedColOrderNew <= order) {
            state.value.order.set(colKey, order + 1);
          }
        });

        state.value.order.set(draggedColumn.value.key, draggedColOrderNew);

        cleanUp();
      },
    });

    const getTargetOrder = (event: DragEvent) => {
      const target = event.target as Element | null;
      const th = target?.closest("th");
      if (!th) return;

      if (th === draggedColumn.value?.th) return;

      const rect = th.getBoundingClientRect();
      const position = event.clientX < rect.left + rect.width / 2 ? "left" : "right";

      const draggedColOrder = getColumnOrder(draggedColumn.value?.th);
      const order = getColumnOrder(th);
      if (order == undefined || draggedColOrder == undefined) return;

      let newOrder: number;

      if (order < draggedColOrder) {
        newOrder = position === "right" ? order + 1 : order;
      } else {
        newOrder = position === "right" ? order : order - 1;
      }

      return newOrder === draggedColOrder ? undefined : newOrder;
    };

    return {
      name: COLUMN_REARRANGE_FEATURE,
      watch: [isEnabled, state, targetOrder, draggedColumn],
      modifyColumns: {
        func: (columns) => {
          if (!isEnabled.value) return columns;

          const reordered = applyColumnOrder(columns, state.value.order);

          if (!state.value.active) return reordered;

          return reordered.map((column, index) => {
            const order = index + 1;
            const draggedColOrder = getColumnOrder(draggedColumn.value?.th);

            const before = targetOrder.value === 1 && order === 1;
            let highlighted = false;

            if (targetOrder.value != undefined && draggedColOrder != undefined) {
              const colToHighlight =
                targetOrder.value > draggedColOrder ? targetOrder.value : targetOrder.value - 1;
              highlighted = order === colToHighlight;
            }

            return {
              ...column,
              thAttributes: mergeVueProps(
                column.thAttributes,
                headless.elements.trigger({ item: column }),
                {
                  "data-order": order.toString(),
                  onMousedown: (event: MouseEvent) => {
                    const target = event.target as Element | null;
                    isHandleClicked.value = !!target?.closest(
                      ".onyx-data-grid-column-rearrange-header__button",
                    );
                  },
                  class: {
                    "onyx-data-grid-column-rearrange-header": true,
                    "onyx-data-grid-rearrange-column--highlighted": before || highlighted,
                    "onyx-data-grid-rearrange-column--highlighted-before": before,
                  },
                } satisfies ThHTMLAttributes & { "data-order"?: string },
              ),
            };
          });
        },
      },
      header: {
        actions: () => {
          if (!isEnabled.value || !state.value.active) return [];

          return [
            {
              iconComponent: {
                iconComponent: () =>
                  h(OnyxSystemButton, {
                    label: ctx.i18n.t.value("dataGrid.columnRearrange.dragToMove"),
                    icon: iconDraggableHorizontal,
                    color: "medium",
                    class: "onyx-data-grid-column-rearrange-header__button",
                  }),
                alwaysShowInHeader: true,
              },
            },
          ];
        },
      },
      actions: () => {
        if (!isEnabled.value) return [];

        if (state.value.active) {
          const group: DataGridActionGroup = {
            name: ctx.i18n.t.value("dataGrid.columnRearrange.rearrange"),
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
            label: ctx.i18n.t.value("dataGrid.columnRearrange.rearrange"),
            icon: iconToolExpandHorizontally,
            color: "neutral",
            displayAs: "button",
            onClick: () => (state.value.active = true),
          },
        ];
      },
      tableAttributes: () => {
        if (!isEnabled.value || !state.value.active) return {};
        return headless.elements.target;
      },
    };
  }) as DataGridFeature<TEntry>;

function getColumnOrder(th?: HTMLElement | null) {
  const order = Number.parseInt(th?.dataset.order ?? "");
  return isNaN(order) ? undefined : order;
}
