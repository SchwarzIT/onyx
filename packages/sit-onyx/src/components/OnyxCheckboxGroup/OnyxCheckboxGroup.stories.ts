import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxCheckboxGroup from "./OnyxCheckboxGroup.vue";
import { CHECKBOX_GROUP_DIRECTIONS } from "./types";

/**
 * Checkboxes are a fundamental UI element, that allows users to make a binary selection.
 * They are commonly used for tasks such as selecting multiple items, opting into services or confirming and agreeing.
 */
const meta: Meta<typeof OnyxCheckboxGroup> = {
  title: "components/OnyxCheckboxGroup",
  ...defineStorybookActionsAndVModels({
    component: OnyxCheckboxGroup,
    events: ["update:modelValue"],
    argTypes: {
      direction: {
        options: CHECKBOX_GROUP_DIRECTIONS,
      },
    },
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
      { label: "Required", id: "id-4", required: true },
      { label: "Disabled", id: "id-3", disabled: true },
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
    showCheckAll: true,
  },
} satisfies Story;
