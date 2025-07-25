import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { ShowErrorModes } from "../../composables/useErrorClass.js";
import { createAdvancedStoryExample } from "../../utils/storybook.js";
import OnyxForm from "./OnyxForm.vue";

/**
 * Forms are comprehensive components designed for collecting user inputs, including fields like text inputs, dropdowns, steppers, and more. With built-in validation and error handling, this flexible component adapts well to different input needs.
 */
const meta: Meta<typeof OnyxForm> = {
  title: "Form Elements/Form",
  component: OnyxForm,
  argTypes: {
    ...withNativeEventLogging(["onSubmit", "onReset"]),
    showError: {
      control: "select",
      options: ShowErrorModes,
    },
    default: { control: { disable: true } },
    ["$slots" as string]: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxForm>;

/**
 * This example shows a default form element.
 */
export const Default = createAdvancedStoryExample("OnyxForm", "DefaultExample");

/**
 * This example show a form that displays all errors immediately.
 */
export const ShowError = {
  ...Default,
  args: {
    showError: true,
  },
} satisfies Story;

/**
 * This example show a form that is disabled as a whole.
 */
export const Disabled = {
  ...Default,
  args: {
    disabled: true,
  },
} satisfies Story;

export const AdvancedExample = createAdvancedStoryExample("OnyxForm", "AdvancedExample");
