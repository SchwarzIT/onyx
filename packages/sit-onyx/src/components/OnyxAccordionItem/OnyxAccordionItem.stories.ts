import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxAccordionItem from "./OnyxAccordionItem.vue";

/**
 * A single accordion item component. Should be used with the [OnyxAccordion](/docs/navigation-accordion--docs) component.
 */
const meta: Meta<typeof OnyxAccordionItem> = {
  title: "Support/AccordionItem",
  component: OnyxAccordionItem,
  argTypes: {
    header: {
      control: { type: "text" },
    },
    default: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxAccordionItem>;

/** Standard AccordionItem*/
export const Default = {
  args: {
    header: "Title",
    default: "Content",
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
