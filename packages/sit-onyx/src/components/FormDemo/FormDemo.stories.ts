import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import FormDemo from "./FormDemo.vue";

/**
 * The input component can be used to...
 */
const meta: Meta<typeof FormDemo> = {
  title: "components/FormDemo",
  ...defineStorybookActionsAndVModels({
    component: FormDemo,
    events: ["submit"],
  }),
};

export default meta;
type Story = StoryObj<typeof FormDemo>;

/**
 * This example shows the primary input.
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
 * This example shows the primary input.
 */
export const Invalid = {
  args: {
    formData: {
      defaultInput: "No Validation",
      requiredInput: "",
      minlengthInput: "Too short",
      maxInput: "9001",
      typeInput: "Not a mail",
      patternInput: "NO UPPERCASE ALLOWED",
    },
  },
} satisfies Story;

/** https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#using_built-in_form_validation
- required: Specifies whether a form field needs to be filled in before the form can be submitted.
- minlength and maxlength: Specifies the minimum and maximum length of textual data (strings).
- min and max: Specifies the minimum and maximum values of numerical input types.
- type: Specifies whether the data needs to be a number, an email address, or some other specific preset type.
- pattern: Specifies a regular expression that defines a pattern the entered data needs to follow.

https://developer.mozilla.org/en-US/docs/Web/CSS/:valid
- The element matches the :valid or :invalid CSS pseudo-class

build-in errors like:
https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/badInput
https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/valueMissing
https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/patternMismatch
- const input = document.getElementById("age");
- => input.validity.badInput
test("respects standard form validations", ()=>{
  
})
*/
