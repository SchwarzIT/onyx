import { iconChevronDown, iconChevronUp } from "@sit-onyx/icons";
import { h, toRef } from "vue";
import OnyxSystemButton from "../../../OnyxSystemButton/OnyxSystemButton.vue";
import {
  DataGridRowOptionsSymbol,
  type DataGridEntry,
  type DataGridEntryOptions,
} from "../../types.js";
import { createFeature, type DataGridFeature } from "../index.js";
import { createTypeRenderer } from "../renderer.js";
import "./expandableRows.scss";
import type { UseExpandableRowsOptions } from "./types.js";

const EXPANDABLE_ROWS_FEATURE_NAME = Symbol("ExpandableRows");
const BUTTON_COLUMN_KEY = Symbol("ExpandButtonKey");
const BUTTON_COLUMN_TYPE = Symbol("ExpandButtonType");
const DETAILS_COLUMN_TYPE = Symbol("ExpandDetailsType");

export const useExpandableRows = <TEntry extends DataGridEntry>(
  options: UseExpandableRowsOptions<TEntry>,
) =>
  createFeature((ctx) => {
    const expandedRows = toRef(options?.expandedState ?? new Set<PropertyKey>());

    const toggleExpanded = (rowId: TEntry["id"]) => {
      if (expandedRows.value.has(rowId)) expandedRows.value.delete(rowId);
      else expandedRows.value.add(rowId);
    };

    return {
      name: EXPANDABLE_ROWS_FEATURE_NAME,
      watch: [expandedRows],
      modifyColumns: {
        order: Number.MAX_SAFE_INTEGER,
        func: (columns) => {
          return [
            {
              key: BUTTON_COLUMN_KEY,
              label: "",
              type: { name: BUTTON_COLUMN_TYPE },
              width: "max-content",
            },
            ...columns,
          ];
        },
      },
      mutation: {
        order: Number.MIN_SAFE_INTEGER,
        func: (rows) => {
          return rows.flatMap((row) => {
            const isExpanded = expandedRows.value.has(row.id);
            if (!isExpanded) return row;

            return [
              row,
              {
                id: Symbol(`expandable-row-content-${row.id.toString()}`),
                [DataGridRowOptionsSymbol]: {
                  trAttributes: {
                    class: "onyx-table__standalone-row",
                  },
                  columns: [
                    {
                      key: "id",
                      type: { name: DETAILS_COLUMN_TYPE, options: { parentRow: row } },
                    },
                  ],
                } satisfies DataGridEntryOptions,
              },
            ];
          });
        },
      },
      typeRenderer: {
        [BUTTON_COLUMN_TYPE]: createTypeRenderer({
          header: {
            // ensure no header actions are rendered from other features like sorting, filtering etc.
            component: () => null,
          },
          cell: {
            tdAttributes: {
              class: "onyx-data-grid-expand-cell",
            },
            component: ({ row }) => {
              const isExpanded = expandedRows.value.has(row.id);

              return h(OnyxSystemButton, {
                class: "onyx-data-grid-expand-button",
                label: ctx.i18n.t.value("accordion.toggle"),
                icon: isExpanded ? iconChevronUp : iconChevronDown,
                skeleton: ctx.skeleton.value,
                "aria-expanded": isExpanded,
                onClick: () => toggleExpanded(row.id),
              });
            },
          },
        }),
        [DETAILS_COLUMN_TYPE]: createTypeRenderer<{ parentRow?: TEntry }, TEntry>({
          cell: {
            tdAttributes: {
              class: "onyx-data-grid-expand-details",
              colspan: 99,
            },
            component: ({ metadata }) => {
              const parentRow = metadata?.typeOptions?.parentRow;
              if (!parentRow) return;
              return options.component(parentRow);
            },
          },
        }),
      },
    };
  }) as DataGridFeature<TEntry>;
