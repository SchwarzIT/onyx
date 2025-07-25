import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxCheckboxGroup from "./OnyxCheckboxGroup.vue";
import type { CheckboxGroupOption } from "./types.js";

/**
 * Checkboxes are a fundamental UI element, that allows users to make a binary selection.
 * They are commonly used for tasks such as selecting multiple items, opting into services or confirming and agreeing.
 */
const meta: Meta<typeof OnyxCheckboxGroup> = {
  title: "Form Elements/CheckboxGroup",
  component: OnyxCheckboxGroup,
  argTypes: {
    withCheckAll: { control: { type: "boolean" } },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxCheckboxGroup>;

const DEMO_OPTIONS = [
  { label: "Default", value: 1 },
  { label: "Initially checked", value: 2 },
  { label: "Required", value: 3, required: true },
  { label: "Disabled", value: 4, disabled: true },
  { label: "Loading", value: 5, loading: true },
  { label: "Disabled checked", value: 6, disabled: true },
  {
    label: "Invalid",
    value: 7,
    customError: {
      shortMessage: "Custom error",
      longMessage: "Further explanation.",
    },
  },
] satisfies CheckboxGroupOption[];

/**
 * A checkbox group that contains a list of checkboxes.
 */
export const Default = {
  args: {
    label: "Checkbox group label",
    modelValue: [2, 6],
    options: DEMO_OPTIONS,
  },
} satisfies Story;

/**
 * A horizontal checkbox group.
 */
export const Horizontal = {
  args: {
    ...Default.args,
    orientation: "horizontal",
  },
} satisfies Story;

/**
 * A checkbox group with the check all option to check/uncheck all options.
 */
export const WithCheckAll = {
  args: {
    ...Default.args,
    withCheckAll: true,
    options: DEMO_OPTIONS.filter(({ loading }) => !loading),
  },
} satisfies Story;

/**
 * A disabled checkbox group where all checkboxes are disabled.
 */
export const Disabled = {
  args: {
    ...Default.args,
    disabled: true,
  },
} satisfies Story;

/**
 * A checkbox group with long labels that will be truncated.
 * You can set the "truncation" property of the options to choose between the different truncation types.
 */
export const WithTruncation = {
  args: {
    ...Default.args,
    style: "max-width: 16rem",
    options: [
      { label: "Very long label that will be truncated", value: 1 },
      { label: "Very long required label that will be truncated", value: 2, required: true },
      {
        label: "Very long label that will be wrapped with multiline",
        value: 3,
        truncation: "multiline",
      },
      {
        label: "Very long required label that will be wrapped with multiline",
        value: 4,
        truncation: "multiline",
        required: true,
      },
    ],
  },
} satisfies Story;

/**
 * This example shows a skeleton checkbox group.
 * The number of skeleton options shown can be set via the `skeleton` property.
 */
export const Skeleton = {
  args: {
    ...Default.args,
    skeleton: 3,
  },
} satisfies Story;
