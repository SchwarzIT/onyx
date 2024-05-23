import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxTable from "./OnyxTable.vue";

/**
 * OnyxTable is used for presenting data in a table structure.
 */
const meta: Meta<typeof OnyxTable> = {
  title: "components/Table",
  ...defineStorybookActionsAndVModels({
    component: OnyxTable,
    events: [],
    argTypes: {
      default: {
        control: { disable: true },
      },
    },
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxTable>;

const getTableBody = () => {
  return h("tbody", [
    h("tr", [h("td", "Strawberry"), h("td", "4.50"), h("td", "200")]),
    h("tr", [h("td", "Apple"), h("td", "1.99"), h("td", "3000")]),
    h("tr", [h("td", "Banana"), h("td", "3.75"), h("td", "18000")]),
  ]);
};

/**
 * This example shows a default table.
 */
export const Default = {
  args: {
    default: () => [
      h("thead", [h("tr", [h("th", "Fruit"), h("th", "Price (€/kg)"), h("th", "Inventory (kg)")])]),
      getTableBody(),
    ],
  },
} satisfies Story;

/**
 * This example shows a striped table.
 */
export const Striped = {
  args: {
    ...Default.args,
    striped: true,
  },
} satisfies Story;

/**
 * This example shows a table with grid borders (horizontal and vertical).
 */
export const GridBorders = {
  args: {
    ...Default.args,
    grid: true,
  },
} satisfies Story;

/**
 * This example shows a table without a header.
 */
export const WithoutHeader = {
  args: {
    default: () => getTableBody(),
  },
} satisfies Story;
