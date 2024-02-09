import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxRadioButtonGroup from "./OnyxRadioButtonGroup.vue";
import type { SelectionOption } from "../OnyxRadioButton/types";

/**
 * The input component can be used to...
 */
const meta: Meta<typeof OnyxRadioButtonGroup> = {
  title: "components/OnyxRadioButtonGroup",
  ...defineStorybookActionsAndVModels({
    component: OnyxRadioButtonGroup,
    events: ["update:modelValue"],
    argTypes: {
      isReadonly: { type: "boolean" },
      isLoading: { type: "boolean" },
      isDisabled: { type: "boolean" },
    },
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxRadioButtonGroup>;

const EXAMPLE_OPTIONS: SelectionOption<string>[] = [
  { label: "dummy.1", value: "1", id: "1" },
  { label: "dummy.2", value: "2", id: "2" },
  { label: "dummy.3", value: "3", id: "3" },
  { label: "dummy.4", value: "4", id: "4", isLoading: true },
  { label: "dummy.5", value: "5", id: "5", isReadonly: true },
  { label: "dummy.6", value: "6", id: "6", isDisabled: true },
];

/**
 * This example shows a standalone radio button.
 */
export const Default = {
  args: {
    name: "radio button name",
    options: EXAMPLE_OPTIONS,
  },
} satisfies Story;
