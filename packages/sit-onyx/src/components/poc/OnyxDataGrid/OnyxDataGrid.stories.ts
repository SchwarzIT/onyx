import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxDataGrid from "./OnyxDataGrid.vue";

/**
 * Tags are succinct textual labels that provide single-worded information or hints to their related parent element.
 */
const meta: Meta<typeof OnyxDataGrid> = {
  title: "DataGrid",
  ...defineStorybookActionsAndVModels({
    component: OnyxDataGrid,
    events: [],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxDataGrid>;

/**
 * This example shows the tag in primary color.
 */
export const Default = {
  args: {
    data: Array.from({ length: 10 }).map((_, index) => ({
      id: index,
      col_a: `a${index}`,
      col_b: `b${index}`,
      col_c: `c${index}`,
    })),
  },
} satisfies Story;
