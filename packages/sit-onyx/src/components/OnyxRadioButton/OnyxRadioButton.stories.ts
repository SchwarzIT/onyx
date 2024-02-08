import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxRadioButton, { type RadioButtonProps } from "./OnyxRadioButton.vue";

/**
 * The input component can be used to...
 */
const meta: Meta<typeof OnyxRadioButton> = {
  title: "support/OnyxRadioButton",
  ...defineStorybookActionsAndVModels({
    component: OnyxRadioButton,
    events: [],
    argTypes: {
      isReadonly: { type: "boolean" },
      isDisabled: { type: "boolean" },
    },
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxRadioButton> & { args: RadioButtonProps<unknown> };

/**
 * This example shows a standalone radio button.
 */
export const Default = {
  args: {
    id: "my-id",
    label: "radio button",
    name: "radio form",
    value: "some-value",
  },
} satisfies Story;
