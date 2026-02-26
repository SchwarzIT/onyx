import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { ShowErrorModes } from "../../composables/useErrorClass.js";
import { createAdvancedStoryExample } from "../../utils/storybook.js";
import OnyxToast from "../OnyxToast/OnyxToast.vue";
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
  decorators: [
    // provide the OnyxToast so toasts are shown correctly in the examples
    (story) => ({
      components: { story, OnyxToast },
      template: `<story /> <OnyxToast />`,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof OnyxForm>;

export const Default = createAdvancedStoryExample("OnyxForm", "DefaultExample") satisfies Story;

export const AdvancedExample = createAdvancedStoryExample(
  "OnyxForm",
  "AdvancedExample",
) satisfies Story;

export const FileUploadExample = createAdvancedStoryExample(
  "OnyxForm",
  "FileUploadExample",
) satisfies Story;
