import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxHeadline from "./OnyxHeadline.vue";
import { HEADLINE_TYPES } from "./types";

/**
 * Headline that can e.g. be used to structure the page content.
 */
const meta: Meta<typeof OnyxHeadline> = {
  title: "components/OnyxHeadline",
  ...defineStorybookActionsAndVModels({
    component: OnyxHeadline,
    events: [],
    argTypes: {
      is: {
        options: HEADLINE_TYPES,
        control: { type: "select" },
      },
      default: {
        control: false,
      },
    },
    render: (args) => ({
      components: { OnyxHeadline },
      setup: () => ({ args }),
      template: `
        <OnyxHeadline v-bind="args">
          Lorem ipsum dolor sit amet
        </OnyxHeadline>
      `,
    }),
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxHeadline>;

/**
 * This example shows a default h1 headline.
 */
export const Default = {
  args: {
    is: "h1",
  },
} satisfies Story;

/**
 * This example shows a h1 headline with the monospace font family.
 */
export const Monospace = {
  args: {
    ...Default.args,
    monospace: true,
  },
} satisfies Story;
