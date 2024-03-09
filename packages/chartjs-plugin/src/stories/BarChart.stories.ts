import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import BarChart from "./BarChart.vue";

const meta: Meta<typeof BarChart> = {
  title: "examples/Bar",
  ...defineStorybookActionsAndVModels({
    component: BarChart,
    events: [],
  }),
};

export default meta;
type Story = StoryObj<typeof BarChart>;

export const Default = { args: {} } satisfies Story;
