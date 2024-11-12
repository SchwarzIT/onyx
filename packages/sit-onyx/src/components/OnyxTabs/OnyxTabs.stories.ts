import placeholder from "@sit-onyx/icons/placeholder.svg?raw";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxBadge from "../OnyxBadge/OnyxBadge.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxTab from "../OnyxTab/OnyxTab.vue";
import OnyxTabs from "./OnyxTabs.vue";

/**
 * ### Keyboard shortcuts
 * The following keyboard shortcuts are available:
 * - **Tab**: Focuses / blurs the currently selected tab
 * - **Arrow right**: Focuses the next tab (or first tab if last tab is selected)
 * - **Arrow left**: Focuses the previous tab (or last tab if first tab is selected)
 * - **Home**: Focuses the first tab
 * - **End**: Focuses the last tab
 * - **Enter/Space**: Selects the currently focused tab.
 */
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
        { value: "tab-3", disabled: true },
        {
          default: "Panel content 3...",
          tab: () => [h(OnyxIcon, { icon: placeholder }), "Tab 3 (disabled)"],
        },
      ),
      h(
        OnyxTab,
        { value: "tab-4" },
        {
          default: "Panel content 4...",
          tab: () => [h(OnyxIcon, { icon: placeholder }), "Tab 4"],
        },
      ),
      h(
        OnyxTab,
        { value: "tab-5", skeleton: true },
        {
          default: "Panel content 5...",
          tab: () => [h(OnyxIcon, { icon: placeholder }), "Tab 5"],
        },
      ),
      h(
        OnyxTab,
        { value: "tab-6" },
        {
          default: "Panel content 6...",
          tab: () => [h(OnyxIcon, { icon: placeholder }), "Tab 6"],
        },
      ),
    ],
  },
} satisfies Story;

export const Stretched = {
  args: {
    ...Default.args,
    stretched: true,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    ...Default.args,
    skeleton: true,
  },
} satisfies Story;
