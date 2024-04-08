import {
  createIconSourceCodeTransformer,
  createTruncationDecorator,
  defineIconSelectArgType,
} from "@/utils/storybook";
import placeholder from "@sit-onyx/icons/placeholder.svg?raw";
import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxBadge from "./OnyxBadge.vue";

/**
 * Info badges in UI design serve as valuable tools for conveying various types of information to users.
 * They provide additional context regarding status updates,
 * changes in content or states, quantities of related content, hints, and highlights.
 * These badges come in multiple types, including text, number and icon,
 * each serving distinct purposes in different scenarios.
 * Available in styles such as primary, secondary, danger, warning, success and info,
 * they offer versatility in visual presentation while maintaining consistency across the interface.
 * Info badges are commonly utilized in navigation structures, tabs, combo boxes and other UI components
 * to alert users to important details and enhance overall user experience.
 */
const meta: Meta<typeof OnyxBadge> = {
  title: "components/OnyxBadge",
  ...defineStorybookActionsAndVModels({
    component: OnyxBadge,
    events: [],
    argTypes: {
      icon: defineIconSelectArgType(),
    },
  }),
  parameters: {
    docs: {
      source: {
        // improve code snippet by adding the icon import
        transform: createIconSourceCodeTransformer("icon"),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxBadge>;

/**
 * This example shows the badge with text content
 */
export const Text = {
  args: {
    default: () => "Badge",
  },
} satisfies Story;

/**
 * This example shows the badge with number content
 */
export const Number = {
  args: {
    variation: "info",
    default: () => 32,
  },
} satisfies Story;

/**
 * This example shows the badge with icon content
 */
export const Icon = {
  args: {
    variation: "danger",
    icon: placeholder,
  },
} satisfies Story;

/**
 * This example shows the badge with truncation
 */
export const WithTruncation = {
  args: {
    default: () => "Badge with a very long text that gets truncated",
  },
  decorators: createTruncationDecorator("16rem"),
} satisfies Story;
