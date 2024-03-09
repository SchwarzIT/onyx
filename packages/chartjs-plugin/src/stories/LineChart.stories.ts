import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import LineChart from "./LineChart.vue";

const meta: Meta<typeof LineChart> = {
  title: "examples/Line",
  ...defineStorybookActionsAndVModels({
    component: LineChart,
    events: [],
  }),
};

export default meta;
type Story = StoryObj<typeof LineChart>;

export const Default = {
  args: {
    xScaleLabel: "x scale label",
    yScaleLabel: "y scale label",
    items: [
      {
        label: "01.01.2022",
        value: 19.99,
      },
      {
        label: "01.02.2022",
        tooltipLabel: "Custom tooltip label",
        value: -42,
      },
      {
        label: "01.03.2022",
        value: 39.98,
      },
      {
        label: "01.04.2022",
        value: 59.97,
      },
      {
        label: "01.05.2022",
        value: 42,
      },
    ],
  },
} satisfies Story;
