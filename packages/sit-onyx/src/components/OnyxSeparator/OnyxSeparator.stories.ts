import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxSeparator from "./OnyxSeparator.vue";

/**
 * Separator component that can be used to divide two sections of content.
 */
const meta: Meta<typeof OnyxSeparator> = {
  title: "Support/Separator",
  component: OnyxSeparator,
};

export default meta;
type Story = StoryObj<typeof OnyxSeparator>;

export const Default = { args: {} } satisfies Story;

export const Vertical = {
  args: {
    orientation: "vertical",
  },
} satisfies Story;
