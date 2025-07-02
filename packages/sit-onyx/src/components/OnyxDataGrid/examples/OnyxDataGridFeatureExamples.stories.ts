import type { Meta, StoryObj } from "@storybook/vue3";
import { createAdvancedStoryExample } from "../../../utils/storybook.js";
import OnyxDataGrid from "../../OnyxDataGrid/OnyxDataGrid.vue";

const meta: Meta<typeof OnyxDataGrid> = {
  title: "Data/DataGrid/Features",
  component: OnyxDataGrid,
  tags: ["!autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Async: Story = {
  ...createAdvancedStoryExample("OnyxDataGrid", "AsyncExample"),
  tags: ["new:feature"],
};

export const Filtering: Story = {
  ...createAdvancedStoryExample("OnyxDataGrid", "FilteringExample"),
};

export const Pagination: Story = {
  tags: ["new:feature"],
  ...createAdvancedStoryExample("OnyxDataGrid", "PaginationExample"),
};

export const LazyLoading: Story = {
  tags: ["new:feature"],
  ...createAdvancedStoryExample("OnyxDataGrid", "LazyLoadingExample"),
};

export const ButtonLoading: Story = {
  tags: ["new:feature"],
  ...createAdvancedStoryExample("OnyxDataGrid", "ButtonLoadingExample"),
};

export const HideColumns: Story = {
  ...createAdvancedStoryExample("OnyxDataGrid", "HideColumnsExample"),
};

export const Resizing: Story = {
  ...createAdvancedStoryExample("OnyxDataGrid", "ResizingExample"),
};

export const Selection: Story = {
  ...createAdvancedStoryExample("OnyxDataGrid", "SelectionExample"),
};

export const Sorting: Story = {
  ...createAdvancedStoryExample("OnyxDataGrid", "SortingExample"),
};

export const StickyColumns: Story = {
  ...createAdvancedStoryExample("OnyxDataGrid", "StickyColumnsExample"),
};
