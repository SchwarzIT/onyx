import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { defineIconSelectArgType } from "../../utils/storybook.js";
import OnyxFilterBadge from "./OnyxFilterBadge.vue";

/**
 * Badges are succinct textual labels that provide single-worded information or hints to their related parent element.
 */
const meta: Meta<typeof OnyxFilterBadge> = {
  title: "Search & Filter/FilterBadge",
  tags: ["unstable"],
  component: OnyxFilterBadge,
  argTypes: {
    ...withNativeEventLogging(["onClick"]),
    actionIcon: defineIconSelectArgType(),
    default: { control: { type: "text" } },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxFilterBadge>;

/**
 * This example shows an filter badge.
 */
export const Default = {
  argTypes: {},
  args: {
    label: "Badge",
  },
} satisfies Story;

export const WithoutIcon = {
  args: {
    label: "Badge",
    actionIcon: null,
  },
} satisfies Story;
