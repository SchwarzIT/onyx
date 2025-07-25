import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { Default as ComponentRoadmapStory } from "./ComponentRoadmap.stories.js";
import OnyxHomePage from "./OnyxHomePage.vue";

/**
 * **Note:** The padding when previewing in Storybook might look a little off
 * but this is intended because the component is used inside the VitePress home page
 * so we need to align the spacings.
 */
const meta: Meta<typeof OnyxHomePage> = {
  title: "roadmap/OnyxHomePage",
  component: OnyxHomePage,
};

export default meta;
type Story = StoryObj<typeof OnyxHomePage>;

export const Default = {
  args: {
    data: {
      closedIssueCount: 42,
      componentCount: 12,
      components: ComponentRoadmapStory.args.components,
      downloads: 1337,
      mergedPRCount: 128,
      packageCount: 6,
      timestamp: new Date().toISOString(),
      variantCount: 256,
    },
  },
} satisfies Story;
