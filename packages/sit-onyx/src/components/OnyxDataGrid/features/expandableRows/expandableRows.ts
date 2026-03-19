import { iconChevronDown, iconChevronUp } from "@sit-onyx/icons";
import { h, ref } from "vue";
import { DataGridFeatures } from "../../../../index.js";
import OnyxSystemButton from "../../../OnyxSystemButton/OnyxSystemButton.vue";
import { DataGridRowOptionsSymbol, type DataGridEntry } from "../../types.js";
import { createFeature, type DataGridFeature, type InternalColumnConfig } from "../index.js";
import type { UseExpandableRowsOptions } from "./types.js";

const EXPANDABLE_ROWS_FEATURE = Symbol("ExpandableRowsFeature");
const EXPAND_BUTTON_COLUMN = Symbol("ExpandButtonColumn");
const EXPAND_BUTTON_RENDERER = Symbol("ExpandButtonRenderer");
const DETAILS_COLUMN = Symbol("DetailsColumn");
const DETAILS_RENDERER = Symbol("DetailsRenderer");

export const useExpandableRows = <TEntry extends DataGridEntry>(
  options: UseExpandableRowsOptions<TEntry>,
) =>
  createFeature(() => {
    const columnConfig = ref<Readonly<InternalColumnConfig<TEntry>[]>>([]);

    const expandedRows = ref<Set<PropertyKey>>(new Set());
    const toggleExpanded = (id: PropertyKey) => {
      if (expandedRows.value.has(id)) {
        expandedRows.value.delete(id);
      } else {
        expandedRows.value.add(id);
      }
    };

    /**
     * Adds the detail row for expandedd columns
     */
    const mapRow = (row: TEntry) => {
      if (!expandedRows.value.has(row.id))
        return [
          // don't change anything
          {
            ...row,
            [DataGridRowOptionsSymbol]: {
              columns: columnConfig.value,
            },
          },
        ];
      else
        return [
          {
            ...row,
            [DataGridRowOptionsSymbol]: {
              columns: columnConfig.value,
            },
          },
          // add hidden row to keep striped pattern
          {
            [DataGridRowOptionsSymbol]: {
              trAttributes: {
                style: { display: "none" },
              },
            },
          },
          // add row for details
          {
            ...row,
            id: row.id,
            [DataGridRowOptionsSymbol]: {
              columns: [{ key: DETAILS_COLUMN, type: { name: DETAILS_RENDERER } }],
            },
          },
        ];
    };

    return {
      name: EXPANDABLE_ROWS_FEATURE,
      watch: [expandedRows, columnConfig],
      modifyColumns: {
        func: (cols) => {
          const config = [
            {
              key: EXPAND_BUTTON_COLUMN,
              label: "",
              type: { name: EXPAND_BUTTON_RENDERER },
              width: "min-content",
            },
            ...cols,
          ] as InternalColumnConfig<TEntry>[];

          // Store the column configuration with column for expand button for later reference
          columnConfig.value = config;
          return config;
        },
      },
      mutation: {
        func: (rows) => {
          return rows.flatMap(mapRow);
        },
      },

      typeRenderer: {
        [EXPAND_BUTTON_RENDERER]: DataGridFeatures.createTypeRenderer<object, TEntry>({
          cell: {
            component: ({ row }) =>
              h(OnyxSystemButton, {
                icon: expandedRows.value.has(row.id) ? iconChevronUp : iconChevronDown,
                label: "",
                onClick: () => {
                  toggleExpanded(row.id);
                },
              }),
          },
        }),
        [DETAILS_RENDERER]: DataGridFeatures.createTypeRenderer<object, TEntry>({
          cell: {
            tdAttributes: {
              colspan: 99,
            },
            component: ({ row }) => options.detailsComponent(row),
          },
        }),
      },
    };
  }) as DataGridFeature<TEntry>;
