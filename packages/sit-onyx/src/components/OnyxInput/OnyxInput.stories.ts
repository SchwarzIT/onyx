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
 * This example shows a input with a placeholder.
 */
export const Placeholder = {
  args: {
    label: "Label",
    placeholder: "Enter something...",
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
