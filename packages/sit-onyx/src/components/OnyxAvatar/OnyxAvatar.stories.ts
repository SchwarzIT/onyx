import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxAvatar from "./OnyxAvatar.vue";

/**
 * Avatars visually represent users with profile images or initials, adding a personal touch to applications by displaying the user’s identity in a compact form.
 */
const meta: Meta<typeof OnyxAvatar> = {
  title: "Basic/Avatar",
  component: OnyxAvatar,
};

export default meta;
type Story = StoryObj<typeof OnyxAvatar>;

/**
 * This example shows a default avatar with initials.
 */
export const Default = {
  args: {
    fullName: "John Middlename Doe",
  },
} satisfies Story;

/**
 * This example shows an avatar with a custom image.
 * If the image can not be loaded, a fallback is displayed depending on the `type` property.
 */
export const WithImage = {
  args: {
    fullName: "onyx logo",
    src: "https://onyx.schwarz/favicon.svg",
  },
} satisfies Story;

/**
 * This example shows an avatar with custom initials instead of the automatically detected ones.
 */
export const WithCustomInitials = {
  args: {
    fullName: "4 more avatars",
    initials: "+4",
  },
} satisfies Story;
