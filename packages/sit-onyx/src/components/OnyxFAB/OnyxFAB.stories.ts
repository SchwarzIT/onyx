import { iconArrowSmallUp, iconPlaceholder } from "@sit-onyx/icons";
import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";
import { defineIconSelectArgType } from "../../utils/storybook.js";
import OnyxFABItem from "../OnyxFABItem/OnyxFABItem.vue";
import OnyxFAB from "./OnyxFAB.vue";

/**
 * A floating action button (FAB) is a fixed/sticky action button that appears at the bottom corner of a screen.
 */
const meta: Meta<typeof OnyxFAB> = {
  title: "Buttons/FAB",
  component: OnyxFAB,
  tags: ["new:component"],
  argTypes: {
    ...withNativeEventLogging(["onClick"]),
    default: { control: { disable: true } },
    icon: defineIconSelectArgType(),
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="min-height: 12rem;"> <story /> </div>`,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof OnyxFAB>;

export const Default = {
  args: {
    label: "Example label",
    icon: iconPlaceholder,
    hideLabel: true,
  },
} satisfies Story;

export const Text = {
  args: {
    ...Default.args,
    hideLabel: undefined,
  },
} satisfies Story;

export const Link = {
  args: {
    label: "Back to top",
    link: "#",
    icon: iconArrowSmallUp,
  },
} satisfies Story;

export const Items = {
  args: {
    label: "Example label",
    default: () => [
      h(OnyxFABItem, { label: "Action 3", icon: iconPlaceholder }),
      h(OnyxFABItem, { label: "Action 2", icon: iconPlaceholder }),
      h(OnyxFABItem, { label: "Action 1", icon: iconPlaceholder }),
    ],
  },
} satisfies Story;

export const IconItems = {
  args: {
    label: "Example label",
    default: () => [
      h(OnyxFABItem, { label: "Action 3", icon: iconPlaceholder, hideLabel: true }),
      h(OnyxFABItem, { label: "Action 2", icon: iconPlaceholder, hideLabel: true }),
      h(OnyxFABItem, { label: "Action 1", icon: iconPlaceholder, hideLabel: true }),
    ],
  },
} satisfies Story;

export const LeftAligned = {
  args: {
    ...Items.args,
    alignment: "left",
  },
} satisfies Story;

export const Skeleton = {
  args: {
    ...Default.args,
    skeleton: true,
  },
} satisfies Story;
