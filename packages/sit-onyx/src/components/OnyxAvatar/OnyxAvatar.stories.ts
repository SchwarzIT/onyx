import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxAvatar from "./OnyxAvatar.vue";

/**
 * Avatars are used to display a user profile picture or initials.
 */
const meta: Meta<typeof OnyxAvatar> = {
  title: "components/Avatar",
  ...defineStorybookActionsAndVModels({
    component: OnyxAvatar,
    events: [],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxAvatar>;

/**
 * This example shows a default avatar with initials.
 */
export const Default = {
  args: {
    label: "John Doe",
  },
} satisfies Story;

/**
 * This example shows a female avatar.
 */
export const Female = {
  args: {
    label: "Jane Doe",
    type: "female",
  },
} satisfies Story;

/**
 * This example shows a male avatar.
 */
export const Male = {
  args: {
    label: "John Doe",
    type: "male",
  },
} satisfies Story;
