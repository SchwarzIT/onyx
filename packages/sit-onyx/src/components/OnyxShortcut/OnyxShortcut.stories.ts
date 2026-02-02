import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxShortcut from "./OnyxShortcut.vue";

/**
 * The shortcut component displays keyboard shortcut sequences with visual key representations.
 * It supports multi-step sequences, operating system specific symbols (macOS, Windows) and interactive highlighting of pressed keys.
 *
 * If you want to use the shortcut functionality without visualizing the OnyxShortcut component, you can also use the `useShortcut()` composable.
 *
 * For representing a single key, you can also use the [OnyxKey](/docs/basic-key--docs) component.
 */
const meta: Meta<typeof OnyxShortcut> = {
  title: "Basic/Shortcut",
  component: OnyxShortcut,
  tags: ["unstable"],
};

export default meta;
type Story = StoryObj<typeof OnyxShortcut>;

export const Default = {
  args: {
    sequence: [{ all: ["Control", "C"] }, { any: ["V", "Insert"] }],
  },
} satisfies Story;

export const Highlight = {
  args: {
    sequence: [{ all: ["Control", "Shift", "S"] }],
    highlight: true,
  },
} satisfies Story;

export const MultiStep = {
  args: {
    sequence: [{ all: ["Control", "K"] }, { any: ["Enter", "Space"] }],
    highlight: true,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    skeleton: true,
    sequence: [{ all: ["Control", "C"] }],
  },
} satisfies Story;

export const Disabled = {
  args: {
    ...Highlight.args,
    disabled: true,
  },
} satisfies Story;
