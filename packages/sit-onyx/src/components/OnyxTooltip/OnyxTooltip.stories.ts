import { TOOLTIP_TRIGGERS } from "@sit-onyx/headless";
import circleInformation from "@sit-onyx/icons/circle-information.svg?raw";
import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import { defineIconSelectArgType } from "../../utils/storybook";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxTooltip from "./OnyxTooltip.vue";

/**
 * Tooltips offer contextual information or additional details to a parent element.
 */
const meta: Meta<typeof OnyxTooltip> = {
  title: "Feedback/Tooltip",
  ...defineStorybookActionsAndVModels({
    component: OnyxTooltip,
    events: [],
    argTypes: {
      icon: defineIconSelectArgType(),
      default: {
        control: { disable: true },
      },
      tooltip: {
        control: { disable: true },
      },
      open: {
        options: [...TOOLTIP_TRIGGERS, true, false],
      },
    },
    decorators: [
      (story) => ({
        components: { story },
        template: `
        <div style="padding: 4rem 6rem; font-family: var(--onyx-font-family); color: var(--onyx-color-text-icons-neutral-intense)">
          <story />
        </div>`,
      }),
    ],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxTooltip>;

/**
 * This example shows a default tooltip.
 */
export const Default = {
  args: {
    text: "Tooltip text",
    default: () => h(OnyxButton, { label: "Slot content goes here" }),
    icon: circleInformation,
    open: true,
  },
} satisfies Story;

/**
 * This example shows a tooltip that will be triggered on hover.
 * It will use a short debounce/delay when showing/hiding.
 */
export const Hover = {
  args: {
    ...Default.args,
    default: () => h(OnyxButton, { label: "Hover me to show the tooltip" }),
    open: "hover",
  },
} satisfies Story;

/**
 * This example shows a tooltip that will be triggered on click.
 */
export const Click = {
  args: {
    ...Default.args,
    default: () => h(OnyxButton, { label: "Click me to show the tooltip" }),
    open: "click",
  },
} satisfies Story;

/**
 * This example shows a tooltip with a very long text that wraps to a new line.
 */
export const LongText = {
  args: {
    ...Default.args,
    text: "Lorem ipsum dolor sit amet ".repeat(5),
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
    ...Default.args,
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
