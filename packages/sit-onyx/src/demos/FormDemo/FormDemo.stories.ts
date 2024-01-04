import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import FormDemo from "./FormDemo.vue";

/**
 * The input component can be used to...
 */
const meta: Meta<typeof FormDemo> = {
  title: "demos/FormDemo",
  ...defineStorybookActionsAndVModels({
    component: FormDemo,
    events: ["submit"],
  }),
};

export default meta;
type Story = StoryObj<typeof FormDemo>;

/**
 * This example shows a valid form.
 */
export const Primary = {
  args: {
    formData: {
      defaultInput: "No Validation",
      requiredInput: "Is filled",
      minlengthInput: "Is long enough",
      maxInput: "42",
      typeInput: "john.doe@mail.schwarz",
      patternInput: "only lowercase or space",
    },
  },
} satisfies Story;

/**
 * This example shows an invalid form.
 */
export const Invalid = {
  args: {
    formData: {
      defaultInput: "No Validation",
      requiredInput: "",
      minlengthInput: "",
      maxInput: "9001",
      typeInput: "NotAmail",
      patternInput: "NO UPPERCASE ALLOWED",
    },
  },
} satisfies Story;

/**
 * This example shows an empty form.
 */
export const Empty = {
  args: {
    formData: {
      defaultInput: "",
      requiredInput: "",
      minlengthInput: "",
      maxInput: "",
      typeInput: "",
      patternInput: "",
    },
  },
} satisfies Story;
