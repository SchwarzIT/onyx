import { defineIconSelectArgType } from "@/utils/storybook";
import circleInformation from "@sit-onyx/icons/circle-information.svg?raw";
import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxTooltip from "./OnyxTooltip.vue";

/**
 * Tooltips offer contextual information or additional details to a parent element.
 */
const meta: Meta<typeof OnyxTooltip> = {
  title: "components/OnyxTooltip",
  ...defineStorybookActionsAndVModels({
    component: OnyxTooltip,
    events: [],
    argTypes: {
      icon: defineIconSelectArgType(),
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
    default: () => "Slot content goes here",
    icon: circleInformation,
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
