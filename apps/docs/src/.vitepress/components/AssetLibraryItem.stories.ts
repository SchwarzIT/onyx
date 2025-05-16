import emojiHappy2 from "@sit-onyx/icons/emoji-happy-2.svg?raw";
import type { Meta, StoryObj } from "@storybook/vue3";
import AssetLibraryItem from "./AssetLibraryItem.vue";

const meta: Meta<typeof AssetLibraryItem> = {
  title: "Asset library/AssetLibraryItem",
  component: AssetLibraryItem,
};

export default meta;
type Story = StoryObj<typeof AssetLibraryItem>;

export const Default = {
  args: {
    icon: {
      content: emojiHappy2,
      iconName: "emoji-happy-2",
      importName: "emojiHappy2",
      tooltipName: "Emoji Happy 2",
      metadata: {
        category: "Emojies",
      },
    },
  },
} satisfies Story;
