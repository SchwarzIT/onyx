import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { createAdvancedStoryExample } from "../../utils/storybook.js";
import OnyxTreeView from "./OnyxTreeView.vue";

const meta: Meta<typeof OnyxTreeView> = {
  title: "Navigation/TreeView",
  component: OnyxTreeView,
  tags: ["unstable"],
};

export default meta;
type Story = StoryObj<typeof OnyxTreeView>;

export const Default = createAdvancedStoryExample("OnyxTreeView", "DefaultExample") satisfies Story;
