import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import type { BaseSelectOption } from "../../types";
import OnyxRadioGroup from "./OnyxRadioGroup.vue";

/**
 * Radio buttons in UI design are interactive elements that allow users to make a single selection from a set of mutually exclusive options.
 * Users can choose only one option at the time, making radio buttons ideal for scenarios where a single, distinct choice is required.
 */
const meta: Meta<typeof OnyxRadioGroup> = {
  title: "Form/RadioGroup",
  ...defineStorybookActionsAndVModels({
    component: OnyxRadioGroup,
    events: ["update:modelValue", "validityChange"],
  }),
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
 * This example shows a radio group with a headline.
 */
export const Default = {
  args: {
    headline: "Headline",
    options: EXAMPLE_OPTIONS,
    modelValue: EXAMPLE_OPTIONS[0].value,
  },
} satisfies Story;

/**
 * This example shows a disabled radio group.
 */
export const Disabled = {
  args: {
    headline: "Headline",
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
    headline: "Headline",
    options: EXAMPLE_OPTIONS,
    modelValue: EXAMPLE_OPTIONS[0].value,
    direction: "horizontal",
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
