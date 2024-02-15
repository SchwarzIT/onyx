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
