import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { createAdvancedStoryExample } from "../../utils/storybook.js";
import OnyxDataGrid from "./OnyxDataGrid.vue";

/**
 * A highly customizable and modular table for displaying complex datasets. The Data Grid supports features like grouping columns and rows, ordering them, and data manipulation, giving both developers and users extensive control.
 */
const meta: Meta<typeof OnyxDataGrid> = {
  title: "Data/DataGrid",
  component: OnyxDataGrid,
};

export default meta;
type Story = StoryObj<typeof OnyxDataGrid>;

export const Default = createAdvancedStoryExample("OnyxDataGrid", "DefaultExample") satisfies Story;

export const CustomFeature = createAdvancedStoryExample(
  "OnyxDataGrid",
  "CustomFeatureExample",
) satisfies Story;

export const CustomColumnTypes = {
  ...createAdvancedStoryExample("OnyxDataGrid", "CustomColumnTypes"),
} satisfies Story;

export const Skeleton = {
  ...createAdvancedStoryExample("OnyxDataGrid", "SkeletonExample"),
} satisfies Story;

export const Slots = {
  ...createAdvancedStoryExample("OnyxDataGrid", "SlotsExample"),
} satisfies Story;
