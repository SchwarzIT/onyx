import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxTextarea from "./OnyxTextarea.vue";

const meta: Meta<typeof OnyxTextarea> = {
  title: "components/Textarea",
  ...defineStorybookActionsAndVModels({
    component: OnyxTextarea,
    events: ["update:modelValue", "change", "focus", "blur", "validityChange"],
    decorators: [
      (story) => ({
        components: { story },
        template: `<div style="max-width: 24rem;"> <story /> </div>`,
      }),
    ],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxTextarea>;

/**
 * This example shows a default textarea.
 */
export const Default = {
  args: {
    label: "Label",
  },
} satisfies Story;

/**
 * This example shows a textarea with a placeholder.
 */
export const Placeholder = {
  args: {
    label: "Label",
    placeholder: "Enter something...",
  },
} satisfies Story;

/**
 * This example shows a required textarea.
 */
export const Required = {
  args: {
    ...Default.args,
    required: true,
  },
} satisfies Story;

/**
 * This example shows a readonly textarea that can not be edited.
 */
export const Readonly = {
  args: {
    ...Default.args,
    readonly: true,
    modelValue: "Test value",
  },
} satisfies Story;

/**
 * This example shows a disabled textarea that can not be edited and is therefore not included in any form data.
 */
export const Disabled = {
  args: {
    ...Default.args,
    disabled: true,
    modelValue: "Test value",
  },
} satisfies Story;

/**
 * This example shows a skeleton textarea.
 */
export const Skeleton = {
  args: {
    ...Default.args,
    skeleton: true,
  },
} satisfies Story;

/**
 * This example shows a textarea with a maxlength and counter.
 */
export const Maxlength = {
  args: {
    ...Default.args,
    maxlength: 32,
    withCounter: true,
  },
} satisfies Story;

/**
 * This example shows a textarea with a message / help text.
 */
export const WithMessage = {
  args: {
    ...Default.args,
    message: "Example message",
  },
} satisfies Story;

/**
 * This example shows a textarea without a visual label.
 * For accessibility / screen readers it must still be passed.
 */
export const HiddenLabel = {
  args: {
    label: "Label",
    hideLabel: true,
  },
} satisfies Story;

/**
 * This example shows a textarea with a custom error message.
 * Will only be shown after user interaction.
 */
export const CustomError = {
  args: {
    ...Default.args,
    customError: "Example custom error",
    placeholder: "Interact with me to show error",
  },
} satisfies Story;

/**
 * This example shows a textarea with custom autosize settings (min=2 rows, max=12 rows).
 * You can also disable the max rows so the textarea can grow unlimited.
 */
export const Autosize = {
  args: {
    ...Default.args,
    placeholder: "Type multiple lines to see the autosize...",
    autosize: {
      min: 2,
      max: 12,
    },
  },
} satisfies Story;

/**
 * This example shows a textarea with label tooltip.
 */
export const WithLabelTooltip: Story = {
  args: {
    label: "Label",
    labelTooltip: "More Information",
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="padding-top: 2rem"> <story /> </div>`,
    }),
  ],
};

/**
 * This example shows a textarea with message / additional text and an optional tooltip.
 */
export const WithMessageTooltip = {
  args: {
    ...Default.args,
    message: "Example message",
    messageTooltip: "Additional info message",
  },
} satisfies Story;
