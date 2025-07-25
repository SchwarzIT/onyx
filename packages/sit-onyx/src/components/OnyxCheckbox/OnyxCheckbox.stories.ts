import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxCheckbox from "./OnyxCheckbox.vue";

/**
 * Checkboxes are a fundamental UI element, that allows users to make a binary selection.
 * They are commonly used for tasks such as selecting multiple items, opting into services or confirming and agreeing.
 */
const meta: Meta<typeof OnyxCheckbox> = {
  title: "Support/Checkbox",
  component: OnyxCheckbox,
};

export default meta;
type Story = StoryObj<typeof OnyxCheckbox>;

/**
 * A default checkbox.
 */
export const Default = {
  args: {
    label: "Checkbox",
    value: "example-value",
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
    label: "Hidden label",
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
    style: "max-width: 12rem",
  },
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

/**
 * This example shows an invalid checkbox.
 * Hover over the checkbox for a few seconds to show the error.
 */
export const CustomError = {
  args: {
    ...Default.args,
    hideLabel: true,
    customError: {
      shortMessage: "Custom error",
      longMessage: "Further explanation.",
    },
  },
} satisfies Story;
