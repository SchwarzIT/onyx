import { iconPlaceholder } from "@sit-onyx/icons";
import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";
import OnyxIcon from "../../../OnyxIcon/OnyxIcon.vue";
import OnyxSidebarItem from "./OnyxSidebarItem.vue";

const meta: Meta<typeof OnyxSidebarItem> = {
  title: "Navigation/Sidebar/modules/SidebarItem",
  component: OnyxSidebarItem,
  argTypes: {
    ...withNativeEventLogging(["onClick"]),
    default: { control: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxSidebarItem>;

export const Default = {
  args: {
    default: () => [h(OnyxIcon, { icon: iconPlaceholder }), "Sidebar item"],
    style: "width: 16rem",
    link: "#example-link",
  },
} satisfies Story;

export const Active = {
  args: {
    ...Default.args,
    active: true,
  },
} satisfies Story;

export const Button = {
  args: {
    ...Default.args,
    link: undefined,
  },
} satisfies Story;
