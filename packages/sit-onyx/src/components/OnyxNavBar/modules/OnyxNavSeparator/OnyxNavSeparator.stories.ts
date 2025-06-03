import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxNavSeparator from "./OnyxNavSeparator.vue";

/**
 * Separator for the context area of the `OnyxNavBar`.
 */
const meta: Meta<typeof OnyxNavSeparator> = {
  title: "Navigation/NavBar/modules/NavSeparator",
  component: OnyxNavSeparator,
};

export default meta;
type Story = StoryObj<typeof OnyxNavSeparator>;

export const Vertical = { args: {} } satisfies Story;

export const Horizontal = {
  args: {
    orientation: "horizontal",
  },
} satisfies Story;
