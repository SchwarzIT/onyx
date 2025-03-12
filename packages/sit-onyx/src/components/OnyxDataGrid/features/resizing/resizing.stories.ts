import type { Meta, StoryObj } from "@storybook/vue3";
import ResizingDataGrid from "../../../examples/DataGrid/ResizingDataGrid.vue";
import ResizingDataGridExampleCode from "../../../examples/DataGrid/ResizingDataGrid.vue?raw";

const meta: Meta<typeof ResizingDataGrid> = {
  title: "Data/DataGrid/Features", // new features can add their story under the same title
  component: ResizingDataGrid,
  tags: ["!autodocs", "new:feature"],
};

export default meta;
type Story = StoryObj<typeof ResizingDataGrid>;

export const Resizing = {
  args: {
    columnResizing: true,
    disabledColumns: ["rank"],
  },
  parameters: {
    docs: {
      source: {
        // Removes the comment enclosed block to simplify the source example
        code: ResizingDataGridExampleCode.replaceAll('from "../../.."', 'from "sit-onyx"').replace(
          /\/\/ STORY SETUP START[\s\S]*\/\/ STORY SETUP END/,
          "",
        ),
      },
    },
  },
} satisfies Story;
