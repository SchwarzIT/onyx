import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxAvatar from "../OnyxAvatar/OnyxAvatar.vue";
import OnyxAvatarStack from "./OnyxAvatarStack.vue";

/**
 * An avatar stack can be used to display a list of avatars (e.g. contributors for a project etc.).
 */
const meta: Meta<typeof OnyxAvatarStack> = {
  title: "Basic/AvatarStack",
  component: OnyxAvatarStack,
  argTypes: {
    default: { control: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxAvatarStack>;

/**
 * This example shows a default avatar stack.
 */
export const Default = {
  args: {
    default: () =>
      Array.from({ length: 6 }, (_, index) => {
        return h(OnyxAvatar, { username: `John Doe ${index + 1}` });
      }),
  },
} satisfies Story;

/**
 * This example shows an avatar stack with a limited number of avatars and a remaining indicator.
 */
export const LimitedCount = {
  args: {
    default: () => [
      ...Array.from({ length: 15 }, (_, index) => {
        return h(OnyxAvatar, { username: `John Doe ${index + 1}` });
      }),
      h(OnyxAvatar, { username: "42 more avatars" }, () => "+42"),
    ],
  },
} satisfies Story;
