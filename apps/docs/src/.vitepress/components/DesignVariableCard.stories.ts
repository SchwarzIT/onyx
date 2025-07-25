import type { Meta, StoryObj } from "@storybook/vue3-vite";
import DesignVariableCard from "./DesignVariableCard.vue";

const meta: Meta<typeof DesignVariableCard> = {
  title: "variables/DesignVariableCard",
  component: DesignVariableCard,
};

export default meta;
type Story = StoryObj<typeof DesignVariableCard>;

export const Default = {
  args: {
    name: "onyx-spacing-sm",
    default: () => "Default slot",
  },
} satisfies Story;

export const WideName = {
  args: {
    ...Default.args,
    wideName: true,
  },
} satisfies Story;
