import checkSmall from "@sit-onyx/icons/check-small.svg?raw";
import settings from "@sit-onyx/icons/settings.svg?raw";
import type { Meta, StoryObj } from "@storybook/vue3";
import { useArgs } from "storybook/internal/preview-api";
import { h, ref, watch, watchEffect } from "vue";
import OnyxBadge from "../OnyxBadge/OnyxBadge.vue";
import OnyxBottomBar from "../OnyxBottomBar/OnyxBottomBar.vue";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import OnyxModalDialog from "./OnyxModalDialog.vue";
import type { OnyxModalDialogProps } from "./types";

/**
 * The modal dialog is used to provide information to the user while interaction with the rest of the page is prevented and a backdrop is displayed.
 *
 * You can also implement a custom dialog using the [OnyxDialog](/docs/support-dialog--docs) component.
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
type Story = StoryObj<typeof OnyxModalDialog>;

export const Default = {
  args: {
    label: "Example modal dialog",
    description: "This is an example description about the dialog.",
    default: h(
      "div",
      { style: "padding: var(--onyx-density-xl) var(--onyx-modal-dialog-padding-inline)" },
      h(
        "span",
        {
          style: "color: var(--onyx-color-text-icons-info-intense); white-space: pre-line;",
        },
        "Note: The modal dialog component is fully flexible.\nIt can be adjusted with every content the project needs.",
      ),
    ),
    footer: () =>
      h(OnyxBottomBar, () => [
        h(OnyxButton, { label: "Close", color: "neutral", mode: "plain" }),
        h(OnyxButton, { label: "Save" }),
      ]),
  },
  decorators: [
    (story) => {
      const [args, updateArgs] = useArgs<OnyxModalDialogProps>();

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
          <OnyxButton label="Show modal" @click="isOpen = true" />
          <story :open="isOpen" @close="isOpen = false;" />
        </div>`,
      };
    },
  ],
} satisfies Story;

export const RightAligned = {
  tags: ["new:feature"],
  args: {
    label: "Notifications",
    alignment: "right",
    headline: ({ label }) => [
      h(OnyxHeadline, { is: "h2" }, () => label),
      h(OnyxBadge, { color: "neutral", density: "compact" }, () => "42"),
    ],
    description: "See all notifications from all touchpoints here.",
    default: h(
      "div",
      { style: "padding: var(--onyx-density-xl) var(--onyx-modal-dialog-padding-inline)" },

      h(
        "span",
        {
          style: "color: var(--onyx-color-text-icons-info-intense); white-space: pre-line;",
        },
        "Note: The modal dialog component is fully flexible.\nIt can be adjusted with every content the project needs.",
      ),
    ),
    footer: () =>
      h(OnyxBottomBar, { density: "compact" }, () => [
        h(OnyxIconButton, { label: "Settings", color: "neutral", icon: settings }),
        h(OnyxButton, { label: "Mark as all read", icon: checkSmall, color: "neutral" }),
      ]),
    style: {
      width: "30rem",
    },
  },
  decorators: [
    (story) => {
      const [args, updateArgs] = useArgs<OnyxModalDialogProps>();

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
          <OnyxButton label="Show modal" @click="isOpen = true" />
          <story :open="isOpen" @close="isOpen = false;" />
        </div>`,
      };
    },
  ],
} satisfies Story;
