import logout from "@sit-onyx/icons/logout.svg?raw";
import settings from "@sit-onyx/icons/settings.svg?raw";
import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxUserMenu from "./OnyxUserMenu.vue";

/**
 * The user menu is intended to be used inside the navigation bar to display user-related information and actions.
 */
const meta: Meta<typeof OnyxUserMenu> = {
  title: "components/UserMenu",
  ...defineStorybookActionsAndVModels({
    component: OnyxUserMenu,
    events: ["update:modelValue"],
    argTypes: {
      avatar: { control: { type: "text" } },
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
    footer: () => h(() => ["App version", h("span", { class: "onyx-text--monospace" }, "1.0.0")]),
    options: [
      { id: "logout", label: "Logout", icon: logout },
      { id: "settings", label: "Settings", icon: settings },
    ],
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
