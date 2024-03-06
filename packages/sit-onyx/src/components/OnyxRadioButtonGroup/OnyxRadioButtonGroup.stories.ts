import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import type { SelectionOption } from "../OnyxRadioButton/types";
import OnyxRadioButtonGroup from "./OnyxRadioButtonGroup.vue";

/**
 * Radio buttons in UI design are interactive elements that allow users to make a single selection from a set of mutually exclusive options.
 * Users can choose only one option at the time, making radio buttons ideal for scenarios where a single, distinct choice is required.
 */
const meta: Meta<typeof OnyxRadioButtonGroup> = {
  title: "components/OnyxRadioButtonGroup",
  ...defineStorybookActionsAndVModels({
    component: OnyxRadioButtonGroup,
    events: ["update:modelValue"],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxRadioButtonGroup>;

const EXAMPLE_OPTIONS: SelectionOption<string>[] = [
  { label: "Default", value: "1", id: "1" },
  { label: "Initially checked", value: "2", id: "2" },
  { label: "Disabled", value: "3", id: "3", disabled: true },
  { label: "Skeleton", value: "4", id: "4", skeleton: true },
];

/**
 * This example shows a radio button group with a headline.
 */
export const Default = {
  args: {
    headline: "Headline",
    options: EXAMPLE_OPTIONS,
    modelValue: EXAMPLE_OPTIONS[0],
  },
} satisfies Story;

/**
 * This example shows a disabled radio button group.
 */
export const Disabled = {
  args: {
    headline: "Headline",
    options: EXAMPLE_OPTIONS,
    modelValue: EXAMPLE_OPTIONS[0],
    disabled: true,
  },
} satisfies Story;

/**
 * This example shows radio button group thats layed out vertically.
 */
export const Horizontal = {
  args: {
    headline: "Headline",
    options: EXAMPLE_OPTIONS,
    modelValue: EXAMPLE_OPTIONS[0],
    direction: "horizontal",
  },
} satisfies Story;
