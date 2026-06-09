import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { createAdvancedStoryExample } from "../../utils/storybook.js";
import OnyxGlobalSearch from "./OnyxGlobalSearch.vue";

const meta: Meta<typeof OnyxGlobalSearch> = {
  title: "Search & Filter/GlobalSearch",
  component: OnyxGlobalSearch,
  tags: ["new:component", "!autodocs"], // The default example looks broken on the docs page and as it doesn't provide any additional value anyways, we just disable it.
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
