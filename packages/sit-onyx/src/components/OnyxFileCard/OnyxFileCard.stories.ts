import moreVerticalSmall from "@sit-onyx/icons/more-vertical-small.svg?raw";
import trash from "@sit-onyx/icons/trash.svg?raw";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import OnyxFlyoutMenu from "../OnyxNavBar/modules/OnyxFlyoutMenu/OnyxFlyoutMenu.vue";
import OnyxMenuItem from "../OnyxNavBar/modules/OnyxMenuItem/OnyxMenuItem.vue";
import OnyxFileCard from "./OnyxFileCard.vue";

const meta: Meta<typeof OnyxFileCard> = {
  title: "Basic/FileCard",
  component: OnyxFileCard,
  tags: ["new:component"],
  argTypes: {
    actions: { control: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxFileCard>;

export const Default = {
  args: {
    style: "width: 20rem",
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
              icon: moreVerticalSmall,
              color: "neutral",
            }),
          options: () => [
            h(OnyxMenuItem, { label: "Action 1" }),
            h(OnyxMenuItem, { label: "Action 2" }),
            h(OnyxMenuItem, { label: "Action 3" }),
          ],
        },
      ),
      h(OnyxIconButton, { label: "Delete file", icon: trash, color: "danger" }),
    ],
  },
} satisfies Story;

export const Link = {
  args: {
    ...Default.args,
    link: "https://onyx.schwarz/favicon.svg",
  },
} satisfies Story;
