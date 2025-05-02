import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxTextarea from "./OnyxTextarea.vue";

/**
 * Textarea components support large text entries, giving users a spacious area to input or format continuous text, making them ideal for comments, descriptions, or other longer texts.
 */

const meta: Meta<typeof OnyxTextarea> = {
  title: "Form Elements/Textarea",
  component: OnyxTextarea,
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="max-width: 24rem;"> <story /> </div>`,
    }),
  ],
  argTypes: {
    ...withNativeEventLogging(["onChange"]),
  },
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
export const CustomError: Story = {
  args: {
    ...Default.args,
    customError: {
      shortMessage: "Example custom error",
      longMessage: "This text might inform the users what they can do to fix the error.",
    },
    placeholder: "Interact with me to show error",
  },
};

/**
 * This example shows a textarea with a success message.
 */
export const SuccessMessage: Story = {
  args: {
    ...Default.args,
    success: {
      shortMessage: "Example success message",
      longMessage: "This text might inform the users that the text is valid.",
    },
    modelValue: "Test success value",
  },
};

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
};

/**
 * This example shows a textarea with message / additional text and an optional tooltip.
 */
export const WithMessageTooltip = {
  args: {
    ...Default.args,
    message: {
      shortMessage: "Example message",
      longMessage: "Additional info message",
    },
  },
} satisfies Story;
