import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import Grid from "./GridPlayground.vue";

/**
 * The GridPlayground allows to test and play around with the Onyx grid system
 */
const meta: Meta<typeof Grid> = {
  title: "utility/GridPlayground",
  ...defineStorybookActionsAndVModels({
    component: Grid,
    events: [],
    argTypes: {},
  }),
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const Default = {
  args: {},
} satisfies Story;
