import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxSelect from "./OnyxSelect.vue";

// TODO: description in figma is missing.
/**
 * This is a select.
 */
const meta: Meta<typeof OnyxSelect> = {
  title: "components/OnyxSelect",
  ...defineStorybookActionsAndVModels({
    component: OnyxSelect,
    events: ["update:modelValue"],
    decorators: [
      (story) => ({
        components: { story },
        template: `<div style="width: 16rem;"> <story /> </div>`,
      }),
    ],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxSelect>;

/**
 * This example shows a default select.
 */
export const Default = {
  args: {
    label: "Fruits",
  },
} satisfies Story;

/**
 * This example shows an select with a placeholder.
 */
export const Placeholder = {
  args: {
    label: "Fruits",
    placeholder: "Select your fruits",
  },
} satisfies Story;

/**
 * This example shows a required select.
 */
export const Required = {
  args: {
    ...Default.args,
    required: true,
  },
} satisfies Story;

/**
 * This example shows a disabled select that can not be edited and is therefore not included in any form data.
 */
export const Disabled = {
  args: {
    ...Default.args,
    disabled: true,
    modelValue: "Test value",
  },
} satisfies Story;

/**
 * This example shows a loading select. User interaction is disabled while loading.
 */
export const Loading = {
  args: {
    ...Default.args,
    modelValue: "Test value",
    loading: true,
  },
} satisfies Story;

/**
 * This example shows an select with a message / help text.
 */
export const WithMessage = {
  args: {
    ...Default.args,
    message: "Example message",
  },
} satisfies Story;

/**
 * This example shows an select without a visual label.
 * For accessibility / screen readers it must still be passed.
 */
export const HiddenLabel = {
  args: {
    label: "Fruits",
    hideLabel: true,
  },
} satisfies Story;
