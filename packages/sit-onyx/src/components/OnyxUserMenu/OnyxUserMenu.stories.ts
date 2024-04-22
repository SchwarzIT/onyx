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
    events: [],
    argTypes: {
      avatar: { control: { type: "text" } },
      footer: { control: { type: "text" } },
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
  },
} satisfies Story;

/**
 * This example shows a user menu with a user description.
 */
export const WithDescription = {
  args: {
    ...Default.args,
    description: "UX/UI Designer",
  },
} satisfies Story;

/**
 * This example shows a user menu with footer content.
 */
export const WithFooter = {
  args: {
    ...Default.args,
    footer: () => h(() => ["App version", h("span", { class: "onyx-text--monospace" }, "1.0.0")]),
  },
} satisfies Story;
