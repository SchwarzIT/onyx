import type { Meta, StoryObj } from "@storybook/vue3";
import { defineIconSelectArgType } from "../../utils/storybook";
import OnyxNotificationMessage from "./OnyxNotificationMessage.vue";

const meta: Meta<typeof OnyxNotificationMessage> = {
  title: "Support/OnyxNotificationMessage",
  component: OnyxNotificationMessage,
  argTypes: {
    icon: defineIconSelectArgType(),
  },
};

export default meta;
type Story = StoryObj<typeof OnyxNotificationMessage>;

export const Default = {
  args: {
    headline: "Notification headline",
    description:
      "Lorem ipsum dolor sit amet consectetur. Sit proin malesuada sollicitudin tempus eget maecenas. ",
  },
} satisfies Story;
