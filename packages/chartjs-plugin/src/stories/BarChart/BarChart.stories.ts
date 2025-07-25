import type { Meta, StoryObj } from "@storybook/vue3-vite";
import BarChart from "./BarChart.vue";

const meta: Meta<typeof BarChart> = {
  title: "examples/BarChart",
  component: BarChart,
};

export default meta;
type Story = StoryObj<typeof BarChart>;

export const Default = { args: {} } satisfies Story;
