import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxDataGrid from "./OnyxDataGrid.vue";

/**
 * Tags are succinct textual labels that provide single-worded information or hints to their related parent element.
 */
const meta: Meta<typeof OnyxDataGrid> = {
  title: "DataGrid",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: OnyxDataGrid as any,
};

export default meta;
type Story = StoryObj<typeof OnyxDataGrid>;

/**
 * This example shows the tag in primary color.
 */
export const Default = {
  args: {
    data: Array.from({ length: 100 }).map((_, index) => ({
      id: index,
      col_a: `a${index}`,
      col_b: `b${index}`,
      col_c: `c${index}`,
    })),
    columns: [
      { key: "col_a", type: "" },
      { key: "col_c", type: "" },
    ],
  },
} satisfies Story;
