import { iconPlaceholder } from "@sit-onyx/icons";
import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";
import OnyxIcon from "../../../OnyxIcon/OnyxIcon.vue";
import OnyxMenuItem from "./OnyxMenuItem.vue";

/**
 * Menu item that is intended to be used inside the [OnyxUserMenu](/docs/navigation-navbar-modules-usermenu--docs).
 */
const meta: Meta<typeof OnyxMenuItem> = {
  title: "Basic/MenuItem",
  component: OnyxMenuItem,
  argTypes: {
    default: { control: { type: "text" } },
    ...withNativeEventLogging(["onClick"]),
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="max-width: 16rem;"> <story /> </div>`,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof OnyxMenuItem>;

export const Default = {
  args: {
    default: "Example option",
  },
} satisfies Story;

export const WithLink = {
  args: {
    ...Default.args,
    link: {
      href: "https://onyx.schwarz",
      target: "_blank",
    },
  },
} satisfies Story;

export const WithIcon = {
  args: {
    default: () => [h(OnyxIcon, { icon: iconPlaceholder }), Default.args.default],
  },
} satisfies Story;

export const Active = {
  args: {
    ...Default.args,
    active: true,
  },
} satisfies Story;

export const Disabled = {
  args: {
    ...Default.args,
    disabled: true,
  },
} satisfies Story;

export const Danger = {
  args: {
    ...Default.args,
    color: "danger",
  },
} satisfies Story;
