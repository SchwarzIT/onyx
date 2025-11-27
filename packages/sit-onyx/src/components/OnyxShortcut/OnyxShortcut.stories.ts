import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxShortcut from "./OnyxShortcut.vue";

const meta: Meta<typeof OnyxShortcut> = {
  title: "Feedback/Shortcut",
  component: OnyxShortcut as Meta["component"],
  tags: ["unstable"],
};

export default meta;

type Story = StoryObj<typeof OnyxShortcut>;

/**
 * This example shows a default key.
 */
export const Default = {
  args: {
    sequence: [
      {
        any: ["ctrl"],
      },
      {
        any: ["space"],
      },
      {
        any: ["esc"],
      },
    ],
  },
} satisfies Story;

export const Skeleton = {
  args: {
    ...Default.args,
    skeleton: true,
  },
} satisfies Story;

/**
 * Example: highlight pressed keys.
 */
export const HighlightPressed = {
  args: {
    ...Default.args,
    highlightPressed: true,
  },
} satisfies Story;

/**
 * Example: multiple buttons at once.
 */
export const MultipleButtonsAtOnce = {
  args: {
    highlightPressed: true,
    sequence: [{ all: ["cmd", "shift", "2"] }],
  },
} satisfies Story;

/**
 * Example: button options (down / up).
 */
export const ButtonOptions = {
  args: {
    highlightPressed: true,
    sequence: [{ all: ["cmd"] }, { any: ["down", "up"] }],
  },
} satisfies Story;

/**
 * Example: duplicated keys in sequence.
 */
export const DuplicatedKeysInSequence = {
  args: {
    highlightPressed: true,
    sequence: [{ all: ["ctrl", "c"] }, { all: ["ctrl", "d"] }],
  },
} satisfies Story;
