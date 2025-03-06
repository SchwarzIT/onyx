import type { Meta, StoryObj } from "@storybook/vue3";
import { defineIconSelectArgType } from "../../utils/storybook";
import OnyxNotification from "./OnyxNotification.vue";

const meta: Meta<typeof OnyxNotification> = {
  title: "Support/Notification",
  component: OnyxNotification,
  argTypes: {
    icon: defineIconSelectArgType(),
  },
};

export default meta;
type Story = StoryObj<typeof OnyxNotification>;

export const Default = {
  args: {
    headline: "Notification headline",
    description:
      "Lorem ipsum dolor sit amet consectetur. Sit proin malesuada sollicitudin tempus eget maecenas. ",
  },
} satisfies Story;
