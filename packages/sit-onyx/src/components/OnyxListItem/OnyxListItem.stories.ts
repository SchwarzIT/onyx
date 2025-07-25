import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxListItem from "./OnyxListItem.vue";

/**
 * Generic list item component that is e.g. used in the select, nav item, user menu etc.
 */
const meta: Meta<typeof OnyxListItem> = {
  title: "Support/ListItem",
  component: OnyxListItem,
  argTypes: {
    default: { control: { type: "text" } },
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="max-width: 16rem;"> <story /> </div>`,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof OnyxListItem>;

export const Default = {
  args: {
    default: "Example option",
  },
} satisfies Story;

export const Active = {
  args: {
    ...Default.args,
    active: true,
  },
} satisfies Story;

export const Selected = {
  args: {
    ...Default.args,
    selected: true,
  },
} satisfies Story;

export const Checked = {
  args: {
    ...Default.args,
    checked: true,
  },
} satisfies Story;

export const Disabled = {
  args: {
    ...Default.args,
    disabled: true,
  },
} satisfies Story;

export const Danger = {
  args: {
    ...Default.args,
    color: "danger",
  },
} satisfies Story;
