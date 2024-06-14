import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxRadioButton from "./OnyxRadioButton.vue";

/**
 * This is a support component for the `OnyxRadioButtonGroup`.
 */
const meta: Meta<typeof OnyxRadioButton> = {
  title: "support/RadioButton",
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
    label: "radio-label",
    name: "radio-name",
  },
} satisfies Story;

/**
 * This example shows a radio truncated radio button.
 * You can set the "truncation" property to choose between the different truncation types.
 */
export const WithTruncation = {
  args: {
    ...Default.args,
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
    skeleton: true,
  },
} satisfies Story;
