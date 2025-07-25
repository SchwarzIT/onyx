import type { Meta, StoryObj } from "@storybook/vue3-vite";
import DesignVariable from "./DesignVariable.vue";

const meta: Meta<typeof DesignVariable> = {
  title: "variables/DesignVariable",
  component: DesignVariable,
};

export default meta;
type Story = StoryObj<typeof DesignVariable>;

export const Default = {
  args: {
    name: "test-variable",
  },
} satisfies Story;

export const Color = {
  args: {
    name: "test-variable",
    color: "var(--onyx-color-base-primary-500)",
  },
} satisfies Story;

export const WithCopy = {
  args: {
    ...Default.args,
    allowCopy: true,
  },
} satisfies Story;

export const Copied = {
  args: {
    ...Default.args,
    isCopied: true,
  },
} satisfies Story;
