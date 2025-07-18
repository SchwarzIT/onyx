import moreVerticalSmall from "@sit-onyx/icons/more-vertical-small.svg?raw";
import trash from "@sit-onyx/icons/trash.svg?raw";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
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
    style: "width: 24rem",
    filename: "example.pdf",
    type: "application/pdf",
    size: "42MiB",
    actions: () => [
      h(OnyxIconButton, { label: "Show more actions", icon: moreVerticalSmall, color: "neutral" }),
      h(OnyxIconButton, { label: "Delete file", icon: trash, color: "danger" }),
    ],
  },
} satisfies Story;
