import { iconAnchor, iconTrash } from "@sit-onyx/icons";
import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { defineIconSelectArgType } from "../../../utils/storybook.js";
import OnyxInputAction from "./OnyxInputAction.vue";

/**
 * A support component, to be used inside of the OnyxInput component.
 * Exists as normal button and as toggle button variant.
 */
const meta: Meta<typeof OnyxInputAction> = {
  title: "Support/InputAction",
  component: OnyxInputAction,
  argTypes: {
    icon: defineIconSelectArgType(),
    ...withNativeEventLogging(["onClick"]),
  },
};

export default meta;
type Story = StoryObj<typeof OnyxInputAction>;

/**
 * This example shows the default button variant.
 */
export const Default = {
  args: {
    label: "Throw Anchor",
    icon: iconAnchor,
  },
} satisfies Story;

/**
 * This example shows the toggle variant
 */
export const Toggle = {
  args: {
    label: "Toggle Trash",
    icon: iconTrash,
    type: "toggle",
  },
} satisfies Story;
