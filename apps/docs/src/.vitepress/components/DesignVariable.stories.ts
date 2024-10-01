import type { Meta, StoryObj } from "@storybook/vue3";
import DesignVariable from "./DesignVariable.vue";

const meta: Meta<typeof DesignVariable> = {
  title: "variables/DesignVariables",
  component: DesignVariable,
};

export default meta;
type Story = StoryObj<typeof DesignVariable>;

export const Default = {
  args: {
    name: "test-variable",
    value: "42rem",
  },
} satisfies Story;

export const Color = {
  args: {
    name: "test-variable",
    value: "var(--onyx-color-base-primary-500)",
    type: "color",
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
