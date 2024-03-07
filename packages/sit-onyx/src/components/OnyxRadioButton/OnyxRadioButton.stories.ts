import { createTruncationDecorator } from "@/utils/storybook";
import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxRadioButton from "./OnyxRadioButton.vue";

/**
 * This is a support component for the `OnyxRadioButtonGroup`.
 */
const meta: Meta<typeof OnyxRadioButton> = {
  title: "support/OnyxRadioButton",
  ...defineStorybookActionsAndVModels({
    component: OnyxRadioButton,
    events: ["change"],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxRadioButton>;

/**
 * This example shows a standalone radio button.
 */
export const Default = {
  args: {
    id: "my-id",
    label: "radio-label",
    name: "radio-name",
    value: "radio-value",
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
  },
  decorators: [createTruncationDecorator("12rem")],
} satisfies Story;
