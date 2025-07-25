import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxImage from "./OnyxImage.vue";

/**
 * Image components are essential elements in web design, serving multiple purposes to enhance the visual appeal,
 * user experience, and functionality of an application.
 */
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
    alt: "Alt text here...",
    height: 256,
    width: 256,
  },
} satisfies Story;

export const DynamicSize = {
  args: {
    ...Default.args,
    src: "https://picsum.photos/1080",
    style: "width: 100%;",
  },
} satisfies Story;

export const Rounded = {
  args: {
    ...Default.args,
    shape: "rounded",
  },
} satisfies Story;

export const Circle = {
  args: {
    ...Default.args,
    shape: "circle",
  },
} satisfies Story;

export const Clipped = {
  args: {
    ...Default.args,
    shape: "clip",
  },
} satisfies Story;

export const ClippedInverted = {
  args: {
    ...Default.args,
    shape: "clip-inverted",
  },
} satisfies Story;

export const Error = {
  args: {
    ...Default.args,
    src: "#some-invalid-image-src",
  },
} satisfies Story;

export const LightAndDarkImage = {
  args: {
    ...Default.args,
    src: {
      light: "https://picsum.photos/256?v=light",
      dark: "https://picsum.photos/256?v=dark",
    },
  },
} satisfies Story;

export const Skeleton = {
  args: {
    ...Default.args,
    skeleton: true,
  },
} satisfies Story;
