import type { Meta, StoryObj } from "@storybook/vue3-vite";
import HorizontalColorStripCard from "./HorizontalColorStripCard.vue";

const meta: Meta<typeof HorizontalColorStripCard> = {
  title: "colors/HorizontalColorStripCard",
  component: HorizontalColorStripCard,
};

export default meta;
type Story = StoryObj<typeof HorizontalColorStripCard>;

export const Default = {
  args: {
    color: "info",
  },
} satisfies Story;
