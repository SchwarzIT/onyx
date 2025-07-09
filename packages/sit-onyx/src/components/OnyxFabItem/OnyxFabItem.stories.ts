import placeholder from "@sit-onyx/icons/placeholder.svg?raw";
import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { defineIconSelectArgType } from "../../utils/storybook.js";
import OnyxFabItem from "./OnyxFabItem.vue";

const meta: Meta<typeof OnyxFabItem> = {
  title: "Support/FabItem",
  component: OnyxFabItem,
  tags: ["new:component"],
  argTypes: {
    ...withNativeEventLogging(["onClick"]),
    icon: defineIconSelectArgType(),
  },
};

export default meta;
type Story = StoryObj<typeof OnyxFabItem>;

export const Default = {
  args: {
    label: "Button",
  },
} satisfies Story;

export const Icon = {
  args: {
    ...Default.args,
    icon: placeholder,
  },
} satisfies Story;

export const Link = {
  args: {
    ...Default.args,
    link: "#example-link",
  },
} satisfies Story;
