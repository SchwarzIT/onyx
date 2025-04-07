import bell from "@sit-onyx/icons/bell.svg?raw";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import { textColorDecorator } from "../../utils/storybook";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import OnyxNotificationDot from "./OnyxNotificationDot.vue";

/**
 * Displays a dot indicator for an arbitrary component. Useful to e.g. build a [notification center](/story/examples-notificationcenter--default).
 */
const meta: Meta<typeof OnyxNotificationDot> = {
  title: "Notifications/NotificationDot",
  component: OnyxNotificationDot,
  tags: ["new:component"],
  argTypes: {
    default: { control: { disable: true } },
  },
  decorators: [textColorDecorator],
};

export default meta;
type Story = StoryObj<typeof OnyxNotificationDot>;

export const Default = {
  args: {
    default: () => h(OnyxIconButton, { icon: bell, label: "Notifications", color: "neutral" }),
  },
} satisfies Story;
