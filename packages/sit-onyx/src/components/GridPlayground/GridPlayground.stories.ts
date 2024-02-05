import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import Grid from "./GridPlayground.vue";

/**
 * The input component can be used to...
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

/**
 * This example shows the primary input.
 */
export const Default = {
  args: {},
} satisfies Story;
