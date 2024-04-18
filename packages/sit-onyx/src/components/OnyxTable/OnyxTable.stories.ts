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
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxTable>;

export const Default = {
  args: {},
  render: (args) => ({
    setup: () => ({ args }),
    components: { OnyxTable },
    template: ` <OnyxTable>
                  <thead>
                    <tr> <th>Items</th> <th>Expenditure</th> </tr>
                  </thead>
                  <tbody>
                    <tr> <td>Donuts</td> <td>3000</td> </tr>
                    <tr> <td>Waffle</td> <td>18000</td> </tr>
                  </tbody>
                </OnyxTable>`,
  }),
} satisfies Story;
