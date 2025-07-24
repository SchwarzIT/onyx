import cart from "@sit-onyx/icons/cart.svg?raw";
import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxProgressItem from "./OnyxProgressItem.vue";

const meta: Meta<typeof OnyxProgressItem> = {
  title: "Progress/ProgressItem",
  component: OnyxProgressItem,
  argTypes: {
    ...withNativeEventLogging(["onClick"]),
  },
};

export default meta;
type Story = StoryObj<typeof OnyxProgressItem>;

export const Default = {
  args: {
    label: "Step",
    value: 1,
  },
} satisfies Story;

export const Icon = {
  args: {
    ...Default.args,
    icon: cart,
  },
} satisfies Story;

export const Active = {
  args: {
    ...Default.args,
    status: "active",
  },
} satisfies Story;

export const Completed = {
  args: {
    ...Default.args,
    status: "completed",
  },
} satisfies Story;

export const Visited = {
  args: {
    ...Default.args,
    status: "visited",
  },
} satisfies Story;

export const Invalid = {
  args: {
    ...Default.args,
    status: "invalid",
  },
} satisfies Story;

export const Disabled = {
  args: {
    ...Default.args,
    disabled: true,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    ...Default.args,
    skeleton: true,
  },
} satisfies Story;
