import type { Meta, StoryObj } from "@storybook/vue3";
import { ONYX_COLORS } from "sit-onyx/types";
import LineChart from "./LineChart.vue";

const meta: Meta<typeof LineChart> = {
  title: "examples/LineChart",
  component: LineChart,
  argTypes: {
    color: {
      options: ONYX_COLORS,
      control: { type: "select" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LineChart>;

export const Default = { args: {} } satisfies Story;
