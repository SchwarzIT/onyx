import type { Meta, StoryObj } from "@storybook/vue3";
import { createAdvancedStoryExample } from "../../utils/storybook.js";
import OnyxProgressSteps from "./OnyxProgressSteps.vue";

const meta: Meta<typeof OnyxProgressSteps> = {
  title: "Progress/ProgressSteps",
  component: OnyxProgressSteps,
  tags: ["new:component"],
};

export default meta;
type Story = StoryObj<typeof OnyxProgressSteps>;

export const Default = createAdvancedStoryExample(
  "OnyxProgressSteps",
  "DefaultExample",
) satisfies Story;

export const Vertical = createAdvancedStoryExample(
  "OnyxProgressSteps",
  "VerticalExample",
) satisfies Story;

export const Skeleton = createAdvancedStoryExample(
  "OnyxProgressSteps",
  "SkeletonExample",
) satisfies Story;
