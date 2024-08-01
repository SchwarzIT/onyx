import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import NewGridPlayground from "./NewGridPlayground.vue";

const meta: Meta<typeof NewGridPlayground> = {
  title: "Examples/NewGridPlayground",
  ...defineStorybookActionsAndVModels({
    component: NewGridPlayground,
    events: [],
    parameters: {
      layout: "fullscreen",
    },
  }),
};

export default meta;
type Story = StoryObj<typeof NewGridPlayground>;

export const Default = { args: {} } satisfies Story;
