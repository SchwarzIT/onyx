import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import DesignTokenCard from "./DesignTokenCard.vue";

const meta: Meta<typeof DesignTokenCard> = {
  title: "tokens/DesignTokenCard",
  ...defineStorybookActionsAndVModels({
    component: DesignTokenCard,
    events: [],
  }),
};

export default meta;
type Story = StoryObj<typeof DesignTokenCard>;

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
