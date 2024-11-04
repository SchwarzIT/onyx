import placeholder from "@sit-onyx/icons/placeholder.svg?raw";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxBadge from "../OnyxBadge/OnyxBadge.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxTab from "../OnyxTab/OnyxTab.vue";
import OnyxTabs from "./OnyxTabs.vue";

const meta: Meta<typeof OnyxTabs> = {
  title: "Navigation/Tabs",
  component: OnyxTabs,
  argTypes: {
    default: { control: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxTabs>;

export const Default = {
  args: {
    label: "Example tabs",
    modelValue: "tab-1",
    default: () => [
      h(OnyxTab, { value: "tab-1", label: "Tab 1" }, "Panel content 1..."),
      h(
        OnyxTab,
        { value: "tab-2" },
        {
          default: "Panel content 2...",
          tab: () => ["Tab 2", h(OnyxBadge, { dot: true, color: "warning" })],
        },
      ),
      h(
        OnyxTab,
        { value: "tab-3" },
        {
          default: "Panel content 3...",
          tab: () => [h(OnyxIcon, { icon: placeholder }), "Tab 3"],
        },
      ),
    ],
  },
} satisfies Story;
