import { iconLogin, iconPlaceholder } from "@sit-onyx/icons";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { defineIconSelectArgType } from "../../utils/storybook.js";
import OnyxNavButton from "./OnyxNavButton.vue";

const meta: Meta<typeof OnyxNavButton> = {
  title: "Navigation/NavBar/modules/NavButton",
  tags: ["unstable"],
  component: OnyxNavButton,
  argTypes: {
    icon: defineIconSelectArgType(),
  },
};

export default meta;
type Story = StoryObj<typeof OnyxNavButton>;

export const Default = {
  args: {
    label: "Example action",
    icon: iconPlaceholder,
  },
} satisfies Story;

export const IconOnly = {
  args: {
    label: "Example action",
    icon: iconPlaceholder,
    hideLabel: true,
  },
} satisfies Story;

export const Primary = {
  args: {
    label: "Login",
    icon: iconLogin,
    color: "primary",
  },
} satisfies Story;
