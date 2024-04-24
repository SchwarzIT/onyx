import logout from "@sit-onyx/icons/logout.svg?raw";
import settings from "@sit-onyx/icons/settings.svg?raw";
import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxListboxOption from "../OnyxListboxOption/OnyxListboxOption.vue";
import OnyxUserMenu from "./OnyxUserMenu.vue";

/**
 * The user menu is intended to be used inside the navigation bar to display user-related information and actions.
 */
const meta: Meta<typeof OnyxUserMenu> = {
  title: "components/UserMenu",
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
      h(OnyxListboxOption, {
        label: "Settings",
        id: "/settings",
        icon: settings,
        onClick: () => alert("Settings clicked"),
      }),
      h(OnyxListboxOption, {
        label: "Logout",
        id: "logout",
        icon: logout,
        color: "danger",
        onClick: () => alert("Logout clicked"),
      }),
    ],
    footer: () => h(() => ["App version", h("span", { class: "onyx-text--monospace" }, "1.0.0")]),
  },
} satisfies Story;

/**
 * This example shows a user menu with minimal data.
 */
export const WithMinimalData = {
  args: {
    username: "Jane Doe",
  },
} satisfies Story;
