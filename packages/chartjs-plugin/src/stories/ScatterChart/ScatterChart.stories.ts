import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ScatterChart from "./ScatterChart.vue";

const meta: Meta<typeof ScatterChart> = {
  title: "examples/ScatterChart",
  component: ScatterChart,
};

export default meta;
type Story = StoryObj<typeof ScatterChart>;

export const Default = { args: {} } satisfies Story;
