import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import { OnyxLink } from "../../index";
import OnyxEmpty from "./OnyxEmpty.vue";

/**
 * The empty component is used to indicate to the user that there is currently no data available.
 */
const meta: Meta<typeof OnyxEmpty> = {
  title: "Data/Empty",
  component: OnyxEmpty,
  argTypes: {
    icon: {
      control: { disable: true },
    },
    default: { control: { type: "text" } },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxEmpty>;

/**
 * This example shows a default empty component.
 */
export const Default = {
  args: {
    default: "Place a text for empty state here",
  },
} satisfies Story;

/**
 * This example shows an empty component with custom text and icon with a different color and size.
 */
export const CustomContent = {
  args: {
    default: () => [
      "No data found. Go to ",
      h(OnyxLink, { href: "#" }, () => "this page"),
      " to add some data.",
    ],
  },
} satisfies Story;

/**
 * This example shows an empty component with a limited width that will be truncated with multiline.
 */
export const Truncation = {
  args: {
    default: "Place a text for empty state here",
    style: "max-width: 12rem",
  },
} satisfies Story;
