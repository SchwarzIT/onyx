import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxKey from "./OnyxKey.vue";
import { CANONICAL_KEYS } from "./types.js";

/**
 * The key component displays keyboard keys with proper OS-specific symbols and accessibility support.
 * Useful for documentation, tutorials, and keyboard shortcut displays.
 */
const meta: Meta<typeof OnyxKey> = {
  title: "Support/Key",
  component: OnyxKey as Meta["component"],
};

export default meta;

type Story = StoryObj<typeof OnyxKey>;

/**
 * This example shows a default key.
 */
export const Default = {
  args: {
    keyName: "enter",
  },
} satisfies Story;

/**
 * Pressed state visualization.
 */
export const Pressed = {
  args: {
    keyName: "enter",
    pressed: true,
  },
} satisfies Story;

/**
 * This example shows a skeleton key.
 */
export const Skeleton = {
  args: {
    skeleton: true,
    keyName: "enter",
  },
} satisfies Story;

/**
 * Example: simple shortcut.
 */
export const Shortcut = {
  render: (args) => ({
    components: { OnyxKey },
    setup: () => ({ args }),
    template: `
      <div style="display: flex; gap: 0.5rem; align-items: center; color: var(--onyx-color-text-icons-neutral-medium);">
        <OnyxKey v-bind="args" keyName="ctrl" />
        <span>+</span>
        <OnyxKey v-bind="args" keyName="shift" />
        <span>+</span>
        <OnyxKey v-bind="args" keyName="C" />
      </div>
    `,
  }),
  args: {
    variant: "auto",
  },
} satisfies Story;

/**
 * Displays all supported canonical keys from CANONICAL_KEYS.
 * Useful for visual verification of the mapping.
 */
export const AllCanonicalKeys = {
  render: (args) => {
    const keys = CANONICAL_KEYS.filter((key) => key !== "unknown");

    return {
      components: { OnyxKey },
      setup: () => ({ args, keys }),
      template: `
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          <OnyxKey
            v-for="key in keys"
            :key="key"
            v-bind="args"
            :keyName="key"
          />
        </div>
      `,
    };
  },
  args: {
    variant: "macOS",
  },
} satisfies Story;
