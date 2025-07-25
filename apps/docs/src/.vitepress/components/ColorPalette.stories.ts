import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ColorPalette from "./ColorPalette.vue";

const meta: Meta<typeof ColorPalette> = {
  title: "colors/ColorPalette",
  component: ColorPalette,
};

export default meta;
type Story = StoryObj<typeof ColorPalette>;

export const Default = {
  args: {
    name: "primary",
  },
} satisfies Story;
