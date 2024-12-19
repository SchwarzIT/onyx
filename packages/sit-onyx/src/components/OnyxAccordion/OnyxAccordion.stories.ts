import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxAccordionItem from "../OnyxAccordionItem/OnyxAccordionItem.vue";
import OnyxAccordion from "./OnyxAccordion.vue";

/**
 * An accordion is a versatile UI element that allows users to expand and collapse sections of content. It is commonly used for organizing large amounts of information in a compact space, enabling users to easily navigate through different categories or options.


 */
const meta: Meta<typeof OnyxAccordion> = {
  title: "Navigation/Accordion",
  component: OnyxAccordion,
  argTypes: {
    default: {
      control: { disable: true },
    },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxAccordion>;

/** Standard Accord */
export const Default = {
  args: {
    default: () => [
      h(OnyxAccordionItem, null, {
        header: () => h("span", "First Accordion Header"),
        panel: () => h("p", "This is the content inside the first panel."),
      }),
      h(OnyxAccordionItem, null, {
        header: () => h("span", "Second Accordion Header"),
        panel: () => h("p", "This is the content inside the second panel."),
      }),
      h(OnyxAccordionItem, null, {
        header: () => h("span", "Third Accordion Header"),
        panel: () => h("p", "This is the content inside the third panel."),
      }),
    ],
  },
} satisfies Story;
