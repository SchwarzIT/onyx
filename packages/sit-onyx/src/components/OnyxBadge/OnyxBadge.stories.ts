import placeholder from "@sit-onyx/icons/placeholder.svg?raw";
import type { Meta, StoryObj } from "@storybook/vue3";
import { defineIconSelectArgType } from "../../utils/storybook";
import OnyxBadge from "./OnyxBadge.vue";

/**
 * Badges provide concise, prominent additional information associated with a parent object, displayed as text, icons, or numbers to highlight key details.
 */
const meta: Meta<typeof OnyxBadge> = {
  title: "Basic/Badge",
  component: OnyxBadge,
  argTypes: {
    icon: defineIconSelectArgType(),
    default: { control: { type: "text" } },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxBadge>;

/**
 * This example shows the badge with text content.
 */
export const Text = {
  args: {
    default: "Badge",
  },
} satisfies Story;

/**
 * This example shows the badge with number content.
 */
export const Number = {
  args: {
    color: "info",
    default: 32,
  },
} satisfies Story;

/**
 * This example shows the badge with icon content.
 */
export const Icon = {
  args: {
    color: "danger",
    icon: placeholder,
  },
} satisfies Story;

/**
 * This example shows a dot badge.
 */
export const Dot = {
  args: {
    dot: true,
  },
} satisfies Story;

/**
 * This example shows the badge with truncation.
 */
export const WithTruncation = {
  args: {
    default: "Badge with a very long text that gets truncated",
    style: "max-width: 16rem",
  },
} satisfies Story;
