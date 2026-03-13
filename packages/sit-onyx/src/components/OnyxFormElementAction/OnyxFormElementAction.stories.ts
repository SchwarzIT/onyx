import { iconEye, iconTrash, iconXSmall } from "@sit-onyx/icons";
import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { defineIconSelectArgType } from "../../utils/storybook.js";
import OnyxFormElementAction from "./OnyxFormElementAction.vue";

/**
 * A support component, to be used inside of form element component.
 * Exists as normal button and as toggle button variant.
 */
const meta: Meta<typeof OnyxFormElementAction> = {
  title: "Support/FormElementAction",
  component: OnyxFormElementAction,
  argTypes: {
    icon: defineIconSelectArgType(),
    ...withNativeEventLogging(["onClick"]),
  },
};

export default meta;
type Story = StoryObj<typeof OnyxFormElementAction>;

export const Default = {
  args: {
    label: "Clear value",
    icon: iconXSmall,
  },
} satisfies Story;

export const Toggle = {
  args: {
    label: "Toggle trash",
    icon: iconTrash,
    type: "toggle",
  },
} satisfies Story;

export const Large = {
  args: {
    label: "Show password",
    icon: iconEye,
    size: "lg",
  },
} satisfies Story;
