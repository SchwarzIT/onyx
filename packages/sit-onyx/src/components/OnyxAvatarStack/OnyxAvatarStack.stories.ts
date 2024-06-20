import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxAvatar from "../OnyxAvatar/OnyxAvatar.vue";
import { AVATAR_TYPES } from "../OnyxAvatar/types";
import OnyxAvatarStack from "./OnyxAvatarStack.vue";

/**
 * An avatar stack can be used to display a list of avatars (e.g. contributors for a project etc.).
 */
const meta: Meta<typeof OnyxAvatarStack> = {
  title: "Basic/AvatarStack",
  ...defineStorybookActionsAndVModels({
    component: OnyxAvatarStack,
    events: [],
    argTypes: {
      default: { control: { disable: true } },
    },
  }),
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
        const label = `John Doe ${index + 1}`;
        const type = AVATAR_TYPES[index % AVATAR_TYPES.length];
        return h(OnyxAvatar, { label, type });
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
        const label = `John Doe ${index + 1}`;
        const type = AVATAR_TYPES[index % AVATAR_TYPES.length];
        return h(OnyxAvatar, { label, type });
      }),
      h(OnyxAvatar, { label: "42 more avatars" }, () => "+42"),
    ],
  },
} satisfies Story;
