import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";
import { OnyxButton } from "../../index.js";
import OnyxBasicDialog from "./OnyxBasicDialog.vue";

/**
 * Dialog components display popup modals that allow users to interact at an overlay level, letting them perform tasks without leaving the current page. It can either be modal or non-modal. Modal dialogs interrupt interaction with the rest of the page, while non-modal dialogs allow interaction with the rest of the page.
 */
const meta: Meta<typeof OnyxBasicDialog> = {
  title: "Support/BasicDialog",
  component: OnyxBasicDialog,
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
type Story = StoryObj<typeof OnyxBasicDialog>;

export const Default = {
  args: {
    label: "Example dialog",
    open: true,
    default: "Dialog content...",
  },
  render: (args) => ({
    setup: () => {
      return () => [
        h(OnyxButton, { label: "Toggle", onClick: () => args["onUpdate:open"]?.(!args.open) }),
        h(OnyxBasicDialog, args, {
          default: args.default,
        }),
      ];
    },
  }),
} satisfies Story;

/**
 * This example shows a modal dialog which will block the primary page content and show a backdrop.
 * **Hint**: In this example, you can close the dialog by pressing "Escape".
 */
export const Modal = {
  ...Default,
  args: {
    label: "Example Modal",
    open: true,
    default: "Modal content...",
    modal: true,
  },
} satisfies Story;

export const LeftAligned = {
  ...Default,
  args: {
    ...Default.args,
    alignment: "left",
  },
} satisfies Story;

export const RightAligned = {
  ...Default,
  args: {
    ...Default.args,
    alignment: "right",
  },
} satisfies Story;
