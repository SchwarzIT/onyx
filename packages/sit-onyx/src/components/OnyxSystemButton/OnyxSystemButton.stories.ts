import expandWindow from "@sit-onyx/icons/expand-window.svg?raw";
import moreVerticalSmall from "@sit-onyx/icons/more-vertical-small.svg?raw";
import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { defineIconSelectArgType } from "../../utils/storybook";
import OnyxSystemButton from "./OnyxSystemButton.vue";

/**
 * The SystemButton is a component, that triggers interactions related not to the content but to the system. It can be used exclusively as a child object embedded into a parent container - never as a standalone object.
 */
const meta: Meta<typeof OnyxSystemButton> = {
  title: "Buttons/SystemButton",
  component: OnyxSystemButton,
  argTypes: {
    ...withNativeEventLogging(["onClick"]),
    icon: defineIconSelectArgType(),
  },
};

export default meta;
type Story = StoryObj<typeof OnyxSystemButton>;

export const Default = {
  args: {
    label: "More options",
    icon: moreVerticalSmall,
  },
} satisfies Story;

export const WithText = {
  args: {
    label: "Example button",
  },
} satisfies Story;

export const WithLink = {
  args: {
    label: "Open documentation",
    icon: expandWindow,
    link: {
      href: "https://onyx.schwarz",
      target: "_blank",
    },
  },
} satisfies Story;

export const Disabled = {
  args: {
    ...WithText.args,
    disabled: true,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    ...Default.args,
    skeleton: true,
  },
} satisfies Story;
