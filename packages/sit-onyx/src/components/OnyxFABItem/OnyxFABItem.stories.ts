import { iconPlaceholder } from "@sit-onyx/icons";
import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { defineIconSelectArgType } from "../../utils/storybook.js";
import OnyxFABItem from "./OnyxFABItem.vue";

const meta: Meta<typeof OnyxFABItem> = {
  title: "Support/FABItem",
  component: OnyxFABItem,
  argTypes: {
    ...withNativeEventLogging(["onClick"]),
    icon: defineIconSelectArgType(),
  },
};

export default meta;
type Story = StoryObj<typeof OnyxFABItem>;

export const Default = {
  args: {
    label: "Button",
  },
} satisfies Story;

export const Icon = {
  args: {
    ...Default.args,
    icon: iconPlaceholder,
  },
} satisfies Story;

export const Link = {
  args: {
    ...Default.args,
    link: "#example-link",
  },
} satisfies Story;
