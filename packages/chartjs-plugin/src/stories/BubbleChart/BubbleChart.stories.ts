import type { Meta, StoryObj } from "@storybook/vue3-vite";
import BubbleChart from "./BubbleChart.vue";

const meta: Meta<typeof BubbleChart> = {
  title: "examples/BubbleChart",
  component: BubbleChart,
};

export default meta;
type Story = StoryObj<typeof BubbleChart>;

export const Default = { args: {} } satisfies Story;
