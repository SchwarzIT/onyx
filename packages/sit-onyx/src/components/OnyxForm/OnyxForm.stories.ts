import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import { OnyxInput, OnyxToast } from "../..";
import FormExample from "../examples/FormExample/FormExample.vue";
import FormExampleSourceCode from "../examples/FormExample/FormExample.vue?raw";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxStepper from "../OnyxStepper/OnyxStepper.vue";
import OnyxForm from "./OnyxForm.vue";

/**
 * This component can be used in to wrap form components like OnyxInput/OnyxTextarea/OnyxStepper.
 * It allows for controlling the disabled state of all child form components.
 */
const meta: Meta<typeof OnyxForm> = {
  title: "Form Elements/Form",
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

export const Disabled = {
  args: {
    ...Default.args,
    disabled: true,
  },
} satisfies Story;

export const Example = {
  render(args: StoryObj<typeof FormExample>["args"]) {
    return {
      components: { FormExample, OnyxToast },
      setup() {
        return { args };
      },
      template: `
        <OnyxToast />
        <FormExample v-bind="args"  />
      `,
    };
  },
  parameters: {
    docs: {
      source: {
        code: FormExampleSourceCode.replace('from "../../.."', 'from "sit-onyx"'),
      },
    },
  },
} satisfies Story;
