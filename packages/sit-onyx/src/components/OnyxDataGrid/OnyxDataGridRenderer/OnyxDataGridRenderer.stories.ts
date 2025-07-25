import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";
import type { DataGridEntry } from "../types/index.js";
import OnyxDataGridRenderer from "./OnyxDataGridRenderer.vue";
import type { DataGridRendererCell, DataGridRendererColumn, DataGridRendererRow } from "./types.js";

const meta: Meta<typeof OnyxDataGridRenderer> = {
  title: "Support/DataGridRenderer",
  component: OnyxDataGridRenderer,
};

export default meta;
type Story = StoryObj<typeof OnyxDataGridRenderer>;

export const Default = {
  args: {
    columns: Array.from({ length: 4 }, (_, index) => getDummyColumn(index + 1)),
    rows: Array.from({ length: 6 }, (_, index) => getDummyRow(index + 1)),
  },
} satisfies Story;

/**
 * This example shows a data grid that renders grouped rows and columns.
 */
export const GroupedData = {
  args: {
    ...Default.args,
    columnGroups: [
      { key: "ungrouped", span: 1 },
      { key: "group-1", span: 2, header: "Group 1" },
      { key: "group-2", span: 1, header: "Group 2" },
    ],
    rows: [
      ...Array.from({ length: 3 }, (_, index) => getDummyRow(index + 1)),
      {
        ...getDummyRow(4),
        cells: {
          "column-1": getDummyCell(`Row 4, cell 1`, "column-1"),
          "column-2": {
            ...getDummyCell(`Row 4, cell 2, 3 and 4`, "column-2"),
            tdAttributes: {
              colspan: 3,
            },
          },
        },
      },
    ],
  },
} satisfies Story;

/**
 * Creates a new column for use as Storybook example.
 */
function getDummyColumn(columnNumber: number): DataGridRendererColumn<DataGridEntry> {
  return {
    key: `column-${columnNumber}`,
    component: () => h("span", `Column ${columnNumber}`),
  };
}

/**
 * Creates a new cell for use as Storybook example.
 */
function getDummyCell(
  id: string,
  columnKey: keyof DataGridEntry,
): DataGridRendererCell<DataGridEntry> {
  return {
    component: (props) => h("span", props.row.id.toString()),
    props: {
      key: columnKey,
      row: {
        id,
      },
    },
  };
}

/**
 * Creates a new row for use as Storybook example.
 */
function getDummyRow(rowNumber: number): DataGridRendererRow<DataGridEntry> {
  const columns: DataGridRendererRow<DataGridEntry>["columns"] = Array.from(
    { length: 4 },
    (_, index) => getDummyColumn(index + 1),
  );

  return {
    id: `row-${rowNumber}`,
    columns,
    cells: {
      "column-1": getDummyCell(`Row ${rowNumber}, cell 1`, columns[0].key),
      "column-2": getDummyCell(`Row ${rowNumber}, cell 2`, columns[1].key),
      "column-3": getDummyCell(`Row ${rowNumber}, cell 3`, columns[2].key),
      "column-4": getDummyCell(`Row ${rowNumber}, cell 4`, columns[3].key),
    },
  };
}
