import emojiHappy2 from "@sit-onyx/icons/emoji-happy-2.svg?raw";
import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import IconLibraryItem from "./IconLibraryItem.vue";

const meta: Meta<typeof IconLibraryItem> = {
  title: "components/IconLibraryItem",
  ...defineStorybookActionsAndVModels({
    component: IconLibraryItem,
    events: [],
  }),
};

export default meta;
type Story = StoryObj<typeof IconLibraryItem>;

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
