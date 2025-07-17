import type { Meta, StoryObj } from "@storybook/vue3";
import NotificationCenter from "./NotificationCenter.vue";
import NotificationCenterCode from "./NotificationCenter.vue?raw";

const meta: Meta<typeof NotificationCenter> = {
  title: "Notifications/Examples/NotificationCenter",
  component: NotificationCenter,
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      source: {
        code: NotificationCenterCode.replace('from "../../../index.js"', 'from "sit-onyx"'),
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

export const Skeleton = { args: { skeleton: true } } satisfies Story;
