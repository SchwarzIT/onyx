import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxShortcut from "./OnyxShortcut.vue";

/**
 * The Shortcut component displays keyboard shortcut sequences with visual key representations.
 * It supports multi-step sequences, OS-specific key variants, and interactive highlighting of pressed keys.
 */
const meta: Meta<typeof OnyxShortcut> = {
  title: "Basic/Shortcut",
  component: OnyxShortcut as Meta["component"],
  tags: ["unstable"],
};

export default meta;

type Story = StoryObj<typeof OnyxShortcut>;

/**
 * Basic shortcut sequence showing copy and paste commands.
 */
export const Default = {
  args: {
    sequence: [{ all: ["Control", "C"] }, { any: ["V", "Insert"] }],
  },
} satisfies Story;

/**
 * Shortcut with pressed key highlighting.
 * Try pressing the keys to see real-time visual feedback.
 */
export const HighlightPressed = {
  args: {
    sequence: [{ all: ["Control", "Shift", "S"] }],
    highlightWhenPressed: true,
  },
} satisfies Story;

/**
 * Multi-step shortcut sequence for more complex operations.
 */
export const MultiStep = {
  args: {
    sequence: [{ all: ["Control", "K"] }, { any: ["Enter", "Space"] }],
    highlightWhenPressed: true,
  },
} satisfies Story;

/**
 * macOS variant showing OS-specific key symbols.
 */
export const MacOS = {
  args: {
    variant: "macOS",
    highlightWhenPressed: true,
    sequence: [{ all: ["Meta", "Shift", "K"] }],
  },
} satisfies Story;

/**
 * Skeleton loading state.
 */
export const Skeleton = {
  args: {
    skeleton: true,
    sequence: [{ all: ["Control", "C"] }],
  },
} satisfies Story;

/**
 * Disabled shortcut preventing keyboard interaction.
 */
export const Disabled = {
  args: {
    sequence: [{ all: ["Control", "S"] }],
    disabled: true,
    highlightWhenPressed: true,
  },
} satisfies Story;
