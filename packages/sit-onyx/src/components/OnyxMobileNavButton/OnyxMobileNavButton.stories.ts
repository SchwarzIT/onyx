import menu from "@sit-onyx/icons/menu.svg?raw";
import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { defineIconSelectArgType } from "../../utils/storybook";
import OnyxMobileNavButton from "./OnyxMobileNavButton.vue";

/**
 * Nav button that is mainly used inside the nav bar on mobile, e.g. for the burger and context menu buttons.
 */
const meta: Meta<typeof OnyxMobileNavButton> = {
  title: "support/MobileNavButton",
  ...defineStorybookActionsAndVModels({
    component: OnyxMobileNavButton,
    events: ["update:open"],
    argTypes: {
      icon: defineIconSelectArgType(),
    },
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxMobileNavButton>;

export const Default = {
  args: {
    label: "Open burger menu",
    icon: menu,
  },
} satisfies Story;

export const Open = {
  args: {
    label: "Close burger menu",
    icon: menu,
    open: true,
  },
} satisfies Story;
