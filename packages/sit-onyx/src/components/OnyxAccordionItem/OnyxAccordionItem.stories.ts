import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxAccordionItem from "./OnyxAccordionItem.vue";

/**
 * A single accordion item component. Shoud be used with the [OnyxAccordion](/docs/navigation-accordion--docs) component.
 */
const meta: Meta<typeof OnyxAccordionItem> = {
  title: "Support/AccordionItem",
  component: OnyxAccordionItem,
  argTypes: {
    header: {
      control: { disable: true },
    },
    panel: {
      control: { disable: true },
    },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxAccordionItem>;

/** Standard AccordionItem*/
export const Default = {
  args: {
    header: () => h("header", "Title"),
    panel: () => h("panel", "Hidden Content"),
  },
} satisfies Story;
