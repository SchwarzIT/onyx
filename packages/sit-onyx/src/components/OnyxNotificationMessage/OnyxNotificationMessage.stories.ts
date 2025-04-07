import circleAttention from "@sit-onyx/icons/circle-attention.svg?raw";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import { defineIconSelectArgType } from "../../utils/storybook";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxNotificationMessage from "./OnyxNotificationMessage.vue";

/**
 * Single notification message component. Is mainly intended to be used with the [OnyxNotifications](/docs/notifications-notifications--docs).
 */
const meta: Meta<typeof OnyxNotificationMessage> = {
  title: "Support/NotificationMessage",
  component: OnyxNotificationMessage,
  tags: ["new:component"],
  argTypes: {
    icon: defineIconSelectArgType(),
  },
};

export default meta;
type Story = StoryObj<typeof OnyxNotificationMessage>;

export const Default = {
  args: {
    headline: "Notification headline",
    default:
      "Lorem ipsum dolor sit amet consectetur. Dui purus quisque est varius vulputate. Ut odio dui diam pulvinar velit mollis cursus eu ut.",
    style: "max-width: 24rem;",
  },
} satisfies Story;

export const WithIcon = {
  args: {
    ...Default.args,
    icon: circleAttention,
  },
} satisfies Story;

export const WithButtons = {
  args: {
    ...WithIcon.args,
    buttons: () => [
      h(OnyxButton, { label: "Button", color: "neutral" }),
      h(OnyxButton, { label: "Button" }),
    ],
  },
} satisfies Story;
