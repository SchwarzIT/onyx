import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxBadge from "../OnyxBadge/OnyxBadge.vue";
import OnyxListItem from "../OnyxListItem/OnyxListItem.vue";
import OnyxNavButton from "./OnyxNavButton.vue";

/**
 * The nav button is used internally to build the main navigation bar component and is not intended to be used individually.
 */
const meta: Meta<typeof OnyxNavButton> = {
  title: "Navigation/modules/NavButton",
  ...defineStorybookActionsAndVModels({
    component: OnyxNavButton,
    events: ["click"],
    argTypes: {
      default: {
        control: { type: "text" },
      },
    },
  }),
};

const nestedChildren = [
  { label: "Nested Item 1", href: "#", active: true },
  { label: "Nested Item 2", href: "https://onyx.schwarz" },
  { label: "Nested Item 3", href: "#3" },
  { label: "Nested Item 4", href: "#4" },
  { label: "Nested Item 5", href: "#5" },
];

export default meta;
type Story = StoryObj<typeof OnyxNavButton>;

/**
 * This example shows a default nav button.
 */
export const Default = {
  args: {
    label: "Nav Button",
    default: "Item",
  },
} satisfies Story;

/**
 * This example shows an active nav button.
 */
export const Active = {
  args: {
    ...Default.args,
    active: true,
  },
} satisfies Story;

/**
 * This example shows the nav button with nested children.
 */
export const WithChildren: Story = {
  args: {
    ...Default.args,
    active: true,
    children: () => nestedChildren.map(({ label }) => h(OnyxListItem, label)),
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="height: 16rem"> <story /> </div>`,
    }),
  ],
};

/**
 * This example shows the nav button with additional content (a dot badge in this case).
 */
export const WithCustomContent = {
  args: {
    ...Default.args,
    default: ["Custom label", h(OnyxBadge, { dot: true, color: "warning" })],
  },
} satisfies Story;

/**
 * This example shows the nav item with external link.
 */
export const WithExternalLink = {
  args: {
    label: "onyx",
    href: "https://onyx.schwarz/",
  },
} satisfies Story;
