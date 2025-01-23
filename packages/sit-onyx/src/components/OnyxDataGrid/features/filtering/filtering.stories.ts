import type { Meta, StoryObj } from "@storybook/vue3";
import FilteringDataGrid from "../../../examples/DataGrid/FilteringDataGrid.vue";
import FilteringDataGridExampleCode from "../../../examples/DataGrid/FilteringDataGrid.vue?raw";

const meta: Meta<typeof FilteringDataGrid> = {
  title: "Data/DataGrid/Features", // new features can add their story under the same title
  component: FilteringDataGrid,
  tags: ["!autodocs"],
};

export default meta;
type Story = StoryObj<typeof FilteringDataGrid>;

export const Filtering = {
  args: {
    columns: {
      name: {
        enabled: true,
        filter: "",
        filterConfig: {
          caseSensitive: true,
        },
      },
      rank: { enabled: false },
      birthday: {
        enabled: true,
        filterConfig: {},
      },
    },
    filterConfig: {
      caseSensitive: false,
      exactMatch: false,
      searchFromStart: false,
      trimWhitespace: true,
    },
    updateMode: "onEnter",
  },
  parameters: {
    docs: {
      source: {
        // Removes the comment enclosed block to simplify the source example
        code: FilteringDataGridExampleCode.replaceAll('from "../../.."', 'from "sit-onyx"').replace(
          /\/\/ STORY SETUP START[\s\S]*\/\/ STORY SETUP END/,
          "",
        ),
      },
    },
  },
} satisfies Story;
