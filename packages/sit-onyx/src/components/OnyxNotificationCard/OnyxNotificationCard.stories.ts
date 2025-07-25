import checkSmall from "@sit-onyx/icons/check-small.svg?raw";
import circleAttention from "@sit-onyx/icons/circle-attention.svg?raw";
import trash from "@sit-onyx/icons/trash.svg?raw";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";
import { defineIconSelectArgType } from "../../utils/storybook.js";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxMenuItem from "../OnyxNavBar/modules/OnyxMenuItem/OnyxMenuItem.vue";
import OnyxNotificationCard from "./OnyxNotificationCard.vue";

/**
 * Card component to display (user) notifications. For example to build a [notification center](/story/notifications-examples-notificationcenter--default).
 */
const meta: Meta<typeof OnyxNotificationCard> = {
  title: "Notifications/NotificationCard",
  component: OnyxNotificationCard,
  argTypes: {
    actions: { control: { disable: true } },
    headerActions: { control: { disable: true } },
    icon: defineIconSelectArgType(),
  },
};

export default meta;
type Story = StoryObj<typeof OnyxNotificationCard>;

export const Default = {
  args: {
    style: "width: 32rem",
    headline: "Example notification",
    createdAt: new Date(),
    icon: circleAttention,
    default:
      "Lorem ipsum dolor sit amet consectetur. Dui purus quisque est varius vulputate. Ut odio dui diam pulvinar velit mollis cursus eu ut. Lorem ipsum dolor sit amet consectetur. Dui purus quisque est varius vulputate. Ut odio dui diam pulvinar velit mollis cursus eu ut. Lorem ipsum dolor sit amet consectetur. Dui purus quisque est varius vulputate. Ut odio dui diam pulvinar velit mollis cursus eu ut.",
  },
} satisfies Story;

export const Unread = {
  args: {
    ...Default.args,
    unread: true,
  },
} satisfies Story;

export const Actions = {
  args: {
    ...Default.args,
    actions: [
      h(OnyxButton, { label: "Button", color: "neutral" }),
      h(OnyxButton, { label: "Button" }),
    ],
    headerActions: () => [
      h(OnyxMenuItem, () => [h(OnyxIcon, { icon: checkSmall }), "Mark as read"]),
      h(OnyxMenuItem, { color: "danger" }, () => [h(OnyxIcon, { icon: trash }), "Delete"]),
    ],
  },
} satisfies Story;

export const Skeleton = {
  args: {
    ...Default.args,
    skeleton: true,
  },
} satisfies Story;
