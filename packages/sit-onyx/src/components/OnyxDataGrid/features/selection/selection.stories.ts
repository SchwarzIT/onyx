import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/vue3";
import SelectionDataGrid from "../../../examples/DataGrid/SelectionDataGrid.vue";
import SelectionDataGridExampleCode from "../../../examples/DataGrid/SelectionDataGrid.vue?raw";

const meta: Meta<typeof SelectionDataGrid> = {
  title: "Data/DataGrid/Features", // new features can add their story under the same title
  component: SelectionDataGrid,
  tags: ["!autodocs"],
  argTypes: {
    selectionState: {
      table: {
        readonly: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SelectionDataGrid>;

export const Selection = {
  args: {
    // `Set` is not displayed nicely by storybook, therefore we pass it along as an array
    ["onUpdate:selectionState"]: (update) =>
      action("onUpdate:selectionState")({ ...update, contingent: [...update.contingent] }),
  },
  parameters: {
    docs: {
      source: {
        // Removes the comment enclosed block to simplify the source example
        code: SelectionDataGridExampleCode.replaceAll('from "../../.."', 'from "sit-onyx"').replace(
          /\/\/ STORY SETUP START[\s\S]*\/\/ STORY SETUP END/,
          "",
        ),
      },
    },
  },
} satisfies Story;
