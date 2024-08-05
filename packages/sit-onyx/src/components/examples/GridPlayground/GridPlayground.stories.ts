import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import GridPlayground from "./GridPlayground.vue";

const meta: Meta<typeof GridPlayground> = {
  title: "Examples/GridPlayground",
  ...defineStorybookActionsAndVModels({
    component: GridPlayground,
    events: [],
    parameters: {
      layout: "fullscreen",
    },
  }),
};

export default meta;
type Story = StoryObj<typeof GridPlayground>;

export const Default = { args: {} } satisfies Story;
