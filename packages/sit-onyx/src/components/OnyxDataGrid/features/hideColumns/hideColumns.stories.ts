import type { Meta, StoryObj } from "@storybook/vue3";
import HideColumnsDataGrid from "../../../examples/DataGrid/hideColumnsDataGrid.vue";
import HideColumnsDataGridExampleCode from "../../../examples/DataGrid/hideColumnsDataGrid.vue?raw";

const meta: Meta<typeof HideColumnsDataGrid> = {
  title: "Data/DataGrid/Features", // new features can add their story under the same title
  component: HideColumnsDataGrid,
  tags: ["!autodocs", "new:feature"],
};

export default meta;
type Story = StoryObj<typeof HideColumnsDataGrid>;

export const HideColumns = {
  args: {
    // columns: [{ name: "name" }, { name: "rank", hidden: true }],
  },
  parameters: {
    docs: {
      source: {
        // Removes the comment enclosed block to simplify the source example
        code: HideColumnsDataGridExampleCode.replaceAll(
          'from "../../.."',
          'from "sit-onyx"',
        ).replace(/\/\/ STORY SETUP START[\s\S]*\/\/ STORY SETUP END/, ""),
      },
    },
  },
} satisfies Story;
