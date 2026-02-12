import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";
import { ShowErrorModes } from "../../composables/useErrorClass.js";
import { createAdvancedStoryExample } from "../../utils/storybook.js";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxInput from "../OnyxInput/OnyxInput.vue";
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
 * This example shows an OnyxForm with some inputs.
 * Play around with the properties of the OnyxForm to see their effect.
 */
export const Default = {
  args: {
    class: "form",
    style:
      "display: flex; flex-direction: column; max-width: 20rem; gap: var(--onyx-grid-gutter); ",
    onSubmit: (e: SubmitEvent) => e.preventDefault(),
    default: () => [
      h(OnyxInput, { label: "Favorite band", pattern: "/[A-Za-z ]+/" }),
      h(OnyxInput, { label: "Favorite password", type: "password", required: true }),
      h(OnyxInput, { label: "Number of hairs", min: 0 }),
      h(OnyxButton, { label: "Submit", type: "submit" }),
    ],
  },
} satisfies Story;

export const AdvancedExample = createAdvancedStoryExample("OnyxForm", "AdvancedExample");

export const FileUploadExample = createAdvancedStoryExample("OnyxForm", "FileUploadExample");
