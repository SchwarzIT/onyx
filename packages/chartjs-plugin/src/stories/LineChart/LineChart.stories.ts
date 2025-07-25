import type { Meta, StoryObj } from "@storybook/vue3-vite";
import LineChart from "./LineChart.vue";

const meta: Meta<typeof LineChart> = {
  title: "examples/LineChart",
  component: LineChart,
};

export default meta;
type Story = StoryObj<typeof LineChart>;

export const Default = { args: {} } satisfies Story;
