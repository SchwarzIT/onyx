import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxToast from "../../OnyxToast/OnyxToast.vue";
import FormExample from "./FormExample.vue";
import FormExampleSourceCode from "./FormExample.vue?raw";

/**
 * This example shows a form with several fields and various validations in combination with the [onyx grid](https://onyx.schwarz/development/grid.html) for responsive layout.
 *
 * When trying to submit when the form is invalid, the invalid fields will shown corresponding error messages with [build-in translations](https://onyx.schwarz/development/i18n.html).
 */
const meta: Meta<typeof FormExample> = {
  title: "Examples/Form",
  ...defineStorybookActionsAndVModels({
    component: FormExample,
    events: [],
    decorators: [
      (story) => ({
        components: { story, OnyxToast },
        template: `<OnyxToast /> <story />`,
      }),
    ],
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
