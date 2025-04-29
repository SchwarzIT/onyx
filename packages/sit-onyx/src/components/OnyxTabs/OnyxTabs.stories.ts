import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxBadge from "../OnyxBadge/OnyxBadge.vue";
import OnyxTab from "../OnyxTab/OnyxTab.vue";
import OnyxTabs from "./OnyxTabs.vue";

/**
 * Tabs organize content into separate viewports within the same page, helping users navigate and manage large sets of information without page reloads, improving accessibility and flow. They are perfect for single page web applications, or for web pages capable of displaying different subjects
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
      h(OnyxTab, { value: "tab-1", label: "Tab 1" }, () => "Panel content 1..."),
      h(OnyxTab, { value: "tab-2", label: "Tab 2" }, () => "Panel content 2..."),
      h(
        OnyxTab,
        { value: "tab-3", label: "Disabled tab 3", disabled: true },
        () => "Panel content 3...",
      ),
      h(
        OnyxTab,
        { value: "tab-4" },
        {
          default: () => "Panel content 3...",
          tab: () => ["Tab 4", h(OnyxBadge, { dot: true, color: "warning" })],
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

export const ManyTabs = {
  args: {
    ...Default.args,
    default: () =>
      Array.from({ length: 32 }, (_, index) => {
        const id = index + 1;
        return h(
          OnyxTab,
          { label: `Tab ${id}`, value: `tab-${id}`, skeleton: id === 3 },
          () => `Panel content ${id}`,
        );
      }),
  },
} satisfies Story;
