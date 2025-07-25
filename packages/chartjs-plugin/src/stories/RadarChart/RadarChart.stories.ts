import type { Meta, StoryObj } from "@storybook/vue3-vite";
import RadarChart from "./RadarChart.vue";

const meta: Meta<typeof RadarChart> = {
  title: "examples/RadarChart",
  component: RadarChart,
};

export default meta;
type Story = StoryObj<typeof RadarChart>;

export const Default = { args: {} } satisfies Story;
