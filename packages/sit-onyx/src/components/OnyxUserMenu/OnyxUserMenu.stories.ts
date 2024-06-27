import logout from "@sit-onyx/icons/logout.svg?raw";
import settings from "@sit-onyx/icons/settings.svg?raw";
import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxListItem from "../OnyxListItem/OnyxListItem.vue";
import OnyxUserMenu from "./OnyxUserMenu.vue";

/**
 * The user menu is intended to be used inside the navigation bar to display user-related information and actions.
 */
const meta: Meta<typeof OnyxUserMenu> = {
  title: "Navigation/modules/UserMenu",
  ...defineStorybookActionsAndVModels({
    component: OnyxUserMenu,
    events: [],
    argTypes: {
      avatar: { control: { type: "text" } },
      default: { control: { disable: true } },
      footer: { control: { disable: true } },
    },
    decorators: [
      (story) => ({
        components: { story },
        template: `<div style="margin-left: 4rem; margin-bottom: 16rem;"> <story /> </div>`,
      }),
    ],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxUserMenu>;

/**
 * This example shows a default user menu.
 */
export const Default = {
  args: {
    username: "Jane Doe",
    description: "Company Name",
    default: () => [
      h(OnyxListItem, () => [h(OnyxIcon, { icon: settings }), "Settings"]),
      h(OnyxListItem, { color: "danger" }, () => [h(OnyxIcon, { icon: logout }), "Logout"]),
    ],
    footer: () => ["App version", h("span", { class: "onyx-text--monospace" }, "1.0.0")],
  },
} satisfies Story;

/**
 * This example shows a user menu with minimal data.
 */
export const WithMinimalData = {
  args: {
    username: "Jane Doe",
    default: Default.args.default,
  },
} satisfies Story;
