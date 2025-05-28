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
    steps: [{ label: "Step" }, { label: "Step" }, { label: "Step" }, { label: "Step" }],
    modelValue: 2,
  },
} satisfies Story;

export const Vertical = {
  args: {
    ...Default.args,
    orientation: "vertical",
  },
} satisfies Story;
