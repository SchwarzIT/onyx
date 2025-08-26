import { iconCircleInformation } from "@sit-onyx/icons";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";
import { createAdvancedStoryExample, defineIconSelectArgType } from "../../utils/storybook.js";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxTooltip from "./OnyxTooltip.vue";

/**
 * Tooltips offer additional, contextual information for a parent element, appearing subtly to aid understanding without diverting the user’s focus. The component supports text and icons only.
 */
const meta: Meta<typeof OnyxTooltip> = {
  title: "Feedback/Tooltip",
  component: OnyxTooltip,
  argTypes: {
    icon: defineIconSelectArgType(),
    default: {
      control: { disable: true },
    },
    tooltip: {
      control: { disable: true },
    },
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="padding: 6rem 12rem; font-family: var(--onyx-font-family); color: var(--onyx-color-text-icons-neutral-intense)">
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
export const Default = {
  args: {
    text: "Tooltip text",
    default: ({ trigger }) => h(OnyxButton, { label: "Slot content goes here", ...trigger }),
    icon: iconCircleInformation,
    open: true,
  },
} satisfies Story;

/**
 * This tooltip is triggered on hover and it describes what the associated button does.
 * It will use a short debounce/delay when showing/hiding.
 */
export const Hover = createAdvancedStoryExample("OnyxTooltip", "HoverExample") satisfies Story;

/**
 * This example tooltip (or rather toggletip) is toggled by a click and provides contextual information.
 */
export const Click = {
  args: {
    text: "Storybook is a frontend workshop for building UI components and pages in isolation.",
    default: ({ trigger }) => h(OnyxButton, { label: "Click for info", ...trigger }),
    trigger: "click",
  },
} satisfies Story;

/**
 * This example shows a tooltip that uses the full width of the parent/slot element.
 */
export const MatchParentWidth = {
  args: {
    ...Default.args,
    fitParent: true,
  },
} satisfies Story;

/**
 * This example shows a danger tooltip.
 */
export const Danger = {
  args: {
    text: "Clicking this button will delete the internet!",
    default: ({ trigger }) => h(OnyxButton, { label: "Delete", color: "danger", ...trigger }),
    color: "danger",
  },
} satisfies Story;

/**
 * This example shows a tooltip that uses the slot for custom content.
 */
export const CustomContent = {
  args: {
    ...Default.args,
    tooltip: () => ["This is ", h("strong", "custom content")],
  },
} satisfies Story;
