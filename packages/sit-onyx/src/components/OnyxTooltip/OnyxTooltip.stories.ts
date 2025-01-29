import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxTooltip from "./OnyxTooltip.vue";

/**
 * Tooltips offer additional, contextual information for a parent element, appearing subtly to aid understanding without diverting the user’s focus. The component supports text and icons only.
 */
const meta: Meta<typeof OnyxTooltip> = {
  title: "Feedback/Tooltip",
  component: OnyxTooltip,
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="padding: 6rem 12rem; font-family: var(--onyx-font-family-paragraph); color: var(--onyx-color-text-icons-neutral-intense)">
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
