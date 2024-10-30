import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxNavButton from "../OnyxNavBar/modules/OnyxNavButton/OnyxNavButton.vue";
import { NAV_BAR_BUTTONS_INJECTION_KEY } from "../OnyxNavBar/types";
import OnyxMoreList from "./OnyxMoreList.vue";

/**
 * Support component for rendering a horizontal list of components with a "+ more" indicator.
 * If using custom or not natively supported components, make sure to implement the `useMoreChild()` composable in all child components.
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
    is: "div",
    injectionKey: NAV_BAR_BUTTONS_INJECTION_KEY,
    default: () =>
      Array.from({ length: 24 }, (_, index) => h(OnyxNavButton, { label: `Element ${index + 1}` })),
    more: ({ hiddenElements }) => h("div", `+${hiddenElements} more`),
  },
} satisfies Story;
