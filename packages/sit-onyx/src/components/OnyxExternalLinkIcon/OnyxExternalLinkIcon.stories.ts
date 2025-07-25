import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { textColorDecorator } from "../../utils/storybook.js";
import OnyxExternalLinkIcon from "./OnyxExternalLinkIcon.vue";

/**
 * Icon for external links. Will be hidden if the link is not external or icon is disabled.
 * Mainly used internally inside other components like the OnyxLink, OnyxNavItem etc.
 */
const meta: Meta<typeof OnyxExternalLinkIcon> = {
  title: "Support/ExternalLinkIcon",
  component: OnyxExternalLinkIcon,
  argTypes: {
    withExternalIcon: {
      options: ["auto", true, false],
      control: { type: "radio" },
    },
  },
  decorators: [textColorDecorator],
};

export default meta;
type Story = StoryObj<typeof OnyxExternalLinkIcon>;

export const Default = {
  args: {
    href: "https://onyx.schwarz",
  },
} satisfies Story;
