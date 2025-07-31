import { iconEmojiHappy2 } from "@sit-onyx/icons";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import AssetLibraryItem from "./AssetLibraryItem.vue";

const meta: Meta<typeof AssetLibraryItem> = {
  title: "Assets/AssetLibraryItem",
  component: AssetLibraryItem,
};

export default meta;
type Story = StoryObj<typeof AssetLibraryItem>;

export const Default = {
  args: {
    content: iconEmojiHappy2,
    tooltipText: "Emoji Happy 2",
    clipboardValue: "Clipboard copy value",
    successMessage: "Successfully copied icon to clipboard",
  },
} satisfies Story;
