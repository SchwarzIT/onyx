import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxTab from "./OnyxTab.vue";

/**
 * A single tab component. Only intended to be used with the [OnyxTabs](/docs/navigation-tabs--docs) component.
 */
const meta: Meta<typeof OnyxTab> = {
  title: "Support/Tab",
  component: OnyxTab,
  argTypes: {
    tab: { control: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxTab>;

export const Default = {
  args: {
    value: "tab-1",
    label: "Tab 1",
    default: "Panel content 1...",
  },
} satisfies Story;

export const Disabled = {
  args: {
    ...Default.args,
    disabled: true,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    ...Default.args,
    skeleton: true,
  },
} satisfies Story;
