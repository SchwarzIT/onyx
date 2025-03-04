import type { Meta, StoryObj } from "@storybook/vue3";
import { ref, watchEffect } from "vue";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxDialog from "./OnyxDialog.vue";

/**
 * Dialogs can be used to overlay the primary page content (or other dialogs).
 * If using the `modal` mode, the primary page content will not be interactive.
 */
const meta: Meta<typeof OnyxDialog> = {
  title: "Support/Dialog",
  component: OnyxDialog,
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
type Story = StoryObj<typeof OnyxDialog>;

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
export const Modal: Story = {
  args: {
    label: "Example modal dialog",
    default: "Dialog content...",
    modal: true,
  },
  decorators: [
    (story, ctx) => ({
      components: { story, OnyxButton },
      setup: () => {
        const isOpen = ref(false);
        watchEffect(() => {
          ctx.args.open = isOpen.value;
        });
        return { isOpen };
      },
      template: `<div>
        <OnyxButton label="Show modal" @click="isOpen = true" />
        <story :open="isOpen" @close="isOpen = false;" />
      </div>`,
    }),
  ],
};

export const LeftAligned = {
  args: {
    ...Default.args,
    alignment: "left",
  },
} satisfies Story;

export const RightAligned = {
  args: {
    ...Default.args,
    alignment: "right",
  },
} satisfies Story;
