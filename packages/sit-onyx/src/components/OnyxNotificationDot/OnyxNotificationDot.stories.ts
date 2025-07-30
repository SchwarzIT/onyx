import { iconBell } from "@sit-onyx/icons";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";
import { textColorDecorator } from "../../utils/storybook.js";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import OnyxNotificationDot from "./OnyxNotificationDot.vue";

/**
 * Displays a dot indicator for an arbitrary component. Useful to e.g. build a [notification center](/story/notifications-examples-notificationcenter--default).
 */
const meta: Meta<typeof OnyxNotificationDot> = {
  title: "Notifications/NotificationDot",
  component: OnyxNotificationDot,
  argTypes: {
    default: { control: { disable: true } },
  },
  decorators: [textColorDecorator],
};

export default meta;
type Story = StoryObj<typeof OnyxNotificationDot>;

export const Default = {
  args: {
    default: () => h(OnyxIconButton, { icon: iconBell, label: "Notifications", color: "neutral" }),
  },
} satisfies Story;
