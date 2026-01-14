import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { createAdvancedStoryExample } from "../../utils/storybook.js";
import OnyxGlobalSearch from "./OnyxGlobalSearch.vue";

const meta: Meta<typeof OnyxGlobalSearch> = {
  title: "Search & Filter/GlobalSearch",
  component: OnyxGlobalSearch,
  tags: ["unstable"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof OnyxGlobalSearch>;

export const Default = createAdvancedStoryExample(
  "OnyxGlobalSearch",
  "DefaultExample",
) satisfies Story;

export const ShowAllResults = createAdvancedStoryExample(
  "OnyxGlobalSearch",
  "EndOfListExample",
) satisfies Story;
