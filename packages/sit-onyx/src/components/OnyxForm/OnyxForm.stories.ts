import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import { OnyxInput } from "../..";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxStepper from "../OnyxStepper/OnyxStepper.vue";
import OnyxForm from "./OnyxForm.vue";

/**
 * This component can be used in to wrap form components like OnyxInput/OnyxTextarea/OnyxStepper.
 * Currently it can be used to set all form elements to disabled.
 */
const meta: Meta<typeof OnyxForm> = {
  title: "Form/Form",
  component: OnyxForm,
};

export default meta;
type Story = StoryObj<typeof OnyxForm>;

/**
 * This example shows a default form element.
 */
export const Default = {
  args: {
    style: { maxWidth: "10rem", display: "flex", flexDirection: "column", gap: "1rem" },
    default: () => [
      h(OnyxInput, { label: "Favorite band", modelValue: "Queen" }),
      h(OnyxInput, { label: "Favorite password", type: "password", modelValue: "incorrect" }),
      h(OnyxStepper, { label: "Number of hairs", min: 0, modelValue: 23 }),
      h(
        "div",
        {
          style: { display: "flex", gap: "0.5rem" },
        },
        [
          h(OnyxButton, { label: "Reset", type: "reset", mode: "outline" }),
          h(OnyxButton, { label: "Submit", type: "submit", formmethod: "dialog" }), // we use formmethod `dialog` to avoid a page load on submit
        ],
      ),
    ],
  },
  argTypes: {
    ...withNativeEventLogging(["onSubmit", "onReset"]),
  },
} satisfies Story;
