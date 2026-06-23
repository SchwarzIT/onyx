import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { createAdvancedStoryExample } from "../../utils/storybook.js";
import OnyxGlobalSearchFilterGroup from "./OnyxGlobalSearchFilterGroup.vue";

const meta: Meta<typeof OnyxGlobalSearchFilterGroup> = {
  title: "Search & Filter/GlobalSearch/modules/GlobalSearchFilterGroup",
  component: OnyxGlobalSearchFilterGroup,
  tags: ["unstable"],
  argTypes: {
    default: {
      control: { disable: true },
    },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxGlobalSearchFilterGroup>;

export const Default = createAdvancedStoryExample(
  "OnyxGlobalSearchFilterGroup",
  "DefaultExample",
) satisfies Story;

export const Skeleton = {
  args: {
    label: "Filters",
    skeleton: true,
  },
} satisfies Story;
