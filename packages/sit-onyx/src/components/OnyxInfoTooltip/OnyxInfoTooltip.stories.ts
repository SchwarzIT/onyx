import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { defineIconSelectArgType } from "../../utils/storybook.js";
import OnyxInfoTooltip from "./OnyxInfoTooltip.vue";

/**
 * Info tooltips offer contextual information or additional details while hovering an info icon.
 */
const meta: Meta<typeof OnyxInfoTooltip> = {
  title: "Support/InfoTooltip",
  component: OnyxInfoTooltip,
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="padding: 4rem 6rem;">
          <story />
        </div>`,
    }),
  ],
  argTypes: {
    icon: defineIconSelectArgType(),
  },
};

export default meta;
type Story = StoryObj<typeof OnyxInfoTooltip>;

/**
 * This example shows a default tooltip.
 */
export const Default = {
  args: {
    text: "Info tooltip text",
  },
} satisfies Story;
