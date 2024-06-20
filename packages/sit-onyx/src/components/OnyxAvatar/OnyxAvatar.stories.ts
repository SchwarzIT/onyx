import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxAvatar from "./OnyxAvatar.vue";

/**
 * Avatars are used to display a user profile picture or initials.
 */
const meta: Meta<typeof OnyxAvatar> = {
  title: "Basic/Avatar",
  ...defineStorybookActionsAndVModels({
    component: OnyxAvatar,
    events: [],
    argTypes: {
      default: { control: { type: "text" } },
    },
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

/**
 * This example shows an avatar with a custom image.
 * If the image can not be loaded, a fallback is displayed depending on the `type` property.
 */
export const WithImage = {
  args: {
    label: "onyx logo",
    src: "https://onyx.schwarz/favicon.svg",
  },
} satisfies Story;

/**
 * This example shows an avatar with custom content instead of the default initials.
 */
export const WithCustomInitials = {
  args: {
    label: "4 more avatars",
    default: "+4",
  },
} satisfies Story;
