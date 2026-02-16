import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { createAdvancedStoryExample } from "../../utils/storybook.js";
import OnyxKey from "./OnyxKey.vue";

/**
 * The key component displays a single keyboard key with support for specific operating system symbols (macOS, Windows).
 * Useful for documentation, tutorials and displaying keyboard shortcuts.
 *
 * For representing keyboard shortcuts, use the [OnyxShortcut](/docs/basic-shortcut--docs) component.
 */
const meta: Meta<typeof OnyxKey> = {
  title: "Support/Key",
  component: OnyxKey,
  tags: ["unstable"],
};

export default meta;
type Story = StoryObj<typeof OnyxKey>;

export const Default = {
  args: {
    name: "Enter",
  },
} satisfies Story;

export const Highlighted = {
  args: {
    ...Default.args,
    highlighted: true,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    ...Default.args,
    skeleton: true,
  },
} satisfies Story;

export const AllKeys = createAdvancedStoryExample("OnyxKey", "AllKeysExample") satisfies Story;
