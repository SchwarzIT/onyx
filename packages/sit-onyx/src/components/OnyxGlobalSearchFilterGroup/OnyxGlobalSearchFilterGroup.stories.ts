import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";
import OnyxFilterBadge from "../OnyxFilterBadge/OnyxFilterBadge.vue";
import OnyxTag from "../OnyxTag/OnyxTag.vue";
import OnyxGlobalSearchFilterGroup from "./OnyxGlobalSearchFilterGroup.vue";

const meta: Meta<typeof OnyxGlobalSearchFilterGroup> = {
  title: "Support/GlobalSearchFilterGroup",
  component: OnyxGlobalSearchFilterGroup,
  argTypes: {
    default: {
      control: { disable: true },
    },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxGlobalSearchFilterGroup>;

export const Default = {
  args: {
    label: "Filters",
    default: () => [
      h(OnyxTag, { label: "Filter 1" }),
      h(OnyxFilterBadge, { label: "Filter 1" }),
      h(OnyxFilterBadge, { label: "Filter 2" }),
    ],
  },
} satisfies Story;
