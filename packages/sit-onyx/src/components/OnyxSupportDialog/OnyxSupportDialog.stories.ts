import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { createAdvancedStoryExample } from "../../utils/storybook.js";
import OnyxSupportDialog from "./OnyxSupportDialog.vue";

/**
 * Dialog components display popup modals that allow users to interact at an overlay level, letting them perform tasks without leaving the current page. It can either be modal or non-modal. Modal dialogs interrupt interaction with the rest of the page, while non-modal dialogs allow interaction with the rest of the page.
 */
const meta: Meta<typeof OnyxSupportDialog> = {
  title: "Support/Dialog",
  component: OnyxSupportDialog,
  argTypes: {
    default: { control: { type: "text" } },
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="height: 12rem;"> <story /> </div>`,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof OnyxSupportDialog>;

export const Default = {
  args: {
    label: "Example dialog",
    open: true,
    default: "Dialog content...",
  },
} satisfies Story;

/**
 * This example shows a modal dialog which will block the primary page content and show a backdrop.
 * **Hint**: In this example, you can close the dialog by pressing "Escape".
 */
export const Modal = createAdvancedStoryExample("OnyxSupportDialog", "ModalExample");

export const LeftAligned = createAdvancedStoryExample("OnyxSupportDialog", "LeftAlignedExample");

export const RightAligned = createAdvancedStoryExample("OnyxSupportDialog", "RightAlignedExample");
