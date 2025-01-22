import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxImage from "./OnyxImage.vue";

const meta: Meta<typeof OnyxImage> = {
  title: "Basic/Image",
  component: OnyxImage,
  argTypes: {
    ...withNativeEventLogging(["onError", "onLoad"]),
  },
};

export default meta;
type Story = StoryObj<typeof OnyxImage>;

export const Default = {
  args: {
    src: "https://picsum.photos/256",
    alt: "Example image",
    height: 256,
    width: 256,
  },
} satisfies Story;
