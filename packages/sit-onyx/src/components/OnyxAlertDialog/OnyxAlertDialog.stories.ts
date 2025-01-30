import circleAttention from "@sit-onyx/icons/circle-attention.svg?raw";
import type { Meta, StoryObj } from "@storybook/vue3";
import { useArgs } from "storybook/internal/preview-api";
import { h, ref, watch, watchEffect } from "vue";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxAlertDialog from "./OnyxAlertDialog.vue";
import type { OnyxAlertDialogProps } from "./types";

/**
 * The alert dialog is used to provide important information to the user.
 * Note that this dialog is an [alert dialog](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/).
 * It interrupts the user's workflow to communicate an important message and acquires a response, e.g. a delete confirmation.
 *
 * You can also implement a custom dialog using the [OnyxDialog](/docs/support-dialog--docs) component.
 */
const meta: Meta<typeof OnyxAlertDialog> = {
  title: "Feedback/AlertDialog",
  component: OnyxAlertDialog,
  argTypes: {
    default: { control: { type: "text" } },
    headline: { control: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxAlertDialog>;

export const Default = {
  args: {
    label: "Confirm deletion",
    default:
      "Are you sure that you want to delete the selected item? This action can not be reverted.",
    icon: {
      icon: circleAttention,
      color: "danger",
    },
    actions: () => [
      h(OnyxButton, { label: "Cancel", color: "neutral", mode: "plain", autofocus: true }),
      h(OnyxButton, { label: "Delete", color: "danger" }),
    ],
  },
  decorators: [
    (story) => {
      const [args, updateArgs] = useArgs<OnyxAlertDialogProps>();

      return {
        components: { story, OnyxButton },
        setup: () => {
          const isOpen = ref(false);

          watch(
            () => args.open,
            (newOpen) => (isOpen.value = !!newOpen),
            { immediate: true },
          );

          watchEffect(() => updateArgs({ open: isOpen.value }));
          return { isOpen };
        },
        template: `<div>
          <OnyxButton label="Show alert modal" @click="isOpen = true" />
          <story :open="isOpen" @close="isOpen = false;" />
        </div>`,
      };
    },
  ],
} satisfies Story;
