import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { ShowErrorModes } from "../../composables/useErrorClass";
import { createAdvancedStoryExample } from "../../utils/storybook";
import OnyxForm from "./OnyxForm.vue";

/**
 * This component can be used in to wrap form components like OnyxInput/OnyxTextarea/OnyxStepper.
 * It allows for controlling the disabled state of all child form components.
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
export const Default = await createAdvancedStoryExample("OnyxForm", "DefaultExample");

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

export const AdvancedExample = await createAdvancedStoryExample("OnyxForm", "AdvancedExample");
