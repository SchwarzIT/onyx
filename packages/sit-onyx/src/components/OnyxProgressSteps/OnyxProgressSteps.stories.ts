import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxProgressSteps from "./OnyxProgressSteps.vue";

const meta: Meta<typeof OnyxProgressSteps> = {
  title: "Progress/ProgressSteps",
  component: OnyxProgressSteps,
  tags: ["new:component"],
};

export default meta;
type Story = StoryObj<typeof OnyxProgressSteps>;

export const Default = {
  args: {
    steps: [{ label: "Cart" }, { label: "Shipping" }, { label: "Payment" }, { label: "Checkout" }],
    modelValue: 3,
  },
} satisfies Story;

export const Vertical = {
  args: {
    ...Default.args,
    orientation: "vertical",
  },
} satisfies Story;
