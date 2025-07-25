import type { Meta, StoryObj } from "@storybook/vue3-vite";
import PieChart from "./PieChart.vue";

const meta: Meta<typeof PieChart> = {
  title: "examples/PieChart",
  component: PieChart,
};

export default meta;
type Story = StoryObj<typeof PieChart>;

export const Default = { args: {} } satisfies Story;
