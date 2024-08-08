import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxRadioButton from "./OnyxRadioButton.vue";

/**
 * This is a support component for the `OnyxRadioGroup`.
 */
const meta: Meta<typeof OnyxRadioButton> = {
  title: "Support/RadioButton",
  ...defineStorybookActionsAndVModels({
    component: OnyxRadioButton,
    events: ["change", "validityChange"],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxRadioButton>;

/**
 * This example shows a standalone radio button.
 */
export const Default = {
  args: {
    value: "example-value",
    label: "Radio Label",
    name: "radio-default",
  },
} satisfies Story;

/**
 * This example shows a radio truncated radio button.
 * You can set the "truncation" property to choose between the different truncation types.
 */
export const WithTruncation = {
  args: {
    ...Default.args,
    name: "radio-truncated",
    label: "Very long label that will be truncated",
    style: "max-width: 12rem",
  },
} satisfies Story;

/**
 * This example shows a skeleton radio button.
 */
export const Skeleton = {
  args: {
    ...Default.args,
    name: "radio-skeleton",
    skeleton: true,
  },
} satisfies Story;

/**
 * This example shows a required radio button.
 * Hover over the option for a few seconds to show an error info when it is not selected.
 */
export const Required = {
  args: {
    ...Default.args,
    name: "radio-required",
    required: true,
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `
      <div style="padding: 2rem 0 0 2.5rem;">
        <story />
      </div>`,
    }),
  ],
} satisfies Story;
