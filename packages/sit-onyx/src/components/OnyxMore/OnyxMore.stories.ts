import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxNavButton from "../OnyxNavBar/modules/OnyxNavButton/OnyxNavButton.vue";
import { NAV_BAR_BUTTONS_INJECTION_KEY } from "../OnyxNavBar/types";
import OnyxMore from "./OnyxMore.vue";

/**
 * Support component for rendering a horizontal list of components with a "+ more" indicator.
 * If using custom or not natively supported components, make sure to implement the `useMoreChild()` composable in all child components.
 */
const meta: Meta<typeof OnyxMore> = {
  title: "Support/More",
  component: OnyxMore,
};

export default meta;
type Story = StoryObj<typeof OnyxMore>;

export const Default = {
  args: {
    is: "div",
    injectionKey: NAV_BAR_BUTTONS_INJECTION_KEY,
    default: Array.from({ length: 24 }, (_, index) =>
      h(OnyxNavButton, { label: `Element ${index + 1}` }),
    ),
    more: ({ hiddenElements }) => h("div", `+${hiddenElements.value.length} more`),
  },
} satisfies Story;
