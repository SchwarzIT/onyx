import type { Meta, StoryObj } from "@storybook/vue3";
import { createAdvancedStoryExample } from "../../utils/storybook";
import OnyxDataGrid from "./OnyxDataGrid.vue";

/**
 * @experimental
 * For straightforward data presentation without the need for extensive interaction, the [OnyxTable](/docs/data-table--docs) is ideal. It offers a basic overview of the information without overwhelming users with complex features and is read only all the time.
 * On the other hand, if your dataset requires advanced functionalities such as advanced sorting, filtering, and editing, the `OnyxDataGrid` is the way to go. It provides robust tools for managing complex datasets.
 */
const meta: Meta<typeof OnyxDataGrid> = {
  title: "Data/DataGrid",
  component: OnyxDataGrid,
};

export default meta;
type Story = StoryObj<typeof OnyxDataGrid>;

export const Default = await createAdvancedStoryExample("OnyxDataGrid", "DefaultExample");

export const CustomFeature = {
  tags: ["new:feature"],
  ...(await createAdvancedStoryExample("OnyxDataGrid", "CustomFeatureExample")),
} satisfies Story;

export const CustomColumnTypes = {
  tags: ["new:feature"],
  ...(await createAdvancedStoryExample("OnyxDataGrid", "CustomColumnTypes")),
} satisfies Story;
