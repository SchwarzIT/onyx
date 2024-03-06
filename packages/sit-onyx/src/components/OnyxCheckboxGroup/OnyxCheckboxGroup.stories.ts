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
      { label: "Skeleton", id: "id-5", skeleton: true },
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
