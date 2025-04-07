import type { Meta, StoryObj } from "@storybook/vue3";
import NotificationCenter from "./NotificationCenter.vue";
import NotificationCenterCode from "./NotificationCenter.vue?raw";

const meta: Meta<typeof NotificationCenter> = {
  title: "Notifications/Examples/NotificationCenter",
  component: NotificationCenter,
  tags: ["!autodocs", "new:component"],
  parameters: {
    docs: {
      source: {
        code: NotificationCenterCode.replace('from "../../.."', 'from "sit-onyx"'),
      },
    },
    controls: {
      disable: true,
    },
    actions: {
      disable: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof NotificationCenter>;

export const Default = { args: {} } satisfies Story;
