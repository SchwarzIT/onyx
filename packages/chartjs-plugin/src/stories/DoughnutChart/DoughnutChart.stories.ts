import type { Meta, StoryObj } from "@storybook/vue3-vite";
import DoughnutChart from "./DoughnutChart.vue";

const meta: Meta<typeof DoughnutChart> = {
  title: "examples/DoughnutChart",
  component: DoughnutChart,
};

export default meta;
type Story = StoryObj<typeof DoughnutChart>;

export const Default = { args: {} } satisfies Story;
