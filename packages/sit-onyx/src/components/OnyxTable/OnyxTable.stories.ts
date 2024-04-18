import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
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
    render: (args) => ({
      setup: () => ({ args }),
      components: { OnyxTable },
      template: `
        <OnyxTable v-bind="args">
          <thead>
            <tr>
              <th>Fruit</th> <th>Price (€/kg)</th> <th>Inventory (kg)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Strawberry</td> <td>4.50</td> <td>200</td>
            </tr>
            <tr>
              <td>Apple</td> <td>1.99</td> <td>3000</td>
            </tr>
            <tr>
              <td>Banana</td> <td>3.75</td> <td>18000</td>
            </tr>
          </tbody>
        </OnyxTable>`,
    }),
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxTable>;

/**
 * This example shows a default table.
 */
export const Default = { args: {} } satisfies Story;

/**
 * This example shows a striped table.
 */
export const Striped = {
  args: {
    striped: true,
  },
} satisfies Story;

/**
 * This example shows a table with grid strokes.
 */
export const GridStroke = {
  args: {
    grid: true,
  },
} satisfies Story;
