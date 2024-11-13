import type { Meta, StoryObj } from "@storybook/vue3";
import SortingDataGrid from "../../../examples/DataGrid/SortingDataGrid.vue";

const meta: Meta<typeof SortingDataGrid> = {
  title: "Data/DataGrid/Sorting",
  component: SortingDataGrid,
};

export default meta;
type Story = StoryObj<typeof SortingDataGrid>;

export const Default = {} satisfies Story;
