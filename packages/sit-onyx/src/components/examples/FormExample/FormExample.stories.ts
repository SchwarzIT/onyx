import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import FormExample from "./FormExample.vue";
import FormExampleSourceCode from "./FormExample.vue?raw";

/**
 * This example shows a form with several fields and various validations.
 * When trying to submit when the form is invalid, the invalid fields will shown corresponding error messages.
 */
const meta: Meta<typeof FormExample> = {
  title: "Examples/FormExample",
  ...defineStorybookActionsAndVModels({
    component: FormExample,
    events: [],
  }),
  parameters: {
    docs: {
      source: {
        code: FormExampleSourceCode.replace('from "../../.."', 'from "sit-onyx"'),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormExample>;

export const Default = { args: {} } satisfies Story;
