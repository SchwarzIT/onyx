import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxInfoTooltip from "./OnyxInfoTooltip.vue";

/**
 * Info tooltips offer contextual information or additional details while hovering an info icon.
 */
const meta: Meta<typeof OnyxInfoTooltip> = {
  title: "support/InfoTooltip",
  ...defineStorybookActionsAndVModels({
    component: OnyxInfoTooltip,
    events: [],
    decorators: [
      (story) => ({
        components: { story },
        template: `
        <div style="padding: 4rem 6rem;">
          <story />
        </div>`,
      }),
    ],
  }),
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
