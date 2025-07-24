import placeholder from "@sit-onyx/icons/placeholder.svg?raw";
import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { defineIconSelectArgType } from "../../utils/storybook.js";
import OnyxFABButton from "./OnyxFABButton.vue";

const meta: Meta<typeof OnyxFABButton> = {
  title: "Support/FABButton",
  component: OnyxFABButton,
  tags: ["new:component"],
  argTypes: {
    ...withNativeEventLogging(["onClick"]),
    icon: defineIconSelectArgType(),
  },
};

export default meta;
type Story = StoryObj<typeof OnyxFABButton>;

export const Default = {
  args: {
    label: "Button",
    hideLabel: true,
    icon: placeholder,
  },
} satisfies Story;

export const Text = {
  args: {
    label: Default.args.label,
  },
} satisfies Story;

export const TextAndIcon = {
  args: {
    ...Default.args,
    hideLabel: undefined,
  },
} satisfies Story;

export const Link = {
  args: {
    ...Default.args,
    link: "#example-link",
  },
} satisfies Story;
