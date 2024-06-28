import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxTable from "../OnyxTable/OnyxTable.vue";
import OnyxTableHeader from "./OnyxTableHeader.vue";

/**
 * A wrapper of the native `<th>` element which additional features like sorting.
 * Will also set the correct aria attributes for screen reader.
 */
const meta: Meta<typeof OnyxTableHeader> = {
  title: "data/modules/TableHeader",
  ...defineStorybookActionsAndVModels({
    component: OnyxTableHeader,
    events: ["update:sort"],
    argTypes: {
      default: { control: { type: "text" } },
    },
    render: (args) => ({
      setup: () => {
        return { args };
      },
      components: { OnyxTable, OnyxTableHeader },
      template: `
        <OnyxTable style="width: 16rem;">
          <thead>
            <tr>
              <OnyxTableHeader v-bind="args">{{ args.default }}</OnyxTableHeader>
            </tr>
          </thead>
        </OnyxTable>
  `,
    }),
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxTableHeader>;

export const Default = {
  args: {
    default: "Header name",
  },
} satisfies Story;

export const Sortable = {
  args: {
    default: "Hover me",
    sortable: true,
  },
} satisfies Story;
