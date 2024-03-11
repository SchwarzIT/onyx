import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import LineChartExample from "./LineChartExample.vue";

const meta: Meta<typeof LineChartExample> = {
  title: "charts/LineChartExample",
  ...defineStorybookActionsAndVModels({
    component: LineChartExample,
    events: [],
  }),
};

export default meta;
type Story = StoryObj<typeof LineChartExample>;

export const Default = { args: {} } satisfies Story;
