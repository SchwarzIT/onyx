import type { Meta } from "@storybook/vue3-vite";
import { createAdvancedStoryExample } from "../../utils/storybook.js";
import OnyxAlertModal from "./OnyxAlertModal.vue";

/**
 * The alert dialog is used to provide important information to the user.
 * Note that this dialog is an [alert dialog](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/).
 * It interrupts the user's workflow to communicate an important message and acquires a response, e.g. a delete confirmation.
 *
 * You can also implement a custom dialog using the [OnyxDialog](/docs/support-dialog--docs) component.
 */
const meta: Meta<typeof OnyxAlertModal> = {
  title: "Feedback/AlertModal",
  component: OnyxAlertModal,
  argTypes: {
    default: { control: { type: "text" } },
    headline: { control: { disable: true } },
  },
};

export default meta;

export const Default = createAdvancedStoryExample("OnyxAlertModal", "DefaultExample");
