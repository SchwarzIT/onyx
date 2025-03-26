import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxNavItem from "../OnyxNavBar/modules/OnyxNavItem/OnyxNavItem.vue";
import { NAV_BAR_MORE_LIST_INJECTION_KEY } from "../OnyxNavBar/types";
import OnyxMoreList from "./OnyxMoreList.vue";

/**
 * Support component for rendering a horizontal list of components with a "+ more" indicator.
 * If using custom or not natively supported components, make sure to implement the `useMoreListChild()` composable in all child components.
 */
const meta: Meta<typeof OnyxMoreList> = {
  title: "Support/MoreList",
  component: OnyxMoreList,
  argTypes: {
    default: { control: { disable: true } },
    more: { control: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxMoreList>;

export const Default = {
  args: {
    injectionKey: NAV_BAR_MORE_LIST_INJECTION_KEY,
    default: ({ attributes }) =>
      h(
        "ul",
        { style: "padding: 0", role: "menu", ...attributes },
        Array.from({ length: 16 }, (_, index) => h(OnyxNavItem, { label: `Element ${index + 1}` })),
      ),
    more: ({ hiddenElements, attributes }) =>
      h(
        "span",
        {
          style: `font-family: var(--onyx-font-family); color: var(--onyx-color-text-icons-neutral-soft)`,
          ...attributes,
        },
        `+${hiddenElements} more`,
      ),
  },
} satisfies Story;
