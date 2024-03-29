import { createTruncationDecorator } from "@/utils/storybook";
import camera_x from "@sit-onyx/icons/camera-x.svg?raw";
import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxBadge from "./OnyxBadge.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";

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
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxBadge>;

/**
 * This example shows the badge in primary variation
 */
export const Primary = {
  args: {
    default: () => "Badge",
  },
} satisfies Story;

/**
 * This example shows the badge in secondary variation with a number content
 */
export const Secondary = {
  args: {
    variation: "secondary",
    default: () => 32,
  },
} satisfies Story;

/**
 * This example shows the badge in danger variation with icon content
 */
export const Danger = {
  args: {
    variation: "danger",
    default: () => h(OnyxIcon, { icon: camera_x }),
  },
} satisfies Story;

/**
 * This example shows the badge in warning state
 */
export const Warning = {
  args: {
    variation: "warning",
    default: () => "Warning",
  },
} satisfies Story;

/**
 * This example shows the badge in success state
 */
export const Success = {
  args: {
    variation: "success",
    default: () => "Success",
  },
} satisfies Story;

/**
 * This example shows the badge in info state
 */
export const Info = {
  args: {
    variation: "info",
    default: () => "Info",
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
