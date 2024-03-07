import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxInput from "./OnyxInput.vue";

/**
 * Text inputs are essential UI elements where users can enter textual information.
 * These components play a fundamental role in facilitating user interactions and data input within applications and websites.
 */
const meta: Meta<typeof OnyxInput> = {
  title: "components/OnyxInput",
  ...defineStorybookActionsAndVModels({
    component: OnyxInput,
    events: ["update:modelValue", "change", "focus", "blur"],
    decorators: [
      (story) => ({
        components: { story },
        template: `<div style="width: 16rem;"> <story /> </div>`,
      }),
    ],
    argTypes: {
      pattern: {
        control: { type: "text" },
      },
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
 * This example shows a input with a placeholder.
 */
export const Placeholder = {
  args: {
    label: "Label",
    placeholder: "Enter something...",
  },
} satisfies Story;

/**
 * This example shows a input with a maxlength.
 */
export const Maxlength = {
  args: {
    ...Default.args,
    maxlength: 16,
    withCounter: true,
  },
} satisfies Story;

/**
 * This example shows a input with a description / help text.
 */
export const Description = {
  args: {
    ...Default.args,
    description: "Example description text",
  },
} satisfies Story;
