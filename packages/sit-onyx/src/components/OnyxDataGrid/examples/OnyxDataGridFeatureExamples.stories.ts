import type { Meta, StoryObj } from "@storybook/vue3";
import { createAdvancedStoryExample } from "../../../utils/storybook";
import OnyxDataGrid from "../../OnyxDataGrid/OnyxDataGrid.vue";

const meta: Meta<typeof OnyxDataGrid> = {
  title: "Data/DataGrid/Features",
  component: OnyxDataGrid,
  tags: ["!autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Sorting: Story = {
  ...createAdvancedStoryExample("OnyxDataGrid", "SortingExample"),
};

export const Filtering: Story = {
  ...createAdvancedStoryExample("OnyxDataGrid", "FilteringExample"),
};

export const Selection: Story = createAdvancedStoryExample("OnyxDataGrid", "SelectionExample");

export const HideColumns: Story = {
  ...createAdvancedStoryExample("OnyxDataGrid", "HideColumnsExample"),
};
export const StickyColumns: Story = {
  ...createAdvancedStoryExample("OnyxDataGrid", "StickyColumnsExample"),
};

export const Resizing: Story = {
  ...createAdvancedStoryExample("OnyxDataGrid", "ResizingExample"),
};
