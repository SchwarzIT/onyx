import menu from "@sit-onyx/icons/menu.svg?raw";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { defineIconSelectArgType } from "../../utils/storybook.js";
import OnyxMobileNavButton from "./OnyxMobileNavButton.vue";

/**
 * Nav button that is mainly used inside the nav bar on mobile, e.g. for the burger and context menu buttons.
 */
const meta: Meta<typeof OnyxMobileNavButton> = {
  title: "Support/MobileNavButton",
  component: OnyxMobileNavButton,
  argTypes: {
    icon: defineIconSelectArgType({ required: true }),
    default: { control: { type: "text" } },
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="min-height: 10rem;"> <story /> </div>`,
    }),
  ],

  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof OnyxMobileNavButton>;

export const Default = {
  args: {
    label: "Toggle burger menu",
    icon: menu,
    default: "Menu slot content...",
  },
} satisfies Story;

export const Open = {
  args: {
    ...Default.args,
    open: true,
  },
} satisfies Story;

/**
 * Example of a mobile nav button with a long content.
 * We recommended to watch this example in its [story page](?path=/story/support-mobilenavbutton--scrollable)
 * where the full page behavior can be seen.
 */
export const Scrollable: Story = {
  args: {
    ...Open.args,
    default: Array.from({ length: 200 }, (_, index) => `Lorem ipsum dolor ${index} `),
  },
};
