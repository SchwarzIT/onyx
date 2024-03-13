import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import PolarAreaExample from "./PolarAreaExample.vue";

const meta: Meta<typeof PolarAreaExample> = {
  title: "charts/PolarAreaExample",
  ...defineStorybookActionsAndVModels({
    component: PolarAreaExample,
    events: [],
  }),
};

export default meta;
type Story = StoryObj<typeof PolarAreaExample>;

export const Default = { args: {} } satisfies Story;
