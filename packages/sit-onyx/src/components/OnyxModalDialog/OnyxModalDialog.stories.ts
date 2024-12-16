import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxModalDialog from "./OnyxModalDialog.vue";

/**
 * The modal dialog is used to provide information to the user while interaction with the rest of the page is prevented and a backdrop is displayed.
 *
 * You can also implement a custom dialog using the [OnyxDialog](/docs/support-dialog--docs) component.
 */
const meta: Meta<typeof OnyxModalDialog> = {
  title: "Feedback/ModalDialog",
  component: OnyxModalDialog,
};

export default meta;
type Story = StoryObj<typeof OnyxModalDialog>;

export const Default = {
  args: {
    label: "Example modal dialog",
    open: true,
  },
} satisfies Story;
