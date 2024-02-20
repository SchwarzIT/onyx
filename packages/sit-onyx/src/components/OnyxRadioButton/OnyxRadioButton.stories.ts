import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxRadioButton from "./OnyxRadioButton.vue";

/**
 * The input component can be used to...
 */
const meta: Meta<typeof OnyxRadioButton> = {
  title: "support/OnyxRadioButton",
  ...defineStorybookActionsAndVModels({
    component: OnyxRadioButton,
    events: [],
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
