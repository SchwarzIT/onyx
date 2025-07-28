import type { Meta } from "@storybook/vue3-vite";
import { createAdvancedStoryExample } from "../../utils/storybook.js";
import OnyxModalDialog from "./OnyxModalDialog.vue";

/**
 * The modal dialog is used to provide information to the user while interaction with the rest of the page is prevented and a backdrop is displayed.
 *
 * You can also implement a custom dialog using the [OnyxSupportDialog](/docs/support-dialog--docs) component.
 */
const meta: Meta<typeof OnyxModalDialog> = {
  title: "Feedback/ModalDialog",
  component: OnyxModalDialog,
  argTypes: {
    default: { control: { disable: true } },
    headline: { control: { disable: true } },
    footer: { control: { disable: true } },
    description: { control: { type: "text" } },
  },
};

export default meta;

export const Default = createAdvancedStoryExample("OnyxModalDialog", "DefaultExample");
