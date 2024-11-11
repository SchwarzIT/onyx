import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import SortingDataGrid from "../examples/DataGrid/SortingDataGrid.vue";
import SortingDataGridExampleCode from "../examples/DataGrid/SortingDataGrid.vue?raw";
import OnyxDataGrid from "./OnyxDataGrid.vue";

const meta: Meta<typeof OnyxDataGrid> = {
  title: "Data/DataGrid",
  component: OnyxDataGrid,
};

export default meta;
type Story = StoryObj<typeof OnyxDataGrid>;

export const Default = {
  args: {
    columns: ["name", "age", "birthday"],
    data: [
      { id: 1, name: "Alice", age: 30, birthday: new Date("1990-01-01") },
      { id: 2, name: "Charlie", age: 35, birthday: new Date("1998-02-11") },
      { id: 3, name: "Bob", age: 25, birthday: new Date("1995-06-15") },
    ],
  },
} satisfies Story;

export const Sorting = {
  ...Default,
  render: (props) => h(SortingDataGrid, { ...props, onSortChange: action("sorting changed") }),
  parameters: {
    docs: {
      source: {
        code: SortingDataGridExampleCode.replaceAll('from "../../.."', 'from "sit-onyx"'),
      },
    },
  },
} satisfies Story;
