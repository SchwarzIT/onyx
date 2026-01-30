import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { createAdvancedStoryExample } from "../../utils/storybook.js";
import OnyxKey from "./OnyxKey.vue";

/**
 * The key component displays keyboard keys with proper OS-specific symbols and accessibility support.
 * Useful for documentation, tutorials, and keyboard shortcut displays.
 */
const meta: Meta<typeof OnyxKey> = {
  title: "Support/Key",
  component: OnyxKey as Meta["component"],
  tags: ["unstable"],
};

export default meta;

type Story = StoryObj<typeof OnyxKey>;

/**
 * This example shows a default key.
 */
export const Default = {
  args: {
    name: "Enter",
  },
} satisfies Story;

/**
 * Pressed state visualization.
 */
export const Pressed = {
  args: {
    name: "Enter",
    highlighted: true,
  },
} satisfies Story;

/**
 * This example shows a skeleton key.
 */
export const Skeleton = {
  args: {
    skeleton: true,
    name: "Enter",
  },
} satisfies Story;

/**
 * Displays all available keys.
 */
export const AllKeys = createAdvancedStoryExample("OnyxKey", "AllKeysExample") satisfies Story;
