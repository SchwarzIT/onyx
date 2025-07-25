import type { Meta, StoryObj } from "@storybook/vue3-vite";
import GridPlayground from "./GridPlayground.vue";

const meta: Meta<typeof GridPlayground> = {
  title: "Examples/GridPlayground",
  tags: ["!autodocs"],
  component: GridPlayground,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof GridPlayground>;

export const Default = { args: {} } satisfies Story;
