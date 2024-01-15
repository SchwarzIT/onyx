import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import TestInput, { INPUT_TYPES } from "./TestInput.vue";

/**
 * The input component can be used to...
 */
const meta: Meta<typeof TestInput> = {
  title: "components/TestInput",
  ...defineStorybookActionsAndVModels({
    component: TestInput,
    events: ["update:modelValue", "change", "validityChange"],
    argTypes: {
      type: {
        options: INPUT_TYPES,
        control: { type: "select" },
      },
    },
  }),
};

export default meta;
type Story = StoryObj<typeof TestInput>;

/**
 * This example shows the primary input.
 */
export const Primary = {
  args: {
    label: "Test label",
  },
} satisfies Story;

/**
 * This example shows a required input.
 */
export const Required = {
  args: {
    ...Primary.args,
    required: true,
  },
} satisfies Story;
