import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxFormElement from "./OnyxFormElement.vue";
import { h } from "vue";

const meta: Meta<typeof OnyxFormElement> = {
  title: "support/FormElement",
  ...defineStorybookActionsAndVModels({
    component: OnyxFormElement,
    events: [],
    argTypes: {
      default: { control: { disable: true } },
    },
    decorators: [
      (story) => ({
        components: { story },
        template: `<div style="max-width: 12rem; padding: 2rem 1rem">
                    <story /> 
                   </div>`,
      }),
    ],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxFormElement>;

/**
 * This example shows a default form element.
 */
export const Default = {
  args: {
    label: "Label",
    default: () =>
      h("input", { placeholder: "Demo form element", style: "width: 100%", disabled: true }),
  },
} satisfies Story;

/**
 * This example shows a required form element.
 */
export const Required = {
  args: {
    ...Default.args,
    required: true,
  },
} satisfies Story;

/**
 * This example shows a form element with a message, a tooltip and a counter.
 */
export const WithMessageAndCounter = {
  args: {
    ...Default.args,
    message: "A very long example message that will be truncated",
    messageTooltip: "Additional info message",
    maxlength: 60,
    withCounter: true,
  },
} satisfies Story;

/**
 * This example shows a form element without a label.
 */
export const HiddenLabel = {
  args: {
    ...Default.args,
    hideLabel: true,
  },
} satisfies Story;

/**
 * This example shows a form element with a label tooltip.
 */
export const WithLabelTooltip = {
  args: {
    ...Default.args,
    label: "Label",
    labelTooltip: "More Information",
  },
} satisfies Story;

/**
 * This example shows a form element with an error message. <br>
 * **Warning:** When using OnyxFormElement,
 * make sure to hide the default `message` when you show an `errorMessage`.
 * For OnyxInput and OnyxTextarea, this is handled by `input.scss`
 */
export const WithErrorMessage = {
  args: {
    ...Default.args,
    errorMessages: {
      shortMessage: "Example custom error",
      longMessage: "This text might inform the users what they can do to fix the error.",
    },
  },
} satisfies Story;
