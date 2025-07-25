import type { Meta, StoryObj } from "@storybook/vue3-vite";
import PolarAreaChart from "./PolarAreaChart.vue";

const meta: Meta<typeof PolarAreaChart> = {
  title: "examples/PolarAreaChart",
  component: PolarAreaChart,
};

export default meta;
type Story = StoryObj<typeof PolarAreaChart>;

export const Default = { args: {} } satisfies Story;
