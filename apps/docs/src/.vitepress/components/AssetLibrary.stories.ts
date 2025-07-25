import placeholder from "@sit-onyx/icons/placeholder.svg?raw";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";
import AssetLibrary from "./AssetLibrary.vue";
import AssetLibraryItem from "./AssetLibraryItem.vue";

const meta: Meta<typeof AssetLibrary> = {
  title: "Assets/AssetLibrary",
  component: AssetLibrary,
};

export default meta;
type Story = StoryObj<typeof AssetLibrary>;

export const Default = {
  args: {
    searchPlaceholder: "Search assets...",
    groups: [
      {
        name: "Group 1",
        assets: [
          { id: "asset-1", name: "Asset 1" },
          { id: "asset-2", name: "Asset 2" },
          { id: "asset-3", name: "Asset 3" },
        ],
      },
      {
        name: "Group 2",
        assets: [
          { id: "asset-4", name: "Asset 4" },
          { id: "asset-5", name: "Asset 5" },
          { id: "asset-6", name: "Asset 6" },
        ],
      },
    ],
    item: ({ asset }) =>
      h(AssetLibraryItem, {
        tooltipText: asset.name,
        content: placeholder,
        clipboardValue: "Clipboard value",
        successMessage: `Successfully copied "${asset.name}" to clipboard`,
      }),
  },
} satisfies Story;
