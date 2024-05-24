import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxVisuallyHidden from "./OnyxVisuallyHidden.vue";

/**
 * The visually hidden component makes additional information available for assistive technologies.
 */
const meta: Meta<typeof OnyxVisuallyHidden> = {
  title: "support/VisuallyHidden",
  ...defineStorybookActionsAndVModels({
    component: OnyxVisuallyHidden,
    events: [],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxVisuallyHidden>;

/**
 * Use a screen reader to get the visually hidden content.
 */
export const Default = {
  args: {
    default: "This text is only available for assistive technologies like screen readers.",
  },
} satisfies Story;
