import type { Meta, StoryObj } from "@storybook/vue3-vite";
import type { BaseSelectOption } from "../../types/index.js";
import OnyxRadioGroup from "./OnyxRadioGroup.vue";

/**
 * Radio buttons in UI design are interactive elements that allow users to make a single selection from a set of mutually exclusive options.
 * Users can choose only one option at the time, making radio buttons ideal for scenarios where a single, distinct choice is required.
 */
const meta: Meta<typeof OnyxRadioGroup> = {
  title: "Form Elements/RadioGroup",
  component: OnyxRadioGroup,
};

export default meta;
type Story = StoryObj<typeof OnyxRadioGroup>;

const EXAMPLE_OPTIONS: BaseSelectOption[] = [
  { label: "Default", value: 1 },
  { label: "Initially checked", value: 2 },
  { label: "Disabled", value: 3, disabled: true },
  { label: "Loading", value: 4, loading: true },
];

/**
 * This example shows a radio group with a label.
 */
export const Default = {
  args: {
    label: "Group label",
    options: EXAMPLE_OPTIONS,
    modelValue: EXAMPLE_OPTIONS[0].value,
  },
} satisfies Story;

/**
 * This example shows a disabled radio group.
 */
export const Disabled = {
  args: {
    label: "Group label",
    options: EXAMPLE_OPTIONS,
    modelValue: EXAMPLE_OPTIONS[0].value,
    disabled: true,
  },
} satisfies Story;

/**
 * This example shows a radio group thats layed out vertically.
 */
export const Horizontal = {
  args: {
    label: "Group label",
    options: EXAMPLE_OPTIONS,
    modelValue: EXAMPLE_OPTIONS[0].value,
    orientation: "horizontal",
  },
} satisfies Story;

/**
 * A radio group with long labels that will be truncated.
 * You can set the "truncation" property of the options to choose between the different truncation types.
 */
export const WithTruncation = {
  args: {
    ...Default.args,
    style: "max-width: 16rem",
    options: [
      { label: "Very long label that will be truncated", value: 1 },
      {
        label: "Very long label that will be truncated with multiline",
        value: 2,
        truncation: "multiline",
      },
    ],
  },
} satisfies Story;

/**
 * This example shows a skeleton radio group.
 * The number of skeleton options shown can be set via the `skeleton` property.
 */
export const Skeleton = {
  args: {
    ...Default.args,
    skeleton: 3,
  },
} satisfies Story;

/**
 * This example shows a required radio group.
 * Hover over one of the options for a few seconds to show an error info when no option is selected.
 */
export const Required = {
  args: {
    ...Default.args,
    modelValue: undefined,
    required: true,
  },
} satisfies Story;

/**
 * This example shows an invalid radio group.
 * Hover over one of the options for a few seconds to show the error.
 */
export const CustomError = {
  args: {
    ...Default.args,
    customError: {
      shortMessage: "Custom error",
      longMessage: "Further explanation.",
    },
  },
} satisfies Story;
