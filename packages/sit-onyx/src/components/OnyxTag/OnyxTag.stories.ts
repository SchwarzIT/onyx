import { iconCheck, iconXSmall } from "@sit-onyx/icons";
import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { defineIconSelectArgType } from "../../utils/storybook.js";
import OnyxTag from "./OnyxTag.vue";

/**
 * Tags are succinct textual labels that provide single-worded information or hints to their related parent element.
 */
const meta: Meta<typeof OnyxTag> = {
  title: "Basic/Tag",
  component: OnyxTag,
  argTypes: {
    icon: defineIconSelectArgType(),
  },
};

export default meta;
type Story = StoryObj<typeof OnyxTag>;

/**
 * This example shows the tag in primary color.
 */
export const Primary = {
  args: {
    label: "Tag",
    color: "primary",
  },
} satisfies Story;

/**
 * This example shows the tag with an icon.
 */
export const WithIcon = {
  args: {
    label: "Done",
    icon: iconCheck,
    color: "success",
  },
} satisfies Story;

/**
 * This example shows the tag with truncation.
 */
export const WithTruncation = {
  args: {
    label: "Tag with a very long text that gets truncated",
    style: "max-width: 10rem",
  },
} satisfies Story;

/**
 * This example shows the interactive tag.
 */
export const Interactive = {
  argTypes: {
    ...withNativeEventLogging(["onClick"]),
  },
  args: {
    label: "Tag",
    clickable: "Click to add 'Tag' to the selection.",
  },
} satisfies Story;

/**
 * This example shows the dismissable tag.
 */
export const Dismissable = {
  argTypes: {
    ...withNativeEventLogging(["onClick"]),
  },
  args: {
    label: "Tag",
    clickable: { label: "Click to remove 'Tag' from the selection.", actionIcon: iconXSmall },
  },
} satisfies Story;
