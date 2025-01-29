import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxTooltip from "./OnyxTooltip.vue";

/**
 * Tooltips offer contextual information or additional details to a parent element.
 */
const meta: Meta<typeof OnyxTooltip> = {
  title: "Feedback/Tooltip",
  component: OnyxTooltip,
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="padding: 4rem 6rem; font-family: var(--onyx-font-family); color: var(--onyx-color-text-icons-neutral-intense)">
          <story />
        </div>`,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof OnyxTooltip>;

/**
 * This example shows a default tooltip.
 */
export const Default = { args: {} } satisfies Story;
