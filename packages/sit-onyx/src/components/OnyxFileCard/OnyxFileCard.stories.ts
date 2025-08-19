import { iconMoreVerticalSmall, iconTrash } from "@sit-onyx/icons";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";
import { createAdvancedStoryExample, defineIconSelectArgType } from "../../utils/storybook.js";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import OnyxFlyoutMenu from "../OnyxNavBar/modules/OnyxFlyoutMenu/OnyxFlyoutMenu.vue";
import OnyxMenuItem from "../OnyxNavBar/modules/OnyxMenuItem/OnyxMenuItem.vue";
import OnyxFileCard from "./OnyxFileCard.vue";

const meta: Meta<typeof OnyxFileCard> = {
  title: "Cards/FileCard",
  component: OnyxFileCard,
  tags: ["new:component"],
  argTypes: {
    actions: { control: { disable: true } },
    icon: defineIconSelectArgType(),
  },
};

export default meta;
type Story = StoryObj<typeof OnyxFileCard>;

export const Default = {
  args: {
    style: "width: 24rem",
    filename: "example.pdf",
    type: "application/pdf",
    size: "42MiB",
    actions: () => [
      h(
        OnyxFlyoutMenu,
        { label: "More actions", trigger: "click" },
        {
          button: ({ trigger }: { trigger: object }) =>
            h(OnyxIconButton, {
              ...trigger,
              label: "Show more actions",
              icon: iconMoreVerticalSmall,
              color: "neutral",
            }),
          options: () => [
            h(OnyxMenuItem, { label: "Action 1" }),
            h(OnyxMenuItem, { label: "Action 2" }),
            h(OnyxMenuItem, { label: "Action 3" }),
          ],
        },
      ),
      h(OnyxIconButton, { label: "Remove file", icon: iconTrash, color: "danger" }),
    ],
  },
} satisfies Story;

export const Link = {
  args: {
    ...Default.args,
    link: "https://onyx.schwarz/favicon.svg",
  },
} satisfies Story;

export const Status = {
  args: {
    ...Default.args,
    status: {
      text: "Stopped - unexpected error",
      color: "danger",
    },
  },
} satisfies Story;

export const ProgressBar = createAdvancedStoryExample("OnyxFileCard", "ProgressExample");

export const Skeleton = {
  args: {
    ...Default.args,
    skeleton: true,
  },
} satisfies Story;
