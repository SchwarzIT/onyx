import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { ONYX_COLORS } from "../types";
import LineChart from "./LineChart.vue";

const meta: Meta<typeof LineChart> = {
  title: "examples/LineChart",
  ...defineStorybookActionsAndVModels({
    component: LineChart,
    events: [],
    argTypes: {
      color: {
        options: ONYX_COLORS,
        control: { type: "select" },
      },
    },
  }),
};

export default meta;
type Story = StoryObj<typeof LineChart>;

export const Default = { args: {} } satisfies Story;
