import { createTruncationDecorator } from "@/utils/storybook";
import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxCheckbox from "./OnyxCheckbox.vue";

/**
 * Checkboxes are a fundamental UI element, that allows users to make a binary selection.
 * They are commonly used for tasks such as selecting multiple items, opting into services or confirming and agreeing.
 */
const meta: Meta<typeof OnyxCheckbox> = {
  title: "support/OnyxCheckbox",
  ...defineStorybookActionsAndVModels({
    component: OnyxCheckbox,
    events: ["update:modelValue"],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxCheckbox>;

/**
 * A default checkbox.
 */
export const Default = {
  args: {
    label: "Checkbox",
  },
} satisfies Story;

/**
 * An indeterminate checkbox.
 */
export const Indeterminate = {
  args: {
    ...Default.args,
    indeterminate: true,
  },
} satisfies Story;

/**
 * A disabled checkbox that can not be interacted with.
 */
export const Disabled = {
  args: {
    ...Default.args,
    modelValue: true,
    disabled: true,
  },
} satisfies Story;

/**
 * A required checkbox that must be checked.
 */
export const Required = {
  args: {
    ...Default.args,
    required: true,
  },
} satisfies Story;

/**
 * A checkbox without a label.
 */
export const HiddenLabel = {
  args: {
    ...Default.args,
    hideLabel: true,
  },
} satisfies Story;

/**
 * A checkbox with truncation. You can set the "truncation" property to choose between the different truncation types.
 */
export const WithTruncation = {
  args: {
    ...Default.args,
    label: "Very long label that will be truncated",
  },
  decorators: [createTruncationDecorator("12rem")],
} satisfies Story;

/**
 * This example shows a skeleton checkbox.
 */
export const Skeleton = {
  args: {
    ...Default.args,
    skeleton: true,
  },
} satisfies Story;
