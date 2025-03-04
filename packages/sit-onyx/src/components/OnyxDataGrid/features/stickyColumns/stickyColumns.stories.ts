import type { Meta, StoryObj } from "@storybook/vue3";
import StickyColumnDataGrid from "../../../examples/DataGrid/StickyColumnDataGrid.vue";
import StickyColumnExampleCode from "../../../examples/DataGrid/StickyColumnDataGrid.vue?raw";

const meta: Meta<typeof StickyColumnDataGrid> = {
  title: "Data/DataGrid/Features",
  component: StickyColumnDataGrid,
  tags: ["!autodocs"],
};

export default meta;
type Story = StoryObj<typeof StickyColumnDataGrid>;

export const StickyColumn = {
  args: {
    columns: ["name", "rank"],
    position: "left",
  },
  parameters: {
    docs: {
      source: {
        // Removes the comment enclosed block to simplify the source example
        code: StickyColumnExampleCode.replaceAll('from "../../.."', 'from "sit-onyx"').replace(
          /\/\/ STORY SETUP START[\s\S]*\/\/ STORY SETUP END/,
          "",
        ),
      },
    },
  },
} satisfies Story;
