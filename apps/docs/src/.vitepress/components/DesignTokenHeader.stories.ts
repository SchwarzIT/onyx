import type { Meta, StoryObj } from "@storybook/vue3";
import DesignTokenHeader from "./DesignTokenHeader.vue";

const meta: Meta<typeof DesignTokenHeader> = {
  title: "tokens/DesignTokenHeader",
  component: DesignTokenHeader,
};

export default meta;
type Story = StoryObj<typeof DesignTokenHeader>;

export const Default = {
  args: {
    headline: "Headline",
    tabs: ["Tab 1", "Tab 2", "Tab 3"],
    modelValue: "Tab 1",
  },
} satisfies Story;
