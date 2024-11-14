import type { Meta, StoryObj } from "@storybook/vue3";
import SortingDataGrid from "../../../examples/DataGrid/SortingDataGrid.vue";
import SortingDataGridExampleCode from "../../../examples/DataGrid/SortingDataGrid.vue?raw";

const meta: Meta<typeof SortingDataGrid> = {
  title: "Data/DataGrid/Features", // new features can add their story under the same title
  component: SortingDataGrid,
  tags: ["!autodocs"],
};

export default meta;
type Story = StoryObj<typeof SortingDataGrid>;

export const Sorting = {
  args: {
    sortState: { column: "name", direction: "desc" },
    columns: {
      name: { enabled: true },
      rank: { enabled: false },
      birthday: { enabled: true, sortFunc: (a, b) => a.getTime() - b.getTime() },
    },
  },
  parameters: {
    docs: {
      source: {
        // Removes the comment enclosed block to simplify the source example
        code: SortingDataGridExampleCode.replaceAll('from "../../.."', 'from "sit-onyx"').replace(
          /\/\/ STORY SETUP START[\s\S]*\/\/ STORY SETUP END/,
          "",
        ),
      },
    },
  },
} satisfies Story;
