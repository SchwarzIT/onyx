import arrowSmallUp from "@sit-onyx/icons/arrow-small-up.svg?raw";
import placeholder from "@sit-onyx/icons/placeholder.svg?raw";
import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import { defineIconSelectArgType } from "../../utils/storybook.js";
import OnyxFabItem from "../OnyxFabItem/OnyxFabItem.vue";
import OnyxFab from "./OnyxFab.vue";

const meta: Meta<typeof OnyxFab> = {
  title: "Buttons/Fab",
  component: OnyxFab,
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
type Story = StoryObj<typeof OnyxFab>;

export const Default = {
  args: {
    label: "Example label",
    icon: placeholder,
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
    icon: arrowSmallUp,
  },
} satisfies Story;

export const Options = {
  args: {
    label: "Example label",
    default: () => [
      h(OnyxFabItem, { label: "Action 3", icon: placeholder }),
      h(OnyxFabItem, { label: "Action 2", icon: placeholder }),
      h(OnyxFabItem, { label: "Action 1", icon: placeholder }),
    ],
  },
} satisfies Story;

export const IconOptions = {
  args: {
    label: "Example label",
    default: () => [
      h(OnyxFabItem, { label: "Action 3", icon: placeholder, hideLabel: true }),
      h(OnyxFabItem, { label: "Action 2", icon: placeholder, hideLabel: true }),
      h(OnyxFabItem, { label: "Action 1", icon: placeholder, hideLabel: true }),
    ],
  },
} satisfies Story;

export const LeftAligned = {
  args: {
    ...Options.args,
    alignment: "left",
  },
} satisfies Story;

export const Skeleton = {
  args: {
    ...Default.args,
    skeleton: true,
  },
} satisfies Story;
