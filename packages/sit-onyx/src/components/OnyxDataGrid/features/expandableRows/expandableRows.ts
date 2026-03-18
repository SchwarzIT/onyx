import { iconChevronDown, iconChevronUp } from "@sit-onyx/icons";
import OnyxSystemButton from "src/components/OnyxSystemButton/OnyxSystemButton.vue";
import { DataGridFeatures } from "src/index.js";
import { h, ref, type Ref } from "vue";
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
    const expandedRows = ref<TEntry["id"][]>([]) as Ref<TEntry["id"][]>;
    const baseCols = ref<Readonly<InternalColumnConfig<TEntry>[]>>([]);
    const expandCol = {
      key: EXPAND_BUTTON_COLUMN,
      label: "",
      type: { name: EXPAND_BUTTON_RENDERER },
      width: "min-content",
    };

    const mapRow = (row: TEntry) => {
      if (!expandedRows.value.includes(row.id))
        return [
          {
            ...row,
            [DataGridRowOptionsSymbol]: {
              columns: baseCols.value,
            },
          },
        ];
      else
        return [
          {
            ...row,
            [DataGridRowOptionsSymbol]: {
              columns: baseCols.value,
            },
          },
          {
            [DataGridRowOptionsSymbol]: {
              trAttributes: {
                style: { display: "none" },
              },
            },
          },
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
      watch: [expandedRows, baseCols],
      modifyColumns: {
        func: (cols) => {
          const config = [...cols, expandCol] as InternalColumnConfig<TEntry>[];
          baseCols.value = config;

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
            component: ({ row }) => {
              const isExpanded = expandedRows.value.includes(row.id);

              return h(OnyxSystemButton, {
                icon: isExpanded ? iconChevronUp : iconChevronDown,
                label: "",
                onClick: () => {
                  if (isExpanded) {
                    expandedRows.value = expandedRows.value.filter((id) => id !== row.id);
                  } else {
                    expandedRows.value = [...expandedRows.value, row.id];
                  }
                },
              });
            },
          },
        }),
        [DETAILS_RENDERER]: DataGridFeatures.createTypeRenderer<object, TEntry>({
          cell: {
            tdAttributes: {
              colspan: 99,
            },
            component: ({ row }) => options.renderDetails(row),
          },
        }),
      },
    };
  }) as DataGridFeature<TEntry>;
