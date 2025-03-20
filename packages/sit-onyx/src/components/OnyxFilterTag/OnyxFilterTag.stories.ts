import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxFilterTag from "./OnyxFilterTag.vue";

/**
 * Tags are succinct textual labels that provide single-worded information or hints to their related parent element.
 */
const meta: Meta<typeof OnyxFilterTag> = {
  title: "Support/FilterTag",
  tags: ["new:component"],
  component: OnyxFilterTag,
  argTypes: {
    ...withNativeEventLogging(["onClick"]),
  },
};

export default meta;
type Story = StoryObj<typeof OnyxFilterTag>;

/**
 * This example shows an filter tag.
 */
export const Default = {
  argTypes: {},
  args: {
    label: "Tag",
  },
} satisfies Story;
