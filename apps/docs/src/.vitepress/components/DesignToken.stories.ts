import type { Meta, StoryObj } from "@storybook/vue3";
import DesignToken from "./DesignToken.vue";

const meta: Meta<typeof DesignToken> = {
  title: "tokens/DesignToken",
  component: DesignToken,
};

export default meta;
type Story = StoryObj<typeof DesignToken>;

export const Default = {
  args: {
    name: "test-token",
    value: "42rem",
  },
} satisfies Story;

export const Color = {
  args: {
    name: "test-token",
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
