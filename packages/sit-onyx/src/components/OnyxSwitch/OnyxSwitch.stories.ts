import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxSwitch from "./OnyxSwitch.vue";

/**
 * Switches are a common UI element used to control binary states, such as on/off, enable/disable/, or active/inactive.
 * They consist of a toggle mechanism that allow users to switch between two distinct states with a simple interaction.
 */
const meta: Meta<typeof OnyxSwitch> = {
  title: "Form Elements/Switch",
  component: OnyxSwitch,
};

export default meta;
type Story = StoryObj<typeof OnyxSwitch>;

/**
 * This example shows the default unchecked state of the switch.
 */
export const Default = {
  args: {
    label: "Switch label",
  },
} satisfies Story;

/**
 * This example shows the checked state of the switch.
 */
export const Checked = {
  args: {
    ...Default.args,
    modelValue: true,
  },
} satisfies Story;

/**
 * This example shows a required switch.
 */
export const Required = {
  args: {
    ...Default.args,
    required: true,
  },
} satisfies Story;

/**
 * This example shows checked and loading state of the switch.
 */
export const CheckedLoading = {
  args: {
    ...Default.args,
    modelValue: true,
    loading: true,
  },
} satisfies Story;

/**
 * This example shows a switch without a visual label.
 * For accessibility / screen readers it must still be passed.
 */
export const HiddenLabel = {
  args: {
    label: "Accessibility Label",
    hideLabel: true,
  },
} satisfies Story;

/**
 * A switch with truncation. You can set the "truncation" property to choose between the different truncation types.
 */
export const WithTruncation = {
  args: {
    ...Default.args,
    label: "Very long label that will be truncated",
    style: "max-width: 12rem",
  },
} satisfies Story;

/**
 * This example shows a skeleton switch.
 */
export const Skeleton = {
  args: {
    ...Default.args,
    skeleton: true,
  },
} satisfies Story;

/**
 * This example shows an invalid switch which turns red after interaction.
 * Hover for a few seconds to show the error.
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
