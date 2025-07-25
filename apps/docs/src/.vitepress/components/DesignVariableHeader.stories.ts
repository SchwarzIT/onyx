import type { Meta, StoryObj } from "@storybook/vue3-vite";
import DesignVariableHeader from "./DesignVariableHeader.vue";

const meta: Meta<typeof DesignVariableHeader> = {
  title: "variables/DesignVariableHeader",
  component: DesignVariableHeader,
};

export default meta;
type Story = StoryObj<typeof DesignVariableHeader>;

export const Default = {
  args: {
    headline: "Headline",
    tabs: ["Tab 1", "Tab 2", "Tab 3"],
    modelValue: "Tab 1",
  },
} satisfies Story;
