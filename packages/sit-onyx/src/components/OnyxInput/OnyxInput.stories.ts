import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxInput from "./OnyxInput.vue";

/**
 * Text inputs are essential UI elements where users can enter textual information.
 * These components play a fundamental role in facilitating user interactions and data input within applications and websites.
 */
const meta: Meta<typeof OnyxInput> = {
  title: "Form/Input",
  ...defineStorybookActionsAndVModels({
    component: OnyxInput,
    events: ["update:modelValue", "change", "focus", "blur", "validityChange"],
    decorators: [
      (story) => ({
        components: { story },
        template: `<div style="width: 16rem;"> <story /> </div>`,
      }),
    ],
    argTypes: {
      pattern: { control: { type: "text" } },
    },
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxInput>;

/**
 * This example shows a default input.
 */
export const Default = {
  args: {
    label: "Label",
  },
} satisfies Story;

/**
 * This example shows an input with a placeholder.
 */
export const Placeholder = {
  args: {
    label: "Label",
    placeholder: "Enter something...",
  },
} satisfies Story;

/**
 * This example shows a required input.
 */
export const Required = {
  args: {
    ...Default.args,
    required: true,
  },
} satisfies Story;

/**
 * This example shows a readonly input that can not be edited.
 */
export const Readonly = {
  args: {
    ...Default.args,
    readonly: true,
    modelValue: "Test value",
  },
} satisfies Story;

/**
 * This example shows a disabled input that can not be edited and is therefore not included in any form data.
 */
export const Disabled = {
  args: {
    ...Default.args,
    disabled: true,
    modelValue: "Test value",
  },
} satisfies Story;

/**
 * This example shows a loading input. User interaction is disabled while loading.
 */
export const Loading = {
  args: {
    ...Default.args,
    modelValue: "Test value",
    loading: true,
  },
} satisfies Story;

/**
 * This example shows a skeleton input.
 */
export const Skeleton = {
  args: {
    ...Default.args,
    skeleton: true,
  },
} satisfies Story;

/**
 * This example shows an input with a minlength of 5, a maxlength and counter.
 * Shows an error after interaction for a shorter value.
 */
export const Maxlength: Story = {
  args: {
    ...Default.args,
    maxlength: 16,
    minlength: 5,
    withCounter: true,
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="padding: 0 0 4rem 4rem"> <story /> </div>`,
    }),
  ],
};

/**
 * This example shows an input with a message / help text.
 */
export const WithMessage = {
  args: {
    ...Default.args,
    message: "Example message",
  },
} satisfies Story;

/**
 * This example shows an input with autocomplete where the browser suggest to fill the input value.
 * Note: For this example you need to have set your name in your browser settings.
 */
export const Autocomplete = {
  args: {
    label: "Label",
    autocomplete: "name",
  },
} satisfies Story;

/**
 * This example shows an input without a visual label.
 * For accessibility / screen readers it must still be passed.
 */
export const HiddenLabel = {
  args: {
    label: "Label",
    hideLabel: true,
  },
} satisfies Story;

/**
 * This example shows an input with a custom error message.
 * Will only be shown after user interaction.
 */
export const CustomError = {
  args: {
    ...Default.args,
    customError: {
      shortMessage: "Example custom error",
      longMessage: "This text might inform the users what they can do to fix the error.",
    },
    placeholder: "Interact with me to show error",
  },
} satisfies Story;

/**
 * This example shows an input with info label tooltip.
 */
export const WithLabelTooltip: Story = {
  args: {
    label: "Label",
    labelTooltip: "More information",
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="padding-top: 2rem"> <story /> </div>`,
    }),
  ],
};

/**
 * This example shows an input with message / additional text and an optional tooltip.
 */
export const WithMessageTooltip = {
  args: {
    ...Default.args,
    message: "Example message",
    messageTooltip: "Additional info message",
  },
} satisfies Story;
