import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxRadioButton from "./OnyxRadioButton.vue";

/**
 * The input component can be used to...
 */
const meta: Meta<typeof OnyxRadioButton> = {
  title: "internal/OnyxRadioButton",
  ...defineStorybookActionsAndVModels({
    component: OnyxRadioButton,
    events: ["update:modelValue"],
    argTypes: {
      isReadonly: { type: "boolean" },
      isLoading: { type: "boolean" },
      isDisabled: { type: "boolean" },
      selected: { type: "boolean" },
    },
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

// TODO: add other variations
