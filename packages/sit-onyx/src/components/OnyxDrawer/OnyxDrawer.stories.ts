import checkSmall from "@sit-onyx/icons/check-small.svg?raw";
import settings from "@sit-onyx/icons/settings.svg?raw";
import type { Meta, StoryObj } from "@storybook/vue3";
import { useArgs } from "storybook/internal/preview-api";
import { h, ref, watch, watchEffect } from "vue";
import {
  OnyxBadge,
  OnyxBottomBar,
  OnyxButton,
  OnyxHeadline,
  OnyxIconButton,
  type OnyxDrawerProps,
} from "../..";
import OnyxDrawer from "./OnyxDrawer.vue";

const meta: Meta<typeof OnyxDrawer> = {
  title: "Feedback/Drawer",
  tags: ["new:component"],
  component: OnyxDrawer,
  argTypes: {
    default: { control: { disable: true } },
    headline: { control: { disable: true } },
    footer: { control: { disable: true } },
    description: { control: { type: "text" } },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxDrawer>;

export const Default = {
  args: {
    label: "Notifications",
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
        "Note: The drawer component is fully flexible.\nIt can be adjusted with every content the project needs.",
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
      const [args, updateArgs] = useArgs<OnyxDrawerProps>();

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
          <OnyxButton label="Open drawer" @click="isOpen = true" />
          <story :open="isOpen" @close="isOpen = false;" />
        </div>`,
      };
    },
  ],
} satisfies Story;

export const RightAligned = {
  ...Default,
  args: {
    ...Default.args,
    alignment: "right",
  },
} satisfies Story;
