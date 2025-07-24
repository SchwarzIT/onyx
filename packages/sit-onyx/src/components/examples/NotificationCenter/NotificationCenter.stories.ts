import type { Meta, StoryObj } from "@storybook/vue3";
import { textColorDecorator } from "../../../utils/storybook.js";
import NotificationCenter from "./NotificationCenter.vue";
import NotificationCenterCode from "./NotificationCenter.vue?raw";

const meta: Meta<typeof NotificationCenter> = {
  title: "Notifications/NotificationCenter",
  component: NotificationCenter,
  tags: ["!autodocs"],
  decorators: [
    textColorDecorator,
    (story) => ({
      components: { story },
      template: `<story style="font-family: var(--onyx-font-family)" />`,
    }),
  ],
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
