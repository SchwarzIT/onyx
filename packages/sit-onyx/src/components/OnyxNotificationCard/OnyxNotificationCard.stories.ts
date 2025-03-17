import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxNotificationCard from "./OnyxNotificationCard.vue";
import { type NotificationCardMoleculeProps } from "./types";

const meta: Meta<typeof OnyxNotificationCard> = {
  title: "Support/NotificationCard",
  component: OnyxNotificationCard,
  argTypes: {
    subject: { type: "string", control: "text", description: "Notification subject" },
    createdAt: {
      type: "number",
      control: "number",
      description: "The timestamp indicating when the notification was created.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxNotificationCard>;

export const Default = (args: NotificationCardMoleculeProps) =>
  ({
    render() {
      return h("div", { style: "width: 400px;" }, [
        h(
          OnyxNotificationCard,
          { ...args },
          {
            default:
              () => `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, similique dicta quod in amet perferendis vero facilis 
        ratione a labore mollitia maiores ipsam quia at? Aliquid, iste quo. Nostrum, voluptate. Lorem ipsum dolor sit amet consectetur 
        adipisicing elit. Sit, similique dicta quod in amet perferendis vero facilis 
        ratione a labore mollitia maiores ipsam quia at? Aliquid, iste quo. Nostrum, voluptate.`,
          },
        ),
      ]);
    },
  }) satisfies Story;

Default.args = { subject: "Example subject", createdAt: 1636377600000 };
