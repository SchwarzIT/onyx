import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
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
    default: { control: { type: "text" } },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxFilterBadge>;

/**
 * This example shows a filter badge.
 */
export const Default = {
  args: {
    label: "Shirts & Pullovers",
  },
} satisfies Story;
