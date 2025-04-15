import type { Meta, StoryObj } from "@storybook/vue3";
import { h, type TdHTMLAttributes } from "vue";
import type { DataGridEntry } from "../types";
import OnyxDataGridRenderer from "./OnyxDataGridRenderer.vue";
import type { DataGridRendererCell, DataGridRendererColumn, DataGridRendererRow } from "./types";

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
    columnGroups: [
      {
        key: "ungrouped",
        span: 1,
      },
      {
        key: "group-1",
        span: 2,
        header: "Group 1",
      },
      {
        key: "group-2",
        span: 1,
        header: "Group 2",
      },
    ],
    columns: Array.from({ length: 4 }, (_, index) => getDummyColumn(index + 1)),
    rows: [
      {
        id: "row-1",
        cells: {
          "column-1": getDummyCell(`Row 1, cell 1`),
          "column-2": getDummyCell(`Row 1, cell 2`),
          "column-3": getDummyCell(`Row 1, cell 3`),
          "column-4": getDummyCell(`Row 1, cell 4`),
        },
      },
      {
        id: "row-2",
        cells: {
          "column-1": getDummyCell(`Row 2, cell 1`),
          "column-2": getDummyCell(`Row 2, cell 2`),
          "column-3": getDummyCell(`Row 2, cell 3`),
          "column-4": getDummyCell(`Row 2, cell 4`),
        },
      },
      {
        id: "row-3",
        cells: {
          "column-1": getDummyCell(`Row 3, cell 1`),
          "column-2": getDummyCell(`Row 3, cell 2`),
          "column-3": getDummyCell(`Row 3, cell 3`),
          "column-4": getDummyCell(`Row 3, cell 4`),
        },
      },
      {
        id: "row-4",
        cells: {
          "column-1": getDummyCell(`Row 4, cell 1`),
          "column-2": getDummyCell(`Row 4, cell 2, 3 and 4`, {
            colspan: 3,
          }),
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
  tdAttributes?: TdHTMLAttributes,
): DataGridRendererCell<DataGridEntry> {
  return {
    component: (props) => h("span", props.row.id.toString()),
    tdAttributes,
    props: {
      row: {
        id,
      },
    },
  };
}

/**
 * Creates a new row for use as Storybook example.
 */
function getDummyRow(
  rowNumber: number,
): DataGridRendererRow<{ id: PropertyKey; [key: PropertyKey]: unknown }> {
  return {
    id: `row-${rowNumber}`,
    cells: {
      "column-1": getDummyCell(`Row ${rowNumber}, cell 1`),
      "column-2": getDummyCell(`Row ${rowNumber}, cell 2`),
      "column-3": getDummyCell(`Row ${rowNumber}, cell 3`),
      "column-4": getDummyCell(`Row ${rowNumber}, cell 4`),
    },
  };
}
