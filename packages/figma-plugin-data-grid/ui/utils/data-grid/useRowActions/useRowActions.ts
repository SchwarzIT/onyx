import {
  createFeature,
  DataGridFeatures,
  type DataGridEntry,
  type DataGridFeature,
  type DataGridFeatureContext,
} from "sit-onyx";
import { h, type VNode } from "vue";
import "./useRowActions.scss";

export type UseRowActionsOptions<TEntry extends DataGridEntry> = {
  actions: (row: TEntry, ctx: DataGridFeatureContext) => VNode[];
};

const ACTION_COLUMN_KEY = Symbol();
const ACTION_COLUMN_TYPE = Symbol();

/**
 * Re-usable onyx data grid feature for adding an action column to each row.
 */
export const useRowActions = <TEntry extends DataGridEntry>(
  options: UseRowActionsOptions<TEntry>,
) => {
  return createFeature((ctx) => ({
    name: Symbol("rowActions"),
    modifyColumns: {
      order: Number.MAX_SAFE_INTEGER, // ensure actions are added as last column
      func: (columns) => {
        return [
          ...columns,
          {
            key: ACTION_COLUMN_KEY,
            label: "Actions",
            type: { name: ACTION_COLUMN_TYPE },
            width: "max-content",
          },
        ];
      },
    },
    typeRenderer: {
      [ACTION_COLUMN_TYPE]: DataGridFeatures.createTypeRenderer<object, TEntry>({
        cell: {
          component: ({ row }) => {
            const actions = options.actions(row, ctx);
            return h(
              "div",
              { class: ["onyx-data-grid-row-actions-cell", "onyx-density-compact"] },
              actions,
            );
          },
        },
      }),
    },
  })) as DataGridFeature<TEntry>;
};
