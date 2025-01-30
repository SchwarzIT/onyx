import circleAttention from "@sit-onyx/icons/circle-attention.svg?raw";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxNotification from "./OnyxNotification.vue";

const iconOptions = {
  "circle-attention": circleAttention,
};

const meta: Meta<typeof OnyxNotification> = {
  title: "Support/Notification",
  component: OnyxNotification,
  argTypes: {
    headline: { type: "string", control: "text", description: "The subject of the notification." },
    description: {
      type: "string",
      control: "text",
      description: "The content of the notification.",
    },
    color: {
      type: "string",
      control: "select",
      options: ["primary", "secondary", "neutral", "danger", "warning", "success", "info"],
      description: "The background color of the notification.",
    },
    duration: {
      type: "number",
      control: "number",
      description:
        "The duration of the notification in milliseconds. The component automatically emits 'close' . If the duration is set to 0, the component will be displayed, until the close button is being clicked.",
    },
    icon: {
      type: "string",
      control: "select",
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      description: "The icon that will be displayed in the header of the notification.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxNotification>;

export const Default = {
  args: {
    color: "neutral",
    description: "Example content",
    headline: "Example subject",
  },
} satisfies Story;

export const PersistentNotification = {
  args: {
    color: "neutral",
    duration: 0,
    description: "The component will be displayed, until the user click on the close button.",
    headline: "Example subject",
  },
} satisfies Story;

export const ToastNotification = {
  args: {
    color: "neutral",
    duration: 3000,
    description: "The component will be displayed and will emits 'close' after 3 seconds.",
    headline: "Example subject",
  },
} satisfies Story;

export const PriorityNotification = {
  args: {
    color: "neutral",
    duration: 0,
    description: "This notification is with high priority. The component supports any onyx icon",
    headline: "Example subject",
    icon: "circle-attention",
  },
} satisfies Story;
