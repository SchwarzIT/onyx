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
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxRadioButtonGroup>;

const EXAMPLE_OPTIONS: SelectionOption<string>[] = [
  { label: "default", value: "1", id: "1" },
  { label: "initially checked", value: "2", id: "2" },
  { label: "disabled", value: "3", id: "3", disabled: true },
];

/**
 * This example shows a radio button group with a headline.
 */
export const Default = {
  args: {
    headline: "Headline",
    options: EXAMPLE_OPTIONS,
    modelValue: EXAMPLE_OPTIONS[2],
  },
} satisfies Story;

/**
 * This example shows a disabled radio button group.
 */
export const Disabled = {
  args: {
    headline: "Headline",
    options: EXAMPLE_OPTIONS,
    modelValue: EXAMPLE_OPTIONS[2],
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
    modelValue: EXAMPLE_OPTIONS[2],
    direction: "horizontal",
  },
} satisfies Story;
