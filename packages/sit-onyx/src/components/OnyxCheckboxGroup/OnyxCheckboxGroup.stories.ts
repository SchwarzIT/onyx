import { createTruncationDecorator } from "@/utils/storybook";
import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxCheckboxGroup from "./OnyxCheckboxGroup.vue";

/**
 * Checkboxes are a fundamental UI element, that allows users to make a binary selection.
 * They are commonly used for tasks such as selecting multiple items, opting into services or confirming and agreeing.
 */
const meta: Meta<typeof OnyxCheckboxGroup> = {
  title: "components/OnyxCheckboxGroup",
  ...defineStorybookActionsAndVModels({
    component: OnyxCheckboxGroup,
    events: ["update:modelValue"],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxCheckboxGroup>;

/**
 * A checkbox group that contains a list of checkboxes.
 */
export const Default = {
  args: {
    headline: "Checkbox group headline",
    modelValue: ["id-2"],
    options: [
      { label: "Default", id: "id-1" },
      { label: "Initially checked", id: "id-2" },
      { label: "Required", id: "id-3", required: true },
      { label: "Disabled", id: "id-4", disabled: true },
      { label: "Loading", id: "id-5", loading: true },
    ],
  },
} satisfies Story;

/**
 * A horizontal checkbox group.
 */
export const Horizontal = {
  args: {
    ...Default.args,
    direction: "horizontal",
  },
} satisfies Story;

/**
 * A checkbox group with the check all option to check/uncheck all options.
 */
export const WithCheckAll = {
  args: {
    ...Default.args,
    withCheckAll: true,
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
    options: [
      { label: "Very long label that will be truncated", id: "id-1" },
      { label: "Very long required label that will be truncated", id: "id-2", required: true },
      {
        label: "Very long label that will be truncated with multiline",
        id: "id-3",
        truncation: "multiline",
      },
    ],
  },
  decorators: [createTruncationDecorator("16rem")],
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
